# OpenClaw 已知问题追踪

**文档版本**: 2026-06-08  
**维护者**: OpenClaw 教程大师 🦉  
**数据来源**: GitHub Issues + PR 追踪  

---

## 一、追踪状态总览

| 状态 | 数量 | 说明 |
|------|------|------|
| 🔴 OPEN（未修复） | 6 | 仍需维护者关注 |
| 🟡 需要Proof | 1 | PR 需提供验证证据 |
| ✅ 已合并/关闭 | 3 | 已在近期版本修复 |

---

## 二、P1 高优先级 Issues

### 2.1 #90999 - post-dispatch chat.send rejection

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

### 2.2 #90996 - Session_send no session found

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

## 三、P2 中优先级 Issues

### 3.1 #90998 - SMS text slash commands authorization

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

### 3.2 #90997 - Telegram tool progress after commentary

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

### 3.3 #90994 - Codex PreToolUse relay

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

## 四、长期追踪 Issues

### 4.1 #91015 - Docker sandbox timeout (未合并PR)

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

### 4.2 #90014 - ReDoS in exec approval

| 字段 | 内容 |
|------|------|
| **CVE** | CVE-2026-25253 (CVSS 8.8) |
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.9_security_advisory_90014.md` |

---

### 4.3 #90013 - Installer无验证

| 字段 | 内容 |
|------|------|
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.10_security_advisory_90013.md` |

---

### 4.4 #89607 - ElevenLabs TTS secret injection

| 字段 | 内容 |
|------|------|
| **严重程度** | P0 |
| **状态** | 文档化完成 |
| **详情**: `16.12_security_advisory_89607.md` |

---

## 五、近期已修复

### 5.1 Parallel 搜索捆绑 ✅

| PR | 说明 |
|----|------|
| #85158 | Parallel 成为捆绑 web_search provider |

**版本**: v2026.6.5-beta.2+

---

### 5.2 Auth SQLite 迁移 ✅

| PR | 说明 |
|----|------|
| #89102, #88585 | Auth profiles 迁移到 SQLite |

**版本**: v2026.6.5-beta.2+

---

### 5.3 Cron JSON→SQLite 迁移 ✅

| PR | 说明 |
|----|------|
| #90072, #90208, #90277, #90488 | Cron legacy JSON stores 迁移到 SQLite |

**版本**: v2026.6.5-beta.2+

---

## 六、报告统计

```
追踪 Issues 总数: 9
├── P0 (安全): 3 ✅ 已文档化
├── P1: 1 🔴 OPEN
├── P2: 5 🔴 OPEN (1 needs proof)
└── 已修复: 3 ✅

PR 合并状态:
├── 🦞 Diamond Lobster: 1 (#90998)
├── 🐚 Platinum Hermit: 1 (#90996)
├── 🦪 Silver Shellfish: 1 (#90997) ⚠️ needs proof
└── 待合并: 3
```

---

## 七、更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-06-08 | 初始化追踪报告，纳入 #90999, #90996, #90998, #90997, #90994 |

---

🦉 教程大师 | OpenClaw 已知问题追踪 | 2026-06-08