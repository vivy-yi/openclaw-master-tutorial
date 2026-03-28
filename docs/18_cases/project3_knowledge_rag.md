# 项目三：个人知识库 RAG - 完整实施指南

本指南将帮助你构建一个可对话的个人知识库，通过自然语言查询存储的信息。

---

## 3.1 项目概述

### 什么是知识库 RAG

知识库 RAG (Retrieval-Augmented Generation) 是一种结合向量检索和 LLM 生成的技术，让 AI 能够基于你的个人知识回答问题。

```
★ Insight ─────────────────────────────────────
为什么需要个人知识库 RAG：
1. 信息过载 - 收藏太多，查找太难
2. 上下文丢失 - 当时理解，现在遗忘
3. 知识孤岛 - 分散在不同平台
4. AI 不了解你 - 需要不断提供背景
─────────────────────────────────────────────────
```

### 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                      知识库 RAG 架构                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📥 输入层                                                           │
│        │                                                           │
│   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│   │ Telegram│ │  微信   │ │  飞书   │ │ Web UI │               │
│   └────────┘  └────────┘  └────────┘  └────────┘               │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    知识捕获引擎                               │   │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │   │
│   │  │ 文本捕获 │  │ 链接抓取 │  │ 文档解析 │  │ 音频转录 │       │   │
│   │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    向量存储层                                 │   │
│   │  ┌─────────────────────────────────────────────────┐       │   │
│   │  │              Chroma / Qdrant / Pinecone          │       │   │
│   │  └─────────────────────────────────────────────────┘       │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    检索引擎                                   │   │
│   │  用户查询 → 向量匹配 → 重排序 → Top-K                        │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    生成引擎                                   │   │
│   │  上下文 + 问题 → LLM → 答案                                  │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   📤 输出：对话式回复                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 支持的输入类型

| 类型 | 示例 | 处理方式 |
|------|------|---------|
| 📝 文本 | "帮我记住..." | 直接存储 |
| 🔗 链接 | URL | 自动抓取内容 |
| 📄 文件 | PDF/DOCX | 提取文本 |
| 💻 代码 | 代码片段 | 语法理解 |
| 📊 表格 | Excel/CSV | 结构化存储 |
| 🖼️ 图片 | 截图/照片 | OCR 提取 |

---

## 3.2 准备工作

### 安装必要工具

```bash
# 安装核心工具
openclaw tools install browser
openclaw tools install file

# 安装向量数据库 (选择一种)
openclaw tools install chromadb      # 本地向量数据库
# 或者
openclaw tools install qdrant        # 可选

# 安装嵌入模型
openclaw tools install embeddings

# 安装文档处理
openclaw tools install pdf-parser
openclaw tools install ocr

# 验证安装
openclaw tools list | grep -E "embed|chroma|browser|file"
```

### 环境配置

```bash
# 设置环境变量
export CHROMA_PERSIST_DIR=~/.openclaw/vector-db
export EMBED_MODEL=bge-base-zh-v1.5
```

---

## 3.3 项目结构

### 创建目录

```bash
mkdir -p ~/openclaw-knowledge/{config,skills,memory,webui}
mkdir -p ~/openclaw-knowledge/memory/{raw,processed,vectors}
```

### 目录结构

```
openclaw-knowledge/
├── config/
│   ├── storage.yaml      # 存储配置
│   ├── embed.yaml        # 嵌入配置
│   ├── retrieval.yaml    # 检索配置
│   └── prompts.yaml      # 提示词配置
├── skills/
│   ├── knowledge-capture.yaml  # 知识捕获
│   ├── knowledge-query.yaml    # 知识查询
│   └── knowledge-manage.yaml   # 知识管理
├── memory/
│   ├── raw/              # 原始内容
│   ├── processed/       # 处理后内容
│   └── vectors/         # 向量数据
├── webui/               # Web UI (可选)
└── knowledge.yaml       # 主配置
```

---

## 3.4 配置文件

### 主配置文件

