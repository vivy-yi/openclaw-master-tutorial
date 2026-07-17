# Skill 设计方法论完全指南

> 基于官方 `skill-creator` Skill 的完整方法论，适用于创建高质量、可复用的 OpenClaw Skills

---

## 一、核心原则

### 1.1 Concise is Key — 上下文窗口是公共资源

```
┌─────────────────────────────────────────────────────────────┐
│                   Concise is Key                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Skill 与以下所有内容共用上下文窗口：                        │
│  • 系统提示词                                                │
│  • 对话历史                                                  │
│  • 其他 Skills 的元数据                                      │
│  • 当前用户请求                                              │
│                                                              │
│  每个段落都要反问：                                          │
│  「这段内容值多少 token？」                                  │
│  「Agent 真的需要这个解释吗？」                              │
│                                                              │
│  ✅ 用简洁示例替代冗长解释                                    │
│  ✅ 默认假设：Agent 已经足够聪明                              │
│  ✅ 只添加 Agent 本身不具备的内容                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**反面案例：**
```markdown
<!-- ❌ 冗长解释 - Agent 已知的内容 -->
首先，我们需要理解什么是变量。变量是存储数据的容器...
你可以通过赋值来创建变量，例如：x = 5
```

**正面案例：**
```markdown
<!-- ✅ 简洁指令 - 直接给出 Agent 需要的信息 -->
用 Python 读取 CSV 文件：
import pandas as pd
df = pd.read_csv('data.csv')
```

---

### 1.2 Degrees of Freedom — 设定适当的自由度

根据任务特性选择约束程度：

| 自由度 | 形式 | 适用场景 |
|--------|------|---------|
| **高自由度** | 文本指令 | 多方案有效、依赖上下文、启发式决策 |
| **中自由度** | 伪代码 / 参数化脚本 | 存在首选模式、可接受一定变化 |
| **低自由度** | 固定脚本 | 操作脆弱易错、一致性关键、必须按特定顺序执行 |

```
把 Agent 想象成在探索路径：

开阔场地（高自由度）
┌────────────────────────────────┐
│                                │
│    多条路径都可达目的地         │
│                                │
└────────────────────────────────┘
→ 用文本指令，让 Agent 自己判断

窄桥（低自由度）
┌───────────╱╲──────────────────┐
│          /  \                  │
│    ← Agent 必须沿桥走          │
└───────────────────────────────┘
→ 用固定脚本，防止 Agent 掉下悬崖
```

**示例：**

```markdown
<!-- 高自由度：文案撰写允许多种风格 -->
用户想要的产品文案风格？分析以下要素后自行决定：
- 目标用户画像（年龄、职业、痛点）
- 产品核心卖点
- 品牌调性（高端/亲民/专业）

直接输出 3 个候选版本，标注各自适用场景。
```

```markdown
<!-- 低自由度：危险的数据库操作必须精确 -->
执行 SQL 更新：
1. 先 SELECT 确认 WHERE 条件命中正确的记录
2. 执行 UPDATE，必须包含 WHERE id = ?
3. 执行后再次 SELECT 确认变更成功
⚠️ 没有 WHERE 条件的 UPDATE 被自动拒绝
```

---

## 二、Skill 结构解剖

### 2.1 标准目录结构

```
skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter (必需)
│   │   ├── name: (必需)
│   │   └── description: (必需)
│   └── Markdown body (必需)
└── Bundled Resources (可选)
    ├── scripts/           # 确定性可执行代码
    ├── references/        # 按需加载的参考文档
    └── assets/            # 输出中使用的文件
```

### 2.2 SKILL.md — 必需文件

每个 `SKILL.md` 包含：

```
┌─────────────────────────────────────────────────────────────┐
│                      SKILL.md 结构                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. YAML frontmatter (必需)                                 │
│     └── name: 技能名称                                       │
│     └── description: 触发描述（见 2.3 详解）                │
│                                                              │
│  2. Markdown body (必需)                                    │
│     └── 触发后加载的指令和指导                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Frontmatter — description 是核心触发机制

