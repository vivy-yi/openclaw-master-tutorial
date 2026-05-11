# OpenClaw Gateway 指令详解

## 指令配置

### 服务控制
```bash
openclaw gateway start           # 启动Gateway服务
openclaw gateway stop            # 停止Gateway服务
openclaw gateway restart         # 重启Gateway服务
openclaw gateway status          # 查看Gateway状态
openclaw gateway run             # 前台运行Gateway
openclaw gateway health          # 获取健康状态
openclaw gateway probe           # 检查连通性
```

### 服务安装
```bash
openclaw gateway install         # 安装为系统服务
openclaw gateway uninstall       # 卸载系统服务
```

### 成本查看
```bash
openclaw gateway usage-cost      # 获取使用成本摘要
```

### 启动选项
```bash
# 基本选项
openclaw gateway --port 18789              # 指定端口
openclaw gateway --force                  # 强制启动(杀掉占用进程)
openclaw gateway --bind loopback          # 绑定模式: loopback/lan/tailnet/auto

# 认证选项
openclaw gateway --auth token             # 认证模式: token/password
openclaw gateway --token <token>           # 指定认证token
openclaw gateway --password <password>    # 指定密码

# 日志选项
openclaw gateway --verbose                # 详细日志
openclaw gateway --compact                # 简洁日志
openclaw gateway --raw-stream              # 原始流日志

# 网络选项
openclaw gateway --tailscale serve        # Tailscale暴露模式
openclaw gateway --tailscale funnel
openclaw gateway --tailscale-reset-on-exit

# 开发选项
openclaw gateway --dev                    # 开发模式
openclaw gateway --reset                  # 重置开发配置
```

---

## 文件配置

### Gateway配置 (openclaw.json)
```json
{
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "7d04c98299e79dcd3af8e0e59fe7298cf8250a7850969203"
    },
    "tailscale": {
      "mode": "off",
      "resetOnExit": false
    }
  }
}
```

### 配置文件位置
- **主配置**: `~/.openclaw/openclaw.json`
- **状态文件**: `~/.openclaw/gateway-state.json`
- **日志文件**: `~/.openclaw/logs/gateway/`

### 日志配置
```json
{
  "logging": {
    "level": "info",
    "file": "~/.openclaw/logs/gateway.log",
    "consoleLevel": "debug",
    "consoleStyle": "pretty"
  }
}
```

### 远程Gateway配置
```json
{
  "gateway": {
    "remote": {
      "url": "ws://192.168.1.100:18789",
      "transport": "ssh",
      "token": "xxx",
      "password": "xxx",
      "sshTarget": "user@host",
      "sshIdentity": "~/.ssh/id_rsa"
    }
  }
}
```

---

## 场景示例

### 场景1: 启动Gateway
```bash
# 前台运行(调试用)
openclaw gateway run

# 后台服务启动
openclaw gateway start

# 查看状态
openclaw gateway status
```

### 场景2: 更改端口
```bash
# 更改端口
openclaw config set gateway.port 19000

# 重启服务
openclaw gateway restart

# 验证
openclaw gateway status
```

### 场景3: 配置Token认证
```bash
# 生成新token
openclaw doctor --generate-gateway-token

# 手动设置
openclaw config set gateway.auth.token "your-token-here"

# 重启
openclaw gateway restart
```

### 场景4: 局域网暴露
```bash
openclaw gateway --bind lan
# 或配置
openclaw config set gateway.bind "lan"
```

### 场景5: Tailscale远程访问
```bash
# 启用Tailscale
openclaw gateway --tailscale serve

# 停止时重置
openclaw gateway --tailscale-reset-on-exit
```

### 场景6: 强制重启(端口被占用)
```bash
openclaw gateway --force
# 等同于:
# openclaw gateway stop && openclaw gateway start
```

### 场景7: 查看运行日志
```bash
# 实时日志
openclaw logs --follow

# 最近100条
openclaw logs --limit 100

# JSON格式
openclaw logs --json
```

### 场景8: 检查健康状态
```bash
# 基础状态
openclaw gateway health

# 完整探测
openclaw gateway probe
```

### 场景9: 查看使用成本
```bash
openclaw gateway usage-cost
# 输出:
# - 当前会话的token使用量
# - 各provider费用
# - 总费用
```

### 场景10: 安装为系统服务
```bash
# macOS (launchd)
openclaw gateway install

# 查看状态
openclaw gateway status

# 卸载
openclaw gateway uninstall
```
