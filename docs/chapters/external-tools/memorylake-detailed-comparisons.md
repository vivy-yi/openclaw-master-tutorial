# MemoryLake 产品对比维度完整报告

来源: https://www.memorylake.ai/en/products/compare

---

## 1. vs Supermemory

| Feature | Supermemory | MemoryLake |
|---------|-------------|-----------|
| Core focus | Context engineering for agents | Memory infrastructure for AI systems |
| Memory scope | User context + RAG + profiles | 6 typed memory categories with governance |
| Cross-model portability | Limited — tied to the app surface you build | Portable across ChatGPT, Claude, Qwen, and any LLM |
| Memory versioning | Not clearly surfaced | Git-like history, branching, rollback |
| Provenance & traceability | Partial graph context | Source-level provenance for every memory |
| Multimodal ingestion | Text, files, images, audio, video | Text, documents, spreadsheets, images, audio, video, database, APIs |
| Conflict handling | Dedup and overwrite | Automatic conflict detection + structured resolution |
| Accuracy (LoCoMo) | 81.6% overall on LoCoMo | 94.03% overall (Single-hop 95.71%, Multi-hop 89.38%, Temporal 95.47%) |
| Enterprise controls | API-led, enterprise plan available | SOC 2, ISO 27001, GDPR, CCPA + customer-controlled data |
| Best fit | Fast developer shipping | Durable cross-AI memory operations |

---

## 2. vs Mem0

| Feature | Mem0 | MemoryLake |
|---------|-----|-----------|
| Memory Architecture | Vector-based memory storage with user/session/agent scoping | Structured memory lake with 6 typed categories, vector index, and temporal index |
| Memory Types | Untyped memories with user, session, and agent level scoping | 6 distinct types: Background, Factual, Event, Conversation, Action, Reflection |
| Cross-Platform Support | Supports multiple LLMs via API (OpenAI, Anthropic, etc.) | Supports ChatGPT, Claude, Qwen, and any LLM via API integration |
| Memory Versioning | No git-like versioning. Memories can be updated and deleted | Git-like versioning with full history, branching, and rollback capabilities |
| Conflict Detection | Basic deduplication. No structured conflict resolution system | Automatic conflict detection and resolution when memories contradict each other |
| Accuracy (LoCoMo) | 91.6% overall on LoCoMo | 94.03% overall accuracy (Single-hop: 95.71%, Multi-hop: 89.38%, Temporal: 95.47%) |
| Multi-hop Reasoning | Similarity-based retrieval. Multi-hop reasoning depends on the consuming LLM | Built-in multi-hop reasoning across related memories via MemoryLake-D1 engine |
| Enterprise Compliance | SOC2 compliant (managed platform). Self-hosted option available | SOC2, ISO 27001, GDPR, and CCPA compliant with customer-controlled data |
| Data Sources | Text input via API. Focused on conversation-derived memories | Conversations, documents, databases, APIs, and third-party data sources |
| Pricing Model | Open-source (self-hosted free). Managed platform with usage-based pricing | Free tier available. Usage-based pricing for production workloads |

---

## 3. vs Zep

| Feature | Zep | MemoryLake |
|---------|-----|-----------|
| Memory model | Temporal knowledge graph of facts and entities | 6 typed memory categories: background, factual, event, conversation, action, reflection |
| Portability | Tied to Zep APIs and graph schema | Portable across ChatGPT, Claude, Qwen, and any LLM |
| Versioning | Temporal edges, but no Git-like branching | Full Git-like history, branching, and rollback |
| Provenance | Edges timestamped; source-level provenance limited | Source-level provenance on every memory record |
| Multimodal | Primarily text / chat-derived facts | Text, documents, spreadsheets, images, audio, video, databases, APIs |
| Conflict handling | Time-based edge invalidation | Automatic conflict detection + structured resolution |
| Accuracy (LoCoMo) | Partial benchmark claims, varies by config | 94.03% overall (Single-hop 95.71%, Multi-hop 89.38%, Temporal 95.47%) |
| Enterprise controls | SOC 2 Type II, SSO, role controls | SOC 2, ISO 27001, GDPR, CCPA + customer-controlled data |
| Deployment | Cloud + open core community edition | Cloud managed with customer-controlled deployment options |
| Best fit | LLM apps needing long-term chat memory | Durable, portable memory across AI systems |

