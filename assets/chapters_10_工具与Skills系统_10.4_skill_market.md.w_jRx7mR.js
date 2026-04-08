import{_ as a,o as n,c as p,ae as i}from"./chunks/framework.Czhw_PXq.js";const k=JSON.parse('{"title":"5.4 技能市场","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/10_工具与Skills系统/10.4_skill_market.md","filePath":"chapters/10_工具与Skills系统/10.4_skill_market.md"}'),l={name:"chapters/10_工具与Skills系统/10.4_skill_market.md"};function e(t,s,h,c,o,d){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="_5-4-技能市场" tabindex="-1">5.4 技能市场 <a class="header-anchor" href="#_5-4-技能市场" aria-label="Permalink to &quot;5.4 技能市场&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>了解技能市场的生态</li><li>掌握技能搜索和安装</li><li>学会使用社区技能</li></ul><hr><h2 id="_5-4-1-技能市场概述" tabindex="-1">5.4.1 技能市场概述 <a class="header-anchor" href="#_5-4-1-技能市场概述" aria-label="Permalink to &quot;5.4.1 技能市场概述&quot;">​</a></h2><h3 id="什么是技能市场" tabindex="-1">什么是技能市场 <a class="header-anchor" href="#什么是技能市场" aria-label="Permalink to &quot;什么是技能市场&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           技能市场生态                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  OpenClaw Skills 生态：                      │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  📊 1800+ Skills ⭐                         │</span></span>
<span class="line"><span>│  ├── 技术类：800+                           │</span></span>
<span class="line"><span>│  ├── 创意类：500+                           │</span></span>
<span class="line"><span>│  └── 效率类：500+                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  🌍 全球开发者贡献                           │</span></span>
<span class="line"><span>│  ├── 开源免费                               │</span></span>
<span class="line"><span>│  ├── 社区维护                               │</span></span>
<span class="line"><span>│  └── 持续更新                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  🎯 覆盖全场景                              │</span></span>
<span class="line"><span>│  ├── 开发                                   │</span></span>
<span class="line"><span>│  ├── 设计                                   │</span></span>
<span class="line"><span>│  ├── 营销                                   │</span></span>
<span class="line"><span>│  └── 生活                                   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![Skill市场]/assets/diagrams/85_market_stats.png)</p><h3 id="访问技能市场" tabindex="-1">访问技能市场 <a class="header-anchor" href="#访问技能市场" aria-label="Permalink to &quot;访问技能市场&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>访问方式：</span></span>
<span class="line"><span>1. 网页：skills.openclaw.ai</span></span>
<span class="line"><span>2. CLI：openclaw skills list</span></span>
<span class="line"><span>3. 命令：/skills search</span></span></code></pre></div><hr><h2 id="_5-4-2-技能分类" tabindex="-1">5.4.2 技能分类 <a class="header-anchor" href="#_5-4-2-技能分类" aria-label="Permalink to &quot;5.4.2 技能分类&quot;">​</a></h2><h3 id="按领域分类" tabindex="-1">按领域分类 <a class="header-anchor" href="#按领域分类" aria-label="Permalink to &quot;按领域分类&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>技术开发类 (800+)：</span></span>
<span class="line"><span>├── 前端开发</span></span>
<span class="line"><span>│   ├── React/Next.js</span></span>
<span class="line"><span>│   ├── Vue/VuePress</span></span>
<span class="line"><span>│   └── UI 组件库</span></span>
<span class="line"><span>├── 后端开发</span></span>
<span class="line"><span>│   ├── API 设计</span></span>
<span class="line"><span>│   ├── 数据库</span></span>
<span class="line"><span>│   └── 微服务</span></span>
<span class="line"><span>├── 移动开发</span></span>
<span class="line"><span>│   ├── React Native</span></span>
<span class="line"><span>│   ├── Flutter</span></span>
<span class="line"><span>│   └── iOS/Android</span></span>
<span class="line"><span>└── DevOps</span></span>
<span class="line"><span>    ├── Docker/K8s</span></span>
<span class="line"><span>    ├── CI/CD</span></span>
<span class="line"><span>    └── 监控</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创意设计类 (500+)：</span></span>
<span class="line"><span>├── 平面设计</span></span>
<span class="line"><span>├── UI/UX 设计</span></span>
<span class="line"><span>├── 品牌设计</span></span>
<span class="line"><span>└── 视频制作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>效率办公类 (500+)：</span></span>
<span class="line"><span>├── 文档处理</span></span>
<span class="line"><span>├── 数据分析</span></span>
<span class="line"><span>├── 项目管理</span></span>
<span class="line"><span>└── 营销推广</span></span></code></pre></div><p>![Skill市场]/assets/diagrams/85_market_stats.png)</p><h3 id="热门技能" tabindex="-1">热门技能 <a class="header-anchor" href="#热门技能" aria-label="Permalink to &quot;热门技能&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Top 10 最受欢迎 Skills：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. code-review - 代码审查</span></span>
<span class="line"><span>2. unit-test-gen - 单元测试生成</span></span>
<span class="line"><span>3. bug-fix - Bug 修复</span></span>
<span class="line"><span>4. api-design - API 设计</span></span>
<span class="line"><span>5. docs-gen - 文档生成</span></span>
<span class="line"><span>6. sql-builder - SQL 构建</span></span>
<span class="line"><span>7. regex-gen - 正则生成</span></span>
<span class="line"><span>8. shell-helper - Shell 助手</span></span>
<span class="line"><span>9. git-helper - Git 助手</span></span>
<span class="line"><span>10. markdown-editor - Markdown 编辑</span></span></code></pre></div><hr><h2 id="_5-4-3-技能搜索" tabindex="-1">5.4.3 技能搜索 <a class="header-anchor" href="#_5-4-3-技能搜索" aria-label="Permalink to &quot;5.4.3 技能搜索&quot;">​</a></h2><h3 id="cli-搜索" tabindex="-1">CLI 搜索 <a class="header-anchor" href="#cli-搜索" aria-label="Permalink to &quot;CLI 搜索&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 搜索技能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code-review</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列出所有技能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看技能详情</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code-review</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看分类</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> categories</span></span></code></pre></div><h3 id="关键词搜索" tabindex="-1">关键词搜索 <a class="header-anchor" href="#关键词搜索" aria-label="Permalink to &quot;关键词搜索&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>搜索技巧：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 精确匹配</span></span>
<span class="line"><span>   code-review</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 关键词组合</span></span>
<span class="line"><span>   api design</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 分类筛选</span></span>
<span class="line"><span>   category:frontend</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 评分筛选</span></span>
<span class="line"><span>   rating:&gt;4.5</span></span></code></pre></div><h3 id="筛选条件" tabindex="-1">筛选条件 <a class="header-anchor" href="#筛选条件" aria-label="Permalink to &quot;筛选条件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>筛选选项：</span></span>
<span class="line"><span>├── 分类：category</span></span>
<span class="line"><span>├── 评分：rating</span></span>
<span class="line"><span>├── 下载量：downloads</span></span>
<span class="line"><span>├── 更新：updated</span></span>
<span class="line"><span>├── 免费/付费：price</span></span>
<span class="line"><span>└── 语言：language</span></span></code></pre></div><hr><h2 id="_5-4-4-技能安装" tabindex="-1">5.4.4 技能安装 <a class="header-anchor" href="#_5-4-4-技能安装" aria-label="Permalink to &quot;5.4.4 技能安装&quot;">​</a></h2><h3 id="安装命令" tabindex="-1">安装命令 <a class="header-anchor" href="#安装命令" aria-label="Permalink to &quot;安装命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装技能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code-review</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code-review@1.2.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 从 URL 安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/xxx/skill</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 批量安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skills.txt</span></span></code></pre></div><h3 id="安装流程" tabindex="-1">安装流程 <a class="header-anchor" href="#安装流程" aria-label="Permalink to &quot;安装流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>安装步骤：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 下载技能包</span></span>
<span class="line"><span>   → 获取 SKILL.md、工具配置等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 验证完整性</span></span>
<span class="line"><span>   → 检查必要文件</span></span>
<span class="line"><span>   → 验证签名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 安装到本地</span></span>
<span class="line"><span>   → 复制到 skills 目录</span></span>
<span class="line"><span>   → 注册到系统</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 测试运行</span></span>
<span class="line"><span>   → 执行示例命令</span></span>
<span class="line"><span>   → 验证功能</span></span></code></pre></div><h3 id="本地管理" tabindex="-1">本地管理 <a class="header-anchor" href="#本地管理" aria-label="Permalink to &quot;本地管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>本地技能目录：</span></span>
<span class="line"><span>~/.openclaw/skills/</span></span>
<span class="line"><span>├── code-review/</span></span>
<span class="line"><span>├── unit-test-gen/</span></span>
<span class="line"><span>└── custom-skill/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>管理命令：</span></span>
<span class="line"><span>├── 列出本地：openclaw skills local</span></span>
<span class="line"><span>├── 更新：openclaw skills update</span></span>
<span class="line"><span>├── 删除：openclaw skills remove</span></span>
<span class="line"><span>└── 导出：openclaw skills export</span></span></code></pre></div><hr><h2 id="_5-4-5-技能使用" tabindex="-1">5.4.5 技能使用 <a class="header-anchor" href="#_5-4-5-技能使用" aria-label="Permalink to &quot;5.4.5 技能使用&quot;">​</a></h2><h3 id="在对话中使用" tabindex="-1">在对话中使用 <a class="header-anchor" href="#在对话中使用" aria-label="Permalink to &quot;在对话中使用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>使用方式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：@code-review /path/to/file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>或</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户：使用代码审查技能</span></span>
<span class="line"><span>→ 自动匹配最佳 Skill</span></span>
<span class="line"><span>← 返回审查结果</span></span></code></pre></div><h3 id="配置默认技能" tabindex="-1">配置默认技能 <a class="header-anchor" href="#配置默认技能" aria-label="Permalink to &quot;配置默认技能&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;default_skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;code-review&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;git-helper&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="技能组合" tabindex="-1">技能组合 <a class="header-anchor" href="#技能组合" aria-label="Permalink to &quot;技能组合&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;workflow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;code-review&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;unit-test-gen&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;docs-gen&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_5-4-6-技能评分与评价" tabindex="-1">5.4.6 技能评分与评价 <a class="header-anchor" href="#_5-4-6-技能评分与评价" aria-label="Permalink to &quot;5.4.6 技能评分与评价&quot;">​</a></h2><h3 id="评分系统" tabindex="-1">评分系统 <a class="header-anchor" href="#评分系统" aria-label="Permalink to &quot;评分系统&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>评分维度：</span></span>
<span class="line"><span>├── 功能完整性：功能是否齐全</span></span>
<span class="line"><span>├── 使用体验：操作是否流畅</span></span>
<span class="line"><span>├── 文档质量：说明是否清晰</span></span>
<span class="line"><span>├── 维护活跃度：更新是否及时</span></span>
<span class="line"><span>└── 社区支持：问题响应速度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>评分等级：</span></span>
<span class="line"><span>⭐⭐⭐⭐⭐ 优秀</span></span>
<span class="line"><span>⭐⭐⭐⭐ 良好</span></span>
<span class="line"><span>⭐⭐⭐ 一般</span></span>
<span class="line"><span>⭐⭐ 待改进</span></span>
<span class="line"><span>⭐ 差</span></span></code></pre></div><h3 id="评价方法" tabindex="-1">评价方法 <a class="header-anchor" href="#评价方法" aria-label="Permalink to &quot;评价方法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户可以：</span></span>
<span class="line"><span>1. 评分（1-5 星）</span></span>
<span class="line"><span>2. 评价（文字反馈）</span></span>
<span class="line"><span>3. 报告问题</span></span>
<span class="line"><span>4. 提出建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>评价内容：</span></span>
<span class="line"><span>- 功能是否符合描述</span></span>
<span class="line"><span>- 使用中遇到的问题</span></span>
<span class="line"><span>- 改进建议</span></span></code></pre></div><hr><h2 id="_5-4-7-常见问题" tabindex="-1">5.4.7 常见问题 <a class="header-anchor" href="#_5-4-7-常见问题" aria-label="Permalink to &quot;5.4.7 常见问题&quot;">​</a></h2><h3 id="q1-技能安装失败" tabindex="-1">Q1: 技能安装失败 <a class="header-anchor" href="#q1-技能安装失败" aria-label="Permalink to &quot;Q1: 技能安装失败&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Install failed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查网络连接</span></span>
<span class="line"><span>2. 确认技能存在</span></span>
<span class="line"><span>3. 验证权限</span></span>
<span class="line"><span>4. 查看错误日志</span></span></code></pre></div><h3 id="q2-技能不兼容" tabindex="-1">Q2: 技能不兼容 <a class="header-anchor" href="#q2-技能不兼容" aria-label="Permalink to &quot;Q2: 技能不兼容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Incompatible skill version</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 OpenClaw 版本</span></span>
<span class="line"><span>2. 安装兼容版本</span></span>
<span class="line"><span>3. 更新 OpenClaw</span></span></code></pre></div><h3 id="q3-技能加载慢" tabindex="-1">Q3: 技能加载慢 <a class="header-anchor" href="#q3-技能加载慢" aria-label="Permalink to &quot;Q3: 技能加载慢&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：技能加载慢</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 使用本地缓存</span></span>
<span class="line"><span>2. 预加载常用技能</span></span>
<span class="line"><span>3. 优化网络</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>技能市场</strong>：1800+ Skills 可用</li><li><strong>分类</strong>：技术、创意、效率三大类</li><li><strong>搜索</strong>：CLI 和网页搜索</li><li><strong>安装</strong>：一键安装，持续更新</li><li><strong>评价</strong>：评分系统保障质量</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你找到了哪些有用的技能？</li><li>如何评估技能的质量？</li><li>技能市场和插件市场有什么区别？</li></ol>`,61)])])}const g=a(l,[["render",e]]);export{k as __pageData,g as default};
