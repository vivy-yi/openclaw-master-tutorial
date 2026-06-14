# Anthropic Claude Code Plugins 完全指南

> **官方插件目录** | ⭐ 17,564 Stars | [GitHub](https://github.com/anthropics/claude-plugins-official)

---

## 零、Plugins 总览

> ⭐ 17,564 Stars | 50+ 插件 | 官方维护 | MCP 协议支持

### 0.1 一句话理解

**Claude Code Plugins = Anthropic 官方的 Claude Code 扩展市场**，类似 VS Code Marketplace，但专为 Claude Code 提供经过官方审核的插件。

### 0.2 核心价值

| 价值点 | 说明 |
|--------|------|
| **官方背书** | Anthropic 维护，质量和安全有保障 |
| **开箱即用** | 通过 `/plugin install` 一键安装 |
| **生态丰富** | 覆盖开发工具、LSP、项目管理、消息平台等 |
| **协议标准** | 基于 MCP（Model Context Protocol），跨平台兼容 |
| **持续更新** | 新插件持续加入，社区可提交 |

### 0.3 插件全景图

```
┌──────────────────────────────────────────────────────────────────────┐
│                    Claude Code Plugins 生态全景                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │  🏠 Internal Plugins（官方维护，35+ 个）                       │   │
│   ├──────────────────────────────────────────────────────────────┤   │
│   │  🔧 开发工具      agent-sdk-dev | mcp-server-dev | skill-creator │  │
│   │  🔍 代码质量      code-review | security-guidance | hookify      │  │
│   │  📝 LSP 集成      clangd | pyright | rust-analyzer | typescript  │  │
│   │  🔀 Git 集成      commit-commands | session-report              │  │
│   │  ⚡ 工作流        feature-dev | frontend-design | math-olympiad  │  │
│   └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │  🌍 External Plugins（第三方，15+ 个）                        │   │
│   ├──────────────────────────────────────────────────────────────┤   │
│   │  💻 开发工具      github | gitlab | playwright | terraform      │   │
│   │  📋 项目管理      asana | linear | serena                       │   │
│   │  💬 消息平台      discord | telegram | imessage                │   │
│   │  🔥 其他服务      firebase | context7 | greptile | laravel-boost │   │
│   └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │  📦 MCP Integration（MCP 服务器，45+ 个）                     │   │
│   │  → 通过 .mcp.json 配置，支持远程/本地 MCP 服务器              │   │
│   └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### 0.4 插件分类统计

| 分类 | Internal | External | 代表插件 |
|------|----------|----------|---------|
| **开发工具** | 5+ | 4+ | agent-sdk-dev, github, gitlab |
| **代码质量** | 3+ | — | code-review, security-guidance |
| **LSP 集成** | 12 | — | clangd, pyright, rust-analyzer |
| **Git 集成** | 2+ | — | commit-commands |
| **项目管理** | — | 3+ | asana, linear |
| **消息平台** | — | 3+ | discord, telegram |
| **工作流** | 6+ | — | feature-dev, frontend-design |
| **其他服务** | 2+ | 5+ | firebase, context7 |

### 0.5 Internal Plugins 精选

| 插件 | 用途 | 亮点 |
|------|------|------|
| **code-review** | PR 代码审查 | 多 Agent + 置信度评分 |
| **security-guidance** | 安全检查 | 自动警告注入/XSS 等风险 |
| **mcp-server-dev** | MCP 服务器开发 | 部署模式、认证、工具设计全覆盖 |
| **agent-sdk-dev** | Agent SDK 开发 | Claude Agent SDK 官方工具包 |
| **skill-creator** | Skill 创建 | 快速创建自定义 Skill |
| **hookify** | Hook 创建 | 分析对话模式，防止不良行为 |
| **feature-dev** | 特性开发 | 标准化开发工作流 |
| **frontend-design** | 前端设计 | UI 设计辅助 |

### 0.6 External Plugins 精选

| 插件 | 提供商 | 核心功能 |
|------|--------|---------|
| **github** | GitHub | Issues、PRs、代码审查、MCP 协议 |
| **gitlab** | GitLab | GitLab MCP 服务器 |
| **linear** | Linear | 现代化问题跟踪 |
| **asana** | Asana | 任务管理 |
| **playwright** | Playwright | 浏览器自动化测试 |
| **discord** | Discord | 频道消息管理 |
| **telegram** | Telegram | 消息推送 |
| **terraform** | HashiCorp | IaC 基础设施管理 |

### 0.7 与 OpenClaw Connector 对比

| 维度 | Claude Code Plugins | OpenClaw Connector |
|------|---------------------|-------------------|
| **来源** | Anthropic 官方维护 | OpenClaw 内置 |
| **目标** | Claude Code 用户 | OpenClaw Agent |
| **协议** | MCP / Skills | OpenClaw Skills |
| **安装方式** | `/plugin install` | 内置，无需安装 |
| **可扩展性** | 社区可提交新插件 | 需开发新 Skill |
| **LSP 支持** | ✅ 原生 12+ LSP | ❌ 不支持 |
| **代码审查** | ✅ code-review | ❌ 无 |

### 0.8 快速入门

```bash
# 1. 浏览可用插件
/plugin > Discover

# 2. 安装官方插件
/plugin install code-review@claude-plugins-official

# 3. 安装第三方插件
/plugin install github@claude-plugins-official
/plugin install linear@claude-plugins-official

# 4. 查看已安装插件
/plugin list
```

### 0.9 适用场景

| 场景 | 推荐插件 |
|------|---------|
| **代码审查** | code-review, security-guidance |
| **MCP 服务器开发** | mcp-server-dev |
| **Agent 应用开发** | agent-sdk-dev |
| **LSP 编程辅助** | clangd, pyright, rust-analyzer, typescript-lsp |
| **Git 工作流** | commit-commands, session-report |
| **项目管理** | linear, asana |
| **消息通知** | discord, telegram |
| **浏览器测试** | playwright |

---

## 零、Plugin Marketplace（官网场景分类）

> 来源：[官网 Plugin Marketplace](https://docs.anthropic.com/en/docs/claude-code/plugins) | 11 个官方插件 | 按工作场景分类

### 0.10 一句话理解

**Plugin Marketplace = 按业务场景组织的官方插件**，每个插件聚焦一个工作领域（如销售、客户支持、产品管理），开箱即用。

### 0.11 官网插件列表（按场景）

| 插件 | 用途 | 支持的 Connectors |
|------|------|-------------------|
| **productivity** | 任务、日历、工作流、个人上下文管理 | Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365 |
| **sales** | 潜在客户研究、销售准备、pipeline 回顾、外联草稿、竞争分析 | Slack, HubSpot, Close, Clay, ZoomInfo, Notion, Jira, Fireflies, Microsoft 365 |
| **customer-support** | 工单处理、响应草稿、升级包、客户上下文研究、知识库文章 | Slack, Intercom, HubSpot, Guru, Jira, Notion, Microsoft 365 |
| **product-management** | 需求文档、路线图规划、用户研究综合、相关方更新、竞品跟踪 | Slack, Linear, Asana, Monday, ClickUp, Jira, Notion, Figma, Amplitude, Pendo, Intercom, Fireflies |
| **marketing** | 内容草稿、活动规划、品牌声音执行、竞品通报、效果报告 | Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, SimilarWeb, Klaviyo |
| **legal** | 合同审查、NDA 处理、合规导航、风险评估、会议准备、模板响应 | Slack, Box, Egnyte, Jira, Microsoft 365 |
| **finance** | 日记账分录、账户对账、财务报表生成、差异分析、结账支持、审计支持 | Snowflake, Databricks, BigQuery, Slack, Microsoft 365 |
| **data** | 数据集查询、可视化、解释——SQL、统计分析、仪表板构建、验证 | Snowflake, Databricks, BigQuery, Definite, Hex, Amplitude, Jira |
| **enterprise-search** | 跨工具搜索——邮件、聊天、文档、wiki，一句查询遍及全公司 | Slack, Notion, Guru, Jira, Asana, Microsoft 365 |
| **bio-research** | 临床前研究工具和数据库连接（文献检索、基因组分析、靶点优先级） | PubMed, BioRender, bioRxiv, ClinicalTrials.gov, ChEMBL, Synapse, Wiley, Owkin, Open Targets, Benchling |
| **cowork-plugin-management** | 为企业特定工具和工作流创建或定制插件 | — |

### 0.12 Connector 一览（按插件统计）

| Connector | 出现次数 | 所属插件 |
|-----------|----------|---------|
| **Slack** | 9 | productivity, sales, customer-support, product-management, marketing, legal, finance, enterprise-search |
| **Notion** | 8 | productivity, sales, customer-support, product-management, marketing, enterprise-search |
| **Jira** | 7 | productivity, sales, customer-support, product-management, legal, data, enterprise-search |
| **Microsoft 365** | 5 | productivity, sales, customer-support, legal, enterprise-search |
| **Linear** | 3 | productivity, product-management |
| **Asana** | 3 | productivity, product-management, enterprise-search |
| **HubSpot** | 3 | sales, customer-support, marketing |
| **Amplitude** | 3 | product-management, marketing, data |
| **Intercom** | 2 | customer-support, product-management |
| **Fireflies** | 2 | sales, product-management |
| **Snowflake** | 2 | finance, data |
| **Databricks** | 2 | finance, data |
| **BigQuery** | 2 | finance, data |
| **Guru** | 2 | customer-support, enterprise-search |
| **Figma** | 2 | product-management, marketing |
| **Monday** | 2 | productivity, product-management |
| **ClickUp** | 2 | productivity, product-management |

### 0.13 两套分类的关系

```
┌─────────────────────────────────────────────────────────────────┐
│              Claude Code Plugins 双轨分类                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📦 按类型（GitHub Repo）        📋 按场景（官网 Marketplace）   │
│  ├── Internal Plugins           ├── productivity                 │
│  ├── External Plugins           ├── sales                        │
│  └── MCP Servers               ├── customer-support             │
│                                 ├── product-management           │
│  → 开发者视角                 → 业务用户视角                     │
│  → 技术能力分类               → 工作领域分类                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| 维度 | claude-plugins-official | Plugin Marketplace |
|------|------------------------|-------------------|
| **分类方式** | 按插件类型（Internal/External/MCP） | 按业务场景（销售/法务/财务等） |
| **面向用户** | 开发者、技术用户 | 业务用户（销售/客服/产品等） |
| **数量** | 50+ 个 | 11 个 |
| **Connector 展示** | 分散在各插件中 | 集中展示支持列表 |
| **来源** | GitHub Repo | 官网文档 |

---

## 一、概述

### 1.1 什么是 Claude Code Plugins

Claude Code Plugins 是 Anthropic 官方维护的高质量插件目录，用于扩展 Claude Code 的功能。

| 属性 | 说明 |
|------|------|
| **仓库** | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) |
| **Stars** | ⭐ 17,564 |
| **类型** | 官方插件目录 |
| **维护者** | Anthropic |
| **协议** | MCP / Skills |

