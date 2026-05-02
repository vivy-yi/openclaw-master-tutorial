# AntV Infographic 完全指南

> 声明式信息图可视化引擎，用文字赋予数据生命

---

## 一、概述

### 1.1 什么是 AntV Infographic

| 项目 | 说明 |
|------|------|
| **定位** | 声明式信息图可视化引擎 |
| **官网** | https://infographic.antv.vision/ |
| **GitHub** | https://github.com/antvis/Infographic |
| **许可** | MIT |
| **语言** | TypeScript |
| **stars** | 4,926+ |
| **创建时间** | 2025-09-11 |
| **团队** | AntV（蚂蚁集团可视化团队） |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│              AntV Infographic 核心特点                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ AI 友好语法                                              │
│     └── 声明式 DSL，AI 可流式输出并逐步渲染                  │
│                                                              │
│  ✅ 200+ 内置模板                                            │
│     └── 列表、序列、对比、层级、图表、关系图                │
│                                                              │
│  ✅ 主题系统                                                │
│     └── 手绘、渐变、图案、多种预设主题                      │
│                                                              │
│  ✅ 内置编辑器                                              │
│     └── AI 生成后可继续编辑                                 │
│                                                              │
│  ✅ 高质量 SVG 输出                                         │
│     └── 默认 SVG 渲染，确保视觉保真和易编辑                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 与其他可视化工具对比

| 维度 | fireworks-tech-graph | excalidraw-diagram-skill | AntV Infographic |
|------|---------------------|-------------------------|------------------|
| **输出格式** | SVG + PNG | Excalidraw JSON | SVG + HTML |
| **模板数量** | 14 种图类型 | 无模板（手绘设计） | **200+ 模板** |
| **语法类型** | 自然语言描述 | 设计方法论 | **声明式 DSL** |
| **学习曲线** | 中等 | 较高 | **较低（模板驱动）** |
| **适用场景** | 技术架构图 | 演示/教学 | **信息图/报告/仪表盘** |
| **交互编辑** | 静态 | 可编辑 | **内置编辑器** |
| **AI 流式输出** | 需验证循环 | 需验证循环 | **原生支持** |

---

## 二、核心概念

### 2.1 信息图公式

```
Infographic = Information Structure + Visual Expression
信息图 = 信息结构 + 视觉表达
```

**关键洞察**：信息图不是简单的图表，而是将数据、信息与知识转化为可感知的视觉语言。

### 2.2 语法结构

AntV Infographic 使用**声明式 DSL**，基于缩进表达结构：

```infographic
infographic <模板名>
data
  title 标题
  desc 描述
  lists
    - label 条目
      value 12.5
      desc 说明
      icon 图标
theme
  palette #3b82f6 #8b5cf6 #f97316
```

**三大核心块：**
| 块 | 说明 |
|---|------|
| `infographic` | 模板名称（第一行） |
| `data` | 信息图数据（title/desc 和主数据字段） |
| `theme` | 主题配置（palette/字体/风格化） |

### 2.3 Language Lock（语言锁定）

```
⚠️ 重要规则：
- Prompt 书写语言 ≠ 输出语言
- 用户输入英文 → 生成的 title/desc/label 必须英文
- 用户输入中文 → 生成的 title/desc/label 必须中文
- 不要自动翻译！
```

---

## 三、硬性语法规则

### 3.1 基础规则

```
✅ 第一行必须是：infographic <template-name>
✅ 模板列表只写模板名；输出时必须显式写出 infographic 前缀
✅ 使用 data/theme 块，块内统一两个空格缩进
✅ 键值对写法：键 空格 值
✅ 对象数组使用 - 作为条目前缀
✅ icon 可用精确 ID（如 mingcute/server-line）或语义关键词（如 star fill）
✅ 语义关键词之间用空格分隔，不要用短横线（写 rocket launch，不写 rocket-launch）
```

### 3.2 Icon 规则

