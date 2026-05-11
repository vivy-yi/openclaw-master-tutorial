# ## Control UI Embed

> 源码：`src/agents/system-prompt.ts` — `buildWebchatCanvasSection()`，约 line 275
>
> **注入条件**：`!isMinimal && runtimeChannel === "webchat"`

---

## 什么是 Control UI Embed

`[embed ...]` 是 OpenClaw Control UI（Webchat）专用的**富内容渲染指令**，用于在助手气泡内直接渲染 HTML 内容、图表、卡片等。

---

## 基本规则

- `[embed ...]` **仅限** Control UI / webchat 会话中使用
- **不可用于**非 web 渠道（ Telegram、Discord 等）
- `[embed ...]` 与 `MEDIA:` 是**独立的**：
  - `MEDIA:` 用于附件投递
  - `[embed ...]` 用于 web 富渲染

---

## 语法

### 自闭合形式（推荐）

```
[embed ref="cv_123" title="Status" height="320" /]
```

### URL 形式

```
[embed url="/__openclaw__/canvas/documents/cv_123/index.html" title="Status" height="320" /]
```

---

## 属性说明

| 属性 | 说明 | 必需 |
|------|------|------|
| `ref` | hosted document 的引用 ID | 是（除非用 url） |
| `url` | 完整的 `/__openclaw__/canvas/...` URL | 是（除非用 ref） |
| `title` | 嵌入块的标题（显示在 UI 中） | 否 |
| `height` | 高度（像素） | 否 |
| 所有属性值 | **必须加引号** | 是 |

---

## Embed Root（嵌入根目录）

Canvas 文件存储在 profile-scoped 目录：

```
<canvasRootDir>/documents/<id>/index.html
```

示例：
```
/Users/d/.openclaw/canvas/documents/cv_123/index.html
```

### 规则

- 永远不要用本地文件系统路径或 `file://...` URLs
- Hosted embeds 必须指向 `/__openclaw__/canvas/...` URL
- 或使用 `ref="..."` 引用形式

---

## 典型使用场景

| 场景 | 示例 |
|------|------|
| 状态卡片 | `[embed ref="cv_123" title="会话状态" height="320" /]` |
| 任务看板 | `[embed ref="task_board" title="今日任务" height="400" /]` |
| 图表渲染 | `[embed ref="chart_001" title="持仓分布" height="300" /]` |
| 文档预览 | `[embed url="/__openclaw__/canvas/documents/xxx/index.html" title="文档" /]` |

---

## 使用流程

1. **准备 HTML 内容**
   ```javascript
   // 生成 HTML 内容
   const html = `<div>Status: Running</div>`;
   
   // 写入 canvas 目录
   write(html, "canvas/documents/cv_123/index.html");
   ```

2. **发送嵌入指令**
   ```
   [embed ref="cv_123" title="Status" height="320" /]
   ```

3. **UI 渲染**
   Control UI 读取 HTML 并渲染为富内容。

---

## 与 Message 工具的区别

| 维度 | Control UI Embed | Message 工具 |
|------|-----------------|-------------|
| 目标渠道 | 仅 webchat | 所有渠道 |
| 内容类型 | HTML 渲染 | 文本/附件 |
| 交互性 | 可嵌入表单/按钮 | 纯消息 |

---

## 源码参考

```typescript
// 约 line 275
function buildWebchatCanvasSection(params: {
  isMinimal: boolean;
  runtimeChannel?: string;
  canvasRootDir?: string;
}) {
  if (params.isMinimal || params.runtimeChannel !== "webchat") {
    return [];
  }
  return [
    "## Control UI Embed",
    "Use `[embed ...]` only in Control UI/webchat sessions for inline rich rendering.",
    "- Do not use `[embed ...]` for non-web channels.",
    // ...
  ];
}
```

---

## 相关文件

- [15_assistant_output_directives.md](./15_assistant_output_directives.md) — 输出指令
- [17_messaging.md](./17_messaging.md) — 消息发送规范
- [21_runtime.md](./21_runtime.md) — 运行时信息（包含 channel）