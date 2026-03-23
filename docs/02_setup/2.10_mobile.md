# 2.10 手机端部署与连接

## 本节目标
- 掌握 iOS 节点连接
- 掌握 Android 节点连接
- 理解移动端功能
- 完成移动端配对

---

## 2.10.1 移动端概述

### 支持的功能

```
┌─────────────────────────────────────────────────────────────┐
│                    移动端功能概览                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 iOS 节点                                                │
│  ├── Canvas 渲染                                            │
│  ├── 屏幕截图                                               │
│  ├── 摄像头拍摄                                             │
│  ├── 定位服务                                               │
│  ├── 语音对话                                               │
│  └── 推送通知                                               │
│                                                              │
│  🤖 Android 节点                                           │
│  ├── Canvas 渲染                                            │
│  ├── 摄像头拍摄                                             │
│  ├── 屏幕截图                                               │
│  ├── 联系人                                                 │
│  ├── 日历                                                   │
│  ├── 通话记录                                               │
│  └── 通知管理                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 工作原理

```
┌──────────────┐          ┌──────────────────┐
│   iOS 节点   │ ──────→  │                  │
│  Android 节点│          │    Gateway       │
│              │ ←─────── │  (macOS/Linux)   │
└──────────────┘   WebSocket   └──────────────────┘
```

移动端作为 "节点" 连接到 Gateway，通过 WebSocket 通信。

---

## 2.10.2 iOS 部署

### 前置要求

- Gateway 运行在其他设备上（macOS/Linux/Windows via WSL2）
- 网络可达（局域网或 Tailnet）

### 快速配对步骤

#### 步骤一：启动 Gateway

在运行 Gateway 的机器上：

```bash
openclaw gateway --port 18789
```

#### 步骤二：iOS 端配对

1. 打开 iOS App
2. 进入 **Settings**
3. 选择发现的 Gateway（局域网自动发现）
4. 或启用 **Manual Host** 输入主机和端口

#### 步骤三：批准配对

在 Gateway 机器上：

```bash
# 列出设备
openclaw devices list

# 批准设备
openclaw devices approve <requestId>
```

#### 步骤四：验证连接

```bash
# 查看节点状态
openclaw nodes status

# 调用节点列表
openclaw gateway call node.list --params "{}"
```

### iOS 配置流程图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           iOS 节点配置流程                                       │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    开始
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  1. 启动 Gateway     │
                          │  openclaw gateway    │
                          │      --port 18789   │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  2. iOS App 连接    │
                          │  ┌───────────────┐  │
                          │  │ • 自动发现    │  │
                          │  │ • 手动输入    │  │
                          │  └───────────────┘  │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  3. 等待配对请求     │
                          │  Gateway 端显示      │
                          │  配对请求            │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  4. 批准配对          │
                          │  openclaw devices    │
                          │  approve <requestId> │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  5. 验证连接          │
                          │  openclaw nodes      │
                          │      status          │
                          └───────────┬───────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   连接成功 ✅   │
                              └───────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                         iOS 配对命令速查                                       │
├──────────────────┬──────────────────────────────────────────────────────────────┤
│ 命令              │ 用途                                                        │
├──────────────────┼──────────────────────────────────────────────────────────────┤
│ devices list     │ 查看配对请求                                                │
│ devices approve  │ 批准设备                                                    │
│ nodes status     │ 查看节点状态                                                │
│ nodes invoke     │ 调用节点命令                                                │
└──────────────────┴──────────────────────────────────────────────────────────────┘
```

---

### iOS Canvas 使用

#### 导航到 Canvas

```bash
openclaw nodes invoke \
  --node "iOS Node" \
  --command canvas.navigate \
  --params '{"url":"http://<gateway-host>:18789/__openclaw__/canvas/"}'
```

#### 执行 JavaScript

```bash
openclaw nodes invoke \
  --node "iOS Node" \
  --command canvas.eval \
  --params '{"javaScript":"(() => { const {ctx} = window.__openclaw; ctx.clearRect(0,0,innerWidth,innerHeight); ctx.fillStyle=\"#ff2d55\"; ctx.fillRect(10,10,100,100); return \"ok\"; })()"}'
```

#### 截图

```bash
openclaw nodes invoke \
  --node "iOS Node" \
  --command canvas.snapshot \
  --params '{"maxWidth":900,"format":"jpeg"}'
```

---

### iOS 推送配置

#### 官方构建

官方发布的 iOS App 使用中继推送：

```json
{
  "gateway": {
    "push": {
      "apns": {
        "relay": {
          "baseUrl": "https://relay.example.com"
        }
      }
    }
  }
}
```

#### 本地构建

本地构建需要直接 APNs 凭据：

```bash
export OPENCLAW_APNS_TEAM_ID="TEAMID"
export OPENCLAW_APNS_KEY_ID="KEYID"
export OPENCLAW_APNS_PRIVATE_KEY_P8="$(cat /path/to/AuthKey_KEYID.p8)"
```

---

### iOS 常见问题

