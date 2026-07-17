# Kiro + OpenClaw 双协议协作指南

本文档介绍 Kiro 与 OpenClaw 如何实现 MCP + ACP 双协议双向协作，涵盖企业内部知识库问答、跨系统工作流编排、智能客服多轮对话及数据分析代理四大场景。

## 协议概述

| 协议 | 全称 | 用途 |
|------|------|------|
| MCP | Model Context Protocol | 标准化工具调用 |
| ACP | Agent Communication Protocol | Agent 间通信协作 |

## 架构设计

### 双协议通信流

```
┌─────────┐     MCP      ┌─────────┐
│   Kiro  │ ◄──────────► │ OpenClaw│
└─────────┘    ACP      └─────────┘
     │                          │
     └──────────┬─────────────┘
                │
         ┌─────┴─────┐
         │ 企业系统   │
         │ (DB/API)  │
         └──────────┘
```

### 适用场景

1. **企业内部知识库问答** — Kiro 理解用户意图，OpenClaw 执行工具调用
2. **跨系统工作流编排** — 多 Agent 协作完成复杂任务
3. **智能客服多轮对话** — 会话管理与状态保持
4. **数据分析代理** — Kiro 分析数据，OpenClaw 生成报告

## 快速开始

### 1. 安装依赖

```bash
npm install -g openclaw kiro-cli
```

### 2. 配置双协议

在 `openclaw.json` 中启用 ACP 协议：

```json
{
  "protocol": {
    "mcp": {
      "enabled": true,
      "port": 3100
    },
    "acp": {
      "enabled": true,
      "port": 3101,
      "peers": ["kiro://localhost:3200"]
    }
  }
}
```

### 3. 验证连接

```bash
openclaw doctor --protocol
```

## 案例实战

### 案例1: 企业内部知识库问答

**场景**: 员工询问公司政策、流程文档

**配置**:

```json
{
  "agents": {
    "policy-assistant": {
      "model": "claude-sonnet-4-20250514",
      "protocol": ["mcp", "acp"],
      "system": "你是公司政策问答助手，熟悉公司规章制度"
    }
  }
}
```

**工作流**:

1. 用户提问 → Kiro 理解意图
2. Kiro 通过 ACP 通知 OpenClaw
3. OpenClaw 查询知识库（通过 MCP 工具）
4. 返回答案给 Kiro
5. Kiro 整理后回复用户

### 案例2: 跨系统工作流编排

**场景**: 新员工入职流程自动化

**配置**:

```json
{
  "workflows": {
    "onboarding": {
      "steps": [
        {"agent": "hr-assistant", "task": "创建邮箱账户"},
        {"agent": "it-assistant", "task": "配置电脑权限"},
        {"agent": "training-assistant", "task": "发送培训材料"}
      ]
    }
  }
}
```

### 案例3: 智能客服多轮对话

**场景**: 技术支持问题处理

**配置**:

```json
{
  "agents": {
    "support-bot": {
      "model": "gpt-4o",
      "protocol": ["mcp", "acp"],
      "memory": {
        "type": "session",
        "maxTurns": 10
      }
    }
  }
}
```

### 案例4: 数据分析代理

**场景**: 自动生成周报

**配置**:

```json
{
  "agents": {
    "analytics": {
      "model": "claude-sonnet-4-20250514",
      "protocol": ["mcp", "acp"],
      "tools": ["database-query", "chart-generate", "report-send"]
    }
  }
}
```

## 配置参考

### ACP 通道配置

```json
{
  "channels": {
    "acp": {
      "type": "acp",
      "bind": "localhost:3101",
      "peers": [
        {"name": "kiro", "url": "localhost:3200"}
      ]
    }
  }
}
```

### MCP 工具注册

```json
{
  "mcp": {
    "tools": [
      {"name": "query-database", "schema": {...}},
      {"name": "send-email", "schema": {...}},
      {"name": "create-task", "schema": {...}}
    ]
  }
}
```

## 故障排除

### 连接失败

- 检查端口是否被占用
- 验证防火墙规则
- 确认协议版本兼容

### 消息丢失

- 检查 ACP 队列状态
- 增加重试次数
- 查看日志 `openclaw logs`

### 性能问题

- 使用 WebSocket 而非 HTTP
- 增加缓存策略
- 优化 Agent  Prompt

## 相关资源

- [AWS Kiro + OpenClaw 实践](https://aws.amazon.com/cn/blogs/china/kiro-openclaw-ai-agent-practice-explore/)
- [OpenClaw MCP 文档](https://docs.openclaw.ai/mcp)
- [Kiro 官方文档](https://kiro.ai)