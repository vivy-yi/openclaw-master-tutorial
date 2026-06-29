# baoyu-skills 完全指南

> 内容创作与可视化全栈工具包 — 21 个 Skill，15,784 Stars

---

## 一、概述

### 1.1 什么是 baoyu-skills

| 项目 | 说明 |
|------|------|
| **定位** | 内容创作与可视化全栈工具包 |
| **GitHub** | https://github.com/jimliu/baoyu-skills |
| **许可** | MIT |
| **语言** | TypeScript |
| **stars** | 15,784+ |
| **创建时间** | 2026-01-13 |
| **Skill 数量** | 21 个 |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│                   baoyu-skills 核心特点                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 21 个专业 Skill                                        │
│     └── 可视化、内容生成、格式转换、社交媒体发布            │
│                                                              │
│  ✅ 完整的可视化系统                                        │
│     └── 信息图、海报、封面、幻灯片、漫画、图表             │
│                                                              │
│  ✅ 多维度设计系统                                         │
│     └── Style × Layout × Palette 多维组合                  │
│                                                              │
│  ✅ 智能内容分析                                           │
│     └── 自动推荐最适合的布局和风格                         │
│                                                              │
│  ✅ 支持多种平台                                           │
│     └── X、微信、微博、小红书、知乎                        │
│                                                              │
│  ✅ 可扩展架构                                             │
│     └── EXTEND.md 支持自定义配置                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Skill 分类总览

| 类别 | Skills | 说明 |
|------|--------|------|
| **可视化** | 9 个 | 图表、信息图、封面、幻灯片、漫画等 |
| **内容生成** | 3 个 | 翻译、格式化、Markdown 转 HTML |
| **内容发布** | 4 个 | X、微信、微博、小红书 |
| **工具类** | 5 个 | 图片压缩、URL 转 Markdown 等 |

---

## 二、可视化 Skill 详解

### 2.1 可视化 Skill 总览

| Skill | 用途 | 输出 | 维度 |
|-------|------|------|------|
| **baoyu-diagram** | 技术图表（架构、流程、序列） | SVG | 8 种类型 |
| **baoyu-infographic** | 专业信息图 | 图片 | 21 布局 × 17 风格 |
| **baoyu-article-illustrator** | 文章配图 | 图片 | 6 类型 × 8 风格 |
| **baoyu-cover-image** | 封面图 | 图片 | 5 维度系统 |
| **baoyu-slide-deck** | 幻灯片 | PPTX/PDF | 10 预设 |
| **baoyu-comic** | 知识漫画 | 图片 | 5 画风 × 7 色调 |
| **baoyu-image-cards** | 小红书图文 | 图片 | Style × Layout |
| **baoyu-image-gen** | 通用图片生成 | 图片 | 多模型支持 |
| **baoyu-imagine** | AI 绘图 | 图片 | 多后端支持 |

---

## 三、baoyu-diagram — SVG 技术图表

### 3.1 定位与特点

**核心**：直接手写 SVG 代码生成专业图表，非图片生成模型调用。