| 错误 | 解决方法 |
|-----|---------|
| `NODE_BACKGROUND_UNAVAILABLE` | 将 App 切换到前台 |
| `A2UI_HOST_NOT_CONFIGURED` | 配置 Gateway canvasHost |
| 配对提示不出现 | 手动执行 `openclaw devices list` |
| 重连失败 | 重新配对节点 |

---

## 2.10.3 Android 部署

### 前置要求

- Gateway 运行在 macOS/Linux/Windows via WSL2
- Android 设备可访问 Gateway

### 快速配对步骤

#### 步骤一：启动 Gateway

```bash
openclaw gateway --port 18789 --verbose
```

确认日志显示：

```
listening on ws://0.0.0.0:18789
```

#### 步骤二：配置 Gateway（Tailnet 模式）

如果跨网络使用 Tailscale：

```json
{
  "gateway": {
    "bind": "tailnet"
  }
}
```

然后重启 Gateway。

#### 步骤三：Android 端配对

1. 打开 Android App
2. 进入 **Connect** 标签
3. 使用 **Setup Code** 或 **Manual** 模式
4. 发现被阻止时，使用手动输入

#### 步骤四：批准配对

```bash
openclaw devices list
openclaw devices approve <requestId>
```

#### 步骤五：验证连接

```bash
# 方法一
openclaw nodes status

# 方法二
openclaw gateway call node.list --params "{}"
```

### Android 配置流程图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          Android 节点配置流程                                    │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    开始
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  1. 启动 Gateway    │
                          │  openclaw gateway   │
                          │  --port 18789       │
                          │  --verbose          │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  2. 可选：配置       │
                          │     Tailscale         │
                          │  "bind": "tailnet"   │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  3. Android App 连接  │
                          │  ┌───────────────┐    │
                          │  │ • Setup Code  │    │
                          │  │ • Manual      │    │
                          │  └───────────────┘    │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  4. 等待配对请求     │
                          │  Gateway 端显示      │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  5. 批准配对          │
                          │  openclaw devices    │
                          │  approve <requestId> │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  6. 验证连接          │
                          │  openclaw nodes      │
                          │      status          │
                          └───────────┬───────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   连接成功 ✅   │
                              └───────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                       Android 高级功能对应命令                                   │
├──────────────────────┬────────────────────────────────────────────────────────────┤
│ 功能                  │ 命令                                                      │
├──────────────────────┼────────────────────────────────────────────────────────────┤
│ Canvas 渲染          │ canvas.navigate / canvas.eval / canvas.snapshot         │
│ 摄像头               │ camera.snap (拍照) / camera.clip (录像)                 │
│ 联系人               │ contacts.search / contacts.add                          │
│ 日历                 │ calendar.events / calendar.add                         │
│ 通知                 │ notifications.list                                     │
└──────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### Android Canvas 使用

#### 基础导航

```bash
# 局域网访问
openclaw nodes invoke \
  --node "<Android Node>" \
  --command canvas.navigate \
  --params '{"url":"http://<gateway-hostname>.local:18789/__openclaw__/canvas/"}'

# Tailnet 访问
openclaw nodes invoke \
  --node "<Android Node>" \
  --command canvas.navigate \
  --params '{"url":"http://<gateway-magicdns>:18789/__openclaw__/canvas/"}'
```

#### Canvas 命令

```bash
# 导航
canvas.navigate {"url":""}  # 返回默认脚手架

# 执行 JS
canvas.eval {"javaScript":"..."}

# 截图
canvas.snapshot {"maxWidth":900,"format":"jpeg"}

# A2UI
canvas.a2ui.push {"content": "..."}
canvas.a2ui.reset {}
```

---

### Android 摄像头

```bash
# 拍照
openclaw nodes invoke \
  --node "<Android Node>" \
  --command camera.snap \
  --params '{}'

# 录像
openclaw nodes invoke \
  --node "<Android Node>" \
  --command camera.clip \
  --params '{"maxSeconds":30}'
```

> **注意**：需要前台运行，背景会被暂停

---

### Android 高级功能

#### 联系人

```bash
# 搜索联系人
openclaw nodes invoke --node "<Android Node>" --command contacts.search --params '{"query":"张三"}'

# 添加联系人
openclaw nodes invoke --node "<Android Node>" --command contacts.add --params '{"name":"李四","phone":"13800138000"}'
```

#### 日历

```bash
# 查询事件
openclaw nodes invoke --node "<Android Node>" --command calendar.events --params '{"days":7}'

# 添加事件
openclaw nodes invoke --node "<Android Node>" --command calendar.add --params '{"title":"会议","startTime":"2024-01-01T10:00:00Z"}'
```

#### 通知

```bash
# 列出通知
openclaw nodes invoke --node "<Android Node>" --command notifications.list --params '{}'
```

---

## 2.10.4 跨网络连接（Tailscale）

### 场景

移动设备在外部网络，需要访问家庭/服务器上的 Gateway。

### 方案：Tailscale

```
┌──────────────┐              ┌──────────────┐
│   手机       │ ─ ─ ─ ─ ─ →  │   Gateway    │
│  (Tailscale) │   Tailnet    │  (Tailscale) │
└──────────────┘              └──────────────┘
```

