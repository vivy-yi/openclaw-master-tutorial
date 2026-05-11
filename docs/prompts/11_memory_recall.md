# ## Memory Recall

> 源码：`src/agents/system-prompt.ts` — `buildMemorySection()` line 125，调用 `buildMemoryPromptSection()` from `src/plugins/memory-core.ts`
>
> **注意**：Minimal 模式下此节**不注入**（返回空数组）

---

## 架构说明

Memory Recall 提示词由 **Memory Plugin** 注册的 `promptBuilder` 动态生成，非硬编码字符串。

```typescript
// src/agents/system-prompt.ts line 125
function buildMemorySection(params: { isMinimal: boolean; ... }) {
  if (params.isMinimal) {
    return [];  // Minimal 模式跳过
  }
  return buildMemoryPromptSection({ availableTools, citationsMode });
}
```

## Memory Plugin 注册机制

```typescript
// src/plugins/memory-state.ts
export function registerMemoryPromptBuilder(builder: MemoryPromptSectionBuilder): void {
  memoryPluginState.promptBuilder = builder;
}
```

## 记忆来源配置

通过 `agents.defaults.memory` 配置：

```json
{
  "memory": {
    "recall": {
      "enabled": true,
      "sources": ["memory"],  // "memory"=MEMORY.md+memory文件; "sessions"=对话历史
      "sessionTranscriptIndexing": false
    }
  }
}
```

## Memory Citations Mode

```typescript
type MemoryCitationsMode =
  | "off"           // 关闭引用
  | "inline"       // 内联引用（inline citations）
  | "block"         // 块引用（block citations）
```

## 安全边界

```
Memory Recall 仅在 main session 中加载 MEMORY.md
Sub-agent / 共享上下文（Discord 群组等）不加载 MEMORY.md
```

这是安全设计 — MEMORY.md 包含用户私人信息，不能泄漏到陌生人。
