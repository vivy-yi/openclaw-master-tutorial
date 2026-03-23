# OpenClaw Sessions 指令详解

## 指令配置

### 基本语法
```bash
openclaw sessions                         # 列出所有会话
openclaw sessions --active 120           # 最近活跃会话
openclaw sessions --json                 # JSON输出
openclaw sessions --store <path>         # 指定存储路径
```

---

## 文件配置

### 会话存储
- **路径**: `~/.openclaw/agents/<agent-id>/sessions/`
- **格式**: JSON

### 会话结构
```json
{
  "key": "main:telegram:6020964033",
  "label": "与 hj d 的对话",
  "updatedAt": "2026-03-03T06:00:00Z",
  "messageCount": 150,
  "tokensUsed": 125000
}
```

### 会话配置
```json
{
  "session": {
    "scope": "per-sender",
    "dmScope": "per-channel-peer",
    "idleMinutes": 30,
    "reset": {
      "mode": "daily",
      "atHour": 4
    }
  }
}
```

---

## 场景示例

### 场景1: 列出所有会话
```bash
openclaw sessions
# 输出:
# - main:telegram:6020964033 (与 hj d 的对话)
# - main:telegram:-1003743972184 (金融助手群)
```

### 场景2: 查看活跃会话
```bash
# 最近2小时活跃
openclaw sessions --active 120

# 最近30分钟
openclaw sessions --active 30
```

### 场景3: JSON格式输出
```bash
openclaw sessions --json
```

### 场景4: 指定会话存储
```bash
openclaw sessions --store ./custom-sessions.json
```

### 场景5: 查看会话详情
```bash
# 通过文件查看
ls ~/.openclaw/agents/main/sessions/

cat ~/.openclaw/agents/main/sessions/<session-id>.json
```

### 场景6: 配置会话行为
```bash
# 设置DM会话隔离
openclaw config set session.dmScope "per-peer"

# 设置每日重置
openclaw config set session.reset.mode "daily"
openclaw config set session.reset.atHour 4

# 设置空闲超时(分钟)
openclaw config set session.idleMinutes 60
```
