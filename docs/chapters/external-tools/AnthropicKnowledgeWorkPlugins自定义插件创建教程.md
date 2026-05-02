# Anthropic 业务插件自定义创建教程

> 📅 创建日期：2026-04-23
> 🎯 适合读者：想为企业或团队创建自定义业务插件的开发者
> ⏱️ 阅读时间：约 20 分钟
> 📋 前置知识：了解 Anthropic knowledge-work-plugins（见上一章）

---

## 零、Anthropic 官方提供的插件创建工具

Anthropic 在 `knowledge-work-plugins` 仓库中内置了 `cowork-plugin-management` 插件，包含两个 skill：

| Skill | 用途 |
|-------|------|
| **create-cowork-plugin** | 从零创建新插件 |
| **cowork-plugin-customizer** | 定制现有插件（替换工具占位符）|

也就是说：**创建插件这件事本身，AI 可以引导你做**。

---

## 一、插件的"长相"——目录结构

一个业务插件本质是一个**目录**，遵循固定结构：

```
my-plugin/                        # 插件根目录（kebab-case）
├── .claude-plugin/
│   └── plugin.json               # 必须：插件清单文件
├── skills/                       # 技能模块（最常用）
│   └── skill-name/
│       ├── SKILL.md              # 必须：技能定义
│       └── references/            # 可选：详细参考文档
│           └── patterns.md
├── agents/                       # 子 Agent（少用）
│   └── agent-name.md
├── hooks/                        # 事件钩子（很少用）
│   └── hooks.json
├── .mcp.json                     # MCP 服务器配置
├── CONNECTORS.md                  # 工具类别占位符（分发插件时需要）
└── README.md                     # 说明文档
```

> **最小结构**：只需要 `.claude-plugin/plugin.json` + 至少一个 `skills/*/SKILL.md` 即可工作。

---

## 二、核心概念：四类组件

| 组件 | 说明 | 何时使用 |
|------|------|---------|
| **Skill** | 领域知识 + 引导式指令 | 几乎所有插件都需要 |
| **Agent** | 自主型子 Agent | 需要多步骤自动推理时 |
| **Hook** | 事件触发脚本 | 需要在特定事件发生时自动动作 |
| **MCP Server** | 外部工具集成 | 需要接入 CRM/数据库/API 时 |

**重要原则**：先从 Skill 开始，其他组件按需添加。

---

## 三、创建流程（五阶段）

### 阶段 1：发现（Discovery）

回答以下问题：

- 这个插件要解决什么问题？
- 谁会用？用在什么场景？
- 需要接入哪些外部工具？
- 有没有可以参考的现有插件？

### 阶段 2：组件规划（Component Planning）

根据问题确定需要哪些组件：

| 组件 | 判断依据 |
|------|---------|
| **Skill** | 需要领域知识？需要用户发起的指令（`/do-something`）？|
| **Agent** | 需要 AI 自主完成复杂多步骤任务？|
| **Hook** | 需要在特定事件（如写文件、发消息）时自动触发？|
| **MCP** | 需要接入外部服务（数据库、API、SaaS）？|

### 阶段 3：设计（Design）

为每个组件详细设计：

- **Skill**：触发词 + 知识内容 + 是否需要 references/
- **Agent**：触发场景 + 使用工具 + 输出格式
- **Hook**：触发事件 + 动作类型（approve/block/modify）
- **MCP**：服务器类型（stdio/SSE/HTTP）+ 认证方式

### 阶段 4：实现（Implementation）

按顺序创建文件：

```
1. 创建目录结构
2. 创建 plugin.json（清单）
3. 创建各组件文件
4. 创建 README.md
```

### 阶段 5：验证与打包（Review & Package）

验证结构正确性，打包为 `.plugin` 文件交付。

---

## 四、详细实现指南

### 4.1 plugin.json——插件清单

**位置**：`.claude-plugin/plugin.json`

```json
{
  "name": "my-plugin",              // 必须：kebab-case
  "version": "0.1.0",               // 必须：语义化版本
  "description": "一句话描述插件用途",
  "author": {
    "name": "作者名称"
  }
}
```

**命名规则**：
- 必须是 kebab-case（英文小写 + 连字符）
- 不能有空格或特殊字符
- 版本号从 `0.1.0` 开始

---

### 4.2 Skill——最常用的组件

**位置**：`skills/skill-name/SKILL.md`

#### 文件格式

```markdown
---
name: skill-name
description: >
  用一句话描述这个技能什么时候该被触发。
  包含用户可能说的触发词，如"做XX"、"检查XX"。
  第三人称写法："This skill should be used when..."
---

这里是技能的指令内容。
用祈使句写："做XX"，而不是"你应该做XX"。
```

