# 附录E: 生产部署安全检查清单

> 部署前必查清单，确保生产环境安全稳定运行

---

## 检查清单概览

| 类别 | 检查项 | 重要性 |
|-----|-------|-------|
| API密钥安全 | 5项 | ⭐⭐⭐⭐⭐ |
| 网络安全 | 6项 | ⭐⭐⭐⭐⭐ |
| 访问控制 | 4项 | ⭐⭐⭐⭐⭐ |
| 工具权限 | 5项 | ⭐⭐⭐⭐ |
| 审计日志 | 3项 | ⭐⭐⭐⭐ |
| 数据保护 | 4项 | ⭐⭐⭐⭐ |
| 高可用 | 3项 | ⭐⭐⭐ |

---

## API密钥安全

### ✅ 检查清单

- [ ] **使用环境变量存储API Key**
```bash
# ❌ 错误：硬编码
{
  "apiKey": "sk-xxx123"
}

# ✅ 正确：环境变量
{
  "apiKey": "${OPENAI_API_KEY}"
}
```

- [ ] **API Key权限最小化**
```bash
# 检查API Key权限范围
# 只授予必要的权限
```

- [ ] **定期轮换API Key**
```bash
# 建议每90天轮换一次
# 记录轮换日期
echo "Last rotated: $(date)" >> ~/.openclaw/key-rotation.log
```

