# OpenClaw 记忆系统插件深度分析教程

> 本教程基于 ClawhHub 实时数据（2026-04-26），对 5 款社区记忆插件进行深度技术分析、架构对比、安装配置指南及选型建议。
> 来源：Gralkor（Graphiti+FalkorDB）、KongBrain（SurrealDB）、Hivemind（DeepLake）、episodic-claw（PebbleDB）、Lethe（HTTP）

---

## 一、概览：为什么需要第三方记忆插件？

OpenClaw 内置四层 Slot 记忆架构（L0-L3），对大多数场景够用。但当 AI 需要：

- **跨会话持久记忆**：内置的上下文窗口是滑动截断，第三方的图数据库/向量数据库可以永久存储
- **语义检索**：不只是按时间排序，而是理解"意思"
- **Multi-Agent 共享**：多个 Agent 之间共享同一个记忆库
- **特定记忆模型**：图数据库适合关系推理，向量适合语义，情景记忆适合时间序列

这时需要第三方记忆插件。

### 五大插件技术栈一览

| 插件 | 存储后端 | 向量引擎 | 嵌入模型 | 技术栈 | 代码语言 |
|------|---------|---------|---------|--------|---------|
| Gralkor | FalkorDB | Graphiti | Gemini（默认）| 知识图谱 + 时序 | TypeScript + Python |
| KongBrain | SurrealDB | BGE-M3（HNSW）| BGE-M3 GGUF（默认）/ OpenAI兼容 | 图增强认知引擎 | TypeScript |
| Hivemind | DeepLake（云端）| DeepLake | — | 云端共享记忆 | TypeScript |
| episodic-claw | PebbleDB | HNSW | Gemini | 情景记忆 + 叙事架构 | TypeScript + Go |
| Lethe | 自建 HTTP 端点 | — | — | 轻量 HTTP 客户端 | TypeScript |

---

## 二、KongBrain — 认知增强型记忆引擎

**作者** @42u | **版本** v0.5.0 | **许可** MIT  
**插件市场** https://clawhub.ai/plugins/kongbrain  
**GitHub** https://github.com/42U/kongbrain  
**安全状态** ⚠️ Suspicious（VirusTotal Malicious，OpenClaw 中等置信度可疑）

### 2.1 设计哲学

KongBrain 的核心思想非常激进——它的 README 以"龙虾大脑 vs 猩猩大脑"的比喻开篇：

> OpenClaw 默认的记忆是"龙虾大脑"：消息按上下文窗口滑动，超出就截断，永远丢失。  
> KongBrain 是"猩猩大脑"：图数据库 + 向量嵌入 + 持久化，AI 记住你上周说的话，还能从中学习。

### 2.2 IKONG 五支柱架构

KongBrain 的认知架构由五个功能支柱组成：

```
Intelligence ─── 意图分类（10 类）+ 复杂度估算 + 推理深度
Knowledge ───── 记忆图谱（概念/技能/反思/因果链/身份块）
Operation ───── 工具编排 + 技能执行 + 产物管理
Network ─────── 图遍历（跨支柱边 + 因果路径）
Graph ───────── SurrealDB 存储 + BGE-M3 向量 + HNSW 索引
```

### 2.3 数据模型（SurrealDB 表结构）

| 表名 | 存储内容 |
|------|---------|
| `agent` | AI 身份（名字、模型）|
| `project` | 当前项目（状态、标签）|
| `task` | 单次会话作为工作单元 |
| `turn` | 每条对话消息（角色、文本、嵌入、Token数）|
| `memory` | 压缩后的事实（重要性 0-10、置信度）|
| `skill` | 学到的流程（步骤、前置条件、成功率）|
| `reflection` | 元认知反思（效率、失败模式）|
| `causal_chain` | 因果链（触发→结果、链类型）|
| `identity_chunk` | AI 自我认知碎片 |
| `monologue` | 保留跨会话的思考痕迹 |
| `core_memory` | Tier0（始终加载）+ Tier1（会话固定）指令 |
| `soul` | 毕业后的身份文档（AI 的"灵魂"）|

