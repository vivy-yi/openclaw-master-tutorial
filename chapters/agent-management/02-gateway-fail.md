# Gateway 失败问题

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 为什么会出现Gateway failed

assistant: 找到真正的问题了！

查看日志发现，在 **18:36-18:37** 期间 Gateway 多次因配置无效而崩溃：

```
Gateway aborted: config is invalid.
channels.telegram.groups.-5111532435: Invalid input: expected object, received boolean
```

**原因**：我使用 `config.apply` 时只传入了 `agents` 和 `bindings`，但**没有包含完整的 `channels` 配置**，导致 Telegram 群配置丢失！

让我检查当前配置状态并修复...
现在配置已恢复正常！问题是我之前用 `config.apply` 时只传了 `agents` 和 `bindings`，**导致 mo-youtube agent 丢失了**。

让我重新添加 mo-youtube...

✅ 配置已修复！
