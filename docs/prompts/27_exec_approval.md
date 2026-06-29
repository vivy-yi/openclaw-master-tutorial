# Exec 审批引导（Prompt 版）

> 源码：`src/agents/system-prompt.ts` — `buildExecApprovalPromptGuidance()`，约 line 295
> 完整文档：[Exec approvals](/tools/exec-approvals) | [Exec approvals — advanced](/tools/exec-approvals-advanced)

---

## 渠道支持情况

| 渠道 | native approval UI | 说明 |
| ---- | ---------------- | ---- |
| WebChat | ✅ | 使用原生审批卡片 |
| Telegram | ✅（inlineButtons 启用时） | 使用原生按钮 |
| Discord | ✅（inlineButtons 启用时） | 使用原生按钮 |
| 其他渠道 | ❌ | 使用文本 /approve |

---

## Native Approval UI（WebChat / 启用了 inlineButtons 的渠道）

```typescript
"When exec returns approval-pending on this channel,
 rely on native approval card/buttons when they appear
 and do not also send plain chat /approve instructions.
 Only include the concrete /approve command
 if the tool result says chat approvals are unavailable
 or only manual approval is possible."
```

---

## 文本模式（其他渠道）

```typescript
"When exec returns approval-pending,
 include the concrete /approve command from tool output
 as plain chat text for the user,
 and do not ask for a different or rotated code."
```

---

## 核心原则

```
1. Never execute /approve through exec or any other shell/tool path;
   /approve is a user-facing approval command, not a shell command.

2. Treat allow-once as single-command only:
   if another elevated command needs approval,
   request a fresh /approve and do not claim prior approval covered it.

3. When approvals are required,
   preserve and show the full command/script exactly as provided
   (including chained operators like &&, ||, |, ;, or multiline shells)
   so the user can approve what will actually run.
```

---

## Trust Model（信任模型）

```
Exec approvals reduce accidental execution risk,
but are NOT a per-user auth boundary.

- Gateway-authenticated callers are trusted operators for that Gateway.
- Paired nodes extend that trusted operator capability onto the node host.
- Approved node-host runs bind canonical execution context:
  canonical cwd, exact argv, env binding when present,
  and pinned executable path when applicable.
- For shell scripts and direct interpreter/runtime file invocations,
  OpenClaw also tries to bind one concrete local file operand.
  If that bound file changes after approval but before execution,
  the run is denied instead of executing drifted content.
```

---

## macOS 分裂架构（macOS Split）

```
- The node host service forwards system.run to the macOS app over local IPC.
- The macOS app enforces approvals and executes the command in UI context.
```

**IPC 安全：**
- Unix socket mode `0600`
- Token stored in `~/.openclaw/exec-approvals.json`
- Same-UID peer check
- Challenge/response (nonce + HMAC token + request hash) + short TTL

---

## 文件绑定（File Binding）

```
File binding is intentionally best-effort,
NOT a complete semantic model of every interpreter/runtime loader path.
If approval mode cannot identify exactly one concrete local file to bind,
it refuses to mint an approval-backed run instead of pretending full coverage.
```

**触发文件绑定的场景：**
- 直接 shell 脚本（`.sh`, `.bash` 等）
- 直接解释器/运行时调用（`python3 script.py`, `node app.js` 等）

**文件绑定行为：**
- 批准后文件内容变更 → 执行被拒绝
- 无法识别单一文件 → 拒绝执行（而非假装覆盖）

---

## YOLO 模式（免审批）

同时打开两层策略：

| Layer | YOLO 设置 |
| ----- | --------- |
| `tools.exec.security` | `full` on `gateway`/`node` |
| `tools.exec.ask` | `off` |
| Host `askFallback` | `full` |

**快捷命令：**
```bash
openclaw exec-policy preset yolo
```

**持久 YOLO 配置（两层都要开）：**
```bash
# 第一层：config policy
openclaw config set tools.exec.host gateway
openclaw config set tools.exec.security full
openclaw config set tools.exec.ask off
openclaw gateway restart

# 第二层：host approvals file
openclaw approvals set --stdin <<'EOF'
{
  version: 1,
  defaults: { security: "full", ask: "off", askFallback: "full" }
}
EOF
```

---

## exec-approvals.json 格式

```json
{
  "version": 1,
  "socket": { "path": "~/.openclaw/exec-approvals.sock", "token": "base64url-token" },
  "defaults": {
    "security": "deny",
    "ask": "on-miss",
    "askFallback": "deny",
    "autoAllowSkills": false
  },
  "agents": {
    "main": {
      "security": "allowlist",
      "ask": "on-miss",
      "askFallback": "deny",
      "autoAllowSkills": true,
      "allowlist": [
        {
          "id": "B0C8C0B3-2C2D-4F8A-9A3C-5A4B3C2D1E0F",
          "pattern": "~/Projects/**/bin/rg",
          "source": "allow-always",
          "commandText": "rg -n TODO",
          "lastUsedAt": 1737150000000,
          "lastUsedCommand": "rg -n TODO",
          "lastResolvedPath": "/Users/user/Projects/.../bin/rg"
        }
      ]
    }
  }
}
```

---

## Policy 字段说明

| 字段 | 值 | 说明 |
| ---- | - | ---- |
| `security` | `deny` / `allowlist` / `full` | 阻断所有 / 仅白名单 / 完全允许 |
| `ask` | `off` / `on-miss` / `always` | 从不提示 / 白名单未中时提示 / 每次都提示 |
| `askFallback` | `deny` / `allowlist` / `full` | 无 UI 时如何处理 |
| `strictInlineEval` | boolean | inline code-eval 也需要审批 |

**inline code-eval 形式（strictInlineEval=true 时仍需审批）：**
`python -c`, `node -e`, `ruby -e`, `perl -e`, `php -r`, `lua -e`, `osascript -e`

---

## Safe Bins（安全二进制）

默认安全 bins：`cut`, `uniq`, `head`, `tail`, `tr`, `wc`

**配置：**
```json5
{
  tools: {
    exec: {
      safeBins: ["jq", "myfilter"],
      safeBinProfiles: {
        myfilter: {
          minPositional: 0,
          maxPositional: 0,
          allowedValueFlags: ["-n", "--limit"],
          deniedFlags: ["-f", "--file", "-c", "--command"],
        },
      },
    },
  },
}
```

---

## 相关文档

- [Exec approvals（核心）](/tools/exec-approvals)
- [Exec approvals — advanced（进阶）](/tools/exec-approvals-advanced)
- [Exec tool（执行工具）](/tools/exec)
- [Elevated mode（紧急提升）](/tools/elevated)
- [Sandboxing（沙箱）](/gateway/sandboxing)