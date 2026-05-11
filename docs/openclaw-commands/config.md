# OpenClaw Config 指令详解

## 指令配置

### 基本语法
```bash
openclaw config                    # 启动配置向导 (交互式)
openclaw config get <path>        # 获取配置值
openclaw config set <path> <value> # 设置配置值
openclaw config unset <path>      # 删除配置项
```

### 常用配置路径

| 路径 | 说明 |
|------|------|
| `env.MINIMAX_API_KEY` | MiniMax API密钥 |
| `env.ZAI_API_KEY` | ZAI API密钥 |
| `models.mode` | 模型模式 (merge/replace) |
| `models.providers.minimax.apiKey` | 模型提供商API Key |
| `auth.profiles` | 认证配置文件 |
| `gateway.port` | Gateway端口 |
| `gateway.bind` | 绑定模式 |
| `gateway.auth.token` | Gateway认证Token |
| `channels.telegram.enabled` | Telegram频道开关 |
| `browser.enabled` | 浏览器开关 |
| `commands.native` | 原生命令开关 |

---

## 文件配置

### 主配置文件位置
- **路径**: `~/.openclaw/openclaw.json`
- **工作区**: `/Users/d/clawd/openclaw.json`

### 配置结构示例
```json
{
  "meta": {
    "lastTouchedVersion": "2026.2.6-3",
    "lastTouchedAt": "2026-03-01T23:20:44.741Z"
  },
  "env": {
    "MINIMAX_API_KEY": "sk-cp-xxx",
    "HTTP_PROXY": "http://127.0.0.1:7897"
  },
  "models": {
    "mode": "merge",
    "providers": {
      "minimax": {
        "baseUrl": "https://api.minimaxi.com/v1/text",
        "apiKey": "sk-cp-xxx",
        "models": [...]
      }
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "xxx"
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "xxx"
    }
  }
}
```

### Agent级配置
- **位置**: `~/.openclaw/agents/<agent-id>/agent/models.json`
- **认证**: `~/.openclaw/agents/<agent-id>/agent/auth-profiles.json`

---

## 场景示例

### 场景1: 配置API Key
```bash
# 配置环境变量方式
openclaw config set env.MINIMAX_API_KEY "sk-cp-xxx"

# 验证配置
openclaw config get env.MINIMAX_API_KEY
```

### 场景2: 修改Gateway端口
```bash
openclaw config set gateway.port 18789
openclaw gateway restart
```

### 场景3: 开启Telegram频道
```bash
openclaw config set channels.telegram.enabled true
openclaw config set channels.telegram.botToken "xxx"
```

### 场景4: 配置代理
```bash
openclaw config set env.HTTP_PROXY "http://127.0.0.1:7897"
openclaw config set env.HTTPS_PROXY "http://127.0.0.1:7897"
```

### 场景5: 查看所有配置
```bash
# 获取顶层配置
openclaw config get meta
openclaw config get models
openclaw config get gateway

# 获取具体值
openclaw config get gateway.port
```

### 场景6: 删除配置
```bash
# 删除某个配置项
openclaw config unset env.ZAI_API_KEY

# 恢复到默认值
openclaw config unset browser.headless
```