```
⚠️ 必须为语义型数据项补充 icon：
- lists 下的条目
- sequences 下的条目
- nodes 下的条目
- compares/children 下的条目
- 模板名明显依赖图标时

✅ 正确：- label 获客  icon rocket launch
❌ 错误：- label 获客

即使不确定精确图标 ID，也要写简洁语义关键词：
✅ 正确：icon rocket / icon shield / icon database
❌ 错误：省略 icon
```

### 3.3 主数据字段选择

| 模板前缀 | 数据字段 | 说明 |
|---------|---------|------|
| `list-*` | `lists` | 列表类 |
| `sequence-*` | `sequences` | 序列类，可选 `order asc\|desc` |
| `sequence-interaction-*` | `sequences` + `relations` | 多角色交互 |
| `compare-*` | `compares` | 对比类 |
| `hierarchy-structure` | `items` | 结构层级 |
| `hierarchy-*` | 单一 `root` + `children` | 树形层级 |
| `relation-*` | `nodes` + `relations` | 关系图 |
| `chart-*` | `values` | 图表类 |

---

## 四、模板详解

### 4.1 模板分类总览

| 类别 | 模板前缀 | 用途 |
|------|---------|------|
| **列表类** | `list-*` | 并列要点、特性列表 |
| **序列类** | `sequence-*` | 时间线、步骤、流程 |
| **交互类** | `sequence-interaction-*` | 多角色/多系统交互 |
| **对比类** | `compare-*` | 双方对比、SWOT、象限分析 |
| **层级类** | `hierarchy-*` | 树形、思维导图、结构图 |
| **图表类** | `chart-*` | 折线图、柱状图、饼图、词云 |
| **关系类** | `relation-*` | 节点关系、流程图 |

### 4.2 列表类模板（list-*）

```
适用场景：并列要点列举、特性列表、优势对比
选择建议：
- list-row-horizontal-icon-arrow：行布局，水平图标箭头
- list-column-vertical-icon-arrow：列布局，垂直图标箭头
- list-grid-badge-card：网格布局，徽章卡片
- list-waterfall-badge-card：瀑布流布局
- list-zigzag-up/down：锯齿布局
```

**示例：**
```infographic
infographic list-grid-badge-card
data
  title Feature List
  lists
    - label Fast
      icon flash fast
    - label Secure
      icon shield check
    - label Scalable
      icon chart line up
```

### 4.3 序列类模板（sequence-*）

```
适用场景：严格顺序、步骤推进、阶段演进
选择建议：
- sequence-ascending-steps：上升步骤
- sequence-snake-steps：蛇形步骤
- sequence-timeline：时间线
- sequence-roadmap：路线图
- sequence-funnel：漏斗图
- sequence-pyramid：金字塔
```

**示例：**
```infographic
infographic sequence-ascending-steps
data
  title 发布流程
  sequences
    - label 需求确认
      icon clipboard check
    - label 开发实现
      icon code
    - label 测试验证
      icon check circle
    - label 发布上线
      icon rocket
  order asc
```

### 4.4 交互类模板（sequence-interaction-*）

```
适用场景：多角色或多系统交互、泳道图
特点：每个 sequences 元素是一个泳道，children 是节点

示例结构：
sequences
  - label 用户       ← 泳道 1
    children
      - label 发起登录
  - label 系统       ← 泳道 2
    children
      - label 校验密码
```

**示例：**
```infographic
infographic sequence-interaction-default-badge-card
data
  title 登录校验流程
  sequences
    - label 用户
      icon user
      children
        - label 发起登录
          id user-login
    - label 前端
      icon code
      children
        - label 发送请求
          id send-request
    - label 后端
      icon server
      children
        - label 校验密码
          id verify-password
```

### 4.5 对比类模板（compare-*）

```
适用场景：双方对比、方案对比、前后对比、SWOT、象限分析
选择建议：
- compare-binary-*：双方对比
- compare-swot：SWOT 分析
- compare-quadrant-*：象限分析
```