### 1.2 插件分类

```
┌─────────────────────────────────────────────────────────────┐
│              Claude Code Plugins 生态                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏠 Internal Plugins（官方维护）                              │
│  └── 35+ 个插件（开发工具、LSP、AI 功能）                    │
│                                                              │
│  🌍 External Plugins（第三方插件）                           │
│  └── 15+ 个插件（GitHub、Linear、Discord 等）               │
│                                                              │
│  📦 MCP Integration（MCP 服务器集成）                        │
│  └── 45+ 个 MCP 服务器                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、目录结构

```
anthropics/claude-plugins-official/
├── .claude-plugin/
│   └── marketplace.json      # 插件市场元数据
├── plugins/                  # 内部插件（官方维护）
│   ├── agent-sdk-dev/        # Agent SDK 开发工具
│   ├── clangd-lsp/           # Clangd LSP
│   ├── code-review/          # 代码审查
│   ├── code-simplifier/      # 代码简化
│   ├── commit-commands/      # Git 提交命令
│   ├── feature-dev/          # 特性开发
│   ├── frontend-design/       # 前端设计
│   ├── hookify/              # Hook 创建工具
│   ├── mcp-server-dev/       # MCP 服务器开发
│   ├── security-guidance/    # 安全提醒
│   ├── session-report/       # 会话报告
│   └── skill-creator/        # Skill 创建器
│
└── external_plugins/         # 外部插件（第三方）
    ├── asana/                # Asana 任务管理
    ├── context7/             # Context7 MCP
    ├── discord/              # Discord 集成
    ├── firebase/             # Firebase
    ├── github/               # GitHub MCP
    ├── gitlab/               # GitLab MCP
    ├── greptile/             # Greptile
    ├── imessage/             # iMessage
    ├── laravel-boost/        # Laravel
    ├── linear/               # Linear 问题跟踪
    ├── playwright/           # Playwright
    ├── serena/               # Serena
    ├── telegram/             # Telegram
    └── terraform/            # Terraform
