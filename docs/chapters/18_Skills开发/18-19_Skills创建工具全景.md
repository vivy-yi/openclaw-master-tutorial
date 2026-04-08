# 18-19 Skills 创建工具全景

> **学习目标**: 全面了解 Skills 创建的工具链，包括官方工具、ClawHub Skills 及第三方方案
> **预计用时**: 25 分钟
> **前置要求**: 掌握 Skills 基础概念（第18章）

---

## 18.19.1 工具全景图

```
Skills 创建工具
├── 🟢 官方内置工具（OpenClaw 自带）
│   ├── openclaw skills CLI
│   ├── init_skill.py
│   ├── package_skill.py
│   └── quick_validate.py
│
├── 🟠 ClawHub Skills（Skills 创建类）
│   ├── skill-builder          ⭐ 推荐
│   ├── skill-template
│   ├── skill-forge           ⚠️ 安全警告
│   └── skill-create-cn
│
└── 🟡 ClawHub Skills（Skills 辅助类）
    ├── skill-test             🛡️ 沙箱测试
    ├── skill-assessment
    └── skill-compiler
```

---

## 18.19.2 官方内置工具

OpenClaw 内置了一套完整的 Skills 创建工具，位于：

```
/opt/homebrew/lib/node_modules/openclaw/skills/skill-creator/scripts/
├── init_skill.py              ← 创建 Skill 目录框架
├── package_skill.py           ← 打包 + 自动校验
├── quick_validate.py           ← 快速格式校验
└── test_package_skill.py      ← 测试打包
```

### openclaw skills CLI

```bash
# 查看帮助
openclaw skills --help

# 输出：
Usage: openclaw skills [options] [command]

Commands:
  check       Check which skills are ready vs missing requirements
  info        Show detailed information about a skill
  install     Install a skill from ClawHub into the active workspace
  list        List all available skills
  search      Search ClawHub skills
  update      Update ClawHub-installed skills in the active workspace
```

### init_skill.py — 初始化框架

```bash
# 创建新 Skill 目录结构
python3 init_skill.py --name my-skill --description "我的自定义技能"

# 输出：
my-skill/
├── SKILL.md
├── references/
├── scripts/
└── assets/
```

### package_skill.py — 打包发布

```bash
# 打包 Skill
python3 package_skill.py my-skill/

# 验证格式（自动校验 SKILL.md）
python3 quick_validate.py my-skill/SKILL.md
```

---

## 18.19.3 skill-creator — 官方 Skill 创建框架

### 核心方法论：渐进式披露（Progressive Disclosure）

```
Level 1: Metadata (name + description) — 始终加载
Level 2: SKILL.md body — Skill 触发时加载
Level 3: Auxiliary files — 按需加载
```

### SKILL.md 格式规范

| 规则 | 说明 |
|------|------|
| **SKILL.md 必须短** | 目标 30-50 行，最多 80 行 |
| **渐进式披露** | 细节移到 auxiliary files |
| **描述要精准** | 一句话，15-25 词，动词开头 |
| **Required Structure** | frontmatter + `## When to Use` + `## Core Rules` |
| **禁止冗余** | 信息只存一处，不重复 |

### 描述写法对比

| ❌ 错误 | ✅ 正确 |
|---------|---------|
| "Use when user needs PDFs" | "Process, merge, and extract PDF content" |
| "Helper for Docker" | "Build, deploy, and debug Docker containers" |
| "Git guide" | "Manage branches, resolve conflicts, and automate workflows" |

### 六步创建流程

```
Step 1: 收集具体示例
Step 2: 规划可复用内容
Step 3: 初始化框架 (init_skill.py)
Step 4: 填充内容
Step 5: 打包验证 (package_skill.py)
Step 6: 真实任务验证
```

---

## 18.19.4 ClawHub Skill 创建类 Skills

### skill-builder ⭐ 推荐

| 属性 | 值 |
|------|---|
| **评分** | ⭐13，4.8k 安装 |
| **作者** | @ivangdavila |
| **安全** | ✅ Benign (高置信) |
| **定位** | 模块化结构 + 渐进式披露 + token 高效设计 |

**核心特点**:
- 与 skill-creator 方法论一致，但作为 Skill 存在
- 含 4 个辅助文件：`setup.md`、`patterns.md`、`memory-template.md`
- 专注于"写给另一个 Agent 的有用信息"

**安装**:

```bash
clawhub install skill-builder
```

### skill-template

