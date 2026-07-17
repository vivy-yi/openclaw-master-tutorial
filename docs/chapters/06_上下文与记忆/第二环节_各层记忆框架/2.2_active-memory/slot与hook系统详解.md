# OpenClaw Slot 与 Hook 系统详解

> 本文档深入解析 OpenClaw 的插件架构核心：Slot 机制和 Hook 系统。
> 基于 OpenClaw 源码分析，含实际插件注册示例。

---

## 一、Slot 机制

### 1.1 什么是 Slot？

Slot 是 OpenClaw 的**插件插槽**机制，用于放置不同类型的核心功能插件。每个 Slot 有明确的职责边界，插件通过声明 `kind` 来声明自己属于哪个 Slot。

### 1.2 Slot 类型（完整列表）

从源码 `slots.ts` 中提取：

```typescript
// src/plugins/slots.ts
const SLOT_BY_KIND = {
  memory: "memory",
  "context-engine": "contextEngine"
};
const DEFAULT_SLOT_BY_KEY = {
  memory: "memory-core",
  contextEngine: "legacy"
};
```

| Kind | Slot Key | 默认插件 | 当前插件 |
|------|----------|----------|----------|
| **memory** | `memory` | `memory-core` | `memory-lancedb-pro` |
| **context-engine** | `contextEngine` | `legacy` | `lossless-claw` |

**共 2 个 Slot**，其余功能通过 Hook 系统扩展。

### 1.3 为什么只有 2 个 Slot？

这是 OpenClaw 的核心设计抽象：

```
┌─────────────────────────────────────────────────────────────┐
│ ContextEngine Slot                                          │
│ 职责: "管理当前 Session 的上下文"                           │
│ - 对话压缩 (compaction)                                    │
│ - 上下文组装 (assemble)                                    │
│ - Token 预算分配                                           │
│ - Phase2 提取 (对话 → 记忆)                                │
│                                                             │
│ 插件: lossless-claw (当前) | openviking (替代)            │
└─────────────────────────────────────────────────────────────┘
                            ↕ Hook 通信
┌─────────────────────────────────────────────────────────────┐
│ Memory Slot                                                 │
│ 职责: "管理跨 Session 的长期记忆"                           │
│ - 向量存储 + 混合检索                                      │
│ - Smart Extraction (6 类)                                  │
│ - Weibull 衰减 + 三层晋升                                  │
│ - auto-capture / auto-recall                               │
│                                                             │
│ 插件: memory-lancedb-pro (当前)                            │
└─────────────────────────────────────────────────────────────┘
```

**本质区别**：
- ContextEngine = Session **内**的上下文管理（眼前）
- Memory = Session **间**的长期记忆（永远）

### 1.4 Slot 配置结构

```json
// openclaw.json
{
  "plugins": {
    "slots": {
      "contextEngine": "lossless-claw",
      "memory": "memory-lancedb-pro"
    },
    "entries": {
      "lossless-claw": {
        "enabled": true
      },
      "memory-lancedb-pro": {
        "enabled": true
      }
    }
  }
}
```

### 1.5 切换 Slot 插件

```bash
# 切换 contextEngine 到 openviking
openclaw config set plugins.slots.contextEngine openviking

# 切换 memory 到另一个实现
openclaw config set plugins.slots.memory memory-lancedb
```

---

## 二、Hook 系统

### 2.1 什么是 Hook？

Hook 是 OpenClaw 的**事件驱动通信机制**。插件通过注册 Hook 来监听系统事件，在特定时机执行自定义逻辑。

### 2.2 Hook 类型（完整列表）

从 `hook-runner-global-*.js` 和插件源码中提取：

| Hook 名称 | 触发时机 | 典型用途 |
|-----------|----------|----------|
| `before_prompt_build` | 构建 Prompt 前 | 注入上下文、记忆 |
| `after_compaction` | 对话压缩完成后 | 后处理压缩结果 |
| `before_compaction` | 对话压缩前 | 准备压缩数据 |
| `after_tool_call` | 工具调用完成后 | 捕获工具结果 |
| `before_reset` | Session 重置前 | 清理状态 |
| `session_start` | Session 启动时 | 初始化 |
| `session_end` | Session 结束时 | 收尾处理 |
| `agent_end` | Agent 处理结束时 | 最终处理 |
| `message_received` | 收到消息时 | 消息预处理 |
| `before_message_write` | 消息写入前 | 过滤或修改消息 |
| `before_agent_start` | Agent 启动前 | 前置处理 |

### 2.3 Hook 注册方式

