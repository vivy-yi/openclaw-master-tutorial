# Screenshot-to-Code 完全指南

> 设计稿/截图转代码 — 72,300 Stars

---

## 一、概述

### 1.1 什么是 Screenshot-to-Code

| 项目 | 说明 |
|------|------|
| **定位** | 设计稿/截图转前端代码 |
| **GitHub** | https://github.com/abi/screenshot-to-code |
| **语言** | TypeScript + Python |
| **stars** | 72,300 |
| **创建时间** | 2023 |
| **版本** | 支持 Gemini 3、Claude Opus 4.5 |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│                   Screenshot-to-Code 核心特点                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 截图 → 代码                                            │
│     └── 设计稿/Figma → HTML/Tailwind/React/Vue             │
│                                                              │
│  ✅ 支持多种技术栈                                          │
│     └── HTML+Tailwind、React+Tailwind、Vue+Tailwind        │
│                                                              │
│  ✅ 多 AI 模型支持                                         │
│     └── Gemini 3、Claude Opus 4.5、GPT-5 系列              │
│                                                              │
│  ✅ 开源免费                                                │
│     └── 自托管，无使用限制                                  │
│                                                              │
│  ✅ 视频转原型（实验性）                                    │
│     └── 屏幕录制 → 可交互原型                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 支持的技术栈

| 栈 | 说明 |
|---|------|
| HTML + Tailwind | 纯 HTML + Tailwind CSS |
| HTML + CSS | 纯 HTML + 手写 CSS |
| React + Tailwind | React + Tailwind |
| Vue + Tailwind | Vue 3 + Tailwind |
| Bootstrap | Bootstrap 5 |
| Ionic + Tailwind | Ionic + Tailwind |
| SVG | 纯 SVG 图形 |

---

## 二、工作原理

### 2.1 架构

```
┌─────────────────┐     ┌─────────────────┐
│   React/Vite    │ ←→ │    FastAPI      │
│   (Frontend)    │     │   (Backend)     │
│   Port: 5173    │     │   Port: 7001    │
└────────┬────────┘     └────────┬────────┘
         │                      │
         │    WebSocket         │
         └──────────────────────┘
                  ↓
         ┌─────────────────┐
         │   AI Models     │
         │ Gemini/Claude/  │
         │ GPT             │
         └─────────────────┘
```

### 2.2 流程

```
上传截图
    ↓
Frontend → Backend (WebSocket)
    ↓
AI 模型分析截图
    ↓
生成代码（流式返回）
    ↓
实时预览 + 代码编辑
```

---

## 三、安装与配置

### 3.1 环境要求

- Node.js 18+
- Python 3.8+
- Poetry（Python 包管理）
- API 密钥（OpenAI / Anthropic / Google）

### 3.2 安装步骤

#### 后端安装
```bash
cd backend

# 配置 API 密钥
echo "OPENAI_API_KEY=sk-your-key" > .env
echo "ANTHROPIC_API_KEY=your-key" >> .env
echo "GEMINI_API_KEY=your-key" >> .env

# 安装依赖
poetry install
poetry env activate

# 启动
poetry run uvicorn main:app --reload --port 7001
```

#### 前端安装
```bash
cd frontend

yarn
yarn dev
```

### 3.3 Docker 安装（推荐）

```bash
cd screenshot-to-code

echo "OPENAI_API_KEY=sk-your-key" > .env
echo "ANTHROPIC_API_KEY=your-key" >> .env
echo "GEMINI_API_KEY=your-key" >> .env

docker-compose up -d --build
```

访问 http://localhost:5173

---

## 四、使用方式

### 4.1 基本使用

1. 打开 http://localhost:5173
2. 上传截图或粘贴图片 URL
3. 选择目标技术栈
4. 点击生成
5. 预览 + 编辑代码

### 4.2 支持的图片输入

| 输入方式 | 说明 |
|---------|------|
| 上传截图 | 直接拖拽或选择文件 |
| 粘贴 URL | 输入图片 URL |
| 剪贴板 | Ctrl+V 粘贴 |
| Figma | 导出设计稿截图 |

### 4.3 代码编辑

- 实时预览
- 代码编辑
- 一键复制
- 导出文件

---

## 五、支持的 AI 模型

### 5.1 推荐模型

| 模型 | 提供商 | 质量 | 速度 | 成本 |
|------|--------|------|------|------|
| **Gemini 3 Pro** | Google | ⭐⭐⭐⭐⭐ | 快 | 低 |
| **Gemini 3 Flash** | Google | ⭐⭐⭐⭐ | 很快 | 很低 |
| **Claude Opus 4.5** | Anthropic | ⭐⭐⭐⭐⭐ | 中 | 高 |

### 5.2 其他支持

| 模型 | 提供商 |
|------|--------|
| GPT-5.3 | OpenAI |
| GPT-5.2 | OpenAI |
| GPT-4.1 | OpenAI |
| DALL-E 3 | OpenAI（图像生成） |
| Flux Schnell | Replicate（图像生成） |

---

## 六、与设计工具对比

| 维度 | **Screenshot-to-Code** | Figma AI | imgcook |
|------|------------------------|----------|---------|
| **Stars** | ⭐72.3k | N/A | N/A |
| **输入** | 截图/设计稿 | Figma 文件 | 设计稿截图 |
| **输出** | 前端代码 | 设计建议 | 代码 |
| **成本** | 免费自托管 | 订阅制 | 免费 |
| **控制** | 完全可控 | 受限 | 受限 |

---

## 七、使用场景

| 场景 | 说明 |
|------|------|
| **快速原型** | 设计稿 → 可运行原型 |
| **前端开发** | 参考设计稿快速生成代码 |
| **设计评审** | 对比设计稿与实现 |
| **学习参考** | 学习他人设计实现方式 |

---

## 八、实验性功能

### 8.1 视频转原型

将网站/应用的屏幕录制转换为可交互原型：

```
录制屏幕 → 上传 → AI 分析 → 可交互原型
```

### 8.2 使用方法

1. 录制网站操作
2. 上传到工具
3. 选择目标页面
4. 生成可交互原型

---

## 九、Troubleshooting

### 9.1 常见问题

| 问题 | 解决方案 |
|------|---------|
| 后端报错 | 检查 .env 中的 API 密钥 |
| UTF-8 错误 | Windows 上用 Notepad++ 打开 .env，编码设为 UTF-8 |
| 网络问题 | 配置 VPN 或 OpenAI 代理 |

### 9.2 API 代理配置

```bash
# 在 .env 中设置
OPENAI_BASE_URL=https://your-proxy.com/v1
```

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/abi/screenshot-to-code |
| 托管版 | https://screenshottocode.com |
| Claude 指南 | https://github.com/abi/screenshot-to-code/wiki |

---

*文档版本: 2026-04-22*
