# OpenClaw CLI 指令速查表 (Cheatsheet)

> 版本: 2026.5.7 | 更新: 2026-05-15
> 对应 OpenClaw `openclaw` 主命令及其所有子命令。输入 `openclaw <command> --help` 查看子命令详情。

---

## 0. 全局选项

| 选项 | 说明 |
|------|------|
| `openclaw --help, -h` | 显示帮助 |
| `openclaw --version, -V` | 显示版本 |
| `openclaw --json` | JSON 输出 |
| `openclaw --verbose` | 详细输出 |
| `openclaw --dev` | 开发模式（隔离配置，端口 19001） |
| `openclaw --profile <name>` | 指定配置 profile（隔离 state/config 目录） |
| `openclaw --no-color` | 禁用 ANSI 颜色 |
| `openclaw --container <name>` | 在 Podman/Docker 容器中运行 |

---

## 1. 配置管理 (Config)

| 指令 | 说明 |
|------|------|
| `openclaw config` | 启动配置向导（交互式） |
| `openclaw config get <path>` | 获取配置值，如 `models.providers.minimax.apiKey` |
| `openclaw config set <path> <value>` | 设置配置值 |
| `openclaw config unset <path>` | 删除配置项 |
| `openclaw config file` | 查看配置文件路径 |
| `openclaw config validate` | 验证配置文件 |

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
| `openclaw models auth add --agent <id>` | 为指定 agent 添加认证 |
| `openclaw models auth paste-token` | 粘贴 token 到 auth-profiles.json |
| `openclaw models auth login` | 运行 provider 插件认证流程（OAuth） |
| `openclaw models auth order` | 管理认证顺序 |
| `openclaw models auth list` | 列出当前认证配置 |

---

## 3. Agent 管理 (Agents)

> 管理隔离的 Agent 工作区、认证与路由绑定。

| 指令 | 说明 |
|------|------|
| `openclaw agents list` | 列出所有配置的 agent |
| `openclaw agents add <id>` | 添加新隔离 agent |
| `openclaw agents delete <id>` | 删除 agent 及工作区/状态 |
| `openclaw agents set-identity <id>` | 更新 agent 身份（name/theme/emoji/avatar） |
| `openclaw agents bind <agentId>` | 添加路由绑定（将特定消息路由到指定 agent） |
| `openclaw agents unbind <agentId>` | 移除路由绑定 |
| `openclaw agents bindings` | 列出所有路由绑定 |

---

## 4. 网关管理 (Gateway)

| 指令 | 说明 |
|------|------|
| `openclaw gateway start` | 启动 Gateway 服务 |
| `openclaw gateway stop` | 停止 Gateway 服务 |
| `openclaw gateway restart` | 重启 Gateway 服务 |
| `openclaw gateway status` | 查看 Gateway 状态 |
| `openclaw gateway run` | 前台运行 Gateway |
| `openclaw gateway health` | 获取 Gateway 健康状态 |
| `openclaw gateway probe` | 检查 Gateway 连通性 |
| `openclaw gateway install` | 安装 Gateway 服务（launchd/systemd） |
| `openclaw gateway uninstall` | 卸载 Gateway 服务 |
| `openclaw gateway usage-cost` | 获取使用成本摘要 |

### Gateway 启动选项
```bash
openclaw gateway --port 18789              # 指定端口
openclaw gateway --force                    # 强制启动（杀掉占用进程）
openclaw gateway --bind lan                # 绑定到局域网（接受 LAN 连接）
openclaw gateway --bind tailnet            # 绑定到 Tailscale 网络
openclaw gateway --bind loopback           # 仅本地（默认）
openclaw gateway --bind auto               # 自动选择
openclaw gateway --token <token>           # 指定认证 token
openclaw gateway --tailscale serve         # 通过 Tailscale 暴露
openclaw gateway --cli-backend-logs        # 启用 CLI 日志
openclaw --dev gateway                     # 开发模式运行 Gateway
```

---

## 5. 频道管理 (Channels)

| 指令 | 说明 |
|------|------|
| `openclaw channels list` | 列出已配置的频道 |
| `openclaw channels add` | 添加频道账户 |
| `openclaw channels login` | 登录频道（如 WhatsApp Web） |
| `openclaw channels logout` | 登出频道 |
| `openclaw channels status` | 频道状态 |
| `openclaw channels remove` | 移除频道 |
| `openclaw channels capabilities` | 显示频道能力 |
| `openclaw channels resolve <name>` | 解析频道/用户名到 ID |

