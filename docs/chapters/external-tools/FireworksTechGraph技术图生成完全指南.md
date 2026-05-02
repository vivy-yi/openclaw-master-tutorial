# Fireworks Tech Graph 技术图生成完全指南

> 描述即设计 — 用自然语言生成 publication-ready SVG + PNG 技术图

---

## 一、概述

### 1.1 什么是 Fireworks Tech Graph

| 项目 | 说明 |
|------|------|
| **定位** | AI 编程时代的技术图生成工具 |
| **官网** | https://github.com/yizhiyanhua-ai/fireworks-tech-graph |
| **npm** | https://www.npmjs.com/package/@yizhiyanhua-ai/fireworks-tech-graph |
| **许可** | MIT |
| **语言** | Python + SVG |
| **stars** | 4,050+ |
| **创建时间** | 2026-04-10 |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│              Fireworks Tech Graph 核心特点                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 自然语言 → 技术图                                        │
│     └── 描述系统，即可生成 SVG，无需写 DSL                   │
│                                                              │
│  ✅ 7 种视觉风格                                            │
│     └── Flat Icon、Dark Terminal、Blueprint、Glassmorphism   │
│                                                              │
│  ✅ 14 种图类型                                             │
│     └── 完整 UML 支持 + AI/Agent 领域图                     │
│                                                              │
│  ✅ 语义化箭头                                              │
│     └── 颜色+虚线编码含义（write vs read vs async）         │
│                                                              │
│  ✅ 40+ 产品图标                                            │
│     └── OpenAI、Anthropic、Pinecone、Weaviate 等品牌色      │
│                                                              │
│  ✅ SVG + PNG 双输出                                        │
│     └── SVG 可编辑，PNG 1920px 无损                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 与 Mermaid / draw.io 对比

| | Mermaid | draw.io | **Fireworks Tech Graph** |
|--|---------|---------|--------------------------|
| 自然语言输入 | ❌ | ❌ | ✅ |
| AI/Agent 领域模式 | ❌ | ❌ | ✅ |
| 多种视觉风格 | ❌ 手动 | ❌ 手动 | ✅ 7 种内置 |
| 高清 PNG 导出 | ❌ 手动 | ❌ 手动 | ✅ 自动 1920px |
| 语义箭头颜色 | ❌ 手动 | ❌ 手动 | ✅ 自动 |
| 无需在线工具 | ✅ | ❌ | ✅ |

---

## 二、快速开始

### 2.1 安装

```bash
# 安装 skill
npx skills add yizhiyanhua-ai/fireworks-tech-graph

# 安装依赖（macOS）
brew install librsvg

# 验证
rsvg-convert --version
```

### 2.2 触发词

| 触发词 | 说明 |
|--------|------|
| `画图` `帮我画` `生成图` `做个图` | 中文触发 |
| `架构图` `流程图` `可视化` `出图` | 图类型触发 |
| `generate diagram` `draw diagram` `visualize` | 英文触发 |

### 2.3 生成流程

```
描述系统
  → 分类图类型（架构/流程/序列/Agent...）
  → 提取结构（节点、边、层级）
  → 应用布局规则
  → 加载风格参考
  → 生成 SVG
  → 验证 + 导出 PNG
```

### 2.4 基础示例

#### 架构图

```
用户：画一个 RAG 系统架构图

→ 分类：Architecture Diagram
→ 识别节点：User, Query, Embedding Model, Vector DB, Retriever, LLM, Response
→ 应用风格：Style 1 (Flat Icon)
→ 生成 SVG → 导出 PNG
```

#### Agent 流程图

```
用户：画一个 Multi-Agent 协作流程

→ 分类：Agent Architecture Diagram
→ 识别层：Input → Agent Core → Memory → Tools → Output
→ 识别节点：User, Coordinator, Research Agent, Coding Agent, Review Agent, Memory, Response
→ 识别循环：Agent ↔ Tools (loop)
→ 生成 SVG → 导出 PNG
```

---

## 三、7 种视觉风格

### 风格总览

