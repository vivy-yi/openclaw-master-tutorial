# ## Exec 审批引导

> 源码：`src/agents/system-prompt.ts` — `buildExecApprovalPromptGuidance()`，约 line 295

---

## 检测逻辑

```typescript
function buildExecApprovalPromptGuidance(params: { runtimeChannel?: string; inlineButtonsEnabled?: boolean }) {
  const runtimeChannel = params.runtimeChannel?.trim().toLowerCase();
  const usesNativeApprovalUi =
    runtimeChannel === "webchat" ||
    params.inlineButtonsEnabled === true ||
    (runtimeChannel ? Boolean(resolveChannelApprovalCapability(...))?.native : false);
}
```

---

## 渠道支持情况

| 渠道 | native approval UI | 说明 |
|------|-------------------|------|
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
