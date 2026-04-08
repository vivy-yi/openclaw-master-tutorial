# OpenCLI 全面解析与使用教程

> 📅 更新时间：2026-03-29
> 🔗 项目：https://github.com/jackwener/opencli
> ⭐ Stars：8,351（TypeScript）
> 🦀 opencli-rs：https://github.com/nashsu/opencli-rs（921 ⭐，Rust 版）

---

## 什么是 OpenCLI？

### 1. 项目定位

```
┌─────────────────────────────────────────────────────────────────┐
│                  OpenCLI - 通用 CLI Hub                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Make Any Website & Tool Your CLI                               │
│                                                                  │
│  让任意网站、Electron 应用、本地工具变成 CLI                    │
│                                                                  │
│  ✅ 复用浏览器登录态    ✅ 无 API Key                    │
│  ✅ AI Agent 原生支持   ✅ 反爬虫检测内置                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. 核心价值

| 价值 | 说明 |
|------|------|
| **零成本** | 运行时无 Token 消耗，执行 10000 次也免费 |
| **确定性** | 相同命令，相同输出格式，可管道、脚本化 |
| **广泛覆盖** | 50+ 平台（Twitter、Reddit、B站、知乎、小红书等） |
| **AI Agent 原生** | 内置 explore、synthesize、cascade 工具发现 |

---

## Why OpenCLI？（7W2H 解析）

> OpenCLI 属于 **Website → CLI** 类型，即通过浏览器自动化将网站操作转化为 CLI 命令。

### Why - 为什么需要 OpenCLI？

### Why - 为什么需要 OpenCLI？

```
痛点：
┌─────────────────────────────────────────────────────────────────┐
│  ❌ 每次爬数据都要写爬虫                                         │
│  ❌ AI Agent 难以可靠地操作网站                                  │
│  ❌ 各平台 API 需要申请 Key，维护成本高                          │
│  ❌ 反爬虫机制越来越严                                           │
└─────────────────────────────────────────────────────────────────┘

OpenCLI 解决方案：
┌─────────────────────────────────────────────────────────────────┐
│  ✅ 复用浏览器登录态，凭证不离开浏览器                           │
│  ✅ 确定性输出，AI Agent 可直接解析                               │
│  ✅ 内置 50+ 平台适配器，开箱即用                                │
│  ✅ 反检测内置（navigator.webdriver 补丁等）                    │
└─────────────────────────────────────────────────────────────────┘
```

### What - OpenCLI 是什么？

```
OpenCLI = 浏览器自动化 + CLI Hub + AI Agent 工具发现

┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  浏览器自动化   │    │   CLI Hub     │    │  工具发现     │
│  (CDP 协议)   │ +  │  (统一入口)   │ +  │ (explore)    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             ▼
                    ┌───────────────┐
                    │  opencli     │
                    │  命令行工具   │
                    └───────────────┘
```

### Who - 谁在用 OpenCLI？

| 用户类型 | 使用场景 |
|----------|----------|
| **AI Agent** | 自动发现网站能力，执行操作 |
| **爬虫工程师** | 快速获取数据，无需写爬虫 |
| **开发者** | 自动化网站操作，集成到脚本 |
| **内容创作者** | 采集多平台内容 |
| **运营人员** | 批量管理社交媒体账号 |

### When - 什么时候用？

```
┌─────────────────────────────────────────────────────────────────┐
│                        使用时机                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ 定时数据采集（opencli bilibili hot）                        │
│  ✅ AI Agent 需要可靠操作网站（explore + synthesize）            │
│  ✅ 快速原型验证（不需要写爬虫）                                 │
│  ✅ 多平台内容聚合（piping 到其他工具）                         │
│                                                                  │
│  ❌ 大规模爬虫（用 Crawl4AI、Scrapy）                          │
│  ❌ 未知网站探索（用 Browser-Use、Stagehand）                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Where - 在哪里用？

```bash
# 本地终端
opencli twitter trending --limit 10

# CI/CD 脚本
opencli bilibili hot -f json | jq '.data[0].title'

# AI Agent (Claude Code, OpenClaw)
opencli list  # Agent 自动发现可用工具
opencli explore https://example.com

# 管道操作
opencli hackernews top -f json | jq '.[] | {title, url}'
```

### How - 如何工作？

