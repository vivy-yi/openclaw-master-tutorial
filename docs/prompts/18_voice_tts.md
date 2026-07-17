# ## Voice (TTS)

> 源码：`src/agents/system-prompt.ts` — `buildVoiceSection()`，约 line 375
>
> **注入条件**：`!isMinimal && ttsHint` 存在

---

## 什么是 TTS

TTS（Text-to-Speech）将文本转换为语音输出。OpenClaw 通过 `tts` 工具提供此功能。

---

## 触发条件

```typescript
function buildVoiceSection(params: { isMinimal: boolean; ttsHint?: string }) {
  if (params.isMinimal) return [];
  const hint = params.ttsHint?.trim();
  if (!hint) return [];
  return ["## Voice (TTS)", hint, ""];
}
```

即需要：
1. `isMinimal === false`（非子 Agent）
2. `ttsHint` 配置存在（由 Provider 提供）

---

## ttsHint 内容

`ttsHint` 由 Provider 配置提供，非 OpenClaw 核心固定文案。可能包含：

| 内容 | 说明 |
|------|------|
| 推荐语音 | 如 "nova", "shimmer", "alloy" |
| 默认扬声器 | 如 "Kitchen HomePod", "Speaker 1" |
| 适用场景 | 故事、摘要、播报、游戏旁白 |
| 语调/语速 | 正式、活泼、舒缓等 |

---

## tts 工具使用

```typescript
tts(text: string) → 自动投递音频
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| text | string | 要转换为语音的文本 |
| channel | string（可选） | 指定输出渠道 |

### 使用示例

```
> 给我讲个小故事
[调用 tts 工具生成语音]
```

### 注意事项

使用 `tts` 工具后，回复 `NO_REPLY` 避免重复消息。

---

## 适合 TTS 的内容

| 场景 | 说明 | 示例 |
|------|------|------|
| 🎭 **故事讲述** | 小说、电影、童话等叙事内容 | 睡前故事、电影简介 |
| 📝 **长文摘要** | 文章、报告的语音朗读版 | 周报摘要、新闻播报 |
| 📢 **播报** | 通知、公告、提醒 | 天气播报、股价提醒 |
| 🎮 **游戏旁白** | 游戏中的 NPC 对话、旁白 | RPG 角色台词 |

---

## Voice vs Message

| 维度 | Voice (TTS) | Message |
|------|-------------|---------|
| 输出形式 | 音频 | 文字 |
| 适用场景 | 倾听场景 | 阅读场景 |
| 用户感知 | 语音播报 | 文字显示 |
| 渠道支持 | 有限（支持音频的渠道） | 全渠道 |

---

## 组合使用

TTS 可以与其他输出指令组合：

```
[[audio_as_voice]]
MEDIA:/path/to/audio.mp3
[embed ref="summary" title="内容摘要" /]

这是音频摘要：
<summary content>
```

---

## 源码参考

```typescript
// 约 line 375
function buildVoiceSection(params: { isMinimal: boolean; ttsHint?: string }) {
  if (params.isMinimal) return [];
  const hint = params.ttsHint?.trim();
  if (!hint) return [];
  return ["## Voice (TTS)", hint, ""];
}
```

---

## 相关文件

- [15_assistant_output_directives.md](./15_assistant_output_directives.md) — 输出指令（含 `[[audio_as_voice]]`）
- [17_messaging.md](./17_messaging.md) — 消息发送规范
- [21_runtime.md](./21_runtime.md) — 运行时信息