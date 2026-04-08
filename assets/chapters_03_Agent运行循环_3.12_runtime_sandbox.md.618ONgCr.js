import{_ as a,o as i,c as n,ae as p}from"./chunks/framework.Czhw_PXq.js";const g=JSON.parse('{"title":"3.12 Agent 运行时与沙盒完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.12_runtime_sandbox.md","filePath":"chapters/03_Agent运行循环/3.12_runtime_sandbox.md"}'),l={name:"chapters/03_Agent运行循环/3.12_runtime_sandbox.md"};function t(h,s,e,k,E,d){return i(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-12-agent-运行时与沙盒完全指南" tabindex="-1">3.12 Agent 运行时与沙盒完全指南 <a class="header-anchor" href="#_3-12-agent-运行时与沙盒完全指南" aria-label="Permalink to &quot;3.12 Agent 运行时与沙盒完全指南&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解 Agent 运行时架构</li><li>掌握沙盒机制的工作原理</li><li>学会配置安全隔离</li><li>理解资源限制和管理</li></ul><hr><h2 id="_12-1-agent-运行时概述" tabindex="-1">12.1 Agent 运行时概述 <a class="header-anchor" href="#_12-1-agent-运行时概述" aria-label="Permalink to &quot;12.1 Agent 运行时概述&quot;">​</a></h2><h3 id="什么是-agent-运行时" tabindex="-1">什么是 Agent 运行时 <a class="header-anchor" href="#什么是-agent-运行时" aria-label="Permalink to &quot;什么是 Agent 运行时&quot;">​</a></h3><p>Agent 运行时是 OpenClaw 执行 Agent 代码的环境，提供了代码执行的隔离空间和资源管理能力。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           Agent 运行时架构                                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                       │</span></span>
<span class="line"><span>│  │   用户请求   │───▶│   消息路由   │───▶│  Agent 运行时 │                     │</span></span>
<span class="line"><span>│  └─────────────┘    └─────────────┘    └─────────────┘                       │</span></span>
<span class="line"><span>│                                                  │                              │</span></span>
<span class="line"><span>│                    ┌────────────────────────────┼────────────────────────┐   │</span></span>
<span class="line"><span>│                    │                            │                        │   │</span></span>
<span class="line"><span>│                    ▼                            ▼                        ▼   │</span></span>
<span class="line"><span>│           ┌─────────────┐              ┌─────────────┐              ┌────────┐│</span></span>
<span class="line"><span>│           │   沙盒环境   │              │  工具执行器  │              │  上下文 ││</span></span>
<span class="line"><span>│           │  (Sandbox)  │              │  (Executor) │              │  管理   ││</span></span>
<span class="line"><span>│           └─────────────┘              └─────────────┘              └────────┘│</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![运行时沙箱]/assets/diagrams/28_runtime_sandbox.png)</p><h3 id="运行时的核心职责" tabindex="-1">运行时的核心职责 <a class="header-anchor" href="#运行时的核心职责" aria-label="Permalink to &quot;运行时的核心职责&quot;">​</a></h3><table tabindex="0"><thead><tr><th>职责</th><th>说明</th></tr></thead><tbody><tr><td>代码执行</td><td>在隔离环境中执行 Agent 代码</td></tr><tr><td>工具调用</td><td>管理工具的调用和结果返回</td></tr><tr><td>资源限制</td><td>控制内存、CPU、执行时间</td></tr><tr><td>安全保障</td><td>防止恶意操作和资源滥用</td></tr><tr><td>状态管理</td><td>维护执行状态和会话上下文</td></tr></tbody></table><hr><h2 id="_12-2-沙盒机制详解" tabindex="-1">12.2 沙盒机制详解 <a class="header-anchor" href="#_12-2-沙盒机制详解" aria-label="Permalink to &quot;12.2 沙盒机制详解&quot;">​</a></h2><h3 id="沙盒是什么" tabindex="-1">沙盒是什么 <a class="header-anchor" href="#沙盒是什么" aria-label="Permalink to &quot;沙盒是什么&quot;">​</a></h3><p>沙盒（Sandbox）是 Agent 运行时的核心隔离机制，确保 Agent 的操作不会影响宿主系统和其他 Agent。</p><h3 id="沙盒的核心特性" tabindex="-1">沙盒的核心特性 <a class="header-anchor" href="#沙盒的核心特性" aria-label="Permalink to &quot;沙盒的核心特性&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           沙盒核心特性                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │</span></span>
<span class="line"><span>│  │   文件隔离   │  │   网络隔离   │  │  进程隔离   │  │  权限控制   │           │</span></span>
<span class="line"><span>│  │             │  │             │  │             │  │             │           │</span></span>
<span class="line"><span>│  │  独立工作区  │  │  受限域名    │  │  子进程限制  │  │  最小权限   │           │</span></span>
<span class="line"><span>│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![运行时沙箱]/assets/diagrams/28_runtime_sandbox.png)</p><h3 id="文件系统隔离" tabindex="-1">文件系统隔离 <a class="header-anchor" href="#文件系统隔离" aria-label="Permalink to &quot;文件系统隔离&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Agent 工作区结构:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>~/.openclaw/</span></span>
<span class="line"><span>├── workspace/              # 全局工作区（共享）</span></span>
<span class="line"><span>│   └── shared/</span></span>
<span class="line"><span>├── agents/                 # Agent 隔离区</span></span>
<span class="line"><span>│   ├── agent_001/</span></span>
<span class="line"><span>│   │   ├── sessions/       # Session 隔离</span></span>
<span class="line"><span>│   │   ├── workspace/      # Agent 私有工作区</span></span>
<span class="line"><span>│   │   └── memory/        # Agent 私有记忆</span></span>
<span class="line"><span>│   └── agent_002/</span></span>
<span class="line"><span>│       ├── sessions/</span></span>
<span class="line"><span>│       ├── workspace/</span></span>
<span class="line"><span>│       └── memory/</span></span></code></pre></div><p>![运行时沙箱]/assets/diagrams/28_runtime_sandbox.png)</p><h3 id="隔离级别" tabindex="-1">隔离级别 <a class="header-anchor" href="#隔离级别" aria-label="Permalink to &quot;隔离级别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>级别</th><th>说明</th><th>适用场景</th></tr></thead><tbody><tr><td>agent</td><td>Agent 之间完全隔离</td><td>生产环境</td></tr><tr><td>session</td><td>Session 之间隔离</td><td>多会话场景</td></tr><tr><td>workspace</td><td>工作区隔离</td><td>多租户场景</td></tr><tr><td>shared</td><td>共享环境</td><td>开发测试</td></tr></tbody></table><hr><h2 id="_12-3-运行时配置" tabindex="-1">12.3 运行时配置 <a class="header-anchor" href="#_12-3-运行时配置" aria-label="Permalink to &quot;12.3 运行时配置&quot;">​</a></h2><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 沙盒类型</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;isolated&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// isolated, shared, none</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 文件系统配置</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      filesystem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 可访问的目录</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;\${workspace}/**&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;\${agentDir}/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 禁止访问的目录</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        deniedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;/etc/**&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;~/.ssh/**&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;/System/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 网络配置</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 允许的域名</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedDomains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;api.example.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*.github.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 禁止的域名</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        blockedDomains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*.internal.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;localhost&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="资源限制配置" tabindex="-1">资源限制配置 <a class="header-anchor" href="#资源限制配置" aria-label="Permalink to &quot;资源限制配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 执行时间限制</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    execution</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 单次执行超时（毫秒）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 最大循环次数</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxIterations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 最大递归深度</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxRecursionDepth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 内存限制</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 最大内存（MB）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxMemoryMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 内存警告阈值</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      warningThresholdMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">384</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 工具调用限制</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 单次请求最大工具调用数</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxCallsPerRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 每分钟最大工具调用数</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxCallsPerMinute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="agent-级别配置" tabindex="-1">Agent 级别配置 <a class="header-anchor" href="#agent-级别配置" aria-label="Permalink to &quot;Agent 级别配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;trusted-agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shared&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          maxMemoryMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1024</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;restricted-agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;isolated&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          maxMemoryMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">256</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          filesystem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            deniedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;**/*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_12-4-工具执行器" tabindex="-1">12.4 工具执行器 <a class="header-anchor" href="#_12-4-工具执行器" aria-label="Permalink to &quot;12.4 工具执行器&quot;">​</a></h2><h3 id="执行流程" tabindex="-1">执行流程 <a class="header-anchor" href="#执行流程" aria-label="Permalink to &quot;执行流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户请求</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      工具调用生命周期                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  1. 权限检查                                                   │</span></span>
<span class="line"><span>│     └── Agent 是否有权限调用此工具？                           │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  2. 参数验证                                                   │</span></span>
<span class="line"><span>│     └── 验证参数类型、范围、格式                              │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  3. 沙盒检查                                                   │</span></span>
<span class="line"><span>│     └── 检查文件/网络访问权限                                 │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  4. 执行工具                                                   │</span></span>
<span class="line"><span>│     └── 在沙盒中执行操作                                      │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  5. 结果处理                                                   │</span></span>
<span class="line"><span>│     └── 格式化返回结果，处理错误                              │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="工具权限模型" tabindex="-1">工具权限模型 <a class="header-anchor" href="#工具权限模型" aria-label="Permalink to &quot;工具权限模型&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 全局允许的工具</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;fetch&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 全局禁止的工具</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    deny</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;shell&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;eval&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 工具组</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      fs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;edit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;glob&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      web</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;fetch&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;webhook&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;memory_search&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;memory_write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="权限检查示例" tabindex="-1">权限检查示例 <a class="header-anchor" href="#权限检查示例" aria-label="Permalink to &quot;权限检查示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Agent 尝试调用工具时的检查流程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查工具是否在</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> allow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 列表中</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └─❌</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 如果在</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deny</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 列表中</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> →</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 拒绝访问</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 是否有权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └─❌</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 如果权限不足</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> →</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 拒绝访问</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查参数是否有效</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └─❌</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 如果参数无效</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> →</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 返回错误</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查沙盒限制</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └─❌</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 如果违反限制</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> →</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 拒绝访问</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 执行工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └─✅</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 通过所有检查</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> →</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 执行</span></span></code></pre></div><hr><h2 id="_12-5-运行时状态管理" tabindex="-1">12.5 运行时状态管理 <a class="header-anchor" href="#_12-5-运行时状态管理" aria-label="Permalink to &quot;12.5 运行时状态管理&quot;">​</a></h2><h3 id="状态类型" tabindex="-1">状态类型 <a class="header-anchor" href="#状态类型" aria-label="Permalink to &quot;状态类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>状态</th><th>说明</th></tr></thead><tbody><tr><td>idle</td><td>空闲，等待请求</td></tr><tr><td>running</td><td>正在执行</td></tr><tr><td>waiting</td><td>等待工具返回</td></tr><tr><td>error</td><td>执行错误</td></tr><tr><td>terminated</td><td>已终止</td></tr></tbody></table><h3 id="状态转换" tabindex="-1">状态转换 <a class="header-anchor" href="#状态转换" aria-label="Permalink to &quot;状态转换&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     ┌────────┐</span></span>
<span class="line"><span>     │  idle  │</span></span>
<span class="line"><span>     └────┬───┘</span></span>
<span class="line"><span>          │ 接收请求</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>     ┌────────┐    执行完成    ┌────────┐</span></span>
<span class="line"><span>     │running │──────────────▶│  idle  │</span></span>
<span class="line"><span>     └────┬───┘               └────────┘</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          │ 调用工具</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>     ┌──────────┐   工具返回    ┌────────┐</span></span>
<span class="line"><span>     │ waiting  │─────────────▶│running │</span></span>
<span class="line"><span>     └──────────┘              └────┬───┘</span></span>
<span class="line"><span>          │                           │</span></span>
<span class="line"><span>          │ 错误                       │ 终止</span></span>
<span class="line"><span>          ▼                           ▼</span></span>
<span class="line"><span>     ┌──────────┐               ┌────────────┐</span></span>
<span class="line"><span>     │  error   │               │ terminated │</span></span>
<span class="line"><span>     └──────────┘               └────────────┘</span></span></code></pre></div><h3 id="状态监控" tabindex="-1">状态监控 <a class="header-anchor" href="#状态监控" aria-label="Permalink to &quot;状态监控&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Agent 运行状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看详细状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/context</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看资源使用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/context</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resources</span></span></code></pre></div><hr><h2 id="_12-6-安全最佳实践" tabindex="-1">12.6 安全最佳实践 <a class="header-anchor" href="#_12-6-安全最佳实践" aria-label="Permalink to &quot;12.6 安全最佳实践&quot;">​</a></h2><h3 id="配置清单" tabindex="-1">配置清单 <a class="header-anchor" href="#配置清单" aria-label="Permalink to &quot;配置清单&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       运行时安全检查清单                                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ✅ 必做项：                                                                    │</span></span>
<span class="line"><span>│  [ ] 使用 isolated 沙盒模式                                                   │</span></span>
<span class="line"><span>│  [ ] 配置文件访问限制                                                          │</span></span>
<span class="line"><span>│  [ ] 限制网络访问域名                                                          │</span></span>
<span class="line"><span>│  [ ] 设置执行超时                                                              │</span></span>
<span class="line"><span>│  [ ] 限制内存使用                                                              │</span></span>
<span class="line"><span>│  [ ] 禁止危险工具（shell, eval）                                               │</span></span>
<span class="line"><span>│  [ ] 最小权限原则                                                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ❌ 禁止项：                                                                    │</span></span>
<span class="line"><span>│  [ ] 禁用沙盒（sandbox: none）                                                 │</span></span>
<span class="line"><span>│  [ ] 允许所有文件访问                                                          │</span></span>
<span class="line"><span>│  [ ] 允许所有域名访问                                                          │</span></span>
<span class="line"><span>│  [ ] 无执行超时限制                                                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="生产环境配置" tabindex="-1">生产环境配置 <a class="header-anchor" href="#生产环境配置" aria-label="Permalink to &quot;生产环境配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;isolated&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      filesystem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;\${workspace}/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        deniedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;~/.ssh/**&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;~/.aws/**&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;/etc/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedDomains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;api.openai.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;api.anthropic.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        blockedDomains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;*.internal.*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;localhost&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;127.0.0.1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    execution</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxIterations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxMemoryMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    deny</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;shell&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;eval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;exec:rm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;exec:dd&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="开发环境配置" tabindex="-1">开发环境配置 <a class="header-anchor" href="#开发环境配置" aria-label="Permalink to &quot;开发环境配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    sandbox</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shared&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      filesystem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedPaths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;**/*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        allowedDomains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    execution</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxIterations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      maxMemoryMB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2048</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_12-7-故障排查" tabindex="-1">12.7 故障排查 <a class="header-anchor" href="#_12-7-故障排查" aria-label="Permalink to &quot;12.7 故障排查&quot;">​</a></h2><h3 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>原因</th><th>解决方案</th></tr></thead><tbody><tr><td>工具调用超时</td><td>执行时间过长</td><td>增加 timeout 配置</td></tr><tr><td>权限被拒绝</td><td>工具不在 allow 列表</td><td>添加到 allow 列表</td></tr><tr><td>文件访问被拒</td><td>路径不在 allowedPaths</td><td>配置允许的路径</td></tr><tr><td>内存不足</td><td>超出限制</td><td>优化代码或增加限制</td></tr><tr><td>沙盒错误</td><td>违反沙盒规则</td><td>检查配置</td></tr></tbody></table><h3 id="调试命令" tabindex="-1">调试命令 <a class="header-anchor" href="#调试命令" aria-label="Permalink to &quot;调试命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看运行时配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> runtime</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看工具权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/tools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> permissions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试工具调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ls&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看资源使用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/context</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resources</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>Agent 运行时</strong> - 负责执行 Agent 代码的隔离环境</li><li><strong>沙盒机制</strong> - 提供文件系统、网络、进程隔离</li><li><strong>隔离级别</strong> - agent、session、workspace、shared</li><li><strong>资源限制</strong> - timeout、memory、工具调用次数</li><li><strong>工具权限</strong> - allow/deny 列表和工具组</li><li><strong>状态管理</strong> - idle、running、waiting、error、terminated</li></ol><hr><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://docs.openclaw.ai/concepts/runtime" target="_blank" rel="noreferrer">官方运行时文档</a></li><li><a href="https://docs.openclaw.ai/concepts/sandbox" target="_blank" rel="noreferrer">官方沙盒文档</a></li></ul>`,67)])])}const c=a(l,[["render",t]]);export{g as __pageData,c as default};