**compare-binary 规则：**
```
✅ compares 第一层必须且只能有两个根节点（双方）
✅ 两个根节点都应包含 children
✅ 真正的对比项写在各自的 children 下
✅ 即使每侧只有 1 个指标，也要写成 children 内含 1 个对象条目
```

**示例：**
```infographic
infographic compare-binary-horizontal-badge-card-arrow
data
  title 方案对比
  compares
    - label 方案 A
      icon check circle
      children
        - label 成本低
        - label 交付快
    - label 方案 B
      icon shield
      children
        - label 质量高
        - label 扩展性好
```

**SWOT 示例：**
```infographic
infographic compare-swot
data
  title SWOT 分析
  compares
    - label Strengths 优势
      icon star
      children
        - label 技术领先
    - label Weaknesses 劣势
      icon warning
      children
        - label 团队规模小
    - label Opportunities 机会
      icon trend up
      children
        - label 市场需求大
    - label Threats 威胁
      icon bomb
      children
        - label 竞争激烈
```

### 4.6 层级类模板（hierarchy-*）

```
适用场景：层级树结构、组织架构、思维导图
选择建议：
- hierarchy-tree-*：树形结构
- hierarchy-mindmap-*：思维导图
- hierarchy-structure：简单结构
```

**Tree 示例：**
```infographic
infographic hierarchy-tree-tech-style-badge-card
data
  title 技术架构
  root
    label 后端服务
    children
      - label API Gateway
        children
          - label Auth
          - label Rate Limit
      - label 业务服务
        children
          - label Order
          - label Payment
      - label 数据层
        children
          - label MySQL
          - label Redis
```

**Mindmap 示例：**
```infographic
infographic hierarchy-mindmap-branch-gradient-capsule-item
data
  title 主题
  root
    label 中心主题
    children
      - label 分支一
        children
          - label 子主题
      - label 分支二
        children
          - label 子主题
```

### 4.7 图表类模板（chart-*）

```
适用场景：统计趋势、数值对比、词频展示
选择建议：
- chart-line-plain-text：折线图
- chart-bar-plain-text：条形图
- chart-column-simple：柱状图
- chart-pie-*：饼图/环形图
- chart-wordcloud：词云
```

**折线图示例：**
```infographic
infographic chart-line-plain-text
data
  title 销售趋势
  values
    - label 1月
      value 120
    - label 2月
      value 150
    - label 3月
      value 180
    - label 4月
      value 220
```

**饼图示例：**
```infographic
infographic chart-pie-donut-pill-badge
data
  title 市场份额
  values
    - label 产品A
      value 35
    - label 产品B
      value 25
    - label 产品C
      value 20
    - label 其他
      value 20
```

### 4.8 关系类模板（relation-*）

```
适用场景：节点关系、流程依赖、DAG 图
选择建议：
- relation-dagre-flow-tb-*：从上到下流程图
- 简单关系可用箭头语法直接表达
```

**示例：**
```infographic
infographic relation-dagre-flow-tb-badge-card
data
  title 流程图
  nodes
    - id start
      label 开始
    - id process
      label 处理
    - id end
      label 结束
  relations
    - source start
      target process
    - source process
      target end
```

---

## 五、主题系统

### 5.1 主题配置

```infographic
theme
  palette #3b82f6 #8b5cf6 #f97316
  base
    text
      font-family 851tegakizatsu
  stylize
    rough
```

### 5.2 palette（调色板）

```
✅ 推荐行内数组写法
❌ 不要加引号、逗号

正确：palette #4f46e5 #06b6d4 #10b981
错误：palette "#4f46e5, #06b6d4, #10b981"
```

### 5.3 stylize（风格化）

| 风格 | 说明 |
|------|------|
| `rough` | 手绘效果 |
| `pattern` | 图案填充 |
| `linear-gradient` | 线性渐变 |
| `radial-gradient` | 径向渐变 |

