import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"4.1 模型提供商概览","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/04_模型配置/4.1_providers_overview.md","filePath":"chapters/04_模型配置/4.1_providers_overview.md"}'),l={name:"chapters/04_模型配置/4.1_providers_overview.md"};function e(t,s,h,k,d,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_4-1-模型提供商概览" tabindex="-1">4.1 模型提供商概览 <a class="header-anchor" href="#_4-1-模型提供商概览" aria-label="Permalink to &quot;4.1 模型提供商概览&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>了解 OpenClaw 支持的模型提供商</li><li>掌握选择模型的方法</li><li>理解不同提供商的特点</li></ul><hr><h2 id="_4-1-1-cli-配置模型" tabindex="-1">4.1.1 CLI 配置模型 <a class="header-anchor" href="#_4-1-1-cli-配置模型" aria-label="Permalink to &quot;4.1.1 CLI 配置模型&quot;">​</a></h2><h3 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h3><p>OpenClaw 提供了丰富的 CLI 命令来管理模型配置：</p><p>![模型提供商]/assets/diagrams/13_model_providers.png)</p><p>![Token成本]/assets/diagrams/43_token_cost.png)</p><p>![基础模型]/assets/diagrams/111_foundation_models.png)</p><p>![微调]/assets/diagrams/112_finetuning.png)</p><p>![成本追踪]/assets/diagrams/124_cost_tracking.png)</p><p>![更多提供商]/assets/diagrams/126_moongaot_providers.png)</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前模型配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加模型配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">provide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">r</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --api-key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ke</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置默认模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">model-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试模型连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">model-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看可用模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> available</span></span></code></pre></div><h3 id="配置流程图" tabindex="-1">配置流程图 <a class="header-anchor" href="#配置流程图" aria-label="Permalink to &quot;配置流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          模型配置流程                                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 选择模型提供商    │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ • OpenAI     │  │</span></span>
<span class="line"><span>                          │  │ • Anthropic  │  │</span></span>
<span class="line"><span>                          │  │ • DeepSeek   │  │</span></span>
<span class="line"><span>                          │  │ • Ollama     │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 获取 API Key     │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ 官网注册账号  │  │</span></span>
<span class="line"><span>                          │  │ 创建 API Key │  │</span></span>
<span class="line"><span>                          │  │ 充值/购买    │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 配置 OpenClaw   │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ CLI 配置      │  │</span></span>
<span class="line"><span>                          │  │ JSON 配置     │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 测试连接         │</span></span>
<span class="line"><span>                          │  openclaw models    │</span></span>
<span class="line"><span>                          │  test &lt;model-id&gt;   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 设为默认         │</span></span>
<span class="line"><span>                          │  openclaw models    │</span></span>
<span class="line"><span>                          │  set-default        │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   配置完成 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span></code></pre></div><h3 id="cli-配置示例" tabindex="-1">CLI 配置示例 <a class="header-anchor" href="#cli-配置示例" aria-label="Permalink to &quot;CLI 配置示例&quot;">​</a></h3><h4 id="添加-openai-模型" tabindex="-1">添加 OpenAI 模型 <a class="header-anchor" href="#添加-openai-模型" aria-label="Permalink to &quot;添加 OpenAI 模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：命令行直接配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openai</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --api-key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sk-xxxxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --default-model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gpt-4o</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：环境变量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENAI_API_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sk-xxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openai</span></span></code></pre></div><h4 id="添加-anthropic-claude-模型" tabindex="-1">添加 Anthropic (Claude) 模型 <a class="header-anchor" href="#添加-anthropic-claude-模型" aria-label="Permalink to &quot;添加 Anthropic (Claude) 模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 Claude 模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> anthropic</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --api-key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sk-ant-xxxxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --default-model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-sonnet-4-20250514</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> anthropic</span></span></code></pre></div><h4 id="添加-deepseek-模型" tabindex="-1">添加 DeepSeek 模型 <a class="header-anchor" href="#添加-deepseek-模型" aria-label="Permalink to &quot;添加 DeepSeek 模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 DeepSeek 模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --api-key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sk-xxxxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --default-model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek-chat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek</span></span></code></pre></div><h4 id="添加-ollama-本地模型" tabindex="-1">添加 Ollama 本地模型 <a class="header-anchor" href="#添加-ollama-本地模型" aria-label="Permalink to &quot;添加 Ollama 本地模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确保 Ollama 已启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ollama</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serve</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加本地模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ollama</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --base-url</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://localhost:11434</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --default-model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> llama3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ollama</span></span></code></pre></div><h3 id="json-配置文件" tabindex="-1">JSON 配置文件 <a class="header-anchor" href="#json-配置文件" aria-label="Permalink to &quot;JSON 配置文件&quot;">​</a></h3><p>除了 CLI，你也可以直接编辑配置文件：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;providers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;baseUrl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://api.openai.com/v1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;anthropic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-ant-xxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-sonnet-4-20250514&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;baseUrl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://api.deepseek.com/v1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;ollama&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;baseUrl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://localhost:11434&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;llama3&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;fallback&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-3-haiku&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="查看当前配置" tabindex="-1">查看当前配置 <a class="header-anchor" href="#查看当前配置" aria-label="Permalink to &quot;查看当前配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出所有配置的模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看默认模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> current</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看模型状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> model</span></span></code></pre></div><h3 id="多模型切换" tabindex="-1">多模型切换 <a class="header-anchor" href="#多模型切换" aria-label="Permalink to &quot;多模型切换&quot;">​</a></h3><p>OpenClaw 支持配置多个模型，并根据不同场景灵活切换。</p><h4 id="切换默认模型" tabindex="-1">切换默认模型 <a class="header-anchor" href="#切换默认模型" aria-label="Permalink to &quot;切换默认模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到不同的默认模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-sonnet-4-20250514</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek-chat</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> llama3</span></span></code></pre></div><h4 id="会话级模型切换" tabindex="-1">会话级模型切换 <a class="header-anchor" href="#会话级模型切换" aria-label="Permalink to &quot;会话级模型切换&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在对话中切换模型</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @gpt-4o 请解释这个概念</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @claude-3-5-sonnet 帮我写代码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @deepseek-chat 翻译这段文字</span></span></code></pre></div><h4 id="运行时动态切换" tabindex="-1">运行时动态切换 <a class="header-anchor" href="#运行时动态切换" aria-label="Permalink to &quot;运行时动态切换&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用 --model 参数指定模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gpt-4o</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;你好&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-opus</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;你好&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek-coder</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;写一个排序算法&quot;</span></span></code></pre></div><h4 id="模型优先级配置" tabindex="-1">模型优先级配置 <a class="header-anchor" href="#模型优先级配置" aria-label="Permalink to &quot;模型优先级配置&quot;">​</a></h4><p>在配置文件中设置模型优先级和自动切换规则：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;priority&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-sonnet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;writing&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-haiku&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;analysis&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-opus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;fallback&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;primary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-sonnet-4-20250514&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;secondary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;tertiary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;autoSelect&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;rules&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;keyword&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-sonnet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;keyword&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;写代码&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;keyword&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;翻译&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="多模型配置流程图" tabindex="-1">多模型配置流程图 <a class="header-anchor" href="#多模型配置流程图" aria-label="Permalink to &quot;多模型配置流程图&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          多模型切换配置流程                                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 配置多个模型    │</span></span>
<span class="line"><span>                          │  openclaw models    │</span></span>
<span class="line"><span>                          │  add &lt;provider1&gt;    │</span></span>
<span class="line"><span>                          │  add &lt;provider2&gt;    │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 设置优先级       │</span></span>
<span class="line"><span>                          │  JSON 配置:         │</span></span>
<span class="line"><span>                          │  models.priority    │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 配置自动切换     │</span></span>
<span class="line"><span>                          │  models.autoSelect  │</span></span>
<span class="line"><span>                          │  根据关键词自动选择  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 配置降级策略     │</span></span>
<span class="line"><span>                          │  models.fallback    │</span></span>
<span class="line"><span>                          │  primary/secondary  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 测试切换         │</span></span>
<span class="line"><span>                          │  @modelName 或      │</span></span>
<span class="line"><span>                          │  --model 参数        │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   配置完成 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span></code></pre></div><h4 id="按场景使用不同模型" tabindex="-1">按场景使用不同模型 <a class="header-anchor" href="#按场景使用不同模型" aria-label="Permalink to &quot;按场景使用不同模型&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编程场景 - 使用 Claude</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-sonnet-4-20250514</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;帮我写一个 Python Web 服务器&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 日常对话 - 使用 DeepSeek</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deepseek-chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;今天天气怎么样&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 长文本分析 - 使用 Kimi</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> moonshot-kimi</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;分析这篇论文的主要观点&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 快速翻译 - 使用 Haiku</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-3-haiku</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;把这段话翻译成英文&quot;</span></span></code></pre></div><h4 id="模型状态查看" tabindex="-1">模型状态查看 <a class="header-anchor" href="#模型状态查看" aria-label="Permalink to &quot;模型状态查看&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看所有可用模型及其状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> available</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前激活的模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> active</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看模型使用统计</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> models</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stats</span></span></code></pre></div><hr><h2 id="_4-1-1-支持的模型提供商" tabindex="-1">4.1.1 支持的模型提供商 <a class="header-anchor" href="#_4-1-1-支持的模型提供商" aria-label="Permalink to &quot;4.1.1 支持的模型提供商&quot;">​</a></h2><p>OpenClaw 支持 <strong>30+</strong> 模型提供商：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    模型提供商汇总                                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  国际厂商                                                     │</span></span>
<span class="line"><span>│  ├── OpenAI (GPT-4o, GPT-4o-mini, o1, o3-mini)           │</span></span>
<span class="line"><span>│  ├── Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku)         │</span></span>
<span class="line"><span>│  ├── Google (Gemini 2.0 Flash, Pro)                       │</span></span>
<span class="line"><span>│  ├── Mistral (Mistral Large, Codestral)                   │</span></span>
<span class="line"><span>│  └── xAI (Grok)                                          │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  国产厂商 ⭐                                                 │</span></span>
<span class="line"><span>│  ├── DeepSeek (V3, Chat, Coder)                          │</span></span>
<span class="line"><span>│  ├── Moonshot (Kimi, Kimi Coder)                         │</span></span>
<span class="line"><span>│  ├── MiniMax (abab6.5s)                                   │</span></span>
<span class="line"><span>│  ├── 智谱 (GLM-4, GLM-4V)                                 │</span></span>
<span class="line"><span>│  ├── 百度 (ERNIE 4.0, 3.5)                               │</span></span>
<span class="line"><span>│  ├── 阿里 (Qwen 2.5, VL)                                   │</span></span>
<span class="line"><span>│  └── 腾讯 (Hunyuan)                                        │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  本地部署                                                     │</span></span>
<span class="line"><span>│  ├── Ollama (Llama 3, Qwen 2, Mistral)                   │</span></span>
<span class="line"><span>│  └── vLLM (高吞吐量本地部署)                                │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  聚合平台                                                     │</span></span>
<span class="line"><span>│  ├── OpenRouter (聚合 100+ 模型)                           │</span></span>
<span class="line"><span>│  ├── LiteLLM (统一网关)                                    │</span></span>
<span class="line"><span>│  └── Cloudflare AI Gateway                                 │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-1-2-按场景选择" tabindex="-1">4.1.2 按场景选择 <a class="header-anchor" href="#_4-1-2-按场景选择" aria-label="Permalink to &quot;4.1.2 按场景选择&quot;">​</a></h2><h3 id="推荐场景" tabindex="-1">推荐场景 <a class="header-anchor" href="#推荐场景" aria-label="Permalink to &quot;推荐场景&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐模型</th><th>原因</th></tr></thead><tbody><tr><td><strong>日常对话</strong></td><td>DeepSeek Chat</td><td>性价比高</td></tr><tr><td><strong>长文本处理</strong></td><td>Kimi (200万字)</td><td>超长上下文</td></tr><tr><td><strong>代码生成</strong></td><td>Claude 3.5</td><td>编程能力强</td></tr><tr><td><strong>中文任务</strong></td><td>GLM-4</td><td>中文优化</td></tr><tr><td><strong>本地部署</strong></td><td>Ollama Llama3</td><td>隐私优先</td></tr></tbody></table><h3 id="成本对比" tabindex="-1">成本对比 <a class="header-anchor" href="#成本对比" aria-label="Permalink to &quot;成本对比&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>模型成本对比（按 1M tokens）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| 模型 | 输入 | 输出 | 推荐场景 |</span></span>
<span class="line"><span>|-----|------|------|---------|</span></span>
<span class="line"><span>| DeepSeek V3 | $0.27 | $1.10 | 日常使用 |</span></span>
<span class="line"><span>| Kimi | $0.12 | $1.10 | 长文本 |</span></span>
<span class="line"><span>| Claude 3.5 | $3.00 | $15.00 | 高级任务 |</span></span>
<span class="line"><span>| GPT-4o | $2.50 | $10.00 | 综合能力 |</span></span>
<span class="line"><span>| GLM-4 | $0.07 | $0.70 | 中文任务 |</span></span></code></pre></div><hr><h2 id="_4-1-3-国际厂商详解" tabindex="-1">4.1.3 国际厂商详解 <a class="header-anchor" href="#_4-1-3-国际厂商详解" aria-label="Permalink to &quot;4.1.3 国际厂商详解&quot;">​</a></h2><h3 id="openai" tabindex="-1">OpenAI <a class="header-anchor" href="#openai" aria-label="Permalink to &quot;OpenAI&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              OpenAI                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── GPT-4o (最新旗舰)                     │</span></span>
<span class="line"><span>│  ├── GPT-4o-mini (性价比)                  │</span></span>
<span class="line"><span>│  ├── o1 (推理)                            │</span></span>
<span class="line"><span>│  └── o3-mini (推理性价比)                  │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 综合能力强                              │</span></span>
<span class="line"><span>│  ✅ 生态完善                               │</span></span>
<span class="line"><span>│  ✅ 持续更新                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：platform.openai.com                │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="anthropic-claude" tabindex="-1">Anthropic (Claude) <a class="header-anchor" href="#anthropic-claude" aria-label="Permalink to &quot;Anthropic (Claude)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Anthropic (Claude)                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── Claude 3.5 Sonnet (旗舰)              │</span></span>
<span class="line"><span>│  ├── Claude 3 Haiku (性价比)              │</span></span>
<span class="line"><span>│  └── Claude 3 Opus (最强)                 │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 编程能力强                              │</span></span>
<span class="line"><span>│  ✅ 安全性高                               │</span></span>
<span class="line"><span>│  ✅ 输出质量高                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：console.anthropic.com              │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-1-4-国产厂商详解" tabindex="-1">4.1.4 国产厂商详解 <a class="header-anchor" href="#_4-1-4-国产厂商详解" aria-label="Permalink to &quot;4.1.4 国产厂商详解&quot;">​</a></h2><h3 id="deepseek" tabindex="-1">DeepSeek <a class="header-anchor" href="#deepseek" aria-label="Permalink to &quot;DeepSeek&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│               DeepSeek                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── DeepSeek V3 (最新旗舰)               │</span></span>
<span class="line"><span>│  ├── DeepSeek Chat (对话)                  │</span></span>
<span class="line"><span>│  └── DeepSeek Coder (编程)                │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 性价比极高 ⭐                           │</span></span>
<span class="line"><span>│  ✅ 推理能力强                              │</span></span>
<span class="line"><span>│  ✅ 开源模型                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  价格：                                     │</span></span>
<span class="line"><span>│  输入：$0.27/M tokens                      │</span></span>
<span class="line"><span>│  输出：$1.10/M tokens                     │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：platform.deepseek.com               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="moonshot-kimi" tabindex="-1">Moonshot (Kimi) <a class="header-anchor" href="#moonshot-kimi" aria-label="Permalink to &quot;Moonshot (Kimi)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            Moonshot (Kimi)                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── Kimi (200万字上下文) ⭐               │</span></span>
<span class="line"><span>│  └── Kimi Coder (编程)                    │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 超长上下文                              │</span></span>
<span class="line"><span>│  ✅ 中文理解好                              │</span></span>
<span class="line"><span>│  ✅ 长文本处理强                            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  价格：                                     │</span></span>
<span class="line"><span>│  输入：$0.12/M tokens                      │</span></span>
<span class="line"><span>│  输出：$1.10/M tokens                     │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：platform.moonshot.cn               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="智谱-glm" tabindex="-1">智谱 (GLM) <a class="header-anchor" href="#智谱-glm" aria-label="Permalink to &quot;智谱 (GLM)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              智谱 (GLM)                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── GLM-4 (旗舰)                          │</span></span>
<span class="line"><span>│  └── GLM-4V (多模态)                       │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 中文优化                               │</span></span>
<span class="line"><span>│  ✅ 多模态能力                             │</span></span>
<span class="line"><span>│  ✅ 性价比高                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：open.bigmodel.cn                   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-1-5-本地部署" tabindex="-1">4.1.5 本地部署 <a class="header-anchor" href="#_4-1-5-本地部署" aria-label="Permalink to &quot;4.1.5 本地部署&quot;">​</a></h2><h3 id="ollama" tabindex="-1">Ollama <a class="header-anchor" href="#ollama" aria-label="Permalink to &quot;Ollama&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│               Ollama                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  推荐模型：                                   │</span></span>
<span class="line"><span>│  ├── Llama 3.1 (70B)                      │</span></span>
<span class="line"><span>│  ├── Qwen 2.5 (72B)                       │</span></span>
<span class="line"><span>│  └── Mistral (7B)                          │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ✅ 隐私优先                               │</span></span>
<span class="line"><span>│  ✅ 无需联网                               │</span></span>
<span class="line"><span>│  ✅ 零 API 费用                            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  硬件要求：                                 │</span></span>
<span class="line"><span>│  推荐：32GB+ 内存                          │</span></span>
<span class="line"><span>│  最低：16GB 内存                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：ollama.com                         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-1-6-聚合平台" tabindex="-1">4.1.6 聚合平台 <a class="header-anchor" href="#_4-1-6-聚合平台" aria-label="Permalink to &quot;4.1.6 聚合平台&quot;">​</a></h2><h3 id="openrouter" tabindex="-1">OpenRouter <a class="header-anchor" href="#openrouter" aria-label="Permalink to &quot;OpenRouter&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│             OpenRouter                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  特点：                                     │</span></span>
<span class="line"><span>│  ├── 聚合 100+ 模型                        │</span></span>
<span class="line"><span>│  ├── 统一 API 接口                          │</span></span>
<span class="line"><span>│  ├── 按需付费                              │</span></span>
<span class="line"><span>│  └── 内置 Claude/GPT                       │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  官网：openrouter.ai                      │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-1-7-选择建议" tabindex="-1">4.1.7 选择建议 <a class="header-anchor" href="#_4-1-7-选择建议" aria-label="Permalink to &quot;4.1.7 选择建议&quot;">​</a></h2><h3 id="新手推荐" tabindex="-1">新手推荐 <a class="header-anchor" href="#新手推荐" aria-label="Permalink to &quot;新手推荐&quot;">​</a></h3><table tabindex="0"><thead><tr><th>优先级</th><th>模型</th><th>理由</th></tr></thead><tbody><tr><td>⭐⭐⭐</td><td>DeepSeek</td><td>性价比最高</td></tr><tr><td>⭐⭐</td><td>Kimi</td><td>中文友好</td></tr><tr><td>⭐</td><td>OpenAI</td><td>能力最强</td></tr></tbody></table><h3 id="进阶用户" tabindex="-1">进阶用户 <a class="header-anchor" href="#进阶用户" aria-label="Permalink to &quot;进阶用户&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>模型</th></tr></thead><tbody><tr><td>编程</td><td>Claude 3.5 Sonnet</td></tr><tr><td>长文本</td><td>Kimi</td></tr><tr><td>综合</td><td>GPT-4o</td></tr></tbody></table><h3 id="企业用户" tabindex="-1">企业用户 <a class="header-anchor" href="#企业用户" aria-label="Permalink to &quot;企业用户&quot;">​</a></h3><table tabindex="0"><thead><tr><th>需求</th><th>模型</th></tr></thead><tbody><tr><td>成本优先</td><td>DeepSeek</td></tr><tr><td>性能优先</td><td>Claude 3.5</td></tr><tr><td>合规优先</td><td>国产模型</td></tr></tbody></table><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>30+ 模型商</strong>：国际厂商、国产厂商、本地部署、聚合平台</li><li><strong>推荐选择</strong>：日常用 DeepSeek，长文本用 Kimi</li><li><strong>性价比</strong>：DeepSeek &gt; GLM &gt; Kimi &gt; GPT/Claude</li><li><strong>隐私</strong>：Ollama 本地部署</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你选择了哪个模型？为什么？</li><li>你的使用场景是什么？</li><li>成本是你考虑的主要因素吗？</li></ol>`,93)])])}const F=a(l,[["render",e]]);export{c as __pageData,F as default};
