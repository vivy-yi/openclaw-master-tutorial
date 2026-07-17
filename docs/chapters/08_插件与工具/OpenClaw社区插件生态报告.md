# OpenClaw 社区插件生态报告

> 数据来源：ClawhHub.ai（2026-04-26 实时抓取）
> 官方插件市场：https://clawhub.ai

---

## 平台规模

| 指标 | 数值 |
|------|------|
| Skills 工具 | **52.7k** |
| 用户 | **18 万** |
| 下载量 | **1200 万** |
| 平均评分 | **4.8 / 5** |
| Plugins（Gateway 插件）| **50 个** |

---

## 一、社区精品 Gateway Plugins

Gateway 插件（接入 OpenClaw 核心的扩展，共 50 个）按功能分类如下：

### 🔐 安全与合规

| 插件 | 作者 | 说明 |
|------|------|------|
| **Signet** | @willamhou | Ed25519 签名审计收据 + 每次工具调用的策略强制执行 |
| **AIP Guard** | @sunilp | AIP 委托验证 |
| **Fine Grained Tool Access Control** | @yang-chen8810 | 细粒度工具调用访问控制 |

**Signet** 是安全类插件的代表作。它为 OpenClaw 的每一次工具调用生成加密签名收据，实现操作的可审计、可追溯。这对于企业合规场景（金融、医疗、法律）特别有价值——管理员可以事后验证某个工具调用是否被授权、是否被篡改。

### 🧠 记忆系统

| 插件 | 作者 | 技术栈 | 说明 |
|------|------|--------|------|
| **Gralkor Memory** | @elimydlarz | FalkorDB + Graphiti | 图数据库驱动的记忆引擎 |
| **Lethe** | @mentholmike | — | AI Agent 持久化记忆层 |
| **KongBrain** | @42u | SurrealDB + 向量嵌入 | 跨会话学习 |
| **Hivemind** | @kaghni | DeepLake | 云端持久共享记忆 |
| **episodic-claw** | @yoshiakefasu | — | 人类情景记忆启发 |

**观察**：至少 5 个独立团队在做不同技术路线的记忆引擎。这说明 OpenClaw 内置的四层 Slot 架构（L0-L3）虽然通用，但各垂直场景的记忆需求差异巨大：
- 图数据库适合关系推理
- 向量嵌入适合语义检索
- 情景记忆适合时间序列的事件回忆
- 云端共享适合 Multi-Agent 协作

### 🌐 消息渠道

| 插件 | 作者 | 平台 | 说明 |
|------|------|------|------|
| **SeaTalk Channel** | @lf4096 | 海信 SeaTalk | 自研平台接入 |
| **Zulip Channel** | @kagura-agent | Zulip | 企业开源 IM，Topic Threading + 元数据库 + Bot Commands |
| **Zalo Mod** | @tuanminhhole | Zalo | 越南主流 IM，群组管理（反垃圾、警告系统）|
| **E-Claw Channel** | @hankhuang0516 | E-Claw | 动态壁纸实体的 AI 聊天平台 |

**趋势**：内置的 21 个 Channel 插件覆盖了主流平台，但社区正在补充小众/垂直平台（SeaTalk、Zalo）和开源替代（Zulip）。

### 🤖 Agent 协作

| 插件 | 作者 | 说明 |
|------|------|------|
| **Openclaw Channel** | @agentchatme | **P2P Agent 消息网络**——Agent 间 DM、联系人、群聊、WebSocket 实时通知。不是人类消息管道，而是自主 Agent 间的通信协议 |
| **Almured** | @almured | **Agent-to-Agent 咨询服务市场**，8 个原生工具。Agent 可以付费/免费委托其他专业 Agent 执行特定任务 |
| **SteamedClaw** | @ckhaisty | 游戏 Agent，支持 register_agent + queue_match + leave_queue + 回合制游戏工具 |

**Openclaw Channel** 是最具架构创新性的插件之一。它在 OpenClaw 的 Channel 体系上构建了一层 Agent 间通信协议，让不同 Agent 可以互相发现、互加联系人、在群组中协作——这本质上是一个运行在 OpenClaw 之上的 Multi-Agent 网络层。

### 💰 支付与商务

| 插件 | 作者 | 说明 |
|------|------|------|
| **StablePay** | @bubblevan | 钱包、客户端 DID 注册、OWS/本地签名、支付工具 |

### 📊 观测与运维

| 插件 | 作者 | 说明 |
|------|------|------|
| **ClawWatch** | @hkgood | Node Agent 监控 + 自适应 Worker 报告 |
| **ClawMetry** | @vivekchand | Token 用量/成本/工具调用/会话的实时仪表盘，支持本地 + 端到端加密云同步 |

### 🔍 搜索增强

| 插件 | 作者 | Provider | 说明 |
|------|------|----------|------|
| **Web Search Plus V2** | @robbyczgw-cla | Serper/Google、Tavily、Linkup、Exa、Firecrawl、Perplexity、You.com、SearXNG | 智能自动路由，根据查询特征选择最优 Provider |

