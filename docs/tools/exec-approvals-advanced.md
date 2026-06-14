---
summary: "Advanced exec approvals: safe bins, interpreter binding, approval forwarding, native delivery"
read_when:
  - Configuring safe bins or custom safe-bin profiles
  - Forwarding approvals to Slack/Discord/Telegram or other chat channels
  - Implementing a native approval client for a channel
title: "Exec approvals — advanced"
sidebarTitle: "Exec approvals advanced"
---

高级 exec approvals 主题：`safeBins` 快速路径、解释器/运行时绑定、
以及 approval forwarding 到聊天频道（包括 native delivery）。
核心策略和审批流程见 [Exec approvals](/tools/exec-approvals)。

---

## Safe Bins（安全二进制）

`tools.exec.safeBins` 定义了一小部分 **stdin-only** 二进制文件（例如 `cut`），
可以在 allowlist 模式下运行，**无需**显式 allowlist 条目。
Safe bins 拒绝位置文件参数和路径类 token，因此只能操作传入流。
这是一个狭窄的快速路径，用于流过滤器，**不是**通用信任列表。

> ⚠️ **不要**将解释器或运行时二进制文件（如 `python3`, `node`, `ruby`, `bash`, `sh`, `zsh`）添加到 `safeBins`。
> 如果命令可以评估代码、执行子命令或按设计读取文件，请使用显式 allowlist 条目并保持审批提示启用。

**默认 Safe Bins**：`cut`, `uniq`, `head`, `tail`, `tr`, `wc`

### Argv 验证和拒绝标志

验证基于 argv 形状 deterministic（无主机文件系统存在性检查），
防止 file-existence oracle 行为。

**默认 safe bins 的拒绝标志：**

| Binary | Denied flags |
| ------ | ------------ |
| `grep` | `--dereference-recursive`, `--directories`, `--exclude-from`, `--file`, `--recursive`, `-R`, `-d`, `-f`, `-r` |
| `jq` | `--argfile`, `--from-file`, `--library-path`, `--rawfile`, `--slurpfile`, `-L`, `-f` |
| `sort` | `--compress-program`, `--files0-from`, `--output`, `--random-source`, `--temporary-directory`, `-T`, `-o` |
| `wc` | `--files0-from` |

### Safe bins vs Allowlist

| Topic | `safeBins` | Allowlist |
| ----- | ---------- | --------- |
| Goal | 自动允许狭窄的 stdin 过滤器 | 明确信任特定可执行文件 |
| Match type | 可执行文件名 + safe-bin argv 策略 | 解析的可执行文件路径 glob |
| Argument scope | 受 safe-bin profile 和 literal-token 规则限制 | 路径匹配；参数由你负责 |
| 典型示例 | `head`, `tail`, `tr`, `wc` | `jq`, `python3`, `node`, `ffmpeg` |

---

## 解释器/运行时命令

审批支持的解释器/运行时运行有意保守：
- 精确的 argv/cwd/env 上下文总是绑定
- 直接 shell 脚本和直接运行时文件形式 best-effort 绑定到一个具体本地文件快照
- 如果 OpenClaw 无法为解释器/运行时命令识别出恰好一个具体本地文件，审批支持的执行被拒绝

---

## Approval Forwarding 到聊天频道

可以将 exec approval prompts 转发到任何聊天频道（包括插件频道）并用 `/approve` 审批。

```json5
{
  approvals: {
    exec: {
      enabled: true,
      mode: "session",  // "session" | "targets" | "both"
      agentFilter: ["main"],
      sessionFilter: ["discord"],
      targets: [
        { channel: "slack", to: "U12345678" },
        { channel: "telegram", to: "123456789" },
      ],
    },
  },
}
```

**审批命令：**
```
/approve <id> allow-once
/approve <id> allow-always
/approve <id> deny
```

---

## Native Approval Delivery

某些频道可以作为 native approval clients。
Native clients 添加 approver DMs、origin-chat fanout 和频道特定的交互式审批 UX。

**Discord**：`channels.discord.execApprovals.*`
**Slack**：`channels.slack.execApprovals.*`
**Telegram**：`channels.telegram.execApprovals.*`

---

## macOS IPC Flow

```
Gateway -> Node Service (WS)
                 |  IPC (UDS + token + HMAC + TTL)
                 v
             Mac App (UI + approvals + system.run)
```

**安全：**
- Unix socket mode `0600`
- Token stored in `~/.openclaw/exec-approvals.json`
- Same-UID peer check
- Challenge/response (nonce + HMAC token + request hash) + short TTL

---

## 相关文档

- [Exec approvals（核心）](/tools/exec-approvals)
- [Exec tool](/tools/exec)
- [Elevated mode](/tools/elevated)
- [Skills](/tools/skills)
