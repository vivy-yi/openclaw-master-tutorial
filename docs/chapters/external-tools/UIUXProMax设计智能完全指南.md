# UI UX Pro Max 完全指南

> AI 驱动的专业 UI/UX 设计智能工具 — 68,822 Stars

---

## 一、概述

### 1.1 什么是 UI UX Pro Max

| 项目 | 说明 |
|------|------|
| **定位** | AI 驱动的专业 UI/UX 设计智能工具 |
| **GitHub** | https://github.com/nextlevelbuilder/ui-ux-pro-max |
| **官网** | https://uupm.cc |
| **许可** | MIT |
| **语言** | Python + TypeScript |
| **stars** | 68,822+ |
| **创建时间** | 2025-11-30 |
| **版本** | v2.0（Design System Generator） |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│              UI UX Pro Max 核心特点                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 68,822 Stars（最火的 UI/UX Skill）                      │
│                                                              │
│  ✅ 161 个产品类型推理规则                                  │
│     └── 每个产品类型匹配最优 UI 风格                        │
│                                                              │
│  ✅ 67 种 UI 风格                                          │
│     └── Glassmorphism、Neumorphism、Brutalism 等           │
│                                                              │
│  ✅ 161 种配色方案                                         │
│     └── 与产品类型 1:1 对应                                │
│                                                              │
│  ✅ 57 种字体搭配                                          │
│     └── Google Fonts 精选组合                              │
│                                                              │
│  ✅ 25 种图表类型                                          │
│     └── Dashboard 推荐                                      │
│                                                              │
│  ✅ 15 种技术栈                                            │
│     └── React、Next.js、Vue、SwiftUI 等                   │
│                                                              │
│  ✅ 99 条 UX 指南                                          │
│     └── 最佳实践、反模式、无障碍规则                        │
│                                                              │
│  ✅ v2.0 Design System Generator                            │
│     └── 5 步智能生成完整设计系统                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 v2.0 新功能：Design System Generator

