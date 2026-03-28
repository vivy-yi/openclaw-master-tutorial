# 第18章 Skills 开发与生态

> **本章学习目标**: 掌握 Skills 生态体系、一键安装技能、以及 Control UI 中的 Skills 可视化管理
> **预计用时**: 45-60 分钟
> **前置要求**: 完成基础部署，了解 Agent 基本概念

---

## 18.1 Skills 生态概览

### 什么是 Skills

```
┌─────────────────────────────────────────────────────────────┐
│                     Skills = 能力封装                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Skills = 提示词模板 + 工具配置 + 工作流定义                  │
│                                                              │
│  一个 Skill 包含：                                           │
│  ├── SKILL.md       — 技能描述与触发条件                     │
│  ├── prompt.md      — 提示词模板（可选）                      │
│  ├── tools.json     — 所需工具配置（可选）                    │
│  └── config.yaml    — 技能参数（可选）                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Skills vs Tools

| 维度 | Tools | Skills |
|------|-------|--------|
| 复杂度 | 单一工具调用 | 多工具 + 提示词 + 工作流 |
| 适用场景 | 原子操作（读文件、搜索） | 复杂任务（代码审查、数据分析） |
| 配置方式 | openclaw.json | Skill 目录 + SKILL.md |
| 可组合性 | 独立使用 | 可嵌套、可组合 |

---

## 18.2 v2026.3.24 新功能：一键安装

### 概述

v2026.3.24 新增了 **bundled skills 一键安装** 支持，通过 `clawhub` CLI 可直接安装以下技能：

| Skill | 说明 | 命令 |
|-------|------|------|
| `coding-agent` | 编码助手（Codex/Claude Code/Pi） | `clawhub install coding-agent` |
| `gh-issues` | GitHub Issues 管理 | `clawhub install gh-issues` |
| `tmux` | tmux 会话控制 | `clawhub install tmux` |
| `weather` | 天气预报 | `clawhub install weather` |

### 安装步骤

```bash
# 1. 确认 clawhub 已安装
which clawhub

# 2. 查看可用 Skills
clawhub search <关键词>

# 3. 一键安装
clawhub install <skill-name>

# 4. 验证安装
clawhub list
```

### clawhub 常用命令

```bash
# 搜索 Skills
clawhub search "github"

# 安装
clawhub install gh-issues

# 更新到最新版本
clawhub update gh-issues

# 更新到指定版本
clawhub update gh-issues --version 1.2.0

# 卸载
clawhub uninstall gh-issues

# 查看已安装列表
clawhub list

# 查看 Skill 详情
clawhub info gh-issues
```

### 安装来源

| 来源 | 说明 | 命令 |
|------|------|------|
| ClawHub 官方市场 | 社区维护的公开 Skills | `clawhub install <name>` |
| 本地路径 | 本地开发的 Skills | `clawhub install --path ./my-skill` |
| Git URL | 直接从 Git 安装 | `clawhub install --git https://github.com/user/repo` |

---

## 18.3 Control UI 中的 Skills 管理

### Skills 状态标签页（v2026.3.24 新增）

v2026.3.24 在 Control UI 中新增了 Skills 状态过滤标签页，分为四类：

| 状态 | 说明 | 标识 |
|------|------|------|
| **All** | 显示所有已安装 Skills | — |
| **Ready** | 可立即使用（已配置完成） | 🟢 绿色 |
| **Needs Setup** | 需要配置（缺少 API Key 等） | 🟡 黄色 |
| **Disabled** | 已被禁用 | ⚫ 灰色 |

### 查看 Skills 详情

在 Control UI 中点击任意 Skill，可打开详情对话框，显示：

- Skill 描述与用途
- 当前 agent 的可用工具列表
- 配置状态（Ready / Needs Setup）
- 相关文档链接

### Available Right Now（v2026.3.24 新增）

Control UI 新增 **"Available Right Now"** 面板，显示当前 Agent 实际可以使用的工具列表（根据当前配置和权限动态计算）。

---

## 18.4 常用内置 Skills

### 代码开发类