| # | 名称 | 背景色 | 最佳场景 |
|---|------|--------|----------|
| 1 | **Flat Icon** | 白色 | 博客、文档、演示 |
| 2 | **Dark Terminal** | `#0f0f1a` | GitHub、开发者文章 |
| 3 | **Blueprint** | `#0a1628` | 架构文档 |
| 4 | **Notion Clean** | 白色，最少主义 | Notion、简约风格 |
| 5 | **Glassmorphism** | 深色渐变 | 产品站、演讲 |
| 6 | **Claude Official** | 暖米色 `#f8f6f3` | Anthropic 风格 |
| 7 | **OpenAI Official** | 纯白 `#ffffff` | OpenAI 风格 |

### Style 1 — Flat Icon（默认）

```
描述：Mem0 内存架构，白色背景，语义箭头，分层内存系统
```

### Style 2 — Dark Terminal

```
描述：Tool Call 流程，深色背景，霓虹色点缀，等宽字体
背景色：#0f0f1a
字体：等宽字体（JetBrains Mono / Source Code Pro）
箭头：霓虹色 (#00ff88, #ff6b6b, #6bffff)
```

### Style 3 — Blueprint

```
描述：微服务架构，深蓝色背景，网格线，青色描边
背景色：#0a1628
网格：10px 间隔的青色网格线
标题块：右下角工程标题栏
```

### Style 6 — Claude Official

```
描述：系统架构图，暖米色背景 (#f8f6f3)，Anthropic 品牌色
背景色：#f8f6f3
强调色：#c8503d (Anthropic 红)
布局：大量留白，右下角图例
```

### Style 7 — OpenAI Official

```
描述：API 集成流程，纯白背景，OpenAI 品牌色
背景色：#ffffff
强调色：#10a37f (OpenAI 绿)
风格：极简、精确、现代
```

---

## 四、14 种图类型详解

### 4.1 图类型总览

| 图类型 | ViewBox | 典型节点间距 |
|--------|---------|-------------|
| Architecture Diagram | 960×600 / 960×800 | 水平 120px，垂直 120px |
| Data Flow Diagram | 960×600 | 箭头带宽 2.5px |
| Flowchart / Process Flow | 960×600 | x: 120px, y: 80px |
| Agent Architecture | 960×600 | 5 层结构 |
| Memory Architecture | 960×600 | 分开读写路径 |
| Sequence Diagram | 高度=80+消息数×50 | 消息 50px 间距 |
| Comparison Matrix | 960×600 | 列 120px，行 40px |
| Timeline / Gantt | 960×400 / 1200×400 | 时间轴自适应 |
| Mind Map | 960×560 | 径向分布 |
| Class Diagram (UML) | 960×600 / 960×800 | 类框 160px 最小宽度 |
| Use Case Diagram (UML) | 960×600 | 用例椭圆 140×60px |
| State Machine Diagram (UML) | 960×600 | 状态框 120×50px |
| ER Diagram | 960×600 / 1200×600 | 实体 160px 最小宽度 |
| Network Topology | 960×600 | 分层：Internet→Edge→Core→Access |

### 4.2 Architecture Diagram（架构图）

```
典型层级：Client → Gateway/LB → Services → Data/Storage
布局：水平分层层叠
箭头：沿请求/数据流向
容器：用虚线 rect 包围同层相关服务
```

**示例 prompt：**
```
Draw a microservices architecture diagram in style 1 (Flat Icon).
Create four horizontal sections: 01 // EDGE, 02 // APPLICATION SERVICES, 
03 // DATA + EVENT INFRA, 04 // OBSERVABILITY.
Include Client Apps, API Gateway, Auth/Policy, three services, 
Event Router, Postgres, Redis Cache, Warehouse, Metrics/Traces.
```

### 4.3 Data Flow Diagram（数据流图）

```
重点：数据在何处转换
特点：
- 每条箭头标注数据类型（"embeddings", "query", "context"）
- 主数据路径箭头加粗（stroke-width: 2.5）
- 虚线箭头表示控制/触发流
- 箭头按数据类别着色
```

### 4.4 Flowchart / Process Flow（流程图）

```
形状规则：
- 决策：菱形
- 过程：圆角矩形
- 输入/输出：平行四边形
- 布局：上到下或左到右
- 节点对齐：x 120px 间隔，y 80px 间隔
```

### 4.5 Agent Architecture Diagram（Agent 架构图）

