# 附录J: OpenClaw 完整配置参考

> 基于 OpenClaw v2026.4.x 源码分析 + 用户实际配置整理
> 最后更新: 2026-04-24

---

## 关于本文档

本文档是 OpenClaw 配置的完整参考，涵盖所有配置项的详细说明。如果你正在寻找特定配置项，请使用目录导航或搜索功能。

> ⚠️ **版本兼容性**：某些配置项是近期新增的。`lastTouchedVersion` 字段可以帮助你确认配置与版本的兼容性。

> 🔧 **故障排查**：遇到配置问题？先运行 `openclaw doctor` 进行诊断。

## 内容导航

| 章节 | 主题 | 预计阅读时间 |
|------|------|--------------|
| [核心配置文件](#1-核心配置文件) | openclaw.json 结构、加载顺序、验证 | 15分钟 |
| [认证和模型提供商](#2-认证和模型提供商) | API Key、OAuth、多模型配置 | 25分钟 |
| [Agent 系统配置](#3-agent-系统配置) | Agent定义、子Agent白名单、多Agent协作 | 20分钟 |
| [记忆系统](#4-记忆系统) | memorySearch、压缩模式、共享知识库 | 15分钟 |
| [频道集成](#5-频道集成) | Telegram、飞书、Discord配置 | 20分钟 |
| [浏览器自动化](#6-浏览器自动化) | Chrome配置、profile管理、SSRF策略 | 15分钟 |
| [Skills 系统](#7-skills-系统) | Skill目录、安装、自定义 | 10分钟 |
| [安全配置](#8-安全配置) | dmPolicy、exec安全、工具权限 | 15分钟 |
| [Cron 和自动化](#9-cron-和自动化) | 定时任务、session管理、delivery | 15分钟 |
| [网关和网络](#10-网关和网络) | 端口绑定、WebSocket、代理 | 10分钟 |
| [插件系统](#11-插件系统) | 插件加载、内置插件 | 10分钟 |
| [其他配置](#12-其他配置) | MCP、日志、性能调优 | 10分钟 |

---

## 1. 核心配置文件

### 1.1 openclaw.json 结构

主配置文件位于 `~/.openclaw/openclaw.json`，所有配置项均为可选——OpenClaw 有完整的默认值系统。

> 📝 **配置位置**：`openclaw config` 是管理配置的主要方式。推荐使用 CLI 而非直接编辑 JSON 文件。

```json
{
  "meta": {
    "lastTouchedVersion": "2026.4.11",
    "lastTouchedAt": "2026-04-12T12:56:36.762Z"
  },
  "env": { "vars": {} },
  "wizard": {},
  "browser": {},
  "auth": {},
  "acp": {},
  "models": {},
  "agents": {},
  "tools": {},
  "bindings": [],
  "messages": {},
  "commands": {},
  "session": {},
  "channels": {},
  "gateway": {},
  "skills": {},
  "plugins": {},
  "broadcast": {}
}
```

**各配置域功能速览**：

| 配置域 | 主要功能 |
|--------|----------|
| `meta` | 配置版本追踪 |
| `env` | 环境变量配置 |
| `browser` | 浏览器自动化 |
| `auth` | 认证配置 |
| `acp` | ACP协议配置 |
| `models` | 模型提供商配置 |
| `agents` | Agent定义 |
| `bindings` | 消息路由规则 |
| `channels` | 频道集成 |
| `gateway` | 网关配置 |
| `skills` | Skills系统 |
| `plugins` | 插件管理 |

### 1.2 配置加载顺序（优先级从低到高）

```
1. 内置默认值（代码中 hardcoded）
2. ~/.openclaw/openclaw.json
3. 环境变量（通过 env.vars 或直接系统环境变量）
4. 命令行参数覆盖
```

### 1.3 .env 环境变量配置

```json
"env": {
  "vars": {
    "TAVILY_API_KEY": "tvly-..."
  }
}
```

环境变量也可以直接使用系统环境变量（不写在 `openclaw.json` 里），通过 `process.env` 访问。

### 1.4 配置验证

OpenClaw 使用 Zod schema 做运行时验证。配置写入时会自动校验类型和约束，非法配置会拒绝加载并给出详细错误信息。

### 1.5 Wizard 元数据

```json
"wizard": {
  "lastRunAt": "2026-04-03T13:21:49.827Z",
  "lastRunVersion": "2026.4.1",
  "lastRunCommand": "doctor",
  "lastRunMode": "local"
}
```

**字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `lastRunAt` | string (ISO date) | 上次 wizard 运行时间 |
| `lastRunVersion` | string | 上次运行的版本 |
| `lastRunCommand` | string | 命令类型：`doctor`、`configure` 等 |
| `lastRunMode` | string | 运行模式：`local`、`remote` 等 |

---

## 2. 认证和模型提供商

### 2.1 认证配置 (auth)

```json
"auth": {
  "profiles": {
    "anthropic:default": {
      "provider": "minimax-cn",
      "mode": "api_key"
    },
    "minimax-cn:default": {
      "provider": "minimax-cn",
      "mode": "api_key"
    },
    "minimax-portal:default": {
      "provider": "minimax-portal",
      "mode": "oauth"
    }
  }
}
```

**字段说明：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `profiles` | object | - | 认证配置集合，键格式为 `providerId:profileName` |
| `profiles.*.provider` | string | - | 提供商 ID（如 `anthropic`、`openai`） |
| `profiles.*.mode` | enum | - | 认证模式：`api_key`、`oauth`、`token` |

### 2.2 模型提供商配置 (models)

```json
"models": {
  "mode": "merge",
  "providers": {
    "minimax": {
      "baseUrl": "https://api.minimaxi.com/v1/text",
      "apiKey": "sk-...",
      "api": "openai-completions",
      "models": [
        {
          "id": "MiniMax-M2.5",
          "name": "MiniMax M2.5",
          "api": "openai-completions",
          "reasoning": true,
          "input": ["text"],
          "cost": {
            "input": 15,
            "output": 60,
            "cacheRead": 2,
            "cacheWrite": 10
          },
          "contextWindow": 200000,
          "maxTokens": 8192
        }
      ]
    }
  }
}
```

**models.mode：**

| 值 | 说明 |
|----|------|
| `merge` | 合并多个提供商的模型定义（默认） |
| `replace` | 替换内置模型定义 |

> 💡 **推荐配置**：大多数用户使用 `merge` 模式，这样可以同时使用多个提供商的模型。

**model.cost 字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `input` | number | 输入价格（$/M tokens） |
| `output` | number | 输出价格（$/M tokens） |
| `cacheRead` | number | 缓存读取价格（$/M tokens） |
| `cacheWrite` | number | 缓存写入价格（$/M tokens） |
| `tieredPricing` | array | 分层定价规则 |

**model.compat 字段（兼容性配置）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `supportsStore` | boolean | 支持 store 工具 |
| `supportsPromptCacheKey` | boolean | 支持缓存提示词键 |
| `supportsDeveloperRole` | boolean | 支持 developer 角色 |
| `supportsReasoningEffort` | boolean | 支持推理努力参数 |
| `maxTokensField` | enum | `max_completion_tokens` 或 `max_tokens` |
| `thinkingFormat` | enum | 思考格式：`openai`、`openrouter`、`qwen` 等 |
| `nativeWebSearchTool` | boolean | 原生网络搜索工具 |
| `toolCallArgumentsEncoding` | string | 工具调用参数编码方式 |

**支持的 API 类型（api 字段）：**

```javascript
[
  "openai-completions",    // OpenAI 兼容补全 API
  "openai-responses",      // OpenAI 响应 API
  "openai-codex-responses", // GitHub Codex 响应
  "anthropic-messages",    // Anthropic 消息 API
  "google-generative-ai",  // Google Gemini
  "github-copilot",       // GitHub Copilot
  "bedrock-converse-stream", // AWS Bedrock
  "ollama",               // Ollama 本地
  "azure-openai-responses"  // Azure OpenAI
]
```

### 2.3 提供商请求配置 (providers.*.request)

```json
"request": {
  "headers": { "X-Custom-Header": "value" },
  "auth": {
    "mode": "authorization-bearer",
    "token": "secret-token"
  },
  "proxy": {
    "mode": "env-proxy",
    "tls": { "insecureSkipVerify": false }
  },
  "tls": {
    "ca": "/path/to/ca.pem",
    "cert": "/path/to/cert.pem",
    "key": "/path/to/key.pem"
  }
}
```

---

## 3. Agent 系统配置

### 3.1 全局默认值 (agents.defaults)

```json
"agents": {
  "defaults": {
    "model": {
      "primary": "minimax-portal/MiniMax-M2.7",
      "fallbacks": [
        "minimax-portal/MiniMax-M2.1",
        "minimax-portal/MiniMax-M2.5"
      ]
    },
    "models": {
      "minimax-portal/MiniMax-M2.7": { "alias": "minimax-m2.7" }
    },
    "workspace": "/Users/d/.openclaw/workspace",
    "compaction": { "mode": "safeguard" },
    "maxConcurrent": 4,
    "subagents": { "maxConcurrent": 8 },
    "sandbox": { "mode": "off" },
    "memorySearch": {
      "enabled": true,
      "provider": "openai",
      "model": "text-embedding-3-small"
    }
  }
}
```

**关键字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model.primary` | string | - | 主模型（格式：`provider/modelId`） |
| `model.fallbacks` | string[] | - | 回退模型列表 |
| `models.*.alias` | string | - | 模型别名 |
| `models.*.params` | object | - | 模型参数（如 `cacheRetention`） |
| `compaction.mode` | enum | `safeguard` | 压缩模式 |
| `maxConcurrent` | number | 4 | 最大并发数 |
| `subagents.maxConcurrent` | number | 8 | 子 Agent 最大并发数 |
| `sandbox.mode` | enum | `off` | 沙箱模式：`off`、`non-main`、`all` |
| `memorySearch.enabled` | boolean | true | 启用记忆搜索 |
| `memorySearch.provider` | string | `openai` | 嵌入提供商 |
| `memorySearch.model` | string | `text-embedding-3-small` | 嵌入模型 |

### 3.2 Agent 列表 (agents.list)

```json
"agents": {
  "list": [
    {
      "id": "main",
      "name": "主控",
      "workspace": "/Users/d/.openclaw/workspace",
      "subagents": {
        "allowAgents": [
          "gaokao-service", "shenghuo", "mo-finance"
        ]
      }
    }
  ]
}
```

**Agent 定义字段：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识符 |
| `name` | string | - | 显示名称 |
| `workspace` | string | - | 工作区路径（对应附录K的Workspace文件系统） |
| `subagents.allowAgents` | string[] | - | 允许调用的子 Agent ID 白名单 |

### 3.3 ACP 配置 (acp)

```json
"acp": {
  "enabled": true,
  "defaultAgent": "codex",
  "allowedAgents": ["pi", "claude", "codex", "gemini"]
}
```

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | true | 启用 ACP 协议 |
| `defaultAgent` | string | - | 默认 Agent ID |
| `allowedAgents` | string[] | - | 允许的 Agent ID 白名单 |

### 3.4 Binding 路由配置 (bindings)

Bindings 决定来自不同频道/群组的消息路由到哪个 Agent：

```json
"bindings": [
  {
    "agentId": "main",
    "match": {
      "channel": "telegram",
      "peer": { "kind": "direct", "id": "6020964033" }
    }
  },
  {
    "agentId": "mo-finance",
    "match": {
      "channel": "telegram",
      "peer": { "kind": "group", "id": "-1003633299525" }
    }
  }
]
```

**match.peer 字段：**

| kind | id 格式 | 说明 |
|------|---------|------|
| `direct` | 数字字符串 | 私聊 DM |
| `group` | 负数字符串 | 群组 |
| `channel` | 字符串 | 频道 |

---

## 4. 记忆系统

### 4.1 memorySearch 配置

```json
"memorySearch": {
  "enabled": true,
  "provider": "openai",
  "model": "text-embedding-3-small",
  "sources": ["memory", "sessions"],
  "chunking": {
    "tokens": 512,
    "overlap": 50
  },
  "sync": {
    "onSessionStart": true,
    "onSearch": false,
    "watch": true
  }
}
```

**memorySearch 详细字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | true | 启用记忆搜索 |
| `provider` | string | `openai` | 嵌入提供商 |
| `model` | string | `text-embedding-3-small` | 嵌入模型 |
| `sources` | array | `["memory","sessions"]` | 搜索来源 |
| `extraPaths` | string[] | - | 额外搜索路径 |
| `query.maxResults` | number | - | 最大返回结果数 |
| `query.minScore` | number | 0-1 | 最小相似度分数 |
| `chunking.tokens` | number | 512 | 分块 token 数 |
| `chunking.overlap` | number | 50 | 分块重叠 token 数 |
| `sync.onSessionStart` | boolean | true | Session 启动时同步 |
| `sync.watch` | boolean | true | 文件监控同步 |

### 4.2 记忆文件结构

> 📖 **详细说明**：本节仅列出文件结构。更详细的 Workspace 文件系统说明（包括每个文件的作用、设计原理）见 [附录K - Workspace 文件系统](../appendix-k/openclaw-extra-configuration-guide.md#1-workspace-文件系统)。

```
~/.openclaw/
├── workspace/
│   ├── MEMORY.md          # 长期记忆（主 Agent 专用）
│   ├── SOUL.md            # Agent 人格定义
│   ├── IDENTITY.md        # Agent 身份定义
│   ├── USER.md            # 用户画像
│   ├── AGENTS.md          # Agent 工作区说明
│   ├── TOOLS.md           # 本地工具配置
│   ├── HEARTBEAT.md       # 心跳检查清单
│   └── memory/
│       └── YYYY-MM-DD.md  # 每日日志
└── shared/                # 跨 Agent 共享知识库
    ├── consensus/         # 共识层 - 工作流和协议
    ├── knowledge/         # 知识层 - 事实和决策
    ├── context/           # 上下文层 - 活跃任务
    ├── memory/            # 集体记忆
    └── sync/              # 同步状态
```

### 4.3 compaction 配置

```json
"compaction": {
  "mode": "safeguard"
}
```

| 模式 | 说明 |
|------|------|
| `safeguard` | 安全模式，仅在上下文快满时压缩 |
| 其他 | 不同的压缩策略 |

---

## 5. 频道集成

### 5.1 Telegram 配置

```json
"channels": {
  "telegram": {
    "enabled": true,
    "proxy": "http://127.0.0.1:7897",
    "dmPolicy": "allowlist",
    "groupPolicy": "allowlist",
    "streaming": { "mode": "partial" },
    "groups": {
      "-5154981764": { "requireMention": false }
    },
    "accounts": {
      "default": {
        "dmPolicy": "allowlist",
        "botToken": "8499914881:AAF45q...",
        "groupPolicy": "allowlist"
      }
    }
  }
}
```

**Telegram dmPolicy 选项：**

| 值 | 说明 |
|----|------|
| `pairing` | 配对模式（首次互动需要配对） |
| `allowlist` | 白名单模式（默认） |
| `open` | 开放模式（需要 `allowFrom: ["*"]`） |
| `disabled` | 禁用 |

**Telegram 核心字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | true | 启用频道 |
| `dmPolicy` | enum | `pairing` | 私聊策略 |
| `groupPolicy` | enum | `allowlist` | 群组策略 |
| `botToken` | string | - | Bot Token（在 accounts.default 下） |
| `proxy` | string | - | 代理 URL |
| `streaming.mode` | enum | `partial` | 流式响应模式 |
| `groups.*.requireMention` | boolean | true | 是否需要 @ 机器人 |

**Telegram 进阶配置：**

```json
{
  "channels": {
    "telegram": {
      "accounts": {
        "default": {
          "markdown": { "tables": "code" },
          "replyToMode": "first",
          "historyLimit": 100,
          "dmHistoryLimit": 50,
          "textChunkLimit": 4096,
          "streaming": { "mode": "partial" },
          "mediaMaxMb": 50,
          "pollingStallThresholdMs": 30000,
          "retry": {
            "attempts": 3,
            "minDelayMs": 1000,
            "maxDelayMs": 10000
          },
          "webhookUrl": "https://your-domain.com/telegram-webhook",
          "webhookSecret": "your-secret-token"
        }
      }
    }
  }
}
```

### 5.2 Feishu (飞书) 配置

```json
"channels": {
  "feishu": {
    "enabled": true,
    "appId": "cli_a92d9fae6fb8dbd8",
    "appSecret": "EyXwx9Pc5l9a...",
    "connectionMode": "websocket",
    "domain": "feishu",
    "groupPolicy": "allowlist",
    "groupAllowFrom": ["oc_1e0534ae0fcdb5a7d3912cd56ad2c252"]
  }
}
```

**飞书字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | true | 启用频道 |
| `appId` | string | - | 飞书应用 App ID |
| `appSecret` | string | - | 飞书应用 App Secret |
| `connectionMode` | enum | `websocket` | 连接模式：`websocket` 或 `http` |
| `domain` | string | `feishu` | 域名标识 |
| `groupPolicy` | enum | `allowlist` | 群组访问策略 |
| `groupAllowFrom` | array | - | 允许的飞书群组 ID 列表 |

### 5.3 Discord 配置

通过 `channels.discord` 配置，支持 DM、Guild Channel 等细分配置。

### 5.4 多账号支持

```json
"channels": {
  "telegram": {
    "accounts": {
      "default": { "botToken": "...", "dmPolicy": "allowlist" },
      "bot2": { "botToken": "...", "dmPolicy": "open" }
    },
    "defaultAccount": "default"
  }
}
```

---

## 6. 浏览器自动化

```json
"browser": {
  "enabled": true,
  "headless": false,
  "defaultProfile": "openclaw",
  "ssrfPolicy": {
    "dangerouslyAllowPrivateNetwork": true
  },
  "profiles": {
    "openclaw": {
      "cdpPort": 18801,
      "color": "#FF6B6B"
    },
    "user": {
      "driver": "existing-session",
      "attachOnly": true,
      "color": "#00AA00"
    }
  }
}
```

**browser 字段详解：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | true | 启用浏览器自动化 |
| `headless` | boolean | false | 是否无头模式运行 |
| `defaultProfile` | string | `openclaw` | 默认使用的 profile |
| `color` | string | `#FF6B6B` | 浏览器标签页颜色（hex） |
| `executablePath` | string | - | Chrome 可执行文件路径 |
| `noSandbox` | boolean | - | 禁用沙箱（Linux root 用户需要） |
| `attachOnly` | boolean | - | 仅附加模式（不启动新浏览器） |
| `cdpUrl` | string | - | Chrome 远程调试 URL |
| `cdpPortRangeStart` | number | 18800 | CDP 端口范围起始 |
| `remoteCdpTimeoutMs` | number | 1500 | 远程 CDP 连接超时 |
| `extraArgs` | array | - | 额外 Chrome 参数 |
| `ssrfPolicy.dangerouslyAllowPrivateNetwork` | boolean | false | 允许访问私有网络（危险） |
| `ssrfPolicy.allowedHostnames` | array | - | 允许的 hostname 列表 |

**浏览器 profile 字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `driver` | enum | `openclaw` 或 `existing-session` |
| `cdpPort` | number | Chrome 调试端口 |
| `cdpUrl` | string | 完整的 CDP WebSocket URL |
| `color` | string | 标签页颜色（hex） |
| `attachOnly` | boolean | 不启动浏览器，只附加 |
| `userDataDir` | string | 用户数据目录（existing-session 时） |

---

## 7. Skills 系统

```json
"skills": {
  "load": {
    "extraDirs": ["~/.openclaw/skills"]
  },
  "install": {
    "nodeManager": "npm"
  }
}
```

**skills.load 字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `extraDirs` | array | `["~/.openclaw/skills"]` | 额外 skill 目录列表 |
| 内置 skills | - | 内置于 `openclaw/skills/` | 内置 skill 目录 |

**Skill 安装方式：**

```json
"skills": {
  "install": {
    "nodeManager": "npm"  // 或 "yarn", "pnpm"
  }
}
```

**Skill 目录结构：**

```
~/.openclaw/skills/           # 自定义 skills
└── *.SKILL.md               # 每个 skill 一个 SKILL.md

/opt/homebrew/lib/node_modules/openclaw/skills/  # 内置 skills
```

---

## 8. 安全配置

### 8.1 DM 策略 (dmPolicy)

```json
"channels": {
  "telegram": {
    "dmPolicy": "allowlist",
    "allowFrom": ["6020964033", "123456789"]
  }
}
```

**dmPolicy 选项：**

| 策略 | 说明 |
|------|------|
| `pairing` | 用户首次发消息需要完成配对流程 |
| `allowlist` | 仅白名单用户可交互（需要 `allowFrom` 非空） |
| `open` | 任何人可交互（**注意**：需要 `allowFrom: ["*"]`） |
| `disabled` | 完全禁用 DM |

### 8.2 群组策略 (groupPolicy)

| 策略 | 说明 |
|------|------|
| `open` | 开放加入 |
| `disabled` | 禁用 |
| `allowlist` | 仅白名单群组可交互（默认） |

### 8.3 exec 执行安全

```json
"tools": {
  "exec": {
    "host": "gateway",
    "security": "full",
    "safeBins": ["git", "python3", "curl", "ls"],
    "safeBinProfiles": {
      "git": { "allowedValueFlags": ["--help"] }
    }
  }
}
```

**tools.exec 字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `host` | enum | `gateway` | 执行环境：`gateway`、`sandbox`、`node` |
| `security` | enum | `full` | 安全模式：`deny`、`allowlist`、`full` |
| `safeBins` | array | - | 允许执行的可执行文件名列表 |
| `safeBinProfiles.*.minPositional` | number | - | 最小位置参数 |
| `safeBinProfiles.*.maxPositional` | number | - | 最大位置参数 |
| `safeBinProfiles.*.allowedValueFlags` | array | - | 允许的标志（如 `--help`） |
| `safeBinProfiles.*.deniedFlags` | array | - | 拒绝的标志 |
| `pathPrepend` | array | - | PATH 前置目录 |
| `strictInlineEval` | boolean | - | 严格内联求值 |
| `safeBinTrustedDirs` | array | - | 可信目录白名单 |
| `timeoutSec` | number | - | 执行超时（秒） |

### 8.4 elevated 提权执行

```json
"tools": {
  "elevated": {
    "enabled": true,
    "allowFrom": {
      "*": ["6020964033"]
    }
  }
}
```

### 8.5 工具权限策略 (tools.*)

```json
"tools": {
  "web": {
    "search": {
      "enabled": true,
      "provider": "tavily"
    },
    "fetch": {
      "enabled": false
    }
  },
  "agentToAgent": {
    "enabled": true
  }
}
```

**web.search 提供商：**

| 提供商 | 说明 |
|--------|------|
| `tavily` | Tavily 搜索（默认） |
| `brave` | Brave 搜索 |
| `perplexity` | Perplexity |

---

## 9. Cron 和自动化

### 9.1 Cron 任务配置

```json
"cron": [
  {
    "name": "daily-report",
    "schedule": {
      "kind": "cron",
      "expr": "0 9 * * *",
      "tz": "Asia/Shanghai"
    },
    "payload": {
      "kind": "systemEvent",
      "text": "生成每日报告"
    },
    "sessionTarget": "main",
    "delivery": {
      "mode": "announce",
      "channel": "telegram",
      "to": "-1003633299525"
    }
  }
]
```

> ⚠️ **关键配置陷阱（重要）**：
> - `sessionTarget` + `payload.message中的Agent身份` + `delivery.to` **三者必须匹配**
> - 例如：发送到 `-1003633299525`（金融群），则 `sessionTarget` 必须是 `mo-finance` 对应的 session，payload 中 Agent 身份也必须是金融助手
> - 错误示例：sessionTarget 和 payload 中的 Agent 标识不匹配，导致任务执行时上下文混乱

**schedule.kind：**

| 值 | 说明 |
|----|------|
| `at` | 一次性任务（指定时间戳） |
| `every` | 间隔任务（指定间隔） |
| `cron` | Cron 表达式任务 |

**payload.kind：**

| 值 | 说明 |
|----|------|
| `systemEvent` | 系统事件（注入 session） |
| `agentTurn` | Agent 执行（isolated session） |

**sessionTarget：**

| 值 | 说明 |
|----|------|
| `main` | 主 session（需要 systemEvent） |
| `isolated` | 独立 session（需要 agentTurn） |
| `current` | 当前 session |
| `session:<id>` | 命名 session |

**delivery.mode：**

| 值 | 说明 |
|----|------|
| `none` | 不发送 |
| `announce` | 发送到频道 |
| `webhook` | HTTP POST 到 URL |

### 9.2 Cron 高级配置

```json
"cron": [
  {
    "name": "health-check",
    "schedule": { "kind": "every", "everyMs": 1800000 },
    "payload": { "kind": "agentTurn", "message": "检查系统健康状态" },
    "sessionTarget": "isolated",
    "enabled": true,
    "failureAlert": {
      "mode": "announce",
      "channel": "telegram",
      "to": "6020964033",
      "after": 3,
      "cooldownMs": 3600000
    },
    "contextMessages": 3,
    "deleteAfterRun": false
  }
]
```

---

## 10. 网关和网络

### 10.1 Gateway 配置

```json
"gateway": {
  "port": 18789,
  "mode": "local",
  "bind": "loopback",
  "controlUi": {
    "allowedOrigins": [
      "http://localhost:18789",
      "http://127.0.0.1:18789"
    ]
  },
  "auth": {
    "mode": "token",
    "token": "your-secret-token"
  }
}
```

**gateway 字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `port` | number | 18789 | 监听端口 |
| `mode` | enum | `local` | 运行模式：`local`、`remote` |
| `bind` | enum | `loopback` | 绑定地址：`loopback`、`any` |
| `controlUi.allowedOrigins` | array | - | 允许的 UI 源 |
| `auth.mode` | enum | `token` | 认证模式 |
| `auth.token` | string | - | 认证 token |
| `workerTimeoutMs` | number | 120000 | Worker 超时 |
| `maxSessionAgeMs` | number | - | 最大 session 寿命 |

### 10.2 网络进阶配置

```json
"gateway": {
  "tls": {
    "enabled": true,
    "cert": "/path/to/cert.pem",
    "key": "/path/to/key.pem"
  },
  "proxy": {
    "url": "http://127.0.0.1:7890",
    "tls": { "insecureSkipVerify": false }
  },
  "rateLimit": {
    "windowMs": 60000,
    "maxRequests": 100
  }
}
```

---

## 11. 插件系统

### 11.1 插件配置

```json
"plugins": {
  "allow": [
    "telegram",
    "minimax",
    "duckduckgo",
    "acpx",
    "browser",
    "feishu",
    "memory-core"
  ],
  "load": {
    "paths": [
      "/opt/homebrew/lib/node_modules/openclaw/dist/extensions/acpx"
    ]
  },
  "entries": {
    "minimax": { "enabled": true, "config": {} },
    "duckduckgo": { "enabled": true, "config": {} },
    "acpx": { "enabled": true, "config": { "timeoutSeconds": 120 } },
    "browser": { "enabled": true, "config": {} },
    "feishu": { "enabled": true, "config": {} },
    "memory-core": { "config": {} },
    "telegram": { "config": {} }
  }
}
```

**plugin.allow：**

| 插件 | 说明 |
|------|------|
| `telegram` | Telegram 频道 |
| `feishu` | 飞书频道 |
| `browser` | 浏览器自动化 |
| `acpx` | ACP 协议 |
| `memory-core` | 记忆核心 |
| `minimax` | MiniMax 模型 |
| `duckduckgo` | DuckDuckGo 搜索 |

---

## 12. 其他配置

### 12.1 会话配置 (session)

```json
"session": {
  "maxTokens": 100000,
  "maxRound": 100,
  "summary": {
    "enabled": true,
    "prompt": "请简洁总结对话要点"
  },
  "inputTokensBuffer": 1000,
  "outputTokensBuffer": 500
}
```

### 12.2 消息配置 (messages)

```json
"messages": {
  "queue": {
    "mode": "steer"
  },
  "typingIndicator": {
    "enabled": true,
    "delayMs": 3000
  },
  "reactionNotifications": "own"
}
```

### 12.3 命令配置 (commands)

```json
"commands": {
  "prefix": "/",
  "custom": [
    {
      "name": "help",
      "description": "显示帮助信息",
      "alias": ["?"]
    }
  ]
}
```

### 12.4 广播配置 (broadcast)

```json
"broadcast": {
  "enabled": true,
  "rules": [
    {
      "name": "important-update",
      "filter": { "kind": "important" }
    }
  ]
}
```

---

## 附录 A：配置快速参考

### 最小有效配置

```json
{
  "models": {
    "providers": {
      "minimax-portal": {
        "apiKey": "your-key"
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax-portal/MiniMax-M2.7"
      }
    }
  },
  "channels": {
    "telegram": {
      "accounts": {
        "default": {
          "botToken": "your-bot-token"
        }
      }
    }
  }
}
```

### 多模型负载均衡

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "openai": {
        "baseUrl": "https://api.openai.com/v1",
        "apiKey": "sk-...",
        "api": "openai-responses",
        "models": [
          { "id": "gpt-4o", "name": "GPT-4o", "contextWindow": 128000 }
        ]
      },
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "apiKey": "sk-ant-...",
        "api": "anthropic-messages",
        "models": [
          { "id": "claude-sonnet-4-7", "name": "Claude Sonnet 4", "contextWindow": 200000 }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-7",
        "fallbacks": ["openai/gpt-4o"]
      }
    }
  }
}
```

### 多渠道、多 Agent 路由

```json
{
  "bindings": [
    {
      "agentId": "main",
      "match": { "channel": "telegram", "peer": { "kind": "direct", "id": "6020964033" } }
    },
    {
      "agentId": "mo-finance",
      "match": { "channel": "telegram", "peer": { "kind": "group", "id": "-1003633299525" } }
    },
    {
      "agentId": "mo-law",
      "match": { "channel": "feishu", "peer": { "kind": "group", "id": "oc_xxx" } }
    }
  ]
}
```

### 安全飞书配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "connectionMode": "websocket",
      "groupPolicy": "allowlist",
      "groupAllowFrom": ["oc_yourtrusted_group_id"]
    }
  }
}
```

---

## 附录 B：环境变量注入

使用 `${ENV_VAR}` 语法引用系统环境变量：

```json
{
  "models": {
    "providers": {
      "openai": {
        "apiKey": "${OPENAI_API_KEY}"
      }
    }
  },
  "channels": {
    "feishu": {
      "appSecret": "${FEISHI_APP_SECRET}"
    }
  }
}
```

---

*文档生成方法：基于 OpenClaw v2026.4.x 源码（Zod Schema 分析）+ 用户实际配置整理*

*最后更新：2026-04-24*