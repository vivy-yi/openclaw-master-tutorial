# OpenClaw Devices 指令详解

## 指令配置

### 基本语法
```bash
openclaw devices list                    # 列出已配对设备
openclaw devices approve <id>           # 批准配对请求
openclaw devices reject <id>            # 拒绝配对请求
openclaw devices revoke <role>         # 撤销设备token
openclaw devices rotate <role>          # 轮换设备token
```

---

## 文件配置

### 设备配置
- **存储**: `~/.openclaw/devices/`

### 设备结构
```json
{
  "devices": [
    {
      "id": "device-xxx",
      "name": "MacBook Pro",
      "role": "node",
      "pairedAt": "2026-01-30T10:00:00Z",
      "lastSeen": "2026-03-03T06:00:00Z"
    }
  ]
}
```

---

## 场景示例

### 场景1: 查看配对设备
```bash
openclaw devices list
# 输出:
# - MacBook Pro (node) - 在线
# - iPhone (mobile) - 离线
```

### 场景2: 批准新设备
```bash
# 列出待批准请求
openclaw devices list
# 显示 pending 状态的设备

# 批准
openclaw devices approve <device-id>
```

### 场景3: 拒绝设备
```bash
openclaw devices reject <device-id>
```

### 场景4: 撤销设备
```bash
# 撤销某角色的所有设备
openclaw devices revoke node

# 撤销特定设备
openclaw devices revoke <device-id>
```

### 场景5: 轮换Token
```bash
# 轮换设备token
openclaw devices rotate node
```
