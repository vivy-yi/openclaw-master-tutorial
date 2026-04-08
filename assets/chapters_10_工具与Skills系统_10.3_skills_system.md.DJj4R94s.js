import{_ as a,o as n,c as p,ae as l}from"./chunks/framework.Czhw_PXq.js";const r=JSON.parse('{"title":"5.3 Skills 系统","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/10_工具与Skills系统/10.3_skills_system.md","filePath":"chapters/10_工具与Skills系统/10.3_skills_system.md"}'),i={name:"chapters/10_工具与Skills系统/10.3_skills_system.md"};function e(t,s,c,h,o,k){return n(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="_5-3-skills-系统" tabindex="-1">5.3 Skills 系统 <a class="header-anchor" href="#_5-3-skills-系统" aria-label="Permalink to &quot;5.3 Skills 系统&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>理解 Skills 系统的架构</li><li>掌握 Skills 的工作原理</li><li>学会使用 Skills 扩展能力</li></ul><hr><h2 id="_5-3-1-什么是-skills" tabindex="-1">5.3.1 什么是 Skills <a class="header-anchor" href="#_5-3-1-什么是-skills" aria-label="Permalink to &quot;5.3.1 什么是 Skills&quot;">​</a></h2><h3 id="skills-vs-tools" tabindex="-1">Skills vs Tools <a class="header-anchor" href="#skills-vs-tools" aria-label="Permalink to &quot;Skills vs Tools&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            Skills 概念                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  Skills = 能力封装 = 提示词 + 工具 + 工作流    │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  例如：代码审查 Skill                         │</span></span>
<span class="line"><span>│  ├── 提示词：审查标准、关注点                │</span></span>
<span class="line"><span>│  ├── 工具：read、grep、exec                │</span></span>
<span class="line"><span>│  └── 工作流：读取 → 分析 → 输出             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  1800+ Skills 生态 ⭐                        │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="skills-的价值" tabindex="-1">Skills 的价值 <a class="header-anchor" href="#skills-的价值" aria-label="Permalink to &quot;Skills 的价值&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>为什么使用 Skills：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 复用专家知识</span></span>
<span class="line"><span>   ├── 代码审查标准</span></span>
<span class="line"><span>   ├── 设计模式</span></span>
<span class="line"><span>   └── 最佳实践</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 降低使用门槛</span></span>
<span class="line"><span>   ├── 无需编写复杂提示词</span></span>
<span class="line"><span>   ├── 一键启用专家能力</span></span>
<span class="line"><span>   └── 标准化输出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 组合扩展</span></span>
<span class="line"><span>   ├── Skills 可以组合</span></span>
<span class="line"><span>   ├── 支持嵌套调用</span></span>
<span class="line"><span>   └── 可定制工作流</span></span></code></pre></div><hr><h2 id="_5-3-2-skills-架构" tabindex="-1">5.3.2 Skills 架构 <a class="header-anchor" href="#_5-3-2-skills-架构" aria-label="Permalink to &quot;5.3.2 Skills 架构&quot;">​</a></h2><h3 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           Skills 架构                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  用户请求                                     │</span></span>
<span class="line"><span>│     │                                        │</span></span>
<span class="line"><span>│     ▼                                        │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │ Skill Dispatcher                        ││</span></span>
<span class="line"><span>│  │ - 匹配 Skill                            ││</span></span>
<span class="line"><span>│  │ - 解析意图                              ││</span></span>
<span class="line"><span>│  └──────────────┬──────────────────────────┘│</span></span>
<span class="line"><span>│                 │                             │</span></span>
<span class="line"><span>│                 ▼                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │ Skill Executor                          ││</span></span>
<span class="line"><span>│  │ - 组装提示词                            ││</span></span>
<span class="line"><span>│  │ - 调用工具                              ││</span></span>
<span class="line"><span>│  │ - 处理输出                              ││</span></span>
<span class="line"><span>│  └──────────────┬──────────────────────────┘│</span></span>
<span class="line"><span>│                 │                             │</span></span>
<span class="line"><span>│                 ▼                             │</span></span>
<span class="line"><span>│     返回结构化结果                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="skill-文件结构" tabindex="-1">Skill 文件结构 <a class="header-anchor" href="#skill-文件结构" aria-label="Permalink to &quot;Skill 文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>skills/</span></span>
<span class="line"><span>├── my-skill/</span></span>
<span class="line"><span>│   ├── SKILL.md          # 技能定义</span></span>
<span class="line"><span>│   ├── prompt.md         # 提示词模板</span></span>
<span class="line"><span>│   ├── tools.json        # 工具配置</span></span>
<span class="line"><span>│   └── config.yaml       # 技能配置</span></span>
<span class="line"><span>└── ...</span></span></code></pre></div><hr><h2 id="_5-3-3-skills-分类" tabindex="-1">5.3.3 Skills 分类 <a class="header-anchor" href="#_5-3-3-skills-分类" aria-label="Permalink to &quot;5.3.3 Skills 分类&quot;">​</a></h2><h3 id="按领域分类" tabindex="-1">按领域分类 <a class="header-anchor" href="#按领域分类" aria-label="Permalink to &quot;按领域分类&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>技术类 Skills：</span></span>
<span class="line"><span>├── 代码审查 (Code Review)</span></span>
<span class="line"><span>├── 代码生成 (Code Gen)</span></span>
<span class="line"><span>├── 文档生成 (Docs Gen)</span></span>
<span class="line"><span>├── 单元测试 (Unit Test)</span></span>
<span class="line"><span>├── Bug 修复 (Bug Fix)</span></span>
<span class="line"><span>└── 重构建议 (Refactor)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创意类 Skills：</span></span>
<span class="line"><span>├── 文案撰写 (Copywriting)</span></span>
<span class="line"><span>├── 故事创作 (Story Writing)</span></span>
<span class="line"><span>├── 营销策划 (Marketing)</span></span>
<span class="line"><span>├── PPT 制作 (Presentation)</span></span>
<span class="line"><span>└── 视频脚本 (Video Script)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>效率类 Skills：</span></span>
<span class="line"><span>├── 日程管理 (Calendar)</span></span>
<span class="line"><span>├── 邮件处理 (Email)</span></span>
<span class="line"><span>├── 数据分析 (Data Analysis)</span></span>
<span class="line"><span>├── 报告生成 (Report Gen)</span></span>
<span class="line"><span>└── 会议纪要 (Meeting Notes)</span></span></code></pre></div><p>![代码生成]/assets/diagrams/131_code_generation.png)</p><h3 id="按复杂度分类" tabindex="-1">按复杂度分类 <a class="header-anchor" href="#按复杂度分类" aria-label="Permalink to &quot;按复杂度分类&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>简单 Skill：</span></span>
<span class="line"><span>- 单一工具调用</span></span>
<span class="line"><span>- 简单提示词</span></span>
<span class="line"><span>- 如：天气查询</span></span>
<span class="line"><span></span></span>
<span class="line"><span>复合 Skill：</span></span>
<span class="line"><span>- 多工具组合</span></span>
<span class="line"><span>- 复杂工作流</span></span>
<span class="line"><span>- 如：代码审查</span></span>
<span class="line"><span></span></span>
<span class="line"><span>高级 Skill：</span></span>
<span class="line"><span>- 多步骤推理</span></span>
<span class="line"><span>- 条件分支</span></span>
<span class="line"><span>- 如：完整开发流程</span></span></code></pre></div><hr><h2 id="_5-3-4-skills-配置" tabindex="-1">5.3.4 Skills 配置 <a class="header-anchor" href="#_5-3-4-skills-配置" aria-label="Permalink to &quot;5.3.4 Skills 配置&quot;">​</a></h2><h3 id="启用-skills" tabindex="-1">启用 Skills <a class="header-anchor" href="#启用-skills" aria-label="Permalink to &quot;启用 Skills&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;auto_load&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;paths&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;~/.openclaw/skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;./skills&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="指定-skill" tabindex="-1">指定 Skill <a class="header-anchor" href="#指定-skill" aria-label="Permalink to &quot;指定 Skill&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;code-review&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="多-skill-组合" tabindex="-1">多 Skill 组合 <a class="header-anchor" href="#多-skill-组合" aria-label="Permalink to &quot;多 Skill 组合&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;code-review&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;unit-test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_5-3-5-skills-工作流" tabindex="-1">5.3.5 Skills 工作流 <a class="header-anchor" href="#_5-3-5-skills-工作流" aria-label="Permalink to &quot;5.3.5 Skills 工作流&quot;">​</a></h2><h3 id="执行流程" tabindex="-1">执行流程 <a class="header-anchor" href="#执行流程" aria-label="Permalink to &quot;执行流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：审查这个代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: Skill 匹配</span></span>
<span class="line"><span>  → 识别需要 code-review Skill</span></span>
<span class="line"><span>  → 加载 Skill 配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 提示词组装</span></span>
<span class="line"><span>  → 加载 code-review prompt</span></span>
<span class="line"><span>  → 注入代码内容</span></span>
<span class="line"><span>  → 添加审查标准</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 工具准备</span></span>
<span class="line"><span>  → 准备 read 工具</span></span>
<span class="line"><span>  → 准备 grep 工具</span></span>
<span class="line"><span>  → 配置工具参数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 4: 执行推理</span></span>
<span class="line"><span>  → LLM 分析代码</span></span>
<span class="line"><span>  → 逐项检查</span></span>
<span class="line"><span>  → 生成建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 5: 结果处理</span></span>
<span class="line"><span>  → 格式化输出</span></span>
<span class="line"><span>  → 添加修复建议</span></span>
<span class="line"><span>  → 返回审查报告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>返回：</span></span>
<span class="line"><span>📋 代码审查报告</span></span>
<span class="line"><span>├── 代码规范：✅ 通过</span></span>
<span class="line"><span>├── 安全性：⚠️ 发现问题</span></span>
<span class="line"><span>├── 性能：✅ 良好</span></span>
<span class="line"><span>└── 建议：3 条</span></span></code></pre></div><h3 id="上下文传递" tabindex="-1">上下文传递 <a class="header-anchor" href="#上下文传递" aria-label="Permalink to &quot;上下文传递&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>上下文包含：</span></span>
<span class="line"><span>├── 当前代码内容</span></span>
<span class="line"><span>├── 相关文件</span></span>
<span class="line"><span>├── 历史对话</span></span>
<span class="line"><span>└── 用户偏好</span></span>
<span class="line"><span></span></span>
<span class="line"><span>传递方式：</span></span>
<span class="line"><span>1. 自动注入</span></span>
<span class="line"><span>2. 按需加载</span></span>
<span class="line"><span>3. 手动指定</span></span></code></pre></div><hr><h2 id="_5-3-6-内置-skills" tabindex="-1">5.3.6 内置 Skills <a class="header-anchor" href="#_5-3-6-内置-skills" aria-label="Permalink to &quot;5.3.6 内置 Skills&quot;">​</a></h2><h3 id="常用内置-skills" tabindex="-1">常用内置 Skills <a class="header-anchor" href="#常用内置-skills" aria-label="Permalink to &quot;常用内置 Skills&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw 内置 Skills：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. code-review</span></span>
<span class="line"><span>   → 代码审查</span></span>
<span class="line"><span>   → 规范检查</span></span>
<span class="line"><span>   → 安全扫描</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. document-gen</span></span>
<span class="line"><span>   → 文档生成</span></span>
<span class="line"><span>   → README</span></span>
<span class="line"><span>   → API 文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. test-generator</span></span>
<span class="line"><span>   → 测试生成</span></span>
<span class="line"><span>   → 单元测试</span></span>
<span class="line"><span>   → 集成测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. bug-hunter</span></span>
<span class="line"><span>   → Bug 查找</span></span>
<span class="line"><span>   → 根因分析</span></span>
<span class="line"><span>   → 修复建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. git-helper</span></span>
<span class="line"><span>   → Git 操作</span></span>
<span class="line"><span>   → 提交建议</span></span>
<span class="line"><span>   → 分支管理</span></span></code></pre></div><h3 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：使用代码审查 Skill 审查这个文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>→ 加载 code-review Skill</span></span>
<span class="line"><span>→ 读取目标文件</span></span>
<span class="line"><span>→ 执行审查逻辑</span></span>
<span class="line"><span>← 返回审查结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>审查结果：</span></span>
<span class="line"><span>✅ 代码规范通过</span></span>
<span class="line"><span>⚠️ 3 个潜在问题</span></span>
<span class="line"><span>💡 5 条优化建议</span></span></code></pre></div><hr><h2 id="_5-3-7-常见问题" tabindex="-1">5.3.7 常见问题 <a class="header-anchor" href="#_5-3-7-常见问题" aria-label="Permalink to &quot;5.3.7 常见问题&quot;">​</a></h2><h3 id="q1-skill-不生效" tabindex="-1">Q1: Skill 不生效 <a class="header-anchor" href="#q1-skill-不生效" aria-label="Permalink to &quot;Q1: Skill 不生效&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>错误：Skill not found</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 Skill 名称是否正确</span></span>
<span class="line"><span>2. 确认 Skill 路径配置正确</span></span>
<span class="line"><span>3. 检查 Skill 文件格式</span></span></code></pre></div><h3 id="q2-skill-冲突" tabindex="-1">Q2: Skill 冲突 <a class="header-anchor" href="#q2-skill-冲突" aria-label="Permalink to &quot;Q2: Skill 冲突&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：多个 Skill 功能重叠</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 指定单一 Skill</span></span>
<span class="line"><span>2. 调整 Skill 优先级</span></span>
<span class="line"><span>3. 禁用冲突的 Skill</span></span></code></pre></div><h3 id="q3-skill-执行慢" tabindex="-1">Q3: Skill 执行慢 <a class="header-anchor" href="#q3-skill-执行慢" aria-label="Permalink to &quot;Q3: Skill 执行慢&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：Skill 响应慢</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 检查 Skill 复杂度</span></span>
<span class="line"><span>2. 优化工具调用</span></span>
<span class="line"><span>3. 减少上下文</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>Skills</strong>：提示词 + 工具 + 工作流的封装</li><li><strong>生态</strong>：1800+ Skills 可用</li><li><strong>价值</strong>：复用专家知识，降低门槛</li><li><strong>配置</strong>：可启用、组合、定制</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>Skills 和工具的区别是什么？</li><li>如何选择合适的 Skill？</li><li>如何组合使用多个 Skills？</li></ol>`,56)])])}const u=a(i,[["render",e]]);export{r as __pageData,u as default};