**description 是 Agent 判断「何时使用此 Skill」的唯一依据**

| 字段 | 要求 | 说明 |
|------|------|------|
| `name` | 必需 | 技能名称，用连字符分隔（kebab-case） |
| `description` | **最关键** | 触发条件 + 功能描述，Agent 始终读取 |

**description 写法规范：**

```yaml
---
name: pdf-processor
description: >-
  Use when processing, extracting, or analyzing PDF documents.
  Triggers on: "read PDF", "extract text from PDF", "merge PDFs",
  "split PDF", "convert PDF to text", or any PDF-related task.
---

# ❌ 错误：太模糊
description: "PDF helper tool"

# ✅ 正确：包含触发词 + 功能范围
description: >-
  Process, merge, split, and extract content from PDF documents.
  Triggers on: "read PDF", "extract text", "merge PDFs", "split PDF",
  "PDF to text", or any PDF manipulation task.
```

**description 最佳实践：**

1. **动词开头**，描述技能动作
2. **15-25 词** 为宜
3. **包含触发词**（中文/英文场景）
4. **明确边界**：此 Skill 能做什么 / 不能做什么

### 2.4 Body — 触发后才加载

Body 部分包含 Skill 的使用指令，只有在 Skill 被触发后才加载到上下文。

**Body 长度控制：**
- 目标：30-80 行（最多 500 行）
- 超过时：拆分到 `references/` 目录

---

## 三、Bundled Resources — 可选资源详解

### 3.1 三种资源对比

| 资源 | 何时加载 | 形式 | Token 成本 |
|------|---------|------|-----------|
| `scripts/` | 可执行，不读入上下文 | Python/Bash 等 | 零额外成本 |
| `references/` | 按需读入上下文 | Markdown/JSON 等 | 按实际使用计 |
| `assets/` | 不读入上下文 | 图片/模板/字体等 | 零额外成本 |

### 3.2 scripts/ — 确定性执行代码

**何时使用：**
- 同一段代码被反复重写
- 需要确定性可靠性
- 操作脆弱易错

```python
# 示例：scripts/rotate_pdf.py
#!/usr/bin/env python3
"""PDF 旋转工具 - 确定性执行，避免 Agent 每次重写"""
import sys
from pypdf import PdfReader, PdfWriter

def rotate_pdf(input_path, output_path, degrees=90):
    reader = PdfReader(input_path)
    writer = PdfWriter()
    for page in reader.pages:
        page.rotate(degrees)
        writer.add_page(page)
    with open(output_path, 'wb') as f:
        writer.write(f)

if __name__ == '__main__':
    rotate_pdf(sys.argv[1], sys.argv[2], int(sys.argv[3]))
```

**在 SKILL.md 中引用：**
```markdown
### 旋转 PDF

```bash
python3 scripts/rotate_pdf.py input.pdf output.pdf 90
```
```

### 3.3 references/ — 按需加载的参考文档

**何时使用：**
- 详细信息但 Agent 不总是需要
- 大型文档（>10k words）
- 领域知识、API 规范、公司政策

**目录结构示例：**
```
bigquery-skill/
├── SKILL.md
└── references/
    ├── finance.md      # 财务指标
    ├── sales.md       # 销售指标
    └── product.md     # 产品 API
```

**在 SKILL.md 中引用：**
```markdown
## 财务指标

收入计算见 [finance.md](references/finance.md)。

## API 参考

完整 API 规范见 [product.md](references/product.md)。
```

**最佳实践：**
- 超过 100 行的文件顶部加目录
- 信息只存一处（SKILL.md 或 references/，不重复）

### 3.4 assets/ — 输出中使用的文件

**何时使用：**
- 模板文件（PPT、文档模板）
- 品牌资产（Logo、图片）
- 字体文件

**示例结构：**
```
brand-skill/
├── SKILL.md
└── assets/
    ├── logo.png
    ├── template.pptx
    └── font.ttf
```

**特点：** 不读入上下文，直接在 Agent 输出中使用

---

## 四、Progressive Disclosure — 渐进式披露

### 4.1 三级加载系统

