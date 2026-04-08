import{_ as a,o as n,c as i,ae as e}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"4.2 DeepSeek 配置详解","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/04_模型配置/4.2_deepseek_config.md","filePath":"chapters/04_模型配置/4.2_deepseek_config.md"}'),p={name:"chapters/04_模型配置/4.2_deepseek_config.md"};function l(t,s,h,k,o,d){return n(),i("div",null,[...s[0]||(s[0]=[e(`<h1 id="_4-2-deepseek-配置详解" tabindex="-1">4.2 DeepSeek 配置详解 <a class="header-anchor" href="#_4-2-deepseek-配置详解" aria-label="Permalink to &quot;4.2 DeepSeek 配置详解&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握 DeepSeek API 配置方法</li><li>理解 DeepSeek 模型特性</li><li>完成 DeepSeek 接入实战</li></ul><hr><h2 id="_4-2-1-deepseek-简介" tabindex="-1">4.2.1 DeepSeek 简介 <a class="header-anchor" href="#_4-2-1-deepseek-简介" aria-label="Permalink to &quot;4.2.1 DeepSeek 简介&quot;">​</a></h2><h3 id="为什么选择-deepseek" tabindex="-1">为什么选择 DeepSeek <a class="header-anchor" href="#为什么选择-deepseek" aria-label="Permalink to &quot;为什么选择 DeepSeek&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           DeepSeek 优势                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  🏆 性价比之王 ⭐                             │</span></span>
<span class="line"><span>│  ├── 输入: $0.27/M tokens                  │</span></span>
<span class="line"><span>│  ├── 输出: $1.10/M tokens                  │</span></span>
<span class="line"><span>│  └── 约为 GPT-4 的 1/10 成本                 │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  🔥 推理能力强                               │</span></span>
<span class="line"><span>│  ├── DeepSeek V3: 全面升级                  │</span></span>
<span class="line"><span>│  ├── DeepSeek Coder: 编程专用               │</span></span>
<span class="line"><span>│  └── 开源模型可本地部署                      │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  🌐 生态完善                                 │</span></span>
<span class="line"><span>│  ├── OpenRouter 集成                        │</span></span>
<span class="line"><span>│  ├── Ollama 本地部署                         │</span></span>
<span class="line"><span>│  └── 官方 API 稳定                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![DeepSeek配置]/assets/diagrams/41_deepseek_config.png)</p><h3 id="支持的模型" tabindex="-1">支持的模型 <a class="header-anchor" href="#支持的模型" aria-label="Permalink to &quot;支持的模型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模型</th><th>用途</th><th>上下文</th><th>特点</th></tr></thead><tbody><tr><td>DeepSeek V3</td><td>综合</td><td>64K</td><td>最新旗舰</td></tr><tr><td>DeepSeek Chat</td><td>对话</td><td>64K</td><td>通用对话</td></tr><tr><td>DeepSeek Coder</td><td>编程</td><td>16K</td><td>代码专用</td></tr></tbody></table><hr><h2 id="_4-2-2-api-获取" tabindex="-1">4.2.2 API 获取 <a class="header-anchor" href="#_4-2-2-api-获取" aria-label="Permalink to &quot;4.2.2 API 获取&quot;">​</a></h2><h3 id="注册账号" tabindex="-1">注册账号 <a class="header-anchor" href="#注册账号" aria-label="Permalink to &quot;注册账号&quot;">​</a></h3><ol><li>访问 <a href="https://platform.deepseek.com" target="_blank" rel="noreferrer">platform.deepseek.com</a></li><li>注册账号（支持邮箱/手机）</li><li>完成实名认证</li></ol><h3 id="创建-api-key" tabindex="-1">创建 API Key <a class="header-anchor" href="#创建-api-key" aria-label="Permalink to &quot;创建 API Key&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>步骤：</span></span>
<span class="line"><span>1. 登录控制台</span></span>
<span class="line"><span>2. 点击左侧「API Keys」</span></span>
<span class="line"><span>3. 点击「创建 API Key」</span></span>
<span class="line"><span>4. 命名并复制（只显示一次！）</span></span>
<span class="line"><span>5. 充值账户（支持支付宝/微信）</span></span></code></pre></div><h3 id="获取步骤图解" tabindex="-1">获取步骤图解 <a class="header-anchor" href="#获取步骤图解" aria-label="Permalink to &quot;获取步骤图解&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│         DeepSeek API 获取流程               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  1. 注册/登录                               │</span></span>
<span class="line"><span>│     ↓                                       │</span></span>
<span class="line"><span>│  2. 进入控制台 → API Keys                   │</span></span>
<span class="line"><span>│     ↓                                       │</span></span>
<span class="line"><span>│  3. 创建 Key → 复制保存                     │</span></span>
<span class="line"><span>│     ↓                                       │</span></span>
<span class="line"><span>│  4. 充值（可选）                            │</span></span>
<span class="line"><span>│     ↓                                       │</span></span>
<span class="line"><span>│  5. 开始使用                                │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![DeepSeek配置]/assets/diagrams/41_deepseek_config.png)</p><hr><h2 id="_4-2-3-openclaw-配置" tabindex="-1">4.2.3 OpenClaw 配置 <a class="header-anchor" href="#_4-2-3-openclaw-配置" aria-label="Permalink to &quot;4.2.3 OpenClaw 配置&quot;">​</a></h2><h3 id="方法一-配置文件" tabindex="-1">方法一：配置文件 <a class="header-anchor" href="#方法一-配置文件" aria-label="Permalink to &quot;方法一：配置文件&quot;">​</a></h3><p>在 <code>openclaw.json</code> 中添加：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;temperature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4096</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;temperature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4096</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="方法二-环境变量" tabindex="-1">方法二：环境变量 <a class="header-anchor" href="#方法二-环境变量" aria-label="Permalink to &quot;方法二：环境变量&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 环境变量方式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DEEPSEEK_API_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxxxxxxxxxxxxx&quot;</span></span></code></pre></div><h3 id="方法三-使用-openrouter" tabindex="-1">方法三：使用 OpenRouter <a class="header-anchor" href="#方法三-使用-openrouter" aria-label="Permalink to &quot;方法三：使用 OpenRouter&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;deepseek-via-openrouter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openrouter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek/deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;api_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-or-xxxxxxxxxxxxxxxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-2-4-多模型切换" tabindex="-1">4.2.4 多模型切换 <a class="header-anchor" href="#_4-2-4-多模型切换" aria-label="Permalink to &quot;4.2.4 多模型切换&quot;">​</a></h2><h3 id="默认配置" tabindex="-1">默认配置 <a class="header-anchor" href="#默认配置" aria-label="Permalink to &quot;默认配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;fallback_models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="按场景切换" tabindex="-1">按场景切换 <a class="header-anchor" href="#按场景切换" aria-label="Permalink to &quot;按场景切换&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;default_model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;model_scenarios&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;writing&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;analysis&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-v3&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-2-5-成本优化" tabindex="-1">4.2.5 成本优化 <a class="header-anchor" href="#_4-2-5-成本优化" aria-label="Permalink to &quot;4.2.5 成本优化&quot;">​</a></h2><h3 id="使用技巧" tabindex="-1">使用技巧 <a class="header-anchor" href="#使用技巧" aria-label="Permalink to &quot;使用技巧&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>💰 成本优化技巧：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 选用合适模型</span></span>
<span class="line"><span>   ├── 简单对话 → deepseek-chat</span></span>
<span class="line"><span>   ├── 代码任务 → deepseek-coder</span></span>
<span class="line"><span>   └── 复杂推理 → deepseek-v3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 设置合理参数</span></span>
<span class="line"><span>   ├── max_tokens: 按需设置，不过大</span></span>
<span class="line"><span>   ├── temperature: 0.3-0.7 即可</span></span>
<span class="line"><span>   └── 避免过长上下文</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 使用缓存</span></span>
<span class="line"><span>   ├── 启用上下文缓存</span></span>
<span class="line"><span>   └── 重复内容只计算一次</span></span></code></pre></div><h3 id="成本计算示例" tabindex="-1">成本计算示例 <a class="header-anchor" href="#成本计算示例" aria-label="Permalink to &quot;成本计算示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>任务：处理 10,000 条用户咨询</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案一：GPT-4o</span></span>
<span class="line"><span>- 输入：$2.50/1M × 5M tokens = $12.50</span></span>
<span class="line"><span>- 输出：$10.00/1M × 2M tokens = $20.00</span></span>
<span class="line"><span>- 总计：$32.50</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案二：DeepSeek Chat</span></span>
<span class="line"><span>- 输入：$0.27/1M × 5M tokens = $1.35</span></span>
<span class="line"><span>- 输出：$1.10/1M × 2M tokens = $2.20</span></span>
<span class="line"><span>- 总计：$3.55</span></span>
<span class="line"><span></span></span>
<span class="line"><span>节省：约 90%</span></span></code></pre></div><hr><h2 id="_4-2-6-常见问题" tabindex="-1">4.2.6 常见问题 <a class="header-anchor" href="#_4-2-6-常见问题" aria-label="Permalink to &quot;4.2.6 常见问题&quot;">​</a></h2><h3 id="q1-api-key-无效" tabindex="-1">Q1: API Key 无效 <a class="header-anchor" href="#q1-api-key-无效" aria-label="Permalink to &quot;Q1: API Key 无效&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：invalid api key</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 Key 是否正确复制</span></span>
<span class="line"><span>2. 确认 Key 已激活</span></span>
<span class="line"><span>3. 检查账户余额是否充足</span></span></code></pre></div><h3 id="q2-余额不足" tabindex="-1">Q2: 余额不足 <a class="header-anchor" href="#q2-余额不足" aria-label="Permalink to &quot;Q2: 余额不足&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：insufficient quota</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 登录 DeepSeek 控制台</span></span>
<span class="line"><span>2. 点击「账户充值」</span></span>
<span class="line"><span>3. 选择充值金额（最低 ¥10）</span></span></code></pre></div><h3 id="q3-请求超时" tabindex="-1">Q3: 请求超时 <a class="header-anchor" href="#q3-请求超时" aria-label="Permalink to &quot;Q3: 请求超时&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：request timeout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查网络连接</span></span>
<span class="line"><span>2. 尝试使用代理</span></span>
<span class="line"><span>3. 增加超时设置：</span></span>
<span class="line"><span>   &quot;timeout&quot;: 120</span></span></code></pre></div><h3 id="q4-模型不存在" tabindex="-1">Q4: 模型不存在 <a class="header-anchor" href="#q4-模型不存在" aria-label="Permalink to &quot;Q4: 模型不存在&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：model not found</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 确认模型名称正确</span></span>
<span class="line"><span>2. 检查是否支持该模型</span></span>
<span class="line"><span>3. 常用模型：deepseek-chat, deepseek-coder</span></span></code></pre></div><hr><h2 id="_4-2-7-实战练习" tabindex="-1">4.2.7 实战练习 <a class="header-anchor" href="#_4-2-7-实战练习" aria-label="Permalink to &quot;4.2.7 实战练习&quot;">​</a></h2><h3 id="练习一-基础配置" tabindex="-1">练习一：基础配置 <a class="header-anchor" href="#练习一-基础配置" aria-label="Permalink to &quot;练习一：基础配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 注册 DeepSeek 账号</span></span>
<span class="line"><span>2. 创建 API Key</span></span>
<span class="line"><span>3. 配置到 openclaw.json</span></span>
<span class="line"><span>4. 测试对话</span></span></code></pre></div><h3 id="练习二-多模型切换" tabindex="-1">练习二：多模型切换 <a class="header-anchor" href="#练习二-多模型切换" aria-label="Permalink to &quot;练习二：多模型切换&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 配置 deepseek-chat 和 deepseek-coder</span></span>
<span class="line"><span>2. 测试代码生成</span></span>
<span class="line"><span>3. 对比输出质量</span></span></code></pre></div><h3 id="练习三-成本对比" tabindex="-1">练习三：成本对比 <a class="header-anchor" href="#练习三-成本对比" aria-label="Permalink to &quot;练习三：成本对比&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 用 DeepSeek 处理一个任务</span></span>
<span class="line"><span>2. 记录 token 使用量</span></span>
<span class="line"><span>3. 计算成本</span></span>
<span class="line"><span>4. 对比 GPT-4o 成本</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>DeepSeek</strong>：性价比最高的国产模型</li><li><strong>API 获取</strong>：platform.deepseek.com 注册获取</li><li><strong>配置</strong>：api_key + model 即可使用</li><li><strong>成本</strong>：约为 GPT-4 的 1/10</li><li><strong>优化</strong>：按场景选择合适模型</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>DeepSeek 的优势是什么？</li><li>如何选择 DeepSeek 系列模型？</li><li>成本优化的关键点是什么？</li></ol>`,64)])])}const E=a(p,[["render",l]]);export{c as __pageData,E as default};
