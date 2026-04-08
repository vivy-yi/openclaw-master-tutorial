import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"3.3 工作区使用","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.3_workspace.md","filePath":"chapters/03_Agent运行循环/3.3_workspace.md"}'),l={name:"chapters/03_Agent运行循环/3.3_workspace.md"};function t(e,s,h,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_3-3-工作区使用" tabindex="-1">3.3 工作区使用 <a class="header-anchor" href="#_3-3-工作区使用" aria-label="Permalink to &quot;3.3 工作区使用&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>深入理解工作区架构</li><li>掌握工作区文件结构</li><li>熟练使用文件操作命令</li><li>理解 Agent 与工作区的关系</li></ul><hr><h2 id="_3-3-1-工作区核心概念" tabindex="-1">3.3.1 工作区核心概念 <a class="header-anchor" href="#_3-3-1-工作区核心概念" aria-label="Permalink to &quot;3.3.1 工作区核心概念&quot;">​</a></h2><h3 id="什么是工作区" tabindex="-1">什么是工作区 <a class="header-anchor" href="#什么是工作区" aria-label="Permalink to &quot;什么是工作区&quot;">​</a></h3><p>工作区（Workspace）是 OpenClaw Agent 的&quot;大脑&quot;，存储了 Agent 的所有知识、记忆、配置和上下文。它决定了 Agent 的行为方式、专业领域和对话风格。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                              工作区架构                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   ┌─────────────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │                         Workspace                                     │   │</span></span>
<span class="line"><span>│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │</span></span>
<span class="line"><span>│   │   │  AGENTS.md  │  │   SOUL.md   │  │   USER.md   │  ← 核心文件   │   │</span></span>
<span class="line"><span>│   │   │  Agent 规则  │  │   人设定义   │  │  用户信息   │                │   │</span></span>
<span class="line"><span>│   │   └─────────────┘  └─────────────┘  └─────────────┘                │   │</span></span>
<span class="line"><span>│   │                                                                       │   │</span></span>
<span class="line"><span>│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │</span></span>
<span class="line"><span>│   │   │ IDENTITY.md │  │  HEARTBEAT  │  │    BOOT     │  ← 启动文件   │   │</span></span>
<span class="line"><span>│   │   │  身份定义   │  │   心跳清单   │  │  启动检查   │                │   │</span></span>
<span class="line"><span>│   │   └─────────────┘  └─────────────┘  └─────────────┘                │   │</span></span>
<span class="line"><span>│   │                                                                       │   │</span></span>
<span class="line"><span>│   │   ┌─────────────────────────────────────────────────────────────┐   │   │</span></span>
<span class="line"><span>│   │   │                         memory/                             │   │   │</span></span>
<span class="line"><span>│   │   │   长期记忆 │ 每日记忆 │ 知识库                            │   │   │</span></span>
<span class="line"><span>│   │   └─────────────────────────────────────────────────────────────┘   │   │</span></span>
<span class="line"><span>│   │                                                                       │   │</span></span>
<span class="line"><span>│   │   ┌─────────────────────────────────────────────────────────────┐   │   │</span></span>
<span class="line"><span>│   │   │                         skills/                             │   │   │</span></span>
<span class="line"><span>│   │   │   工作空间技能 │ 共享技能                                  │   │   │</span></span>
<span class="line"><span>│   │   └─────────────────────────────────────────────────────────────┘   │   │</span></span>
<span class="line"><span>│   │                                                                       │   │</span></span>
<span class="line"><span>│   └─────────────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="工作区文件层级" tabindex="-1">工作区文件层级 <a class="header-anchor" href="#工作区文件层级" aria-label="Permalink to &quot;工作区文件层级&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.openclaw/</span></span>
<span class="line"><span>├── openclaw.json                    # 全局配置</span></span>
<span class="line"><span>├── credentials/                     # 认证凭据</span></span>
<span class="line"><span>├── skills/                          # 全局共享 Skills</span></span>
<span class="line"><span>├── workspace/                       # 默认工作空间 (main agent)</span></span>
<span class="line"><span>│   ├── AGENTS.md                    # ⭐ Agent 操作指令 (必读)</span></span>
<span class="line"><span>│   ├── SOUL.md                      # ⭐ 人设、语调、边界</span></span>
<span class="line"><span>│   ├── USER.md                      # ⭐ 用户信息</span></span>
<span class="line"><span>│   ├── IDENTITY.md                  # ⭐ Agent 身份定义</span></span>
<span class="line"><span>│   ├── HEARTBEAT.md                 # 心跳检查清单</span></span>
<span class="line"><span>│   ├── BOOT.md                      # 启动检查清单</span></span>
<span class="line"><span>│   ├── TOOLS.md                     # 工具说明文档</span></span>
<span class="line"><span>│   ├── memory/                      # 长期记忆</span></span>
<span class="line"><span>│   │   └── MEMORY.md                # 核心记忆</span></span>
<span class="line"><span>│   ├── daily/                       # 每日记忆</span></span>
<span class="line"><span>│   │   ├── 2024-01-15.md</span></span>
<span class="line"><span>│   │   └── 2024-01-16.md</span></span>
<span class="line"><span>│   ├── skills/                      # 工作空间 Skills</span></span>
<span class="line"><span>│   ├── canvas/                      # Canvas UI 文件</span></span>
<span class="line"><span>│   ├── downloads/                   # 下载文件</span></span>
<span class="line"><span>│   ├── uploads/                     # 上传文件</span></span>
<span class="line"><span>│   └── temp/                        # 临时文件</span></span>
<span class="line"><span>└── agents/                          # 多 Agent 目录</span></span>
<span class="line"><span>    ├── &lt;agentId&gt;/                   # Agent 1</span></span>
<span class="line"><span>    │   ├── agent/                   # Agent 状态</span></span>
<span class="line"><span>    │   └── sessions/                # 会话历史</span></span>
<span class="line"><span>    └── &lt;agentId&gt;/                   # Agent 2</span></span>
<span class="line"><span>        ├── agent/</span></span>
<span class="line"><span>        └── sessions/</span></span></code></pre></div><hr><h2 id="_3-3-2-核心文件详解" tabindex="-1">3.3.2 核心文件详解 <a class="header-anchor" href="#_3-3-2-核心文件详解" aria-label="Permalink to &quot;3.3.2 核心文件详解&quot;">​</a></h2><h3 id="agents-md-agent-操作指令" tabindex="-1">AGENTS.md - Agent 操作指令 <a class="header-anchor" href="#agents-md-agent-操作指令" aria-label="Permalink to &quot;AGENTS.md - Agent 操作指令&quot;">​</a></h3><p><strong>作用</strong>：定义 Agent 的行为规则、工作流程和操作规范</p><p><strong>加载时机</strong>：每次会话开始时</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># AGENTS.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 行为准则</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 始终使用中文回复</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码注释使用英文</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 保持专业但友好的语调</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 工作流程</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 先理解用户需求</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 制定执行计划</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 逐步执行</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 返回结果</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 特殊规则</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 超过 100 行的代码需要分块展示</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要操作前先确认</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 定期总结进度</span></span></code></pre></div><h3 id="soul-md-人设定义" tabindex="-1">SOUL.md - 人设定义 <a class="header-anchor" href="#soul-md-人设定义" aria-label="Permalink to &quot;SOUL.md - 人设定义&quot;">​</a></h3><p><strong>作用</strong>：定义 Agent 的性格、语调、说话风格和边界</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># SOUL.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 性格</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 耐心、细致</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 喜欢把事情讲清楚</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 语调</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 正式但不僵硬</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 适当使用 emoji 增添趣味</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 边界</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不涉及政治敏感话题</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不提供医疗建议</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不代操作金融交易</span></span></code></pre></div><h3 id="user-md-用户信息" tabindex="-1">USER.md - 用户信息 <a class="header-anchor" href="#user-md-用户信息" aria-label="Permalink to &quot;USER.md - 用户信息&quot;">​</a></h3><p><strong>作用</strong>：存储用户偏好、背景信息、常用设置</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># USER.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 用户信息</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 名字: 张三</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 公司: XX科技</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 职位: 全栈工程师</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 偏好</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 编程语言: TypeScript, Python</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 常用框架: React, FastAPI</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 沟通风格: 直接高效</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 上下文</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 当前项目: Web 应用开发</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要日期: 每周一例会</span></span></code></pre></div><h3 id="identity-md-agent-身份" tabindex="-1">IDENTITY.md - Agent 身份 <a class="header-anchor" href="#identity-md-agent-身份" aria-label="Permalink to &quot;IDENTITY.md - Agent 身份&quot;">​</a></h3><p><strong>作用</strong>：定义 Agent 的身份角色自我介绍</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># IDENTITY.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 身份</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我是一名智能助手，专注于帮助用户完成以下任务：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码编写与调试</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 技术文档撰写</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 问题分析与解决</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 能力</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 前后端开发</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据库设计</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DevOps 自动化</span></span></code></pre></div><h3 id="heartbeat-md-心跳检查清单" tabindex="-1">HEARTBEAT.md - 心跳检查清单 <a class="header-anchor" href="#heartbeat-md-心跳检查清单" aria-label="Permalink to &quot;HEARTBEAT.md - 心跳检查清单&quot;">​</a></h3><p><strong>作用</strong>：定义定时任务执行时的检查项目</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># HEARTBEAT.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 检查清单</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 检查系统状态</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 查看待处理任务</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 汇总当日数据</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 发送日报（如有必要）</span></span></code></pre></div><h3 id="boot-md-启动检查清单" tabindex="-1">BOOT.md - 启动检查清单 <a class="header-anchor" href="#boot-md-启动检查清单" aria-label="Permalink to &quot;BOOT.md - 启动检查清单&quot;">​</a></h3><p><strong>作用</strong>：定义 Gateway 重启时的初始化任务</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># BOOT.md 示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 启动任务</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 检查所有渠道连接状态</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 验证 API 凭据有效性</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 加载今日记忆</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 初始化常用工具</span></span></code></pre></div><hr><h2 id="_3-3-3-工作区配置流程" tabindex="-1">3.3.3 工作区配置流程 <a class="header-anchor" href="#_3-3-3-工作区配置流程" aria-label="Permalink to &quot;3.3.3 工作区配置流程&quot;">​</a></h2><h3 id="完整配置流程图" tabindex="-1">完整配置流程图 <a class="header-anchor" href="#完整配置流程图" aria-label="Permalink to &quot;完整配置流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          工作区配置完整流程                                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 创建工作区目录   │</span></span>
<span class="line"><span>                          │  mkdir -p ~/.openclaw │</span></span>
<span class="line"><span>                          │  /workspace           │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 创建核心文件     │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ • AGENTS.md   │  │</span></span>
<span class="line"><span>                          │  │ • SOUL.md     │  │</span></span>
<span class="line"><span>                          │  │ • USER.md     │  │</span></span>
<span class="line"><span>                          │  │ • IDENTITY.md │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 配置工作区       │</span></span>
<span class="line"><span>                          │  openclaw.json:     │</span></span>
<span class="line"><span>                          │  workspace.root     │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 验证配置         │</span></span>
<span class="line"><span>                          │  openclaw gateway   │</span></span>
<span class="line"><span>                          │  --print-config     │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 测试工作区       │</span></span>
<span class="line"><span>                          │  发送测试消息        │</span></span>
<span class="line"><span>                          │  验证加载            │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   配置完成 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span></code></pre></div><h3 id="cli-配置命令" tabindex="-1">CLI 配置命令 <a class="header-anchor" href="#cli-配置命令" aria-label="Permalink to &quot;CLI 配置命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 初始化工作区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看工作区状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定工作区路径</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --workspace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/workspace</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看加载的文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --print-config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span></span></code></pre></div><h3 id="json-配置" tabindex="-1">JSON 配置 <a class="header-anchor" href="#json-配置" aria-label="Permalink to &quot;JSON 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;autoCreate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;files&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;agents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;AGENTS.md&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;soul&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;SOUL.md&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;USER.md&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;identity&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;IDENTITY.md&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;heartbeat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;HEARTBEAT.md&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;boot&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BOOT.md&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;dailyFolder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;daily&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;maxDays&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_3-3-4-文件操作详解" tabindex="-1">3.3.4 文件操作详解 <a class="header-anchor" href="#_3-3-4-文件操作详解" aria-label="Permalink to &quot;3.3.4 文件操作详解&quot;">​</a></h2><h3 id="读取文件" tabindex="-1">读取文件 <a class="header-anchor" href="#读取文件" aria-label="Permalink to &quot;读取文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 读取工作区文件</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/AGENTS.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 读取绝对路径</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/notes/todo.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定编码读取</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --encoding</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> utf-8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/data.csv</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 读取多个文件</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/file1.md</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/file2.md</span></span></code></pre></div><h3 id="写入文件" tabindex="-1">写入文件 <a class="header-anchor" href="#写入文件" aria-label="Permalink to &quot;写入文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建/覆盖文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">write</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/notes/today.md</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 今日任务</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- [ ] 完成代码审查</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- [ ] 更新文档</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- [ ] 提交 PR</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 追加内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/logs/activity.md</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- 14:00 团队会议</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- 15:00 代码审查</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><h3 id="编辑文件" tabindex="-1">编辑文件 <a class="header-anchor" href="#编辑文件" aria-label="Permalink to &quot;编辑文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑特定行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/AGENTS.md</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --line</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --new-content</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;新内容&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 批量替换</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/config.json</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --replace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;old&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;new&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 插入内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/README.md</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --after</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;## 安装&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --content</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;详细安装步骤...&quot;</span></span></code></pre></div><h3 id="搜索文件" tabindex="-1">搜索文件 <a class="header-anchor" href="#搜索文件" aria-label="Permalink to &quot;搜索文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索文件名</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">glob</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">**</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;TODO&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">**</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.ts</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索并列出</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*.log&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -mtime</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -7</span></span></code></pre></div><hr><h2 id="_3-3-5-记忆系统" tabindex="-1">3.3.5 记忆系统 <a class="header-anchor" href="#_3-3-5-记忆系统" aria-label="Permalink to &quot;3.3.5 记忆系统&quot;">​</a></h2><blockquote><p>📌 <strong>详细文档请参考：</strong></p><ul><li><a href="./3.4_memory.html">3.4 长期记忆</a> - MEMORY.md 核心知识、规则、偏好</li><li><a href="./3.5_daily_memory.html">3.5 每日记忆</a> - daily/ 每日事项、学习新知</li></ul></blockquote><h3 id="记忆类型" tabindex="-1">记忆类型 <a class="header-anchor" href="#记忆类型" aria-label="Permalink to &quot;记忆类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                             记忆系统架构                                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐           │</span></span>
<span class="line"><span>│  │   长期记忆       │    │   每日记忆       │   │   工作空间       │           │</span></span>
<span class="line"><span>│  │   (MEMORY.md)   │    │   (daily/)      │   │   (workspace/)  │           │</span></span>
<span class="line"><span>│  ├─────────────────┤    ├─────────────────┤    ├─────────────────┤           │</span></span>
<span class="line"><span>│  │ • 核心知识      │    │ • 今日事件      │   │ • 项目文件      │           │</span></span>
<span class="line"><span>│  │ • 重要规则      │    │ • 待办事项      │   │ • 配置文件      │           │</span></span>
<span class="line"><span>│  │ • 偏好设置      │    │ • 学习新知      │   │ • 临时文件      │           │</span></span>
<span class="line"><span>│  └─────────────────┘    └─────────────────┘    └─────────────────┘           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  加载优先级：长期记忆 &gt; 每日记忆 &gt; 工作空间                                     │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  📖 详细教程:                                                                │</span></span>
<span class="line"><span>│  - 长期记忆: ./3.4_memory.md                                                 │</span></span>
<span class="line"><span>│  - 每日记忆: ./3.5_daily_memory.md                                           │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="记忆命令" tabindex="-1">记忆命令 <a class="header-anchor" href="#记忆命令" aria-label="Permalink to &quot;记忆命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加长期记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;用户偏好使用 TypeScript&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;偏好&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每日总结</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daily</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --summary</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;今日学习了新框架&quot;</span></span></code></pre></div><hr><h2 id="_3-3-6-多工作区管理" tabindex="-1">3.3.6 多工作区管理 <a class="header-anchor" href="#_3-3-6-多工作区管理" aria-label="Permalink to &quot;3.3.6 多工作区管理&quot;">​</a></h2><h3 id="agent-工作区" tabindex="-1">Agent 工作区 <a class="header-anchor" href="#agent-工作区" aria-label="Permalink to &quot;Agent 工作区&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建新的 Agent 工作区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Agent 列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定 Agent 工作区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --agent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> work</span></span></code></pre></div><h3 id="工作区结构" tabindex="-1">工作区结构 <a class="header-anchor" href="#工作区结构" aria-label="Permalink to &quot;工作区结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.openclaw/</span></span>
<span class="line"><span>├── workspace-main/           # main agent 工作区</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   ├── SOUL.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── workspace-work/          # work agent 工作区</span></span>
<span class="line"><span>│   ├── AGENTS.md</span></span>
<span class="line"><span>│   ├── SOUL.md</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── workspace-coding/        # coding agent 工作区</span></span>
<span class="line"><span>    ├── AGENTS.md</span></span>
<span class="line"><span>    ├── SOUL.md</span></span>
<span class="line"><span>    └── ...</span></span></code></pre></div><hr><h2 id="_3-3-7-工作区最佳实践" tabindex="-1">3.3.7 工作区最佳实践 <a class="header-anchor" href="#_3-3-7-工作区最佳实践" aria-label="Permalink to &quot;3.3.7 工作区最佳实践&quot;">​</a></h2><h3 id="目录组织建议" tabindex="-1">目录组织建议 <a class="header-anchor" href="#目录组织建议" aria-label="Permalink to &quot;目录组织建议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>workspace/</span></span>
<span class="line"><span>├── docs/                    # 文档</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   └── guides/</span></span>
<span class="line"><span>├── notes/                   # 笔记</span></span>
<span class="line"><span>│   ├── daily/</span></span>
<span class="line"><span>│   └── topics/</span></span>
<span class="line"><span>├── projects/                # 项目</span></span>
<span class="line"><span>│   └── &lt;project-name&gt;/</span></span>
<span class="line"><span>├── templates/               # 模板</span></span>
<span class="line"><span>└── archive/                 # 归档</span></span></code></pre></div><h3 id="核心文件模板" tabindex="-1">核心文件模板 <a class="header-anchor" href="#核心文件模板" aria-label="Permalink to &quot;核心文件模板&quot;">​</a></h3><p><strong>AGENTS.md 模板</strong>:</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Agent 操作指令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[描述 Agent 的角色和职责]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 行为准则</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [准则 1]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [准则 2]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 输出格式</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用 Markdown</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码块标注语言</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 重要内容加粗</span></span></code></pre></div><p><strong>SOUL.md 模板</strong>:</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Agent 人设</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 性格</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">描述性格特点</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 语调</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">描述说话风格</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 边界</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [边界 1]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [边界 2]</span></span></code></pre></div><hr><h2 id="_3-3-8-常见问题" tabindex="-1">3.3.8 常见问题 <a class="header-anchor" href="#_3-3-8-常见问题" aria-label="Permalink to &quot;3.3.8 常见问题&quot;">​</a></h2><h3 id="q1-工作区文件未加载" tabindex="-1">Q1: 工作区文件未加载 <a class="header-anchor" href="#q1-工作区文件未加载" aria-label="Permalink to &quot;Q1: 工作区文件未加载&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件是否存在</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --print-config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动指定工作区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --workspace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace</span></span></code></pre></div><h3 id="q2-记忆未生效" tabindex="-1">Q2: 记忆未生效 <a class="header-anchor" href="#q2-记忆未生效" aria-label="Permalink to &quot;Q2: 记忆未生效&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查记忆文件格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/memory/MEMORY.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查每日记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/workspace/daily/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新加载记忆</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><h3 id="q3-多工作区切换失败" tabindex="-1">Q3: 多工作区切换失败 <a class="header-anchor" href="#q3-多工作区切换失败" aria-label="Permalink to &quot;Q3: 多工作区切换失败&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看可用的 Agent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> agents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查工作区路径</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workspace</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定工作区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --agent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agentI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>核心文件</strong>：AGENTS.md、SOUL.md、USER.md、IDENTITY.md</li><li><strong>加载时机</strong>：启动时加载 IDENTITY/BOOT，会话时加载 AGENTS/SOUL/USER</li><li><strong>记忆系统</strong>：长期记忆(MEMORY.md) &gt; 每日记忆(daily/) &gt; 工作空间</li><li><strong>配置方式</strong>：CLI 命令 + JSON 配置文件</li><li><strong>多 Agent</strong>：每个 Agent 独立工作区</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>创建一个专属的工作区，配置自己的 AGENTS.md 和 SOUL.md</li><li>尝试添加一条长期记忆，然后在对话中验证</li><li>配置多个 Agent，体会不同工作区的差异</li><li>实践文件操作：创建、读取、编辑、搜索</li></ol>`,85)])])}const g=a(l,[["render",t]]);export{o as __pageData,g as default};