```
┌─────────────────────────────────────────────────────────────────┐
│                    5 步智能设计系统生成                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1️⃣ 用户请求                                                    │
│     "Build a landing page for my beauty spa"                    │
│                           ↓                                       │
│  2️⃣ 多域并行搜索（5 个并行搜索）                               │
│     • 产品类型匹配（161 类别）                                   │
│     • 风格推荐（67 种风格）                                      │
│     • 配色选择（161 调色板）                                     │
│     • 落地页模式（24 种模式）                                     │
│     • 字体搭配（57 种组合）                                      │
│                           ↓                                       │
│  3️⃣ 推理引擎                                                   │
│     • 产品 → UI 类别规则匹配                                      │
│     • 风格优先级（BM25 排名）                                    │
│     • 行业反模式过滤                                             │
│     • 决策规则处理（JSON 条件）                                   │
│                           ↓                                       │
│  4️⃣ 完整设计系统输出                                            │
│     Pattern + Style + Colors + Typography + Effects              │
│     + Anti-patterns + Pre-delivery Checklist                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 设计系统输出示例

```
+----------------------------------------------------------------------------------------+
|  TARGET: Serenity Spa - RECOMMENDED DESIGN SYSTEM                                      |
+----------------------------------------------------------------------------------------+
|                                                                                        |
|  PATTERN: Hero-Centric + Social Proof                                                  |
|     Conversion: Emotion-driven with trust elements                                     |
|     CTA: Above fold, repeated after testimonials                                       |
|     Sections: Hero → Services → Testimonials → Booking → Contact                      |
|                                                                                        |
|  STYLE: Soft UI Evolution                                                              |
|     Keywords: Soft shadows, subtle depth, calming, premium feel, organic shapes        |
|     Best For: Wellness, beauty, lifestyle brands, premium services                     |
|     Performance: Excellent | Accessibility: WCAG AA                                    |
|                                                                                        |
|  COLORS:                                                                               |
|     Primary:    #E8B4B8 (Soft Pink)                                                    |
|     Secondary:  #A8D5BA (Sage Green)                                                   |
|     CTA:        #D4AF37 (Gold)                                                         |
|     Background: #FFF5F5 (Warm White)                                                   |
|     Text:       #2D3436 (Charcoal)                                                     |
|                                                                                        |
|  TYPOGRAPHY: Cormorant Garamond / Montserrat                                            |
|     Google Fonts: https://fonts.google.com/...                                         |
|                                                                                        |
|  KEY EFFECTS: Soft shadows + Smooth transitions (200-300ms) + Gentle hover states       |
|                                                                                        |
|  AVOID (Anti-patterns):                                                                |
|     Bright neon colors + Harsh animations + Dark mode + AI purple/pink gradients        |
|                                                                                        |
|  PRE-DELIVERY CHECKLIST:                                                               |
|     [ ] No emojis as icons (use SVG: Heroicons/Lucide)                                 |
|     [ ] cursor-pointer on all clickable elements                                       |
|     [ ] Hover states with smooth transitions (150-300ms)                               |
|     [ ] Light mode: text contrast 4.5:1 minimum                                        |
|     [ ] Focus states visible for keyboard nav                                          |
|     [ ] prefers-reduced-motion respected                                               |
|                                                                                        |
+----------------------------------------------------------------------------------------+
```

---

## 二、67 种 UI 风格详解

### 2.1 风格分类总览

| 类别 | 数量 | 说明 |
|------|------|------|
| **General Styles** | 49 种 | 通用 UI 风格 |
| **Landing Page Styles** | 8 种 | 落地页专用 |
| **BI/Analytics Dashboard** | 10 种 | 数据仪表板 |

### 2.2 General Styles（49 种）

| # | 风格 | 描述 | 最佳场景 | 复杂度 |
|---|------|------|---------|--------|
| 1 | **Minimalism & Swiss Style** | 极简、网格、功能性 | 企业应用、文档 | 低 |
| 2 | **Neumorphism** | 软 UI、浮雕、柔和阴影 | 健康/冥想应用 | 中 |
| 3 | **Glassmorphism** | 毛玻璃、模糊背景、层次感 | 现代 SaaS、金融仪表板 | 中 |
| 4 | **Brutalism** | 原始、高对比、无修饰 | 设计作品集、艺术项目 | 低 |
| 5 | **3D & Hyperrealism** | 深度、纹理、沉浸式 | 游戏、产品展示 | 高 |
| 6 | **Vibrant & Block-based** | 大胆、活力、块布局 | 创业公司、游戏 | 中 |
| 7 | **Dark Mode (OLED)** | 深色主题、省电 | 夜间模式、编程平台 | 低 |
| 8 | **Accessible & Ethical** | 高对比、无障碍、键盘导航 | 政府、医疗、教育 | 低 |
| 9 | **Claymorphism** | 软 3D、黏土感、厚边框 | 教育应用、儿童应用 | 中 |
| 10 | **Aurora UI** | 极光渐变、流动 | 现代 SaaS、品牌 | 中 |
| 11 | **Retro-Futurism** | 80 年代、霓虹、CRT | 游戏、娱乐 | 中 |
| 12 | **Flat Design** | 2D、扁平、图标驱动 | Web 应用、Startup | 低 |
| 13 | **Skeuomorphism** | 拟物、纹理、真实感 | legacy 应用、游戏 | 高 |
| 14 | **Liquid Glass** | 流动、变形、虹彩 | 高级 SaaS、奢侈品 | 高 |
| 15 | **Motion-Driven** | 动画、微交互、滚动效果 | 作品集、故事平台 | 高 |
| 16 | **Micro-interactions** | 微动画、触觉反馈 | 移动应用、触摸屏 | 中 |
| 17 | **Inclusive Design** | 万能访问、色盲友好 | 公共服务、医疗 | 低 |
| 18 | **Zero Interface** | 语音优先、手势、AI 预测 | 语音助手、AI 平台 | 低 |
| 19 | **Soft UI Evolution** | 进化的软 UI、改善对比度 | 现代企业应用 | 中 |
| 20 | **Neubrutalism** | 粗边框、黑线、偏移阴影 | Gen Z 品牌、Startup | 低 |
| 21 | **Bento Box Grid** | 模块卡片、不对称网格 | 仪表板、产品页 | 低 |
| 22 | **Y2K Aesthetic** | 霓虹、铬金属、泡泡 | 时尚、音乐 Gen Z | 中 |
| 23 | **Cyberpunk UI** | 霓虹、终端、HUD | 游戏、科技产品 | 中 |
| 24 | **Organic Biophilic** | 自然、有机形状、绿色 | 健康、可持续品牌 | 低 |
| 25 | **AI-Native UI** | 对话式、聊天、AI 交互 | AI 产品、Copilot | 低 |
| 26 | **Memphis Design** | 几何、孟菲斯、80s 后现代 | 创意机构、音乐 | 中 |
| 27 | **Vaporwave** | 日落渐变、 glitch、复古 | 音乐平台、游戏 | 中 |
| 28 | **Dimensional Layering** | 深度、重叠、Z 轴 | 仪表板、卡片布局 | 中 |
| 29 | **Exaggerated Minimalism** | 超大字体、负空间 | 时尚、建筑、Portfolio | 低 |
| 30 | **Kinetic Typography** | 动态文字、动画排版 | Hero 区域、营销 | 高 |
| 31 | **Parallax Storytelling** | 视差滚动、叙事 | 品牌故事、产品发布 | 高 |
| 32 | **Swiss Modernism 2.0** | 网格、Helvetica、数学 | 企业、架构、编辑 | 低 |
| 33 | **HUD / Sci-Fi FUI** | 科幻 HUD、线框 | 科幻游戏、空间科技 | 高 |
| 34 | **Pixel Art** | 像素、8-bit、复古游戏 | 独立游戏、复古工具 | 中 |
| 35 | **Bento Grids** | Apple 风格、模块网格 | 产品功能、个人站点 | 低 |
| 36 | **Spatial UI (VisionOS)** | 空间计算、玻璃深度 | Apple Vision Pro | 高 |
| 37 | **E-Ink / Paper** | 纸质感、高对比、阅读 | 阅读应用、数字报纸 | 低 |
| 38 | **Gen Z Chaos / Maximalism** | 混乱、贴纸、混搭 | Gen Z 生活方式 | 高 |
| 39 | **Biomimetic / Organic 2.0** | 细胞状、流动、呼吸 | 可持续科技、生物 | 高 |
| 40 | **Anti-Polish / Raw Aesthetic** | 手绘、粗糙、真实 | 创意作品集、独立品牌 | 低 |

### 2.3 Landing Page Styles（8 种）

| # | 风格 | 描述 | 最佳场景 |
|---|------|------|---------|
| 1 | **Hero-Centric Design** | 大 Hero、强烈视觉 | 强视觉产品 |
| 2 | **Conversion-Optimized** | 表单聚焦、紧迫感 | 潜在客户生成 |
| 3 | **Feature-Rich Showcase** | 多功能展示、网格 | SaaS、复杂产品 |
| 4 | **Minimal & Direct** | 极简、单列 | 简单产品 |
| 5 | **Social Proof-Focused** | 证言、Logo、案例 | 服务、B2C |
| 6 | **Interactive Product Demo** | 互动演示、视频 | 软件、工具 |
| 7 | **Trust & Authority** | 证书、资质、案例 | B2B、企业 |
| 8 | **Storytelling-Driven** | 叙事流、情感 | 品牌、机构 |

### 2.4 BI/Analytics Dashboard Styles（10 种）

| # | 风格 | 描述 | 最佳场景 |
|---|------|------|---------|
| 1 | **Data-Dense Dashboard** | 多图表、高密度 | 复杂数据分析 |
| 2 | **Heat Map Style** | 热力图、颜色编码 | 地理/行为数据 |
| 3 | **Executive Dashboard** | 高层 KPI、摘要 | C-suite 决策 |
| 4 | **Real-Time Monitoring** | 实时更新、状态指示 | 运维、DevOps |
| 5 | **Drill-Down Analytics** | 层级探索、钻取 | 详细分析 |
| 6 | **Comparative Analysis** | 对比分析、A/B 测试 | 竞争分析 |
| 7 | **Predictive Analytics** | 预测线、置信区间 | 预测、ML |
| 8 | **User Behavior Analytics** | 漏斗、用户流 | UX 研究 |
| 9 | **Financial Dashboard** | 财务指标、盈亏 | 财务、会计 |
| 10 | **Sales Intelligence** | 销售管道、排行榜 | CRM、销售 |

---

## 三、161 个产品类型推理规则

### 3.1 分类总览

| 类别 | 示例 |
|------|------|
| **Tech & SaaS** | SaaS、Micro SaaS、B2B Service、Developer Tool、AI/Chatbot Platform |
| **Finance** | Fintech/Crypto、Banking、Insurance、Personal Finance Tracker |
| **Healthcare** | Medical Clinic、Pharmacy、Dental、Veterinary、Mental Health |
| **E-commerce** | General、Luxury、Marketplace、Subscription Box、Food Delivery |
| **Services** | Beauty/Spa、Restaurant、Hotel、Legal、Home Services |
| **Creative** | Portfolio、Agency、Photography、Gaming、Music Streaming |
| **Lifestyle** | Habit Tracker、Recipe & Cooking、Meditation、Weather |
| **Emerging Tech** | Web3/NFT、Spatial Computing、Quantum Computing |

### 3.2 每个规则的构成

每个推理规则包含：
- **Recommended Pattern** — 落地页结构
- **Style Priority** — 最佳匹配风格
- **Color Mood** — 行业适配配色
- **Typography Mood** — 字体个性
- **Key Effects** — 动画和交互
- **Anti-Patterns** — 禁忌（如金融类不能用 AI 紫/粉渐变）

### 3.3 产品类型 → 风格映射（部分）

| 产品类型 | 推荐风格 | 配色重点 |
|---------|---------|---------|
| SaaS (General) | Glassmorphism + Flat Design | Trust blue + accent |
| Micro SaaS | Flat Design + Vibrant | Vibrant primary + whitespace |
| E-commerce | Vibrant & Block-based | Brand primary + success green |
| Fintech/Crypto | Glassmorphism + Dark Mode | Dark + trust + vibrant accents |
| Healthcare App | Neumorphism + Accessible | Calm blue + health green |
| AI/Chatbot Platform | AI-Native UI + Minimalism | Neutral + AI Purple (#6366F1) |
| Gaming | 3D & Hyperrealism + Retro-Futurism | Vibrant + neon + immersive |
| Beauty/Spa | Soft UI Evolution | Soft pastels + calming |

---

## 四、配色系统

### 4.1 161 种配色方案

每个配色方案与产品类型 1:1 对应，包含：
- Primary Colors
- Secondary Colors
- Effects & Animation

### 4.2 关键颜色代码

| 用途 | 颜色 |
|------|------|
| AI Purple | `#6366F1` |
| Trust Blue | `#1E40AF` |
| Success Green | `#22C55E` |
| Warning Amber | `#F59E0B` |
| Error Red | `#EF4444` |
| Gold Accent | `#FFD700` |

