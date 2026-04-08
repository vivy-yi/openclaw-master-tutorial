# lossless-claw vs memory-lancedb-pro 深度对比

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 相关教程：[lossless-claw 使用教程](./lossless-claw%20使用教程.md) | [memory-lancedb-pro 使用教程](./memory-lancedb-pro%20使用教程.md)

---

## 一句话总结

**lossless-claw 是保险，确保对话历史一条不丢；memory-lancedb-pro 是搜索引擎，确保记忆随用随取。** 二者位于不同架构层级，解决不同问题，可叠加使用。

---

## 架构层级对比

```
┌─────────────────────────────────────────────────────────┐
│                  OpenClaw Agent                        │
└─────────────────────┬───────────────────────────────────┘
                      │
          ┌───────────▼───────────┐
          │   Memory Plugin 层    │ ← memory-lancedb-pro 在此
          │   (主动记忆检索)       │
          └───────────┬───────────┘
                      │  ← Agent 查询记忆时
          ┌───────────▼───────────┐
          │  ContextEngine 层     │ ← lossless-claw 在此
          │  (上下文压缩/组装)     │
          └───────────┬───────────┘
                      │  ← 每次 LLM 调用时
          ┌───────────▼───────────┐
          │   LLM Provider       │
          └───────────────────────┘
```

> lossless-claw 位于 ContextEngine 层，比 memory-lancedb-pro 的 Memory Plugin 层**更底层**。

---

## 核心定位对比

| | **lossless-claw** | **memory-lancedb-pro** |
|---|---|---|
| **插件类型** | ContextEngine（上下文引擎） | Memory Plugin（记忆插件） |
| **解决的问题** | Compaction 时消息被替换/丢弃 | 记忆检索不精准、长期记忆缺失 |
| **触发时机** | 每次 LLM 调用前，自动触发 | Agent 主动调用工具触发 |
| **数据来源** | 当前对话的所有消息 | 从消息中**抽取**的关键知识 |
| **官方推荐度** | Pete Steinberger（OpenClaw 创建者）亲推 | 社区热门，300+ GitHub stars |

---

## 技术架构对比

| | **lossless-claw** | **memory-lancedb-pro** |
|---|---|---|
| **存储后端** | SQLite | LanceDB（嵌入式向量数据库） |
| **索引结构** | DAG（有向无环图） | 向量索引 + BM25 倒排索引 |
| **压缩机制** | 多层 DAG 摘要（D0/D1/D2...），可逆 | Weibull 衰减 + LLM 智能抽取 |
| **Fresh Tail** | ✅ 最新 N 条消息始终保持原始 | ❌ 无此机制 |
| **摘要层级** | Raw → D0 → D1 → D2 → ...（可配置深度） | L0 Abstract → L1 Overview → L2 Full |
| **去重机制** | DAG 父子关系天然去重 | 两阶段：向量预过滤 + LLM 决策 |
| **大文件处理** | ✅ large-files.ts 自动拦截存储 | ❌ 无此功能 |

---

## 检索能力对比

| | **lossless-claw** | **memory-lancedb-pro** |
|---|---|---|
| **检索方式** | grep（关键词）+ expand（按需展开） | 语义向量搜索 + BM25 全文搜索 |
| **重排序** | ❌ 无 | ✅ Cross-Encoder Rerank（Jina/SiliconFlow/Voyage/Pinecone） |
| **检索融合** | N/A | RRF（Reciprocal Rank Fusion） |
| **多样性约束** | ❌ 无 | ✅ MMR（Mxima Marginal Relevance） |
| **BM25 保护** | ❌ | ✅ 得分≥0.75 绕过语义过滤（保护 API key 等精确字符串） |
| **深度标签** | ✅ 带 depth 标签（Raw/D0/D1/D2） | ❌ 无层级标签 |
| **跨深度搜索** | ✅ lcm_grep 可搜所有层 | ✅ 语义搜索自动跨记忆 |

