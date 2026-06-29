# OpenClaw 插件系统完全指南

> 本指南面向架构师与技术开发者，侧重设计思想、架构决策、系统交互模式。
> 基于 OpenClaw v2026.4.23 源码分析，覆盖插件哲学、类型体系、扩展模型、生态全貌。

---

## 1. 设计哲学：为什么需要插件系统？

OpenClaw 是一个**多渠道 AI 网关**，运行在用户已有的消息生态（微信、Telegram、Discord、飞书……）与 AI 模型（GPT-4、Claude、DeepSeek……）之间。

```
用户消息生态                    AI 模型生态
   │                               ▲
   ▼                               │
┌────────┐                    ┌─────────┐
│ Telegram│                   │ OpenAI  │
│ Discord │ ── OpenClaw ──▶  │Anthropic│
│ 飞书   │   Gateway         │ DeepSeek│
│ Slack  │                   │  ...   │
└────────┘                    └─────────┘
```

没有插件系统，OpenClaw 每新增一个消息渠道或模型提供商，都需要改动核心代码——这在实际生产中是不可接受的。

**插件系统的核心价值：**
- **解耦**：渠道、模型、工具可以独立演进
- **生态**：第三方可以贡献插件而无需 fork 核心
- **安全边界**：插件有独立的权限沙箱，不会因一个插件的 bug 拖垮整个系统
- **热插拔**：无需重启 Gateway 即可启用/禁用插件

---

## 2. 架构总览：插件在 Gateway 中的位置

### 2.1 消息流中的插件位置

```
[用户设备]
     │
     ▼ (Webhooks / Long Polling / WebSocket)
[Channel Plugin] ──── 入站消息 ────▶ [会话管理器] ──▶ [Agent Runtime]
                                     ▲                      │
                                     │                      ▼
                               [记忆系统]              [LLM 调用]
                                     │                      │
                                     ▼                      ▼
[Channel Plugin] ◀──── 出站回复 ◀───[Reply Dispatcher] ◀───[工具链]
     │
     ▼ (Platform API)
[用户设备]
```

**关键观察：**
- Channel Plugin 是网关的"脸"——所有入站出站都经过它
- Agent Runtime 是"大脑"——不直接与任何平台交互
- Reply Dispatcher 是"邮局"——决定哪个 Channel 插件负责送达

### 2.2 插件在配置中的位置

```yaml
# OpenClaw 配置是一个分层的 JSON-in-YAML 结构
gateway:
  port: 3000

agents:
  defaults:
    model: "minimax-portal/MiniMax-M2.7"

providers:          # ← Provider 插件贡献的配置区域
  openai:
    apiKey: "${OPENAI_API_KEY}"

channels:           # ← Channel 插件贡献的配置区域
  telegram:
    allowedChats: []

plugins:            # ← Runtime 插件的配置区域
  acpx:
    permissionMode: "deny-all"
  skill-workshop:
    autoCapture: true
```

这是理解 OpenClaw 配置的关键：**不同类型的插件向配置 schema 中注入自己负责的部分**。Channel 插件只影响 `channels:`，Provider 插件只影响 `providers:`，Runtime 插件使用 `plugins:`。

### 2.3 插件隔离模型

OpenClaw 采用**进程内隔离 + 权限沙箱**的双重隔离：

| 隔离层 | 机制 | 作用 |
|--------|------|------|
| **JavaScript 运行时** | Node.js 模块系统 | 每个插件是独立 npm 包，有自己的依赖图 |
| **ACP 运行时** | 子进程沙箱 | `acpx` 插件内的 Agent 运行在独立子进程中，权限受控 |
| **工具权限** | `securityRuntime` | 插件注册的工具必须声明权限级别（read/write/admin）|
| **Secrets 边界** | 环境变量注入 | 插件只能通过 `channelEnvVars` 声明需要哪些 secrets，核心注入而非插件自己读取 |
| **配置 schema** | JSON Schema + Zod | 每个插件的配置项必须事先声明，核心验证后注入 |

---

## 3. 插件类型体系

### 3.1 类型全景图

```
OpenClaw 插件（109个）
├── Channel（渠道）插件 ──── 消息协议适配 ─── 21个
├── Provider（模型）插件 ── LLM 接口抽象 ── 38个
├── Runtime（运行时）插件 ─ 核心功能扩展 ── 37个
├── Skills（工具）插件 ─── 子技能模块 ──── 13个+
└── Media（媒体）插件 ──── 内容生成 ────── 13个
```

