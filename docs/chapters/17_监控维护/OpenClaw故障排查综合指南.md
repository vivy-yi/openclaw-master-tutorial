# OpenClaw 故障排查指南

> **采集时间**: 2026-06-01
> **评分标准**: ⭐⭐⭐⭐⭐ 必收录 | ⭐⭐⭐⭐ 收录

---

## 🌟 必收录资源

### 官方文档

| 资源 | URL | 说明 |
|------|-----|------|
| **Troubleshooting** | https://docs.openclaw.ai/gateway/troubleshooting | 官方故障排查 |
| **General Troubleshooting** | https://docs.openclaw.ai/help/troubleshooting | 通用故障排查 |
| **Quick Diagnostics** | https://openclaw-openclaw.mintlify.app/guides/troubleshooting | 快速诊断 |

---

## ⭐⭐⭐⭐ 收录资源

### 社区指南

| 资源 | URL | 说明 |
|------|-----|------|
| **Reddit Common Failures** | https://www.reddit.com/r/openclaw/comments/1r4uj75/troubleshooting_common_failures | 常见失败 |
| **Tencent Cloud Guide** | https://www.tencentcloud.com/techpedia/139711 | 应用故障排查 |
| **LumaDock Fixes** | https://lumadock.com/tutorials/openclaw-troubleshooting-common-errors | 实用修复 |
| **Kevin Jeppesen Fix** | https://www.youtube.com/watch?v=YWqwXYA7yrU | 视频修复指南 |

---

## 🔍 快速诊断命令

### 首先运行这些

```bash
# 综合健康检查
openclaw doctor

# 安全审计
openclaw security audit --deep

# 渠道状态
openclaw channels status --probe

# Gateway健康
openclaw gateway status

# 查看实时日志
openclaw logs --follow
```

### 诊断命令详解

| 命令 | 检查内容 |
|------|---------|
| `openclaw doctor` | 配置问题、端口冲突、权限 |
| `openclaw doctor --fix` | 自动修复已知问题 |
| `openclaw status` | 快速状态概览 |
| `openclaw status --all` | 详细状态报告 |
| `openclaw channels status --probe` | 按渠道显示失败签名 |
| `openclaw gateway status --deep` | 详细Gateway状态 |
| `openclaw browser status` | 浏览器控制服务 |

---

## 🛠️ 常见问题及解决方案

### 1. Gateway无法启动

**症状**: Gateway启动后立即退出或崩溃

**常见错误签名**:
```
Gateway start blocked: set gateway.mode=local
existing config is missing gateway.mode
refusing to bind gateway ... without auth
another gateway instance is already listening (EADDRINUSE)
```

**解决方案**:

```bash
# 检查配置文件
cat ~/.openclaw/openclaw.json | jq .

# 设置local模式
openclaw config set gateway.mode "local"

# 修复配置
openclaw doctor --fix

# 清理端口冲突
lsof -i :18789
kill -9 <PID>
```

### 2. openclaw命令找不到

**症状**: 安装成功但终端中找不到openclaw命令

**解决方案**:

```bash
# 检查Node和npm
node -v
npm prefix -g

# 检查PATH
echo $PATH

# 添加到PATH (~/.zshrc或~/.bashrc)
export PATH="$(npm prefix -g)/bin:$PATH"

# 刷新shell
source ~/.zshrc
```

### 3. 渠道连接但无消息

**症状**: Bot在线但不回复消息

**诊断**:
```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw channels status --probe
```

**常见日志签名**:
- `drop guild message (mention required)` → 群组中需要@mention
- `pairing request` → 发送者未批准等待DM配对
- `blocked` / `allowlist` → 发送者/房间/群组被过滤

**解决方案**:
- 检查`requireMention`设置
- 使用`openclaw pairing list <channel>`查看待批准请求
- 使用`openclaw pairing approve <channel> <CODE>`批准

### 4. Heartbeat/Cron不运行

**症状**: 定时任务未按预期运行

**诊断**:
```bash
openclaw cron list
openclaw logs | grep -E "cron|heartbeat"
```

**常见日志签名**:
- `cron: scheduler disabled; jobs will not run automatically` → Cron已禁用
- `heartbeat skipped` with `reason=quiet-hours` → 在静默时段外
- `heartbeat skipped` with `reason=empty-heartbeat-file` → HEARTBEAT.md为空或只有注释
- `heartbeat skipped` with `reason=no-tasks-due` → 没有到期任务