| 属性 | 值 |
|------|---|
| **评分** | 576 安装 |
| **安全** | ⚠️ Suspicious (VirusTotal) |
| **定位** | CLI 模板生成器 + 命令框架 + 数据日志管理 |

**⚠️ 安全警告**: VirusTotal 标记为 Suspicious，安装前建议先 review 代码。

### skill-forge

| 属性 | 值 |
|------|---|
| **评分** | ⭐0，668 安装 |
| **安全** | ⚠️ Suspicious (medium confidence) |
| **定位** | 跨生态 9+ 数据源自动发现→评估→集成→验证→发布 |

**核心功能**:
- 多源发现（GitHub/HuggingFace/Reddit/X/ClawHub/OpenAI Skills/Claude Skills）
- 需求感知（Needs-Driven Scout）
- ClawHub 标准输出（`skill.json` + `SKILL.md`）
- 自动分级（auto/confirm/manual 三级）

**⚠️ 安全警告**: 描述承诺广泛的发现/集成 pipeline，但运行时指令引用了元数据中未声明的网络、文件系统、凭据服务。安装前建议 review 代码。

---

## 18.19.5 ClawHub Skill 辅助类 Skills

### skill-test ⭐ 推荐

| 属性 | 值 |
|------|---|
| **评分** | ⭐2，1.7k 安装 |
| **作者** | @ivangdavila |
| **安全** | ✅ Benign (高置信) |

**核心功能**:

| 模式 | 说明 |
|------|------|
| **Trial Mode** | 安装前测试 — 用 sub-agent 隔离测试 |
| **Evaluation Mode** | 发布前评估 — 多维度质量检查 |

**关键原则**: 测试时绝不影响用户环境（Sub-agent 隔离）

**安装**:

```bash
clawhub install skill-test
```

### 其他辅助 Skills

| Skill | 用途 |
|-------|------|
| `skill-assessment` | Skill 质量评估 |
| `skill-compiler` | Skill 编译/构建 |
| `skill-sharpener` | Skill 打磨/精炼 |
| `skill-sonar` | Skill 扫描/检测 |
| `skill-inventory` | Skill 清单管理 |

---

## 18.19.6 Skill 创建工具对比

| 工具 | 类型 | 自动化程度 | 适合场景 | 安全 |
|------|------|-----------|---------|------|
| `init_skill.py` | 官方脚本 | 中等 | 从零创建 Skill 框架 | ✅ |
| `skill-creator` | 官方 Skill | 中等 | 人工主导的 Skill 创建 | ✅ |
| `skill-builder` | ClawHub Skill | 中等 | 渐进式披露最佳实践 | ✅ |
| `skill-template` | ClawHub Skill | 高 | CLI 模板快速生成 | ⚠️ |
| `skill-forge` | ClawHub Skill | 很高 | 全自动流水线 | ⚠️ |
| `skill-test` | ClawHub Skill | 高 | 发布前质量验证 | ✅ |

---

## 18.19.7 推荐工具链组合

### 场景 1: 从零创建新 Skill

```bash
# ① 初始化框架
python3 init_skill.py --name my-skill

# ② 使用 skill-builder 方法论填充
# （读取 skill-builder 的 patterns.md 参考格式）

# ③ 格式校验
python3 quick_validate.py my-skill/SKILL.md

# ④ 沙箱测试
clawhub install skill-test
# 使用 skill-test 进行隔离测试
```

### 场景 2: 从知识/文档蒸馏 Skill

```bash
# 参考 18-18 知识蒸馏方法论
# 使用 knowledge-distillation Skill 扫描 memory/sessions
clawhub install knowledge-distillation

# 然后用 skill-builder 格式化为 Skill
clawhub install skill-builder
```

### 场景 3: 发布前质量验证

```bash
# ① 安装 skill-test
clawhub install skill-test

# ② 使用 skill-test 的沙箱验证
# Trial Mode: 安装前测试
# Evaluation Mode: 发布前多维度评估

# ③ 格式最终校验
python3 package_skill.py my-skill/
```

---

## 相关章节

- [18-18 知识蒸馏](./18-18_知识蒸馏.md) — 从知识到 Skill 的方法论
- [18-20 Skill_Seekers 深度解析](./18-20_Skill_Seekers深度解析.md) — 从外部文档批量创建 Skills
- [18-21 RAG 与 Skills 对比](./18-21_RAG与Skills对比.md) — RAG-MCP 知识库流水线
