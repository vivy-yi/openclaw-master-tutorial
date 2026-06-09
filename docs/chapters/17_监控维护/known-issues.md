# OpenClaw 已知问题追踪

**文档版本**: 2026-06-09  
**维护者**: OpenClaw 教程大师 🦉  
**数据来源**: GitHub Issues + PR 追踪  
**更新周期**: 2026-06-02 ~ 2026-06-09

---

## 一、追踪状态总览

| 状态 | 数量 | 说明 |
|------|------|------|
| 🔴 OPEN（未修复） | 13 | 新增 8 个 P1 Issues |
| 🟡 需要Proof | 1 | PR 需提供验证证据 |
| ✅ 已合并/关闭 | 4 | 本周修复 |

---

## 二、P0/P1 高优先级 Issues（2026-06-09 新增）

### 2.1 #91540 - Dashboard Stop 按钮损坏 session 文件 + 权限隔离缺陷

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91540 |
| **严重程度** | P0 |
| **标题** | Dashboard Stop button can corrupt session files + agent permission isolation lacks guardrails |
| **状态** | OPEN |
| **标签** | `clawsweeper:no-new-fix-pr` `security` |
| **创建时间** | 2026-06-09 |
| **影响范围** | Session 文件损坏 + 安全漏洞 |

**问题描述**:
1. Dashboard Stop 按钮可以损坏 session 文件
2. Agent permission isolation 缺乏 guardrails

**注意事项**:
- `clawsweeper:no-new-fix-pr` 标签说明暂不需要 PR 修复
- 安全相关，建议关注后续官方公告

---

### 2.2 #91534 - Windows spawning claude .cmd 失败

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91534 |
| **严重程度** | P1 |
| **标题** | Windows: spawning claude via child_process fails (ENOENT/EINVAL) due to missing .cmd handling |
| **状态** | OPEN |
| **标签** | `impact:auth-provider` |
| **创建时间** | 2026-06-09 |
| **影响范围** | Windows 上使用 claude CLI 的场景 |
| **相关PR** | #91490 |

**问题描述**:
Windows 上通过 child_process spawn claude 失败，报错 ENOENT/EINVAL，原因是缺少 .cmd 处理。

**Workaround**:
```bash
# 使用完整路径
"C:\\Program Files\\Claude\\bin\\claude.cmd"

# 或等待 PR #91490 合并
```

---

### 2.3 #91533 - LM Studio sessions 无 tools 启动

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91533 |
| **严重程度** | P1 |
| **标题** | LM Studio sessions start without tools |
| **状态** | OPEN |
| **标签** | `impact:auth-provider` |
| **创建时间** | 2026-06-09 |
| **影响范围** | LM Studio 作为本地 provider 的用户 |

**问题描述**:
LM Studio sessions 启动时没有 tools（缺少工具暴露）。

**Workaround**:
```yaml
providers:
  lmstudio:
    tools: true  # 显式启用 tools
```

---

### 2.4 #91532 - WhatsApp Desktop swipe-reply 不渲染

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91532 |
| **严重程度** | P1 |
| **标题** | WhatsApp reply bubble doesn't render on Desktop when swipe-replying to OpenClaw's own message |
| **状态** | OPEN |
| **标签** | `impact:message-loss` |
| **创建时间** | 2026-06-09 |
| **影响范围** | WhatsApp Desktop 用户 |

**问题描述**:
WhatsApp Desktop 端滑动回复 OpenClaw 自身消息时，reply bubble 不渲染。

---

### 2.5 #91531 - Telegram DM lane guarded 后超时

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91531 |
| **严重程度** | P1 |
| **标题** | Telegram DM lane can remain guarded after send timeout, delaying or dropping direct messages |
| **状态** | OPEN |
| **标签** | `impact:session-state` `impact:message-loss` |
| **创建时间** | 2026-06-09 |
| **影响范围** | Telegram DM 用户 |

**问题描述**:
Telegram DM lane 在发送超时后仍保持 guarded 状态，延迟或丢弃直消息。

---

### 2.6 #91529 - Stale-session diagnostic 无法解析 OAuth session

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91529 |
| **严重程度** | P1 |
| **标题** | Stale-session diagnostic cannot resolve app-agent (OAuth) session transcripts |
| **状态** | OPEN |
| **创建时间** | 2026-06-09 |
| **影响范围** | OAuth app-agent session 用户 |

**问题描述**:
Stale-session 诊断无法解析 OAuth app-agent session transcripts。

---

### 2.7 #91525 - ACP effort config 导致配置错误

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91525 |
| **严重程度** | P1 |
| **标题** | ACP: effort config option sent to Claude Haiku causes "Unknown config option: effort" |
| **状态** | OPEN |
| **创建时间** | 2026-06-09 |
| **影响范围** | ACP 协议用户 + Claude Haiku |

**问题描述**:
ACP effort config option 发送给 Claude Haiku 时报错 "Unknown config option: effort"。

---

