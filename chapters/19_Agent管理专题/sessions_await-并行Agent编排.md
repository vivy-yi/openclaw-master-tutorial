---
title: sessions_await — 并行 Agent 编排工具
description: 使用 sessions_await 工具在 OpenClaw 中实现并行 sub-agent 编排，一次性等待多个 Agent 结果并汇聚。
tags: [openclaw, agents, multi-agent, sessions_await, tools]
难度: advanced
预计阅读时间: 12 分钟
date: 2026-03-29
author: OpenClaw助手
version: ">= v2026.3.x（新增功能）"
---

# sessions_await — 并行 Agent 编排工具

> **来源**: PR [#56607](https://github.com/openclaw/openclaw/pull/56607)  
> **引入版本**: v2026.3.x（待正式发布）  
> **功能等级**: 新工具 (feat)

---

## 一句话总结

`sessions_await` 是 OpenClaw 新增的工具，允许主 Agent 一次性**并行启动多个 sub-agent**，等待它们全部完成后**汇聚结果**，适用于需要多路并行调研/处理后统一汇总的场景。

---

## 背景：为什么需要 sessions_await

### 传统方式的局限性

在 `sessions_await` 出现之前，主 Agent 如果需要多个 sub-agent 并行工作，通常需要：

1. **串行调用** — 一个接一个启动，浪费时间
2. **轮询 sessions_list** — 反复检查状态，代码复杂
3. **spawn 后手动 yield** — 无法一次性等待多个

### sessions_await 的优势

```
sessions_await vs 传统方式：

传统（串行）：
  Agent A → 等待完成 → Agent B → 等待完成 → Agent C → 汇总
  总耗时 = T(A) + T(B) + T(C)

sessions_await（并行）：
  Agent A ─┐
  Agent B ─┼─→ 并行执行 → 等待全部完成 → 汇总
  Agent C ─┘
  总耗时 = max(T(A), T(B), T(C))
```

---

## 工具定义

### 基本参数

```json
{
  "sessions": [
    {
      "sessionKey": "agent:agent-id:channel:chatId",
      "message": "要发送给该 Agent 的消息",
      "timeoutSeconds": 300,
      "label": "可选的标签，用于结果识别"
    }
  ],
  "waitForAll": true,
  "timeoutSeconds": 600
}
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sessions` | array | ✅ | 要等待的 session 列表 |
| `sessions[].sessionKey` | string | ✅ | 目标 session 的完整 key |
| `sessions[].message` | string | ✅ | 发送给该 session 的消息 |
| `sessions[].timeoutSeconds` | number | ❌ | 该 session 的超时时间，默认 300s |
| `sessions[].label` | string | ❌ | 用于标识结果的标签 |
| `waitForAll` | boolean | ❌ | 是否等待全部完成，默认 true |
| `timeoutSeconds` | number | ❌ | 整体超时时间 |

---

## 使用示例

### 示例一：多语言代码生成

让三个 sub-agent 同时生成 Python、Go、Rust 三种语言的实现：

```json
{
  "sessions": [
    {
      "sessionKey": "agent:code-python:telegram:123456",
      "message": "用 Python 实现一个 HTTP 服务器，支持 GET/POST，请求日志打印到 stdout，代码量控制在 50 行以内",
      "label": "python_impl",
      "timeoutSeconds": 120
    },
    {
      "sessionKey": "agent:code-go:telegram:123456",
      "message": "用 Go 实现一个 HTTP 服务器，支持 GET/POST，请求日志打印到 stdout，代码量控制在 50 行以内",
      "label": "go_impl",
      "timeoutSeconds": 120
    },
    {
      "sessionKey": "agent:code-rust:telegram:123456",
      "message": "用 Rust 实现一个 HTTP 服务器，支持 GET/POST，请求日志打印到 stdout，代码量控制在 50 行以内",
      "label": "rust_impl",
      "timeoutSeconds": 180
    }
  ],
  "waitForAll": true,
  "timeoutSeconds": 300
}
```

**返回结果示例**：

```json
{
  "status": "completed",
  "results": [
    {
      "label": "python_impl",
      "sessionKey": "agent:code-python:telegram:123456",
      "status": "ok",
      "message": "```python\nfrom http.server import HTTPServer, SimpleHTTPRequestHandler\n...\n```"
    },
    {
      "label": "go_impl",
      "sessionKey": "agent:code-go:telegram:123456",
      "status": "ok",
      "message": "```go\npackage main\nimport (\n    \"net/http\"\n)\n...\n```"
    },
    {
      "label": "rust_impl",
      "sessionKey": "agent:code-rust:telegram:123456",
      "status": "ok",
      "message": "```rust\nuse std::net::TcpListener;\n...\n```"
    }
  ],
  "completedCount": 3,
  "totalCount": 3,
  "duration": 45.2
}
```

### 示例二：多平台并行调研

同时调研 GitHub、Twitter/X、Reddit 三个平台上的 OpenClaw 相关讨论：

```json
{
  "sessions": [
    {
      "sessionKey": "agent:github-researcher:main",
      "message": "搜索 GitHub 上最近 7 天 openclaw 相关的热门项目，列出前 5 个，包含 stars 数和主要描述",
      "label": "github_trending",
      "timeoutSeconds": 180
    },
    {
      "sessionKey": "agent:twitter-researcher:main",
      "message": "搜索 Twitter/X 上 #openclaw 标签的热门讨论，列出前 5 条，包含作者和主要内容",
      "label": "twitter_discussions",
      "timeoutSeconds": 180
    },
    {
      "sessionKey": "agent:reddit-researcher:main",
      "message": "搜索 Reddit r/openclaw 和 r/AIagents 上最近的讨论帖，列出前 5 条",
      "label": "reddit_posts",
      "timeoutSeconds": 180
    }
  ],
  "waitForAll": true,
  "timeoutSeconds": 600
}
```

### 示例三：聚合报告生成

先调研，再并行生成不同风格的报告：

```json
{
  "sessions": [
    {
      "sessionKey": "agent:data-collector:main",
      "message": "收集 OpenClaw v2026.3.24 的所有新功能和 Breaking Changes",
      "label": "raw_data",
      "timeoutSeconds": 120
    }
  ]
}
```

收到 `raw_data` 结果后，主 Agent 聚合并行生成：

```json
{
  "sessions": [
    {
      "sessionKey": "agent:writer-technical:main",
      "message": "基于以下信息，用技术风格写一份 Release Notes 解读：\n{{raw_data_result}}",
      "label": "technical_doc",
      "timeoutSeconds": 180
    },
    {
      "sessionKey": "agent:writer-simple:main",
      "message": "基于以下信息，用通俗易懂的语言写一份面向普通用户的更新说明：\n{{raw_data_result}}",
      "label": "user_doc",
      "timeoutSeconds": 180
    },
    {
      "sessionKey": "agent:writer-video:main",
      "message": "基于以下信息，写一个 2 分钟的短视频脚本，适合 B 站/抖音发布：\n{{raw_data_result}}",
      "label": "video_script",
      "timeoutSeconds": 180
    }
  ],
  "waitForAll": true,
  "timeoutSeconds": 600
}
```

---

## 高级用法

### 标签过滤

`sessions_await` 返回结果时，可以通过 `labels` 字段过滤需要的部分：

```json
{
  "sessions": [...],
  "labels": ["python_impl", "go_impl"]
}
```

### 超时处理

对于长时间运行的任务，可以设置合理的超时：

```json
{
  "sessions": [
    {
      "sessionKey": "...",
      "message": "...",
      "timeoutSeconds": 60
    }
  ],
  "timeoutSeconds": 120
}
```

**超时行为**：
- 整体超时：`timeoutSeconds` 到达后，返回已完成任务的结果，未完成标记为 `timeout`
- 单个任务超时：对应 `session` 标记为 `timeout`，不影响其他任务

### 错误处理

```json
{
  "status": "completed",
  "results": [
    {
      "label": "task_a",
      "status": "ok",
      "message": "成功结果..."
    },
    {
      "label": "task_b",
      "status": "error",
      "message": "Error: session not found"
    }
  ]
}
```

主 Agent 可以根据每个子任务的状态决定如何处理。

---

## 与其他工具的对比

| 特性 | `sessions_spawn` | `sessions_send` | `sessions_await` |
|------|-----------------|-----------------|-----------------|
| 并行启动 | ✅ | ❌ | ✅ |
| 等待多个 | 需手动轮询 | N/A | ✅ 原生支持 |
| 结果汇聚 | 需手动汇总 | N/A | ✅ 原生支持 |
| 适用场景 | 独立任务 | 实时交互 | 并行调研/处理 |

---

## 最佳实践

### ✅ 推荐做法

1. **为每个 sub-session 设置 label** — 方便结果识别
2. **合理设置 timeoutSeconds** — 避免无限等待
3. **设置整体超时** — 防止某个任务卡死影响全局
4. **分离调研和生成** — 先收集数据，再并行生成

### ❌ 避免做法

1. **不要启动过多并行任务** — 系统资源有限，建议 ≤ 10 个
2. **不要忽略 timeout** — 生产环境中网络不稳定
3. **不要让 sub-agent 做敏感操作** — 安全性同 Queue collect issue #56632

---

## 常见问题

### Q: sessions_await 和直接调用多次 sessions_spawn 有何区别？

`sessions_spawn` 启动后会立即返回，sub-agent 在后台运行。如果需要等待结果，需要手动轮询 `sessions_list`。`sessions_await` 将这个过程封装好，一次调用即可等待多个结果。

### Q: 可以让 sub-agent 使用不同的模型吗？

可以。在 `openclaw.json` 中为不同 agentId 配置不同的默认模型，sessions_await 会使用各自 agent 的模型配置。

### Q: 如果其中一个 session 失败了怎么办？

`sessions_await` 会返回每个 session 的独立状态，其他正常的 session 不会受影响。主 Agent 可以根据结果中的 `status` 字段决定如何处理。

### Q: sessions_await 支持 waitForAll=false 吗？

支持。设置 `waitForAll: false` 后，只要任意一个 session 完成就立即返回结果，适用于「多路竞价」场景（如同时查询多个 API 返回最快的结果）。

---

## 参考链接

- PR [#56607](https://github.com/openclaw/openclaw/pull/56607)
- [sessions_spawn 工具文档](./sessions_spawn-并行Agent启动.md)
- [多 Agent 协作专题](./19_多Agent协作.md)
- [sessions_list 工具文档](../03_gateway/Sessions管理.md)

---

## 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|---------|
| 2026-03-29 | 1.0 | 初始文档，基于 PR #56607 |

---

*本文档由 OpenClaw 助手自动生成，内容基于 GitHub PR #56607。*  
*功能细节可能随版本更新变化，请以官方 Release Notes 为准。*
