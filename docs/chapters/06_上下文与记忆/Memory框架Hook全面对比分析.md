# OpenClaw Memory 框架 Hook 全面对比分析

> 最后更新：2026-04-26
> 分析范围：memory-core、memory-lancedb-pro、openviking、lossless-claw

---

## 一、Hook 全局对比表

| Hook | memory-core | memory-lancedb-pro | openviking | lossless-claw |
|------|:-----------:|:-----------------:|:----------:|:-------------:|
| `session_start` | — | — | ✅ | — |
| `session_end` | — | — | ✅ | ✅ |
| `before_agent_start` | — | ✅ | — | — |
| `agent_end` | — | ✅ | ✅ | — |
| `before_prompt_build` | — | ✅ | ✅ | ✅ |
| `command:new` | — | ✅ | — | — |
| `command:reset` | — | ✅ | — | — |
| `before_reset` | — | — | ✅ | ✅ |
| `after_compaction` | — | — | ✅ (reserved) | — |
| `agent:bootstrap` | — | ✅ | — | — |
| `gateway_start` | — | — | — | ✅ (deferred init) |
| `gateway_stop` | — | — | — | ✅ (cleanup) |
| `agent_suspend` | — | — | — | — |
| `agent_resume` | — | — | — | — |

---

## 二、各框架详细分析

### 2.1 memory-core（OpenClaw 内置）

**Hook 注册：** 无（无 `api.on` 调用）

**工作方式：**
- 不通过 Hook 主动触发
- 通过注入 `toolGuidance` 提示词引导 Agent 使用 `memory_search` / `memory_get`
- 本质是被动的 prompt 增强系统，不是主动的记忆捕获系统

**核心机制：**
```
Agent 收到 memory_search 工具调用
  → 读取 MEMORY.md + memory/*.md + session transcripts
  → 返回相关结果作为上下文
```

**局限性：**
- ❌ 没有自动捕获机制
- ❌ 没有生命周期管理
- ❌ 没有向量检索
- ✅ 但最轻量，无额外依赖

---

### 2.2 memory-lancedb-pro

**Hook 注册：**
```typescript
api.on("before_agent_start", ...)       // auto-recall 注入
api.on("agent_end", ...)                // auto-capture 写入
api.registerHook("command:new", ...)     // session-memory 写入
api.registerHook("command:reset", ...)   // self-improvement 注入
api.registerHook("agent:bootstrap", ...)// self-improvement 初始化
api.on("before_prompt_build", ...)       // memory-reflection
```

**核心功能：**

| 功能 | 触发 Hook | 说明 |
|------|-----------|------|
| **auto-recall** | `before_agent_start` | 检索 LanceDB，注入 relevant-memories |
| **auto-capture** | `agent_end` | SmartExtractor 提取 + Regex fallback 写入 |
| **session-memory** | `command:new` | 上一个 session 摘要写入 LanceDB |
| **memory-reflection** | `before_prompt_build` | 在 prompt 构建前注入记忆提示 |
| **self-improvement** | `agent:bootstrap` + `command:new/reset` | corrections.md 集成 |

**生命周期管理：**
- `before_agent_start` auto-recall 后触发：
  - `patchMetadata(access_count, last_accessed_at)`
  - `decayEngine.scoreAll()`
  - `tierManager.evaluateAll()`
- Tier 系统：Peripheral ⟷ Working ⟷ Core
- 衰减引擎：Weibull 拉伸指数复合衰减

**局限：**
- ❌ `command:new` 只能在用户主动打 `/new` 时触发
- ❌ Agent 休眠/重启/切换没有专门 Hook
- ❌ 没有订阅 `session_end`

---

### 2.3 openviking

**Hook 注册：**
```typescript
api.on("session_start", ...)    // 记住 session AgentId
api.on("session_end", ...)      // 记住 session AgentId
api.on("before_prompt_build", ...) // 上下文组装
api.on("agent_end", ...)        // 记住 AgentId
api.on("before_reset", ...)    // 提交 OV session
api.on("after_compaction", ...) // reserved (未实现)
```

**核心功能：**

| 功能 | 触发 Hook | 说明 |
|------|-----------|------|
| **对话压缩** | `session_end` + `before_prompt_build` | DAG 压缩 + 上下文组装 |
| **Phase2 提取** | `before_prompt_build` | 在 prompt 构建时提取关键信息 |
| **session 追踪** | `session_start/end/agent_end` | 记住各 session 的 AgentId |

**关键优势：**
- ✅ 支持 `session_end`（唯一支持此 Hook 的框架）
- ✅ 在会话结束时可以持久化
- ✅ 有 `after_compaction` 预留 Hook（未来可扩展）

**局限：**
- ❌ 主要做对话压缩，不是持久化存储
- ❌ 没有向量检索
- ❌ 没有多 scope 隔离
- ❌ 没有 Tier 生命周期管理

---

### 2.4 lossless-claw

**Hook 注册：**
```typescript
api.on("before_reset", ...)           // 处理 reset 事件
api.on("before_prompt_build", ...)     // 注入 LOSSLESS_RECALL_POLICY_PROMPT
api.on("session_end", ...)             // 处理会话结束
api.on("gateway_start", ...)           // 延迟数据库初始化
api.on("gateway_stop", ...)            // 清理资源
```

**核心功能：**

| 功能 | 触发 Hook | 说明 |
|------|-----------|------|
| **DAG 压缩** | `session_end` | 增量压缩对话为 DAG |
| **recall policy** | `before_prompt_build` | 注入 LCM 召回策略提示 |
| **数据库管理** | `gateway_start/stop` | 生命周期管理 |
| **工具集** | Tool 注册 | `lcm_grep`、`lcm_describe`、`lcm_expand_query` |

