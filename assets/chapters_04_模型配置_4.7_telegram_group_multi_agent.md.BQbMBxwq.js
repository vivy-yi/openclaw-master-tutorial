import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"Telegram 群组多 Agent 配置教程","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/04_模型配置/4.7_telegram_group_multi_agent.md","filePath":"chapters/04_模型配置/4.7_telegram_group_multi_agent.md"}'),l={name:"chapters/04_模型配置/4.7_telegram_group_multi_agent.md"};function e(t,s,h,k,r,E){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="telegram-群组多-agent-配置教程" tabindex="-1">Telegram 群组多 Agent 配置教程 <a class="header-anchor" href="#telegram-群组多-agent-配置教程" aria-label="Permalink to &quot;Telegram 群组多 Agent 配置教程&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握 Telegram 群组的基本配置</li><li>理解 Telegram 群组策略（groupPolicy）配置</li><li>学会在 Telegram 群组中配置 Agent</li><li>了解多 Agent 协作的当前方案和未来计划</li></ul><hr><h2 id="_4-7-1-telegram-群组支持概述" tabindex="-1">4.7.1 Telegram 群组支持概述 <a class="header-anchor" href="#_4-7-1-telegram-群组支持概述" aria-label="Permalink to &quot;4.7.1 Telegram 群组支持概述&quot;">​</a></h2><h3 id="当前支持状态" tabindex="-1">当前支持状态 <a class="header-anchor" href="#当前支持状态" aria-label="Permalink to &quot;当前支持状态&quot;">​</a></h3><p>根据官方文档 <a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/telegram.md" target="_blank" rel="noreferrer">Telegram (Bot API)</a>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       Telegram 群组功能支持状态                                  │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  功能                          │  支持状态          │  说明                      │</span></span>
<span class="line"><span>│  ─────────────────────────────┼───────────────────┼────────────────────────── │</span></span>
<span class="line"><span>│  群组消息接收                  │  ✅ 已支持         │  通过 grammY 支持          │</span></span>
<span class="line"><span>│  @提及回复                     │  ✅ 已支持         │  配置 requireMention      │</span></span>
<span class="line"><span>│  groupPolicy 配置             │  ✅ 已支持         │  open/allowlist/disabled │</span></span>
<span class="line"><span>│  多 Agent 广播 (Broadcast)     │  🚧 计划中         │  仅 WhatsApp 支持        │</span></span>
<span class="line"><span>│  论坛话题 (Topics)            │  ✅ 已支持         │  话题隔离                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📌 广播组仅 WhatsApp 支持，Telegram 计划中                                  │</span></span>
<span class="line"><span>│     替代方案：使用 Binding 路由或论坛话题隔离                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Telegram 群组配置架构：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         Telegram 群组配置架构                                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  用户在 Telegram 群组中发送消息                                               │</span></span>
<span class="line"><span>│                           │                                                     │</span></span>
<span class="line"><span>│                           ▼                                                     │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    Gateway 消息处理                                   │      │</span></span>
<span class="line"><span>│  │  1. groups 允许列表检查 (channels.telegram.groups)                   │      │</span></span>
<span class="line"><span>│  │  2. groupPolicy 检查 (发送者过滤)                                    │      │</span></span>
<span class="line"><span>│  │  3. requireMention 检查 (@提及 gating)                             │      │</span></span>
<span class="line"><span>│  │  4. Binding 匹配 (路由到指定 Agent)                                 │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│                           │                                                     │</span></span>
<span class="line"><span>│                           ▼                                                     │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │                    Agent 处理                                         │      │</span></span>
<span class="line"><span>│  │  • main: 通用对话                                                   │      │</span></span>
<span class="line"><span>│  │  • 每个群组有独立会话: agent:main:telegram:group:&lt;chatId&gt;          │      │</span></span>
<span class="line"><span>│  │  • 论坛话题: agent:main:telegram:group:&lt;id&gt;:topic:&lt;threadId&gt;       │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-7-2-基础配置步骤" tabindex="-1">4.7.2 基础配置步骤 <a class="header-anchor" href="#_4-7-2-基础配置步骤" aria-label="Permalink to &quot;4.7.2 基础配置步骤&quot;">​</a></h2><h3 id="步骤-1-创建-telegram-机器人" tabindex="-1">步骤 1：创建 Telegram 机器人 <a class="header-anchor" href="#步骤-1-创建-telegram-机器人" aria-label="Permalink to &quot;步骤 1：创建 Telegram 机器人&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         创建 Telegram 机器人                                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  1. 打开 Telegram，搜索 @BotFather                                            │</span></span>
<span class="line"><span>│  2. 发送 /newbot 命令                                                         │</span></span>
<span class="line"><span>│  3. 按提示设置机器人名称和用户名（必须以 bot 结尾）                            │</span></span>
<span class="line"><span>│  4. 复制 bot token                                                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  可选设置：                                                                    │</span></span>
<span class="line"><span>│  • /setjoingroups — 控制是否允许添加到群组                                   │</span></span>
<span class="line"><span>│  • /setprivacy — 控制隐私模式（影响群组消息可见性）                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="步骤-2-配置-token" tabindex="-1">步骤 2：配置 Token <a class="header-anchor" href="#步骤-2-配置-token" aria-label="Permalink to &quot;步骤 2：配置 Token&quot;">​</a></h3><p>编辑 <code>openclaw.json</code>：</p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1234567890:ABCdefGHIjklMNOpqrsTUVwxyz&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dmPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pairing&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="步骤-3-获取群组-id" tabindex="-1">步骤 3：获取群组 ID <a class="header-anchor" href="#步骤-3-获取群组-id" aria-label="Permalink to &quot;步骤 3：获取群组 ID&quot;">​</a></h3><h4 id="方法一-转发消息给机器人" tabindex="-1">方法一：转发消息给机器人 <a class="header-anchor" href="#方法一-转发消息给机器人" aria-label="Permalink to &quot;方法一：转发消息给机器人&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>将群组中的任意消息转发给 @userinfobot 或 @getidsbot</span></span>
<span class="line"><span>机器人会回复该消息的聊天 ID（负数，如 -1001234567890）</span></span></code></pre></div><h4 id="方法二-查看日志" tabindex="-1">方法二：查看日志 <a class="header-anchor" href="#方法二-查看日志" aria-label="Permalink to &quot;方法二：查看日志&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 Gateway 后，发送消息到群组</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 然后查看日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/logs/gateway.log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;telegram&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查找 chat.id 字段</span></span></code></pre></div><h4 id="方法三-使用-bot-api" tabindex="-1">方法三：使用 Bot API <a class="header-anchor" href="#方法三-使用-bot-api" aria-label="Permalink to &quot;方法三：使用 Bot API&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 获取更新</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://api.telegram.org/bot&lt;YOUR_BOT_TOKEN&gt;/getUpdates&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在响应中查找 chat.id</span></span></code></pre></div><hr><h2 id="_4-7-3-完整配置示例" tabindex="-1">4.7.3 完整配置示例 <a class="header-anchor" href="#_4-7-3-完整配置示例" aria-label="Permalink to &quot;4.7.3 完整配置示例&quot;">​</a></h2><h3 id="单群组配置" tabindex="-1">单群组配置 <a class="header-anchor" href="#单群组配置" aria-label="Permalink to &quot;单群组配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YOUR_BOT_TOKEN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dmPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pairing&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 群组配置</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1009876543210&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> 需要</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> @提及才回复</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bindings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      agentId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        peer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-1001234567890&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="多群组多-agent-配置" tabindex="-1">多群组多 Agent 配置 <a class="header-anchor" href="#多群组多-agent-配置" aria-label="Permalink to &quot;多群组多 Agent 配置&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Main Assistant&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Coding Expert&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-coder&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Documentation Bot&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        workspace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace-docs&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YOUR_BOT_TOKEN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bindings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      agentId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        peer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-1001234567890&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="使用论坛话题实现多-agent-隔离" tabindex="-1">使用论坛话题实现多 Agent 隔离 <a class="header-anchor" href="#使用论坛话题实现多-agent-隔离" aria-label="Permalink to &quot;使用论坛话题实现多 Agent 隔离&quot;">​</a></h3><p>由于广播组功能尚未支持 Telegram，可以使用论坛话题实现类似的多 Agent 隔离效果：</p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      botToken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YOUR_BOT_TOKEN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          topics</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 代码审查话题</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;101&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              systemPrompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是一个代码审查专家，专注于代码质量和安全&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 文档话题</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;102&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              systemPrompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是一个文档助手，专注于技术文档撰写&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-7-4-群组策略详解" tabindex="-1">4.7.4 群组策略详解 <a class="header-anchor" href="#_4-7-4-群组策略详解" aria-label="Permalink to &quot;4.7.4 群组策略详解&quot;">​</a></h2><h3 id="groups-vs-grouppolicy-区别" tabindex="-1">groups vs groupPolicy 区别 <a class="header-anchor" href="#groups-vs-grouppolicy-区别" aria-label="Permalink to &quot;groups vs groupPolicy 区别&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      groups vs groupPolicy 区别                                │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  channels.telegram.groups:                                                     │</span></span>
<span class="line"><span>│  └── 控制哪些群组可以互动（群组允许列表）                                      │</span></span>
<span class="line"><span>│      • 无 groups 配置 = 允许所有群组                                           │</span></span>
<span class="line"><span>│      • 有 groups 配置 = 只允许列出的群组或 &quot;*&quot;                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  channels.telegram.groupPolicy:                                                │</span></span>
<span class="line"><span>│  └── 控制群组中哪些发送者可以触发 Agent                                        │</span></span>
<span class="line"><span>│      • &quot;open&quot; = 允许所有发送者                                                 │</span></span>
<span class="line"><span>│      • &quot;allowlist&quot; = 只有 groupAllowFrom 中的可以                              │</span></span>
<span class="line"><span>│      • &quot;disabled&quot; = 禁用所有群组消息                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📌 大多数用户需要：groupPolicy: &quot;allowlist&quot; + groupAllowFrom + 在 groups 中  │</span></span>
<span class="line"><span>│     列出特定群组                                                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="常见配置组合" tabindex="-1">常见配置组合 <a class="header-anchor" href="#常见配置组合" aria-label="Permalink to &quot;常见配置组合&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>groups</th><th>groupPolicy</th><th>requireMention</th></tr></thead><tbody><tr><td>公开群组，所有人可触发</td><td><code>&quot;*&quot;: {}</code></td><td><code>&quot;open&quot;</code></td><td>false</td></tr><tr><td>特定群组，管理员触发</td><td><code>-100xxx: {}</code></td><td><code>&quot;allowlist&quot;</code></td><td>false</td></tr><tr><td>私密群组，需要 @提及</td><td><code>-100xxx: {}</code></td><td><code>&quot;allowlist&quot;</code></td><td>true</td></tr><tr><td>只接收命令</td><td><code>&quot;*&quot;: {}</code></td><td><code>&quot;allowlist&quot;</code></td><td>true</td></tr></tbody></table><hr><h2 id="_4-7-5-隐私模式与权限" tabindex="-1">4.7.5 隐私模式与权限 <a class="header-anchor" href="#_4-7-5-隐私模式与权限" aria-label="Permalink to &quot;4.7.5 隐私模式与权限&quot;">​</a></h2><h3 id="隐私模式说明" tabindex="-1">隐私模式说明 <a class="header-anchor" href="#隐私模式说明" aria-label="Permalink to &quot;隐私模式说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         Telegram 隐私模式                                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  Telegram 机器人默认启用隐私模式：                                              │</span></span>
<span class="line"><span>│  • 机器人只能收到：@提及、命令、部分消息                                       │</span></span>
<span class="line"><span>│  • 不会收到群组中其他人的普通消息                                               │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  禁用隐私模式（两种方式）：                                                     │</span></span>
<span class="line"><span>│  1. @BotFather → /setprivacy → Disable                                        │</span></span>
<span class="line"><span>│  2. 将机器人添加为群组管理员                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ⚠️ 更改隐私模式后，需要将机器人移除群组并重新添加                             │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="管理员权限" tabindex="-1">管理员权限 <a class="header-anchor" href="#管理员权限" aria-label="Permalink to &quot;管理员权限&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 推荐：将机器人设为管理员以获得完全消息访问权限</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在 Telegram 群组设置中配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">  //</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> 禁用隐私模式后可设为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-7-6-配置流程图" tabindex="-1">4.7.6 配置流程图 <a class="header-anchor" href="#_4-7-6-配置流程图" aria-label="Permalink to &quot;4.7.6 配置流程图&quot;">​</a></h2><h3 id="telegram-群组配置流程" tabindex="-1">Telegram 群组配置流程 <a class="header-anchor" href="#telegram-群组配置流程" aria-label="Permalink to &quot;Telegram 群组配置流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       Telegram 群组配置流程                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                开始</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  1. 创建 Telegram Bot   │</span></span>
<span class="line"><span>                    │  @BotFather 获取 Token  │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  2. (可选) 配置隐私    │</span></span>
<span class="line"><span>                    │  /setprivacy disable   │</span></span>
<span class="line"><span>                    │  或设为管理员          │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  3. 添加 Bot 到群组    │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  4. 获取群组 ID        │</span></span>
<span class="line"><span>                    │  @getidsbot 或日志     │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  5. 配置 groups        │</span></span>
<span class="line"><span>                    │  allow + requireMention│</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  6. 配置 bindings      │</span></span>
<span class="line"><span>                    │  路由到 Agent          │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  7. 重启 Gateway       │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  8. 测试               │</span></span>
<span class="line"><span>                    │  @提及 或 发送消息    │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                  │</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>                              配置完成 ✅</span></span></code></pre></div><h3 id="消息处理决策流程" tabindex="-1">消息处理决策流程 <a class="header-anchor" href="#消息处理决策流程" aria-label="Permalink to &quot;消息处理决策流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      Telegram 群组消息处理流程                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                           群组消息到达</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌─────────────────────────┐</span></span>
<span class="line"><span>                    │  1. groups 允许列表   │</span></span>
<span class="line"><span>                    │  检查群组是否在列表中   │</span></span>
<span class="line"><span>                    └────────────┬────────────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                    ┌────────────┴────────────┐</span></span>
<span class="line"><span>                    │                         │</span></span>
<span class="line"><span>               allowed                    denied</span></span>
<span class="line"><span>                    ▼                         ▼</span></span>
<span class="line"><span>            ┌───────────────┐         ┌───────────┐</span></span>
<span class="line"><span>            │ 2. groupPolicy│         │ 丢弃消息  │</span></span>
<span class="line"><span>            │    检查       │         └───────────┘</span></span>
<span class="line"><span>            └─────┬─────────┘</span></span>
<span class="line"><span>                  │</span></span>
<span class="line"><span>         ┌────────┴────────┐</span></span>
<span class="line"><span>         │                 │</span></span>
<span class="line"><span>       open             allowlist</span></span>
<span class="line"><span>         │                 │</span></span>
<span class="line"><span>         ▼          ┌──────┴──────┐</span></span>
<span class="line"><span>    ┌─────────┐    │ 检查发送者  │</span></span>
<span class="line"><span>    │ 3.触发检查│    │ groupAllowFrom│</span></span>
<span class="line"><span>    └────┬────┘    └──────┬──────┘</span></span>
<span class="line"><span>         │                 │</span></span>
<span class="line"><span>    requireMention=    是│允许</span></span>
<span class="line"><span>       true              否│</span></span>
<span class="line"><span>         │                 │</span></span>
<span class="line"><span>         ▼                 ▼</span></span>
<span class="line"><span>   ┌───────────┐    ┌───────────┐</span></span>
<span class="line"><span>   │@提及检查  │    │ 4.Binding │</span></span>
<span class="line"><span>   └─────┬─────┘    │   匹配    │</span></span>
<span class="line"><span>         │          └─────┬─────┘</span></span>
<span class="line"><span>         │                │</span></span>
<span class="line"><span>        是│提及          匹配│</span></span>
<span class="line"><span>         │                │</span></span>
<span class="line"><span>         ▼                ▼</span></span>
<span class="line"><span>   ┌────────────┐  ┌────────────┐</span></span>
<span class="line"><span>   │ Agent 处理  │  │ Agent 处理  │</span></span>
<span class="line"><span>   └────────────┘  └────────────┘</span></span></code></pre></div><hr><h2 id="_4-7-7-多-agent-协作方案" tabindex="-1">4.7.7 多 Agent 协作方案 <a class="header-anchor" href="#_4-7-7-多-agent-协作方案" aria-label="Permalink to &quot;4.7.7 多 Agent 协作方案&quot;">​</a></h2><h3 id="当前可用方案" tabindex="-1">当前可用方案 <a class="header-anchor" href="#当前可用方案" aria-label="Permalink to &quot;当前可用方案&quot;">​</a></h3><p>由于 Telegram 广播组功能尚未支持，以下是当前可行的多 Agent 协作方案：</p><h4 id="方案-1-binding-路由-最常用" tabindex="-1">方案 1：Binding 路由（最常用） <a class="header-anchor" href="#方案-1-binding-路由-最常用" aria-label="Permalink to &quot;方案 1：Binding 路由（最常用）&quot;">​</a></h4><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bindings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      agentId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        peer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-1001234567890&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="方案-2-论坛话题隔离" tabindex="-1">方案 2：论坛话题隔离 <a class="header-anchor" href="#方案-2-论坛话题隔离" aria-label="Permalink to &quot;方案 2：论坛话题隔离&quot;">​</a></h4><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          topics</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 通用话题</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              systemPrompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是通用助手&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 代码话题</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              systemPrompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是代码审查专家&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="方案-3-关键词触发-通过-agent-内部逻辑" tabindex="-1">方案 3：关键词触发（通过 Agent 内部逻辑） <a class="header-anchor" href="#方案-3-关键词触发-通过-agent-内部逻辑" aria-label="Permalink to &quot;方案 3：关键词触发（通过 Agent 内部逻辑）&quot;">​</a></h4><p>在 Agent 的 AGENTS.md 中配置关键词路由规则。</p><hr><h2 id="_4-7-8-与-whatsapp-对比" tabindex="-1">4.7.8 与 WhatsApp 对比 <a class="header-anchor" href="#_4-7-8-与-whatsapp-对比" aria-label="Permalink to &quot;4.7.8 与 WhatsApp 对比&quot;">​</a></h2><p>根据官方文档 <a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/broadcast-groups.md" target="_blank" rel="noreferrer">广播群组</a>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      Telegram vs WhatsApp 群组功能对比                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  功能                    │  Telegram           │  WhatsApp                       │</span></span>
<span class="line"><span>│  ────────────────────────┼─────────────────────┼──────────────────────────────    │</span></span>
<span class="line"><span>│  群组消息接收            │  ✅ 已支持           │  ✅ 已支持                       │</span></span>
<span class="line"><span>│  groupPolicy            │  ✅ 已支持           │  ✅ 已支持                       │</span></span>
<span class="line"><span>│  广播组 (Broadcast)     │  🚧 计划中           │  ✅ 已支持 (实验性)              │</span></span>
<span class="line"><span>│  requireMention        │  ✅ 已支持           │  ✅ 已支持                       │</span></span>
<span class="line"><span>│  论坛话题               │  ✅ 已支持           │  ❌ 不支持                       │</span></span>
<span class="line"><span>│  群组 ID 格式           │  -100xxxxx          │  xxx@g.us                       │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📌 选择建议：                                                                  │</span></span>
<span class="line"><span>│  - 需要真正的多 Agent 广播 → 使用 WhatsApp                                       │</span></span>
<span class="line"><span>│  - 需要论坛话题隔离 → 使用 Telegram                                            │</span></span>
<span class="line"><span>│  - 需要丰富的 Bot 功能 → 使用 Telegram                                          │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_4-7-9-常见问题" tabindex="-1">4.7.9 常见问题 <a class="header-anchor" href="#_4-7-9-常见问题" aria-label="Permalink to &quot;4.7.9 常见问题&quot;">​</a></h2><h3 id="q1-机器人没有收到群组消息" tabindex="-1">Q1: 机器人没有收到群组消息 <a class="header-anchor" href="#q1-机器人没有收到群组消息" aria-label="Permalink to &quot;Q1: 机器人没有收到群组消息&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查步骤：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 确认</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Bot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 已添加到群组</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 确认</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Bot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 有管理员权限或隐私模式已禁用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> groups</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 配置是否包含该群组</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 查看日志：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/logs/gateway.log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> telegram</span></span></code></pre></div><h3 id="q2-机器人不响应非-提及消息" tabindex="-1">Q2: 机器人不响应非 @提及消息 <a class="header-anchor" href="#q2-机器人不响应非-提及消息" aria-label="Permalink to &quot;Q2: 机器人不响应非 @提及消息&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 原因：requireMention 默认为 true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式1：配置 requireMention: false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式2：在群组中发送 /activation always</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式3：禁用 Telegram 隐私模式</span></span></code></pre></div><h3 id="q3-群组-id-获取失败" tabindex="-1">Q3: 群组 ID 获取失败 <a class="header-anchor" href="#q3-群组-id-获取失败" aria-label="Permalink to &quot;Q3: 群组 ID 获取失败&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确保：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 先发送消息到群组</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 然后调用</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> getUpdates</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 群组</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 格式正确（超级群组以</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -100</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 开头）</span></span></code></pre></div><h3 id="q4-如何实现多-agent-响应" tabindex="-1">Q4: 如何实现多 Agent 响应？ <a class="header-anchor" href="#q4-如何实现多-agent-响应" aria-label="Permalink to &quot;Q4: 如何实现多 Agent 响应？&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前 Telegram 不支持广播组功能，可选方案：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案 1：使用 WhatsApp 广播组</span></span>
<span class="line"><span>- 真正的多 Agent 并行响应</span></span>
<span class="line"><span>- 详见 broadcast-groups.md</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案 2：使用 Telegram 论坛话题</span></span>
<span class="line"><span>- 每个话题独立会话</span></span>
<span class="line"><span>- 通过不同话题路由到不同 Agent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案 3：等待支持</span></span>
<span class="line"><span>- 关注官方更新</span></span>
<span class="line"><span>- Telegram 广播组开发中</span></span></code></pre></div><hr><h2 id="_4-7-10-最佳实践" tabindex="-1">4.7.10 最佳实践 <a class="header-anchor" href="#_4-7-10-最佳实践" aria-label="Permalink to &quot;4.7.10 最佳实践&quot;">​</a></h2><h3 id="安全建议" tabindex="-1">安全建议 <a class="header-anchor" href="#安全建议" aria-label="Permalink to &quot;安全建议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          Telegram 群组安全建议                                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ✅ 推荐做法：                                                                  │</span></span>
<span class="line"><span>│  1. 使用 groups 配置精确控制群组                                               │</span></span>
<span class="line"><span>│  2. 为敏感群组设置 requireMention: true                                        │</span></span>
<span class="line"><span>│  3. 使用 groupPolicy: &quot;allowlist&quot; 限制发送者                                   │</span></span>
<span class="line"><span>│  4. 定期审查群组列表                                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ❌ 避免做法：                                                                  │</span></span>
<span class="line"><span>│  1. groups: { &quot;*&quot;: {} } 完全开放                                               │</span></span>
<span class="line"><span>│  2. groupPolicy: &quot;open&quot; 不做发送者限制                                         │</span></span>
<span class="line"><span>│  3. 在公开群组中暴露敏感信息                                                   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h3><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  channels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    telegram</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 只配置活跃群组</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;-1001234567890&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          allow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          requireMention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 限制历史消息数量</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      historyLimit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 启用消息分块</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      textChunkLimit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>groups vs groupPolicy</strong>：groups 控制群组允许列表，groupPolicy 控制发送者</li><li><strong>requireMention</strong>：默认 true，需要 @提及才回复</li><li><strong>群组 ID 格式</strong>：Telegram 群组以 <code>-100</code> 开头（超级群组）</li><li><strong>隐私模式</strong>：禁用后机器人可收到所有群组消息</li><li><strong>多 Agent 方案</strong>：当前使用 Binding 路由，广播组开发中</li><li><strong>论坛话题</strong>：Telegram 特有功能，可实现话题隔离</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>创建一个 Telegram 机器人并获取 Token</li><li>将机器人添加到群组并获取群组 ID</li><li>配置 groupPolicy 和 groups</li><li>配置 Binding 实现消息路由</li><li>测试 @提及 和非 @提及 回复</li><li>（可选）配置论坛话题实现 Agent 隔离</li></ol><hr><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/telegram.md" target="_blank" rel="noreferrer">Telegram (Bot API) - 官方文档</a></li><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/broadcast-groups.md" target="_blank" rel="noreferrer">广播群组 - 官方文档</a></li><li><a href="https://github.com/openclaw/openclaw/blob/main/docs/zh-CN/channels/channel-routing.md" target="_blank" rel="noreferrer">消息路由 - 官方文档</a></li></ul>`,90)])])}const g=a(l,[["render",e]]);export{c as __pageData,g as default};
