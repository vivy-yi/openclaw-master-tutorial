# OpenClaw Memory 框架 Hook 源码级对比分析

> 最后更新：2026-04-26
> 数据来源：各框架 index.ts / dist/index.js 源码 grep 结果
> 验证方法：`grep -oE "\.on\([\"'][a-z_:]+[\"']" <source> | sort -u`

---

## 一、Hook 完整注册列表（源码级）

| Hook | memory-core | memory-lancedb-pro | openviking | lossless-claw |
|------|:-----------:|:-----------------:|:----------:|:-------------:|
| `session_start` | — | — | ✅ | — |
| `session_end` | — | ⚠️ 仅清理 | ✅ | ✅ |
| `before_agent_start` | — | ✅ | — | — |
| `agent_end` | — | ✅ | ✅ | — |
| `before_prompt_build` | — | ✅ | ✅ | ✅ |
| `command:new` | — | ✅ | — | — |
| `command:reset` | — | ✅ | — | — |
| `before_reset` | — | — | ✅ | ✅ |
| `after_compaction` | — | — | ✅ (reserved) | — |
| `agent:bootstrap` | — | ✅ | — | — |
| `after_tool_call` | — | ✅ | — | — |
| `message_received` | — | ✅ | — | — |
| `before_message_write` | — | ✅ | — | — |
| `gateway_start` | — | — | — | ✅ |
| `gateway_stop` | — | — | — | ✅ |
| `agent_suspend` | — | — | — | — |
| `agent_resume` | — | — | — | — |

---

## 二、各框架详细源码分析

### 2.1 memory-lancedb-pro

**源码文件：** `~/.openclaw/extensions/memory-lancedb-pro/index.ts`

**Hook 统计：** 8 个 `api.on` + 3 个 `api.registerHook`

**完整列表：**

```typescript
// 行1897 - 实时入站文本捕获
api.on("message_received", (event, ctx) => { ... })

// 行1914 - 消息写入前
api.on("before_message_write", (event, ctx) => { ... })

// 行1993 - 自动召回（注入 relevant-memories）
api.on("before_agent_start", async (event, ctx) => { ... })

// 行2093 - 自动捕获（SmartExtractor 提取写入 LanceDB）
api.on("agent_end", async (event, ctx) => { ... })

// 行2359 - 系统启动初始化
api.registerHook("agent:bootstrap", async (event) => { ... })

// 行2445 - Session Memory 写入（唯一写入点）
api.registerHook("command:new", appendSelfImprovementNote, { ... })

// 行2449 - Self-improvement
api.registerHook("command:reset", appendSelfImprovementNote, { ... })

// 行2490 - Memory Reflection
api.on("after_tool_call", (event, ctx) => { ... })

// 行2526 - Memory Reflection (第二次注册)
api.on("before_agent_start", async (_event, ctx) => { ... })

// 行2550 - Memory Reflection prompt 注入
api.on("before_prompt_build", async (_event, ctx) => { ... })

// 行2598 - ⚠️ Session 结束清理（不写入 LanceDB！）
api.on("session_end", (_event, ctx) => {
  // 仅清理 reflectionErrorStateBySession 和 reflectionDerivedBySession
  // 不执行任何 LanceDB 写入操作
})
```

**关键结论：**

- `session_end` 存在但只做内存状态清理，**不写 LanceDB**
- session-memory 写入只依赖 `command:new`（用户必须打 `/new`）
- 自动捕获（auto-capture）和自动召回（auto-recall）覆盖了大部分场景

---

### 2.2 openviking

**源码文件：** `~/.openclaw/extensions/openviking/index.ts`

**Hook 统计：** 6 个 `api.on`，0 个 `registerHook`

**完整列表：**

```typescript
// 行1461 - 记住 session AgentId
api.on("session_start", async (_event: unknown, ctx?: HookAgentContext) => {
  rememberSessionAgentId(ctx ?? {});
});

// 行1464 - 记住 session AgentId
api.on("session_end", async (_event: unknown, ctx?: HookAgentContext) => {
  rememberSessionAgentId(ctx ?? {});
});

// 行1467 - 上下文组装
api.on("before_prompt_build", async (event: unknown, ctx?: HookAgentContext) => {
  rememberSessionAgentId(ctx ?? {});
  // ... prependContext 组装
});

// 行1609 - 记住 AgentId
api.on("agent_end", async (_event: unknown, ctx?: HookAgentContext) => {
  rememberSessionAgentId(ctx ?? {});
});

// 行1612 - 提交 OV session
api.on("before_reset", async (_event: unknown, ctx?: HookAgentContext) => {
  // commitOVSession on reset
});

// 行1631 - 预留 Hook（未实现）
api.on("after_compaction", async (_event: unknown, _ctx?: HookAgentContext) => {
  // Reserved hook registration for future post-compaction memory integration.
});
```

