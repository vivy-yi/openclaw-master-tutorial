import{_ as a,o as n,c as p,ae as t}from"./chunks/framework.Czhw_PXq.js";const k=JSON.parse('{"title":"5.9 职业场景 Skills 指南","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/10_工具与Skills系统/10.10_skills_occupation.md","filePath":"chapters/10_工具与Skills系统/10.10_skills_occupation.md"}'),l={name:"chapters/10_工具与Skills系统/10.10_skills_occupation.md"};function e(i,s,d,c,o,h){return n(),p("div",null,[...s[0]||(s[0]=[t(`<h1 id="_5-9-职业场景-skills-指南" tabindex="-1">5.9 职业场景 Skills 指南 <a class="header-anchor" href="#_5-9-职业场景-skills-指南" aria-label="Permalink to &quot;5.9 职业场景 Skills 指南&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握不同职业场景下的 Skills 使用</li><li>理解各行业的 OpenClaw 应用</li><li>构建个人职业技能工作流</li></ul><hr><h2 id="_5-9-1-职业场景概览" tabindex="-1">5.9.1 职业场景概览 <a class="header-anchor" href="#_5-9-1-职业场景概览" aria-label="Permalink to &quot;5.9.1 职业场景概览&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    职业场景 Skills                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  💰 金融投资                                                 │</span></span>
<span class="line"><span>│  ├── 股票分析                                                │</span></span>
<span class="line"><span>│  ├── 量化交易                                                │</span></span>
<span class="line"><span>│  ├── 风险管理                                                │</span></span>
<span class="line"><span>│  └── 财务报告                                                │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  📈 运营                                                     │</span></span>
<span class="line"><span>│  ├── 用户增长                                                │</span></span>
<span class="line"><span>│  ├── 内容运营                                                │</span></span>
<span class="line"><span>│  ├── 数据分析                                                │</span></span>
<span class="line"><span>│  └── 社群运营                                                │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  📊 数据分析                                                 │</span></span>
<span class="line"><span>│  ├── Excel 处理                                             │</span></span>
<span class="line"><span>│  ├── SQL 查询                                               │</span></span>
<span class="line"><span>│  └── 可视化                                                 │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  🎨 设计创意                                                 │</span></span>
<span class="line"><span>│  ├── 图像生成                                                │</span></span>
<span class="line"><span>│  ├── 视频剪辑                                                │</span></span>
<span class="line"><span>│  └── 文案撰写                                                │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="_5-9-2-金融投资场景" tabindex="-1">5.9.2 金融投资场景 <a class="header-anchor" href="#_5-9-2-金融投资场景" aria-label="Permalink to &quot;5.9.2 金融投资场景&quot;">​</a></h2><h3 id="股票分析" tabindex="-1">股票分析 <a class="header-anchor" href="#股票分析" aria-label="Permalink to &quot;股票分析&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th><th>说明</th></tr></thead><tbody><tr><td><code>finance-data</code></td><td>金融数据查询</td><td>股票、基金、财报</td></tr><tr><td><code>stock-analysis</code></td><td>股票分析</td><td>技术分析、基本面</td></tr><tr><td><code>market-news</code></td><td>市场新闻</td><td>实时资讯</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：分析一下苹果公司的股票</span></span>
<span class="line"><span>→ 获取 AAPL 股票数据</span></span>
<span class="line"><span>→ 分析技术指标</span></span>
<span class="line"><span>→ 查询最新财报</span></span>
<span class="line"><span>← 返回分析报告：</span></span>
<span class="line"><span>  当前价格: $175.50</span></span>
<span class="line"><span>  市盈率: 28.5</span></span>
<span class="line"><span>  建议: 持有</span></span></code></pre></div><p><strong>配置金融数据</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置数据源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openclaw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> plugins.entries.finance.config.apiKey</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;xxx&quot;</span></span></code></pre></div><h3 id="量化交易" tabindex="-1">量化交易 <a class="header-anchor" href="#量化交易" aria-label="Permalink to &quot;量化交易&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>trading-bot</code></td><td>交易机器人</td></tr><tr><td><code>backtest</code></td><td>回测分析</td></tr><tr><td><code>risk-manager</code></td><td>风险管理</td></tr></tbody></table><p><strong>使用流程</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：帮我回测这个交易策略</span></span>
<span class="line"><span>→ 加载历史数据</span></span>
<span class="line"><span>→ 执行回测</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  收益率: 25.3%</span></span>
<span class="line"><span>  最大回撤: -8.5%</span></span>
<span class="line"><span>  夏普比率: 1.8</span></span></code></pre></div><h3 id="风险管理" tabindex="-1">风险管理 <a class="header-anchor" href="#风险管理" aria-label="Permalink to &quot;风险管理&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>risk-analysis</code></td><td>风险分析</td></tr><tr><td><code>portfolio-optimizer</code></td><td>组合优化</td></tr><tr><td><code> VaR-calculator</code></td><td>VaR 计算</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：计算投资组合的风险价值</span></span>
<span class="line"><span>→ 输入持仓</span></span>
<span class="line"><span>→ 计算 VaR</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  95% VaR: $12,500</span></span>
<span class="line"><span>  99% VaR: $18,200</span></span></code></pre></div><h3 id="财务报告" tabindex="-1">财务报告 <a class="header-anchor" href="#财务报告" aria-label="Permalink to &quot;财务报告&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>report-generator</code></td><td>报告生成</td></tr><tr><td><code>excel-pro</code></td><td>Excel 处理</td></tr><tr><td><code>pdf-parser</code></td><td>PDF 解析</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：分析这份年报</span></span>
<span class="line"><span>→ 解析 PDF</span></span>
<span class="line"><span>→ 提取关键数据</span></span>
<span class="line"><span>→ 生成摘要</span></span>
<span class="line"><span>← 返回财务摘要</span></span></code></pre></div><hr><h2 id="_5-9-3-运营场景" tabindex="-1">5.9.3 运营场景 <a class="header-anchor" href="#_5-9-3-运营场景" aria-label="Permalink to &quot;5.9.3 运营场景&quot;">​</a></h2><h3 id="用户增长" tabindex="-1">用户增长 <a class="header-anchor" href="#用户增长" aria-label="Permalink to &quot;用户增长&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th><th>安装</th></tr></thead><tbody><tr><td><code>growth-hacker</code></td><td>增长策略</td><td>clawhub</td></tr><tr><td><code>seo-analyzer</code></td><td>SEO 分析</td><td>clawhub</td></tr><tr><td><code>ads-optimize</code></td><td>广告优化</td><td>clawhub</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：分析我的产品增长策略</span></span>
<span class="line"><span>→ 分析当前数据</span></span>
<span class="line"><span>→ 识别增长机会</span></span>
<span class="line"><span>← 返回增长建议：</span></span>
<span class="line"><span>  1. 优化注册流程</span></span>
<span class="line"><span>  2. 增加社交分享</span></span>
<span class="line"><span>  3. A/B 测试定价页</span></span></code></pre></div><p><strong>配置追踪</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;analytics&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;mixpanel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;amplitude&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="内容运营" tabindex="-1">内容运营 <a class="header-anchor" href="#内容运营" aria-label="Permalink to &quot;内容运营&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>content-writer</code></td><td>内容撰写</td></tr><tr><td><code>seo-content</code></td><td>SEO 内容</td></tr><tr><td><code>social-post</code></td><td>社交媒体</td></tr><tr><td><code>headline-gen</code></td><td>标题生成</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：写一篇关于 AI 的公众号文章</span></span>
<span class="line"><span>→ 生成大纲</span></span>
<span class="line"><span>→ 撰写内容</span></span>
<span class="line"><span>→ 生成标题选项</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  标题选项：</span></span>
<span class="line"><span>  1. AI 如何改变未来</span></span>
<span class="line"><span>  2. 深度解析 AI 技术</span></span>
<span class="line"><span>  3. 你必须知道的 AI 趋势</span></span></code></pre></div><h3 id="数据分析" tabindex="-1">数据分析 <a class="header-anchor" href="#数据分析" aria-label="Permalink to &quot;数据分析&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>excel-pro</code></td><td>Excel 处理</td></tr><tr><td><code>sql-query</code></td><td>SQL 查询</td></tr><tr><td><code>data-visualize</code></td><td>数据可视化</td></tr><tr><td><code>dash-builder</code></td><td>仪表盘构建</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：分析这份销售数据</span></span>
<span class="line"><span>→ 读取 Excel</span></span>
<span class="line"><span>→ 数据清洗</span></span>
<span class="line"><span>→ 生成图表</span></span>
<span class="line"><span>← 返回分析报告</span></span></code></pre></div><p><strong>SQL 查询</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：查询上个月销量前 10 的产品</span></span>
<span class="line"><span>→ 连接数据库</span></span>
<span class="line"><span>→ 执行查询</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  product_id | product_name | sales</span></span>
<span class="line"><span>  -----------|-------------|------</span></span>
<span class="line"><span>  001        | 产品 A      | 5000</span></span>
<span class="line"><span>  002        | 产品 B      | 4200</span></span>
<span class="line"><span>  ...</span></span></code></pre></div><h3 id="社群运营" tabindex="-1">社群运营 <a class="header-anchor" href="#社群运营" aria-label="Permalink to &quot;社群运营&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>discord-manager</code></td><td>Discord 管理</td></tr><tr><td><code>telegram-bot</code></td><td>Telegram 机器人</td></tr><tr><td><code>wechat-bot</code></td><td>微信机器人</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：创建一个欢迎新成员的机器人</span></span>
<span class="line"><span>→ 配置欢迎消息</span></span>
<span class="line"><span>→ 设置自动回复</span></span>
<span class="line"><span>← 返回机器人配置</span></span></code></pre></div><hr><h2 id="_5-9-4-炒股投资场景" tabindex="-1">5.9.4 炒股投资场景 <a class="header-anchor" href="#_5-9-4-炒股投资场景" aria-label="Permalink to &quot;5.9.4 炒股投资场景&quot;">​</a></h2><h3 id="实时行情" tabindex="-1">实时行情 <a class="header-anchor" href="#实时行情" aria-label="Permalink to &quot;实时行情&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>stock-quote</code></td><td>实时报价</td></tr><tr><td><code>crypto-price</code></td><td>加密货币</td></tr><tr><td><code>forex-rate</code></td><td>外汇</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：获取美股实时行情</span></span>
<span class="line"><span>→ 连接数据源</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  AAPL: $175.50 (+1.2%)</span></span>
<span class="line"><span>  GOOGL: $140.25 (+0.8%)</span></span>
<span class="line"><span>  MSFT: $380.00 (+1.5%)</span></span></code></pre></div><h3 id="技术分析" tabindex="-1">技术分析 <a class="header-anchor" href="#技术分析" aria-label="Permalink to &quot;技术分析&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>technical-analysis</code></td><td>技术分析</td></tr><tr><td><code>chart-pattern</code></td><td>图表形态</td></tr><tr><td><code>indicator-calc</code></td><td>指标计算</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：分析这只股票的技术形态</span></span>
<span class="line"><span>→ 加载 K 线数据</span></span>
<span class="line"><span>→ 识别形态</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  形态: 头肩顶</span></span>
<span class="line"><span>  信号: 卖出</span></span>
<span class="line"><span>  支撑位: $165</span></span>
<span class="line"><span>  阻力位: $180</span></span></code></pre></div><h3 id="选股策略" tabindex="-1">选股策略 <a class="header-anchor" href="#选股策略" aria-label="Permalink to &quot;选股策略&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>stock-screener</code></td><td>股票筛选</td></tr><tr><td><code>value-analysis</code></td><td>价值分析</td></tr><tr><td><code>momentum-scan</code></td><td>动量扫描</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：筛选低估的科技股</span></span>
<span class="line"><span>→ 设置筛选条件</span></span>
<span class="line"><span>→ 执行扫描</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  股票代码 | 市盈率 | 增长率 | 建议</span></span>
<span class="line"><span>  ---------|--------|--------|--------</span></span>
<span class="line"><span>  AAPL    | 25     | 15%    | 买入</span></span>
<span class="line"><span>  MSFT    | 30     | 20%    | 持有</span></span></code></pre></div><h3 id="组合管理" tabindex="-1">组合管理 <a class="header-anchor" href="#组合管理" aria-label="Permalink to &quot;组合管理&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>portfolio-view</code></td><td>组合查看</td></tr><tr><td><code>rebalance</code></td><td>组合再平衡</td></tr><tr><td><code>dividend-tracker</code></td><td>分红追踪</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：检查我的投资组合</span></span>
<span class="line"><span>→ 获取持仓</span></span>
<span class="line"><span>→ 计算权重</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>  组合市值: $150,000</span></span>
<span class="line"><span>  AAPL: 30% ($45,000)</span></span>
<span class="line"><span>  GOOGL: 25% ($37,500)</span></span>
<span class="line"><span>  现金: 45% ($67,500)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  建议: 需要再平衡</span></span></code></pre></div><hr><h2 id="_5-9-5-数据分析场景" tabindex="-1">5.9.5 数据分析场景 <a class="header-anchor" href="#_5-9-5-数据分析场景" aria-label="Permalink to &quot;5.9.5 数据分析场景&quot;">​</a></h2><h3 id="excel-处理" tabindex="-1">Excel 处理 <a class="header-anchor" href="#excel-处理" aria-label="Permalink to &quot;Excel 处理&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>excel-pro</code></td><td>Excel 处理</td></tr><tr><td><code>spreadsheet-gen</code></td><td>表格生成</td></tr><tr><td><code>formula-helper</code></td><td>公式助手</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：帮我整理这份销售数据</span></span>
<span class="line"><span>→ 读取 Excel</span></span>
<span class="line"><span>→ 数据清洗</span></span>
<span class="line"><span>→ 生成透视表</span></span>
<span class="line"><span>← 返回整理后的文件</span></span></code></pre></div><h3 id="sql-查询" tabindex="-1">SQL 查询 <a class="header-anchor" href="#sql-查询" aria-label="Permalink to &quot;SQL 查询&quot;">​</a></h3><p><strong>推荐 Skills</strong>：</p><table tabindex="0"><thead><tr><th>Skill</th><th>功能</th></tr></thead><tbody><tr><td><code>sql-query</code></td><td>SQL 查询</td></tr><tr><td><code>sql-optimize</code></td><td>SQL 优化</td></tr><tr><td><code>schema-view</code></td><td>表结构查看</td></tr></tbody></table><p><strong>使用示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户：写一个查询用户活跃度的 SQL</span></span>
<span class="line"><span>→ 分析需求</span></span>
<span class="line"><span>→ 生成 SQL</span></span>
<span class="line"><span>← 返回：</span></span>
<span class="line"><span>\`\`\`sql</span></span>
<span class="line"><span>SELECT</span></span>
<span class="line"><span>  DATE_FORMAT(login_time, &#39;%Y-%m-%d&#39;) as date,</span></span>
<span class="line"><span>  COUNT(DISTINCT user_id) as dau,</span></span>
<span class="line"><span>  COUNT(*) as login_count</span></span>
<span class="line"><span>FROM user_login</span></span>
<span class="line"><span>WHERE login_time &gt;= DATE_SUB(NOW(), INTERVAL 30 DAY)</span></span>
<span class="line"><span>GROUP BY DATE_FORMAT(login_time, &#39;%Y-%m-%d&#39;)</span></span>
<span class="line"><span>ORDER BY date;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 数据可视化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 |</span></span>
<span class="line"><span>|-------|------|</span></span>
<span class="line"><span>| \`chart-gen\` | 图表生成 |</span></span>
<span class="line"><span>| \`dashboard-build\` | 仪表盘构建 |</span></span>
<span class="line"><span>| \`report-export\` | 报告导出 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用示例**：</span></span></code></pre></div><p>用户：生成一个销售趋势图 → 读取数据 → 生成图表 ← 返回图表文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5.9.6 设计创意场景</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 图像生成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 | 配置 |</span></span>
<span class="line"><span>|-------|------|------|</span></span>
<span class="line"><span>| \`dalle-gen\` | DALL-E 生成 | 需 OpenAI Key |</span></span>
<span class="line"><span>| \`stable-diffusion\` | Stable Diffusion | 需 API |</span></span>
<span class="line"><span>| \`image-edit\` | 图像编辑 | |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用示例**：</span></span></code></pre></div><p>用户：生成一个科技感海报 → 生成提示词 → 调用 API ← 返回生成的图像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 视频剪辑</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 |</span></span>
<span class="line"><span>|-------|------|</span></span>
<span class="line"><span>| \`video-editor\` | 视频剪辑 |</span></span>
<span class="line"><span>| \`subtitle-gen\` | 字幕生成 |</span></span>
<span class="line"><span>| \`video-summary\` | 视频摘要 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用示例**：</span></span></code></pre></div><p>用户：给这个视频添加字幕 → 提取音频 → 语音识别 → 生成字幕 ← 返回带字幕的视频</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 文案撰写</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 |</span></span>
<span class="line"><span>|-------|------|</span></span>
<span class="line"><span>| \`copywriter\` | 文案撰写 |</span></span>
<span class="line"><span>| \`ad-copy\` | 广告文案 |</span></span>
<span class="line"><span>| \`product-desc\` | 产品描述 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用示例**：</span></span></code></pre></div><p>用户：写一个手机壳的产品描述 → 分析产品特点 → 生成文案 ← 返回： 标题: 超薄防摔，时尚之选 描述: 采用航空级材质... 特点: 防摔、轻薄、时尚</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5.9.7 教育科研场景</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 论文写作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 |</span></span>
<span class="line"><span>|-------|------|</span></span>
<span class="line"><span>| \`paper-writer\` | 论文写作 |</span></span>
<span class="line"><span>| \`citation-gen\` | 引用生成 |</span></span>
<span class="line"><span>| \`proofread\` | 校对 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用示例**：</span></span></code></pre></div><p>用户：帮我润色这段论文 → 分析文本 → 润色改进 ← 返回润色后的版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 代码辅助</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**推荐 Skills**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Skill | 功能 |</span></span>
<span class="line"><span>|-------|------|</span></span>
<span class="line"><span>| \`code-explainer\` | 代码解释 |</span></span>
<span class="line"><span>| \`code-review\` | 代码审查 |</span></span>
<span class="line"><span>| \`test-generator\` | 测试生成 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5.9.8 组合工作流</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 金融分析师工作流</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`json</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;workflow&quot;: {</span></span>
<span class="line"><span>    &quot;name&quot;: &quot;每日市场分析&quot;,</span></span>
<span class="line"><span>    &quot;steps&quot;: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;skill&quot;: &quot;stock-quote&quot;,</span></span>
<span class="line"><span>        &quot;action&quot;: &quot;get-market&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;skill&quot;: &quot;technical-analysis&quot;,</span></span>
<span class="line"><span>        &quot;action&quot;: &quot;analyze&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;skill&quot;: &quot;report-generator&quot;,</span></span>
<span class="line"><span>        &quot;action&quot;: &quot;generate&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;skill&quot;: &quot;discord&quot;,</span></span>
<span class="line"><span>        &quot;action&quot;: &quot;send-report&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="运营人员工作流" tabindex="-1">运营人员工作流 <a class="header-anchor" href="#运营人员工作流" aria-label="Permalink to &quot;运营人员工作流&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;workflow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容发布流程&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;steps&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;skill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;content-writer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;action&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;generate&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;skill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;seo-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;action&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;optimize&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;skill&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;social-post&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;action&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;publish&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>金融投资</strong>：股票分析、量化交易、风险管理、财务报告</li><li><strong>运营</strong>：用户增长、内容运营、数据分析、社群运营</li><li><strong>炒股投资</strong>：实时行情、技术分析、选股策略、组合管理</li><li><strong>数据分析</strong>：Excel、SQL、数据可视化</li><li><strong>设计创意</strong>：图像生成、视频剪辑、文案撰写</li></ol><hr><h2 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h2><ol><li>你的职业场景是什么？</li><li>哪些 Skills 组合适合你？</li><li>如何构建个人工作流？</li></ol>`,109)])])}const g=a(l,[["render",e]]);export{k as __pageData,g as default};