```
┌─────────────────────────────────────────────────────────────┐
│                   baoyu-diagram 核心特点                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 手写 SVG 代码                                          │
│     └── 非图片生成，每次结果都遵循设计系统                  │
│                                                              │
│  ✅ 暗色主题设计系统                                       │
│     └── 深色背景 + 语义化颜色编码                          │
│                                                              │
│  ✅ 自动暗色模式                                           │
│     └── 嵌入 @media (prefers-color-scheme: dark)         │
│                                                              │
│  ✅ 8 种图表类型                                          │
│     └── 架构、流程、序列、结构、思维导图等                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 支持的图表类型

| 类型 | 何时使用 | 关键特征 |
|------|---------|---------|
| **Architecture** | 系统组件与关系 | 分组框、连接箭头、区域边界 |
| **Flowchart** | 决策逻辑、流程步骤 | 菱形决策、圆角步骤框、方向流 |
| **Sequence** | 时间顺序的交互 | 垂直生命线、水平消息、激活条 |
| **Structural** | 类图、ER 图、组织图 | 分隔框、类型化关系 |
| **Mind Map** | 头脑风暴、主题探索 | 中心节点、辐射分支 |
| **Timeline** | 时间事件 | 水平/垂直轴、事件标记 |
| **Illustrative** | 概念解释、比较 | 自由布局、图标、注释 |
| **State Machine** | 状态转换、生命周期 | 圆角状态节点、标签转换 |
| **Data Flow** | 数据转换管道 | 处理气泡、数据存储、外部实体 |

### 3.3 设计系统

#### 颜色语义

| 类别 | 填充色 | 描边色 | 用途 |
|------|--------|--------|------|
| Primary | `rgba(8, 51, 68, 0.4)` | `#22d3ee` 青色 | 前端、用户输入 |
| Secondary | `rgba(6, 78, 59, 0.4)` | `#34d399` 翡翠 | 后端、服务 |
| Tertiary | `rgba(76, 29, 149, 0.4)` | `#a78bfa` 紫罗兰 | 数据库、存储 |
| Accent | `rgba(120, 53, 15, 0.3)` | `#fbbf24` 琥珀 | 云、基础设施 |
| Alert | `rgba(136, 19, 55, 0.4)` | `#fb7185` 玫红 | 安全、错误 |
| Connector | `rgba(251, 146, 60, 0.3)` | `#fb923c` 橙色 | 总线、队列 |
| Neutral | `rgba(30, 41, 59, 0.5)` | `#94a3b8` 板岩灰 | 外部、通用 |

#### 背景与网格

```svg
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.5"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#0f172a"/>
<rect width="100%" height="100%" fill="url(#grid)"/>
```

### 3.4 使用方式

```bash
# 自动分析并推荐图表类型
/baoyu-diagram "how JWT authentication works"

/# 指定类型
/baoyu-diagram "Kubernetes architecture" --type structural
/baoyu-diagram "OAuth 2.0 flow" --type sequence

# 文件输入
/baoyu-diagram path/to/article.md

# 指定语言和输出路径
/baoyu-diagram "微服务架构" --lang zh
/baoyu-diagram "build pipeline" --out docs/build-pipeline.svg
```

---

## 四、baoyu-infographic — 专业信息图

### 4.1 定位与特点

**核心**：21 种信息布局 × 17 种视觉风格，智能推荐组合，生成出版物级信息图。

```
┌─────────────────────────────────────────────────────────────┐
│                 baoyu-infographic 核心特点                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 21 种信息布局                                          │
│     └── 漏斗、金字塔、SWOT、思维导图、鱼骨图等            │
│                                                              │
│  ✅ 17 种视觉风格                                         │
│     └── 手绘、黏土、赛博朋克、像素、乐高积木等             │
│                                                              │
│  ✅ 智能推荐                                               │
│     └── 分析内容自动推荐最佳 Layout × Style 组合            │
│                                                              │
│  ✅ 多尺寸支持                                             │
│     └── 16:9、9:16、1:1、自定义比例                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 21 种信息布局

| 布局 | 最佳场景 |
|------|---------|
| `bridge` | 问题-解决、跨越鸿沟 |
| `circular-flow` | 循环、持续过程 |
| `comparison-table` | 多因素对比 |
| `do-dont` | 正确 vs 错误做法 |
| `equation` | 公式分解、输入输出 |
| `feature-list` | 产品特性、要点列表 |
| `fishbone` | 根本原因分析（鱼骨图） |
| `funnel` | 转化流程、过滤 |
| `grid-cards` | 多主题概览 |
| `iceberg` | 表面 vs 隐藏 |
| `journey-path` | 客户旅程、时间线 |
| `layers-stack` | 技术栈、分层结构 |
| `mind-map` | 头脑风暴、想法映射 |
| `nested-circles` | 影响层级、范围 |
| `priority-quadrants` | 优先级矩阵（艾森豪威尔） |
| `pyramid` | 层级、马斯洛需求 |
| `scale-balance` | 权衡、优劣势 |
| `timeline-horizontal` | 历史、编年事件 |
| `tree-hierarchy` | 组织图、分类法 |
| `venn` | 重叠概念 |

### 4.3 17 种视觉风格

| 风格 | 描述 |
|------|------|
| `craft-handmade`（默认） | 手绘插画、纸艺美学 |
| `claymation` | 3D 黏土人物、定格动画感 |
| `kawaii` | 日系可爱、大眼睛 |
| `storybook-watercolor` | 柔和水彩插画 |
| `chalkboard` | 黑板粉笔画 |
| `cyberpunk-neon` | 霓虹发光、未来感 |
| `bold-graphic` | 漫画风格、网点 |
| `aged-academia` | 复古科学、棕褐素描 |
| `corporate-memphis` | 扁平矢量人物 |
| `technical-schematic` | 蓝图、等轴测 3D |
| `origami` | 折纸形态、几何 |
| `pixel-art` | 像素风、复古 8-bit |
| `ui-wireframe` | 线框图、界面模型 |
| `subway-map` | 地铁图风格 |
| `ikea-manual` | 简约线条图、组装风格 |
| `knolling` | 平面摆放、俯视 |
| `lego-brick` | 乐高积木 |

### 4.4 使用方式

```bash
# 自动推荐组合
/baoyu-infographic path/to/content.md