### 2.4 每轮对话的工作流

```
用户输入
    │
    ▼
意图分类（10 类：简单提问/读代码/写代码/调试/深度探索...）
    │ 25ms，零样本 BGE-M3 cosine
    ▼
预取 ───────── 后台向量搜索（LRU 缓存，5min TTL）
    │
    ▼
上下文注入 ── 向量搜索 → 图扩展 → 6 信号评分 → 预算裁剪
    │ 搜索：turns/concepts/memories/artifacts/identity/monologues
    │ 评分：相似度/新鲜度/重要性/访问次数/邻居/实用性
    │ 预算：21% 上下文窗口保留给检索
    ▼
Agent 循环 ─── LLM + 工具执行
    │ 规划门：执行工具前先宣布计划
    │ 智能截断：保留大工具输出的尾部
    ▼
轮次存储 ─── 每条消息嵌入 + 存储 + 图边链接
    │
    ▼
质量评估 ─── 测量检索利用率（文本重叠/三元组/单元组）
    │
    ▼
记忆守护进程 ─ 后台线程提取 9 类知识（LLM）：
    │ 因果链 / 独白 / 概念 / 纠正 / 偏好 / 产物 / 决策 / 技能 / 已解决记忆
```

### 2.5 嵌入选项

| 模式 | 嵌入方式 | 成本 | 吞吐量 |
|------|---------|------|--------|
| **local（默认）** | BGE-M3 GGUF via node-llama-cpp，本地 CPU | 零（~420MB 模型）| 串行，高频次有瓶颈 |
| **openai-compat** | HTTP POST 到 /v1/embeddings | 按 Token 计费 | 高并行，批量 96 条/请求 |

支持：OpenAI、Azure OpenAI、Together、Anyscale、vLLM、LM Studio、Ollama、DeepInfra、Fireworks。

### 2.6 安装与配置

**前置：启动 SurrealDB**
```bash
# macOS
brew install surrealdb/tap/surreal
surreal start --user youruser --pass yourpass --bind 127.0.0.1:8042 surrealkv:~/.kongbrain/surreal.db

# Docker
docker run -d --name surrealdb -p 127.0.0.1:8042:8000 \
  -v ~/.kongbrain/surreal-data:/data \
  surrealdb/surrealdb:latest start \
  --user youruser --pass yourpass surrealkv:/data/surreal.db
```

**安装插件**
```bash
openclaw plugins install clawhub:kongbrain
```

**激活**
```json
{
  "plugins": {
    "allow": ["kongbrain"],
    "slots": {
      "contextEngine": "kongbrain"
    }
  }
}
```

**切换嵌入 Provider（如用 Ollama）**
```bash
ollama pull nomic-embed-text
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_API_KEY=ollama   # 任意非空字符串
export KONGBRAIN_EMBED_PROVIDER=openai-compat
```

### 2.7 ⚠️ 安全警告

KongBrain 的 VirusTotal 报告为 **Malicious**，OpenClaw 安全扫描为 **Suspicious（中置信度）**。官方说明中提到的可疑行为：
- 自动下载本地模型
- 后台守护进程
- 系统提示/指令注入
- 控制台日志记录连接信息

**建议**：
1. 生产环境使用前，务必审查 GitHub 源码
2. 使用 `openai-compat` 模式而非 local 模式，减少未知代码执行
3. 隔离运行，不与其他关键业务共用 OpenClaw 实例

---

## 三、Gralkor Memory — 时序知识图谱引擎

**作者** @susu-eng/elimydlarz | **版本** v2.1.1 | **许可** MIT  
**插件市场** https://clawhub.ai/plugins/@susu-eng/openclaw-gralkor  
**GitHub** https://github.com/elimydlarz/openclaw_gralkor  
**安全状态** ✅ Benign（VirusTotal + OpenClaw 均良性）

### 3.1 设计哲学

