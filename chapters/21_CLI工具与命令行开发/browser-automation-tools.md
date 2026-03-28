# 浏览器自动化工具专题：Browser → MCP/CLI

> 📅 更新时间：2026-03-29
> 🎯 适合读者：需要 AI Agent 控制浏览器的开发者
> ⏱️ 阅读时间：约 30 分钟

---

## 1. 概述：浏览器自动化工具生态

### 1.1 工具分类

这一类工具将浏览器能力暴露给 AI Agent，本质上属于 **Browser → MCP/CLI** 类型：

```
┌─────────────────────────────────────────────────────────────────┐
│                 Browser → MCP/CLI 工具生态                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🌐 Browser-Use      │ AI Agent 控制浏览器的 Python 库            │
│  🎭 Playwright MCP   │ 通过 MCP 协议暴露 Playwright              │
│  🤖 GitHub MCP       │ 通过 MCP 操作 GitHub                     │
│  ⚡ Agent Browser     │ Vercel 的浏览器自动化 CLI               │
│  🔗 BB-Browser       │ 浏览器即 API + MCP                       │
│  🪟 MCP-Chrome       │ Chrome 扩展 MCP Server                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 工具对比

| 工具 | 类型 | 语言 | Stars | 核心场景 |
|------|------|------|-------|----------|
| **browser-use** | Python 库 | Python | 84,829 ⭐ | AI Agent 网页任务自动化 |
| **playwright-mcp** | MCP Server | TypeScript | 29,874 ⭐ | MCP 协议浏览器控制 |
| **github-mcp-server** | MCP Server | TypeScript | 28,339 ⭐ | GitHub API 操作 |
| **agent-browser** | CLI | Rust | 25,187 ⭐ | AI Agent 浏览器自动化 |
| **bb-browser** | CLI + MCP | TypeScript | 3,041 ⭐ | 浏览器会话复用 |
| **mcp-chrome** | MCP Server | TypeScript | 10,994 ⭐ | Chrome 扩展控制 |

---

## 2. Browser-Use

### 2.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [browser-use/browser-use](https://github.com/browser-use/browser-use) |
| Stars | ⭐ 84,829 |
| 语言 | Python |
| 安装 | `uv add browser-use` |

### 2.2 核心特点

```
┌─────────────────────────────────────────────────────────────────┐
│                    Browser-Use 架构                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  AI Agent (Claude/GPT/Gemini)                                  │
│         │                                                       │
│         ▼                                                       │
│  Browser-Use Library                                            │
│         │                                                       │
│         ▼                                                       │
│  Browser Controller (Playwright/DrissionPage)                    │
│         │                                                       │
│         ▼                                                       │
│  🌐 Chrome Browser                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 安装与使用

```bash
# 创建项目
uv init && uv add browser-use && uv sync

# 运行第一个 Agent
python main.py
```

### 2.4 基本示例

```python
from browser_use import Agent, Browser, ChatBrowserUse
import asyncio

async def main():
    browser = Browser()
    
    agent = Agent(
        task="Find the number of stars of the browser-use repo",
        llm=ChatBrowserUse(),
        browser=browser,
    )
    
    await agent.run()

asyncio.run(main())
```

### 2.5 Cloud 版本

| 方案 | 说明 |
|------|------|
| **Open Source** | 自托管，需要自己部署 |
| **Cloud** | 更好的性能、反检测、CAPTCHA 解决 |
| **混合** | 开源库 + Cloud 浏览器 |

### 2.6 使用场景

| 场景 | 示例 |
|------|------|
| 表单填写 | 自动填写求职申请 |
| 购物 | 将购物清单添加到购物车 |
| 信息收集 | 搜索并整理网页信息 |
| 个人助手 | 帮用户查找信息 |

---

## 3. Playwright MCP

### 3.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) |
| Stars | ⭐ 29,874 |
| 语言 | TypeScript |
| 安装 | `npx @playwright/mcp@latest` |

### 3.2 核心特点

| 特点 | 说明 |
|------|------|
| **快速轻量** | 使用无障碍树，不是像素输入 |
| **LLM 友好** | 不需要视觉模型，纯结构化数据 |
| **确定性** | 避免截图方法的模糊性 |