```
┌─────────────────────────────────────────────────────────────────┐
│                     工作原理                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Browser Bridge Extension                                    │
│     Chrome 扩展 + 微守护进程（零配置，自动启动）                  │
│                                                                  │
│  2. CDP 协议通信                                                │
│     通过 Chrome DevTools Protocol 控制浏览器                      │
│                                                                  │
│  3. 适配器层                                                    │
│     50+ 平台适配器（YAML/TypeScript）                           │
│                                                                  │
│  4. CLI Hub                                                    │
│     注册本地 CLI（gh, docker, lark-cli 等）                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

架构图：

┌─────────────────────────────────────────────────────────────────┐
│                        opencli CLI                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Built-in │  │ External │  │Electron  │  │Plugin    │      │
│  │ Commands │  │   Hub    │  │  Apps    │  │ System   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │              │
│       └─────────────┴─────────────┴─────────────┘              │
│                             │                                   │
│                    ┌────────┴────────┐                        │
│                    │   Adapter Layer  │                        │
│                    │  (YAML/TypeScript)                        │
│                    └────────┬────────┘                        │
│                             │                                   │
│                    ┌────────┴────────┐                        │
│                    │ Browser Bridge   │                        │
│                    │   Extension    │                        │
│                    └────────┬────────┘                        │
│                             │                                   │
│                    ┌────────┴────────┐                        │
│                    │  Chrome Browser  │                        │
│                    │  (登录态复用)   │                        │
│                    └────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### How Much - 成本多少？

| 成本项 | OpenCLI | 其他方案 |
|--------|---------|----------|
| **Token 消耗** | 零 | Browser-Use 等每次调用消耗 |
| **API Key** | 不需要 | Twitter API 等需要付费 |
| **维护成本** | 低（适配器已内置） | 高（自己写爬虫） |
| **学习成本** | 低 | 高 |

---

## 核心功能详解

### 1. 内置命令（50+ 平台）

| 平台 | 命令示例 | 内容类型 |
|------|----------|----------|
| **xiaohongshu** | `search`, `user`, `download` | 笔记、用户、评论 |
| **bilibili** | `hot`, `search`, `download` | 视频、评论、动态 |
| **twitter/X** | `trending`, `search`, `timeline` | 推文、媒体 |
| **reddit** | `hot`, `frontpage`, `search` | 帖子、评论 |
| **hackernews** | `top`, `new`, `ask` | 文章、问答 |
| **zhihu** | `hot`, `search`, `article` | 文章、回答 |
| **youtube** | `search`, `trending` | 视频信息 |

### 2. CLI Hub（外部工具集成）

```bash
# GitHub CLI
opencli gh pr list --limit 5

# Docker
opencli docker ps

# 飞书 CLI
opencli lark-cli calendar +agenda

# Google Workspace
opencli gws drive list

# Vercel
opencli vercel deploy --prod

# 注册自己的 CLI
opencli register mycli
```

### 3. Electron 桌面应用控制

| 应用 | 功能 |
|------|------|
| **Cursor** | Composer、Chat、代码提取 |
| **Codex** | Headless 控制 OpenAI Codex |
| **Antigravity** | 控制 Antigravity Ultra |
| **ChatGPT** | 自动化 macOS ChatGPT |
| **Discord** | 消息、频道、服务器管理 |
| **Doubao** | 控制豆包 AI 桌面应用 |

### 4. AI Agent 工具

```bash
# 探索网站能力
opencli explore https://example.com --site mysite

# 生成适配器
opencli synthesize mysite

# 自动探测认证策略
opencli cascade https://api.example.com/data

# 一站式：探索→合成→注册
opencli generate https://example.com --goal "hot"
```

---

## 安装与配置

### 1. 安装步骤

```bash
# Step 1: 安装 Browser Bridge Extension
# - 下载 opencli-extension.zip from Releases
# - 解压后 chrome://extensions 加载

# Step 2: 安装 OpenCLI
npm install -g @jackwener/opencli

# Step 3: 验证
opencli doctor
```

### 2. 快速使用

```bash
# 列出所有命令
opencli list

# 公开 API（无需浏览器）
opencli hackernews top --limit 5
opencli reddit hot --limit 10

# 浏览器命令（需要登录）
opencli bilibili hot --limit 5
opencli twitter trending --limit 10

# 下载内容
opencli xiaohongshu download <note-id> --output ./xhs
opencli bilibili download <bv-id> --output ./bilibili
```

### 3. 输出格式

```bash
# 表格（默认）
opencli bilibili hot

# JSON
opencli bilibili hot -f json

# YAML
opencli bilibili hot -f yaml

# Markdown
opencli bilibili hot -f md

# CSV
opencli bilibili hot -f csv

