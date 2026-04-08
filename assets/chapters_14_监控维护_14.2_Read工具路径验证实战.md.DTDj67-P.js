import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"14.2 Read 工具路径验证实战","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/14_监控维护/14.2_Read工具路径验证实战.md","filePath":"chapters/14_监控维护/14.2_Read工具路径验证实战.md"}'),l={name:"chapters/14_监控维护/14.2_Read工具路径验证实战.md"};function e(t,s,h,o,k,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_14-2-read-工具路径验证实战" tabindex="-1">14.2 Read 工具路径验证实战 <a class="header-anchor" href="#_14-2-read-工具路径验证实战" aria-label="Permalink to &quot;14.2 Read 工具路径验证实战&quot;">​</a></h1><blockquote><p><strong>难度</strong>：中级 <strong>预计阅读时间</strong>：15 分钟 <strong>来源</strong>：GitHub Issues <a href="https://github.com/openclaw/openclaw/issues/60550" target="_blank" rel="noreferrer">#60550</a>、<a href="https://github.com/openclaw/openclaw/issues/60554" target="_blank" rel="noreferrer">#60554</a><strong>版本</strong>：v1.0 | 2026-04-06</p></blockquote><hr><h2 id="一、问题概述" tabindex="-1">一、问题概述 <a class="header-anchor" href="#一、问题概述" aria-label="Permalink to &quot;一、问题概述&quot;">​</a></h2><h3 id="_1-1-典型现象" tabindex="-1">1.1 典型现象 <a class="header-anchor" href="#_1-1-典型现象" aria-label="Permalink to &quot;1.1 典型现象&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Read 工具路径问题场景                         │</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                │</span></span>
<span class="line"><span>│  现象1：路径验证遗漏 filePath 别名                           │</span></span>
<span class="line"><span>│    → 使用 filePath 参数报错，提示&quot;未知参数&quot;                   │</span></span>
<span class="line"><span>│    → read(path=&quot;...&quot;) 正常，read(filePath=&quot;...&quot;) 报错       │</span></span>
<span class="line"><span>│    → 来源：Issue #60550                                      │</span></span>
<span class="line"><span>│                                                                │</span></span>
<span class="line"><span>│  现象2：路径验证修复后两端不一致                             │</span></span>
<span class="line"><span>│    → LLM 工具描述支持 filePath                              │</span></span>
<span class="line"><span>│    → 实际执行层只认 path，不认 filePath                     │</span></span>
<span class="line"><span>│    → 来源：Issue #60554                                      │</span></span>
<span class="line"><span>│                                                                │</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-问题本质" tabindex="-1">1.2 问题本质 <a class="header-anchor" href="#_1-2-问题本质" aria-label="Permalink to &quot;1.2 问题本质&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw Read 工具支持两种路径参数：</span></span>
<span class="line"><span>  • path（官方标准参数名）</span></span>
<span class="line"><span>  • filePath（别名，部分文档使用）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>理想情况：path = filePath，内部统一处理</span></span>
<span class="line"><span>实际情况：LLM 工具 schema 定义了 filePath，但执行层只处理 path</span></span></code></pre></div><hr><h2 id="二、排查步骤" tabindex="-1">二、排查步骤 <a class="header-anchor" href="#二、排查步骤" aria-label="Permalink to &quot;二、排查步骤&quot;">​</a></h2><h3 id="_2-1-步骤一-确认参数名是否正确" tabindex="-1">2.1 步骤一：确认参数名是否正确 <a class="header-anchor" href="#_2-1-步骤一-确认参数名是否正确" aria-label="Permalink to &quot;2.1 步骤一：确认参数名是否正确&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 read 工具的官方参数定义</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 OpenClaw 配置中查看工具 schema</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.openclaw/openclaw.json</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> jq</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;.tools.read&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 预期输出应包含 path 参数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;read&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;parameters&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;type&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;object&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;properties&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      &quot;path&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;type&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;string&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      &quot;limit&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;type&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;number&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>注意</strong>：<code>filePath</code> 不是官方参数名，应使用 <code>path</code>。</p><h3 id="_2-2-步骤二-验证路径是否可访问" tabindex="-1">2.2 步骤二：验证路径是否可访问 <a class="header-anchor" href="#_2-2-步骤二-验证路径是否可访问" aria-label="Permalink to &quot;2.2 步骤二：验证路径是否可访问&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 直接测试 read 工具</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 OpenClaw 中执行：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># read path=&quot;~/.openclaw/openclaw.json&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果报错，检查路径格式</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 正确格式：~/.openclaw/openclaw.json</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 错误格式：~/openclaw/openclaw.json（缺少点）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 错误格式：$HOME/openclaw/openclaw.json（$HOME 不会被展开）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 绝对路径测试</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;/Users/d/.openclaw/openclaw.json&quot;</span></span></code></pre></div><h3 id="_2-3-步骤三-检查路径解析行为" tabindex="-1">2.3 步骤三：检查路径解析行为 <a class="header-anchor" href="#_2-3-步骤三-检查路径解析行为" aria-label="Permalink to &quot;2.3 步骤三：检查路径解析行为&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw 路径解析优先级：</span></span>
<span class="line"><span>  1. 绝对路径 → 直接使用</span></span>
<span class="line"><span>  2. ~ 开头 → 展开为 $HOME</span></span>
<span class="line"><span>  3. 相对路径 → 相对于 workspace 目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>常见错误：</span></span>
<span class="line"><span>  ❌ read path=&quot;~/Documents/file.txt&quot;</span></span>
<span class="line"><span>     → 实际查找：当前目录下的 ~/Documents/file.txt</span></span>
<span class="line"><span>     → 不会展开 ~</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ✅ read path=&quot;/Users/d/Documents/file.txt&quot;</span></span>
<span class="line"><span>     → 直接访问绝对路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ✅ read path=&quot;~/Documents/file.txt&quot;</span></span>
<span class="line"><span>     → 在支持 ~ 展开的 shell 中执行时有效</span></span>
<span class="line"><span>     → 但通过 OpenClaw read 工具调用时，~ 不会自动展开</span></span></code></pre></div><hr><h2 id="三、修复方案" tabindex="-1">三、修复方案 <a class="header-anchor" href="#三、修复方案" aria-label="Permalink to &quot;三、修复方案&quot;">​</a></h2><h3 id="_3-1-方案一-统一使用-path-参数" tabindex="-1">3.1 方案一：统一使用 path 参数 <a class="header-anchor" href="#_3-1-方案一-统一使用-path-参数" aria-label="Permalink to &quot;3.1 方案一：统一使用 path 参数&quot;">​</a></h3><p><strong>原则</strong>：始终使用 <code>path</code> 作为参数名，不使用 <code>filePath</code>。</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 正确用法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read path=&quot;~/.openclaw/openclaw.json&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read path=&quot;/Users/d/Documents/project/README.md&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read path=&quot;./config.yaml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 错误用法（不要用）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read filePath=&quot;~/.openclaw/openclaw.json&quot;   ❌</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read filepath=&quot;~/.openclaw/openclaw.json&quot;   ❌</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read f=&quot;~/.openclaw/openclaw.json&quot;         ❌</span></span></code></pre></div><h3 id="_3-2-方案二-处理路径中的特殊字符" tabindex="-1">3.2 方案二：处理路径中的特殊字符 <a class="header-anchor" href="#_3-2-方案二-处理路径中的特殊字符" aria-label="Permalink to &quot;3.2 方案二：处理路径中的特殊字符&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 路径含空格时需要转义</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;/Users/d/My Documents/file.txt&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 空格可能导致问题</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;/Users/d/My\\ Documents/file.txt&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 转义空格</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 中文路径处理</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path=&quot;/Users/d/文档/project.md&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # 通常可正常工作</span></span></code></pre></div><h3 id="_3-3-方案三-检查-workspace-配置" tabindex="-1">3.3 方案三：检查 workspace 配置 <a class="header-anchor" href="#_3-3-方案三-检查-workspace-配置" aria-label="Permalink to &quot;3.3 方案三：检查 workspace 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// openclaw.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;default_path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw/workspace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;allowed_paths&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;~/.openclaw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;~/Documents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;/tmp&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="四、预防措施" tabindex="-1">四、预防措施 <a class="header-anchor" href="#四、预防措施" aria-label="Permalink to &quot;四、预防措施&quot;">​</a></h2><h3 id="_4-1-配置路径白名单" tabindex="-1">4.1 配置路径白名单 <a class="header-anchor" href="#_4-1-配置路径白名单" aria-label="Permalink to &quot;4.1 配置路径白名单&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;tools&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;allowed_paths&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.openclaw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/Documents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;denied_paths&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;~/.ssh&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/etc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-2-日志审计路径访问" tabindex="-1">4.2 日志审计路径访问 <a class="header-anchor" href="#_4-2-日志审计路径访问" aria-label="Permalink to &quot;4.2 日志审计路径访问&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>建议在 ~/.openclaw/workspace/ 下建立访问日志：</span></span>
<span class="line"><span>  logs/</span></span>
<span class="line"><span>    2026-04-06-read-access.log</span></span></code></pre></div><hr><h2 id="五、参数名不一致的根因分析" tabindex="-1">五、参数名不一致的根因分析 <a class="header-anchor" href="#五、参数名不一致的根因分析" aria-label="Permalink to &quot;五、参数名不一致的根因分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              LLM 工具 Schema vs 执行层参数不匹配问题              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  LLM 工具 schema（LLM 看到并调用的）                             │</span></span>
<span class="line"><span>│    parameters.path = string                                     │</span></span>
<span class="line"><span>│    description = &quot;文件路径（支持 path 和 filePath）&quot;             │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  执行层（实际运行的代码）                                        │</span></span>
<span class="line"><span>│    只读取 params.path                                         │</span></span>
<span class="line"><span>│    不读取 params.filePath                                      │</span></span>
<span class="line"><span>│    → 遗漏了对 filePath 的兼容处理                              │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  结果：                                                        │</span></span>
<span class="line"><span>│    用户/Agent 看到 filePath 可用（schema 里写了）               │</span></span>
<span class="line"><span>│    但实际执行时报错（代码里没处理 filePath）                    │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  正确做法：                                                    │</span></span>
<span class="line"><span>│    schema 和执行层必须同步更新                                   │</span></span>
<span class="line"><span>│    schema 改了参数名 → 执行层也要同步修改                       │</span></span>
<span class="line"><span>│    → Issue #60550 修复的就是这个问题                           │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="六、参考链接" tabindex="-1">六、参考链接 <a class="header-anchor" href="#六、参考链接" aria-label="Permalink to &quot;六、参考链接&quot;">​</a></h2><ul><li>Issue <a href="https://github.com/openclaw/openclaw/issues/60550" target="_blank" rel="noreferrer">#60550 - Read工具路径验证遗漏filePath别名</a></li><li>Issue <a href="https://github.com/openclaw/openclaw/issues/60554" target="_blank" rel="noreferrer">#60554 - Read工具路径验证修复</a></li><li><a href="./../10_工具与Skills系统/5.2_builtin_tools.html">read 工具文档</a></li></ul><hr><p><em>本教程基于 GitHub Issues 实战经验整理</em></p>`,40)])])}const u=a(l,[["render",e]]);export{d as __pageData,u as default};
