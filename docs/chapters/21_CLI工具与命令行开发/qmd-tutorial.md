# QMD 本地文档搜索引警完全指南

>QMD (Query Markup Documents) 是一个运行在本地的 AI 搜索引警，专为需要记忆 Everything you need to remember 而设计。支持 markdown 笔记、会议记录、文档、知识库的语义搜索，结合 BM25 全文搜索 + 向量语义搜索 + LLM 重新排序，全部通过 node-llama-cpp 本地运行 GGUF 模型。

**核心特性：**
- 🔍 混合搜索：关键词 + 语义 + LLM 重新排序
- 🤖 本地运行：无需 API，完全离线
- 🔌 MCP 服务器：支持 Claude Desktop / Claude Code
- 📦 SDK 库：可嵌入 Node.js/Bun 应用

---

## 1. 安装

```sh
# Node.js
npm install -g @tobilu/qmd

# 或 Bun
bun install -g @tobilu/qmd

# 直接运行
npx @tobilu/qmd ...
```

验证安装：
```sh
qmd --version
```

---

## 2. 创建集合

```sh
# 为笔记创建集合
qmd collection add ~/notes --name notes

# 为文档创建集合
qmd collection add ~/Documents/meetings --name meetings
qmd collection add ~/work/docs --name docs

# 查看所有集合
qmd collection list
```

### 添加上下文提示

上下文帮助搜索时选择更好的文档：
```sh
qmd context add qmd://notes "Personal notes and ideas"
qmd context add qmd://meetings "Meeting transcripts and notes"
qmd context add qmd://docs "Work documentation"
```

---

## 3. 生成嵌入

```sh
# 为所有集合生成语义嵌入
qmd embed

# 查看索引状态
qmd status
```

---

## 4. 三种搜索模式

| 模式 | 命令 | 特点 |
|------|------|------|
| 关键词 | `qmd search "API"` | 快速精确 |
| 语义 | `qmd vsearch "how to deploy"` | 理解语义 |
| 混合 | `qmd query "quarterly planning"` | 最佳质量 |

```sh
# 快速关键词搜索
qmd search "API"

# 语义向量搜索
qmd vsearch "authentication flow"

# 混合搜索 + 重新排序（最高质量）
qmd query "error handling best practices"

# 限制结果数量
qmd query "project" -n 5

# 搜索特定集合
qmd search "API" -c notes
```

---

## 5. 获取文档内容

```sh
# 按路径获取
qmd get "meetings/2024-01-15.md"

# 按 docid 获取
qmd get "#abc123"

# 批量获取
qmd multi-get "journals/2025-05*.md"

# 获取完整内容
qmd get "docs/api-reference.md" --full
```

---

## 6. MCP 服务器集成

QMD 提供 MCP 服务器，可与 Claude Desktop、Claude Code 深度集成。

### Claude Desktop 配置

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "qmd": {
      "command": "qmd",
      "args": ["mcp"]
    }
  }
}
```

### Claude Code 配置

```bash
# 安装插件
claude plugin marketplace add tobi/qmd
claude plugin install qmd@qmd
```

或手动配置 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "qmd": {
      "command": "qmd",
      "args": ["mcp"]
    }
  }
}
```

### MCP 工具

集成后提供以下工具：
- `query` — 混合搜索（支持 lex/vec/hyde 子查询）
- `get` — 按路径或 docid 获取文档
- `multi_get` — 批量获取
- `status` — 索引健康状态

---

## 7. HTTP 服务器模式

默认 MCP 使用 stdio，每次启动需加载模型。使用 HTTP 模式可共享长期运行的服务器：

```sh
# 前台运行
qmd mcp --http                    # localhost:8181
qmd mcp --http --port 8080       # 自定义端口

# 后台守护进程
qmd mcp --http --daemon          # 启动，写入 PID 到 ~/.cache/qmd/mcp.pid
qmd mcp stop                     # 停止
qmd status                       # 查看状态
```