```
核心 5 层：
1. Input Layer：User, query, trigger
2. Agent Core：LLM, reasoning loop, planner
3. Memory Layer：Short-term (context window), Long-term (vector/graph DB), Episodic
4. Tool Layer：Tool calls, APIs, search, code execution
5. Output Layer：Response, action, side-effects

特点：用环形箭头表示迭代推理
```

**示例 prompt：**
```
Draw a RAG agent architecture diagram in style 2 (Dark Terminal).
Show User, Query, Retrieve chunks, Generate answer, Knowledge base,
Agent, Terminal, Source documents, Grounded answer.
Use terminal chrome, neon accents, monospace typography.
Semantic arrows for retrieval, synthesis, and embedding update.
```

### 4.6 Memory Architecture Diagram（内存架构图）

```
读写路径分离（不同箭头颜色）
内存层级：Working Memory → Short-term → Long-term → External Store
操作标注：store(), retrieve(), forget(), consolidate()
形状：堆叠矩形或分层圆柱体
```

### 4.7 Sequence Diagram（序列图）

```
参与者：垂直虚线（lifeline）+ 顶部标签
消息：参与之间的水平箭头，按时间顺序从上到下
激活框：细实心矩形表示活跃处理
分组：用 rect 框表示 loop/alt 区域
高度计算：80 + 消息数 × 50
```

### 4.8 Comparison / Feature Matrix（对比矩阵）

```
列：系统，行：属性
行高：40px，列宽：最小 120px，表头行高：50px
支持：淡绿色背景 + ✓
不支持：#f9fafb 填充
斑马纹：#f9fafb / #ffffff 交替
最大列数：5（超过则拆分）
```

### 4.9 Class Diagram（UML 类图）

```
类框：3 栏式矩形（名称 / 属性 / 方法）
- 名称栏：居中加粗（抽象 = 斜体）
- 属性栏：可见性符号（+ public, - private, # protected）
- 方法栏：同可见性符号

关系符号：
- 继承：实线 + 空心三角
- 实现：虚线 + 空心三角
- 关联：实线 + 空箭头
- 聚合：实线 + 空心菱形
- 组合：实线 + 实心菱形
- 依赖：虚线 + 空箭头
```

### 4.10 State Machine Diagram（UML 状态机）

```
状态：圆角矩形，最小 120×50px
初始状态：实心黑圆 (r=8)
终态：圆环套圆 (r=12 内部 r=8)
选择：空心小菱形
转移标签：event [guard] / action
守卫条件：方括号内
```

### 4.11 ER Diagram（实体关系图）

```
实体：矩形，表头加粗
主键：下划线
外键：斜体或 (FK) 标记
关系：连接线上的菱形
基数标注：1, N, 0..1, 0..*, 1..*
弱实体：双线矩形 + 双菱形关系
```

---

## 五、语义化形状词汇表

### 5.1 核心形状映射

| 概念 | 形状 | 视觉特征 |
|------|------|---------|
| User / Human | 圆形 + 身体路径 | 头像或火柴人 |
| LLM / Model | 圆角矩形 + brain/spark 图标 | 渐变填充，强调色 |
| Agent / Orchestrator | 六边形或双边框圆角矩形 | 主动控制器信号 |
| Memory (短期) | 圆角矩形，虚线边框 | 临时 = 虚线 |
| Memory (长期) | 圆柱体（数据库形状） | 持久 = 实心圆柱 |
| Vector Store | 圆柱体 + 内部网格线 | 3 条水平线 |
| Graph DB | 重叠圆形簇 | 3 个重叠圆 |
| Tool / Function | 齿轮矩形或扳手图标矩形 | |
| API / Gateway | 六边形（单边框） | |
| Queue / Stream | 水平管道形状 | |
| File / Document | 折角矩形 | |
| Browser / UI | 3 点标题栏矩形 | |
| Decision | 菱形 | 仅流程图 |
| Process / Step | 圆角矩形 | 标准框 |
| External Service | 云图标矩形或虚线边框 | |
| Data / Artifact | 平行四边形 | 流程图 I/O |

---

## 六、语义化箭头系统

### 6.1 箭头类型总览