# 指定布局
/baoyu-infographic path/to/content.md --layout pyramid

# 指定风格
/baoyu-infographic path/to/content.md --style technical-schematic

# 同时指定
/baoyu-infographic path/to/content.md --layout funnel --style corporate-memphis

# 指定尺寸
/baoyu-infographic path/to/content.md --aspect portrait
/baoyu-infographic path/to/content.md --aspect 3:4
```

---

## 五、baoyu-article-illustrator — 文章配图

### 5.1 定位与特点

**核心**：分析文章结构，识别需要视觉辅助的位置，生成配图。

```
┌─────────────────────────────────────────────────────────────┐
│             baoyu-article-illustrator 核心特点               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 智能分析                                               │
│     └── 分析文章结构，推荐配图类型                         │
│                                                              │
│  ✅ 6 种类型 × 8 种风格                                   │
│     └── 流程图、场景、对比、时间线等                       │
│                                                              │
│  ✅ 可选调色板                                             │
│     └── macaron、warm、neon                                │
│                                                              │
│  ✅ 多种输出                                               │
│     └── 信息图、流程图、对比图等                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 类型与风格

**类型（信息结构）**：

| 类型 | 描述 | 最佳场景 |
|------|------|---------|
| `infographic` | 数据可视化、图表 | 技术文章、数据分析 |
| `scene` | 氛围插画、情绪渲染 | 叙事、个人故事 |
| `flowchart` | 流程图、步骤可视化 | 教程、工作流 |
| `comparison` | 并排对比、前后对比 | 产品对比 |
| `framework` | 概念图、关系图 | 方法论、架构 |
| `timeline` | 时间进程 | 历史、项目进度 |

**风格（渲染风格）**：

| 风格 | 描述 | 最佳场景 |
|------|------|---------|
| `notion`（默认） | 极简手绘线条 | 知识分享、SaaS |
| `elegant` | 精致、优雅 | 商业、思想领导 |
| `warm` | 友好、平易近人 | 个人成长、生活方式 |
| `minimal` | 超简洁、禅意 | 哲学、极简主义 |
| `blueprint` | 技术示意图 | 架构、系统设计 |
| `watercolor` | 柔和艺术感 | 生活、旅行、创意 |
| `editorial` | 杂志风信息图 | 科技解读、新闻 |
| `scientific` | 学术精确图表 | 生物、化学、技术 |

### 5.3 使用方式

```bash
# 自动选择
/baoyu-article-illustrator path/to/article.md

# 指定类型和风格
/baoyu-article-illustrator path/to/article.md --type flowchart --style notion

# 指定调色板
/baoyu-article-illustrator path/to/article.md --style vector-illustration --palette macaron
```