```
┌─────────────────────────────────────────────────────────────┐
│                   三级加载系统                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Level 1: Metadata (name + description)                    │
│     → 始终加载 (~100 words)                                 │
│     → Agent 据此判断是否触发此 Skill                        │
│                                                              │
│  Level 2: SKILL.md body                                     │
│     → Skill 触发时加载 (<5k words)                         │
│     → 核心工作流和指令                                      │
│                                                              │
│  Level 3: Bundled Resources                                 │
│     → 按需加载（无上限）                                    │
│     → scripts 可执行不读入，references 按需读入             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 三种披露模式

#### Pattern 1: High-level guide with references

```markdown
# PDF Processing

## 快速开始

用 pdfplumber 提取文本：
[code example]

## 高级功能

- **表单填写**: 见 [FORMS.md](references/FORMS.md)
- **API 参考**: 见 [REFERENCE.md](references/REFERENCE.md)
- **示例**: 见 [EXAMPLES.md](references/EXAMPLES.md)
```

→ Agent 只在需要时加载 FORMS.md 等文件

#### Pattern 2: Domain-specific organization

```markdown
# BigQuery Skill

## 财务指标
见 [references/finance.md](references/finance.md)

## 销售指标
见 [references/sales.md](references/sales.md)

## 产品指标
见 [references/product.md](references/product.md)
```

→ 避免加载无关领域

#### Pattern 3: Conditional details

```markdown
# DOCX Processing

## 创建文档

用 docx-js 创建新文档。见 [DOCX-JS.md](references/DOCX-JS.md)。

## 编辑文档

简单编辑直接修改 XML。

**跟踪修订**: 见 [REDLINING.md](references/REDLINING.md)
**OOXML 详情**: 见 [OOXML.md](references/OOXML.md)
```

→ 基础内容可见，高级功能按需加载

### 4.3 渐进式披露检查清单

```
□ SKILL.md 保持在 30-80 行以内
□ 详细信息拆分到 references/
□ references 文件不超过 1 层嵌套
□ 超过 100 行的文件顶部加目录
□ 不在 SKILL.md 和 references/ 中重复信息
```

---

## 五、Skill 创建六步流程

```
┌─────────────────────────────────────────────────────────────┐
│                   Skill 创建六步流程                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: 理解需求                                           │
│     └── 收集具体使用示例                                    │
│                                                              │
│  Step 2: 规划内容                                           │
│     └── 确定 scripts/references/assets                       │
│                                                              │
│  Step 3: 初始化框架                                         │
│     └── run init_skill.py                                   │
│                                                              │
│  Step 4: 编写内容                                           │
│     └── 写 SKILL.md + 资源文件                              │
│                                                              │
│  Step 5: 打包验证                                           │
│     └── run package_skill.py                                │
│                                                              │
│  Step 6: 迭代改进                                           │
│     └── 真实任务验证 → 优化                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Step 1: 理解需求

**关键问题：**
- 这个 Skill 支持哪些功能？
- 给我一些使用示例
- 用户说什么应该触发这个 Skill？
- 有哪些已知的使用模式？

**避免：**
- 一次性问太多问题
- 问 Agent 自己能推断的问题

### Step 2: 规划内容

分析每个示例，确定：

```markdown
## 可复用内容规划

### scripts/
- [ ] rotate_pdf.py      # PDF 旋转（确定性，需固定实现）

### references/
- [ ] finance.md          # 财务 API（详细信息，按需加载）
- [ ] api_docs.md         # API 规范

### assets/
- [ ] logo.png            # 品牌 Logo
```

### Step 3: 初始化框架

```bash
# 使用官方脚本初始化
python3 /path/to/init_skill.py my-skill
```

### Step 4: 编写 SKILL.md

**Frontmatter 示例：**
```yaml
---
name: pdf-processor
description: >-
  Process, merge, split, and extract content from PDF documents.
  Triggers on: "read PDF", "extract text", "merge PDFs", "split PDF",
  or any PDF manipulation task.
---
```

**Body 写法规范：**
- 使用祈使句（imperative）
- 示例优于解释
- 指令简洁明确