| 流向类型 | 颜色 | 线宽 | 虚线 | 含义 |
|---------|------|------|------|------|
| 主数据流 | `#2563eb` 蓝 | 2px 实线 | 无 | 主请求/响应路径 |
| 控制/触发 | `#ea580c` 橙 | 1.5px 实线 | 无 | 一个系统触发另一个 |
| 内存读 | `#059669` 绿 | 1.5px 实线 | 无 | 从存储检索 |
| 内存写 | `#059669` 绿 | 1.5px | 5,3 | 写入/存储操作 |
| 异步/事件 | `#6b7280` 灰 | 1.5px | 4,2 | 非阻塞，事件驱动 |
| Embedding/转换 | `#7c3aed` 紫 | 1px 实线 | 无 | 数据转换 |
| 反馈/循环 | `#7c3aed` 紫 | 1.5px 曲线 | 无 | 迭代推理循环 |

### 6.2 箭头标注规则（关键）

```
⚠️ 必须为每个箭头标注添加背景矩形：
<rect fill="canvas_bg" opacity="0.95"/>
（水平 4px，垂直 2px 内边距）

位置：箭头中点
字数：≤3 个词
并发箭头：偏移 15-20px 错开
```

### 6.3 箭头路由规则

```
✓ 优先使用正交（L 形）路径减少交叉
✓ 箭头锚点在组件边缘，不在几何中心
✓ 绕过密集节点簇
✓ 并行箭头用不同 y 偏移

⚠️ 交叉处理：添加跳弧（5px 半径）
当两条箭头必须交叉时，用跳弧防止重叠：
- 上层箭头：正常绘制
- 下层箭头：先画背景色弧，再画箭头
- 多重交叉：错开半径（5px, 7px, 9px）
```

---

## 七、辅助脚本

### 7.1 脚本列表

| 脚本 | 用途 |
|------|------|
| `generate-diagram.sh` | 验证 SVG + 导出 PNG |
| `generate-from-template.py` | 从模板创建 SVG |
| `validate-svg.sh` | 验证 SVG 语法 |
| `test-all-styles.sh` | 批量测试所有风格 |

### 7.2 generate-diagram.sh

```bash
./scripts/generate-diagram.sh -t architecture -s 1 -o ./output/arch.svg

参数：
-t  图类型（architecture, flowchart, sequence...）
-s  风格编号（1-7）
-o  输出 SVG 路径
```

### 7.3 validate-svg.sh

```bash
./scripts/validate-svg.sh <svg-file>

验证内容：
✓ XML 语法
✓ 标签平衡
✓ marker 引用
✓ 属性完整性
✓ path 数据
```

### 7.4 Python 生成方法（强制）

```python
python3 << 'EOF'
lines = []
lines.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600">')
lines.append('  <defs>')
# ... 每行单独添加
lines.append('</svg>')

with open('/path/to/output.svg', 'w') as f:
    f.write('\n'.join(lines))
print("SVG generated successfully")
EOF
```

**原因**：防止字符截断、拼写错误和语法错误。每行独立，易于验证。

---

## 八、AI/Agent 领域内置模式

### 8.1 RAG Pipeline

```
Query → Embed → VectorSearch → Retrieve → Augment → LLM → Response
```

### 8.2 Agentic RAG

```
Query → Agent (loop) → [Search Tool / Calculator / Code] → Synthesizer → Response
                              ↑
                    Tool use between Query and LLM
```

### 8.3 Mem0 / Memory Layer

```
Input → Memory Manager
              ↓
      [Write: VectorDB + GraphDB] / [Read: Retrieve + Rank]
              ↓
      Context → LLM
```

### 8.4 Agent Memory Types

```
Sensory (raw input)
    ↓
Working (context window)
    ↓
Episodic (past interactions)
    ↓
Semantic (facts)
    ↓
Procedural (skills)
```

### 8.5 Multi-Agent

```
Orchestrator
    ↓
[SubAgent A / SubAgent B / SubAgent C]
    ↓
Aggregator → Output
```

### 8.6 Tool Call Flow

```
LLM → Tool Selector → Tool Execution → Result Parser → LLM (loop)
```

---

## 九、稳定 Prompt 配方

### Style 1 — Flat Icon