---

## 六、baoyu-cover-image — 封面图生成

### 6.1 定位与特点

**核心**：5 维度系统生成封面图 — Type × Palette × Rendering × Text × Mood。

```
┌─────────────────────────────────────────────────────────────┐
│                 baoyu-cover-image 核心特点                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 5 维度系统                                             │
│     └── 主题类型 × 调色板 × 渲染风格 × 文字 × 情绪        │
│                                                              │
│  ✅ 11 种调色板                                           │
│     └── warm、elegant、cool、dark、earth 等               │
│                                                              │
│  ✅ 7 种渲染风格                                           │
│     └── flat-vector、hand-drawn、painterly 等             │
│                                                              │
│  ✅ 77 种组合                                             │
│     └── 11 × 7 = 77 种独特风格                            │
│                                                              │
│  ✅ 预设风格                                               │
│     └── blueprint、minimal、vintage 等快捷预设             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 五维度详解

**1. Type（主题类型）**：

| 类型 | 描述 |
|------|------|
| `hero` | 英雄图、全屏大图 |
| `conceptual` | 概念图、隐喻 |
| `typography` | 文字主导 |
| `metaphor` | 隐喻插画 |
| `scene` | 场景图 |
| `minimal` | 极简 |

**2. Palette（调色板）**：

| 调色板 | 描述 | 最佳场景 |
|--------|-----|---------|
| `warm` | 暖色系 | 生活方式 |
| `elegant` | 优雅灰金 | 商业 |
| `cool` | 冷色蓝绿 | 科技 |
| `dark` | 深色背景 | 游戏、娱乐 |
| `earth` | 大地色系 | 自然、环保 |
| `vivid` | 鲜艳色彩 | 活力 |
| `pastel` | 柔和粉彩 | 柔和 |
| `mono` | 单色调 | 简约 |
| `retro` | 复古 | 怀旧 |
| `duotone` | 双色调 | 现代 |
| `macaron` | 马卡龙色 | 甜品、可爱 |

**3. Rendering（渲染风格）**：

| 风格 | 描述 |
|------|------|
| `flat-vector` | 扁平矢量 |
| `hand-drawn` | 手绘 |
| `painterly` | 油画感 |
| `digital` | 数字绘画 |
| `pixel` | 像素风 |
| `chalk` | 粉笔画 |
| `screen-print` | 丝网印刷 |

**4. Text（文字）**：

| 选项 | 描述 |
|------|------|
| `none` | 无文字 |
| `title-only` | 仅标题 |
| `title-subtitle` | 标题+副标题 |
| `text-rich` | 丰富文字 |

**5. Mood（情绪）**：

| 情绪 | 描述 |
|------|------|
| `subtle` | 微妙、柔和 |
| `balanced`（默认） | 平衡 |
| `bold` | 大胆、强烈 |

### 6.3 预设风格

| 预设 | 等效维度 |
|------|---------|
| `blueprint` | grid + cool + technical + balanced |
| `minimal` | clean + neutral + geometric + minimal |
| `vintage` | paper + warm + editorial + balanced |
| `bold` | clean + vibrant + editorial + balanced |

### 6.4 使用方式

```bash
# 自动选择
/baoyu-cover-image path/to/article.md

# 快速模式
/baoyu-cover-image path/to/article.md --quick

# 指定维度
/baoyu-cover-image path/to/article.md --type conceptual --palette cool --rendering digital

# 指定预设
/baoyu-cover-image path/to/article.md --style blueprint

# 无文字
/baoyu-cover-image path/to/article.md --no-title
```

---

## 七、baoyu-slide-deck — 幻灯片生成

### 7.1 定位与特点

**核心**：从内容生成专业幻灯片，自动合并为 PPTX 和 PDF。

```
┌─────────────────────────────────────────────────────────────┐
│                 baoyu-slide-deck 核心特点                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 10 种预设风格                                         │
│     └── blueprint、chalkboard、corporate 等               │
│                                                              │
│  ✅ 4 维度构建                                            │
│     └── Texture × Mood × Typography × Density             │
│                                                              │
│  ✅ 自动合并                                               │
│     └── 生成后自动合并为 PPTX 和 PDF                      │
│                                                              │
│  ✅ 可控幻灯片数量                                         │
│     └── 8-25 推荐，最多 30 页                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 预设风格

