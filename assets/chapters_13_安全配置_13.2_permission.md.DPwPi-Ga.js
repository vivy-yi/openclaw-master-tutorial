import{_ as a,o as i,c as n,ae as l}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"11.2 权限管理","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/13_安全配置/13.2_permission.md","filePath":"chapters/13_安全配置/13.2_permission.md"}'),p={name:"chapters/13_安全配置/13.2_permission.md"};function e(h,s,t,k,r,E){return i(),n("div",null,[...s[0]||(s[0]=[l(`<h1 id="_11-2-权限管理" tabindex="-1">11.2 权限管理 <a class="header-anchor" href="#_11-2-权限管理" aria-label="Permalink to &quot;11.2 权限管理&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握权限配置方法</li><li>理解 Profile 机制</li><li>完成权限配置</li></ul><hr><h2 id="_11-2-1-权限模型" tabindex="-1">11.2.1 权限模型 <a class="header-anchor" href="#_11-2-1-权限模型" aria-label="Permalink to &quot;11.2.1 权限模型&quot;">​</a></h2><h3 id="权限类型" tabindex="-1">权限类型 <a class="header-anchor" href="#权限类型" aria-label="Permalink to &quot;权限类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>权限类型：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 工具权限</span></span>
<span class="line"><span>   ├── read - 读取</span></span>
<span class="line"><span>   ├── write - 写入</span></span>
<span class="line"><span>   ├── exec - 执行命令</span></span>
<span class="line"><span>   └── browser - 浏览器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 路径权限</span></span>
<span class="line"><span>   ├── allowed_paths - 允许路径</span></span>
<span class="line"><span>   └── denied_paths - 禁止路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. API 权限</span></span>
<span class="line"><span>   ├── 端点权限</span></span>
<span class="line"><span>   └── 方法权限</span></span></code></pre></div><p>![权限矩阵]/assets/diagrams/65_permission_matrix.png)</p><hr><h2 id="_11-2-2-profile-配置" tabindex="-1">11.2.2 Profile 配置 <a class="header-anchor" href="#_11-2-2-profile-配置" aria-label="Permalink to &quot;11.2.2 Profile 配置&quot;">​</a></h2><h3 id="创建-profile" tabindex="-1">创建 Profile <a class="header-anchor" href="#创建-profile" aria-label="Permalink to &quot;创建 Profile&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">profiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 开发者 Profile</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  developer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">开发者权限</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      exec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        allowed_commands</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">npm</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">git</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">docker</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        denied_commands</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rm -rf /</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sudo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    paths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      allowed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/workspace/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/projects/**</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      denied</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/.ssh/**</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 只读 Profile</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  readonly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">只读权限</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    tools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      exec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span></code></pre></div><hr><h2 id="_11-2-3-用户分配" tabindex="-1">11.2.3 用户分配 <a class="header-anchor" href="#_11-2-3-用户分配" aria-label="Permalink to &quot;11.2.3 用户分配&quot;">​</a></h2><h3 id="用户配置" tabindex="-1">用户配置 <a class="header-anchor" href="#用户配置" aria-label="Permalink to &quot;用户配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">user_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user_001</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">张三</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">developer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">user_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user_002</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">李四</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">readonly</span></span></code></pre></div><hr><h2 id="_11-2-4-权限检查" tabindex="-1">11.2.4 权限检查 <a class="header-anchor" href="#_11-2-4-权限检查" aria-label="Permalink to &quot;11.2.4 权限检查&quot;">​</a></h2><h3 id="检查流程" tabindex="-1">检查流程 <a class="header-anchor" href="#检查流程" aria-label="Permalink to &quot;检查流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>权限检查流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 获取用户 Profile</span></span>
<span class="line"><span>2. 检查工具权限</span></span>
<span class="line"><span>3. 检查路径权限</span></span>
<span class="line"><span>4. 检查命令权限</span></span>
<span class="line"><span>5. 决定是否允许</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>Profile</strong>：权限集合</li><li><strong>工具</strong>：read/write/exec</li><li><strong>路径</strong>：allowed/denied</li><li><strong>分配</strong>：用户关联 Profile</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>如何设计合理的 Profile？</li><li>权限粒度如何控制？</li><li>如何处理权限冲突？</li></ol>`,26)])])}const c=a(p,[["render",e]]);export{o as __pageData,c as default};
