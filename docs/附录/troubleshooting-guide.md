# Troubleshooting Guide - 故障排查指南

> 📅 更新时间: 2026-05-11  
> 📚 来源: [docs.openclaw.ai/gateway/troubleshooting](https://docs.openclaw.ai/gateway/troubleshooting)  
> ⭐ 质量评分: ⭐⭐⭐⭐⭐ (5/5)

---

## 诊断命令阶梯

遇到问题时，按顺序执行以下命令：

```bash
# 1. 快速状态
openclaw status

# 2. Gateway 状态
openclaw gateway status

# 3. 实时日志
openclaw logs --follow

# 4. 全面诊断
openclaw doctor

# 5. 渠道探测
openclaw channels status --probe
```

---

## 问题 A: Split brain installs (版本冲突)

### 症状
Gateway 服务更新后意外停止

### 原因
旧版 openclaw binary 无法读取新版写入的 config

### 排查与修复

```bash
# 检查当前 binary 位置和版本
which openclaw
openclaw --version

# 深度检查 Gateway 状态
openclaw gateway status --deep

# 查看最后写入配置的版本
openclaw config get meta.lastTouchedVersion

# 修复：更新 PATH 或重新安装
openclaw gateway install --force
openclaw gateway restart
```

---

## 问题 B: Skill symlink skipped (符号链接逃逸)

### 症状
日志出现 `Skipping escaped skill path... reason=symlink-escape`

### 原因
OpenClaw 将每个 skill root 视为隔离边界，符号链接被拒绝

### 排查与修复

```bash
# 检查 symlink 状态
ls -l ~/.agents/skills/<name>
realpath ~/.agents/skills/<name>

# 配置允许的 symlink targets
# 在 openclaw.json 中添加:
{
  "skills": {
    "load": {
      "extraDirs": ["~/Projects/manager/skills"],
      "allowSymlinkTargets": ["~/Projects/manager/skills"]
    }
  }
}
```

---

## 问题 C: Anthropic 429 错误

### 症状
`HTTP 429: rate_limit_error: Extra usage is required for long context requests`

### 原因
- 选中的 Opus/Sonnet 模型启用了 `context1m`
- 当前 Anthropic 凭证无 long-context 使用权限

### 解决方案

1. **禁用 `context1m`** - 让模型回退到正常 context window
2. **使用有 long-context 资格的凭证**
3. **配置 fallback models**

---

## 问题 D: 本地 OpenAI-compatible backend 失败

### 症状
- `curl /v1/models` 成功
- 直接 `/v1/chat/completions` 成功
- 但 OpenClaw agent runs 失败

### 可能原因
- 模型 ID 不匹配 (404)
- 后端期望 `messages[].content` 为 string 但收到 object
- 大 token 计数时后端崩溃

### 排查与修复

```bash
# 检查模型列表
curl http://127.0.0.1:1234/v1/models

# 测试 chat completions
curl http://127.0.0.1:1234/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"<id>","messages":[{"role":"user","content":"hi"}],"stream":false}'

# 使用 OpenClaw 测试
openclaw infer model run --model <provider/model> --prompt "hi" --json
```

---

## 问题 E: No replies (无回复)

### 症状
渠道在线但无人回复

### 排查命令

```bash
openclaw status
openclaw channels status --probe
openclaw pairing list --channel <channel> [--account <id>]
openclaw config get channels
openclaw logs --follow
```

### 常见原因与解决

| 原因 | 解决 |
|------|------|
| DM 需要 pairing 审批 | `openclaw pairing list` → `approve <requestId>` |
| 群组需要 mention | 配置 `requireMention` 或 `mentionPatterns` |
| Channel/群组 allowlist 不匹配 | 检查 `allowedPeers` 配置 |

---

## 问题 F: Dashboard / Control UI 无法连接

### 排查命令

```bash
openclaw gateway status
openclaw status
openclaw logs --follow
openclaw doctor
openclaw gateway status --json
```

### 检查项

- ✅ 正确的 probe URL 和 dashboard URL
- ✅ Auth mode / token 客户端与 gateway 匹配
- ✅ HTTP 使用场景下设备身份验证

### Auth 错误代码快速映射

| 错误代码 | 含义 | 解决操作 |
|----------|------|----------|
| `AUTH_TOKEN_MISSING` | 客户端未发送 token | 粘贴/设置 token |
| `AUTH_TOKEN_MISMATCH` | token 不匹配 | 运行 token drift recovery |
| `AUTH_DEVICE_TOKEN_MISMATCH` | 设备 token 过期 | rotate / re-approve device token |
| `PAIRING_REQUIRED` | 设备身份需要审批 | `openclaw devices list` → `approve <requestId>` |

---

## 问题 G: Gateway service not running

### 排查命令

```bash
openclaw gateway status
openclaw status
openclaw logs --follow
openclaw doctor
openclaw gateway status --deep
```

### 检查项

- ✅ `Runtime: stopped` 及退出提示
- ✅ Service config 不匹配 (Config cli vs Config service)
- ✅ Port / listener 冲突
- ✅ 额外的 launchd / systemd / schtasks 安装

---

## 问题 H: Gateway rejected invalid config

### 症状
Gateway 启动失败，报 `Invalid config`

### 排查命令

```bash
openclaw logs --follow
openclaw config file
openclaw config validate
openclaw doctor
```

### 检查项

- ✅ `Invalid config at ...`
- ✅ `config reload skipped (invalid config): ...`
- ✅ `Config write rejected: ...`
- ✅ 存在 `openclaw.json.rejected.*` 或 `openclaw.json.clobbered.*` 文件

### 修复步骤

1. 检查被拒绝的配置文件内容
2. 修复配置错误
3. 重新验证 `openclaw config validate`
4. 重启 Gateway `openclaw gateway restart`

---

## 通用排查流程图

```
遇到问题
    │
    ▼
openclaw status  ──►  正常？ ──►  检查日志
    │                  │          openclaw logs --follow
    │                否
    ▼                  ▼
openclaw doctor     检查具体问题类型
    │               (A-H 见上)
    ▼
根据建议修复
    │
    ▼
openclaw gateway restart
```

---

## 获取帮助

- 📖 官方文档: https://docs.openclaw.ai
- 🐙 GitHub Issues: https://github.com/openclaw/openclaw/issues
- 💬 Discord 社区: https://discord.gg/openclaw
