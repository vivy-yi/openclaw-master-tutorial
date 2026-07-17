# Diagram Design - AI 编程时代表格工具

> 13 种编辑级图表类型，自动匹配品牌风格，60 秒完成品牌适配

---

## 一、概述

### 1.1 什么是 Diagram Design

| 项目 | 说明 |
|------|------|
| **定位** | Claude Code Skill - AI 编程时代表格工具 |
| **Stars** | ⭐ 1210 |
| **作者** | Cathryn Lavery |
| **类型** | Claude Code Skill（AI Coding 工具） |
| **许可** | MIT |
| **语言** | HTML + SVG |

### 1.2 解决的问题

```
┌─────────────────────────────────────────────────────────────┐
│                      问题场景                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ❌ Ask AI for diagram → Generic rounded-box thing           │
│  ❌ AI 生成图表 → 千篇一律的圆角矩形                          │
│  ❌ Fight with Figma for 30 minutes                          │
│  ❌ Figma 30 分钟战斗                                         │
│  ❌ Just skip the diagram                                    │
│  ❌ 直接跳过图表                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 核心理念

> *The highest-quality move is usually deletion.*
> 最高质量的移动往往是删除。
>
> Every node earns its place.
> 每个节点都必须有它的位置。
>
> The accent color is reserved for the 1–2 things the reader should look at first.
> 强调色只用于 1-2 个读者首先应该关注的内容。
>
> Target density: 4/10.
> 目标密度：4/10。

---

## 二、13 种图表类型

### 2.1 类型总览

| 类型 | 用途 | 说明 |
|------|------|------|
| **Architecture** | 架构图 | 组件 + 连接 |
| **Flowchart** | 流程图 | 决策逻辑 |
| **Sequence** | 时序图 | 时间轴上的消息 |
| **State machine** | 状态机 | 状态 + 转换 |
| **ER / data model** | ER 图 | 实体 + 字段 |
| **Timeline** | 时间线 | 轴上的事件 |
| **Swimlane** | 泳道图 | 跨职能流程 |
| **Quadrant** | 象限图 | 双轴定位 |
| **Nested** | 嵌套图 | 按包含关系的层级 |
| **Tree** | 树形图 | 父 → 子 |
| **Layers** | 分层图 | 堆叠抽象 |
| **Venn** | 文氏图 | 集合重叠 |
| **Pyramid** | 金字塔/漏斗 | 排名层级或转化流失 |

### 2.2 三种变体

每个类型都有三种视觉风格：

| 变体 | 说明 |
|------|------|
| **Minimal Light** | 简洁浅色 |
| **Minimal Dark** | 简洁深色 |
| **Full Editorial** | 完整编辑级（含摘要卡片） |

### 2.3 类型选择指南

```
┌─────────────────────────────────────────────────────────────┐
│                    类型选择决策树                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  需要展示组件之间的关系？                                      │
│  └── Architecture                                           │
│                                                              │
│  需要展示决策流程？                                           │
│  └── Flowchart                                              │
│                                                              │
│  需要展示时间顺序？                                           │
│  └── Sequence / Timeline                                    │
│                                                              │
│  需要展示状态转换？                                           │
│  └── State machine                                          │
│                                                              │
│  需要展示数据模型？                                           │
│  └── ER / data model                                        │
│                                                              │
│  需要展示层级关系？                                           │
│  ├── 包含关系 → Nested                                       │
│  ├── 父子关系 → Tree                                         │
│  └── 堆叠关系 → Layers                                       │
│                                                              │
│  需要展示集合重叠？                                           │
│  └── Venn                                                   │
│                                                              │
│  需要展示排名或转化？                                         │
│  └── Pyramid / Funnel                                        │
│                                                              │
│  需要展示双轴定位？                                           │
│  └── Quadrant                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、快速开始

### 3.1 安装

```bash
# 方法一：克隆到 Claude Code skills 目录
git clone git@github.com:cathrynlavery/diagram-design.git ~/.claude/skills/diagram-design

# 方法二：如果在其他地方维护 skills，使用符号链接
git clone git@github.com:cathrynlavery/diagram-design.git ~/code/diagram-design
ln -s ~/code/diagram-design ~/.claude/skills/diagram-design
```

重启 Claude Code。Skill 注册为 `diagram-design`，当你让 Claude 制作图表时自动激活。

### 3.2 作为插件安装（更快但不推荐自定义）

**Claude Code:**
```
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

**Claude Cowork:** Customize → Directory → Plugins → **+** → paste `cathrynlavery/diagram-design` → Sync

### 3.3 查看图表演示

```bash
# 在浏览器中打开图册
open ~/.claude/skills/diagram-design/assets/index.html
```

### 3.4 使用示例

```bash
# 在 Claude Code 中直接请求
"Make me an architecture diagram of my app: frontend, backend, database, Redis cache."
# 制作一个架构图：前端、后端、数据库、Redis 缓存

"I need a quadrant showing Q2 projects by impact vs effort."
# 需要一个按影响力和工作量划分的 Q2 项目象限图