---

## 信息处理流程对比

### lossless-claw 工作流

```
对话消息生成
     ↓
Compaction 触发（context 快满时）
     ↓
┌─ Leaf Passes：识别要压缩的消息段
├─ Condensation：生成 D0 摘要
└─ Sweeps：更新 D1/D2 高层摘要
     ↓
原始消息 + 摘要 永久写入 SQLite DAG
     ↓
Fresh Tail 始终保持最新 N 条原始消息
     ↓
Agent 可用 lcm_grep / lcm_expand 查询和恢复
```

### memory-lancedb-pro 工作流

```
对话消息生成
     ↓
自动捕获（autoCapture）或 Agent 手动存储
     ↓
Smart Extraction：LLM 6 类分类
  fact / preference / entity / decision / pattern / other
     ↓
两阶段去重
  Stage 1：向量相似度预过滤（≥0.7 进入下一阶段）
  Stage 2：LLM 决策 CREATE / MERGE / SKIP / ...
     ↓
存入 LanceDB（L0/L1/L2 三层）
     ↓
Weibull 衰减管理生命周期
     ↓
Agent 通过 memory_recall 等工具检索
  混合检索 → RRF 融合 → Cross-Encoder 重排 → MMR → 返回
```

---

## 工具能力对比

| 工具类型 | **lossless-claw** | **memory-lancedb-pro** |
|---------|------------------|----------------------|
| **搜索/检索** | `lcm_grep`（跨深度 grep） | `memory_recall`（语义向量搜索） |
| **查看状态** | `lcm_describe`（DAG 状态） | `memory_stats`（记忆统计） |
| **展开/恢复** | `lcm_expand` / `lcm_expand_query` | `memory_recall`（自动展开） |
| **删除/遗忘** | — | `memory_forget` |
| **更新记忆** | — | `memory_update` |
| **列表查看** | — | `memory_list` |
| **自优化工具** | — | `self_improvement_log / extract / review` |
| **管理工具** | TUI（Go 交互界面） | CLI（`openclaw memory-pro`） |
| **工具总数** | 4 个核心 | 9 个（含管理/自优化） |

---

## 记忆生命周期对比

### lossless-claw 的 DAG 晋升机制

```
原始消息（Raw）
     ↓ 访问少 + 时间久
D0 摘要（细节层）
     ↓ 继续衰减
D1 摘要（概述层）
     ↓ 继续衰减
D2 摘要（叙事层）
     ↓ 继续衰减
...（可配置 maxDepth）
```

- **晋升**：被频繁访问的记忆晋升到更高层级保留
- **降级**：长期未访问的记忆降级，节省空间
- **展开**：任何时候可将高层摘要展开回原始消息

### memory-lancedb-pro 的 Weibull 衰减

| 层级 | β 值 | 衰减速度 | 最低分 | 典型内容 |
|------|------|---------|--------|---------|
| **Core** | 0.8 | 最慢 | 0.9 | 核心事实、长期偏好 |
| **Working** | 1.0 | 中等 | 0.7 | 项目上下文、当前任务 |
| **Peripheral** | 1.3 | 最快 | 0.5 | 边缘信息、偶发事件 |

综合评分权重：Recency(40%) + Frequency(30%) + Intrinsic(30%)

---

## 多作用域支持

| | **lossless-claw** | **memory-lancedb-pro** |
|---|---|---|
| **作用域隔离** | ❌ 无 | ✅ global / agent: / custom: / project: / user: |
| **跨作用域访问** | ❌ | ✅ 通过 `agentAccess` 映射 |
| **作用域默认** | 当前会话 | global |

---

## 外部依赖对比

