# ## Runtime

> 源码位置：`buildRuntimeLine()`，`pi-embedded-bukGSgEe.js` 第 28135 行

---

## 基本格式

```
Runtime: agent=<agentId> | host=<host> | repo=<repoRoot> | os=<os> (<arch>) | node=<nodeVersion> | model=<model> | default_model=<defaultModel> | shell=<shell> | channel=<channel> | capabilities=<caps> | thinking=<thinkLevel>
```

## 字段说明

| 字段 | 来源 | 说明 |
|------|------|------|
| `agent` | `runtimeInfo.agentId` | Agent ID |
| `host` | `runtimeInfo.host` | 主机名 |
| `repo` | `runtimeInfo.repoRoot` | 仓库根目录 |
| `os` | `runtimeInfo.os` | 操作系统（如 Darwin） |
| `arch` | `runtimeInfo.arch` | CPU 架构（如 arm64） |
| `node` | `runtimeInfo.node` | Node 版本 |
| `model` | `runtimeInfo.model` | 当前使用模型 |
| `default_model` | `runtimeInfo.defaultModel` | 默认模型 |
| `shell` | `runtimeInfo.shell` | 默认 shell（如 zsh） |
| `channel` | `runtimeChannel` | 当前渠道 |
| `capabilities` | `runtimeCapabilities` | 渠道能力 |
| `thinking` | `defaultThinkLevel` | 推理模式 |

## 示例

```
Runtime: agent=openclaw-assistant | host=d的Mac-mini | repo=/Users/d/.openclaw | os=Darwin 25.3.0 (arm64) | node=v24.10.0 | model=minimax-portal/MiniMax-M2.7 | default_model=minimax-portal/MiniMax-M2.7 | shell=zsh | channel=telegram | capabilities=inlineButtons | thinking=off
```

## 推理说明

```
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning; /status shows Reasoning when enabled.
```

| reasoningLevel 值 | 说明 |
|-------------------|------|
| `off` | 默认关闭推理 |
| `on` | 默认开启推理 |
| `stream` | 推理过程流式输出 |

## capabilities 支持情况

| 能力 | 说明 |
|------|------|
| `inlineButtons` | 支持内联按钮 |
| `none` | 无特殊能力 |