### 配置步骤

#### 步骤一：安装 Tailscale

**Gateway 端**：

```bash
# Linux
curl -fsSL https://tailscale.com/install.sh | sh

# macOS
brew install tailscale

# Docker
# 在容器内安装或使用 host 网络
```

**移动端**：

从 App Store/Play Store 安装 Tailscale

#### 步骤二：登录

```bash
# Gateway
tailscale up

# 移动端
# 打开 App 登录同一账号
```

#### 步骤三：配置 Gateway

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "gateway": {
    "bind": "tailnet",
    "port": 18789
  }
}
```

重启 Gateway：

```bash
# 如果使用服务
sudo systemctl restart openclaw

# 或手动
openclaw gateway --port 18789 --bind tailnet
```

#### 步骤四：获取 Tailscale IP

```bash
# Gateway 机器
tailscale ip -4
```

#### 步骤五：移动端连接

在移动端 App 中使用 Tailscale IP 连接：

```
Host: <tailscale-ip>
Port: 18789
```

### 跨网络连接流程图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        跨网络连接配置流程（Tailscale）                           │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    开始
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  1. 安装 Tailscale   │
                          │  ┌───────────────┐  │
                          │  │ Gateway 端    │  │
                          │  │ curl -fsSL   │  │
                          │  │ tailscale.com │  │
                          │  │ /install.sh  │  │
                          │  └───────────────┘  │
                          │  ┌───────────────┐  │
                          │  │ 移动端        │  │
                          │  │ App Store/   │  │
                          │  │ Play Store   │  │
                          │  └───────────────┘  │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  2. 登录同一账号     │
                          │  ┌───────────────┐   │
                          │  │ Gateway:     │   │
                          │  │ tailscale up│   │
                          │  │              │   │
                          │  │ 移动端:     │   │
                          │  │ 打开 App    │   │
                          │  │ 登录        │   │
                          │  └───────────────┘   │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  3. 配置 Gateway    │
                          │  openclaw.json:     │
                          │  {                 │
                          │    "gateway": {   │
                          │      "bind":      │
                          │        "tailnet", │
                          │      "port": 18789│
                          │    }              │
                          │  }                 │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  4. 重启 Gateway     │
                          │  openclaw gateway   │
                          │  --port 18789       │
                          │  --bind tailnet     │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  5. 获取 Tailscale IP│
                          │  tailscale ip -4    │
                          │  例: 100.xx.xx.xx   │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  6. 移动端连接        │
                          │  ┌───────────────┐   │
                          │  │ Host: 100.xx  │   │
                          │  │ .xx.xx        │   │
                          │  │ Port: 18789   │   │
                          │  └───────────────┘   │
                          └───────────┬───────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  7. 批准配对          │
                          │  openclaw devices    │
                          │  approve <requestId> │
                          └───────────┬───────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   连接成功 ✅   │
                              └───────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                         Tailscale 连接架构                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌──────────────┐              ┌──────────────┐                              │
│   │   手机        │              │   Gateway    │                              │
│   │              │              │              │                              │
│   │  ┌────────┐  │   ┌─────┐   │  ┌────────┐  │                              │
│   │  │Tailscale│──┼─▶│VPN  │◀──│  │Tailscale│  │                              │
│   │  │  App   │  │   │隧道 │   │  │  Daemon │  │                              │
│   │  └────────┘  │   └─────┘   │  └────────┘  │                              │
│   │              │              │              │                              │
│   │  OpenClaw   │   WebSocket  │  OpenClaw    │                              │
│   │    App      │◀────────────▶│   Gateway    │                              │
│   └──────────────┘              └──────────────┘                              │
│                                                                                 │
│   原理：Tailscale 创建加密隧道，手机通过 VPN 隧道访问 Gateway 局域网服务       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2.10.5 移动端命令参考

### 节点状态

```bash
# 列出所有节点
openclaw nodes status

# 节点详情
openclaw gateway call node.list --params "{}"
```

### 调用节点命令

```bash
# 通用格式
openclaw nodes invoke \
  --node "<节点名称>" \
  --command <命令名> \
  --params '<JSON参数>'
```

### 节点事件

```bash
# 订阅节点事件
openclaw nodes events <node-id>
```

---

## 2.10.6 安全考虑

### 网络隔离

```
✅ 推荐：
├── 局域网连接
├── Tailscale VPN
└── WireGuard

❌ 避免：
├── 暴露公网 IP
└── 无认证访问
```

### Token 安全

```bash
# 生成安全 Token
openssl rand -hex 32

# Gateway 配置
{
  "gateway": {
    "mode": "local",
    "token": "你的-token"
  }
}
```

---

## 本节小结

1. **iOS**：配对简单，功能完整
2. **Android**：功能丰富，权限管理
3. **Tailscale**：跨网络连接
4. **Canvas**：Web 渲染能力
5. **命令**：invoke 调用节点功能

---

## 课后思考

1. 你计划使用 iOS 还是 Android？
2. 是否需要跨网络访问？
3. 需要哪些节点功能？
