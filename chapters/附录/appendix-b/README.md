# 附录B: 配置文件模板

> 开箱即用的配置模板，快速搭建各种场景的OpenClaw环境

---

## 模板清单

| 模板 | 场景 | 适用 |
|-----|-----|-----|
| [最小配置](#最小配置) | 快速体验 | 新手 |
| [飞书完整配置](#飞书完整配置) | 国内办公 | 企业用户 |
| [企业微信配置](#企业微信配置) | 微信生态 | 企业用户 |
| [多模型配置](#多模型配置) | 成本优化 | 高级用户 |
| [安全配置](#安全配置) | 生产环境 | 运维人员 |
| [Docker配置](#docker配置) | 容器部署 | 开发者 |

---

## 最小配置

最简单的配置，适合快速体验OpenClaw。

```json
{
  "agents": {
    "defaults": {
      "model": {
        "provider": "openai",
        "model": "deepseek-chat",
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "${DEEPSEEK_API_KEY}"
      }
    }
  },
  "gateway": {
    "port": 18789,
    "bind": "127.0.0.1"
  }
}
```

**使用方式**：
```bash
# 设置环境变量
export DEEPSEEK_API_KEY="sk-xxx"

# 启动
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard
```

---

## 飞书完整配置

生产级飞书集成配置，包含完整的权限和安全设置。

```json
{
  "agents": {
    "defaults": {
      "name": "小助手",
      "systemPrompt": "你是专业的AI助手，回答简洁明了。",
      "model": {
        "provider": "openai",
        "model": "deepseek-chat",
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "${DEEPSEEK_API_KEY}"
      }
    }
  },
  "gateway": {
    "port": 18789,
    "bind": "0.0.0.0",
    "auth": {
      "mode": "token",
      "token": "${GATEWAY_TOKEN}"
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "encryptKey": "${FEISHU_ENCRYPT_KEY}",
      "verificationToken": "${FEISHU_VERIFICATION_TOKEN}",
      "mentionRequired": true,
      "allowedGroups": [],
      "allowedUsers": []
    }
  },
  "tools": {
    "profile": "default",
    "read": {
      "enabled": true,
      "deniedPaths": ["~/.ssh", "~/.aws"]
    },
    "write": {
      "enabled": true,
      "requireApproval": true
    },
    "exec": {
      "enabled": false
    }
  },
  "logging": {
    "level": "info",
    "file": "~/.openclaw/logs/openclaw.log"
  }
}
```

**环境变量**：
```bash
export DEEPSEEK_API_KEY="sk-xxx"
export GATEWAY_TOKEN="your-secure-token"
export FEISHU_APP_ID="cli_xxx"
export FEISHU_APP_SECRET="xxx"
export FEISHU_ENCRYPT_KEY="xxx"
export FEISHU_VERIFICATION_TOKEN="xxx"
```

---

## 企业微信配置

企业微信集成配置，适合已有企微生态的企业。

```json
{
  "agents": {
    "defaults": {
      "model": {
        "provider": "openai",
        "model": "deepseek-chat",
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "${DEEPSEEK_API_KEY}"
      }
    }
  },
  "gateway": {
    "port": 18789,
    "bind": "0.0.0.0"
  },
  "channels": {
    "wechat": {
      "enabled": true,
      "corpId": "${WECHAT_CORP_ID}",
      "agentId": "${WECHAT_AGENT_ID}",
      "secret": "${WECHAT_SECRET}",
      "token": "${WECHAT_TOKEN}",
      "encodingAESKey": "${WECHAT_AES_KEY}",
      "mentionRequired": false
    }
  }
}
```

---

## 多模型配置

根据任务类型自动选择模型，平衡成本和性能。

```json
{
  "agents": {
    "defaults": {
      "models": {
        "deepseek-chat": {
          "provider": "openai",
          "model": "deepseek-chat",
          "baseUrl": "https://api.deepseek.com/v1",
          "apiKey": "${DEEPSEEK_API_KEY}",
          "costPer1K": 0.002
        },
        "claude-3.5": {
          "provider": "anthropic",
          "model": "claude-3-5-sonnet-20241022",
          "apiKey": "${ANTHROPIC_API_KEY}",
          "costPer1K": 0.015
        },
        "gpt-4": {
          "provider": "openai",
          "model": "gpt-4",
          "apiKey": "${OPENAI_API_KEY}",
          "costPer1K": 0.03
        }
      },
      "modelRouting": {
        "default": "deepseek-chat",
        "coding": "claude-3.5",
        "analysis": "claude-3.5",
        "creative": "gpt-4"
      }
    }
  },
  "gateway": {
    "port": 18789
  },
  "costControl": {
    "dailyLimit": 10,
    "monthlyLimit": 100,
    "alertThreshold": 0.8
  }
}
```

**路由规则说明**：
- 默认任务使用 DeepSeek（最便宜）
- 编程任务使用 Claude 3.5（代码能力强）
- 分析任务使用 Claude 3.5（推理能力强）
- 创意任务使用 GPT-4（创造力强）

---

## 安全配置

生产环境安全加固配置，适合企业级部署。

```json
{
  "agents": {
    "defaults": {
      "model": {
        "provider": "openai",
        "model": "deepseek-chat",
        "baseUrl": "https://api.deepseek.com/v1",
        "apiKey": "${DEEPSEEK_API_KEY}"
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
      "requestsPerMinute": 60,
      "requestsPerHour": 1000
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "allowedGroups": ["oc_xxx"],
      "allowedUsers": ["ou_xxx"],
      "mentionRequired": true
    }
  },
  "tools": {
    "profile": "strict",
    "read": {
      "enabled": true,
      "allowedPaths": ["~/Documents", "~/Projects"],
      "deniedPaths": ["~/.ssh", "~/.aws", "~/.kube", "/etc", "/var"]
    },
    "write": {
      "enabled": true,
      "allowedPaths": ["~/Documents"],
      "requireApproval": true,
      "maxFileSize": "10MB"
    },
    "exec": {
      "enabled": false
    },
    "web": {
      "enabled": true,
      "allowedDomains": ["*.feishu.cn", "*.aliyun.com"],
      "blockedDomains": ["*.malicious.com"]
    }
  },
  "logging": {
    "level": "info",
    "audit": {
      "enabled": true,
      "logFile": "~/.openclaw/logs/audit.log",
      "logOperations": ["file.read", "file.write", "tool.exec"]
    }
  },
  "security": {
    "sandbox": {
      "enabled": true,
      "isolatedWorkspace": "/tmp/openclaw-sandbox"
    },
    "promptInjectionDetection": true,
    "maxInputLength": 10000
  }
}
```

**安全要点**：
- Gateway绑定本地地址，通过反向代理访问
- Token认证，Rate Limiting
- 工具严格权限控制
- 审计日志记录
- 沙箱模式隔离
- 提示词注入检测

---

## Docker配置

Docker Compose 一键部署配置。

**docker-compose.yml**：

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/agent:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "18789:18789"
    volumes:
      - openclaw-data:/root/.openclaw
      - ./workspace:/workspace
    environment:
      - DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
      - GATEWAY_TOKEN=${GATEWAY_TOKEN}
      - FEISHU_APP_ID=${FEISHU_APP_ID}
      - FEISHU_APP_SECRET=${FEISHU_APP_SECRET}
    networks:
      - openclaw-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 可选：Nginx反向代理
  nginx:
    image: nginx:alpine
    container_name: openclaw-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - openclaw
    networks:
      - openclaw-network

volumes:
  openclaw-data:
    driver: local

networks:
  openclaw-network:
    driver: bridge
```

**.env 文件**：

```bash
# AI模型配置
DEEPSEEK_API_KEY=sk-xxx

# Gateway安全
GATEWAY_TOKEN=your-secure-random-token

# 飞书配置（可选）
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
```

**启动命令**：

```bash
# 1. 克隆配置
git clone https://github.com/yourname/openclaw-docker.git
cd openclaw-docker

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件填入你的配置

# 3. 启动
docker-compose up -d

# 4. 查看日志
docker-compose logs -f

# 5. 停止
docker-compose down
```

---

## 配置验证

使用以下命令验证配置：

```bash
# 验证JSON格式
openclaw config validate

# 检查配置语法
openclaw doctor

# 测试配置文件
openclaw config test --config /path/to/config.json
```

---

## 快速选择指南

| 你的场景 | 推荐模板 | 修改内容 |
|---------|---------|---------|
| 本地尝鲜 | [最小配置](#最小配置) | API Key |
| 飞书办公 | [飞书完整配置](#飞书完整配置) | App ID/Secret |
| 企业部署 | [安全配置](#安全配置) | 域名、IP白名单 |
| 成本敏感 | [多模型配置](#多模型配置) | 各模型API Key |
| 容器化部署 | [Docker配置](#docker配置) | 环境变量 |

---

**提示**：所有模板中的 `${VARIABLE}` 都需要替换为实际值，建议使用环境变量管理敏感信息。
