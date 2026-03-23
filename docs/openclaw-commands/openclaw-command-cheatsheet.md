# OpenClaw 配置指令速查表 (Cheatsheet)

> 版本: 2026.2.6-3 | 更新: 2026-03-03

---

## 1. 配置管理 (Config)

| 指令 | 说明 |
|------|------|
| `openclaw config` | 启动配置向导 (交互式) |
| `openclaw config get <path>` | 获取配置值 (如: `models.providers.minimax.apiKey`) |
| `openclaw config set <path> <value>` | 设置配置值 |
| `openclaw config unset <path>` | 删除配置项 |

### 环境变量配置
```bash
openclaw config set env.MINIMAX_API_KEY "sk-xxx"
openclaw config set env.ZAI_API_KEY "xxx"
```

---

## 2. 模型配置 (Models)

| 指令 | 说明 |
|------|------|
| `openclaw models list` | 列出已配置的模型 |
| `openclaw models status` | 显示模型状态 |
| `openclaw models set <model>` | 设置默认模型 |
| `openclaw models set-image <model>` | 设置图像模型 |
| `openclaw models aliases` | 管理模型别名 |

### 模型认证 (Auth)
| 指令 | 说明 |
|------|------|
| `openclaw models auth add` | 交互式添加认证 |
| `openclaw models auth add --agent <id>` | 为指定agent添加认证 |
| `openclaw models auth paste-token` | 粘贴token到auth-profiles.json |
| `openclaw models auth login` | 运行provider插件认证流程 (OAuth) |
| `openclaw models auth order` | 管理认证顺序 |

---

## 3. Agent管理 (Agents)

| 指令 | 说明 |
|------|------|
| `openclaw agents list` | 列出所有agent |
| `openclaw agents add <id>` | 添加新agent |
| `openclaw agents delete <id>` | 删除agent |
| `openclaw agents set-identity <id>` | 更新agent身份 (name/theme/emoji/avatar) |

---

## 4. 网关管理 (Gateway)

| 指令 | 说明 |
|------|------|
| `openclaw gateway start` | 启动Gateway服务 |
| `openclaw gateway stop` | 停止Gateway服务 |
| `openclaw gateway restart` | 重启Gateway服务 |
| `openclaw gateway status` | 查看Gateway状态 |
| `openclaw gateway run` | 前台运行Gateway |
| `openclaw gateway health` | 获取Gateway健康状态 |
| `openclaw gateway probe` | 检查Gateway连通性 |
| `openclaw gateway install` | 安装Gateway服务 (launchd/systemd) |
| `openclaw gateway uninstall` | 卸载Gateway服务 |
| `openclaw gateway usage-cost` | 获取使用成本摘要 |

### Gateway启动选项
```bash
openclaw gateway --port 18789          # 指定端口
openclaw gateway --force                # 强制启动 (杀掉占用进程)
openclaw gateway --bind lan             # 绑定到局域网
openclaw gateway --token <token>        # 指定认证token
openclaw gateway --tailscale serve       # Tailscale暴露模式
```

---

## 5. 频道管理 (Channels)

| 指令 | 说明 |
|------|------|
| `openclaw channels list` | 列出配置的频道 |
| `openclaw channels add` | 添加频道账户 |
| `openclaw channels login` | 登录频道 (如WhatsApp Web) |
| `openclaw channels logout` | 登出频道 |
| `openclaw channels status` | 频道状态 |
| `openclaw channels remove` | 移除频道 |
| `openclaw channels capabilities` | 显示频道能力 |
| `openclaw channels resolve <name>` | 解析频道/用户名到ID |

---

## 6. 定时任务 (Cron)

| 指令 | 说明 |
|------|------|
| `openclaw cron list` | 列出cron任务 |
| `openclaw cron add` | 添加cron任务 |
| `openclaw cron edit <id>` | 编辑cron任务 |
| `openclaw cron rm <id>` | 删除cron任务 |
| `openclaw cron enable <id>` | 启用cron任务 |
| `openclaw cron disable <id>` | 禁用cron任务 |
| `openclaw cron run <id>` | 立即运行cron任务 |
| `openclaw cron runs <id>` | 查看任务执行历史 |
| `openclaw cron status` | cron调度器状态 |