---

## 4. vs Letta (MemGPT)

| Feature | Letta | MemoryLake |
|---------|------|-----------|
| Memory scope | Per-agent context window with archival tier | Cross-agent, cross-model memory lake |
| Memory model | Core + archival + recall, managed by the agent | 6 structured types + provenance + versioning |
| Portability | Bound to the Letta agent runtime | Portable across ChatGPT, Claude, Qwen, any LLM |
| Versioning | Not a first-class feature | Git-like history, branching, rollback |
| Provenance | Implicit via agent logs | Source-level provenance per record |
| Accuracy (LoCoMo) | 74% overall on LoCoMo | 94.03% overall on LoCoMo |
| Multimodal | Text-centric context | Text, docs, tables, images, audio, video, DBs, APIs |
| Enterprise controls | Open-core + cloud options | SOC 2, ISO 27001, GDPR, CCPA |
| Deployment | Self-hosted or Letta cloud | Managed with customer-controlled data |
| Best fit | Stateful single-agent research and prototyping | Durable cross-agent memory in production |

---

## 5. vs LangChain

| Feature | LangChain | MemoryLake |
|---------|----------|-----------|
| Primary purpose | Orchestration framework for LLM apps | Long-term AI memory infrastructure |
| Memory scope | Short-term buffers, window/history memory | 6 typed long-term memory categories |
| Versioning | None natively | Git-like history, branching, rollback |
| Provenance | Depends on integrations | Source-level provenance on every memory |
| Accuracy (LoCoMo) | Not applicable — not a memory system | 94.03% overall on LoCoMo |
| Multimodal ingestion | Via loaders; depends on user code | Native text, docs, tables, images, audio, video, DBs, APIs |
| Conflict handling | Application-level code | Automatic conflict detection + resolution |
| Governance | Depends on host infra | SOC 2, ISO 27001, GDPR, CCPA + customer-controlled data |
| Works with LangChain? | — | Yes — integrates as the memory tier |
| Best fit | Composing chains, agents, tools, RAG | Durable cross-session, cross-model memory |

---

## 6. vs ChatGPT Memory

| Feature | ChatGPT Memory | MemoryLake |
|---------|--------------|-----------|
| Memory Architecture | Key-value store of user preferences and facts learned during conversations | Structured memory lake with 6 typed memory categories, vector index, and temporal index |
| Memory Types | Single unstructured type: flat list of remembered facts | 6 distinct types: Background, Factual, Event, Conversation, Action, Reflection |
| Cross-Platform Support | ChatGPT only (OpenAI ecosystem). Memory does not transfer to other LLMs | Works with ChatGPT, Claude, Qwen, and any LLM via API integration |
| Memory Versioning | No versioning. Memories can be viewed and deleted but not tracked over time | Git-like versioning with full history, branching, and rollback capabilities |
| Conflict Detection | No conflict detection. Contradictory memories can coexist without resolution | Automatic conflict detection and resolution when memories contradict each other |
| Accuracy (LoCoMo) | No published benchmark results on LoCoMo | 94.03% overall accuracy (Single-hop: 95.71%, Multi-hop: 89.38%, Temporal: 95.47%) |
| Multi-hop Reasoning | Limited to single-fact recall from stored memories | Multi-hop reasoning across related memories via MemoryLake-D1 engine |
| Enterprise Compliance | SOC2 compliant (ChatGPT Enterprise). Memory data subject to OpenAI policies | SOC2, ISO 27001, GDPR, and CCPA compliant with customer-controlled data |
| Data Sources | Chat conversations only. No external data source integration | Conversations, documents, databases, APIs, and third-party data sources |
| Pricing Model | Included with ChatGPT Plus ($20/mo), Team ($25/user/mo), or Enterprise | Free tier available. Usage-based pricing for production workloads |

---

## 7. vs Claude Memory

