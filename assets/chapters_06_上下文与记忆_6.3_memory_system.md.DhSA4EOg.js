import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"6.3 记忆系统详解","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/06_上下文与记忆/6.3_memory_system.md","filePath":"chapters/06_上下文与记忆/6.3_memory_system.md"}'),l={name:"chapters/06_上下文与记忆/6.3_memory_system.md"};function e(t,s,h,k,r,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_6-3-记忆系统详解" tabindex="-1">6.3 记忆系统详解 <a class="header-anchor" href="#_6-3-记忆系统详解" aria-label="Permalink to &quot;6.3 记忆系统详解&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解记忆系统的架构</li><li>掌握短期记忆和长期记忆</li><li>学会配置记忆系统</li></ul><hr><h2 id="_6-3-1-记忆系统概述" tabindex="-1">6.3.1 记忆系统概述 <a class="header-anchor" href="#_6-3-1-记忆系统概述" aria-label="Permalink to &quot;6.3.1 记忆系统概述&quot;">​</a></h2><h3 id="记忆类型" tabindex="-1">记忆类型 <a class="header-anchor" href="#记忆类型" aria-label="Permalink to &quot;记忆类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           OpenClaw 记忆系统                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  短期记忆 (Working Memory)                  │</span></span>
<span class="line"><span>│  ├── 当前会话信息                           │</span></span>
<span class="line"><span>│  ├── 工作进度                               │</span></span>
<span class="line"><span>│  └── 临时变量                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  长期记忆 (Long-term Memory)               │</span></span>
<span class="line"><span>│  ├── 用户偏好                               │</span></span>
<span class="line"><span>│  ├── 项目知识                               │</span></span>
<span class="line"><span>│  └── 跨会话学习                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  语义记忆 (Semantic Memory)                │</span></span>
<span class="line"><span>│  ├── 事实知识                               │</span></span>
<span class="line"><span>│  ├── 技能知识                               │</span></span>
<span class="line"><span>│  └── 世界知识                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![记忆层次]/assets/diagrams/09_memory_hierarchy.png)</p><h3 id="记忆-vs-上下文" tabindex="-1">记忆 vs 上下文 <a class="header-anchor" href="#记忆-vs-上下文" aria-label="Permalink to &quot;记忆 vs 上下文&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>区别：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>上下文 (Context)</span></span>
<span class="line"><span>├── 每次请求发送给 LLM</span></span>
<span class="line"><span>├── 有 Token 限制</span></span>
<span class="line"><span>├── 会话级别</span></span>
<span class="line"><span>└── 临时性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>记忆 (Memory)</span></span>
<span class="line"><span>├── 按需加载到上下文</span></span>
<span class="line"><span>├── 可持久化存储</span></span>
<span class="line"><span>├── 跨会话</span></span>
<span class="line"><span>└── 可索引搜索</span></span></code></pre></div><p>![记忆层次]/assets/diagrams/09_memory_hierarchy.png)</p><hr><h2 id="_6-3-2-短期记忆" tabindex="-1">6.3.2 短期记忆 <a class="header-anchor" href="#_6-3-2-短期记忆" aria-label="Permalink to &quot;6.3.2 短期记忆&quot;">​</a></h2><h3 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>短期记忆流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：记住我的项目叫 &quot;OpenClaw&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: 提取记忆</span></span>
<span class="line"><span>  → &quot;项目名称 = OpenClaw&quot;</span></span>
<span class="line"><span>  → 类型：user_preference</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 存储到工作内存</span></span>
<span class="line"><span>  → session[project_name] = &quot;OpenClaw&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 后续使用</span></span>
<span class="line"><span>  用户：构建项目</span></span>
<span class="line"><span>  → 自动使用：&quot;OpenClaw&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span></code></pre></div><p>![记忆层次]/assets/diagrams/09_memory_hierarchy.png)</p><h3 id="配置短期记忆" tabindex="-1">配置短期记忆 <a class="header-anchor" href="#配置短期记忆" aria-label="Permalink to &quot;配置短期记忆&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;working&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_items&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;ttl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3600</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;auto_recall&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-3-3-长期记忆" tabindex="-1">6.3.3 长期记忆 <a class="header-anchor" href="#_6-3-3-长期记忆" aria-label="Permalink to &quot;6.3.3 长期记忆&quot;">​</a></h2><h3 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>长期记忆能力：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 用户偏好记忆</span></span>
<span class="line"><span>   ├── 编程语言偏好</span></span>
<span class="line"><span>   ├── 文档风格</span></span>
<span class="line"><span>   └── 交互习惯</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 项目知识记忆</span></span>
<span class="line"><span>   ├── 项目结构</span></span>
<span class="line"><span>   ├── 常用命令</span></span>
<span class="line"><span>   └── 代码规范</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 学习能力</span></span>
<span class="line"><span>   ├── 从交互中学习</span></span>
<span class="line"><span>   ├── 总结规律</span></span>
<span class="line"><span>   └── 主动建议</span></span></code></pre></div><h3 id="配置长期记忆" tabindex="-1">配置长期记忆 <a class="header-anchor" href="#配置长期记忆" aria-label="Permalink to &quot;配置长期记忆&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;longterm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;storage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;index&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vector&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;auto_save&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;save_interval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-3-4-记忆存储" tabindex="-1">6.3.4 记忆存储 <a class="header-anchor" href="#_6-3-4-记忆存储" aria-label="Permalink to &quot;6.3.4 记忆存储&quot;">​</a></h2><h3 id="存储后端" tabindex="-1">存储后端 <a class="header-anchor" href="#存储后端" aria-label="Permalink to &quot;存储后端&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>支持的后端：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 文件存储 (File)</span></span>
<span class="line"><span>   ├── 简单易用</span></span>
<span class="line"><span>   ├── 适合个人</span></span>
<span class="line"><span>   └── ~/.openclaw/memory/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. SQLite</span></span>
<span class="line"><span>   ├── 轻量级数据库</span></span>
<span class="line"><span>   ├── 支持查询</span></span>
<span class="line"><span>   └── 适合中小规模</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 向量数据库 (Vector)</span></span>
<span class="line"><span>   ├── 语义搜索</span></span>
<span class="line"><span>   ├── 支持相似度</span></span>
<span class="line"><span>   └── Pinecone/Weaviate/Qdrant</span></span></code></pre></div><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;storage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;backend&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;encryption&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;storage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;backend&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vector&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;qdrant&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://localhost:6333&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;collection&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openclaw_memory&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-3-5-记忆检索" tabindex="-1">6.3.5 记忆检索 <a class="header-anchor" href="#_6-3-5-记忆检索" aria-label="Permalink to &quot;6.3.5 记忆检索&quot;">​</a></h2><h3 id="检索方式" tabindex="-1">检索方式 <a class="header-anchor" href="#检索方式" aria-label="Permalink to &quot;检索方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>检索类型：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 精确匹配</span></span>
<span class="line"><span>   → 关键词完全匹配</span></span>
<span class="line"><span>   → 速度快</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 语义搜索</span></span>
<span class="line"><span>   → 理解意图</span></span>
<span class="line"><span>   → 支持相似度</span></span>
<span class="line"><span>   → 使用向量索引</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 混合搜索</span></span>
<span class="line"><span>   → 结合关键词和语义</span></span>
<span class="line"><span>   → 效果最好</span></span></code></pre></div><h3 id="检索配置" tabindex="-1">检索配置 <a class="header-anchor" href="#检索配置" aria-label="Permalink to &quot;检索配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;retrieval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hybrid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;top_k&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;threshold&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;boost_recent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-3-6-记忆操作" tabindex="-1">6.3.6 记忆操作 <a class="header-anchor" href="#_6-3-6-记忆操作" aria-label="Permalink to &quot;6.3.6 记忆操作&quot;">​</a></h2><h3 id="手动操作" tabindex="-1">手动操作 <a class="header-anchor" href="#手动操作" aria-label="Permalink to &quot;手动操作&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>记忆命令：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 记住信息</span></span>
<span class="line"><span>   用户：记住我的 API Key 是 xxx</span></span>
<span class="line"><span>   → 保存到长期记忆</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 回忆信息</span></span>
<span class="line"><span>   用户：之前记住的 API Key 是什么？</span></span>
<span class="line"><span>   → 从记忆检索</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 列出记忆</span></span>
<span class="line"><span>   用户：记住我哪些信息？</span></span>
<span class="line"><span>   → 列出所有记忆</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 删除记忆</span></span>
<span class="line"><span>   用户：删除所有记忆</span></span>
<span class="line"><span>   → 清理记忆存储</span></span></code></pre></div><h3 id="编程操作" tabindex="-1">编程操作 <a class="header-anchor" href="#编程操作" aria-label="Permalink to &quot;编程操作&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 保存记忆</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memory.save(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user_preference&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;language&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;python&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    ttl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">86400</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 30</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 30天</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检索记忆</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">results </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memory.search(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;编程偏好&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    top_k</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除记忆</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memory.delete(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user_preference&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><hr><h2 id="_6-3-7-⚠️-memory-search-memory-get-在-subagent-中被禁用-v2026-3-24-55385" tabindex="-1">6.3.7 ⚠️ memory_search / memory_get 在 Subagent 中被禁用（v2026.3.24 #55385） <a class="header-anchor" href="#_6-3-7-⚠️-memory-search-memory-get-在-subagent-中被禁用-v2026-3-24-55385" aria-label="Permalink to &quot;6.3.7 ⚠️ memory_search / memory_get 在 Subagent 中被禁用（v2026.3.24 #55385）&quot;">​</a></h2><p><strong>问题</strong>：在 Subagent（子 Agent）环境中调用 <code>memory_search</code> 或 <code>memory_get</code> 工具时，请求被硬编码拒绝，工具不可用。</p><p><strong>根因</strong>：<code>memory_search</code> 和 <code>memory_get</code> 被列入 <code>SUBAGENT_TOOL_DENY_ALWAYS</code> 黑名单，Subagent 永远无法调用这两个工具。</p><p><strong>影响范围</strong>：</p><ul><li>Subagent 无法主动检索长期记忆</li><li>Subagent 无法读取 MEMORY.md 或 daily memory 文件</li><li>在 <code>isolated</code> session 中运行的 Cron Job 任务也无法使用记忆检索</li></ul><p><strong>临时解决方案</strong>：目前无有效 workaround，Subagent 如需记忆只能通过以下方式绕行：</p><ol><li><strong>主 Agent 中转</strong>：在主 session 先检索记忆，再通过 <code>sessions_send</code> 将结果传给 Subagent</li><li><strong>文件注入</strong>：在 Subagent 启动时通过 <code>task</code> 参数直接传入关键记忆内容</li></ol><p><strong>示例 — 主 Agent 中转</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;task&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;基于以下记忆内容回答用户问题：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${MEMORY_CONTENT}</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">用户问题：分析今日运营数据&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;runtime&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;subagent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;mode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;run&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>官方修复跟踪</strong>：<a href="https://github.com/openclaw/openclaw/issues/55385" target="_blank" rel="noreferrer">Issue #55385</a></p><hr><h2 id="_6-3-8-常见问题" tabindex="-1">6.3.8 常见问题 <a class="header-anchor" href="#_6-3-8-常见问题" aria-label="Permalink to &quot;6.3.8 常见问题&quot;">​</a></h2><h3 id="q1-记忆不生效" tabindex="-1">Q1: 记忆不生效 <a class="header-anchor" href="#q1-记忆不生效" aria-label="Permalink to &quot;Q1: 记忆不生效&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：记住的信息没有被使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查是否保存成功</span></span>
<span class="line"><span>2. 检查检索关键词</span></span>
<span class="line"><span>3. 确认 auto_recall 启用</span></span></code></pre></div><h3 id="q2-隐私问题" tabindex="-1">Q2: 隐私问题 <a class="header-anchor" href="#q2-隐私问题" aria-label="Permalink to &quot;Q2: 隐私问题&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：担心敏感信息泄露</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 启用加密存储</span></span>
<span class="line"><span>2. 排除敏感字段</span></span>
<span class="line"><span>3. 使用本地存储</span></span></code></pre></div><h3 id="q3-记忆过多" tabindex="-1">Q3: 记忆过多 <a class="header-anchor" href="#q3-记忆过多" aria-label="Permalink to &quot;Q3: 记忆过多&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：检索变慢</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 定期清理</span></span>
<span class="line"><span>2. 使用向量索引</span></span>
<span class="line"><span>3. 分类存储</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>短期记忆</strong>：当前会话，临时变量</li><li><strong>长期记忆</strong>：跨会话，持久化</li><li><strong>存储后端</strong>：文件、SQLite、向量</li><li><strong>检索</strong>：精确、语义、混合</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>短期记忆和长期记忆如何选择？</li><li>如何保护敏感记忆？</li><li>记忆系统如何实现持续学习？</li></ol>`,68)])])}const E=a(l,[["render",e]]);export{d as __pageData,E as default};