Gralkor = Graphiti（图处理）+ FalkorDB（时序图数据库）。它的核心洞察是：**AI 对话本质上是事件流，每个事件有时间戳和因果关系**，用知识图谱比用纯向量更精确。

### 3.2 架构

```
OpenClaw
    │
    ├── before_prompt_build ─── 注册 session→group 映射，扫描工作空间文件，注入相关事实
    ├── agent_end ───────────── 将对话轮次 POST /capture，由 Gralkor 服务器管理缓冲池
    └── session_end ─────────── POST /session_end 刷新缓冲池

Gralkor Python Server（@susu-eng/gralkor-ts）
    │
    ├── /capture ────────────── 接收对话轮次 → 时序存储
    ├── /recall ─────────────── 向量检索（Graphiti）
    └── /tools/memory_add ──── 异步添加知识（Graphiti 提取）

FalkorDB ─────────── 时序知识图谱存储
```

### 3.3 关键设计：会话隔离

Gralkor 使用 `group_id` 做知识隔离：
- `session_id` = OpenClaw 的 `sessionKey`（必填）
- `group_id` = `agentId`（连字符替换为下划线，适配 RediSearch 约束）
- **每个 Agent 独立图分区**，Agent 之间互不可见对方记忆

### 3.4 与内置记忆的关系

Gralkor 扫描工作空间文件（`MEMORY.md`、`memory/*.md`）并在 `before_prompt_build` 时注入相关内容。**它与 OpenClaw 内置的记忆系统是正交补充，不是替代**。

### 3.5 安装与配置

```bash
openclaw plugins install @susu-eng/openclaw-gralkor --dangerously-force-unsafe-install
```

> ⚠️ 安装时安全扫描会标记为 Critical，因为 Python 服务器打包在 `@susu-eng/gralkor-ts` 中。建议安装前审查源码。

**配置**（`plugins.entries.openclaw-gralkor.config`）：
```yaml
plugins:
  allow: ["openclaw-gralkor"]
  entries:
    openclaw-gralkor:
      config:
        dataDir: /path/to/gralkor-data     # 必填，Python venv + FalkorDB 目录
        googleApiKey: 'your-key-here'       # 或 openaiApiKey / anthropicApiKey / groqApiKey
        autoCapture:
          enabled: true                     # 默认开启
        autoRecall:
          enabled: true                     # 默认开启
          maxResults: 10                    # 注入上限
        search:
          maxResults: 10                    # memory_search 工具返回上限
        llm:
          provider: google                 # Gemini（默认）
        embedder:
          provider: google
        test: false                        # 生产关闭
  slots:
    memory: openclaw-gralkor
tools:
  alsoAllow: ["openclaw-gralkor"]
```

**首次启动耗时 1-2 分钟**（`uv sync` 解析 Graphiti + falkordblite），之后复用 venv。

### 3.6 四个工具

| 工具 | 作用 |
|------|------|
| `memory_search` | 调用 `/recall` 语义检索，等同于 `before_prompt_build` hook 的检索逻辑 |
| `memory_add` | POST `/tools/memory_add`，异步添加到图数据库（火灾即忘）|
| `memory_build_indices` | 重建图索引 |
| `memory_build_communities` | 构建知识社区（社区检测算法）|

---

## 四、Hivemind — 云端多 Agent 共享记忆

**作者** @kaghni | **版本** v0.6.55 | **许可** —  
**插件市场** https://clawhub.ai/plugins/hivemind  
**GitHub** https://github.com/activeloopai/hivemind  
**安全状态** ✅ Benign 高置信度（但 VirusTotal 待定）

### 4.1 设计哲学

Hivemind 的核心价值主张：**同一个记忆库，跨会话、跨机器、跨渠道、多 Agent 共享**。

它由 DeepLake（一家做数据管理的公司）提供，记忆存储在 DeepLake 云端，团队成员（包括不同的 AI Agent）在同一个 org 下共享记忆。

### 4.2 架构