**解决方案**:
- 检查HEARTBEAT.md内容（需要实际任务，而不只是注释）
- 检查静默时段配置
- 使用`openclaw cron add`创建显式Cron任务

### 5. Skills安装但不注册

**症状**: Skill已安装但OpenClaw不响应

**诊断**:
```bash
openclaw skills list
openclaw doctor
```

**解决方案**:
- 在`openclaw.json`中确认`skills.entries.<skillName>.enabled: true`
- 检查必需的环境变量是否设置
- 验证JSON格式正确

### 6. Memory文件不加载

**症状**: 自定义记忆文件不被加载

**原因**: OpenClaw只自动加载8个特定文件名:
- SOUL.md, AGENTS.md, USER.md, TOOLS.md, IDENTITY.md, HEARTBEAT.md, BOOTSTRAP.md, MEMORY.md

**解决方案**:
- 将内容移入上述8个文件之一
- USER.md最适合用户特定知识
- MEMORY.md作为长期记忆

### 7. 浏览器控制服务无法连接

**诊断**:
```bash
openclaw gateway status --deep
```

**解决方案**:
- 检查localhost绑定未被阻止
- 确认浏览器控制端口（默认9223）在127.0.0.1上监听
- 重启浏览器服务: `openclaw browser start --browser-profile openclaw`

### 8. Node.js版本不匹配

**症状**: OpenClaw崩溃或报错

**要求**: Node.js 22+

**诊断**:
```bash
node --version
```

**解决方案**:
```bash
# 使用nvm安装Node 22
nvm install 22
nvm use 22

# 或者使用最新稳定版
nvm install --lts
nvm use --lts
```

### 9. 工具执行但结果不持久化

**诊断**:
```bash
openclaw status --deep
```

**检查**:
- Docker sandbox模式是否启用但Docker未运行
- 文件权限问题
- 磁盘空间不足

### 10. 上下文窗口溢出

**症状**: 智能体在对话中停止

**原因**: SOUL.md + 对话历史 + 工具schema超过模型限制

**解决方案**:
- 使用更大上下文窗口的模型
- 精简SOUL.md（删除冗长部分）
- 使用更高效的上下文管理

---

## 🚨 紧急恢复流程

### 当所有方法都失败时

```bash
# 1. 保存当前日志
mkdir -p ~/openclaw-backup/$(date +%Y%m%d)
cp ~/.openclaw/logs/*.log ~/openclaw-backup/$(date +%Y%m%d)/

# 2. 备份数据
cp ~/.openclaw/openclaw.json ~/openclaw-backup/$(date +%Y%m%d)/

# 3. 完全重启
openclaw gateway stop
openclaw gateway start

# 4. 如果仍然损坏，恢复到最后已知良好配置
cp ~/.openclaw/config-backups/openclaw.json.bak ~/.openclaw/openclaw.json

# 5. 检查健康
openclaw doctor
openclaw gateway status
```

---

## 📋 诊断脚本

```bash
#!/bin/bash
echo "=== OpenClaw Diagnostic Report ==="
echo "Date: $(date)"
echo ""
echo "--- Gateway Status ---"
openclaw gateway status
echo ""
echo "--- Channel Status ---"
openclaw channels status --probe
echo ""
echo "--- Recent Errors ---"
openclaw logs 2>&1 | grep -iE "error|fail|crash" | tail -20
echo ""
echo "--- Resource Usage ---"
openclaw health --resources 2>/dev/null || echo "Resource check not available"
echo ""
echo "--- Disk Space ---"
df -h ~/.openclaw
echo ""
echo "=== End Report ==="
```

---

## 🔗 深度文档链接

| 问题类型 | 深度链接 |
|---------|---------|
| Gateway不运行 | /gateway/troubleshooting#gateway-service-not-running |
| 后台进程 | /gateway/background-process |
| 配置 | /gateway/configuration |
| 无回复 | /gateway/troubleshooting#no-replies |
| 渠道问题 | /channels/troubleshooting |
| 配对 | /channels/pairing |

---

*报告生成时间: 2026-06-01*