### 5.4 font-family（字体）

常用字体：`851tegakizatsu`（数学风格）、`Noto Sans SC`（中文）

---

## 六、输出与渲染

### 6.1 HTML 渲染模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>{title} - Infographic</title>
</head>
<body>
  <div id="container"></div>
  <script src="https://unpkg.com/@antv/infographic@latest/dist/infographic.min.js"></script>
  <script>
    const infographic = new AntVInfographic.Infographic({
      container: '#container',
      width: '100%',
      height: '100%',
    });
    
    document.fonts?.ready.then(() => {
      infographic.render(`{syntax}`);
    }).catch((error) => console.error('Font loading error:', error));
  </script>
</body>
</html>
```

### 6.2 SVG 导出

```javascript
const svgDataUrl = await infographic.toDataURL({ type: 'svg' });
// 可以保存为 .svg 文件
```

### 6.3 流式渲染

AntV Infographic 语法具有**高容错性**，支持 AI 流式输出时逐步渲染：

```
用户看到的是：AI 正在逐行生成语法，信息图也在逐步更新
```

---

## 七、自检清单（输出前必查）

```
□ 1. 首行是否为 infographic <template-name>
□ 2. 是否只使用了一个与模板匹配的主数据字段
□ 3. 主要数据项是否都带有合理的 icon（列表、步骤、节点、对比项）
□ 4. palette 是否为裸颜色值（无引号、无逗号）
□ 5. sequence-interaction-* 的泳道节点是否写成 children -> - label ...
□ 6. compare-binary-* 是否只有两个根节点，内容在各自 children 下
□ 7. children 下的每一项是否都显式包含 label
□ 8. chart-line-* 是否使用单条有序 values
□ 9. 输出中是否没有 JSON、解释文字或多余代码块
□ 10. 语言是否与用户输入一致（中文输入→中文输出）
```

---

## 八、生成流程

### 8.1 第一步：理解用户需求

```
1. 提取关键信息结构（title、desc、items 等）
2. 明确所需数据字段
3. 对语义明确的主要数据项主动补充 icon
4. 选择合适模板
5. 使用 AntV Infographic 语法描述
```

**⚠️ 注意**：必须尊重用户输入的语言。

### 8.2 第二步：渲染信息图

```
1. 创建完整 HTML 文件
2. 引入 AntV Infographic 脚本
3. 初始化 Infographic 实例
4. 替换 {title} 和 {syntax}
5. 生成文件，命名为 <title>-infographic.html
```

### 8.3 第三步：展示给用户

```
- 提供文件路径，提示："直接用浏览器打开即可查看并保存 SVG"
- 输出语法，提示："需要调整模板/配色/内容请告诉我"
```

---

## 九、与 OpenClaw 的结合

### 9.1 适用场景

| 场景 | 说明 |
|------|------|
| 数据报告 | 自动生成带图表的数据报告 |
| 产品介绍 | 特性列表、优势对比 |
| 流程文档 | 步骤流程、泳道图 |
| SWOT/象限分析 | 商业分析可视化 |
| 运营Dashboard | 统计指标展示 |

### 9.2 与其他工具对比选择

| 需求 | 推荐 |
|------|------|
| 技术架构图 | fireworks-tech-graph |
| 演示/教学图 | excalidraw-diagram-skill |
| **信息图/报告** | **AntV Infographic** |
| 快速生成（低学习曲线） | AntV Infographic |
| 需要内置编辑器 | AntV Infographic |
| 200+ 模板选择 | AntV Infographic |

### 9.3 安装 Skill

```bash
# 方式 1：直接克隆
git clone https://github.com/antvis/Infographic.git
cp -r Infographic/skills/infographic-creator ~/.openclaw/skills/

