import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const r=JSON.parse('{"title":"3.7 消息路由流程","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.7_message_routing.md","filePath":"chapters/03_Agent运行循环/3.7_message_routing.md"}'),l={name:"chapters/03_Agent运行循环/3.7_message_routing.md"};function t(e,s,h,k,d,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-7-消息路由流程" tabindex="-1">3.7 消息路由流程 <a class="header-anchor" href="#_3-7-消息路由流程" aria-label="Permalink to &quot;3.7 消息路由流程&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解 OpenClaw 消息路由的核心概念</li><li>掌握 Binding 配置方法</li><li>理解路由优先级规则</li><li>学会配置多渠道多 Agent 路由</li></ul><hr><h2 id="_3-7-1-消息路由概述" tabindex="-1">3.7.1 消息路由概述 <a class="header-anchor" href="#_3-7-1-消息路由概述" aria-label="Permalink to &quot;3.7.1 消息路由概述&quot;">​</a></h2><h3 id="核心组件" tabindex="-1">核心组件 <a class="header-anchor" href="#核心组件" aria-label="Permalink to &quot;核心组件&quot;">​</a></h3><p>OpenClaw 消息路由是 Gateway 的核心功能，负责将来自不同渠道的消息准确路由到对应的 Agent。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           消息路由架构                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│                    OpenClaw routes replies                                      │</span></span>
<span class="line"><span>│                    back to the channel                                          │</span></span>
<span class="line"><span>│                    where a message came from                                     │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   用户侧                                                                    │</span></span>
<span class="line"><span>│       │                                                                    │</span></span>
<span class="line"><span>│       ▼                                                                    │</span></span>
<span class="line"><span>│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                  │</span></span>
<span class="line"><span>│   │  Telegram   │     │   Discord   │     │  WhatsApp   │   ...         │</span></span>
<span class="line"><span>│   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘                  │</span></span>
<span class="line"><span>│          │                    │                    │                          │</span></span>
<span class="line"><span>│          └────────────────────┼────────────────────┘                          │</span></span>
<span class="line"><span>│                               ▼                                                │</span></span>
<span class="line"><span>│                    ┌─────────────────────┐                                    │</span></span>
<span class="line"><span>│                    │      Gateway        │                                    │</span></span>
<span class="line"><span>│                    │  (消息路由中枢)     │                                    │</span></span>
<span class="line"><span>│                    │  routing is        │                                    │</span></span>
<span class="line"><span>│                    │  deterministic      │                                    │</span></span>
<span class="line"><span>│                    └──────────┬──────────┘                                    │</span></span>
<span class="line"><span>│                               │                                                │</span></span>
<span class="line"><span>│          ┌────────────────────┼────────────────────┐                         │</span></span>
<span class="line"><span>│          ▼                    ▼                    ▼                         │</span></span>
<span class="line"><span>│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │</span></span>
<span class="line"><span>│   │    main     │     │    work     │     │   coding    │   Agent        │</span></span>
<span class="line"><span>│   │   Agent     │     │   Agent     │     │   Agent     │                │</span></span>
<span class="line"><span>│   └─────────────┘     └─────────────┘     └─────────────┘              │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![消息处理]/assets/diagrams/104_message_handling.png)</p><p>![消息格式]/assets/diagrams/80_message_format.png)</p><p>![会话上下文]/assets/diagrams/08_session_context.png)</p><h3 id="核心术语" tabindex="-1">核心术语 <a class="header-anchor" href="#核心术语" aria-label="Permalink to &quot;核心术语&quot;">​</a></h3><table tabindex="0"><thead><tr><th>术语</th><th>说明</th></tr></thead><tbody><tr><td><strong>Channel</strong></td><td>渠道类型：<code>whatsapp</code>, <code>telegram</code>, <code>discord</code>, <code>slack</code>, <code>signal</code>, <code>imessage</code>, <code>webchat</code></td></tr><tr><td><strong>AccountId</strong></td><td>每个渠道的账户实例（支持多账户时）</td></tr><tr><td><strong>AgentId</strong></td><td>隔离的工作空间 + 会话存储（&quot;大脑&quot;）</td></tr><tr><td><strong>SessionKey</strong></td><td>用于存储上下文和控制并发的桶密钥</td></tr></tbody></table><hr><h2 id="_3-7-2-session-key-格式" tabindex="-1">3.7.2 Session Key 格式 <a class="header-anchor" href="#_3-7-2-session-key-格式" aria-label="Permalink to &quot;3.7.2 Session Key 格式&quot;">​</a></h2><h3 id="直接消息-dm" tabindex="-1">直接消息 (DM) <a class="header-anchor" href="#直接消息-dm" aria-label="Permalink to &quot;直接消息 (DM)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>直接消息默认使用主会话：</span></span>
<span class="line"><span>agent:&lt;agentId&gt;:&lt;mainKey&gt;  →  默认: agent:main:main</span></span></code></pre></div><p>![消息处理]/assets/diagrams/104_message_handling.png)</p><p>![消息格式]/assets/diagrams/80_message_format.png)</p><p>![会话上下文]/assets/diagrams/08_session_context.png)</p><h3 id="群组和频道" tabindex="-1">群组和频道 <a class="header-anchor" href="#群组和频道" aria-label="Permalink to &quot;群组和频道&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>群组: agent:&lt;agentId&gt;:&lt;channel&gt;:group:&lt;id&gt;</span></span>
<span class="line"><span>频道: agent:&lt;agentId&gt;:&lt;channel&gt;:channel:&lt;id&gt;</span></span></code></pre></div><h3 id="线程" tabindex="-1">线程 <a class="header-anchor" href="#线程" aria-label="Permalink to &quot;线程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Slack/Discord 线程: 在基础密钥上追加 :thread:&lt;threadId&gt;</span></span>
<span class="line"><span>Telegram 论坛话题: 在群组密钥中嵌入 :topic:&lt;topicId&gt;</span></span></code></pre></div><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>agent:main:telegram:group:-1001234567890:topic:42</span></span>
<span class="line"><span>agent:main:discord:channel:123456:thread:987654</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          Session Key 格式                                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │</span></span>
<span class="line"><span>│  │   直接消息 (DM)   │  │    群组聊天      │  │   频道/房间      │          │</span></span>
<span class="line"><span>│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │</span></span>
<span class="line"><span>│  │ agent:main:main  │  │ agent:main:whatsapp│ │ agent:main:slack │          │</span></span>
<span class="line"><span>│  │                  │  │ :group:123456    │  │ :channel:789    │          │</span></span>
<span class="line"><span>│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌──────────────────┐  ┌──────────────────┐                                │</span></span>
<span class="line"><span>│  │  Slack 线程      │  │  Telegram 话题   │                                │</span></span>
<span class="line"><span>│  ├──────────────────┤  ├──────────────────┤                                │</span></span>
<span class="line"><span>│  │ agent:main:slack │  │ agent:main:telegram│                                │</span></span>
<span class="line"><span>│  │ :channel:123     │  │ :group:-100123   │                                │</span></span>
<span class="line"><span>│  │ :thread:456      │  │ :topic:42        │                                │</span></span>
<span class="line"><span>│  └──────────────────┘  └──────────────────┘                                │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![消息处理]/assets/diagrams/104_message_handling.png)</p><p>![消息格式]/assets/diagrams/80_message_format.png)</p><p>![会话上下文]/assets/diagrams/08_session_context.png)</p><hr><h2 id="_3-7-3-路由优先级规则" tabindex="-1">3.7.3 路由优先级规则 <a class="header-anchor" href="#_3-7-3-路由优先级规则" aria-label="Permalink to &quot;3.7.3 路由优先级规则&quot;">​</a></h2><h3 id="优先级顺序" tabindex="-1">优先级顺序 <a class="header-anchor" href="#优先级顺序" aria-label="Permalink to &quot;优先级顺序&quot;">​</a></h3><p>OpenClaw 按以下顺序选择 Agent：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          路由优先级顺序                                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  高优先级 ←─────────────────────────────────────→ 低优先级                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  1. peer.kind + peer.id        → 精确匹配 DM/群组 ID               │   │</span></span>
<span class="line"><span>│  │  2. parentPeer                 → 线程继承                          │   │</span></span>
<span class="line"><span>│  │  3. guildId + roles            → Discord 服务器 + 角色              │   │</span></span>
<span class="line"><span>│  │  4. guildId                    → Discord 服务器                      │   │</span></span>
<span class="line"><span>│  │  5. teamId                     → Slack 工作区                       │   │</span></span>
<span class="line"><span>│  │  6. accountId                   → 账户匹配                          │   │</span></span>
<span class="line"><span>│  │  7. channel                    → 渠道级别 (任何账户)                │   │</span></span>
<span class="line"><span>│  │  8. default                    → 默认 Agent                        │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  当 binding 包含多个匹配字段时，必须所有字段都匹配才生效                      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![消息处理]/assets/diagrams/104_message_handling.png)</p><p>![消息格式]/assets/diagrams/80_message_format.png)</p><p>![会话上下文]/assets/diagrams/08_session_context.png)</p><h3 id="匹配规则详解" tabindex="-1">匹配规则详解 <a class="header-anchor" href="#匹配规则详解" aria-label="Permalink to &quot;匹配规则详解&quot;">​</a></h3><table tabindex="0"><thead><tr><th>优先级</th><th>字段</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td>1</td><td><code>peer.kind + peer.id</code></td><td>精确匹配 DM/群组 ID</td><td>WhatsApp: <code>+15551230001</code></td></tr><tr><td>2</td><td><code>parentPeer</code></td><td>线程继承</td><td>Discord 线程</td></tr><tr><td>3</td><td><code>guildId + roles</code></td><td>Discord 服务器+角色</td><td>Discord 服务器+角色</td></tr><tr><td>4</td><td><code>guildId</code></td><td>Discord 服务器</td><td>Discord 服务器 ID</td></tr><tr><td>5</td><td><code>teamId</code></td><td>Slack 工作区</td><td>Slack 团队 ID</td></tr><tr><td>6</td><td><code>accountId</code></td><td>账户匹配</td><td>多账户区分</td></tr><tr><td>7</td><td><code>channel</code></td><td>渠道级别</td><td><code>accountId: &quot;*&quot;</code></td></tr><tr><td>8</td><td><code>default</code></td><td>默认 Agent</td><td><code>agents.list[].default</code></td></tr></tbody></table><hr><h2 id="_3-7-4-binding-配置" tabindex="-1">3.7.4 Binding 配置 <a class="header-anchor" href="#_3-7-4-binding-配置" aria-label="Permalink to &quot;3.7.4 Binding 配置&quot;">​</a></h2><h3 id="基本配置" tabindex="-1">基本配置 <a class="header-anchor" href="#基本配置" aria-label="Permalink to &quot;基本配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="多维度配置" tabindex="-1">多维度配置 <a class="header-anchor" href="#多维度配置" aria-label="Permalink to &quot;多维度配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;opus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;whatsapp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;peer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;kind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;direct&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;+15551230001&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;whatsapp&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="discord-角色路由" tabindex="-1">Discord 角色路由 <a class="header-anchor" href="#discord-角色路由" aria-label="Permalink to &quot;Discord 角色路由&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;guildId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123456789012345678&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;roles&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;developer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;admin&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="slack-团队路由" tabindex="-1">Slack 团队路由 <a class="header-anchor" href="#slack-团队路由" aria-label="Permalink to &quot;Slack 团队路由&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;work&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;slack&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;teamId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;T1234567890&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_3-7-5-dmscope-配置" tabindex="-1">3.7.5 dmScope 配置 <a class="header-anchor" href="#_3-7-5-dmscope-配置" aria-label="Permalink to &quot;3.7.5 dmScope 配置&quot;">​</a></h2><h3 id="会话分桶策略" tabindex="-1">会话分桶策略 <a class="header-anchor" href="#会话分桶策略" aria-label="Permalink to &quot;会话分桶策略&quot;">​</a></h3><p><code>dmScope</code> 只控制私聊会话如何分桶，<strong>不决定</strong>消息去哪个 Agent。</p><table tabindex="0"><thead><tr><th>值</th><th>说明</th><th>适用场景</th></tr></thead><tbody><tr><td><code>main</code></td><td>所有私聊共用主会话</td><td>单用户</td></tr><tr><td><code>per-peer</code></td><td>按发送者隔离</td><td>多用户收件箱</td></tr><tr><td><code>per-channel-peer</code></td><td>按渠道+发送者隔离</td><td>多渠道多用户</td></tr><tr><td><code>per-account-channel-peer</code></td><td>按账号+渠道+发送者隔离</td><td>多账号多渠道多用户</td></tr></tbody></table><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;session&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;dmScope&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;per-channel-peer&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="主会话路由固定" tabindex="-1">主会话路由固定 <a class="header-anchor" href="#主会话路由固定" aria-label="Permalink to &quot;主会话路由固定&quot;">​</a></h3><p>当 <code>dmScope</code> 为 <code>main</code> 时，为防止非所有者 DM 覆盖会话的 <code>lastRoute</code>，OpenClaw 会从 <code>allowFrom</code> 推断固定所有者：</p><ul><li><code>allowFrom</code> 只有一个非通配符条目</li><li>该条目可以规范化为该渠道的具体发送者 ID</li><li>入站 DM 发送者不匹配固定所有者</li></ul><hr><h2 id="_3-7-6-多渠道多账户配置" tabindex="-1">3.7.6 多渠道多账户配置 <a class="header-anchor" href="#_3-7-6-多渠道多账户配置" aria-label="Permalink to &quot;3.7.6 多渠道多账户配置&quot;">​</a></h2><h3 id="多-discord-bot-配置" tabindex="-1">多 Discord Bot 配置 <a class="header-anchor" href="#多-discord-bot-配置" aria-label="Permalink to &quot;多 Discord Bot 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;accountId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;accountId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;accounts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DISCORD_BOT_TOKEN_MAIN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DISCORD_BOT_TOKEN_CODING&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="多-telegram-bot-配置" tabindex="-1">多 Telegram Bot 配置 <a class="header-anchor" href="#多-telegram-bot-配置" aria-label="Permalink to &quot;多 Telegram Bot 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;accountId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;alerts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;accountId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;alerts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;accounts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;botToken&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123456:ABC...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;alerts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;botToken&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;987654:XYZ...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="默认账户配置" tabindex="-1">默认账户配置 <a class="header-anchor" href="#默认账户配置" aria-label="Permalink to &quot;默认账户配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;whatsapp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;defaultAccount&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;personal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;accounts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;personal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;biz&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p>⚠️ <strong>重要</strong>：在多账户设置中，当配置两个或更多账户时，务必设置明确的默认账户（<code>defaultAccount</code> 或 <code>accounts.default</code>）。否则，回退路由可能会选择第一个规范化的账户 ID。</p></blockquote><hr><h2 id="_3-7-7-广播组-broadcast-groups" tabindex="-1">3.7.7 广播组 (Broadcast Groups) <a class="header-anchor" href="#_3-7-7-广播组-broadcast-groups" aria-label="Permalink to &quot;3.7.7 广播组 (Broadcast Groups)&quot;">​</a></h2><h3 id="功能说明" tabindex="-1">功能说明 <a class="header-anchor" href="#功能说明" aria-label="Permalink to &quot;功能说明&quot;">​</a></h3><p>广播组允许在 OpenClaw 通常会回复的同一对等体上运行<strong>多个 Agent</strong>（例如：WhatsApp 群组中，提及/激活门控后）。</p><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;broadcast&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;strategy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;parallel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;120363403215116621@g.us&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;alfred&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;baerbel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;+15555550123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;support&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;logger&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="工作方式" tabindex="-1">工作方式 <a class="header-anchor" href="#工作方式" aria-label="Permalink to &quot;工作方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          广播组工作流程                                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  用户在群组中 @提及 Agent                                                      │</span></span>
<span class="line"><span>│           │                                                                    │</span></span>
<span class="line"><span>│           ▼                                                                    │</span></span>
<span class="line"><span>│  Gateway 接收消息                                                            │</span></span>
<span class="line"><span>│           │                                                                    │</span></span>
<span class="line"><span>│           ▼                                                                    │</span></span>
<span class="line"><span>│  检查 broadcast 配置                                                           │</span></span>
<span class="line"><span>│           │                                                                    │</span></span>
<span class="line"><span>│           ▼                                                                    │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │  匹配到广播组: [&quot;alfred&quot;, &quot;baerbel&quot;]                                │    │</span></span>
<span class="line"><span>│  │  ↓                                                                   │    │</span></span>
<span class="line"><span>│  │  并行运行多个 Agent                                                  │    │</span></span>
<span class="line"><span>│  │  ┌─────────────┐  ┌─────────────┐                                 │    │</span></span>
<span class="line"><span>│  │  │   alfred    │  │  baerbel    │  ← 同时处理请求                 │    │</span></span>
<span class="line"><span>│  │  └─────────────┘  └─────────────┘                                 │    │</span></span>
<span class="line"><span>│  │  ↓                                                                   │    │</span></span>
<span class="line"><span>│  │  合并结果                                                           │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>│           │                                                                    │</span></span>
<span class="line"><span>│           ▼                                                                    │</span></span>
<span class="line"><span>│  返回合并后的响应                                                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-7-8-路由流程图" tabindex="-1">3.7.8 路由流程图 <a class="header-anchor" href="#_3-7-8-路由流程图" aria-label="Permalink to &quot;3.7.8 路由流程图&quot;">​</a></h2><h3 id="完整路由决策流程" tabindex="-1">完整路由决策流程 <a class="header-anchor" href="#完整路由决策流程" aria-label="Permalink to &quot;完整路由决策流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          消息路由决策流程                                        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                              收到消息</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  1. Channel 接收       │</span></span>
<span class="line"><span>                    │  规范化消息格式         │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  2. 认证检查            │</span></span>
<span class="line"><span>                    │  API Key/Token 验证    │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  3. Binding 匹配       │</span></span>
<span class="line"><span>                    │  按优先级顺序           │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                    ┌────────────┴────────────┐</span></span>
<span class="line"><span>                    │                         │</span></span>
<span class="line"><span>                   是│匹配                     │否</span></span>
<span class="line"><span>                    ▼                         ▼</span></span>
<span class="line"><span>        ┌───────────────────┐    ┌─────────────────────────┐</span></span>
<span class="line"><span>        │ 使用匹配的 Agent  │    │ 使用默认 Agent         │</span></span>
<span class="line"><span>        └────────┬──────────┘    │ (agents.list.default) │</span></span>
<span class="line"><span>                 │                 └────────────┬────────────┘</span></span>
<span class="line"><span>                 ▼                               │</span></span>
<span class="line"><span>    ┌─────────────────────┐                      │</span></span>
<span class="line"><span>    │ 4. Session Key 生成  │                      │</span></span>
<span class="line"><span>    │  (dmScope 策略)    │                      │</span></span>
<span class="line"><span>    └──────────┬──────────┘                      │</span></span>
<span class="line"><span>               │                                   │</span></span>
<span class="line"><span>               ▼                                   │</span></span>
<span class="line"><span>    ┌─────────────────────┐                      │</span></span>
<span class="line"><span>    │ 5. Agent 处理       │                      │</span></span>
<span class="line"><span>    │ - 加载工作空间     │                      │</span></span>
<span class="line"><span>    │ - 加载记忆         │                      │</span></span>
<span class="line"><span>    │ - 执行任务         │                      │</span></span>
<span class="line"><span>    └──────────┬──────────┘                      │</span></span>
<span class="line"><span>               │                                   │</span></span>
<span class="line"><span>               └────────────┬──────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>                 ┌─────────────────────┐</span></span>
<span class="line"><span>                 │  6. 返回响应        │</span></span>
<span class="line"><span>                 │  (原渠道返回)      │</span></span>
<span class="line"><span>                 └─────────────────────┘</span></span></code></pre></div><h3 id="binding-匹配流程" tabindex="-1">Binding 匹配流程 <a class="header-anchor" href="#binding-匹配流程" aria-label="Permalink to &quot;Binding 匹配流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           Binding 匹配流程                                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                              消息上下文</span></span>
<span class="line"><span>                    (channel, accountId, peer, guildId, ...)</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  1. peer 匹配          │</span></span>
<span class="line"><span>                    │  peer.kind + peer.id   │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  2. parentPeer 匹配    │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  3. guildId + roles    │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  4. guildId 匹配       │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                           否    │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  5. teamId 匹配        │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  6. accountId 匹配     │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  7. channel 匹配       │</span></span>
<span class="line"><span>                    │  (任何账户)           │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │ 匹配?</span></span>
<span class="line"><span>                           是───→│</span></span>
<span class="line"><span>                            否   │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │    使用默认 Agent        │</span></span>
<span class="line"><span>                    │ agents.list.default    │</span></span>
<span class="line"><span>                    └─────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-7-9-管理命令" tabindex="-1">3.7.9 管理命令 <a class="header-anchor" href="#_3-7-9-管理命令" aria-label="Permalink to &quot;3.7.9 管理命令&quot;">​</a></h2><h3 id="查看-bindings" tabindex="-1">查看 Bindings <a class="header-anchor" href="#查看-bindings" aria-label="Permalink to &quot;查看 Bindings&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看所有 bindings</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看特定渠道的 bindings</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --channel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> telegram</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 详细查看</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">binding-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h3 id="管理-bindings" tabindex="-1">管理 Bindings <a class="header-anchor" href="#管理-bindings" aria-label="Permalink to &quot;管理 Bindings&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 binding</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> telegram:main</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 移除 binding</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remove</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">binding-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试路由</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message.route</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;source&quot;:&quot;telegram&quot;,&quot;peer&quot;:&quot;123456789&quot;}&#39;</span></span></code></pre></div><h3 id="调试命令" tabindex="-1">调试命令 <a class="header-anchor" href="#调试命令" aria-label="Permalink to &quot;调试命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看路由日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> routing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看会话状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sessions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Gateway 状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span></code></pre></div><hr><h2 id="_3-7-10-常见问题" tabindex="-1">3.7.10 常见问题 <a class="header-anchor" href="#_3-7-10-常见问题" aria-label="Permalink to &quot;3.7.10 常见问题&quot;">​</a></h2><h3 id="q1-消息没有路由到正确的-agent" tabindex="-1">Q1: 消息没有路由到正确的 Agent <a class="header-anchor" href="#q1-消息没有路由到正确的-agent" aria-label="Permalink to &quot;Q1: 消息没有路由到正确的 Agent&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 bindings 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查匹配顺序</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确认 peer/guildId 等字段是否正确</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试路由</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message.route</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;source&quot;:&quot;telegram&quot;,&quot;peer&quot;:&quot;123456789&quot;,&quot;channel&quot;:&quot;telegram&quot;}&#39;</span></span></code></pre></div><h3 id="q2-多账户路由混乱" tabindex="-1">Q2: 多账户路由混乱 <a class="header-anchor" href="#q2-多账户路由混乱" aria-label="Permalink to &quot;Q2: 多账户路由混乱&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 accountId 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> channels.telegram.accounts</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确认 bindings 中的 accountId 匹配</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 建议使用明确的 accountId 匹配</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 defaultAccount 避免回退路由问题</span></span></code></pre></div><h3 id="q3-discord-角色路由不生效" tabindex="-1">Q3: Discord 角色路由不生效 <a class="header-anchor" href="#q3-discord-角色路由不生效" aria-label="Permalink to &quot;Q3: Discord 角色路由不生效&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 guildId 是否正确</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 需要使用 Discord 服务器 ID，不是频道 ID</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查角色名称/ID</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确认角色配置正确</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 所有字段必须全部匹配才能生效</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>消息路由</strong>：Gateway 核心功能，消息回复返回原渠道</li><li><strong>Session Key</strong>：按 DM/群组/频道/线程区分会话</li><li><strong>Binding 规则</strong>：8 级优先级，精确匹配优先</li><li><strong>dmScope</strong>：控制私聊会话分桶策略</li><li><strong>广播组</strong>：同一消息触发多个 Agent 并行处理</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>配置一个简单的 Binding 规则</li><li>测试消息路由是否正确</li><li>配置多渠道多 Agent 路由</li><li>尝试配置广播组</li></ol>`,104)])])}const E=a(l,[["render",t]]);export{r as __pageData,E as default};