| Skill | 用途 | 触发词 |
|-------|------|--------|
| `coding-agent` | 编程任务（代码生成/修复/重构） | "帮我写代码"、"修复这个 bug" |
| `code-review` | 代码审查与规范检查 | "审查这段代码" |
| `test-generator` | 单元测试与集成测试生成 | "生成测试" |

### GitHub 集成类

| Skill | 用途 | 触发词 |
|-------|------|--------|
| `gh-issues` | Issue 管理、PR 审查 | "查看 GitHub issues"、"创建 PR" |

### 系统工具类

| Skill | 用途 | 触发词 |
|-------|------|--------|
| `tmux` | tmux 会话控制 | "创建 tmux session"、"列出窗口" |
| `weather` | 天气预报 | "今天天气怎么样" |

### 效率类

| Skill | 用途 | 触发词 |
|-------|------|--------|
| `summarize` | 长文本/音视频摘要 | "总结这个视频"、"总结这篇文章" |
| `blogwatcher` | RSS/博客订阅监控 | "监控我的订阅更新" |

---

## 18.5 自定义 Skill 开发

### Skill 目录结构

```
~/.openclaw/skills/my-skill/
├── SKILL.md       ← 必需：技能定义文件
├── prompt.md      ← 可选：提示词模板
├── tools.json     ← 可选：工具配置
├── config.yaml    ← 可选：技能参数
└── scripts/       ← 可选：辅助脚本
    └── helper.sh
```

### SKILL.md 格式

```markdown
# 我的自定义 Skill

## 描述
这是一个用于XXX的 Skill。

## 触发条件
当用户说"XXX"时触发。

## 使用的工具
- read
- exec

## 参数
| 参数名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| target | string | 目标文件/路径 | - |

## 工作流程
1. 读取目标文件
2. 执行分析
3. 返回结果
```

### 注册自定义 Skill

将 Skill 目录放到以下任一路径，OpenClaw 会自动加载：

```bash
# 用户级（推荐）
~/.openclaw/skills/my-skill/

# 项目级
./skills/my-skill/

# 系统级（需要 root）
/opt/openclaw/skills/my-skill/
```

### 测试 Skill

```bash
# 在 Control UI 中查看是否显示为 Ready
# 或通过 CLI 测试

openclaw skills list
openclaw skills validate my-skill
```

---

## 18.6 常见问题

### Q1: Skill 显示 "Needs Setup"

```
原因：Skill 缺少必要的配置（如 API Key）

解决：
1. 点击 Skill 详情查看缺少哪些配置
2. 在 openclaw.json 中补充配置
3. 或通过环境变量注入敏感信息
```

### Q2: Skill 安装失败

```bash
# 检查 clawhub 版本
clawhub --version

# 更新到最新版本
clawhub update

# 手动安装（备选）
git clone <repo-url> ~/.openclaw/skills/<skill-name>
```

### Q3: Skill 与预期行为不符

```bash
# 查看 Skill 加载日志
openclaw gateway logs | grep skill

# 检查 SKILL.md 触发条件是否正确
# 修改后重启 Gateway 生效
openclaw gateway restart
```

---

## 18.7 最佳实践

```
✅ 推荐做法：

1. 优先使用官方 bundled skills
   → 经过测试，稳定可靠

2. 自定义 Skill 使用固定格式 SKILL.md
   → 便于管理和分享

3. 敏感配置用环境变量而非明文
   → 避免泄露 API Key

4. 发布到 ClawHub 共享社区
   → 帮助其他人复用

❌ 避免做法：

1. 不建议修改 bundled skills 源码
   → 升级时会覆盖

2. 不建议在 Skill 中直接写死凭据
   → 安全风险
```

---

## 18.8 Ontology 知识图谱

### 概述

Ontology 是一个**类型化知识图谱**系统，用于结构化 Agent 记忆、实体管理和关系推理。

| 属性 | 说明 |
|------|------|
| **类型** | 知识图谱 |
| **用途** | 创建/查询实体、链接关系、验证约束 |
| **触发词** | "remember", "link X to Y", "show dependencies" |
| **内置类型** | Person, Project, Task, Event, Document 等 |

### 核心能力