```
Draw a Mem0 memory architecture diagram in style 1 (Flat Icon).
Use four horizontal sections: Input Layer, Memory Manager, Storage Layer, Output / Retrieval.
Include User, AI App / Agent, LLM, mem0 Client, Memory Manager, Vector Store, Graph DB, Key-Value Store, History Store, Context Builder, Ranked Results, Personalized Response.
Use semantic arrows for read, write, control, and data flow. Keep the layout clean and product-doc friendly.
```

### Style 2 — Dark Terminal

```
Draw a tool call flow diagram in style 2 (Dark Terminal).
Show User query, Retrieve chunks, Generate answer, Knowledge base, Agent, Terminal, Source documents, and Grounded answer.
Use terminal chrome, neon accents, monospace typography, and semantic arrows for retrieval, synthesis, and embedding update.
```

### Style 3 — Blueprint

```
Draw a microservices architecture diagram in style 3 (Blueprint).
Create numbered engineering sections like 01 // EDGE, 02 // APPLICATION SERVICES, 03 // DATA + EVENT INFRA, 04 // OBSERVABILITY.
Include Client Apps, API Gateway, Auth / Policy, three services, Event Router, Postgres, Redis Cache, Warehouse, and Metrics / Traces.
Use blueprint grid, cyan strokes, and a bottom-right title block.
```

### Style 6 — Claude Official

```
Draw a system architecture diagram in style 6 (Claude Official).
Use left-side layer labels: Interface Layer, Core Layer, Foundation Layer.
Include Client Surface, Gateway, Task Planner, Model Runtime, Policy Guardrails, Memory Store, Tool Runtime, Observability, and Registry.
Use warm cream background, restrained brand-like palette, generous whitespace, and a bottom-right legend.
```

---

## 十、与 OpenClaw 的结合

### 10.1 适用场景

| 场景 | 说明 |
|------|------|
| 架构文档生成 | Agent 工作流程、系统架构可视化 |
| 技术博客配图 | 自动生成说明图，无需手动绘图 |
| 演示材料 | 产品架构、流程图一键生成 |
| 知识库建设 | 技术文档配图自动化 |

### 10.2 结合方式

1. **作为 Skill 使用**：通过 `npx skills add` 安装
2. **工作流集成**：OpenClaw 生成 SVG → 导出 PNG → 嵌入文档
3. **自动化文档**：定期生成系统架构图并更新

### 10.3 可能的结合点

| fireworks-tech-graph 解决的问题 | OpenClaw 应用场景 |
|--------------------------------|------------------|
| 技术图生成 | Agent 系统架构可视化 |
| SVG + PNG 输出 | 文档自动配图 |
| 自然语言驱动 | OpenClaw Skill 文档生成 |
| 多种风格切换 | 不同场景适配（PPT/文档/博客）|

---

## 十一、常见错误与修复

### 11.1 SVG 语法错误

| 错误 | 修复 |
|------|------|
| `yt-anchor` | ✅ `x="390" y="250" text-anchor="middle"` |
| `x="390`（缺少 y） | ✅ `x="390" y="250"` |
| `fill=#fff` | ✅ `fill="#ffffff"` |
| `marker-end=` | ✅ `marker-end="url(#arrow)"` |
| `L 29450` | ✅ `L 290,220` |
| 缺少 `</svg>` | ✅ 确保文件完整闭合 |

### 11.2 布局错误

| 错误 | 修复 |
|------|------|
| 箭头穿过组件 | ✅ 使用正交路径绕过 |
| 文本溢出 | ✅ 预估：`text.length × 7px ≤ width - 16px` |
| 箭头端点悬空 | ✅ 连接到形状边缘 |
| 箭头标签无背景 | ✅ 添加 `<rect fill="..." opacity="0.95"/>` |
| 线条重叠 | ✅ 使用跳弧（5px 半径） |

### 11.3 验证清单

```
生成后必须验证：
□ 箭头不穿过组件内部
□ 所有文本有足够内边距
□ 箭头连接到形状边缘（非中心）
□ 所有箭头标签有背景矩形
□ 组件间箭头从间隙穿过（非内部）
```

---

## 十二、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/yizhiyanhua-ai/fireworks-tech-graph |
| npm | https://www.npmjs.com/package/@yizhiyanhua-ai/fireworks-tech-graph |
| Claude Code Skill | https://claude.ai/code |

---

*文档版本: 2026-04-22*