### 3.2 四类插件的职责边界

理解四类插件的边界是架构决策的第一步：

**Channel 插件 = 协议适配层**

它们的工作是：将平台 A 的消息格式 → OpenClaw 内部标准格式；将 OpenClaw 回复 → 平台 A 的格式。

设计要点：Channel 插件**不做业务逻辑**，只做协议翻译。这意味着同一个 AI 能力可以同时暴露在 Telegram、Discord、飞书上，而不需要为每个平台重写 AI 逻辑。

**Provider 插件 = 模型抽象层**

它们的工作是：统一不同模型提供商的 API 差异（认证、流式响应、工具调用格式、错误处理）。

设计要点：Provider 插件的抽象层次决定了 OpenClaw 能多大程度上让用户"换模型而不改代码"。OpenClaw 的模型别名系统（`minimax-m2.7` → `minimax-portal/MiniMax-M2.7`）允许在这个层次做灵活路由。

**Runtime 插件 = 功能扩展层**

它们直接参与 Agent 的决策过程。`acpx` 运行子 Agent，`skill-workshop` 管理技能库，`browser` 控制自动化浏览器。

设计要点：Runtime 插件位于信任边界最内侧——它们直接影响 AI 的行为能力。特别是 `acpx` 这样的插件，实际上运行了另一个 Agent 系统（Claude Code/OpenCode），其安全模型需要特别设计。

**Skills 插件 = 工具定义层**

它们定义 AI 可以调用的具体工具集。Feishu 的 Skills 提供文档读写、知识库查询；GitHub Skills 提供 issue 管理；这些工具通过 OpenClaw 的工具注册系统暴露给 Agent。

### 3.3 类型决策矩阵

| 决策场景 | 选择 Channel | 选择 Runtime | 选择 Skills | 选择 Provider |
|---------|------------|-------------|------------|--------------|
| 需要支持一个新的消息平台 | ✅ | ❌ | ❌ | ❌ |
| 需要让 AI 调用平台 API | ❌ | ❌ | ✅ | ❌ |
| 需要运行外部 Agent（Codex） | ❌ | ✅（acpx）| ❌ | ❌ |
| 需要支持新的 LLM 提供商 | ❌ | ❌ | ❌ | ✅ |
| 需要自定义消息处理流程 | ✅ | ❌ | ❌ | ❌ |
| 需要在 Agent 决策前插入 hook | ❌ | ✅ | ❌ | ❌ |

---

## 4. Channel 插件架构

### 4.1 Channel 插件的本质

Channel 插件是一个**协议翻译器**，而非业务处理器。它的输入是平台原生消息，输出是 OpenClaw 标准入站格式，中间不应该有任何业务逻辑。

这种设计的核心好处是：**业务逻辑与渠道完全解耦**。同一个 AI 对话可以同时存在于 Telegram、Discord 和飞书，AI 不知道也不关心用户从哪个平台发来消息。

### 4.2 入站标准化

每个 Channel 插件负责将平台消息转换为 OpenClaw 的标准入站信封：

```
Telegram 消息 ──▶ Telegram Plugin ──▶ 标准入站信封 ──▶ OpenClaw Core
Discord 消息  ──▶ Discord Plugin  ──▶ 标准入站信封 ──▶ OpenClaw Core
飞书消息     ──▶ Feishu Plugin  ──▶ 标准入站信封 ──▶ OpenClaw Core
```

标准入站信封包含：
- **身份**：`from`（谁发的）、`chat`（在哪个对话）
- **内容**：`text`（文本）、`media`（媒体）、`location`（位置）等
- **上下文**：`replyTo`（回复哪条）、`threadId`（线程 ID）
- **原始数据**：`raw`（平台原生对象，供调试和高级用途）

**设计权衡**：OpenClaw 选择了一个折中的抽象层次——既不是纯文本，也不是完整结构化对象。它保留了平台差异的 `raw` 字段，同时要求插件作者维护一个标准化的"中转格式"。

### 4.3 出站消息的格式协商

出站比入站更复杂，因为各平台的格式能力差异巨大：

