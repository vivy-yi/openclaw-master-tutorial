import{_ as a,o as i,c as n,ae as p}from"./chunks/framework.Czhw_PXq.js";const g=JSON.parse('{"title":"7.5 实战案例","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/19_Agent管理专题/28.5_case_study.md","filePath":"chapters/19_Agent管理专题/28.5_case_study.md"}'),l={name:"chapters/19_Agent管理专题/28.5_case_study.md"};function h(e,s,t,k,E,r){return i(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="_7-5-实战案例" tabindex="-1">7.5 实战案例 <a class="header-anchor" href="#_7-5-实战案例" aria-label="Permalink to &quot;7.5 实战案例&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>通过实际案例理解多 Agent 应用</li><li>掌握完整的工作流设计</li><li>完成自己的多 Agent 系统</li></ul><hr><h2 id="_7-5-1-案例一-智能客服系统" tabindex="-1">7.5.1 案例一：智能客服系统 <a class="header-anchor" href="#_7-5-1-案例一-智能客服系统" aria-label="Permalink to &quot;7.5.1 案例一：智能客服系统&quot;">​</a></h2><h3 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>智能客服多 Agent 系统：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                  客服系统架构                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                 │</span></span>
<span class="line"><span>│         用户请求                                  │</span></span>
<span class="line"><span>│            │                                    │</span></span>
<span class="line"><span>│            ▼                                    │</span></span>
<span class="line"><span>│   ┌─────────────────┐                          │</span></span>
<span class="line"><span>│   │  接待 Agent     │ ← 分类意图                 │</span></span>
<span class="line"><span>│   └────────┬────────┘                          │</span></span>
<span class="line"><span>│            │                                    │</span></span>
<span class="line"><span>│      ┌─────┴─────┬─────────┐                   │</span></span>
<span class="line"><span>│      ▼           ▼         ▼                   │</span></span>
<span class="line"><span>│ ┌────────┐ ┌────────┐ ┌────────┐            │</span></span>
<span class="line"><span>│ │ 技术   │ │ 业务   │ │ 投诉   │            │</span></span>
<span class="line"><span>│ │ 支持   │ │ 咨询   │ │ 处理   │            │</span></span>
<span class="line"><span>│ └────┬───┘ └────┬───┘ └────┬───┘            │</span></span>
<span class="line"><span>│      │           │         │                   │</span></span>
<span class="line"><span>│      └─────┬─────┴─────────┘                   │</span></span>
<span class="line"><span>│            ▼                                    │</span></span>
<span class="line"><span>│   ┌─────────────────┐                          │</span></span>
<span class="line"><span>│   │  满意度回访    │ ← 结束处理                 │</span></span>
<span class="line"><span>│   └─────────────────┘                          │</span></span>
<span class="line"><span>│                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="agent-配置" tabindex="-1">Agent 配置 <a class="header-anchor" href="#agent-配置" aria-label="Permalink to &quot;Agent 配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  receptionist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">接待员</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">意图分类</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  technical</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">技术支持</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">技术问题处理</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  business</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">业务咨询</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">业务问题解答</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  complaints</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">投诉处理</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">投诉记录和升级</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  followup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">满意度回访</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">收集反馈</span></span></code></pre></div><h3 id="工作流配置" tabindex="-1">工作流配置 <a class="header-anchor" href="#工作流配置" aria-label="Permalink to &quot;工作流配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">workflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">customer_service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user_message</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">flow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">receptionist</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">classify</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">intent_type</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">branch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      intent_type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        technical</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">technical_agent</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        business</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">business_agent</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        complaints</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">complaints_agent</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        other</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">faq_agent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">followup</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">feedback</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">completed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">error_handling</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  max_retries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  fallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">human_agent</span></span></code></pre></div><hr><h2 id="_7-5-2-案例二-代码开发流程" tabindex="-1">7.5.2 案例二：代码开发流程 <a class="header-anchor" href="#_7-5-2-案例二-代码开发流程" aria-label="Permalink to &quot;7.5.2 案例二：代码开发流程&quot;">​</a></h2><h3 id="系统架构-1" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构-1" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>代码开发多 Agent 系统：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需求输入</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────┐</span></span>
<span class="line"><span>│ 架构师 Agent │ → 技术方案</span></span>
<span class="line"><span>└──────┬──────┘</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌─────────────┐</span></span>
<span class="line"><span>│ 开发 Agent  │ → 代码实现</span></span>
<span class="line"><span>└──────┬──────┘</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌─────────────┐</span></span>
<span class="line"><span>│ 审查 Agent  │ → 代码审查</span></span>
<span class="line"><span>└──────┬──────┘</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>   ┌───┴───┐</span></span>
<span class="line"><span>   ▼       ▼</span></span>
<span class="line"><span>修复   测试通过</span></span>
<span class="line"><span>   │       │</span></span>
<span class="line"><span>   └─┬─────┘</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>  代码合并</span></span></code></pre></div><h3 id="完整配置" tabindex="-1">完整配置 <a class="header-anchor" href="#完整配置" aria-label="Permalink to &quot;完整配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code_development_workflow</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  architect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    persona</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">architect</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">design</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  developer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">claude-3.5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    persona</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">developer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">implement</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  reviewer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">claude-3.5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    persona</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reviewer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  tester</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    persona</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tester</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">test</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">flow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">architect</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">analyze_requirements</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">architecture</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">developer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">implement</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">architecture</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reviewer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review_result</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    max_iterations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      review_result.approved</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      on_true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tester</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      on_false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">developer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tester</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">verify</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">test_result</span></span></code></pre></div><hr><h2 id="_7-5-3-案例三-内容创作平台" tabindex="-1">7.5.3 案例三：内容创作平台 <a class="header-anchor" href="#_7-5-3-案例三-内容创作平台" aria-label="Permalink to &quot;7.5.3 案例三：内容创作平台&quot;">​</a></h2><h3 id="流程设计" tabindex="-1">流程设计 <a class="header-anchor" href="#流程设计" aria-label="Permalink to &quot;流程设计&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>内容创作流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>选题 ──→ 写作 ──→ 配图 ──→ 审核 ──→ 发布</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    并行</span></span>
<span class="line"><span>选题A ──┬─→ 写作A ──→ 配图A ──→ 审核A ──→ 发布A</span></span>
<span class="line"><span>选题B ──┘</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        └──────────────────────────→ 批量发布</span></span></code></pre></div><h3 id="agent-团队" tabindex="-1">Agent 团队 <a class="header-anchor" href="#agent-团队" aria-label="Permalink to &quot;Agent 团队&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">team</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">content_creation</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  researcher</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">热点发现、选题策划</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  writer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">文章撰写</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  designer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">图片生成/选择</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  editor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">内容审核、修改</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  publisher</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">多平台发布</span></span></code></pre></div><hr><h2 id="_7-5-4-案例四-数据分析流水线" tabindex="-1">7.5.4 案例四：数据分析流水线 <a class="header-anchor" href="#_7-5-4-案例四-数据分析流水线" aria-label="Permalink to &quot;7.5.4 案例四：数据分析流水线&quot;">​</a></h2><h3 id="架构" tabindex="-1">架构 <a class="header-anchor" href="#架构" aria-label="Permalink to &quot;架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据分析流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 数据采集  │ ──→ Agent 1</span></span>
<span class="line"><span>└────┬─────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 数据清洗  │ ──→ Agent 2</span></span>
<span class="line"><span>└────┬─────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 数据分析  │ ──→ Agent 3</span></span>
<span class="line"><span>└────┬─────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 可视化   │ ──→ Agent 4</span></span>
<span class="line"><span>└────┬─────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 报告生成 │ ──→ Agent 5</span></span>
<span class="line"><span>└──────────┘</span></span></code></pre></div><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">workflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">data_analysis_pipeline</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  collector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">数据采集</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cleaner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">数据清洗</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  analyzer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">数据分析</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  visualizer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">可视化</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  reporter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">报告生成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">parallel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">data_flow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  collector.output → cleaner.input</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  cleaner.output → analyzer.input</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  analyzer.output → visualizer.input</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  visualizer.output → reporter.input</span></span></code></pre></div><hr><h2 id="_7-5-5-案例五-招聘筛选系统" tabindex="-1">7.5.5 案例五：招聘筛选系统 <a class="header-anchor" href="#_7-5-5-案例五-招聘筛选系统" aria-label="Permalink to &quot;7.5.5 案例五：招聘筛选系统&quot;">​</a></h2><h3 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>简历筛选流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>简历投递 → 初筛 → 复筛 → 面试安排 → 反馈</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    并行处理</span></span>
<span class="line"><span>多个简历同时处理</span></span></code></pre></div><h3 id="配置-1" tabindex="-1">配置 <a class="header-anchor" href="#配置-1" aria-label="Permalink to &quot;配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">workflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">recruitment</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  screener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">简历初筛</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  evaluator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">能力评估</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  scheduler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gpt-4o-mini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">面试安排</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">flow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">parallel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screener</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screener</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screener</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">screen</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">aggregate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">candidates</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">evaluator</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">evaluate</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">candidates</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ranked_candidates</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ranked_candidates[0].score &gt; 0.8</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      on_true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scheduler</span></span></code></pre></div><hr><h2 id="_7-5-6-最佳实践" tabindex="-1">7.5.6 最佳实践 <a class="header-anchor" href="#_7-5-6-最佳实践" aria-label="Permalink to &quot;7.5.6 最佳实践&quot;">​</a></h2><h3 id="设计原则" tabindex="-1">设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>多 Agent 设计原则：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 单一职责</span></span>
<span class="line"><span>   └── 每个 Agent 只做一件事</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 清晰接口</span></span>
<span class="line"><span>   └── 定义好输入输出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 适当规模</span></span>
<span class="line"><span>   └── 避免过多 Agent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 错误处理</span></span>
<span class="line"><span>   └── 每个节点都要有容错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 可观测性</span></span>
<span class="line"><span>   └── 日志、监控、告警</span></span></code></pre></div><h3 id="常见陷阱" tabindex="-1">常见陷阱 <a class="header-anchor" href="#常见陷阱" aria-label="Permalink to &quot;常见陷阱&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>避免的问题：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 过度设计</span></span>
<span class="line"><span>   └── 不要为简单任务使用多 Agent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 循环依赖</span></span>
<span class="line"><span>   └── 避免 Agent 相互等待</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 通信开销</span></span>
<span class="line"><span>   └── 减少不必要的数据传递</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 调试困难</span></span>
<span class="line"><span>   └── 保持流程可追踪</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>智能客服</strong>：分类 + 分支 + 回访</li><li><strong>代码开发</strong>：串行 + 循环</li><li><strong>内容创作</strong>：并行 + 串行组合</li><li><strong>数据分析</strong>：流水线模式</li><li><strong>招聘筛选</strong>：并行 + 条件</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你想构建什么场景的多 Agent 系统？</li><li>如何选择合适的协作模式？</li><li>如何平衡复杂度和效率？</li></ol>`,47)])])}const c=a(l,[["render",h]]);export{g as __pageData,c as default};