**关键优势：**
- ✅ 支持 `session_end`（与 openviking 并列）
- ✅ SQLite 本地持久化，完整保留每条消息
- ✅ 支持跨对话全文检索
- ✅ Sub-agent expansion 可以展开 DAG 恢复细节

**局限：**
- ❌ 没有向量检索（纯 SQLite FTS）
- ❌ 没有智能提取（依赖手动工具调用）
- ❌ session-memory 需要 `/new` 触发（而非 `session_end` 自动）

---

## 三、关键发现

### 3.1 支持 session_end 的框架

| 框架 | session_end 处理 |
|------|-----------------|
| **openviking** | ✅ 记住 session AgentId（但只是追踪，不做持久化） |
| **lossless-claw** | ✅ 处理会话结束，触发 DAG 压缩 |

### 3.2 支持自动捕获的框架

| 框架 | auto-capture | 触发点 |
|------|-------------|--------|
| **memory-lancedb-pro** | ✅ | `agent_end` |
| **openviking** | ⚠️ | `agent_end`（但只是追踪 AgentId） |
| **lossless-claw** | ❌ | 无自动捕获 |
| **memory-core** | ❌ | 无自动捕获 |

### 3.3 支持 auto-recall 的框架

| 框架 | auto-recall | 注入时机 |
|------|-------------|---------|
| **memory-lancedb-pro** | ✅ | `before_agent_start` |
| **memory-core** | ⚠️ | prompt 引导（被动） |
| **openviking** | ❌ | 无注入机制 |
| **lossless-claw** | ⚠️ | `before_prompt_build` 注入策略提示（被动） |

---

## 四、场景覆盖分析

| 场景 | 能触发的框架 | 说明 |
|------|-------------|------|
| **正常会话结束（/new）** | memory-lancedb-pro ✅ | session-memory 写入 |
| **正常会话结束（session_end）** | openviking ✅, lossless-claw ✅ | DAG 压缩 |
| **Agent 休眠后重新唤起** | ❌ 全部不覆盖 | 无 agent_suspend/resume Hook |
| **Gateway 重启** | lossless-claw ✅ | gateway_start/stop Hook |
| **Agent 切换** | ❌ 全部不覆盖 | 无专门 Hook |
| **Compaction 完成后** | openviking ✅ (reserved) | after_compaction Hook |
| **系统启动 bootstrap** | memory-lancedb-pro ✅ | agent:bootstrap Hook |

---

## 五、根因分析：为什么跨会话记忆难检索

**根本原因：OpenClaw 缺少以下 Hook：**

| 缺失的 Hook | 影响 |
|-------------|------|
| `agent_suspend` | Agent 休眠时无法捕获状态 |
| `agent_resume` | Agent 唤醒时无法恢复上下文 |
| `session_end` (memory-lancedb-pro 未订阅) | 只有手动 `/new` 才能触发 session-memory |
| `gateway_stop` | 无法在网关停止前做最终持久化 |

**当前唯一可靠的会话结束信号：**
1. `/new` 命令 → memory-lancedb-pro session-memory
2. `session_end` → openviking / lossless-claw（但不写入 LanceDB）

---

## 六、解决方案建议

### 方案 A：增强 memory-lancedb-pro（推荐）

**建议给 memory-lancedb-pro 提 feature request：**
1. 订阅 `session_end` Hook（不只是 `command:new`）
2. 在 `session_end` 时自动写入 session summary 到 LanceDB
3. 这样所有会话结束场景都能触发持久化

**配置变更：**
```json
{
  "memory-lancedb-pro": {
    "sessionMemory": {
      "enabled": true,
      "hooks": ["command:new", "session_end"]  // 扩展支持
    }
  }
}
```

### 方案 B：给 OpenClaw 提 Hook 扩展

**建议增加的新 Hook：**
- `agent_suspend` - Agent 进入休眠前
- `agent_resume` - Agent 从休眠唤醒后
- `session_end` - 所有类型的会话结束（不只是 `/new`）
- `gateway_stop` - 网关关闭前（给各框架做最终清理）

### 方案 C：工作around

**当前可行的 workaround：**
1. 养成用 `/new` 切换会话的习惯
2. 或者手动调用 `memory_store` 保存重要上下文
3. 使用 lossless-claw 的 `lcm_expand_query` 跨会话检索

---

## 七、各框架适用场景

| 场景 | 推荐框架 |
|------|---------|
| 跨会话长期记忆检索 | memory-lancedb-pro |
| 对话压缩与上下文组装 | openviking |
| 完整消息保留与全文检索 | lossless-claw |
| 轻量级 prompt 引导 | memory-core |
| 多 Agent 共享知识 | memory-lancedb-pro (scope 隔离) |

---

## 八、总结

| 框架 | Hook 覆盖度 | 自动捕获 | 自动recall | 生命周期 | 向量检索 |
|------|:--------:|:-------:|:---------:|:--------:|:-------:|
| **memory-lancedb-pro** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **openviking** | ⭐⭐ | ⭐ | ⭐ | ⭐ | ❌ |
| **lossless-claw** | ⭐⭐⭐ | ❌ | ⭐ | ⭐ | ❌ |
| **memory-core** | ⭐ | ❌ | ⭐ | ❌ | ❌ |

**核心结论：**
- memory-lancedb-pro 是功能最全面的记忆框架，但依赖 `command:new` 是架构限制
- openviking 和 lossless-claw 都支持 `session_end`，但不会写入 LanceDB
- 要解决"休眠/重启/切换后记忆难检索"的问题，需要 OpenClaw 扩展 Hook 系统，或 memory-lancedb-pro 增加 `session_end` 订阅

---

*本分析由墨家自我改进系统自动生成*
*数据来源：各框架源码 Hook 注册分析*