| | **lossless-claw** | **memory-lancedb-pro** |
|---|---|---|
| **数据库** | SQLite（内置） | LanceDB（嵌入式，无需服务） |
| **Embedding API** | ❌ 无（仅摘要生成） | ✅ 必需（Jina / OpenAI / Ollama 等） |
| **Rerank API** | ❌ 无 | ✅ 可选（Jina / SiliconFlow 等） |
| **LLM（摘要）** | ✅ 用于生成 DAG 摘要 | ✅ 用于 Smart Extraction |
| **安装复杂度** | ⭐ 简单 | ⭐⭐ 中等 |

---

## 与内置模块的对比

### lossless-claw vs 内置 Compaction

| 维度 | 内置 Compaction | lossless-claw |
|------|----------------|---------------|
| 压缩方式 | 替换为**单一摘要** | 多层 DAG 摘要 |
| 信息保留 | 摘要不可逆，**信息丢失** | 全部可逆，可展开 |
| Fresh Tail | ❌ 无 | ✅ 有 |
| 工具调用保留 | 通常丢弃 | 保留结构化信息 |
| 摘要层级 | 1层 | D0/D1/D2... 多层 |
| 搜索能力 | 无 | lcm_grep 跨深度搜索 |
| TUI | ❌ | ✅ Go 交互式界面 |

### memory-lancedb-pro vs 内置 memory（SQLite）

| 维度 | 内置 memory（SQLite） | memory-lancedb-pro |
|------|---------------------|-------------------|
| 检索方式 | 关键词/向量 | **混合检索**（向量+BM25） |
| 重排序 | ❌ | ✅ Cross-Encoder |
| 记忆分类 | ❌ | ✅ 6 类 LLM 分类 |
| 衰减机制 | 简单 | Weibull 衰减 + 晋升/降级 |
| 多作用域 | ❌ | ✅ 5 种作用域 |
| 自优化 | ❌ | ✅ 自我反思体系 |

---

## 最佳实践：组合方案

### 推荐组合一：均衡型（推荐大多数用户）

```
lossless-claw（ContextEngine）
    └── 解决：Compaction 信息丢失，保留完整对话历史
    + memory-lancedb-pro（Memory Plugin）
        └── 解决：长期记忆的精准语义检索
```

**适合场景：** 日常助手、编程 Agent、长对话项目

### 推荐组合二：本地优先型（隐私敏感/离线环境）

```
lossless-claw（ContextEngine，SQLite 本地存储）
    + memory-lancedb-pro（Embedding: Ollama, Rerank: Ollama）
```

**适合场景：** 完全离线、数据不上云、本地部署

### 推荐组合三：成本优化型（使用 manifest 路由）

```
lossless-claw（ContextEngine，摘要用 gpt-4o-mini）
    + memory-lancedb-pro（Embedding: Jina）
    + manifest（LLM 路由，70% 成本节省）
```

**适合场景：** 追求性价比、频繁使用多模型

---

## 一图总结

```
┌─────────────────────────────────────────────────────────────┐
│                     OpenClaw Agent                          │
├─────────────────────────────────────────────────────────────┤
│  memory-lancedb-pro：记忆插件层                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Smart Extraction → 6类分类 → Weibull衰减 → 语义检索 │   │
│  │ 解决的问题：我想找"上次讨论的那个功能"，精准回忆       │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  lossless-claw：上下文引擎层                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ DAG压缩 → 多层摘要 → FreshTail → lcm_grep/expand    │   │
│  │ 解决的问题：对话太长了，之前的细节去哪了？             │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  内置 Compaction（默认启用，作为兜底）                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 单一摘要替换 → 信息不可逆丢失                        │   │
│  │ 兜底机制：即使不装插件，系统也不会崩溃                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 相关文档

- [lossless-claw 使用教程](./lossless-claw%20使用教程.md)
- [memory-lancedb-pro 使用教程](./memory-lancedb-pro%20使用教程.md)
- [manifest 智能路由插件教程](./manifest%20智能路由插件使用教程.md)

---

*🦦 由 OpenClaw 助手生成*
