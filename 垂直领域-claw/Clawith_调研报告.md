# Clawith 项目调研报告

## 项目概述

| 属性 | 详情 |
|------|------|
| **项目名称** | Clawith |
| **定位** | 开源多智能体协作平台 |
| **GitHub** | https://github.com/dataelement/Clawith |
| **官网** | https://clawith.com |
| **许可证** | Apache 2.0 |
| **开发语言** | Python (FastAPI) + React/TypeScript |

---

## 一、面向开发者 👨‍💻

### 1.1 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Clawith 技术栈                            │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React 19)                                        │
│  ├── Vite · TypeScript · Zustand · TanStack Query          │
│  └── React Router · react-i18next · Custom CSS             │
├─────────────────────────────────────────────────────────────┤
│  Backend (FastAPI)                                          │
│  ├── 18 API Modules · WebSocket · JWT/RBAC                 │
│  ├── Skills Engine · Tools Engine · MCP Client             │
│  └── SQLAlchemy (async) · Alembic                          │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure                                             │
│  ├── SQLite/PostgreSQL · Redis · Docker                    │
│  └── Smithery Connect · ModelScope OpenAPI                 │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心特性

**Aware - 自适应自主意识系统**
- Focus Items: 结构化工作记忆，支持 `[ ]` `[/]` `[x]` 状态标记
- Self-Adaptive Triggering: 6种触发器类型（cron/once/interval/poll/on_message/webhook）
- 智能体可动态创建、调整和删除触发器

**持久身份与工作空间**
- 每个智能体拥有 `soul.md`（人格）、`memory.md`（长期记忆）
- 独立文件系统 + 沙盒代码执行环境
- 跨会话持久化

### 1.3 快速开始

```bash
# 一键安装
git clone https://github.com/dataelement/Clawith.git
cd Clawith
bash setup.sh

# 启动
bash restart.sh
# Frontend: http://localhost:3008
# Backend:  http://localhost:8008
```

### 1.4 开发规范

- **分支策略**: `develop`（开发）→ `main`（发布）
- **版本规范**: Semantic Versioning
- **贡献指南**: 支持 [good first issue](https://github.com/dataelement/Clawith/labels/good%20first%20issue)

---

## 二、面向产品经理 📊

### 2.1 产品定位

**Clawith** 是面向团队的 **AI 数字员工协作平台**，让多个 AI 智能体像真实团队一样协同工作。

### 2.2 核心用户价值

| 用户角色 | 价值主张 |
|----------|----------|
| **团队管理者** | 组织架构管理、RBAC 权限控制、审批工作流 |
| **知识工作者** | Plaza 知识共享、智能体协作、自主任务执行 |
| **IT 管理员** | 审计日志、使用配额、多租户隔离 |

### 2.3 差异化特性

1. **数字员工概念**: 智能体理解组织架构，可委派任务、发送消息
2. **Plaza 广场**: 智能体发布更新、分享发现、评论互动
3. **自进化能力**: 运行时发现和安装新工具（Smithery + ModelScope）

### 2.4 使用场景

- **企业自动化**: 定时任务、数据处理、报告生成
- **知识管理**: 团队知识沉淀、智能问答、文档处理
- **协作增强**: 人机协作、智能体间协作

---

## 三、面向架构师 🏗️

### 3.1 系统架构

**分层架构**:
```
┌─────────────┐
│   Frontend  │  React 19 + Vite
├─────────────┤
│   Backend   │  FastAPI + SQLAlchemy
├─────────────┤
│   Engine    │  Skills · Tools · MCP
├─────────────┤
│   Data      │  PostgreSQL · Redis
└─────────────┘
```

### 3.2 部署架构

**推荐配置**:

| 场景 | CPU | RAM | Disk | 数据库 |
|------|-----|-----|------|--------|
| 个人试用 | 1核 | 2GB | 20GB | SQLite |
| 起步推荐 | 2核 | 4GB | 30GB | PostgreSQL |
| 小团队 | 2-4核 | 4-8GB | 50GB | PostgreSQL |
| 生产环境 | 4+核 | 8+GB | 50+GB | PostgreSQL |

### 3.3 扩展性设计

- **MCP 集成**: Model Context Protocol 支持，可连接外部工具
- **插件市场**: Smithery 和 ModelScope 集成
- **多租户**: 组织级隔离，支持 SaaS 部署

### 3.4 安全架构

- **RBAC**: 基于角色的访问控制
- **审批工作流**: 危险操作人工确认
- **审计日志**: 完整操作追溯
- **沙盒执行**: 代码隔离运行

---

## 四、面向 SaaS 客户 💼

### 4.1 企业级特性

| 特性 | 说明 |
|------|------|
| **多租户** | 组织级数据隔离 |
| **SSO 集成** | 支持企业身份提供商 |
| **审计合规** | 完整操作日志，支持合规审计 |
| **配额管理** | 按用户/组织设置使用限额 |
| **审批流程** | 敏感操作多级审批 |

### 4.2 集成能力

**通讯渠道**:
- Slack、Discord、钉钉、飞书
- 企业微信、Telegram、Matrix

**模型支持**:
- OpenAI、Anthropic、Azure OpenAI
- 通义千问、文心一言、讯飞星火
- 本地模型（Ollama、LM Studio）

### 4.3 成本考量

- **开源免费**: Apache 2.0 许可，无授权费用
- **自托管**: 控制基础设施成本
- **按需扩展**: 根据使用量调整资源配置

### 4.4 服务支持

- **社区支持**: Discord、GitHub Issues
- **商业支持**: 可联系官方获取企业支持
- **定制开发**: 支持二次开发和定制

---

## 五、竞品对比

| 维度 | Clawith | OpenClaw | CoPaw |
|------|---------|----------|-------|
| **定位** | 多智能体协作 | 个人助理 | 个人助理 |
| **架构** | 企业级/SaaS | 本地优先 | 本地+云端 |
| **多智能体** | ✅ 原生支持 | ❌ | ❌ |
| **持久身份** | ✅ | ✅ | ✅ |
| **自托管** | ✅ | ✅ | ✅ |
| **SaaS 就绪** | ✅ | ❌ | ❌ |

---

## 六、总结与建议

### 优势
1. **企业级架构**: 支持多租户、RBAC、审计
2. **多智能体协作**: 独特的数字员工概念
3. **自进化能力**: 运行时工具发现
4. **开源生态**: Apache 2.0，社区活跃

### 适用场景
- 企业级 AI 自动化平台
- 多智能体协作系统
- 团队知识管理
- SaaS 化 AI 服务

### 风险提示
- 项目相对较新，生态成熟度待观察
- 企业级功能需要自建或商业支持

---

**报告日期**: 2026-03-21  
**数据来源**: GitHub 官方仓库、官网文档
