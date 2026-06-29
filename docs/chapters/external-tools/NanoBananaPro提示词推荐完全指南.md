# Nano Banana Pro Prompts Recommender 完全指南

> 10,000+ 精选提示词库 — AI 图像生成提示词智能推荐

---

## 一、概述

### 1.1 什么是 Nano Banana Pro Prompts

| 项目 | 说明 |
|------|------|
| **定位** | AI 图像生成提示词智能推荐工具 |
| **GitHub** | https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill |
| **提示词库** | 12,566+ 精选提示词 |
| **语言** | TypeScript |
| **stars** | 1,478 |
| **创建时间** | 2026-01-21 |
| **更新频率** | 每日两次（00:00 和 12:00 UTC） |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│         Nano Banana Pro Prompts 核心特点                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 12,566+ 精选提示词                                      │
│     └── 全部带样图，可预览效果再使用                        │
│                                                              │
│  ✅ 11 个分类                                               │
│     └── 头像、产品营销、社媒、缩略图等                      │
│                                                              │
│  ✅ 智能语义搜索                                            │
│     └── 描述需求 → 自动匹配最佳提示词                       │
│                                                              │
│  ✅ 内容 remix 模式                                         │
│     └── 粘贴文章/视频脚本 → 生成定制化提示词                │
│                                                              │
│  ✅ 多语言支持                                              │
│     └── 响应用户语言，输出英文提示词                        │
│                                                              │
│  ✅ Token 优化                                              │
│     └── Grep 风格搜索，不加载完整文件                       │
│                                                              │
│  ✅ 多模型兼容                                              │
│     └── Nano Banana Pro / GPT Image / Midjourney / DALL-E   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 支持的图像生成模型

| 模型 | 兼容度 |
|------|--------|
| **Nano Banana Pro** (Gemini) | ✅ 优化 |
| **Nano Banana 2** | ✅ 兼容 |
| **Seedream 5.0** | ✅ 兼容 |
| **GPT Image 1.5** | ✅ 兼容 |
| **Midjourney** | ✅ 兼容 |
| **DALL-E 3** | ✅ 兼容 |
| **Flux** | ✅ 兼容 |
| **Stable Diffusion** | ✅ 兼容 |

---

## 二、提示词分类

### 2.1 分类总览

| 分类 | 数量 | 说明 |
|------|------|------|
| **Social Media Post** | 7,808 | 社媒内容、病毒内容 |
| **Product Marketing** | 4,613 | 广告、活动、促销素材 |
| **Profile / Avatar** | 1,314 | 头像、人物肖像、角色 |
| **Others** | 1,037 | 未分类创意提示词 |
| **Poster / Flyer** | 605 | 活动、公告、横幅 |
| **Infographic / Edu Visual** | 519 | 数据可视化、教育内容 |
| **Game Asset** | 529 | 精灵、角色、游戏资源 |
| **E-commerce Main Image** | 505 | 产品照片、列表图 |
| **Comic / Storyboard** | 372 | 漫画、连环画 |
| **YouTube Thumbnail** | 202 | 视频封面 |
| **App / Web Design** | 192 | UI 模型、界面设计 |

### 2.2 分类详解

#### Social Media Post（7,808 个）
**场景**：Instagram、Twitter/X、Facebook、病毒内容
**提示词类型**：
- 病毒式图文
- 节日主题
- 品牌内容
- 互动帖子

#### Product Marketing（4,613 个）
**场景**：广告、活动、促销素材
**提示词类型**：
- 产品展示
- 广告横幅
- 品牌视觉
- 促销图形

#### Profile / Avatar（1,314 个）
**场景**：头像、个人照片、角色肖像
**提示词类型**：
- 真实照片风格头像
- 动漫头像
- 像素风格头像
- 职业肖像

#### Infographic / Edu Visual（519 个）
**场景**：数据可视化、教育内容
**提示词类型**：
- 信息图
- 教育插图
- 图表可视化
- 知识图解

#### YouTube Thumbnail（202 个）
**场景**：视频封面、点击诱饵
**提示词类型**：
- 高点击率封面
- 人物 + 文字组合
- 产品评测封面

---

## 三、使用方式

### 3.1 安装

```bash
# OpenClaw（推荐）
clawhub install nano-banana-pro-prompts-recommend

# Claude Code
npx skills i YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill

# 通用安装
npx skills i YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill
```

### 3.2 两种使用模式

#### 模式 1：直接搜索

```
"Find me a cyberpunk-style avatar prompt"
"I need prompts for travel blog article covers"
"Looking for a product photo on white background"
"Help me find a YouTube thumbnail for a tech review video"
```

**返回**：
- 最多 3 个推荐
- 翻译后的标题和描述（用户语言）
- 英文原文提示词（可复制）
- 样图预览
- 是否需要参考图

#### 模式 2：内容 remix

