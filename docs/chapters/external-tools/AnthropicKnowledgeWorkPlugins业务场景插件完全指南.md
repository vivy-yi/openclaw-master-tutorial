# Anthropic knowledge-work-plugins 业务场景插件完全指南

> ⭐ 11,443 Stars | 14 个业务场景插件 + 5 个合作伙伴插件 | [GitHub](https://github.com/anthropics/knowledge-work-plugins)
> 主要用于 Claude Cowork（Anthropic 桌面应用），也支持 Claude Code

---

## 一、仓库概述

### 1.1 一句话定位

**Anthropic 官方发布的业务场景 AI 助手插件包**，覆盖 14 个职业场景，让 Claude 像真正的同事一样参与工作流程。

### 1.2 与 claude-plugins-official 的区别

| 维度 | claude-plugins-official | knowledge-work-plugins |
|------|------------------------|------------------------|
| **分类方式** | 按技术类型（Internal/External/MCP） | 按业务场景（销售/法务/HR 等） |
| **面向用户** | 开发者、技术用户 | 知识工作者、业务人员 |
| **组织结构** | 扁平化，所有插件平铺 | 按业务场景目录分组 |
| **设计理念** | 提供工具，让用户自己组合 | 场景化工作流，开箱即用 |

### 1.3 目录结构

```
anthropics/knowledge-work-plugins/
├── productivity/            # 任务/日历/工作流/职场记忆
├── sales/                   # 销售勘探/pipeline/外联
├── customer-support/          # 工单处理/升级/响应草稿
├── product-management/        # 需求文档/路线图/用户研究
├── marketing/                # 内容创作/活动规划/品牌声音
├── legal/                  # 合同审查/NDA/合规
├── finance/                 # 日记账/对账/财务报表
├── data/                   # SQL 查询/数据可视化
├── enterprise-search/       # 跨工具企业搜索
├── bio-research/           # 生物科研文献/基因组
├── engineering/             # 站会/代码审查/事故响应
├── human-resources/        # 招聘/入职/绩效管理
├── operations/             # 供应商管理/流程文档/变更管理
├── pdf-viewer/            # PDF 查看/批注/填写/签名
├── cowork-plugin-management/ # 企业自定义插件开发
│
└── partner-built/           # 第三方合作伙伴插件
    ├── apollo/            # Apollo.io 销售勘探
    ├── brand-voice/        # Tribe AI 品牌声音
    ├── common-room/        # Common Room GTM
    ├── slack/              # Slack MCP 配置
    └── zoom-plugin/        # Zoom 集成
```

---

## 二、核心设计理念：Tool-Agnostic

### 2.1 什么是 Tool-Agnostic

每个插件不绑定具体产品，而是用**类别占位符**来引用工具：

```
~~chat        → Slack / Microsoft Teams / Discord
~~CRM        → HubSpot / Salesforce / Close
~~project tracker → Linear / Jira / Asana
~~knowledge base → Notion / Confluence / Guru
~~data warehouse → Snowflake / Databricks / BigQuery
```

### 2.2 三层配置架构

```
Layer 1: Skills（领域知识）
  → .skills/ 目录，定义工作流程和最佳实践

Layer 2: CONNECTORS.md（工具类别）
  → 定义可用工具类别，不绑定具体产品

Layer 3: .mcp.json（MCP 服务器配置）
  → 将类别映射到具体的 MCP Server URL
```

---

## 三、14 个场景插件详解

---

### 3.1 productivity（产品效率）

> **解决的问题**：任务管理混乱、职场上下文丢失、团队术语不统一

**安装**：`claude plugins add knowledge-work-plugins/productivity`

**Commands：**
- `/start` — 初始化任务+记忆，打开仪表板
- `/update` — 整理过期项，检查记忆缺口，同步外部工具
- `/update --comprehensive` — 深度扫描邮件/日历/聊天

**MCP 配置**：Slack / Microsoft 365 / Notion / Asana / Linear / Jira / Monday / ClickUp / Microsoft 365

---

### 3.2 sales（销售）

> **解决的问题**：潜在客户信息分散、跟进记录丢失、Pipeline 回顾耗时、外联重复

**安装**：`claude plugins add knowledge-work-plugins/sales`

**Commands：**
- `/call-summary` — 处理通话记录 → 提取行动项、起草跟进、生成内部摘要
- `/forecast` — 生成加权销售预测，上传 CSV 或描述 pipeline
- `/pipeline-review` — 分析 pipeline 健康度，优先排序，生成每周行动计划

**Skills：** `account-research`（公司/个人研究）、`call-prep`（电话准备）

**MCP 配置**：HubSpot / Close / Salesforce / Gmail / Slack / Fireflies / Clay / ZoomInfo / Apollo / Similarweb

---

### 3.3 customer-support（客服）

> **解决的问题**：工单积压、响应模板重复、升级流程混乱、客户上下文丢失

**安装**：`claude plugins add knowledge-work-plugins/customer-support`

**Commands：**
- `/triage` — 分类、优先级排序、路由工单
- `/research` — 多源客户问题研究，含置信度评分
- `/draft-response` — 起草客户响应，适配场景和紧急程度
- `/escalate` — 打包升级包给工程/产品/领导
- `/kb-article` — 从已解决问题起草知识库文章

**MCP 配置**：Intercom / Slack / HubSpot / Guru / Jira / Microsoft 365

---

### 3.4 product-management（产品管理）

> **解决的问题**：需求文档散落、路线图不透明、用户反馈收集慢、竞品跟踪耗时

**安装**：`claude plugins add knowledge-work-plugins/product-management`

**Commands：**
- `/write-spec` — 从问题描述生成结构化 PRD/Feature Spec
- `/roadmap-update` — 创建、更新、重新排优先级路线图
- `/stakeholder-update` — 生成面向不同受众的状态更新（高管/工程/客户）
- `/synthesize-research` — 从访谈/调研/工单合成用户研究洞察

**MCP 配置**：Linear / Asana / Monday / ClickUp / Jira / Figma / Notion / Fireflies / Amplitude / Pendo / Similarweb / Intercom / Google Calendar

---

### 3.5 marketing（市场营销）

> **解决的问题**：内容生产慢，品牌不一致、竞品情报分散、效果报告手工

**安装**：`claude plugins add knowledge-work-plugins/marketing`

**Commands：**
- `/draft-content` — 起草博客/社交媒体/邮件通讯/落地页/新闻稿/案例研究
- `/campaign-plan` — 生成完整活动brief
- `/brand-review` — 审核内容是否符合品牌声音
- `/competitive-brief` — 研究竞品，生成定位对比brief
- `/performance-report` — 构建营销效果报告
- `/seo-audit` — 综合 SEO 审计
- `/email-sequence` — 设计和起草多封邮件序列

**Skills：** `content-creation` / `campaign-planning` / `brand-voice` / `competitive-analysis`

**MCP 配置**：Slack / Notion / Canva / Figma / HubSpot / Klaviyo / Ahrefs / Similarweb / Amplitude / Supermetrics

---

### 3.6 legal（法务）

> **解决的问题**：合同版本混乱、NDA 处理慢、合规检查耗时、风险评估不系统

**安装**：`claude plugins add knowledge-work-plugins/legal`

**目标用户**：Commercial Counsel / Product Counsel / Privacy & Compliance / Litigation Support

**⚠️ 免责声明**：不提供法律建议，所有输出需由持证律师审核

**MCP 配置**：Slack / Box / Egnyte / Jira / Microsoft 365 / Gmail / Google Calendar / DocuSign / Atlassian

---

### 3.7 finance（财务）

> **解决的问题**：数据分散、手工对账耗时、财务报表生成慢、审计准备繁杂

**安装**：`claude plugins add knowledge-work-plugins/finance`

**Commands：**
- `/journal-entry` — 生成应计项/固定资产/预付款分录
- `/reconciliation` — GL 与子账/银行对账，识别调节项
- `/income-statement` — 生成 P&L，含期间对比
- `/variance-analysis` — 差异分解，含瀑布图
- `/sox-testing` — SOX 合规测试

**Skills：** `journal-entry-prep` / `reconciliation` / `financial-statements` / `variance-analysis`

**MCP 配置**：Snowflake\* / Databricks\* / BigQuery\* / Slack / Microsoft 365

> \* 标注为 placeholder，MCP URL 尚未配置

---

### 3.8 data（数据分析）

> **解决的问题**：SQL 写不对、数据来源不清、图表需要手动、验证工作重复

**安装**：`claude plugins add knowledge-work-plugins/data`

**两种使用模式**：有数据仓库（直接查询） / 无数据仓库（粘贴 CSV/Excel）

**MCP 配置**：Snowflake / Databricks / BigQuery / Hex / Amplitude / Jira

---

### 3.9 enterprise-search（企业搜索）

> **解决的问题**：信息孤岛、跨工具找东西慢、邮件/文档/聊天分散

**安装**：`claude plugins add knowledge-work-plugins/enterprise-search`

**工作原理**：一次查询同时搜索所有工具，Claude 分解问题，并行搜索，结果综合输出并注明来源。

---

### 3.10 bio-research（生物科研）

> **解决的问题**：文献检索效率低、基因组数据分散、跨数据库查询

**安装**：`claude plugins add knowledge-work-plugins/bio-research`

**10 个 MCP Servers（全部远程 HTTP）：**

| MCP Server | 提供方 |
|-----------|--------|
| PubMed | 美国国家医学图书馆 |
| bioRxiv/medRxiv | deepsense.ai |
| Wiley | 学术出版 |
| Sage Bionetworks (Synapse) | Synapse |
| ChEMBL | deepsense.ai |
| Open Targets | 靶点发现 |
| ClinicalTrials.gov | deepsense.ai |
| BioRender | 科学图表 |
| Owkin | AI 生物学 |
| Benchling | R&D 云平台 |

---

### 3.11 engineering（工程）

> **解决的问题**：站会耗时、代码审查质量不一、事故响应混乱

**安装**：`claude plugins add knowledge-work-plugins/engineering`

**Commands：**
- `/standup` — 从提交/PR/工单/聊天生成站会更新
- `/review` — 代码审查：安全/性能/风格/正确性
- `/debug` — 结构化调试：复现→隔离→诊断→修复
- `/architecture` — ADR 格式架构决策
- `/incident` — 事故响应：分类→沟通→缓解→写复盘
- `/deploy-checklist` — 部署前检查清单

**MCP 配置（9 个）：** Slack / Linear / Asana / Atlassian / Notion / GitHub / PagerDuty / Datadog / Google Calendar / Gmail

---

### 3.12 human-resources（人力资源）

> **解决的问题**：招聘流程慢、新人入职混乱、绩效管理模板化

**安装**：`claude plugins add knowledge-work-plugins/human-resources`

**Commands：**
- `/draft-offer` — 起草 Offer Letter
- `/onboarding` — 生成新人入职清单和第一周计划
- `/performance-review` — 结构化绩效评估
- `/policy-lookup` — 查找公司政策
- `/comp-analysis` — 薪酬数据分析
- `/people-report` — 生成组织健康报告

**MCP 配置：** Slack / Google Calendar / Gmail / Notion / Atlassian / Microsoft 365

---

### 3.13 operations（运营）

> **解决的问题**：供应商管理混乱、流程文档落后、容量规划拍脑袋

**安装**：`claude plugins add knowledge-work-plugins/operations`

**Commands：**
- `/vendor-review` — 评估供应商：成本/风险/合同/续约
- `/process-doc` — 文档化业务流程
- `/change-request` — 创建变更请求
- `/capacity-plan` — 规划资源容量
- `/status-report` — 生成状态报告
- `/runbook` — 创建或更新运营手册

**MCP 配置：** Slack / Google Calendar / Gmail / Notion / Atlassian / Asana / ServiceNow / Microsoft 365

---

### 3.14 pdf-viewer（PDF 查看）

> **解决的问题**：合同审阅需要往返打印、PDF 填写看不到效果、需要合作批注

**安装**：`claude plugins add knowledge-work-plugins/pdf-viewer`

**Commands：**
- `/pdf-viewer:open` — 在交互式查看器中打开 PDF
- `/pdf-viewer:annotate` — 逐步标注
- `/pdf-viewer:fill-form` — 交互式填写 PDF 表单
- `/pdf-viewer:sign` — 放置签名/首字母

**技术实现：** `npx @modelcontextprotocol/server-pdf --stdio`（本地命令）

---

## 四、合作伙伴插件（partner-built）

### 4.1 Apollo

- **功能**：潜在客户勘探、数据丰富、外联序列
- **特点**：一键配置 Apollo MCP Server，无需手动

### 4.2 Brand Voice（Tribe AI）

- **功能**：发现品牌知识 → 创建 LLM 可用的品牌指南 → 验证 AI 生成内容
- **搜索范围**：Confluence, Google Drive, Box, SharePoint, Slack, Gong, Granola

### 4.3 Common Room

- **功能**：账户研究、联系人研究、电话准备、个性化外联、周报
- **数据源**：第一方/第二方/第三意图信号

### 4.4 Slack

- **功能**：搜索消息/文件/用户/频道、发送消息、管理 Canvas

### 4.5 Zoom Plugin

- **功能**：规划/构建/调试 Zoom 集成

---

## 五、插件与工具的对应关系（按业务场景）

> ⚠️ **重要说明**：插件和连接器是**不同层级**的概念，不要混淆：
> - **插件（Plugin）** = 业务能力维度（做什么）
> - **连接器（Connector）** = 具体工具（从哪里获取/操作什么）
>
> 插件通过连接器来获取数据和执行操作，关系如下：

---

### 5.1 业务场景 → 所需工具映射

| 业务场景 | 场景描述 | 所需工具类别 | 具体工具示例 |
|---------|---------|-------------|-------------|
| **productivity** | 任务/日历/工作流/职场记忆 | 聊天 + 任务管理 + 知识库 | Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365 |
| **sales** | 销售勘探/pipeline/外联 | CRM + 通话 + 数据丰富 + 沟通 | HubSpot, Close, Clay, ZoomInfo, Apollo, Slack, Fireflies, Notion |
| **customer-support** | 工单处理/响应/升级 | 工单 + 知识库 + 沟通 | Intercom, HubSpot, Guru, Jira, Slack, Microsoft 365 |
| **product-management** | PRD/路线图/用户研究 | 项目跟踪 + 设计 + 分析工具 | Linear, Asana, Monday, ClickUp, Jira, Figma, Notion |
| **marketing** | 内容/活动/品牌/竞品 | 创意 + CRM + 分析工具 | Canva, Figma, HubSpot, Slack, Notion, Klaviyo |
| **legal** | 合同/NDA/合规/风险 | 文档存储 + 沟通 + 签名 | Box, Egnyte, Slack, Jira, Microsoft 365 |
| **finance** | 日记账/对账/报表/审计 | 数据仓库 + 沟通 | Snowflake, Databricks, BigQuery, Slack |
| **data** | SQL/可视化/仪表板 | 数据仓库 + 分析工具 | Snowflake, Databricks, BigQuery, Hex, Amplitude |
| **enterprise-search** | 跨工具全公司搜索 | 知识库 + 工单 + 沟通 | Notion, Guru, Jira, Slack, Asana, Microsoft 365 |
| **bio-research** | 文献/基因组/靶点 | 学术数据库 + 可视化 | PubMed, BioRxiv, ChEMBL, ClinicalTrials.gov, Benchling |
| **engineering** | 站会/代码审查/事故 | Git + 项目跟踪 + 监控 | GitHub, Linear, Jira, PagerDuty, Datadog, Slack |
| **human-resources** | 招聘/入职/绩效 | 沟通 + 日历 + 知识库 | Slack, Google Calendar, Gmail, Notion, Microsoft 365 |
| **operations** | 供应商/流程/变更 | 任务 + 知识库 + ITSM | Slack, Notion, Asana, ServiceNow, Microsoft 365 |
| **cowork-plugin-management** | 企业自定义插件开发 | — | 无（用于创建新插件）|

---

### 5.2 连接器热度排行榜（按场景覆盖数）

| 排名 | 连接器 | 覆盖场景数 | 被哪些场景使用 |
|------|--------|-----------|---------------|
| 🥇 | **Slack** | 9 | productivity, sales, customer-support, product-management, marketing, legal, finance, enterprise-search, engineering |
| 🥈 | **Notion** | 7 | productivity, sales, marketing, product-management, enterprise-search, human-resources, operations |
| 🥉 | **Jira** | 6 | productivity, sales, customer-support, product-management, legal, data |
| 4 | **Microsoft 365** | 5 | productivity, customer-support, legal, finance, enterprise-search |
| 5 | **Linear** | 3 | productivity, product-management, engineering |
| 5 | **Asana** | 3 | productivity, product-management, enterprise-search |
| 5 | **HubSpot** | 3 | sales, customer-support, marketing |
| 5 | **Gmail/Google Calendar** | 3 | sales, product-management, human-resources |
| 9 | **Snowflake/Databricks/BigQuery** | 2 | finance, data |
| 9 | **Amplitude** | 2 | product-management, marketing, data |
| 9 | **Figma** | 2 | product-management, marketing |
| 9 | **Intercom** | 2 | customer-support, product-management |
| 9 | **Guru** | 2 | customer-support, enterprise-search |

---

### 5.3 工具类型分类速查

| 工具类型 | 连接器列表 | 所属场景 |
|---------|-----------|---------|
| **聊天/协作** | Slack, Microsoft Teams（通过365）| 几乎所有场景 |
| **CRM** | HubSpot, Close, Salesforce | sales |
| **任务/项目管理** | Linear, Asana, Jira, Monday, ClickUp | productivity, pm, engineering |
| **知识库** | Notion, Confluence, Guru | enterprise-search, cs, productivity |
| **日历** | Google Calendar, Microsoft 365 | sales, pm, hr |
| **邮件** | Gmail, Microsoft 365 | sales, hr, operations |
| **数据仓库** | Snowflake, Databricks, BigQuery | finance, data |
| **设计** | Figma, Canva | product-management, marketing |
| **分析** | Amplitude, Pendo, Similarweb | product-management, marketing |
| **文档存储** | Box, Egnyte | legal |
| **通话** | Fireflies, Zoom | sales |
| **数据丰富** | Clay, ZoomInfo, Apollo | sales |
| **学术/科研** | PubMed, BioRxiv, ChEMBL, Benchling | bio-research |
| **监控/告警** | Datadog, PagerDuty | engineering |
| **签名** | DocuSign | legal |
| **ITSM** | ServiceNow | operations |

---

### 5.4 一句话理解插件与连接器的关系

> **插件（Plugin）** = "我要做销售工作"
> **连接器（Connector）** = "销售需要用到这些工具：CRM、邮件、Slack"

插件定义了**业务目标**，连接器提供了**数据来源和操作能力**。两者是**目标与手段**的关系，而非并列关系。

---

*最后更新: 2026-04-23*

---

## 六、安装方法

```bash
# 单个安装
claude plugins add knowledge-work-plugins/productivity
claude plugins add knowledge-work-plugins/sales
claude plugins add knowledge-work-plugins/engineering

# 查看所有可用插件
claude plugins list
```

---

## 七、官方 MCP Server 端点

| MCP Server | URL |
|-----------|-----|
| Slack | `https://mcp.slack.com/mcp` |
| Notion | `https://mcp.notion.com/mcp` |
| Linear | `https://mcp.linear.app/mcp` |
| Asana | `https://mcp.asana.com/v2/mcp` |
| Atlassian | `https://mcp.atlassian.com/v1/mcp` |
| GitHub | `https://api.github.com/mcp` |
| Microsoft 365 | `https://microsoft365.mcp.claude.com/mcp` |
| PubMed | `https://pubmed.mcp.claude.com/mcp` |
| BioRender | `https://mcp.services.biorender.com/mcp` |
| ServiceNow | `https://mcp.servicenow.com/mcp` |
| PagerDuty | `https://mcp.pagerduty.com/mcp` |
| Datadog | `https://mcp.datadoghq.com/mcp` |

---

*最后更新: 2026-04-22*