### 🎨 媒体与创作

| 插件 | 作者 | 说明 |
|------|------|------|
| **HeyGen Video Agent** | @kenchung | Avatar/主持人视频生成，深度集成 OpenClaw video_generate 工具 |
| **KPainter** | @bbgasj | 解释视频 + PPT + 图像 + 互动课程，支持 GPT-Image-2 |
| **Venice AI** | @acwilan | Venice.ai 图像和视频生成 |
| **Postzee** | @zeelabs | AI 图像/视频生成，发布到 30+ 社交平台 |

### 🐦 Twitter/X 生态

| 插件 | 作者 | 说明 |
|------|------|------|
| **AIsa Twitter Research Engage Relay** | @bibaofeng | Twitter 研究 + OAuth 授权发帖 + 媒体上传 |
| **AIsa Twitter API Command Center** | @bibaofeng | Twitter API 聚合管理 |
| **X Search** | @jaaneek | Twitter 搜索 via xAI API |

### 🛠️ 开发者工具

| 插件 | 作者 | 说明 |
|------|------|------|
| **Tavily Key Rotator** | @fanxlab | 429 时自动轮换 Tavily API Key |
| **n8n Ops MCP** | @solomonneas | n8n 工作流平台的 MCP 工具（列表/触发/验证/生命周期管理）|
| **Claw Recipes** | @rjdjohnston | Markdown 配方 → 自动脚手架 Agent/团队 |

### 📈 SEO 与增长

| 插件 | 作者 | 说明 |
|------|------|------|
| **Aaron SEO GEO** | @aaron-he-zhu | SEO + GEO（生成式引擎优化）Skills 库 |
| **AdMapix** | @fly0pants | 广告情报 + App 分析，搜索广告创意/排名/下载收入 |

---

## 二、社区精品 Skills（工具集）TOP 榜

> Skills 是 OpenClaw 的轻量级扩展，以 SKILL.md 为载体，供 Agent 动态读取使用。

### 下载量排行

| 排名 | Skill | 作者 | 下载量 | 说明 |
|------|-------|------|--------|------|
| 🥇 | **self-improving-agent** | @pskoett | **410k** | 自动捕获学习/错误/纠正，持续自我改进 |
| 🥈 | **Self-Improving + Proactive Agent** | @ivangdavila | **174k** | 自反思 + 自批评 + 自学习 + 自组织记忆 |
| 🥉 | **ontology** | @oswalpalash | **172k** | 知识图谱，结构化 Agent 记忆（实体：Person/Project/Task/Event/Document）|
| 4 | **Caldav Calendar** | @asleep123 | **26k** | iCloud/Google/Nextcloud/Fastmail 日历同步 |
| 5 | **Trello** | @steipete | **35k** | Trello 看板/列表/卡片管理 |
| 6 | **Slack** | @steipete | **40k** | Slack 反应/置顶等操作 |
| 7 | **Multi Search Engine** | @gpyangyoujun | **129k** | 16 个搜索引擎（7 国内 + 9 全球）|
| 8 | **X Search** | @jaaneek | **11k** | Twitter/X 搜索 via xAI API |
| 9 | **Answer Overflow** | @rhyssullivan | **18k** | Discord 社区问答检索 |
| 10 | **Polymarket** | @joelchance | **139k** | 预测市场查询（价格/趋势/事件搜索）|
| 11 | **AdMapix** | @fly0pants | **117k** | 广告情报 & App 分析 |

**Self-Improving Agent** 以 41 万下载量遥遥领先，反映了用户的核心需求——**让 AI 越用越聪明**。它的核心机制（自动捕获错误、用户纠正、模式识别）与 OpenClaw 内置的 skill-workshop 理念一致，但 @pskoett 的实现更专注于行为层面的持续优化。

---

## 三、生态观察：五个关键趋势

### 趋势 1：记忆系统是最大技术热点

至少有 **5 个独立团队** 在做不同技术路线的记忆引擎：

```
图数据库路线 ────── Gralkor Memory（FalkorDB + Graphiti）
向量嵌入路线 ────── KongBrain（SurrealDB + embeddings）
情景记忆路线 ────── episodic-claw（人类记忆启发）
云端共享路线 ────── Hivemind（DeepLake）
通用持久化路线 ──── Lethe
```

**为什么？** OpenClaw 内置的四层 Slot 架构足够通用，但各垂直场景的记忆需求差异太大。金融 Agent 需要事件时间线，客服 Agent 需要对话上下文，代码 Agent 需要调用链——这些无法用同一个记忆引擎最优地满足。

**对架构师的启示**：如果你的 Agent 场景需要特定类型的记忆，优先考虑社区对应的记忆插件，而非强行适配默认的记忆架构。

### 趋势 2：Multi-Agent 协作开始落地

**Openclaw Channel**（Agent 间 P2P 消息网络）和 **Almured**（Agent 间咨询服务市场）代表了 Multi-Agent 协作的两条路线：