```yaml
# ~/openclaw-knowledge/knowledge.yaml
name: personal-knowledge-base
version: "1.0"

# 向量存储
storage:
  provider: chromadb
  persist_dir: ~/openclaw-knowledge/memory/vectors

  collection:
    name: personal_knowledge
    metadata:
      owner: user
      created: 2024-01-15

# 嵌入模型
embeddings:
  provider: huggingface
  model: BAAI/bge-base-zh-v1.5
  # 模型: BAAI/bge-small-zh-v1.5 (轻量)

  # 文本处理
  chunk:
    size: 512
    overlap: 50
    split_by: sentence

# 检索配置
retrieval:
  top_k: 5
  similarity_threshold: 0.7

  # 重排序
  rerank:
    enabled: true
    model: cross-encoder

  # 查询处理
  query:
    expand: true
    keywords_weight: 0.3

# 捕获配置
capture:
  auto:
    enabled: true

    # 自动捕获的内容类型
    types:
      - messages      # 对话消息
      - links        # 分享的链接
      - files        # 上传的文件
      - screenshots  # 截图

    # 关键词触发
    trigger_keywords:
      - "记住"
      - "帮我记"
      - "save this"
      - "remember"

  # 手动触发
  manual:
    enabled: true
    command: /remember
```

### 存储配置

```yaml
# config/storage.yaml
storage:
  # 本地存储
  local:
    enabled: true
    base_dir: ~/openclaw-knowledge/memory

    # 文件格式
    format: markdown

    # 元数据
    metadata:
      enabled: true
      fields:
        - source
        - created_at
        - tags
        - importance
        - summary

  # 向量存储
  vector:
    enabled: true
    provider: chromadb

    # Chroma 配置
    chroma:
      persist_directory: ~/openclaw-knowledge/memory/vectors

      # 集合配置
      collection:
        name: knowledge
        metadata:
          hnsw_space: cosine

      # HNSW 参数
      hnsw:
        ef_construction: 200
        M: 16

# 保留策略
retention:
  max_items: 10000

  # 自动摘要
  auto_summarize:
    enabled: true
    threshold: 100  # 超过 100 条后摘要
    frequency: weekly
```

### 检索配置

```yaml
# config/retrieval.yaml
retrieval:
  # 基础设置
  top_k: 5
  similarity_threshold: 0.6

  # 混合检索
  hybrid:
    enabled: true

    # 权重配置
    weights:
      semantic: 0.7    # 向量相似度
      keyword: 0.2    # 关键词匹配
      recency: 0.1    # 时间权重

  # 重排序
  rerank:
    enabled: true
    model: cross-encoder/ms-marco-MiniLM-L-6-v2

    # Top-K 重排
    rerank_top_k: 10

  # 查询扩展
  query_expansion:
    enabled: true

    # 同义词扩展
    synonyms:
      - [AI, 人工智能, LLM]
      - [Python, Python编程]
      - [OpenClaw, OpenClaw助手]

    # 自动补全
    autocomplete: true

  # 时间感知
  time_weight:
    enabled: true

    # 近期的权重更高
    decay_factor: 0.95
    half_life_days: 30
```

### 提示词配置

```yaml
# config/prompts.yaml
prompts:
  # 系统提示
  system: |
    你是一个知识助手，基于用户的个人知识库回答问题。

    原则：
    1. 只使用提供的上下文
    2. 诚实地说"不知道"
    3. 引用具体来源
    4. 保持简洁

  # 用户提示模板
  user_query: |
    问题：{{question}}

    上下文：
    {{context}}

    要求：
    1. 基于上下文回答
    2. 如果没有足够信息，说明"我在知识库中没有找到相关信息"
    3. 引用具体来源

  # 记忆摘要提示
  summarize: |
    请为以下内容生成一个简洁的摘要：

    {{content}}

    要求：
    - 不超过 50 字
    - 保留核心信息
    - 使用中文
```

---

## 3.5 Skill 配置

### 知识捕获 Skill