```
"Here's my article about startup failure — help me create a cover image:
[paste article text]"

"I need a thumbnail for this video script: [paste script]"

"Generate an illustration for this podcast episode about AI: [paste notes]"
```

**流程**：
1. 推荐匹配的样式模板
2. 收集个性化信息（性别、情绪、场景）
3. 生成定制化提示词

---

## 四、技术架构

### 4.1 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│  用户描述需求                                                   │
│  "cyberpunk avatar"                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Skill 识别分类                                                 │
│  从 manifest.json 获取分类 → 匹配 "profile-avatar"              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Grep 风格搜索                                                  │
│  grep -i "cyberpunk" references/profile-avatar.json             │
│  （不加载完整文件，Token 优化）                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  返回 Top 3 推荐                                                │
│  • 标题 + 描述（用户语言）                                     │
│  • 英文提示词原文                                               │
│  • sourceMedia[0] 样图                                         │
│  • 是否需要参考图                                               │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 提示词结构

```json
{
  "id": 553,
  "title": "Detailed mirror-selfie otaku room scene",
  "description": "A very detailed Nano Banana prompt describing...",
  "content": "### Scene\nMirror selfie in an otaku-style...",
  "sourceMedia": [
    "https://cms-assets.youmind.com/media/xxx.jpg"
  ],
  "needReferenceImages": false
}
```

**字段说明**：
| 字段 | 说明 |
|------|------|
| `id` | 唯一标识 |
| `title` | 提示词标题（英文） |
| `description` | 描述（英文） |
| `content` | 完整提示词内容（含场景、主体、环境、灯光、相机参数） |
| `sourceMedia` | 样图 URL 数组 |
| `needReferenceImages` | 是否需要参考图 |

### 4.3 Token 优化策略

**关键原则**：永远不加载完整分类文件

```bash
# ✅ 正确：grep 搜索
grep -i "keyword" references/profile-avatar.json

# ❌ 错误：加载整个文件
cat references/profile-avatar.json  # 浪费 Token
```

---

## 五、提示词格式解析

### 5.1 典型提示词结构

```
### Scene
场景描述

### Subject
* Gender expression: 性别
* Age: 年龄
* Ethnicity: 种族
* Body type: 体型
* Skin tone: 肤色
* Hairstyle: 发型
* Pose: 姿势
* Clothing: 服装
* Accessory: 配饰

### Environment
* Description: 环境描述
* Furnishings: 陈设

### Lighting
* Light source: 光源
* Light quality: 光质
* White balance: 白平衡

### Camera
* Mode: 相机模式
* Focal length: 焦距
* Aperture: 光圈
* Composition: 构图

### Negative prompts
* 负面提示词
```

### 5.2 可自定义参数

部分提示词支持参数替换：

```json
{
  "content": "A hyper-realistic portrait of a {argument name=\"subject\" default=\"handsome man\"}..."
}
```

**参数格式**：`{argument name="参数名" default="默认值"}`

---

## 六、与 baoyu-skills 对比

| 维度 | **Nano Banana Pro** | baoyu-skills |
|------|---------------------|-------------- |
| **定位** | 提示词库 + 推荐 | 生成工具包 |
| **输出** | 提示词（用户自己生成图片） | 直接生成图片 |
| **模型** | 通用（多模型兼容） | 指定后端 |
| **样图** | ✅ 12,566 张样图预览 | ❌ 无样图 |
| **Remix** | ✅ 内容定制提示词 | ❌ 无此功能 |
| **分类** | 11 个垂直分类 | 多维度组合 |
| **更新** | 每日两次 | 静态 |

---

## 七、选择指南

| 需求 | 推荐工具 |
|------|---------|
| **需要样图参考** | **Nano Banana Pro** |
| **生成定制提示词** | **Nano Banana Pro** |
| **直接生成图片** | baoyu-skills |
| **技术图表（SVG）** | baoyu-diagram |
| **落地页设计系统** | UI UX Pro Max |
| **信息图** | AntV Infographic / baoyu-skills |
| **社媒内容 + 提示词** | **Nano Banana Pro** |

---

## 八、工作流组合

```
文章内容 / 视频脚本
    ↓
Nano Banana Pro → 推荐最佳提示词 + 样图预览
    ↓
用户选择提示词 → 在 Nano Banana Pro / GPT Image 生成图片
    ↓
baoyu-skills → 可进一步生成信息图、封面、幻灯片
    ↓
baoyu-post-to-x / baoyu-post-to-wechat → 发布到社媒平台
```

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill |
| 提示词库 | https://youmind.com/nano-banana-pro-prompts |
| Prompt Gallery | https://youmind.com/nano-banana-pro-prompts |
| ClawHub | https://clawhub.com/skill/nano-banana-pro-prompts-recommend |
| 相关项目 | [awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) |
| 相关对比 | [BaoyuSkills全栈内容工具包.md](./BaoyuSkills全栈内容工具包.md) |

---

*文档版本: 2026-04-22*
