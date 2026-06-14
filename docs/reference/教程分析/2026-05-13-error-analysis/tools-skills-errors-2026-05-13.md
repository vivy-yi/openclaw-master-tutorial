# Tools/Skills 模块错误分析

**分析日期**: 2026-05-13
**教程路径**: `/Volumes/waku/github-维护/openclaw-master-tutorial/docs/chapters/`
**官方路径**: `/opt/homebrew/lib/node_modules/openclaw/docs/tools/`

---

## 一、错误总览

| 严重程度 | 文件 | 错误类型 | 说明 |
|---------|------|---------|------|
| 🔴 高 | 10.1_tools_overview.md | 数字错误 | Layer 工具数量与官方不符 |
| 🔴 高 | 10.3_skills_system.md | 概念错误 | Skill 架构描述与官方严重偏离 |
| 🔴 高 | 10.5_custom_skill.md | 结构错误 | Skill 文件结构与官方规范不符 |
| 🟡 中 | 08.3_custom_tool.md | 格式错误 | 工具配置格式与官方 exec.md 不符 |
| 🟡 中 | 08.2_plugin_dev.md | 措辞错误 | 插件 Manifest 描述不准确 |

---

## 二、错误详解

### 1. [10.1_tools_overview.md] 三层架构工具数量严重失实

**错误位置**: 5.1.1 / 5.1.2 / 5.1.3 章节

**错误内容**:
```
Layer 1 Core（8个工具）：read / write / edit / exec / process / web_search / web_fetch / apply_patch
Layer 2 Advanced（17个工具）：browser / image / memory_search / memory_get / canvas / nodes / sessions_list / sessions_send / message / cron / gateway
Layer 3 Knowledge（53+ Skills）：12大分类
```

**官方事实**:
官方 `index.md` 的 Built-in tools 列表包含：

| Tool | 官方分类 |
|------|---------|
| `exec` / `process` | 核心工具 |
| `code_execution` | 核心工具（教程完全未提及） |
| `browser` | 浏览器工具 |
| `web_search` / `x_search` / `web_fetch` | Web 工具 |
| `read` / `write` / `edit` | 文件工具 |
| `apply_patch` | exec 的子工具（非独立工具） |
| `message` | 消息工具 |
| `canvas` | Canvas 工具 |
| `nodes` | 节点工具 |
| `cron` / `gateway` | 自动化/系统工具 |
| `image` / `image_generate` | 图像工具 |
| `music_generate` | 音乐工具 |
| `video_generate` | 视频工具 |
| `tts` | TTS 工具 |
| `sessions_*` / `subagents` / `agents_list` | 会话工具 |
| `session_status` | 会话工具 |

**问题**:
1. `apply_patch` 在官方 `exec.md` 明确定义为 `exec` 的子工具（`apply_patch is a subtool of exec`），不是独立的核心工具
2. `code_execution`（沙箱 Python）完全未出现在教程的任意层
3. "17个进阶层"这个数字官方从未提及
4. "53+ Skills" 和 "12大分类" 官方无此统计数据
5. 官方的三层模型是 **Tools / Skills / Plugins**，不是教程中的 Layer 1/2/3 架构

**正确内容**: 删除捏造的工具数量，以官方 `index.md` 的 Built-in tools 表格为准

---

### 2. [10.3_skills_system.md] Skill 架构描述严重偏离官方

**错误位置**: 5.3.1 ~ 5.3.8 整章

#### 错误 2.1: 文件结构 `tools.json` 和 `config.yaml` 是非官方结构

**错误内容**:
```
skills/
├── my-skill/
│   ├── SKILL.md          # 技能定义
│   ├── prompt.md         # 提示词模板
│   ├── tools.json        # 工具配置      ← 不存在
│   └── config.yaml       # 技能配置      ← 不存在
```

**官方事实**（来自 `creating-skills.md`）:

> Skills teach the agent how and when to use tools. Each skill is a directory
> containing a `SKILL.md` file with YAML frontmatter and markdown instructions.

官方 Skill 只需要 `SKILL.md` 一个文件。`prompt.md`、`tools.json`、`config.yaml` 均不在官方规范中。

**正确内容**:
```
my-skill/
└── SKILL.md    # 唯一的必需文件
```

---

#### 错误 2.2: Skill 元数据字段 `hook` 的行为描述错误

**错误内容**:
教程在 5.3.3 节大段描述 `hook: SessionStart` 的行为，包括 "Skill 出现在 `<available_skills>` XML 目录中"，然后用 Plugin Hook 系统（`before_prompt_build`）来解释"真正的内容注入"。

**官方事实**（来自 `skills.md` 和 `creating-skills.md`）:

官方 `skills.md` 中 SKILL.md 的 frontmatter 字段：