| Feature | Claude Memory | MemoryLake |
|---------|-----------|-----------|
| Memory Architecture | User preferences and project-level instructions stored as flat context | Structured memory lake with 6 typed categories, vector index, and temporal index |
| Memory Types | Single type: user preferences and project knowledge | 6 distinct types: Background, Factual, Event, Conversation, Action, Reflection |
| Cross-Platform Support | Anthropic ecosystem only. Memory does not transfer to other LLMs | Works with ChatGPT, Claude, Qwen, and any LLM via API integration |
| Memory Versioning | No versioning. Project instructions can be edited but history is not tracked | Git-like versioning with full history, branching, and rollback capabilities |
| Conflict Detection | No automatic conflict detection between stored preferences | Automatic conflict detection and resolution when memories contradict each other |
| Accuracy (LoCoMo) | No published benchmark results on LoCoMo | 94.03% overall accuracy (Single-hop: 95.71%, Multi-hop: 89.38%, Temporal: 95.47%) |
| Multi-hop Reasoning | Strong in-context reasoning, but memory recall is limited to stored preferences | Multi-hop reasoning across related memories via MemoryLake-D1 engine |
| Enterprise Compliance | SOC2 compliant. Data handling per Anthropic usage policies | SOC2, ISO 27001, GDPR, and CCPA compliant with customer-controlled data |
| Data Sources | Chat conversations and project-level documents (via Projects feature) | Conversations, documents, databases, APIs, and third-party data sources |
| Pricing Model | Included with Claude Pro ($20/mo), Team ($25/user/mo), or Enterprise | Free tier available. Usage-based pricing for production workloads |

---

## 8. vs Google Memory Bank

| Feature | Google Gemini Memory | MemoryLake |
|---------|-------------------|-----------|
| Memory Architecture | Conversation history and user preferences stored within Gemini's context system | Structured memory lake with 6 typed categories, vector index, and temporal index |
| Memory Types | Single type: remembered facts and preferences from conversations | 6 distinct types: Background, Factual, Event, Conversation, Action, Reflection |
| Cross-Platform Support | Google ecosystem only (Gemini). Does not work with other LLMs | Works with ChatGPT, Claude, Qwen, and any LLM via API integration |
| Memory Versioning | No versioning. Users can view and delete saved memories | Git-like versioning with full history, branching, and rollback capabilities |
| Conflict Detection | No structured conflict detection between stored facts | Automatic conflict detection and resolution when memories contradict each other |
| Accuracy (LoCoMo) | No published LoCoMo benchmark results | 94.03% overall accuracy (Single-hop: 95.71%, Multi-hop: 89.38%, Temporal: 95.47%) |
| Multi-hop Reasoning | Gemini's reasoning applies to in-context information; memory is basic fact recall | Built-in multi-hop reasoning across related memories via MemoryLake-D1 engine |
| Enterprise Compliance | Google Cloud compliance applies (SOC2, ISO 27001, etc.) for Workspace users | SOC2, ISO 27001, GDPR, and CCPA compliant with customer-controlled data |
| API Access | Limited standalone memory API. Memory is part of Gemini's broader interface | Dedicated memory API designed for programmatic integration and automation |
| Pricing Model | Included with Gemini Advanced ($19.99/mo) or Google Workspace plans | Free tier available. Usage-based pricing for production workloads |

---

## 9. vs Pinecone

| Feature | Pinecone | MemoryLake |
|---------|----------|
| Primary purpose | Vector database for similarity search | AI memory system of record |
| Memory model | Vectors + metadata | 6 typed memory categories with provenance |
| Retrieval | ANN similarity search | Hybrid vector + temporal + structured |
| Versioning | Namespaces, not memory history | Git-like history, branching, rollback |
| Provenance | Metadata you maintain | Source-level provenance per memory |
| Ingestion | You bring embeddings and metadata | Native text, docs, tables, images, audio, video, DBs, APIs |
| Conflict handling | Up to your app | Automatic detection + resolution |
| Accuracy (LoCoMo) | Not applicable — retrieval only | 94.03% overall on LoCoMo |
| Works with vector DBs? | — | Yes — MemoryLake can use Pinecone or other vector indexes |
| Best fit | RAG and similarity search at scale | Durable AI memory across models and agents |