---

## 6. 定时任务 (Cron)

| 指令 | 说明 |
|------|------|
| `openclaw cron list` | 列出 cron 任务 |
| `openclaw cron add` | 添加 cron 任务 |
| `openclaw cron edit <id>` | 编辑 cron 任务 |
| `openclaw cron rm <id>` | 删除 cron 任务 |
| `openclaw cron enable <id>` | 启用 cron 任务 |
| `openclaw cron disable <id>` | 禁用 cron 任务 |
| `openclaw cron run <id>` | 立即运行 cron 任务 |
| `openclaw cron runs <id>` | 查看任务执行历史 |
| `openclaw cron status` | cron 调度器状态 |
| `openclaw cron remove <id>` | 删除 cron 任务（rm 的别名） |

---

## 7. 技能管理 (Skills)

| 指令 | 说明 |
|------|------|
| `openclaw skills list` | 列出所有可用技能（含状态：✅ ready / ⚠️ needs setup） |
| `openclaw skills info <skill>` | 显示技能详情 |
| `openclaw skills check` | 检查技能就绪状态，刷新检测 |

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
| `openclaw message pin` | 置顶消息 |
| `openclaw message unpin` | 取消置顶 |
| `openclaw message thread` | 话题操作 |
| `openclaw message voice` | 语音操作 |

---

## 10. 浏览器控制 (Browser)

| 指令 | 说明 |
|------|------|
| `openclaw browser start` | 启动浏览器 |
| `openclaw browser stop` | 停止浏览器 |
| `openclaw browser status` | 浏览器状态 |
| `openclaw browser tabs` | 列出标签页 |
| `openclaw browser open <url>` | 打开 URL |
| `openclaw browser snapshot` | 页面快照（可取元素引用） |
| `openclaw browser screenshot --full-page` | 全页截图 |
| `openclaw browser screenshot --selector <ref>` | 指定元素截图 |
| `openclaw browser navigate <url>` | 导航到 URL |
| `openclaw browser click <ref>` | 点击元素 |
| `openclaw browser type <ref> "文本"` | 输入文本 |
| `openclaw browser press <key>` | 按键 |
| `openclaw browser hover <ref>` | 悬停 |
| `openclaw browser fill` | 表单填充 |
| `openclaw browser evaluate <js>` | 执行 JS |
| `openclaw browser console` | 控制台日志 |
| `openclaw browser errors` | 页面错误 |
| `openclaw browser pdf` | 保存为 PDF |
| `openclaw browser profiles` | 列出浏览器配置 |
| `openclaw browser create-profile` | 创建配置 |
| `openclaw browser reset-profile` | 重置配置 |

---

## 11. 设备配对 (Devices / Pairing)

| 指令 | 说明 |
|------|------|
| `openclaw devices list` | 列出已配对设备 |
| `openclaw devices approve <id>` | 批准配对请求 |
| `openclaw devices reject <id>` | 拒绝配对请求 |
| `openclaw devices revoke <role>` | 撤销设备 token |
| `openclaw devices rotate <role>` | 轮换设备 token |
| `openclaw pairing *` | 安全私信配对（approve/reject） |

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
| `openclaw sessions --active 120` | 最近 2 小时活跃会话 |
| `openclaw sessions --json` | JSON 格式输出 |

---

## 14. MCP 管理

| 指令 | 说明 |
|------|------|
| `openclaw mcp list` | 列出已配置的 MCP Server |
| `openclaw mcp add <name> <command>` | 添加 MCP Server |
| `openclaw mcp remove <name>` | 移除 MCP Server |
| `openclaw mcp start <name>` | 启动 MCP Server |
| `openclaw mcp stop <name>` | 停止 MCP Server |
| `openclaw mcp status` | MCP 状态 |

---

## 15. 系统工具 (System)

| 指令 | 说明 |
|------|------|
| `openclaw system event` | 发送系统事件 |
| `openclaw system heartbeat` | 心跳控制 |
| `openclaw system presence` | 列出系统在线状态 |

---

## 16. 状态与诊断

| 指令 | 说明 |
|------|------|
| `openclaw status` | 频道健康状态 |
| `openclaw status --deep` | 深度检查（含频道探测） |
| `openclaw status --usage` | 显示模型使用量 |
| `openclaw status --json` | JSON 格式输出 |
| `openclaw health` | 从运行中的 Gateway 获取健康状态 |
| `openclaw doctor` | 健康检查 + 快速修复 |
| `openclaw doctor --fix` | 自动修复问题 |
| `openclaw doctor --generate-gateway-token` | 生成 Gateway token |
| `openclaw security audit` | 安全审计 |

