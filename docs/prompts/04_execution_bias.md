# ## Execution Bias

> 源码：`src/agents/system-prompt.ts` — `buildExecutionBiasSection()`，约 line 299
>
> **注入条件**：Full 模式（Minimal 模式下**不注入**）
>
> **重要**：这是 OpenClaw 区别于普通 LLM 的核心机制——强调**行动优先**而非"Plan 优先"。

---

## 核心理念

> "Actionable request: act in this turn."
> 
> 有明确请求时，**立即行动**，不要只是返回计划。

---

## 七大原则

### 1. 立即行动原则

```
Actionable request: act in this turn.
```

当用户有明确请求时，直接执行，不要先返回计划。

**❌ 错误示例：**
```
用户：帮我整理桌面文件
LLM：好的，我可以帮你整理桌面文件。我会先扫描文件，然后按类型分类...
```

**✅ 正确示例：**
```
用户：帮我整理桌面文件
OpenClaw：[直接执行 ls, read, write 等工具]
```

---

### 2. 推进而非等待

```
Non-final turn: use tools to advance, or ask for the one missing decision that blocks safe progress.
```

如果不是最后一次交互，用工具推进工作，或询问阻碍进度的关键决策。

---

### 3. 完成而非承诺

```
Continue until done or genuinely blocked; do not finish with a plan/promise when tools can move it forward.
```

继续直到完成或真正被阻塞，不要在工具还能推进时却以"计划"结束。

---

### 4. 变换策略

```
Weak/empty tool result: vary query, path, command, or source before concluding.
```

工具返回空或弱结果时，在放弃前尝试变换查询方式、路径、命令或来源。

---

### 5. 实时验证

```
Mutable facts need live checks: files, git, clocks, versions, services, processes, package state.
```

可变的事实需要实时检查：文件、git、时钟、版本、服务、进程、包状态。

---

### 6. 证据支撑

```
Final answer needs evidence: test/build/lint, screenshot, inspection, tool output, or a named blocker.
```

最终答案需要证据：测试/构建/lint、截图、检查、工具输出，或明确说明阻塞原因。

---

### 7. 后台与子 Agent

```
Longer work: brief progress update, then keep going; use background work or sub-agents when they fit.
```

较长工作：简短进度更新，然后继续；适合时使用后台工作或子 Agent。

---

## Full vs Minimal 模式

| 模式 | Execution Bias |
|------|---------------|
| Full | ✅ 完整注入（7条原则） |
| Minimal | ❌ 不注入（默认父 Agent 已分配任务） |

---

## 与 Tool Call Style 的区别

| 维度 | Tool Call Style | Execution Bias |
|------|----------------|---------------|
| **关注点** | 如何调用工具 | 何时/为何调用工具 |
| **内容** | 风格规范（简洁叙述） | 行动原则（7条） |
| **模式** | Full + Minimal | Full only |
| **位置** | 工具列表之后 | Tool Call Style 之后 |

---

## 实战示例

### 场景 1：用户请求文件操作

**用户**：帮我检查项目依赖

**❌ 不合格响应**：
```
我可以帮你检查项目依赖。你需要先确认 package.json 存在，然后运行 npm list...
```

**✅ 合格响应**：
```
[直接执行 ls, read, exec 等工具检查]
```

---

### 场景 2：工具返回空结果

**工具返回**：`No results found`

**❌ 不合格响应**：
```
没有找到结果。
```

**✅ 合格响应**：
```
[尝试其他路径/关键词]
[或明确说明：所有常见路径均无结果，建议检查具体文件名]
```

---

## 源码参考

```typescript
function buildExecutionBiasSection(params: { isMinimal: boolean }) {
  if (params.isMinimal) {
    return [];
  }
  return [
    "## Execution Bias",
    "- Actionable request: act in this turn.",
    "- Non-final turn: use tools to advance...",
    // ... 7条原则
    "",
  ];
}
```

---

## 相关文件

- [03_tool_call_style.md](./03_tool_call_style.md) — 工具调用风格
- [28_full_system_prompt.md](./28_full_system_prompt.md) — 完整提示词（包含 Execution Bias 完整内容）