---

## 10. vs Cognee

| Feature | Cognee | MemoryLake |
|---------|--------|
| Primary Focus | Knowledge graph construction and structured knowledge extraction from documents | Full memory lifecycle: ingestion, classification, versioning, retrieval, and reasoning |
| Architecture | ECL pipeline (Extract, Cognify, Load) for building knowledge graphs | Structured memory lake with 6 typed categories, vector index, and temporal index |
| Memory Types | Knowledge graph nodes and edges. No predefined memory type taxonomy | 6 distinct types: Background, Factual, Event, Conversation, Action, Reflection |
| Cross-Platform Support | Python SDK. Can be integrated with various LLMs | Works with ChatGPT, Claude, Qwen, and any LLM via API integration |
| Memory Versioning | No git-like versioning for knowledge graph state | Git-like versioning with full history, branching, and rollback capabilities |
| Conflict Detection | No structured conflict detection in knowledge graph entries | Automatic conflict detection and resolution when memories contradict each other |
| Accuracy (LoCoMo) | No published LoCoMo benchmark results | 94.03% overall accuracy (Single-hop: 95.71%, Multi-hop: 89.38%, Temporal: 95.47%) |
| Multi-hop Reasoning | Graph traversal enables some multi-hop queries over extracted knowledge | Built-in multi-hop reasoning across related memories via MemoryLake-D1 engine |
| Enterprise Compliance | Early-stage enterprise offering. Compliance certifications not widely published | SOC2, ISO 27001, GDPR, and CCPA compliant with customer-controlled data |
| Pricing Model | Open-source (Apache 2.0). Enterprise pricing available | Free tier available. Usage-based pricing for production workloads |

---

## 11. vs Memos

| Feature | Memos | MemoryLake |
|---------|--------|
| Primary purpose | Open-source notes platform | AI memory infrastructure |
| Memory model | Flat notes with tags | 6 typed memory categories |
| AI reasoning | Not a memory system for LLMs | Built for multi-hop and temporal reasoning |
| Versioning | Basic note edits | Git-like history, branching, rollback |
| Provenance | Per-note timestamps | Source-level provenance per record |
| Multimodal | Text-centric with attachments | Text, docs, tables, images, audio, video, DBs, APIs |
| Accuracy (LoCoMo) | Not applicable | 94.03% overall on LoCoMo |
| Enterprise controls | Self-hosted, limited out-of-box governance | SOC 2, ISO 27001, GDPR, CCPA |
| API surface | Notes CRUD + tags | Memory CRUD + retrieval + provenance + versioning |
| Best fit | Personal or team note-taking | Durable AI memory across products and agents |

---

## 12. vs Evermind

| Feature | Evermind | MemoryLake |
|---------|----------|
| Core focus | Memory OS for AI agents | AI memory infrastructure across products and agents |
| Scope | Agent-centric memory behind a single OS surface | Shared, governed memory across users, agents, and products |
| Memory model | Agent memory with OS-managed context | 6 structured memory types: background, factual, event, conversation, action, reflection |
| Portability | Works through the Evermind Memory OS | Portable across ChatGPT, Claude, Qwen, and any LLM |
| Versioning | Not a first-class feature | Git-like history, branching, rollback |
| Provenance | OS-level metadata | Source-level provenance per memory record |
| Multimodal ingestion | Text-centric with attachments | Text, docs, spreadsheets, images, audio, video, DBs, APIs |
| Accuracy (LoCoMo) | 93.05% overall on LoCoMo | 94.03% overall (Single-hop 95.71%, Multi-hop 89.38%, Temporal 95.47%) |
| Enterprise controls | Agent-focused, limited out-of-box governance | SOC 2, ISO 27001, GDPR, CCPA + customer-controlled data |
| Best fit | Agent runtimes needing a memory OS layer | Durable AI memory infrastructure across products and agents |

---

## 13. vs Mem

