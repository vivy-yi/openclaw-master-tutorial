# 附录A: 命令速查手册

> 快速查找 OpenClaw 的常用命令，建议收藏备用

---

## 命令分类索引

| 分类 | 命令数量 | 说明 |
|-----|---------|-----|
| [基础命令](#基础命令) | 8 | 启动、停止、查看状态等 |
| [配置命令](#配置命令) | 12 | 查看和修改配置 |
| [Gateway管理](#gateway管理) | 10 | 网关启动、重启、监控 |
| [渠道管理](#渠道管理) | 8 | 聊天渠道的配置和登录 |
| [Skills管理](#skills管理) | 10 | 技能的安装、更新、卸载 |
| [诊断调试](#诊断调试) | 6 | 问题排查和调试 |

---

## 基础命令

### 查看版本
```bash
openclaw --version
```

### 查看帮助
```bash
openclaw --help
openclaw <command> --help    # 查看具体命令的帮助
```

### 初始化配置
```bash
openclaw onboard              # 交互式初始化向导
openclaw onboard --install-daemon  # 初始化并安装守护进程
```

### 打开Dashboard
```bash
openclaw dashboard            # 在浏览器中打开Web界面
```

### 更新OpenClaw
```bash
openclaw update               # 检查并更新到最新版本
npm update -g openclaw        # 使用npm更新
```

### 查看系统信息
```bash
openclaw doctor               # 诊断系统问题
openclaw doctor --fix         # 自动修复问题
```

---

## 配置命令

### 查看配置
```bash
openclaw config               # 显示当前配置
openclaw config get <key>     # 获取特定配置项
openclaw config get agents.defaults.model  # 查看默认模型
openclaw config get gateway.port           # 查看网关端口
```

### 设置配置
```bash
openclaw config set <key> <value>          # 设置配置项
openclaw config set gateway.port 18790     # 修改端口
openclaw config set agents.defaults.model.primary "deepseek-chat"
```

### 常用配置项

| 配置项 | 说明 | 示例 |
|-------|-----|-----|
| `gateway.port` | 网关端口 | `18789` |
| `gateway.bind` | 绑定地址 | `0.0.0.0` 或 `127.0.0.1` |
| `gateway.auth.mode` | 认证模式 | `token` 或 `none` |
| `agents.defaults.model` | 默认模型 | `claude-3-5-sonnet` |
| `agents.defaults.apiKey` | API密钥 | `sk-...` |
| `channels.telegram.enabled` | 启用Telegram | `true` |

### 配置文件位置
```bash
# 查看配置文件路径
openclaw config path          # 显示配置文件位置

# 手动编辑配置文件
~/.openclaw/openclaw.json     # Linux/macOS
%USERPROFILE%\.openclaw\openclaw.json  # Windows
```

---

## Gateway管理

### 启动Gateway
```bash
openclaw gateway              # 前台运行（按Ctrl+C停止）
openclaw gateway run          # 同上
openclaw gateway start        # 后台启动
```

### 停止Gateway
```bash
openclaw gateway stop         # 停止后台运行的网关
```

### 重启Gateway
```bash
openclaw gateway restart      # 重启网关
```

### 查看状态
```bash
openclaw gateway status       # 查看网关运行状态
openclaw gateway logs         # 查看日志
openclaw gateway logs -f      # 实时跟踪日志
```

### 守护进程管理
```bash
openclaw gateway install      # 安装为系统服务（开机自启）
openclaw gateway uninstall    # 卸载系统服务

# macOS/Linux systemd
openclaw daemon start         # 启动守护进程
openclaw daemon stop          # 停止守护进程
openclaw daemon restart       # 重启守护进程
openclaw daemon status        # 查看守护进程状态
```

---

## 渠道管理

### 查看渠道
```bash
openclaw channels list        # 列出所有已配置的渠道
openclaw channels status      # 查看渠道连接状态
```

### 配置渠道
```bash
# Telegram
openclaw channels login --channel telegram
openclaw config set channels.telegram.token "你的Bot Token"
openclaw config set channels.telegram.enabled true

# 飞书
openclaw channels login --channel feishu
openclaw config set channels.feishu.appId "你的App ID"
openclaw config set channels.feishu.appSecret "你的App Secret"
openclaw config set channels.feishu.enabled true

# 企业微信
openclaw channels login --channel wechat
openclaw config set channels.wechat.corpId "你的Corp ID"
openclaw config set channels.wechat.secret "你的Secret"
```

### 启用/禁用渠道
```bash
openclaw config set channels.telegram.enabled false   # 禁用
openclaw config set channels.telegram.enabled true    # 启用
```

---

## Skills管理

### 查看Skills
```bash
openclaw skills list          # 列出已安装的Skills
openclaw skills list --available  # 列出可安装的Skills
openclaw skills info <name>   # 查看Skill详细信息
```

### 安装Skills
```bash
openclaw skills install <name>        # 安装指定Skill
openclaw skills install web-search    # 安装网页搜索技能
openclaw skills install github        # 安装GitHub集成技能
```

### 更新Skills
```bash
openclaw skills update <name>         # 更新指定Skill
openclaw skills update --all          # 更新所有Skills
```

### 卸载Skills
```bash
openclaw skills uninstall <name>      # 卸载指定Skill
```

### 常用Skills推荐

| Skill名称 | 功能 | 安装命令 |
|----------|-----|---------|
| `web-search` | 网页搜索 | `openclaw skills install web-search` |
| `github` | GitHub集成 | `openclaw skills install github` |
| `calendar` | 日历管理 | `openclaw skills install calendar` |
| `notes` | 备忘录管理 | `openclaw skills install notes` |
| `browser` | 浏览器控制 | `openclaw skills install browser` |
| `weather` | 天气查询 | `openclaw skills install weather` |
| `todoist` | Todoist集成 | `openclaw skills install todoist` |
| `slack` | Slack集成 | `openclaw skills install slack` |

---

## 诊断调试

### 系统诊断
```bash
openclaw doctor               # 全面系统检查
openclaw doctor --fix         # 自动修复可修复的问题
```

### 日志查看
```bash
# Gateway日志
openclaw gateway logs
openclaw gateway logs -n 100  # 查看最后100行
openclaw gateway logs -f      # 实时跟踪

# 查看特定级别日志
openclaw gateway logs --level error
openclaw gateway logs --level debug
```

### 调试模式
```bash
# 以调试模式启动
DEBUG=openclaw:* openclaw gateway

# 或设置环境变量
export DEBUG=openclaw:*
openclaw gateway
```

### 网络检查
```bash
# 检查端口占用
lsof -i :18789                # macOS/Linux
netstat -ano | findstr 18789  # Windows

# 测试API连接
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## 快速操作示例

### 场景1: 快速重启并查看日志
```bash
openclaw gateway restart && openclaw gateway logs -f
```

### 场景2: 安装常用Skills套装
```bash
openclaw skills install web-search
openclaw skills install calendar
openclaw skills install notes
openclaw skills install browser
```

### 场景3: 修改端口并重启
```bash
openclaw config set gateway.port 18790
openclaw gateway restart
```

### 场景4: 切换到DeepSeek模型
```bash
openclaw config set agents.defaults.model.provider openai
openclaw config set agents.defaults.model.model deepseek-chat
openclaw config set agents.defaults.model.baseUrl https://api.deepseek.com/v1
openclaw config set agents.defaults.model.apiKey "你的DeepSeek API Key"
openclaw gateway restart
```

---

## 错误代码速查

| 错误信息 | 可能原因 | 解决方案 |
|---------|---------|---------|
| `EACCES: permission denied` | 权限不足 | 使用`sudo`或修改目录权限 |
| `EADDRINUSE: port 18789` | 端口被占用 | 结束占用进程或更换端口 |
| `ECONNREFUSED` | 服务未启动 | 启动Gateway |
| `Invalid API key` | API Key错误 | 检查Key是否正确 |
| `Model not found` | 模型名称错误 | 检查模型名称拼写 |
| `Skill not found` | Skill不存在 | 检查Skill名称或从ClawHub安装 |

---

## 环境变量

| 变量名 | 说明 | 示例 |
|-------|-----|-----|
| `OPENCLAW_CONFIG_PATH` | 配置文件路径 | `/path/to/config` |
| `OPENAI_API_KEY` | OpenAI API Key | `sk-...` |
| `ANTHROPIC_API_KEY` | Anthropic API Key | `sk-ant-...` |
| `DEBUG` | 调试模式 | `openclaw:*` |
| `NODE_ENV` | 环境类型 | `production` |

---

## 参考链接

- [OpenClaw CLI 官方文档](https://docs.openclaw.ai/cli)
- [配置参考](../appendices/appendix-b/)
- [故障排查](../appendices/appendix-d/)
