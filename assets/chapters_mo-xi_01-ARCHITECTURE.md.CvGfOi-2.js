import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"墨析架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/mo-xi/01-ARCHITECTURE.md","filePath":"chapters/mo-xi/01-ARCHITECTURE.md"}'),l={name:"chapters/mo-xi/01-ARCHITECTURE.md"};function t(e,s,h,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="墨析架构设计" tabindex="-1">墨析架构设计 <a class="header-anchor" href="#墨析架构设计" aria-label="Permalink to &quot;墨析架构设计&quot;">​</a></h1><h2 id="一、整体架构" tabindex="-1">一、整体架构 <a class="header-anchor" href="#一、整体架构" aria-label="Permalink to &quot;一、整体架构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    墨析 Agent                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  SOUL.md ── 定位/理念/职责                      │</span></span>
<span class="line"><span>│  SKILL.md ─ 自适应 Skills 框架                   │</span></span>
<span class="line"><span>│  TOOLS.md ─ CDP 工具配置                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  知识库 (knowledge_base/)                       │</span></span>
<span class="line"><span>│  ├── platforms/ ── 平台学习记录                │</span></span>
<span class="line"><span>│  ├── api_endpoints/ ─ API 接口库               │</span></span>
<span class="line"><span>│  └── type_patterns/ ── 类型模式                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  数据 (collected_data/)                         │</span></span>
<span class="line"><span>│  ├── trending/ ── 热门数据                      │</span></span>
<span class="line"><span>│  ├── search/ ── 搜索结果                        │</span></span>
<span class="line"><span>│  └── products/ ── 商品数据                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│         OpenClaw browser tool (CDP)              │</span></span>
<span class="line"><span>│  open / snapshot / intercept / evaluate / act    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="二、核心组件" tabindex="-1">二、核心组件 <a class="header-anchor" href="#二、核心组件" aria-label="Permalink to &quot;二、核心组件&quot;">​</a></h2><h3 id="_1-soul-md-角色定义" tabindex="-1">1. SOUL.md - 角色定义 <a class="header-anchor" href="#_1-soul-md-角色定义" aria-label="Permalink to &quot;1. SOUL.md - 角色定义&quot;">​</a></h3><p>定义墨析的核心理念和职责：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 核心理念</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CDP 原生自适应 - 只使用 OpenClaw 原生 CDP 浏览器协议</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 核心职责</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 自适应采集 - 零预配置，自动探索任意网站</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 自我进化 - 学习后记录方法，下次直接复用</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 全链路覆盖 - 公开数据 + 用户画像 + 竞品监控</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CDP 原生 - 不依赖任何第三方工具</span></span></code></pre></div><h3 id="_2-skill-md-自适应框架" tabindex="-1">2. SKILL.md - 自适应框架 <a class="header-anchor" href="#_2-skill-md-自适应框架" aria-label="Permalink to &quot;2. SKILL.md - 自适应框架&quot;">​</a></h3><p>定义自适应采集的核心逻辑：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 自适应采集工作流</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">用户请求 → URL识别 → CDP探索 → 自适应采集 → 数据标准化 → 自我学习</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 降级策略</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">API直连 → CDP DOM → Screenshot</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 学习机制</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">首次探索 → 记录方法 → 知识库 → 后续复用</span></span></code></pre></div><h3 id="_3-tools-md-工具配置" tabindex="-1">3. TOOLS.md - 工具配置 <a class="header-anchor" href="#_3-tools-md-工具配置" aria-label="Permalink to &quot;3. TOOLS.md - 工具配置&quot;">​</a></h3><p>定义 CDP 工具的使用方式：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 核心工具</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">browser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">CDP 浏览器控制，核心采集工具</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 工具动作</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">browser.open(url)</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 打开页面</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">browser.snapshot()</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 分析结构</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">browser.intercept()</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 拦截 API</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">browser.evaluate(js)</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     # 执行 JS</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">browser.screenshot()</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 截图验证</span></span></code></pre></div><hr><h2 id="三、数据流" tabindex="-1">三、数据流 <a class="header-anchor" href="#三、数据流" aria-label="Permalink to &quot;三、数据流&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户请求</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 1. 理解意图                           │</span></span>
<span class="line"><span>│    &quot;采集知乎热榜&quot; → 采集任务          │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 2. URL 识别                          │</span></span>
<span class="line"><span>│    zhihu.com → 识别为内容平台        │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 3. 知识库查询                         │</span></span>
<span class="line"><span>│    已学习？→ 直接复用                 │</span></span>
<span class="line"><span>│    未学习？→ CDP 探索                 │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 4. CDP 自适应采集                     │</span></span>
<span class="line"><span>│    优先: API 直连                     │</span></span>
<span class="line"><span>│    降级: CDP DOM → Screenshot        │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 5. 数据标准化                         │</span></span>
<span class="line"><span>│    → JSON 格式化                     │</span></span>
<span class="line"><span>│    → 存储到 collected_data/           │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>┌──────────────────────────────────────┐</span></span>
<span class="line"><span>│ 6. 自我学习（可选）                   │</span></span>
<span class="line"><span>│    → 记录成功的采集方法               │</span></span>
<span class="line"><span>│    → 更新 knowledge_base/             │</span></span>
<span class="line"><span>└──────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="四、知识库结构" tabindex="-1">四、知识库结构 <a class="header-anchor" href="#四、知识库结构" aria-label="Permalink to &quot;四、知识库结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>knowledge_base/</span></span>
<span class="line"><span>├── platforms/                    # 平台学习记录</span></span>
<span class="line"><span>│   ├── weibo.json</span></span>
<span class="line"><span>│   ├── zhihu.json</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── api_endpoints/               # API 接口库</span></span>
<span class="line"><span>│   ├── weibo_hot.json</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── type_patterns/               # 类型模式</span></span>
<span class="line"><span>    ├── ecommerce.json</span></span>
<span class="line"><span>    ├── social.json</span></span>
<span class="line"><span>    └── ...</span></span></code></pre></div><h3 id="平台记录格式" tabindex="-1">平台记录格式 <a class="header-anchor" href="#平台记录格式" aria-label="Permalink to &quot;平台记录格式&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;platform&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;weibo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;url_pattern&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;weibo.com/*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;social&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;discovered&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;热搜&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;API&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;endpoint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;weibo.com/ajax/side/hotSearch&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;auth_required&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;采集记录&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;timestamp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2026-04-04T05:00:00Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;success&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;duration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2300</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;confidence&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.95</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;采集次数&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="五、与传统方案的对比" tabindex="-1">五、与传统方案的对比 <a class="header-anchor" href="#五、与传统方案的对比" aria-label="Permalink to &quot;五、与传统方案的对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>维度</th><th>传统方案</th><th>墨析</th></tr></thead><tbody><tr><td><strong>依赖</strong></td><td>opencli/第三方 CLI</td><td>零依赖</td></tr><tr><td><strong>平台</strong></td><td>预配置 73+</td><td>任意网站</td></tr><tr><td><strong>采集逻辑</strong></td><td>固定</td><td>自动探索</td></tr><tr><td><strong>维护</strong></td><td>人工更新</td><td>自我学习</td></tr><tr><td><strong>灵活性</strong></td><td>受限</td><td>完全自适应</td></tr></tbody></table><hr><h2 id="六、技术栈" tabindex="-1">六、技术栈 <a class="header-anchor" href="#六、技术栈" aria-label="Permalink to &quot;六、技术栈&quot;">​</a></h2><ul><li><strong>Agent</strong>: OpenClaw 原生 Agent</li><li><strong>采集</strong>: OpenClaw browser tool (CDP)</li><li><strong>存储</strong>: 本地文件系统 JSON</li><li><strong>定时</strong>: OpenClaw Cron</li><li><strong>通知</strong>: OpenClaw message</li></ul>`,28)])])}const E=a(l,[["render",t]]);export{c as __pageData,E as default};
