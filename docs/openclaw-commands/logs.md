# OpenClaw Logs 指令详解

## 指令配置

### 基本语法
```bash
openclaw logs                           # 查看日志
openclaw logs --follow                  # 实时跟踪
openclaw logs --limit 100               # 限制行数
openclaw logs --json                    # JSON输出
openclaw logs --plain                   # 纯文本
```

### 日志选项
```bash
openclaw logs --max-bytes <n>          # 最大字节数
openclaw logs --interval <ms>           # 轮询间隔
openclaw logs --timeout <ms>           # 超时时间
```

---

## 文件配置

### 日志配置
```json
{
  "logging": {
    "level": "info",
    "file": "~/.openclaw/logs/gateway.log",
    "consoleLevel": "debug",
    "consoleStyle": "pretty",
    "redactSensitive": "off",
    "redactPatterns": []
  }
}
```

### 日志级别
- **silent**: 无日志
- **fatal**: 致命错误
- **error**: 错误
- **warn**: 警告
- **info**: 信息
- **debug**: 调试
- **trace**: 追踪

---

## 场景示例

### 场景1: 查看日志
```bash
# 最近100行
openclaw logs --limit 100

# 最近50行
openclaw logs --limit 50
```

### 场景2: 实时跟踪
```bash
# 实时日志流
openclaw logs --follow

# 限制输出
openclaw logs --follow --limit 50
```

### 场景3: JSON格式
```bash
openclaw logs --json
# 适合程序解析
```

### 场景4: 调试模式
```bash
# 详细输出
openclaw logs --verbose
```

### 场景5: 通过Gateway查看
```bash
# 使用Gateway token
openclaw logs --token <token>

# 指定URL
openclaw logs --url ws://127.0.0.1:18789
```

### 场景6: 日志配置
```bash
# 设置日志级别
openclaw config set logging.level "debug"

# 设置文件日志
openclaw config set logging.file "~/.openclaw/logs/gateway.log"

# 脱敏处理
openclaw config set logging.redactSensitive "tools"
```
