# OpenClaw Docker 部署 Agent 原理与架构

> 本教程深入剖析 OpenClaw 在 Docker 环境下的 Agent 运行机制，涵盖架构原理、容器布局、沙箱隔离、多 Agent 路由和完整部署流程。

## 一、整体架构

```
┌──────────────────────────────────────────────────────────────┐
│                     用户设备 / VPS                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Docker Gateway 容器                      │  │
│  │  ┌────────────────┐  ┌─────────────────────────────┐ │  │
│  │  │  Gateway 进程   │  │  Agent Runtime (Pi Core)   │ │  │
│  │  │  ws://:18789  │  │  ┌─────────────────────┐  │ │  │
│  │  │  - WS Server  │  │  │  Agent Loop         │  │ │  │
│  │  │  - 消息路由   │  │  │  - Context Assembly │  │ │  │
│  │  │  - 渠道接入   │  │  │  - Model Inference  │  │ │  │
│  │  │  - 定时任务   │  │  │  - Tool Execution   │  │ │  │
│  │  └────────────────┘  │  └─────────────────────┘  │ │  │
│  │                      └─────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                              ↑                             │
│           /home/node/.openclaw (Host Volume Mount)         │
│                              ↑                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Host 文件系统                                        │  │
│  │  ├── .openclaw/          # 配置、凭证、会话           │  │
│  │  ├── workspace/          # Agent 工作目录             │  │
│  │  └── skills/             # 共享 Skills               │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**核心要点**：
- Gateway 和 Agent Runtime 运行在**同一个容器**内（默认模式）
- 容器外是 Host 文件系统，通过 Volume Mount 持久化所有状态
- Agent Sandbox（沙箱）在 Docker 模式下是一个**独立容器**，与 Gateway 容器隔离

---

## 二、Gateway 组件详解

Gateway 是 OpenClaw 的核心守护进程。

### 2.1 核心职责

| 职责 | 说明 |
|------|------|
| **WS Server** | 监听 `ws://0.0.0.0:18789`，接受客户端连接 |
| **消息路由** | 将 inbound 消息路由到对应 Agent（通过 Bindings） |
| **渠道管理** | 维护 WhatsApp/Telegram/Discord 等渠道的长连接 |
| **Agent 生命周期** | 创建/管理 Agent Loop 的运行和排队 |
| **定时任务** | 执行 Cron 任务的调度和触发 |
| **设备配对** | 管理 macOS/iOS/Android 设备的配对和授权 |

### 2.2 WebSocket 协议流程

```
Client → Gateway: req:connect (握手)
Gateway → Client: res (ok) + hello-ok snapshot

Client → Gateway: req:agent { sessionKey, message }
Gateway → Client: res:agent { runId, status: "accepted" }  ← 即时返回
Gateway → Client: event:agent (streaming deltas)            ← 流式事件
Gateway → Client: res:agent { runId, status, summary }      ← 最终响应
```

### 2.3 健康检查端点

容器内可直接访问（无需认证）：
```bash
curl -fsS http://127.0.0.1:18789/healthz   # 存活探针
curl -fsS http://127.0.0.1:18789/readyz     # 就绪探针
```

---

## 三、Agent Loop 完整流程

Agent Loop 是 Agent 执行一次完整任务的核心引擎。

### 3.1 流程图

```
inbound message
      ↓
① Session 解析与加载
   - 解析 sessionKey / sessionId
   - 加载会话历史 (JSONL)
   - 解析 workspace 路径
      ↓
② Context 装配
   - 构建 system prompt
   - 注入 bootstrap 文件 (AGENTS.md/SOUL.md/TOOLS.md 等)
   - 加载 skills snapshot
   - 应用 tool policy
      ↓
③ 模型推理 (runEmbeddedPiAgent)
   - 模型解析 (provider/model)
   - Token 限制与 compaction
   - LLM 调用
      ↓
④ 工具执行
   - exec / read / write / edit 等内置工具
   - 沙箱化执行（如果启用）
   - 工具结果写入 session transcript
      ↓
⑤ 流式输出
   - assistant delta 实时推送
   - tool start/update/end 事件
   - 块流式发送 (可选)
      ↓
⑥ 持久化
   - session transcript 写入 JSONL
   - compaction 触发（如果超过 token 限制）
      ↓
output → 渠道回复
```

### 3.2 关键配置文件加载顺序

