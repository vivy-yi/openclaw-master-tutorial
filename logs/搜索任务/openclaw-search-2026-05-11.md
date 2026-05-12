# OpenClaw 全网搜索结果
**搜索时间**: 2026-05-11 11:10 (Asia/Shanghai)
**任务来源**: cron:395536bd-24f4-49ba-9a3a-acac6799c7c1 (墨客-全网搜索)

---

## 📚 OpenClaw 核心关键词教程

### 1. 入门教程 (Getting Started)
**来源**: https://docs.openclaw.ai/start/getting-started

**评分**: ⭐⭐⭐⭐⭐ (5/5)

**核心内容**:
- **安装命令**: `npm install -g openclaw@latest`
- **引导命令**: `openclaw onboard --install-daemon`
- **验证运行**: `openclaw gateway status`
- **启动仪表盘**: `openclaw dashboard`
- **快速连接渠道**: Telegram (最简单)

**关键要点**:
1. Node 24 (推荐) 或 Node 22.16+ 支持
2. 需要 API key (Anthropic, OpenAI, Google 等)
3. 配置文件位置: `~/.openclaw/openclaw.json`
4. 默认使用内置 Pi agent，RPC 模式

### 2. 概念架构 (Overview)
**来源**: https://docs.openclaw.ai

**评分**: ⭐⭐⭐⭐⭐ (5/5)

**核心定义**:
- **OpenClaw**: 自托管 gateway，连接聊天应用到 AI coding agents
- **目标用户**: 开发者 / 高级用户，想要个人 AI 助手
- **特点**: 
  - Self-hosted (自托管)
  - Multi-channel (多渠道)
  - Agent-native (Agent 原生)
  - Open source (MIT 许可)

**架构组件**:
```
Chat apps + plugins → Gateway → Pi agent
                              ↓
                     CLI / Web UI / Mobile nodes
```

---

## 🔧 OpenClaw 技术关键词

### 1. Multi-agent Routing (多 Agent 路由)
**来源**: https://docs.openclaw.ai/concepts/multi-agent

**评分**: ⭐⭐⭐⭐⭐ (5/5)

**核心概念**:
- **Agent**: 完整的人脑作用域，包含 workspace、auth profiles、session store
- **Binding**: 将 channel account 映射到 agent
- **agentId**: 唯一标识一个 agent
- **accountId**: 标识一个 channel 账户实例

**关键路径**:
- Config: `~/.openclaw/openclaw.json`
- State dir: `~/.openclaw`
- Workspace: `~/.openclaw/workspace` 或 `~/.openclaw/workspace-<agentId>`
- Agent dir: `~/.openclaw/agents/<agentId>/agent`
- Sessions: `~/.openclaw/agents/<agentId>/sessions`

**路由优先级**:
1. peer match (精确 DM/群组/频道 ID)
2. parentPeer match (线程继承)
3. guildId + roles (Discord 角色路由)
4. guildId (Discord)
5. teamId (Slack)
6. accountId (每账户回退)
7. Channel-level match (`accountId: "*"`)
8. Default agent (`main`)

**添加 Agent 命令**:
```bash
openclaw agents add work
openclaw agents list --bindings
```

### 2. Channel 系统
**来源**: https://docs.openclaw.ai/channels

**评分**: ⭐⭐⭐⭐ (4/5)

**支持渠道**:
- Built-in: Discord, iMessage, Signal, Slack, Telegram, WhatsApp
- Bundled plugins: Matrix, Nostr, Twitch, Zalo
- 外部插件: Feishu, Microsoft Teams, Google Chat, etc.

---

## 🛠️ OpenClaw 问题解决方案

### 1. 常见故障排查 (Troubleshooting)
**来源**: https://docs.openclaw.ai/gateway/troubleshooting

**评分**: ⭐⭐⭐⭐⭐ (5/5)

**命令阶梯**:
```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
openclaw channels status --probe
```

**常见问题与解决方案**:

#### 问题 A: Split brain installs (版本冲突)
**症状**: gateway 服务更新后意外停止
**原因**: 旧版 openclaw binary 无法读取新版写入的 config
**解决**:
```bash
which openclaw
openclaw --version
openclaw gateway status --deep
openclaw config get meta.lastTouchedVersion
# 修复: 更新 PATH 或重新安装 gateway
openclaw gateway install --force
openclaw gateway restart
```