```
OpenClaw Agent
    │
    ├── auto-recall ── 每次 Agent 回复前，通过关键词搜索召回相关记忆
    └── auto-capture ── 每次对话结束后，存入 DeepLake 工作区

DeepLake Cloud (api.deeplake.ai)
    │
    └── 同一 Org 下的所有用户/Agent 共享记忆库
```

### 4.3 核心特点

**跨平台共享**：DeepLake 存储不只 OpenClaw 用，Claude Code、Codex CLI 都可以接入。同一 Org 下，一个 Agent 学到的经验，其他 Agent 也能用。

**设备流认证**：`/hivemind_login` 通过设备流认证，不需要在配置里写密钥。

**不影响内置记忆**：Hivemind 通过 lifecycle hooks 运行，`memory-core` 的 dreaming cron 等内置功能继续工作。

### 4.4 命令一览

| 命令 | 功能 |
|------|------|
| `/hivemind_login` | 设备流登录 |
| `/hivemind_setup` | 添加到工具白名单（一次性）|
| `/hivemind_capture` | 开/关自动捕获 |
| `/hivemind_whoami` | 显示当前 org 和 workspace |
| `/hivemind_orgs` | 列出组织 |
| `/hivemind_switch_org <name>` | 切换组织 |
| `/hivemind_workspaces` | 列出工作区 |
| `/hivemind_switch_workspace <id>` | 切换工作区 |
| `/hivemind_version` | 显示版本并检查更新 |
| `/hivemind_update` | 安装最新版本 |
| `/hivemind_autoupdate [on|off]` | 更新提示开关 |

### 4.5 安装与配置

```bash
openclaw plugins install clawhub:hivemind
```

安装后，在对话中输入：
```
/hivemind_login
```
点击认证链接，发送另一条消息即可。

**性能注意**：Hivemind 发出的工具调用频繁（每次对话多次小调用），建议使用较快模型。官方推荐：
```
anthropic/claude-haiku-4-5-20251001
```
而非大推理模型。

**数据隐私**：
- 捕获内容：用户消息 + AI 回复 → `api.deeplake.ai`
- 凭证存储：`~/.deeplake/credentials.json`（0600 权限）
- 暂停捕获：`/hivemind_capture`

**团队共享**：在 Hivemind 中邀请队友：
```
invite alice@example.com as admin
```
他们的 Agent 就能看到你的记忆，你的 Agent 也能看到他们的。

---

## 五、episodic-claw — 情景记忆引擎

**作者** @yoshiakefasu（个人开发者，MIT + MPL-2.0 双许可）| **版本** v0.4.29  
**插件市场** https://clawhub.ai/plugins/episodic-claw  
**GitHub** https://github.com/YoshiaKefasu/episodic-claw  
**安全状态** ✅ Benign 高置信度（VirusTotal + OpenClaw 均良性）

### 5.1 设计哲学

episodic-claw 的核心灵感来自**人类的情景记忆（Episodic Memory）**——人类记住事情不是按时间线平铺，而是按"事件/场景"分段，中间有关键转折点。

核心概念：**Surprise Score**——当话题突然变化时（通过贝叶斯意外值检测），插件自动"封存"当前记忆片段，开始新的 Episode。

### 5.2 Sequential Narrative Architecture（v0.4.x 核心）

```
大规模对话日志（可能数十万 Token）
    │
    ▼
Cache DB 候诊室（PebbleDB）
    │ 切成安全的 64K 块，按顺序排队
    │ 即使断电，候诊室记住自己的位置
    ▼
后台工作者逐个取出
    │ 连接到上一个 Episode 的上下文
    ▼
生成连续叙事 Episode
    │ 像电视剧第 1、2、3 集那样衔接
    │ 保留原始语言（中文对话 → 中文 Episode）
    ▼
PebbleDB 持久存储
```

### 5.3 技术架构：TypeScript + Go 双引擎

```
TypeScript 前台 ── 对话 OpenClaw，路由命令，处理聊天流
Go 后台 ──────── 嵌入计算（Gemini）、高速混合搜索、数据写入 PebbleDB
```

分离的好处：即使 AI 有 10 万条记忆，聊天不会因为记忆处理而冻结。