- [ ] **配置API Key备用**
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "${OPENAI_API_KEY}",
        "fallback": "${OPENAI_API_KEY_BACKUP}"
      }
    }
  }
}
```

- [ ] **启用API Key监控**
```bash
# 设置成本告警
openclaw config set costControl.dailyLimit 10
openclaw config set costControl.alertThreshold 0.8
```

---

## 网络安全

### ✅ 检查清单

- [ ] **Gateway绑定本地地址**
```json
{
  "gateway": {
    "bind": "127.0.0.1",
    "port": 18789
  }
}
```

- [ ] **使用反向代理（Nginx/Traefik）**
```nginx
server {
    listen 443 ssl;
    server_name openclaw.yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

- [ ] **启用HTTPS/TLS**
```bash
# 使用Let's Encrypt
certbot --nginx -d openclaw.yourdomain.com
```

- [ ] **配置防火墙**
```bash
# UFW示例
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw deny 18789/tcp  # 拒绝直接访问Gateway
sudo ufw enable
```

- [ ] **Rate Limiting**
```json
{
  "gateway": {
    "rateLimit": {
      "enabled": true,
      "requestsPerMinute": 60,
      "requestsPerHour": 1000
    }
  }
}
```

- [ ] **IP白名单（可选）**
```json
{
  "gateway": {
    "allowedIPs": ["10.0.0.0/8", "172.16.0.0/12"]
  }
}
```

---

## 访问控制

### ✅ 检查清单

- [ ] **启用Token认证**
```json
{
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "${GATEWAY_TOKEN}"
    }
  }
}
```

- [ ] **生成强Token**
```bash
# 生成32字节随机Token
openssl rand -base64 32
```

- [ ] **飞书群组白名单**
```json
{
  "channels": {
    "feishu": {
      "allowedGroups": ["oc_xxx", "oc_yyy"],
      "mentionRequired": true
    }
  }
}
```

- [ ] **用户白名单**
```json
{
  "channels": {
    "feishu": {
      "allowedUsers": ["ou_admin", "ou_manager"]
    }
  }
}
```

---

## 工具权限

### ✅ 检查清单

- [ ] **禁用不必要的工具**
```json
{
  "tools": {
    "profile": "strict",
    "exec": {
      "enabled": false
    }
  }
}
```

- [ ] **文件读写限制**
```json
{
  "tools": {
    "read": {
      "enabled": true,
      "allowedPaths": ["/app/data", "/app/docs"],
      "deniedPaths": ["/etc", "/root", "/var"]
    },
    "write": {
      "enabled": true,
      "requireApproval": true
    }
  }
}
```

- [ ] **命令执行限制（如启用）**
```json
{
  "tools": {
    "exec": {
      "enabled": true,
      "allowedCommands": ["git", "npm"],
      "deniedCommands": ["rm", "sudo", "curl"],
      "requireApproval": true
    }
  }
}
```

- [ ] **网络请求限制**
```json
{
  "tools": {
    "web": {
      "enabled": true,
      "allowedDomains": ["*.feishu.cn", "api.example.com"],
      "blockedDomains": ["*.malicious.com"]
    }
  }
}
```

- [ ] **敏感数据过滤**
```json
{
  "security": {
    "sensitivePatterns": [
      "password[=:][^\\s]+",
      "secret[=:][^\\s]+",
      "token[=:][^\\s]+"
    ]
  }
}
```

---

## 审计日志

### ✅ 检查清单

- [ ] **启用操作日志**
```json
{
  "logging": {
    "level": "info",
    "file": "/var/log/openclaw/openclaw.log"
  }
}
```

- [ ] **启用审计日志**
```json
{
  "logging": {
    "audit": {
      "enabled": true,
      "logFile": "/var/log/openclaw/audit.log",
      "logOperations": ["file.read", "file.write", "tool.exec", "config.update"]
    }
  }
}
```

- [ ] **日志轮转**
```bash
# /etc/logrotate.d/openclaw
/var/log/openclaw/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0644 openclaw openclaw
}
```

---

## 数据保护

### ✅ 检查清单

- [ ] **对话数据加密存储**
```json
{
  "storage": {
    "encryption": {
      "enabled": true,
      "algorithm": "AES-256-GCM"
    }
  }
}
```

- [ ] **敏感信息脱敏**
```json
{
  "security": {
    "maskPatterns": [
      "\\b\\d{18}\\b",
      "\\b\\d{11}\\b",
      "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
    ]
  }
}
```

- [ ] **自动清理策略**
```json
{
  "cleanup": {
    "enabled": true,
    "retentionDays": 30,
    "schedule": "0 2 * * *"
  }
}
```

- [ ] **沙箱模式（可选）**
```json
{
  "security": {
    "sandbox": {
      "enabled": true,
      "isolatedWorkspace": "/tmp/openclaw-sandbox"
    }
  }
}
```

---

## 高可用

### ✅ 检查清单

- [ ] **配置健康检查**
```json
{
  "healthCheck": {
    "enabled": true,
    "interval": 30,
    "endpoint": "/health"
  }
}
```

- [ ] **自动重启**
```bash
# systemd服务配置
[Service]
Restart=always
RestartSec=5
```

- [ ] **备份策略**
```bash
#!/bin/bash
# 每日备份配置
BACKUP_DIR="/backup/openclaw/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
cp -r ~/.openclaw/* $BACKUP_DIR/
# 保留最近7天
find /backup/openclaw -type d -mtime +7 -exec rm -rf {} +
```

---

## 部署检查脚本

一键检查脚本：

```bash
#!/bin/bash
# security-check.sh

echo "=== OpenClaw 安全检查 ==="

# 1. 检查API Key
echo "[1/7] 检查API Key..."
if grep -q "sk-" ~/.openclaw/config.json 2>/dev/null; then
    echo "❌ 警告：发现硬编码的API Key"
else
    echo "✅ API Key使用环境变量"
fi

# 2. 检查Gateway绑定
echo "[2/7] 检查网络配置..."
if openclaw config get gateway.bind | grep -q "127.0.0.1"; then
    echo "✅ Gateway绑定本地地址"
else
    echo "❌ 警告：Gateway绑定到0.0.0.0"
fi

# 3. 检查认证
echo "[3/7] 检查访问控制..."
if openclaw config get gateway.auth.enabled | grep -q "true"; then
    echo "✅ 认证已启用"
else
    echo "❌ 警告：认证未启用"
fi

# 4. 检查工具权限
echo "[4/7] 检查工具权限..."
if openclaw config get tools.exec.enabled | grep -q "false"; then
    echo "✅ 命令执行已禁用"
else
    echo "⚠️ 命令执行已启用，请确认安全"
fi

# 5. 检查日志
echo "[5/7] 检查审计日志..."
if [ -f "/var/log/openclaw/audit.log" ]; then
    echo "✅ 审计日志已启用"
else
    echo "❌ 警告：审计日志未配置"
fi

echo "[6/7] 检查HTTPS..."
if curl -s https://localhost:18789/health >/dev/null 2>&1; then
    echo "✅ HTTPS已启用"
else
    echo "⚠️ 未检测到HTTPS"
fi

echo "[7/7] 检查备份..."
if [ -d "/backup/openclaw" ]; then
    echo "✅ 备份目录存在"
else
    echo "❌ 警告：备份目录未配置"
fi

echo "=== 检查完成 ==="
```

---

## 生产环境配置示例

```json
{
  "agents": {
    "defaults": {
      "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "apiKey": "${OPENAI_API_KEY}"
      }
    }
  },
  "gateway": {
    "port": 18789,
    "bind": "127.0.0.1",
    "auth": {
      "mode": "token",
      "token": "${GATEWAY_TOKEN}"
    },
    "rateLimit": {
      "enabled": true,
      "requestsPerMinute": 60
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "allowedGroups": ["${FEISHU_GROUP_ID}"],
      "mentionRequired": true
    }
  },
  "tools": {
    "profile": "strict",
    "exec": { "enabled": false },
    "write": { "requireApproval": true }
  },
  "logging": {
    "level": "info",
    "audit": { "enabled": true }
  },
  "security": {
    "sandbox": { "enabled": true }
  }
}
```

---

**重要提示**：部署前务必完成所有⭐⭐⭐⭐⭐项目的检查！
