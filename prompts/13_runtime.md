# ## Runtime

> 源码：`src/agents/system-prompt.ts` — `buildRuntimeLine()`，约 line 770

---

## buildRuntimeLine 函数

```typescript
export function buildRuntimeLine(
  runtimeInfo?: {
    agentId?: string; host?: string; os?: string; arch?: string;
    node?: string; model?: string; defaultModel?: string;
    shell?: string; repoRoot?: string;
  },
  runtimeChannel?: string,
  runtimeCapabilities: string[] = [],
  defaultThinkLevel?: ThinkLevel,
): string {
  return `Runtime: ${[
    runtimeInfo?.agentId ? `agent=${runtimeInfo.agentId}` : "",
    runtimeInfo?.host ? `host=${runtimeInfo.host}` : "",
    runtimeInfo?.repoRoot ? `repo=${runtimeInfo.repoRoot}` : "",
    runtimeInfo?.os ? `os=${runtimeInfo.os}${runtimeInfo?.arch ? ` (${runtimeInfo.arch})` : ""}` : "",
    runtimeInfo?.node ? `node=${runtimeInfo.node}` : "",
    runtimeInfo?.model ? `model=${runtimeInfo.model}` : "",
    runtimeInfo?.defaultModel ? `default_model=${runtimeInfo.defaultModel}` : "",
    runtimeInfo?.shell ? `shell=${runtimeInfo.shell}` : "",
    runtimeChannel ? `channel=${runtimeChannel}` : "",
    runtimeChannel
      ? `capabilities=${normalizedRuntimeCapabilities.length > 0 ? normalizedRuntimeCapabilities.join(",") : "none"}`
      : "",
    `thinking=${defaultThinkLevel ?? "off"}`,
  ]...}`
}
```

---

## 实际输出示例

```
Runtime: agent=openclaw-assistant | host=d的Mac-mini | repo=/Users/d/.openclaw | os=Darwin 25.3.0 (arm64) | node=v24.10.0 | model=minimax-portal/MiniMax-M2.7 | default_model=minimax-portal/MiniMax-M2.7 | shell=zsh | channel=telegram | capabilities=inlineButtons | thinking=off
```

---

## 字段说明

| 字段 | 来源 | 说明 |
|------|------|------|
| `agent` | `runtimeInfo.agentId` | Agent ID |
| `host` | `runtimeInfo.host` | 主机名 |
| `repo` | `runtimeInfo.repoRoot` | 仓库根目录 |
| `os` | `runtimeInfo.os` + `arch` | 操作系统 |
| `node` | `runtimeInfo.node` | Node 版本 |
| `model` | `runtimeInfo.model` | 当前使用模型 |
| `default_model` | `runtimeInfo.defaultModel` | 默认模型 |
| `shell` | `runtimeInfo.shell` | 默认 shell |
| `channel` | `runtimeChannel` | 当前渠道 |
| `capabilities` | `runtimeCapabilities` | 渠道能力 |
| `thinking` | `defaultThinkLevel` | 推理模式 |

## 推理说明

```
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning; /status shows Reasoning when enabled.
```

| reasoningLevel | 说明 |
|---------------|------|
| `off`（默认） | 隐藏推理过程 |
| `on` | 推理过程对用户可见 |
| `stream` | 推理过程流式输出 |

## capabilities 支持情况

| 能力 | 说明 |
|------|------|
| `inlineButtons` | 支持内联按钮 |
| `none` | 无特殊能力 |
