import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"5.1 工具系统概述","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/10_工具与Skills系统/10.1_tools_overview.md","filePath":"chapters/10_工具与Skills系统/10.1_tools_overview.md"}'),l={name:"chapters/10_工具与Skills系统/10.1_tools_overview.md"};function e(t,s,h,r,o,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_5-1-工具系统概述" tabindex="-1">5.1 工具系统概述 <a class="header-anchor" href="#_5-1-工具系统概述" aria-label="Permalink to &quot;5.1 工具系统概述&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解工具系统的三层架构</li><li>掌握工具的定义和分类</li><li>了解工具的调用流程</li></ul><hr><h2 id="_5-1-1-三层架构-全景概览" tabindex="-1">5.1.1 三层架构：全景概览 <a class="header-anchor" href="#_5-1-1-三层架构-全景概览" aria-label="Permalink to &quot;5.1.1 三层架构：全景概览&quot;">​</a></h2><p>OpenClaw 的工具和技能体系采用<strong>三层同心圆</strong>架构，由内向外依次为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    OpenClaw 工具与技能三层架构                        │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│                        ┌─────────────┐                              │</span></span>
<span class="line"><span>│                        │  🟡 Layer 3 │                              │</span></span>
<span class="line"><span>│                        │  Knowledge  │  53+ Skills（场景化技能）      │</span></span>
<span class="line"><span>│                        │  Skills     │  办公 · 开发 · 安全 · 生活    │</span></span>
<span class="line"><span>│                        │  53+项技能   │                              │</span></span>
<span class="line"><span>│                        └──────┬──────┘                              │</span></span>
<span class="line"><span>│                               │                                     │</span></span>
<span class="line"><span>│                        ┌──────┴──────┐                              │</span></span>
<span class="line"><span>│                        │  🔵 Layer 2 │                              │</span></span>
<span class="line"><span>│                        │  Advanced   │  17个进阶工具                 │</span></span>
<span class="line"><span>│                        │  进阶层      │  浏览器 · 记忆 · 自动化         │</span></span>
<span class="line"><span>│                        └──────┬──────┘                              │</span></span>
<span class="line"><span>│                               │                                     │</span></span>
<span class="line"><span>│                        ┌──────┴──────┐                              │</span></span>
<span class="line"><span>│                        │  🟠 Layer 1  │                              │</span></span>
<span class="line"><span>│                        │  Core        │  8个核心工具                   │</span></span>
<span class="line"><span>│                        │  核心层      │  文件 · 执行 · 基础网络        │</span></span>
<span class="line"><span>│                        └─────────────┘                              │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│   用户 ──► LLM 推理 ──► 工具调度 ──► 执行 ──► 返回结果              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="三层职责对比" tabindex="-1">三层职责对比 <a class="header-anchor" href="#三层职责对比" aria-label="Permalink to &quot;三层职责对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>层级</th><th>名称</th><th>数量</th><th>性质</th><th>代表工具/技能</th></tr></thead><tbody><tr><td>🟠 Layer 1</td><td><strong>Core（核心层）</strong></td><td>~8个</td><td>原子操作，不可再分</td><td><code>read</code>, <code>write</code>, <code>edit</code>, <code>exec</code></td></tr><tr><td>🔵 Layer 2</td><td><strong>Advanced（进阶层）</strong></td><td>~17个</td><td>复合能力，接口扩展</td><td><code>browser</code>, <code>memory_*</code>, <code>cron</code></td></tr><tr><td>🟡 Layer 3</td><td><strong>Knowledge（知识层）</strong></td><td>53+</td><td>场景封装，生态集成</td><td>笔记、技能市场、自定义Skills</td></tr></tbody></table><blockquote><p><strong>设计思想</strong>：从内到外，工具从&quot;通用原子操作&quot;演进为&quot;具体业务场景&quot;，层层递进。LLM 从核心层获取基础能力，逐层向外扩展，最终触达真实应用场景。</p></blockquote><p>![OpenClaw 三层架构全景图]/assets/diagrams/19_openclaw_three_layer_architecture.jpg)</p><p><strong>图解说明</strong>：</p><ul><li>🟠 <strong>Layer 1 Core</strong>（8个工具）：read / write / edit / exec / process / web_search / web_fetch / apply_patch</li><li>🔵 <strong>Layer 2 Advanced</strong>（17个工具）：browser / image / memory_search / memory_get / canvas / nodes / sessions_list / sessions_send / message / cron / gateway</li><li>🟡 <strong>Layer 3 Knowledge</strong>（53+ Skills）：12大分类 — Notes / Productivity / Chat &amp; Social / Security / Voice / AI / Comms / Lifestyle / System &amp; Utility / Music &amp; Home / Creative / Dev</li></ul><hr><h2 id="_5-1-2-🟠-layer-1-core-核心层" tabindex="-1">5.1.2 🟠 Layer 1：Core 核心层 <a class="header-anchor" href="#_5-1-2-🟠-layer-1-core-核心层" aria-label="Permalink to &quot;5.1.2 🟠 Layer 1：Core 核心层&quot;">​</a></h2><h3 id="定位" tabindex="-1">定位 <a class="header-anchor" href="#定位" aria-label="Permalink to &quot;定位&quot;">​</a></h3><p>系统的基础构建块，提供<strong>最小完备</strong>的原子操作能力。这一层的工具足够让 LLM 完成文件操作、程序执行、基础网络访问，是整个工具系统的基石。</p><h3 id="工具列表" tabindex="-1">工具列表 <a class="header-anchor" href="#工具列表" aria-label="Permalink to &quot;工具列表&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📁 文件操作</span></span>
<span class="line"><span>├── read      ─ 读取文件或目录内容</span></span>
<span class="line"><span>├── write     ─ 写入文件（新建或覆盖）</span></span>
<span class="line"><span>├── edit      ─ 对文件进行精确文本替换编辑</span></span>
<span class="line"><span>└── glob      ─ 按模式搜索文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💻 程序执行</span></span>
<span class="line"><span>├── exec      ─ 执行任意 shell 命令</span></span>
<span class="line"><span>└── process   ─ 管理后台运行进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🌐 基础网络</span></span>
<span class="line"><span>├── web_search  ─ 全网搜索（依赖 Tavily API）</span></span>
<span class="line"><span>└── web_fetch  ─ 抓取单个网页内容</span></span></code></pre></div><h3 id="核心原则" tabindex="-1">核心原则 <a class="header-anchor" href="#核心原则" aria-label="Permalink to &quot;核心原则&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│         为什么 Core 层只需要 8 个工具？        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  1. 最小完备性                              │</span></span>
<span class="line"><span>│     └── 足够完成任何操作，不需要更多         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  2. 正交设计                                │</span></span>
<span class="line"><span>│     └── 每个工具职责单一，不重叠            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  3. 可组合性                                │</span></span>
<span class="line"><span>│     └── 复杂操作 = Core 工具的组合          │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│     例：复制文件 = read + write             │</span></span>
<span class="line"><span>│         批量重命名 = exec + glob           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 读取配置文件</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;~/.openclaw/openclaw.json&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 写入日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">write</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;~/logs/app.log&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> content=&quot;2026-04-05 start&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 精确替换</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;~/config.yaml&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  oldText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;port: 3000&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  newText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;port: 8080&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 执行命令</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> command=&quot;git status&quot;</span></span></code></pre></div><hr><h2 id="_5-1-3-🔵-layer-2-advanced-进阶层" tabindex="-1">5.1.3 🔵 Layer 2：Advanced 进阶层 <a class="header-anchor" href="#_5-1-3-🔵-layer-2-advanced-进阶层" aria-label="Permalink to &quot;5.1.3 🔵 Layer 2：Advanced 进阶层&quot;">​</a></h2><h3 id="定位-1" tabindex="-1">定位 <a class="header-anchor" href="#定位-1" aria-label="Permalink to &quot;定位&quot;">​</a></h3><p>核心层向外延伸的接口，提供<strong>浏览器自动化</strong>、<strong>记忆管理</strong>、<strong>自动化调度</strong>等高级能力。这一层的工具大幅扩展了 LLM 与外部世界交互的边界。</p><h3 id="工具列表-1" tabindex="-1">工具列表 <a class="header-anchor" href="#工具列表-1" aria-label="Permalink to &quot;工具列表&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>🌐 浏览器自动化</span></span>
<span class="line"><span>├── browser   ─ 控制浏览器（截图/点击/填表/抓取）</span></span>
<span class="line"><span>└── canvas    ─ 截取 Canvas 内容（AI 生成图像）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🧠 记忆系统</span></span>
<span class="line"><span>├── memory_search  ─ 语义搜索长期记忆</span></span>
<span class="line"><span>├── memory_get     ─ 读取记忆片段</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔧 会话与任务管理</span></span>
<span class="line"><span>├── sessions_list    ─ 列出所有会话</span></span>
<span class="line"><span>├── sessions_send    ─ 向其他会话发消息</span></span>
<span class="line"><span>├── sessions_history ─ 获取会话历史</span></span>
<span class="line"><span>├── sessions_spawn   ─ 派生子 Agent</span></span>
<span class="line"><span>├── subagents        ─ 管理子 Agent</span></span>
<span class="line"><span>└── cron             ─ 定时任务调度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📱 设备节点</span></span>
<span class="line"><span>├── nodes  ─ 管理配对的移动设备节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⚙️ 系统网关</span></span>
<span class="line"><span>├── gateway  ─ 重启/配置 Gateway</span></span>
<span class="line"><span>└── tts      ─ 文字转语音</span></span></code></pre></div><h3 id="与核心层的区别" tabindex="-1">与核心层的区别 <a class="header-anchor" href="#与核心层的区别" aria-label="Permalink to &quot;与核心层的区别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>Core 层</th><th>Advanced 层</th></tr></thead><tbody><tr><td><strong>复杂度</strong></td><td>原子，单一职责</td><td>复合，多步骤流程</td></tr><tr><td><strong>调用方式</strong></td><td>同步，直达</td><td>异步，状态管理</td></tr><tr><td><strong>外部依赖</strong></td><td>无</td><td>浏览器/MQTT/数据库</td></tr><tr><td><strong>典型场景</strong></td><td>文件读写</td><td>浏览器自动化、记忆检索</td></tr></tbody></table><hr><h2 id="_5-1-4-🟡-layer-3-knowledge-知识层-skills" tabindex="-1">5.1.4 🟡 Layer 3：Knowledge 知识层 / Skills <a class="header-anchor" href="#_5-1-4-🟡-layer-3-knowledge-知识层-skills" aria-label="Permalink to &quot;5.1.4 🟡 Layer 3：Knowledge 知识层 / Skills&quot;">​</a></h2><h3 id="定位-2" tabindex="-1">定位 <a class="header-anchor" href="#定位-2" aria-label="Permalink to &quot;定位&quot;">​</a></h3><p>面向真实业务场景的<strong>技能封装</strong>。Skills = 提示词 + 工具组合 + 工作流模板，用户一键启用专家级能力，无需编写复杂提示词。</p><h3 id="技能分类地图" tabindex="-1">技能分类地图 <a class="header-anchor" href="#技能分类地图" aria-label="Permalink to &quot;技能分类地图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      53+ Skills 技能分类图                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│   📝 办公与协作              💻 开发与创意              🔐 安全与权限   │</span></span>
<span class="line"><span>│   ├── Notes（笔记）         ├── Dev（代码开发）        ├── 密码管理   │</span></span>
<span class="line"><span>│   ├── Product（效率工具）    ├── Creative（创意生成）    ├── 安全审计   │</span></span>
<span class="line"><span>│   └── Chat &amp; Social         └── AI 模型集成            └── 权限配置   │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│   🎵 音乐与家居              📞 通讯与语音              🌐 系统工具   │</span></span>
<span class="line"><span>│   ├── Music &amp; Home          ├── Voice（语音处理）       ├── System    │</span></span>
<span class="line"><span>│   └── IoT 控制               └── 视频会议集成            └── Utility   │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│   🍽️ 生活服务                📊 数据与金融              🤖 AI 能力    │</span></span>
<span class="line"><span>│   ├── 天气                   ├── 股票分析                ├── 多模型调用  │</span></span>
<span class="line"><span>│   ├── 订餐                   ├── 数据可视化              └── RAG 检索  │</span></span>
<span class="line"><span>│   └── 日程安排               └── 量化策略                                 │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="skills-vs-tools-对比" tabindex="-1">Skills vs Tools 对比 <a class="header-anchor" href="#skills-vs-tools-对比" aria-label="Permalink to &quot;Skills vs Tools 对比&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Tools vs Skills 核心区别                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  工具 (Tools)                    技能 (Skills)                 │</span></span>
<span class="line"><span>│  ───────────                    ───────────                    │</span></span>
<span class="line"><span>│  原子操作，不可拆分              能力封装，可组合                 │</span></span>
<span class="line"><span>│  数量：~25个                    数量：53+（持续增长）            │</span></span>
<span class="line"><span>│  系统内置，官方维护              社区贡献，ClawHub 分发           │</span></span>
<span class="line"><span>│  调用快速，无额外开销            加载提示词，有初始化开销          │</span></span>
<span class="line"><span>│  例：read/write/exec            例：代码审查、PPT 生成、选股     │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌───────────────────────────────────────────────────────────┐  │</span></span>
<span class="line"><span>│  │  Skills = 专家提示词 + 工具组合 + 工作流模板              │  │</span></span>
<span class="line"><span>│  │  例：股票七维度分析 Skill                                │  │</span></span>
<span class="line"><span>│  │    ├── 提示词：分析框架、输出格式                        │  │</span></span>
<span class="line"><span>│  │    ├── 工具：web_search + 量化因子 + 宏观数据           │  │</span></span>
<span class="line"><span>│  │    └── 工作流：并行采集 → 整合分析 → 输出报告           │  │</span></span>
<span class="line"><span>│  └───────────────────────────────────────────────────────────┘  │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_5-1-5-三层协同工作流" tabindex="-1">5.1.5 三层协同工作流 <a class="header-anchor" href="#_5-1-5-三层协同工作流" aria-label="Permalink to &quot;5.1.5 三层协同工作流&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户请求：&quot;帮我分析一下苹果公司的投资价值&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>══════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Layer 3 接收请求（Skills 层）</span></span>
<span class="line"><span>  └── 识别需要「股票分析」技能，启动对应 Skill</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ▼ 调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Layer 2 执行支撑（Advanced 层）</span></span>
<span class="line"><span>  ├── memory_search  ─ 检索历史分析记录</span></span>
<span class="line"><span>  ├── web_search     ─ 搜索最新新闻和财报数据</span></span>
<span class="line"><span>  ├── browser        ─ 抓取财报页面</span></span>
<span class="line"><span>  └── cron           ─ 设置价格监控提醒</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ▼ 组合调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Layer 1 完成原子操作（Core 层）</span></span>
<span class="line"><span>  ├── read  ─ 读取本地配置文件</span></span>
<span class="line"><span>  ├── exec  ─ 执行数据分析脚本</span></span>
<span class="line"><span>  └── write ─ 将分析报告写入文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>══════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回：结构化投资分析报告</span></span></code></pre></div><hr><h2 id="_5-1-6-工具定义与元数据" tabindex="-1">5.1.6 工具定义与元数据 <a class="header-anchor" href="#_5-1-6-工具定义与元数据" aria-label="Permalink to &quot;5.1.6 工具定义与元数据&quot;">​</a></h2><h3 id="工具结构" tabindex="-1">工具结构 <a class="header-anchor" href="#工具结构" aria-label="Permalink to &quot;工具结构&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;读取文件或目录内容&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;parameters&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;properties&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;文件或目录路径（绝对或相对路径）&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;limit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;读取行数限制（默认全量）&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;offset&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;起始行号（1-based）&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;required&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="元数据四要素" tabindex="-1">元数据四要素 <a class="header-anchor" href="#元数据四要素" aria-label="Permalink to &quot;元数据四要素&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. name ─ 工具名称，唯一标识</span></span>
<span class="line"><span>2. description ─ 供 LLM 理解用途，详细准确</span></span>
<span class="line"><span>3. parameters ─ 参数定义（类型/描述/必填）</span></span>
<span class="line"><span>4. examples ─ 使用示例，提高调用准确性</span></span></code></pre></div><hr><h2 id="_5-1-7-工具调用流程" tabindex="-1">5.1.7 工具调用流程 <a class="header-anchor" href="#_5-1-7-工具调用流程" aria-label="Permalink to &quot;5.1.7 工具调用流程&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: &quot;帮我读取桌面上的 config.json&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>══════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: LLM 意图分析</span></span>
<span class="line"><span>  - 分析用户请求 → 确定需要调用 read 工具</span></span>
<span class="line"><span>  - 提取参数：path = &quot;~/Desktop/config.json&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 参数验证</span></span>
<span class="line"><span>  - 检查 path 参数是否存在</span></span>
<span class="line"><span>  - 验证参数类型是否正确</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 安全检查</span></span>
<span class="line"><span>  - 权限验证（Profile 配置）</span></span>
<span class="line"><span>  - 路径安全检查</span></span>
<span class="line"><span>  - 危险操作拦截（如 rm -rf）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 4: 工具执行</span></span>
<span class="line"><span>  - 调用 read 函数读取文件</span></span>
<span class="line"><span>  - 处理编码和路径解析</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 5: 结果处理</span></span>
<span class="line"><span>  - 格式化输出</span></span>
<span class="line"><span>  - 添加到上下文</span></span>
<span class="line"><span>  - 继续推理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>══════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回: 文件内容给用户</span></span></code></pre></div><h3 id="错误处理" tabindex="-1">错误处理 <a class="header-anchor" href="#错误处理" aria-label="Permalink to &quot;错误处理&quot;">​</a></h3><table tabindex="0"><thead><tr><th>错误类型</th><th>原因</th><th>解决方案</th></tr></thead><tbody><tr><td>参数错误</td><td>缺少必填参数</td><td>返回提示，重新输入</td></tr><tr><td>执行错误</td><td>文件不存在/权限不足</td><td>检查路径和权限</td></tr><tr><td>超时错误</td><td>执行时间过长</td><td>增加 timeout 配置</td></tr></tbody></table><hr><h2 id="_5-1-8-工具配置与权限" tabindex="-1">5.1.8 工具配置与权限 <a class="header-anchor" href="#_5-1-8-工具配置与权限" aria-label="Permalink to &quot;5.1.8 工具配置与权限&quot;">​</a></h2><h3 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;auto_approve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;timeout&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;max_retries&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="profile-权限控制" tabindex="-1">Profile 权限控制 <a class="header-anchor" href="#profile-权限控制" aria-label="Permalink to &quot;Profile 权限控制&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;profiles&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;developer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;allowed_commands&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;git&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docker&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;readonly&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>三层架构</strong>：Core（8工具）→ Advanced（17工具）→ Knowledge（53+Skills），由内向外层层递进</li><li><strong>Core 核心层</strong>：最小完备的原子操作集，文件/执行/基础网络</li><li><strong>Advanced 进阶层</strong>：浏览器/记忆/自动化，扩展 LLM 交互边界</li><li><strong>Knowledge 知识层</strong>：场景化技能封装，一键启用专家能力</li><li><strong>工具 vs Skills</strong>：工具是原子，Skills 是工作流组合</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>为什么 Core 层设计为 8 个工具而不是更多？</li><li>Skills 层和 Advanced 层的本质区别是什么？</li><li>如果要设计一个&quot;自动生成周报&quot;的 Skill，它需要调用哪些层的工具？</li></ol>`,65)])])}const E=a(l,[["render",e]]);export{c as __pageData,E as default};
