import{_ as s,o as n,c as p,ae as e}from"./chunks/framework.Czhw_PXq.js";const u=JSON.parse('{"title":"3.2 发出第一条指令","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/03_Agent运行循环/3.2_first_command.md","filePath":"chapters/03_Agent运行循环/3.2_first_command.md"}'),l={name:"chapters/03_Agent运行循环/3.2_first_command.md"};function i(t,a,c,o,h,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="_3-2-发出第一条指令" tabindex="-1">3.2 发出第一条指令 <a class="header-anchor" href="#_3-2-发出第一条指令" aria-label="Permalink to &quot;3.2 发出第一条指令&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握基础对话方法</li><li>理解工具调用</li><li>完成首次交互</li></ul><hr><h2 id="_3-2-1-对话方式" tabindex="-1">3.2.1 对话方式 <a class="header-anchor" href="#_3-2-1-对话方式" aria-label="Permalink to &quot;3.2.1 对话方式&quot;">​</a></h2><h3 id="cli-对话" tabindex="-1">CLI 对话 <a class="header-anchor" href="#cli-对话" aria-label="Permalink to &quot;CLI 对话&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动对话</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或使用 gateway</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 然后在 Web UI 中对话</span></span></code></pre></div><h3 id="web-ui-对话" tabindex="-1">Web UI 对话 <a class="header-anchor" href="#web-ui-对话" aria-label="Permalink to &quot;Web UI 对话&quot;">​</a></h3><p>访问：<code>http://127.0.0.1:18789/</code></p><h3 id="im-平台对话" tabindex="-1">IM 平台对话 <a class="header-anchor" href="#im-平台对话" aria-label="Permalink to &quot;IM 平台对话&quot;">​</a></h3><p>接入飞书/Telegram 后可直接在对应平台对话。</p><hr><h2 id="_3-2-2-基础对话示例" tabindex="-1">3.2.2 基础对话示例 <a class="header-anchor" href="#_3-2-2-基础对话示例" aria-label="Permalink to &quot;3.2.2 基础对话示例&quot;">​</a></h2><h3 id="示例一-简单问候" tabindex="-1">示例一：简单问候 <a class="header-anchor" href="#示例一-简单问候" aria-label="Permalink to &quot;示例一：简单问候&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 你好</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw: 你好！我是你的 AI 助手。我可以帮助你：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📁 文件操作 - 搜索、读取、创建文件</span></span>
<span class="line"><span>🌐 网页浏览 - 搜索信息、访问网页</span></span>
<span class="line"><span>📅 日历管理 - 创建提醒、查看日程</span></span>
<span class="line"><span>💻 命令执行 - 运行系统命令</span></span>
<span class="line"><span>📝 文档处理 - 写报告、整理资料</span></span>
<span class="line"><span></span></span>
<span class="line"><span>有什么我可以帮你的吗？</span></span></code></pre></div><h3 id="示例二-文件操作" tabindex="-1">示例二：文件操作 <a class="header-anchor" href="#示例二-文件操作" aria-label="Permalink to &quot;示例二：文件操作&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 帮我看看桌面上有什么文件</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw: [正在查看桌面文件...]</span></span>
<span class="line"><span>📁 找到以下文件：</span></span>
<span class="line"><span>   - document.pdf</span></span>
<span class="line"><span>   - screenshot.png</span></span>
<span class="line"><span>   - notes.txt</span></span>
<span class="line"><span>   - project/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需要我对这些文件进行什么操作？</span></span></code></pre></div><h3 id="示例三-网页搜索" tabindex="-1">示例三：网页搜索 <a class="header-anchor" href="#示例三-网页搜索" aria-label="Permalink to &quot;示例三：网页搜索&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 搜索一下最新的AI新闻</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw: [正在搜索...]</span></span>
<span class="line"><span>🔍 找到以下新闻：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. OpenAI 发布 GPT-5 预览版</span></span>
<span class="line"><span>   - 来源: OpenAI Blog</span></span>
<span class="line"><span>   - 时间: 2024-01-15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Claude 3.5 发布重大更新</span></span>
<span class="line"><span>   - 来源: Anthropic</span></span>
<span class="line"><span>   - 时间: 2024-01-14</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Google 发布 Gemini 2.0</span></span>
<span class="line"><span>   - 来源: Google AI</span></span>
<span class="line"><span>   - 时间: 2024-01-13</span></span>
<span class="line"><span>...</span></span></code></pre></div><hr><h2 id="_3-2-3-工具调用示例" tabindex="-1">3.2.3 工具调用示例 <a class="header-anchor" href="#_3-2-3-工具调用示例" aria-label="Permalink to &quot;3.2.3 工具调用示例&quot;">​</a></h2><h3 id="内置工具" tabindex="-1">内置工具 <a class="header-anchor" href="#内置工具" aria-label="Permalink to &quot;内置工具&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>工具名称          功能</span></span>
<span class="line"><span>─────────────────────────────────</span></span>
<span class="line"><span>read             读取文件/目录</span></span>
<span class="line"><span>write            写入/创建文件</span></span>
<span class="line"><span>exec             执行系统命令</span></span>
<span class="line"><span>browser          浏览器自动化</span></span>
<span class="line"><span>web              网络请求</span></span>
<span class="line"><span>calendar         日历操作</span></span>
<span class="line"><span>email            邮件操作</span></span></code></pre></div><h3 id="工具调用过程" tabindex="-1">工具调用过程 <a class="header-anchor" href="#工具调用过程" aria-label="Permalink to &quot;工具调用过程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: &quot;帮我创建一个文件&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ Step 1: 意图理解                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ LLM 分析：用户想要创建新文件                    │</span></span>
<span class="line"><span>│ 需要调用 write 工具                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ Step 2: 参数准备                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ 工具: write                                 │</span></span>
<span class="line"><span>│ 参数:                                        │</span></span>
<span class="line"><span>│   - path: &quot;~/new_file.txt&quot;                 │</span></span>
<span class="line"><span>│   - content: &quot;&quot; (用户未提供内容)            │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ Step 3: 询问确认                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ OpenClaw: &quot;请告诉我文件内容是什么？&quot;          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_3-2-4-复杂任务示例" tabindex="-1">3.2.4 复杂任务示例 <a class="header-anchor" href="#_3-2-4-复杂任务示例" aria-label="Permalink to &quot;3.2.4 复杂任务示例&quot;">​</a></h2><h3 id="示例-整理下载文件夹" tabindex="-1">示例：整理下载文件夹 <a class="header-anchor" href="#示例-整理下载文件夹" aria-label="Permalink to &quot;示例：整理下载文件夹&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 帮我整理一下下载文件夹</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw 分析：</span></span>
<span class="line"><span>├── 用户想要整理下载文件夹</span></span>
<span class="line"><span>├── 需要：读取目录 → 分析文件 → 分类 → 移动</span></span>
<span class="line"><span>└── 执行步骤：</span></span>
<span class="line"><span>    1. 读取 ~/Downloads/</span></span>
<span class="line"><span>    2. 分析文件类型</span></span>
<span class="line"><span>    3. 创建分类目录</span></span>
<span class="line"><span>    4. 移动文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1: 读取目录</span></span>
<span class="line"><span>📁 ~/Downloads/</span></span>
<span class="line"><span>├── document.pdf (2.3MB)</span></span>
<span class="line"><span>├── image.png (1.5MB)</span></span>
<span class="line"><span>├── archive.zip (500MB)</span></span>
<span class="line"><span>├── video.mp4 (150MB)</span></span>
<span class="line"><span>├── data.xlsx (500KB)</span></span>
<span class="line"><span>└── ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2: 分析文件</span></span>
<span class="line"><span>📊 文件分类：</span></span>
<span class="line"><span>├── 文档 (3): PDF, DOCX, TXT</span></span>
<span class="line"><span>├── 图片 (5): PNG, JPG, GIF</span></span>
<span class="line"><span>├── 视频 (2): MP4, MOV</span></span>
<span class="line"><span>├── 压缩包 (3): ZIP, RAR, 7Z</span></span>
<span class="line"><span>└── 其他 (10): ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3: 创建分类目录</span></span>
<span class="line"><span>✓ 创建 ~/Downloads/文档/</span></span>
<span class="line"><span>✓ 创建 ~/Downloads/图片/</span></span>
<span class="line"><span>✓ 创建 ~/Downloads/视频/</span></span>
<span class="line"><span>✓ 创建 ~/Downloads/压缩包/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 4: 移动文件</span></span>
<span class="line"><span>✓ 移动 document.pdf → 文档/</span></span>
<span class="line"><span>✓ 移动 image.png → 图片/</span></span>
<span class="line"><span>✓ 移动 video.mp4 → 视频/</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>完成！整理结果：</span></span>
<span class="line"><span>├── 📁 文档/ (3个文件)</span></span>
<span class="line"><span>├── 📁 图片/ (5个文件)</span></span>
<span class="line"><span>├── 📁 视频/ (2个文件)</span></span>
<span class="line"><span>├── 📁 压缩包/ (3个文件)</span></span>
<span class="line"><span>└── 📁 其他/ (10个文件)</span></span></code></pre></div><hr><h2 id="_3-2-5-自然语言理解" tabindex="-1">3.2.5 自然语言理解 <a class="header-anchor" href="#_3-2-5-自然语言理解" aria-label="Permalink to &quot;3.2.5 自然语言理解&quot;">​</a></h2><h3 id="模糊指令" tabindex="-1">模糊指令 <a class="header-anchor" href="#模糊指令" aria-label="Permalink to &quot;模糊指令&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 那个文件</span></span></code></pre></div><p>OpenClaw 会：</p><ol><li>尝试理解&quot;那个文件&quot;指什么</li><li>根据上下文推断</li><li>如果无法确定，会询问确认</li></ol><h3 id="明确指令" tabindex="-1">明确指令 <a class="header-anchor" href="#明确指令" aria-label="Permalink to &quot;明确指令&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 打开桌面上最新的PDF文件</span></span></code></pre></div><p>OpenClaw 会：</p><ol><li>搜索桌面 PDF 文件</li><li>按修改时间排序</li><li>打开最新的文件</li></ol><hr><h2 id="_3-2-6-对话上下文" tabindex="-1">3.2.6 对话上下文 <a class="header-anchor" href="#_3-2-6-对话上下文" aria-label="Permalink to &quot;3.2.6 对话上下文&quot;">​</a></h2><h3 id="单轮对话" tabindex="-1">单轮对话 <a class="header-anchor" href="#单轮对话" aria-label="Permalink to &quot;单轮对话&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 你好</span></span>
<span class="line"><span>OpenClaw: 你好！</span></span></code></pre></div><h3 id="多轮对话" tabindex="-1">多轮对话 <a class="header-anchor" href="#多轮对话" aria-label="Permalink to &quot;多轮对话&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 帮我找一下发票</span></span>
<span class="line"><span>OpenClaw: 找到以下发票文件：</span></span>
<span class="line"><span>  - 2024-01-发票.pdf</span></span>
<span class="line"><span>  - 2024-02-发票.pdf</span></span>
<span class="line"><span>  - 2023-12-发票.pdf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户: 打开最新的那个</span></span>
<span class="line"><span>OpenClaw: [打开 2024-02-发票.pdf]</span></span></code></pre></div><h3 id="上下文记忆" tabindex="-1">上下文记忆 <a class="header-anchor" href="#上下文记忆" aria-label="Permalink to &quot;上下文记忆&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 总结一下这个文档</span></span>
<span class="line"><span>OpenClaw: [读取文档]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户: 翻译成英文</span></span>
<span class="line"><span>OpenClaw: [基于上一轮文档内容翻译]</span></span></code></pre></div><hr><h2 id="_3-2-7-错误处理" tabindex="-1">3.2.7 错误处理 <a class="header-anchor" href="#_3-2-7-错误处理" aria-label="Permalink to &quot;3.2.7 错误处理&quot;">​</a></h2><h3 id="权限不足" tabindex="-1">权限不足 <a class="header-anchor" href="#权限不足" aria-label="Permalink to &quot;权限不足&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 执行 sudo rm -rf /</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenClaw: ⚠️ 抱歉，我不能执行这个命令。</span></span>
<span class="line"><span>这是一个危险操作，可能会导致系统损坏。</span></span>
<span class="line"><span>如果你确实需要删除文件，请告诉我具体要删除的文件路径。</span></span></code></pre></div><h3 id="文件不存在" tabindex="-1">文件不存在 <a class="header-anchor" href="#文件不存在" aria-label="Permalink to &quot;文件不存在&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 打开不存在的文件.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenClaw: ⚠️ 文件 &quot;不存在的文件.txt&quot; 不存在。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>可能的原因：</span></span>
<span class="line"><span>- 文件名拼写错误</span></span>
<span class="line"><span>- 文件已被删除或移动</span></span>
<span class="line"><span>- 不在该目录下</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需要我帮你搜索这个文件吗？</span></span></code></pre></div><h3 id="api-错误" tabindex="-1">API 错误 <a class="header-anchor" href="#api-错误" aria-label="Permalink to &quot;API 错误&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>OpenClaw: ⚠️ 遇到了 API 错误。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>错误信息：Rate limit exceeded</span></span>
<span class="line"><span>请稍后重试，或更换 API Key。</span></span></code></pre></div><hr><h2 id="_3-2-8-实战练习" tabindex="-1">3.2.8 实战练习 <a class="header-anchor" href="#_3-2-8-实战练习" aria-label="Permalink to &quot;3.2.8 实战练习&quot;">​</a></h2><h3 id="练习一-文件操作" tabindex="-1">练习一：文件操作 <a class="header-anchor" href="#练习一-文件操作" aria-label="Permalink to &quot;练习一：文件操作&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 让 OpenClaw 列出你桌面上的文件</span></span>
<span class="line"><span>2. 创建一个新文件</span></span>
<span class="line"><span>3. 读取刚创建的文件</span></span></code></pre></div><h3 id="练习二-信息搜索" tabindex="-1">练习二：信息搜索 <a class="header-anchor" href="#练习二-信息搜索" aria-label="Permalink to &quot;练习二：信息搜索&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 让 OpenClaw 搜索一个你感兴趣的话题</span></span>
<span class="line"><span>2. 让它总结搜索结果</span></span>
<span class="line"><span>3. 创建一个文件保存结果</span></span></code></pre></div><h3 id="练习三-复杂任务" tabindex="-1">练习三：复杂任务 <a class="header-anchor" href="#练习三-复杂任务" aria-label="Permalink to &quot;练习三：复杂任务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 整理你的下载文件夹</span></span>
<span class="line"><span>2. 按类型分类文件</span></span>
<span class="line"><span>3. 统计各类文件数量</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>对话方式</strong>：CLI、Web UI、IM 平台</li><li><strong>工具调用</strong>：read、write、exec、browser 等</li><li><strong>复杂任务</strong>：自动分解步骤执行</li><li><strong>上下文理解</strong>：多轮对话、记忆上下文</li><li><strong>错误处理</strong>：权限、文件不存在、API 错误</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你成功发出了第一条指令吗？</li><li>试着用自然语言让 OpenClaw 完成一个任务</li><li>如果遇到错误，你会如何处理？</li></ol>`,73)])])}const b=s(l,[["render",i]]);export{u as __pageData,b as default};