| 能力 | Telegram | Discord | 飞书 | Slack |
|------|----------|---------|------|-------|
| Markdown | ✅ V2 | ❌ 部分 | ⚠️ 有限 | ⚠️ mrkdwn |
| HTML | ✅ | ❌ | ⚠️ | ❌ |
| 按钮 | ✅ InlineKeyboard | ✅ Components | ✅ Card | ✅ Block Kit |
| 回复引用 | ✅ | ✅ | ✅ | ✅ |
| 线程 | ✅ | ✅ | ❌ | ✅ |
| 媒体类型 | 全部 | 全部 | 卡片为主 | 全部 |

Channel 插件需要处理这些差异。OpenClaw 提供了 `formatMarkdown()` 转换方法，但各平台原生 API 的差异意味着插件作者需要了解每个平台的具体限制。

### 4.4 Webhook vs 轮询

Channel 插件的入站机制分为两类：

**Webhook 模式**（推送）：
- 平台主动 POST 到 OpenClaw
- 延迟极低，适合实时性要求高的场景
- 需要公网可达的回调地址
- 例子：Telegram、Discord、Slack、飞书

**轮询模式**（拉取）：
- OpenClaw 主动查询平台 API
- 部署简单（不需要公网地址），但有延迟
- 消耗更多 API 调用配额
- 例子：老版本 Telegram（Long Polling）、WhatsApp

`acpx` 这样的 Runtime 插件还支持**混合模式**：入站用 Webhook，出站用轮询。

### 4.5 Thread 绑定机制

多渠道都需要处理"回复到哪条消息"的问题，但各平台的语义不同：

- **Telegram**：`replyTo` 是消息 ID，全局唯一
- **Discord**：消息 ID + `channelId` + `threadId` 三元组
- **飞书**：消息 ID + `chatId`，无线程概念

OpenClaw 的 `thread-bindings-runtime` 模块负责维护跨平台的 thread 映射。当用户在 Discord 的 Thread A 中回复，AI 在 Telegram Group B 中的同一对话分支也应该是对应的。

---

## 5. Runtime 插件架构

### 5.1 Runtime 插件的设计意图

Runtime 插件是 OpenClaw 最强大也最危险的扩展点。它们不像 Channel 插件那样只做翻译，而是**直接参与 Agent 的推理过程**。

典型 Runtime 插件：
- `acpx` — 在子进程中运行 Claude Code/OpenCode
- `skill-workshop` — 自动捕获和复用工作流
- `browser` — 控制浏览器自动化
- `llm-task` — 编排多步骤 LLM 任务

### 5.2 ACP：Agent 间通信协议

`acpx` 插件引入了 **ACP（Agent Communication Protocol）** 的概念。这是 OpenClaw 最核心的创新之一——它允许一个 Agent 调用另一个 Agent，将复杂的单 Agent 任务分解为多 Agent 协作。

```
主 Agent（OpenClaw main）
     │
     │ ACP 协议
     ▼
┌─────────────────────┐
│  acpx Runtime       │
│  (子进程沙箱)        │
│                     │
│  ├── Claude Code    │
│  ├── OpenCode       │
│  └── 其他 ACP Agent │
└─────────────────────┘
```

**ACP 的核心价值场景**：
- 复杂编码任务 → 委托给 Claude Code
- 需要并行研究 → 同时启动多个 Agent
- 安全隔离 → 高风险工具在子进程中运行，不影响主 Agent

**ACP 的安全模型**：
- 子 Agent 运行在独立子进程中，有独立的文件系统和网络权限
- 权限模式（`permissionMode`）决定子 Agent 能做什么：
  - `deny-all`：默认拒绝所有高风险操作
  - `approve-reads`：允许读取，拒绝写入/执行
  - `approve-all`：允许所有（危险）

### 5.3 事件 Hook 系统

Runtime 插件通过 **Hook 系统**订阅 OpenClaw 内部事件，在关键时刻插入处理逻辑：

```
Agent Turn 生命周期事件序列：

agent_turn_start
    │
    ▼
[LLM 调用]
    │
    ▼
tool_call ────▶ tool_result
    │              │
    │              ▼
    │         [工具执行]
    │              │
    ▼              ▼
agent_turn_complete ────▶ reply_dispatch ────▶ reply_sent
                                              │
                                              ▼
                                         [Channel 出站]
```

Runtime 插件可以在任何一个环节注册 hook：