| 预设 | 维度 | 最佳场景 |
|------|------|---------|
| `blueprint`（默认） | grid + cool + technical + balanced | 架构、系统设计 |
| `chalkboard` | organic + warm + handwritten + balanced | 教育、教程 |
| `corporate` | clean + professional + geometric + balanced | 投资人提案 |
| `minimal` | clean + neutral + geometric + minimal | 高管简报 |
| `sketch-notes` | organic + warm + handwritten + balanced | 教育、教程 |
| `watercolor` | organic + warm + humanist + minimal | 生活、健康 |
| `dark-atmospheric` | clean + dark + editorial + balanced | 娱乐、游戏 |
| `notion` | clean + neutral + geometric + dense | 产品演示、SaaS |
| `bold-editorial` | clean + vibrant + editorial + balanced | 产品发布、演讲 |
| `editorial-infographic` | clean + cool + editorial + dense | 科技解读、研究 |
| `fantasy-animation` | organic + vibrant + handwritten + minimal | 教育故事 |
| `intuition-machine` | clean + cool + technical + dense | 技术文档、学术 |
| `pixel-art` | pixel + vibrant + technical + balanced | 游戏、开发者 |
| `scientific` | clean + cool + technical + dense | 生物、化学、医学 |
| `vector-illustration` | clean + vibrant + humanist + balanced | 创意、儿童内容 |
| `vintage` | paper + warm + editorial + balanced | 历史、遗产 |

### 7.3 使用方式

```bash
# 从 Markdown 文件
/baoyu-slide-deck path/to/article.md

# 指定风格和受众
/baoyu-slide-deck path/to/article.md --style corporate
/baoyu-slide-deck path/to/article.md --audience executives

# 指定幻灯片数量
/baoyu-slide-deck path/to/article.md --slides 15

# 仅生成大纲
/baoyu-slide-deck path/to/article.md --outline-only

# 指定语言
/baoyu-slide-deck path/to/article.md --lang zh
```

---

## 八、baoyu-comic — 知识漫画

### 8.1 定位与特点

**核心**：将知识内容转化为原创教育漫画，支持多种画风和色调。

```
┌─────────────────────────────────────────────────────────────┐
│                    baoyu-comic 核心特点                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 5 种画风                                               │
│     └── ligne-claire、manga、realistic、ink-brush、chalk  │
│                                                              │
│  ✅ 7 种色调                                               │
│     └── neutral、warm、dramatic、romantic、energetic 等   │
│                                                              │
│  ✅ 预设风格                                               │
│     └── ohmsha（漫画教程）、wuxia（武侠）、shoujo（少女）  │
│                                                              │
│  ✅ 6 种版面布局                                          │
│     └── standard、cinematic、dense、splash、mixed、webtoon │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 画风与色调

**画风（Art Style）**：

| 画风 | 描述 | 代表作品 |
|------|------|---------|
| `ligne-claire`（默认） | 均匀线条、平涂色彩 | 丁丁历险记、Logicomix |
| `manga` | 大眼睛、漫画惯例、表情丰富 | 日漫 |
| `realistic` | 数字绘画、写实比例 | - |
| `ink-brush` | 中国毛笔笔触、水墨效果 | - |
| `chalk` | 黑板美学、手绘温暖感 | - |

**色调（Mood）**：

| 色调 | 描述 |
|------|------|
| `neutral`（默认） | 平衡、理性、教育 |
| `warm` | 怀旧、亲切 |
| `dramatic` | 高对比、强烈 |
| `romantic` | 柔和、优美 |
| `energetic` | 明亮、动态 |
| `vintage` | 历史、年代感 |
| `action` | 速度线、冲击效果 |

### 8.3 预设风格

| 预设 | 等效 | 特殊规则 |
|------|------|---------|
| `ohmsha` | manga + neutral | 视觉隐喻、无头像对话、小工具展示 |
| `wuxia` | ink-brush + action | 剑气效果、战斗场面、大气元素 |
| `shoujo` | manga + romantic | 装饰元素、眼睛细节、浪漫情节 |

### 8.4 版面布局

| 布局 | 每页面板数 | 最佳场景 |
|------|----------|---------|
| `standard`（默认） | 4-6 | 对话、叙事流 |
| `cinematic` | 2-4 | 戏剧性时刻、定场镜头 |
| `dense` | 6-9 | 技术解释、时间线 |
| `splash` | 1-2 大图 | 关键时刻、揭示 |
| `mixed` | 3-7 变化 | 复杂叙事、情感弧 |
| `webtoon` | 3-5 垂直 | 条漫教程、移动阅读 |

### 8.5 使用方式

```bash
# 自动选择
/baoyu-comic posts/turing-story/source.md