#### 完整示例

```
skills/
└── meeting-notes/
    ├── SKILL.md
    └── references/
        └── format-guide.md
```

**SKILL.md 内容**：

```markdown
---
name: meeting-notes
description: >
  当用户说"总结这次会议"、"生成会议纪要"、
  "从记录中提取行动项"时使用此技能。
---

从用户提供的内容生成结构化会议纪要。

格式要求：
1. **参会人** — 列出所有参与者
2. **摘要** — 2-3 句话概述
3. **决策** — 编号列表
4. **行动项** — 表格（负责人 | 任务 | 截止日期）
5. **待定问题** — 未解决的问题

写入新文件，命名为"原文件名-notes.md"。
```

#### Skill 进阶：references/ 渐进披露

大型技能不要把所有内容塞进 SKILL.md，用渐进披露：

| 层级 | 内容 | 说明 |
|------|------|------|
| **SKILL.md body** | 核心指令（< 3000 字）| AI 看到这些来决定是否触发 |
| **references/** | 详细文档 | 按需加载，不占主上下文 |
| **examples/** | 代码示例 | 可执行示例 |

---

### 4.3 Agent——自主型子 Agent

**位置**：`agents/agent-name.md`

当任务复杂到需要 AI "思考一会儿"、多步骤推理时用 Agent，普通任务用 Skill 即可。

#### 格式

```markdown
---
name: ticket-analyzer
description: >
  当用户需要分析工单、优先排序、或整理 backlog 时使用。
  包含 <example> 触发场景示例。
model: inherit                  # 继承主模型，或指定 sonnet/opus/haiku
color: cyan                     # 颜色：blue/cyan/green/yellow/magenta/red
tools: ["Read", "Grep"]         # 可选：限制可用工具
---

这里是 Agent 的系统提示词。

定义：
1. **核心职责** — Agent 的主要任务
2. **工作流程** — 分步骤执行过程
3. **输出格式** — 明确的格式要求
```

#### 完整示例

```markdown
---
name: ticket-analyzer
description: >
  当用户需要分析工单、优先排序 backlog 或分类问题时使用。

<example>
Context: sprint planning
user: "帮我整理这些工单的优先级"
assistant: "我来用 ticket-analyzer 分析这些工单"
</example>

model: inherit
color: cyan
tools: ["Read", "Grep"]
---

你是工单分析专家，擅长按优先级、难度和依赖关系排序。

1. 读取所有工单描述
2. 按类型分类（bug/feature/tech-debt）
3. 评估相对难度（S/M/L/XL）
4. 识别依赖关系
5. 按 impact-to-effort 比排序

输出格式：
| 工单 | 类型 | 难度 | 依赖 | 优先级 |
|------|------|------|------|--------|
```

---

### 4.4 Hook——事件触发

**位置**：`hooks/hooks.json`

当需要在特定事件发生时自动动作时用 Hook。

#### 支持的事件

| 事件 | 触发时机 |
|------|---------|
| `PreToolUse` | 工具调用前 |
| `PostToolUse` | 工具调用后 |
| `SessionStart` | 会话开始 |
| `UserPromptSubmit` | 用户发消息时 |
| `Stop` | AI 响应结束时 |

#### 两种 Hook 类型

**Prompt 型**（复杂逻辑，LLM 判断）：

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "检查这个文件写入是否符合项目规范，不符合则阻止。",
          "timeout": 30
        }
      ]
    }
  ]
}
```

**Command 型**（确定性检查）：

```json
{
  "SessionStart": [
    {
      "matcher": "",
      "hooks": [
        {
          "type": "command",
          "command": "cat ${CLAUDE_PLUGIN_ROOT}/context/team-context.md",
          "timeout": 10
        }
      ]
    }
  ]
}
```

---

### 4.5 MCP Server——外部工具集成

**位置**：`.mcp.json`（插件根目录）

#### 三种服务器类型

**stdio**（本地进程）：

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/server.js"],
      "env": {
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

**SSE**（远程，带 OAuth）：

```json
{
  "mcpServers": {
    "asana": {
      "type": "sse",
      "url": "https://mcp.asana.com/sse"
    }
  }
}
```

**HTTP**（REST API）：

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    }
  }
}
```

---

### 4.6 CONNECTORS.md——工具类别占位符

**位置**：插件根目录

如果插件要**分发给他人使用**，需要用类别占位符替代具体工具名：

```markdown
# Connectors

## 工具类别映射

| 类别 | 占位符 | 已包含服务器 | 其他选项 |
|------|--------|------------|---------|
| 聊天工具 | `~~chat` | Slack | Microsoft Teams, Discord |
| 项目跟踪 | `~~project tracker` | Linear | Asana, Jira, Monday |
| 知识库 | `~~knowledge base` | Notion | Confluence, Guru |
```

在 Skill 中这样用：

```markdown
在 ~~project tracker 中查找用户的未完成工单。
将总结发布到 ~~chat 的团队频道。
```

---

## 五、三种复杂度示例

### 示例 1：极简插件（一个 Skill）

```
meeting-notes/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── meeting-notes/
│       └── SKILL.md
└── README.md
```

**plugin.json**：
```json
{
  "name": "meeting-notes",
  "version": "0.1.0",
  "description": "从会议记录生成结构化会议纪要",
  "author": { "name": "User" }
}
```

**SKILL.md**：
```markdown
---
name: meeting-notes
description: >
  当用户说"总结会议"、"生成会议纪要"、"提取行动项"时使用。
---

读取用户提供的会议记录，生成包含以下部分的结构化纪要：
1. 参会人
2. 摘要（2-3句）
3. 决策（编号列表）
4. 行动项（表格）
5. 待定问题

写入新文件：原文件名-notes.md
```

---

### 示例 2：标准插件（Skill + MCP）

```
code-quality/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── coding-standards/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── style-rules.md
│   ├── review-changes/
│   │   └── SKILL.md
│   └── fix-lint/
│       └── SKILL.md
├── .mcp.json
└── README.md
```

这个插件需要接入 GitHub MCP，执行代码审查和 lint 修复。

---

### 示例 3：完整插件（全组件 + CONNECTORS）

```
engineering-workflow/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── team-processes/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── workflow-guide.md
│   ├── standup-prep/
│   │   └── SKILL.md
│   └── create-ticket/
│       └── SKILL.md
├── agents/
│   └── ticket-analyzer.md
├── hooks/
│   └── hooks.json
├── .mcp.json
├── CONNECTORS.md
└── README.md
```

---

## 六、创建流程示例：从需求到插件

**场景**：为一个内容运营团队创建插件

### 阶段 1：Discovery

- 要做什么：帮助团队管理内容发布流程，包括选题、写作、发布
- 目标用户：内容运营团队
- 所需工具：社交媒体 API（Twitter、小红书）、CMS、数据库

### 阶段 2：Component Planning

| 组件 | 数量 | 用途 |
|------|------|------|
| Skills | 3 | 选题分析、内容撰写、发布管理 |
| Agents | 1 | 竞品内容分析 |
| MCP | 2 | 社交媒体 CMS |

### 阶段 3：Design

**Skill 1: topic-research**
- 触发词："研究选题"、"找话题"、"竞品分析"
- 需要 MCP：Exa（搜索）

**Skill 2: content-draft**
- 触发词："起草内容"、"写文案"、"生成帖子"
- 输出格式：标题 + 正文 + 标签

**Skill 3: publish-management**
- 触发词："安排发布"、"发布计划"、"定时发布"
- 需要 MCP：各平台官方 MCP

### 阶段 4：实现

```
content-ops/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── topic-research/
│   │   └── SKILL.md
│   ├── content-draft/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── brand-voice.md
│   └── publish-management/
│       └── SKILL.md
├── agents/
│   └── competitor-analysis.md
├── .mcp.json
└── README.md
```

### 阶段 5：验证与打包

```bash
# 验证插件结构
claude plugin validate ./content-ops/.claude-plugin/plugin.json

# 打包为 .plugin 文件
cd content-ops && zip -r /tmp/content-ops.plugin . -x "*.DS_Store"
cp /tmp/content-ops.plugin /path/to/outputs/content-ops.plugin
```

---

## 七、关键设计原则

| 原则 | 说明 |
|------|------|
| **先小后大** | 一个精心设计的 Skill 胜过五个半成品的组件 |
| **Skill 是给 AI 的指令** | 写 Skill 是告诉 AI 怎么做事，不是写用户文档 |
| **用祈使句** | "做XX"，不要"你应该做XX" |
| **渐进披露** | 核心内容放 SKILL.md，详细内容放 references/ |
| **明确触发词** | description 中包含用户可能说的话 |
| **用 ${CLAUDE_PLUGIN_ROOT}** | 路径引用永远用这个变量，不用硬编码 |

---

## 八、相关资源

| 资源 | 地址 |
|------|------|
| **cowork-plugin-management** | `anthropics/knowledge-work-plugins/cowork-plugin-management` |
| **create-cowork-plugin skill** | 内含完整创建流程 |
| **component-schemas.md** | 各组件详细格式规范 |
| **example-plugins.md** | 三个完整插件示例 |
| **cowork-plugin-customizer** | 定制现有插件的 skill |

---

*最后更新: 2026-04-23*