| Hook 点 | 典型用途 |
|---------|---------|
| `agent_turn_start` | 审计/限流 |
| `tool_call` | 权限检查/参数验证 |
| `tool_result` | 结果改写/脱敏 |
| `agent_turn_complete` | 记录会话摘要 |
| `reply_dispatch` | 路由决策/内容过滤 |
| `reply_sent` | 发送确认/重试 |

**设计观察**：Hook 系统是**观察者模式**的变体，但更严格。插件只能读取和返回数据，不能直接阻止流程（返回 `null` 或抛出异常才会中断）。这避免了恶意插件冻结整个系统。

### 5.4 Service 注册机制

Runtime 插件的核心注册单位是 **Service**——一个自包含的功能模块：

```typescript
// Service 的结构（概念模型，无代码）
Service {
  name: string;           // 全局唯一的服务名
  version: string;       // 版本号，用于兼容性检查
  capabilities: [];      // ["tool", "hook", "storage", ...]

  // 生命周期
  initialize?()          // 一次性初始化
  start?()               // 每次 Gateway 启动时
  stop?()                // Gateway 关闭时

  // 功能
  tools?: []             // 注册到 Agent 工具链的函数
  hooks?: {}             // 事件处理器
}
```

Service 的设计核心是**自包含**。一个 Service 可以同时提供工具（供 Agent 调用）和 hook（供系统回调），但这两者都是 Service 内部实现，不暴露给其他插件。

---

## 6. Skills 系统：工具定义的架构

### 6.1 为什么需要 Skills？

OpenClaw 的 Agent 可以调用**工具**（Tools），但工具本身需要定义：
- 这个工具叫什么？
- 它接受什么参数？
- 它的使用约束是什么？
- 什么时候该用它？

Skills 就是这些定义的载体——以 Markdown 文件（`SKILL.md`）的形式存在，供 Agent 在需要时读取。

### 6.2 SKILL.md 的本质

`SKILL.md` 是一个**工具的使用手册**，而非工具本身的代码。它被 Agent 的 system prompt 引用，Agent 根据其中的指引决定何时、如何调用对应的工具。

这与传统的"工具注册"不同：

| 传统方式 | Skills 方式 |
|---------|------------|
| 代码注册工具名称 | 文本描述工具用途 |
| 代码定义参数 schema | 文本描述参数含义 |
| 代码写使用示例 | 自然语言写最佳实践 |
| 静态注册 | 动态发现和学习 |

Skills 方式的核心优势是**灵活性**——同一个工具在不同场景下可能有不同的使用方式，SKILL.md 可以包含场景化的指引。

### 6.3 技能工坊的自动捕获

`skill-workshop` 插件实现了一个**自动学习闭环**：

```
用户纠正 Agent
    │
    ▼
skill-workshop 捕获工作流
    │
    ▼
[审查模式]
├── heuristic：规则匹配（重复成功3次）
├── llm：LLM 判断是否值得复用
└── hybrid：两者结合
    │
    ▼
[决策]
├── pending：等待用户确认
└── auto：直接写入 skills 目录
```

这个设计的关键洞察是：**最佳实践往往在失败中被发现**。当 Agent 第一次失败，用户纠正后，skill-workshop 捕获这个纠正，作为未来的最佳实践。

---

## 7. Provider 插件：模型抽象

### 7.1 多 Provider 的必要性

现代 AI 应用几乎不可能绑定在单一模型提供商上，原因：
- **成本**：不同模型的 token 成本差异巨大
- **延迟**：不同模型的响应速度不同
- **能力**：不同任务需要不同模型（代码 → Claude，日常 → GPT-4o mini）
- **可靠性**：避免单点故障

OpenClaw 的 Provider 插件系统让多 Provider 共存成为标准配置，而非特例。

### 7.2 模型路由策略

OpenClaw 支持多种模型选择策略：

**静态路由**：Agent 配置写死使用哪个模型
```yaml
agents:
  my-agent:
    model: "anthropic/claude-sonnet-4"
```

**动态路由**：根据消息内容、用户、场景自动选择
```yaml
agents:
  defaults:
    model: "minimax-portal/MiniMax-M2.7"  # 默认

# Runtime 插件可以在运行时覆盖
# 例如：检测到代码请求 → 切换到 Claude
```

