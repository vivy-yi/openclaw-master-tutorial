# OpenClaw Dashboard 调研报告与对比分析

> 本章对 GitHub 上现有的 OpenClaw Dashboard 项目进行深入调研，并与自建 Dashboard 进行功能与设计对比

## 目录

1. [调研概述](#1-调研概述)
2. [三大 Dashboard 项目详解](#2-三大-dashboard-项目详解)
3. [功能对比分析](#3-功能对比分析)
4. [技术实现对比](#4-技术实现对比)
5. [设计模式分析](#5-设计模式分析)
6. [优缺点总结](#6-优缺点总结)
7. [对自建 Dashboard 的改进建议](#7-对自建-dashboard-的改进建议)

---

## 1. 调研概述

### 1.1 搜索结果概览

| 项目 | Stars | Fork | 技术栈 | 定位 |
|------|-------|------|--------|------|
| **openclaw-mission-control** | 3,200 | 682 | Next.js + TypeScript | 企业级运营平台 |
| **openclaw-control-center** | 2,833 | 414 | Node.js + TypeScript | 本地控制中心 |
| **openclaw-nerve** | 515 | 67 | Node.js + TailwindCSS | 实时驾驶舱 |

---

## 2. 三大 Dashboard 项目详解

### 2.1 openclaw-mission-control

**GitHub**: https://github.com/abhi1693/openclaw-mission-control

#### 核心定位
> "AI Agent Orchestration Dashboard - Manage AI agents, assign tasks, and coordinate multi-agent collaboration via OpenClaw Gateway"

**面向对象**: 企业团队，需要多租户、审批流程、API 自动化

#### 功能模块

| 模块 | 功能描述 |
|------|----------|
| **Organization** | 组织管理，多租户支持 |
| **Board Groups** | 看板组管理 |
| **Boards** | 任务看板 |
| **Tasks** | 任务管理 |
| **Activity Feed** | 活动流 |
| **Agents** | Agent 生命周期管理 |
| **Global Approvals** | 全局审批 |
| **Skill Packs Sync** | 技能包同步 |
| **Settings** | 配置管理 |

#### 技术栈

```json
{
  "framework": "Next.js",
  "ui": ["Radix UI", "Recharts"],
  "auth": "Clerk",
  "query": "TanStack Query",
  "language": "TypeScript"
}
```

#### 特色功能
- ✅ 企业级多组织架构
- ✅ 审批驱动治理
- ✅ API-first 设计
- ✅ 完整 CI/CD 测试
- ✅ Docker 部署支持

---

### 2.2 openclaw-control-center

**GitHub**: https://github.com/TianyiDataScience/openclaw-control-center

#### 核心定位
> "Turn OpenClaw from a black box into a local control center you can see, trust, and control"

**面向对象**: 非技术用户，需要可观测性和确定性

#### 功能模块

| 模块 | 功能描述 |
|------|----------|
| **Overview** | 健康状态、当前决策、待处理事项 |
| **Usage** | 使用量、费用、订阅窗口、配额消耗 |
| **Staff** | 当前工作人员、活跃 vs 待命 |
| **Collaboration** | 父子会话、中继、跨会话通信 |
| **Tasks** | 任务看板、审批链、执行证据 |
| **Documents** | 源文档工作台 |
| **Memory** | 记忆文件工作台 |
| **Settings** | 安全摘要、连接健康、更新状态 |

#### 技术栈

```json
{
  "backend": "Node.js (Hono)",
  "language": "TypeScript",
  "type": "commonjs"
}
```

#### 特色功能

| 功能 | 说明 |
|------|------|
| **Safety-first** | 默认只读、默认 token 认证、默认禁用变更 |
| **Usage Trends** | 7天/30天趋势图 |
| **Context Pressure** | 上下文压力监控 |
| **Memory Status** | 每个 Agent 的记忆健康状态 |
| **Collaboration Page** | 跨会话通信可视化 |
| **Security Risk Summary** | 安全风险摘要 |

---

### 2.3 openclaw-nerve

**GitHub**: https://github.com/daggerhashimoto/openclaw-nerve

#### 核心定位
> "The cockpit OpenClaw deserves" - 实时驾驶舱

**面向对象**: 需要深度操作控制的用户

#### 功能模块

| 模块 | 功能描述 |
|------|----------|
| **Fleet Control** | 多 Agent 舰队控制 |
| **Voice** | 语音输入/输出、Whisper 转录、TTS |
| **Workspace** | 每个 Agent 独立工作区、文件浏览器、编辑器 |
| **Operations** | Session 树、Cron 调度、Kanban 看板 |
| **Observability** | Token 使用量、费用追踪、上下文仪表 |
| **Agent Context** | 每个 Agent 的身份、灵魂、技能 |
| **Kanban** | 任务看板 + 审查流 |
| **Command Palette** | 命令面板 |

#### 技术栈

```json
{
  "backend": "Hono + Node.js",
  "frontend": "TailwindCSS + Vite",
  "editor": "CodeMirror 6",
  "voice": "Whisper + TTS",
  "theme": "14 themes"
}
```

#### 特色功能

| 功能 | 说明 |
|------|------|
| **多 Agent 舰队** | 一个界面控制多个 Agent |
| **语音交互** | 完整的语音输入输出支持 |
| **工作区编辑器** | 内置 CodeMirror 编辑器 |
| **Kanban 工作流** | 完整的看板管理 |
| **命令面板** | Cmd+K 快捷操作 |
| **14 主题** | 丰富的 UI 主题支持 |
| **移动端适配** | 响应式设计 + 移动端输入优化 |

---

## 3. 功能对比分析

### 3.1 功能矩阵

| 功能 | 自建 Dashboard | mission-control | control-center | nerve |
|------|---------------|-----------------|-----------------|--------|
| **Agent 卡片展示** | ✅ | ✅ | ✅ | ✅ |
| **协作链可视化** | ✅ | ❌ | ✅ | ✅ |
| **Cron 任务链** | ✅ | ❌ | ✅ | ✅ |
| **会话活动监控** | ✅ | ✅ | ✅ | ✅ |
| **群组多 Agent** | ✅ | ✅ | ❌ | ✅ |
| **自学习监控** | ✅ | ❌ | ❌ | ❌ |
| **Token 使用统计** | ❌ | ❌ | ✅ | ✅ |
| **费用追踪** | ❌ | ❌ | ✅ | ✅ |
| **上下文压力** | ❌ | ❌ | ✅ | ✅ |
| **记忆健康状态** | ❌ | ❌ | ✅ | ❌ |
| **语音交互** | ❌ | ❌ | ❌ | ✅ |
| **文件编辑器** | ❌ | ❌ | ❌ | ✅ |
| **Kanban 看板** | ✅ | ✅ | ❌ | ✅ |
| **审批流程** | ❌ | ✅ | ❌ | ❌ |
| **多租户/组织** | ❌ | ✅ | ❌ | ❌ |
| **API-first** | ❌ | ✅ | ❌ | ❌ |
| **安全模式** | ❌ | ❌ | ✅ | ❌ |
| **远程访问** | ⚠️ 需配置 | ✅ | ✅ | ✅ |
| **移动端适配** | ⚠️ 基础 | ❌ | ❌ | ✅ |

### 3.2 核心差异

| 维度 | 自建 | mission-control | control-center | nerve |
|------|------|-----------------|-----------------|--------|
| **定位** | 静态监控 | 企业运营平台 | 本地控制中心 | 深度操作驾驶舱 |
| **复杂度** | 低 | 高 | 中 | 中高 |
| **安装** | 简单 | 复杂 | 简单 | 中等 |
| **数据来源** | 模拟数据 | 真实 API | 真实 API | 真实 API |
| **可扩展性** | 高 | 高 | 中 | 中 |
| **目标用户** | 开发者 | 企业团队 | 运营人员 | 高级用户 |

---

## 4. 技术实现对比

### 4.1 技术栈对比

| 项目 | 前端框架 | UI 库 | 图表 | 编辑器 | 语音 |
|------|----------|--------|------|--------|------|
| **自建** | 原生 HTML/CSS/JS | 无 | 无 | 无 | 无 |
| **mission-control** | Next.js | Radix UI | Recharts | - | - |
| **control-center** | Node.js | - | - | - | - |
| **nerve** | Vite | TailwindCSS | - | CodeMirror | Whisper/TTS |

### 4.2 数据获取方式

| 项目 | 实时数据 | API 方式 | WebSocket |
|------|----------|----------|-----------|
| **自建** | ❌ | - | ❌ |
| **mission-control** | ✅ | REST | - |
| **control-center** | ✅ | REST + 轮询 | - |
| **nerve** | ✅ | REST + SSE | - |

### 4.3 项目结构

```
// mission-control (Next.js 全栈)
openclaw-mission-control/
├── frontend/              # Next.js 应用
│   ├── src/app/          # App Router
│   ├── src/components/   # React 组件
│   ├── cypress/          # E2E 测试
│   └── package.json
├── backend/              # 后端服务 (如有)
└── docker/

// control-center (Node.js 单体)
openclaw-control-center/
├── src/
│   ├── index.ts          # 入口
│   ├── adapters/         # 适配器
│   ├── clients/          # API 客户端
│   ├── runtime/          # 运行时
│   └── ui/               # UI 组件
├── scripts/              # 工具脚本
└── package.json

// nerve (Hono + Vite)
openclaw-nerve/
├── src/
│   ├── frontend/         # Vite 前端
│   └── server/           # Hono 后端
├── docs/
└── package.json
```

---

## 5. 设计模式分析

### 5.1 mission-control 设计亮点

**1. 企业级架构**
```typescript
// 多组织架构
Organization → BoardGroup → Board → Task → Tag

// 审批驱动
ApprovalFlow → ApprovalStep → Approver
```

**2. 组件化设计**
- Radix UI 原子组件
- TanStack Query 数据获取
- 清晰的组件职责分离

**3. 测试覆盖**
- Cypress E2E 测试
- Vitest 单元测试

### 5.2 control-center 设计亮点

**1. 安全优先**
```typescript
// 默认安全配置
READONLY_MODE=true
LOCAL_TOKEN_AUTH_REQUIRED=true
IMPORT_MUTATION_ENABLED=false
APPROVAL_ACTIONS_ENABLED=false
```

**2. 运营者友好**
- 非技术用户也能理解
- 清晰的摘要卡片
- 上下文压力可视化

**3. 健康检查**
```typescript
// 连接健康状态
ConnectionHealth {
  gateway: boolean
  channels: boolean
  memory: boolean
  sessions: boolean
}
```

### 5.3 nerve 设计亮点

**1. 舰队控制模式**
```typescript
// 多 Agent 统一控制
Fleet {
  agents: Agent[]
  workspaces: Workspace[]
  sessions: SessionTree
}
```

**2. 实时反馈**
- Streaming chat
- 进度可视化
- 错误实时展示

**3. 语音优先**
```typescript
VoicePipeline {
  wakeWord: boolean
  stt: Whisper
  tts: TTSProvider[]
  language: string
}
```

---

## 6. 优缺点总结

### 6.1 自建 Dashboard

**优点 ✅**
- 完全定制化
- 代码简洁易维护
- 部署简单
- 可扩展性强

**缺点 ❌**
- 无真实数据连接
- 无 Token/费用统计
- 无语音支持
- 无文件编辑能力
- 移动端支持弱

---

### 6.2 mission-control

**优点 ✅**
- 企业级功能完整
- 多租户支持
- 审批流程
- API-first
- 完整测试

**缺点 ❌**
- 复杂度高
- 需要较多配置
- 面向企业，个人用户门槛高

---

### 6.3 control-center

**优点 ✅**
- 安全优先
- 运营者友好
- 功能聚焦
- 安装简单
- 真实数据

**缺点 ❌**
- 无多 Agent 协作
- 无语音
- 无编辑器
- 无移动端

---

### 6.4 nerve

**优点 ✅**
- 功能最全面
- 语音支持
- 实时驾驶舱
- 移动端友好
- 14 主题

**缺点 ❌**
- 学习成本较高
- 资源消耗较大
- 配置复杂

---

## 7. 对自建 Dashboard 的改进建议

### 7.1 短期改进（1-2周）

| 优先级 | 改进项 | 说明 |
|--------|--------|------|
| P0 | **真实数据 API** | 连接 OpenClaw Gateway API 获取真实数据 |
| P0 | **Token 使用统计** | 添加 Token 消耗图表 |
| P1 | **Context Pressure** | 显示上下文压力 |
| P1 | **Memory 健康状态** | 显示记忆系统状态 |

### 7.2 中期改进（1个月）

| 优先级 | 改进项 | 说明 |
|--------|--------|------|
| P1 | **WebSocket 实时** | 替代轮询，实现实时更新 |
| P2 | **协作链增强** | 显示更详细的跨 Agent 通信 |
| P2 | **告警增强** | 添加 Telegram/邮件通知 |
| P2 | **移动端适配** | 优化移动端显示 |

### 7.3 长期改进（3个月+）

| 优先级 | 改进项 | 说明 |
|--------|--------|------|
| P2 | **语音交互** | 参考 nerve 添加语音 |
| P3 | **文件编辑器** | 内置工作区编辑器 |
| P3 | **审批流程** | 参考 mission-control |
| P3 | **多租户** | 支持多用户 |

### 7.4 推荐技术升级

**基于现有 HTML 的渐进式升级：**

```javascript
// 阶段 1: 添加图表库
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// 阶段 2: 添加实时通信
// - 使用 Server-Sent Events (SSE)
// - 或 WebSocket

// 阶段 3: 添加 UI 框架
// - 迁移到 React/Vue
// - 或使用 TailwindCSS 增强
```

**推荐的技术路线：**

```
当前: 纯 HTML/CSS/JS
  ↓
阶段1: 添加 Chart.js + 真实 API 调用
  ↓
阶段2: 迁移到 React + TailwindCSS
  ↓
阶段3: 添加 WebSocket 实时更新
  ↓
最终: 完整的企业级 Dashboard (参考 mission-control)
```

---

## 总结

| Dashboard | 推荐场景 | 适合用户 |
|-----------|----------|----------|
| **自建** | 快速原型、简单监控 | 开发者、个人 |
| **mission-control** | 企业运营、多团队 | 企业团队 |
| **control-center** | 本地控制、安全优先 | 运营人员 |
| **nerve** | 深度操作、语音控制 | 高级用户 |

**建议**：根据实际需求选择
- 简单监控 → 使用自建 + 快速改进
- 企业运营 → 直接部署 mission-control
- 安全优先 → 使用 control-center
- 深度控制 → 部署 nerve

---

**相关内容：**

- [Dashboard 远程访问指南](./25-remote-access-dashboard.md)
- [OpenClaw 与 Claude Code 协作](./24-openclaw-claude-code-integration.md)
- [Agent 架构详解](./16-openclaw-agent-architecture.md)
