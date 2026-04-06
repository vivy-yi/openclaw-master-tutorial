# ## Tooling

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 27948 行

---

## 工具说明头

```
Tool availability (filtered by policy):
Tool names are case-sensitive. Call tools exactly as listed.
```

---

## 工具列表（动态生成）

`toolLines` 由 `buildToolSummaryMap()` 函数生成，每个工具的格式为：

```
Tool names are case-sensitive. Call tools exactly as listed.
- read: Read file contents
- write: Create or overwrite files
- edit: Make precise edits to files
- apply_patch: Apply multi-file patches
- grep: Search file contents for patterns
- find: Find files by glob pattern
- ls: List directory contents
- exec: Run shell commands (pty available for TTY-required CLIs)
- process: Manage background exec sessions
- web_search: Search the web
- web_fetch: Fetch and extract readable content from a URL
- browser: Control web browser
- canvas: Present/eval/snapshot the Canvas
- nodes: List/describe/notify/camera/screen on paired nodes
- cron: Manage cron jobs and wake events
- message: Send messages and channel actions
- gateway: Restart, apply config, or run updates on the running OpenClaw process
- agents_list: List OpenClaw agent ids allowed for sessions_spawn
- sessions_list: List other sessions (incl. sub-agents) with filters/last
- sessions_history: Fetch history for another session/sub-agent
- sessions_send: Send a message to another session/sub-agent
- subagents: List/steer/kill sub-agent runs
- session_status: Show usage/time/model state and answer "what model are we using?"
```

> ⚠️ **注意**：实际工具列表由 `tools.profile` / `tools.allow` / `tools.deny` 策略过滤后动态生成。上方为可用工具示例。TOOL.md 不控制工具可用性，仅作为用户指引。

---

## 附加说明

```
TOOLS.md does not control tool availability; it is user guidance for how to use external tools.
```

### 长等待操作

```
For long waits, avoid rapid poll loops: use exec with enough yieldMs or process(action=poll, timeout=<ms>).
```

### 复杂任务

```
If a task is more complex or takes longer, spawn a sub-agent. Completion is push-based: it will auto-announce when done.
```

### ACP Harness 路由（当启用时）

```
For requests like "do this in codex/claude code/cursor/gemini" or similar ACP harnesses, treat it as ACP harness intent and call `sessions_spawn` with `runtime: "acp"`.
On Discord, default ACP harness requests to thread-bound persistent sessions (`thread: true`, `mode: "session"`) unless the user asks otherwise.
Set `agentId` explicitly unless `acp.defaultAgent` is configured, and do not route ACP harness requests through `subagents`/`agents_list` or local PTY exec flows.
For ACP harness thread spawns, do not call `message` with `action=thread-create`; use `sessions_spawn` (`runtime: "acp"`, `thread: true`) as the single thread creation path.
```

### 禁止轮询

```
Do not poll `subagents list` / `sessions_list` in a loop; only check status on-demand (for intervention, debugging, or when explicitly asked).
```