| 官方字段 | 说明 |
|---------|------|
| `name` | 唯一标识符 |
| `description` | 一行描述 |
| `metadata.openclaw.requires.bins` | 必需二进制 |
| `metadata.openclaw.requires.config` | 必需配置 |
| `metadata.openclaw.os` | OS 过滤 |
| `user-invocable` | 暴露为 slash 命令 |
| `disable-model-invocation` | 保持指令不在 prompt 中 |
| `command-dispatch: tool` | bypass LLM 直接调用工具 |

**官方没有 `hook` 字段**。官方通过 `metadata.openclaw` 的各种 gate 条件控制 Skill 加载，通过 `disable-model-invocation` 控制是否注入 prompt。

Skill 加载流程：OpenClaw 在 session 开始时扫描所有 skill 目录，将符合条件的 skill 的 `name/description/location` 注入 `<available_skills>` XML 目录。Agent 根据描述匹配后用 `read` 工具主动读取 SKILL.md。

**关键错误**: 教程自行发明了 `hook` 参数并详细描述其行为，但这个字段在官方文档中根本不存在。`before_prompt_build` Plugin Hook 是插件开发者的 API，不是 Skill 系统的组成部分。

---

#### 错误 2.3: "1800+ Skills 生态" 数据无据

**错误内容**:
```
1800+ Skills 生态 ⭐
```

**官方事实**: 官方 `skills.md` 只提到 "Browse https://clawhub.ai"。ClawHub 上的实际 Skill 数量并非官方文档的统计数据。1800+ 这个数字无官方依据。

---

#### 错误 2.4: 捏造的系统架构图

**错误内容**:
```
┌─────────────────────────────────────────┐
│ Skill Dispatcher                        │
│ Skill Executor                          │
└─────────────────────────────────────────┘
```

**官方事实**: 官方 `skills.md` 和 `creating-skills.md` 均未提及 "Skill Dispatcher" 或 "Skill Executor" 这些内部组件名称。这是教程自行发明的描述。

---

#### 错误 2.5: Skill 触发词语法错误

**错误内容**:
```
使用 @code-review 调用
```

**官方事实**（来自 `skills.md`）:

> When `user-invocable: true` (default), the skill is exposed as a user slash command.

官方 Skill 通过 slash command 调用，格式为 `/skill-name`（如 `/code-review`），而不是 `@code-review`。

---

### 3. [10.5_custom_skill.md] 自定义技能文件结构完全错误

**错误位置**: 5.5.2 技能文件结构

**错误内容**:
```
my-custom-skill/
├── SKILL.md           # 技能定义（必需）
├── prompt.md          # 提示词模板     ← 不存在
├── tools.json         # 工具配置       ← 不存在
├── examples.md        # 使用示例       ← 不存在
├── config.yaml        # 配置文件       ← 不存在
└── icon.svg          # 图标            ← 不存在
```

**官方事实**: 只需 `SKILL.md`。官方示例：

```markdown
---
name: hello-world
description: A simple skill that says hello.
---

# Hello World Skill
[instructions...]
```

---

### 4. [10.5_custom_skill.md] 工作流配置格式非官方

**错误位置**: 5.5.6 高级特性

**错误内容**:
```yaml
workflow:
  - if: security_scan
    steps:
      - tool: grep
```

**官方事实**: 官方 `creating-skills.md` 的 Skill 格式是纯 Markdown 指令，没有任何 YAML `workflow` 字段、步骤定义、条件分支或循环结构。Skill 通过自然语言指令告诉 Agent 应该做什么，而不是声明式工作流配置。

---

### 5. [08.3_custom_tool.md] 工具配置格式与官方 exec.md 不符

**错误位置**: 12.3.2 配置示例

**错误内容**:
```json5
{
  tools: {
    profile: 'coding',
    deny: ['group:runtime', 'write', 'edit', 'apply_patch'],
  },
  channels: {
    ops: {
      groups: {
        '*': {
          tools: { deny: ['group:runtime'] },
          toolsBySender: {
            'admin_user': { alsoAllow: ['group:fs'] },
          },
        },
      },
    },
  },
}
```

**官方事实**（来自 `index.md` 和 `exec.md`）:

官方工具配置结构：
```json5
{
  tools: {
    allow: ["group:fs", "browser", "web_search"],
    deny: ["exec"],
  },
}
```

关于 `alsoAllow` 和 `toolsBySender`，官方 `index.md` 中 `byProvider` 的结构是：
```json5
{
  tools: {
    profile: "coding",
    byProvider: {
      "google-antigravity": { profile: "minimal" },
    },
  },
}
```

教程中的 `channels.*.groups.*.tools` 和 `toolsBySender` 结构在官方文档的工具配置部分未找到对应描述。`channels` 配置是 channel 层面的配置，不是 `tools` 层面的标准结构。

另外，`deny: ['group:runtime', 'write', 'edit', 'apply_patch']` 中 `apply_patch` 不是独立工具，而是 `exec` 的子工具，官方 `exec.md` 明确说 "Deny `group:fs` when patch writes should also be blocked"。

