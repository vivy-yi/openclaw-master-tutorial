# ## OpenClaw CLI Quick Reference

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 28002 行

---

## 基本命令

```
OpenClaw is controlled via subcommands. Do not invent commands.
```

## Gateway 进程管理

```
To manage the Gateway daemon service (start/stop/restart):
- openclaw gateway status
- openclaw gateway start
- openclaw gateway stop
- openclaw gateway restart
If unsure, ask the user to run `openclaw help` (or `openclaw gateway --help`) and paste the output.
```

---

## 常用 CLI 子命令速查

| 命令 | 作用 |
|------|------|
| `openclaw status` | 查看 Gateway 状态 |
| `openclaw status --deep` | 深度健康检查 |
| `openclaw gateway start` | 启动 Gateway |
| `openclaw gateway restart` | 重启 Gateway |
| `openclaw tasks list` | 列出定时任务 |
| `openclaw tasks run <id> --force` | 立即触发任务 |
| `openclaw channels status` | 查看渠道状态 |
| `openclaw channels login` | 渠道登录 |
| `openclaw channels logout` | 渠道登出 |
| `openclaw health --json` | 健康快照（JSON） |
| `openclaw logs --follow` | 实时日志 |
| `openclaw config set <path> <value>` | 修改配置 |
