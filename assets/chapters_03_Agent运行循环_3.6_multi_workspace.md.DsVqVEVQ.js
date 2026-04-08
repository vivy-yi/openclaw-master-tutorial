import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"3.6 多工作空间管理","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.6_multi_workspace.md","filePath":"chapters/03_Agent运行循环/3.6_multi_workspace.md"}'),l={name:"chapters/03_Agent运行循环/3.6_multi_workspace.md"};function t(h,s,e,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-6-多工作空间管理" tabindex="-1">3.6 多工作空间管理 <a class="header-anchor" href="#_3-6-多工作空间管理" aria-label="Permalink to &quot;3.6 多工作空间管理&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解多工作空间的概念和架构</li><li>掌握创建和管理多个工作空间的方法</li><li>学会配置 Agent 隔离</li><li>理解工作空间间的消息路由</li></ul><hr><h2 id="_3-6-1-多工作空间概述" tabindex="-1">3.6.1 多工作空间概述 <a class="header-anchor" href="#_3-6-1-多工作空间概述" aria-label="Permalink to &quot;3.6.1 多工作空间概述&quot;">​</a></h2><h3 id="什么是多工作空间" tabindex="-1">什么是多工作空间 <a class="header-anchor" href="#什么是多工作空间" aria-label="Permalink to &quot;什么是多工作空间&quot;">​</a></h3><p>多工作空间是 OpenClaw 的核心架构特性，每个 Agent 拥有完全独立的工作空间，实现环境隔离和专业化分工。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          多工作空间架构                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│                    ~/.openclaw/                                              │</span></span>
<span class="line"><span>│    ┌─────────────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│    │                                                                   │   │</span></span>
<span class="line"><span>│    │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │</span></span>
<span class="line"><span>│    │   │   main      │  │   work     │  │   coding    │   ...     │   │</span></span>
<span class="line"><span>│    │   │  Agent      │  │  Agent      │  │  Agent      │             │   │</span></span>
<span class="line"><span>│    │   ├─────────────┤  ├─────────────┤  ├─────────────┤             │   │</span></span>
<span class="line"><span>│    │   │ workspace/  │  │ workspace/  │  │ workspace/  │             │   │</span></span>
<span class="line"><span>│    │   │ 独立文件系统 │  │ 独立文件系统 │  │ 独立文件系统 │             │   │</span></span>
<span class="line"><span>│    │   ├─────────────┤  ├─────────────┤  ├─────────────┤             │   │</span></span>
<span class="line"><span>│    │   │ agent/     │  │ agent/     │  │ agent/     │             │   │</span></span>
<span class="line"><span>│    │   │ 独立状态   │  │ 独立状态   │  │ 独立状态   │             │   │</span></span>
<span class="line"><span>│    │   ├─────────────┤  ├─────────────┤  ├─────────────┤             │   │</span></span>
<span class="line"><span>│    │   │ sessions/  │  │ sessions/  │  │ sessions/  │             │   │</span></span>
<span class="line"><span>│    │   │ 独立会话   │  │ 独立会话   │  │ 独立会话   │             │   │</span></span>
<span class="line"><span>│    │   └─────────────┘  └─────────────┘  └─────────────┘             │   │</span></span>
<span class="line"><span>│    │                                                                   │   │</span></span>
<span class="line"><span>│    └─────────────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![多Workspace]/assets/diagrams/61_multi_workspace.png)</p><h3 id="每个工作空间包含" tabindex="-1">每个工作空间包含 <a class="header-anchor" href="#每个工作空间包含" aria-label="Permalink to &quot;每个工作空间包含&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>说明</th></tr></thead><tbody><tr><td><strong>Workspace</strong></td><td>文件系统、AGENTS.md/SOUL.md/USER.md 等配置文件</td></tr><tr><td><strong>Agent Directory</strong></td><td>认证配置、模型注册表、Agent 专属状态</td></tr><tr><td><strong>Session Store</strong></td><td>对话历史和路由状态</td></tr><tr><td><strong>Auth Profiles</strong></td><td>独立的 API 密钥和 OAuth 令牌</td></tr><tr><td><strong>Skills</strong></td><td>可配置独立的技能列表</td></tr></tbody></table><hr><h2 id="_3-6-2-创建工作空间" tabindex="-1">3.6.2 创建工作空间 <a class="header-anchor" href="#_3-6-2-创建工作空间" aria-label="Permalink to &quot;3.6.2 创建工作空间&quot;">​</a></h2><h3 id="cli-命令创建" tabindex="-1">CLI 命令创建 <a class="header-anchor" href="#cli-命令创建" aria-label="Permalink to &quot;CLI 命令创建&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建新的工作空间 (Agent)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建指定模型的工作空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coding</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --model</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-sonnet-4-20250514</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建多个工作空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> research</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> writing</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> analysis</span></span></code></pre></div><h3 id="手动配置" tabindex="-1">手动配置 <a class="header-anchor" href="#手动配置" aria-label="Permalink to &quot;手动配置&quot;">​</a></h3><p>在 <code>openclaw.json</code> 中配置：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Main Agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;work&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Work Agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-work&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Coding Agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;anthropic/claude-sonnet-4-20250514&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="配置字段说明" tabindex="-1">配置字段说明 <a class="header-anchor" href="#配置字段说明" aria-label="Permalink to &quot;配置字段说明&quot;">​</a></h3><table tabindex="0"><thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>id</code></td><td>string</td><td>Agent 唯一标识 (小写字母、数字、连字符)</td></tr><tr><td><code>name</code></td><td>string</td><td>显示名称</td></tr><tr><td><code>workspace</code></td><td>string</td><td>工作空间路径</td></tr><tr><td><code>model</code></td><td>string</td><td>使用的模型</td></tr><tr><td><code>default</code></td><td>boolean</td><td>是否为默认 Agent</td></tr></tbody></table><hr><h2 id="_3-6-3-工作空间文件结构" tabindex="-1">3.6.3 工作空间文件结构 <a class="header-anchor" href="#_3-6-3-工作空间文件结构" aria-label="Permalink to &quot;3.6.3 工作空间文件结构&quot;">​</a></h2><h3 id="独立工作空间目录" tabindex="-1">独立工作空间目录 <a class="header-anchor" href="#独立工作空间目录" aria-label="Permalink to &quot;独立工作空间目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.openclaw/</span></span>
<span class="line"><span>├── workspace/                    # main Agent 工作空间</span></span>
<span class="line"><span>│   ├── AGENTS.md                # Agent 规则</span></span>
<span class="line"><span>│   ├── SOUL.md                  # 人设定义</span></span>
<span class="line"><span>│   ├── USER.md                  # 用户信息</span></span>
<span class="line"><span>│   ├── IDENTITY.md              # 身份定义</span></span>
<span class="line"><span>│   ├── HEARTBEAT.md            # 心跳检查</span></span>
<span class="line"><span>│   ├── BOOT.md                 # 启动检查</span></span>
<span class="line"><span>│   ├── memory/</span></span>
<span class="line"><span>│   │   └── MEMORY.md           # 长期记忆</span></span>
<span class="line"><span>│   ├── daily/                   # 每日记忆</span></span>
<span class="line"><span>│   │   ├── 2024-01-15.md</span></span>
<span class="line"><span>│   │   └── 2024-01-16.md</span></span>
<span class="line"><span>│   └── skills/                  # 工作空间 Skills</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── workspace-work/               # work Agent 工作空间</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   ├── SOUL.md</span></span>
<span class="line"><span>│   ├── USER.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── workspace-coding/             # coding Agent 工作空间</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   ├── SOUL.md</span></span>
<span class="line"><span>│   ├── USER.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── agents/                      # Agent 状态目录</span></span>
<span class="line"><span>    ├── main/</span></span>
<span class="line"><span>    │   ├── agent/               # 认证配置</span></span>
<span class="line"><span>    │   └── sessions/           # 会话存储</span></span>
<span class="line"><span>    ├── work/</span></span>
<span class="line"><span>    │   ├── agent/</span></span>
<span class="line"><span>    │   └── sessions/</span></span>
<span class="line"><span>    └── coding/</span></span>
<span class="line"><span>        ├── agent/</span></span>
<span class="line"><span>        └── sessions/</span></span></code></pre></div><h3 id="核心文件说明" tabindex="-1">核心文件说明 <a class="header-anchor" href="#核心文件说明" aria-label="Permalink to &quot;核心文件说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>工作空间核心文件 (每个 Agent 独立)：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  文件           │  作用                    │  加载时机          │</span></span>
<span class="line"><span>├─────────────────┼─────────────────────────┼────────────────────┤</span></span>
<span class="line"><span>│ AGENTS.md      │ Agent 行为规则          │ 每次会话          │</span></span>
<span class="line"><span>│ SOUL.md        │ 人设、语调、边界        │ 每次会话          │</span></span>
<span class="line"><span>│ USER.md        │ 用户信息                │ 每次会话          │</span></span>
<span class="line"><span>│ IDENTITY.md    │ Agent 身份             │ 启动时            │</span></span>
<span class="line"><span>│ HEARTBEAT.md   │ 心跳检查清单           │ 心跳运行时        │</span></span>
<span class="line"><span>│ BOOT.md        │ 启动检查清单           │ Gateway 重启时    │</span></span>
<span class="line"><span>│ MEMORY.md      │ 长期记忆               │ 每次会话          │</span></span>
<span class="line"><span>│ daily/*.md     │ 每日记忆               │ 每次会话          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-6-4-工作空间管理命令" tabindex="-1">3.6.4 工作空间管理命令 <a class="header-anchor" href="#_3-6-4-工作空间管理命令" aria-label="Permalink to &quot;3.6.4 工作空间管理命令&quot;">​</a></h2><h3 id="agent-管理" tabindex="-1">Agent 管理 <a class="header-anchor" href="#agent-管理" aria-label="Permalink to &quot;Agent 管理&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出所有 Agent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Agent 详情</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agent-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Agent 状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除 Agent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remove</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agent-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重置 Agent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reset</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agent-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h3 id="工作空间切换" tabindex="-1">工作空间切换 <a class="header-anchor" href="#工作空间切换" aria-label="Permalink to &quot;工作空间切换&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到指定 Agent 的工作空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用指定 Agent 执行命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coding</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;帮我写一个排序算法&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定工作空间启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --workspace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace-coding</span></span></code></pre></div><h3 id="状态查看" tabindex="-1">状态查看 <a class="header-anchor" href="#状态查看" aria-label="Permalink to &quot;状态查看&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前工作空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Agent 会话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sessions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看工作空间文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/</span></span></code></pre></div><hr><h2 id="_3-6-5-配置流程图" tabindex="-1">3.6.5 配置流程图 <a class="header-anchor" href="#_3-6-5-配置流程图" aria-label="Permalink to &quot;3.6.5 配置流程图&quot;">​</a></h2><h3 id="创建工作空间流程" tabindex="-1">创建工作空间流程 <a class="header-anchor" href="#创建工作空间流程" aria-label="Permalink to &quot;创建工作空间流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       创建工作空间流程                                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 创建 Agent      │</span></span>
<span class="line"><span>                          │  openclaw agents   │</span></span>
<span class="line"><span>                          │  add &lt;agent-id&gt;    │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 创建工作空间    │</span></span>
<span class="line"><span>                          │  自动创建目录结构  │</span></span>
<span class="line"><span>                          │  ~/.openclaw/     │</span></span>
<span class="line"><span>                          │  /workspace-&lt;id&gt;/ │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 配置核心文件   │</span></span>
<span class="line"><span>                          │  ┌─────────────┐  │</span></span>
<span class="line"><span>                          │  │ • AGENTS.md │  │</span></span>
<span class="line"><span>                          │  │ • SOUL.md   │  │</span></span>
<span class="line"><span>                          │  │ • USER.md   │  │</span></span>
<span class="line"><span>                          │  └─────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. (可选) 绑定渠道 │</span></span>
<span class="line"><span>                          │  配置 bindings      │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 验证创建        │</span></span>
<span class="line"><span>                          │  openclaw agents   │</span></span>
<span class="line"><span>                          │  list              │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   创建完成 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span></code></pre></div><h3 id="消息路由流程" tabindex="-1">消息路由流程 <a class="header-anchor" href="#消息路由流程" aria-label="Permalink to &quot;消息路由流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          消息路由流程                                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                               用户消息</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  Gateway 接收消息           │</span></span>
<span class="line"><span>                    └─────────────┬───────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  检查 Bindings 规则         │</span></span>
<span class="line"><span>                    └─────────────┬───────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  匹配规则                   │</span></span>
<span class="line"><span>                    │  channel + accountId + peer │</span></span>
<span class="line"><span>                    └─────────────┬───────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  路由到对应 Agent           │</span></span>
<span class="line"><span>                    │  workspace-&lt;agent-id&gt;/    │</span></span>
<span class="line"><span>                    └─────────────┬───────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  Agent 处理消息              │</span></span>
<span class="line"><span>                    │  - 加载工作空间配置         │</span></span>
<span class="line"><span>                    │  - 加载记忆                 │</span></span>
<span class="line"><span>                    │  - 执行任务                │</span></span>
<span class="line"><span>                    └─────────────┬───────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────────┐</span></span>
<span class="line"><span>                    │  返回响应                   │</span></span>
<span class="line"><span>                    └─────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-6-6-多工作空间配置" tabindex="-1">3.6.6 多工作空间配置 <a class="header-anchor" href="#_3-6-6-多工作空间配置" aria-label="Permalink to &quot;3.6.6 多工作空间配置&quot;">​</a></h2><h3 id="配置多个工作空间" tabindex="-1">配置多个工作空间 <a class="header-anchor" href="#配置多个工作空间" aria-label="Permalink to &quot;配置多个工作空间&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;defaults&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deepseek/deepseek-chat&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;default&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;日常助手&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;work&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;工作专家&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-work&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;anthropic/claude-sonnet-4-20250514&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;编程助手&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;anthropic/claude-opus-4-6&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;bindings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;work&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;slack&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agentId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;match&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;guildId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123456789&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="工作空间权限配置" tabindex="-1">工作空间权限配置 <a class="header-anchor" href="#工作空间权限配置" aria-label="Permalink to &quot;工作空间权限配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;restricted&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-restricted&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;allow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;grep&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;glob&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;deny&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;edit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;sandbox&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;mode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;readonly&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;scope&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;workspace&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="工具限制说明" tabindex="-1">工具限制说明 <a class="header-anchor" href="#工具限制说明" aria-label="Permalink to &quot;工具限制说明&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 工具限制配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;allow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 读取文件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;glob&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 搜索文件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;grep&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 搜索内容</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;sessions_list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 列出会话</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;sessions_history&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 查看会话历史</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;deny&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;write&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 写入文件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;edit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 编辑文件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;exec&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 执行命令</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;bash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 运行脚本</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 浏览器操作</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;cron&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       // 定时任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_3-6-7-最佳实践" tabindex="-1">3.6.7 最佳实践 <a class="header-anchor" href="#_3-6-7-最佳实践" aria-label="Permalink to &quot;3.6.7 最佳实践&quot;">​</a></h2><h3 id="工作空间规划" tabindex="-1">工作空间规划 <a class="header-anchor" href="#工作空间规划" aria-label="Permalink to &quot;工作空间规划&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>推荐的工作空间划分：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          工作空间规划建议                                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  main (默认)                                                                  │</span></span>
<span class="line"><span>│  ├── 日常对话                                                                 │</span></span>
<span class="line"><span>│  ├── 通用问题                                                                 │</span></span>
<span class="line"><span>│  └── 快速查询                                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  work (工作)                                                                  │</span></span>
<span class="line"><span>│  ├── 文档撰写                                                                 │</span></span>
<span class="line"><span>│  ├── 邮件处理                                                                 │</span></span>
<span class="line"><span>│  └── 日程管理                                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  coding (编程)                                                                │</span></span>
<span class="line"><span>│  ├── 代码编写                                                                 │</span></span>
<span class="line"><span>│  ├── 代码审查                                                                 │</span></span>
<span class="line"><span>│  └── Bug 修复                                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  research (研究)                                                              │</span></span>
<span class="line"><span>│  ├── 信息收集                                                                 │</span></span>
<span class="line"><span>│  ├── 深度分析                                                                 │</span></span>
<span class="line"><span>│  └── 调研报告                                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="隔离原则" tabindex="-1">隔离原则 <a class="header-anchor" href="#隔离原则" aria-label="Permalink to &quot;隔离原则&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 推荐配置原则</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">✅</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 应该隔离：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 不同客户的代码/文档</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 生产环境和开发环境</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 敏感项目和普通项目</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 不同团队的资产</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">❌</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 不需要隔离：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 日常对话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 简单查询</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 临时任务</span></span></code></pre></div><h3 id="维护建议" tabindex="-1">维护建议 <a class="header-anchor" href="#维护建议" aria-label="Permalink to &quot;维护建议&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 定期维护任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 清理会话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sessions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prune</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --older-than</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 30d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 清理临时文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clean</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 备份重要配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> export</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查磁盘空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/</span></span></code></pre></div><hr><h2 id="_3-6-8-常见问题" tabindex="-1">3.6.8 常见问题 <a class="header-anchor" href="#_3-6-8-常见问题" aria-label="Permalink to &quot;3.6.8 常见问题&quot;">​</a></h2><h3 id="q1-工作空间创建失败" tabindex="-1">Q1: 工作空间创建失败 <a class="header-anchor" href="#q1-工作空间创建失败" aria-label="Permalink to &quot;Q1: 工作空间创建失败&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动创建</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace-new</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace-new/AGENTS.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新加载配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span></span></code></pre></div><h3 id="q2-消息没有路由到正确的工作空间" tabindex="-1">Q2: 消息没有路由到正确的工作空间 <a class="header-anchor" href="#q2-消息没有路由到正确的工作空间" aria-label="Permalink to &quot;Q2: 消息没有路由到正确的工作空间&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 bindings 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bindings</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查路由规则</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bindings</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试路由</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message.route</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;source&quot;:&quot;telegram&quot;,&quot;peer&quot;:&quot;123456&quot;}&#39;</span></span></code></pre></div><h3 id="q3-工作空间之间共享数据" tabindex="-1">Q3: 工作空间之间共享数据 <a class="header-anchor" href="#q3-工作空间之间共享数据" aria-label="Permalink to &quot;Q3: 工作空间之间共享数据&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用共享目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 创建共享目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/shared</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 在各工作空间创建软链接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/shared</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace-work/shared</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/shared</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace-coding/shared</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>多工作空间</strong>：每个 Agent 拥有独立的文件系统、状态目录、会话存储</li><li><strong>创建方式</strong>：agents add CLI 或手动配置 JSON</li><li><strong>核心文件</strong>：AGENTS.md、SOUL.md、USER.md、IDENTITY.md</li><li><strong>路由机制</strong>：通过 bindings 配置消息路由</li><li><strong>权限控制</strong>：工具白名单/黑名单、沙箱隔离</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>创建一个新的工作空间</li><li>为新工作空间配置独立的 AGENTS.md 和 SOUL.md</li><li>尝试在不同工作空间之间切换</li><li>配置 bindings 实现消息路由</li></ol>`,70)])])}const E=a(l,[["render",t]]);export{o as __pageData,E as default};