### 5.4 检索流程（每轮对话）

```
用户发消息
    │
    ▼
before_prompt_build 触发
    │ 构建"搜索主题"（来自最近几条消息）
    ▼
Go Sidecar RPC: recall(query)
    │
    ├── Gemini 嵌入 → 向量
    ├── Bleve 文本过滤（快速排除无关）
    └── HNSW 语义搜索（精确匹配）
    │
    ▼
结果排序 + 24-turn 冷却检查
    │ 同一记忆不会连续注入超过 24 轮
    ▼
Prepend 到 AI System Prompt（严格 Token 预算）
    │
    ▼
AI 回复
```

### 5.5 四个记忆工具

| 工具 | 行为 |
|------|------|
| `ep-recall` | 主动搜索历史记忆（"记得我们昨天聊的 X 吗？"）|
| `ep-save` | 强制立即保存（适合保存规则、代码偏好）|
| `ep-expand` | 读取摘要 Episode 后，如需精确细节，解档原始日志 |
| `ep-anchor` | 在上下文窗口被压缩前，AI 主动写下当前决策/目标/心态，作为桥接 |

### 5.6 研究基础

episodic-claw 的设计参考了真实的学术论文：

| 方向 | 论文 |
|------|------|
| 情景记忆架构 | EM-LLM (Watson et al., 2024), MemGPT (Packer et al., 2023) |
| 事件边界检测 | Bayesian Surprise (PMC11654724), Robust Bayesian Changepoint (arXiv:2302.04759) |
| 叙事整合 | Neural Contiguity Effect (PMC5963851), Contextual Prediction Errors (PMC8196002) |
| 检索校准 | Dynamic Uncertainty Ranking (ACL Anthology 2025) |

### 5.7 安装与配置

```bash
openclaw plugins install clawhub:episodic-claw
```

自动使用 OpenClaw 中已有的 `GEMINI_API_KEY`，无需额外配置。

**关键配置项**（`plugins.entries.episodic-claw.config`）：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `reserveTokens` | 2048 | 记忆注入 Token 上限。太高：上下文拥挤；太低：变成金鱼 |
| `dedupWindow` | 5 | 重复检测窗口（轮数）。太高：误忽略命令；太低：网络延迟时重复写入 |
| `segmentationLambda` | 2.0 | 话题敏感度。太高：记忆变成巨大一团；太低：正常对话也被截断 |
| `recallReInjectionCooldownTurns` | 24 | 冷却轮数。太高：长期会话遗忘；太低：Token 浪费 |
| `enableBackgroundWorkers` | true | 后台维护。关闭可省 API 费，但数据堆积 |
| `toolFirstRecall.enabled` | true | 工具优先召回架构（v0.4.6+），防止 CLI/嵌入式路径重复注入 |

---

## 六、Lethe — 轻量 HTTP 记忆客户端

**作者** @mentholmike | **版本** v0.2.2 | **许可** MIT  
**插件市场** https://clawhub.ai/plugins/@mentholmike/lethe  
**GitHub** https://github.com/openlethe/lethe  
**安全状态** ✅ Benign 高置信度

### 6.1 设计哲学

Lethe 是五款插件中最简洁的。它的设计理念是：**不做存储引擎，做 HTTP 客户端**。

Lethe 这个名字来自希腊神话中的"遗忘河"——它做的恰恰是相反的事：让 AI 不会遗忘。

### 6.2 架构

```
OpenClaw
    │
    └── Lethe Plugin
            │
            ├── agent_end ──→ 记录对话事件 + 工具输出
            └── (用户配置) ──→ Lethe HTTP Endpoint（自建）
                              │
                              └── 任意存储后端（用户自选）
```

### 6.3 特点

- **最轻量**：只是对话事件到 HTTP 端点的转发
- **完全可定制**：存储后端完全由用户决定（可以用任何能接收 HTTP POST 的服务）
- **最小权限**：不需要本地数据库，不需要 Python/Go 运行时，不需要 GPU
- **Plugin kind**：`context-engine`（与 KongBrain 同类）

