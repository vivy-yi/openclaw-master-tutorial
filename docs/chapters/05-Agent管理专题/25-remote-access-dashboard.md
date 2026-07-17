# OpenClaw Dashboard 远程访问指南

> 本章介绍如何远程访问 OpenClaw Agent 监控中心，无论你身在何处

## 目录

1. [方案概述](#1-方案概述)
2. [方案一：Tailscale（推荐）](#2-方案一tailscale推荐)
3. [方案二：ngrok](#3-方案二ngrok)
4. [方案三：Cloudflare Tunnel](#4-方案三cloudflare-tunnel)
5. [Dashboard 功能一览](#5-dashboard-功能一览)
6. [安全建议](#6-安全建议)

---

## 1. 方案概述

| 方案 | 难度 | 速度 | 稳定性 | 推荐场景 |
|------|------|------|--------|----------|
| **Tailscale** | ⭐ | 快 | 极高 | 长期使用、推荐 |
| **ngrok** | ⭐⭐ | 快 | 中等 | 临时访问 |
| **Cloudflare Tunnel** | ⭐⭐ | 快 | 高 | 有域名 |

### 选择建议

- **长期使用** → Tailscale（一次配置，永久使用）
- **临时访问** → ngrok（即开即用）
- **有域名** → Cloudflare Tunnel（最专业）

---

## 2. 方案一：Tailscale（推荐）

Tailscale 创建一个安全的私人网络，让你像在本地一样访问所有设备。

### 2.1 安装 Tailscale

**方式 A：Homebrew（推荐）**
```bash
brew install tailscale
```

**方式 B：官网下载**
```
https://tailscale.com/download
```

### 2.2 启动 Tailscale

```bash
# 启动 Tailscale 服务
sudo tailscaled

# 首次登录（创建私人网络）
tailscale up

# 会自动打开浏览器让你登录
# 支持 GitHub/Google/Microsoft 账号登录
```

### 2.3 获取 Tailscale 地址

```bash
# 查看你的 Tailscale IP
tailscale ip -4

# 输出示例：
# 100.x.x.x
```

### 2.4 配置 OpenClaw 允许远程访问

```bash
# 将 Gateway 绑定到 Tailscale 地址
openclaw config set gateway.bind tailscale

# 重启 Gateway
openclaw gateway restart
```

### 2.5 远程访问

在任何设备的浏览器输入：
```
http://100.x.x.x:18790
```

其中 `100.x.x.x` 是你的 Tailscale IP。

### 2.6 邀请其他人加入

```bash
# 生成邀请链接（有效期24小时）
tailscale serve --bg

# 或者分享你的 Tailscale 地址给同事
tailscale status
```

### 2.7 常见问题

**Q: Tailscale 连接失败？**
```bash
# 检查状态
tailscale status

# 重启服务
sudo tailscaled restart
```

**Q: 如何开机自启？**
```bash
# macOS
sudo brew services start tailscaled
```

---

## 3. 方案二：ngrok

ngrok 提供临时的公网访问地址，适合快速测试。

### 3.1 安装 ngrok

**方式 A：Homebrew**
```bash
brew install ngrok
```

**方式 B：下载**
```
https://ngrok.com/download
```

### 3.2 配置 Token（首次需要）

1. 注册账号：https://ngrok.com
2. 复制你的 Authtoken
3. 配置：
```bash
ngrok config add-authtoken <YOUR_TOKEN>
```

### 3.3 启动 Tunnel

```bash
# 在另一个终端运行
ngrok http 18790
```

### 3.4 获取公网地址

ngrok 会显示：
```
Session Status                online
Account                       your@email.com
Forwarding                    https://xxxx-xx-xx.ngrok.io -> http://localhost:18790
```

### 3.5 远程访问

使用 `https://xxxx-xx-xx.ngrok.io` 访问 Dashboard。

⚠️ **注意**：ngrok 免费版每次重启会换地址，适合临时使用。

### 3.6 保持后台运行

```bash
# 安装 screen 或 tmux
brew install tmux

# 创建命名会话
tmux new -s ngrok

# 在会话中运行
ngrok http 18790

# 断开会话（保持运行）
# 按 Ctrl+B 然后 D

# 重新连接会话
tmux attach -t ngrok
```

---

## 4. 方案三：Cloudflare Tunnel

如果你有域名，这是最专业的方案。

### 4.1 安装 cloudflared

```bash
brew install cloudflare/cloudflare/cloudflared
```

### 4.2 登录 Cloudflare

```bash
cloudflared tunnel login
# 会打开浏览器，选择你的域名
```

### 4.3 创建 Tunnel

```bash
# 创建命名 tunnel
cloudflared tunnel create openclaw

# 保存显示的 credentials 文件路径
```

### 4.4 配置 Tunnel

```bash
# 创建配置文件
vim ~/.cloudflared/config.yml
```

写入：
```yaml
 tunnel: <TUNNEL_ID>
 credentials-file: /Users/d/.cloudflared/<TUNNEL_ID>.json

 ingress:
   - hostname: openclaw.yourdomain.com
     service: http://localhost:18790
   - service: http_status:404
```

### 4.5 更新 DNS

```bash
cloudflared tunnel route dns openclaw openclaw.yourdomain.com
```

### 4.6 启动

```bash
# 前台运行
cloudflared tunnel run openclaw

# 或后台运行
cloudflared tunnel run openclaw --no-autoupdate &
```

### 4.7 远程访问

```
https://openclaw.yourdomain.com
```

---

## 5. Dashboard 功能一览

访问 Dashboard 后，你可以看到：

### 5.1 顶部统计

| 指标 | 说明 |
|------|------|
| **Agent 总数** | 当前配置的 Agent 数量 |
| **活跃会话** | 实时会话消息数 |
| **Cron 任务** | 定时任务总数 |
| **成功率** | 任务执行成功率 |

### 5.2 Agent 卡片展示

- 45+ Agent 状态一览
- 会话数 / 任务数 / 技能数
- 自主性评分进度条
- 点击卡片查看详情

### 5.3 Agent 协作链

- SVG 可视化协作关系
- 点击节点查看 Agent 详情
- 协作强度连线

### 5.4 Cron 任务链

- 所有定时任务时间表
- 状态：运行中 / 等待
- 下次执行时间

### 5.5 会话活动监控

- 实时活动流
- 任务类型区分（普通任务 / Cron / 工作流）

### 5.6 群组多 Agent 监控

| 群组 | Agent |
|------|-------|
| 内容创作组 | 墨星、墨答、墨推 |
| 金融服务组 | 墨财、墨宏观 |
| 游戏运营组 | 游戏总监、游戏分析、游戏构建 |
| 生活服务组 | 墨日、生活Agent |

### 5.7 Agent 自学习监控

| 指标 | 说明 |
|------|------|
| 学习次数 | 累计学习次数 |
| 优化次数 | 成功优化次数 |
| 错误学习 | 从错误中学习次数 |
| 自主性评分 | 综合自主能力评分 |

### 5.8 告警面板

- 实时告警通知
- 错误 / 警告分类
- 一键清除

---

## 6. 安全建议

### ⚠️ 重要提醒

Dashboard 是**管理控制台**，包含敏感操作，请务必：

### 6.1 必做

- ✅ 使用 Tailscale/Cloudflare（加密传输）
- ✅ 设置访问密码
- ✅ 定期检查访问日志

### 6.2 不要做

- ❌ 不要在 ngrok 免费版传输敏感数据
- ❌ 不要开放到公网（除非用强密码）
- ❌ 不要让陌生人访问

### 6.3 设置访问密码

```bash
# 设置 Gateway 密码
openclaw config set gateway.auth.token "你的强密码"

# 重启
openclaw gateway restart
```

---

## 快速命令汇总

```bash
# ===== Tailscale（推荐）=====
brew install tailscale
sudo tailscaled
tailscale up
tailscale ip -4
# 访问 http://100.x.x.x:18790

# ===== ngrok（临时）=====
brew install ngrok
ngrok http 18790
# 访问 https://xxxx.ngrok.io

# ===== Cloudflare Tunnel（有域名）=====
brew install cloudflare/cloudflare/cloudflared
cloudflared tunnel create openclaw
cloudflared tunnel run openclaw
# 访问 https://openclaw.yourdomain.com
```

---

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| 页面打不开 | 检查防火墙是否放行 18790 端口 |
| ngrok 502 | Dashboard 可能未启动，`openclaw status` 检查 |
| Tailscale 连不上 | `tailscale status` 查看状态 |
| 访问被拒绝 | 检查 `gateway.auth.token` 配置 |

---

**相关内容：**

- [OpenClaw 与 Claude Code 协作](./24-openclaw-claude-code-integration.md)
- [OpenClaw 配置指南](./11-openclaw-config-guide.md)
- [监控与维护](./14-openclaw-monitoring.md)
