# OpenClaw Gateway API 参考手册

> 本教程全面介绍 OpenClaw Gateway 的 API 接口，包括 WebSocket 协议方法、OpenAI 兼容 HTTP API、工具调用 API，以及各接口的认证方式、请求格式和实际用法。
> OpenClaw Gateway 是一个多协议合一的服务端：WebSocket 控制面 + HTTP API 面共用同一个端口（默认 18789）。

---

## 一、架构概览

### 1.1 单端口多协议

```
Gateway 端口: 18789 (默认)
         │
         ├─ WebSocket ── 控制面 RPC (Cron/Agent/Session/Config/Channel)
         ├─ HTTP GET   ── OpenAI 兼容 (/v1/models, /v1/embeddings)
         ├─ HTTP POST  ── OpenAI 兼容 (/v1/chat/completions, /v1/responses)
         ├─ HTTP POST  ── 工具直调 (/tools/invoke)
         └─ HTTP GET   ── 健康探针 (/healthz, /readyz)
```

### 1.2 WebSocket 协议帧格式

**请求帧**：
```json
{
  "type": "req",
  "id": "req-001",
  "method": "cron.jobs.list",
  "params": {}
}
```

**响应帧**：
```json
{
  "type": "res",
  "id": "req-001",
  "ok": true,
  "payload": { ... }
}
```

**事件帧**（服务端主动推送）：
```json
{
  "type": "event",
  "event": "cron.job.triggered",
  "payload": { ... }
}
```

### 1.3 认证方式

| 方式 | 说明 |
|------|------|
| Bearer Token | `Authorization: Bearer <token>` |
| Gateway Password | `Authorization: Bearer <password>` |
| WS Auth | 连接握手时在 `params.auth.token` 字段传递 |

---

## 二、Cron / Jobs API

> 定时任务管理接口。创建、列出、更新、删除和立即触发任务。

### 2.1 创建任务 — `cron.jobs.create`

**请求**：
```json
{
  "type": "req",
  "id": "cron-001",
  "method": "cron.jobs.create",
  "params": {
    "name": "weekly-distill",
    "schedule": {
      "kind": "cron",
      "expr": "0 17 * * 5",
      "tz": "Asia/Shanghai"
    },
    "payload": {
      "kind": "agentTurn",
      "message": "执行知识蒸馏..."
    },
    "sessionTarget": "isolated",
    "delivery": {
      "mode": "announce",
      "channel": "telegram",
      "to": "-5015409771"
    },
    "enabled": true
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "cron-001",
  "ok": true,
  "payload": {
    "id": "weekly-distill",
    "createdAt": "2026-04-06T00:00:00.000Z",
    "nextRunAt": "2026-04-10T09:00:00.000Z"
  }
}
```

**schedule.kind 可选值**：

| kind | 说明 | 示例 |
|------|------|------|
| `"cron"` | 标准 Cron 表达式 | `"0 17 * * 5"` |
| `"every"` | 固定间隔 | `everyMs: 3600000` |
| `"at"` | 一次性时间戳 | `at: "2026-05-01T00:00:00Z"` |

---

### 2.2 列出任务 — `cron.jobs.list`

**请求**：
```json
{
  "type": "req",
  "id": "cron-002",
  "method": "cron.jobs.list",
  "params": {
    "includeDisabled": true
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "cron-002",
  "ok": true,
  "payload": {
    "jobs": [
      {
        "id": "weekly-distill",
        "name": "weekly-distill",
        "schedule": { "kind": "cron", "expr": "0 17 * * 5" },
        "enabled": true,
        "lastRunAt": "2026-04-03T09:00:00.000Z",
        "nextRunAt": "2026-04-10T09:00:00.000Z",
        "runCount": 3
      }
    ]
  }
}
```

---

### 2.3 更新任务 — `cron.jobs.update`

**请求**：
```json
{
  "type": "req",
  "id": "cron-003",
  "method": "cron.jobs.update",
  "params": {
    "id": "weekly-distill",
    "patch": {
      "enabled": false,
      "schedule": { "kind": "cron", "expr": "0 10 * * 1" }
    }
  }
}
```

---

### 2.4 删除任务 — `cron.jobs.delete`

**请求**：
```json
{
  "type": "req",
  "id": "cron-004",
  "method": "cron.jobs.delete",
  "params": {
    "id": "weekly-distill"
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "cron-004",
  "ok": true,
  "payload": { "deleted": true }
}
```

> ⚠️ **已知 Bug**：`DELETE` 后任务可能持续投递（见 #56045）。删除后需手动 `gateway restart` 才能完全停止。

---

### 2.5 立即触发 — `cron.jobs.run`