# 指定画风和色调
/baoyu-comic posts/turing-story/source.md --art manga --tone warm
/baoyu-comic posts/turing-story/source.md --art ink-brush --tone dramatic

# 使用预设
/baoyu-comic posts/turing-story/source.md --style ohmsha
/baoyu-comic posts/turing-story/source.md --style wuxia

# 指定布局和尺寸
/baoyu-comic posts/turing-story/source.md --layout cinematic
/baoyu-comic posts/turing-story/source.md --aspect 16:9

# 直接内容输入
/baoyu-comic "The story of Alan Turing and the birth of computer science"
```

---

## 九、内容发布 Skill

### 9.1 发布 Skill 总览

| Skill | 平台 | 输出 |
|-------|------|------|
| `baoyu-post-to-x` | X (Twitter) | 推文 + X Articles |
| `baoyu-post-to-wechat` | 微信公众号 | 推文格式 |
| `baoyu-post-to-weibo` | 微博 | 微博格式 |
| `baoyu-xhs-images` | 小红书 | 图文笔记 |

### 9.2 baoyu-xhs-images — 小红书图文

**核心**：小红书风格图文生成器，Style × Layout 系统。

**样式（12 种）**：cute（默认）、fresh、warm、bold、minimal、retro、pop、notion、chalkboard、study-notes、screen-print、sketch-notes

**布局（6 种）**：

| 布局 | 密度 | 最佳场景 |
|------|------|---------|
| `sparse` | 1-2 要点 | 封面、引言 |
| `balanced`（默认） | 3-4 要点 | 常规内容 |
| `dense` | 5-8 要点 | 知识卡、备忘 |
| `list` | 4-7 项 | 清单、排名 |
| `comparison` | 2 侧 | 对比、前后 |
| `flow` | 3-6 步骤 | 流程、时间线 |

**调色板**：macaron、warm、neon

---

## 十、工具 Skill

### 10.1 工具 Skill 总览

| Skill | 用途 |
|-------|------|
| `baoyu-compress-image` | 图片压缩 |
| `baoyu-format-markdown` | Markdown 格式化 |
| `baoyu-markdown-to-html` | Markdown 转 HTML |
| `baoyu-translate` | 翻译（3 种模式） |
| `baoyu-url-to-markdown` | URL 转 Markdown |

### 10.2 baoyu-translate — 智能翻译

**3 种翻译模式**：

| 模式 | 步骤 | 使用场景 |
|------|------|---------|
| Quick | 直接翻译 | 短文本、非正式内容 |
| Normal（默认） | 分析 → 翻译 | 文章、博客 |
| Refined | 分析 → 翻译 → 审校 → 润色 | 出版级文档 |

**受众预设**：general、technical、academic、business

**风格预设**：storytelling（默认）、formal、technical、literal、academic、business、humorous、conversational、elegant

---

## 十一、扩展机制

### 11.1 EXTEND.md

所有 Skill 支持通过 `EXTEND.md` 自定义配置。

**扩展路径优先级**：
1. `.baoyu-skills/<skill-name>/EXTEND.md` — 项目级
2. `~/.baoyu-skills/<skill-name>/EXTEND.md` — 用户级

**示例**：自定义 `baoyu-cover-image` 的品牌颜色：

```bash
mkdir -p .baoyu-skills/baoyu-cover-image
```

创建 `.baoyu-skills/baoyu-cover-image/EXTEND.md`：

```markdown
## Custom Palettes

