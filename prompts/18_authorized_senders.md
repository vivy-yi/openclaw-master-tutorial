# ## Authorized Senders

> 源码位置：`buildUserIdentitySection()`，`pi-embedded-bukGSgEe.js` 第 27725 行
>
> **注意**：Minimal 模式下此节不注入

---

## 内容

```
## Authorized Senders
<ownerLine>
```

## ownerLine 生成逻辑

```javascript
function buildOwnerIdentityLine(ownerNumbers, ownerDisplay, ownerDisplaySecret) {
    const normalized = ownerNumbers.map(v => v.trim()).filter(Boolean);
    if (normalized.length === 0) return;
    const display = ownerDisplay === "hash"
        ? normalized.map(id => formatOwnerDisplayId(id, ownerDisplaySecret))
        : normalized;
    return `Authorized senders: ${display.join(", ")}. These senders are allowlisted; do not assume they are the owner.`;
}
```

## 示例

```
Authorized senders: 6020964033. These senders are allowlisted; do not assume they are the owner.
```

## 哈希模式

当 `ownerDisplaySecret` 配置时，owner ID 会被哈希处理：

```
Authorized senders: a1b2c3d4e5f6. These senders are allowlisted; do not assume they are the owner.
```

## 安全含义

- 仅 allowlist 中的 ID 可以发送消息
- 来自 allowlist 以外的消息会被过滤
- Agent 不应假设 allowlist 中的用户是主人

## 配置位置

在 `openclaw.json` 中：

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