**请求**：
```json
{
  "type": "req",
  "id": "cron-005",
  "method": "cron.jobs.run",
  "params": {
    "id": "weekly-distill",
    "runMode": "force"
  }
}
```

**runMode 选项**：

| 值 | 说明 |
|----|------|
| `"due"`（默认） | 仅在任务到期时执行 |
| `"force"` | 立即强制执行，忽略 schedule |

---

## 三、Agent API

> Agent 的注册、配置、更新和注销管理。

### 3.1 列出 Agent — `agents.list`

**请求**：
```json
{
  "type": "req",
  "id": "agent-001",
  "method": "agents.list",
  "params": {}
}
```

**响应**：
```json
{
  "type": "res",
  "id": "agent-001",
  "ok": true,
  "payload": {
    "agents": [
      {
        "id": "main",
        "workspace": "~/.openclaw/workspace-main",
        "model": "minimax-portal/MiniMax-M2.7",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "status": "running"
      }
    ]
  }
}
```

---

### 3.2 注册 Agent — `agents.create`

**请求**：
```json
{
  "type": "req",
  "id": "agent-002",
  "method": "agents.create",
  "params": {
    "id": "coding",
    "workspace": "~/.openclaw/workspace-coding",
    "model": "minimax-portal/MiniMax-M2.1",
    "sandbox": {
      "mode": "non-main",
      "scope": "agent",
      "workspaceAccess": "none"
    }
  }
}
```

**sandbox 配置详解**：

| 字段 | 可选值 | 说明 |
|------|--------|------|
| `mode` | `"off"` / `"non-main"` / `"all"` | 沙箱模式 |
| `scope` | `"agent"` / `"session"` / `"shared"` | 沙箱粒度 |
| `workspaceAccess` | `"none"` / `"ro"` / `"rw"` | 工作区访问权限 |

---

### 3.3 更新配置 — `agents.update`

**请求**：
```json
{
  "type": "req",
  "id": "agent-003",
  "method": "agents.update",
  "params": {
    "id": "coding",
    "patch": {
      "model": "minimax-portal/MiniMax-M2.7",
      "tools": {
        "allow": ["read", "exec", "browser"],
        "deny": ["write", "edit", "elevated"]
      }
    }
  }
}
```

---

### 3.4 注销 Agent — `agents.delete`

**请求**：
```json
{
  "type": "req",
  "id": "agent-004",
  "method": "agents.delete",
  "params": {
    "id": "coding"
  }
}
```

> ⚠️ 注销 Agent 会删除其所有会话历史，请先确认数据已备份。

---

## 四、Session API

> 会话管理接口。创建、查询和结束会话。

### 4.1 创建会话 — `sessions.create`

**请求**：
```json
{
  "type": "req",
  "id": "sess-001",
  "method": "sessions.create",
  "params": {
    "agentId": "main",
    "sessionKey": "project-alpha-001",
    "context": {
      "locale": "zh-CN"
    }
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "sess-001",
  "ok": true,
  "payload": {
    "sessionKey": "project-alpha-001",
    "agentId": "main",
    "createdAt": "2026-04-06T00:00:00.000Z"
  }
}
```

---

### 4.2 获取会话 — `sessions.get`

**请求**：
```json
{
  "type": "req",
  "id": "sess-002",
  "method": "sessions.get",
  "params": {
    "sessionKey": "project-alpha-001"
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "sess-002",
  "ok": true,
  "payload": {
    "sessionKey": "project-alpha-001",
    "agentId": "main",
    "createdAt": "2026-04-06T00:00:00.000Z",
    "messageCount": 42,
    "lastMessageAt": "2026-04-06T08:00:00.000Z"
  }
}
```

---

### 4.3 结束会话 — `sessions.delete`

**请求**：
```json
{
  "type": "req",
  "id": "sess-003",
  "method": "sessions.delete",
  "params": {
    "sessionKey": "project-alpha-001"
  }
}
```

---

### 4.4 会话消息历史 — `sessions.history`

**请求**：
```json
{
  "type": "req",
  "id": "sess-004",
  "method": "sessions.history",
  "params": {
    "sessionKey": "main",
    "limit": 10,
    "before": "msg-12345"
  }
}
```

---

## 五、Config API

> Gateway 配置的读取和动态更新。

### 5.1 获取配置 — `config.get`

**请求**：
```json
{
  "type": "req",
  "id": "cfg-001",
  "method": "config.get",
  "params": {}
}
```

**响应**：
```json
{
  "type": "res",
  "id": "cfg-001",
  "ok": true,
  "payload": {
    "gateway": {
      "mode": "local",
      "bind": "loopback",
      "port": 18789
    },
    "models": { ... },
    "channels": { ... }
  }
}
```