---

### 6. [08.2_plugin_dev.md] 插件 Manifest 描述不准确

**错误位置**: 12.2.1

**错误内容**:
> 插件是"运行在 Gateway 进程内的 TypeScript 模块"

**官方事实**（来自 `plugin.md`）:

> A plugin is a package that can register any combination of capabilities:
> channels, model providers, agent harnesses, **tools**, skills, speech, realtime
> transcription, realtime voice, media-understanding, image generation, video
> generation, web fetch, web search, and more.

插件是 **npm 包**（或本地目录/git/归档），不是"TypeScript 模块"这么简单的描述。OpenClaw 支持 npm / git / 本地路径 / 归档多种安装方式。

另外，Manifest 文件名在官方是 `openclaw.plugin.json`（教程正确），但官方明确说明 "Plugin dependency installation happens only during explicit install/update or doctor repair flows"，而教程说"系统在渲染表单或校验配置时，不会执行第三方插件底层代码"——这句话本身是对的，但结合整体措辞容易误导为插件代码会被执行。

---

## 三、正确架构（官方）

### 3.1 工具系统架构（来自 `index.md`）

```
Tools (工具)
├── Built-in tools（内置，约 25+ 个）
│   ├── 文件: read, write, edit
│   ├── 执行: exec, process, code_execution
│   ├── 浏览器: browser
│   ├── Web: web_search, x_search, web_fetch
│   ├── 图像: image, image_generate
│   ├── 媒体: music_generate, video_generate, tts
│   ├── 会话: sessions_*, subagents, agents_list, session_status
│   ├── 其他: canvas, nodes, cron, gateway, message
│   └── apply_patch（exec 的子工具）
│
├── Plugin-provided tools（插件注册）
│
├── MCP tools（通过 MCP 协议）
│
└── Tool 配置（allow/deny/group/profile/byProvider）

Skills（技能）
├── SKILL.md 文件（唯一必需）
├── 存放位置（优先级从高到低）:
│   1. <workspace>/skills
│   2. <workspace>/.agents/skills
│   3. ~/.agents/skills
│   4. ~/.openclaw/skills
│   5. 捆绑技能
│   6. skills.load.extraDirs
│
└── Frontmatter 字段:
    name, description, metadata.openclaw.*, user-invocable,
    disable-model-invocation, command-dispatch, command-tool

Plugins（插件）
├── npm 包 / git / 本地路径
├── openclaw.plugin.json Manifest
└── 注册能力: channels, model providers, tools, skills, speech,
    media, image generation, video generation, web fetch/search
```

### 3.2 Skill 文件规范（来自 `creating-skills.md`）

**唯一必需文件**: `SKILL.md`

**最小格式**:
```markdown
---
name: my-skill
description: A short description shown to the agent.
---

# My Skill

[Markdown instructions for the agent on when and how to use this skill.]
```

**可选 frontmatter 字段**:
```yaml
name: image-lab
description: Generate or edit images via a provider-backed image workflow
metadata:
  { "openclaw": { "requires": { "bins": ["uv"] } } }
```

**不需要**: `prompt.md`, `tools.json`, `config.yaml`, `workflow.yaml`

### 3.3 工具 Allow/Deny 配置（来自 `index.md`）

```json5
{
  tools: {
    profile: "coding",  // full | coding | messaging | minimal
    allow: ["group:fs", "browser"],
    deny: ["group:runtime"],
    byProvider: {
      "google-antigravity": { profile: "minimal" },
    },
    alsoAllow: ["browser"],  // 扩展 profile
  },
}
```

Tool Groups:
- `group:runtime` = exec, process, code_execution
- `group:fs` = read, write, edit, apply_patch
- `group:sessions` = sessions_list, sessions_history, sessions_send, sessions_spawn, sessions_yield, subagents, session_status
- `group:memory` = memory_search, memory_get
- `group:web` = web_search, x_search, web_fetch
- `group:ui` = browser, canvas
- `group:automation` = cron, gateway
- `group:messaging` = message
- `group:nodes` = nodes
- `group:agents` = agents_list
- `group:media` = image, image_generate, music_generate, video_generate, tts

---

## 四、修复建议

1. **删除捏造数据**: 三层架构的工具数量、"1800+ Skills"、"12大分类" 等数字全部删除，以官方文档实际内容为准
2. **删除非标准字段**: `hook` 参数、`Skill Dispatcher/Executor` 架构、`workflow` YAML 配置、`prompt.md/tools.json/config.yaml` 文件结构
3. **统一引用官方格式**: Skill 文件结构以 `creating-skills.md` 为准；工具配置以 `index.md` 和 `exec.md` 为准
4. **修正 section 编号**: 教程章节编号（如"12.3"、"5.3"）与文件路径（第08章、第10章）不对应，需要统一为 XX.Y 格式匹配所在章节