"Give me a sequence diagram of the OAuth handshake."
# 制作一个 OAuth 握手的时序图
```

---

## 四、品牌适配（核心功能）

### 4.1 什么是品牌适配

> 60 秒内让图表匹配你的品牌颜色和字体，而不是通用模板。

### 4.2 自动适配流程

```
You:     "onboard diagram-design to https://yoursite.com"
Claude:  → fetches the homepage
         → extracts the dominant palette + font stack
         → maps detected values to semantic roles
         → shows a proposed diff
         → writes your tokens to references/style-guide.md
You:     "yes, apply it"
```

### 4.3 自动提取的内容

| 从网站检测 | 成为 |
|-----------|------|
| `<body>` background | `paper` token |
| Primary text color | `ink` token |
| Secondary / caption text | `muted` token |
| Cards or containers | `paper-2` token |
| Most-used brand color | `accent` token |
| `<h1>` font family | `title` font |
| `<body>` font family | `node-name` font |
| `<code>` / `<pre>` font | `sublabel` font |

### 4.4 对比度检查

自动进行 WCAG AA 对比度检查。如果颜色在图表尺寸（9-12px）下无法通过对比度，会提议调整值并解释原因。

### 4.5 首次使用拦截

Skill 不会在未适配品牌的项目中静默发送默认皮肤的图表。第一次使用时，会检查 `style-guide.md` 是否已自定义。如果未自定义，会暂停并询问：

> *"This is your first diagram in this project. The style guide is still at the default. Want to run onboarding, paste tokens manually, or proceed with default?"*

---

## 五、设计系统

### 5.1 核心原则

```
┌─────────────────────────────────────────────────────────────┐
│                    设计系统核心原则                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🎨 一个强调色                                              │
│     └── accent 只用于 1-2 个焦点元素                        │
│                                                              │
│  🔤 三种字体                                                │
│     ├── Instrument Serif → 标题 + 斜体标注                  │
│     ├── Geist sans → 节点名称                              │
│     └── Geist Mono → 技术子标签                            │
│                                                              │
│  📐 像素规则                                                │
│     └── 每个坐标、宽度、间距都能被 4 整除                    │
│     └── 这是防止图表看起来像 AI 生成的关键                    │
│                                                              │
│  🚫 禁止                                                    │
│     └── 阴影                                                │
│     └── 超过 10px 的圆角                                   │
│                                                              │
│  📏 边框                                                    │
│     └── 1px 发丝边框                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 语义颜色角色

| 角色 | 用途 |
|------|------|
| `paper` | 背景 |
| `ink` | 主要文字 |
| `muted` | 次要文字 |
| `paper-2` | 卡片/容器 |
| `accent` | 焦点强调 |
| `link` | 链接颜色 |

---

## 六、架构

### 6.1 目录结构

```
diagram-design/
├── SKILL.md                         — 顶层：理念、选择指南、检查清单
├── references/                      — 仅在相关类型被选中时加载
│   ├── style-guide.md               — 颜色和字体的单一真相来源
│   ├── onboarding.md               — URL 到 token 的流程
│   ├── type-architecture.md
│   ├── type-flowchart.md
│   ├── type-sequence.md
│   ├── type-state.md
│   ├── type-er.md
│   ├── type-timeline.md
│   ├── type-swimlane.md
│   ├── type-quadrant.md
│   ├── type-nested.md
│   ├── type-tree.md
│   ├── type-layers.md
│   ├── type-venn.md
│   ├── type-pyramid.md
│   ├── primitive-annotation.md      — 斜体 serif 编辑标注
│   └── primitive-sketchy.md         — 手绘 SVG 滤镜变体
├── assets/
│   ├── index.html                   — 直播图册，带标签页
│   ├── template*.html               — 新图表脚手架
│   └── example-<type>.html          — 3 变体 × 13 类型
└── docs/screenshots/                — README 中的图片
```

### 6.2 渐进式加载

| 你请求... | Claude 加载 |
|---------|-----------|
| "Make me a flowchart" | `SKILL.md` + `references/type-flowchart.md` |
| "Build an architecture diagram" | `SKILL.md` + `references/type-architecture.md` |
| "Onboard this skill to my site" | `SKILL.md` + `references/onboarding.md` + `references/style-guide.md` |
| "Add an editorial callout" | `SKILL.md` + `references/primitive-annotation.md` |
| "Give me a hand-drawn version" | `SKILL.md` + `references/primitive-sketchy.md` |

### 6.3 可扩展性

添加新类型只需：
1. 创建 `type-<name>.md`
2. 在选择指南中连接它

---

## 七、原语（Primitives）

### 7.1 Annotation Callout

斜体 Instrument Serif + 虚线贝塞尔曲线，用于编辑级旁注。

```markdown
See `references/primitive-annotation.md`
```

### 7.2 Sketchy Filter

SVG turbulence + displacement map 实现手绘效果。适合随笔，不适合技术文档。

```markdown
See `references/primitive-sketchy.md`
```

---

## 八、不适合使用的场景

