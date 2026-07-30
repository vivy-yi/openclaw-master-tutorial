# 远程编码会话 (Remote Coding Sessions)

> **版本**: v2026.7.2-beta.3+  
> **功能标识**: Remote Coding Sessions  
> **相关 Issue**: #107670, #107086, #107200  
> **原文出处**: [GitHub PR](https://github.com/openclaw/openclaw)

---

## 一、概述

远程编码会话是 OpenClaw v2026.7.2 最重要的新功能之一，允许用户在云端 Workers 上运行 Control UI 会话，在终端中打开 Codex 和 Claude Code 会话，以及直接恢复 OpenCode 和 Pi 会话。

### 1.1 核心功能

```
┌─────────────────────────────────────────────────────────────────┐
│                    Remote Coding Sessions                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │ Cloud Workers│      │   Gateway    │      │ Host Terminal│ │
│  │  Control UI  │ ←──→ │              │ ←──→ │   Codex/     │ │
│  │   Sessions   │      │              │      │ Claude Code  │ │
│  └──────────────┘      └──────────────┘      └──────────────┘ │
│                                                                  │
│  支持：                                                          │
│  ✅ 云端 Control UI 会话运行                                      │
│  ✅ Codex/Claude Code 终端会话                                   │
│  ✅ OpenCode/Pi 会话直接恢复                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 适用场景

| 场景 | 说明 | 优势 |
|------|------|------|
| **云端开发** | 在云端 Workers 上运行 Heavy 会话 | 节省本地资源 |
| **跨设备工作** | 在不同设备间无缝恢复编码会话 | 随时随地开发 |
| **配对节点开发** | 通过 macOS 配对节点使用原生终端 | 完整终端体验 |
| **团队协作** | 团队成员共享编码环境 | 高效协作 |

---

## 二、架构设计

### 2.1 组件关系

```
                    ┌─────────────────┐
                    │   Cloud Worker  │
                    │  ┌───────────┐  │
                    │  │  Control  │  │
                    │  │     UI    │  │
                    │  └───────────┘  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    Gateway      │
                    │  ┌───────────┐  │
                    │  │  Session  │  │
                    │  │  Manager  │  │
                    │  └───────────┘  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────────┐     │    ┌────────▼────────┐
     │   Paired Node   │     │    │  Local Gateway  │
     │  (macOS/Linux)  │     │    │                 │
     │  ┌───────────┐  │     │    │  ┌───────────┐  │
     │  │  Native   │  │     │    │  │  Native   │  │
     │  │  Terminal │  │     │    │  │  Terminal │  │
     │  │ Codex/Claude│ │    │    │  │   OpenCode │ │
     │  └───────────┘  │     │    │  │   /Pi     │  │
     └─────────────────┘     │    └─────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Host Terminal  │
                    │  Codex/Claude   │
                    │     Code        │
                    └─────────────────┘
```

### 2.2 会话类型

| 类型 | 描述 | 运行位置 |
|------|------|----------|
| **Control UI (Cloud)** | 完整 Web UI | Cloud Workers |
| **Control UI (Local)** | 完整 Web UI | 本地 Gateway |
| **Catalog Terminal** | Codex/Claude Code CLI | Gateway 或 Paired Node |
| **OpenCode Session** | OpenCode 编辑器会话 | 终端 |
| **Pi Session** | Pi 编辑器会话 | 终端 |

---

## 三、配置方法

### 3.1 环境变量

```bash
# 启用远程编码会话
OPENCLAW_REMOTE_CODING_ENABLED=true

# Cloud Worker 配置
OPENCLAW_CLOUD_WORKER_ENABLED=true
OPENCLAW_CLOUD_WORKER_ENDPOINT=https://workers.example.com

# 配对节点配置
OPENCLAW_PAIRED_NODE_ENABLED=true
OPENCLAW_PAIRED_NODE_HOST=pair-node.local
```

### 3.2 Gateway 配置

```yaml
# gateway.yaml
remoteCoding:
  enabled: true
  cloudWorkers:
    enabled: true
    endpoint: https://workers.example.com
    authToken: your-worker-token
  pairedNodes:
    enabled: true
    autoDiscovery: true
  catalogTerminals:
    preferredHost: auto  # auto, gateway, paired-node
    validationRequired: true
```

### 3.3 终端会话配置

```yaml
# terminal.yaml
catalog:
  opencode:
    resumeCommand: "opencode session resume {session-id}"
    streamOutput: true
  pi:
    resumeCommand: "pi session resume {session-id}"
    interactivePTY: true
  claude:
    resumeCommand: "claude Code session resume {session-id}"
    catalogEnabled: true
  codex:
    resumeCommand: "codex session resume {session-id}"
```

---

## 四、使用指南

### 4.1 创建云端 Control UI 会话

```bash
# 方法一：通过 CLI 创建
openclaw session create --type control-ui --location cloud

# 方法二：通过 Gateway API
curl -X POST https://gateway.example.com:18789/api/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"type": "control-ui", "location": "cloud"}'

# 方法三：通过 Control UI
# Settings → Sessions → New Cloud Session
```

### 4.2 打开 Catalog 终端会话

```bash
# 在 Control UI 中打开终端
# 1. 打开 Control UI
# 2. 选择支持 Catalog 的会话
# 3. 点击 "Open in Terminal" 按钮

# CLI 命令
openclaw catalog open --session-id abc123 --terminal native

# 直接在终端中恢复
openclaw session resume --terminal --session-id abc123
```

### 4.3 配对节点终端

**macOS 配对节点配置**：

```bash
# 1. 配对 macOS 节点
openclaw node pair --host macbook.local --type macos

# 2. 验证配对
openclaw node list

# 预期输出：
# ┌──────┬──────────────┬─────────┬────────┐
# │ Node │    Host      │  Type   │ Status │
# ├──────┼──────────────┼─────────┼────────┤
# │  1   │ macbook.local│ macOS   │  ✅    │
# └──────┴──────────────┴─────────┴────────┘

# 3. 在配对节点上打开终端会话
openclaw terminal open --node macbook.local --type codex
```

### 4.4 会话恢复

```bash
# 恢复 OpenCode 会话
opencode session resume <session-id>

# 恢复 Pi 会话
pi session resume <session-id>

# 列出可用会话
openclaw session list --type catalog

# 查看会话状态
openclaw session status <session-id>
```

---

## 五、macOS 配对节点特性

### 5.1 原生终端集成

v2026.7.2-beta.3 对 macOS 配对节点进行了重大改进：

```
┌─────────────────────────────────────────────────────────────┐
│          macOS Paired Node Terminal Features                 │
├─────────────────────────────────────────────────────────────┤
│  ✅ 双向 Codex 和 Claude 终端恢复命令                        │
│  ✅ 交互式输入转发                                           │
│  ✅ 取消操作支持                                             │
│  ✅ 原生应用桥接                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 交互式输入处理

```bash
# 输入转发测试
openclaw terminal test --node macbook.local --input "echo 'hello'"

# 取消操作测试
openclaw terminal test --node macbook.local --cancel
```

### 5.3 原生 PTY 中继

```yaml
# PTY 配置
terminal:
  pty:
    relay:
      enabled: true
      type: native  # native, websocket
    inputBuffer: 8192
    outputBuffer: 16384
```

---

## 六、安全考虑

### 6.1 认证与授权

| 层面 | 安全措施 |
|------|---------|
| **传输层** | TLS 1.3 加密 |
| **API 层** | Bearer Token 认证 |
| **会话层** | Session ID + 临时密钥 |
| **终端层** | PTY 隔离 |

### 6.2 云端会话隔离

```yaml
# 云端 Worker 隔离配置
cloudWorker:
  isolation:
    networkIsolation: true
    filesystemIsolation: true
    processIsolation: true
  resourceLimits:
    cpuLimit: 4
    memoryLimit: 8GB
    diskLimit: 50GB
```

### 6.3 配对节点安全

```bash
# 配对节点安全检查
openclaw node security-check macbook.local

# 验证结果
# - Node Certificate: ✅ Valid
# - Host Key: ✅ Valid
# - TLS Version: ✅ 1.3
# - Session Encryption: ✅ Enabled
```

---

## 七、故障排查

### 7.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 无法连接到 Cloud Worker | 网络问题或端点错误 | 检查 `CLOUD_WORKER_ENDPOINT` |
| 终端会话启动失败 | 会话 ID 无效 | 使用 `session list` 查看可用会话 |
| PTY 连接断开 | 网络不稳定 | 启用自动重连 |
| 配对节点离线 | 节点服务未启动 | 重启节点服务 |

### 7.2 日志诊断

```bash
# 查看远程编码相关日志
tail -f ~/.openclaw/logs/gateway.log | grep -E "(remote-coding|catalog|worker)"

# Cloud Worker 日志
openclaw worker logs --session-id abc123

# 终端会话日志
openclaw terminal logs --session-id abc123 --level debug
```

### 7.3 网络诊断

```bash
# 测试 Cloud Worker 连接
openclaw network test --endpoint $CLOUD_WORKER_ENDPOINT

# 测试配对节点连接
openclaw node ping macbook.local

# 查看会话路由
openclaw session trace --session-id abc123
```

---

## 八、性能优化

### 8.1 带宽优化

```yaml
# 终端输出压缩
terminal:
  compression:
    enabled: true
    algorithm: zstd
    level: 3
  streaming:
    batchSize: 1024
    flushInterval: 50ms
```

### 8.2 会话放置策略

```yaml
# 智能会话放置
placement:
  strategy: weighted  # nearest, weighted, cost-optimal
  weights:
    cloudWorker: 0.3
    localGateway: 0.5
    pairedNode: 0.2
```

### 8.3 资源调度

```bash
# 查看 Worker 状态
openclaw worker status

# 手动调度会话到特定 Worker
openclaw session migrate --session-id abc123 --to worker-2
```

---

## 九、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v2026.7.2-beta.3 | 2026-07-18 | 初始发布远程编码会话 |
| - | - | Cloud Workers 支持 |
| - | - | macOS 配对节点终端 |
| - | - | Catalog 终端会话 |
| - | - | OpenCode/Pi 会话恢复 |

---

## 十、相关文档

| 文档 | 说明 |
|------|------|
| [架构总览](./architecture-overview.md) | OpenClaw 核心架构 |
| [Cloud Workers](./cloud-workers.md) | 云端工作空间 (待创建) |
| [Agent Loop](../core/agent-loop.md) | Agent 执行循环 |
| [配对节点编码](./paired-node-coding.md) | 配对节点开发 (待创建) |

---

*本文档由 墨客-生成审核发布 自动生成*  
*数据来源: v2026.7.2-beta.3 Release Notes*  
*生成时间: 2026-07-24*
