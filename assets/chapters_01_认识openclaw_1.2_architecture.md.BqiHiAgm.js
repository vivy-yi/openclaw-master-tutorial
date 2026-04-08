import{_ as a,o as n,c as p,ae as i}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"1.2 OpenClaw 系统架构","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/01_认识openclaw/1.2_architecture.md","filePath":"chapters/01_认识openclaw/1.2_architecture.md"}'),l={name:"chapters/01_认识openclaw/1.2_architecture.md"};function e(t,s,h,c,k,o){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="_1-2-openclaw-系统架构" tabindex="-1">1.2 OpenClaw 系统架构 <a class="header-anchor" href="#_1-2-openclaw-系统架构" aria-label="Permalink to &quot;1.2 OpenClaw 系统架构&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解 OpenClaw 的整体架构设计</li><li>掌握各核心组件的职责与交互</li><li>了解数据流在系统中的流转过程</li></ul><hr><h2 id="_1-2-1-架构概览" tabindex="-1">1.2.1 架构概览 <a class="header-anchor" href="#_1-2-1-架构概览" aria-label="Permalink to &quot;1.2.1 架构概览&quot;">​</a></h2><p>OpenClaw 采用分层架构设计，从上到下分为六层：</p><p>![架构概览]/assets/diagrams/01_architecture_overview.png)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         用户层                                   │</span></span>
<span class="line"><span>│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │</span></span>
<span class="line"><span>│   │  飞书   │ │企微/钉钉│ │ Telegram│ │ Discord│ │  Web   │ │</span></span>
<span class="line"><span>│   └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘ │</span></span>
<span class="line"><span>│        └───────────┴───────────┴───────────┴──────────┴───────┘ │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      Gateway 层 (网关)                          │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │  • 消息路由    • 会话管理    • 渠道适配    • 权限控制   │   │</span></span>
<span class="line"><span>│   │  • 请求验证    • 限流熔断    • 日志审计                │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       Agent 层 (智能体)                          │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │  • 任务规划    • 意图理解    • 工具选择    • 结果处理   │   │</span></span>
<span class="line"><span>│   │  • 状态管理    • 上下文维护  • 错误恢复                │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      Model Layer (模型层)                        │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │  • LLM 调用    • 模型路由    • 多模型 failover         │   │</span></span>
<span class="line"><span>│   │  • 流式输出    • Token 统计  • 成本优化                │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       Tools 层 (工具层)                          │</span></span>
<span class="line"><span>│   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │</span></span>
<span class="line"><span>│   │   内置工具      │  │    Skills     │  │   Plugins     │    │</span></span>
<span class="line"><span>│   │  read/write/exec│  │   1800+      │  │    扩展       │    │</span></span>
<span class="line"><span>│   └────────────────┘  └────────────────┘  └────────────────┘    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      System Layer (系统层)                           │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │  文件系统  │  命令行  │  浏览器  │  日历  │  API  │ 数据库 │   │</span></span>
<span class="line"><span>│   │  进程管理  │  画布协作 │  语音通话 │  媒体操作 │  ...        │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_1-2-2-核心组件详解" tabindex="-1">1.2.2 核心组件详解 <a class="header-anchor" href="#_1-2-2-核心组件详解" aria-label="Permalink to &quot;1.2.2 核心组件详解&quot;">​</a></h2><h3 id="gateway-网关" tabindex="-1">Gateway (网关) <a class="header-anchor" href="#gateway-网关" aria-label="Permalink to &quot;Gateway (网关)&quot;">​</a></h3><p>Gateway 是 OpenClaw 的入口，是连接用户与 Agent 的桥梁。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        Gateway 职责                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  1. 消息路由                                                │</span></span>
<span class="line"><span>│     └── 将用户消息分发到对应的 Agent                          │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  2. 会话管理                                                │</span></span>
<span class="line"><span>│     └── 维护多用户多会话状态                                  │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  3. 渠道适配                                                │</span></span>
<span class="line"><span>│     └── 统一不同渠道的协议（飞书/Telegram/Discord）          │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  4. 权限控制                                                │</span></span>
<span class="line"><span>│     └── 基于 Profile 的细粒度权限                             │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  5. 安全拦截                                                │</span></span>
<span class="line"><span>│     └── 阻止危险操作                                         │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="gateway-配置示例" tabindex="-1">Gateway 配置示例 <a class="header-anchor" href="#gateway-配置示例" aria-label="Permalink to &quot;Gateway 配置示例&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;host&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.0.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feishu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;rateLimit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;maxRequests&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;windowMs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;security&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;execApproval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;allowedCommands&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ls&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;grep&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h3 id="agent-智能体" tabindex="-1">Agent (智能体) <a class="header-anchor" href="#agent-智能体" aria-label="Permalink to &quot;Agent (智能体)&quot;">​</a></h3><p>Agent 是 OpenClaw 的核心执行单元，是&quot;大脑&quot;。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        Agent 职责                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  1. 意图理解                                                │</span></span>
<span class="line"><span>│     └── 解析用户指令，理解用户想要什么                        │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  2. 任务规划                                                │</span></span>
<span class="line"><span>│     └── 分解复杂任务为具体执行步骤                             │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  3. 工具选择                                                │</span></span>
<span class="line"><span>│     └── 决定使用哪些工具（read/write/exec/browser）         │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  4. 状态管理                                                │</span></span>
<span class="line"><span>│     └── 维护任务执行状态，处理中断恢复                         │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  5. 上下文维护                                              │</span></span>
<span class="line"><span>│     └── 管理对话上下文，记住之前对话内容                       │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="agent-工作流程" tabindex="-1">Agent 工作流程 <a class="header-anchor" href="#agent-工作流程" aria-label="Permalink to &quot;Agent 工作流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户指令</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  意图理解 (Intent Understanding)            │</span></span>
<span class="line"><span>│  - 分析用户想做什么                         │</span></span>
<span class="line"><span>│  - 提取关键信息                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  任务规划 (Task Planning)                   │</span></span>
<span class="line"><span>│  - 分解为具体步骤                           │</span></span>
<span class="line"><span>│  - 确定执行顺序                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  工具选择 (Tool Selection)                 │</span></span>
<span class="line"><span>│  - 确定需要调用的工具                       │</span></span>
<span class="line"><span>│  - 准备参数                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  执行与反馈 (Execution &amp; Feedback)          │</span></span>
<span class="line"><span>│  - 调用工具执行                             │</span></span>
<span class="line"><span>│  - 收集结果                                 │</span></span>
<span class="line"><span>│  - 判断是否需要继续                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>    返回结果给用户</span></span></code></pre></div><h4 id="agent-配置示例" tabindex="-1">Agent 配置示例 <a class="header-anchor" href="#agent-配置示例" aria-label="Permalink to &quot;Agent 配置示例&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;assistant&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;web&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;maxSteps&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;timeout&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;maxRetries&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h3 id="model-layer-模型层" tabindex="-1">Model Layer (模型层) <a class="header-anchor" href="#model-layer-模型层" aria-label="Permalink to &quot;Model Layer (模型层)&quot;">​</a></h3><p>模型层负责与各种 LLM 提供商交互。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      模型层功能                               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  • LLM 调用        与各种模型提供商交互                       │</span></span>
<span class="line"><span>│  • 模型路由        支持多模型配置                             │</span></span>
<span class="line"><span>│  • Failover        主模型失败时自动切换                       │</span></span>
<span class="line"><span>│  • 流式输出        实时返回生成内容                           │</span></span>
<span class="line"><span>│  • Token 统计      监控使用量和成本                           │</span></span>
<span class="line"><span>│  • 成本优化        自动选择性价比最高的模型                   │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="支持的模型提供商" tabindex="-1">支持的模型提供商 <a class="header-anchor" href="#支持的模型提供商" aria-label="Permalink to &quot;支持的模型提供商&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    支持的模型提供商                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  国际厂商                                                     │</span></span>
<span class="line"><span>│  ├── OpenAI (GPT-4o, GPT-4o-mini)                        │</span></span>
<span class="line"><span>│  ├── Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku)       │</span></span>
<span class="line"><span>│  ├── Google (Gemini 1.5 Pro)                             │</span></span>
<span class="line"><span>│  └── Mistral (Mistral Large)                              │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  国产厂商 ⭐                                                 │</span></span>
<span class="line"><span>│  ├── DeepSeek (DeepSeek V2, Chat)                         │</span></span>
<span class="line"><span>│  ├── Moonshot (Kimi)                                      │</span></span>
<span class="line"><span>│  ├── MiniMax (abab6.5)                                    │</span></span>
<span class="line"><span>│  ├── 百度千帆 (ERNIE 4.0)                                  │</span></span>
<span class="line"><span>│  ├── 阿里云 (Qwen)                                         │</span></span>
<span class="line"><span>│  └── 智谱 (GLM-4)                                         │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  本地部署                                                     │</span></span>
<span class="line"><span>│  └── Ollama (Llama2, Qwen, Mistral...)                   │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h3 id="tools-layer-工具层" tabindex="-1">Tools Layer (工具层) <a class="header-anchor" href="#tools-layer-工具层" aria-label="Permalink to &quot;Tools Layer (工具层)&quot;">​</a></h3><p>工具层提供 Agent 可调用的能力，是 Agent 的&quot;手&quot;。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│           内置工具 (Core)              │</span></span>
<span class="line"><span>├────────────────────────────────────────┤</span></span>
<span class="line"><span>│  📁 read       - 读取文件/目录        │</span></span>
<span class="line"><span>│  📝 write      - 写入文件             │</span></span>
<span class="line"><span>│  ⚡ exec       - 执行系统命令         │</span></span>
<span class="line"><span>│  🌐 browser    - 浏览器控制           │</span></span>
<span class="line"><span>│  🌐 web        - 网络请求             │</span></span>
<span class="line"><span>│  📅 calendar   - 日历操作             │</span></span>
<span class="line"><span>│  📧 email      - 邮件操作             │</span></span>
<span class="line"><span>│  🖥️ screencapture - 截图            │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Skills (1800+)               │</span></span>
<span class="line"><span>├────────────────────────────────────────┤</span></span>
<span class="line"><span>│  📦 官方 Skills (93个)                │</span></span>
<span class="line"><span>│  🌐 社区 Skills (1700+)              │</span></span>
<span class="line"><span>│  🔧 自定义 Skills                     │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Plugins                      │</span></span>
<span class="line"><span>├────────────────────────────────────────┤</span></span>
<span class="line"><span>│  🔌 官方插件                          │</span></span>
<span class="line"><span>│  🔌 第三方插件                        │</span></span>
<span class="line"><span>│  🔌 自定义插件                        │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span></code></pre></div><hr><h3 id="system-layer-系统层" tabindex="-1">System Layer (系统层) <a class="header-anchor" href="#system-layer-系统层" aria-label="Permalink to &quot;System Layer (系统层)&quot;">​</a></h3><p>系统层是 OpenClaw 的底层基础设施，提供对操作系统资源的访问能力。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    System Layer 系统层功能                       │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  📁 文件系统                                                   │</span></span>
<span class="line"><span>│     read, write, edit, glob, apply_patch                       │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ⚡ 命令行                                                     │</span></span>
<span class="line"><span>│     exec, bash                                                 │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  🌐 浏览器                                                     │</span></span>
<span class="line"><span>│     browser, browser_navigate, browser_click, browser_fill     │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  📅 日历                                                      │</span></span>
<span class="line"><span>│     calendar_list, calendar_events, calendar_create             │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  🌐 Web API                                                   │</span></span>
<span class="line"><span>│     fetch, webhook                                            │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  🗄️ 数据库                                                    │</span></span>
<span class="line"><span>│     db_query, db_execute, db_transaction                      │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  🔄 进程管理                                                   │</span></span>
<span class="line"><span>│     process (list, output, kill, wait)                        │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  🎨 画布协作                                                   │</span></span>
<span class="line"><span>│     canvas, canvas_write, canvas_read, canvas_clear            │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  📞 语音通话                                                   │</span></span>
<span class="line"><span>│     voice_call (initiate, continue, speak, end, status)       │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  📱 平台工具                                                  │</span></span>
<span class="line"><span>│     whatsapp, telegram, discord, slack, zalo...               │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><blockquote><p>📖 详细文档请参阅：<a href="./../16_system_layer/">16 系统层</a></p></blockquote><hr><h2 id="_1-2-3-消息处理流程" tabindex="-1">1.2.3 消息处理流程 <a class="header-anchor" href="#_1-2-3-消息处理流程" aria-label="Permalink to &quot;1.2.3 消息处理流程&quot;">​</a></h2><p>当用户在飞书发送一条消息时，整个处理流程如下：</p><p>![消息处理流程]/assets/diagrams/02_message_flow.png)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户(飞书)</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. Gateway 接收消息                        │</span></span>
<span class="line"><span>│     • 验证消息格式                           │</span></span>
<span class="line"><span>│     • 解析用户身份                           │</span></span>
<span class="line"><span>│     • 创建/查找会话                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. 消息路由                                │</span></span>
<span class="line"><span>│     • 根据渠道和用户匹配 Agent              │</span></span>
<span class="line"><span>│     • 检查权限 Profile                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. Agent 处理                              │</span></span>
<span class="line"><span>│     ┌────────────────────────────────────┐ │</span></span>
<span class="line"><span>│     │ a) 意图理解                          │ │</span></span>
<span class="line"><span>│     │    LLM 分析用户指令                  │ │</span></span>
<span class="line"><span>│     ├────────────────────────────────────┤ │</span></span>
<span class="line"><span>│     │ b) 任务规划                          │ │</span></span>
<span class="line"><span>│     │    分解为具体执行步骤                 │ │</span></span>
<span class="line"><span>│     ├────────────────────────────────────┤ │</span></span>
<span class="line"><span>│     │ c) 工具选择                          │ │</span></span>
<span class="line"><span>│     │    确定需要调用的工具                 │ │</span></span>
<span class="line"><span>│     └────────────────────────────────────┘ │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. 工具执行                                │</span></span>
<span class="line"><span>│     • 调用内置工具/Skills/Plugins          │</span></span>
<span class="line"><span>│     • 收集执行结果                          │</span></span>
<span class="line"><span>│     • 处理工具返回                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  5. 响应生成                                │</span></span>
<span class="line"><span>│     • 将工具结果整合为自然语言               │</span></span>
<span class="line"><span>│     • 流式返回给用户                        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>返回给用户(飞书)</span></span></code></pre></div><h3 id="一个具体的例子" tabindex="-1">一个具体的例子 <a class="header-anchor" href="#一个具体的例子" aria-label="Permalink to &quot;一个具体的例子&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户输入: &quot;帮我整理桌面上的文件&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Step 1: 意图理解                                           │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  LLM 分析: 用户想要整理文件                                   │</span></span>
<span class="line"><span>│  目标: 将桌面文件按类型分类                                   │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Step 2: 任务规划                                           │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  步骤1: 读取 ~/Desktop 目录内容                              │</span></span>
<span class="line"><span>│  步骤2: 分析文件类型                                          │</span></span>
<span class="line"><span>│  步骤3: 创建分类目录                                          │</span></span>
<span class="line"><span>│  步骤4: 移动文件到对应目录                                    │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Step 3: 工具选择                                           │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  工具1: read - 读取目录内容                                 │</span></span>
<span class="line"><span>│  工具2: exec - 执行 mv 命令移动文件                          │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Step 4: 执行并返回                                          │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  &quot;已整理完成！文件按类型分为:                                 │</span></span>
<span class="line"><span>│   - Images (5个): 照片、截图                                 │</span></span>
<span class="line"><span>│   - Documents (8个): PDF、Word                              │</span></span>
<span class="line"><span>│   - Downloads (3个): 安装包                                  │</span></span>
<span class="line"><span>│   ...&quot;                                                       │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_1-2-4-配置文件结构" tabindex="-1">1.2.4 配置文件结构 <a class="header-anchor" href="#_1-2-4-配置文件结构" aria-label="Permalink to &quot;1.2.4 配置文件结构&quot;">​</a></h2><p>OpenClaw 的核心配置文件是 <code>openclaw.json</code>，位于 <code>~/.openclaw/</code> 目录：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 模型配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek-chat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;\${DEEPSEEK_API_KEY}&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 网关配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;channels&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;feishu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Agent 配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;assistant&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Skills 配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;autoInstall&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 安全配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;security&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;profile&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;execApproval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 记忆配置</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;filesystem&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_1-2-5-目录结构" tabindex="-1">1.2.5 目录结构 <a class="header-anchor" href="#_1-2-5-目录结构" aria-label="Permalink to &quot;1.2.5 目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.openclaw/</span></span>
<span class="line"><span>├── openclaw.json          # 主配置文件</span></span>
<span class="line"><span>├── workspace/             # 工作目录</span></span>
<span class="line"><span>│   ├── downloads/        # 下载文件</span></span>
<span class="line"><span>│   ├── uploads/         # 上传文件</span></span>
<span class="line"><span>│   └── temp/            # 临时文件</span></span>
<span class="line"><span>├── memory/               # 记忆存储</span></span>
<span class="line"><span>│   ├── sessions/        # 会话历史</span></span>
<span class="line"><span>│   └── longterm/        # 长期记忆</span></span>
<span class="line"><span>├── skills/              # 本地 Skills</span></span>
<span class="line"><span>├── plugins/             # 本地 Plugins</span></span>
<span class="line"><span>└── logs/                # 日志文件</span></span>
<span class="line"><span>    └── openclaw.log</span></span></code></pre></div><hr><h2 id="_1-2-6-扩展性架构" tabindex="-1">1.2.6 扩展性架构 <a class="header-anchor" href="#_1-2-6-扩展性架构" aria-label="Permalink to &quot;1.2.6 扩展性架构&quot;">​</a></h2><p>OpenClaw 的设计具有高度的扩展性：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      OpenClaw 扩展性                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🔌 Skills 扩展                                              │</span></span>
<span class="line"><span>│     ├── 官方 Skills (93个)                                   │</span></span>
<span class="line"><span>│     ├── 社区 Skills (1700+)                                  │</span></span>
<span class="line"><span>│     └── 自定义开发                                            │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🔌 渠道扩展                                                  │</span></span>
<span class="line"><span>│     ├── 30+ 官方渠道                                          │</span></span>
<span class="line"><span>│     └── 自定义渠道                                            │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🔌 工具扩展                                                  │</span></span>
<span class="line"><span>│     ├── 内置工具                                              │</span></span>
<span class="line"><span>│     └── 自定义工具                                            │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🔌 模型扩展                                                  │</span></span>
<span class="line"><span>│     ├── 30+ 官方提供商                                        │</span></span>
<span class="line"><span>│     └── 自定义 Provider                                       │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>分层架构</strong>：用户层 → Gateway层 → Agent层 → Model层 → Tools层 → System层</li><li><strong>Gateway 职责</strong>：消息路由、会话管理、渠道适配、权限控制、安全拦截</li><li><strong>Agent 职责</strong>：意图理解、任务规划、工具选择、状态管理</li><li><strong>Tools 层</strong>：内置工具 + Skills (1800+) + Plugins</li><li><strong>System 层</strong>：文件系统、命令行、浏览器、日历、API、数据库、进程、画布、语音</li><li><strong>消息流程</strong>：接收 → 路由 → 处理 → 执行 → 响应</li><li><strong>配置结构</strong>：<code>~/.openclaw/openclaw.json</code></li><li><strong>扩展性</strong>：支持 Skills、渠道、工具、模型扩展</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>OpenClaw 的分层架构与你之前使用的 AI 工具有何不同？</li><li>如果某个工具执行失败，Agent 会如何处理？</li><li>Gateway 的安全拦截机制如何防止危险操作？</li><li>System Layer 提供的哪些功能对你的使用场景最有价值？</li><li>你想开发自定义的 Skills 或工具吗？</li></ol>`,62)])])}const E=a(l,[["render",e]]);export{d as __pageData,E as default};