### 3.3 安装配置

```json
// VS Code / Cursor MCP 配置
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### 3.4 MCP vs CLI 对比

Microsoft 在 README 中明确说明了 MCP 和 CLI 的取舍：

| 维度 | **CLI + SKILLS** ⭐ | MCP |
|------|---------------------|-----|
| **Token 效率** | 高（无大 Schema） | 低（需要加载工具 Schema） |
| **适用场景** | 高吞吐量 Agent | 需要持久状态、迭代推理 |
| **上下文占用** | 小 | 大 |
| **适用任务** | 快速自动化 | 探索性自动化、自愈测试 |

### 3.5 适用场景

```
✅ 推荐 MCP：
- 探索性自动化
- 自愈测试
- 长时间运行的自主工作流

✅ 推荐 CLI + SKILLS：
- 高吞吐量 Agent
- 需要平衡浏览器自动化和代码库
- 上下文有限的 Agent
```

---

## 4. Agent Browser

### 4.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) |
| Stars | ⭐ 25,187 |
| 语言 | Rust |
| 安装 | `npm install -g agent-browser` |

### 4.2 核心特点

- **Rust 实现**：高性能、内存安全
- **CLI 优先**：适合 AI Agent 调用
- **无头模式**：可以在服务器端运行

### 4.3 使用示例

```bash
# 安装
npm install -g agent-browser

# 基本用法
agent-browser --url "https://example.com"

# AI Agent 调用
agent-browser navigate --url "https://github.com"
agent-browser click --selector ".btn-primary"
agent-browser fill --selector "input[name=q]" --value "search term"
```

---

## 5. BB-Browser

### 5.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [epiral/bb-browser](https://github.com/epiral/bb-browser) |
| Stars | ⭐ 3,041 |
| 语言 | TypeScript |
| 安装 | `npm install -g bb-browser` |

### 5.2 核心特点

| 特点 | 说明 |
|------|------|
| **复用登录态** | 使用你的 Chrome 登录状态 |
| **CLI + MCP** | 两种接口方式 |
| **零 API Key** | 不需要额外凭证 |

### 5.3 使用示例

```bash
# 安装
npm install -g bb-browser

# 登录态复用
bb-browser login github
bb-browser login twitter

# CLI 方式
bb-browser github search --query "opencli"
bb-browser twitter timeline --user elonmusk

# MCP 方式
bb-browser mcp start
```

---

## 6. MCP-Chrome

### 6.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome) |
| Stars | ⭐ 10,994 |
| 语言 | TypeScript |
| 安装 | Chrome 扩展 |

### 6.2 核心特点

| 特点 | 说明 |
|------|------|
| **Chrome 扩展** | 无需安装额外软件 |
| **CDP 协议** | 通过 Chrome DevTools Protocol 控制 |
| **登录态复用** | 使用你已登录的 Chrome 会话 |

### 6.3 工作原理

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP-Chrome 架构                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  AI Assistant (Claude, etc.)                                   │
│         │                                                       │
│         ▼                                                       │
│  MCP Client                                                     │
│         │                                                       │
│         ▼                                                       │
│  Chrome Extension (MCP Server)                                 │
│         │                                                       │
│         ▼                                                       │
│  🌐 Chrome Browser (CDP)                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 安装步骤

1. 下载扩展 from Releases
2. 打开 `chrome://extensions`
3. 启用开发者模式
4. 加载未打包扩展
5. 在 Claude Desktop 中配置 MCP

---

## 7. GitHub MCP Server

### 7.1 项目信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [github-mcp-server](https://github.com/github-mcp-server) |
| Stars | ⭐ 28,339 |
| 语言 | TypeScript |
| 安装 | `npm install -g @github/github-mcp-server` |

### 7.2 核心特点

| 特点 | 说明 |
|------|------|
| **官方维护** | GitHub 官方 MCP Server |
| **完整覆盖** | 覆盖大部分 GitHub API |
| **MCP 协议** | 标准 MCP 接口 |

### 7.3 支持的工具

| 类别 | 工具示例 |
|------|----------|
| **仓库** | list, create, get, update |
| **Issues** | list, create, update, close |
| **PRs** | list, create, merge, review |
| **文件** | get, create, update |
| **搜索** | code, repos, issues |