```

---

## 三、Internal Plugins（官方插件）

### 3.1 开发工具类

| 插件 | 描述 |
|------|------|
| **agent-sdk-dev** | Agent SDK 开发工具包 |
| **mcp-server-dev** | MCP 服务器开发指南 |
| **plugin-dev** | 插件开发模板 |
| **example-plugin** | 插件开发示例 |
| **skill-creator** | Skill 创建器 |

#### agent-sdk-dev

```json
{
  "name": "agent-sdk-dev",
  "description": "Development kit for working with the Claude Agent SDK"
}
```

#### mcp-server-dev

```json
{
  "name": "mcp-server-dev",
  "description": "Skills for designing and building MCP servers that work seamlessly with Claude — guides you through deployment models (remote HTTP, MCPB, local), tool design patterns, auth, and interactive MCP apps."
}
```

---

### 3.2 代码质量类

| 插件 | 描述 |
|------|------|
| **code-review** | 自动化代码审查（多 Agent + 置信度评分） |
| **code-simplifier** | 代码简化工具 |
| **security-guidance** | 安全提醒 Hook |

#### code-review

```json
{
  "name": "code-review",
  "description": "Automated code review for pull requests using multiple specialized agents with confidence-based scoring"
}
```

#### security-guidance

```json
{
  "name": "security-guidance",
  "description": "Security reminder hook that warns about potential security issues when editing files, including command injection, XSS, and unsafe code patterns"
}
```

---

### 3.3 LSP 集成类

| 插件 | 描述 |
|------|------|
| **clangd-lsp** | Clangd C/C++ LSP |
| **csharp-lsp** | C# LSP |
| **gopls-lsp** | Go LSP |
| **jdtls-lsp** | Java LSP (Eclipse JDTLS) |
| **kotlin-lsp** | Kotlin LSP |
| **lua-lsp** | Lua LSP |
| **php-lsp** | PHP LSP |
| **pyright-lsp** | Pyright Python LSP |
| **ruby-lsp** | Ruby LSP |
| **rust-analyzer-lsp** | Rust Analyzer LSP |
| **swift-lsp** | Swift LSP |
| **typescript-lsp** | TypeScript LSP |

---

### 3.4 Git 集成类

| 插件 | 描述 |
|------|------|
| **commit-commands** | Git 提交命令集 |
| **session-report** | 会话报告生成 |

#### commit-commands

```json
{
  "name": "commit-commands",
  "description": "Git commit command toolkit"
}
```

---

### 3.5 工作流类

| 插件 | 描述 |
|------|------|
| **feature-dev** | 特性开发工作流 |
| **frontend-design** | 前端设计工具 |
| **explanatory-output-style** | 解释性输出样式 |
| **learning-output-style** | 学习输出样式 |
| **hookify** | Hook 创建工具 |
| **math-olympiad** | 数学奥林匹克 |

#### hookify

```json
{
  "name": "hookify",
  "description": "Easily create hooks to prevent unwanted behaviors by analyzing conversation patterns"
}
```

---

### 3.6 其他工具类

| 插件 | 描述 |
|------|------|
| **claude-code-setup** | Claude Code 安装配置 |
| **claude-md-management** | Markdown 管理 |
| **playground** | Playground |
| **ralph-loop** | Ralph Loop |

---

## 四、External Plugins（外部插件）

### 4.1 开发工具

| 插件 | 提供商 | 描述 |
|------|--------|------|
| **github** | GitHub | GitHub MCP 服务器，Issues、PRs、代码审查 |
| **gitlab** | GitLab | GitLab MCP 服务器 |
| **playwright** | Playwright | 浏览器自动化测试 |
| **terraform** | HashiCorp | Terraform IaC |

#### GitHub Plugin

```json
{
  "name": "github",
  "description": "Official GitHub MCP server for repository management. Create issues, manage pull requests, review code, search repositories, and interact with GitHub's full API directly from Claude Code.",
  "author": { "name": "GitHub" }
}
```

---

### 4.2 项目管理

| 插件 | 提供商 | 描述 |
|------|--------|------|
| **asana** | Asana | Asana 任务管理 |
| **linear** | Linear | Linear 问题跟踪 |
| **serena** | Serena | 项目管理 |

#### Linear Plugin

```json
{
  "name": "linear",
  "description": "Linear issue tracking integration. Create issues, manage projects, update statuses, search across workspaces, and streamline your software development workflow with Linear's modern issue tracker.",
  "author": { "name": "Linear" }
}
```

---

### 4.3 消息平台

| 插件 | 提供商 | 描述 |
|------|--------|------|
| **discord** | Discord | Discord 集成 |
| **telegram** | Telegram | Telegram 集成 |
| **imessage** | Apple | iMessage 集成 |

---

### 4.4 其他服务

| 插件 | 提供商 | 描述 |
|------|--------|------|
| **context7** | Context7 | 上下文管理 MCP |
| **firebase** | Google | Firebase |
| **greptile** | Greptile | 代码搜索 |
| **laravel-boost** | Laravel | Laravel 增强 |

---

## 五、安装与使用

### 5.1 安装命令

```bash
# 安装官方插件
/plugin install agent-sdk-dev@claude-plugins-official

