# OpenClaw Memory 完整指南

> 本文档详细介绍 OpenClaw 的记忆机制、存储结构、配置选项和最佳实践
> 日期：2026-03-27
> 来源：DM主控对话

---

## 一、记忆机制概述

OpenClaw 的记忆是**纯 Markdown 文件**，文件是唯一真相来源。模型只"记住"写入磁盘的内容。

### 记忆流程

```
用户对话 
   ↓
Agent 处理
   ↓
┌─ 写入 memory/YYYY-MM-DD.md (原始日志)
├─ 更新 MEMORY.md (精选记忆)
└─ 写入 *.sqlite (向量索引)
   ↓
下次对话时：memory_search → 语义检索 → 读取相关记忆
```

---

## 二、记忆文件结构

### 1. 每日日志 (memory/*.md)

| 项目 | 说明 |
|------|------|
| **位置** | `{workspace}/memory/YYYY-MM-DD.md` |
| **性质** | 每日记录（追加模式） |
| **读取时机** | 每次会话启动时读取今天+昨天的日志 |
| **用途** | 日常笔记、运行上下文 |

### 2. 长期记忆 (MEMORY.md)

| 项目 | 说明 |
|------|------|
| **位置** | `{workspace}/MEMORY.md` |
| **性质** | 精选的长期记忆 |
| **读取限制** | 仅在主会话（DM）中加载，**不在群聊中加载** |
| **用途** | 决策、偏好、持久事实 |

### 3. 向量数据库 (*.sqlite)

| 项目 | 说明 |
|------|------|
| **位置** | `/Users/d/.openclaw/memory/` |
| **性质** | SQLite 向量索引 |
| **用途** | 语义搜索（memory_search） |

#### 文件列表

| 文件 | 对应Agent |
|------|-----------|
| main.sqlite | main主控 |
| mo-richang.sqlite | 日常开发 |
| meta-team.sqlite | 元团队 |
| mojian.sqlite | 墨鉴 |
| ... | ... |

---

## 三、记忆工具

OpenClaw 提供两个 agent 工具：

| 工具 | 功能 |
|------|------|
| `memory_search` | 对索引片段进行语义检索 |
| `memory_get` | 按需读取指定 Markdown 文件/行范围 |

### memory_search

语义检索，查找相关笔记，即使措辞不同也能找到。

### memory_get

精准读取，当文件不存在时优雅降级（返回空文本而非报错）。

---

## 四、记忆插件配置

### 1. 默认插件：memory-core

- 本地 SQLite 向量索引
- 自动监听 memory 文件变化

### 2. 可用的远端/高级插件

| 插件 | 说明 |
|------|------|
| **QMD (实验性)** | 本地优先，BM25+向量+重排序 |
| **openai** | OpenAI Embeddings |
| **gemini** | Google Gemini Embeddings |
| **voyage** | Voyage AI Embeddings |
| **mistral** | Mistral Embeddings |
| **ollama** | 本地/自托管 Ollama |
| **local** | 本地 node-llama-cpp |

### 3. 自动选择顺序

如果 `memorySearch.provider` 未设置，OpenClaw 自动选择：
1. `local` - 如果配置了 `memorySearch.local.modelPath`
2. `openai` - 如果有 OpenAI key
3. `gemini` - 如果有 Gemini key
4. `voyage` - 如果有 Voyage key
5. `mistral` - 如果有 Mistral key
6. 否则禁用

### 4. QMD 后端（高级）

#### 功能
- BM25 + 向量混合搜索
- MMR 多样性重排序
- 时间衰减

#### 前置条件
- `memory.backend = "qmd"`
- 安装 QMD CLI：`bun install -g https://github.com/tobi/qmd`
- 本地 SQLite 支持扩展

#### QMD 配置示例

```json5
{
  memory: {
    backend: "qmd",
    qmd: {
      paths: ["/path/to/memory"],
      update: {
        interval: "5m",
        waitForBootSync: false
      },
      searchMode: "qmd search --json"
    }
  }
}
```

---

## 五、自动内存刷新（预压缩）

当会话**接近自动压缩**时，OpenClaw 触发**静默 agentic turn**，提醒模型在上下文压缩前写入持久记忆。

### 配置参数

```json5
{
  agents: {
    defaults: {
      compaction: {
        reserveTokensFloor: 20000,
        memoryFlush: {
          enabled: true,
          softThresholdTokens: 4000,
          systemPrompt: "Session nearing compaction. Store durable memories now.",
          prompt: "Write any lasting notes to memory/YYYY-MM-DD.md; reply with NO_REPLY if nothing to store.",
        },
      },
    },
  },
}
```

### 参数说明

| 参数 | 说明 |
|------|------|
| **reserveTokensFloor** | 保留 token 下限 |
| **softThresholdTokens** | 软阈值 |
| **enabled** | 是否启用 |
| **systemPrompt** | 系统提示词 |
| **prompt** | 提醒提示词 |

### 特点
- **软触发**：当 token 估计值超过 `contextWindow - reserveTokensFloor - softThresholdTokens` 时触发
- **静默**：默认包含 `NO_REPLY`，用户看不到
- **每个压缩周期一次**

---

## 六、什么时候写入记忆

| 类型 | 写入位置 | 说明 |
|------|---------|------|
| **决策、偏好、持久事实** | `MEMORY.md` | 长期记忆 |
| **日常笔记、运行上下文** | `memory/YYYY-MM-DD.md` | 每日日志 |
| **用户说"记住这个"** | 立即写入 | 不要留在 RAM 里 |

### 黄金法则

> 如果想让某事记住，**让 bot 写入 memory**

---

## 七、工作区默认布局

```
~/.openclaw/workspaces/{agent-id}/
├── MEMORY.md           # 长期记忆
├── memory/            # 每日日志
│   └── YYYY-MM-DD.md
├── agents/           # 子Agent
├── docs/             # 文档
├── skills/          # 技能
└── ...
```

---

## 八、配置位置

### 全局配置

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      memorySearch: {
        provider: "openai",  // 或 "gemini", "voyage", "mistral"
        // 需要 API Key
      }
    }
  }
}
```

### 路径
- 配置文件：`~/.openclaw/openclaw.json`
- 状态目录：`~/.openclaw/`
- QMD 状态：`~/.openclaw/agents/<agentId>/qmd/`

---

## 九、最佳实践

### 1. 写入时机
- ✅ 做决策时立即写入
- ✅ 用户说"记住"时写入
- ✅ 每次会话结束时总结

### 2. 内容组织
- ✅ MEMORY.md 只放重要信息
- ✅ memory/YYYY-MM-DD.md 放日常记录
- ❌ 不要把 memory 当聊天日志

### 3. 安全考虑
- ✅ MEMORY.md 仅在 DM 会话中加载
- ❌ 不要在群聊中暴露敏感信息

### 4. 定期整理
- 📅 每日：检查 memory 文件
- 📅 每周：更新 MEMORY.md
- 📅 每月：清理过时内容

---

*文档更新时间: 2026-03-27*
*来源：DM主控对话*