---

## 7. 技能管理 (Skills)

| 指令 | 说明 |
|------|------|
| `openclaw skills list` | 列出所有可用技能 |
| `openclaw skills info <skill>` | 显示技能详情 |
| `openclaw skills check` | 检查技能就绪状态 |

---

## 8. 插件管理 (Plugins)

| 指令 | 说明 |
|------|------|
| `openclaw plugins list` | 列出已发现插件 |
| `openclaw plugins install <spec>` | 安装插件 |
| `openclaw plugins update` | 更新插件 |
| `openclaw plugins disable <id>` | 禁用插件 |
| `openclaw plugins enable <id>` | 启用插件 |
| `openclaw plugins info <id>` | 插件详情 |
| `openclaw plugins doctor` | 报告插件加载问题 |

---

## 9. 消息发送 (Message)

| 指令 | 说明 |
|------|------|
| `openclaw message send --target <id> --message "内容"` | 发送消息 |
| `openclaw message send --channel telegram --target @xxx --media photo.jpg` | 发送媒体 |
| `openclaw message broadcast` | 广播消息到多个目标 |
| `openclaw message delete` | 删除消息 |
| `openclaw message edit` | 编辑消息 |
| `openclaw message react --emoji "✅"` | 添加反应 |
| `openclaw message poll` | 发送投票 |
| `openclaw message read` | 读取最近消息 |
| `openclaw message search` | 搜索消息 |

### 消息操作
```bash
openclaw message pin           # 置顶消息
openclaw message unpin         # 取消置顶
openclaw message ban           # 封禁成员
openclaw message kick          # 踢出成员
openclaw message timeout      # 禁言成员
openclaw message thread       # 话题操作
openclaw message voice        # 语音操作
```

---

## 10. 浏览器控制 (Browser)

| 指令 | 说明 |
|------|------|
| `openclaw browser start` | 启动浏览器 |
| `openclaw browser stop` | 停止浏览器 |
| `openclaw browser status` | 浏览器状态 |
| `openclaw browser tabs` | 列出标签页 |
| `openclaw browser open <url>` | 打开URL |
| `openclaw browser snapshot` | 截图 |
| `openclaw browser screenshot --full-page` | 全页截图 |
| `openclaw browser navigate <url>` | 导航到URL |
| `openclaw browser click <ref>` | 点击元素 |
| `openclaw browser type <ref> "文本"` | 输入文本 |
| `openclaw browser press <key>` | 按键 |
| `openclaw browser hover <ref>` | 悬停 |
| `openclaw browser fill` | 表单填充 |
| `openclaw browser evaluate` | 执行JS |
| `openclaw browser console` | 控制台日志 |
| `openclaw browser errors` | 页面错误 |
| `openclaw browser pdf` | 保存为PDF |
| `openclaw browser profiles` | 列出浏览器配置 |
| `openclaw browser create-profile` | 创建配置 |
| `openclaw browser reset-profile` | 重置配置 |

---

## 11. 设备配对 (Devices)

| 指令 | 说明 |
|------|------|
| `openclaw devices list` | 列出已配对设备 |
| `openclaw devices approve <id>` | 批准配对请求 |
| `openclaw devices reject <id>` | 拒绝配对请求 |
| `openclaw devices revoke <role>` | 撤销设备token |
| `openclaw devices rotate <role>` | 轮换设备token |

---

## 12. 记忆搜索 (Memory)

| 指令 | 说明 |
|------|------|
| `openclaw memory search <query>` | 搜索记忆文件 |
| `openclaw memory index` | 重新索引记忆 |
| `openclaw memory status` | 记忆索引状态 |

---

## 13. 会话管理 (Sessions)

| 指令 | 说明 |
|------|------|
| `openclaw sessions` | 列出所有会话 |
| `openclaw sessions --active 120` | 最近2小时活跃会话 |
| `openclaw sessions --json` | JSON格式输出 |

---

## 14. 系统工具 (System)

| 指令 | 说明 |
|------|------|
| `openclaw system event` | 发送系统事件 |
| `openclaw system heartbeat` | 心跳控制 |
| `openclaw system presence` | 列出系统在线状态 |

---

## 15. 钩子管理 (Hooks)

