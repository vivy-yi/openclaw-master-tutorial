# AI 记忆系统横向对比：mem0 vs OpenViking vs Supermemory

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 相关教程：[lossless-claw vs memory-lancedb-pro 对比](./lossless-claw与memory-lancedb-pro对比.md)

---

## 一句话总结

| 项目 | 定位 | 适合场景 |
|------|------|---------|
| **mem0** | 通用型记忆层，支持向量+图谱双轨 | 多智能体/跨平台应用、需要关系推理 |
| **OpenViking** | 上下文数据库，解决 Context 管理全链路 | OpenClaw 多智能体、字节内部技术背景 |
| **Supermemory** | All-in-One 记忆栈（记忆+用户画像+RAG） | AI 应用快速集成、偏向 Claude Code/OpenCode |

---

## 基本信息对比

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **GitHub** | [mem0ai/mem0](https://github.com/mem0ai/mem0) | [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) |
| **Stars** | ⭐ 51.1k | 较新（2026年初） | 增长中 |
| **所属** | mem0ai（独立公司） | ByteDance Volcano Engine Viking 团队 | Supermemory AI |
| **定位** | Universal Memory Layer | Context Database | Memory & Context Layer |
| **论文** | ✅ [arXiv:2504.19413](https://arxiv.org/abs/2504.19413) | ❌ | ❌ |
| **开源协议** | Apache 2.0 | MIT | AGPL（云服务闭源） |
| **云服务** | ✅ Mem0 Platform | ❌ | ✅ Supermemory Cloud |
| **自托管** | ✅ 完整开源 | ✅ 完整开源 | ❌ |

---

## 架构定位对比

```
┌─────────────────────────────────────────────────────────┐
│                      AI Agent                           │
├─────────────────────────────────────────────────────────┤
│  mem0：Universal Memory Layer（通用记忆层）               │
│    → 多向量库 + 多图谱 + 多 Agent 跨平台记忆             │
├─────────────────────────────────────────────────────────┤
│  OpenViking：Context Database（上下文数据库）            │
│    → 统一管理 memory + resources + skills               │
│    → 文件系统范式（viking:// 协议）                      │
├─────────────────────────────────────────────────────────┤
│  Supermemory：All-in-One Context Stack                  │
│    → Memory Engine + User Profiles + RAG + Connectors   │
└─────────────────────────────────────────────────────────┘
```

---

## 核心架构对比

### mem0 — 向量 + 图谱双轨记忆

```
用户对话/内容
    ↓
┌─────────────────────────────┐
│      Mem0 Memory            │
│  ┌───────────┬───────────┐ │
│  │ Vector    │ Graph     │ │
│  │ Store     │ Store     │ │
│  │(Qdrant/   │(Neo4j/    │ │
│  │ Chroma/..)│ AGE)...   │ │
│  └───────────┴───────────┘ │
│        ↓            ↓      │
│   语义相似度    关系推理     │
│   搜索         多跳查询     │
└─────────────────────────────┘
    ↓
Relevant Memories → Agent Context
```

**关键特性：**
- **双存储引擎**：向量库（语义搜索）+ 图谱（关系推理）并行
- **自我进化**（Self-Improving Memory）：从交互中持续学习
- **多级组织**：`user_id` / `agent_id` / `session_id` / `project_id`
- **自适应搜索**：根据查询类型自动选择向量或图谱路径

### OpenViking — 上下文数据库

```
AI Agent（OpenClaw 等）
    ↓
┌──────────────────────────────────────────┐
│         OpenViking Context DB           │
│  ┌────────────────────────────────────┐  │
│  │ Filesystem Paradigm（viking://）   │  │
│  │  ├── memory/     记忆              │  │
│  │  ├── resources/  资源（文档/文件） │  │
│  │  └── skills/     技能/工具         │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ Hybrid Retrieval Engine            │  │
│  │  ├── Dense（向量嵌入）              │  │
│  │  └── Sparse（BM25 全文）          │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ Semantic Parsing Engine（VLM）     │  │
│  │  多模态理解 + 异步提取              │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**关键特性：**
- **Context Database 定位**：不止是向量检索，而是统一的上下文基础设施
- **文件系统范式**：`viking://` 协议抽象，类似文件路径管理记忆
- **多智能体隔离**：OpenClaw 多 Agent/多 Session 共享时不串内存
- **Session 归档 + 异步提取**：上下文快满时触发归档，提取异步进行
- **MCP Server 内置**：开箱即用的 MCP 协议支持

### Supermemory — All-in-One 记忆栈

```
AI Agent / App
    ↓
┌─────────────────────────────────────────────┐
│         Supermemory API                     │
│  ┌───────────────────────────────────────┐ │
│  │ Memory Engine                         │ │
│  │  提取事实 / 追踪更新 / 解决矛盾 /      │ │
│  │  自动遗忘过期信息                       │ │
│  └───────────────────────────────────────┘ │
│  ┌──────────────┐  ┌────────────────────┐  │
│  │ User Profile │  │ Memory Graph       │  │
│  │ 静态+动态画像 │  │ 关系追踪 + 时序     │  │
│  └──────────────┘  └────────────────────┘  │
│  ┌───────────────────────────────────────┐ │
│  │ Hybrid Search（RAG + Memory in one）   │ │
│  │ Cross-Encoder Rerank                   │ │
│  └───────────────────────────────────────┘ │
│  ┌───────────────────────────────────────┐ │
│  │ Connectors（实时同步）                 │ │
│  │ Google Drive / Gmail / Notion / GitHub│ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**关键特性：**
- **一站式**：记忆 + RAG + 用户画像 + 连接器，一个 API 全搞定
- **Memory Graph**：事实抽取 + 关系追踪 + 矛盾检测
- **Connectors**：实时同步外部数据源（Notion/GitHub/Google Drive）
- **遗忘机制**：自动过期遗忘，降低噪声
- **MemoryBench**：自带开源 benchmark 框架（用于对比记忆系统）

---

## 功能详细对比

### 记忆组织

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **向量检索** | ✅ | ✅ Dense + Sparse | ✅ Hybrid |
| **图谱推理** | ✅ Neo4j / Apache AGE | ❌ | ✅ Memory Graph |
| **多跳查询** | ✅（图谱） | ❌ | ✅ |
| **层级组织** | user/agent/session/project | viking:// 文件系统路径 | containerTags |
| **跨 Agent 记忆** | ✅ | ✅（多 Agent 隔离） | ✅ Team Memory |
| **Session 隔离** | ✅ | ✅ | ✅ |

### 记忆生命周期

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **自动抽取** | ✅ | ✅ VLM 异步提取 | ✅ Memory Engine |
| **遗忘机制** | ✅ 手动删除 | ✅（容量/时间策略） | ✅ 自动过期遗忘 |
| **矛盾检测** | ❌ | ❌ | ✅ |
| **自我进化** | ✅ | ❌ | ❌ |
| **时序追踪** | ❌ | ✅ Session Archive | ✅ Memory Graph |

### 检索能力

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **混合检索** | ❌（默认纯向量） | ✅ Dense + Sparse | ✅ |
| **Rerank** | 需自行集成 | 需自行集成 | ✅ Cross-Encoder |
| **多模态检索** | ✅（图片理解） | ✅ VLM | ❌ |
| **MCP 协议** | ❌ | ✅ | ✅ |
| **OpenClaw 插件** | ❌ | ✅ openviking | ❌（有 claude-supermemory / opencode-supermemory） |

### 集成便利性

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **安装难度** | ⭐ 简单（pip/npm） | ⭐⭐ 中等（需部署服务） | ⭐ 简单（API key） |
| **自托管** | ✅ 完整 | ✅ 完整 | ❌ |
| **Vector Store** | Qdrant/Chroma/Pinecone/Weaviate/Milvus/Redis | 内置 | 云服务内置 |
| **依赖外部** | 向量库需自行部署 | 嵌入 API（Volcengine/OpenAI） | 无需额外依赖 |
| **OpenClaw 原生** | ❌ | ✅ ContextEngine | ❌（通过 MCP 间接支持） |

---

## OpenClaw 生态支持

| | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **官方 OpenClaw 插件** | ❌ | ✅ `openviking`（ContextEngine） | ❌ |
| **MCP Server** | ❌ | ✅ | ✅ |
| **Claude Code** | ❌ | ❌ | ✅ claude-supermemory |
| **OpenCode** | ❌ | ❌ | ✅ opencode-supermemory |
| **lossless-claw 叠加** | ✅ 可叠加 | ✅ 可叠加 | ✅ 可叠加 |

---

## 性能基准对比

> 数据来源：Supermemory 官方 [supermemory.ai](https://supermemory.ai/blog/context-memory-guide-ai-systems/)，mem0 论文 arXiv:2504.19413

| 维度 | **mem0** | **OpenViking** | **Supermemory** |
|---|---|---|---|
| **长期记忆检索** | 高 | 高 | 85.4%（LongMemEval-S） |
| **单会话记忆** | 高 | 高 | 92.3% |
| **多跳推理** | ✅（图谱） | ❌ | ✅ |
| **延迟** | 取决于向量库 | <300ms（嵌入式） | <300ms |
| **Benchmarks** | 论文有评估 | 内部评估 | 自建 MemoryBench |

---

## 选择指南

### 选择 mem0 如果：

- ✅ 需要**向量 + 图谱双轨**记忆
- ✅ 需要**跨多个 AI 平台**共享记忆（OpenAI Agent / LangChain / AutoGen / CrewAI）
- ✅ 需要**复杂关系推理**（组织架构、CRM 联系人关系）
- ✅ 有**学术论文**引用需求（mem0 有正式发表）
- ✅ 已有 Neo4j 或其他图谱基础设施

### 选择 OpenViking 如果：

- ✅ 主要使用 **OpenClaw**，需要原生 ContextEngine 支持
- ✅ 需要统一管理 **memory + resources + skills** 三类上下文
- ✅ 需要**多智能体/多 Session 隔离**但不丢上下文
- ✅ 需要**文件系统范式**来组织上下文（类 viking:// 路径）
- ✅ 使用**字节系产品**（豆包/火山引擎）或有 VLM 处理多模态需求
- ✅ 需要**异步 Session 归档**，在大上下文压力下保持响应

### 选择 Supermemory 如果：

- ✅ **快速开发 AI 应用**，想要一个 API 搞定记忆+RAG+用户画像+连接器
- ✅ 需要**Connectors**（Notion / GitHub / Google Drive 实时同步）
- ✅ 使用 **Claude Code**，需要现成的 `claude-supermemory` 插件
- ✅ 需要**用户画像层**（不只是记忆，还需要动态用户状态）
- ✅ 接受**云服务**（数据走 Supermemory 平台）

### 都不选，如果：

- 使用 **OpenClaw** 且追求**最强上下文保留**：直接选 [lossless-claw](./lossless-claw%20使用教程.md)（ContextEngine 级，无损保留）
- 使用 **OpenClaw** 且需要**精准语义检索**：选 [memory-lancedb-pro](./memory-lancedb-pro%20使用教程.md)
- 追求**本地完全自托管**且对中文支持有要求：lossless-claw-enhanced（CJK 修复版）

---

## 三者横向定位图

```
                        通用性 →
                        ┌─────────────┬─────────────┬─────────────┐
                  简单   │             │             │             │
                   ↑     │   mem0      │ Supermemory │             │
                        │  (向量+图谱)  │ (一站式API)  │             │
                        ├─────────────┼─────────────┼─────────────┤
                   中等   │             │             │             │
                        │             │             │  OpenViking  │
                        │             │             │ (Context DB) │
                        ├─────────────┼─────────────┼─────────────┤
                   复杂   │             │             │             │
                        │             │             │             │
                        └─────────────┴─────────────┴─────────────┘
                              记忆检索     全栈方案      上下文管理
                              为核心       快速集成       OpenClaw原生
```

---

## 相关文档

- [lossless-claw vs memory-lancedb-pro 对比](./lossless-claw与memory-lancedb-pro对比.md)
- [memory-lancedb-pro 使用教程](./memory-lancedb-pro%20使用教程.md)
- [lossless-claw 使用教程](./lossless-claw%20使用教程.md)
- [manifest 智能路由插件教程](./manifest%20智能路由插件使用教程.md)

---

*🦦 由 OpenClaw 助手生成*