### 7.4 安装配置

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@github/github-mcp-server"]
    }
  }
}
```

---

## 8. 选择指南

### 8.1 决策树

```
┌─────────────────────────────────────────────────────────────┐
│                   浏览器自动化工具选择                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  你需要做什么？                                              │
│     │                                                       │
│     ├─ AI Agent 网页任务自动化                              │
│     │     │                                                 │
│     │     ├─ 复杂任务、需要反检测 → Browser-Use Cloud ✅    │
│     │     │                                                 │
│     │     └─ 开源自托管 → Browser-Use ⭐                  │
│     │                                                       │
│     ├─ GitHub 操作 → GitHub MCP Server ✅                 │
│     │                                                       │
│     ├─ 需要 MCP 协议 → Playwright MCP ⭐                   │
│     │                                                       │
│     ├─ 高性能 CLI → Agent Browser (Rust) ✅               │
│     │                                                       │
│     ├─ 复用 Chrome 登录态 → BB-Browser ⭐                 │
│     │                                                       │
│     └─ Chrome 扩展方式 → MCP-Chrome ✅                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 对比表

| 工具 | 类型 | Token 效率 | 反检测 | MCP | CLI | 登录态复用 |
|------|------|-----------|--------|-----|-----|-----------|
| **Browser-Use** | 库 | 低 | 可选 | ❌ | ❌ | ❌ |
| **Playwright MCP** | MCP | 中 | ❌ | ✅ | ❌ | ❌ |
| **Agent Browser** | CLI | 高 | ❌ | ❌ | ✅ | ❌ |
| **BB-Browser** | CLI+MCP | 高 | ❌ | ✅ | ✅ | ✅ |
| **MCP-Chrome** | MCP | 高 | ✅ | ✅ | ❌ | ✅ |
| **GitHub MCP** | MCP | 高 | N/A | ✅ | ❌ | ✅ |

---

## 9. 与 OpenCLI 的关系

### 9.1 定位差异

| 工具 | 输入 | 方式 | 复杂度 |
|------|------|------|--------|
| **OpenCLI** | 网站/API | 适配器 | 低（预构建） |
| **Browser-Use** | 网站 | AI Agent | 高（LLM 驱动） |
| **Playwright MCP** | 网站 | CDP | 中（开发者控制） |

### 9.2 使用场景对比

| 场景 | 推荐工具 |
|------|----------|
| **已知网站、固定操作** | OpenCLI ⭐ |
| **未知网站探索、AI 决策** | Browser-Use |
| **需要 MCP 协议集成** | Playwright MCP |
| **高性能自动化** | Agent Browser |
| **复用登录态** | BB-Browser / MCP-Chrome |
| **GitHub 操作** | GitHub MCP Server |

---

## 10. 最佳实践

### 10.1 推荐组合

```
📦 通用 AI Agent 浏览器自动化组合：

1. OpenCLI        → 已知网站快速操作
2. Browser-Use    → 复杂 AI 决策任务
3. GitHub MCP     → GitHub 操作
4. Playwright MCP → 需要 MCP 协议的 Agent
```

### 10.2 性能优化

| 优化项 | 方法 |
|--------|------|
| **Token 节省** | 优先使用 CLI + SKILLS 模式 |
| **反检测** | Browser-Use Cloud 版 |
| **速度** | Agent Browser (Rust) |
| **登录态** | BB-Browser / MCP-Chrome |

---

## 相关链接

| 工具 | 链接 |
|------|------|
| Browser-Use | https://github.com/browser-use/browser-use |
| Playwright MCP | https://github.com/microsoft/playwright-mcp |
| Agent Browser | https://github.com/vercel-labs/agent-browser |
| BB-Browser | https://github.com/epiral/bb-browser |
| MCP-Chrome | https://github.com/hangwin/mcp-chrome |
| GitHub MCP | https://github.com/github-mcp-server |

---

## 相关章节

- [21.4 Website → CLI (OpenCLI)](./opencli-tutorial.md) - 预构建网站适配器
- [21.2 MCP → CLI (mcp2cli)](./README.md) - MCP 协议转换

---

*教程更新于 2026-03-29*
