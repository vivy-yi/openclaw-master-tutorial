# # Project Context

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 699

---

## 注入条件

```typescript
const contextFiles = params.contextFiles ?? [];
const validContextFiles = contextFiles.filter(
  (file) => typeof file.path === "string" && file.path.trim().length > 0,
);
```

---

## 稳定文件 vs 动态文件

```typescript
const DYNAMIC_CONTEXT_FILE_BASENAMES = new Set(["heartbeat.md"]);

const stableContextFiles = orderedContextFiles.filter(
  (file) => !isDynamicContextFile(file.path)
);
const dynamicContextFiles = orderedContextFiles.filter(
  (file) => isDynamicContextFile(file.path)
);
```

---

## 注入结构

```
# Project Context
<stable context files — SOUL.md, USER.md, AGENTS.md, IDENTITY.md, TOOLS.md, etc.>

---
[SYSTEM_PROMPT_CACHE_BOUNDARY]
---

# Dynamic Project Context
<dynamic context files — HEARTBEAT.md>
<runtime-generated content>
```

---

## SYSTEM_PROMPT_CACHE_BOUNDARY

```
Keep large stable prompt context above this seam so Anthropic-family
transports can reuse it across labs and turns.
Dynamic group/session additions and volatile project context below it
are the primary cache invalidators.
```

---

## Project Context 文件注入顺序

根据 `sortContextFilesForPrompt()` 的排序：

```
1. SOUL.md         ← 如果存在，优先注入人格
2. USER.md        ← 用户信息
3. AGENTS.md      ← 操作指令
4. IDENTITY.md    ← 名称/emoji
5. TOOLS.md       ← 工具说明
6. HEARTBEAT.md   ← 动态文件，在 boundary 之后
7. BOOTSTRAP.md   ← 仅全新 workspace 时
```

---

## 约束

- 只有文件路径非空的才注入
- `DYNAMIC_CONTEXT_FILE_BASENAMES` 中的文件被标记为动态
- 目前只有 `heartbeat.md` 是动态文件
