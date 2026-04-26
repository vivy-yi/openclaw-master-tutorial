# ## Authorized Senders

> 源码：`src/agents/system-prompt.ts` — `buildUserIdentitySection()`，约 line 645
>
> **注意**：Minimal 模式下此节**不注入**

---

## 注入条件

```typescript
function buildUserIdentitySection(ownerLine?: string, isMinimal?: boolean): string[] {
  if (!ownerLine || isMinimal) return [];
  return ["## Authorized Senders", ownerLine, ""];
}
```

---

## ownerLine 生成逻辑

```typescript
function buildOwnerIdentityLine(ownerNumbers, ownerDisplay, ownerDisplaySecret) {
  const normalized = ownerNumbers.map(v => v.trim()).filter(Boolean);
  if (normalized.length === 0) return;
  const display = ownerDisplay === "hash"
    ? normalized.map(id => formatOwnerDisplayId(id, ownerDisplaySecret))
    : normalized;
  return `Authorized senders: ${display.join(", ")}. These senders are allowlisted; do not assume they are the owner.`;
}
```

---

## 显示模式

| mode | 输出示例 |
|------|---------|
| `plain`（默认） | `Authorized senders: 6020964033, 123456789. These senders are allowlisted; do not assume they are the owner.` |
| `hash` | `Authorized senders: a1b2c3d4e5f6. These senders are allowlisted; do not assume they are the owner.` |

---

## 安全含义

- 仅 allowlist 中的 ID 可以发送消息
- 来自 allowlist 以外的消息会被过滤
- Agent 不应假设 allowlist 中的用户是主人

---

## 配置位置

```json
{
  "agents": {
    "defaults": {
      "authorizedSenders": {
        "numbers": ["6020964033"],
        "ownerDisplay": "plain"
      }
    }
  }
}
```