# 方式 2：复制整个项目
git clone https://github.com/antvis/Infographic.git ~/.openclaw/skills/infographic
```

---

## 十、模板选择速查表

| 场景 | 推荐模板 |
|------|---------|
| 并列要点列表 | `list-grid-badge-card` |
| 步骤流程 | `sequence-ascending-steps` |
| 时间线 | `sequence-timeline` |
| 路线图 | `sequence-roadmap-vertical-plain-text` |
| 多角色交互 | `sequence-interaction-default-badge-card` |
| 双方对比 | `compare-binary-horizontal-badge-card-arrow` |
| SWOT 分析 | `compare-swot` |
| 象限分析 | `compare-quadrant-quarter-simple-card` |
| 树形结构 | `hierarchy-tree-tech-style-badge-card` |
| 思维导图 | `hierarchy-mindmap-branch-gradient-capsule-item` |
| 折线趋势 | `chart-line-plain-text` |
| 柱状对比 | `chart-column-simple` |
| 饼图占比 | `chart-pie-donut-pill-badge` |
| 词云 | `chart-wordcloud` |
| 关系流程 | `relation-dagre-flow-tb-badge-card` |

---

## 十一、相关资源

| 资源 | 链接 |
|------|------|
| 官网 | https://infographic.antv.vision |
| 文档 | https://infographic.antv.vision/learn |
| 图库 | https://infographic.antv.vision/gallery |
| AI Agent | https://infographic.antv.vision/ai |
| GitHub | https://github.com/antvis/Infographic |
| 相关对比 | [FireworksTechGraph技术图生成完全指南.md](./FireworksTechGraph技术图生成完全指南.md) |
| 相关对比 | [ExcalidrawDiagramSkill完全指南.md](./ExcalidrawDiagramSkill完全指南.md) |

---

*文档版本: 2026-04-22 (新增内部 Skills 详解)*
---

## 十二、内部 Skills 详解

AntV Infographic 项目包含 **5 个协作的 Skill**，分别负责不同层面的工作：

### 12.1 Skills 架构总览

```
┌─────────────────────────────────────────────────────────────┐
│              AntV Infographic Skills 架构                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  infographic-creator（主编）                                 │
│       ↓                                                     │
│  infographic-syntax-creator（生成 DSL 语法）                 │
│       ↓                                                     │
│  infographic-item-creator（生成 Item 组件）                  │
│       ↓                                                     │
│  infographic-structure-creator（生成 Structure 组件）        │
│       ↓                                                     │
│  infographic-template-updater（更新模板目录）                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 infographic-creator（主编 Skill）

| 属性 | 说明 |
|------|------|
| **定位** | 主入口Skill，协调其他 Skills |
| **触发** | 用户请求创建信息图 |
| **职责** | 理解需求 → 选择模板 → 生成 DSL → 渲染 HTML |
| **输出** | 可查看的 HTML 文件 + SVG |

**工作流：**
```
用户请求
    ↓
理解需求（提取 title/desc/items）
    ↓
选择合适模板
    ↓
生成 Infographic DSL（调用 infographic-syntax-creator）
    ↓
生成 HTML 并渲染
    ↓
展示给用户
```

### 12.3 infographic-syntax-creator（DSL 生成）

| 属性 | 说明 |
|------|------|
| **定位** | 将用户内容转为 AntV Infographic 语法 |
| **触发** | 需要将笔记/大纲/报告转为 DSL |
| **输入** | 用户内容（文本/大纲/报告） |
| **输出** | Infographic DSL 语法（纯语法，无 HTML） |

**核心规则：**
- 参考 `references/prompt.md` 获取完整模板列表
- 尊重用户语言（Language Lock）
- `compare-binary-*` 必须恰好两个根节点
- 默认添加 icon（除非用户明确不要）
- 输出必须是单个 fenced code 块

**示例：**
```infographic
infographic list-row-horizontal-icon-arrow
data
  title 产品特点
  lists
    - label 快速
      icon flash
    - label 安全
      icon shield
```