### 6.4 安装与配置

```bash
openclaw plugins install clawhub:@mentholmike/lethe
```

配置项：
```yaml
plugins:
  entries:
    lethe:
      config:
        endpoint: http://localhost:8080   # Lethe HTTP 端点地址
        apiKey: your-api-key               # 端点认证密钥
        enabled: true
```

Lethe 本身不提供后端存储服务。适合有自己存储基础设施的开发者。

---

## 七、横向对比与选型决策

### 7.1 核心维度对比

| 维度 | KongBrain | Gralkor | Hivemind | episodic-claw | Lethe |
|------|-----------|---------|---------|--------------|-------|
| **存储** | SurrealDB（本地）| FalkorDB（本地）| DeepLake（云）| PebbleDB（本地）| 自建 HTTP |
| **向量** | BGE-M3（HNSW）| Graphiti | DeepLake | HNSW + Bleve | — |
| **多 Agent 共享** | ❌ 隔离 | ❌ 隔离 | ✅ 团队共享 | ❌ 隔离 | ✅ 可配置 |
| **跨平台** | ❌ 仅 OpenClaw | ❌ 仅 OpenClaw | ✅ OpenClaw + Claude Code + Codex | ❌ 仅 OpenClaw | ✅ 任意 |
| **学习能力** | ✅ 技能提取 + 因果链 | ⚠️ 有限 | ❌ 仅捕获 | ✅ 叙事整合 | ❌ |
| **身份/灵魂** | ✅ Soul 毕业系统 | ❌ | ❌ | ❌ | ❌ |
| **Token 效率** | 高（ACAN 评分）| 中 | 低（频繁小调用）| 高（64K 分块）| 高 |
| **安全状态** | ⚠️ Suspicious | ✅ Benign | ✅ Benign | ✅ Benign | ✅ Benign |
| **维护活跃度** | 中（v0.5.0）| 高（v2.1.1）| 高（v0.6.55）| 高（v0.4.29）| 低（v0.2.2）|
| **复杂度** | 最高 | 高 | 中 | 高 | 最低 |

### 7.2 选型决策树

```
你的需求场景
  │
  ├── 需要跨团队/跨 Agent 共享记忆
  │     └── Hivemind（唯一支持团队共享的方案）
  │
  ├── 需要本地私密存储（数据不出境）
  │     ├── 需要图关系推理（实体关联查询）
  │     │     ├── 需要时序感知 → Gralkor Memory
  │     │     └── 需要自适应检索（按意图动态调整）→ KongBrain ⚠️
  │     │
  │     ├── 需要叙事化记忆（像人一样按场景分段）
  │     │     └── episodic-claw
  │     │
  │     └── 最简方案
  │           └── Lethe（自己提供后端）
  │
  ├── 需要最强的 AI 学习能力
  │     └── KongBrain（唯一有 ACAN 评分 + Soul 毕业 + 因果链追踪）
  │
  ├── 生产环境使用（安全第一）
  │     ├── 不需要图数据库 → episodic-claw（最稳定，文档最完整）
  │     ├── 需要图 + 时序 → Gralkor（良性，Graphiti 成熟）
  │     └── 需要多 Agent 共享 → Hivemind（云端治理完善）
  │
  └── 刚接触，想快速体验
        └── episodic-claw（安装最简单，Gemini API 已有即可）
```

### 7.3 ⚠️ 特别警告：KongBrain 安全问题

KongBrain 是功能最强大的，但也是唯一一个 **VirusTotal 报恶意 + OpenClaw 安全扫描报可疑**的插件：

**报告的可疑行为**：
- 系统提示/指令注入
- 自动下载本地模型
- 后台守护进程运行
- 连接信息记录到控制台

**建议**：
1. 生产环境**强烈建议不要使用** KongBrain
2. 如果需要类似功能，**优先选择 episodic-claw**（功能接近，安全性高）
3. 如果坚持使用 KongBrain，务必在隔离环境中审查 GitHub 源码