```
路线 A：通信基础设施
Openclaw Channel ─── Agent 间直接 DM / 群聊 / WebSocket 实时
  └── 适用于：多 Agent 协作写作、分布式问题求解

路线 B：服务市场
Almured ─── Agent 发布自己的能力，别的 Agent 付费/免费调用
  └── 适用于：专业化 Agent 生态（法律 Agent 调用金融 Agent）
```

### 趋势 3：垂直领域插件快速涌现

| 垂直领域 | 插件 | 说明 |
|---------|------|------|
| 预测市场 | Polymarket | 实时价格/趋势查询 |
| 项目管理 | Trello | 看板操作 |
| 企业 IM | Slack | 反应/置顶 |
| 视频生成 | HeyGen, KPainter, Venice AI | 多种风格 |
| 广告分析 | AdMapix | App 排名/下载/收入 |
| SEO/GEO | Aaron SEO GEO | 搜索引擎优化 |
| 社交媒体 | Postzee, X Search | 30+ 平台发布 |

**驱动因素**：OpenClaw 的 Agent 能力（LLM + 工具调用 + 记忆）几乎可以自动化任何垂直领域的工作流。开发者不需要写完整的应用，只需要封装一个"Skill 合集 + 插件配置"，用户就能获得该领域的 AI 专家。

### 趋势 4：安全与合规插件开始出现

随着 OpenClaw 进入生产环境（企业部署、多 Agent 协作），安全需求催生了对应的插件生态：

```
Signet ─── 工具调用审计 + 加密签名
Tool Access Control ─── 细粒度权限控制
AIP Guard ─── AI 委托验证
```

这与 OpenClaw 内置的 `securityRuntime` 互补——内置安全负责核心边界，社区插件负责细粒度的业务安全策略。

### 趋势 5：中国开发者参与度高

ClawhHub 上有明确中国开发者背景的插件：

| 插件 | 作者 | 说明 |
|------|------|------|
| SeaTalk Channel | @lf4096 | 海信同名平台 |
| Zalo Mod | @tuanminhhole | 越南 Zalo 群管 |
| Multi Search Engine | @gpyangyoujun | 含 7 个国内搜索引擎 |
| Gralkor Memory | @elimydlarz | 图数据库记忆 |
| Claw Recipes | @rjdjohnston | Agent 脚手架 |
| KPainter | @bbgasj | 视频/PPT 生成 |

---

## 四、如何发现和安装社区插件

### 安装方式

**通过 ClawhHub UI（推荐）：**
1. 访问 https://clawhub.ai
2. 搜索或浏览所需插件/Skill
3. 点击 Install，OpenClaw 自动处理依赖

**通过 CLI：**
```bash
openclaw plugins add <plugin-id>
openclaw skills add <skill-id>
```

**手动安装：**
```bash
cd ~/.openclaw/plugins
npm install <plugin-name>
openclaw plugins enable <plugin-id>
```

### 评估插件质量

| 指标 | 含义 | 推荐阈值 |
|------|------|---------|
| 下载量 | 社区验证程度 | >10k 更可靠 |
| 评分 | 用户满意度 | >4.5 分 |
| 版本号 | 维护活跃度 | ≥1.0 更成熟 |
| 更新频率 | 持续维护 | 查看 CHANGELOG |
| Stars | GitHub 认可 | 参考项 |

---

## 五、插件选型决策树

```
需求场景
  │
  ├── 需要企业级安全审计
  │     ├── 推荐：Signet（签名审计）
  │     └── 备选：Tool Access Control（细粒度权限）
  │
  ├── 需要特定记忆引擎
  │     ├── 关系推理 → Gralkor Memory（图数据库）
  │     ├── 跨会话学习 → KongBrain（向量嵌入）
  │     └── 情景记忆 → episodic-claw
  │
  ├── 需要多 Agent 协作
  │     ├── 直接通信 → Openclaw Channel
  │     └── 服务市场 → Almured
  │
  ├── 需要接入小众平台
  │     ├── SeaTalk → SeaTalk Channel
  │     ├── Zulip → Zulip Channel
  │     └── Zalo → Zalo Mod
  │
  ├── 需要专业搜索
  │     ├── 多引擎聚合 → Web Search Plus V2
  │     ├── Twitter → X Search / AIsa
  │     └── 预测市场 → Polymarket
  │
  ├── 需要持续自我改进
  │     └── 推荐：self-improving-agent（410k 下载）
  │
  └── 需要企业 IM 集成
        ├── Slack → Slack Skill（40k 下载）
        └── Trello → Trello Skill（35k 下载）
```

---

## 六、资源链接

| 资源 | 地址 |
|------|------|
| 插件/Skills 市场 | https://clawhub.ai |
| OpenClaw 官网 | https://openclaw.ai |
| 官方 Discord | https://discord.com/invite/clawd |
| GitHub | https://github.com/openclaw/openclaw |
| ClawhHub 源码 | https://github.com/openclaw/clawhub |

---

*本报告基于 2026-04-26 ClawhHub.ai 实时数据撰写。*