```typescript
// 在插件 index.ts 中
api.on("before_prompt_build", async (event: unknown, ctx?: HookAgentContext) => {
  // event: 事件数据
  // ctx: 运行时上下文 (sessionKey, sessionId, agentId 等)
  return { prependSystemContext: "..." };  // 可选返回值
});

api.on("after_compaction", async (_event: unknown, _ctx?: HookAgentContext) => {
  // 处理压缩结果
});

api.on("session_end", async (event: SessionEndEvent) => {
  // 清理资源、保存状态等
});
```

### 2.4 Hook 返回值

某些 Hook 支持返回值来影响后续流程：

```typescript
// before_prompt_build 返回值
api.on("before_prompt_build", () => ({
  prependSystemContext: "额外系统提示",  // 添加到系统提示前
  appendSystemContext: "...",              // 添加到系统提示后
}));
```

---

## 三、插件注册示例

### 3.1 lossless-claw 插件

```typescript
// lossless-claw/dist/index.js (关键部分)

// 注册 Hooks
api.on("before_reset", async (event, ctx) => {
  await engine.handleBeforeReset({ reason: event.reason, ... });
});

api.on("before_prompt_build", () => ({
  prependSystemContext: LOSSLESS_RECALL_POLICY_PROMPT  // 注入召回策略
}));

api.on("session_end", async (event) => {
  await engine.handleSessionEnd({ reason: event.reason, ... });
});

// 注册 ContextEngine (核心功能)
api.registerContextEngine("lossless-claw", () => shared.getCachedEngine());

// 注册 Tools
api.registerTool(ctx => createLcmGrepTool({ sessionKey: ctx.sessionKey }));
api.registerTool(ctx => createLcmDescribeTool({ sessionKey: ctx.sessionKey }));
api.registerTool(ctx => createLcmExpandTool({ sessionKey: ctx.sessionKey }));
```

### 3.2 openviking 插件

```typescript
// openviking/index.ts (关键部分)

// 注册多个 Hooks
api.on("session_start", async (_event, ctx) => { /* 初始化 */ });
api.on("session_end", async (_event, ctx) => { /* 清理 */ });
api.on("before_prompt_build", async (event, ctx) => { /* auto-recall */ });
api.on("agent_end", async (_event, ctx) => { /* 后处理 */ });
api.on("before_reset", async (_event, ctx) => { /* 重置 */ });
api.on("after_compaction", async (_event, ctx) => { /* 压缩后处理 */ });

// 注册 ContextEngine (核心功能)
api.registerContextEngine("openviking", () => contextEnginePlugin);
```

### 3.3 memory-lancedb-pro 插件

```typescript
// memory-lancedb-pro/index.ts (关键部分)

// 注册多个 Hooks
api.on("message_received", (event, ctx) => { /* 消息预处理 */ });
api.on("before_message_write", (event, ctx) => { /* 消息过滤 */ });
api.on("before_agent_start", async (event, ctx) => { /* Agent 启动前 */ });
api.on("agent_end", async (event, ctx) => { /* Agent 结束处理 */ });
api.on("after_tool_call", (event, ctx) => { /* 捕获工具结果 → auto-capture */ });
api.on("before_prompt_build", async (_event, ctx) => { /* 注入记忆 → auto-recall */ });
api.on("session_end", (_event, ctx) => { /* 清理 */ });

// 注册 Tools (memory slot 不使用 ContextEngine)
api.registerTool(ctx => createMemoryRecallTool({ sessionKey: ctx.sessionKey }));
api.registerTool(ctx => createMemoryStoreTool({ sessionKey: ctx.sessionKey }));
api.registerTool(ctx => createMemoryUpdateTool({ sessionKey: ctx.sessionKey }));
```

**注意**：memory-lancedb-pro 使用 memory Slot，不注册 ContextEngine。它通过 Hook 系统与 ContextEngine 通信。

---

## 四、完整数据流