- ✅ 类型化实体管理
- ✅ 关系链接（has_owner, blocks, related_to 等）
- ✅ 约束验证（必填字段、枚举值、循环检测）
- ✅ 图遍历查询
- ✅ 与其他 Skill 集成（因果记录、跨 Skill 通信）

### 内置类型

| 类别 | 类型 |
|------|------|
| 人员组织 | Person, Organization |
| 工作 | Project, Task, Goal |
| 时间地点 | Event, Location |
| 信息 | Document, Message, Note |
| 凭证设备 | Account, Device, Credential |

### 快速使用

```bash
# 创建实体
python3 -m src.cli create --type Person --props '{"name":"Alice"}'

# 链接关系
python3 -m src.cli relate --from proj_001 --rel has_owner --to p_001

# 查询
python3 -m src.cli query --type Task --where '{"status":"open"}'
```

### 安装

```bash
git clone https://github.com/hiveminderbot/ontology.git ~/.openclaw/skills/ontology
```

详见：[18-8_ontology知识图谱.md](18-8_ontology知识图谱.md)

---

## 18.9 Proactive Self-Improving Agent

### 概述

自动捕获经验并安全进化的 Skill。让 Agent 在日常工作中自动识别错误、纠正和最佳实践，结构化记录，安全地将经验沉淀为长期能力。

| 属性 | 说明 |
|------|------|
| **类型** | 自我改进 |
| **用途** | 错误记录、经验积累、能力进化 |
| **触发** | 命令失败、用户纠正、任务完成时 |

### 核心能力

- ✅ 7 种触发场景自动记录
- ✅ 经验进化路径（pending → resolved → promoted）
- ✅ 去重原则（避免重复记录）
- ✅ 安全护栏（ADL + VFM 协议）
- ✅ 操作日志（CHANGELOG.md）

### 触发条件

| 场景 | 记录到 | 类别 |
|------|--------|------|
| 命令/操作失败 | ERRORS.md | - |
| 用户纠正 | LEARNINGS.md | `correction` |
| 发现更好做法 | LEARNINGS.md | `best_practice` |
| 任务完成时 | LEARNINGS.md | `task_review` |
| 同一模式 ≥3 次 | **晋升到永久文件** | - |

### 进化路径

```
.learnings/*.md          （原始记录）
      │
      │  反复出现 or 足够重要
      ▼
AGENTS.md / TOOLS.md     （晋升为永久规则）
      │
      │  足够通用 + 可独立
      ▼
skills/<new-skill>/     （提取为独立技能）
```

### 安装

```bash
git clone https://github.com/claw-opus/proactive-self-improving-agent.git ~/.openclaw/skills/proactive-self-improving
```

详见：[18-9_proactive-self-improving.md](18-9_proactive-self-improving.md)

---

## 18.10 CLI 转化技术

> ⚠️ **此内容已移至独立章节**
>
> CLI 转化技术是一个独立的主题，现已移到 **第21章 CLI 工具与命令行开发**。
>
> 本节仅作概述。

### 概述

将各种工具/API/MCP Server 转化为统一的 CLI 接口，让 AI Agent 可以通过标准 shell 命令调用任意工具。

### 三种转化模式

| 技术 | 输入 | 输出 | 代表项目 |
|------|------|------|----------|
| **MCP → CLI** | MCP Server | CLI 包装 | mcp2cli |
| **API → CLI** | OpenAPI/Discovery | 完整 CLI | Google Workspace CLI |
| **NL → CLI** | 源码/GUI | 完整项目 | CLI-Anything |

### 核心价值

| 技术 | 核心价值 |
|------|----------|
| mcp2cli | 解决 MCP Tool Schema 的 Token 膨胀问题（节省 96-99%） |
| Google Workspace CLI | 动态适配 API 变化，零维护成本 |
| CLI-Anything | 将任意软件 AI Agent 化，自动生成 SKILL.md |

详见：[第21章 CLI 工具与命令行开发](../21_CLI工具与命令行开发/README.md)

---

## 相关参考

- [ClawHub 官方市场](https://clawhub.ai)
- [docs/07_tools_skills/5.3_skills_system.md](../../docs/07_tools_skills/5.3_skills_system.md)
- [docs/07_tools_skills/5.7_clawhub.md](../../docs/07_tools_skills/5.7_clawhub.md)
