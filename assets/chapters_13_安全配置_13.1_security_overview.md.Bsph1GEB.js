import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"11.1 安全概述","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/13_安全配置/13.1_security_overview.md","filePath":"chapters/13_安全配置/13.1_security_overview.md"}'),l={name:"chapters/13_安全配置/13.1_security_overview.md"};function e(t,s,h,r,c,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_11-1-安全概述" tabindex="-1">11.1 安全概述 <a class="header-anchor" href="#_11-1-安全概述" aria-label="Permalink to &quot;11.1 安全概述&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解安全架构</li><li>掌握安全机制</li><li>了解安全配置</li></ul><hr><h2 id="_11-1-1-安全架构" tabindex="-1">11.1.1 安全架构 <a class="header-anchor" href="#_11-1-1-安全架构" aria-label="Permalink to &quot;11.1.1 安全架构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>安全体系：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            安全分层                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  网络层                                      │</span></span>
<span class="line"><span>│  ├── SSL/TLS                              │</span></span>
<span class="line"><span>│  ├── 防火墙                                │</span></span>
<span class="line"><span>│  └── IP 白名单                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  认证层                                      │</span></span>
<span class="line"><span>│  ├── API Key                              │</span></span>
<span class="line"><span>│  ├── JWT                                  │</span></span>
<span class="line"><span>│  └── OAuth                                │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  权限层                                      │</span></span>
<span class="line"><span>│  ├── 角色权限                               │</span></span>
<span class="line"><span>│  ├── 工具权限                               │</span></span>
<span class="line"><span>│  └── 路径权限                              │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  数据层                                      │</span></span>
<span class="line"><span>│  ├── 加密存储                              │</span></span>
<span class="line"><span>│  └── 敏感信息保护                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  审计层                                      │</span></span>
<span class="line"><span>│  ├── 操作日志                               │</span></span>
<span class="line"><span>│  └── 行为审计                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![合规]/assets/diagrams/123_compliance.png)</p><p>![加密安全]/assets/diagrams/83_encryption.png)</p><hr><h2 id="_11-1-2-安全原则" tabindex="-1">11.1.2 安全原则 <a class="header-anchor" href="#_11-1-2-安全原则" aria-label="Permalink to &quot;11.1.2 安全原则&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>核心原则：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 最小权限</span></span>
<span class="line"><span>   └── 只授予必要权限</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 纵深防御</span></span>
<span class="line"><span>   └── 多层安全保护</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 零信任</span></span>
<span class="line"><span>   └── 每次请求都验证</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 可审计</span></span>
<span class="line"><span>   └── 记录所有操作</span></span></code></pre></div><p>![合规]/assets/diagrams/123_compliance.png)</p><p>![加密安全]/assets/diagrams/83_encryption.png)</p><p>![防火墙规则]/assets/diagrams/170_firewall_rules.png)</p><hr><h2 id="_11-1-3-安全配置" tabindex="-1">11.1.3 安全配置 <a class="header-anchor" href="#_11-1-3-安全配置" aria-label="Permalink to &quot;11.1.3 安全配置&quot;">​</a></h2><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">security</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 认证</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    default_policy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">deny</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 加密</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  encryption</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    algorithm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">AES-256-GCM</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 审计</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  audit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    retention</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">90d</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>分层</strong>：网络、认证、权限、数据、审计</li><li><strong>原则</strong>：最小权限、纵深防御、零信任</li><li><strong>配置</strong>：认证、加密、审计</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>安全架构的核心是什么？</li><li>如何平衡安全和易用性？</li><li>哪些场景需要特别注意安全？</li></ol>`,24)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