```
用户消息
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ memory-lancedb-pro: message_received Hook                  │
│ → 消息预处理                                                │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ memory-lancedb-pro: before_message_write Hook               │
│ → 消息过滤/修改                                             │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ ContextEngine (lossless-claw)                               │
│                                                             │
│  ① before_prompt_build Hook                                 │
│     → 注入 LOSSLESS_RECALL_POLICY_PROMPT                   │
│     → memory-lancedb-pro: before_prompt_build Hook          │
│     → 注入 auto-recall 记忆                                 │
│     → lossless-claw 决定是否需要压缩                        │
│                                                             │
│  ② 上下文组装 (assemble)                                    │
│     → 合并历史消息 + 摘要 + 工具结果                         │
│                                                             │
│  ③ LLM 生成响应                                            │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ memory-lancedb-pro: after_tool_call Hook                    │
│ → 捕获工具执行结果                                           │
│ → auto-capture 新记忆                                       │
│ → Smart Extraction (6 类)                                   │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ memory-lancedb-pro: agent_end Hook                           │
│ → Agent 结束处理                                            │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ ContextEngine (lossless-claw)                               │
│                                                             │
│  ⑥ afterTurn                                               │
│     → 检查是否需要压缩                                       │
│                                                             │
│  ⑦ before_compaction Hook                                  │
│     → 准备压缩数据                                          │
│                                                             │
│  ⑧ 压缩执行                                                │
│     → 生成摘要                                              │
│                                                             │
│  ⑨ after_compaction Hook                                  │
│     → 后处理压缩结果                                        │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ memory-lancedb-pro: session_end Hook                        │
│ → 清理资源                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 五、插件 kinds vs Slots vs Hooks 总览

| 插件 | Kind | Slot | 注册的 Hooks |
|------|------|------|-------------|
| lossless-claw | context-engine | contextEngine | before_reset, before_prompt_build, session_end |
| openviking | context-engine | contextEngine | session_start, session_end, before_prompt_build, agent_end, before_reset, after_compaction |
| memory-lancedb-pro | memory | memory | message_received, before_message_write, before_agent_start, agent_end, after_tool_call, before_prompt_build, session_end |
| memos-cloud | lifecycle | 无 | (未知) |

### 5.1 lifecycle 插件

```json
// memos-cloud-openclaw-plugin/openclaw.plugin.json
{
  "id": "memos-cloud-openclaw-plugin",
  "kind": "lifecycle",
  "description": "Memos cloud sync plugin"
}
```

lifecycle 插件不占用 Slot，而是注册到生命周期事件中。

---

## 六、源码位置

| 文件 | 说明 |
|------|------|
| `slots-DkFhJWYQ.js` | Slot 类型定义 |
| `hook-runner-global-*.js` | Hook 执行器 |
| `lossless-claw/dist/index.js` | lossless-claw 插件 |
| `openviking/index.ts` | openviking 插件 |
| `memory-lancedb-pro/index.ts` | memory-lancedb-pro 插件 |

---

## 七、常见问题

### Q1: 为什么记忆治理失效？

**可能原因**：
1. lossless-claw 的 `before_prompt_build` 只注入召回策略文本，不调用 memoryRecall
2. Memory Slot 和 ContextEngine Slot 是孤立的（各自独立工作）
3. Workspace 文件（MEMORY.md/SOUL.md）完全独立于这两个 Slot

**解决方案**：
- 激活 openviking（更智能的分层管理）
- 或增加跨系统协调机制

### Q2: 如何调试 Hook 执行？

```bash
# 查看插件加载日志
openclaw gateway logs --plugin <plugin-id>

# 查看 contextEngine 状态
openclaw lcm status
```

### Q3: 可以同时激活两个 contextEngine 插件吗？

**不能**。Slot 是互斥的，切换时会自动禁用其他同类型插件：

```typescript
// slots.ts 中的逻辑
function applyExclusiveSlotSelection(params) {
  for (const slotKey of slotKeys) {
    // 自动禁用其他同 Slot 插件
    for (const plugin of params.registry.plugins) {
      if (plugin.id === params.selectedId) continue;
      if (hasKind(plugin.kind, kindForSlot)) {
        entries[plugin.id] = { ...entry, enabled: false };
      }
    }
  }
}
```

### Q4: memory-lancedb-pro 如何与 contextEngine 通信？

**通过 Hook 系统**：
- `before_prompt_build`: memory-lancedb-pro 注入 auto-recall 记忆
- `after_tool_call`: memory-lancedb-pro 捕获工具结果进行 auto-capture

**它们不直接通信**，而是通过 OpenClaw 的事件系统间接协作。

---

## 八、总结

| 概念 | 说明 |
|------|------|
| **Slot** | 2 个核心插槽（contextEngine, memory），互斥 |
| **Hook** | 事件驱动的扩展点，共 11+ 种类型 |
| **Kind** | 插件类型声明，决定放置哪个 Slot |
| **ContextEngine** | 管理 Session 内上下文（compaction, assemble） |
| **Memory** | 管理跨 Session 长期记忆（capture, recall） |

**协作模式**：
```
ContextEngine ←→ Hook System ←→ Memory
     ↑                                    ↓
  compaction                      auto-capture
     ↑                                    ↓
  assemble                       auto-recall
     ↑                                    ↓
  before_prompt_build ←──────── before_prompt_build
```

OpenClaw 的设计哲学：**核心抽象极简，扩展机制丰富**。

---

## 参考资料

- Slot 源码：`/opt/homebrew/lib/node_modules/openclaw/dist/slots-DkFhJWYQ.js`
- Hook 执行器：`/opt/homebrew/lib/node_modules/openclaw/dist/hook-runner-global-*.js`
- lossless-claw：`~/.openclaw/extensions/lossless-claw/`
- openviking：`~/.openclaw/extensions/openviking/`
- memory-lancedb-pro：`~/.openclaw/extensions/memory-lancedb-pro/`
