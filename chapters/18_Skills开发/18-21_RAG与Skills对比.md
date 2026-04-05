# 18-21 RAG 与 Skills 对比

> **学习目标**: 理解 RAG（检索增强生成）与 Skills 的本质区别、互补关系，以及如何选择
> **预计用时**: 30 分钟
> **前置要求**: 熟悉 Skills 基础概念（第18章）

---

## 18.21.1 核心对比

### 一句话总结

| 技术 | 知识形态 | 加载方式 | 适用场景 |
|------|---------|---------|---------|
| **Skills** | 静态 Skill 文件 (SKILL.md) | 启动时加载，一直存在 | 技能型知识（工具使用、流程规范） |
| **RAG** | 动态向量数据库 | 查询时按需检索，临时注入 | 事实型知识（文档检索、问答） |

### 存储与检索对比

```
Skills:
  知识 → 编译成 SKILL.md → 文件系统 (.openclaw/skills/)
                                        ↓
                              Agent 启动时全部加载
                                        ↓
                              上下文窗口（始终可用）

RAG:
  知识 → 向量化 → 向量数据库 (ChromaDB/FAISS/Qdrant)
                                        ↓
                              查询时按需检索
                                        ↓
                              临时注入上下文（按需获取）
```

---

## 18.21.2 本质区别详解

### Skills 的特征

```
✅ 静态编译
   → SKILL.md 在 Agent 启动时就加载完毕
   → 不管用不用，所有知识都在上下文里

✅ 文件系统存储
   → .openclaw/skills/my-skill/SKILL.md
   → 人工可读可编辑

✅ 全文匹配 / 关键词触发
   → 根据触发词匹配 Skill
   → 无语义理解

✅ 适合：高频、标准化、可预测的知识
   例如："如何创建 Git PR"、"安全边界是什么"
```

### RAG 的特征

```
✅ 动态检索
   → 每次查询时从向量数据库拉取相关内容
   → 只把最相关的片段注入上下文

✅ 向量数据库存储
   → ChromaDB / FAISS / Qdrant / Pinecone
   → 机器可读，人工难直接理解

✅ 语义相似度检索
   → 根据向量距离找相关内容
   → 理解语义，不只是关键词

✅ 适合：海量、事实型、需要推理的知识
   例如："Swift 5.9 的新特性有哪些"、"WWDC 2024 Session 101 讲了什么"
```

---

## 18.21.3 打个比方

```
Skills = 把一本书的精华全部手写进大脑
         → 随时可用，但大脑容量有限（上下文窗口）

RAG = 图书馆 + 图书管理员
       → 每次问答时去图书馆查资料
       → 知识量大，但每次都要检索
```

### 具体场景对比

| 场景 | 用 Skills | 用 RAG |
|------|----------|-------|
| "帮我写一个 Git PR 创建流程" | ✅ 完美 | ❌ 太过精确 |
| "iOS 17 的新 API 有哪些" | ❌ 信息量太大存不下 | ✅ 完美 |
| "这个命令报错了怎么办" | ✅ 常见错误模式可以存 | ⚠️ 看具体错误 |
| "分析一下这个代码库的结构" | ❌ 知识太庞杂 | ✅ 按需检索各部分 |

---

## 18.21.4 两者如何互补

### 架构上的互补关系

```
外部文档（网站/GitHub/PDF）
        │
        ├──→ Skill_Seekers ──→ SKILL.md ──→ Agent 启动时加载
        │                                    （Agent "记住"了这些知识）
        │
        └──→ RAG Pipeline ──→ 向量索引 ──→ Agent 运行时查询
                                           （Agent "查资料"获取上下文）
```

### Apple 开发者场景示例

```
WWDC 视频 / 文档 / PPT
        │
        ├──→ Skill_Seekers ──→ Apple Dev Skill (SKILL.md)
        │                        → Agent 常用 API/工具（肌肉记忆）
        │                        → "如何用 Xcode 构建项目"
        │
        └──→ RAG Pipeline ──→ Apple Dev RAG (MCP 服务)
                                 → 查细节/版本变更/新特性（参考资料）
                                 → "SwiftUI 5.0 相比 4.0 有什么变化"
```

### 决策树：什么时候用哪个？

```
知识的使用频率如何？
├── 高频（每次任务都可能用到）
│   └── → Skills（肌肉记忆）
│
├── 低频但需要准确（偶尔查一下）
│   └── → RAG（参考资料）
│
└── 非常量化的信息（版本号、API 参数）
    └── → RAG（向量检索更精准）
```

---

## 18.21.5 Google Vertex AI RAG Engine