OpenClaw 的模型别名系统支持 **`provider/model`** 的标准格式，允许：
- 透明切换 Provider
- 按场景配置不同 Provider
- 在不修改 Agent 配置的情况下改变底层模型

### 7.3 Provider 的认证抽象

每个 Provider 有不同的认证方式：

| Provider | 认证方式 | 配置字段 |
|----------|---------|---------|
| OpenAI | API Key | `apiKey` |
| Anthropic | API Key | `apiKey` |
| Google | API Key / OAuth | `apiKey` / `_VERTEX_AI_*` |
| Azure OpenAI | API Key + Endpoint | `azureApiKey` + `azureEndpoint` |
| Ollama | 无（本地）| `baseURL` → `http://localhost:11434` |
| LM Studio | 无（本地）| `baseURL` |

Provider 插件负责将 OpenClaw 的统一 `secrets` 配置转换为各 Provider 的原生认证格式。

---

## 8. 配置体系：如何驱动插件

### 8.1 配置的三个层次

OpenClaw 的配置分为三个层次：

**1. 环境变量**（最底层）
```
TELEGRAM_BOT_TOKEN=xxx
OPENAI_API_KEY=sk-xxx
```
插件通过 `channelEnvVars` 声明需要的变量。

**2. 插件配置**（中间层）
```yaml
channels:
  telegram:
    allowedChats: [-100123456]  # 只允许特定群组

plugins:
  acpx:
    permissionMode: "deny-all"
```
每个插件的 `configSchema` 定义它接受什么配置项。

**3. Agent 配置**（最上层）
```yaml
agents:
  defaults:
    model: "minimax-portal/MiniMax-M2.7"
```
Agent 配置引用 Provider 和 Channel，是最终用户最常交互的配置。

### 8.2 Secrets 管理

Secrets 是最敏感的配置。OpenClaw 的 Secrets 管理原则：

```
插件声明需要的 secrets（channelEnvVars）
        │
        ▼
核心验证 secrets 是否存在
        │
        ▼
以环境变量形式注入插件（插件不自己读取 .env）
        │
        ▼
日志输出时自动遮蔽（"sk-xxxx****ab12"）
```

**设计决策**：插件永远不应该直接读取 `.env` 文件。所有 secrets 由核心统一管理，按需注入。这确保了：
- 配置集中可见（审计）
- 敏感数据不进入日志
- 插件代码更干净

### 8.3 配置的版本迁移

OpenClaw 通过 `setupFeatures.legacyStateMigrations` 支持旧版本配置迁移：

当插件升级时，如果配置 schema 发生变化，插件可以提供迁移函数，将旧配置转换为新格式，而不影响用户的现有配置。

---

## 9. 安全架构

### 9.1 威胁模型

OpenClaw 插件系统面临的主要威胁：

| 威胁类型 | 来源 | 缓解措施 |
|---------|------|---------|
| **恶意插件** | 未审计的第三方插件 | 沙箱执行 + 权限声明 |
| **越权工具调用** | 插件注册的工具 | Tool Approval 机制 |
| **Secrets 泄露** | 错误配置 | 统一管理 + 日志遮蔽 |
| **Prompt 注入** | 用户消息中的恶意指令 | 消息清洗 + 隔离处理 |
| **SSRF** | 插件发起的网络请求 | SSRF 白名单 + 目的地限制 |
| **数据外泄** | 插件将数据发送外部 | 网络策略 + 审计日志 |

### 9.2 权限层级

OpenClaw 的工具权限分为几个级别：

| 级别 | 能力 | 示例 |
|------|------|------|
| **read** | 只读文件系统/网络 | 读取文件、查询 API |
| **write** | 写入文件系统 | 保存文件、创建目录 |
| **exec** | 执行命令 | 运行 shell、启动子进程 |
| **admin** | 管理操作 | 删除文件、修改配置 |

Runtime 插件（如 `acpx`）运行在独立的子进程中，权限独立控制，不继承主 Agent 的权限。

### 9.3 dangerousFlags 机制

某些配置项组合被认为是**危险的**，需要用户明确确认：

```yaml
configContracts:
  dangerousFlags:
    - path: "plugins.acpx.permissionMode"
      equals: "approve-all"
      # 当 acpx 设置为 approve-all 时，弹出警告
```

