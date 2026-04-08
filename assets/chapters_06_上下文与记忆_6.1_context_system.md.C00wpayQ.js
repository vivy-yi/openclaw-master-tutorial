import{_ as a,o as n,c as p,ae as l}from"./chunks/framework.Czhw_PXq.js";const k=JSON.parse('{"title":"6.1 上下文系统概述","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/06_上下文与记忆/6.1_context_system.md","filePath":"chapters/06_上下文与记忆/6.1_context_system.md"}'),i={name:"chapters/06_上下文与记忆/6.1_context_system.md"};function e(t,s,c,h,o,r){return n(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="_6-1-上下文系统概述" tabindex="-1">6.1 上下文系统概述 <a class="header-anchor" href="#_6-1-上下文系统概述" aria-label="Permalink to &quot;6.1 上下文系统概述&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解上下文系统的架构</li><li>掌握上下文组装流程</li><li>了解上下文限制和优化</li></ul><hr><h2 id="_6-1-1-什么是上下文" tabindex="-1">6.1.1 什么是上下文 <a class="header-anchor" href="#_6-1-1-什么是上下文" aria-label="Permalink to &quot;6.1.1 什么是上下文&quot;">​</a></h2><h3 id="上下文的定义" tabindex="-1">上下文的定义 <a class="header-anchor" href="#上下文的定义" aria-label="Permalink to &quot;上下文的定义&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              上下文 (Context)                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  上下文 = 发送给 LLM 的完整信息              │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  包含内容：                                  │</span></span>
<span class="line"><span>│  ├── 系统提示 (System Prompt)               │</span></span>
<span class="line"><span>│  ├── 用户消息 (User Message)                │</span></span>
<span class="line"><span>│  ├── 历史消息 (History Messages)            │</span></span>
<span class="line"><span>│  ├── 工具结果 (Tool Results)                │</span></span>
<span class="line"><span>│  ├── 记忆内容 (Memory)                     │</span></span>
<span class="line"><span>│  └── 额外上下文 (Extra Context)            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  限制：受模型 max_tokens 限制               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![上下文管理]/assets/diagrams/103_context_management.png)</p><p>![上下文窗口]/assets/diagrams/33_context_window.png)</p><h3 id="上下文的作用" tabindex="-1">上下文的作用 <a class="header-anchor" href="#上下文的作用" aria-label="Permalink to &quot;上下文的作用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>为什么需要上下文：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 保持对话连贯</span></span>
<span class="line"><span>   ├── 记住之前的对话内容</span></span>
<span class="line"><span>   └── 理解用户意图</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 提供背景信息</span></span>
<span class="line"><span>   ├── 项目信息</span></span>
<span class="line"><span>   └── 用户偏好</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 引用历史数据</span></span>
<span class="line"><span>   ├── 之前的分析</span></span>
<span class="line"><span>   └── 生成的代码</span></span></code></pre></div><hr><h2 id="_6-1-2-上下文组成" tabindex="-1">6.1.2 上下文组成 <a class="header-anchor" href="#_6-1-2-上下文组成" aria-label="Permalink to &quot;6.1.2 上下文组成&quot;">​</a></h2><h3 id="完整结构" tabindex="-1">完整结构 <a class="header-anchor" href="#完整结构" aria-label="Permalink to &quot;完整结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           完整上下文结构                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  1. System Prompt                            │</span></span>
<span class="line"><span>│     ├── 基础指令                             │</span></span>
<span class="line"><span>│     ├── 能力描述                             │</span></span>
<span class="line"><span>│     └── 约束规则                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  2. Persona Config                          │</span></span>
<span class="line"><span>│     ├── 角色设定                             │</span></span>
<span class="line"><span>│     ├── 说话风格                             │</span></span>
<span class="line"><span>│     └── 专业知识                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  3. Skills Prompts                          │</span></span>
<span class="line"><span>│     ├── 激活的 Skill                        │</span></span>
<span class="line"><span>│     └── 注入的提示词                         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  4. User Message                            │</span></span>
<span class="line"><span>│     ├── 当前请求                             │</span></span>
<span class="line"><span>│     └── 附件/图片                            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  5. Message History                         │</span></span>
<span class="line"><span>│     ├── 最近 N 条消息                        │</span></span>
<span class="line"><span>│     └── 摘要（如压缩后）                     │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  6. Tool Results                            │</span></span>
<span class="line"><span>│     ├── 工具调用结果                         │</span></span>
<span class="line"><span>│     └── 格式化输出                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  7. Memory                                  │</span></span>
<span class="line"><span>│     ├── 短期记忆                            │</span></span>
<span class="line"><span>│     └── 长期记忆（如启用）                   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="token-预算分配" tabindex="-1">Token 预算分配 <a class="header-anchor" href="#token-预算分配" aria-label="Permalink to &quot;Token 预算分配&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>上下文 Token 分配示例（总预算：100K）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Token 预算分配                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  System Prompt     ████████░░░░  20K 20%   │</span></span>
<span class="line"><span>│  Persona           ██░░░░░░░░░░   5K  5%   │</span></span>
<span class="line"><span>│  Skills            ████░░░░░░░░  10K 10%   │</span></span>
<span class="line"><span>│  User Message      ████████░░░░  20K 20%   │</span></span>
<span class="line"><span>│  History           ██████░░░░░░  15K 15%   │</span></span>
<span class="line"><span>│  Tool Results      ████░░░░░░░░  10K 10%   │</span></span>
<span class="line"><span>│  Memory            ████░░░░░░░░  10K 10%   │</span></span>
<span class="line"><span>│  压缩预留          ████░░░░░░░░  10K 10%   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  总计：100K                                  │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_6-1-3-上下文组装流程" tabindex="-1">6.1.3 上下文组装流程 <a class="header-anchor" href="#_6-1-3-上下文组装流程" aria-label="Permalink to &quot;6.1.3 上下文组装流程&quot;">​</a></h2><h3 id="组装步骤" tabindex="-1">组装步骤 <a class="header-anchor" href="#组装步骤" aria-label="Permalink to &quot;组装步骤&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户消息：帮我审查这段代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: 加载系统提示</span></span>
<span class="line"><span>  → OpenClaw 基础指令</span></span>
<span class="line"><span>  → &quot;你是一个专业的代码审查助手&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 加载 Persona</span></span>
<span class="line"><span>  → 用户配置的风格</span></span>
<span class="line"><span>  → &quot;回答要简洁、专业&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 加载 Skills</span></span>
<span class="line"><span>  → 激活的 Skill 提示词</span></span>
<span class="line"><span>  → &quot;代码审查标准...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 4: 加载用户消息</span></span>
<span class="line"><span>  → &quot;帮我审查这段代码&quot;</span></span>
<span class="line"><span>  → 附带的代码内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 5: 加载历史消息</span></span>
<span class="line"><span>  → 最近 10 条对话</span></span>
<span class="line"><span>  → &quot;之前的审查结果...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 6: 加载工具结果</span></span>
<span class="line"><span>  → 之前的文件读取结果</span></span>
<span class="line"><span>  → &quot;代码内容：...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 7: 加载记忆</span></span>
<span class="line"><span>  → 用户偏好</span></span>
<span class="line"><span>  → 项目背景</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 8: Token 预算检查</span></span>
<span class="line"><span>  → 计算总 Token</span></span>
<span class="line"><span>  → 触发压缩（如超限）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>组装完成 → 发送给 LLM</span></span></code></pre></div><hr><h2 id="_6-1-4-上下文限制" tabindex="-1">6.1.4 上下文限制 <a class="header-anchor" href="#_6-1-4-上下文限制" aria-label="Permalink to &quot;6.1.4 上下文限制&quot;">​</a></h2><h3 id="模型限制" tabindex="-1">模型限制 <a class="header-anchor" href="#模型限制" aria-label="Permalink to &quot;模型限制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>常见模型上下文限制：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| 模型 | 上下文限制 |</span></span>
<span class="line"><span>|-----|----------|</span></span>
<span class="line"><span>| GPT-4o | 128K |</span></span>
<span class="line"><span>| GPT-4o-mini | 128K |</span></span>
<span class="line"><span>| Claude 3.5 | 200K |</span></span>
<span class="line"><span>| Claude 3 Haiku | 200K |</span></span>
<span class="line"><span>| DeepSeek V3 | 64K |</span></span>
<span class="line"><span>| Kimi | 200万字 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意：实际可用 = 限制 - 输出预留</span></span></code></pre></div><h3 id="超出限制的处理" tabindex="-1">超出限制的处理 <a class="header-anchor" href="#超出限制的处理" aria-label="Permalink to &quot;超出限制的处理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>处理策略：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 消息压缩</span></span>
<span class="line"><span>   → 合并历史消息为摘要</span></span>
<span class="line"><span>   → 保留关键信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 截断策略</span></span>
<span class="line"><span>   → 保留最近消息</span></span>
<span class="line"><span>   → 优先保留用户消息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 渐进摘要</span></span>
<span class="line"><span>   → 每次只摘要一部分</span></span>
<span class="line"><span>   → 平衡历史和现在</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 人工介入</span></span>
<span class="line"><span>   → 请求确认关键信息</span></span>
<span class="line"><span>   → 清理不相关内容</span></span></code></pre></div><hr><h2 id="_6-1-5-上下文优化" tabindex="-1">6.1.5 上下文优化 <a class="header-anchor" href="#_6-1-5-上下文优化" aria-label="Permalink to &quot;6.1.5 上下文优化&quot;">​</a></h2><h3 id="优化技巧" tabindex="-1">优化技巧 <a class="header-anchor" href="#优化技巧" aria-label="Permalink to &quot;优化技巧&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>优化建议：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 精简系统提示</span></span>
<span class="line"><span>   ├── 删除冗余指令</span></span>
<span class="line"><span>   └── 使用占位符</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 压缩历史</span></span>
<span class="line"><span>   ├── 启用自动摘要</span></span>
<span class="line"><span>   └── 保留关键转折</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 精简工具结果</span></span>
<span class="line"><span>   ├── 提取关键信息</span></span>
<span class="line"><span>   └── 避免重复内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 分段处理</span></span>
<span class="line"><span>   ├── 长文档分段输入</span></span>
<span class="line"><span>   └── 多次交互处理</span></span></code></pre></div><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;context&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;system_prompt&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;compress_on_limit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;history&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_messages&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;compression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;threshold&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;tool_results&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;max_tokens&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;truncate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-1-6-常见问题" tabindex="-1">6.1.6 常见问题 <a class="header-anchor" href="#_6-1-6-常见问题" aria-label="Permalink to &quot;6.1.6 常见问题&quot;">​</a></h2><h3 id="q1-上下文超出限制" tabindex="-1">Q1: 上下文超出限制 <a class="header-anchor" href="#q1-上下文超出限制" aria-label="Permalink to &quot;Q1: 上下文超出限制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Context length exceeded</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 启用压缩</span></span>
<span class="line"><span>2. 减少历史消息</span></span>
<span class="line"><span>3. 精简工具结果</span></span>
<span class="line"><span>4. 使用更大模型</span></span></code></pre></div><h3 id="q2-重要信息丢失" tabindex="-1">Q2: 重要信息丢失 <a class="header-anchor" href="#q2-重要信息丢失" aria-label="Permalink to &quot;Q2: 重要信息丢失&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：压缩后关键信息丢失</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 设置关键信息标记</span></span>
<span class="line"><span>2. 手动保存关键结论</span></span>
<span class="line"><span>3. 调整压缩策略</span></span></code></pre></div><h3 id="q3-响应变慢" tabindex="-1">Q3: 响应变慢 <a class="header-anchor" href="#q3-响应变慢" aria-label="Permalink to &quot;Q3: 响应变慢&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：上下文太长导致响应慢</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 减少上下文长度</span></span>
<span class="line"><span>2. 使用更快的模型</span></span>
<span class="line"><span>3. 启用缓存</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>上下文</strong>：发送给 LLM 的完整信息</li><li><strong>组成</strong>：系统提示、消息历史、工具结果、记忆</li><li><strong>限制</strong>：模型 token 上限</li><li><strong>优化</strong>：压缩、截断、分段</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>上下文太长有哪些负面影响？</li><li>如何在保持信息和节省 Token 之间平衡？</li><li>压缩算法如何选择？</li></ol>`,47)])])}const u=a(i,[["render",e]]);export{k as __pageData,u as default};
