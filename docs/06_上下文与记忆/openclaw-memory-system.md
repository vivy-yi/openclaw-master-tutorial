# OpenClaw 完全指南：人格架构和记忆系统

> 📖 来源：[知乎 - OpenClaw 完全指南](https://zhuanlan.zhihu.com/p/2015027745743189513)  
> ✍️ 作者：ConardLi（code秘密花园）  
> ⭐ 评分：⭐⭐⭐⭐⭐  
> 📅 采集日期：2026-07-20

---

## 八、OpenClaw 的人格架构和记忆系统

### 8.1 记忆系统架构

OpenClaw 的记忆系统是多层次的，旨在让 AI Agent 拥有"持久化智能"：

```
┌─────────────────────────────────────────────────┐
│              OpenClaw Memory System              │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Session Memory（会话记忆）               │   │
│  │  - 当前对话上下文                        │   │
│  │  - 自动管理，过期清除                     │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Short-term Memory（短期记忆）            │   │
│  │  - 跨会话但有 TTL                        │   │
│  │  - 用户偏好、最近交互                     │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Long-term Memory（长期记忆）             │   │
│  │  - 持久化存储                            │   │
│  │  - 重要事实、用户档案                    │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Knowledge Base（知识库）                │   │
│  │  - RAG 向量存储                         │   │
│  │  - 外部文档检索                          │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 8.2 会话记忆（Session Memory）

每次对话开始时，OpenClaw 会自动加载：

1. **系统提示词（System Prompt）** - 定义 AI 的人设和行为
2. **用户画像（User Profile）** - 从长期记忆中提取用户关键信息
3. **最近对话摘要** - 最近 N 条对话的核心内容

### 8.3 长期记忆管理

#### 记忆存储

```yaml
memory:
  provider: sqlite  # sqlite, postgres, etc.
  path: ~/.openclaw/memory.db
```

#### 记忆分类标签

```yaml
memory:
  categories:
    - user_preferences   # 用户偏好
    - user_facts        # 用户事实
    - user_goals        # 用户目标
    - interaction_history # 交互历史
```

#### 记忆操作命令

```bash
# 查看当前记忆状态
openclaw memory status

# 搜索记忆
openclaw memory search "用户的工作"

# 写入记忆
openclaw memory write --category user_facts --content "用户是一名 Python 开发者"

# 删除记忆
openclaw memory delete <memory-id>
```

### 8.4 人格配置（Persona）

通过 SOUL.md 配置 AI 人格：

```markdown
# SOUL.md - AI 人格定义

## 角色设定
- 名称：智能助手
- 性格：友好、专业、耐心
- 语言风格：简洁明了，适当使用 emoji

## 专业领域
- 编程开发
- 系统运维
- AI 技术咨询

## 行为准则
- 保护用户隐私
- 拒绝有害请求
- 主动学习用户偏好
```

### 8.5 RAG 知识检索

#### 添加知识文档

```bash
# 添加本地文档到知识库
openclaw rag add ./my-docs/

# 添加单个文件
openclaw rag add ./readme.pdf

# 同步到向量数据库
openclaw rag sync
```

#### RAG 配置

```yaml
rag:
  enabled: true
  vectorStore:
    provider: qdrant  # qdrant, chroma, etc.
    url: http://localhost:6333
  chunkSize: 512
  chunkOverlap: 50
  topK: 5  # 检索返回的最相关文档数
```

#### 检索测试

```bash
# 测试知识检索
openclaw rag query "如何配置 OpenClaw 的定时任务？"
```

### 8.6 上下文窗口管理

#### 上下文压缩策略

```yaml
context:
  maxTokens: 128000  # 最大上下文 token 数
  compression:
    enabled: true
    strategy: summarize  # summarize | truncate
    summaryTrigger: 0.8  # 80% 时触发压缩
```

#### 对话摘要

```yaml
context:
  summary:
    enabled: true
    interval: 10  # 每 N 轮对话生成摘要
    keepRecent: 5  # 保留最近 N 条原始对话
```

### 8.7 记忆安全与隐私

```yaml
memory:
  encryption:
    enabled: true
    keyRef: file:///etc/openclaw/.memkey
  
  privacy:
    anonymize: true
    excludeCategories:
      - passwords
      - api_keys
```

---

## 相关资源

- 🔗 原文链接：[OpenClaw 完全指南 - 知乎](https://zhuanlan.zhihu.com/p/2015027745743189513)
- 📖 [认识 OpenClaw](../01_认识openclaw/openclaw-complete-guide-overview.md)
- 🔧 [架构详解](../architect-guide/README.md)

---

*本文档由墨客自动采集整理，遵循原文 CC BY-SA 协议*