```
workspace/
├── AGENTS.md     ← Operating instructions + memory（每次必读）
├── SOUL.md       ← Persona, boundaries, tone
├── TOOLS.md      ← User-maintained tool notes
├── IDENTITY.md   ← Agent name/vibe/emoji
├── USER.md       ← User profile
└── BOOTSTRAP.md  ← First-run ritual（仅全新 workspace 时）
```

**Bootstrap 注入时机**：每个新 Session 的第一次 turn，文件内容直接注入 agent context。

---

## 四、Docker 部署模式

### 4.1 两种 Docker 模式

| 模式 | Gateway 位置 | Agent 工具执行 | 适用场景 |
|------|-------------|--------------|---------|
| **Gateway in Docker** | 容器内 | Host（默认） | 生产部署 |
| **Full Sandbox** | 容器内 | 独立沙箱容器 | 高安全隔离 |

### 4.2 镜像构建与启动

```bash
# 方式一：构建本地镜像
./scripts/docker/setup.sh

# 方式二：使用预构建镜像
export OPENCLAW_IMAGE="ghcr.io/openclaw/openclaw:latest"
./scripts/docker/setup.sh
```

### 4.3 环境变量参考

| 变量 | 用途 |
|------|------|
| `OPENCLAW_IMAGE` | 使用远程镜像而非本地构建 |
| `OPENCLAW_SANDBOX=1` | 启用 Agent 沙箱 |
| `OPENCLAW_HOME_VOLUME` | 持久化 `/home/node` 的 Docker Volume |
| `OPENCLAW_EXTRA_MOUNTS` | 额外绑定挂载（逗号分隔） |
| `OPENCLAW_DOCKER_SOCKET` | 指定 Docker socket 路径 |

### 4.4 存储与持久化

```
Host                           Container
─────────────────────────────  ─────────────────────
~/.openclaw/                   →  /home/node/.openclaw/
~/.openclaw/workspace/         →  /home/node/.openclaw/workspace/
~/.openclaw/skills/            →  /home/node/.openclaw/skills/
```

### 4.5 磁盘增长监控

定期检查这些目录：`media/`、`session JSONL 文件`、`cron/runs/*.jsonl`、`/tmp/openclaw/` 滚动日志。

---

## 五、Agent Sandbox 机制（沙箱隔离）

### 5.1 核心概念

```
┌─────────────────────────────────────────────┐
│  Gateway 容器 (Host)                        │
│  ├── Gateway 进程                           │
│  ├── Agent Runtime (Pi Core)               │
│  └── exec/read/write 工具调用               │
└──────────────────────┬──────────────────────┘
                       │ 当 sandbox 启用时
                       ↓
┌─────────────────────────────────────────────┐
│  Sandbox 容器 (独立 Docker)                  │
│  ├── 工具执行 (exec/read/write)            │
│  ├── 独立文件系统 (/workspace)             │
│  └── 无网络（默认）或受限网络              │
└─────────────────────────────────────────────┘
```

### 5.2 沙箱模式与作用域

| mode | 说明 | scope | 说明 |
|------|------|-------|------|
| `"off"` | 不启用沙箱 | `"agent"`（默认） | 每 Agent 一个容器 |
| `"non-main"`（默认） | 仅非主 Session 沙箱 | `"session"` | 每 Session 一个容器 |
| `"all"` | 所有 Session 沙箱 | `"shared"` | 共享一个容器 |

### 5.3 工作区访问权限

| workspaceAccess | 说明 |
|-----------------|------|
| `"none"`（默认） | 只能看到沙箱内 `/workspace` |
| `"ro"` | 只读挂载 Host Workspace 到 `/agent` |
| `"rw"` | 读写挂载 Host Workspace 到 `/workspace` |

### 5.4 沙箱镜像

```bash
# 默认沙箱镜像（无 Node）
scripts/sandbox-setup.sh

# 包含常用工具的镜像
scripts/sandbox-common-setup.sh

# 沙箱浏览器镜像
scripts/sandbox-browser-setup.sh
```