这相当于插件的"危险操作知情书"——插件作者认为某个配置组合特别危险，可以声明让用户在 UI 上看到警告。

---

## 10. 生态全景：109 个插件分类图谱

### 10.1 Channel 生态（21 个）

```
消息 IM 类
├── telegram ─────── 最成熟，Webhook + Polling 双模式
├── discord ──────── Slash Commands + Components
├── slack ────────── Event API + Block Kit
├── mattermost ───── 自托管
├── msteams ──────── 企业 Microsoft 生态
└── matrix ───────── 去中心化，联邦支持

国内平台
├── feishu ───────── 企业级，支持卡片/多维表格
├── wecom ────────── 企业微信（部分支持）
├── dingtalk ─────── 钉钉（部分支持）
└── line ─────────── 台湾/东南亚

去中心化/小众
├── nostr ────────── 去中心化社交协议
├── irc ──────────── 传统 Internet Relay Chat
├── signal ────────── 端到端加密
└── twitch ────────── 直播弹幕

特殊通道
├── imessage ─────── macOS 原生（BlueBubbles）
├── whatsapp ─────── Business API
├── qqbot ────────── QQ 机器人
├── synology-chat ── 群晖 NAS 套件
└── nextcloud-talk ─ 自托管云盘聊天
```

### 10.2 Provider 生态（38 个）

```
头部商业模型
├── openai ───────── GPT-4o / GPT-4o mini / o3/o4
├── anthropic ─────── Claude 3.5 / 3.7 / Opus
└── google ───────── Gemini 1.5 / 2.0 / Flash

国内模型
├── minimax ──────── M2.1 / M2.7 系列
├── deepseek ─────── DeepSeek V3 / R1
├── moonshot ─────── Moonshot V1 (Kimi)
├── qwen ─────────── 通义千问 Qwen2.5 / Qwen-Max
├── volcengine ───── 火山引擎扣子/豆包
├── baidu ────────── 文心一言 ERNIE
├── tencent ──────── 腾讯混元
├── alibaba ──────── 阿里云 DashScope
└── stepfun ──────── 阶跃星辰

推理优化平台
├── groq ─────────── LPU，低延迟推理
├── fireworks ───── 高性能推理
└── together ─────── 开源模型聚合

本地部署
├── ollama ───────── 最流行的本地模型运行
├── lmstudio ─────── 桌面端模型运行
└── kilocode ─────── 轻量本地编码模型

Gateway/聚合
├── openrouter ───── 跨模型路由 + 价格比较
├── cloudflare-ai ─ Cloudflare 边缘推理
├── vercel-ai ────── Vercel 部署
└── anthropic-vertex ─ 通过 Google Cloud 使用 Claude

开源/自托管
├── huggingface ──── Inference API
├── sglang ───────── SGLang 推理引擎
├── vllm ─────────── vLLM 推理引擎
└── nvidia ────────── NVIDIA NIM
```

### 10.3 Runtime 功能生态（37 个）

```
Agent 执行
├── acpx ─────────── 核心 ACP 运行时，子 Agent 沙箱
├── codex ────────── Claude Code / OpenAI Codex 集成
├── opencode ─────── 开源编码 Agent
└── kimi-coding ──── Kimi 编码能力

记忆与上下文
├── memory-core ──── 核心记忆系统
├── memory-lancedb ─ LanceDB 向量存储
├── memory-wiki ──── Obsidian Wiki 集成
├── active-memory ── 活跃上下文注入
└── openviking ───── 上下文压缩引擎

自动化
├── browser ──────── Playwright 浏览器控制
├── phone-control ── 移动设备控制
├── device-pair ──── IoT 设备配对
└── skill-workshop ─ 技能自动捕获

数据采集
├── tavily ───────── 搜索 API
├── firecrawl ────── 网站内容抓取
├── exa ──────────── 深度网页搜索
├── duckduckgo ───── 隐私搜索
└── searxng ──────── 开源聚合搜索

任务编排
├── llm-task ─────── 多步骤 LLM 任务
├── synthetic ───── 合成数据生成
└── qa-lab ───────── 质量保证实验室

开发工具
├── diffs ────────── 代码差异分析
├── github-copilot ─ GitHub Copilot 集成
├── microsoft ────── Microsoft 生态集成
├── microsoft-foundry ─ Azure Foundry
└── copilot-proxy ── Copilot API 代理
```