### 2.8 #91521 - Tool stdout 泄露到聊天（安全）

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91521 |
| **严重程度** | P1 |
| **标题** | Tool stdout leaks to chat + reply generation interrupted |
| **状态** | OPEN |
| **标签** | `security` `impact:message-loss` |
| **创建时间** | 2026-06-09 |
| **影响范围** | 所有渠道 |

**问题描述**:
Tool stdout 泄露到聊天，reply generation 被中断。安全相关漏洞。

---

### 2.9 #91428 - Gemma4/Qwen3.6 via Ollama 仅第一个 token 渲染

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91428 |
| **严重程度** | P1 |
| **标题** | Gemma4/Qwen3.6 via local Ollama: only first token/word rendered |
| **状态** | OPEN |
| **创建时间** | 2026-06-08 |
| **影响范围** | Ollama + Gemma4/Qwen3.6 用户 |

**问题描述**:
通过本地 Ollama 使用 Gemma4/Qwen3.6 时，仅第一个 token/word 被渲染。

---

## 三、本周已修复的 P0/P1 Issues

| Issue | 标题 | 修复版本 |
|-------|------|----------|
| #91535 | Cron JSON→SQLite 迁移失败导致数据丢失 | v2026.6.1 |
| #91530 | Thinking blocks 无 Anthropic 签名导致 replay 失败 | v2026.6.1 |
| #91528 | Post-compaction guard 持有 session 写锁 | v2026.6.1 |
| #91524 | Inter-session messages 泄露到主 session（regression） | v2026.6.1 |

---

## 四、P2 中优先级 Issues

### 4.1 #90999 - post-dispatch chat.send rejection

| 字段 | 内容 |
|------|------|
| **Issue编号** | #90999 |
| **严重程度** | P1 → 实际 P2 |
| **标题** | [Bug]: post-dispatch chat.send rejection can overwrite terminal abort |
| **状态** | OPEN |
| **标签** | `P2` `clawsweeper:linked-pr-open` `impact:message-loss` |
| **创建时间** | 2026-06-06 |
| **影响范围** | Session 状态被污染，message loss 风险 |
| **相关PR** | 待定 |

**问题描述**:
在 post-dispatch 阶段，chat.send 的 rejection 可能覆盖 terminal abort 状态，导致：
- 用户以为操作已终止，但实际上消息仍被发送
- Session 状态不一致

**Workaround**:
```bash
# 检查 session 状态
openclaw session list --json | jq '.[] | select(.status=="running")'

# 重置异常 session
openclaw session reset <session-id>
```

---

### 4.2 #90996 - Session_send no session found

| 字段 | 内容 |
|------|------|
| **Issue编号** | #90996 |
| **严重程度** | P2 |
| **标题** | fix #52875: [Bug]: Session_send gives no session found |
| **状态** | OPEN |
| **标签** | `P2` `agents` `merge-risk: 🚨 compatibility` `status: 👀 ready for maintainer look` |
| **创建时间** | 2026-06-06 |
| **影响范围** | `sessions_send` 工具调用失败 |
| **历史** | 复现 #52875 (旧 Issue) |

**问题描述**:
`sessions_send` API 在某些情况下返回 "no session found" 错误，即使 session 确实存在。

**Workaround**:
```bash
# 使用完整 session key
openclaw sessions send <session-key> --message "..." --timeout 30

# 检查 session 有效性
openclaw health --sessions
```

---

### 4.3 #90998 - SMS text slash commands authorization

| 字段 | 内容 |
|------|------|
| **Issue编号** | #90998 |
| **严重程度** | P2 |
| **标题** | fix(sms): authorize text slash commands |
| **状态** | OPEN |
| **标签** | `size: M` `channel: sms` `status: 👀 ready for maintainer look` |
| **创建时间** | 2026-06-06 |
| **PR** | #91017 (🦞 diamond lobster) |

**问题描述**:
SMS 渠道未正确处理 text slash commands 的授权验证。

**相关配置**:
```yaml
channels:
  sms:
    slashCommandAuth: true
    textPrefix: "/"
```

---

### 4.4 #90997 - Telegram tool progress after commentary

| 字段 | 内容 |
|------|------|
| **Issue编号** | #90997 |
| **严重程度** | P2 |
| **标题** | fix(telegram): keep tool progress after non-final commentary |
| **状态** | OPEN |
| **标签** | `size: S` `merge-risk: 🚨 message-delivery` `status: 📣 needs proof` |
| **创建时间** | 2026-06-06 |
| **PR** | #91016 (🦪 silver shellfish) |
| **风险** | 🚨 message-delivery |

**问题描述**:
Telegram 渠道在 non-final commentary 之后丢失 tool progress 更新。

**Workaround**:
```yaml
channels:
  telegram:
    editStrategy: "append"
    progressRetention: true
```

---

### 4.5 #90994 - Codex PreToolUse relay

