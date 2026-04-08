import{_ as s,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"10.1 Gateway 概述","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/14_监控维护/14.1_gateway_overview.md","filePath":"chapters/14_监控维护/14.1_gateway_overview.md"}'),e={name:"chapters/14_监控维护/14.1_gateway_overview.md"};function l(t,a,h,r,c,k){return n(),i("div",null,[...a[0]||(a[0]=[p(`<h1 id="_10-1-gateway-概述" tabindex="-1">10.1 Gateway 概述 <a class="header-anchor" href="#_10-1-gateway-概述" aria-label="Permalink to &quot;10.1 Gateway 概述&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解 Gateway 的架构</li><li>掌握核心功能</li><li>了解配置方法</li></ul><hr><h2 id="_10-1-1-什么是-gateway" tabindex="-1">10.1.1 什么是 Gateway <a class="header-anchor" href="#_10-1-1-什么是-gateway" aria-label="Permalink to &quot;10.1.1 什么是 Gateway&quot;">​</a></h2><h3 id="gateway-定义" tabindex="-1">Gateway 定义 <a class="header-anchor" href="#gateway-定义" aria-label="Permalink to &quot;Gateway 定义&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Gateway 核心能力                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  Gateway = API 网关                         │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  核心功能：                                  │</span></span>
<span class="line"><span>│  ├── 统一入口 - 单一端点服务所有客户端        │</span></span>
<span class="line"><span>│  ├── 路由转发 - 请求分发到后端服务           │</span></span>
<span class="line"><span>│  ├── 认证授权 - 验证身份和权限               │</span></span>
<span class="line"><span>│  ├── 限流熔断 - 保护后端服务                │</span></span>
<span class="line"><span>│  ├── 日志监控 - 记录请求日志                 │</span></span>
<span class="line"><span>│  └── 协议转换 - 支持多种协议                 │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![超时策略]/assets/diagrams/148_timeout_strategy.png)</p><p>![隔板模式]/assets/diagrams/145_bulkhead.png)</p><p>![断路器]/assets/diagrams/144_circuit_breaker.png)</p><p>![负载均衡]/assets/diagrams/143_load_balancing.png)</p><p>![超时配置]/assets/diagrams/84_timeout_config.png)</p><p>![限流]/assets/diagrams/82_rate_limiting.png)</p><p>![Gateway协议]/assets/diagrams/14_gateway_protocol.png)</p><h3 id="与-agent-的关系" tabindex="-1">与 Agent 的关系 <a class="header-anchor" href="#与-agent-的关系" aria-label="Permalink to &quot;与 Agent 的关系&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Gateway 和 Agent 的关系：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户请求 → Gateway → 路由 → Agent Engine → 返回</span></span>
<span class="line"><span>              ↓</span></span>
<span class="line"><span>         认证/限流</span></span>
<span class="line"><span>              ↓</span></span>
<span class="line"><span>         日志/监控</span></span></code></pre></div><hr><h2 id="_10-1-2-架构设计" tabindex="-1">10.1.2 架构设计 <a class="header-anchor" href="#_10-1-2-架构设计" aria-label="Permalink to &quot;10.1.2 架构设计&quot;">​</a></h2><h3 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────┐</span></span>
<span class="line"><span>│  客户端  │</span></span>
<span class="line"><span>└────┬────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Gateway Layer                  │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │  1. SSL/TLS 终止                    ││</span></span>
<span class="line"><span>│  │  2. 请求路由                         ││</span></span>
<span class="line"><span>│  │  3. 认证验证                         ││</span></span>
<span class="line"><span>│  │  4. 限流熔断                         ││</span></span>
<span class="line"><span>│  │  5. 日志记录                         ││</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘│</span></span>
<span class="line"><span>└────┬────────────────────────────────────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Agent Engine                   │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │  消息处理                            ││</span></span>
<span class="line"><span>│  │  Agent 调度                          ││</span></span>
<span class="line"><span>│  │  工具执行                            ││</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘│</span></span>
<span class="line"><span>└─────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_10-1-3-启动-gateway" tabindex="-1">10.1.3 启动 Gateway <a class="header-anchor" href="#_10-1-3-启动-gateway" aria-label="Permalink to &quot;10.1.3 启动 Gateway&quot;">​</a></h2><h3 id="启动命令" tabindex="-1">启动命令 <a class="header-anchor" href="#启动命令" aria-label="Permalink to &quot;启动命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 Gateway</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8080</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 后台运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --daemon</span></span></code></pre></div><h3 id="验证启动" tabindex="-1">验证启动 <a class="header-anchor" href="#验证启动" aria-label="Permalink to &quot;验证启动&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://127.0.0.1:18789/health</span></span></code></pre></div><hr><h2 id="_10-1-4-默认配置" tabindex="-1">10.1.4 默认配置 <a class="header-anchor" href="#_10-1-4-默认配置" aria-label="Permalink to &quot;10.1.4 默认配置&quot;">​</a></h2><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gateway</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18789</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 启用功能</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">api</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">webui</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">websocket</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 跨域配置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  cors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    origins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><hr><h2 id="_10-1-5-访问方式" tabindex="-1">10.1.5 访问方式 <a class="header-anchor" href="#_10-1-5-访问方式" aria-label="Permalink to &quot;10.1.5 访问方式&quot;">​</a></h2><h3 id="web-ui" tabindex="-1">Web UI <a class="header-anchor" href="#web-ui" aria-label="Permalink to &quot;Web UI&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Web UI 访问：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>URL: http://127.0.0.1:18789/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>功能：</span></span>
<span class="line"><span>- 对话界面</span></span>
<span class="line"><span>- 历史记录</span></span>
<span class="line"><span>- 设置管理</span></span></code></pre></div><h3 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>API 端点：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>POST /api/v1/agent - Agent 对话</span></span>
<span class="line"><span>GET  /api/v1/sessions - 会话列表</span></span>
<span class="line"><span>POST /api/v1/sessions - 创建会话</span></span>
<span class="line"><span>GET  /api/v1/models - 模型列表</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>Gateway</strong>：API 网关</li><li><strong>功能</strong>：路由、认证、限流、监控</li><li><strong>启动</strong>：openclaw gateway start</li><li><strong>访问</strong>：Web UI + API</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>Gateway 的核心价值是什么？</li><li>Gateway 和直接调用 Agent 有什么区别？</li><li>如何选择 Gateway 部署方式？</li></ol>`,42)])])}const g=s(e,[["render",l]]);export{o as __pageData,g as default};
