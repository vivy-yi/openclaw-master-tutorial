# Skills（技能系统）

> 源码：`src/agents/system-prompt.ts` — `buildSkillsSection()`，约 line 107
> 参考：https://docs.openclaw.ai/tools/skills

---

## 概述

OpenClaw 使用 **[AgentSkills](https://agentskills.io)-compatible** 的 skill 文件夹结构。
每个 skill 是一个目录，包含 `SKILL.md`（YAML frontmatter + 指令）。
OpenClaw 加载 bundled skills + 可选的本地覆盖，并根据环境、配置和二进制存在性进行过滤。

---

## Skill 加载优先级（6级，高→低）

| #   | 来源 | 路径 | 说明 |
| --- | ---- | ---- | ---- |
| 1   | Workspace skills | `<workspace>/skills` | 仅当前 Agent 可见 |
| 2   | Project agent skills | `<workspace>/.agents/skills` | 仅当前 workspace Agent 可见 |
| 3   | Personal agent skills | `~/.agents/skills` | 本机所有 Agent 共享 |
| 4   | Managed/local skills | `~/.openclaw/skills` | 本机所有 Agent 共享 |
| 5   | Bundled skills | 随安装包一起分发 | 最低优先级的共享 |
| 6   | Extra skill folders | `skills.load.extraDirs`（配置） | 通过配置添加的额外目录 |

**冲突规则**：同名 skill 由最高来源优先覆盖。

---

## Per-agent vs Shared Skills

| Scope | Path | Visible to |
| ---- | ---- | ---- |
| Per-agent | `<workspace>/skills` | 仅该 Agent |
| Project-agent | `<workspace>/.agents/skills` | 仅该 workspace 的 Agent |
| Personal-agent | `~/.agents/skills` | 本机所有 Agent |
| Shared managed/local | `~/.openclaw/skills` | 本机所有 Agent |
| Shared extra dirs | `skills.load.extraDirs`（最低优先级） | 本机所有 Agent |

---

## Agent Skill Allowlists（技能白名单）

**Skill 位置**和 **Skill 可见性**是分开的控制：
- 位置/优先级决定同名 skill 哪个版本获胜
- Agent allowlists 决定某个 Agent 实际上能使用哪些 skills

```json5
{
  agents: {
    defaults: {
      skills: ["github", "weather"],  // 未设置则默认无限制
    },
    list: [
      { id: "writer" },                   // 继承 github, weather
      { id: "docs", skills: ["docs-search"] },  // 替换默认
      { id: "locked-down", skills: [] },  // 无技能
    ],
  },
}
```

**Allowlist 规则：**
- 省略 `agents.defaults.skills` → 默认无限制
- 省略 `agents.list[].skills` → 继承 `agents.defaults.skills`
- 设置 `skills: []` → 该 Agent 无技能
- 非空 `skills` 列表是最终集合，不与 defaults 合并

---

## 配置方式（skills.entries）

```json5
{
  skills: {
    entries: {
      "image-lab": {
        enabled: true,
        apiKey: { source: "env", provider: "default", id: "GEMINI_API_KEY" },
        env: { GEMINI_API_KEY: "..." },
        config: { endpoint: "https://example.invalid", model: "nano-pro" },
      },
      peekaboo: { enabled: true },
      sag: { enabled: false },
    },
  },
}
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `enabled` | boolean | `false` 禁用该 skill |
| `apiKey` | string or SecretRef | 支持 plaintext 或环境变量引用 |
| `env` | Record | 仅在变量未设置时注入 |
| `config` | object | 自定义字段存放位置 |
| `allowBundled` | string[] | 仅允许指定 bundled skills |

---

## SKILL.md 格式

```markdown
---
name: image-lab
description: Generate or edit images via a provider-backed image workflow
---

# Image Lab Skill

Instructions here...
```

**必需字段**：name、description

**可选 frontmatter 字段：**

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `homepage` | string | macOS Skills UI 显示网站 |
| `user-invocable` | boolean | 是否暴露为 slash 命令（默认 true） |
| `disable-model-invocation` | boolean | 不注入 agent 正常 prompt（默认 false） |
| `command-dispatch` | `"tool"` | slash 命令绕过 model 直接 dispatch |
| `command-tool` | string | `command-dispatch: tool` 时调用的工具名 |
| `command-arg-mode` | `"raw"` | 传递原始参数字符串 |

---

## Gating（加载时过滤）

通过 `metadata`（单行 JSON）过滤 skills：

```markdown
---
name: gemini
description: Use Gemini CLI for coding assistance and Google search lookups.
metadata:
  {
    "openclaw":
      {
        "requires":
          { "bins": ["gemini"], "env": ["GEMINI_API_KEY"], "config": ["browser.enabled"] },
        "primaryEnv": "GEMINI_API_KEY",
        "os": ["darwin", "linux"],
        "emoji": "♊️",
      },
  }
---
```

| 字段 | 说明 |
| ---- | ---- |
| `always` | `true` → 始终加载（跳过其他过滤） |
| `os` | 仅在指定平台加载 |
| `requires.bins` | 所有必须存在于 PATH |
| `requires.anyBins` | 至少一个存在于 PATH |
| `requires.env` | 环境变量必须存在 |
| `requires.config` | 配置路径必须为 truthy |
| `primaryEnv` | 与 `skills.entries.<name>.apiKey` 关联 |
| `install` | 安装器规格（brew/node/go/uv/download） |

---

## 安全提示

> ⚠️ 将第三方 skills 视为**不受信任的代码**。启用前先阅读内容。

- Workspace 和 extra-dir skill 发现只接受 SKILL.md 路径在配置根目录内
- Gateway-backed skill 安装运行内置危险代码扫描器
- `skills.entries.*.env` 和 `apiKey` 注入到**主机**进程（非沙箱）

---

## ClawHub（技能市场）

| 操作 | 命令 |
| ---- | ---- |
| 安装到 workspace | `openclaw skills install <skill-slug>` |
| 更新所有已安装 skills | `openclaw skills update --all` |
| 发布/同步更新 | `clawhub sync --all` |

ClawHub 暴露最新安全扫描状态（VirusTotal, ClawScan, 静态分析）。
`openclaw skills install <slug>` 安装到 `<workspace>/skills`。

---

## 源码对应

- Skill 加载优先级：`src/skills/load.ts`
- Skill 过滤：`buildSkillsSection()` in `src/agents/system-prompt.ts`
- SKILL.md 解析：遵循 AgentSkills.io 规范

---

## 相关文档

- [Tools and plugins（总览）](/tools/index)
- [Creating skills（创建技能）](/tools/creating-skills)
- [Plugins（插件系统）](/tools/plugin)
- [Skill Workshop plugin](/plugins/skill-workshop)
- [Skills config（配置参考）](/tools/skills-config)
- [Slash commands（斜杠命令）](/tools/slash-commands)