---

## 八、安装前置条件速查

| 插件 | Node.js | Python | Go | 本地模型 | 额外服务 | API Key |
|------|---------|--------|----|---------|---------|---------|
| KongBrain | ✅ | ❌ | ❌ | ✅ BGE-M3 GGUF（可选）| SurrealDB | OpenAI 兼容（可选）|
| Gralkor | ✅ | ✅ uv sync | ❌ | ❌ | ❌ | Gemini / OpenAI / Anthropic / Groq |
| Hivemind | ✅ | ❌ | ❌ | ❌ | DeepLake 云端 | DeepLake 认证（设备流）|
| episodic-claw | ✅ | ❌ | ✅ | ❌ | ❌ | Gemini（已有）|
| Lethe | ✅ | ❌ | ❌ | ❌ | Lethe HTTP 端点（自建）| 自定义 |

---

## 九、实际配置示例

### 场景 1：私密开发环境，需要图关系推理

```yaml
# 使用 Gralkor — 本地 FalkorDB，数据不离开机器
plugins:
  allow: ["openclaw-gralkor"]
  entries:
    openclaw-gralkor:
      config:
        dataDir: ~/.gralkor-data
        googleApiKey: "${GEMINI_API_KEY}"
        autoCapture:
          enabled: true
        autoRecall:
          enabled: true
          maxResults: 10
  slots:
    memory: openclaw-gralkor
tools:
  alsoAllow: ["openclaw-gralkor"]
```

### 场景 2：团队协作，需要多 Agent 共享记忆

```yaml
# 使用 Hivemind — DeepLake 云端，团队共享
plugins:
  allow: ["hivemind"]
  entries:
    hivemind:
      config:
        autoUpdate: true
tools:
  alsoAllow: ["hivemind"]
agents:
  defaults:
    model: "anthropic/claude-haiku-4-5-20251001"  # 用较快模型
```

### 场景 3：追求安全 + 叙事化记忆

```yaml
# 使用 episodic-claw — 本地 PebbleDB，情景分段
plugins:
  allow: ["episodic-claw"]
  entries:
    episodic-claw:
      config:
        reserveTokens: 2048
        segmentationLambda: 2.0
        recallReInjectionCooldownTurns: 24
        enableBackgroundWorkers: true
  slots:
    memory: episodic-claw
tools:
  alsoAllow: ["episodic-claw"]
```

### 场景 4：需要 KongBrain 的高级功能但担心安全

**不推荐在生产环境使用 KongBrain**。如果确实需要 ACAN 评分 + 自适应检索，建议：
1. 在隔离的测试环境中评估
2. 等待安全报告更新
3. 考虑向开发者提交安全修复 PR

---

## 十、作者生态观察

### 开发者背景差异

| 插件 | 开发者 | 背景 |
|------|--------|------|
| KongBrain | @42u | 独立开发者，功能最激进 |
| Gralkor | @elimydlarz | 工程化程度高，与 OpenClaw 官方 Slot 系统集成好 |
| Hivemind | @kaghni / ActiveLoop 公司 | 有商业公司背书，云端产品 |
| episodic-claw | @yoshiakefasu | 个人开发者，写法" vibe coded"，但研究基础扎实 |
| Lethe | @mentholmike | 最小化实现，适合高级用户定制 |

### 发展趋势

1. **Go 语言进入**：episodic-claw 引入 Go Sidecar 证明了重型计算（嵌入+搜索）用 Go 比 JS 更高效
2. **图数据库热门**：KongBrain 和 Gralkor 都用图数据库，说明 AI 记忆需要关系推理
3. **情景记忆被重视**：episodic-claw 的 Surprise Score 和叙事架构，代表了"人类记忆启发"的技术路线
4. **安全成为门槛**：KongBrain 的安全警告给整个生态敲响警钟，ClawhHub 的安全扫描机制正在完善

---

*本教程基于 ClawhHub 2026-04-26 实时数据。版本信息可能随时间变化，安装前请以 ClawhHub 页面最新数据为准。*
