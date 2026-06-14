# Tooling（工具说明）

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 450
> 参考：https://docs.openclaw.ai/tools/index

---

## 工具说明头

```typescript
"Tool names are case-sensitive. Call tools exactly as listed in the structured tool definitions.",
"If a tool is present in the structured tool definitions, it is available unless a later tool call reports a policy/runtime restriction.",
```

---

## 重要说明

```
TOOLS.md does not control tool availability; it is user guidance for how to use external tools.
```

---

## Cron 工具可用时（hasCronTool）

```
For follow-up at a future time ("check back in 10 minutes", reminders, run-later work, recurring tasks),
  use cron instead of exec sleep, yieldMs delays, or process polling.
Use exec/process only for commands that start now and continue running in the background.
For long-running work that starts now, start it once and rely on automatic completion wake when it is enabled;
  otherwise use process to confirm completion, logs, status, input, or intervention.
Do not emulate scheduling with sleep loops, timeout loops, or repeated polling.
```

---

## Cron 工具不可用时

```
For long waits, avoid rapid poll loops: use exec with enough yieldMs or process(action=poll, timeout=<ms>).
For long-running work that starts now, start it once and rely on automatic completion wake.
```

---

## Update Plan 工具（hasUpdatePlanTool）

```
For non-trivial multi-step work, keep a short plan updated with `update_plan`.
Skip `update_plan` for simple tasks, obvious one-step fixes, or work you can finish in a few direct actions.
When you use `update_plan`, keep exactly one step `in_progress` until the work is done.
After calling `update_plan`, continue the work and do not repeat the full plan unless the user asks.
```

---

## ACP Harness Spawn（hasAcpHarnessSpawnAllowed）

```
For requests like "do this in codex/claude code/cursor/gemini" or similar ACP harnesses,
  treat it as ACP harness intent and call `sessions_spawn` with `runtime: "acp"`.
On Discord, default ACP harness requests to thread-bound persistent sessions
  (`thread: true`, `mode: "session"`) unless the user asks otherwise.
Set `agentId` explicitly unless `acp.defaultAgent` is configured.
Do not call `message` with `action=thread-create`; use `sessions_spawn` (`runtime: "acp"`, `thread: true`).
```

---

## Built-in Tools（内置工具）

| Tool | 功能 | 文档 |
| ---- | ---- | ---- |
| `exec` / `process` | 运行 shell 命令，管理后台进程 | [Exec](/tools/exec) |
| `code_execution` | 沙箱远程 Python 分析 | [Code Execution](/tools/code-execution) |
| `browser` | 控制 Chromium 浏览器 | [Browser](/tools/browser) |
| `web_search` / `x_search` / `web_fetch` | 搜索网页、搜索 X、获取页面内容 | [Web](/tools/web) |
| `read` / `write` / `edit` | 工作空间内文件操作 | - |
| `apply_patch` | 多 hunk 文件补丁 | [Apply Patch](/tools/apply-patch) |
| `message` | 跨渠道发送消息 | [Agent Send](/tools/agent-send) |
| `canvas` | 驱动 node Canvas | - |
| `nodes` | 发现并控制配对设备 | - |
| `cron` / `gateway` | 调度任务；检查、补丁、重启、更新 gateway | - |
| `image` / `image_generate` | 分析或生成图片 | [Image Generation](/tools/image-generation) |
| `music_generate` | 生成音乐轨道 | [Music Generation](/tools/music-generation) |
| `video_generate` | 生成视频 | [Video Generation](/tools/video-generation) |
| `tts` | 一次性文本转语音 | [TTS](/tools/tts) |
| `sessions_*` / `subagents` / `agents_list` | Session 管理、状态、子 Agent 编排 | [Sub-agents](/tools/subagents) |
| `session_status` | 轻量级 /status 风格读取和 session model override | [Session Tools](/concepts/session-tool) |

---

## Tool Groups（工具组）

在 allow/deny 列表中使用 `group:*` 简写：

| Group | Tools |
| ----- | ----- |
| `group:runtime` | exec, process, code_execution（`bash` 是 `exec` 的别名） |
| `group:fs` | read, write, edit, apply_patch |
| `group:sessions` | sessions_list, sessions_history, sessions_send, sessions_spawn, sessions_yield, subagents, session_status |
| `group:memory` | memory_search, memory_get |
| `group:web` | web_search, x_search, web_fetch |
| `group:ui` | browser, canvas |
| `group:automation` | cron, gateway |
| `group:messaging` | message |
| `group:nodes` | nodes |
| `group:agents` | agents_list |
| `group:media` | image, image_generate, music_generate, video_generate, tts |
| `group:openclaw` | 所有内置 OpenClaw 工具（不含插件工具） |

---

## Tool Profile（工具配置集）

`tools.profile` 设置基础 allowlist，然后应用 `allow`/`deny`：

| Profile | 包含内容 |
| ------- | -------- |
| `full` | 所有核心和可选插件工具；不受限制的命令/控制访问基线 |
| `coding` | `group:fs`, `group:runtime`, `group:web`, `group:sessions`, `group:memory`, `cron`, `image`, `image_generate`, `music_generate`, `video_generate` |
| `messaging` | `group:messaging`, `sessions_list`, `sessions_history`, `sessions_send`, `session_status` |
| `minimal` | 仅 `session_status` |

**示例配置：**
```json5
{
  tools: {
    profile: "full",  // 默认完全访问
    byProvider: {
      "google-antigravity": { profile: "minimal" },  // 特定 Provider 限制
    },
  },
}
```

---

## Tool Allow/Deny（工具允许/拒绝）

```json5
{
  tools: {
    allow: ["group:fs", "browser", "web_search"],
    deny: ["exec"],
  },
}
```

**规则：deny 总是优先于 allow。**

> ⚠️ 当显式 allowlist 解析为无可调用工具时，OpenClaw 会失败关闭（不会继续作为纯文本运行）。

---

## Per-agent Tool Override

```json5
{
  agents: {
    list: [
      { id: "docs", tools: { profile: "coding" } },
      { id: "locked", tools: { allow: ["session_status"] } },
    ],
  },
}
```

---

## 相关文档

- [Tools and plugins（总览）](/tools/index)
- [Skills（技能系统）](/prompts/07_skills)
- [Exec tool（执行工具）](/tools/exec)
- [Sub-agents（子代理）](/tools/subagents)
- [Creating skills（创建技能）](/tools/creating-skills)