### corporate-tech
- Primary colors: #1a73e8, #4A90D9
- Background: #F5F7FA
- Accent colors: #00B4D8, #48CAE4
- Decorative hints: Clean lines, subtle gradients
- Best for: SaaS, enterprise, technical
```

### 11.2 环境变量配置

支持多种 API 后端：

| 后端 | 环境变量 |
|------|---------|
| OpenAI | `OPENAI_API_KEY` |
| Azure OpenAI | `AZURE_OPENAI_API_KEY` |
| OpenRouter | `OPENROUTER_API_KEY` |
| Google | `GOOGLE_API_KEY` |
| DashScope（阿里云通义） | `DASHSCOPE_API_KEY` |
| Z.AI | `ZAI_API_KEY` |
| MiniMax | `MINIMAX_API_KEY` |
| Replicate | `REPLICATE_API_TOKEN` |
| 即梦 | `JIMENG_ACCESS_KEY_ID` |
| 豆包 Seedream | `ARK_API_KEY` |

---

## 十二、与 OpenClaw 的结合

### 12.1 安装方式

```bash
# 快速安装
npx skills add jimliu/baoyu-skills

# 发布到 ClawHub 后单独安装
clawhub install baoyu-imagine
clawhub install baoyu-markdown-to-html
```

### 12.2 可视化 Skill 选择指南

| 需求 | 推荐 Skill |
|------|---------|
| 技术架构图、流程图 | `baoyu-diagram` |
| 专业信息图（多风格） | `baoyu-infographic` |
| 文章配图 | `baoyu-article-illustrator` |
| 封面图 | `baoyu-cover-image` |
| 幻灯片演示 | `baoyu-slide-deck` |
| 知识漫画 | `baoyu-comic` |
| 小红书图文 | `baoyu-xhs-images` |

### 12.3 组合工作流

```
文章内容
    ↓
baoyu-article-illustrator → 文章配图
    ↓
baoyu-cover-image → 封面图
    ↓
baoyu-slide-deck → 幻灯片（用于演讲）
    ↓
baoyu-post-to-x → 发布到 X
baoyu-post-to-wechat → 发布到微信
```

---

## 十三、与其他可视化工具对比

| 维度 | fireworks-tech-graph | excalidraw-diagram-skill | AntV Infographic | **baoyu-skills** |
|------|---------------------|-------------------------|------------------|-----------------|
| **输出** | SVG+PNG | Excalidraw JSON | SVG+HTML | **图片+SVG** |
| **图表类型** | 14 种 | 1 种（手绘） | 7 大类 200+ 模板 | **8 种 + 21 布局** |
| **风格** | 7 种预设 | 无（手绘设计） | 3 种 stylize | **17 种视觉风格** |
| **AI 生成** | 自然语言 | 自然语言+设计原则 | 声明式 DSL | **智能推荐组合** |
| **发布** | - | - | - | **X/微信/微博/小红书** |
| **复杂度** | 中等 | 较高 | 较低 | **高（21 个 Skill）** |

---

## 十四、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/jimliu/baoyu-skills |
| 安装文档 | 见上方安装部分 |
| 相关对比 | [FireworksTechGraph技术图生成完全指南.md](./FireworksTechGraph技术图生成完全指南.md) |
| 相关对比 | [ExcalidrawDiagramSkill完全指南.md](./ExcalidrawDiagramSkill完全指南.md) |
| 相关对比 | [AntVInfographic完全指南.md](./AntVInfographic完全指南.md) |

---

*文档版本: 2026-04-22*
