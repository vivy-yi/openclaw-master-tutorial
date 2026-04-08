import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"6.2 消息历史管理","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/06_上下文与记忆/6.2_message_history.md","filePath":"chapters/06_上下文与记忆/6.2_message_history.md"}'),l={name:"chapters/06_上下文与记忆/6.2_message_history.md"};function e(t,s,h,k,o,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_6-2-消息历史管理" tabindex="-1">6.2 消息历史管理 <a class="header-anchor" href="#_6-2-消息历史管理" aria-label="Permalink to &quot;6.2 消息历史管理&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解消息历史的存储结构</li><li>掌握历史消息的处理策略</li><li>学会配置消息历史</li></ul><hr><h2 id="_6-2-1-消息结构" tabindex="-1">6.2.1 消息结构 <a class="header-anchor" href="#_6-2-1-消息结构" aria-label="Permalink to &quot;6.2.1 消息结构&quot;">​</a></h2><h3 id="消息类型" tabindex="-1">消息类型 <a class="header-anchor" href="#消息类型" aria-label="Permalink to &quot;消息类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>消息类型：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. user - 用户消息</span></span>
<span class="line"><span>2. assistant - AI 回复</span></span>
<span class="line"><span>3. system - 系统消息</span></span>
<span class="line"><span>4. tool - 工具调用</span></span>
<span class="line"><span>5. tool_result - 工具结果</span></span></code></pre></div><h3 id="完整结构" tabindex="-1">完整结构 <a class="header-anchor" href="#完整结构" aria-label="Permalink to &quot;完整结构&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;msg_123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;role&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;帮我读取这个文件&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;timestamp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2024-01-15T10:30:00Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;attachments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/path/to/file&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;metadata&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;channel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cli&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;user_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user_123&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-2-2-历史管理策略" tabindex="-1">6.2.2 历史管理策略 <a class="header-anchor" href="#_6-2-2-历史管理策略" aria-label="Permalink to &quot;6.2.2 历史管理策略&quot;">​</a></h2><h3 id="保留策略" tabindex="-1">保留策略 <a class="header-anchor" href="#保留策略" aria-label="Permalink to &quot;保留策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>历史消息保留方式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 全部保留</span></span>
<span class="line"><span>   ├── 保留完整历史</span></span>
<span class="line"><span>   ├── 最耗 Token</span></span>
<span class="line"><span>   └── 最完整上下文</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 保留最近 N 条</span></span>
<span class="line"><span>   ├── 保留最近消息</span></span>
<span class="line"><span>   ├── 简单有效</span></span>
<span class="line"><span>   └── 可能丢失早期关键信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 摘要压缩</span></span>
<span class="line"><span>   ├── 压缩为摘要</span></span>
<span class="line"><span>   ├── 平衡信息和 Token</span></span>
<span class="line"><span>   └── 需要好的摘要模型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 重要性筛选</span></span>
<span class="line"><span>   ├── 只保留重要消息</span></span>
<span class="line"><span>   ├── 需要标记重要性</span></span>
<span class="line"><span>   └── 智能筛选</span></span></code></pre></div><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;history&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;strategy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;compress&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;max_messages&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;compression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;threshold&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;summary_model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o-mini&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-2-3-消息压缩" tabindex="-1">6.2.3 消息压缩 <a class="header-anchor" href="#_6-2-3-消息压缩" aria-label="Permalink to &quot;6.2.3 消息压缩&quot;">​</a></h2><h3 id="压缩触发条件" tabindex="-1">压缩触发条件 <a class="header-anchor" href="#压缩触发条件" aria-label="Permalink to &quot;压缩触发条件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>触发条件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Token 超限</span></span>
<span class="line"><span>   → 当前 Token &gt; 阈值</span></span>
<span class="line"><span>   → 触发压缩</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 手动触发</span></span>
<span class="line"><span>   → 用户命令</span></span>
<span class="line"><span>   → @compress</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 定期触发</span></span>
<span class="line"><span>   → 每 N 条消息</span></span>
<span class="line"><span>   → 定时压缩</span></span></code></pre></div><h3 id="压缩流程" tabindex="-1">压缩流程 <a class="header-anchor" href="#压缩流程" aria-label="Permalink to &quot;压缩流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>原始消息（100条）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: 分段</span></span>
<span class="line"><span>  → 分为 5 组，每组 20 条</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 摘要每组</span></span>
<span class="line"><span>  → 组1: &quot;用户询问了文件操作...&quot;</span></span>
<span class="line"><span>  → 组2: &quot;AI 读取并分析了文件...&quot;</span></span>
<span class="line"><span>  → 组3: &quot;用户追问细节...&quot;</span></span>
<span class="line"><span>  → ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 合并摘要</span></span>
<span class="line"><span>  → 生成整体摘要</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 4: 替换原消息</span></span>
<span class="line"><span>  → 删除原始消息</span></span>
<span class="line"><span>  → 保留摘要 + 最近 N 条</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>压缩后：摘要 + 10条原始消息</span></span></code></pre></div><h3 id="压缩提示词" tabindex="-1">压缩提示词 <a class="header-anchor" href="#压缩提示词" aria-label="Permalink to &quot;压缩提示词&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 消息摘要提示词</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请将以下消息历史压缩为简洁的摘要：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 要求</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保留关键信息</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保留用户意图</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保留重要结论</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 删除重复内容</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">5.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保持时间线清晰</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">用 3-5 句话概括：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户的核心需求</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AI 的主要回复</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 关键结论或操作</span></span></code></pre></div><hr><h2 id="_6-2-4-上下文窗口" tabindex="-1">6.2.4 上下文窗口 <a class="header-anchor" href="#_6-2-4-上下文窗口" aria-label="Permalink to &quot;6.2.4 上下文窗口&quot;">​</a></h2><h3 id="窗口管理" tabindex="-1">窗口管理 <a class="header-anchor" href="#窗口管理" aria-label="Permalink to &quot;窗口管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>上下文窗口概念：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              上下文窗口                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  [窗口内消息] ← 发送给 LLM                  │</span></span>
<span class="line"><span>│  ─────────────                             │</span></span>
<span class="line"><span>│  用户: 你好                                 │</span></span>
<span class="line"><span>│  AI: 你好                                  │</span></span>
<span class="line"><span>│  用户: 帮我查天气                          │</span></span>
<span class="line"><span>│  AI: 好的                                  │</span></span>
<span class="line"><span>│  ───────────── ← 窗口滑动                   │</span></span>
<span class="line"><span>│  [历史消息] ← 已处理，不重复发送            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="滑动窗口" tabindex="-1">滑动窗口 <a class="header-anchor" href="#滑动窗口" aria-label="Permalink to &quot;滑动窗口&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;history&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;window&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sliding&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;slide_by&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;preserve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user_preferences&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;important_conclusions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-2-5-会话隔离" tabindex="-1">6.2.5 会话隔离 <a class="header-anchor" href="#_6-2-5-会话隔离" aria-label="Permalink to &quot;6.2.5 会话隔离&quot;">​</a></h2><h3 id="按会话隔离" tabindex="-1">按会话隔离 <a class="header-anchor" href="#按会话隔离" aria-label="Permalink to &quot;按会话隔离&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>会话隔离机制：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           会话隔离                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  Session A                                   │</span></span>
<span class="line"><span>│  ├── 用户 A1                                │</span></span>
<span class="line"><span>│  ├── AI A1                                  │</span></span>
<span class="line"><span>│  └── 独立上下文                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  Session B                                   │</span></span>
<span class="line"><span>│  ├── 用户 B1                                │</span></span>
<span class="line"><span>│  ├── AI B1                                  │</span></span>
<span class="line"><span>│  └── 独立上下文                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  Global (可选)                              │</span></span>
<span class="line"><span>│  └── 跨会话共享信息                         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="配置会话" tabindex="-1">配置会话 <a class="header-anchor" href="#配置会话" aria-label="Permalink to &quot;配置会话&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;session&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;default_isolation&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;session&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;global_session&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;global_shared&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cross_session_memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-2-6-常见问题" tabindex="-1">6.2.6 常见问题 <a class="header-anchor" href="#_6-2-6-常见问题" aria-label="Permalink to &quot;6.2.6 常见问题&quot;">​</a></h2><h3 id="q1-历史消息丢失" tabindex="-1">Q1: 历史消息丢失 <a class="header-anchor" href="#q1-历史消息丢失" aria-label="Permalink to &quot;Q1: 历史消息丢失&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：切换会话后历史丢失</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 使用相同 sessionKey</span></span>
<span class="line"><span>2. 启用跨会话记忆</span></span>
<span class="line"><span>3. 手动传递上下文</span></span></code></pre></div><h3 id="q2-压缩后信息不完整" tabindex="-1">Q2: 压缩后信息不完整 <a class="header-anchor" href="#q2-压缩后信息不完整" aria-label="Permalink to &quot;Q2: 压缩后信息不完整&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：摘要质量差</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 优化摘要提示词</span></span>
<span class="line"><span>2. 使用更好的模型</span></span>
<span class="line"><span>3. 增加原始消息保留数量</span></span></code></pre></div><h3 id="q3-token-仍然超限" tabindex="-1">Q3: Token 仍然超限 <a class="header-anchor" href="#q3-token-仍然超限" aria-label="Permalink to &quot;Q3: Token 仍然超限&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：压缩后仍然超限</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 减少保留消息数</span></span>
<span class="line"><span>2. 使用更强压缩</span></span>
<span class="line"><span>3. 分段处理长任务</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>消息类型</strong>：user、assistant、system、tool</li><li><strong>保留策略</strong>：全部、压缩、筛选</li><li><strong>压缩</strong>：触发条件、流程、优化</li><li><strong>会话隔离</strong>：独立上下文、可选共享</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>如何选择合适的历史保留策略？</li><li>压缩算法如何保证质量？</li><li>什么场景需要会话隔离？</li></ol>`,49)])])}const E=a(l,[["render",e]]);export{c as __pageData,E as default};
