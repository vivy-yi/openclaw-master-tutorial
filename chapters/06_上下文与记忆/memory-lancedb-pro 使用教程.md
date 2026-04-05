# memory-lancedb-pro 使用教程

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 项目地址：[CortexReach/memory-lancedb-pro](https://github.com/CortexReach/memory-lancedb-pro)
> 最新版本：v1.1.0-beta.10（适配 OpenClaw 2026.3+）

---

## 什么是 memory-lancedb-pro？

`memory-lancedb-pro` 是 OpenClaw 的**增强版 LanceDB 内存插件**，专为生产环境设计，相比内置 SQLite 内存，它提供了更强大的检索能力：

| 特性 | 内置内存 | memory-lancedb-pro |
|------|---------|-------------------|
| 检索方式 | 关键词/向量 | **混合检索**（向量 + BM25） |
| 重排序 | ❌ | ✅ Cross-Encoder Rerank |
| 记忆分层 | ❌ | ✅ L0/L1/L2 三层抽象 |
| 生命周期 | 简单 | **Weibull 衰减** + 自动晋升/降级 |
| 知识抽取 | ❌ | ✅ LLM 智能分类（6类） |
| 多作用域 | ❌ | ✅ 全局/Agent/项目/用户隔离 |
| 自优化 | ❌ | ✅ 自我反思 + 经验技能化 |

---

## 安装

### 方式一：稳定版

```bash
openclaw plugins install memory-lancedb-pro
```

### 方式二：Beta 版（含最新功能）

```bash
npm install memory-lancedb-pro@beta
```

### 升级后修复配置

```bash
openclaw doctor --fix
```

---

## 基础配置

在 `~/.openclaw/openclaw.json` 中的 `plugins.entries` 下添加：

```json
{
  "memory-lancedb-pro": {
    "enabled": true,
    "embedding": {
      "provider": "jina",
      "apiKey": "${JINA_API_KEY}",
      "model": "jina-embeddings-v5-text-small",
      "baseURL": "https://api.jina.ai/v1",
      "dimensions": 1024,
      "taskQuery": "retrieval.query",
      "taskPassage": "retrieval.passage",
      "normalized": true
    },
    "dbPath": "~/.openclaw/memory/lancedb-pro",
    "autoCapture": true,
    "autoRecall": true
  }
}
```

### Embedding 提供商对比

| 提供商 | 配置难度 | 费用 | 备注 |
|--------|---------|------|------|
| **Jina**（推荐） | ⭐ 简单 | 低成本 | 默认选择，支持 normalised embeddings |
| OpenAI | ⭐ 简单 | 中等 | `text-embedding-3-small` |
| Voyage AI | ⭐ 简单 | 中等 | 支持多语言 |
| Ollama（本地） | ⭐⭐ 中等 | 免费 | 需自行部署，支持 GGUF |
| SiliconFlow | ⭐⭐ 中等 | 低成本 | 国内可用 |

---

## 混合检索配置

### 基本混合检索

```json
{
  "retrieval": {
    "mode": "hybrid",
    "vectorWeight": 0.7,
    "bm25Weight": 0.3,
    "minScore": 0.3
  }
}
```

**评分融合公式**（RRF - Reciprocal Rank Fusion）：
```
finalScore = (vectorScore × 0.7) + (bm25Score × 0.3)
```

### 启用 Cross-Encoder 重排序

```json
{
  "retrieval": {
    "rerank": {
      "mode": "cross-encoder",
      "rerankProvider": "jina",
      "rerankApiKey": "${JINA_API_KEY}",
      "rerankModel": "jina-reranker-v3",
      "rerankEndpoint": "https://api.jina.ai/v1/rerank",
      "candidatePoolSize": 20
    }
  }
}
```

**检索 pipeline**：RRF 融合 → Cross-Encoder 重排序 → 生命周期衰减 → 长度归一化 → 最低分过滤 → MMR 多样性

### BM25 关键词保护

BM25 得分 ≥ 0.75 的结果**绕过语义过滤**，适合保护 API Key、票据号等精确字符串：

```json
{
  "filterNoise": true,
  "lengthNormAnchor": 500,
  "hardMinScore": 0.35
}
```

---

## 智能抽取（Smart Extraction）

LLM 驱动的 6 类自动分类，存入 L0/L1/L2 三层结构：

| 类别 | 说明 | 存储层级 |
|------|------|---------|
| `fact` | 事实/知识 | Abstract / Overview / Full |
| `preference` | 用户偏好 | Abstract / Overview / Full |
| `entity` | 实体（人/事/物） | Abstract / Overview / Full |
| `decision` | 决策/事件 | Abstract / Overview / Full |
| `pattern` | 行为模式 | Abstract / Overview / Full |
| `other` | 其他 | Abstract / Full |

### 两阶段去重

1. **向量预过滤** — 相似度 ≥ 0.7 的候选进入 LLM 决策
2. **LLM 决策** — `CREATE | MERGE | SKIP | SUPPORT | CONTEXTUALIZE | CONTRADICT`

### 配置示例

```json
{
  "smartExtraction": true,
  "llm": {
    "provider": "openai",
    "apiKey": "${OPENAI_API_KEY}",
    "model": "gpt-4o-mini",
    "baseURL": "https://api.openai.com/v1",
    "extractMinMessages": 2,
    "extractMaxChars": 8000
  }
}
```

---

## 记忆生命周期（Weibull 衰减）

三层衰减模型，自动晋升/降级：

| 层级 | β 值 | 衰减速度 | 最低分 | 适用 |
|------|------|---------|--------|------|
| **Core** | 0.8 | 最慢 | 0.9 | 核心事实、长期偏好 |
| **Working** | 1.0 | 中等 | 0.7 | 项目上下文、当前任务 |
| **Peripheral** | 1.3 | 最快 | 0.5 | 边缘信息、偶发事件 |

### 综合评分权重

```
综合分 = Recency(40%) + Frequency(30%) + Intrinsic(30%)
```

### 访问强化

被频繁召回的记忆衰减更慢：

```json
{
  "recencyHalfLifeDays": 14,
  "recencyWeight": 0.1,
  "timeDecayHalfLifeDays": 60,
  "reinforcementFactor": 0.5,
  "maxHalfLifeMultiplier": 3
}
```

---

## 多作用域隔离（Multi-Scope）

支持 `global`、`agent:`、`custom:`、`project:`、`user:` 等多种作用域：

```json
{
  "scopes": {
    "default": "global",
    "definitions": {
      "global": {
        "description": "Shared knowledge"
      },
      "agent:discord-bot": {
        "description": "Discord bot private",
        "agentAccess": ["discord-bot", "global"]
      }
    }
  }
}
```

### 访问控制

多作用域 Agent 可通过 `agentAccess` 映射访问多个作用域：

```json
{
  "agent:discord-bot": {
    "agentAccess": ["discord-bot", "global"]
  }
}
```

### 禁用内存

如需完全禁用：

```json
{
  "plugins": {
    "slots": {
      "memory": "none"
    }
  }
}
```

---

## MCP 工具（9个）

### 核心工具（自动注册）

| 工具 | 说明 |
|------|------|
| `memory_recall` | 召回相关记忆 |
| `memory_store` | 存储新记忆 |
| `memory_forget` | 删除记忆 |
| `memory_update` | 更新记忆 |

### 管理工具（需开启）

```json
{ "enableManagementTools": true }
```

| 工具 | 说明 |
|------|------|
| `memory_stats` | 查看记忆统计 |
| `memory_list` | 列出记忆列表 |

### 自我优化工具（需开启）

```json
{ "selfImprovement": { "enabled": true } }
```

| 工具 | 说明 |
|------|------|
| `self_improvement_log` | 记录学习/错误 |
| `self_improvement_extract_skill` | 提取为技能 |
| `self_improvement_review` | 复盘审核 |

---

## 自我优化治理（Self-Improvement Governance）

### 学习/错误文档

- `LEARNINGS.md` — 记录成功经验，ID 格式：`LRN-YYYYMMDD-XXX`
- `ERRORS.md` — 记录失败教训，ID 格式：`ERR-YYYYMMDD-XXX`

### 条目生命周期

```
pending → resolved → promoted_to_skill
```

### 自动化学技能脚手架

从 `LEARNINGS.md` 条目自动生成 Skill 文件。

---

## CLI 管理命令

完整覆盖所有 `openclaw memory-pro` 子命令：

```bash
# 列出记忆
openclaw memory-pro list --scope global --limit 20

# 搜索记忆
openclaw memory-pro search "关键词" --scope global --limit 10

# 查看统计
openclaw memory-pro stats --scope global

# 导出记忆
openclaw memory-pro export --scope global --output memories.json

# 导入记忆
openclaw memory-pro import memories.json --scope global --dry-run

# 删除单条
openclaw memory-pro delete <memory-id>

# 批量删除
openclaw memory-pro delete-bulk --scope global --pattern "关键词"

# 重建索引
openclaw memory-pro reembed --scope global --force

# 检查更新
openclaw memory-pro upgrade --dry-run

# 迁移自旧版 memory-lancedb
openclaw memory-pro migrate check --source /path/to/memory-lancedb
```

---

## 会话记忆（Session Memory）

短窗口内的对话上下文自动存入记忆：

```json
{
  "sessionMemory": {
    "enabled": true,
    "messageCount": 15,
    "smartExtraction": true
  }
}
```

---

## 本地部署（Ollama）

适合希望**完全本地运行**的用户：

```bash
# 1. 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. 拉取 embedding 模型
ollama pull nomic-embed-text

# 3. 拉取 rerank 模型（可选）
ollama pull llama3

# 4. 配置使用 Ollama
{
  "embedding": {
    "provider": "ollama",
    "model": "nomic-embed-text",
    "baseURL": "http://localhost:11434"
  }
}
```

---

## 完整配置示例

```json
{
  "memory-lancedb-pro": {
    "enabled": true,
    "dbPath": "~/.openclaw/memory/lancedb-pro",
    "autoCapture": true,
    "autoRecall": true,
    "embedding": {
      "provider": "jina",
      "apiKey": "${JINA_API_KEY}",
      "model": "jina-embeddings-v5-text-small",
      "baseURL": "https://api.jina.ai/v1",
      "dimensions": 1024,
      "normalized": true
    },
    "retrieval": {
      "mode": "hybrid",
      "vectorWeight": 0.7,
      "bm25Weight": 0.3,
      "minScore": 0.3,
      "rerank": {
        "mode": "cross-encoder",
        "rerankProvider": "jina",
        "rerankApiKey": "${JINA_API_KEY}",
        "rerankModel": "jina-reranker-v3",
        "rerankEndpoint": "https://api.jina.ai/v1/rerank",
        "candidatePoolSize": 20
      },
      "recencyHalfLifeDays": 14,
      "recencyWeight": 0.1,
      "filterNoise": true,
      "hardMinScore": 0.35
    },
    "scopes": {
      "default": "global",
      "definitions": {
        "global": { "description": "Shared knowledge" }
      }
    },
    "sessionMemory": {
      "enabled": false,
      "messageCount": 15,
      "smartExtraction": true
    },
    "smartExtraction": true,
    "llm": {
      "apiKey": "${OPENAI_API_KEY}",
      "model": "gpt-4o-mini"
    },
    "enableManagementTools": false
  }
}
```

---

## 常见问题

### Q: 检索结果不准确？

1. 检查 `minScore` 和 `hardMinScore` 是否设得太高
2. 确认 BM25 权重——关键词明确时适当提高 `bm25Weight`
3. 启用重排序（rerank）提升精度

### Q: 记忆重复/冗余？

开启 `smartExtraction` 的两阶段去重，或手动执行：
```bash
openclaw memory-pro delete-bulk --pattern "重复内容"
```

### Q: 如何迁移自内置内存？

```bash
openclaw memory-pro migrate check --source ~/.openclaw/memory/default
```

### Q: API Key 安全吗？

推荐使用 `${ENV_VAR}` 语法引用环境变量，避免明文写入配置。

---

## 相关资源

- [GitHub 仓库](https://github.com/CortexReach/memory-lancedb-pro)
- [memory-lancedb-pro-skill](https://github.com/CortexReach/memory-lancedb-pro-skill) — Claude Code 专用 Skill
- [LanceDB 官方博客：OpenClaw Memory](https://lancedb.com/blog/openclaw-memory-from-zero-to-lancedb-pro/)
- [OpenClaw Issues #33750](https://github.com/openclaw/openclaw/issues/33750)

---

## 与 lossless-claw 的区别

详见专项对比文档：[lossless-claw vs memory-lancedb-pro 对比](./lossless-claw与memory-lancedb-pro对比.md)

---

*🦦 由 OpenClaw 助手生成 | 项目作者：CortexReach*
