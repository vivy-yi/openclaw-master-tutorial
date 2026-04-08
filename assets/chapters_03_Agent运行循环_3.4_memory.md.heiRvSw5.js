import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"3.4 长期记忆","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.4_memory.md","filePath":"chapters/03_Agent运行循环/3.4_memory.md"}'),l={name:"chapters/03_Agent运行循环/3.4_memory.md"};function e(h,s,t,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-4-长期记忆" tabindex="-1">3.4 长期记忆 <a class="header-anchor" href="#_3-4-长期记忆" aria-label="Permalink to &quot;3.4 长期记忆&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解长期记忆的概念和作用</li><li>掌握 MEMORY.md 的使用方法</li><li>学会在对话中运用长期记忆</li></ul><hr><h2 id="_3-4-1-长期记忆概述" tabindex="-1">3.4.1 长期记忆概述 <a class="header-anchor" href="#_3-4-1-长期记忆概述" aria-label="Permalink to &quot;3.4.1 长期记忆概述&quot;">​</a></h2><h3 id="什么是长期记忆" tabindex="-1">什么是长期记忆 <a class="header-anchor" href="#什么是长期记忆" aria-label="Permalink to &quot;什么是长期记忆&quot;">​</a></h3><p>长期记忆是 OpenClaw 的核心记忆系统，存储在 <code>workspace/memory/MEMORY.md</code> 文件中。它包含了 Agent 需要持久记住的核心知识、规则和偏好。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                            长期记忆架构                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │                      MEMORY.md                                        │   │</span></span>
<span class="line"><span>│   │   ┌─────────────────────────────────────────────────────────────┐  │   │</span></span>
<span class="line"><span>│   │   │  # 长期记忆                                                  │  │   │</span></span>
<span class="line"><span>│   │   │                                                             │  │   │</span></span>
<span class="line"><span>│   │   │  ## 核心知识                                                 │  │   │</span></span>
<span class="line"><span>│   │   │  - [知识条目 1]                                             │  │   │</span></span>
<span class="line"><span>│   │   │  - [知识条目 2]                                             │  │   │</span></span>
<span class="line"><span>│   │   │                                                             │  │   │</span></span>
<span class="line"><span>│   │   │  ## 重要规则                                                 │  │   │</span></span>
<span class="line"><span>│   │   │  - [规则 1]                                                 │  │   │</span></span>
<span class="line"><span>│   │   │  - [规则 2]                                                 │  │   │</span></span>
<span class="line"><span>│   │   │                                                             │  │   │</span></span>
<span class="line"><span>│   │   │  ## 用户偏好                                                 │  │   │</span></span>
<span class="line"><span>│   │   │  - [偏好设置]                                                │  │   │</span></span>
<span class="line"><span>│   │   │                                                             │  │   │</span></span>
<span class="line"><span>│   │   │  ## 交互习惯                                                 │  │   │</span></span>
<span class="line"><span>│   │   │  - [习惯记录]                                                │  │   │</span></span>
<span class="line"><span>│   │   └─────────────────────────────────────────────────────────────┘  │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   加载时机：每次会话开始时自动加载                                             │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="长期记忆-vs-工作区文件" tabindex="-1">长期记忆 vs 工作区文件 <a class="header-anchor" href="#长期记忆-vs-工作区文件" aria-label="Permalink to &quot;长期记忆 vs 工作区文件&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>长期记忆 (MEMORY.md)</th><th>工作区文件</th></tr></thead><tbody><tr><td>加载时机</td><td>每次会话自动加载</td><td>按需读取</td></tr><tr><td>存储内容</td><td>核心知识、规则、偏好</td><td>项目文件、数据</td></tr><tr><td>更新频率</td><td>低（长期积累）</td><td>高（频繁变动）</td></tr><tr><td>文件位置</td><td><code>workspace/memory/MEMORY.md</code></td><td><code>workspace/</code> 根目录</td></tr></tbody></table><hr><h2 id="_3-4-2-记忆文件结构" tabindex="-1">3.4.2 记忆文件结构 <a class="header-anchor" href="#_3-4-2-记忆文件结构" aria-label="Permalink to &quot;3.4.2 记忆文件结构&quot;">​</a></h2><h3 id="memory-md-标准结构" tabindex="-1">MEMORY.md 标准结构 <a class="header-anchor" href="#memory-md-标准结构" aria-label="Permalink to &quot;MEMORY.md 标准结构&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 长期记忆</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 核心知识</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 公司的核心技术栈是 React + Node.js</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 产品主要面向企业用户</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要客户包括：阿里巴巴、腾讯、字节跳动</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 重要规则</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 回复必须使用中文</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码注释使用英文</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要决策需要先确认</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 超过 100 行的代码需要分块展示</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 用户偏好</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 喜欢 TypeScript &gt; JavaScript</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 偏好函数式编程风格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 喜欢详细的代码注释</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用 2 空格缩进</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 交互习惯</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 早上 9 点到晚上 6 点在线</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 周一至周五工作时间</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 喜欢直接高效的沟通</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 需要详细的执行步骤</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 项目背景</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 当前项目：企业后台管理系统</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 技术栈：React + Ant Design + Node.js</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 团队规模：5 人</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 开发周期：3 个月</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 常见任务</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码审查</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Bug 修复</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 新功能开发</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 技术文档编写</span></span></code></pre></div><h3 id="分类建议" tabindex="-1">分类建议 <a class="header-anchor" href="#分类建议" aria-label="Permalink to &quot;分类建议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MEMORY.md 内容分类：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 核心知识 (Core Knowledge)</span></span>
<span class="line"><span>   - 公司/产品信息</span></span>
<span class="line"><span>   - 技术栈</span></span>
<span class="line"><span>   - 重要联系人</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 重要规则 (Rules)</span></span>
<span class="line"><span>   - 行为准则</span></span>
<span class="line"><span>   - 代码规范</span></span>
<span class="line"><span>   - 安全要求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 用户偏好 (Preferences)</span></span>
<span class="line"><span>   - 编程语言偏好</span></span>
<span class="line"><span>   - 沟通风格</span></span>
<span class="line"><span>   - 输出格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 交互习惯 (Habits)</span></span>
<span class="line"><span>   - 工作时间</span></span>
<span class="line"><span>   - 常用命令</span></span>
<span class="line"><span>   - 典型任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 项目背景 (Project Context)</span></span>
<span class="line"><span>   - 当前项目</span></span>
<span class="line"><span>   - 团队信息</span></span>
<span class="line"><span>   - 里程碑</span></span></code></pre></div><hr><h2 id="_3-4-3-记忆管理命令" tabindex="-1">3.4.3 记忆管理命令 <a class="header-anchor" href="#_3-4-3-记忆管理命令" aria-label="Permalink to &quot;3.4.3 记忆管理命令&quot;">​</a></h2><h3 id="cli-命令" tabindex="-1">CLI 命令 <a class="header-anchor" href="#cli-命令" aria-label="Permalink to &quot;CLI 命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加长期记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;用户喜欢使用 TypeScript&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看所有记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;偏好&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看记忆文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> edit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --line</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --content</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;新内容&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新加载记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><h3 id="直接编辑" tabindex="-1">直接编辑 <a class="header-anchor" href="#直接编辑" aria-label="Permalink to &quot;直接编辑&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用文本编辑器打开</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/memory/MEMORY.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或使用 openclaw 的 edit 命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/memory/MEMORY.md</span></span></code></pre></div><hr><h2 id="_3-4-4-记忆加载流程" tabindex="-1">3.4.4 记忆加载流程 <a class="header-anchor" href="#_3-4-4-记忆加载流程" aria-label="Permalink to &quot;3.4.4 记忆加载流程&quot;">​</a></h2><h3 id="加载流程图" tabindex="-1">加载流程图 <a class="header-anchor" href="#加载流程图" aria-label="Permalink to &quot;加载流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          记忆加载流程                                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                              Gateway 启动</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  1. 加载工作区配置           │</span></span>
<span class="line"><span>                    │  - AGENTS.md                │</span></span>
<span class="line"><span>                    │  - SOUL.md                  │</span></span>
<span class="line"><span>                    │  - USER.md                  │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  2. 加载长期记忆              │</span></span>
<span class="line"><span>                    │  workspace/memory/MEMORY.md   │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  3. 加载每日记忆              │</span></span>
<span class="line"><span>                    │  workspace/daily/*.md         │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                    ┌───────────────────────────────┐</span></span>
<span class="line"><span>                    │  4. 合并上下文                │</span></span>
<span class="line"><span>                    │  - 长期记忆 + 每日记忆        │</span></span>
<span class="line"><span>                    │  + 用户消息                   │</span></span>
<span class="line"><span>                    └───────────────┬───────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>                              会话就绪 ✅</span></span></code></pre></div><h3 id="记忆优先级" tabindex="-1">记忆优先级 <a class="header-anchor" href="#记忆优先级" aria-label="Permalink to &quot;记忆优先级&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           记忆优先级                                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  高优先级 ←─────────────────────────────────────→ 低优先级  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐             │</span></span>
<span class="line"><span>│  │  USER.md   │  │ MEMORY.md │  │ daily/    │  │ workspace/ │             │</span></span>
<span class="line"><span>│  │ 用户信息   │→ │ 长期记忆   │→ │ 每日记忆  │→ │ 工作区文件 │             │</span></span>
<span class="line"><span>│  └────────────┘  └────────────┘  └────────────┘  └────────────┘             │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  加载时机：每次会话        每次会话      每次会话      按需                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-4-5-最佳实践" tabindex="-1">3.4.5 最佳实践 <a class="header-anchor" href="#_3-4-5-最佳实践" aria-label="Permalink to &quot;3.4.5 最佳实践&quot;">​</a></h2><h3 id="记忆内容建议" tabindex="-1">记忆内容建议 <a class="header-anchor" href="#记忆内容建议" aria-label="Permalink to &quot;记忆内容建议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>✅ 推荐写入长期记忆的内容：</span></span>
<span class="line"><span>- 用户/公司核心信息（只需写入一次）</span></span>
<span class="line"><span>- 重要规则和约束</span></span>
<span class="line"><span>- 偏好和习惯</span></span>
<span class="line"><span>- 技术栈和项目背景</span></span>
<span class="line"><span>- 常见问题和解决方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>❌ 不推荐写入的内容：</span></span>
<span class="line"><span>- 频繁变动的数据（用每日记忆）</span></span>
<span class="line"><span>- 临时性信息（用工作区文件）</span></span>
<span class="line"><span>- 大段代码或文档（用项目文件）</span></span>
<span class="line"><span>- 敏感信息（用 credentials 配置）</span></span></code></pre></div><h3 id="更新时机" tabindex="-1">更新时机 <a class="header-anchor" href="#更新时机" aria-label="Permalink to &quot;更新时机&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 建议更新 MEMORY.md 的时机：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 新开始一个项目</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 添加项目背景</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 添加技术栈</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 添加团队成员</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户明确偏好</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;我更喜欢 TypeScript&quot;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;回复要简洁&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要规则变化</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;以后代码要用 4 空格缩进&quot;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;重要决定前要确认&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 学习到新知识</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;用户公司使用 Vue2&quot;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;用户主要在下午工作&quot;</span></span></code></pre></div><h3 id="维护建议" tabindex="-1">维护建议 <a class="header-anchor" href="#维护建议" aria-label="Permalink to &quot;维护建议&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 定期清理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 每月检查一次记忆内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 删除过时信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 合并重复内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 保持简洁</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 每个条目简洁明了</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 使用列表格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 避免冗余</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 结构清晰</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 使用标题分层</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 分类明确</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 便于搜索</span></span></code></pre></div><hr><h2 id="_3-4-6-常见问题" tabindex="-1">3.4.6 常见问题 <a class="header-anchor" href="#_3-4-6-常见问题" aria-label="Permalink to &quot;3.4.6 常见问题&quot;">​</a></h2><h3 id="q1-记忆没有加载" tabindex="-1">Q1: 记忆没有加载 <a class="header-anchor" href="#q1-记忆没有加载" aria-label="Permalink to &quot;Q1: 记忆没有加载&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件是否存在</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/memory/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/memory/MEMORY.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动触发加载</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看加载日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span></span></code></pre></div><h3 id="q2-记忆内容冲突" tabindex="-1">Q2: 记忆内容冲突 <a class="header-anchor" href="#q2-记忆内容冲突" aria-label="Permalink to &quot;Q2: 记忆内容冲突&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 问题：MEMORY.md 和 USER.md 内容重复</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 解决：明确分工</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> USER.md: 用户基本信息（姓名、联系方式）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MEMORY.md: 交互知识（偏好、习惯、规则）</span></span></code></pre></div><h3 id="q3-记忆过长" tabindex="-1">Q3: 记忆过长 <a class="header-anchor" href="#q3-记忆过长" aria-label="Permalink to &quot;Q3: 记忆过长&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 问题：MEMORY.md 内容太多</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 解决：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 拆分到多个文件</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用引用</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保留核心内容到 MEMORY.md</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 其他放到 workspace/ 下</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 示例结构：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">workspace/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── memory/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── MEMORY.md        # 核心记忆（精简）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── projects.md      # 项目详情</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── team.md         # 团队信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   └── rules.md        # 详细规则</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>长期记忆</strong>：存储在 <code>MEMORY.md</code>，每次会话自动加载</li><li><strong>内容分类</strong>：核心知识、重要规则、用户偏好、交互习惯</li><li><strong>加载时机</strong>：会话启动时，在 USER.md 之后加载</li><li><strong>管理方式</strong>：CLI 命令或直接编辑</li><li><strong>最佳实践</strong>：精简、分类清晰、定期维护</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>创建自己的 MEMORY.md 文件</li><li>添加 3-5 条核心记忆</li><li>在对话中验证记忆是否加载</li><li>尝试更新记忆并验证</li></ol>`,50)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
