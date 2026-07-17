# ## Assistant Output Directives

> 源码：`src/agents/system-prompt.ts` — `buildAssistantOutputDirectivesSection()`，约 line 255
>
> **注入条件**：`!isMinimal`
>
> **重要**：这些指令用于控制消息的**投递元数据**，不影响消息文本本身。

---

## 三类输出指令

| 指令 | 作用 | Web UI 行为 |
|------|------|------------|
| `MEDIA:<path-or-url>` | 请求附件投递 | 渲染为内联附件（图片/音频等） |
| `[[audio_as_voice]]` | 标记音频为语音消息风格 | 显示语音消息徽章 |
| `[[reply_to_current]]` | 请求原生回复/引用 | 在支持渠道显示引用气泡 |

---

## MEDIA 指令

```
MEDIA:<path-or-url>
```

- 单独一行，不加其他内容
- Web UI 将支持的 MEDIA 行渲染为内联附件
- 渠道自身仍决定实际投递行为

### 支持的类型

| 类型 | Web UI 行为 |
|------|------------|
| 图片 (jpg/png/gif/webp) | 内联显示 |
| 音频 (mp3/wav) | 音频播放器 |
| 视频 | 视频播放器 |
| PDF | PDF 查看器 |

### 示例

```
请查看这张图片：
MEDIA:/Users/d/desktop/screenshot.png
```

---

## audio_as_voice 标记

```
[[audio_as_voice]]
```

- 标记附加的音频为语音消息风格
- Web UI 可能显示语音消息徽章
- 实际投递语义由渠道决定

### 使用场景

当使用 `tts` 工具生成音频回复时，可以用此标记让 UI 以语音消息形式展示。

---

## Reply Tags（回复标签）

用于在支持的渠道上请求原生回复/引用功能：

| 标签 | 行为 |
|------|------|
| `[[reply_to_current]]` | 回复触发消息 |
| `[[reply_to:<id>]]` | 回复指定 ID 的消息（仅当 id 明确提供时使用） |

### 使用规范

- 必须是消息的**第一个 token**（前面不能有文字或换行）
- 标签内可以有空格：`[[ reply_to_current ]]`
- 每个消息只用一个 reply tag

### 示例

```
[[reply_to_current]] 好的，我来处理这件事。
```

---

## 频道特定交互指令

Channel-specific interactive directives（如按钮、表单等）与 web render guidance 是**分开的**，不应混用。

> 提示：Reply tags 在用户可见前会被剥离，实际支持取决于当前渠道配置。

---

## 与 Message 工具的关系

Assistant Output Directives 是**声明式**的，告诉渠道如何处理即将发送的消息。

Message 工具的参数是**操作式**的，执行具体的发送操作。

```typescript
// 组合使用示例
message({
  action: "send",
  channel: "telegram",
  message: "这是回复",
  // reply 参数配合 [[reply_to_current]] 使用
});
```

---

## 源码参考

```typescript
// 约 line 255
function buildAssistantOutputDirectivesSection(isMinimal: boolean) {
  if (isMinimal) {
    return [];
  }
  return [
    "## Assistant Output Directives",
    "Use these when you need delivery metadata in an assistant message:",
    "- `MEDIA:<path-or-url>` on its own line requests attachment delivery.",
    "- `[[audio_as_voice]]` marks attached audio as a voice-note style delivery hint.",
    "- To request a native reply/quote on supported surfaces, include one reply tag:",
    // ...
  ];
}
```

---

## 相关文件

- [16_control_ui_embed.md](./16_control_ui_embed.md) — Canvas embed
- [17_messaging.md](./17_messaging.md) — 消息发送规范
- [18_voice_tts.md](./18_voice_tts.md) — TTS 使用