```yaml
# skills/knowledge-capture.yaml
name: knowledge-capture
description: 捕获并存储知识

trigger:
  # 关键词触发
  keywords:
    - "记住"
    - "帮我记"
    - "save"
    - "remember"

  # 命令触发
  commands:
    - /remember
    - /save

steps:
  # 1. 解析内容
  - name: parse_input
    tool: llm_parse
    prompt: |
      解析用户输入，提取：
      1. 要记忆的内容
      2. 关键标签（可选）
      3. 重要性（1-5）

      用户输入：{{input}}

    output: parsed

  # 2. 处理内容
  - name: process_content
    tool: process_content
    config:
      # 判断内容类型
      detect_type: true

      # 处理 URL
      url:
        fetch: true
        extract_text: true

      # 处理文件
      file:
        parse: true
        ocr_if_image: true

    input: "{{parsed.content}}"
    output: processed

  # 3. 分块
  - name: chunk
    tool: text_chunk
    config:
      chunk_size: 512
      chunk_overlap: 50

    input: "{{processed.text}}"
    output: chunks

  # 4. 生成嵌入
  - name: embed
    tool: embed_text
    model: bge-base-zh-v1.5

    input: "{{chunks}}"
    output: embeddings

  # 5. 存储
  - name: store
    tool: vector_store
    config:
      collection: knowledge

    input:
      chunks: "{{chunks}}"
      embeddings: "{{embeddings}}"
      metadata:
        source: "{{parsed.source}}"
        tags: "{{parsed.tags}}"
        importance: "{{parsed.importance}}"

  # 6. 确认
  - name: confirm
    tool: respond
    template: |
      ✅ 已记住！

      内容：{{content_preview}}
      标签：{{tags}}

      共存储为 {{chunk_count}} 个片段。

# 7. 摘要存储（可选）
  - name: summarize
    tool: llm_summarize
    if: processed.text | length > 1000

    input: "{{processed.text}}"
    output: summary

    # 存储摘要到文件
    tool: file_write
    path: ~/openclaw-knowledge/memory/processed/{{uuid}}.summary.md
    content: "{{summary}}"
```

### 知识查询 Skill

```yaml
# skills/knowledge-query.yaml
name: knowledge-query
description: 查询个人知识库

trigger:
  default: true

steps:
  # 1. 查询向量数据库
  - name: retrieve
    tool: vector_search
    config:
      collection: knowledge
      top_k: 5
      similarity_threshold: 0.6

    query: "{{user_input}}"
    output: results

  # 2. 重排序（如启用）
  - name: rerank
    tool: rerank
    if: config.retrieval.rerank.enabled

    config:
      model: cross-encoder/ms-marco-MiniLM-L-6-v2
      top_k: 3

    input: "{{results}}"
    output: reranked

  # 3. 构建上下文
  - name: build_context
    tool: build_context
    config:
      max_length: 4000

    input: "{{reranked}}"
    output: context

  # 4. 生成答案
  - name: answer
    tool: llm_generate
    model: claude-sonnet-4-20250514

    config:
      system_prompt: |
        你是一个知识助手，基于用户的个人知识库回答问题。

        原则：
        1. 只使用提供的上下文
        2. 诚实地说"不知道"
        3. 引用具体来源
        4. 保持简洁

    input:
      question: "{{user_input}}"
      context: "{{context}}"

    output: answer

  # 5. 返回结果
  - name: respond
    tool: respond

    template: |
      {{answer}}

      ---
      来源：
      {{#each sources}}
      - {{title}} (相关度: {{score}}%)
      {{/each}}
```

### 知识管理 Skill

```yaml
# skills/knowledge-manage.yaml
name: knowledge-manage
description: 管理知识库

commands:
  # 搜索
  - name: search
    trigger: /search
    example: "/search Python 教程"

    steps:
      - name: search
        tool: vector_search
        query: "{{query}}"

      - name: format
        tool: format_results

      - name: respond

  # 列出
  - name: list
    trigger: /list
    example: "/list"

    steps:
      - name: list
        tool: vector_list
        config:
          limit: 20
          sort: created_at:desc

      - name: format
        tool: format_results

      - name: respond

  # 删除
  - name: delete
    trigger: /forget
    example: "/forget <id>"

    steps:
      - name: delete
        tool: vector_delete
        id: "{{id}}"

      - name: respond
        template: "已删除：{{id}}"

  # 统计
  - name: stats
    trigger: /stats

    steps:
      - name: stats
        tool: vector_stats
        collection: knowledge

      - name: respond
        template: |
          📊 知识库统计

          总条目：{{total}}
          总向量：{{vectors}}
          最近添加：{{recent}}
```

---

## 3.6 使用示例

### 基础使用

```bash
# 记住文本
"帮我记住：我现在的密码是 123456"

# 记住链接
"记住这个：https://example.com/article"

# 记住文件
"保存这个文件：/path/to/document.pdf"
```

### 查询使用

```bash
# 自然语言查询
"我的密码是多少？"

# 搜索
"搜索关于 Python 的内容"

# 列出最近
"列出最近保存的内容"
```

### 管理命令

```bash
# 搜索
/search Python

# 查看统计
/stats

# 删除
/forget abc123

# 导出
/export --format markdown
```

