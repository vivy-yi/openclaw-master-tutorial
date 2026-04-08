import{_ as a,o as n,c as p,ae as i}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"群组多 Agent 通信机制完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/19_Agent管理专题/28.11_group_agent_communication.md","filePath":"chapters/19_Agent管理专题/28.11_group_agent_communication.md"}'),l={name:"chapters/19_Agent管理专题/28.11_group_agent_communication.md"};function e(t,s,h,k,c,r){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="群组多-agent-通信机制完全指南" tabindex="-1">群组多 Agent 通信机制完全指南 <a class="header-anchor" href="#群组多-agent-通信机制完全指南" aria-label="Permalink to &quot;群组多 Agent 通信机制完全指南&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解群组内 Agent 之间的通信机制</li><li>掌握会话隔离架构及其影响</li><li>理解消息发送和消费规则</li><li>选择合适的群组多 Agent 方案</li></ul><hr><h2 id="_1-核心问题解答" tabindex="-1">1. 核心问题解答 <a class="header-anchor" href="#_1-核心问题解答" aria-label="Permalink to &quot;1. 核心问题解答&quot;">​</a></h2><h3 id="_1-1-群组内多个-agent-可以相互通信吗" tabindex="-1">1.1 群组内多个 Agent 可以相互通信吗？ <a class="header-anchor" href="#_1-1-群组内多个-agent-可以相互通信吗" aria-label="Permalink to &quot;1.1 群组内多个 Agent 可以相互通信吗？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         Agent 能否相互通信？                                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  答案：不能直接通信                                                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  原因：每个 Agent 有独立的会话空间（Session Isolation）                         │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  • Agent A 的会话 → Agent A 独有                                             │</span></span>
<span class="line"><span>│  • Agent B 的会话 → Agent B 独有                                             │</span></span>
<span class="line"><span>│  • Agent A 无法看到 Agent B 的会话内容                                        │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📌 这是设计决策，目的是：                                                     │</span></span>
<span class="line"><span>│     - 保护每个 Agent 的独立思考空间                                            │</span></span>
<span class="line"><span>│     - 避免 Agent 之间相互干扰                                                  │</span></span>
<span class="line"><span>│     - 支持不同 Agent 处理不同任务                                             │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-agent-可以向群组发送消息吗" tabindex="-1">1.2 Agent 可以向群组发送消息吗？ <a class="header-anchor" href="#_1-2-agent-可以向群组发送消息吗" aria-label="Permalink to &quot;1.2 Agent 可以向群组发送消息吗？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Agent 能否向群组发送消息？                                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  答案：可以，所有 Agent 都可以独立向群组发送消息                                │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  广播组（Broadcast Groups）模式：                                              │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  用户消息                                                                       │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    广播组配置                                        │      │</span></span>
<span class="line"><span>│  │  &quot;broadcast&quot;: {                                                    │      │</span></span>
<span class="line"><span>│  │    &quot;群组ID&quot;: [&quot;agent-A&quot;, &quot;agent-B&quot;, &quot;agent-C&quot;]                     │      │</span></span>
<span class="line"><span>│  │  }                                                                  │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  所有 Agent 并行处理 → 各自独立回复群组                                        │</span></span>
<span class="line"><span>│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                         │</span></span>
<span class="line"><span>│  │ Agent A     │  │ Agent B     │  │ Agent C     │                         │</span></span>
<span class="line"><span>│  │ 回复群组    │  │ 回复群组    │  │ 回复群组    │                         │</span></span>
<span class="line"><span>│  └─────────────┘  └─────────────┘  └─────────────┘                         │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-3-agent-可以消费-读取-群组消息吗" tabindex="-1">1.3 Agent 可以消费（读取）群组消息吗？ <a class="header-anchor" href="#_1-3-agent-可以消费-读取-群组消息吗" aria-label="Permalink to &quot;1.3 Agent 可以消费（读取）群组消息吗？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Agent 能否读取群组消息？                                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  用户消息 → 所有 Agent 都能看到                                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    群组消息流                                        │      │</span></span>
<span class="line"><span>│  │                                                                     │      │</span></span>
<span class="line"><span>│  │   用户: &quot;帮我审查这段代码&quot;                                         │      │</span></span>
<span class="line"><span>│  │         │                                                           │      │</span></span>
<span class="line"><span>│  │         ▼                                                           │      │</span></span>
<span class="line"><span>│  │   ┌─────────────────────────────────────────────────────────┐     │      │</span></span>
<span class="line"><span>│  │   │              共享上下文缓冲区 (Shared Context)             │     │      │</span></span>
<span class="line"><span>│  │   │  • 最近 N 条消息（由 groupContextBuffer 配置）            │     │      │</span></span>
<span class="line"><span>│  │   │  • 所有 Agent 都能看到相同的用户消息                        │     │      │</span></span>
<span class="line"><span>│  │   └─────────────────────────────────────────────────────────┘     │      │</span></span>
<span class="line"><span>│  │         │                                                           │      │</span></span>
<span class="line"><span>│  │         ▼                                                           │      │</span></span>
<span class="line"><span>│  │   Agent A ← 看到用户消息 ✓                                        │      │</span></span>
<span class="line"><span>│  │   Agent B ← 看到用户消息 ✓                                        │      │</span></span>
<span class="line"><span>│  │   Agent C ← 看到用户消息 ✓                                        │      │</span></span>
<span class="line"><span>│  │                                                                     │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  Agent 响应 → 其他 Agent 无法看到                                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    Agent 响应隔离                                    │      │</span></span>
<span class="line"><span>│  │                                                                     │      │</span></span>
<span class="line"><span>│  │   Agent A 回复 → Agent B 看不到 ✗                                 │      │</span></span>
<span class="line"><span>│  │   Agent B 回复 → Agent C 看不到 ✗                                 │      │</span></span>
<span class="line"><span>│  │   Agent C 回复 → Agent A 看不到 ✗                                 │      │</span></span>
<span class="line"><span>│  │                                                                     │      │</span></span>
<span class="line"><span>│  │   📌 这是故意的设计！                                              │      │</span></span>
<span class="line"><span>│  │      避免 Agent 之间&quot;作弊&quot;或依赖彼此的答案                         │      │</span></span>
<span class="line"><span>│  │                                                                     │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_2-共享上下文缓冲区" tabindex="-1">2. 共享上下文缓冲区 <a class="header-anchor" href="#_2-共享上下文缓冲区" aria-label="Permalink to &quot;2. 共享上下文缓冲区&quot;">​</a></h2><h3 id="_2-1-什么是共享上下文缓冲区" tabindex="-1">2.1 什么是共享上下文缓冲区？ <a class="header-anchor" href="#_2-1-什么是共享上下文缓冲区" aria-label="Permalink to &quot;2.1 什么是共享上下文缓冲区？&quot;">​</a></h3><p>当用户在群组中发送消息时，OpenClaw 会将该消息及其上下文存储在一个共享缓冲区中。所有配置在广播组中的 Agent 都能访问这个共享缓冲区。</p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    groupContextBuffer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 共享最近 10 条消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  broadcast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;parallel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;群组ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;agent-A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;agent-B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;agent-C&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_2-2-共享上下文的内容" tabindex="-1">2.2 共享上下文的内容 <a class="header-anchor" href="#_2-2-共享上下文的内容" aria-label="Permalink to &quot;2.2 共享上下文的内容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         共享上下文内容                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  包含：                                                                       │</span></span>
<span class="line"><span>│  ✓ 用户发送的消息                                                             │</span></span>
<span class="line"><span>│  ✓ 用户 @提及机器人的消息                                                     │</span></span>
<span class="line"><span>│  ✓ 群组名称和 ID                                                             │</span></span>
<span class="line"><span>│  ✓ 发送者信息                                                                │</span></span>
<span class="line"><span>│  ✓ 历史消息（由 groupContextBuffer 决定数量）                                │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│ 不包含：                                                                      │</span></span>
<span class="line"><span>│  ✗ 其他 Agent 的响应（每个 Agent 独立处理）                                  │</span></span>
<span class="line"><span>│  ✗ 其他 Agent 的思考过程                                                      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-两种群组多-agent-方案对比" tabindex="-1">3. 两种群组多 Agent 方案对比 <a class="header-anchor" href="#_3-两种群组多-agent-方案对比" aria-label="Permalink to &quot;3. 两种群组多 Agent 方案对比&quot;">​</a></h2><h3 id="_3-1-方案一-广播组-broadcast-groups" tabindex="-1">3.1 方案一：广播组（Broadcast Groups） <a class="header-anchor" href="#_3-1-方案一-广播组-broadcast-groups" aria-label="Permalink to &quot;3.1 方案一：广播组（Broadcast Groups）&quot;">​</a></h3><p><strong>适用场景</strong>：WhatsApp 群组，需要多个 Agent 同时处理用户消息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         广播组工作模式                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  特点：                                                                       │</span></span>
<span class="line"><span>│  • 多个 Agent 并行处理同一用户消息                                             │</span></span>
<span class="line"><span>│  • 每个 Agent 独立思考、独立回复                                               │</span></span>
<span class="line"><span>│  • 所有回复都会发送到群组                                                      │</span></span>
<span class="line"><span>│  • Agent 之间不能看到彼此的响应                                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  支持平台：                                                                   │</span></span>
<span class="line"><span>│  • WhatsApp (✅ 已支持，实验性)                                               │</span></span>
<span class="line"><span>│  • Telegram (🚧 计划中)                                                       │</span></span>
<span class="line"><span>│  • 飞书 (🚧 计划中)                                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>配置示例：</strong></p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;code-reviewer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/codereview&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;security&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/security&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  broadcast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;parallel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// parallel | sequential</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;120363403215116621@g.us&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;code-reviewer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;security&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_3-2-方案二-主-agent-子-agent-binding-sessions-spawn" tabindex="-1">3.2 方案二：主 Agent + 子 Agent（Binding + sessions_spawn） <a class="header-anchor" href="#_3-2-方案二-主-agent-子-agent-binding-sessions-spawn" aria-label="Permalink to &quot;3.2 方案二：主 Agent + 子 Agent（Binding + sessions_spawn）&quot;">​</a></h3><p><strong>适用场景</strong>：所有平台，需要主 Agent 协调多个子 Agent</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    主 Agent + 子 Agent 工作模式                                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  特点：                                                                       │</span></span>
<span class="line"><span>│  • 群组只绑定一个主 Agent                                                      │</span></span>
<span class="line"><span>│  • 主 Agent 接收用户消息                                                       │</span></span>
<span class="line"><span>│  • 主 Agent 使用 sessions_spawn 调用子 Agent                                   │</span></span>
<span class="line"><span>│  • 主 Agent 汇总子 Agent 结果后再回复群组                                       │</span></span>
<span class="line"><span>│  • 只有主 Agent 发送消息到群组                                                │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  支持平台：                                                                   │</span></span>
<span class="line"><span>│  • WhatsApp ✅                                                                │</span></span>
<span class="line"><span>│  • Telegram ✅                                                                 │</span></span>
<span class="line"><span>│  • 飞书 ✅                                                                    │</span></span>
<span class="line"><span>│  • Discord ✅                                                                  │</span></span>
<span class="line"><span>│  • Slack ✅                                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>配置示例：</strong></p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/agents/docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    agentToAgent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bindings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      agentId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        peer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在主 Agent 的 AGENTS.md 中配置：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 任务分发规则</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">当收到用户消息时，根据内容判断调用哪个子 Agent：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 包含代码/编程/调试 → 使用 sessions_spawn 调用 coder Agent</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 包含文档/写作 → 使用 sessions_spawn 调用 docs Agent</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 其他 → 主 Agent 自行处理</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">使用 sessions_spawn 的示例：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  task: &quot;请审查这段代码&quot;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  agentId: &quot;coder&quot;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  timeout: 120</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_3-3-核心差异对比" tabindex="-1">3.3 核心差异对比 <a class="header-anchor" href="#_3-3-核心差异对比" aria-label="Permalink to &quot;3.3 核心差异对比&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         方案对比                                               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  对比项          │  广播组              │  主 Agent + 子 Agent               │</span></span>
<span class="line"><span>│  ────────────────┼─────────────────────┼─────────────────────────────        │</span></span>
<span class="line"><span>│  消息回复        │  所有 Agent 独立回复  │  只有主 Agent 回复                │</span></span>
<span class="line"><span>│  Agent 间通信    │  无（隔离）          │  主 Agent 调用子 Agent            │</span></span>
<span class="line"><span>│  结果整合        │  用户自行整合         │  主 Agent 汇总后回复              │</span></span>
<span class="line"><span>│  适用场景        │  多视角分析           │  复杂任务分解                     │</span></span>
<span class="line"><span>│  支持平台        │  仅 WhatsApp         │  所有平台                         │</span></span>
<span class="line"><span>│  复杂度          │  低                  │  中                              │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-agent-之间的通信方式" tabindex="-1">4. Agent 之间的通信方式 <a class="header-anchor" href="#_4-agent-之间的通信方式" aria-label="Permalink to &quot;4. Agent 之间的通信方式&quot;">​</a></h2><p>虽然同一个群组内的 Agent 不能直接相互通信，但可以通过以下方式实现协作：</p><h3 id="_4-1-通过主-agent-协调-推荐" tabindex="-1">4.1 通过主 Agent 协调（推荐） <a class="header-anchor" href="#_4-1-通过主-agent-协调-推荐" aria-label="Permalink to &quot;4.1 通过主 Agent 协调（推荐）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    通过主 Agent 协调工作流                                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  用户消息                                                                       │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  主 Agent 接收消息                                                             │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ├── 使用 sessions_spawn 调用子 Agent A                                   │</span></span>
<span class="line"><span>│      │       │                                                               │</span></span>
<span class="line"><span>│      │       ▼                                                               │</span></span>
<span class="line"><span>│      │   子 Agent A 处理 → 返回结果                                          │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ├── 使用 sessions_spawn 调用子 Agent B                                   │</span></span>
<span class="line"><span>│      │       │                                                               │</span></span>
<span class="line"><span>│      │       ▼                                                               │</span></span>
<span class="line"><span>│      │   子 Agent B 处理 → 返回结果                                          │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  主 Agent 汇总结果 → 回复群组                                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_4-2-通过共享工作区文件" tabindex="-1">4.2 通过共享工作区文件 <a class="header-anchor" href="#_4-2-通过共享工作区文件" aria-label="Permalink to &quot;4.2 通过共享工作区文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    通过共享文件协作                                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  所有 Agent 配置相同的工作区：                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  {                                                                             │</span></span>
<span class="line"><span>│    agents: {                                                                   │</span></span>
<span class="line"><span>│      list: [                                                                  │</span></span>
<span class="line"><span>│        { id: &quot;agent-A&quot;, workspace: &quot;~/shared-workspace&quot; },                     │</span></span>
<span class="line"><span>│        { id: &quot;agent-B&quot;, workspace: &quot;~/shared-workspace&quot; }                      │</span></span>
<span class="line"><span>│      ]                                                                        │</span></span>
<span class="line"><span>│    }                                                                           │</span></span>
<span class="line"><span>│  }                                                                             │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  协作方式：                                                                    │</span></span>
<span class="line"><span>│  • Agent A 写入文件 /tmp/agent-A-result.txt                                   │</span></span>
<span class="line"><span>│  • Agent B 读取该文件获取 Agent A 的结果                                       │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ⚠️ 注意：这是一种 hack 方式，不推荐用于生产环境                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_5-会话隔离详解" tabindex="-1">5. 会话隔离详解 <a class="header-anchor" href="#_5-会话隔离详解" aria-label="Permalink to &quot;5. 会话隔离详解&quot;">​</a></h2><h3 id="_5-1-什么是会话隔离" tabindex="-1">5.1 什么是会话隔离？ <a class="header-anchor" href="#_5-1-什么是会话隔离" aria-label="Permalink to &quot;5.1 什么是会话隔离？&quot;">​</a></h3><p>每个 Agent 在群组中有独立的会话（Session），这些会话彼此隔离，无法相互访问。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         会话隔离架构                                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  群组消息                                                                       │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    共享上下文缓冲区                                  │      │</span></span>
<span class="line"><span>│  │  (所有 Agent 可见)                                                   │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│      │                                                                       │</span></span>
<span class="line"><span>│      ▼                                                                       │</span></span>
<span class="line"><span>│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │</span></span>
<span class="line"><span>│  │   Agent A        │  │   Agent B        │  │   Agent C        │          │</span></span>
<span class="line"><span>│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │</span></span>
<span class="line"><span>│  │ │ 会话 A-1     │ │  │ │ 会话 B-1     │ │  │ │ 会话 C-1     │ │          │</span></span>
<span class="line"><span>│  │ │ (独立存储)   │ │  │ │ (独立存储)   │ │  │ │ (独立存储)   │ │          │</span></span>
<span class="line"><span>│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │</span></span>
<span class="line"><span>│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │</span></span>
<span class="line"><span>│  │ │ 会话 A-2     │ │  │ │ 会话 B-2     │ │  │ │ 会话 C-2     │ │          │</span></span>
<span class="line"><span>│  │ │ (独立存储)   │ │  │ │ (独立存储)   │ │  │ │ (独立存储)   │ │          │</span></span>
<span class="line"><span>│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │</span></span>
<span class="line"><span>│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📌 Agent A 无法访问会话 B-1 或会话 C-1                                      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_5-2-会话隔离的配置" tabindex="-1">5.2 会话隔离的配置 <a class="header-anchor" href="#_5-2-会话隔离的配置" aria-label="Permalink to &quot;5.2 会话隔离的配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    defaults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 控制会话可见性</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        sessionToolsVisibility</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;spawned&quot;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> 只看到自己生成的会话</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">        //</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> 或</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;all&quot;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> -</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> 可见所有会话（谨慎使用）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_5-3-会话隔离的影响" tabindex="-1">5.3 会话隔离的影响 <a class="header-anchor" href="#_5-3-会话隔离的影响" aria-label="Permalink to &quot;5.3 会话隔离的影响&quot;">​</a></h3><table tabindex="0"><thead><tr><th>操作</th><th>是否允许</th></tr></thead><tbody><tr><td>Agent A 读取用户消息</td><td>✅ 允许</td></tr><tr><td>Agent A 读取 Agent B 的会话</td><td>❌ 禁止</td></tr><tr><td>Agent A 读取共享上下文</td><td>✅ 允许</td></tr><tr><td>Agent A 发送消息到群组</td><td>✅ 允许（广播组模式）</td></tr><tr><td>Agent A 调用 Agent B（通过 sessions_spawn）</td><td>✅ 允许（需要配置 agentToAgent）</td></tr></tbody></table><hr><h2 id="_6-未来计划-来自官方文档" tabindex="-1">6. 未来计划（来自官方文档） <a class="header-anchor" href="#_6-未来计划-来自官方文档" aria-label="Permalink to &quot;6. 未来计划（来自官方文档）&quot;">​</a></h2><p>根据 OpenClaw 官方文档 <a href="https://github.com/openclaw/openclaw/blob/main/docs/channels/broadcast-groups.md#future-enhancements" target="_blank" rel="noreferrer">broadcast-groups.md</a>，以下功能仍在规划中，<strong>尚未实现</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    官方规划中的未来功能                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  1. 共享上下文模式 (Shared Context Mode) 🚧                                   │</span></span>
<span class="line"><span>│     • Agent 之间可以看到彼此的响应                                              │</span></span>
<span class="line"><span>│     • 支持 Agent 协调和讨论                                                     │</span></span>
<span class="line"><span>│     • 状态：规划中 - 尚未实现                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  2. Agent 协调器 (Agent Coordination) 🚧                                       │</span></span>
<span class="line"><span>│     • Agent 之间可以相互发送信号                                               │</span></span>
<span class="line"><span>│     • 支持 Agent 之间传递结果                                                  │</span></span>
<span class="line"><span>│     • 状态：规划中 - 尚未实现                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  3. 动态 Agent 选择 (Dynamic Agent Selection) 🚧                              │</span></span>
<span class="line"><span>│     • 根据消息内容选择 Agent                                                   │</span></span>
<span class="line"><span>│     • 状态：规划中 - 尚未实现                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  4. Agent 优先级 (Agent Priorities) 🚧                                         │</span></span>
<span class="line"><span>│     • 部分 Agent 可以优先响应                                                   │</span></span>
<span class="line"><span>│     • 状态：规划中 - 尚未实现                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  5. 跨平台广播                                                                 │</span></span>
<span class="line"><span>│     • Telegram、飞书、Discord、Slack 支持广播组                                │</span></span>
<span class="line"><span>│     • 状态：仅 WhatsApp 已实现，其他平台规划中                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><blockquote><p>⚠️ <strong>重要说明</strong>：上述&quot;共享上下文模式&quot;和&quot;Agent 协调器&quot;功能目前尚未实现。当前广播组的设计是<strong>故意隔离</strong>的，每个 Agent 只能看到共享的群组消息，不能看到其他 Agent 的响应。</p></blockquote><hr><h2 id="_7-最佳实践" tabindex="-1">7. 最佳实践 <a class="header-anchor" href="#_7-最佳实践" aria-label="Permalink to &quot;7. 最佳实践&quot;">​</a></h2><h3 id="_7-1-选择合适的方案" tabindex="-1">7.1 选择合适的方案 <a class="header-anchor" href="#_7-1-选择合适的方案" aria-label="Permalink to &quot;7.1 选择合适的方案&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐方案</th></tr></thead><tbody><tr><td>需要多个 Agent 同时回复用户</td><td>广播组（仅 WhatsApp）</td></tr><tr><td>需要任务分解和结果汇总</td><td>主 Agent + 子 Agent</td></tr><tr><td>简单分流（不同群组不同 Agent）</td><td>Binding 路由</td></tr><tr><td>同一群组不同话题不同 Agent</td><td>话题隔离（Telegram/飞书）</td></tr></tbody></table><h3 id="_7-2-设计原则" tabindex="-1">7.2 设计原则 <a class="header-anchor" href="#_7-2-设计原则" aria-label="Permalink to &quot;7.2 设计原则&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    群组多 Agent 设计原则                                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  1. 单一职责                                                                    │</span></span>
<span class="line"><span>│     每个 Agent 只专注一个领域                                                   │</span></span>
<span class="line"><span>│     ✅ 正确: code-reviewer, security, docs                                      │</span></span>
<span class="line"><span>│     ❌ 错误: all-in-one-helper                                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  2. 清晰接口                                                                    │</span></span>
<span class="line"><span>│     定义 Agent 之间的消息格式                                                   │</span></span>
<span class="line"><span>│     使用结构化提示词确保一致性                                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  3. 结果整合                                                                    │</span></span>
<span class="line"><span>│     广播组：用户需要自行整合多个 Agent 的回复                                   │</span></span>
<span class="line"><span>│     主从模式：主 Agent 负责整合后再回复                                         │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  4. 避免重复                                                                  │</span></span>
<span class="line"><span>│     广播组中 Agent 不应处理完全相同的任务                                       │</span></span>
<span class="line"><span>│     每个 Agent 应该有独特的视角或职责                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><p><strong>Agent 不能直接相互通信</strong>：由于会话隔离，每个 Agent 只能看到共享的群组上下文，不能看到其他 Agent 的会话内容</p></li><li><p><strong>所有 Agent 都可以发送消息</strong>：在广播组模式下，所有配置的 Agent 都可以独立回复群组</p></li><li><p><strong>消息消费规则</strong>：</p><ul><li>✅ Agent 可以消费（读取）用户消息</li><li>✅ Agent 可以访问共享上下文缓冲区</li><li>❌ Agent 不能消费其他 Agent 的响应</li></ul></li><li><p><strong>两种主要方案</strong>：</p><ul><li>广播组：多 Agent 并行处理，独立回复（仅 WhatsApp）</li><li>主 Agent + 子 Agent：主 Agent 协调，汇总后回复（所有平台）</li></ul></li><li><p><strong>选择依据</strong>：根据是否需要多 Agent 同时回复、是否需要结果整合、目标平台等因素选择合适方案</p></li></ol><hr><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/concepts/multi-agent.md" target="_blank" rel="noreferrer">多智能体路由 - 官方文档</a></li><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/broadcast-groups.md" target="_blank" rel="noreferrer">广播群组 - 官方文档</a></li><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/concepts/session-tool.md" target="_blank" rel="noreferrer">会话工具 - 官方文档</a></li></ul>`,67)])])}const o=a(l,[["render",e]]);export{d as __pageData,o as default};