**按路径获取子集**：
```json
{
  "type": "req",
  "id": "cfg-002",
  "method": "config.get",
  "params": {
    "path": "gateway"
  }
}
```

---

### 5.2 更新配置 — `config.patch`

**请求**：
```json
{
  "type": "req",
  "id": "cfg-003",
  "method": "config.patch",
  "params": {
    "patch": {
      "gateway": {
        "mode": "lan"
      }
    },
    "note": "更新 Gateway 为局域网模式"
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "cfg-003",
  "ok": true,
  "payload": {
    "restartRequired": true,
    "patchedPaths": ["gateway.mode"]
  }
}
```

> **注意**：更改 `gateway.bind` / `gateway.port` 等网络配置后需要重启 Gateway 才能生效。

---

### 5.3 配置热重载 — `config.reload`

无需重启，动态加载磁盘上最新的配置文件：

```json
{
  "type": "req",
  "id": "cfg-004",
  "method": "config.reload",
  "params": {}
}
```

---

## 六、Channel API

> 消息收发、群组绑定和渠道认证管理。

### 6.1 发送消息 — `chat.send`

**请求**：
```json
{
  "type": "req",
  "id": "chat-001",
  "method": "chat.send",
  "params": {
    "channel": "telegram",
    "target": "-5015409771",
    "message": "测试消息",
    "sessionKey": "main"
  }
}
```

**响应**：
```json
{
  "type": "res",
  "id": "chat-001",
  "ok": true,
  "payload": {
    "messageId": "msg-67890",
    "sentAt": "2026-04-06T08:00:00.000Z"
  }
}
```

---

### 6.2 渠道状态 — `channels.status`

**请求**：
```json
{
  "type": "req",
  "id": "chat-002",
  "method": "channels.status",
  "params": {}
}
```

**响应**：
```json
{
  "type": "res",
  "id": "chat-002",
  "ok": true,
  "payload": {
    "channels": [
      {
        "channel": "telegram",
        "accountId": "default",
        "status": "connected",
        "connectedAt": "2026-04-01T00:00:00.000Z",
        "lastEventAt": "2026-04-06T07:59:00.000Z"
      },
      {
        "channel": "whatsapp",
        "accountId": "default",
        "status": "disconnected",
        "error": "linked out"
      }
    ]
  }
}
```

---

### 6.3 渠道登录 — `channels.login`

触发渠道的 QR 码登录流程（WhatsApp 等）：

```json
{
  "type": "req",
  "id": "chat-003",
  "method": "channels.login",
  "params": {
    "channel": "whatsapp",
    "accountId": "default"
  }
}
```

---

### 6.4 渠道登出 — `channels.logout`

```json
{
  "type": "req",
  "id": "chat-004",
  "method": "channels.logout",
  "params": {
    "channel": "whatsapp",
    "accountId": "default"
  }
}
```

---

### 6.5 群组绑定列表 — `bindings.list`

查看当前所有的渠道→Agent 路由规则：

```json
{
  "type": "req",
  "id": "bind-001",
  "method": "bindings.list",
  "params": {}
}
```

**响应**：
```json
{
  "type": "res",
  "id": "bind-001",
  "ok": true,
  "payload": {
    "bindings": [
      {
        "agentId": "main",
        "match": {
          "channel": "telegram",
          "accountId": "default"
        },
        "priority": 8
      }
    ]
  }
}
```

---

### 6.6 路由优先级说明

消息命中 Agent 的优先级顺序（数字越小优先级越高）：

```
① peer         (精确 DM/群组 ID)
② parentPeer   (线程继承)
③ guildId + roles (Discord 角色)
④ guildId      (Discord 服务器)
⑤ teamId       (Slack 工作区)
⑥ accountId    (渠道账号)
⑦ channel      (渠道级)
⑧ fallback     (默认 Agent)
```

---

## 七、OpenAI 兼容 HTTP API

> Gateway 在同一端口提供 OpenAI 兼容接口，可被标准 OpenAI SDK 调用。

### 7.1 模型列表

```bash
curl https://<gateway>:18789/v1/models \
  -H "Authorization: Bearer <token>"
```

**响应示例**：
```json
{
  "object": "list",
  "data": [
    { "id": "openclaw", "object": "model", "created": 1700000000 },
    { "id": "openclaw/default", "object": "model", "created": 1700000000 },
    { "id": "openclaw/main", "object": "model", "created": 1700000000 }
  ]
}
```

### 7.2 聊天补全 — `POST /v1/chat/completions`

```bash
curl https://<gateway>:18789/v1/chat/completions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openclaw/main",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "max_tokens": 1000
  }'
```

### 7.3 向量嵌入 — `POST /v1/embeddings`