### 12.4 infographic-item-creator（Item 组件生成）

| 属性 | 说明 |
|------|------|
| **定位** | 生成数据项可视化组件 |
| **触发** | 设计/实现/修改 Item 视觉 |
| **输出** | TypeScript/TSX 组件代码 |

**职责：**
- 在 `src/designs/items/` 下生成 Item 组件
- 实现布局逻辑、注册 `registerItem`
- 使用 `getItemProps` 提取自定义 props
- 使用 `getElementBounds` 计算布局

**参考：** `references/item-prompt.md`

### 12.5 infographic-structure-creator（Structure 组件生成）

| 属性 | 说明 |
|------|------|
| **定位** | 生成结构布局组件 |
| **触发** | 设计/实现/修改 Structure 布局 |
| **输出** | TypeScript/TSX 组件代码 |

**职责：**
- 在 `src/designs/structures/` 下生成 Structure 组件
- 支持 7 种结构：list/compare/sequence/hierarchy/relation/geo/chart
- 实现布局逻辑、注册 `registerStructure`
- 处理 Item vs Items、decor 元素

**参考：** `references/structure-prompt.md`

### 12.6 infographic-template-updater（模板目录更新）

| 属性 | 说明 |
|------|------|
| **定位** | 新增模板后更新各类目录 |
| **触发** | 添加新模板到 `src/templates/*.ts` |
| **职责** | 更新 SKILL.md、Site UI、AI Playground |

**更新目标：**

| 文件 | 更新内容 |
|------|---------|
| `skills/infographic-creator/SKILL.md` | Available Templates 列表 |
| `site/src/components/AIPlayground/Prompt.ts` | AI Playground 模板列表 |
| `skills/infographic-syntax-creator/references/prompt.md` | 语法参考模板列表 |

### 12.7 Skills 协作流程

```
场景：用户需要新模板

1. infographic-template-updater
   ↓
   添加新模板到 src/templates/*.ts
   更新 SKILL.md 和 UI 目录

2. infographic-structure-creator（如需新结构）
   ↓
   生成 Structure 组件
   
3. infographic-item-creator（如需新 item）
   ↓
   生成 Item 组件

4. infographic-syntax-creator（日常使用）
   ↓
   生成 DSL 语法

5. infographic-creator（主编）
   ↓
   协调以上，输出最终 HTML
```

---

## 十三、五 Skill 对比与选择

| Skill | 输入 | 输出 | 场景 |
|-------|------|------|------|
| infographic-creator | 用户需求 | HTML + SVG | 直接创建信息图 |
| infographic-syntax-creator | 文本/大纲 | DSL 语法 | 只生成语法，不渲染 |
| infographic-item-creator | 组件需求 | TSX 代码 | 开发新 Item 组件 |
| infographic-structure-creator | 布局需求 | TSX 代码 | 开发新 Structure 组件 |
| infographic-template-updater | 新模板文件 | 目录更新 | 添加新模板 |


---

*文档版本: 2026-04-22 (新增内部 Skills 详解)*

---

## 十四、核心 SKILL.md 内容详解

以下是 AntV Infographic 项目中 **5 个 Skill 的原始 SKILL.md 核心内容**，完整还原了其设计思路和硬性规则。

### 14.1 infographic-creator（主编 Skill）

**原始描述：**
```yaml
name: infographic-creator
description: 基于给定文字内容创建精美信息图。当用户请求创建信息图时使用。
```

**核心规范：**

1. **Language Lock（语言锁定）**
   - Prompt 语言 ≠ 输出语言
   - 用户输入英文 → 生成的 title/desc/label 必须英文
   - 用户输入中文 → 生成的 title/desc/label 必须中文
   - 不要自动翻译！