| 指令 | 说明 |
|------|------|
| `openclaw hooks list` | 列出所有钩子 |
| `openclaw hooks install <spec>` | 安装钩子包 |
| `openclaw hooks update` | 更新钩子 |
| `openclaw hooks enable <id>` | 启用钩子 |
| `openclaw hooks disable <id>` | 禁用钩子 |
| `openclaw hooks info <id>` | 钩子详情 |
| `openclaw hooks check` | 检查钩子状态 |

---

## 16. 状态与诊断

| 指令 | 说明 |
|------|------|
| `openclaw status` | 频道健康状态 |
| `openclaw status --deep` | 深度检查 (含频道探测) |
| `openclaw status --usage` | 显示模型使用量 |
| `openclaw status --json` | JSON格式输出 |
| `openclaw doctor` | 健康检查 + 快速修复 |
| `openclaw doctor --fix` | 自动修复问题 |
| `openclaw doctor --generate-gateway-token` | 生成Gateway token |
| `openclaw security audit` | 安全审计 |

---

## 17. 初始化与配置

| 指令 | 说明 |
|------|------|
| `openclaw setup` | 初始化配置和工作区 |
| `openclaw setup --wizard` | 交互式引导 |
| `openclaw setup --mode local` | 本地模式 |
| `openclaw setup --mode remote` | 远程模式 |
| `openclaw configure` | 交互式设置凭据/设备 |
| `openclaw configure --section model` | 只配置模型 |

---

## 18. 更新与升级

| 指令 | 说明 |
|------|------|
| `openclaw update` | 更新到最新版本 |
| `openclaw update --channel stable` | 切换到稳定版 |
| `openclaw update --channel beta` | 切换到测试版 |
| `openclaw update --channel dev` | 切换到开发版 |
| `openclaw update status` | 查看更新状态 |
| `openclaw update wizard` | 交互式更新向导 |

---

## 19. 节点管理 (Node)

| 指令 | 说明 |
|------|------|
| `openclaw node run` | 运行headless节点 |
| `openclaw node status` | 节点状态 |
| `openclaw node start` | 启动节点服务 |
| `openclaw node stop` | 停止节点服务 |
| `openclaw node restart` | 重启节点服务 |
| `openclaw node install` | 安装节点服务 |
| `openclaw node uninstall` | 卸载节点服务 |

---

## 20. 日志与调试

| 指令 | 说明 |
|------|------|
| `openclaw logs` | 查看Gateway日志 |
| `openclaw logs --follow` | 实时跟踪日志 |
| `openclaw logs --limit 50` | 最近50条 |
| `openclaw logs --json` | JSON格式 |

---

## 21. 消息目录 (Directory)

| 指令 | 说明 |
|------|------|
| `openclaw directory self` | 当前账户信息 |
| `openclaw directory peers` | 联系人列表 |
| `openclaw directory groups` | 群组列表 |

---

## 22. Webhooks

| 指令 | 说明 |
|------|------|
| `openclaw webhooks list` | 列出webhooks |
| `openclaw webhooks add` | 添加webhook |
| `openclaw webhooks remove` | 移除webhook |

---

## 23. 常用配置示例

### 配置API Key
```bash
# 方式1: 环境变量
openclaw config set env.MINIMAX_API_KEY "sk-xxx"

# 方式2: 直接配置模型
openclaw config set models.providers.minimax.apiKey "sk-xxx"

# 方式3: Auth profiles (推荐)
openclaw models auth add
```

### 添加Agent
```bash
openclaw agents add 墨析
openclaw agents set-identity 墨析 --name "墨析" --emoji "📊"
```

### 配置频道
```bash
openclaw channels add telegram
openclaw channels login
```

### 设置定时任务
```bash
openclaw cron add --schedule "0 8 * * *" --message "每日报告"
```

---

## 24. 全局选项

| 选项 | 说明 |
|------|------|
| `--help, -h` | 显示帮助 |
| `--version, -V` | 显示版本 |
| `--json` | JSON输出 |
| `--verbose` | 详细输出 |
| `--dev` | 开发模式 (隔离配置) |
| `--profile <name>` | 指定配置 profile |
| `--no-color` | 禁用颜色 |

---

*最后更新: 2026-03-03*