| Feature | Mem | MemoryLake |
|---------|-----|-----------|
| Target user | End users building a personal AI notebook | Product and platform teams building AI |
| Scope | Single-user memory inside the app | Shared, governed memory across users, agents, products |
| Memory model | Notes graph with AI-suggested links | 6 structured memory types with provenance |
| Versioning | Note edits only | Git-like history, branching, rollback |
| Provenance | Note-level metadata | Source-level provenance per record |
| Multimodal | Text + some attachments | Text, docs, tables, images, audio, video, DBs, APIs |
| Accuracy (LoCoMo) | Not published | 94.03% overall on LoCoMo |
| Enterprise controls | Consumer-first | SOC 2, ISO 27001, GDPR, CCPA |
| API / SDK | Primarily an end-user product | First-class API, SDKs, and MCP integrations |
| Best fit | Personal AI note-taking | Durable AI memory for products |

---

## 14. vs Dume

| Feature | Dume | MemoryLake |
|---------|-----|-----------|
| Primary purpose | Lightweight memory API | AI memory infrastructure |
| Memory model | Untyped user facts | 6 typed memory categories |
| Versioning | Not a first-class feature | Git-like history, branching, rollback |
| Provenance | Basic metadata | Source-level provenance per record |
| Multimodal ingestion | Primarily text | Text, docs, tables, images, audio, video, DBs, APIs |
| Conflict handling | Manual or overwrite | Automatic conflict detection + resolution |
| Accuracy (LoCoMo) | Not published | 94.03% overall on LoCoMo |
| Enterprise controls | Limited | SOC 2, ISO 27001, GDPR, CCPA |
| Portability | Tied to the Dume API surface | Portable across any LLM and agent framework |
| Best fit | Prototyping personalization quickly | Durable AI memory across products and agents |

---

## 15. 核心对比维度总结

### 关键对比指标汇总

| 维度 | MemoryLake 优势 |
|------|-------------|
| **记忆类型** | 6种类型：Background, Factual, Event, Conversation, Action, Reflection |
| **跨平台** | ✅ 唯一跨平台 (ChatGPT, Claude, Qwen, 任何LLM) |
| **版本控制** | Git-like history, branching, rollback |
| **冲突检测** | 自动冲突检测 + 结构化解决 |
| **准确性** | 94.03% overall on LoCoMo |
| **多跳推理** | 内置 MemoryLake-D1 引擎 |
| **合规** | SOC2, ISO 27001, GDPR, CCPA |
| **来源追踪** | 每个记忆记录有源级来源 |

### 准确率排名 (LoCoMo)

| 排名 | 产品 | LoCoMo 准确率 |
|------|------|-------------|
| 1 | **MemoryLake** | 94.03% |
| 2 | Evermind | 93.05% |
| 3 | Mem0 | 91.6% |
| 4 | Supermemory | 81.6% |
| 5 | Letta | 74% |

---

*数据来源: https://www.memorylake.ai/en/products/compare*
*抓取日期: 2026-05-02*
---

# AI Memory 系统维度与治理体系分析

---

## 一、核心维度体系

### 1. 记忆架构维度

| 维度 | 说明 | 关键选项 |
|------|------|----------|
| **存储模型** | 底层数据结构 | Vector-only, 知识图谱, 结构化湖, 分层 OS-style |
| **记忆类型** | 分类方式 | 无类型, 6种类型, 按作用域分 |
| **索引策略** | 检索加速 | 向量索引, 时序索引, 混合索引 |

**记忆类型分类参考 (MemoryLake 6类)**:
- Background (背景知识)
- Factual (事实)
- Event (事件)
- Conversation (对话)
- Action (行动)
- Reflection (反思)

---

### 2. 记忆生命周期维度

| 阶段 | 治理要点 |
|------|----------|
| **Ingestion 摄取** | 数据源验证, 格式转换, 去重 |
| **Storage 存储** | 保留策略, 过期策略, 加密 |
| **Update 更新** | 版本控制, 变更记录 |
| **Deletion 删除** | 软删除/硬删除, GDPR 删除权 |

---

### 3. 记忆作用域维度

| 作用域 | 说明 |
|--------|------|
| User | 用户级偏好和事实 |
| Session | 会话级上下文 |
| Agent | 代理级知识 |
| System | 系统级配置 |