2. **硬性语法规则**
   - 第一行必须是 `infographic <template-name>`
   - 模板列表只写模板名本身；输出时首行必须显式写出 `infographic` 前缀
   - 使用 `data` / `theme` 块，块内统一两个空格缩进
   - 键值对写法是 `键 空格 值`；对象数组使用 `-` 作为条目前缀
   - icon 可以使用精确图标 ID（如 `mingcute/server-line`）或语义关键词（如 `star fill`）
   - 语义关键词之间用空格分隔，不要用短横线（写 `rocket launch`，不写 `rocket-launch`）

3. **主数据字段选择**
   - `list-*` → `lists`
   - `sequence-*` → `sequences`，可选 `order asc|desc`
   - `sequence-interaction-*` → `sequences` + `relations`
   - `compare-*` → `compares`
   - `hierarchy-structure` → `items`
   - `hierarchy-*` → 单一 `root` + `children` 递归
   - `relation-*` → `nodes` + `relations`
   - `chart-*` → `values`

4. **输出格式**
   - 只输出一个 `plain` 代码块，不添加任何解释性文字
   - 首行必须是 `infographic <template-name>`

5. **生成流程**
   - 第一步：理解用户需求 → 提取结构 → 选择模板 → 生成 DSL
   - 第二步：渲染信息图 → 生成 HTML 文件
   - 第三步：展示给用户 → 提供文件路径 + 语法

### 14.2 infographic-syntax-creator（DSL 生成）

**原始描述：**
```yaml
name: infographic-syntax-creator
description: Generate AntV Infographic syntax only. Use when asked to turn notes, outlines, reports, or other user content into the Infographic DSL with template selection, data structuring, and theme hints. Do not use for HTML rendering or TS/TSX component implementation.
```

**核心规则：**

1. **输入/输出**
   - 输入：用户内容（笔记、大纲、报告）
   - 输出：Infographic DSL 语法（纯语法，无 HTML）
   - 不包含 HTML 渲染或 TS/TSX 组件实现

2. **工作流**
   - 读取 `references/prompt.md` 获取语法规则和模板列表
   - 如果用户明确指定模板，优先使用
   - 否则选择最匹配模板（sequence/list/compare/hierarchy/chart）
   - 提取关键结构：title, desc, items, hierarchy, metrics
   - 组合语法，使用 `prompt.md` 作为格式化基准

3. **硬性约束**
   - 输出必须是单个 fenced code 块，只包含语法
   - 首行是 `infographic <template-name>`
   - 使用两个空格缩进；键值对 `key value`；数组用 `-`
   - 用户语言保持一致（除非用户明确要求翻译）
   - 默认添加 icon（除非用户明确要纯文本或模板是 chart-only）
   - `compare-binary-*` / `compare-hierarchy-left-right-*` 必须恰好两个根节点
   - `compare-swot` / `compare-quadrant-*` 有自己的根节点数量

4. **注意**
   - 此 skill 只返回语法
   - 如果用户需要渲染的 HTML 文件，使用 `infographic-creator`

### 14.3 infographic-item-creator（Item 组件生成）

**原始描述：**
```yaml
name: infographic-item-creator
description: Generate or update infographic Item components for this repo (TypeScript/TSX in src/designs/items). Use when asked to design, implement, or modify data item visuals, layout logic, or registerItem composites.
```

**核心规范：**

1. **定位**
   - 在 `src/designs/items/` 下生成 Item 组件
   - 实现数据项可视化、布局逻辑
   - 注册 `registerItem` composites

2. **工作流**
   - 读取 `references/item-prompt.md` 获取完整框架规则
   - 澄清最小需求：视觉、字段（icon/label/value/desc/illus）、尺寸、对齐
   - 使用 `getItemProps` 提取自定义 props
   - 使用 `getElementBounds` 计算布局
   - 输出完整 TypeScript 文件：imports、Props extends BaseItemProps、组件实现、`registerItem`

3. **自检约束**
   - 不使用未列出的组件
   - 所有包装组件传递 indexes
   - 正确的条件渲染

