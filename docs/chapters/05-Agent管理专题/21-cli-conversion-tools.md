# GitHub CLI 转化工具全景图

> 将各类内容/接口转换为 CLI 工具的项目汇总
> 日期：2026-03-27

---

## 1. Website/API → CLI 类

### 1.1 CLI-Anything ⭐ 23,678

| 属性 | 说明 |
|------|------|
| **项目** | HKUDS/CLI-Anything |
| **定位** | "Making ALL Software Agent-Native" |
| **语言** | Python |
| **支持平台** | OpenClaw, nanobot, Cursor, Claude Code |
| **安装** | `pip install cli-anything` |

**核心能力**：
```
任何软件 → Agent 可用的 CLI
    ↓
一键安装: pip install cli-anything
cli-hub  → 查看支持列表
cli-install <name>  → 安装特定 CLI
```

**特点**：
- 通用软件 CLI 化
- OpenClaw 明确支持
- 社区驱动，持续扩展

---

### 1.2 opencli ⭐ 7,684

| 属性 | 说明 |
|------|------|
| **项目** | jackwener/opencli |
| **定位** | "Make Any Website & Tool Your CLI" |
| **语言** | Node.js (>= 20) |
| **支持平台** | 50+ 网站 + 本地工具 |
| **安装** | `npm install -g @jackwener/opencli` |

**支持平台**：
```
全球平台: Twitter/X, YouTube, Reddit, HackerNews
中文平台: Bilibili, 知乎, 小红书, 微博, V2EX, 雪球
本地工具: gh, docker, kubectl, obsidian
Electron: 支持 CDP 控制
```

**特点**：
- 复用 Chrome 登录态（零 Token 消耗）
- 确定性 JSON 输出
- 有现成 OpenClaw skill：`joeseesun/opencli-skill`

---

### 1.3 Agent-Reach ⭐ 10,922

| 属性 | 说明 |
|------|------|
| **项目** | teng-lin/Agent-Reach |
| **定位** | "Give your AI agent eyes to see the entire internet" |
| **支持平台** | 16+ 平台 |
| **安装** | `pip install agent-reach` |

**支持平台**：
```
社交: Twitter, Reddit, YouTube, GitHub
中文: Bilibili, 小红书, 知乎, 微博
其他: RSS, V2EX, LinkedIn, Instagram
```

**OpenClaw Skill**：已有集成

---

## 2. 自然语言 → 命令类

### 2.1 ai-shell ⭐ 5,221

| 属性 | 说明 |
|------|------|
| **项目** | BuilderIO/ai-shell |
| **定位** | 自然语言 → Shell 命令 |
| **安装** | `npm install -g @builder.io/ai-shell` |

**使用方式**：
```bash
ai "find all files modified today"
# → 自动生成并执行 find 命令
```

---

### 2.2 DevOpsGPT ⭐ 5,964

| 属性 | 说明 |
|------|------|
| **项目** | kuafuai/DevOpsGPT |
| **定位** | 自然语言 → DevOps 软件 |
| **支持** | 任何开发语言 + 现有代码扩展 |

**场景**：将自然语言需求转换为 DevOps 工作流

---

### 2.3 claude-engineer ⭐ 11,167

| 属性 | 说明 |
|------|------|
| **项目** | Doriandarko/claude-engineer |
| **定位** | 自然语言 → 代码任务 |
| **特点** | 交互式 CLI，扩展自己的工具 |

---

## 3. Browser/MCP 类

### 3.1 bb-browser ⭐ 2,588

| 属性 | 说明 |
|------|------|
| **项目** | epiral/bb-browser |
| **定位** | "Your browser is the API" |
| **能力** | CLI + MCP server，Chrome 控制 |

---

### 3.2 playwright ⭐ 3,250

| 属性 | 说明 |
|------|------|
| **项目** | remorses/playwriter |
| **定位** | Chrome → CLI/MCP |
| **能力** | 有状态沙箱运行 Playwright |

---

### 3.3 mcp2cli ⭐ 1,699

| 属性 | 说明 |
|------|------|
| **项目** | knowsuchagency/mcp2cli |
| **定位** | MCP → CLI 转换 |
| **能力** | 零代码生成，运行时转换 |

---

## 4. 数据库/数据类

### 4.1 WrenAI ⭐ 14,695

| 属性 | 说明 |
|------|------|
| **项目** | Canner/WrenAI |
| **定位** | "GenBI: Natural Language to SQL/Chart" |
| **能力** | Text-to-SQL, Text-to-Chart |

**使用场景**：
```sql
用户: "去年Q3华北区的销售额是多少"
WrenAI → SELECT SUM(sales) FROM ... WHERE region='华北' AND quarter='Q3'
```

---

### 4.2 sqlcoder ⭐ 4,006

| 属性 | 说明 |
|------|------|
| **项目** | defog-ai/sqlcoder |
| **定位** | 自然语言 → SQL |
| **特点** | SoTA 开源模型 |

---

### 4.3 Dataherald ⭐ 3,624

| 属性 | 说明 |
|------|------|
| **项目** | Dataherald/dataherald |
| **定位** | 数据库自然语言查询 |

---

### 4.4 ingresr ⭐ 3,439

| 属性 | 说明 |
|------|------|
| **项目** | bruin-data/ingestr |
| **定位** | 数据库 → CLI 迁移 |
| **能力** | 单命令跨数据库复制 |

---

## 5. 文档/内容类

### 5.1 kreuzberg ⭐ 7,129

