---
summary: "Build and test custom workspace skills with SKILL.md"
title: "Creating skills"
read_when:
  - You are creating a new custom skill in your workspace
  - You need a quick starter workflow for SKILL.md-based skills
sidebarTitle: "Creating skills"
---

Skills teach the agent how and when to use tools.
Each skill is a directory containing a `SKILL.md` file with YAML frontmatter and markdown instructions.

## 创建流程

<Steps>
  <Step title="Create the skill directory">
    Skills live in your workspace. Create a new folder:

    ```bash
    mkdir -p ~/.openclaw/workspace/skills/hello-world
    ```

  </Step>
  <Step title="Write SKILL.md">
    Create `SKILL.md` inside that directory.

    ```markdown
    ---
    name: hello-world
    description: A simple skill that says hello.
    ---

    # Hello World Skill

    When the user asks for a greeting, use the `echo` tool to say
    "Hello from your custom skill!".
    ```

    Use hyphen-case with lowercase letters, digits, and hyphens for the skill
    `name`. Keep the folder name and frontmatter `name` aligned.

  </Step>
  <Step title="Add tools (optional)">
    You can define custom tool schemas in the frontmatter or instruct the agent
    to use existing system tools (like `exec` or `browser`). Skills can also
    ship inside plugins alongside the tools they document.

  </Step>
  <Step title="Load the skill">
    Start a new session so OpenClaw picks up the skill.

    ```bash
    openclaw gateway restart
    ```

  </Step>
</Steps>

---

## SKILL.md 格式

### 必须字段

```yaml
---
name: skill-name  # hyphen-case
description: A brief description of what this skill does.
---
```

### 可选 frontmatter

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `homepage` | string | macOS Skills UI 显示的网站 URL |
| `user-invocable` | boolean | 是否暴露为 slash 命令（默认 true） |
| `disable-model-invocation` | boolean | 不注入 agent 正常 prompt（默认 false） |
| `command-dispatch` | `"tool"` | slash 命令绕过 model 直接 dispatch |
| `command-tool` | string | `command-dispatch: tool` 时调用的工具名 |

### 示例

```markdown
---
name: github
description: GitHub repository management. Use when user asks about repos, issues, PRs, or GitHub operations.
metadata:
  {
    "openclaw": {
      "requires": { "bins": ["gh"] },
      "emoji": "🐙",
    },
  }
---

# GitHub Skill

## When to use
- User asks about GitHub repositories
- Managing issues, PRs, or releases
- Checking CI/CD status

## How to use
1. Use `gh auth status` to verify authentication
2. Use `exec` tool to run `gh` commands
3. Format output clearly for the user

## Common commands
- `gh repo list <user>` — list repositories
- `gh issue list` — list issues
- `gh pr list` — list pull requests
```

---

## Gating（加载条件）

通过 `metadata` 控制技能加载条件：

```markdown
---
name: gemini
description: Use Gemini CLI for coding assistance.
metadata:
  {
    "openclaw": {
      "requires": { "bins": ["gemini"], "env": ["GEMINI_API_KEY"] },
      "os": ["darwin", "linux"],
    },
  }
---
```

---

## 最佳实践

1. **描述要精确**：让 agent 能通过 description 准确匹配
2. **使用 hyphen-case**：name 和文件夹名保持一致
3. **不要在 skill 里执行危险操作**：优先使用工具而非直接 exec
4. **保持简洁**：Skill 描述应简洁，详细信息放在正文

---

## 调试

1. 检查 skill 是否被加载：查看 `<available_skills>` 中的 name
2. 确认 SKILL.md 路径正确：在 `<available_skills>` 的 `<location>` 中
3. 重启 session：Skills snapshot 在 session 开始时创建

---

## 相关文档

- [Skills（技能系统）](/tools/skills)
- [Plugins（插件系统）](/tools/plugin)
- [ClawHub](/tools/clawhub)
- [Skill Workshop plugin](/plugins/skill-workshop)