```bash
curl https://<gateway>:18789/v1/embeddings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openclaw/main",
    "input": "要嵌入的文本内容"
  }'
```

### 7.4 Agent 路由覆盖

默认情况下 `openclaw/main` 使用主 Agent 的模型。要指定其他 Agent，使用 `x-openclaw-agent` 请求头：

```bash
curl https://<gateway>:18789/v1/chat/completions \
  -H "Authorization: Bearer <token>" \
  -H "x-openclaw-agent: coding" \
  -d '{
    "model": "openclaw",
    "messages": [{"role": "user", "content": "写一个快速排序"}]
  }'
```

---

## 八、工具直调 HTTP API

> 不走 Agent 推理，直接调用单个内置工具。

### 8.1 端点

```
POST http://<gateway>:18789/tools/invoke
Authorization: Bearer <token>
Content-Type: application/json
```

### 8.2 请求格式

```json
{
  "tool": "sessions_list",
  "action": "json",
  "args": {},
  "sessionKey": "main",
  "dryRun": false
}
```

**字段说明**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `tool` | string | 工具名称（必填） |
| `action` | string | 工具动作（如 `json`） |
| `args` | object | 工具参数 |
| `sessionKey` | string | 目标会话（默认 main） |
| `dryRun` | boolean | 预留，暂不支持 |

### 8.3 示例：查询会话列表

```bash
curl -X POST http://127.0.0.1:18789/tools/invoke \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "sessions_list",
    "args": {"limit": 10}
  }'
```

### 8.4 安全边界

> ⚠️ **重要**：工具直调 API 等同于 Gateway 操作员全权限。不要将此端点暴露在公网。

- Bearer Token 认证模式下，获得的是完整操作员权限
- 工具可用性受 tool policy 控制（`tools.allow` / `tools.deny`）
- 敏感操作（如 `exec` / `elevated`）需要额外的 exec approval

---

## 九、健康检查 API

Gateway 内置的两个无需认证的探针端点：

### 9.1 存活探针

```bash
curl -fsS http://127.0.0.1:18789/healthz
# 输出: OK
```

### 9.2 就绪探针

```bash
curl -fsS http://127.0.0.1:18789/readyz
# 输出: OK 或包含详细状态的 JSON
```

### 9.3 健康快照（含详情）

```bash
openclaw health --json
# 或通过 WS API:
openclaw status --deep
```

---

## 十、常见错误码

| 错误码 | 说明 | 处理方式 |
|--------|------|---------|
| `AUTH_TOKEN_MISMATCH` | Token 无效或过期 | 重新获取 Token |
| `INVALID_REQUEST` | 请求格式错误 | 检查 JSON 格式和必填字段 |
| `NOT_FOUND` | 资源不存在 | 确认 ID/路径正确 |
| `FORBIDDEN` | 权限不足 | 检查 scopes 配置 |
| `RATE_LIMITED` | 请求过于频繁 | 降低调用频率，配置 `gateway.auth.rateLimit` |
| `GATEWAY_UNAVAILABLE` | Gateway 未启动 | `openclaw gateway start` |

---

## 十一、实际用法示例

### 11.1 通过 CLI 调用（推荐）

```bash
# 列出所有定时任务
openclaw tasks list

# 触发一个任务立即执行
openclaw tasks run weekly-distill --force

# 查看 Gateway 状态
openclaw status --deep

# 强制重启 Gateway
openclaw gateway restart
```

### 11.2 通过 WebSocket 客户端调用

```javascript
// Node.js WebSocket 客户端示例
import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:18789', {
  headers: {
    Authorization: 'Bearer <token>'
  }
});

// 握手
ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'req',
    id: '1',
    method: 'connect',
    params: {
      role: 'operator',
      scopes: ['operator.read', 'operator.write']
    }
  }));

  // 发送请求
  ws.send(JSON.stringify({
    type: 'req',
    id: '2',
    method: 'cron.jobs.list',
    params: {}
  }));
});

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  console.log('收到:', msg.type, msg.id);
});
```

### 11.3 通过 curl 调用 OpenAI 兼容接口

```bash
# 基础聊天
curl -X POST http://127.0.0.1:18789/v1/chat/completions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openclaw/main",
    "messages": [{"role": "user", "content": "我的 Gateway 版本是多少？"}]
  }'
```

---

## 相关资源

- [Gateway 协议详解](./14.2_Read工具路径验证实战.md)
- [Gateway Runbook](/gateway/)
- [OpenAI 兼容 API](/gateway/openai-http-api)
- [健康检查](/gateway/health)
- [工具调用 API](/gateway/tools-invoke-http-api)
- [Sandbox 配置](/gateway/sandboxing)

---

*本教程基于 OpenClaw 官方文档和源码分析，最后更新于 2026-04*
