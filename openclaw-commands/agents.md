# OpenClaw Agents 指令详解

## 指令配置

### 基本语法
```bash
openclaw agents list                    # 列出所有agent
openclaw agents add <id>                # 添加新agent
openclaw agents delete <id>             # 删除agent
openclaw agents set-identity <id>       # 更新agent身份
```

### Agent身份设置选项
```bash
openclaw agents set-identity <id> --name <name>     # 设置名称
openclaw agents set-identity <id> --theme <theme>   # 设置主题色
openclaw agents set-identity <id> --emoji <emoji>   # 设置emoji
openclaw agents set-identity <id> --avatar <path>  # 设置头像
```

---

## 文件配置

### Agent目录结构
```
~/.openclaw/agents/
├── main/                    # 主Agent
│   ├── agent/
│   │   ├── models.json      # 模型配置
│   │   └── auth-profiles.json # 认证配置
│   └── sessions/            # 会话历史
├── moguan/                  # 墨管Agent
│   ├── agent/
│   │   ├── models.json
│   │   └── auth-profiles.json
│   └── sessions/
└── 墨析/
    ├── agent/
    │   ├── models.json
    │   └── auth-profiles.json
    └── sessions/
```

### Agent配置文件

#### models.json
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

#### auth-profiles.json
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

### 绑定配置 (openclaw.json)
```json
{
  "bindings": [
    {
      "agentId": "moguan",
      "match": {
        "channel": "telegram",
        "peer": {
          "kind": "group",
          "id": "-1003743972184"
        }
      }
    }
  ]
}
```

### Agent默认配置
```json
{
  "agents": {
    "defaults": {
      "subagents": {
        "allowSendTo": ["mocelue", "mohongguan", "mohangye", "mojishu", "mogushen"]
      },
      "model": {
        "primary": "minimax:MiniMax-M2.5"
      },
      "workspace": "/Users/d/clawd",
      "memorySearch": {
        "enabled": true,
        "sources": ["memory"]
      }
    }
  }
}
```

---

## 场景示例

### 场景1: 列出所有Agent
```bash
openclaw agents list
# 输出:
# - main (主Agent)
# - moguan (墨管)
# - mocelue (墨策略)
# - mohongguan (墨宏观)
# - ...
```

### 场景2: 添加新Agent
```bash
openclaw agents add 墨析
# 创建目录结构:
# ~/.openclaw/agents/墨析/
# ├── agent/
# └── sessions/
```

### 场景3: 删除Agent
```bash
openclaw agents delete 墨析
# 会删除:
# - agent目录
# - sessions目录
# - 工作区(如果有)
```

### 场景4: 设置Agent身份
```bash
# 设置名称和emoji
openclaw agents set-identity moguan --name "墨管" --emoji "📊"

# 设置头像
openclaw agents set-identity moguan --avatar "avatars/moguan.png"

# 设置主题色
openclaw agents set-identity moguan --theme "#FF6B6B"
```

### 场景5: 为Agent配置独立模型
```bash
# 创建Agent目录
mkdir -p ~/.openclaw/agents/墨析/agent

# 写入模型配置
cat > ~/.openclaw/agents/墨析/agent/models.json << 'EOF'
{
  "providers": {
    "minimax": {
      "apiKey": "sk-cp-xxx",
      "models": [{"id": "MiniMax-M2.5", ...}]
    }
  }
}
EOF
```

### 场景6: 绑定Agent到群组
```bash
# 通过config命令添加绑定
openclaw config set bindings.agentId moguan
openclaw config set bindings.match.channel telegram
openclaw config set bindings.match.peer.kind group
openclaw config set bindings.match.peer.id "-1003743972184"

# 然后重启Gateway
openclaw gateway restart
```

### 场景7: 查看Agent会话
```bash
# 列出Agent的所有会话
ls ~/.openclaw/agents/moguan/sessions/

# 查看特定会话
cat ~/.openclaw/agents/moguan/sessions/<session-id>.json
```

### 场景8: Agent间通信
```bash
# 在主Agent中调用子Agent
openclaw message send --target 墨析 --message "分析用户画像"
# 或通过sessions_send工具
```