**关键结论：**

- 所有 Hook 都是轻量级 `rememberSessionAgentId` 追踪
- 没有写入外部存储（LanceDB / SQLite）
- `session_end` 只是记住 AgentId，**不持久化任何内容**
- `after_compaction` 是预留扩展点，未来可能支持记忆持久化

---

### 2.3 lossless-claw

**源码文件：** `/opt/homebrew/lib/node_modules/openclaw/dist/extensions/lossless-claw/dist/index.js`

**Hook 统计：** 从 55KB dist 文件中提取

**完整列表：**

```typescript
// 从 dist/index.js 提取（grep -oE "\.on\([\"'][a-z_:]+[\"']"）
api.on("before_prompt_build")   // 注入 LCM 召回策略
api.on("before_reset")          // 处理 reset 事件
api.on("gateway_start")          // 延迟 DB 初始化
api.on("gateway_stop")           // 清理资源
api.on("session_end")            // DAG 压缩触发
```

**关键结论：**

- ✅ `session_end` 真实存在，会触发 DAG 压缩
- ❌ 没有 `command:new` 注册，session-memory 不依赖 `/new`
- ✅ `gateway_start/stop` 支持数据库生命周期管理

---

### 2.4 memory-core

**源码文件：** `/opt/homebrew/lib/node_modules/openclaw/dist/extensions/memory-core/index.js`

**Hook 统计：** 0

```bash
grep -c "api\.on\|api\.once\|registerHook" dist/extensions/memory-core/index.js
# 结果：0
```

**工作方式：** 完全不注册任何 Hook，纯靠 `toolGuidance` prompt 引导 Agent 使用 `memory_search` / `memory_get`

---

## 三、session-memory 写入路径对比

| 框架 | session_end 写入 LanceDB | command:new 写入 LanceDB | 其他触发方式 |
|------|:----------------------:|:------------------------:|:------------:|
| **memory-lancedb-pro** | ❌（仅清理状态） | ✅ | — |
| **openviking** | ❌（仅追踪 AgentId） | — | — |
| **lossless-claw** | ✅（DAG 压缩） | — | — |

**根因：** memory-lancedb-pro 的 `session_end` 只做内存清理，没有复用这个 Hook 做 session summary 持久化。

---

## 四、场景覆盖最终结论

| 场景 | memory-lancedb-pro | openviking | lossless-claw |
|------|:------------------:|:----------:|:-------------:|
| 正常会话 `/new` | ✅ 写入 LanceDB | ❌ | ❌ |
| session_end 触发 | ❌（无写入） | ❌（无写入） | ✅（DAG 压缩） |
| Gateway 重启 | — | — | ✅ |
| Agent 休眠/唤起 | ❌ | ❌ | ❌ |
| 自动召回（auto-recall） | ✅ | ❌ | ❌ |
| 自动捕获（auto-capture） | ✅ | ❌ | ❌ |
| 向量检索 | ✅ | ❌ | ❌ |

---

## 五、修正说明

**之前分析的错误：**

1. **lossless-claw session_end** - 之前说"不确定"，现在源码确认 ✅ 存在
2. **memory-lancedb-pro session_end** - 之前说"无"，现在确认 ⚠️ 有但仅清理状态
3. **memory-core** - 之前结论正确，0 hook 注册
4. **openviking session_end** - 之前确认存在，现在确认只是追踪不持久化

---

## 六、建议

**如果要实现"所有会话结束都能写入 LanceDB"：**

方案 A：在 memory-lancedb-pro 中增加 `session_end` 写入逻辑

```typescript
// 行2598 现有代码
api.on("session_end", (_event, ctx) => {
  // 现有：清理 reflection 状态
  reflectionErrorStateBySession.delete(sessionKey);
  
  // 新增：写入 session summary 到 LanceDB（参考 command:new 逻辑）
  if (config.sessionMemory?.enabled) {
    await writeSessionSummaryToLanceDB(ctx);
  }
});
```

方案 B：给 OpenClaw 提 issue 增加 `agent_suspend` / `agent_resume` Hook

---

*本分析由墨家自我改进系统自动生成*
*验证方法：`grep -oE "\.on\([\"'][a-z_:]+[\"']" <source> | sort -u`*