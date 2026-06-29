# Workspace Manager

> ClawPad workspace organization assistant. 6种领域模板，一键初始化工作空间。

## 概述

**评分**: ⭐⭐⭐ (3.120)  
**作者**: ClawPad Team  
**触发条件**:
1. 首次设置 - "just set up", "new workspace", "help me organize"
2. 项目创建 - "new project", "create folder structure"
3. 工作空间维护 - "reorganize", "clean up workspace"
4. 文档创建 - "create a plan", "new tracking doc"

---

## 工作原理

```
用户请求 → 识别场景类型
         ↓
询问使用领域（6选1）
         ↓
创建对应目录结构
         ↓
生成 welcome 文档说明
         ↓
提供后续操作建议
```

---

## 6 种领域模板

### 1. Engineering & DevOps

```
infrastructure/     # 云与基础设施文档
  _space.yml → Infrastructure 🏗️

devops/             # CI/CD、流水线
  _space.yml → DevOps 🔧

architecture/       # ADR 与系统设计
  _space.yml → Architecture 📐

security/           # 审计、合规、访问审查
  _space.yml → Security 🔒

team/               # 流程、模板、招聘
  _space.yml → Team 👥

daily-notes/        # 每日日志
  _space.yml → Daily Notes 📝
```

### 2. Research & Academia

```
papers/            # 论文
experiments/        # 实验记录
literature/         # 文献综述
daily-notes/       # 每日日志
```

### 3. Business & Consulting

```
clients/           # 客户
projects/          # 项目
meetings/          # 会议记录
strategy/          # 战略
daily-notes/       # 每日日志
```

### 4. Creative & Writing

```
drafts/            # 草稿
world-building/     # 世界观构建
ideas/             # 创意想法
daily-notes/       # 每日日志
```

### 5. Personal Knowledge

```
notes/             # 笔记
areas-of-life/     # 生活领域
projects/         # 个人项目
references/       # 参考资料
```

### 6. Other

根据用户描述自定义结构

---

## 使用流程

### Step 1: 建立并询问领域

```
Hey! Welcome to ClawPad! I'll help you set up a workspace that fits how you work.

What will you primarily use this for?

1. Engineering & DevOps
2. Research & Academia
3. Business & Consulting
4. Creative & Writing
5. Personal Knowledge
6. Other
```

### Step 2: 创建结构

根据用户响应创建对应目录结构 + `_space.yml` 元数据

### Step 3: 说明并提供下一步

```
Done! I've created your workspace with [X] spaces.

Quick tips:
- Use YYYY-MM suffix for time-bound projects
- Ask for "plan", "tracking doc" or "runbook" anytime
- Tell me when you start a new project

What would you like to work on first?
```

---

## 配置选项

### Space 元数据格式

```yaml
# _space.yml
name: "Space Name"
icon: "🏗️"
color: "#3B82F6"
sort: "alpha"    # alpha | date-asc | date-desc
```

### 可用图标

| 领域 | 图标 |
|------|------|
| Infrastructure | 🏗️ |
| DevOps | 🔧 |
| Architecture | 📐 |
| Security | 🔒 |
| Team | 👥 |
| Notes | 📝 |
| Papers | 📄 |
| Experiments | 🧪 |
| Literature | 📚 |
| Clients | 🤝 |
| Projects | 📁 |
| Meetings | 📅 |
| Drafts | ✍️ |
| Ideas | 💡 |

---

## 命令示例

| 用户意图 | 触发行为 |
|---------|---------|
| `set up my workspace` | 启动 3 步设置流程 |
| `create a new project` | 创建带日期戳的项目目录 |
| `organize my files` | 按领域重组目录 |
| `new tracking doc` | 创建指定类型文档 |

---

## 技术细节

- **位置**: `~/.openclaw/workspace/skills/workspace-manager/`
- **脚本**: 内置于 skill 目录
- **持久化**: 使用 workspace 本地文件系统

---

## 相关链接

- [ClawHub](https://clawhub.ai/s/workspace-manager)