---

## 17. 初始化与配置

| 指令 | 说明 |
|------|------|
| `openclaw setup` | 初始化配置和工作区 |
| `openclaw setup --wizard` | 交互式引导 |
| `openclaw setup --mode local` | 本地模式 |
| `openclaw setup --mode remote` | 远程模式 |
| `openclaw configure` | 交互式设置凭证/渠道/设备 |
| `openclaw configure --section model` | 只配置模型 |
| `openclaw onboard` | Gateway/工作区/Skills 交互式引导（新用户） |

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
| `openclaw update run` | 执行更新 |

---

## 19. 节点管理 (Node)

| 指令 | 说明 |
|------|------|
| `openclaw node run` | 运行 headless 节点 |
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
| `openclaw logs` | 查看 Gateway 日志（通过 RPC） |
| `openclaw logs --follow` | 实时跟踪日志 |
| `openclaw logs --limit 50` | 最近 50 条 |
| `openclaw logs --json` | JSON 格式 |
| `openclaw proxy` | 运行 OpenClaw 调试代理，捕获流量 |
| `openclaw proxy --port <port>` | 指定代理端口 |

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
| `openclaw webhooks list` | 列出 webhooks |
| `openclaw webhooks add` | 添加 webhook |
| `openclaw webhooks remove` | 移除 webhook |

---

## 23. 任务状态 (Tasks)

| 指令 | 说明 |
|------|------|
| `openclaw tasks` | 检查持久化后台任务状态 |

---

## 24. 沙箱管理 (Sandbox)

| 指令 | 说明 |
|------|------|
| `openclaw sandbox *` | 管理 Agent 隔离沙箱容器 |

---

## 25. 审批管理 (Approvals)

> 管理 Gateway 或 Node Host 上的 exec 审批策略。

| 指令 | 说明 |
|------|------|
| `openclaw approvals get` | 获取当前 exec 审批快照 |
| `openclaw approvals set <file.json>` | 用 JSON 文件替换审批策略 |
| `openclaw approvals allowlist --agent <id>` | 编辑指定 agent 的白名单 |

## 26. 备份 (Backup)

| 指令 | 说明 |
|------|------|
| `openclaw backup create` | 创建本地备份归档 |
| `openclaw backup verify` | 验证备份完整性 |

---

## 27. 节点配对管理 (Nodes)

> 管理网关拥有的配对节点（状态/调用/媒体捕获），与 `node *`（Headless 节点服务）是两个不同命令。

| 指令 | 说明 |
|------|------|
| `openclaw nodes list` | 列出待处理和已配对节点 |
| `openclaw nodes status` | 列出已知节点及连接状态和能力 |
| `openclaw nodes pending` | 显示待配对请求 |
| `openclaw nodes approve <id>` | 批准配对请求 |
| `openclaw nodes reject <id>` | 拒绝配对请求 |
| `openclaw nodes rename <id>` | 重命名节点（显示名） |
| `openclaw nodes describe <id>` | 查看节点能力和支持的调用命令 |
| `openclaw nodes invoke --node <id> --command <cmd> --params '{}'` | 在节点上调用命令 |
| `openclaw nodes notify --node <id> --body "消息"` | 在节点发送本地通知（仅 macOS） |
| `openclaw nodes camera snap --node <id>` | 捕获节点摄像头照片 |
| `openclaw nodes screen --node <id>` | 捕获节点屏幕录像 |
| `openclaw nodes canvas --node <id>` | 捕获节点画布内容 |
| `openclaw nodes location --node <id>` | 获取节点位置信息 |
| `openclaw nodes push --node <id>` | 向 iOS 节点发送 APNs 测试推送 |

## 28. Shell 补全

| 指令 | 说明 |
|------|------|
| `openclaw completion` | 生成 Shell 补全脚本（支持 bash/zsh/fish） |

---

## 29. 其他命令

