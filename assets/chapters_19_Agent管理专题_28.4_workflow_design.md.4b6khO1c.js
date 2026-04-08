import{_ as a,o as i,c as n,ae as p}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"7.4 工作流设计","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/19_Agent管理专题/28.4_workflow_design.md","filePath":"chapters/19_Agent管理专题/28.4_workflow_design.md"}'),l={name:"chapters/19_Agent管理专题/28.4_workflow_design.md"};function h(e,s,t,k,r,E){return i(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="_7-4-工作流设计" tabindex="-1">7.4 工作流设计 <a class="header-anchor" href="#_7-4-工作流设计" aria-label="Permalink to &quot;7.4 工作流设计&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握工作流设计方法</li><li>理解工作流定义语言</li><li>完成工作流配置实战</li></ul><hr><h2 id="_7-4-1-工作流概述" tabindex="-1">7.4.1 工作流概述 <a class="header-anchor" href="#_7-4-1-工作流概述" aria-label="Permalink to &quot;7.4.1 工作流概述&quot;">​</a></h2><h3 id="工作流概念" tabindex="-1">工作流概念 <a class="header-anchor" href="#工作流概念" aria-label="Permalink to &quot;工作流概念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>工作流 = 任务的自动化编排</span></span>
<span class="line"><span></span></span>
<span class="line"><span>包含：</span></span>
<span class="line"><span>├── 触发条件</span></span>
<span class="line"><span>├── 执行步骤</span></span>
<span class="line"><span>├── 分支逻辑</span></span>
<span class="line"><span>├── 错误处理</span></span>
<span class="line"><span>└── 完成条件</span></span></code></pre></div><h3 id="核心要素" tabindex="-1">核心要素 <a class="header-anchor" href="#核心要素" aria-label="Permalink to &quot;核心要素&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>工作流核心要素：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 触发器 (Trigger)</span></span>
<span class="line"><span>   └── 启动条件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 任务 (Task)</span></span>
<span class="line"><span>   └── 具体工作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 流程控制 (Control)</span></span>
<span class="line"><span>   └── 顺序、分支、循环</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 数据传递 (Data)</span></span>
<span class="line"><span>   └── 输入、输出、转换</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 错误处理 (Error)</span></span>
<span class="line"><span>   └── 重试、跳过、终止</span></span></code></pre></div><hr><h2 id="_7-4-2-工作流定义" tabindex="-1">7.4.2 工作流定义 <a class="header-anchor" href="#_7-4-2-工作流定义" aria-label="Permalink to &quot;7.4.2 工作流定义&quot;">​</a></h2><h3 id="yaml-定义" tabindex="-1">YAML 定义 <a class="header-anchor" href="#yaml-定义" aria-label="Permalink to &quot;YAML 定义&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code_review_workflow</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0.0</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">自动化代码审查工作流</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">event</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pull_request</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">agents</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scanner</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    role</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">security_scan</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reviewer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    role</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code_review</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reporter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    role</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">report</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">flow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scan</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scanner</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scan_results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reviewer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">code</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review_results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">merge</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">reporter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scan_results</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review_results</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">final_report</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">error_handling</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  on_failure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">retry</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  max_retries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span></code></pre></div><hr><h2 id="_7-4-3-触发器" tabindex="-1">7.4.3 触发器 <a class="header-anchor" href="#_7-4-3-触发器" aria-label="Permalink to &quot;7.4.3 触发器&quot;">​</a></h2><h3 id="触发类型" tabindex="-1">触发类型 <a class="header-anchor" href="#触发类型" aria-label="Permalink to &quot;触发类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>触发器类型：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 事件触发</span></span>
<span class="line"><span>   ├── PR 创建/合并</span></span>
<span class="line"><span>   ├── Issue 创建</span></span>
<span class="line"><span>   ├── 定时任务</span></span>
<span class="line"><span>   └── Webhook</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 手动触发</span></span>
<span class="line"><span>   ├── 用户命令</span></span>
<span class="line"><span>   ├── API 调用</span></span>
<span class="line"><span>   └── 按钮点击</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 条件触发</span></span>
<span class="line"><span>   ├── 关键词匹配</span></span>
<span class="line"><span>   ├── 状态变化</span></span>
<span class="line"><span>   └── 阈值触发</span></span></code></pre></div><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">webhook</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pull_request.opened</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pull_request.synchronize</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  filters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">branch</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;feature/*&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">review_request</span></span></code></pre></div><hr><h2 id="_7-4-4-任务节点" tabindex="-1">7.4.4 任务节点 <a class="header-anchor" href="#_7-4-4-任务节点" aria-label="Permalink to &quot;7.4.4 任务节点&quot;">​</a></h2><h3 id="节点类型" tabindex="-1">节点类型 <a class="header-anchor" href="#节点类型" aria-label="Permalink to &quot;节点类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>任务节点类型：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Agent 节点</span></span>
<span class="line"><span>   └── 调用 Agent 执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Tool 节点</span></span>
<span class="line"><span>   └── 调用工具</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Condition 节点</span></span>
<span class="line"><span>   └── 条件判断</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. Transform 节点</span></span>
<span class="line"><span>   └── 数据转换</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. Delay 节点</span></span>
<span class="line"><span>   └── 等待/延迟</span></span></code></pre></div><h3 id="节点配置" tabindex="-1">节点配置 <a class="header-anchor" href="#节点配置" aria-label="Permalink to &quot;节点配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">nodes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">analyze</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agent</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">analyzer</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{trigger.payload}}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">analysis_result</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">check</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">condition</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;analysis_result.issues &gt; 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    on_true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">fix</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    on_false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">approve</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">transform</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">transform</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;发现 {{issues}} 个问题&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">message</span></span></code></pre></div><hr><h2 id="_7-4-5-数据传递" tabindex="-1">7.4.5 数据传递 <a class="header-anchor" href="#_7-4-5-数据传递" aria-label="Permalink to &quot;7.4.5 数据传递&quot;">​</a></h2><h3 id="变量传递" tabindex="-1">变量传递 <a class="header-anchor" href="#变量传递" aria-label="Permalink to &quot;变量传递&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>变量引用：</span></span>
<span class="line"><span>{{node_id.output}}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span>{{scan_results.security_issues}}</span></span>
<span class="line"><span>{{review_results.score}}</span></span></code></pre></div><h3 id="数据转换" tabindex="-1">数据转换 <a class="header-anchor" href="#数据转换" aria-label="Permalink to &quot;数据转换&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">transforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">format_report</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">template</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ## 审查报告</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      安全性：{{security_score}}/10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      代码质量：{{quality_score}}/10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      {{#if issues}}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      发现问题：</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      {{#each issues}}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      - {{this}}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      {{/each}}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      {{/if}}</span></span></code></pre></div><hr><h2 id="_7-4-6-错误处理" tabindex="-1">7.4.6 错误处理 <a class="header-anchor" href="#_7-4-6-错误处理" aria-label="Permalink to &quot;7.4.6 错误处理&quot;">​</a></h2><h3 id="处理策略" tabindex="-1">处理策略 <a class="header-anchor" href="#处理策略" aria-label="Permalink to &quot;处理策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误处理策略：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 重试 (retry)</span></span>
<span class="line"><span>   ├── 自动重试 N 次</span></span>
<span class="line"><span>   └── 间隔递增</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 跳过 (skip)</span></span>
<span class="line"><span>   ├── 跳过失败步骤</span></span>
<span class="line"><span>   └── 继续执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 终止 (terminate)</span></span>
<span class="line"><span>   ├── 停止工作流</span></span>
<span class="line"><span>   └── 通知管理员</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 回退 (rollback)</span></span>
<span class="line"><span>   ├── 恢复到之前状态</span></span>
<span class="line"><span>   └── 清理副作用</span></span></code></pre></div><h3 id="配置示例-1" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例-1" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">error_handling</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">retry_then_notify</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  max_retries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  retry_interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  exponential_backoff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  fallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">skip</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    notify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  notifications</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">email</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">admin@example.com</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">slack</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#alerts&quot;</span></span></code></pre></div><hr><h2 id="_7-4-7-监控日志" tabindex="-1">7.4.7 监控日志 <a class="header-anchor" href="#_7-4-7-监控日志" aria-label="Permalink to &quot;7.4.7 监控日志&quot;">​</a></h2><h3 id="状态追踪" tabindex="-1">状态追踪 <a class="header-anchor" href="#状态追踪" aria-label="Permalink to &quot;状态追踪&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">monitoring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  track</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">node_execution_time</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">success_rate</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">token_usage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cost</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  logging</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">info</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    outputs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logs/workflow.log</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">console</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  metrics</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">workflow_duration</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">histogram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">task_success</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">counter</span></span></code></pre></div><h3 id="查看状态" tabindex="-1">查看状态 <a class="header-anchor" href="#查看状态" aria-label="Permalink to &quot;查看状态&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看工作流状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workflow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-workflow</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看执行历史</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workflow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> history</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-workflow</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> workflow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-workflow</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --run-id</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span></span></code></pre></div><hr><h2 id="_7-4-8-常见问题" tabindex="-1">7.4.8 常见问题 <a class="header-anchor" href="#_7-4-8-常见问题" aria-label="Permalink to &quot;7.4.8 常见问题&quot;">​</a></h2><h3 id="q1-工作流执行失败" tabindex="-1">Q1: 工作流执行失败 <a class="header-anchor" href="#q1-工作流执行失败" aria-label="Permalink to &quot;Q1: 工作流执行失败&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：工作流中途失败</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 查看错误日志</span></span>
<span class="line"><span>2. 检查输入数据</span></span>
<span class="line"><span>3. 验证节点配置</span></span>
<span class="line"><span>4. 检查权限</span></span></code></pre></div><h3 id="q2-无限等待" tabindex="-1">Q2: 无限等待 <a class="header-anchor" href="#q2-无限等待" aria-label="Permalink to &quot;Q2: 无限等待&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：某个节点一直等待</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 设置超时时间</span></span>
<span class="line"><span>2. 检查依赖数据</span></span>
<span class="line"><span>3. 验证触发条件</span></span></code></pre></div><h3 id="q3-数据格式错误" tabindex="-1">Q3: 数据格式错误 <a class="header-anchor" href="#q3-数据格式错误" aria-label="Permalink to &quot;Q3: 数据格式错误&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：节点间数据不匹配</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查输出格式</span></span>
<span class="line"><span>2. 使用 Transform 转换</span></span>
<span class="line"><span>3. 添加数据验证</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>触发器</strong>：启动工作流的条件</li><li><strong>节点</strong>：具体执行单元</li><li><strong>数据传递</strong>：变量引用和转换</li><li><strong>错误处理</strong>：重试、跳过、终止</li><li><strong>监控</strong>：日志和指标追踪</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>如何设计可维护的工作流？</li><li>如何处理复杂的数据转换？</li><li>如何确保工作流的稳定性？</li></ol>`,57)])])}const g=a(l,[["render",h]]);export{c as __pageData,g as default};
