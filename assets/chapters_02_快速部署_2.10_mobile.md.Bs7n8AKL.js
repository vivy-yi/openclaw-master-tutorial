import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const r=JSON.parse('{"title":"2.10 手机端部署与连接","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/02_快速部署/2.10_mobile.md","filePath":"chapters/02_快速部署/2.10_mobile.md"}'),l={name:"chapters/02_快速部署/2.10_mobile.md"};function e(t,s,h,k,d,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_2-10-手机端部署与连接" tabindex="-1">2.10 手机端部署与连接 <a class="header-anchor" href="#_2-10-手机端部署与连接" aria-label="Permalink to &quot;2.10 手机端部署与连接&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握 iOS 节点连接</li><li>掌握 Android 节点连接</li><li>理解移动端功能</li><li>完成移动端配对</li></ul><hr><h2 id="_2-10-1-移动端概述" tabindex="-1">2.10.1 移动端概述 <a class="header-anchor" href="#_2-10-1-移动端概述" aria-label="Permalink to &quot;2.10.1 移动端概述&quot;">​</a></h2><h3 id="支持的功能" tabindex="-1">支持的功能 <a class="header-anchor" href="#支持的功能" aria-label="Permalink to &quot;支持的功能&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    移动端功能概览                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  📱 iOS 节点                                                │</span></span>
<span class="line"><span>│  ├── Canvas 渲染                                            │</span></span>
<span class="line"><span>│  ├── 屏幕截图                                               │</span></span>
<span class="line"><span>│  ├── 摄像头拍摄                                             │</span></span>
<span class="line"><span>│  ├── 定位服务                                               │</span></span>
<span class="line"><span>│  ├── 语音对话                                               │</span></span>
<span class="line"><span>│  └── 推送通知                                               │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🤖 Android 节点                                           │</span></span>
<span class="line"><span>│  ├── Canvas 渲染                                            │</span></span>
<span class="line"><span>│  ├── 摄像头拍摄                                             │</span></span>
<span class="line"><span>│  ├── 屏幕截图                                               │</span></span>
<span class="line"><span>│  ├── 联系人                                                 │</span></span>
<span class="line"><span>│  ├── 日历                                                   │</span></span>
<span class="line"><span>│  ├── 通话记录                                               │</span></span>
<span class="line"><span>│  └── 通知管理                                               │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────┐          ┌──────────────────┐</span></span>
<span class="line"><span>│   iOS 节点   │ ──────→  │                  │</span></span>
<span class="line"><span>│  Android 节点│          │    Gateway       │</span></span>
<span class="line"><span>│              │ ←─────── │  (macOS/Linux)   │</span></span>
<span class="line"><span>└──────────────┘   WebSocket   └──────────────────┘</span></span></code></pre></div><p>移动端作为 &quot;节点&quot; 连接到 Gateway，通过 WebSocket 通信。</p><hr><h2 id="_2-10-2-ios-部署" tabindex="-1">2.10.2 iOS 部署 <a class="header-anchor" href="#_2-10-2-ios-部署" aria-label="Permalink to &quot;2.10.2 iOS 部署&quot;">​</a></h2><h3 id="前置要求" tabindex="-1">前置要求 <a class="header-anchor" href="#前置要求" aria-label="Permalink to &quot;前置要求&quot;">​</a></h3><ul><li>Gateway 运行在其他设备上（macOS/Linux/Windows via WSL2）</li><li>网络可达（局域网或 Tailnet）</li></ul><h3 id="快速配对步骤" tabindex="-1">快速配对步骤 <a class="header-anchor" href="#快速配对步骤" aria-label="Permalink to &quot;快速配对步骤&quot;">​</a></h3><h4 id="步骤一-启动-gateway" tabindex="-1">步骤一：启动 Gateway <a class="header-anchor" href="#步骤一-启动-gateway" aria-label="Permalink to &quot;步骤一：启动 Gateway&quot;">​</a></h4><p>在运行 Gateway 的机器上：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18789</span></span></code></pre></div><h4 id="步骤二-ios-端配对" tabindex="-1">步骤二：iOS 端配对 <a class="header-anchor" href="#步骤二-ios-端配对" aria-label="Permalink to &quot;步骤二：iOS 端配对&quot;">​</a></h4><ol><li>打开 iOS App</li><li>进入 <strong>Settings</strong></li><li>选择发现的 Gateway（局域网自动发现）</li><li>或启用 <strong>Manual Host</strong> 输入主机和端口</li></ol><h4 id="步骤三-批准配对" tabindex="-1">步骤三：批准配对 <a class="header-anchor" href="#步骤三-批准配对" aria-label="Permalink to &quot;步骤三：批准配对&quot;">​</a></h4><p>在 Gateway 机器上：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出设备</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> devices</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 批准设备</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> devices</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> approve</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requestI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h4 id="步骤四-验证连接" tabindex="-1">步骤四：验证连接 <a class="header-anchor" href="#步骤四-验证连接" aria-label="Permalink to &quot;步骤四：验证连接&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看节点状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 调用节点列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node.list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;{}&quot;</span></span></code></pre></div><h3 id="ios-配置流程图" tabindex="-1">iOS 配置流程图 <a class="header-anchor" href="#ios-配置流程图" aria-label="Permalink to &quot;iOS 配置流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           iOS 节点配置流程                                       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 启动 Gateway     │</span></span>
<span class="line"><span>                          │  openclaw gateway    │</span></span>
<span class="line"><span>                          │      --port 18789   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. iOS App 连接    │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ • 自动发现    │  │</span></span>
<span class="line"><span>                          │  │ • 手动输入    │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 等待配对请求     │</span></span>
<span class="line"><span>                          │  Gateway 端显示      │</span></span>
<span class="line"><span>                          │  配对请求            │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 批准配对          │</span></span>
<span class="line"><span>                          │  openclaw devices    │</span></span>
<span class="line"><span>                          │  approve &lt;requestId&gt; │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 验证连接          │</span></span>
<span class="line"><span>                          │  openclaw nodes      │</span></span>
<span class="line"><span>                          │      status          │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   连接成功 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         iOS 配对命令速查                                       │</span></span>
<span class="line"><span>├──────────────────┬──────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ 命令              │ 用途                                                        │</span></span>
<span class="line"><span>├──────────────────┼──────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ devices list     │ 查看配对请求                                                │</span></span>
<span class="line"><span>│ devices approve  │ 批准设备                                                    │</span></span>
<span class="line"><span>│ nodes status     │ 查看节点状态                                                │</span></span>
<span class="line"><span>│ nodes invoke     │ 调用节点命令                                                │</span></span>
<span class="line"><span>└──────────────────┴──────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h3 id="ios-canvas-使用" tabindex="-1">iOS Canvas 使用 <a class="header-anchor" href="#ios-canvas-使用" aria-label="Permalink to &quot;iOS Canvas 使用&quot;">​</a></h3><h4 id="导航到-canvas" tabindex="-1">导航到 Canvas <a class="header-anchor" href="#导航到-canvas" aria-label="Permalink to &quot;导航到 Canvas&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;iOS Node&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> canvas.navigate</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;url&quot;:&quot;http://&lt;gateway-host&gt;:18789/__openclaw__/canvas/&quot;}&#39;</span></span></code></pre></div><h4 id="执行-javascript" tabindex="-1">执行 JavaScript <a class="header-anchor" href="#执行-javascript" aria-label="Permalink to &quot;执行 JavaScript&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;iOS Node&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> canvas.eval</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;javaScript&quot;:&quot;(() =&gt; { const {ctx} = window.__openclaw; ctx.clearRect(0,0,innerWidth,innerHeight); ctx.fillStyle=\\&quot;#ff2d55\\&quot;; ctx.fillRect(10,10,100,100); return \\&quot;ok\\&quot;; })()&quot;}&#39;</span></span></code></pre></div><h4 id="截图" tabindex="-1">截图 <a class="header-anchor" href="#截图" aria-label="Permalink to &quot;截图&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;iOS Node&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> canvas.snapshot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;maxWidth&quot;:900,&quot;format&quot;:&quot;jpeg&quot;}&#39;</span></span></code></pre></div><hr><h3 id="ios-推送配置" tabindex="-1">iOS 推送配置 <a class="header-anchor" href="#ios-推送配置" aria-label="Permalink to &quot;iOS 推送配置&quot;">​</a></h3><h4 id="官方构建" tabindex="-1">官方构建 <a class="header-anchor" href="#官方构建" aria-label="Permalink to &quot;官方构建&quot;">​</a></h4><p>官方发布的 iOS App 使用中继推送：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;push&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;apns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;relay&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;baseUrl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://relay.example.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="本地构建" tabindex="-1">本地构建 <a class="header-anchor" href="#本地构建" aria-label="Permalink to &quot;本地构建&quot;">​</a></h4><p>本地构建需要直接 APNs 凭据：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENCLAW_APNS_TEAM_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;TEAMID&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENCLAW_APNS_KEY_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;KEYID&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OPENCLAW_APNS_PRIVATE_KEY_P8</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/AuthKey_KEYID.p8)&quot;</span></span></code></pre></div><hr><h3 id="ios-常见问题" tabindex="-1">iOS 常见问题 <a class="header-anchor" href="#ios-常见问题" aria-label="Permalink to &quot;iOS 常见问题&quot;">​</a></h3><table tabindex="0"><thead><tr><th>错误</th><th>解决方法</th></tr></thead><tbody><tr><td><code>NODE_BACKGROUND_UNAVAILABLE</code></td><td>将 App 切换到前台</td></tr><tr><td><code>A2UI_HOST_NOT_CONFIGURED</code></td><td>配置 Gateway canvasHost</td></tr><tr><td>配对提示不出现</td><td>手动执行 <code>openclaw devices list</code></td></tr><tr><td>重连失败</td><td>重新配对节点</td></tr></tbody></table><hr><h2 id="_2-10-3-android-部署" tabindex="-1">2.10.3 Android 部署 <a class="header-anchor" href="#_2-10-3-android-部署" aria-label="Permalink to &quot;2.10.3 Android 部署&quot;">​</a></h2><h3 id="前置要求-1" tabindex="-1">前置要求 <a class="header-anchor" href="#前置要求-1" aria-label="Permalink to &quot;前置要求&quot;">​</a></h3><ul><li>Gateway 运行在 macOS/Linux/Windows via WSL2</li><li>Android 设备可访问 Gateway</li></ul><h3 id="快速配对步骤-1" tabindex="-1">快速配对步骤 <a class="header-anchor" href="#快速配对步骤-1" aria-label="Permalink to &quot;快速配对步骤&quot;">​</a></h3><h4 id="步骤一-启动-gateway-1" tabindex="-1">步骤一：启动 Gateway <a class="header-anchor" href="#步骤一-启动-gateway-1" aria-label="Permalink to &quot;步骤一：启动 Gateway&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18789</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --verbose</span></span></code></pre></div><p>确认日志显示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>listening on ws://0.0.0.0:18789</span></span></code></pre></div><h4 id="步骤二-配置-gateway-tailnet-模式" tabindex="-1">步骤二：配置 Gateway（Tailnet 模式） <a class="header-anchor" href="#步骤二-配置-gateway-tailnet-模式" aria-label="Permalink to &quot;步骤二：配置 Gateway（Tailnet 模式）&quot;">​</a></h4><p>如果跨网络使用 Tailscale：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;bind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tailnet&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>然后重启 Gateway。</p><h4 id="步骤三-android-端配对" tabindex="-1">步骤三：Android 端配对 <a class="header-anchor" href="#步骤三-android-端配对" aria-label="Permalink to &quot;步骤三：Android 端配对&quot;">​</a></h4><ol><li>打开 Android App</li><li>进入 <strong>Connect</strong> 标签</li><li>使用 <strong>Setup Code</strong> 或 <strong>Manual</strong> 模式</li><li>发现被阻止时，使用手动输入</li></ol><h4 id="步骤四-批准配对" tabindex="-1">步骤四：批准配对 <a class="header-anchor" href="#步骤四-批准配对" aria-label="Permalink to &quot;步骤四：批准配对&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> devices</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> devices</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> approve</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requestI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h4 id="步骤五-验证连接" tabindex="-1">步骤五：验证连接 <a class="header-anchor" href="#步骤五-验证连接" aria-label="Permalink to &quot;步骤五：验证连接&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方法一</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方法二</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node.list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;{}&quot;</span></span></code></pre></div><h3 id="android-配置流程图" tabindex="-1">Android 配置流程图 <a class="header-anchor" href="#android-配置流程图" aria-label="Permalink to &quot;Android 配置流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          Android 节点配置流程                                    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 启动 Gateway    │</span></span>
<span class="line"><span>                          │  openclaw gateway   │</span></span>
<span class="line"><span>                          │  --port 18789       │</span></span>
<span class="line"><span>                          │  --verbose          │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 可选：配置       │</span></span>
<span class="line"><span>                          │     Tailscale         │</span></span>
<span class="line"><span>                          │  &quot;bind&quot;: &quot;tailnet&quot;   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. Android App 连接  │</span></span>
<span class="line"><span>                          │  ┌───────────────┐    │</span></span>
<span class="line"><span>                          │  │ • Setup Code  │    │</span></span>
<span class="line"><span>                          │  │ • Manual      │    │</span></span>
<span class="line"><span>                          │  └───────────────┘    │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 等待配对请求     │</span></span>
<span class="line"><span>                          │  Gateway 端显示      │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 批准配对          │</span></span>
<span class="line"><span>                          │  openclaw devices    │</span></span>
<span class="line"><span>                          │  approve &lt;requestId&gt; │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  6. 验证连接          │</span></span>
<span class="line"><span>                          │  openclaw nodes      │</span></span>
<span class="line"><span>                          │      status          │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   连接成功 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       Android 高级功能对应命令                                   │</span></span>
<span class="line"><span>├──────────────────────┬────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ 功能                  │ 命令                                                      │</span></span>
<span class="line"><span>├──────────────────────┼────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ Canvas 渲染          │ canvas.navigate / canvas.eval / canvas.snapshot         │</span></span>
<span class="line"><span>│ 摄像头               │ camera.snap (拍照) / camera.clip (录像)                 │</span></span>
<span class="line"><span>│ 联系人               │ contacts.search / contacts.add                          │</span></span>
<span class="line"><span>│ 日历                 │ calendar.events / calendar.add                         │</span></span>
<span class="line"><span>│ 通知                 │ notifications.list                                     │</span></span>
<span class="line"><span>└──────────────────────┴────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h3 id="android-canvas-使用" tabindex="-1">Android Canvas 使用 <a class="header-anchor" href="#android-canvas-使用" aria-label="Permalink to &quot;Android Canvas 使用&quot;">​</a></h3><h4 id="基础导航" tabindex="-1">基础导航 <a class="header-anchor" href="#基础导航" aria-label="Permalink to &quot;基础导航&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 局域网访问</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> canvas.navigate</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;url&quot;:&quot;http://&lt;gateway-hostname&gt;.local:18789/__openclaw__/canvas/&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Tailnet 访问</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> canvas.navigate</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;url&quot;:&quot;http://&lt;gateway-magicdns&gt;:18789/__openclaw__/canvas/&quot;}&#39;</span></span></code></pre></div><h4 id="canvas-命令" tabindex="-1">Canvas 命令 <a class="header-anchor" href="#canvas-命令" aria-label="Permalink to &quot;Canvas 命令&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 导航</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canvas.navigate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {&quot;url&quot;:&quot;&quot;}</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 返回默认脚手架</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 执行 JS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canvas.eval</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {&quot;javaScript&quot;:&quot;...&quot;}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 截图</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canvas.snapshot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {&quot;maxWidth&quot;:900,&quot;format&quot;:&quot;jpeg&quot;}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># A2UI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canvas.a2ui.push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {&quot;content&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;...&quot;}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canvas.a2ui.reset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {}</span></span></code></pre></div><hr><h3 id="android-摄像头" tabindex="-1">Android 摄像头 <a class="header-anchor" href="#android-摄像头" aria-label="Permalink to &quot;Android 摄像头&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 拍照</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> camera.snap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 录像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> camera.clip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;maxSeconds&quot;:30}&#39;</span></span></code></pre></div><blockquote><p><strong>注意</strong>：需要前台运行，背景会被暂停</p></blockquote><hr><h3 id="android-高级功能" tabindex="-1">Android 高级功能 <a class="header-anchor" href="#android-高级功能" aria-label="Permalink to &quot;Android 高级功能&quot;">​</a></h3><h4 id="联系人" tabindex="-1">联系人 <a class="header-anchor" href="#联系人" aria-label="Permalink to &quot;联系人&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索联系人</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> contacts.search</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;query&quot;:&quot;张三&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加联系人</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> contacts.add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;name&quot;:&quot;李四&quot;,&quot;phone&quot;:&quot;13800138000&quot;}&#39;</span></span></code></pre></div><h4 id="日历" tabindex="-1">日历 <a class="header-anchor" href="#日历" aria-label="Permalink to &quot;日历&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查询事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> calendar.events</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;days&quot;:7}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> calendar.add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;title&quot;:&quot;会议&quot;,&quot;startTime&quot;:&quot;2024-01-01T10:00:00Z&quot;}&#39;</span></span></code></pre></div><h4 id="通知" tabindex="-1">通知 <a class="header-anchor" href="#通知" aria-label="Permalink to &quot;通知&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出通知</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;Android Node&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> notifications.list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{}&#39;</span></span></code></pre></div><hr><h2 id="_2-10-4-跨网络连接-tailscale" tabindex="-1">2.10.4 跨网络连接（Tailscale） <a class="header-anchor" href="#_2-10-4-跨网络连接-tailscale" aria-label="Permalink to &quot;2.10.4 跨网络连接（Tailscale）&quot;">​</a></h2><h3 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>移动设备在外部网络，需要访问家庭/服务器上的 Gateway。</p><h3 id="方案-tailscale" tabindex="-1">方案：Tailscale <a class="header-anchor" href="#方案-tailscale" aria-label="Permalink to &quot;方案：Tailscale&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────┐              ┌──────────────┐</span></span>
<span class="line"><span>│   手机       │ ─ ─ ─ ─ ─ →  │   Gateway    │</span></span>
<span class="line"><span>│  (Tailscale) │   Tailnet    │  (Tailscale) │</span></span>
<span class="line"><span>└──────────────┘              └──────────────┘</span></span></code></pre></div><h3 id="配置步骤" tabindex="-1">配置步骤 <a class="header-anchor" href="#配置步骤" aria-label="Permalink to &quot;配置步骤&quot;">​</a></h3><h4 id="步骤一-安装-tailscale" tabindex="-1">步骤一：安装 Tailscale <a class="header-anchor" href="#步骤一-安装-tailscale" aria-label="Permalink to &quot;步骤一：安装 Tailscale&quot;">​</a></h4><p><strong>Gateway 端</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Linux</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://tailscale.com/install.sh</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># macOS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tailscale</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Docker</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在容器内安装或使用 host 网络</span></span></code></pre></div><p><strong>移动端</strong>：</p><p>从 App Store/Play Store 安装 Tailscale</p><h4 id="步骤二-登录" tabindex="-1">步骤二：登录 <a class="header-anchor" href="#步骤二-登录" aria-label="Permalink to &quot;步骤二：登录&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Gateway</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tailscale</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 移动端</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 打开 App 登录同一账号</span></span></code></pre></div><h4 id="步骤三-配置-gateway" tabindex="-1">步骤三：配置 Gateway <a class="header-anchor" href="#步骤三-配置-gateway" aria-label="Permalink to &quot;步骤三：配置 Gateway&quot;">​</a></h4><p>编辑 <code>~/.openclaw/openclaw.json</code>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;gateway&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;bind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tailnet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18789</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>重启 Gateway：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果使用服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openclaw</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或手动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18789</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bind</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tailnet</span></span></code></pre></div><h4 id="步骤四-获取-tailscale-ip" tabindex="-1">步骤四：获取 Tailscale IP <a class="header-anchor" href="#步骤四-获取-tailscale-ip" aria-label="Permalink to &quot;步骤四：获取 Tailscale IP&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Gateway 机器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tailscale</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -4</span></span></code></pre></div><h4 id="步骤五-移动端连接" tabindex="-1">步骤五：移动端连接 <a class="header-anchor" href="#步骤五-移动端连接" aria-label="Permalink to &quot;步骤五：移动端连接&quot;">​</a></h4><p>在移动端 App 中使用 Tailscale IP 连接：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Host: &lt;tailscale-ip&gt;</span></span>
<span class="line"><span>Port: 18789</span></span></code></pre></div><h3 id="跨网络连接流程图" tabindex="-1">跨网络连接流程图 <a class="header-anchor" href="#跨网络连接流程图" aria-label="Permalink to &quot;跨网络连接流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        跨网络连接配置流程（Tailscale）                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 安装 Tailscale   │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ Gateway 端    │  │</span></span>
<span class="line"><span>                          │  │ curl -fsSL   │  │</span></span>
<span class="line"><span>                          │  │ tailscale.com │  │</span></span>
<span class="line"><span>                          │  │ /install.sh  │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ 移动端        │  │</span></span>
<span class="line"><span>                          │  │ App Store/   │  │</span></span>
<span class="line"><span>                          │  │ Play Store   │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 登录同一账号     │</span></span>
<span class="line"><span>                          │  ┌───────────────┐   │</span></span>
<span class="line"><span>                          │  │ Gateway:     │   │</span></span>
<span class="line"><span>                          │  │ tailscale up│   │</span></span>
<span class="line"><span>                          │  │              │   │</span></span>
<span class="line"><span>                          │  │ 移动端:     │   │</span></span>
<span class="line"><span>                          │  │ 打开 App    │   │</span></span>
<span class="line"><span>                          │  │ 登录        │   │</span></span>
<span class="line"><span>                          │  └───────────────┘   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 配置 Gateway    │</span></span>
<span class="line"><span>                          │  openclaw.json:     │</span></span>
<span class="line"><span>                          │  {                 │</span></span>
<span class="line"><span>                          │    &quot;gateway&quot;: {   │</span></span>
<span class="line"><span>                          │      &quot;bind&quot;:      │</span></span>
<span class="line"><span>                          │        &quot;tailnet&quot;, │</span></span>
<span class="line"><span>                          │      &quot;port&quot;: 18789│</span></span>
<span class="line"><span>                          │    }              │</span></span>
<span class="line"><span>                          │  }                 │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 重启 Gateway     │</span></span>
<span class="line"><span>                          │  openclaw gateway   │</span></span>
<span class="line"><span>                          │  --port 18789       │</span></span>
<span class="line"><span>                          │  --bind tailnet     │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 获取 Tailscale IP│</span></span>
<span class="line"><span>                          │  tailscale ip -4    │</span></span>
<span class="line"><span>                          │  例: 100.xx.xx.xx   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  6. 移动端连接        │</span></span>
<span class="line"><span>                          │  ┌───────────────┐   │</span></span>
<span class="line"><span>                          │  │ Host: 100.xx  │   │</span></span>
<span class="line"><span>                          │  │ .xx.xx        │   │</span></span>
<span class="line"><span>                          │  │ Port: 18789   │   │</span></span>
<span class="line"><span>                          │  └───────────────┘   │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  7. 批准配对          │</span></span>
<span class="line"><span>                          │  openclaw devices    │</span></span>
<span class="line"><span>                          │  approve &lt;requestId&gt; │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   连接成功 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         Tailscale 连接架构                                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   ┌──────────────┐              ┌──────────────┐                              │</span></span>
<span class="line"><span>│   │   手机        │              │   Gateway    │                              │</span></span>
<span class="line"><span>│   │              │              │              │                              │</span></span>
<span class="line"><span>│   │  ┌────────┐  │   ┌─────┐   │  ┌────────┐  │                              │</span></span>
<span class="line"><span>│   │  │Tailscale│──┼─▶│VPN  │◀──│  │Tailscale│  │                              │</span></span>
<span class="line"><span>│   │  │  App   │  │   │隧道 │   │  │  Daemon │  │                              │</span></span>
<span class="line"><span>│   │  └────────┘  │   └─────┘   │  └────────┘  │                              │</span></span>
<span class="line"><span>│   │              │              │              │                              │</span></span>
<span class="line"><span>│   │  OpenClaw   │   WebSocket  │  OpenClaw    │                              │</span></span>
<span class="line"><span>│   │    App      │◀────────────▶│   Gateway    │                              │</span></span>
<span class="line"><span>│   └──────────────┘              └──────────────┘                              │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│   原理：Tailscale 创建加密隧道，手机通过 VPN 隧道访问 Gateway 局域网服务       │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_2-10-5-移动端命令参考" tabindex="-1">2.10.5 移动端命令参考 <a class="header-anchor" href="#_2-10-5-移动端命令参考" aria-label="Permalink to &quot;2.10.5 移动端命令参考&quot;">​</a></h2><h3 id="节点状态" tabindex="-1">节点状态 <a class="header-anchor" href="#节点状态" aria-label="Permalink to &quot;节点状态&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出所有节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 节点详情</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node.list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;{}&quot;</span></span></code></pre></div><h3 id="调用节点命令" tabindex="-1">调用节点命令 <a class="header-anchor" href="#调用节点命令" aria-label="Permalink to &quot;调用节点命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 通用格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> invoke</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --node</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;节点名称&gt;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --command</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">命令</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">名</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --params</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&lt;JSON参数&gt;&#39;</span></span></code></pre></div><h3 id="节点事件" tabindex="-1">节点事件 <a class="header-anchor" href="#节点事件" aria-label="Permalink to &quot;节点事件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 订阅节点事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> events</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">node-i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><hr><h2 id="_2-10-6-安全考虑" tabindex="-1">2.10.6 安全考虑 <a class="header-anchor" href="#_2-10-6-安全考虑" aria-label="Permalink to &quot;2.10.6 安全考虑&quot;">​</a></h2><h3 id="网络隔离" tabindex="-1">网络隔离 <a class="header-anchor" href="#网络隔离" aria-label="Permalink to &quot;网络隔离&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>✅ 推荐：</span></span>
<span class="line"><span>├── 局域网连接</span></span>
<span class="line"><span>├── Tailscale VPN</span></span>
<span class="line"><span>└── WireGuard</span></span>
<span class="line"><span></span></span>
<span class="line"><span>❌ 避免：</span></span>
<span class="line"><span>├── 暴露公网 IP</span></span>
<span class="line"><span>└── 无认证访问</span></span></code></pre></div><h3 id="token-安全" tabindex="-1">Token 安全 <a class="header-anchor" href="#token-安全" aria-label="Permalink to &quot;Token 安全&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成安全 Token</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rand</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -hex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 32</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Gateway 配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;gateway&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;mode&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;local&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;token&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;你的-token&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>iOS</strong>：配对简单，功能完整</li><li><strong>Android</strong>：功能丰富，权限管理</li><li><strong>Tailscale</strong>：跨网络连接</li><li><strong>Canvas</strong>：Web 渲染能力</li><li><strong>命令</strong>：invoke 调用节点功能</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你计划使用 iOS 还是 Android？</li><li>是否需要跨网络访问？</li><li>需要哪些节点功能？</li></ol>`,131)])])}const F=a(l,[["render",e]]);export{r as __pageData,F as default};