### 是什么

Google Cloud 的**全托管 RAG 服务**，是 Vertex AI 平台的一个组件。

### 核心组件

| 组件 | 功能 |
|------|------|
| **RagCorpus** | 创建和管理 RAG 知识库 |
| **RagFile** | 上传文档（PDF/HTML/TXT/DOCX） |
| **RagEngine** | 管理检索 + 生成管线 |
| **Vertex AI Embedding API** | 文本向量化（text-embedding-005） |
| **Vertex AI Gemini** | 生成（配合检索结果） |
| **Re-ranking** | 内置重排提升相关性 |

### 支持的功能

- ✅ 全托管（Google 帮你管 embedding model + vector store）
- ✅ LLM parser（自动解析文档结构）
- ✅ Hybrid search
- ✅ RAG Playground（可实验）
- ✅ 企业级安全和合规

### 文档链接

```
https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview
```

---

## 18.21.6 相关 Skills 推荐

### ClawHub RAG 相关 Skills

#### 完整流水线型

| Skill | 评分 | 定位 |
|-------|------|------|
| `rag-search` | 3.495 | RAG 语义搜索 |
| `rag-construction` | 3.408 | 建筑行业 RAG（chunking 策略最完整） |
| `rag-system-builder` | 3.326 | 本地 RAG 系统（FAISS 向量存储） |
| `rag-ingest` | 3.322 | 文档摄入流水线 |
| `rag-pipelines` | 3.227 | RAG 管线编排 |
| `rag-evaluator` | 3.183 | RAG 质量评估 |

#### 与 OpenClaw 集成型

| Skill | 定位 |
|-------|------|
| **ClawRAG Connector** | 连接 OpenClaw → 自托管 ClawRAG（Docker 部署，混合搜索，MCP 传输） |
| **zhangdw156_openclaw-rag-skill** | OpenClaw 本地 RAG → ChromaDB 语义存储，索引 sessions/workspace/docs |
| **hk101-living-rag** | Living RAG（动态更新） |

#### 向量存储连接型

| Skill | 向量 DB |
|-------|--------|
| `shared-pinecone-rag` | Pinecone |
| `memory-qdrant` | Qdrant |
| `openclaw-memory-qdrant` | Qdrant |
| `openclaw-semantic-memory` | 语义记忆 |

### RAG-MCP 开源项目

| 项目 | 技术栈 | 定位 |
|------|-------|------|
| **alejandro-ao/RAG-MCP** | FastMCP + ChromaDB | 标准 RAG MCP Server |
| **coleam00/mcp-crawl4ai-rag** | Crawl4AI + Supabase + MCP | 网页抓取 + 私有 RAG（Better than Context7） |

### 搜索命令

```bash
clawhub search rag
clawhub search vector
clawhub search knowledge-distillation
```

---

## 18.21.7 Apple 开发者场景的最优组合

```
WWDC 视频 ──→ skill-seekers video_scraper
Apple 文档 ──→ skill-seekers doc_scraper
WWDC PPT   ──→ skill-seekers pptx_scraper
                │
                ↓
           内容块（chunking）
                │
                ├──→ 向量化 (bge-m3 / voyageai)
                │
                ↓
           Qdrant / ChromaDB
                │
                ↓
           MCP Server (FastMCP)
                │
                ↓
           OpenClaw Agent 调用 query() 工具
```

### 推荐工具链

| 层级 | 推荐方案 |
|------|---------|
| **RAG 层** | `mcp-crawl4ai-rag`（抓取）或 `alejandro-ao/RAG-MCP`（ChromaDB） |
| **Skill 层** | `rag-system-builder`（本地 FAISS）或 `ClawRAG`（完整托管） |
| **Embedding** | `bge-m3` 或 `voyageai`（多语言支持好） |
| **向量存储** | Qdrant（metadata filter 支持好） |

---

## 18.21.8 核心原则总结

```
Skill_Seekers = "把知识编译成 Agent 能直接使用的技能"（静态，装进 Skill）
RAG-MCP       = "把知识存入可检索的知识库，Agent 运行时查询"（动态，按需获取）

两者完全不冲突，是互补关系：

高频工具/流程  → Skills（肌肉记忆）
海量事实/文档  → RAG（参考资料）
```

---

## 相关章节

- [18-18 知识蒸馏](./18-18_知识蒸馏.md) — 知识→Skills 方法论
- [18-20 Skill_Seekers 深度解析](./18-20_Skill_Seekers深度解析.md) — 文档→Skills 流水线
- [18-19 Skills 创建工具全景](./18-19_Skills创建工具全景.md) — 工具链全图
