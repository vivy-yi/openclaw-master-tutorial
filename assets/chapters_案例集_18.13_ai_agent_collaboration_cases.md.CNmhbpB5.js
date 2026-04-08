import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"14.13 AI Agent 协作类案例","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/案例集/18.13_ai_agent_collaboration_cases.md","filePath":"chapters/案例集/18.13_ai_agent_collaboration_cases.md"}'),e={name:"chapters/案例集/18.13_ai_agent_collaboration_cases.md"};function l(t,s,h,d,k,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_14-13-ai-agent-协作类案例" tabindex="-1">14.13 AI Agent 协作类案例 <a class="header-anchor" href="#_14-13-ai-agent-协作类案例" aria-label="Permalink to &quot;14.13 AI Agent 协作类案例&quot;">​</a></h1><p>OpenClaw 作为&quot;AI Agent 控制器&quot;，通过 ACP 协议协调多种外部 AI Agent 工具，形成更强大的工作流。</p><hr><h2 id="案例列表" tabindex="-1">案例列表 <a class="header-anchor" href="#案例列表" aria-label="Permalink to &quot;案例列表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>序号</th><th>案例名称</th><th>描述</th></tr></thead><tbody><tr><td>1</td><td>Claude Code 协作开发</td><td>OpenClaw 调度 Claude Code 进行代码开发</td></tr><tr><td>2</td><td>Codex 批量代码生成</td><td>使用 Codex 批量生成项目代码</td></tr><tr><td>3</td><td>多 Agent 混合工作流</td><td>协调多个 AI Agent 分工合作</td></tr><tr><td>4</td><td>跨语言开发 pipeline</td><td>利用不同 Agent 的语言优势</td></tr><tr><td>5</td><td>AI Agent 团队分工</td><td>架构师 + 开发者 + 测试工程师模式</td></tr></tbody></table><hr><h2 id="_14-13-1-claude-code-协作开发" tabindex="-1">14.13.1 Claude Code 协作开发 <a class="header-anchor" href="#_14-13-1-claude-code-协作开发" aria-label="Permalink to &quot;14.13.1 Claude Code 协作开发&quot;">​</a></h2><h3 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>OpenClaw 作为指挥官，调度 Claude Code 完成特定编码任务。</p><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建 Claude Code 协作会话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> auto</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;用 React + TypeScript 创建一个简单的待办事项应用&quot;</span></span></code></pre></div><h3 id="工作流程" tabindex="-1">工作流程 <a class="header-anchor" href="#工作流程" aria-label="Permalink to &quot;工作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              OpenClaw + Claude Code 工作流                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  1. OpenClaw 接收任务                                       │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ▼                                                     │</span></span>
<span class="line"><span>│  2. 任务分析 + 拆解                                         │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ▼                                                     │</span></span>
<span class="line"><span>│  3. 调度 Claude Code 执行                                   │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ├── 前端代码生成                                      │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ├── 代码审查                                          │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       └── 问题修复                                          │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ▼                                                     │</span></span>
<span class="line"><span>│  4. OpenClaw 汇总结果 + 反馈                                │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="实际命令" tabindex="-1">实际命令 <a class="header-anchor" href="#实际命令" aria-label="Permalink to &quot;实际命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动协作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发送任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;创建一个 Python Flask REST API，包含用户管理的 CRUD 接口&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 监控状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 获取输出</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> output</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 引导方向（如需要）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> steer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;添加 JWT 认证功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 关闭会话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> close</span></span></code></pre></div><hr><h2 id="_14-13-2-codex-批量代码生成" tabindex="-1">14.13.2 Codex 批量代码生成 <a class="header-anchor" href="#_14-13-2-codex-批量代码生成" aria-label="Permalink to &quot;14.13.2 Codex 批量代码生成&quot;">​</a></h2><h3 id="场景-1" tabindex="-1">场景 <a class="header-anchor" href="#场景-1" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>使用 Codex 进行批量代码生成，适合重复性高的编码任务。</p><h3 id="配置-1" tabindex="-1">配置 <a class="header-anchor" href="#配置-1" aria-label="Permalink to &quot;配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 一次性模式生成多个文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> one-shot</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 批量任务示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;生成以下文件：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. models/user.py - User 模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. models/product.py - Product 模型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. schemas/user.py - Pydantic User schema</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4. schemas/product.py - Pydantic Product schema</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">使用 Python + SQLAlchemy&quot;</span></span></code></pre></div><h3 id="实际应用" tabindex="-1">实际应用 <a class="header-anchor" href="#实际应用" aria-label="Permalink to &quot;实际应用&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>命令</th><th>效果</th></tr></thead><tbody><tr><td>快速原型</td><td>&quot;创建 FastAPI 基础结构&quot;</td><td>30秒生成完整项目结构</td></tr><tr><td>API 开发</td><td>&quot;生成 CRUD 接口&quot;</td><td>自动生成全部 API</td></tr><tr><td>测试生成</td><td>&quot;为上述 API 生成单元测试&quot;</td><td>pytest 测试用例</td></tr></tbody></table><hr><h2 id="_14-13-3-多-agent-混合工作流" tabindex="-1">14.13.3 多 Agent 混合工作流 <a class="header-anchor" href="#_14-13-3-多-agent-混合工作流" aria-label="Permalink to &quot;14.13.3 多 Agent 混合工作流&quot;">​</a></h2><h3 id="场景-2" tabindex="-1">场景 <a class="header-anchor" href="#场景-2" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>同时调度多个 AI Agent，每个 Agent 负责特定任务。</p><h3 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 并行启动多个 Agent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex-thread</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-thread</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 协调任务分配</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;Codex 线程：生成前端代码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Claude Code 线程：生成后端 API</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">完成后进行代码整合&quot;</span></span></code></pre></div><h3 id="工作流程图" tabindex="-1">工作流程图 <a class="header-anchor" href="#工作流程图" aria-label="Permalink to &quot;工作流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                   多 Agent 协作架构                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│                    OpenClaw (指挥官)                         │</span></span>
<span class="line"><span>│                          │                                  │</span></span>
<span class="line"><span>│         ┌────────────────┼────────────────┐                │</span></span>
<span class="line"><span>│         ▼                ▼                ▼                │</span></span>
<span class="line"><span>│   ┌───────────┐   ┌───────────┐   ┌───────────┐          │</span></span>
<span class="line"><span>│   │ Claude    │   │  Codex    │   │  Gemini   │          │</span></span>
<span class="line"><span>│   │  Code     │   │           │   │   CLI     │          │</span></span>
<span class="line"><span>│   │ (代码审查) │   │ (代码生成) │   │ (文档生成) │          │</span></span>
<span class="line"><span>│   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘          │</span></span>
<span class="line"><span>│         │                │                │                 │</span></span>
<span class="line"><span>│         └────────────────┼────────────────┘                │</span></span>
<span class="line"><span>│                          ▼                                  │</span></span>
<span class="line"><span>│                  成果整合 + 质量检查                          │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="典型任务分配" tabindex="-1">典型任务分配 <a class="header-anchor" href="#典型任务分配" aria-label="Permalink to &quot;典型任务分配&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Agent</th><th>专长</th><th>适用任务</th></tr></thead><tbody><tr><td>Claude Code</td><td>代码审查、调试</td><td>Bug 修复、代码优化</td></tr><tr><td>Codex</td><td>快速生成</td><td>样板代码、API 接口</td></tr><tr><td>Gemini CLI</td><td>多模态</td><td>文档生成、注释</td></tr><tr><td>OpenCode</td><td>开源友好</td><td>开源项目贡献</td></tr></tbody></table><hr><h2 id="_14-13-4-跨语言开发-pipeline" tabindex="-1">14.13.4 跨语言开发 pipeline <a class="header-anchor" href="#_14-13-4-跨语言开发-pipeline" aria-label="Permalink to &quot;14.13.4 跨语言开发 pipeline&quot;">​</a></h2><h3 id="场景-3" tabindex="-1">场景 <a class="header-anchor" href="#场景-3" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>利用不同 Agent 的语言能力优势，完成跨语言开发任务。</p><h3 id="示例-全栈项目" tabindex="-1">示例：全栈项目 <a class="header-anchor" href="#示例-全栈项目" aria-label="Permalink to &quot;示例：全栈项目&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 任务：创建 Vue3 + Go 全栈应用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;创建 Go 后端：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. main.go - HTTP 服务器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. handlers/user.go - 用户接口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. models/user.go - 数据模型</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">使用 Gin 框架&quot;</span></span></code></pre></div><h3 id="命令执行" tabindex="-1">命令执行 <a class="header-anchor" href="#命令执行" aria-label="Permalink to &quot;命令执行&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 完成后切换到前端</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;基于刚才的 Go API，创建 Vue3 前端：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. 用户列表页面</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. 用户编辑表单</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. API 集成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">使用 TypeScript + Composition API&quot;</span></span></code></pre></div><h3 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    跨语言开发优势                              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  语言优势利用                                                │</span></span>
<span class="line"><span>│  ├── Codex → Python/Go 后端                                │</span></span>
<span class="line"><span>│  ├── Claude Code → React/Vue 前端                          │</span></span>
<span class="line"><span>│  ├── Gemini CLI → 文档/注释                                 │</span></span>
<span class="line"><span>│  └── OpenCode → 开源项目适配                                │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  效率提升                                                   │</span></span>
<span class="line"><span>│  ├── 单 Agent: 1x 效率                                      │</span></span>
<span class="line"><span>│  └── 多 Agent 协作: 3-5x 效率                               │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_14-13-5-ai-agent-团队分工" tabindex="-1">14.13.5 AI Agent 团队分工 <a class="header-anchor" href="#_14-13-5-ai-agent-团队分工" aria-label="Permalink to &quot;14.13.5 AI Agent 团队分工&quot;">​</a></h2><h3 id="场景-4" tabindex="-1">场景 <a class="header-anchor" href="#场景-4" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>模拟真实开发团队，每个 Agent 扮演特定角色。</p><h3 id="角色配置" tabindex="-1">角色配置 <a class="header-anchor" href="#角色配置" aria-label="Permalink to &quot;角色配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 架构师 Agent - 设计系统架构</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> architect</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;你扮演高级架构师，负责：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. 分析需求</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. 设计系统架构</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. 制定技术选型</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4. 输出架构文档&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 开发者 Agent - 实现功能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> developer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;你扮演资深开发者，负责：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. 根据架构文档编码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. 遵循最佳实践</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. 编写单元测试&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 测试工程师 Agent - 质量保证</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> opencode</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qa</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;你扮演 QA 工程师，负责：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1. 编写集成测试</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2. 发现潜在问题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3. 提供修复建议&quot;</span></span></code></pre></div><h3 id="协作流程" tabindex="-1">协作流程 <a class="header-anchor" href="#协作流程" aria-label="Permalink to &quot;协作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>需求输入</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│         架构师 (Claude Code)             │</span></span>
<span class="line"><span>│  - 需求分析                              │</span></span>
<span class="line"><span>│  - 架构设计                              │</span></span>
<span class="line"><span>│  - 技术选型                              │</span></span>
<span class="line"><span>└────────────────┬────────────────────────┘</span></span>
<span class="line"><span>                 │ 架构文档</span></span>
<span class="line"><span>                 ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│         开发者 (Codex)                   │</span></span>
<span class="line"><span>│  - 代码实现                              │</span></span>
<span class="line"><span>│  - 单元测试                              │</span></span>
<span class="line"><span>│  - 代码规范                              │</span></span>
<span class="line"><span>└────────────────┬────────────────────────┘</span></span>
<span class="line"><span>                 │ 代码</span></span>
<span class="line"><span>                 ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│         QA (OpenCode)                    │</span></span>
<span class="line"><span>│  - 集成测试                              │</span></span>
<span class="line"><span>│  - Bug 修复                              │</span></span>
<span class="line"><span>│  - 性能优化                              │</span></span>
<span class="line"><span>└────────────────┬────────────────────────┘</span></span>
<span class="line"><span>                 │ 测试报告</span></span>
<span class="line"><span>                 ▼</span></span>
<span class="line"><span>            最终交付</span></span></code></pre></div><h3 id="实际命令-1" tabindex="-1">实际命令 <a class="header-anchor" href="#实际命令-1" aria-label="Permalink to &quot;实际命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动团队</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> claude-code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> architect</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> developer</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/acp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spawn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> opencode</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --thread</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qa</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 分配任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">architect</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 线程:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;设计一个电商系统架构&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">developer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 线程:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;实现用户模块代码&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">qa</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 线程:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;测试用户注册功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 协调</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;architec 提供设计 → developer 实现 → qa 测试 → 整合&quot;</span></span></code></pre></div><hr><h2 id="快速导航" tabindex="-1">快速导航 <a class="header-anchor" href="#快速导航" aria-label="Permalink to &quot;快速导航&quot;">​</a></h2><ul><li><a href="./README.html">回到案例目录</a></li><li><a href="./14.12_finance_cases.html">上一节：金融交易类案例</a></li></ul>`,58)])])}const F=a(e,[["render",l]]);export{o as __pageData,F as default};
