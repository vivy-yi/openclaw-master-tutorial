# OpenClaw 配置注意事项

## Agent 创建规则

### 新群配置时的 Agent 创建流程

当配置新的 Channel 群时，需要按以下流程创建对应的 Agent：

#### 1. 创建主 Agent Workspace
```bash
mkdir -p ~/.openclaw/workspaces/{群名称}
```

创建必需文件：
- `SOUL.md` - 角色定义（我是谁，能做什么）
- `AGENTS.md` - 行为指令
- `USER.md` - 用户信息
- `IDENTITY.md` - 身份标识

#### 2. 在 openclaw.json 中注册 Agent
```json
{
  "id": "agent-id",
  "name": "Agent名称",
  "workspace": "/Users/d/.openclaw/workspaces/xxx"
}
```

#### 3. 绑定到群
```json
{
  "agentId": "agent-id",
  "match": {
    "channel": "telegram",
    "peer": { "kind": "group", "id": "-xxxxxxxx" }
  }
}
```

#### 4. 添加子 Agent（可选）
根据群的任务和流程，可以添加子 Agent：
- 在主 Agent 配置中添加 `subagents.allowAgents`
- 为每个子 Agent 创建独立 workspace

#### 5. 更新 channels 配置
在 `channels.telegram.groups` 中添加群 ID：
```json
"-xxxxxxxx": {
  "requireMention": false,
  "allowFrom": ["用户ID"]
}
```

---

## Channel 配置问题

### 常见问题：Gateway 无法启动

当修改 `channels` 配置时，如果格式不正确，会导致 Gateway 无法启动。

### ✅ 正确的配置方法

#### Telegram 群配置
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "xxx",
      "groups": {
        "-1003633299525": {
          "requireMention": false,
          "allowFrom": ["6020964033"]
        }
      },
      "allowFrom": ["6020964033"],
      "groupPolicy": "allowlist"
    }
  }
}
```

**注意：**
- 群 ID（如 `-1003633299525`）应该放在 `channels.telegram.groups` 下
- **不要**把群 ID 放在 `allowFrom` 中（那是给用户 ID 用的）
- 错误示例：`"allowFrom": ["-1003633299525"]` ❌

#### 飞书群配置
```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "xxx",
      "appSecret": "xxx",
      "groups": {
        "oc_xxxxxxxxxxxx": {
          "requireMention": false,
          "allowFrom": ["ou_xxx"]
        }
      },
      "groupAllowFrom": ["oc_xxxxxxxxxxxx"],
      "groupPolicy": "allowlist"
    }
  }
}
```

**注意：**
- 飞书群 ID（`oc_xxx`）需要添加到 `groupAllowFrom` 数组中
- 也要在 `groups` 下添加对应的配置

---

### ⚠️ 容易犯的错误

1. **Telegram 群 ID 放到 allowFrom**
   - 错误：`"allowFrom": ["-1003633299525"]`
   - 正确：放在 `groups` 下

2. **飞书群没有添加到 groupAllowFrom**
   - 会导致消息被静默丢弃
   - 错误日志：`group xxx not in groupAllowFrom (groupPolicy=allowlist)`

3. **JSON 格式错误**
   - 缺少逗号、引号
   - 使用中文标点

---

### 🔧 配置后必须重启

```bash
openclaw gateway restart
```

---

### 📋 快速检查配置

```bash
# 检查 Telegram 配置
openclaw config get channels.telegram

# 检查飞书配置
openclaw config get channels.feishu

# 检查 Gateway 状态
openclaw gateway health
```

---

### 📝 常用群 ID 记录

| 平台 | ID | 群名称 |
|------|-----|--------|
| Telegram | `-1003633299525` | 金融助手群 |
| Telegram | `-5111532435` | 内容运营助手 |
| Telegram | `-5153278498` | 生活助手 |
| Telegram | `-5282503563` | 论文助手 |
| Telegram | `-5212038065` | 日常开发和维护 |
| 飞书 | `oc_1e0534ae0fcdb5a7d3912cd56ad2c252` | 金融助手群 |

更新于：2026-03-19