---

## 3.7 Web UI (可选)

### 安装 Web UI

```bash
# 使用 OpenClaw WebUI
openclaw webui enable

# 或者使用独立 UI
npm install -g @openclaw/kb-ui
openclaw-kb serve
```

### 配置

```yaml
# config/webui.yaml
webui:
  enabled: true
  host: localhost
  port: 3000

  # 认证
  auth:
    enabled: true
    type: basic
    username: admin
    password: "${KB_UI_PASSWORD}"

  # 功能
  features:
    search: true
    add: true
    edit: true
    delete: true
    export: true

  # 主题
  theme:
    mode: dark
    primary: "#6366f1"
```

### 功能界面

```
┌─────────────────────────────────────────────────────────────────────┐
│                    知识库 Web UI                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🔍 搜索 ────────────────────────────── [搜索框]                   │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│  📚 知识条目                                                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 🔗 https://example.com/article1              2024-01-15     │   │
│  │ 📝 标签: AI, LLM                                     [删除]  │   │
│  │ 摘要：这是一篇关于...                                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 📝 我现在的密码是 123456                      2024-01-14     │   │
│  │ 📝 标签: 密码, 重要                                    [删除]  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│  📊 统计                                                            │
│  总条目: 156  |  本周添加: 23  |  查询次数: 89                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3.8 高级功能

### 自动知识分类

```yaml
# config/autocategorize.yaml
autocategorize:
  enabled: true

  # 分类器
  classifier:
    type: llm

    # 自动标签
    auto_tags:
      - tech
      - personal
      - work
      - learning
      - finance
      - health

  # 关键词映射
  keyword_mapping:
    AI: tech
    LLM: tech
    密码: personal
    会议: work
    学习: learning

  # 重要性判断
  importance:
    # 关键词触发
    keywords:
      important:
        - 密码
        - 账号
        - 重要
        - 关键

      low:
        - todo
        - 稍后
```

### 时间衰减

```yaml
# config/time_decay.yaml
time_decay:
  enabled: true

  # 衰减模型
  model: exponential

  # 半衰期（天）
  half_life: 90

  # 访问增强权重
  boost:
    on_retrieval: 0.1
    on_cite: 0.2
```

### 多模态支持

```yaml
# config/multimodal.yaml
multimodal:
  enabled: true

  # OCR
  ocr:
    enabled: true
    languages: [zh, en]

  # 图像描述
  image_caption:
    enabled: true
    model: llava

  # 表格提取
  table_extraction:
    enabled: true
```

---

## 3.9 故障排除

### 常见问题

```bash
# 问题 1: 向量数据库启动失败
# 解决: 检查依赖和权限
pip install chromadb
chroma --version

# 问题 2: 嵌入模型下载失败
# 解决: 使用代理或本地模型
export HF_ENDPOINT=https://hf-mirror.com

# 问题 3: 内容抓取失败
# 解决: 检查网络和 URL
openclaw tools debug fetch --url https://...
```

### 维护命令

```bash
# 查看统计
openclaw kb stats

# 重建索引
openclaw kb rebuild

# 导出备份
openclaw kb export --format json

# 导入备份
openclaw kb import backup.json
```

---

## 3.10 隐私和安全

### 本地部署

```yaml
# 完全本地化
privacy:
  mode: local_only

  # 不使用任何云服务
  cloud_sync: false
  telemetry: false
```

### 数据加密

```yaml
# 敏感内容加密
security:
  # 自动加密敏感词
  auto_encrypt:
    enabled: true
    keywords:
      - 密码
      - 账号
      - 信用卡
      - 身份证

  # 加密算法
  algorithm: AES-256-GCM

  # 密钥管理
  key_storage: file
  key_path: ~/.openclaw/kb/key
```

---

## 本章小结

1. **向量检索**: ChromaDB + BGE 嵌入
2. **混合搜索**: 向量 + 关键词 + 时间权重
3. **自动捕获**: 消息/链接/文件
4. **对话式查询**: RAG 生成

## 下一步

- 添加更多数据源
- 配置 Web UI
- 设置自动清理规则

---

## 参考资源

- [awesome-openclaw-usecases - Knowledge Base RAG](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/knowledge-base-rag.md)
- [Chroma Documentation](https://docs.trychroma.com/)
- [BGE Embeddings](https://github.com/FlagOpen/FlagEmbedding)
