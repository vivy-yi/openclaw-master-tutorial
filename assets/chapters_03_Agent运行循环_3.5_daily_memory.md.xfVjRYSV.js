import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"3.5 每日记忆","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.5_daily_memory.md","filePath":"chapters/03_Agent运行循环/3.5_daily_memory.md"}'),l={name:"chapters/03_Agent运行循环/3.5_daily_memory.md"};function e(t,s,h,k,d,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-5-每日记忆" tabindex="-1">3.5 每日记忆 <a class="header-anchor" href="#_3-5-每日记忆" aria-label="Permalink to &quot;3.5 每日记忆&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解每日记忆的概念和作用</li><li>掌握 daily/ 目录的使用方法</li><li>学会在对话中运用每日记忆</li></ul><hr><h2 id="_3-5-1-每日记忆概述" tabindex="-1">3.5.1 每日记忆概述 <a class="header-anchor" href="#_3-5-1-每日记忆概述" aria-label="Permalink to &quot;3.5.1 每日记忆概述&quot;">​</a></h2><h3 id="什么是每日记忆" tabindex="-1">什么是每日记忆 <a class="header-anchor" href="#什么是每日记忆" aria-label="Permalink to &quot;什么是每日记忆&quot;">​</a></h3><p>每日记忆是 OpenClaw 的短期记忆系统，存储在 <code>workspace/daily/</code> 目录下的日期文件中。它记录了每天的会话内容、重要事项和学习新知。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                            每日记忆架构                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │                       workspace/daily/                               │   │</span></span>
<span class="line"><span>│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │   │</span></span>
<span class="line"><span>│   │   │ 2024-01-15.md│  │ 2024-01-16.md│  │ 2024-01-17.md│   ...     │   │</span></span>
<span class="line"><span>│   │   ├─────────────┤  ├─────────────┤  ├─────────────┤              │   │</span></span>
<span class="line"><span>│   │   │ 今日事项    │  │ 今日事项    │  │ 今日事项    │              │   │</span></span>
<span class="line"><span>│   │   │ 学习新知    │  │ 学习新知    │  │ 学习新知    │              │   │</span></span>
<span class="line"><span>│   │   │ 待办事项    │  │ 待办事项    │  │ 待办事项    │              │   │</span></span>
<span class="line"><span>│   │   └─────────────┘  └─────────────┘  └─────────────┘              │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   特点：                                                                       │</span></span>
<span class="line"><span>│   • 按日期自动创建                                                            │</span></span>
<span class="line"><span>│   • 每日自动记录                                                             │</span></span>
<span class="line"><span>│   • 会话结束自动保存                                                          │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![每日记忆]/assets/diagrams/45_daily_memory_flow.png)</p><h3 id="每日记忆-vs-长期记忆" tabindex="-1">每日记忆 vs 长期记忆 <a class="header-anchor" href="#每日记忆-vs-长期记忆" aria-label="Permalink to &quot;每日记忆 vs 长期记忆&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>长期记忆 (MEMORY.md)</th><th>每日记忆 (daily/)</th></tr></thead><tbody><tr><td>存储位置</td><td><code>memory/MEMORY.md</code></td><td><code>daily/YYYY-MM-DD.md</code></td></tr><tr><td>内容周期</td><td>长期有效</td><td>当天有效</td></tr><tr><td>更新频率</td><td>低</td><td>高</td></tr><tr><td>加载时机</td><td>每次会话</td><td>每次会话</td></tr><tr><td>内容类型</td><td>核心知识、规则、偏好</td><td>今日事项、学习新知</td></tr></tbody></table><hr><h2 id="_3-5-2-记忆文件结构" tabindex="-1">3.5.2 记忆文件结构 <a class="header-anchor" href="#_3-5-2-记忆文件结构" aria-label="Permalink to &quot;3.5.2 记忆文件结构&quot;">​</a></h2><h3 id="每日文件标准格式" tabindex="-1">每日文件标准格式 <a class="header-anchor" href="#每日文件标准格式" aria-label="Permalink to &quot;每日文件标准格式&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 2024-01-15 每日记忆</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 今日事项</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 完成了用户认证模块的开发</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 修复了登录页面的 bug</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 与产品经理讨论了下迭代需求</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 学习新知</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户偏好使用 React Hooks</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户公司使用 PostgreSQL 数据库</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户提到了想要尝试 TypeScript</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 待办事项</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 代码审查</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 更新 API 文档</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 准备下周一的技术分享</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 重要信息</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户的 API 文档放在 ~/docs/api.md</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 下周三之前需要完成支付模块</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 会话摘要</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 会话 1: 讨论了认证流程实现</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 会话 2: 修复了 bug</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 会话 3: 规划了下迭代功能</span></span></code></pre></div><h3 id="自动记录内容" tabindex="-1">自动记录内容 <a class="header-anchor" href="#自动记录内容" aria-label="Permalink to &quot;自动记录内容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>每日记忆自动记录的内容：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 会话摘要</span></span>
<span class="line"><span>   - 会话数量</span></span>
<span class="line"><span>   - 主要话题</span></span>
<span class="line"><span>   - 完成的任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 用户偏好变化</span></span>
<span class="line"><span>   - 新提到的偏好</span></span>
<span class="line"><span>   - 习惯变化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 项目进展</span></span>
<span class="line"><span>   - 完成的任务</span></span>
<span class="line"><span>   - 遇到的问题</span></span>
<span class="line"><span>   - 待办事项</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 学习新知</span></span>
<span class="line"><span>   - 技术栈信息</span></span>
<span class="line"><span>   - 团队信息</span></span>
<span class="line"><span>   - 项目背景</span></span></code></pre></div><hr><h2 id="_3-5-3-管理命令" tabindex="-1">3.5.3 管理命令 <a class="header-anchor" href="#_3-5-3-管理命令" aria-label="Permalink to &quot;3.5.3 管理命令&quot;">​</a></h2><h3 id="cli-命令" tabindex="-1">CLI 命令 <a class="header-anchor" href="#cli-命令" aria-label="Permalink to &quot;CLI 命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看今日记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看指定日期记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 2024-01-15</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yesterday</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> last-week</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加今日记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;用户提到喜欢使用 VSCode&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加待办事项</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> todo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;完成代码审查&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 标记待办完成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> done</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;完成代码审查&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看所有待办</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> todos</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;关键词&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出最近记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span></code></pre></div><h3 id="手动创建" tabindex="-1">手动创建 <a class="header-anchor" href="#手动创建" aria-label="Permalink to &quot;手动创建&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建今日记忆文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +%Y-%m-%d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或使用 echo</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;# $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +%Y-%m-%d) 每日记忆&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +%Y-%m-%d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.md</span></span></code></pre></div><hr><h2 id="_3-5-4-记忆加载流程" tabindex="-1">3.5.4 记忆加载流程 <a class="header-anchor" href="#_3-5-4-记忆加载流程" aria-label="Permalink to &quot;3.5.4 记忆加载流程&quot;">​</a></h2><h3 id="加载流程图" tabindex="-1">加载流程图 <a class="header-anchor" href="#加载流程图" aria-label="Permalink to &quot;加载流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         每日记忆加载流程                                        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                              会话启动</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  1. 检查今日记忆文件         │</span></span>
<span class="line"><span>                    │  daily/YYYY-MM-DD.md         │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                              存在？ │</span></span>
<span class="line"><span>                              ╱     ╲</span></span>
<span class="line"><span>                            是      否</span></span>
<span class="line"><span>                             ╲     ╱</span></span>
<span class="line"><span>                              ╲   ╱</span></span>
<span class="line"><span>                               ╲ ╱</span></span>
<span class="line"><span>                                ╲│</span></span>
<span class="line"><span>                                 ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  2. 加载记忆内容             │</span></span>
<span class="line"><span>                    │  - 今日事项                  │</span></span>
<span class="line"><span>                    │  - 学习新知                  │</span></span>
<span class="line"><span>                    │  - 待办事项                  │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  3. 会话上下文整合           │</span></span>
<span class="line"><span>                    │  长期记忆 + 每日记忆 + 当前   │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                              会话就绪 ✅</span></span></code></pre></div><h3 id="写入时机" tabindex="-1">写入时机 <a class="header-anchor" href="#写入时机" aria-label="Permalink to &quot;写入时机&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          记忆写入时机                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  自动写入：                                                                     │</span></span>
<span class="line"><span>│  ├── 会话结束时自动保存会话摘要                                               │</span></span>
<span class="line"><span>│  ├── 用户明确告知的信息                                                       │</span></span>
<span class="line"><span>│  ├── 重要的项目进展                                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  手动写入：                                                                     │</span></span>
<span class="line"><span>│  ├── 用户要求记录                                                             │</span></span>
<span class="line"><span>│  ├── 重要待办事项                                                             │</span></span>
<span class="line"><span>│  ├── 临时需要记住的信息                                                       │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  不写入：                                                                     │</span></span>
<span class="line"><span>│  ├── 敏感信息                                                                │</span></span>
<span class="line"><span>│  ├── 临时性对话                                                              │</span></span>
<span class="line"><span>│  ├── 调试输出                                                                │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-5-5-配置选项" tabindex="-1">3.5.5 配置选项 <a class="header-anchor" href="#_3-5-5-配置选项" aria-label="Permalink to &quot;3.5.5 配置选项&quot;">​</a></h2><h3 id="配置每日记忆" tabindex="-1">配置每日记忆 <a class="header-anchor" href="#配置每日记忆" aria-label="Permalink to &quot;配置每日记忆&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// openclaw.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;daily&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;folder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;daily&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;autoSave&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;maxDays&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;includeSessionSummary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;includeUserPreferences&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;includeTodos&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="配置说明" tabindex="-1">配置说明 <a class="header-anchor" href="#配置说明" aria-label="Permalink to &quot;配置说明&quot;">​</a></h3><table tabindex="0"><thead><tr><th>选项</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>enabled</td><td>boolean</td><td>true</td><td>启用每日记忆</td></tr><tr><td>folder</td><td>string</td><td>&quot;daily&quot;</td><td>记忆文件夹</td></tr><tr><td>autoSave</td><td>boolean</td><td>true</td><td>自动保存</td></tr><tr><td>maxDays</td><td>number</td><td>30</td><td>保留天数</td></tr><tr><td>includeSessionSummary</td><td>boolean</td><td>true</td><td>包含会话摘要</td></tr><tr><td>includeUserPreferences</td><td>boolean</td><td>true</td><td>包含用户偏好</td></tr><tr><td>includeTodos</td><td>boolean</td><td>true</td><td>包含待办事项</td></tr></tbody></table><hr><h2 id="_3-5-6-最佳实践" tabindex="-1">3.5.6 最佳实践 <a class="header-anchor" href="#_3-5-6-最佳实践" aria-label="Permalink to &quot;3.5.6 最佳实践&quot;">​</a></h2><h3 id="内容建议" tabindex="-1">内容建议 <a class="header-anchor" href="#内容建议" aria-label="Permalink to &quot;内容建议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>✅ 推荐写入每日记忆的内容：</span></span>
<span class="line"><span>- 今日完成的任务</span></span>
<span class="line"><span>- 重要讨论事项</span></span>
<span class="line"><span>- 用户偏好变化</span></span>
<span class="line"><span>- 项目进展</span></span>
<span class="line"><span>- 待办事项</span></span>
<span class="line"><span>- 学习到的新信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>❌ 不推荐写入的内容：</span></span>
<span class="line"><span>- 敏感信息（用 credentials）</span></span>
<span class="line"><span>- 长期知识（用 MEMORY.md）</span></span>
<span class="line"><span>- 大段代码（用项目文件）</span></span>
<span class="line"><span>- 调试日志</span></span></code></pre></div><h3 id="日常使用" tabindex="-1">日常使用 <a class="header-anchor" href="#日常使用" aria-label="Permalink to &quot;日常使用&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 开始新的一天</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看今天的记忆，了解昨天的工作</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 添加待办</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> todo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;完成代码审查&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 记录重要信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;用户提到下周一要演示&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 查看待办</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> todos</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. 标记完成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> done</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;完成代码审查&quot;</span></span></code></pre></div><h3 id="定期整理" tabindex="-1">定期整理 <a class="header-anchor" href="#定期整理" aria-label="Permalink to &quot;定期整理&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每周整理</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 查看本周记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --week</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 归档重要内容到 MEMORY.md</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 将重要的长期信息移到长期记忆</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 清理过期记忆</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 自动清理超过 maxDays 的记忆</span></span></code></pre></div><hr><h2 id="_3-5-7-常见问题" tabindex="-1">3.5.7 常见问题 <a class="header-anchor" href="#_3-5-7-常见问题" aria-label="Permalink to &quot;3.5.7 常见问题&quot;">​</a></h2><h3 id="q1-每日记忆没有创建" tabindex="-1">Q1: 每日记忆没有创建 <a class="header-anchor" href="#q1-每日记忆没有创建" aria-label="Permalink to &quot;Q1: 每日记忆没有创建&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件夹权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动创建</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +%Y-%m-%d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.md</span></span></code></pre></div><h3 id="q2-记忆没有自动保存" tabindex="-1">Q2: 记忆没有自动保存 <a class="header-anchor" href="#q2-记忆没有自动保存" aria-label="Permalink to &quot;Q2: 记忆没有自动保存&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 autoSave 配置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确保 openclaw.json 中 &quot;autoSave&quot;: true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查磁盘空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动保存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> save</span></span></code></pre></div><h3 id="q3-记忆文件太多" tabindex="-1">Q3: 记忆文件太多 <a class="header-anchor" href="#q3-记忆文件太多" aria-label="Permalink to &quot;Q3: 记忆文件太多&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看文件数量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> wc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 清理过期文件（超过 30 天）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*.md&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -mtime</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +30</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -delete</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或使用配置自动清理</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &quot;maxDays&quot;: 30</span></span></code></pre></div><hr><h2 id="_3-5-8-完整示例" tabindex="-1">3.5.8 完整示例 <a class="header-anchor" href="#_3-5-8-完整示例" aria-label="Permalink to &quot;3.5.8 完整示例&quot;">​</a></h2><h3 id="一天的记忆流" tabindex="-1">一天的记忆流 <a class="header-anchor" href="#一天的记忆流" aria-label="Permalink to &quot;一天的记忆流&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>早上 9:00：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ 打开 OpenClaw，自动加载：                              │</span></span>
<span class="line"><span>│ - 长期记忆 (MEMORY.md)                                │</span></span>
<span class="line"><span>│ - 今日记忆 (daily/2024-01-15.md)                      │</span></span>
<span class="line"><span>│ - 工作区文件                                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>上午工作：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ 用户：帮我看看登录模块的代码                           │</span></span>
<span class="line"><span>│                                                        │</span></span>
<span class="line"><span>│ OpenClaw：                                            │</span></span>
<span class="line"><span>│ - 读取登录模块代码                                    │</span></span>
<span class="line"><span>│ - 分析实现                                            │</span></span>
<span class="line"><span>│ - 完成后自动记录：                                    │</span></span>
<span class="line"><span>│   &quot;查看了登录模块代码，提出了优化建议&quot;                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>下午工作：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ 用户：我更喜欢用 TypeScript                             │</span></span>
<span class="line"><span>│                                                        │</span></span>
<span class="line"><span>│ OpenClaw：                                            │</span></span>
<span class="line"><span>│ - 记录偏好变化                                        │</span></span>
<span class="line"><span>│   ## 学习新知                                         │</span></span>
<span class="line"><span>│   - 用户偏好 TypeScript                               │</span></span>
<span class="line"><span>│                                                        │</span></span>
<span class="line"><span>│ 用户：帮我创建一个待办事项                             │</span></span>
<span class="line"><span>│                                                        │</span></span>
<span class="line"><span>│ OpenClaw：                                            │</span></span>
<span class="line"><span>│ - 添加待办                                            │</span></span>
<span class="line"><span>│   ## 待办事项                                         │</span></span>
<span class="line"><span>│   - [ ] 代码审查                                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>下班前：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ openclaw daily todos                                   │</span></span>
<span class="line"><span>│ # 查看今日待办                                        │</span></span>
<span class="line"><span>│                                                        │</span></span>
<span class="line"><span>│ - [ ] 代码审查                                        │</span></span>
<span class="line"><span>│ - [ ] 更新 API 文档                                    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>每日记忆</strong>：存储在 <code>daily/YYYY-MM-DD.md</code>，按日期自动创建</li><li><strong>内容类型</strong>：今日事项、学习新知、待办事项、会话摘要</li><li><strong>加载时机</strong>：每次会话自动加载当日记忆</li><li><strong>管理命令</strong>：daily add/todo/done/list</li><li><strong>最佳实践</strong>：自动记录 + 手动补充 + 定期整理</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>查看今日的每日记忆文件</li><li>添加一条待办事项</li><li>记录今天学习到的新信息</li><li>查看待办列表并标记完成</li></ol>`,61)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