---

### 4. 检索与推理维度

| 能力 | 说明 |
|------|------|
| **相似性检索** | ANN 向量搜索 |
| **多跳推理** | 跨记忆关联推理 |
| **时序推理** | 时间线上的记忆推理 |
| **混合检索** | 向量 + 结构化 + 时序 |

---

### 5. 准确性维度 (Benchmarks)

| Benchmark | 评估内容 |
|-----------|----------|
| **LoCoMo** | 长期记忆 + 多会话 + 时序 |
| **LongMemEval** | 记忆召回 + QA |
| **DMR** | 深度记忆检索 |

**当前排名参考**:
| 产品 | LoCoMo 准确率 |
|------|-------------|
| MemoryLake | 94.03% |
| Evermind | 93.05% |
| Mem0 | 91.6% |
| Supermemory | 81.6% |
| Letta | 74% |

---

## 二、治理体系

### 1. 版本控制治理

| 功能 | 说明 | 必要性 |
|------|------|--------|
| **Git-like 版本** | 完整历史, 分支, 回滚 | ⭐⭐⭐ 企业必备 |
| **变更追踪** | 谁改了什么, 何时 | ⭐⭐⭐ 企业必备 |
| **软删除** | 可恢复 | ⭐⭐ 可选 |

---

### 2. 来源追踪治理 (Provenance)

| 维度 | 说明 |
|------|------|
| **源级来源** | 每个记忆记录可追溯到原始数据 |
| **时间戳** | 创建/更新时间 |
| **血缘关系** | 记忆演化的完整链路 |

---

### 3. 冲突处理治理

| 级别 | 方案 |
|------|------|
| **基础** | 去重 |
| **中级** | 冲突检测 |
| **高级** | 自动冲突解决 + 结构化解决 |

---

### 4. 跨平台治理

| 维度 | 说明 |
|------|------|
| **多模型支持** | ChatGPT, Claude, Qwen, 任何 LLM |
| **可移植性** | 记忆跨平台导出/导入 |
| **API 抽象** | 标准化接口 |

---

### 5. 企业合规治理

| 合规标准 | 说明 |
|----------|------|
| **SOC 2** | 安全可用性 |
| **ISO 27001** | 信息安全管理 |
| **GDPR** | 欧盟数据隐私 |
| **CCPA** | 加州消费者隐私 |
| **客户数据控制** | 数据自主控制权 |

---

### 6. 多模态摄取治理

| 数据类型 | 说明 |
|----------|------|
| Text | 文本对话 |
| Documents | 文档 (PDF, Word) |
| Spreadsheets | 表格数据 |
| Images | 图片 |
| Audio/Video | 音视频 |
| Databases | 数据库 |
| APIs | 第三方 API |

---

## 三、维度对照表

| 维度 | 初级方案 | 中级方案 | 企业级方案 |
|------|---------|---------|----------|
| 记忆类型 | 无类型 | 3-4种 | 6种+ |
| 版本控制 | 无 | 基础变更记录 | Git-like 全史 |
| 冲突处理 | 手动 | 自动检测 | 自动解决 |
| 来源追溯 | 无 | 部分 | 完整源级 |
| 跨平台 | 单一 | 2-3个 | 任意 |
| 合规 | 无 | SOC2 | 全合规 |
| 多模态 | 文本 | +文档 | 全部 |

---

## 四、构建建议

### 最小可行 Memory (MVP)
- [ ] 向量存储 (Pinecone / 自建)
- [ ] 基础版本控制
- [ ] 冲突检测
- [ ] 基础 CRUD API

### Production Ready
- [ ] 6种记忆类型
- [ ] Git-like 版本 + 分支
- [ ] 自动冲突解决
- [ ] 完整来源追踪
- [ ] 多模型支持
- [ ] SOC2 合规

### Enterprise
- [ ] 全合规 (SOC2 + ISO + GDPR + CCPA)
- [ ] 客户数据控制
- [ ] 审计日志
- [ ] 多租户隔离
- [ ] SLO 保障

