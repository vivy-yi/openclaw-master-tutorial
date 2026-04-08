import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"4.3 OpenAI 配置详解","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/04_模型配置/4.3_openai_config.md","filePath":"chapters/04_模型配置/4.3_openai_config.md"}'),l={name:"chapters/04_模型配置/4.3_openai_config.md"};function t(e,s,h,k,o,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_4-3-openai-配置详解" tabindex="-1">4.3 OpenAI 配置详解 <a class="header-anchor" href="#_4-3-openai-配置详解" aria-label="Permalink to &quot;4.3 OpenAI 配置详解&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握 OpenAI API 配置方法</li><li>理解 GPT 系列模型特性</li><li>完成 OpenAI 接入实战</li></ul><hr><h2 id="_4-3-1-openai-简介" tabindex="-1">4.3.1 OpenAI 简介 <a class="header-anchor" href="#_4-3-1-openai-简介" aria-label="Permalink to &quot;4.3.1 OpenAI 简介&quot;">​</a></h2><h3 id="模型系列" tabindex="-1">模型系列 <a class="header-anchor" href="#模型系列" aria-label="Permalink to &quot;模型系列&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           OpenAI 模型系列                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  GPT-4 系列                                 │</span></span>
<span class="line"><span>│  ├── GPT-4o (最新旗舰)                     │</span></span>
<span class="line"><span>│  │   ├── 综合能力最强                      │</span></span>
<span class="line"><span>│  │   ├── 多模态支持                        │</span></span>
<span class="line"><span>│  │   └── 速度优化                          │</span></span>
<span class="line"><span>│  ├── GPT-4o-mini (性价比)                  │</span></span>
<span class="line"><span>│  │   ├── 价格便宜                          │</span></span>
<span class="line"><span>│  │   ├── 速度最快                          │</span></span>
<span class="line"><span>│  │   └── 适合简单任务                      │</span></span>
<span class="line"><span>│  └── GPT-4 Turbo (旧旗舰)                  │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  o1 系列 (推理模型)                         │</span></span>
<span class="line"><span>│  ├── o1 (完整推理)                        │</span></span>
<span class="line"><span>│  │   ├── 数学                             │</span></span>
<span class="line"><span>│  │   ├── 编程                             │</span></span>
<span class="line"><span>│  │   └── 复杂推理                          │</span></span>
<span class="line"><span>│  └── o1-mini (轻量推理)                    │</span></span>
<span class="line"><span>│      ├── 快速响应                          │</span></span>
<span class="line"><span>│      └── 成本更低                          │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![OpenAI配置]/assets/diagrams/96_openai_config.png)</p><h3 id="价格对比" tabindex="-1">价格对比 <a class="header-anchor" href="#价格对比" aria-label="Permalink to &quot;价格对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模型</th><th>输入</th><th>输出</th><th>适用场景</th></tr></thead><tbody><tr><td>GPT-4o</td><td>$2.50/M</td><td>$10.00/M</td><td>综合能力</td></tr><tr><td>GPT-4o-mini</td><td>$0.15/M</td><td>$0.60/M</td><td>简单任务</td></tr><tr><td>o1</td><td>$15.00/M</td><td>$60.00/M</td><td>复杂推理</td></tr><tr><td>o1-mini</td><td>$3.00/M</td><td>$12.00/M</td><td>快速推理</td></tr></tbody></table><hr><h2 id="_4-3-2-api-获取" tabindex="-1">4.3.2 API 获取 <a class="header-anchor" href="#_4-3-2-api-获取" aria-label="Permalink to &quot;4.3.2 API 获取&quot;">​</a></h2><h3 id="注册-openai-账号" tabindex="-1">注册 OpenAI 账号 <a class="header-anchor" href="#注册-openai-账号" aria-label="Permalink to &quot;注册 OpenAI 账号&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>步骤：</span></span>
<span class="line"><span>1. 访问 platform.openai.com</span></span>
<span class="line"><span>2. 使用邮箱注册</span></span>
<span class="line"><span>3. 完成手机验证</span></span>
<span class="line"><span>4. 添加付款方式（必须）</span></span></code></pre></div><h3 id="创建-api-key" tabindex="-1">创建 API Key <a class="header-anchor" href="#创建-api-key" aria-label="Permalink to &quot;创建 API Key&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>流程：</span></span>
<span class="line"><span>1. 登录 OpenAI 控制台</span></span>
<span class="line"><span>2. 点击「API keys」</span></span>
<span class="line"><span>3. 点击「Create new secret key」</span></span>
<span class="line"><span>4. 设置名称和权限</span></span>
<span class="line"><span>5. 复制并保存（只显示一次！）</span></span></code></pre></div><h3 id="充值方式" tabindex="-1">充值方式 <a class="header-anchor" href="#充值方式" aria-label="Permalink to &quot;充值方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>支持的支付方式：</span></span>
<span class="line"><span>├── 信用卡/借记卡 (Visa, Mastercard, AMEX)</span></span>
<span class="line"><span>├── 支付宝 (中国区)</span></span>
<span class="line"><span>└── 微信支付 (中国区)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：</span></span>
<span class="line"><span>- 首次充值最低 $5</span></span>
<span class="line"><span>- 按用量计费，无月费</span></span>
<span class="line"><span>- 可设置消费上限</span></span></code></pre></div><p>![OpenAI配置]/assets/diagrams/96_openai_config.png)</p><hr><h2 id="_4-3-3-openclaw-配置" tabindex="-1">4.3.3 OpenClaw 配置 <a class="header-anchor" href="#_4-3-3-openclaw-配置" aria-label="Permalink to &quot;4.3.3 OpenClaw 配置&quot;">​</a></h2><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;organization&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;org-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;temperature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4096</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;temperature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4096</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="o1-系列配置" tabindex="-1">o1 系列配置 <a class="header-anchor" href="#o1-系列配置" aria-label="Permalink to &quot;o1 系列配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;o1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;o1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32768</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;reasoning_effort&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;high&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;o1-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;o1-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">65536</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;reasoning_effort&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;medium&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="环境变量方式" tabindex="-1">环境变量方式 <a class="header-anchor" href="#环境变量方式" aria-label="Permalink to &quot;环境变量方式&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：直接设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENAI_API_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：代理（国内访问）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENAI_API_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENAI_BASE_URL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://api.openai.com/v1&quot;</span></span></code></pre></div><h3 id="使用代理-国内" tabindex="-1">使用代理（国内） <a class="header-anchor" href="#使用代理-国内" aria-label="Permalink to &quot;使用代理（国内）&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;base_url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://your-proxy.com/v1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-3-4-模型参数详解" tabindex="-1">4.3.4 模型参数详解 <a class="header-anchor" href="#_4-3-4-模型参数详解" aria-label="Permalink to &quot;4.3.4 模型参数详解&quot;">​</a></h2><h3 id="temperature" tabindex="-1">temperature <a class="header-anchor" href="#temperature" aria-label="Permalink to &quot;temperature&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>temperature 控制输出的随机0.性：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>0 - 确定性输出</span></span>
<span class="line"><span>    ├── 相同输入总是相同输出</span></span>
<span class="line"><span>    └── 适合代码、数学等精确任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>0.7 - 平衡（默认）</span></span>
<span class="line"><span>    ├── 有创意但不离谱</span></span>
<span class="line"><span>    └── 适合一般对话</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1.0+ - 高随机性</span></span>
<span class="line"><span>    ├── 更有创意但可能跑偏</span></span>
<span class="line"><span>    └── 适合创意写作</span></span></code></pre></div><h3 id="max-tokens" tabindex="-1">max_tokens <a class="header-anchor" href="#max-tokens" aria-label="Permalink to &quot;max_tokens&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>max_tokens 控制最大输出长度：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 设置过低：回答被截断</span></span>
<span class="line"><span>- 设置过高：浪费 token</span></span>
<span class="line"><span>- 建议：根据任务调整</span></span>
<span class="line"><span></span></span>
<span class="line"><span>常见设置：</span></span>
<span class="line"><span>- 短回答：512-1024</span></span>
<span class="line"><span>- 中等回答：2048-4096</span></span>
<span class="line"><span>- 长回答：8192-16384</span></span></code></pre></div><h3 id="top-p-nucleus-sampling" tabindex="-1">top_p (nucleus sampling) <a class="header-anchor" href="#top-p-nucleus-sampling" aria-label="Permalink to &quot;top_p (nucleus sampling)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>top_p 控制词汇选择范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- top_p = 1.0：使用全部词汇</span></span>
<span class="line"><span>- top_p = 0.9：使用前 90% 词汇</span></span>
<span class="line"><span>- top_p = 0.1：只使用最高概率词汇</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建议：</span></span>
<span class="line"><span>- 只设置 temperature 或 top_p 一个</span></span>
<span class="line"><span>- 不要同时设置</span></span></code></pre></div><hr><h2 id="_4-3-5-多模态配置" tabindex="-1">4.3.5 多模态配置 <a class="header-anchor" href="#_4-3-5-多模态配置" aria-label="Permalink to &quot;4.3.5 多模态配置&quot;">​</a></h2><h3 id="图像理解" tabindex="-1">图像理解 <a class="header-anchor" href="#图像理解" aria-label="Permalink to &quot;图像理解&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;vision&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;detail&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;high&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="使用方式" tabindex="-1">使用方式 <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：描述这张图片</span></span>
<span class="line"><span>(上传图片)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenClaw 会自动：</span></span>
<span class="line"><span>1. 识别图片内容</span></span>
<span class="line"><span>2. 分析图像特征</span></span>
<span class="line"><span>3. 返回描述</span></span></code></pre></div><hr><h2 id="_4-3-6-常见问题" tabindex="-1">4.3.6 常见问题 <a class="header-anchor" href="#_4-3-6-常见问题" aria-label="Permalink to &quot;4.3.6 常见问题&quot;">​</a></h2><h3 id="q1-账户被限制" tabindex="-1">Q1: 账户被限制 <a class="header-anchor" href="#q1-账户被限制" aria-label="Permalink to &quot;Q1: 账户被限制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Your account has been limited</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原因：</span></span>
<span class="line"><span>- 可疑活动</span></span>
<span class="line"><span>- 欠费</span></span>
<span class="line"><span>- 违反使用政策</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查账户状态</span></span>
<span class="line"><span>2. 联系 support@openai.com</span></span>
<span class="line"><span>3. 提供相关证明</span></span></code></pre></div><h3 id="q2-速率限制" tabindex="-1">Q2: 速率限制 <a class="header-anchor" href="#q2-速率限制" aria-label="Permalink to &quot;Q2: 速率限制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Rate limit exceeded</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 等待后重试</span></span>
<span class="line"><span>2. 使用 o1-mini 等小模型</span></span>
<span class="line"><span>3. 增加缓存</span></span>
<span class="line"><span>4. 升级付费套餐</span></span></code></pre></div><h3 id="q3-余额不足" tabindex="-1">Q3: 余额不足 <a class="header-anchor" href="#q3-余额不足" aria-label="Permalink to &quot;Q3: 余额不足&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：insufficient_quota</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 登录控制台</span></span>
<span class="line"><span>2. 点击「Billing」→「Payment methods」</span></span>
<span class="line"><span>3. 添加支付方式或充值</span></span></code></pre></div><h3 id="q4-国内无法访问" tabindex="-1">Q4: 国内无法访问 <a class="header-anchor" href="#q4-国内无法访问" aria-label="Permalink to &quot;Q4: 国内无法访问&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>解决：</span></span>
<span class="line"><span>1. 使用代理服务</span></span>
<span class="line"><span>2. 使用 OpenRouter 转发</span></span>
<span class="line"><span>3. 使用国内模型替代</span></span></code></pre></div><hr><h2 id="_4-3-7-实战练习" tabindex="-1">4.3.7 实战练习 <a class="header-anchor" href="#_4-3-7-实战练习" aria-label="Permalink to &quot;4.3.7 实战练习&quot;">​</a></h2><h3 id="练习一-基础配置" tabindex="-1">练习一：基础配置 <a class="header-anchor" href="#练习一-基础配置" aria-label="Permalink to &quot;练习一：基础配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 注册 OpenAI 账号</span></span>
<span class="line"><span>2. 创建 API Key</span></span>
<span class="line"><span>3. 配置到 OpenClaw</span></span>
<span class="line"><span>4. 测试对话</span></span></code></pre></div><h3 id="练习二-切换模型" tabindex="-1">练习二：切换模型 <a class="header-anchor" href="#练习二-切换模型" aria-label="Permalink to &quot;练习二：切换模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 配置 gpt-4o 和 gpt-4o-mini</span></span>
<span class="line"><span>2. 尝试相同问题</span></span>
<span class="line"><span>3. 对比回答质量</span></span>
<span class="line"><span>4. 观察响应时间</span></span></code></pre></div><h3 id="练习三-o1-模型" tabindex="-1">练习三：o1 模型 <a class="header-anchor" href="#练习三-o1-模型" aria-label="Permalink to &quot;练习三：o1 模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 配置 o1 模型</span></span>
<span class="line"><span>2. 尝试数学问题</span></span>
<span class="line"><span>3. 观察推理过程</span></span>
<span class="line"><span>4. 对比 GPT-4o</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>GPT-4o</strong>：综合能力最强，多模态支持</li><li><strong>GPT-4o-mini</strong>：性价比最高，适合简单任务</li><li><strong>o1 系列</strong>：推理能力强，适合复杂任务</li><li><strong>代理</strong>：国内使用需要配置代理</li><li><strong>参数</strong>：temperature、max_tokens 合理设置</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>什么时候选择 GPT-4o 而不是 o1？</li><li>如何优化 API 调用成本？</li><li>国内如何稳定使用 OpenAI？</li></ol>`,67)])])}const E=a(l,[["render",t]]);export{c as __pageData,E as default};