#### 问题 B: Skill symlink skipped (符号链接逃逸)
**症状**: 日志出现 `Skipping escaped skill path... reason=symlink-escape`
**原因**: OpenClaw 将每个 skill root 视为隔离边界
**解决**:
```bash
ls -l ~/.agents/skills/<name>
realpath ~/.agents/skills/<name>
# 配置允许的 symlink targets
{
  "skills": {
    "load": {
      "extraDirs": ["~/Projects/manager/skills"],
      "allowSymlinkTargets": ["~/Projects/manager/skills"]
    }
  }
}
```

#### 问题 C: Anthropic 429 错误
**症状**: `HTTP 429: rate_limit_error: Extra usage is required for long context requests`
**原因**: 
- 选中的 Opus/Sonnet 模型启用了 `context1m`
- 当前 Anthropic 凭证无 long-context 使用权限
**解决**:
1. 禁用 `context1m` 让模型回退到正常 context window
2. 使用有 long-context 资格的凭证
3. 配置 fallback models

#### 问题 D: 本地 OpenAI-compatible backend 探测成功但 Agent runs 失败
**症状**: 
- `curl /v1/models` 成功
- 直接 `/v1/chat/completions` 成功
- 但 OpenClaw agent runs 失败
**可能原因**:
- 模型 ID 不匹配 (404)
- 后端期望 `messages[].content` 为 string 但收到 object
- 大 token 计数时后端崩溃
**解决**:
```bash
curl http://127.0.0.1:1234/v1/models
curl http://127.0.0.1:1234/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"<id>","messages":[{"role":"user","content":"hi"}],"stream":false}'
openclaw infer model run --model <provider/model> --prompt "hi" --json
```

#### 问题 E: No replies (无回复)
**症状**: 渠道在线但无人回复
**排查命令**:
```bash
openclaw status
openclaw channels status --probe
openclaw pairing list --channel <channel> [--account <id>]
openclaw config get channels
openclaw logs --follow
```
**常见原因**:
- DM 需要 pairing 审批
- Group 需要 mention gating (`requireMention`, `mentionPatterns`)
- Channel/群组 allowlist 不匹配

#### 问题 F: Dashboard/Control UI 无法连接
**排查命令**:
```bash
openclaw gateway status
openclaw status
openclaw logs --follow
openclaw doctor
openclaw gateway status --json
```
**检查项**:
- 正确的 probe URL 和 dashboard URL
- Auth mode/token 客户端与 gateway 不匹配
- HTTP 使用场景下设备身份要求

**Auth 错误代码快速映射**:
| 代码 | 含义 | 操作 |
|------|------|------|
| AUTH_TOKEN_MISSING | 客户端未发送 token | 粘贴/设置 token |
| AUTH_TOKEN_MISMATCH | token 不匹配 | 运行 token drift recovery |
| AUTH_DEVICE_TOKEN_MISMATCH | 设备 token 过期 | rotate/re-approve device token |
| PAIRING_REQUIRED | 设备身份需要审批 | `openclaw devices list` → `approve <requestId>` |

#### 问题 G: Gateway service not running
**排查命令**:
```bash
openclaw gateway status
openclaw status
openclaw logs --follow
openclaw doctor
openclaw gateway status --deep
```
**检查项**:
- `Runtime: stopped` 及退出提示
- Service config 不匹配 (Config cli vs Config service)
- Port/listener 冲突
- 额外的 launchd/systemd/schtasks 安装

#### 问题 H: Gateway rejected invalid config
**症状**: Gateway 启动失败，报 `Invalid config`
**排查命令**:
```bash
openclaw logs --follow
openclaw config file
openclaw config validate
openclaw doctor
```
**检查项**:
- `Invalid config at ...`
- `config reload skipped (invalid config): ...`
- `Config write rejected: ...`
- 存在 `openclaw.json.rejected.*` 或 `openclaw.json.clobbered.*` 文件

---

## 📊 搜索结果评分汇总

| 内容 | 来源 | 评分 | 质量说明 |
|------|------|------|---------|
| Getting Started | docs.openclaw.ai | ⭐⭐⭐⭐⭐ | 完整入门指南，5分钟可运行 |
| Overview | docs.openclaw.ai | ⭐⭐⭐⭐⭐ | 清晰定义 OpenClaw 是什么 |
| Multi-agent routing | docs.openclaw.ai | ⭐⭐⭐⭐⭐ | 详细多 Agent 架构与配置 |
| Channel system | docs.openclaw.ai | ⭐⭐⭐⭐ | 渠道配置参考 |
| Troubleshooting | docs.openclaw.ai | ⭐⭐⭐⭐⭐ | 全面故障排查指南 |

---

## 📁 保存路径

本报告保存至: `~/.openclaw/workspaces/openclaw-assistant/temp/search-results/`

**文件名**: `openclaw-search-2026-05-11.md`