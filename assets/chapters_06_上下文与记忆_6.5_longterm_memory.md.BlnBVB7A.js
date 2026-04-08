import{_ as a,o as n,c as p,ae as i}from"./chunks/framework.Czhw_PXq.js";const d=JSON.parse('{"title":"6.5 长期记忆","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/06_上下文与记忆/6.5_longterm_memory.md","filePath":"chapters/06_上下文与记忆/6.5_longterm_memory.md"}'),l={name:"chapters/06_上下文与记忆/6.5_longterm_memory.md"};function e(t,s,h,k,c,r){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="_6-5-长期记忆" tabindex="-1">6.5 长期记忆 <a class="header-anchor" href="#_6-5-长期记忆" aria-label="Permalink to &quot;6.5 长期记忆&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>深入理解长期记忆机制</li><li>掌握向量存储和检索</li><li>学会构建知识库</li></ul><hr><h2 id="_6-5-1-长期记忆概述" tabindex="-1">6.5.1 长期记忆概述 <a class="header-anchor" href="#_6-5-1-长期记忆概述" aria-label="Permalink to &quot;6.5.1 长期记忆概述&quot;">​</a></h2><h3 id="核心能力" tabindex="-1">核心能力 <a class="header-anchor" href="#核心能力" aria-label="Permalink to &quot;核心能力&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           长期记忆核心能力                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  跨会话持久化 ⭐                             │</span></span>
<span class="line"><span>│  ├── 记住用户偏好                           │</span></span>
<span class="line"><span>│  ├── 记住项目背景                           │</span></span>
<span class="line"><span>│  └── 记住学习内容                           │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  语义检索                                   │</span></span>
<span class="line"><span>│  ├── 理解意图                               │</span></span>
<span class="line"><span>│  ├── 相似度匹配                             │</span></span>
<span class="line"><span>│  └── 相关性排序                             │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  自动学习                                   │</span></span>
<span class="line"><span>│  ├── 从交互中学习                           │</span></span>
<span class="line"><span>│  ├── 总结规律                               │</span></span>
<span class="line"><span>│  └── 主动建议                               │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p>![长期记忆]/assets/diagrams/44_longterm_memory.png)</p><h3 id="典型场景" tabindex="-1">典型场景 <a class="header-anchor" href="#典型场景" aria-label="Permalink to &quot;典型场景&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>场景示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 首次会话</span></span>
<span class="line"><span>   用户：我叫张三，偏好 Python</span></span>
<span class="line"><span>   → 保存到记忆</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 第二次会话</span></span>
<span class="line"><span>   用户：我叫什么？</span></span>
<span class="line"><span>   → 检索记忆 → &quot;你叫张三&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 第三次会话</span></span>
<span class="line"><span>   用户：开始编程</span></span>
<span class="line"><span>   → 自动使用 Python</span></span></code></pre></div><hr><h2 id="_6-5-2-向量存储" tabindex="-1">6.5.2 向量存储 <a class="header-anchor" href="#_6-5-2-向量存储" aria-label="Permalink to &quot;6.5.2 向量存储&quot;">​</a></h2><h3 id="什么是向量" tabindex="-1">什么是向量 <a class="header-anchor" href="#什么是向量" aria-label="Permalink to &quot;什么是向量&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>向量 = 文本的数学表示</span></span>
<span class="line"><span></span></span>
<span class="line"><span>文本 → 向量化模型 → 向量</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span>&quot;Python&quot; → [0.12, -0.34, 0.56, ...]</span></span>
<span class="line"><span>&quot;编程语言&quot; → [0.11, -0.33, 0.58, ...]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>相似度计算：</span></span>
<span class="line"><span>&quot;Python&quot; 和 &quot;编程语言&quot; 相似度高</span></span>
<span class="line"><span>→ 向量距离近</span></span></code></pre></div><h3 id="向量数据库" tabindex="-1">向量数据库 <a class="header-anchor" href="#向量数据库" aria-label="Permalink to &quot;向量数据库&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>支持的向量数据库：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Pinecone</span></span>
<span class="line"><span>   ├── 云服务</span></span>
<span class="line"><span>   ├── 无需自建</span></span>
<span class="line"><span>   └── 免费额度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Weaviate</span></span>
<span class="line"><span>   ├── 开源</span></span>
<span class="line"><span>   ├── 自部署</span></span>
<span class="line"><span>   └── 支持本地</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Qdrant</span></span>
<span class="line"><span>   ├── 开源</span></span>
<span class="line"><span>   ├── 高性能</span></span>
<span class="line"><span>   └── Rust 开发</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. Milvus</span></span>
<span class="line"><span>   ├── 开源</span></span>
<span class="line"><span>   ├── 大规模</span></span>
<span class="line"><span>   └── 百度开源</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 本地向量</span></span>
<span class="line"><span>   ├── FAISS</span></span>
<span class="line"><span>   └── 支持离线</span></span></code></pre></div><h3 id="配置向量存储" tabindex="-1">配置向量存储 <a class="header-anchor" href="#配置向量存储" aria-label="Permalink to &quot;配置向量存储&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;vector&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;provider&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;qdrant&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://localhost:6333&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;collection&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;openclaw_memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;dimensions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1536</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;metric&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cosine&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-5-3-知识库构建" tabindex="-1">6.5.3 知识库构建 <a class="header-anchor" href="#_6-5-3-知识库构建" aria-label="Permalink to &quot;6.5.3 知识库构建&quot;">​</a></h2><h3 id="构建流程" tabindex="-1">构建流程 <a class="header-anchor" href="#构建流程" aria-label="Permalink to &quot;构建流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>步骤：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 准备知识文档</span></span>
<span class="line"><span>   → 收集资料</span></span>
<span class="line"><span>   → 整理格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 文档分块</span></span>
<span class="line"><span>   → 按章节/段落分割</span></span>
<span class="line"><span>   → 保持语义完整</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 向量化</span></span>
<span class="line"><span>   → 转换为向量</span></span>
<span class="line"><span>   → 存储到数据库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 建立索引</span></span>
<span class="line"><span>   → 优化检索</span></span>
<span class="line"><span>   → 加速查询</span></span></code></pre></div><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 构建知识库</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> openclawsdk </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Memory</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">memory </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Memory()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 文档分块</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">chunks </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Python 编码规范：使用 4 空格缩进&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;函数命名：小写下划线风格&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;类命名：大驼峰风格&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 存储</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> chunk </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> chunks:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memory.save(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">chunk,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        metadata</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;source&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coding_standards&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检索</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">results </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> memory.search(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;如何命名函数&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    top_k</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><hr><h2 id="_6-5-4-记忆类型" tabindex="-1">6.5.4 记忆类型 <a class="header-anchor" href="#_6-5-4-记忆类型" aria-label="Permalink to &quot;6.5.4 记忆类型&quot;">​</a></h2><h3 id="用户记忆" tabindex="-1">用户记忆 <a class="header-anchor" href="#用户记忆" aria-label="Permalink to &quot;用户记忆&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户记忆内容：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 基础信息</span></span>
<span class="line"><span>   ├── 姓名</span></span>
<span class="line"><span>   ├── 偏好语言</span></span>
<span class="line"><span>   └── 技能水平</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 偏好设置</span></span>
<span class="line"><span>   ├── 文档风格</span></span>
<span class="line"><span>   ├── 代码风格</span></span>
<span class="line"><span>   └── 交互方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 历史交互</span></span>
<span class="line"><span>   ├── 常用命令</span></span>
<span class="line"><span>   ├── 项目经验</span></span>
<span class="line"><span>   └── 成功案例</span></span></code></pre></div><h3 id="项目记忆" tabindex="-1">项目记忆 <a class="header-anchor" href="#项目记忆" aria-label="Permalink to &quot;项目记忆&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>项目记忆内容：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 项目信息</span></span>
<span class="line"><span>   ├── 项目名称</span></span>
<span class="line"><span>   ├── 技术栈</span></span>
<span class="line"><span>   └── 代码结构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 团队规范</span></span>
<span class="line"><span>   ├── 代码规范</span></span>
<span class="line"><span>   ├── 提交流程</span></span>
<span class="line"><span>   └── 发布流程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 知识积累</span></span>
<span class="line"><span>   ├── 常见问题</span></span>
<span class="line"><span>   └── 解决方案</span></span></code></pre></div><hr><h2 id="_6-5-5-记忆检索策略" tabindex="-1">6.5.5 记忆检索策略 <a class="header-anchor" href="#_6-5-5-记忆检索策略" aria-label="Permalink to &quot;6.5.5 记忆检索策略&quot;">​</a></h2><h3 id="rag-流程" tabindex="-1">RAG 流程 <a class="header-anchor" href="#rag-流程" aria-label="Permalink to &quot;RAG 流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RAG = Retrieval Augmented Generation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           RAG 流程                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  用户问题                                    │</span></span>
<span class="line"><span>│      │                                       │</span></span>
<span class="line"><span>│      ▼                                       │</span></span>
<span class="line"><span>│  ┌─────────────┐                            │</span></span>
<span class="line"><span>│  │  检索       │ → 从记忆/知识库检索         │</span></span>
<span class="line"><span>│  └──────┬──────┘                            │</span></span>
<span class="line"><span>│         │                                    │</span></span>
<span class="line"><span>│         ▼                                    │</span></span>
<span class="line"><span>│  ┌─────────────┐                            │</span></span>
<span class="line"><span>│  │  增强       │ → 组合上下文               │</span></span>
<span class="line"><span>│  └──────┬──────┘                            │</span></span>
<span class="line"><span>│         │                                    │</span></span>
<span class="line"><span>│         ▼                                    │</span></span>
<span class="line"><span>│  ┌─────────────┐                            │</span></span>
<span class="line"><span>│  │  生成       │ → LLM 生成答案             │</span></span>
<span class="line"><span>│  └─────────────┘                            │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="检索优化" tabindex="-1">检索优化 <a class="header-anchor" href="#检索优化" aria-label="Permalink to &quot;检索优化&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>优化策略：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 重排序</span></span>
<span class="line"><span>   ├── 粗筛：向量相似度</span></span>
<span class="line"><span>   └── 精排：交叉编码器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 混合检索</span></span>
<span class="line"><span>   ├── 向量搜索</span></span>
<span class="line"><span>   └── 关键词搜索</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 缓存</span></span>
<span class="line"><span>   ├── 常用查询缓存</span></span>
<span class="line"><span>   └── 结果复用</span></span></code></pre></div><hr><h2 id="_6-5-6-自动学习" tabindex="-1">6.5.6 自动学习 <a class="header-anchor" href="#_6-5-6-自动学习" aria-label="Permalink to &quot;6.5.6 自动学习&quot;">​</a></h2><h3 id="学习机制" tabindex="-1">学习机制 <a class="header-anchor" href="#学习机制" aria-label="Permalink to &quot;学习机制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>自动学习流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 信息提取</span></span>
<span class="line"><span>   → 从对话中提取关键信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 模式识别</span></span>
<span class="line"><span>   → 发现重复模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 知识更新</span></span>
<span class="line"><span>   → 更新记忆存储</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 主动建议</span></span>
<span class="line"><span>   → 基于学习提供建议</span></span></code></pre></div><h3 id="配置自动学习" tabindex="-1">配置自动学习 <a class="header-anchor" href="#配置自动学习" aria-label="Permalink to &quot;配置自动学习&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;memory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;learning&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;auto_extract&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;patterns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;user_preference&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;triggers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我偏好&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我喜欢&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;project_knowledge&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;triggers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;项目用&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我们用&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_6-5-7-常见问题" tabindex="-1">6.5.7 常见问题 <a class="header-anchor" href="#_6-5-7-常见问题" aria-label="Permalink to &quot;6.5.7 常见问题&quot;">​</a></h2><h3 id="q1-记忆不同步" tabindex="-1">Q1: 记忆不同步 <a class="header-anchor" href="#q1-记忆不同步" aria-label="Permalink to &quot;Q1: 记忆不同步&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：不同设备记忆不同步</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 使用共享存储</span></span>
<span class="line"><span>2. 使用云端向量数据库</span></span>
<span class="line"><span>3. 手动导出导入</span></span></code></pre></div><h3 id="q2-检索不准确" tabindex="-1">Q2: 检索不准确 <a class="header-anchor" href="#q2-检索不准确" aria-label="Permalink to &quot;Q2: 检索不准确&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：检索结果不相关</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 优化分块策略</span></span>
<span class="line"><span>2. 调整向量模型</span></span>
<span class="line"><span>3. 混合关键词搜索</span></span></code></pre></div><h3 id="q3-存储空间不足" tabindex="-1">Q3: 存储空间不足 <a class="header-anchor" href="#q3-存储空间不足" aria-label="Permalink to &quot;Q3: 存储空间不足&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：向量数据太大</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决：</span></span>
<span class="line"><span>1. 定期清理</span></span>
<span class="line"><span>2. 压缩存储</span></span>
<span class="line"><span>3. 分级存储</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>向量存储</strong>：文本→向量→数据库</li><li><strong>知识库</strong>：文档分块→向量化→索引</li><li><strong>RAG</strong>：检索→增强→生成</li><li><strong>自动学习</strong>：提取→识别→更新</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>如何选择向量数据库？</li><li>如何优化检索效果？</li><li>如何平衡隐私和学习能力？</li></ol>`,56)])])}const E=a(l,[["render",e]]);export{d as __pageData,E as default};