# 详细日志
opencli bilibili hot -v
```

---

## 与其他工具对比

### 1. vs Browser-Use / Stagehand

| 维度 | OpenCLI | Browser-Use |
|------|---------|-------------|
| **LLM 成本** | 零 | 每次调用消耗 |
| **输出确定性** | ✅ 确定 | ❌ 依赖 LLM |
| **速度** | 快 | 慢 |
| **适合场景** | 已知网站、定时任务 | 未知网站探索 |

### 2. vs Crawl4AI / Scrapy

| 维度 | OpenCLI | Crawl4AI |
|------|---------|----------|
| **规模** | 小规模/定时 | 大规模爬虫 |
| **设置复杂度** | 低 | 高 |
| **反检测** | 内置 | 需配置 |
| **成本** | 零 | API/基础设施成本 |

### 3. vs 官方 API

| 维度 | OpenCLI | 官方 API |
|------|---------|----------|
| **Key** | 不需要 | 需要申请 |
| **费用** | 免费 | 付费（Twitter API 很贵） |
| **限制** | 少 | 严格（频率限制等） |
| **覆盖** | 50+ 平台 | 单平台 |

---

## 7W2H 使用场景案例

### 场景 1：定时采集 B站热门视频

```
What:   采集 B站热门视频排行
When:   每天早上 9 点定时执行
Where:  CI/CD 或本地 cron
Who:    内容运营人员
Why:    了解当天热门内容趋势
How:    opencli bilibili hot → JSON → 分析
How much: 免费，零维护
```

```bash
# crontab -e
0 9 * * * opencli bilibili hot -f json > ~/bilibili-hot-$(date +%Y%m%d).json
```

### 场景 2：AI Agent 客服机器人

```
What:   自动发现用户问题并回复
When:   收到用户消息时
Where:  OpenClaw Agent 中
Who:    AI Agent
Why:    自动化客服流程
How:    opencli explore → opencli synthesize → 自动注册工具
How much: 零 API 成本
```

```bash
# Agent 自动发现工具
opencli explore https://support.example.com
opencli synthesize my-support
opencli my-support search --query "退款"
```

### 场景 3：多平台内容聚合

```
What:   聚合多平台热门内容
When:   需要制作日报时
Where:  本地脚本
Who:    运营人员
Why:    快速了解全网热点
How:    并行获取 → JSON → 聚合分析
How much: 免费
```

```bash
#!/bin/bash
# multi-platform-trending.sh

echo "=== $(date) 多平台热点 ==="

echo "## B站热门"
opencli bilibili hot -f json | jq '.data[] | .title'

echo "## 知乎热榜"
opencli zhihu hot -f json | jq '.data[] | .title'

echo "## Reddit"
opencli reddit hot -f json | jq '.data[] | .title'

echo "## Twitter Trending"
opencli twitter trending -f json | jq '.[] | .name'
```

---

## opencli-rs（Rust 版本）

### 简介

| 属性 | 值 |
|------|-----|
| **GitHub** | [nashsu/opencli-rs](https://github.com/nashsu/opencli-rs) |
| **Stars** | 921 ⭐ |
| **语言** | Rust |
| **特点** | 更快、更安全、内存占用低 |

### 与 TypeScript 版对比

| 维度 | opencli (TS) | opencli-rs (Rust) |
|------|--------------|-------------------|
| **性能** | 较快 | 更快 |
| **内存** | 中等 | 极低 |
| **安装** | npm | cargo / 二进制 |
| **生态** | 完整（50+ 适配器） | 发展中 |
| **可扩展性** | TypeScript | Rust |

### 安装

```bash
# Rust/Cargo
cargo install opencli-rs

# 或下载二进制
# https://github.com/nashsu/opencli-rs/releases
```

---

## 最佳实践

### ✅ 推荐做法

1. **优先使用公开 API 命令**
   ```bash
   opencli hackernews top  # 无需浏览器
   ```

2. **复用登录态**
   - 确保 Chrome 已登录目标网站
   - 定期检查登录状态

3. **使用确定性子集**
   - 相同命令产生相同输出
   - 便于测试和调试

4. **AI Agent 场景用 explore**
   ```bash
   opencli explore https://example.com
   opencli synthesize mysite
   ```

### ❌ 避免做法

1. **不要用于大规模爬虫**
   - 会被封 IP
   - 用 Crawl4AI 等专用工具

2. **不要忽略登录态过期**
   - 定期验证登录状态
   - 处理 Unauthorized 错误

3. **不要用于未知网站探索**
   - 用 Browser-Use 等 LLM 驱动工具
   - OpenCLI 适合已知网站

---

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| Extension not connected | 确保 Browser Bridge 扩展已安装并启用 |
| attach failed | 禁用其他 Chrome 扩展 |
| Unauthorized | 重新登录目标网站 |
| Node API errors | 确保 Node.js >= 20 |

```bash
# 诊断命令
opencli doctor

# 检查守护进程
curl localhost:19825/status
curl localhost:19825/logs
```

---

## 相关链接

| 资源 | 链接 |
|------|------|
| OpenCLI 主项目 | https://github.com/jackwener/opencli |
| opencli-rs | https://github.com/nashsu/opencli-rs |
| npm 包 | https://www.npmjs.com/package/@jackwener/opencli |
| Skills 安装 | `npx skills add jackwener/opencli` |

---

## 总结

### OpenCLI 核心价值

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenCLI 价值图                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   💰 零成本      → 无 Token、无 API Key、无使用费              │
│   ⚡ 确定性      → 相同命令、相同输出、管道友好               │
│   🔒 安全        → 复用浏览器登录、反检测内置                   │
│   🤖 AI 原生     → explore/synthesize/cascade 工具发现         │
│   🔌 可扩展      → CLI Hub + Plugin + Electron Apps           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 何时选择 OpenCLI

| 需求 | 推荐工具 |
|------|----------|
| 定时数据采集 | **OpenCLI** ✅ |
| AI Agent 网站操作 | **OpenCLI** ✅ |
| 已知网站快速操作 | **OpenCLI** ✅ |
| 未知网站探索 | Browser-Use |
| 大规模爬虫 | Crawl4AI |
| 官方 API 可用 | 官方 API |

---

*教程完成于 2026-03-29*
