# OpenClaw System 指令详解

## 指令配置

### 基本语法
```bash
openclaw system event <text>            # 发送系统事件
openclaw system heartbeat                # 心跳控制
openclaw system presence                 # 在线状态
```

### 事件选项
```bash
openclaw system event "任务完成" --deliver
openclaw system heartbeat start
openclaw system heartbeat stop
openclaw system heartbeat status
```

---

## 文件配置

### 心跳配置
```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "30m",
        "activeHours": {
          "start": "08:00",
          "end": "23:00",
          "timezone": "Asia/Shanghai"
        },
        "prompt": "检查任务状态",
        "target": "telegram",
        "to": "6020964033"
      }
    }
  }
}
```

### 系统事件配置
```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "includeReasoning": false
      }
    }
  }
}
```

---

## 场景示例

### 场景1: 发送系统事件
```bash
# 触发主Agent处理
openclaw system event "检查邮件"

# 投递到Telegram
openclaw system event "报告生成完成" --deliver --channel telegram --to 6020964033
```

### 场景2: 心跳控制
```bash
# 查看心跳状态
openclaw system heartbeat status

# 触发心跳
openclaw system heartbeat trigger

# 配置心跳
openclaw config set agents.defaults.heartbeat.every "30m"
openclaw config set agents.defaults.heartbeat.activeHours.start "08:00"
openclaw config set agents.defaults.heartbeat.activeHours.end "23:00"
```

### 场景3: 查看在线状态
```bash
openclaw system presence
# 显示:
# - 在线Agent
# - 最后活跃时间
# - 设备状态
```

### 场景4: 配置特定Agent心跳
```bash
# 为Agent配置心跳
openclaw config set agents.list.moguan.heartbeat.every "1h"
openclaw config set agents.list.moguan.heartbeat.prompt "检查待办事项"
```