| 场景 | 替代方案 |
|------|---------|
| Quick unicode diagrams for tweets | wiretext-style skill |
| Lists of anything | table or bullets |
| Before/after comparisons | a table |
| One-shape "diagrams" | just write the sentence |

**在绘图之前问自己**：*读者从这个图中能得到比一段写得好的段落更多信息吗？如果没有，就不要画。*

---

## 九、与 OpenClaw 的结合

### 9.1 可借鉴的设计

| 方面 | Diagram Design | OpenClaw 借鉴 |
|------|--------------|--------------|
| **渐进式加载** | 只加载需要的 reference | Skills 懒加载 |
| **语义化 Token** | paper/ink/accent | 配置语义化 |
| **首次使用拦截** | 品牌未适配时暂停 | 首次配置引导 |
| **60 秒适配** | 自动从网站提取品牌 | 自动配置检测 |
| **设计系统** | 4px 网格/无阴影 | 统一设计规范 |

### 9.2 可行性分析

| 功能 | 可迁移性 | 说明 |
|------|---------|------|
| 渐进式 reference 加载 | ⭐⭐⭐⭐⭐ | OpenClaw Skills 已支持 |
| 品牌 token 系统 | ⭐⭐⭐⭐ | 可作为 OpenClaw 配置系统参考 |
| 首次使用引导 | ⭐⭐⭐⭐ | BOOTSTRAP.md 已有类似机制 |
| 网站自动检测 | ⭐⭐⭐ | 需要浏览器工具支持 |
| 设计系统规范 | ⭐⭐⭐⭐ | 可作为教程设计参考 |

### 9.3 潜在应用

1. **OpenClaw 教程图表**：使用 diagram-design 风格生成教程配图
2. **Skill 设计参考**：学习渐进式加载和语义化 token
3. **品牌适配思路**：自动化配置检测和品牌匹配

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/cathrynlavery/diagram-design |
| Live Gallery | `assets/index.html` |
| 作者博客 | https://littlemight.com |
| Skill 文档 | `SKILL.md` |
| 设计系统 | `SKILL.md#5-design-system` |

---

## 十一、13 种图表类型详解

### 11.1 Architecture（架构图）

用于展示系统组件及其连接关系。

**适用场景：**
- 微服务架构
- 系统组件关系
- 技术栈概览

**元素：**
- 组件框（矩形）
- 连接线（箭头）
- 方向标注

### 11.2 Flowchart（流程图）

用于展示决策逻辑和流程。

**适用场景：**
- 业务流程
- 决策树
- 算法流程

**元素：**
- 开始/结束（圆角矩形）
- 流程（矩形）
- 判断（菱形）
- 连接线

### 11.3 Sequence（时序图）

用于展示时间轴上的消息交互。

**适用场景：**
- API 调用流程
- 用户交互序列
- 系统间通信

**元素：**
- 参与者（竖线/头像）
- 消息箭头
- 时间轴

### 11.4 State Machine（状态机）

用于展示状态及其转换。

**适用场景：**
- 订单状态
- 用户状态
- 业务流程状态

**元素：**
- 状态（圆角矩形）
- 转换箭头
- 转换条件

### 11.5 ER / Data Model（ER 图）

用于展示实体及其字段。

**适用场景：**
- 数据库设计
- 数据模型
- 实体关系

**元素：**
- 实体框
- 字段列表
- 关系线

### 11.6 Timeline（时间线）

用于展示时间轴上的事件。

**适用场景：**
- 项目里程碑
- 历史事件
- 版本发布

**元素：**
- 时间轴线
- 事件节点
- 时间标注

### 11.7 Swimlane（泳道图）

用于展示跨职能流程。

**适用场景：**
- 跨部门流程
- 多角色协作
- B2B 流程

**元素：**
- 泳道（列）
- 角色/部门
- 流程跨越

### 11.8 Quadrant（象限图）

用于展示双轴定位。

**适用场景：**
- 项目优先级
- 产品四象限
- ROI 分析

**元素：**
- 四象限
- X 轴/Y 轴
- 定位点

### 11.9 Nested（嵌套图）

用于展示包含关系的层级。

**适用场景：**
- 组织结构
- 文件系统
- 嵌套组件

**元素：**
- 外层容器
- 内层元素
- 包含关系

### 11.10 Tree（树形图）

用于展示父子关系。

**适用场景：**
- 文件树
- 菜单结构
- 继承关系

**元素：**
- 根节点
- 子节点
- 连接线

### 11.11 Layers（分层图）

用于展示堆叠抽象。

**适用场景：**
- 网络协议栈
- 架构层级
- 技术栈

**元素：**
- 分层堆叠
- 每层标注
- 层间关系

### 11.12 Venn（文氏图）

用于展示集合重叠。

**适用场景：**
- 功能对比
- 技能重叠
- 需求分析

**元素：**
- 圆形集合
- 重叠区域
- 标注

### 11.13 Pyramid（金字塔/漏斗）

用于展示排名层级或转化流失。

**适用场景：**
- 营销漏斗
- 需求层次
- 优先级排序

**元素：**
- 金字塔层级
- 自上而下排名
- 漏斗转化

---

*文档版本: 2026-04-22*
