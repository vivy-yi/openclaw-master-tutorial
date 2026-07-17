# Architecture Diagram Generator 完全指南

> 暗色主题 SVG 架构图生成 — 4,116 Stars

---

## 一、概述

### 1.1 什么是 Architecture Diagram Generator

| 项目 | 说明 |
|------|------|
| **定位** | 暗色主题架构图生成器 |
| **GitHub** | https://github.com/Cocoon-AI/architecture-diagram-generator |
| **作者** | Cocoon AI |
| **语言** | HTML（纯模板，非编程） |
| **stars** | 4,116 |
| **创建时间** | 2025-12-22 |
| **许可证** | MIT |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│         Architecture Diagram Generator 核心特点                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 纯 HTML + SVG 输出                                      │
│     └── 单文件，无依赖，任何浏览器直接打开                  │
│                                                              │
│  ✅ 暗色主题设计系统                                       │
│     └── Slate-950 背景 + 语义化颜色编码                    │
│                                                              │
│  ✅ 语义化颜色                                               │
│     └── 前端=青色、后端=翡翠、数据库=紫罗兰                 │
│                                                              │
│  ✅ Claude AI Skill                                         │
│     └── 可在 Claude.ai / Claude Code 中使用                 │
│                                                              │
│  ✅ 无需设计技能                                             │
│     └── 纯文本描述 → 即可生成专业架构图                    │
│                                                              │
│  ✅ 可迭代编辑                                               │
│     └── 通过对话实时更新图表                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 与 FireworksTechGraph 对比

| 维度 | **Architecture Diagram** | FireworksTechGraph |
|------|--------------------------|-------------------|
| **输出** | HTML + SVG | SVG + PNG |
| **主题** | 暗色专用 | 7 种预设 |
| **语言** | HTML | TypeScript |
| **部署** | Skill | CLI |
| **复杂度** | 简单 | 中等 |
| **可编辑** | HTML 文本 | Excalidraw JSON |

---

## 二、设计系统

### 2.1 颜色语义

| 组件类型 | 填充色 | 描边色 | 用途 |
|---------|--------|--------|------|
| **Frontend** | `rgba(8, 51, 68, 0.4)` | `#22d3ee` 青色 | 客户端、UI |
| **Backend** | `rgba(6, 78, 59, 0.4)` | `#34d399` 翡翠 | 服务器、API |
| **Database** | `rgba(76, 29, 149, 0.4)` | `#a78bfa` 紫罗兰 | 数据库、存储 |
| **AWS/Cloud** | `rgba(120, 53, 15, 0.3)` | `#fbbf24` 琥珀 | 云服务、基础设施 |
| **Security** | `rgba(136, 19, 55, 0.4)` | `#fb7185` 玫红 | 认证、安全组 |
| **Message Bus** | `rgba(251, 146, 60, 0.3)` | `#fb923c` 橙色 | 消息队列 |
| **External** | `rgba(30, 41, 59, 0.5)` | `#94a3b8` 板岩灰 | 外部系统 |

### 2.2 背景与网格

```svg
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.5"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#020617"/>
<rect width="100%" height="100%" fill="url(#grid)"/>
```

### 2.3 箭头系统

**箭头头部标记：**
```svg
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
</marker>
```

**箭头 Z 轴顺序：** 先绘制箭头（背景层），后绘制组件框（前景层）

**透明遮罩技巧：**
```svg
<!-- 遮罩层：不透明背景遮住箭头 -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="#0f172a"/>
<!-- 视觉层：半透明填充 -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="rgba(76,29,149,0.4)" stroke="#a78bfa" stroke-width="1.5"/>
```

### 2.4 特殊组件

**安全组：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="8" fill="none" stroke="#fb7185" stroke-width="1" stroke-dasharray="4,4"/>
```

**区域边界：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="12" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8,4"/>
```

**消息总线：**
```svg
<rect x="X" y="Y" width="120" height="20" rx="4" fill="rgba(251,146,60,0.3)" stroke="#fb923c" stroke-width="1"/>
<text x="CENTER_X" y="Y+14" fill="#fb923c" font-size="7" text-anchor="middle">Kafka / RabbitMQ</text>
```

---

## 三、布局规则

### 3.1 间距规范

| 规范 | 值 |
|------|-----|
| 组件高度（标准） | 60px |
| 组件高度（大型） | 80-120px |
| 最小垂直间距 | 40px |
| 总线宽度 | 120px |
| 总线高度 | 20px |
| 图例偏移 | 20px（位于所有边界外） |