---

## 五、技术栈支持

### 5.1 支持的 15 种技术栈

| 类别 | 技术栈 |
|------|--------|
| **Web (HTML)** | HTML + Tailwind（默认） |
| **React 生态** | React、Next.js、shadcn/ui |
| **Vue 生态** | Vue、Nuxt.js、Nuxt UI |
| **Angular** | Angular |
| **PHP** | Laravel（Blade、Livewire、Inertia.js） |
| **其他 Web** | Svelte、Astro |
| **iOS** | SwiftUI |
| **Android** | Jetpack Compose |
| **跨平台** | React Native、Flutter |

### 5.2 栈特定指南

每个技术栈都有专门的指南，提供：
- 框架兼容性评分
- 实现建议
- Design System Variables

---

## 六、安装与使用

### 6.1 安装方式

#### Claude Marketplace
```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

#### CLI（推荐）
```bash
# 安装 CLI
npm install -g uipro-cli

# 为 AI 助手安装
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai copilot     # GitHub Copilot

# 全局安装
uipro init --ai claude --global
```

### 6.2 使用方式

#### Skill 模式（自动激活）
```
Build a landing page for my SaaS product
Create a dashboard for healthcare analytics
Design a portfolio website with dark mode
```

#### 工作流模式（斜杠命令）
```
/ui-ux-pro-max Build a landing page for my SaaS product
```

### 6.3 设计系统命令（高级）

```bash
# 生成设计系统（ASCII 输出）
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# Markdown 输出
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown

