# Jina Reader

> Jina AI 网页内容提取工具。三种模式：read/search/ground。无 IP 暴露。

## 概述

**评分**: ⭐⭐⭐⭐ (4.284)  
**作者**: Jina AI  
**首页**: https://jina.ai/reader  
**依赖**: `curl`, `jq`

---

## 工作原理

```
用户请求 → 选择模式 (read/search/ground)
         ↓
调用 Jina Reader API
         ↓
返回 markdown/html/text
         ↓
解析并输出
         ↓
自动 IP 保护（经过 Jina 基础设施）
```

### 三种模式

| 模式 | 说明 | 典型场景 |
|------|------|---------|
| `read` | URL → 纯 markdown | 提取公众号文章 |
| `search` | 搜索 + 获取前 5 结果全文 | 全网调研 |
| `ground` | 事实核查（验证声明） | 问答溯源 |

---

## 安装

```bash
clawhub install jina-reader
```

**设置 API Key：**
```bash
export JINA_API_KEY="jina_..."
# 或从 .env 加载
source ~/.openclaw/workspace/.env
```

> 免费额度：10M tokens（无需注册）

---

## 使用方式

### 基本命令

```bash
{baseDir}/scripts/reader.sh "https://example.com/article"
```

### 模式选项

| 标志 | 说明 | 默认值 |
|------|------|--------|
| `--mode` | 模式: `read`, `search`, `ground` | `read` |
| `--selector` | CSS 选择器提取特定区域 | - |
| `--wait` | 等待 CSS 选择器出现 | - |
| `--remove` | 删除元素（逗号分隔） | - |
| `--proxy` | 国家代理: `br`, `us` 等 | - |
| `--nocache` | 强制 fresh 内容 | off |
| `--format` | 输出格式: `markdown`, `html`, `text`, `screenshot` | `markdown` |
| `--json` | 原始 JSON 输出 | off |

---

## 场景示例

### 1. 读取文章内容

```bash
# 提取公众号文章
{baseDir}/scripts/reader.sh "https://mp.weixin.qq.com/s/xxx"

# 提取博客
{baseDir}/scripts/reader.sh "https://blog.example.com/post"
```

### 2. 选择性提取

```bash
# 仅提取文章主体
{baseDir}/scripts/reader.sh --selector "article.main" "https://example.com"

# 移除导航和广告
{baseDir}/scripts/reader.sh --remove "nav,footer,.ads" "https://example.com"
```

### 3. Web 搜索

```bash
# 搜索 + 获取前 5 结果全文
{baseDir}/scripts/reader.sh --mode search "AI enterprise trends 2025"

# JSON 输出
{baseDir}/scripts/reader.sh --mode search --json "latest news"
```

### 4. 事实核查

```bash
# 验证声明
{baseDir}/scripts/reader.sh --mode ground "OpenAI was founded in 2015"

# 核查商业事实
{baseDir}/scripts/reader.sh --mode ground "Tesla is the most valuable car company"
```

### 5. 代理访问

```code
# 巴西代理
{baseDir}/scripts/reader.sh --proxy br "https://example.com.br"
```

---

## 定价

| 模式 | 费用 |
|------|------|
| Read | ~$0.005/页（ReaderLM-v2 3x） |
| Search | 10K tokens 固定 + 结果变量 |
| Ground | ~300K tokens/请求（~30s 延迟） |

> 免费 tier: 10M tokens（无需注册）

---

## 为什么使用？

### 优势

- **IP 保护** — 请求经过 Jina 基础设施，不暴露服务器 IP
- **Clean Markdown** — 可读性提取 + 可选 ReaderLM-v2
- **动态内容** — 无头 Chrome 渲染 JavaScript
- **结构化提取** — 支持 JSON schema 数据提取

### 对比

| 方法 | IP 暴露 | 纯净度 | JS 渲染 | 结构化 |
|------|---------|--------|---------|--------|
| curl 直接请求 | ✅ 是 | ❌ 低 | ❌ 否 | ❌ 否 |
| 浏览器手动 | ❌ 可选 | ✅ 中 | ✅ 是 | ❌ 否 |
| **Jina Reader** | ❌ 否 | ✅ 高 | ✅ 是 | ✅ 是 |

---

## 集成到 OpenClaw

### 作为 Tool 使用

```markdown
When user asks to fetch web content:
1. Use `exec` to call `{baseDir}/scripts/reader.sh "<url>"` or `--mode search "<query>"`
2. Parse output and present clean content to the user
3. For fact-checking, use `--mode ground "<statement>"`
```

### Workflow 示例

```
用户：帮我看看这篇文章讲了什么
→ 使用 reader.sh 提取内容
→ 总结关键点给用户

用户：最近 AI 新闻有哪些
→ 使用 reader.sh --mode search "AI news"
→ 展示前 5 条结果摘要

用户：这个说法是真的吗
→ 使用 reader.sh --mode ground "<statement>"
→ 返回验证结果和来源
```

---

## 相关链接

- [Jina Reader 首页](https://jina.ai/reader)
- [Jina AI](https://jina.ai)
- [GitHub](https://github.com/jina-ai/reader)