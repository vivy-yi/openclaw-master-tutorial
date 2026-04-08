import{_ as s,o as n,c as p,ae as l}from"./chunks/framework.Czhw_PXq.js";const u=JSON.parse('{"title":"1.1 OpenClaw 发展历史与诞生背景","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/01_认识openclaw/1.1_history.md","filePath":"chapters/01_认识openclaw/1.1_history.md"}'),e={name:"chapters/01_认识openclaw/1.1_history.md"};function i(t,a,c,o,h,r){return n(),p("div",null,[...a[0]||(a[0]=[l(`<h1 id="_1-1-openclaw-发展历史与诞生背景" tabindex="-1">1.1 OpenClaw 发展历史与诞生背景 <a class="header-anchor" href="#_1-1-openclaw-发展历史与诞生背景" aria-label="Permalink to &quot;1.1 OpenClaw 发展历史与诞生背景&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解大语言模型向智能体演进的必然趋势</li><li>了解 OpenClaw 的诞生背景与核心理念</li><li>掌握 OpenClaw 的定位与解决机制</li></ul><hr><h2 id="_1-1-1-什么是-openclaw" tabindex="-1">1.1.1 什么是 OpenClaw <a class="header-anchor" href="#_1-1-1-什么是-openclaw" aria-label="Permalink to &quot;1.1.1 什么是 OpenClaw&quot;">​</a></h2><p>想象一下：你招了一个实习生，这个实习生特别聪明，能帮你查资料，写文档、整理数据，还能 24 小时在线。</p><p><strong>OpenClaw 就是这个实习生</strong>，只不过它住在你的电脑里。更准确地说：<strong>OpenClaw 是一个自我驱动型智能体</strong>，可以安装在本地电脑或服务器上，让它接入并使用各种工具（比如日历、邮件、对话窗口）。</p><h3 id="openclaw-能帮你做什么" tabindex="-1">OpenClaw 能帮你做什么？ <a class="header-anchor" href="#openclaw-能帮你做什么" aria-label="Permalink to &quot;OpenClaw 能帮你做什么？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📧 自动整理日报</span></span>
<span class="line"><span>   从项目群提取关键进展，按格式生成日报发到指定文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔍 查资料写报告</span></span>
<span class="line"><span>   访问多个网页提取信息，整理成带数据来源的结构化表格</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💬 群聊里办事</span></span>
<span class="line"><span>   在群聊里&quot;@&quot;机器人，让它帮忙把收到的 PDF 总结为一份报告并发回群里</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📅 日程管理</span></span>
<span class="line"><span>   自动检查日历，发送会议提醒，整理会议纪要</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔄 自动化工作流</span></span>
<span class="line"><span>   定时执行任务，如每日数据汇总、监控告警</span></span></code></pre></div><h3 id="一个真实的例子" tabindex="-1">一个真实的例子 <a class="header-anchor" href="#一个真实的例子" aria-label="Permalink to &quot;一个真实的例子&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>场景：每天早上的日常</span></span>
<span class="line"><span></span></span>
<span class="line"><span>没有 OpenClaw：</span></span>
<span class="line"><span>☀️ 早上起床</span></span>
<span class="line"><span>📱 打开手机查看邮件</span></span>
<span class="line"><span>📅 打开日历查看今日安排</span></span>
<span class="line"><span>💼 开始处理工作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>有了 OpenClaw：</span></span>
<span class="line"><span>☀️ 起床收到飞书消息：</span></span>
<span class="line"><span>   &quot;早安！今天有3件事：</span></span>
<span class="line"><span>   - 9:00 团队站会</span></span>
<span class="line"><span>   - 14:00 产品评审会</span></span>
<span class="line"><span>   - 客户张先生邮件需要今天回复</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   我已经帮你整理了客户邮件要点，评审会数据也准备好了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   记得带伞，今天有雨。🌧️&quot;</span></span></code></pre></div><hr><h2 id="_1-1-2-大模型演进的必然与工程痛点" tabindex="-1">1.1.2 大模型演进的必然与工程痛点 <a class="header-anchor" href="#_1-1-2-大模型演进的必然与工程痛点" aria-label="Permalink to &quot;1.1.2 大模型演进的必然与工程痛点&quot;">​</a></h2><h3 id="ai-的演进历程" tabindex="-1">AI 的演进历程 <a class="header-anchor" href="#ai-的演进历程" aria-label="Permalink to &quot;AI 的演进历程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         AI 交互范式演进                              │</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                      │</span></span>
<span class="line"><span>│  1.0 时代：规则系统                                                 │</span></span>
<span class="line"><span>│     └── 预设规则，精确匹配                                           │</span></span>
<span class="line"><span>│     └── 客服机器人、IVR语音导航                                      │</span></span>
<span class="line"><span>│                                                                      │</span></span>
<span class="line"><span>│  2.0 时代：大语言模型                                               │</span></span>
<span class="line"><span>│     └── 自然语言理解，生成式回答                                       │</span></span>
<span class="line"><span>│     └── ChatGPT、Claude、文心一言                                    │</span></span>
<span class="line"><span>│                                                                      │</span></span>
<span class="line"><span>│  3.0 时代：AI 智能体 ⭐                                             │</span></span>
<span class="line"><span>│     └── 理解 + 规划 + 执行                                           │</span></span>
<span class="line"><span>│     └── OpenClaw、AutoGPT、CrewAI                                   │</span></span>
<span class="line"><span>│                                                                      │</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![发展历史]/assets/diagrams/15_comparison_timeline.png)</p><h3 id="三大工程痛点" tabindex="-1">三大工程痛点 <a class="header-anchor" href="#三大工程痛点" aria-label="Permalink to &quot;三大工程痛点&quot;">​</a></h3><p>随着大语言模型能力跃升，交互范式正发生深刻变革。当智能体真正接管业务流程时，传统架构捉襟见肘，面临三大核心挑战：</p><h4 id="挑战一-状态管理的爆炸" tabindex="-1">挑战一：状态管理的爆炸 <a class="header-anchor" href="#挑战一-状态管理的爆炸" aria-label="Permalink to &quot;挑战一：状态管理的爆炸&quot;">​</a></h4><p>在多步复杂任务（如查询、分析并调用写入接口）中，多轮对话与工具调用会产生海量上下文碎片。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>举例：需要十余次 API 调用的业务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>问题：</span></span>
<span class="line"><span>├── 返回数据极易超出模型的上下文限制</span></span>
<span class="line"><span>├── 早期指导信息丢失</span></span>
<span class="line"><span>└── 模型产生事实性错误或行为&quot;幻觉&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>真实案例：</span></span>
<span class="line"><span>智能体在多轮对话后忽视了&quot;禁止删除数据&quot;的指令，</span></span>
<span class="line"><span>清空了用户的邮箱...</span></span></code></pre></div><h4 id="挑战二-权限与边界的失控" tabindex="-1">挑战二：权限与边界的失控 <a class="header-anchor" href="#挑战二-权限与边界的失控" aria-label="Permalink to &quot;挑战二：权限与边界的失控&quot;">​</a></h4><p>赋予大语言模型调用业务底层 API 的能力带来了极大安全风险。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：</span></span>
<span class="line"><span>├── 没有强大的拦截机制</span></span>
<span class="line"><span>├── 不可测的模型输出可能转化为破坏性操作</span></span>
<span class="line"><span>├── 错误触发数据库的写入指令</span></span>
<span class="line"><span>└── 跨租户访问敏感情报</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如何精细化控制各指令在不同渠道的执行权限，</span></span>
<span class="line"><span>成为走向生产的绊脚石</span></span></code></pre></div><h4 id="挑战三-可观测与降级能力的缺失" tabindex="-1">挑战三：可观测与降级能力的缺失 <a class="header-anchor" href="#挑战三-可观测与降级能力的缺失" aria-label="Permalink to &quot;挑战三：可观测与降级能力的缺失&quot;">​</a></h4><p>真实的业务充满了诸如网络抖动或接口超时等不可控因素。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：</span></span>
<span class="line"><span>├── 长流程任务卡在某一环节时，系统缺乏清晰执行日志</span></span>
<span class="line"><span>├── 没有重试机制和回退策略</span></span>
<span class="line"><span>├── 服务如无法排障的黑箱</span></span>
<span class="line"><span>└── 开发者难以定位错误节点，无法有效人工介入</span></span></code></pre></div><hr><h2 id="_1-1-3-核心定位与解决机制" tabindex="-1">1.1.3 核心定位与解决机制 <a class="header-anchor" href="#_1-1-3-核心定位与解决机制" aria-label="Permalink to &quot;1.1.3 核心定位与解决机制&quot;">​</a></h2><h3 id="openclaw-的定位" tabindex="-1">OpenClaw 的定位 <a class="header-anchor" href="#openclaw-的定位" aria-label="Permalink to &quot;OpenClaw 的定位&quot;">​</a></h3><p>在传统的业务架构中，引入大模型能力往往需要在核心业务代码中穿插编写大量逻辑，用于处理复杂上下文拼接、API 回调解析与流程异常。</p><p><strong>OpenClaw 将自身定位为一个独立的&quot;执行域&quot;</strong>，剥离业务逻辑与智能体调度，主动接管繁杂的状态组装、模型调度、重试回退等底层工作，具备以下基础能力：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     OpenClaw 核心能力                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  🏠 私有化部署                                               │</span></span>
<span class="line"><span>│     └── 数据完全保存在本地，不经过第三方                        │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  🌐 多渠道接入                                               │</span></span>
<span class="line"><span>│     └── 飞书、企业微信、Telegram、Discord...                │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  🤖 多智能体支持                                             │</span></span>
<span class="line"><span>│     └── 可配置多个 Agent，处理不同任务                        │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><table tabindex="0"><thead><tr><th>挑战</th><th>OpenClaw 解决方案</th><th>技术实现</th></tr></thead><tbody><tr><td>状态管理爆炸</td><td>独立状态机</td><td>上下文裁剪摘要 + 阶梯式重试补偿</td></tr><tr><td>权限边界失控</td><td>配置沙箱</td><td>Profile 策略 + 网关拦截</td></tr><tr><td>可观测性缺失</td><td>执行栈追踪</td><td>详细日志 + 失败保留现场</td></tr></tbody></table><hr><h2 id="_1-1-4-适用场景与能力边界" tabindex="-1">1.1.4 适用场景与能力边界 <a class="header-anchor" href="#_1-1-4-适用场景与能力边界" aria-label="Permalink to &quot;1.1.4 适用场景与能力边界&quot;">​</a></h2><h3 id="典型适用场景" tabindex="-1">典型适用场景 <a class="header-anchor" href="#典型适用场景" aria-label="Permalink to &quot;典型适用场景&quot;">​</a></h3><p>OpenClaw 的架构设计决定了它适合处理<strong>状态分布相对松散、执行链条较长、且业务本身具备明确容错空间</strong>的异步型任务。</p><h4 id="场景一-多渠道一致助理" tabindex="-1">场景一：多渠道一致助理 <a class="header-anchor" href="#场景一-多渠道一致助理" aria-label="Permalink to &quot;场景一：多渠道一致助理&quot;">​</a></h4><p>在多端同时接入单一智能体，提供一致的知识与服务。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>示例：电商售后智能体</span></span>
<span class="line"><span>├── 同时接入 WhatsApp、Telegram 和官网 Web 插件</span></span>
<span class="line"><span>├── 根据私有知识库解答退换货政策</span></span>
<span class="line"><span>└── 自动调用内部 Jira 或 Zendesk API 提交售后工单</span></span></code></pre></div><h4 id="场景二-带权限防护的内部流转工具链" tabindex="-1">场景二：带权限防护的内部流转工具链 <a class="header-anchor" href="#场景二-带权限防护的内部流转工具链" aria-label="Permalink to &quot;场景二：带权限防护的内部流转工具链&quot;">​</a></h4><p>连接内部知识库及基础设施流转链。在安全策略防护下，允许授权用户通过自然语言安全触发配置拉取与审核检查操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>示例：Slack 研发助手</span></span>
<span class="line"><span>├── 普通研发人员询问&quot;帮我查看预发环境的最新发布状态&quot;</span></span>
<span class="line"><span>├── 智能体通过 GitLab 和 Kubernetes 插件读取日志并总结返回</span></span>
<span class="line"><span>└── 如果模型产生幻觉试图执行危险命令，网关会严格拦截</span></span></code></pre></div><h4 id="场景三-长生命周期的异步跟进" tabindex="-1">场景三：长生命周期的异步跟进 <a class="header-anchor" href="#场景三-长生命周期的异步跟进" aria-label="Permalink to &quot;场景三：长生命周期的异步跟进&quot;">​</a></h4><p>系统能将等待外部依赖的任务置于&quot;挂起&quot;状态。当外部处理完成并触发回调时，事件网关唤醒智能体继续前置任务的回溯。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>示例：自动代码审查智能体</span></span>
<span class="line"><span>├── 代码提交时，触发第三方静态安全扫描任务（可能耗时 30 分钟）</span></span>
<span class="line"><span>├── 智能体主动挂起释放资源</span></span>
<span class="line"><span>├── 30 分钟后扫描平台通过 Webhook 返回结果</span></span>
<span class="line"><span>└── OpenClaw 唤醒智能体，在 PR 页面自动生成评审建议</span></span></code></pre></div><h3 id="不适用或需谨慎的场景" tabindex="-1">不适用或需谨慎的场景 <a class="header-anchor" href="#不适用或需谨慎的场景" aria-label="Permalink to &quot;不适用或需谨慎的场景&quot;">​</a></h3><ul><li><strong>强一致性核心状态写入</strong> - OpenClaw 基于概率与生成反馈机制，关键写入必须由专有业务服务最终校验</li><li><strong>毫秒级硬实时控制</strong> - 受到大模型推理首字延迟及多轮通讯开销影响，无法满足工业自动化控制等绝对响应时间要求</li></ul><hr><h2 id="_1-1-5-openclaw-的发展历程" tabindex="-1">1.1.5 OpenClaw 的发展历程 <a class="header-anchor" href="#_1-1-5-openclaw-的发展历程" aria-label="Permalink to &quot;1.1.5 OpenClaw 的发展历程&quot;">​</a></h2><h3 id="时间线" tabindex="-1">时间线 <a class="header-anchor" href="#时间线" aria-label="Permalink to &quot;时间线&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2024年 ─────────────────────────────────────────────────▶</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └── 项目启动</span></span>
<span class="line"><span>        Peter Steinberger 创建项目，最初名为 Clawdbot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2025年11月 ─────────────────────────────────────────────▶</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └── 开源发布</span></span>
<span class="line"><span>        ├── 项目开源，迅速获得关注</span></span>
<span class="line"><span>        ├── 一周内获得 100,000+ Stars</span></span>
<span class="line"><span>        └── 成为 GitHub 历史上增长最快的开源项目</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2025年 ─────────────────────────────────────────────────▶</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └── 正式更名</span></span>
<span class="line"><span>        Clawdbot → Moltbot → OpenClaw</span></span>
<span class="line"><span>        功能不断完善，生态系统逐步建立</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2026年 ─────────────────────────────────────────────────▶</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └── 生态繁荣</span></span>
<span class="line"><span>        ├── 1800+ Skills</span></span>
<span class="line"><span>        ├── 30+ 渠道支持</span></span>
<span class="line"><span>        ├── 30+ 模型提供商</span></span>
<span class="line"><span>        └── 全球开发者社区活跃</span></span></code></pre></div><h3 id="为什么叫-openclaw" tabindex="-1">为什么叫 OpenClaw？ <a class="header-anchor" href="#为什么叫-openclaw" aria-label="Permalink to &quot;为什么叫 OpenClaw？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Claw = 爪子、抓手</span></span>
<span class="line"><span>     └── 象征着&quot;抓住&quot;信息、执行任务的能力</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Open = 开放</span></span>
<span class="line"><span>     └── 开源、开放生态、开放架构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenClaw = 开放的智能抓手</span></span>
<span class="line"><span>          └── 帮助用户抓取信息、完成任务</span></span></code></pre></div><hr><h2 id="_1-1-6-核心特性一览" tabindex="-1">1.1.6 核心特性一览 <a class="header-anchor" href="#_1-1-6-核心特性一览" aria-label="Permalink to &quot;1.1.6 核心特性一览&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        OpenClaw 核心特性                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  🎯 智能任务执行                                                   │</span></span>
<span class="line"><span>│     ├── 理解自然语言指令                                           │</span></span>
<span class="line"><span>│     ├── 自动规划执行步骤                                           │</span></span>
<span class="line"><span>│     └── 调用多种工具完成任务                                       │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  🔌 丰富的工具生态                                                 │</span></span>
<span class="line"><span>│     ├── 1800+ Skills (即装即用)                                   │</span></span>
<span class="line"><span>│     ├── 30+ 渠道支持 (飞书/Telegram/Discord...)                  │</span></span>
<span class="line"><span>│     └── 30+ 模型提供商 (OpenAI/Claude/DeepSeek...)              │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  🛡️ 企业级安全                                                    │</span></span>
<span class="line"><span>│     ├── Profile 权限控制                                           │</span></span>
<span class="line"><span>│     ├── 沙箱执行环境                                               │</span></span>
<span class="line"><span>│     └── 完整审计日志                                               │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  🔄 持久记忆                                                       │</span></span>
<span class="line"><span>│     ├── 短期会话记忆                                               │</span></span>
<span class="line"><span>│     ├── 长期偏好记忆                                               │</span></span>
<span class="line"><span>│     └── 上下文压缩                                                 │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>OpenClaw 是自我驱动型智能体</strong>，可以安装在本地电脑或服务器上，帮你完成各种任务</li><li><strong>三大工程痛点</strong>：状态管理爆炸、权限边界失控、可观测性缺失</li><li><strong>解决机制</strong>：状态机保障完成性、配置沙箱保障可控性，执行栈追踪保障可运维性</li><li><strong>适用场景</strong>：多渠道助理、内部工具链、长周期异步任务</li><li><strong>不适用场景</strong>：强一致性写入、毫秒级实时控制</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你希望 OpenClaw 帮你解决哪些具体问题？</li><li>现有的 AI 工具（如 ChatGPT）有哪些痛点是 OpenClaw 可以解决的？</li><li>你认为 OpenClaw 的哪些特性对你的业务最有价值？</li></ol>`,65)])])}const b=s(e,[["render",i]]);export{u as __pageData,b as default};
