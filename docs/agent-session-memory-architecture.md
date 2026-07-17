# OpenClaw Agent-Session-Memory 架构详解

> 本文基于 OpenClaw 源码分析，涵盖 Agent 类型、Session 类型、存储机制、记忆提取与跨 Session 记忆构造。

---

## 1️⃣ Agent 类型

根据源码，Agent 有两种**运行时类型**：

| 类型 | 说明 |
|------|------|
| **`embedded`** | 默认 OpenClaw 原生运行时 |
| **`acp`** | ACP Harness 运行时（如 Codex、Claude、Cursor、Gemini） |

```typescript
// runtime-schema-Dgzy-2rz.js
"agents.list[].runtime.type": {
  label: "Agent Runtime Type",
  help: "Runtime type for this agent: \"embedded\" (default OpenClaw runtime) or \"acp\" (ACP harness defaults)."
}
```

---

## 2️⃣ Session 类型

Session Target 有 4 种类型：

| 类型 | 说明 |
|------|------|
| **`main`** | 在主 session 中运行 |
| **`isolated`** | 创建全新的独立 session |
| **`current`** | 在当前 session 中运行 |
| **`session:<custom-id>`** | 在指定的自定义 session 中运行 |

```typescript
// openclaw-tools-QGieR8bq.js
"sessionTarget": "main" | "isolated" | "current" | "session:<custom-id>"
```

---

## 3️⃣ Session 存储触发机制

根据源码分析，Session 存储在以下时机触发：

### Session 元数据存储 (`sessions.json`)

```typescript
// session-store-C4H3pTVH.js
updateSessionStoreAfterAgentRun() {
  // 每个 agent run 结束后更新 session store
  // 记录：sessionId, updatedAt, contextTokens, model, usage, cost 等
}
```

### Session Transcript 存储 (`.jsonl` 文件)

- 每个 Session 都有对应的 `{uuid}.jsonl` 和 `{uuid}.trajectory.jsonl` 文件
- 存储完整的对话记录

### 触发时机

1. Agent run 结束后 → 更新 `sessions.json` 元数据
2. 对话过程中 → 实时写入 `.jsonl` transcript
3. Context 压缩时 → 触发 memory flush 检查
4. Session 结束时 → 最终持久化

---

## 4️⃣ Session → 记忆/Skills 提取蒸馏

根据 `memory-lancedb-pro` 的实现：

### 4.1 自动记忆提取 (`autoCapture`)

```
触发钩子: agent_end
    ↓
提取条件: 至少 2 条消息 (extractMinMessages)
    ↓
LLM 6分类: fact | preference | decision | entity | reflection | other
    ↓
两阶段去重:
  1. 向量预过滤 (similarity ≥ 0.7)
  2. LLM 决策: CREATE | MERGE | SKIP | SUPPORT | CONTEXTUALIZE | CONTRADICT
    ↓
存储到 LanceDB
```

### 4.2 L0/L1/L2 分层内容

每个记忆条目包含三层：

| 层级 | 说明 | 要求 |
|------|------|------|
| **L0 (Abstract)** | 单句索引 | ≥5 字符 |
| **L1 (Overview)** | 结构化 Markdown 摘要 | — |
| **L2 (Content)** | 完整叙事细节 | — |

### 4.3 Skills 蒸馏流程

```
学习条目 (LEARNINGS.md / ERRORS.md)
    ↓
self_improvement_log 工具记录
    ↓
self_improvement_extract_skill 提取为 Skill 框架
    ↓
生成 SKILL.md 文件
    ↓
定期 self_improvement_review 审查
```

---

## 5️⃣ 跨 Session 记忆构造

### 5.1 记忆注入机制 (`autoRecall`)

```
触发钩子: before_agent_start
    ↓
Hybrid 检索: 向量搜索 (70%) + BM25 (30%)
    ↓
Cross-Encoder Rerank
    ↓
注入 <relevant-memories> 上下文（最多 3 条）
```

### 5.2 多作用域隔离

| 作用域 | 说明 |
|--------|------|
| `global` | 所有 Agent 共享 |
| `agent:<id>` | Agent 私有 |
| `custom:<name>` | 自定义作用域 |
| `project:<id>` | 项目级 |
| `user:<id>` | 用户级 |

### 5.3 记忆生命周期 (Weibull 衰减)

| 层级 | 晋升条件 | 衰减参数 |
|------|----------|----------|
| **Core** | access ≥ 10 AND score ≥ 0.7 AND importance ≥ 0.8 | β = 0.8, floor = 0.9 |
| **Working** | access ≥ 3 AND score ≥ 0.4 | β = 1.0, floor = 0.7 |
| **Peripheral** | score < 0.15 OR (age > 60 days AND access < 3) | β = 1.3, floor = 0.5 |

### 5.4 记忆检索流程

```
用户查询
    ↓
噪声过滤 (greeting, denial, meta-question)
    ↓
自适应触发 (跳过短查询，强制长查询)
    ↓
RRF Fusion (vector × 0.7 + BM25 × 0.3)
    ↓
Cross-Encoder Rerank (60% rerank + 40% original)
    ↓
Lifecycle Decay Boost + Length Norm
    ↓
Hard Min Score 过滤
    ↓
MMR Diversity (cosine > 0.85 demoted)
    ↓
返回 Top-K 结果
```

---

## 📊 完整架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      OpenClaw Gateway                        │
├─────────────────────────────────────────────────────────────┤
│  Agent Types:                                                │
│  ┌──────────┐  ┌──────────┐                                │
│  │ embedded │  │   acp    │                                │
│  └──────────┘  └──────────┘                                │
│                                                              │
│  Session Types:                                             │
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌─────────────┐         │
│  │  main  │ │ isolated │ │current │ │session:<id>│         │
│  └────────┘ └──────────┘ └────────┘ └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  Session Storage:                                           │
│  agents/<agent>/sessions/                                   │
│  ├── sessions.json (元数据索引)                              │
│  ├── {uuid}.jsonl (对话记录)                                 │
│  └── {uuid}.trajectory.jsonl (轨迹日志)                      │
├─────────────────────────────────────────────────────────────┤
│  Memory Pipeline:                                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  autoCapture │───▶│ SmartExtract │───▶│  LanceDB    │  │
│  │ (agent_end)  │    │  (6分类)     │    │  (向量存储)  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│           ▲                                    │            │
│           │                                    ▼            │
│  ┌──────────────┐                      ┌──────────────┐   │
│  │  autoRecall   │◀────────────────────│ memory_recall│   │
│  │(before_agent)│    Hybrid检索+Rerank └──────────────┘   │
│  └──────────────┘                                          │
├─────────────────────────────────────────────────────────────┤
│  Skills Pipeline:                                           │
│  LEARNINGS.md / ERRORS.md                                   │
│          │                                                   │
│          ▼                                                   │
│  self_improvement_log ──▶ self_improvement_extract_skill   │
│                                    │                        │
│                                    ▼                        │
│                           skills/<name>/SKILL.md            │
└─────────────────────────────────────────────────────────────┘
```

---

## 附录：关键源码文件

| 功能 | 源码文件 |
|------|----------|
| Agent 类型定义 | `runtime-schema-Dgzy-2rz.js` |
| Session Target 定义 | `openclaw-tools-QGieR8bq.js` |
| Session 存储 | `session-store-C4H3pTVH.js` |
| Memory 插件 | `memory-lancedb-pro` |

---

*文档版本: 2026-04-27*
*基于 OpenClaw 源码分析生成*
