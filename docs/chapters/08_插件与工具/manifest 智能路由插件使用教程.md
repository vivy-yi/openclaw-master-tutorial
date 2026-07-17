# manifest 智能路由插件使用教程

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 项目地址：[mnfst/manifest](https://github.com/mnfst/manifest)
> 官方文档：[mintlify.com/mnfst/manifest](https://mintlify.com/mnfst/manifest)
> 最新版本：v5.34.0 | MIT 开源协议

---

## 什么是 manifest？

manifest 是 OpenClaw 的**智能 LLM 路由插件**，位于 Agent 与 LLM 提供商之间，每次请求先经过 **23 维评分算法**（耗时 <2ms）判断复杂度，再将请求分配到该层级中**性价比最高**的模型。

### 核心理念

> OpenClaw 默认把全部请求发给同一个模型——简单问候也要调用 GPT-4o，浪费严重。manifest 解决的就是这个问题。

### 核心能力

| 能力 | 说明 |
|------|------|
| **智能路由** | 23 维评分 → simple / standard / complex / reasoning 四级 |
| **成本节省** | 最高可节省 70% LLM 费用 |
| **自动重试** | 模型失败时自动切换备用模型 |
| **实时监控** | Dashboard 展示 token 消耗、延迟、成本 |
| **300+ 模型** | 支持 OpenRouter（300+ 模型）和 Ollama（本地模型） |
| **三种模式** | Cloud / Local / Dev，满足不同隐私需求 |

---

## 工作原理

```
OpenClaw Agent → manifest 插件 → 23维评分(<2ms) → 分配Tier → 最优模型 → Dashboard
```

**评分流程：**
1. 接收请求，对消息内容打分
2. 23 维度评估（关键词复杂度、结构复杂度、上下文特征等）
3. 输出：Tier + 置信度 + 原因
4. 在对应 Tier 内选择成本最低的可用模型

---

## 安装

### 方式一：通过 ClawHub 安装（推荐）

```bash
openclaw plugins install clawhub:manifest-model-router
```

### 方式二：通过 npm 安装

```bash
openclaw plugins install manifest
```

### 方式三：本地开发模式

```bash
MANIFEST_MODE=local PORT=38238 BIND_ADDRESS=127.0.0.1 \
  openclaw plugins install manifest
```

### 安装后验证

```bash
openclaw logs --follow --plain | rg "manifest"
```

看到以下输出说明安装成功：
```
[manifest] Endpoint=https://app.manifest.build/otlp
[manifest] Connection verified (agent: your-agent-name)
[manifest] Registered as OpenAI-compatible provider (proxy mode)
```

---

## 配置（3 步完成）

### 第一步：禁用冲突插件

```bash
openclaw plugins disable diagnostics-otel
```

### 第二步：配置 API Key

**Cloud 模式（推荐，云端仪表盘）：**
```bash
openclaw config set plugins.entries.manifest.config.apiKey "mnfst_YOUR_KEY"
openclaw config set plugins.entries.manifest.config.mode cloud
```

**Local 模式（完全本地，数据不上传）：**
```bash
openclaw config set plugins.entries.manifest.config.mode local
openclaw config set plugins.entries.manifest.config.port 2099
openclaw config set plugins.entries.manifest.config.host "0.0.0.0"
```

### 第三步：重启 Gateway

```bash
openclaw gateway restart
```

---

## 启用智能路由

安装完成后，将默认模型设为 `manifest/auto`：

```bash
openclaw config set agents.defaults.model manifest/auto
openclaw gateway restart
```

此后所有请求都会经过 manifest 的路由决策，自动选择最优模型。

---

## 23 维评分算法详解

manifest 的评分体系从三个维度分析请求：

### 关键词维度（14个）

| 维度 | 权重 | 说明 |
|------|------|------|
| `questionComplexity` | 0.03 | 检测复杂问题结构 |
| `codePresence` | ... | 是否包含代码 |
| `mathSymbols` | ... | 数学符号检测 |
| `technicalTerms` | ... | 技术术语密度 |
| ... | ... | 共14个关键词特征 |

### 结构维度（5个）

| 维度 | 权重 | 说明 |
|------|------|------|
| `tokenCount` | 0.05 | 消息越长通常越复杂 |
| `messageCount` | ... | 多轮对话上下文 |
| `specialChars` | ... | 特殊字符密度 |
| ... | ... | 共5个结构特征 |

### 上下文维度（4个）

| 维度 | 权重 | 说明 |
|------|------|------|
| `followUp` | ... | 是否有后续问题 |
| `ambiguity` | ... | 歧义程度 |
| `formality` | ... | 正式程度 |
| ... | ... | 共4个上下文特征 |

---

## 四级路由 Tier 系统

### Tier 1 — Simple（简单）

- **触发条件**：评分 < -0.15
- **适用场景**：问候语、基础问答、简短指令
- **推荐模型**：轻量级免费/低价模型（如 GPT-3.5-Turbo、gemini-2.0-flash）

### Tier 2 — Standard（标准）

- **触发条件**：-0.15 ≤ 评分 < 0.15
- **适用场景**：日常对话、文本处理、翻译、总结
- **推荐模型**：中等规模模型（如 GPT-4o-mini、claude-3-haiku）

### Tier 3 — Complex（复杂）

- **触发条件**：0.15 ≤ 评分 < 0.4
- **适用场景**：代码调试、复杂分析、多步骤推理
- **推荐模型**：高性能模型（如 GPT-4o、claude-3.5-sonnet）

### Tier 4 — Reasoning（推理）

- **触发条件**：评分 ≥ 0.4
- **适用场景**：高级数学、逻辑推导、深度研究、长文写作
- **推荐模型**：推理专用模型（如 o1、claude-3-opus）

### 评分输出示例

```
Score: -0.30 | Tier: simple | Confidence: 0.90 | Reason: short_message
Score:  0.05 | Tier: standard | Confidence: 0.78 | Reason: scored
Score:  0.22 | Tier: complex | Confidence: 0.85 | Reason: scored
Score:  0.50 | Tier: reasoning | Confidence: 0.95 | Reason: formal_logic_override
```

---

## Dashboard 仪表盘

manifest 自带实时监控 Dashboard。

### Cloud 模式

访问：[app.manifest.build](https://app.manifest.build)

### Local 模式

本地访问：`http://127.0.0.1:2099`

### Dashboard 功能

| 功能 | 说明 |
|------|------|
| **Overview** | 总成本、Token 消耗、消息历史 |
| **路由详情** | 每个请求的 Tier 分配、置信度、路由原因 |
| **模型使用** | 各模型使用频率、成本占比 |
| **延迟分析** | P50/P95 延迟、模型响应时间对比 |
| **实时更新** | 所有指标随请求自动刷新 |

---

## Agent 工具（对话内查询）

manifest 注册了 3 个 Agent 工具，可在对话中直接调用：

### manifest_usage

查询使用统计：
```
"manifest_usage"
"how many tokens have we used today"
"今天用了多少 tokens"
```

### manifest_costs

查询成本明细：
```
"manifest_costs"
"how much have we spent"
"花费了多少"
```

### manifest_health

检查连接状态：
```
"manifest_health"
"is monitoring working"
"manifest 连上了吗"
```

---

## 配置 OpenRouter 和 Ollama

### OpenRouter 配置

manifest 默认支持 OpenRouter，无需额外安装：

```bash
# 在 manifest dashboard 中添加 OpenRouter API Key
# manifest 会自动发现并路由到 300+ 模型
```

OpenRouter 支持的 Tier 分布示例：

| Tier | 代表模型 |
|------|---------|
| Simple | google/gemini-2.0-flash, anthropic/claude-3-haiku |
| Standard | openai/gpt-4o-mini, google/gemini-pro |
| Complex | openai/gpt-4o, anthropic/claude-3.5-sonnet |
| Reasoning | openai/o1, anthropic/claude-3-opus |

### Ollama 本地模型配置

适合完全离线或想节省成本的用户：

```bash
# 1. 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. 拉取模型
ollama pull llama3.2
ollama pull gemma:2b
ollama pull mistral

# 3. 配置 manifest 使用 Ollama
openclaw config set plugins.entries.manifest.config.localModels true
```

---

## manifest vs OpenRouter 对比

| 特性 | **manifest** | OpenRouter |
|------|-------------|-----------|
| 隐私 | 仅元数据（或100%本地） | 请求完整经过 OpenRouter |
| 路由 | 23维智能评分 + Tier 分层 | 基础负载均衡 |
| Dashboard | 实时 + 成本追踪 | 有限统计 |
| 自动重试 | ✅ 多级 fallback | ✅ 基础重试 |
| 本地支持 | ✅ Ollama 原生 | ❌ |
| 开源 | ✅ MIT | ❌ |

---

## 故障排除

### 插件未加载

```bash
# 检查插件状态
openclaw plugins list

# 查看详细错误
openclaw logs --plain | rg "manifest"
```

### 连接检查失败

```bash
# Cloud 模式：确认 API Key
openclaw config get plugins.entries.manifest.config.apiKey

# Local 模式：检查端口占用
openclaw config set plugins.entries.manifest.config.port 2100
```

### 路由未生效

```bash
# 确认默认模型
openclaw config get agents.defaults.model
# 应显示：manifest/auto

# 重启 gateway
openclaw gateway restart
```

### Dashboard 无数据

```bash
# 确认 OTLP 端点可达
curl https://app.manifest.build/otlp

# Local 模式检查
curl http://127.0.0.1:2099
```

---

## 完整配置示例

```json
{
  "plugins": {
    "entries": {
      "manifest": {
        "enabled": true,
        "config": {
          "mode": "cloud",
          "apiKey": "mnfst_YOUR_KEY",
          "endpoint": "https://app.manifest.build/otlp",
          "autoRouting": true,
          "fallbackEnabled": true,
          "maxRetries": 2
        }
      }
    }
  },
  "agents": {
    "defaults": {
      "model": "manifest/auto"
    }
  }
}
```

---

## 相关资源

- [GitHub 仓库](https://github.com/mnfst/manifest)
- [官方文档](https://mintlify.com/mnfst/manifest)
- [Dashboard](https://app.manifest.build)
- [manifest-ui](https://github.com/mnfst/manifest-ui) — 配套的 shadcn/ui 组件库

---

*🦦 由 OpenClaw 助手生成 | 项目作者：mnfst*
