# OpenClaw Cron 指令详解

## 指令配置

### 基本语法
```bash
openclaw cron list                    # 列出所有定时任务
openclaw cron add                     # 添加定时任务
openclaw cron edit <id>               # 编辑定时任务
openclaw cron rm <id>                 # 删除定时任务
openclaw cron enable <id>             # 启用任务
openclaw cron disable <id>            # 禁用任务
openclaw cron run <id>                # 立即运行任务
openclaw cron runs <id>              # 查看任务执行历史
openclaw cron status                  # 查看调度器状态
```

### 添加任务选项
```bash
openclaw cron add --name "每日报告" --schedule "0 8 * * *" --message "报告内容"
openclaw cron add --schedule "0 8 * * *" --agent myagent --message "执行任务"
openclaw cron add --every 3600 --message "每小时执行"
```

---

## 文件配置

### Cron配置 (openclaw.json)
```json
{
  "cron": {
    "enabled": true,
    "store": "~/.openclaw/cron/jobs.json",
    "maxConcurrentRuns": 3
  }
}
```

### 定时任务存储
- **路径**: `~/.openclaw/cron/jobs.json`
- **历史**: `~/.openclaw/cron/runs/`

### 任务格式
```json
{
  "id": "412f7e86-7b6c-40c3-8bf9-cb41d65b3f47",
  "name": "AI法律新闻日报",
  "schedule": {
    "kind": "cron",
    "expr": "0 8 * * *",
    "tz": "Asia/Shanghai"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "执行AI法律新闻搜索并生成报告"
  },
  "delivery": {
    "mode": "announce",
    "channel": "telegram",
    "to": "6020964033"
  },
  "enabled": true,
  "createdAt": "2026-02-08T00:00:00Z"
}
```

### 调度类型

| 类型 | 格式 | 示例 |
|------|------|------|
| cron | 标准cron表达式 | `0 8 * * *` (每天8点) |
| every | 间隔毫秒 | `3600000` (每小时) |
| at | 绝对时间 | `2026-03-03T10:00:00Z` |

---

## 场景示例

### 场景1: 创建每日早报任务
```bash
# 方式1: 通过config
openclaw config set cron.jobs.[0].name "每日早报"
openclaw config set cron.jobs.[0].schedule.kind "cron"
openclaw config set cron.jobs.[0].schedule.expr "0 8 * * *"
openclaw config set cron.jobs.[0].payload.kind "systemEvent"
openclaw config set cron.jobs.[0].payload.text "生成今日报告"

# 方式2: 通过cron add命令
# (需要Gateway支持)
```

### 场景2: 创建每小时执行任务
```bash
# 每小时执行
openclaw config set cron.jobs.[1].schedule.kind "every"
openclaw config set cron.jobs.[1].schedule.everyMs 3600000

# 每30分钟
openclaw config set cron.jobs.[1].schedule.everyMs 1800000
```

### 场景3: 禁用/启用任务
```bash
# 禁用
openclaw cron disable 412f7e86-7b6c-40c3-8bf9-cb41d65b3f47

# 启用
openclaw cron enable 412f7e86-7b6c-40c3-8bf9-cb41d65b3f47
```

### 场景4: 手动执行任务
```bash
# 立即执行
openclaw cron run 412f7e86-7b6c-40c3-8bf9-cb41d65b3f47
```

### 场景5: 查看执行历史
```bash
# 查看某任务的历史
openclaw cron runs 412f7e86-7b6c-40c3-8bf9-cb41d65b3f47

# 输出JSONL格式
# {"timestamp":"...","status":"success","duration":1234}
```

### 场景6: 删除任务
```bash
openclaw cron rm 412f7e86-7b6c-40c3-8bf9-cb41d65b3f47
```

### 场景7: 配置任务投递
```bash
# 投递到Telegram
openclaw config set cron.jobs.[0].delivery.mode "announce"
openclaw config set cron.jobs.[0].delivery.channel "telegram"
openclaw config set cron.jobs.[0].delivery.to "6020964033"

# 不投递(静默执行)
openclaw config set cron.jobs.[0].delivery.mode "none"
```

### 场景8: 使用Agent执行
```bash
# 指定agent执行
openclaw config set cron.jobs.[0].payload.kind "agentTurn"
openclaw config set cron.jobs.[0].payload.agentId "moguan"
openclaw config set cron.jobs.[0].payload.message "生成今日报告"
```

### 场景9: 查看调度器状态
```bash
openclaw cron status
# 显示:
# - 启用的任务数
# - 下次执行时间
# - 当前运行中的任务
```

### 场景10: Cron表达式示例
```bash
# 每天早上8点
"0 8 * * *"

# 每周一早上9点
"0 9 * * 1"

# 每月1号早上10点
"0 10 1 * *"

# 每隔5分钟
"*/5 * * * *"

# 每小时的第30分钟
"30 * * * *"

# 工作日早上9点到下午6点
"0 9-18 * * 1-5"
```
