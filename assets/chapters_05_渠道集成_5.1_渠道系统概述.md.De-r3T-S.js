import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"8.1 通道系统概述","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/05_渠道集成/5.1_渠道系统概述.md","filePath":"chapters/05_渠道集成/5.1_渠道系统概述.md"}'),l={name:"chapters/05_渠道集成/5.1_渠道系统概述.md"};function e(t,s,h,k,o,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_8-1-通道系统概述" tabindex="-1">8.1 通道系统概述 <a class="header-anchor" href="#_8-1-通道系统概述" aria-label="Permalink to &quot;8.1 通道系统概述&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解通道系统的架构</li><li>掌握通道类型和特点</li><li>了解通道配置方法</li></ul><hr><h2 id="_8-1-1-什么是通道" tabindex="-1">8.1.1 什么是通道 <a class="header-anchor" href="#_8-1-1-什么是通道" aria-label="Permalink to &quot;8.1.1 什么是通道&quot;">​</a></h2><h3 id="通道概念" tabindex="-1">通道概念 <a class="header-anchor" href="#通道概念" aria-label="Permalink to &quot;通道概念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           OpenClaw 通道系统                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  通道 = 消息入口 + 协议适配 + 事件处理        │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  支持的平台：                                 │</span></span>
<span class="line"><span>│  ├── 飞书 (IM)                             │</span></span>
<span class="line"><span>│  ├── Telegram (IM)                         │</span></span>
<span class="line"><span>│  ├── Discord (社区)                        │</span></span>
<span class="line"><span>│  ├── Slack (IM)                           │</span></span>
<span class="line"><span>│  ├── 钉钉 (IM)                             │</span></span>
<span class="line"><span>│  ├── Web (WebUI)                          │</span></span>
<span class="line"><span>│  ├── CLI (命令行)                          │</span></span>
<span class="line"><span>│  └── 自定义 Webhook                        │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><h3 id="通道的作用" tabindex="-1">通道的作用 <a class="header-anchor" href="#通道的作用" aria-label="Permalink to &quot;通道的作用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>通道的价值：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 多端接入</span></span>
<span class="line"><span>   ├── 同一 Agent 服务多个平台</span></span>
<span class="line"><span>   └── 用户选择熟悉的入口</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 协议适配</span></span>
<span class="line"><span>   ├── 统一消息格式</span></span>
<span class="line"><span>   └── 平台特性处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 事件处理</span></span>
<span class="line"><span>   ├── 消息事件</span></span>
<span class="line"><span>   ├── 回调事件</span></span>
<span class="line"><span>   └── 状态事件</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><hr><h2 id="_8-1-2-架构设计" tabindex="-1">8.1.2 架构设计 <a class="header-anchor" href="#_8-1-2-架构设计" aria-label="Permalink to &quot;8.1.2 架构设计&quot;">​</a></h2><h3 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            通道系统架构                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│   各平台用户                                   │</span></span>
<span class="line"><span>│   │  │  │  │  │  │                         │</span></span>
<span class="line"><span>│   ▼  ▼  ▼  ▼  ▼  ▼                         │</span></span>
<span class="line"><span>│ ┌──┴──┴──┴──┴──┴──┐                        │</span></span>
<span class="line"><span>│ │  Channel Layer   │                        │</span></span>
<span class="line"><span>│ │  (协议适配层)     │                        │</span></span>
<span class="line"><span>│ └──┬──┬──┬──┬──┬──┘                        │</span></span>
<span class="line"><span>│    │  │  │  │  │                           │</span></span>
<span class="line"><span>│    ▼  ▼  ▼  ▼  ▼                           │</span></span>
<span class="line"><span>│ ┌──┴──┴──┴──┴──┴──┐                        │</span></span>
<span class="line"><span>│ │  Gateway         │                        │</span></span>
<span class="line"><span>│ │  (统一接入层)     │                        │</span></span>
<span class="line"><span>│ └──┬───────────────┘                        │</span></span>
<span class="line"><span>│    │                                          │</span></span>
<span class="line"><span>│    ▼                                          │</span></span>
<span class="line"><span>│ ┌──────────────────┐                         │</span></span>
<span class="line"><span>│ │  Agent Engine    │                         │</span></span>
<span class="line"><span>│ │  (Agent 核心)    │                         │</span></span>
<span class="line"><span>│ └──────────────────┘                         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><h3 id="消息流程" tabindex="-1">消息流程 <a class="header-anchor" href="#消息流程" aria-label="Permalink to &quot;消息流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>消息处理流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户消息 → 通道接收 → 格式转换</span></span>
<span class="line"><span>    → 路由分发 → Agent 处理</span></span>
<span class="line"><span>    → 格式转换 → 通道发送 → 用户</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><hr><h2 id="_8-1-3-通道类型" tabindex="-1">8.1.3 通道类型 <a class="header-anchor" href="#_8-1-3-通道类型" aria-label="Permalink to &quot;8.1.3 通道类型&quot;">​</a></h2><h3 id="官方支持" tabindex="-1">官方支持 <a class="header-anchor" href="#官方支持" aria-label="Permalink to &quot;官方支持&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>IM 通道：</span></span>
<span class="line"><span>├── 飞书 - 企业微信/ Lark</span></span>
<span class="line"><span>├── Telegram</span></span>
<span class="line"><span>├── Discord</span></span>
<span class="line"><span>├── Slack</span></span>
<span class="line"><span>├── 钉钉</span></span>
<span class="line"><span>└── 企业微信</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Web 通道：</span></span>
<span class="line"><span>├── WebUI - 网页对话</span></span>
<span class="line"><span>├── REST API - 接口调用</span></span>
<span class="line"><span>└── Webhook - 回调接收</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CLI 通道：</span></span>
<span class="line"><span>└── 命令行界面</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><h3 id="第三方通道" tabindex="-1">第三方通道 <a class="header-anchor" href="#第三方通道" aria-label="Permalink to &quot;第三方通道&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>社区支持：</span></span>
<span class="line"><span>├── 微信公众号</span></span>
<span class="line"><span>├── Slack</span></span>
<span class="line"><span>├── Line</span></span>
<span class="line"><span>├── WhatsApp</span></span>
<span class="line"><span>└── 自定义通道</span></span></code></pre></div><p>![信道架构]/assets/diagrams/10_channel_architecture.png)</p><hr><h2 id="_8-1-4-统一消息格式" tabindex="-1">8.1.4 统一消息格式 <a class="header-anchor" href="#_8-1-4-统一消息格式" aria-label="Permalink to &quot;8.1.4 统一消息格式&quot;">​</a></h2><h3 id="消息结构" tabindex="-1">消息结构 <a class="header-anchor" href="#消息结构" aria-label="Permalink to &quot;消息结构&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;msg_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;msg_123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feishu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user_123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;张三&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;avatar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://...&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;message&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你好&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;context&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;group_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;group_123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;reply_to&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;msg_111&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;timestamp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1705123456789</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="响应格式" tabindex="-1">响应格式 <a class="header-anchor" href="#响应格式" aria-label="Permalink to &quot;响应格式&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;msg_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;reply_123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feishu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;message&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你好，我是 OpenClaw&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;attachments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_8-1-5-通道配置" tabindex="-1">8.1.5 通道配置 <a class="header-anchor" href="#_8-1-5-通道配置" aria-label="Permalink to &quot;8.1.5 通道配置&quot;">​</a></h2><h3 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;host&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.0.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cli&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="通道启用" tabindex="-1">通道启用 <a class="header-anchor" href="#通道启用" aria-label="Permalink to &quot;通道启用&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;feishu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./config/feishu.json&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./config/telegram.json&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cli&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_8-1-6-常见问题" tabindex="-1">8.1.6 常见问题 <a class="header-anchor" href="#_8-1-6-常见问题" aria-label="Permalink to &quot;8.1.6 常见问题&quot;">​</a></h2><h3 id="q1-消息接收不到" tabindex="-1">Q1: 消息接收不到 <a class="header-anchor" href="#q1-消息接收不到" aria-label="Permalink to &quot;Q1: 消息接收不到&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：平台消息无法收到</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 Webhook URL 配置</span></span>
<span class="line"><span>2. 验证回调地址可访问</span></span>
<span class="line"><span>3. 检查防火墙/白名单</span></span>
<span class="line"><span>4. 查看通道日志</span></span></code></pre></div><h3 id="q2-消息发送失败" tabindex="-1">Q2: 消息发送失败 <a class="header-anchor" href="#q2-消息发送失败" aria-label="Permalink to &quot;Q2: 消息发送失败&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：回复消息失败</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 API 权限</span></span>
<span class="line"><span>2. 验证 token 有效性</span></span>
<span class="line"><span>3. 检查消息格式</span></span>
<span class="line"><span>4. 查看错误码</span></span></code></pre></div><h3 id="q3-多通道消息混乱" tabindex="-1">Q3: 多通道消息混乱 <a class="header-anchor" href="#q3-多通道消息混乱" aria-label="Permalink to &quot;Q3: 多通道消息混乱&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：不同通道消息串扰</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 隔离会话</span></span>
<span class="line"><span>2. 区分 sessionKey</span></span>
<span class="line"><span>3. 配置通道前缀</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>通道</strong>：消息入口和协议适配</li><li><strong>架构</strong>：Channel Layer → Gateway → Agent</li><li><strong>类型</strong>：IM、Web、CLI</li><li><strong>配置</strong>：统一配置 + 独立配置</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>通道系统设计的核心是什么？</li><li>如何选择合适的通道类型？</li><li>多通道如何保证体验一致？</li></ol>`,53)])])}const E=a(l,[["render",e]]);export{d as __pageData,E as default};