| 指令 | 说明 |
|------|------|
| `openclaw docs` | 搜索 OpenClaw 实时文档 |
| `openclaw qr` | 生成移动端配对 QR 码 |
| `openclaw dashboard` | 用当前 token 打开 Control UI |
| `openclaw tui` | 打开连接到 Gateway 的终端 UI |
| `openclaw reset` | 重置本地配置/状态（保留 CLI） |
| `openclaw uninstall` | 卸载 Gateway 服务 + 数据（保留 CLI） |
| `openclaw daemon *` | Gateway 服务（`gateway` 的传统别名） |
| `openclaw clawbot qr` | 生成移动端配对 QR 码（clawbot 的主命令） |
| `openclaw infer` / `openclaw capability` | 基于 Provider 的推理命令 |
| `openclaw dns *` | DNS 辅助工具（Tailscale + CoreDNS） |
| `openclaw exec-policy *` | 显示/同步 exec 策略与主机审批 |
| `openclaw secrets *` | Secrets 运行时重载控制 |
| `openclaw acp *` | Agent Control Protocol 工具 |
| `openclaw hooks *` | 管理内部 Agent Hooks |
| `openclaw pairing *` | 安全私信配对管理 |

---

## 30. 常用配置示例

### 配置 API Key
```bash
# 方式1: 环境变量
openclaw config set env.MINIMAX_API_KEY "sk-xxx"

# 方式2: 直接配置模型
openclaw config set models.providers.minimax.apiKey "sk-xxx"

# 方式3: Auth profiles（推荐）
openclaw models auth add
```

### 添加 Agent 并配置路由
```bash
openclaw agents add mo-finance
openclaw agents set-identity mo-finance --name "墨财" --emoji "💹"
openclaw agents bind mo-finance           # 绑定路由
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

### MCP Server 配置
```bash
openclaw mcp add my-server "npx --yes my-mcp-server"
openclaw mcp list
```

---

## 31. 命令树总览

```
openclaw
├── acp *                  Agent Control Protocol 工具
├── agent                  单次调用 Gateway Agent
├── agents *               Agent 工作区/认证/路由管理
│   ├── list / add / delete / set-identity
│   └── bind / bindings / unbind
├── backup *               备份创建与验证
├── capability / infer     基于 Provider 的推理
├── channels *             频道管理（Telegram/Discord/飞书等）
├── clawbot *              传统 clawbot 别名
├── completion             生成 Shell 补全脚本
├── config *               配置 get/set/unset/validate
├── configure              交互式配置向导
├── cron *                 定时任务管理
├── daemon *               Gateway 服务别名
├── dashboard              打开 Control UI
├── devices *              设备配对与 token 管理
├── directory *            联系人/群组 ID 查找
├── dns *                  DNS 辅助（Tailscale + CoreDNS）
├── docs                   搜索 OpenClaw 文档
├── doctor                 健康检查 + 快速修复
├── exec-policy *          Exec 策略与主机审批
├── gateway *              Gateway 服务（核心）
├── health                 获取 Gateway 健康状态
├── hooks *                Agent Hooks 管理
├── logs                   Gateway 日志追踪
├── mcp *                  MCP 配置与渠道桥接
├── memory                 记忆搜索/索引
├── models *               模型发现/配置/认证
├── node *                 Headless 节点服务
├── onboard                交互式新用户引导
├── pairing *              安全私信配对
├── plugins *              插件管理
├── proxy *                调试代理（流量捕获）
├── qr                      生成配对 QR 码
├── reset                  重置本地配置
├── sandbox *              沙箱容器管理
├── secrets *              Secrets 运行时控制
├── security *             安全审计
├── sessions *             会话管理
├── setup                  初始化配置和工作区
├── skills *               Skills 列表/检查
├── status                 渠道健康状态
├── system *               系统事件/心跳/在线状态
├── tasks *                后台任务状态
├── tui                     终端 UI
├── uninstall               卸载 Gateway + 数据
├── update *                更新与版本管理
└── webhooks *             Webhook 管理
```

---

## 32. 高频命令速查（日常使用 Top 10）

| 排名 | 命令 | 场景 |
|------|------|------|
| 1 | `openclaw status` | 快速了解系统整体状态 |
| 2 | `openclaw skills list` | 查看可用技能及状态 |
| 3 | `openclaw gateway status` | Gateway 是否在跑 |
| 4 | `openclaw doctor` | 出问题时一键诊断 |
| 5 | `openclaw message send --channel telegram --target @xxx --message "..."` | 发送消息 |
| 6 | `openclaw cron list` | 查看定时任务 |
| 7 | `openclaw config get` | 查看当前配置 |
| 8 | `openclaw models list` | 查看已配置模型 |
| 9 | `openclaw channels status` | 渠道连通性 |
| 10 | `openclaw logs --limit 20` | 最近日志 |

---

*最后更新: 2026-04-20（对应 OpenClaw 2026.4.15）*
