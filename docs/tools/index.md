---
summary: "OpenClaw tools and plugins overview: what the agent can do and how to extend it"
read_when:
  - You want to understand what tools OpenClaw provides
  - You need to configure, allow, or deny tools
  - You are deciding between built-in tools, skills, and plugins
title: "Tools and plugins"
sidebarTitle: "Tools"
---

Everything the agent does beyond generating text happens through **tools**.
Tools are how the agent reads files, runs commands, browses the web, sends
messages, and interacts with devices.

## Tools, skills, and plugins

OpenClaw has three layers that work together:

<Steps>
  <Step title="Tools are what the agent calls">
    A tool is a typed function the agent can invoke (e.g. `exec`, `browser`,
    `web_search`, `message`). OpenClaw ships a set of **built-in tools** and
    plugins can register additional ones.

    The agent sees tools as structured function definitions sent to the model API.

  </Step>
  <Step title="Skills teach the agent when and how">
    A skill is a markdown file (`SKILL.md`) injected into the system prompt.
    Skills give the agent context, constraints, and step-by-step guidance for
    using tools effectively. Skills live in your workspace, in shared folders,
    or ship inside plugins.

    [Skills reference](/tools/skills) | [Creating skills](/tools/creating-skills)

  </Step>
  <Step title="Plugins package everything together">
    A plugin is a package that can register any combination of capabilities:
    channels, model providers, tools, skills, speech, realtime transcription,
    realtime voice, media understanding, image generation, video generation,
    web fetch, web search, and more. Some plugins are **core** (shipped with
    OpenClaw), others are **external** (published on npm by the community).

    [Install and configure plugins](/tools/plugin) | [Build your own](/plugins/building-plugins)

  </Step>
</Steps>

## Built-in tools

These tools ship with OpenClaw and are available without installing any plugins:

| Tool | What it does | Page |
| ---- | ------------ | ---- |
| `exec` / `process` | Run shell commands, manage background processes | [Exec](/tools/exec), [Exec Approvals](/tools/exec-approvals) |
| `code_execution` | Run sandboxed remote Python analysis | [Code Execution](/tools/code-execution) |
| `browser` | Control a Chromium browser (navigate, click, screenshot) | [Browser](/tools/browser) |
| `web_search` / `x_search` / `web_fetch` | Search the web, search X posts, fetch page content | [Web](/tools/web), [Web Fetch](/tools/web-fetch) |
| `read` / `write` / `edit` | File I/O in the workspace | - |
| `apply_patch` | Multi-hunk file patches | [Apply Patch](/tools/apply-patch) |
| `message` | Send messages across all channels | [Agent Send](/tools/agent-send) |
| `canvas` | Drive node Canvas (present, eval, snapshot) | - |
| `nodes` | Discover and target paired devices | - |
| `cron` / `gateway` | Manage scheduled jobs; inspect, patch, restart, or update the gateway | - |
| `image` / `image_generate` | Analyze or generate images | [Image Generation](/tools/image-generation) |
| `music_generate` | Generate music tracks | [Music Generation](/tools/music-generation) |
| `video_generate` | Generate videos | [Video Generation](/tools/video-generation) |
| `tts` | One-shot text-to-speech conversion | [TTS](/tools/tts) |
| `sessions_*` / `subagents` / `agents_list` | Session management, status, and sub-agent orchestration | [Sub-agents](/tools/subagents) |
| `session_status` | Lightweight `/status`-style readback and session model override | [Session Tools](/concepts/session-tool) |

## Plugin-provided tools

Plugins can register additional tools. Some examples:

- [Diffs](/tools/diffs) — diff viewer and renderer
- [LLM Task](/tools/llm-task) — JSON-only LLM step for structured output
- [Lobster](/tools/lobster) — typed workflow runtime with resumable approvals
- [Music Generation](/tools/music-generation) — shared `music_generate` tool with workflow-backed providers
- [OpenProse](/prose) — markdown-first workflow orchestration
- [Tokenjuice](/tools/tokenjuice) — compact noisy `exec` and `bash` tool results

## Tool configuration

### Allow and deny lists

Control which tools the agent can call via `tools.allow` / `tools.deny` in
config. Deny always wins over allow.

```json5
{
  tools: {
    allow: ["group:fs", "browser", "web_search"],
    deny: ["exec"],
  },
}
```

### Tool profiles

`tools.profile` sets a base allowlist before `allow`/`deny` is applied.
Per-agent override: `agents.list[].tools.profile`.

| Profile | What it includes |
| ------- | ---------------- |
| `full` | All core and optional plugin tools |
| `coding` | `group:fs`, `group:runtime`, `group:web`, `group:sessions`, `group:memory`, `cron`, `image`, `image_generate`, `music_generate`, `video_generate` |
| `messaging` | `group:messaging`, `sessions_list`, `sessions_history`, `sessions_send`, `session_status` |
| `minimal` | `session_status` only |

### Tool groups

| Group | Tools |
| ----- | ----- |
| `group:runtime` | exec, process, code_execution |
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
| `group:openclaw` | All built-in OpenClaw tools (excludes plugin tools) |

## Related

- [Skills](/tools/skills)
- [Creating skills](/tools/creating-skills)
- [Plugins](/tools/plugin)
- [Exec tool](/tools/exec)
- [Sub-agents](/tools/subagents)
