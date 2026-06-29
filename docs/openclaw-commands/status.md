# OpenClaw Status 指令详解

## 指令配置

### 基本语法
```bash
openclaw status                          # 基础状态
openclaw status --deep                   # 深度检查
openclaw status --usage                  # 使用量统计
openclaw status --json                   # JSON输出
openclaw status --verbose                # 详细输出
openclaw status --all                    # 完整诊断
```

---

## 文件配置

### 状态输出内容

| 项目 | 说明 |
|------|------|
| Gateway | 运行状态、端口 |
| Channels | 各频道连接状态 |
| 模型 | 当前使用、API Key状态 |
| 定时任务 | 运行数、待执行 |
| 设备 | 配对数、在线 |

### 使用量统计
```json
{
  "usage": {
    "minimax-cn:default": {
      "inputTokens": 150000,
      "outputTokens": 80000,
      "cost": 12.50,
      "currency": "USD"
    }
  }
}
```

---

## 场景示例

### 场景1: 查看基础状态
```bash
openclaw status
# 输出:
# Gateway: 运行中 (端口: 18789)
# Telegram: 已连接
# 模型: MiniMax-M2.5
# 活跃会话: 3
```

### 场景2: 深度检查
```bash
openclaw status --deep
# 检查:
# - WhatsApp Web连接
# - Telegram Bot状态
# - Discord Bot状态
# - 各频道健康探测
```

### 场景3: 查看使用量
```bash
openclaw status --usage
# 输出:
# MiniMax-M2.5:
#   - 输入: 150K tokens ($4.50)
#   - 输出: 80K tokens ($9.60)
#   - 总计: $14.10
```

### 场景4: JSON输出
```bash
openclaw status --json
```

### 场景5: 完整诊断
```bash
openclaw status --all
# 包含:
# - 完整配置
# - 环境变量(脱敏)
# - 插件状态
# - 技能状态
```

### 场景6: 查看Gateway使用成本
```bash
openclaw gateway usage-cost
```