# 域搜索
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart
```

---

## 七、搜索命令参考

### 7.1 域搜索

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain> [-n <max_results>]
```

| 域 | 说明 |
|---|------|
| `product` | 产品类型推荐 |
| `style` | UI 风格 + AI prompts |
| `typography` | 字体搭配 + Google Fonts |
| `color` | 按产品类型的配色 |
| `landing` | 页面结构和 CTA |
| `chart` | 图表类型和库推荐 |
| `ux` | 最佳实践和反模式 |

### 7.2 栈搜索

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<query>" --stack <stack>
```

---

## 八、与 baoyu-skills 对比

| 维度 | **UI UX Pro Max** | baoyu-skills |
|------|-------------------|--------------|
| **Stars** | 68,822 | 15,784 |
| **定位** | UI/UX 设计智能 | 内容创作 + 可视化 |
| **核心功能** | Design System 生成 | 信息图、封面、漫画 |
| **风格数量** | 67 种 UI 风格 | 17 种视觉风格 |
| **行业规则** | 161 个产品类型 | 无特定行业 |
| **输出** | 设计系统建议 | 图片 |
| **技术栈** | 15 种 | 通用 |
| **平台发布** | 无 | X/微信/微博/小红书 |
| **搜索方式** | BM25 排名引擎 | 规则匹配 |

---

## 九、选择指南

| 需求 | 推荐工具 |
|------|---------|
| **生成完整设计系统** | **UI UX Pro Max** |
| **专业 UI 风格建议** | **UI UX Pro Max** |
| **行业特定设计规则** | **UI UX Pro Max** |
| **生成信息图** | baoyu-skills |
| **生成封面图** | baoyu-skills |
| **生成幻灯片** | baoyu-skills |
| **生成漫画** | baoyu-skills |
| **技术图表（SVG）** | baoyu-diagram |
| **落地页设计建议** | **UI UX Pro Max** |
| **社交媒体内容** | baoyu-skills |

---

## 十、架构解析

```
src/ui-ux-pro-max/                # 真理之源
├── data/                         # CSV 数据库
│   ├── products.csv (161 产品)   ← 行业推理规则
│   ├── styles.csv (67 风格)      ← 风格定义
│   ├── colors.csv (161 配色)    ← 配色方案
│   ├── typography.csv (57 字体)  ← 字体搭配
│   ├── charts.csv (25 图表)      ← Dashboard 推荐
│   ├── ux-guidelines.csv (99 条) ← UX 最佳实践
│   └── stacks/                   ← 栈特定指南
├── scripts/
│   ├── search.py                 # CLI 入口
│   ├── core.py                   # BM25 + regex 混合搜索引擎
│   └── design_system.py          # 设计系统生成器
└── templates/
    ├── base/                     # 基础模板
    └── platforms/                # 平台配置
```

### 搜索引擎：BM25 + Regex

- **BM25**：相关性排名
- **Regex**：精确匹配
- **Domain 自动检测**：无 `--domain` 时自动识别

---

## 十一、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/nextlevelbuilder/ui-ux-pro-max |
| 官网 | https://uupm.cc |
| npm CLI | https://www.npmjs.com/package/uipro-cli |
| 相关对比 | [BaoyuSkills全栈内容工具包.md](./BaoyuSkills全栈内容工具包.md) |

---

*文档版本: 2026-04-22*
