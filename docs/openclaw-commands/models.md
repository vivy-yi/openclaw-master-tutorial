# OpenClaw Models 指令详解

## 指令配置

### 基本语法
```bash
openclaw models list                 # 列出已配置的模型
openclaw models status               # 显示模型状态
openclaw models set <model>          # 设置默认模型
openclaw models set-image <model>    # 设置图像模型
openclaw models aliases              # 管理模型别名
```

### 模型认证 (Auth)
```bash
openclaw models auth add                           # 交互式添加认证
openclaw models auth add --agent <id>              # 为指定agent添加认证
openclaw models auth paste-token                   # 粘贴token到auth-profiles.json
openclaw models auth login                         # 运行provider插件认证流程
openclaw models auth login --provider <provider>   # 指定provider登录
openclaw models auth order                        # 管理认证顺序
```

### 模型别名 (Aliases)
```bash
openclaw models aliases list              # 列出所有别名
openclaw models aliases add <alias> <model> # 添加别名
openclaw models aliases remove <alias>     # 删除别名
```

---

## 文件配置

### 主配置 (openclaw.json)
```json
{
  "models": {
    "mode": "merge",  // merge: 合并主配置 | replace: 替换主配置
    "providers": {
      "minimax": {
        "baseUrl": "https://api.minimaxi.com/v1/text",
        "apiKey": "sk-cp-xxx",
        "api": "openai-completions",
        "models": [
          {
            "id": "MiniMax-M2.5",
            "name": "MiniMax M2.5",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 15,
              "output": 60,
              "cacheRead": 2,
              "cacheWrite": 10
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      },
      "minimax-cn": {
        "baseUrl": "https://api.minimaxi.com/anthropic",
        "api": "anthropic-messages",
        "authHeader": true,
        "models": [...]
      }
    }
  }
}
```

### Agent级模型配置
- **路径**: `~/.openclaw/agents/<agent-id>/agent/models.json`
```json
{
  "providers": {
    "minimax": {
      "baseUrl": "https://api.minimaxi.com/v1/text",
      "apiKey": "sk-cp-xxx",
      "models": [
        {
          "id": "MiniMax-M2.5",
          "name": "MiniMax M2.5",
          "reasoning": true,
          "input": ["text"],
          "cost": { "input": 15, "output": 60 },
          "contextWindow": 200000,
          "maxTokens": 8192
        }
      ]
    }
  }
}
```

### 认证配置
- **路径**: `~/.openclaw/agents/<agent-id>/agent/auth-profiles.json`
```json
{
  "version": 1,
  "profiles": {
    "minimax-cn:default": {
      "type": "api_key",
      "provider": "minimax-cn",
      "key": "sk-cp-xxx"
    }
  },
  "lastGood": {
    "minimax-cn": "minimax-cn:default"
  }
}
```

---

## 场景示例

### 场景1: 查看可用模型
```bash
openclaw models list
# 输出:
# - minimax:MiniMax-M2.5
# - minimax-cn:MiniMax-M2.5
# - minimax:MiniMax-M2.1
```

### 场景2: 设置默认模型
```bash
openclaw models set minimax:MiniMax-M2.5
```

### 场景3: 为新Agent添加认证
```bash
# 交互式添加
openclaw models auth add

# 指定agent添加
openclaw models auth add --agent 墨析

# 粘贴token
openclaw models auth paste-token
# 然后粘贴API Key并按Ctrl+D
```

### 场景4: 查看模型状态
```bash
openclaw models status
# 显示:
# - 当前使用的模型
# - API Key配置状态
# - 可用providers
```

### 场景5: 添加模型别名
```bash
openclaw models aliases add m2 minimax:MiniMax-M2.5
# 之后可以使用 m2 代替完整模型名
```

### 场景6: 配置不同Agent使用不同模型
```bash
# Agent级配置 (models.json)
# 金融团队agent用GPT-4
openclaw config set agents.list.moguan.model "openai:gpt-4"

# 客服agent用GPT-3.5
openclaw config set agents.list.moai.model "openai:gpt-3.5-turbo"
```

### 场景7: 配置模型成本
```json
{
  "id": "MiniMax-M2.5",
  "cost": {
    "input": 0.3,      // $0.3/1M tokens
    "output": 1.2,     // $1.2/1M tokens
    "cacheRead": 0.03,
    "cacheWrite": 0.12
  }
}
```