| 字段 | 内容 |
|------|------|
| **Issue编号** | #90994 |
| **严重程度** | P2 |
| **标题** | fix(codex): restore native PreToolUse relay delivery |
| **状态** | OPEN |
| **标签** | `size: L` `extensions: codex` `proof: supplied` |
| **创建时间** | 2026-06-06 |
| **PR** | #91014 |

**问题描述**:
Codex 扩展的 PreToolUse relay 未正确传递事件。

**相关章节**: `19_Skills开发/codex-integration.md`

---

### 4.6 #91460 - Tool-result truncation 产生无效 schema

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91460 |
| **严重程度** | P2 |
| **标题** | Tool-result truncation produces invalid request schemas in long sessions |
| **状态** | OPEN |
| **标签** | `P2` `clawsweeper` |
| **创建时间** | 2026-06-08 |

**问题描述**:
长 session 中 tool-result truncation 产生无效请求 schema。

---

### 4.7 #91433 - MCP remote OAuth 阻断 streamable-http servers

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91433 |
| **严重程度** | P2 |
| **标题** | MCP remote OAuth: two bugs block streamable-http servers |
| **状态** | OPEN |
| **创建时间** | 2026-06-08 |

**问题描述**:
MCP remote OAuth 两个 bug 阻断 streamable-http servers。

---

### 4.8 #91526 - Thinking mapping in Cron

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91526 |
| **严重程度** | P2 |
| **标题** | Follow-up: thinking mapping issue in Cron (#63918) |
| **状态** | OPEN |
| **创建时间** | 2026-06-09 |

**问题描述**:
Cron 中的 thinking mapping 问题（#63918 后续）。

---

### 4.9 #91514 - ACP model prefix 未剥离

| 字段 | 内容 |
|------|------|
| **Issue编号** | #91514 |
| **严重程度** | P2 |
| **标题** | ACP: model prefix not stripped when dispatching to Claude ACP adapter |
| **状态** | OPEN |
| **创建时间** | 2026-06-09 |

**问题描述**:
ACP model prefix 在 dispatching 到 Claude ACP adapter 时未剥离。

---

## 五、长期追踪 Issues

### 5.1 #91015 - Docker sandbox timeout (未合并PR)

| 字段 | 内容 |
|------|------|
| **Issue编号** | 相关 #89999 |
| **PR编号** | #91015 |
| **状态** | OPEN（未合并） |
| **严重程度** | P1 |
| **根因** | Docker socket 无响应时 `execDockerRaw` 无超时机制，导致 Gateway 挂起 |

**Workaround**:
```yaml
agents:
  defaults:
    sandbox:
      docker:
        initTimeoutMs: 60000  # 默认 60000ms
```

**相关教程**: `docker-sandbox-timeout.md`

---

### 5.2 #90014 - ReDoS in exec approval

| 字段 | 内容 |
|------|------|
| **CVE** | CVE-2026-25253 (CVSS 8.8) |
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.9_security_advisory_90014.md` |

---

### 5.3 #90013 - Installer无验证

| 字段 | 内容 |
|------|------|
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.10_security_advisory_90013.md` |

---

### 5.4 #89607 - ElevenLabs TTS secret injection

| 字段 | 内容 |
|------|------|
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.12_security_advisory_89607.md` |

---

## 六、近期已修复

### 6.1 Parallel 搜索捆绑 ✅

| PR | 说明 |
|----|------|
| #85158 | Parallel 成为捆绑 web_search provider |

**版本**: v2026.6.5-beta.2+

---

### 6.2 Auth SQLite 迁移 ✅

| PR | 说明 |
|----|------|
| #89102, #88585 | Auth profiles 迁移到 SQLite |

**版本**: v2026.6.5-beta.2+

---

### 6.3 Cron JSON→SQLite 迁移 ✅

| PR | 说明 |
|----|------|
| #90072, #90208, #90277, #90488 | Cron legacy JSON stores 迁移到 SQLite |

**版本**: v2026.6.5-beta.2+

---

## 七、报告统计

```
追踪 Issues 总数: 18
├── P0 (安全): 4 (新增 #91540)
├── P1: 12 🔴 OPEN (新增 8 个)
├── P2: 9 🔴 OPEN
└── 已修复: 4 ✅ (本周)

新增 Issue: #91540, #91534, #91533, #91532, #91531, #91529, #91525, #91521, #91428, #91526, #91514, #91460, #91433

PR 合并状态:
├── 🦞 Diamond Lobster: 1 (#90998)
├── 🐚 Platinum Hermit: 1 (#90996)
├── 🦪 Silver Shellfish: 1 (#90997) ⚠️ needs proof
└── 待合并: 3
```

---

## 八、更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-06-08 | 初始化追踪报告，纳入 #90999, #90996, #90998, #90997, #90994 |
| 2026-06-09 | 新增 #91540, #91534, #91533, #91532, #91531, #91529, #91525, #91521, #91428, #91526, #91514, #91460, #91433；更新修复状态 |

---

🦉 教程大师 | OpenClaw 已知问题追踪 | 2026-06-09