### 3.2 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Title + pulsing dot + subtitle                   │
├─────────────────────────────────────────────────────────────┤
│  SVG 图表区                                                │
│  ├── 背景网格                                               │
│  ├── 连接箭头（底层）                                       │
│  ├── 组件框（前景层）                                       │
│  └── 图例（右下角，边界外）                                │
├─────────────────────────────────────────────────────────────┤
│  Summary Cards (3 列网格)                                  │
│  ├── Card 1: 关键组件                                      │
│  ├── Card 2: 数据流                                        │
│  └── Card 3: 安全考虑                                      │
├─────────────────────────────────────────────────────────────┤
│  Footer: 元数据                                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 图例放置规则

**图例必须位于所有边界框外部！**

```
❌ 错误：图例在 Cluster 边界内
Cluster: y=30, height=460 → ends at y=490
Legend: y=470 ← 重叠！

✅ 正确：图例在 Cluster 边界外
Cluster: y=30, height=460 → ends at y=490
Legend: y=510 ← 至少 20px 偏移
ViewBox 高度：至少 560（留出图例空间）
```

---

## 四、使用方式

### 4.1 安装

#### Claude.ai（推荐）
1. 下载 [`architecture-diagram.zip`](architecture-diagram.zip)
2. 进入 **Settings** → **Capabilities** → **Skills**
3. 点击 **+ Add** 并上传 zip 文件
4. 开启 Skill

#### Claude Code CLI
```bash
# 全局安装
unzip architecture-diagram.zip -d ~/.claude/skills/

# 项目本地
unzip architecture-diagram.zip -d ./.claude/skills/
```

### 4.2 使用示例

**Web 应用：**
```
Create an architecture diagram for a web application with:
- React frontend
- Node.js/Express API
- PostgreSQL database
- Redis cache
- JWT authentication
```

**AWS 无服务器：**
```
Create an architecture diagram showing:
- CloudFront CDN
- API Gateway
- Lambda functions (Node.js)
- DynamoDB
- S3 for static assets
- Cognito for auth
```

**微服务：**
```
Create an architecture diagram for a microservices system with:
- React web app and mobile clients
- Kong API Gateway
- User Service (Go), Order Service (Java), Product Service (Python)
- PostgreSQL, MongoDB, and Elasticsearch databases
- Kafka for event streaming
- Kubernetes orchestration
```

### 4.3 迭代更新

生成后可通过对话实时更新：

```
Please update XYZ to see your diagram update in real time.
```

---

## 五、组件模式

### 5.1 标准组件框

```svg
<rect x="X" y="Y" width="W" height="H" rx="6" fill="#0f172a"/>
<rect x="X" y="Y" width="W" height="H" rx="6" fill="FILL_COLOR" stroke="STROKE_COLOR" stroke-width="1.5"/>
<text x="CENTER_X" y="Y+20" fill="white" font-size="11" font-weight="600" text-anchor="middle">LABEL</text>
<text x="CENTER_X" y="Y+36" fill="#94a3b8" font-size="9" text-anchor="middle">sublabel</text>
```

### 5.2 信息卡片

```html
<div class="card">
  <div class="card-header">
    <div class="card-dot COLOR"></div>
    <h3>Title</h3>
  </div>
  <ul>
    <li>• Item one</li>
    <li>• Item two</li>
  </ul>
</div>
```

---

## 六、输出

### 6.1 输出规范

生成的 `.html` 文件必须包含：
- 嵌入 CSS（除 Google Fonts 外无外部样式表）
- 内联 SVG（无外部图片）
- 无需 JavaScript（纯 CSS 动画）

### 6.2 可直接打开

- 任何现代浏览器
- 无需服务器
- 无需构建步骤

---

## 七、与 baoyu-diagram 对比

| 维度 | **Architecture Diagram** | baoyu-diagram |
|------|--------------------------|---------------|
| **Stars** | 4,116 | 15,830（含在其他 Skill 中）|
| **主题** | 暗色专用 | 8 种类型 |
| **输出** | HTML 单文件 | SVG |
| **复杂度** | 较低 | 较高 |
| **适用** | 快速生成 | 专业复杂图表 |

---

## 八、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/Cocoon-AI/architecture-diagram-generator |
| Claude Skills | https://support.claude.com/.../using-skills-in-claude |
| 相关对比 | [FireworksTechGraph技术图生成完全指南.md](./FireworksTechGraph技术图生成完全指南.md) |
| 相关对比 | [ExcalidrawDiagramSkill完全指南.md](./ExcalidrawDiagramSkill完全指南.md) |

---

*文档版本: 2026-04-22*
