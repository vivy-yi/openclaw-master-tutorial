# OpenClaw Hooks 指令详解

## 指令配置

### 基本语法
```bash
openclaw hooks list                      # 列出所有钩子
openclaw hooks install <spec>           # 安装钩子包
openclaw hooks update                    # 更新钩子
openclaw hooks enable <id>              # 启用钩子
openclaw hooks disable <id>            # 禁用钩子
openclaw hooks info <id>               # 钩子详情
openclaw hooks check                    # 检查状态
```

---

## 文件配置

### 钩子存储
- **路径**: `~/.openclaw/hooks/`
- **配置**: `openclaw.json`

### 钩子配置
```json
{
  "hooks": {
    "enabled": true,
    "path": "~/.openclaw/hooks",
    "handlers": [
      {
        "event": "message",
        "module": "my-hook",
        "export": "handler"
      }
    ]
  }
}
```

### 事件类型
- `message` - 消息事件
- `session_start` - 会话开始
- `session_end` - 会话结束
- `cron_run` - 定时任务执行

---

## 场景示例

### 场景1: 列出钩子
```bash
openclaw hooks list
```

### 场景2: 安装钩子
```bash
openclaw hooks install @openclaw/example-hook
```

### 场景3: 启用/禁用钩子
```bash
openclaw hooks enable my-hook
openclaw hooks disable my-hook
```

### 场景4: 查看钩子详情
```bash
openclaw hooks info my-hook
```

### 场景5: 检查状态
```bash
openclaw hooks check
```

### 场景6: 创建自定义钩子
```bash
mkdir -p ~/.openclaw/hooks/my-hook
cd ~/.openclaw/hooks/my-hook

cat > index.js << 'EOF'
module.exports = {
  event: 'message',
  handler: async (context) => {
    console.log('收到消息:', context.message);
  }
};
EOF
```