4. **最佳实践**
   - 优先扫描 `src/designs/items/` 中的类似 item 以匹配本地模式
   - 保持输出简洁；避免 React-only 特性（keys, hooks）

### 14.4 infographic-structure-creator（Structure 组件生成）

**原始描述：**
```yaml
name: infographic-structure-creator
description: Generate or update infographic Structure components for this repo (TypeScript/TSX in src/designs/structures). Use when asked to design, implement, or modify structure layouts (list/compare/sequence/hierarchy/relation/geo/chart), including layout logic, component composition, and registration.
```

**核心规范：**

1. **定位**
   - 在 `src/designs/structures/` 下生成 Structure 组件
   - 支持 7 种结构：list/compare/sequence/hierarchy/relation/geo/chart
   - 实现布局逻辑、组件组合、注册

2. **工作流**
   - 读取 `references/structure-prompt.md` 获取完整框架规则
   - 澄清需求：结构类别、布局方向、层级深度、是否需要增删按钮
   - 选择 Item vs Items，使用 `getElementBounds` 计算布局
   - 规划 decor 元素（ItemsGroup 下）
   - 输出完整 TypeScript 文件

3. **自检约束**
   - 不使用未列出的组件
   - 不使用 SVG cx/cy/r
   - 正确的 indexes
   - 空状态处理

4. **支持的结构**
   - list：列表布局
   - compare：对比布局
   - sequence：序列布局
   - hierarchy：层级布局
   - relation：关系布局
   - geo：地理布局
   - chart：图表布局

### 14.5 infographic-template-updater（模板目录更新）

**原始描述：**
```yaml
name: infographic-template-updater
description: Update template catalogs and UI prompts after adding new infographic templates (src/templates/*.ts), including SKILL.md template list, site gallery template mappings, and the AIPlayground prompt list.
```

**核心规范：**

1. **定位**
   - 新增模板后更新各类目录
   - 保持模板列表和 UI 提示同步

2. **工作流**
   - 从新增的 `src/templates/*.ts` 收集新模板名
   - 如果模板通过 spreads 组合（如 `...listZigzagTemplates`），在 `src/templates/built-in.ts` 确认最终 keys
   - 更新模板列表（保持现有顺序/分组）
   - 完整性检查

3. **更新目标**

| 文件 | 更新内容 |
|------|---------|
| `skills/infographic-creator/SKILL.md` | Available Templates 列表 |
| `site/src/components/AIPlayground/Prompt.ts` | AI Playground 模板列表 |
| `skills/infographic-syntax-creator/references/prompt.md` | 语法参考模板列表 |

4. **规则**
   - 不要删除或重命名现有条目
   - 保持模板名精确和小写
   - 如果模板需要示例数据，更新 `site/src/components/Gallery/datasets.ts`

---

## 十五、5 Skill 完整对比表

| Skill | name | description 核心 | 触发场景 | 输出 | 层级 |
|-------|------|-----------------|---------|------|------|
| **infographic-creator** | infographic-creator | 基于给定文字内容创建精美信息图 | 用户请求创建信息图 | HTML + SVG | 主编 |
| **infographic-syntax-creator** | infographic-syntax-creator | 生成 AntV Infographic syntax only | 将笔记/大纲/报告转为 DSL | DSL 语法 | 语法层 |
| **infographic-item-creator** | infographic-item-creator | 生成 Item 组件 (TSX) | 设计/实现 Item 视觉 | TSX 代码 | 组件层 |
| **infographic-structure-creator** | infographic-structure-creator | 生成 Structure 组件 (TSX) | 设计/实现 Structure 布局 | TSX 代码 | 组件层 |
| **infographic-template-updater** | infographic-template-updater | 更新模板目录和 UI 提示 | 添加新模板后 | 目录同步 | 维护层 |

---

*文档版本: 2026-04-22 (新增核心 SKILL.md 内容)*
