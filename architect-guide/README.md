# OpenClaw 架构师指南

> 面向开发者、架构师和技术负责人的深度技术文档

---

## 本书定位

**《OpenClaw架构师指南》** 是一本面向技术人员的高阶文档，与面向普通用户的[主教程](../README.md)形成互补：

| 对比 | 主教程 | 架构师指南 |
|-----|-------|-----------|
| **目标读者** | 终端用户、初学者 | 开发者、架构师、运维 |
| **内容深度** | 应用层面 | 原理+源码层面 |
| **关注重点** | "怎么用" | "为什么这样设计"、"如何扩展" |
| **代码示例** | 配置和使用 | 架构设计和扩展开发 |

---

## 内容概览

### 第一部分：核心架构原理

深入了解OpenClaw的设计哲学和核心机制：

1. **[架构总览](core/architecture-overview.md)** - 整体架构、设计原则和组件关系
2. **[Agent Loop内核](core/agent-loop.md)** - 代理执行循环、任务调度、状态管理
3. **[会话与记忆系统](core/session-memory.md)** - 会话生命周期、记忆压缩、上下文管理
4. **[安全模型](core/security-model.md)** - 安全边界、权限控制、沙箱机制

### 第二部分：Gateway协议详解

深入理解Gateway通信协议和扩展机制：

5. **[Gateway架构](protocol/gateway-architecture.md)** - Gateway角色、连接模型、生命周期
6. **[WebSocket协议](protocol/websocket-protocol.md)** - 握手流程、消息格式、状态同步
7. **[Node扩展协议](protocol/node-extension.md)** - Node角色、能力声明、远程执行
8. **[MCP集成](protocol/mcp-integration.md)** - Model Context Protocol集成原理

### 第三部分：扩展开发指南

开发自定义插件和扩展的完整指南：

9. **[Plugin SDK](extension/plugin-sdk.md)** - 插件架构、生命周期、API参考
10. **[Skill开发](extension/skill-development.md)** - Skill结构、工具注册、状态管理
11. **[Channel扩展](extension/channel-extension.md)** - 接入新消息渠道的完整流程
12. **[Memory Provider](extension/memory-provider.md)** - 自定义记忆后端开发

### 第四部分：生产运维

大规模部署和运维的最佳实践：

13. **[性能调优](operation/performance.md)** - 瓶颈分析、缓存策略、资源优化
14. **[监控与可观测性](operation/observability.md)** - 日志、指标、链路追踪
15. **[高可用架构](operation/high-availability.md)** - 集群部署、故障转移、负载均衡
16. **[安全加固](operation/security-hardening.md)** - 生产环境安全配置、审计、合规

---

## 前置知识

阅读本指南前，建议具备以下基础：

- **TypeScript/JavaScript** - OpenClaw核心使用TypeScript开发
- **WebSocket** - 理解实时双向通信机制
- **Node.js** - 了解事件循环、流、模块系统
- **系统架构** - 分布式系统、状态管理、安全基础

---

## 源码参考

本指南基于 OpenClaw 官方仓库分析编写：

- **官方仓库**: https://github.com/openclaw/openclaw
- **核心源码**: `src/` 目录
- **设计文档**: `docs/` 目录
- **协议定义**: `src/infra/`, `src/gateway/`

---

## 设计哲学

理解OpenClaw的核心设计哲学，有助于更好地使用和改进它：

> **"OpenClaw is the AI that actually does things."**

### 1. 终端优先 (Terminal-First)

OpenClaw采用终端优先的设计，让用户在部署初期就看到所有安全决策：
- 显式的权限配置
- 明确的认证流程
- 透明的工具执行

### 2. 安全与能力的平衡

安全不是能力的天敌，而是可控的边界：
- 强安全默认值
- 清晰的高权限开关
- 操作者明确授权

### 3. 插件化架构

核心保持精简，功能通过插件扩展：
- Core保持lean
- 可选能力插件化
- 社区插件生态

### 4. 隐私优先

数据本地化，用户拥有完全控制权：
- 运行在用户设备
- 数据不上传云端
- 自托管Gateway

---

## 开始阅读

根据你的角色选择切入点：

- **架构师** → 从[架构总览](core/architecture-overview.md)开始
- **后端开发** → 从[Gateway架构](protocol/gateway-architecture.md)开始
- **前端开发** → 从[WebSocket协议](protocol/websocket-protocol.md)开始
- **Plugin开发者** → 从[Plugin SDK](extension/plugin-sdk.md)开始
- **运维工程师** → 从[监控与可观测性](operation/observability.md)开始

---

## 贡献与反馈

本指南与官方文档的关系：

- **官方文档** (`docs.openclaw.ai`): 权威参考，面向所有用户
- **本指南**: 深度解析，面向技术人员
- **互补关系**: 官方文档讲"是什么"，本指南讲"为什么"

发现错误或有改进建议？欢迎提交Issue。

---

**当前版本**: 基于 OpenClaw 2026.03 版本编写