### Step 5: 打包验证

```bash
# 自动验证 + 打包
python3 /path/to/package_skill.py my-skill/

# 指定输出目录
python3 /path/to/package_skill.py my-skill/ ./dist/
```

**验证内容：**
- YAML frontmatter 格式
- 必需字段完整性
- 命名规范
- 目录结构
- 符号链接检查（不允许 symlink）

### Step 6: 迭代改进

```
真实任务使用
    ↓
发现问题（如：指令不够清晰）
    ↓
更新 SKILL.md 或 resources
    ↓
再次验证
```

---

## 六、Skill 命名规范

| 规范 | 说明 |
|------|------|
| 字符集 | 仅小写字母、数字、连字符 |
| 长度 | 最多 64 字符 |
| 大小写 | kebab-case（用连字符分隔） |
| 命名风格 | 优先动词短语（描述动作） |
| 名称空间 | 按工具命名可提高清晰度 |

```bash
# ✅ 正确
gh-address-comments
linear-address-issue
pdf-processor
docker-deploy

# ❌ 错误
My_Skill           # 下划线
MySkill            # 驼峰
plan mode          # 空格
```

---

## 七、f fireworks-tech-graph 的 Skill 设计分析

### 7.1 对照方法论检查

| 方法论要求 | fireworks-tech-graph 实践 | 评分 |
|-----------|--------------------------|------|
| description 包含触发词 | ✅ 中英双语触发词 | ⭐⭐⭐⭐⭐ |
| 渐进式披露 | ✅ 7 种 style 参考独立文件 | ⭐⭐⭐⭐⭐ |
| scripts/ 辅助脚本 | ✅ 4 个辅助脚本 | ⭐⭐⭐⭐⭐ |
| references/ 分离 | ✅ style-N.md、icons.md 独立 | ⭐⭐⭐⭐⭐ |
| 高自由度指令 | ✅ workflow 是指导原则 | ⭐⭐⭐⭐ |
| 避免重复 | ✅ SKILL.md 精简 | ⭐⭐⭐⭐ |
| Concise is Key | ⚠️ 内容较详细，token 成本中等 | ⭐⭐⭐ |

### 7.2 值得借鉴的设计

```markdown
# 1. 触发词写得很全面
description: >-
  Use when the user wants to create any technical diagram...
  Trigger on: "画图" "帮我画" "生成图" "做个图" "架构图"
  "流程图" "可视化一下" "出图" "generate diagram"...

# 2. 用 recipe prompts 稳定输出
### Stable Prompt Recipes
[每种风格都有完整的 prompt 配方]

# 3. references/ 完全分离
references/
├── style-1-flat-icon.md
├── style-2-dark-terminal.md
├── ...（7 种风格独立文件）
├── icons.md
└── svg-layout-best-practices.md
```

### 7.3 可改进点

| 改进点 | 说明 |
|--------|------|
| 分离更多到 references | `14种图类型详解` 可拆分到独立文件 |
| 添加 scripts/ 示例 | 展示如何用辅助脚本生成图 |
| Token 成本提示 | 说明复杂图的 token 消耗 |

---

## 八、质量检查清单

创建或审查 Skill 时，使用以下清单：

### 必需项

```
□ SKILL.md 存在且格式正确
□ YAML frontmatter 有 name 和 description
□ description 包含触发词（中英文）
□ 指令使用祈使句
□ 无拼写或语法错误
```

### 推荐项

```
□ SKILL.md 控制在 30-80 行
□ 详细信息在 references/
□ 重复操作在 scripts/
□ 渐进式披露结构清晰
□ 命名符合 kebab-case
```

### 可选优化

```
□ references/ 超过 100 行有目录
□ 有使用示例
□ 有常见错误处理
□ 有链接到相关 Skills
```

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| 官方 skill-creator | `/opt/homebrew/lib/node_modules/openclaw/skills/skill-creator/SKILL.md` |
| ClawHub | https://clawhub.ai |
| 配套文档 | [18-19_Skills创建工具全景.md](18-19_Skills创建工具全景.md) |

---

*文档版本: 2026-04-22*