### 10.4 Skills 工具生态

```
feishu 技能套件
├── feishu-doc ───── 飞书文档读写
├── feishu-wiki ──── 飞书知识库查询
├── feishu-drive ─── 飞书云盘操作
├── feishu-perm ──── 权限管理
└── feishu-bitable ─ 多维表格操作

平台工具
├── obsidian ─────── Obsidian Vault 操作
├── github ───────── GitHub API
├── xurl ─────────── URL 元数据提取
└── apple-notes ──── Apple Notes 集成
└── apple-reminders Apple Reminders 集成
```

---

## 11. 扩展点决策指南

### 11.1 我应该开发什么类型的插件？

```
我的需求
  │
  ├── 接入一个新消息平台
  │       └── 开发 Channel 插件
  │
  ├── 支持一个新的 AI 模型
  │       └── 开发 Provider 插件
  │
  ├── 让 AI 调用某个平台的 API
  │       ├── 平台有现成工具 ── 使用/配置现成 Skills
  │       ├── 平台有 API 但无工具 ── 开发 Skills 插件
  │       └── 复杂多步骤操作 ──── 开发 Runtime + Skills
  │
  ├── 运行外部 Agent（Claude Code 等）
  │       └── 配置 acpx 插件（无需开发）
  │
  ├── 在 Agent 决策过程中插入逻辑
  │       └── 开发 Runtime 插件（Hook）
  │
  └── 跨平台的消息处理规则
          └── 配置 Channel 插件 + Hook
```

### 11.2 现有插件能解决我的需求吗？

**常见需求 vs 现有方案：**

| 需求 | 优先方案 | 备选方案 |
|------|---------|---------|
| 接 Telegram | 使用内置 `telegram` 插件 | — |
| 接 Discord | 使用内置 `discord` 插件 | — |
| 接飞书 | 使用内置 `feishu` 插件 | — |
| 使用 GPT-4 | 配置内置 `openai` Provider | — |
| 使用 Claude | 配置内置 `anthropic` Provider | — |
| 使用国内模型 | 配置 `deepseek`/`minimax`/`qwen` | — |
| 本地运行模型 | 配置 `ollama`/`lmstudio` | — |
| AI 自动建档 | 使用 `skill-workshop` | 开发 Skills |
| 浏览器自动化 | 使用 `browser` 插件 | — |
| 搜索网页 | 配置 `tavily` 或 `firecrawl` | 开发 Skills |

### 11.3 插件开发 vs 配置优先

**能用配置解决，不要开发插件**——插件开发需要维护成本，且每次 OpenClaw 版本升级都可能导致兼容性问题。

需要开发新插件的信号：
1. 现有插件无法满足需求（功能缺失）
2. 需要在核心层面改变 Agent 行为（Hook 不足）
3. 需要接入全新的平台/模型类型
4. 需要将内部工具暴露给多个 Agent 共用

---

## 12. 架构设计亮点与权衡

### 12.1 设计亮点

**1. 清单驱动的声明式扩展**

插件通过 `openclaw.plugin.json` 声明自己的能力和配置需求，核心在运行时根据清单组装，而非插件直接调用核心 API。这种**控制反转**使得核心始终是驱动者，插件是被动的被配置对象。

**2. Slot 机制（记忆系统）**

记忆系统的四层 Slot 架构（L0-L3）是一个精心设计的关注点分离：
- L0（openviking）：上下文压缩——纯运行时优化
- L1（active-memory）：记忆注入——跨会话
- L2（lancedb-pro）：向量检索——语义搜索
- L3（wiki）：外部知识——结构化查询

**3. ACP 子 Agent 沙箱**

`acpx` 的设计允许在同一个 OpenClaw 实例中运行多个相互隔离的 Agent，而不需要部署多个 OpenClaw 实例。这对于需要"编码 Agent + 审查 Agent + 执行 Agent"协作的工作流特别有价值。

### 12.2 设计权衡

**1. Channel 插件的格式差异处理**

OpenClaw 选择让每个 Channel 插件自己处理平台差异，而非提供统一抽象层。这意味着 Telegram 插件和 Discord 插件的代码可能有显著差异，增加了跨平台开发者的学习成本。

