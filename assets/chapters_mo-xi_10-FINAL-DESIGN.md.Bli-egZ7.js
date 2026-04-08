import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const E=JSON.parse('{"title":"墨析最终方案设计","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/mo-xi/10-FINAL-DESIGN.md","filePath":"chapters/mo-xi/10-FINAL-DESIGN.md"}'),l={name:"chapters/mo-xi/10-FINAL-DESIGN.md"};function t(e,s,h,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="墨析最终方案设计" tabindex="-1">墨析最终方案设计 <a class="header-anchor" href="#墨析最终方案设计" aria-label="Permalink to &quot;墨析最终方案设计&quot;">​</a></h1><h2 id="一、用户选择确认" tabindex="-1">一、用户选择确认 <a class="header-anchor" href="#一、用户选择确认" aria-label="Permalink to &quot;一、用户选择确认&quot;">​</a></h2><table tabindex="0"><thead><tr><th>问题</th><th>选择</th><th>说明</th></tr></thead><tbody><tr><td><strong>主要用途</strong></td><td>D. 全部</td><td>竞品监控 + 内容聚合 + 个人画像</td></tr><tr><td><strong>参与程度</strong></td><td>A. 全自动</td><td>用户设置后自动运行</td></tr><tr><td><strong>数据存储</strong></td><td>C. 两者都要</td><td>本地 + 云端（飞书）</td></tr></tbody></table><hr><h2 id="二、定位确认" tabindex="-1">二、定位确认 <a class="header-anchor" href="#二、定位确认" aria-label="Permalink to &quot;二、定位确认&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>墨析 = 全自动、全链路的数据采集 Skill</span></span>
<span class="line"><span>├── 竞品监控（内容运营用）</span></span>
<span class="line"><span>├── 内容聚合（选题参考）</span></span>
<span class="line"><span>└── 个人画像（用户分析）</span></span></code></pre></div><hr><h2 id="三、架构设计" tabindex="-1">三、架构设计 <a class="header-anchor" href="#三、架构设计" aria-label="Permalink to &quot;三、架构设计&quot;">​</a></h2><h3 id="_3-1-整体架构" tabindex="-1">3.1 整体架构 <a class="header-anchor" href="#_3-1-整体架构" aria-label="Permalink to &quot;3.1 整体架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Skill: mo-xi                                             │</span></span>
<span class="line"><span>│  ~/.openclaw/skills/mo-xi/                               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  SKILL.md ── 能力定义、触发、工作流                       │</span></span>
<span class="line"><span>│  profiles/ ── 本地数据存储                              │</span></span>
<span class="line"><span>│  workflows/ ── 预设工作流                              │</span></span>
<span class="line"><span>│  templates/ ── 通知模板                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓ 被调用</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  触发方式                                                   │</span></span>
<span class="line"><span>│  ├── Agent 直接调用（mo-finance/mo-yunying）               │</span></span>
<span class="line"><span>│  ├── Cron 定时（自动运行）                                  │</span></span>
<span class="line"><span>│  └── 消息触发（用户指令）                                   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓ 使用</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Tools: browser, cron, message, memory, feishu_bitable  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_3-2-目录结构" tabindex="-1">3.2 目录结构 <a class="header-anchor" href="#_3-2-目录结构" aria-label="Permalink to &quot;3.2 目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.openclaw/skills/mo-xi/</span></span>
<span class="line"><span>├── SKILL.md              # Skill 定义</span></span>
<span class="line"><span>├── profiles/            # 本地数据</span></span>
<span class="line"><span>│   ├── competitors/     # 竞品监控数据</span></span>
<span class="line"><span>│   │   ├── data/        # 原始数据</span></span>
<span class="line"><span>│   │   └── latest/      # 最新快照</span></span>
<span class="line"><span>│   ├── aggregated/       # 聚合内容</span></span>
<span class="line"><span>│   │   └── {topic}/    # 按话题分类</span></span>
<span class="line"><span>│   └── users/           # 用户画像</span></span>
<span class="line"><span>│       └── me/          # 个人画像</span></span>
<span class="line"><span>├── workflows/           # 工作流</span></span>
<span class="line"><span>│   ├── competitor-monitor.yaml</span></span>
<span class="line"><span>│   ├── content-aggregate.yaml</span></span>
<span class="line"><span>│   └── user-profile.yaml</span></span>
<span class="line"><span>├── templates/           # 模板</span></span>
<span class="line"><span>│   ├── alert-compact.md</span></span>
<span class="line"><span>│   └── summary-daily.md</span></span>
<span class="line"><span>└── config/</span></span>
<span class="line"><span>    └── sync.yaml        # 飞书同步配置</span></span></code></pre></div><hr><h2 id="四、全自动化设计" tabindex="-1">四、全自动化设计 <a class="header-anchor" href="#四、全自动化设计" aria-label="Permalink to &quot;四、全自动化设计&quot;">​</a></h2><h3 id="_4-1-cron-定时任务" tabindex="-1">4.1 Cron 定时任务 <a class="header-anchor" href="#_4-1-cron-定时任务" aria-label="Permalink to &quot;4.1 Cron 定时任务&quot;">​</a></h3><table tabindex="0"><thead><tr><th>任务</th><th>频率</th><th>执行内容</th></tr></thead><tbody><tr><td><strong>竞品监控</strong></td><td>每6小时</td><td>采集 → 对比 → 通知</td></tr><tr><td><strong>内容聚合</strong></td><td>每天2次</td><td>跨平台 → 汇总 → 推送</td></tr><tr><td><strong>个人画像</strong></td><td>每天1次</td><td>增量更新</td></tr></tbody></table><h3 id="_4-2-自动化流程" tabindex="-1">4.2 自动化流程 <a class="header-anchor" href="#_4-2-自动化流程" aria-label="Permalink to &quot;4.2 自动化流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>定时触发 / 用户指令</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>    解析任务类型</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│  竞品监控                               │</span></span>
<span class="line"><span>│  1. 采集各平台竞品账号                 │</span></span>
<span class="line"><span>│  2. 对比上次数据                        │</span></span>
<span class="line"><span>│  3. 发现新内容 → 通知                 │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│  内容聚合                               │</span></span>
<span class="line"><span>│  1. 采集各平台热门话题                 │</span></span>
<span class="line"><span>│  2. 按话题汇总                          │</span></span>
<span class="line"><span>│  3. 生成日报 → 推送                   │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>┌────────────────────────────────────────┐</span></span>
<span class="line"><span>│  个人画像                               │</span></span>
<span class="line"><span>│  1. 增量采集各平台数据                 │</span></span>
<span class="line"><span>│  2. 更新画像                           │</span></span>
<span class="line"><span>│  3. 异常检测 → 通知                   │</span></span>
<span class="line"><span>└────────────────────────────────────────┘</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>    本地存储（profiles/）</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>    同步飞书 Bitable（可选）</span></span>
<span class="line"><span>         ↓</span></span>
<span class="line"><span>    通知用户（消息）</span></span></code></pre></div><hr><h2 id="五、数据存储设计" tabindex="-1">五、数据存储设计 <a class="header-anchor" href="#五、数据存储设计" aria-label="Permalink to &quot;五、数据存储设计&quot;">​</a></h2><h3 id="_5-1-本地存储" tabindex="-1">5.1 本地存储 <a class="header-anchor" href="#_5-1-本地存储" aria-label="Permalink to &quot;5.1 本地存储&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>profiles/</span></span>
<span class="line"><span>├── competitors/                    # 竞品监控</span></span>
<span class="line"><span>│   ├── {competitor_name}/</span></span>
<span class="line"><span>│   │   ├── xiaohongshu/         # 小红书数据</span></span>
<span class="line"><span>│   │   ├── weibo/              # 微博数据</span></span>
<span class="line"><span>│   │   └── douyin/             # 抖音数据</span></span>
<span class="line"><span>│   └── config.yaml             # 监控配置</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── aggregated/                    # 内容聚合</span></span>
<span class="line"><span>│   └── {topic}/</span></span>
<span class="line"><span>│       ├── sources/             # 各平台原始数据</span></span>
<span class="line"><span>│       └── summary.md           # 汇总报告</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── users/</span></span>
<span class="line"><span>    └── me/</span></span>
<span class="line"><span>        ├── platform_profiles/  # 各平台画像</span></span>
<span class="line"><span>        │   ├── github.json</span></span>
<span class="line"><span>        │   ├── zhihu.json</span></span>
<span class="line"><span>        │   └── ...</span></span>
<span class="line"><span>        ├── taste_preference.json  # 口味偏好</span></span>
<span class="line"><span>        └── consumption_level.json # 消费水平</span></span></code></pre></div><h3 id="_5-2-飞书同步-云端" tabindex="-1">5.2 飞书同步（云端） <a class="header-anchor" href="#_5-2-飞书同步-云端" aria-label="Permalink to &quot;5.2 飞书同步（云端）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># config/sync.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">feishu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  bitables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    competitors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      app_token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      table_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品监控&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    aggregated</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      app_token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;yyy&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      table_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容聚合&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      app_token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zzz&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      table_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;用户画像&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  sync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    frequency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;daily&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;22:00&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    conflict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;local_wins&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 冲突策略</span></span></code></pre></div><h3 id="_5-3-同步策略" tabindex="-1">5.3 同步策略 <a class="header-anchor" href="#_5-3-同步策略" aria-label="Permalink to &quot;5.3 同步策略&quot;">​</a></h3><table tabindex="0"><thead><tr><th>数据类型</th><th>本地</th><th>飞书</th><th>说明</th></tr></thead><tbody><tr><td>竞品监控</td><td>✅ 实时</td><td>✅ 日同步</td><td>高频本地，低频云端</td></tr><tr><td>内容聚合</td><td>✅ 实时</td><td>✅ 日同步</td><td>方便查看</td></tr><tr><td>用户画像</td><td>✅ 实时</td><td>🔒 可选</td><td>隐私数据</td></tr></tbody></table><hr><h2 id="六、功能模块" tabindex="-1">六、功能模块 <a class="header-anchor" href="#六、功能模块" aria-label="Permalink to &quot;六、功能模块&quot;">​</a></h2><h3 id="_6-1-竞品监控模块" tabindex="-1">6.1 竞品监控模块 <a class="header-anchor" href="#_6-1-竞品监控模块" aria-label="Permalink to &quot;6.1 竞品监控模块&quot;">​</a></h3><p><strong>功能</strong>：</p><ul><li>监控多个竞品在微博/小红书/抖音的账号</li><li>检测新内容发布</li><li>追踪互动数据变化</li><li>发现负面评价</li></ul><p><strong>Cron</strong>：每6小时</p><p><strong>输出</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📢 竞品监控日报</span></span>
<span class="line"><span></span></span>
<span class="line"><span>竞品A:</span></span>
<span class="line"><span>  小红书: 2条新内容</span></span>
<span class="line"><span>    - &quot;新品发布&quot; (500👍)</span></span>
<span class="line"><span>    - &quot;618预告&quot; (1200👍)</span></span>
<span class="line"><span>  微博: 1条新内容</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>竞品B:</span></span>
<span class="line"><span>  ...</span></span></code></pre></div><h3 id="_6-2-内容聚合模块" tabindex="-1">6.2 内容聚合模块 <a class="header-anchor" href="#_6-2-内容聚合模块" aria-label="Permalink to &quot;6.2 内容聚合模块&quot;">​</a></h3><p><strong>功能</strong>：</p><ul><li>跨平台采集特定话题内容</li><li>按热度/时间排序</li><li>生成日报/周报</li></ul><p><strong>Cron</strong>：每天 9:00、18:00</p><p><strong>输出</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📊 AI创业 内容聚合</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最新 (2026-04-04 18:00)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔥 知乎: &quot;AI创业的机会&quot;</span></span>
<span class="line"><span>   200回答 | 热度 ↑15%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔥 微博: &quot;#AI创业#&quot;</span></span>
<span class="line"><span>   50万阅读 | 1000讨论</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔥 小红书: &quot;AI创业第100天&quot;</span></span>
<span class="line"><span>   5000👍 | 800收藏</span></span></code></pre></div><h3 id="_6-3-个人画像模块" tabindex="-1">6.3 个人画像模块 <a class="header-anchor" href="#_6-3-个人画像模块" aria-label="Permalink to &quot;6.3 个人画像模块&quot;">​</a></h3><p><strong>功能</strong>：</p><ul><li>采集各平台用户数据</li><li>分析口味偏好、消费水平</li><li>增量更新，自动学习</li></ul><p><strong>Cron</strong>：每天 22:00</p><p><strong>输出</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>👤 个人画像更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>口味偏好: 麻辣、重口味</span></span>
<span class="line"><span>消费水平: ¥10-20（外卖）</span></span>
<span class="line"><span>常点: 麻辣烫、螺蛳粉、饺子</span></span>
<span class="line"><span></span></span>
<span class="line"><span>变化检测:</span></span>
<span class="line"><span>  🆕 新增: 螺蛳粉（近期高频）</span></span>
<span class="line"><span>  📈 上升: 炸鸡偏好 +20%</span></span></code></pre></div><hr><h2 id="七、cron-配置" tabindex="-1">七、Cron 配置 <a class="header-anchor" href="#七、cron-配置" aria-label="Permalink to &quot;七、Cron 配置&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 工作流配置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">workflows</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  competitor-monitor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cron</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 */6 * * *&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 每6小时</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    targets</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品A&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        platforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xiaohongshu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品A官方&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">weibo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品A_official&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">douyin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;competitor_a&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品B&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        platforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xiaohongshu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品B&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">weibo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品BOfficial&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      new_content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      negative_review</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      engagement_drop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.2</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 下降20%告警</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  content-aggregate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cron</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 9,18 * * *&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 每天9点和18点</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    topics</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;AI创业&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;大模型应用&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;产品经理&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    platforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zhihu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">weibo</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xiaohongshu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    output</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;markdown&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;telegram&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  user-profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cron</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 22 * * *&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 每天22点</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    platforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">github</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zhihu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xiaohongshu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">meituan</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">eleme</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    update_strategy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;incremental&quot;</span></span></code></pre></div><hr><h2 id="八、实现优先级" tabindex="-1">八、实现优先级 <a class="header-anchor" href="#八、实现优先级" aria-label="Permalink to &quot;八、实现优先级&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>内容</th><th>说明</th></tr></thead><tbody><tr><td><strong>P0</strong></td><td>核心采集流程</td><td>browser + 存储</td></tr><tr><td><strong>P1</strong></td><td>Cron 自动调度</td><td>定时任务</td></tr><tr><td><strong>P2</strong></td><td>消息通知</td><td>Telegram 推送</td></tr><tr><td><strong>P3</strong></td><td>竞品监控</td><td>第一个完整场景</td></tr><tr><td><strong>P4</strong></td><td>内容聚合</td><td>第二个完整场景</td></tr><tr><td><strong>P5</strong></td><td>个人画像</td><td>第三个完整场景</td></tr><tr><td><strong>P6</strong></td><td>飞书同步</td><td>云端备份</td></tr><tr><td><strong>P7</strong></td><td>自我学习</td><td>知识库进化</td></tr></tbody></table><hr><h2 id="九、与现有-agent-协同" tabindex="-1">九、与现有 Agent 协同 <a class="header-anchor" href="#九、与现有-agent-协同" aria-label="Permalink to &quot;九、与现有 Agent 协同&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mo-finance</span></span>
<span class="line"><span>    ↓ 调用</span></span>
<span class="line"><span>mo-xi skill (采集财经数据)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>返回数据</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>mo-finance (分析)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mo-yunying</span></span>
<span class="line"><span>    ↓ 调用</span></span>
<span class="line"><span>mo-xi skill (采集竞品内容)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>返回数据</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>mo-yunying (内容策划)</span></span></code></pre></div><p><strong>调用示例</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># mo-yunying 任务</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;采集竞品内容&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    skill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-xi</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">competitor_monitor</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    params</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      targets</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;竞品B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      platforms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xiaohongshu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;weibo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><hr><h2 id="十、下一步" tabindex="-1">十、下一步 <a class="header-anchor" href="#十、下一步" aria-label="Permalink to &quot;十、下一步&quot;">​</a></h2><ol><li><strong>创建 Skill 目录结构</strong></li><li><strong>实现核心采集流程</strong></li><li><strong>配置 Cron 任务</strong></li><li><strong>测试竞品监控场景</strong></li><li><strong>扩展到内容聚合</strong></li><li><strong>添加个人画像</strong></li><li><strong>配置飞书同步</strong></li></ol>`,60)])])}const c=a(l,[["render",t]]);export{E as __pageData,c as default};