### 5.5 快速启用沙箱

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",
        scope: "agent",
        workspaceAccess: "none"
      }
    }
  }
}
```

---

## 六、多 Agent 路由机制

### 6.1 Agent 结构

每个 Agent 完全隔离：
- **Workspace** — 文件、AGENTS.md、SOUL.md
- **agentDir** — 认证文件、模型注册表
- **sessions/** — 会话历史 (JSONL)

### 6.2 Bindings 路由优先级

```
① peer (精确 DM/群组 ID)
② parentPeer (线程继承)
③ guildId + roles (Discord)
④ guildId
⑤ teamId (Slack)
⑥ accountId (频道账号)
⑦ channel (频道级)
⑧ fallback (默认 Agent)
```

### 6.3 多 Agent 多渠道配置示例

```json5
{
  agents: {
    list: [
      { id: "main", workspace: "~/.openclaw/workspace-main" },
      { id: "coding", workspace: "~/.openclaw/workspace-coding" },
    ]
  },
  bindings: [
    { agentId: "main", match: { channel: "discord", accountId: "default" } },
    { agentId: "coding", match: { channel: "discord", accountId: "coding" } },
    { agentId: "main", match: { channel: "telegram" } },
  ]
}
```

### 6.4 认证隔离

每个 Agent 凭证独立存储：
```
~/.openclaw/agents/main/agent/auth-profiles.json
~/.openclaw/agents/coding/agent/auth-profiles.json
```
不要跨 Agent 共享 `agentDir`。

---

## 七、完整 Docker 部署流程

### 7.1 前期准备

```bash
docker --version
docker compose version
# 至少 2GB RAM（否则 pnpm install 会 OOM）
```

### 7.2 一键部署

```bash
./scripts/docker/setup.sh
```

**setup.sh 自动完成**：
1. 构建镜像（本地或拉取预构建）
2. 运行 onboarding（API Key 配置）
3. 生成 Gateway Token
4. 写入 `.env`
5. 启动 `docker compose up -d`

### 7.3 手动分步部署

```bash
# 1. 构建镜像
docker build -t openclaw:local -f Dockerfile .

# 2. 初始化
docker compose run --rm --no-deps --entrypoint node openclaw-gateway \
  dist/index.js onboard --mode local --no-install-daemon

# 3. 配置
docker compose run --rm --no-deps --entrypoint node openclaw-gateway \
  dist/index.js config set gateway.mode local
docker compose run --rm --no-deps --entrypoint node openclaw-gateway \
  dist/index.js config set gateway.bind lan

# 4. 启动
docker compose up -d openclaw-gateway
```

### 7.4 配置渠道

```bash
# WhatsApp QR 登录
docker compose run --rm openclaw-cli channels login

# Telegram
docker compose run --rm openclaw-cli channels add \
  --channel telegram --token "<bot-token>"
```

### 7.5 访问 Control UI

`http://127.0.0.1:18789/`

```bash
docker compose run --rm openclaw-cli dashboard --no-open
```

---

## 八、VPS 云端部署要点

### 8.1 二进制 Bake 规范

**禁止运行时安装**，所有依赖必须在 Dockerfile 构建时安装：

```dockerfile
FROM node:24-bookworm
RUN apt-get update && apt-get install -y socat git curl && rm -rf /var/lib/apt/lists/*
RUN curl -L https://github.com/.../tool.tar.gz | tar -xz -C /usr/local/bin
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . . && pnpm build && pnpm ui:build
CMD ["node", "dist/index.js"]
```

### 8.2 更新流程

```bash
git pull && docker compose build && docker compose up -d
```

---

## 九、安全加固

- [ ] 工具策略 per-agent：`allow` / `deny`
- [ ] 高风险 Agent 强制沙箱：`mode: "all"`, `workspaceAccess: "none"`
- [ ] 敏感挂载使用 `:ro`（只读）
- [ ] 丢弃 `NET_RAW` / `NET_ADMIN` capability
- [ ] 定期检查 `media/` 和日志目录大小

---

## 十、故障排查

| 问题 | 原因 | 解决 |
|------|------|------|
| `exit 137` OOM | RAM < 2GB | 增加 VM 内存 |
| Permission Error | Host 挂载 owner ≠ 1000 | `sudo chown -R 1000:1000 /path` |
| 沙箱容器未启动 | 未 build 沙箱镜像 | `scripts/sandbox-setup.sh` |
| Control UI Unauthorized | 设备未配对 | `openclaw-cli devices list` + `approve` |

---

## 相关资源

- [Docker 官方文档](/install/docker)
- [Sandboxing 详解](/gateway/sandboxing)
- [Multi-Agent 路由](/concepts/multi-agent)
- [Agent Loop 详解](/concepts/agent-loop)
- [多渠道集成](../05_渠道集成/README.md)

---

*本教程基于 OpenClaw 官方文档和源码分析编写，最后更新于 2026-04*