权衡理由：消息平台之间的差异实在太大了（Telegram 的 Markdown vs Discord 的 Component vs 飞书的卡片），强行统一抽象会导致要么能力受限，要么插件代码复杂度爆炸。

**2. Service 注册 vs 插件内直接导出**

Runtime 插件的服务注册通过 `api.registerService()`，而不是直接导出对象。这种间接性允许核心在插件加载失败时优雅降级（不影响其他插件）。

权衡理由：轻微的复杂性换取了整体的鲁棒性。

**3. Skills 的文本格式**

Skills 选择 Markdown 而非结构化数据（JSON/YAML）作为存储格式。这对 AI 来说是自然的（AI 更擅长理解和生成自然语言指令），但对工具验证来说不精确。

权衡理由：Skills 的主要消费者是 AI 而非代码，"AI 读得懂"比"机器容易验证"更重要。

---

## 13. 迁移与版本管理

### 13.1 插件的 OpenClaw 版本兼容性

OpenClaw 的版本号格式为 `YYYY.MM.DD`（如 `2026.4.23`），采用时间基版本而非语义版本。

**兼容性策略：**
- 插件 API 变更通常在主版本中标注
- 核心会维护插件 API 的向后兼容层
- 建议在插件 `package.json` 中声明最低兼容版本

### 13.2 配置迁移

当 OpenClaw 升级导致配置结构变化时：
1. 启动日志会显示需要迁移的配置项
2. 插件可以通过 `setupFeatures.legacyStateMigrations` 提供自动迁移
3. 手动迁移指南通常在 CHANGELOG 中说明

---

## 附录

### A. 关键路径索引

| 内容 | 路径 |
|------|------|
| 主配置 | `~/.openclaw/config.yaml` |
| 插件目录 | `~/.openclaw/plugins/` |
| Skills 目录 | `~/.openclaw/skills/` |
| Workspaces | `~/.openclaw/workspaces/` |
| 日志 | `~/.openclaw/logs/` |
| 状态 | `~/.openclaw/state/` |
| OpenClaw 核心 | `/opt/homebrew/lib/node_modules/openclaw/` |
| 教程仓库 | `/Volumes/waku/github-维护/openclaw-master-tutorial/` |

### B. SDK 模块分类索引（按架构层次）

```
接入层
├── channel-entry-contract ─── 插件入口定义
├── plugin-entry ───────────── Runtime 插件入口
└── provider-entry ─────────── Provider 入口

核心运行时
├── channel-runtime ────────── 渠道运行时
├── agent-runtime ──────────── Agent 执行引擎
├── acp-runtime ────────────── ACP 协议实现
├── reply-runtime ──────────── 回复分发引擎
└── gateway-runtime ────────── Gateway 主控

通信层
├── channel-actions ────────── 出站动作（发送/编辑/删除）
├── channel-inbound ─────────── 入站处理
├── outbound-runtime ────────── 出站运行时
└── conversation-runtime ────── 会话管理

工具系统
├── tools-runtime ──────────── 工具注册/调用
├── tool-payload ───────────── 工具载荷格式
└── skill-commands-runtime ──── Skill 命令

安全层
├── security-runtime ────────── 统一安全策略
├── channel-secret-runtime ──── 渠道密钥运行时
├── ssrf-runtime ────────────── SSRF 防护
└── command-auth ────────────── 命令认证

记忆层
├── memory-core ─────────────── 核心记忆
├── memory-host-(*) ──────────── 宿主工具（Events/Files/Markdown/Search）
├── memory-lancedb ──────────── LanceDB 向量存储
└── memory-wiki ─────────────── Wiki 集成

媒体层
├── media-runtime ───────────── 媒体处理核心
├── image-generation ────────── 图像生成
├── video-generation ────────── 视频生成
├── speech-core ─────────────── 语音核心
└── voice-call ──────────────── 语音通话

观测层
├── diagnostic-runtime ──────── 诊断运行时
├── logging-core ────────────── 日志核心
└── runtime-store ───────────── 状态存储
```

### C. 外部资源

- 官方文档：https://docs.openclaw.ai
- 社区 Discord：https://discord.com/invite/clawd
- 插件市场：https://clawhub.ai
- GitHub：https://github.com/openclaw/openclaw

---

*本指南面向架构师与技术开发者，偏重设计思想与系统交互。
基于 OpenClaw v2026.4.23，2026-04-26 更新。*