| 属性 | 说明 |
|------|------|
| **项目** | kreuzberg-dev/kreuzberg |
| **定位** | 88+ 格式文档解析 |
| **接口** | CLI, REST API, MCP, Python |

**支持格式**：
```
PDF, Office, 图片, EPUB, Markdown
88+ 特殊格式
```

---

### 5.2 html-to-markdown ⭐ 3,511

| 属性 | 说明 |
|------|------|
| **项目** | JohannesKaufmann/html-to-markdown |
| **定位** | HTML → Markdown |
| **特点** | 可扩展规则 |

---

### 5.3 notebooklm-py ⭐ 7,734

| 属性 | 说明 |
|------|------|
| **项目** | teng-lin/notebooklm-py |
| **定位** | Google NotebookLM → Python/CLI |
| **支持 Agent** | Claude Code, Codex, OpenClaw |

---

## 6. Google Workspace 类

### 6.1 google_workspace_mcp ⭐ 1,936

| 属性 | 说明 |
|------|------|
| **项目** | taylorwilsdon/google_workspace_mcp |
| **定位** | Gmail/Calendar/Docs → MCP/CLI |
| **能力** | Google 全家桶 CLI 化 |

---

## 7. 其他有趣项目

### 7.1 Hoppscotch ⭐ 78,641

| 属性 | 说明 |
|------|------|
| **项目** | hoppscotch/hoppscotch |
| **定位** | API 开发生态 |
| **能力** | Web, Desktop, CLI |
| **替代** | Postman, Insomnia |

---

### 7.2 Router-for-Me ⭐ 20,509

| 属性 | 说明 |
|------|------|
| **项目** | router-for-me/CLIProxyAPI |
| **定位** | Gemini/Claude/Codex → API |
| **能力** | 统一 API 接口访问多种 AI |

---

### 7.3 Claudable ⭐ 3,838

| 属性 | 说明 |
|------|------|
| **项目** | opactorai/Claudable |
| **定位** | Web 构建 → CLI Agent |
| **支持** | Claude Code, Codex, Gemini CLI |

---

### 7.4 engram ⭐ 1,932

| 属性 | 说明 |
|------|------|
| **项目** | Gentleman-Programming/engram |
| **定位** | AI 记忆系统 |
| **接口** | MCP, HTTP API, CLI, TUI |

---

## 8. 分类汇总图

```
CLI 转化工具
│
├── Website → CLI
│   ├── CLI-Anything (通用软件) ⭐ 23K
│   ├── opencli (50+ 平台) ⭐ 7.6K
│   └── Agent-Reach (中文平台) ⭐ 10K
│
├── 自然语言 → 命令
│   ├── ai-shell (Shell) ⭐ 5K
│   ├── DevOpsGPT (DevOps) ⭐ 6K
│   └── claude-engineer (代码) ⭐ 11K
│
├── Browser → CLI/MCP
│   ├── bb-browser ⭐ 2.6K
│   ├── playwright ⭐ 3.2K
│   └── mcp2cli ⭐ 1.7K
│
├── 数据/数据库
│   ├── WrenAI (NL→SQL) ⭐ 14K
│   ├── sqlcoder ⭐ 4K
│   ├── Dataherald ⭐ 3.6K
│   └── ingresr ⭐ 3.4K
│
├── 文档/内容
│   ├── kreuzberg (88+格式) ⭐ 7K
│   ├── html-to-markdown ⭐ 3.5K
│   └── notebooklm-py ⭐ 7.7K
│
└── Google Workspace
    └── google_workspace_mcp ⭐ 1.9K
```

---

## 9. 对 OpenClaw 的价值评估

| 类型 | 价值 | 理由 |
|------|------|------|
| **Website → CLI** | ⭐⭐⭐ | 已有 agent-reach，opencli 增量有限 |
| **NL → Shell** | ⭐⭐ | ai-shell 有一定价值 |
| **Browser → MCP** | ⭐⭐ | OpenClaw browser tool 已覆盖 |
| **NL → SQL** | ⭐⭐⭐ | **WrenAI 值得关注**（数据分析场景）|
| **文档转化** | ⭐⭐ | OpenClaw 已有工具覆盖 |
| **Google Workspace** | ⭐⭐ | 企业场景可能有用 |

---

## 10. 最值得关注的 3 个项目

| 项目 | Stars | 理由 |
|------|-------|------|
| **CLI-Anything** | ⭐ 23,678 | 通用软件 CLI 化，覆盖最广 |
| **WrenAI** | ⭐ 14,695 | NL → SQL，数据分析神器 |
| **Agent-Reach** | ⭐ 10,922 | 中文平台覆盖，已有 skill |

---

## 11. 与 OpenClaw 已有能力的对比

| 已有能力 | 对应工具 | 结论 |
|---------|---------|------|
| agent-reach skill | Agent-Reach | 功能重叠，已有 skill |
| browser tool | bb-browser/playwright | OpenClaw 内置更好 |
| exec + curl | 直接 HTTP | 无需额外工具 |
| summarize skill | html-to-markdown | 已有覆盖 |
| mo-yunying 子Agent | opencli | **opencli 增量有限** |

**结论**：大部分工具与 OpenClaw 已有能力重叠，按需引入即可。

---

## 12. 按需引入建议

| 场景 | 推荐引入 |
|------|---------|
| **高频 API 调用** | CLI-Anything |
| **数据分析/NL → SQL** | WrenAI |
| **中文社交平台抓取** | Agent-Reach |
| **Google Workspace 集成** | google_workspace_mcp |
| **Electron 应用控制** | opencli |

---

*文档更新时间: 2026-03-27*
*来源：DM主控对话*