# 安装代码审查插件
/plugin install code-review@claude-plugins-official

# 安装 GitHub 插件
/plugin install github@claude-plugins-official

# 安装 Linear 插件
/plugin install linear@claude-plugins-official
```

### 5.2 浏览插件

```bash
# 打开插件浏览器
/plugin > Discover
```

### 5.3 插件结构

每个插件遵循标准结构：

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json      # 插件元数据（必需）
├── .mcp.json            # MCP 服务器配置（可选）
├── commands/            # 斜杠命令（可选）
├── agents/              # Agent 定义（可选）
├── skills/              # Skill 定义（可选）
└── README.md            # 文档
```

### 5.4 插件元数据

```json
{
  "name": "plugin-name",
  "description": "Plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com"
  }
}
```

---

## 六、MCP 服务器集成

### 6.1 内置 MCP 服务器

| MCP 服务器 | 描述 |
|-----------|------|
| **agent-sdk-dev** | Claude Agent SDK |
| **code-review** | 代码审查 |
| **feature-dev** | 特性开发 |
| **security-guidance** | 安全提醒 |

### 6.2 MCP 配置

```json
{
  "mcp": {
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
        }
      }
    }
  }
}
```

---

## 七、提交新插件

### 7.1 提交要求

外部插件需要满足质量和安全标准才能被批准。

### 7.2 提交表单

使用 [Plugin Directory Submission Form](https://clau.de/plugin-directory-submission) 提交新插件。

---

## 八、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/anthropics/claude-plugins-official |
| 官方文档 | https://code.claude.com/docs/en/plugins |
| 插件提交 | https://clau.de/plugin-directory-submission |

---

## 九、Stars 排行榜（相关插件仓库）

| 排名 | 仓库 | Stars | 描述 |
|------|------|-------|------|
| 🥇 | hesreallyhim/awesome-claude-code | ⭐40.3k | Claude Code awesome 列表 |
| 🥈 | thedotmack/claude-mem | ⭐65.6k | 自动记忆捕获插件 |
| 🥉 | anthropics/claude-plugins-official | ⭐17.6k | 官方插件目录 |
| 4 | jarrodwatts/claude-hud | ⭐20.3k | Claude HUD 显示插件 |
| 5 | anthropics/claude-quickstarts | ⭐16.2k | 快速入门项目 |

---

*最后更新: 2026-04-22*