HTTP 端点：
- `POST /mcp` — MCP Streamable HTTP
- `GET /health` — 健康检查

---

## 8. AI Agent 集成

### JSON 输出

```sh
# 为 LLM 获取结构化结果
qmd search "authentication" --json -n 10

# 导出所有匹配文件
qmd query "error handling" --all --files --min-score 0.4
```

### 典型工作流

```sh
#!/bin/bash
# agent-search.sh - Agent 搜索工作流

QUERY="$1"
MIN_SCORE="${2:-0.3}"

RESULTS=$(qmd query "$QUERY" --json -n 10 --min-score $MIN_SCORE)

echo "$RESULTS" | jq -r '.[] | "\(.title) (\(.score * 100 | floor)%)"'
```

---

## 9. SDK 库使用

### 安装

```sh
npm install @tobilu/qmd
```

### 基本用法

```typescript
import { createStore } from '@tobilu/qmd'

// 创建索引
const store = await createStore({
  dbPath: './my-index.sqlite',
  config: {
    collections: {
      docs: { path: '/path/to/docs', pattern: '**/*.md' },
    },
  },
})

// 搜索
const results = await store.search({ query: "authentication flow" })
console.log(results.map(r => `${r.title} (${Math.round(r.score * 100)}%)`))

await store.close()
```

### 三种创建模式

```typescript
import { createStore } from '@tobilu/qmd'

// 1. 内联配置
const store1 = await createStore({
  dbPath: './index.sqlite',
  config: {
    collections: {
      docs: { path: '/path/to/docs' },
    },
  },
})

// 2. YAML 配置文件
const store2 = await createStore({
  dbPath: './index.sqlite',
  configPath: './qmd.yml',
})

// 3. 仅数据库（重新打开已有索引）
const store3 = await createStore({ dbPath: './index.sqlite' })
```

---

## 10. 配置选项

### 默认模型

在 `src/llm.ts` 中配置：

```typescript
const DEFAULT_EMBED_MODEL = "hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf";
const DEFAULT_RERANK_MODEL = "hf:ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF/qwen3-reranker-0.6b-q8_0.gguf";
const DEFAULT_GENERATE_MODEL = "hf:tobil/qmd-query-expansion-1.7B-gguf/qmd-query-expansion-1.7b-q4_k_m.gguf";
```

### 搜索策略

| 策略 | 说明 |
|------|------|
| `auto` | 自动选择（默认） |
| `regex` | 正则分块 |
| `tree-sitter` | 代码结构感知 |
| `chunk` | 固定分块 |

```sh
qmd embed --chunk-strategy auto
```

---

## 11. 典型应用场景

### 个人知识管理

```sh
# 索引笔记和文章
qmd collection add ~/notes --name notes
qmd collection add ~/Documents/articles --name articles
qmd embed

# 语义搜索
qmd vsearch "我之前读过关于..."
```

### 会议记录搜索

```sh
qmd collection add ~/meetings --name meetings
qmd context add qmd::meetings "Meeting transcripts"
qmd embed

# 查找特定主题的会议
qmd query "AI strategy discussion"
```

### 代码文档搜索

```sh
qmd collection add ~/project/docs --name docs
qmd embed --chunk-strategy tree-sitter

# 搜索 API 文档
qmd query "authentication API endpoint"
```

### AI Agent 工作流

```sh
# 在 Agent 中使用
qmd query "project context" --json -n 5 --files
```

---

## 12. 常见问题

### 内存不足？

减少模型量化或使用更小的模型：
```sh
# 使用 Q4_K_M 量化
export QMD_EMBED_MODEL="hf:...-Q4_K_M.gguf"
```

### 索引重建

```sh
# 删除索引并重新嵌入
rm ~/.local/share/qmd/*.sqlite
qmd embed
```

### 查看状态

```sh
qmd status
qmd collection list
```

---

## 相关资源

- GitHub: https://github.com/tobi/qmd
- Star: ⭐ 19,792+
- License: MIT