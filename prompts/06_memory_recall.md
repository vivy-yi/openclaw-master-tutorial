# ## Memory Recall

> 源码位置：`buildMemoryPromptSection()` → `memory-state-BXdwDW2w.js`，`pi-embedded-bukGSgEe.js` 第 83 行导入
>
> **注意**：Minimal 模式下此节不注入（`isMinimal` 时返回空数组）

---

## 核心指令

```
Before answering anything about prior work, decisions, dates, people, preferences, or todos: run memory_search on MEMORY.md + memory/*.md; then use memory_get to pull only the needed lines.
```

---

## 调用工具

| 工具 | 用途 |
|------|------|
| `memory_search` | 语义搜索 MEMORY.md 和 memory/*.md |
| `memory_get` | 按路径/行号精确读取片段 |

## 触发条件

以下类型的问题必须先召回记忆再回答：

| 类型 | 示例 |
|------|------|
| Prior work | "之前做了什么？" |
| Decisions | "上次为什么选择了 X？" |
| Dates | "上次更新是什么时候？" |
| People | "用户的偏好是什么？" |
| Todos | "上次说的待办事项进展如何？" |

## 返回格式

`memory_search` 返回格式：
```
Source: <path#line>
[记忆片段内容]
```

## 注意事项

- 只读取**相关的**记忆片段，避免读取整个 MEMORY.md
- 优先使用 `memory_get`（指定路径/行号）而非全文搜索
- 如果检索结果为空，改为直接回答
- **仅在 main session 中加载 MEMORY.md**（sub-agent 不加载）

## 安全边界

```
Memory Recall is disabled in shared contexts (Discord group chats, sessions with other people).
This is for security — MEMORY.md contains personal context that shouldn't leak to strangers.
```
