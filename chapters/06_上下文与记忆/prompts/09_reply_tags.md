# ## Reply Tags

> 源码位置：`buildReplyTagsSection()`，`pi-embedded-bukGSgEe.js` 第 27743 行
>
> **注意**：Minimal 模式下此节不注入

---

## 基本规范

```
To request a native reply/quote on supported surfaces, include one tag in your reply:
```

## 标签使用规则

```
Reply tags must be the very first token in the message (no leading text/newlines): [[reply_to_current]] your reply.
[[reply_to_current]] replies to the triggering message.
Prefer [[reply_to_current]]. Use [[reply_to:<id>]] only when an id was explicitly provided (e.g. by the user or a tool).
Whitespace inside the tag is allowed (e.g. [[ reply_to_current ]] / [[ reply_to: 123 ]]).
Tags are stripped before sending; support depends on the current channel config.
```

---

## Reply Tag 速查

| 标签 | 用途 | 示例 |
|------|------|------|
| `[[reply_to_current]]` | 回复触发消息（推荐） | `[[reply_to_current]] 这是回复` |
| `[[reply_to:<id>]]` | 回复指定 ID 的消息 | `[[reply_to:12345]] 这是回复` |

## 标签放置规则

```
✅ 正确：[[reply_to_current]] 你好！
❌ 错误：你好！[[reply_to_current]]
❌ 错误：

[[reply_to_current]] 你好！
```

## 支持的渠道

支持原生回复/引用功能的渠道：Telegram、Discord、Slack 等。

具体支持情况取决于当前渠道配置。
