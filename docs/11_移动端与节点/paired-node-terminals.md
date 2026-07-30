# Paired-Node Terminals 完整教程

> 本文档已通过墨客-内容审核 ⭐⭐⭐⭐ (P2)
> 版本: v2026.6.0+

---

## 概述

Paired-Node Terminals 是 OpenClaw 的终端能力扩展功能，允许通过配对的移动设备（Android/iOS）远程访问和控制终端会话。此功能特别适用于需要移动办公、远程服务器管理或现场技术支持场景。

---

## 功能特性

| 特性 | 说明 |
|------|------|
| 远程终端访问 | 通过移动设备访问远程服务器终端 |
| 实时会话同步 | 终端会话状态实时同步 |
| 多设备支持 | 支持同时连接多个配对设备 |
| 语音唤醒 | Android 设备支持 Foreground Voice Wake |
| 安全配对 | 基于端到端加密的设备配对机制 |

---

## 系统要求

### 移动端要求

| 平台 | 版本要求 | 特殊要求 |
|------|----------|----------|
| Android | v2026.6.0+ | 无 |
| iOS | v2026.6.0+ | 无 |

### 主机要求

- OpenClaw Gateway v2026.6.0+
- Node 连接配置启用
- 网络可达性配置完成

---

## 快速开始

### 1. 配对移动设备

```bash
# 在主机上启动配对模式
openclaw nodes pairing start

# 输出示例
Node Pairing Mode Started
Waiting for device connections...
Pairing Code: ABC123XY
QR Code:
┌─────────────┐
│ ▓▓▓▓▓▓▓▓▓▓ │
│ ▓ ▓▓▓▓▓▓ ▓ │
│ ▓ ▓▓▓▓▓▓ ▓ │
│ ▓▓▓▓▓▓▓▓▓▓ │
└─────────────┘
```

### 2. 移动端配对

1. 打开 OpenClaw App
2. 进入「节点」→「添加设备」
3. 扫描 QR 码或输入配对码
4. 等待配对完成

### 3. 启动终端会话

```bash
# 方式1: 通过 CLI 启动
openclaw nodes terminal start node-1

# 方式2: 通过 Web UI 启动
# 访问 http://gateway:18789/nodes
# 选择设备 → 点击「启动终端」
```

---

## 高级配置

### 网络配置

```bash
# 配置外部访问地址
openclaw config set nodes.externalAddress "your-public-ip:18789"

# 配置反向代理 (Nginx)
location /nodes {
    proxy_pass http://localhost:18789;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### 安全配置

```bash
# 启用 TLS
openclaw config set nodes.tls.enabled true
openclaw config set nodes.tls.cert "/path/to/cert.pem"
openclaw config set nodes.tls.key "/path/to/key.pem"

# 限制允许的设备
openclaw config set nodes.allowedDevices ["device-id-1", "device-id-2"]
```

### 权限配置

```bash
# 配置设备权限
openclaw nodes permissions device-id-1 \
    --terminal=true \
    --file-transfer=false \
    --voice-wake=false
```

---

## 语音唤醒 (Android)

### 功能说明

Android 设备支持 Foreground Voice Wake 功能，可以在后台持续监听语音命令。

### 启用语音唤醒

```bash
# 在 Android 设备上启用
openclaw voice-wake enable

# 配置唤醒词
openclaw voice-wake set-trigger "Hey OpenClaw"

# 测试唤醒
openclaw voice-wake test
```

### 使用示例

```
用户: "Hey OpenClaw, check server status"
OpenClaw: [通过语音回应] "Server CPU: 45%, Memory: 62%, All services running"
```

---

## 终端操作

### 基本命令

| 命令 | 说明 |
|------|------|
| `openclaw nodes terminal list` | 列出所有终端会话 |
| `openclaw nodes terminal attach <id>` | 连接到指定会话 |
| `openclaw nodes terminal send <id> <cmd>` | 发送命令到会话 |
| `openclaw nodes terminal kill <id>` | 终止会话 |

### 交互式操作

```bash
# 启动交互式会话
openclaw nodes terminal interactive node-1

# 支持的命令 (在交互会话中)
help          - 显示帮助
sync          - 同步终端状态
screenshot    - 获取当前屏幕截图
exit          - 退出会话
```

---

## 文件传输

### 上传文件到主机

```bash
# 从移动设备上传
openclaw nodes file upload /local/path/file.txt /remote/path/

# 从主机下载
openclaw nodes file download node-1:/remote/path/file.txt /local/path/
```

### 限制说明

| 项目 | 限制 |
|------|------|
| 单文件大小 | 100 MB |
| 并发传输 | 3 个 |
| 存储配额 | 1 GB/设备 |

---

## 故障排除

### 问题: 配对失败

**检查项:**

1. 确认网络连通性
   ```bash
   ping gateway-host
   ```

2. 检查端口开放
   ```bash
   nc -zv gateway-host 18789
   ```

3. 查看配对日志
   ```bash
   openclaw nodes pairing logs
   ```

### 问题: 终端无响应

**解决步骤:**

```bash
# 1. 重启终端服务
openclaw nodes terminal restart node-1

# 2. 清除缓存
openclaw nodes terminal clear-cache node-1

# 3. 重新连接
openclaw nodes terminal attach node-1
```

### 问题: 语音唤醒不工作

**检查音频权限:**
```bash
# Android
adb shell dumpsys audio | grep "Voice Wake"

# 确认麦克风权限
adb shell pm dump <package> | grep "RECORD_AUDIO"
```

---

## 性能优化

### 推荐配置

```bash
# 终端刷新率 (毫秒)
openclaw config set nodes.terminal.refreshRate 100

# 缓冲区大小
openclaw config set nodes.terminal.bufferSize 8192

# 连接超时 (秒)
openclaw config set nodes.terminal.timeout 30
```

### 资源限制

| 资源 | 限制 |
|------|------|
| 并发终端 | 10 |
| 每终端历史 | 10000 行 |
| 最大并发设备 | 20 |

---

## 相关链接

- [节点管理指南](./node-management.md)
- [Android Voice Wake](./android-voice-wake.md)
- [安全配置](../16_安全配置/security-hardening.md)

---

*文档更新时间: 2026-07-30*
*🦉 教程大师 - OpenClaw 官方教程*
