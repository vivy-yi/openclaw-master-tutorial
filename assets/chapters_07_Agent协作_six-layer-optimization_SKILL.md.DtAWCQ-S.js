import{_ as a,o as n,c as i,ae as t}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"六层诊断优化 Skill","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/07_Agent协作/six-layer-optimization/SKILL.md","filePath":"chapters/07_Agent协作/six-layer-optimization/SKILL.md"}'),p={name:"chapters/07_Agent协作/six-layer-optimization/SKILL.md"};function l(e,s,h,d,r,k){return n(),i("div",null,[...s[0]||(s[0]=[t(`<h1 id="六层诊断优化-skill" tabindex="-1">六层诊断优化 Skill <a class="header-anchor" href="#六层诊断优化-skill" aria-label="Permalink to &quot;六层诊断优化 Skill&quot;">​</a></h1><blockquote><p>墨家领域助手六层架构诊断与优化工具</p></blockquote><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>通过对话方式唤起Skill，对墨家系统下的领域助手进行<strong>六层架构诊断</strong>，找出短板并提供优化建议。</p><p><strong>核心方法论</strong>：</p><ol><li>Agent能力层 - 推理/记忆/工具/角色设定</li><li>外部知识层 - API &gt; browser &gt; web_search</li><li>Agent协作层 - @触发跨群协作</li><li>领域专业层 - Level3决策支持</li><li>合规风控层 - 硬性/软性边界</li><li>用户体验层 - 一致性/主动性/透明度</li></ol><h2 id="触发条件" tabindex="-1">触发条件 <a class="header-anchor" href="#触发条件" aria-label="Permalink to &quot;触发条件&quot;">​</a></h2><p><strong>对话触发</strong>：</p><ul><li>&quot;诊断[助手名]&quot;</li><li>&quot;分析[助手名]&quot;</li><li>&quot;六层分析&quot;</li><li>&quot;优化[助手名]&quot;</li><li>&quot;检查[助手名]&quot;</li></ul><p><strong>示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户: 诊断mo-finance</span></span>
<span class="line"><span>用户: 分析mo-law</span></span>
<span class="line"><span>用户: 六层分析mo-yunying</span></span></code></pre></div><h2 id="执行流程" tabindex="-1">执行流程 <a class="header-anchor" href="#执行流程" aria-label="Permalink to &quot;执行流程&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. 接收助手名称                                        │</span></span>
<span class="line"><span>│     用户: &quot;诊断mo-finance&quot;                              │</span></span>
<span class="line"><span>│                           ↓                              │</span></span>
<span class="line"><span>│  2. 确认助手列表                                        │</span></span>
<span class="line"><span>│     ┌────────────────────────────┐                      │</span></span>
<span class="line"><span>│     │ mo-finance (金融助手)     │                      │</span></span>
<span class="line"><span>│     │ mo-law (法律助手)         │                      │</span></span>
<span class="line"><span>│     │ mo-yunying (内容运营)     │                      │</span></span>
<span class="line"><span>│     │ mo-fortune (算命助手)     │                      │</span></span>
<span class="line"><span>│     │ mo-richang (日常开发)     │                      │</span></span>
<span class="line"><span>│     │ shenghuo (生活服务)       │                      │</span></span>
<span class="line"><span>│     └────────────────────────────┘                      │</span></span>
<span class="line"><span>│                           ↓                              │</span></span>
<span class="line"><span>│  3. 六层诊断分析                                        │</span></span>
<span class="line"><span>│     逐层检查并评分                                      │</span></span>
<span class="line"><span>│                           ↓                              │</span></span>
<span class="line"><span>│  4. 输出诊断报告                                        │</span></span>
<span class="line"><span>│     问题 + 优化建议                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="六层诊断框架" tabindex="-1">六层诊断框架 <a class="header-anchor" href="#六层诊断框架" aria-label="Permalink to &quot;六层诊断框架&quot;">​</a></h2><h3 id="第1层-agent能力层诊断" tabindex="-1">第1层：Agent能力层诊断 <a class="header-anchor" href="#第1层-agent能力层诊断" aria-label="Permalink to &quot;第1层：Agent能力层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>角色设定</td><td>SOUL.md是否清晰定义人格/语气/边界</td><td>0-20</td></tr><tr><td>自主性</td><td>主动行动 vs 被动响应是否平衡</td><td>0-20</td></tr><tr><td>工具集成</td><td>MCP/Tool是否完备</td><td>0-20</td></tr><tr><td>记忆能力</td><td>六层记忆是否正确配置</td><td>0-20</td></tr><tr><td>推理能力</td><td>逻辑推导是否清晰</td><td>0-20</td></tr></tbody></table><p><strong>问题识别</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>❌ 角色模糊：语气时而专业时而随意</span></span>
<span class="line"><span>❌ 自主性差：每次都要用户明确指令</span></span>
<span class="line"><span>❌ 工具缺失：需要调用API但未配置</span></span></code></pre></div><h3 id="第2层-外部知识层诊断" tabindex="-1">第2层：外部知识层诊断 <a class="header-anchor" href="#第2层-外部知识层诊断" aria-label="Permalink to &quot;第2层：外部知识层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>平台API</td><td>是否有配置平台原生API</td><td>0-25</td></tr><tr><td>browser使用</td><td>是否优先使用browser而非web_search</td><td>0-25</td></tr><tr><td>知识库</td><td>内部知识库是否完备</td><td>0-25</td></tr><tr><td>搜索策略</td><td>是否遵循API&gt;browser&gt;web_search优先级</td><td>0-25</td></tr></tbody></table><p><strong>搜索优先级规范</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1. 平台原生API  ✅ 优先</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Twitter/GitHub/知乎等官方API</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">2. browser.open()  ✅ 其次</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">页面抓取、登录态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">3. web_search (Tavily)  ⚠️ 最后兜底</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">有配额限制</span></span></code></pre></div><h3 id="第3层-agent协作层诊断" tabindex="-1">第3层：Agent协作层诊断 <a class="header-anchor" href="#第3层-agent协作层诊断" aria-label="Permalink to &quot;第3层：Agent协作层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>群绑定</td><td>是否有独立Telegram群</td><td>0-20</td></tr><tr><td>@触发</td><td>@目标Agent是否能触发协作</td><td>0-20</td></tr><tr><td>sessions_send</td><td>是否配置跨域调用</td><td>0-20</td></tr><tr><td>协作链路</td><td>是否形成正确的协作链路</td><td>0-20</td></tr><tr><td>跨域调用</td><td>是否引用墨家共享知识库协议</td><td>0-20</td></tr></tbody></table><p><strong>协作链路示意</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户 → mo-finance (金融问题)</span></span>
<span class="line"><span>           ↓ 需要法律</span></span>
<span class="line"><span>        mo-law 协作</span></span>
<span class="line"><span>           ↓</span></span>
<span class="line"><span>        mo-finance 整合 → 用户</span></span></code></pre></div><h3 id="第4层-领域专业层诊断" tabindex="-1">第4层：领域专业层诊断 <a class="header-anchor" href="#第4层-领域专业层诊断" aria-label="Permalink to &quot;第4层：领域专业层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>信息聚合</td><td>Level1: 能否聚合信息</td><td>0-15</td></tr><tr><td>分析解读</td><td>Level2: 能否分析解读</td><td>0-15</td></tr><tr><td>决策支持</td><td>Level3: 能否提供决策支持</td><td>0-20</td></tr><tr><td>差异化</td><td>是否构建了&quot;护城河&quot;</td><td>0-25</td></tr><tr><td>专业深度</td><td>vs 泛泛而谈</td><td>0-25</td></tr></tbody></table><p><strong>专业深度三层次</strong>：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Level 1: 信息聚合</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;今天的财经新闻有哪些&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Level 2: 分析解读  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;这些新闻对市场有什么影响&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Level 3: 决策支持</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;基于这些信息，我应该如何调整投资组合&quot;</span></span></code></pre></div><h3 id="第5层-合规风控层诊断" tabindex="-1">第5层：合规风控层诊断 <a class="header-anchor" href="#第5层-合规风控层诊断" aria-label="Permalink to &quot;第5层：合规风控层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>硬性边界</td><td>是否明确&quot;绝对不能做&quot;</td><td>0-30</td></tr><tr><td>软性边界</td><td>是否明确&quot;不建议做&quot;</td><td>0-30</td></tr><tr><td>风控机制</td><td>触发风险时是否有打断/提示</td><td>0-40</td></tr></tbody></table><p><strong>合规边界模板</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">硬性边界 (绝对不能碰)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不提供投资建议 (≠分析)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不提供医疗建议 (≠健康)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不提供法律诊断 (≠法律信息)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不承诺结果</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">软性边界 (不建议但可提示)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不过度乐观/悲观</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不代替用户做决定</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">不隐瞒风险</span></span></code></pre></div><h3 id="第6层-用户体验层诊断" tabindex="-1">第6层：用户体验层诊断 <a class="header-anchor" href="#第6层-用户体验层诊断" aria-label="Permalink to &quot;第6层：用户体验层诊断&quot;">​</a></h3><p><strong>检查项</strong>：</p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th><th>评分</th></tr></thead><tbody><tr><td>一致性</td><td>回复风格是否统一</td><td>0-25</td></tr><tr><td>主动性</td><td>是否主动提供价值</td><td>0-25</td></tr><tr><td>透明度</td><td>是否告知能力边界和置信度</td><td>0-25</td></tr><tr><td>情感连接</td><td>是否有温度而非冷冰冰</td><td>0-25</td></tr></tbody></table><p><strong>体验维度说明</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>一致性：记忆跨会话延续，&quot;记得上次我们讨论过...&quot;</span></span>
<span class="line"><span>主动性：不打扰但有价值，如主动预警</span></span>
<span class="line"><span>透明度：知道Agent能做什么/不能做什么</span></span>
<span class="line"><span>情感连接：理解用户处境，有温度</span></span></code></pre></div><h2 id="诊断报告格式" tabindex="-1">诊断报告格式 <a class="header-anchor" href="#诊断报告格式" aria-label="Permalink to &quot;诊断报告格式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>═══════════════════════════════════════════════════════</span></span>
<span class="line"><span>  六层诊断报告: mo-finance</span></span>
<span class="line"><span>  日期: 2026-04-06</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>【总分】65/100 🟠 及格</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第1层: Agent能力层 (16/20) ───</span></span>
<span class="line"><span>  角色设定: ✅ 清晰定义INTJ分析师人格</span></span>
<span class="line"><span>  自主性: ⚠️ 偏被动，需要明确指令</span></span>
<span class="line"><span>  工具集成: ✅ MCP/预测追踪已配置</span></span>
<span class="line"><span>  记忆能力: ✅ 六层记忆正常</span></span>
<span class="line"><span>  推理能力: ✅ 逻辑清晰</span></span>
<span class="line"><span>  问题: 自主性不足</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第2层: 外部知识层 (18/25) ───</span></span>
<span class="line"><span>  平台API: ✅ GitHub API已配置</span></span>
<span class="line"><span>  browser使用: ⚠️ 仍使用Tavily搜索</span></span>
<span class="line"><span>  知识库: ✅ 市场数据API完备</span></span>
<span class="line"><span>  搜索策略: ❌ 未遵循API&gt;browser优先级</span></span>
<span class="line"><span>  问题: 应优先使用平台API</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第3层: Agent协作层 (12/20) ───</span></span>
<span class="line"><span>  群绑定: ✅ mo-finance → 金融助手群</span></span>
<span class="line"><span>  @触发: ✅ @mo-finance 可触发</span></span>
<span class="line"><span>  sessions_send: ⚠️ 未配置跨域调用</span></span>
<span class="line"><span>  协作链路: ❌ 未形成完整链路</span></span>
<span class="line"><span>  问题: 缺乏与mo-law/mo-yunying的协作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第4层: 领域专业层 (12/25) ───</span></span>
<span class="line"><span>  信息聚合: ✅ Level1完成</span></span>
<span class="line"><span>  分析解读: ✅ Level2完成</span></span>
<span class="line"><span>  决策支持: ⚠️ 偏弱，缺少组合分析</span></span>
<span class="line"><span>  差异化: ⚠️ &quot;护城河&quot;不够深</span></span>
<span class="line"><span>  问题: 应深化Level3决策支持</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第5层: 合规风控层 (7/10) ───</span></span>
<span class="line"><span>  硬性边界: ⚠️ &quot;投资建议&quot;边界模糊</span></span>
<span class="line"><span>  软性边界: ⚠️ 缺少明确边界说明</span></span>
<span class="line"><span>  风控机制: ❌ 无打断/提示机制</span></span>
<span class="line"><span>  问题: 合规边界需强化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>─── 第6层: 用户体验层 (0/25) ───</span></span>
<span class="line"><span>  一致性: ⚠️ 风格偶有波动</span></span>
<span class="line"><span>  主动性: ❌ 无主动预警</span></span>
<span class="line"><span>  透明度: ❌ 用户不了解能力边界</span></span>
<span class="line"><span>  情感连接: ❌ 偏冷</span></span>
<span class="line"><span>  问题: 用户体验全面不足</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════════════</span></span>
<span class="line"><span>【优化建议】</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔴 紧急 (立即修复):</span></span>
<span class="line"><span>  1. mo-finance合规边界 - 明确&quot;投资建议≠分析&quot;</span></span>
<span class="line"><span>  2. 搜索策略 - 优先使用平台API</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🟠 重要 (本周完成):</span></span>
<span class="line"><span>  1. sessions_send配置 - 实现跨域协作</span></span>
<span class="line"><span>  2. Level3决策支持 - 组合分析能力</span></span>
<span class="line"><span>  3. 主动性设计 - 行情预警机制</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🟡 改进 (持续优化):</span></span>
<span class="line"><span>  1. 统一回复风格</span></span>
<span class="line"><span>  2. 增加透明度说明</span></span>
<span class="line"><span>  3. 情感连接设计</span></span>
<span class="line"><span></span></span>
<span class="line"><span>═══════════════════════════════════════════════════════</span></span></code></pre></div><h2 id="优化执行" tabindex="-1">优化执行 <a class="header-anchor" href="#优化执行" aria-label="Permalink to &quot;优化执行&quot;">​</a></h2><h3 id="优先级排序" tabindex="-1">优先级排序 <a class="header-anchor" href="#优先级排序" aria-label="Permalink to &quot;优先级排序&quot;">​</a></h3><table tabindex="0"><thead><tr><th>优先级</th><th>问题类型</th><th>说明</th></tr></thead><tbody><tr><td>🔴 紧急</td><td>硬性边界缺失</td><td>可能导致合规风险</td></tr><tr><td>🟠 重要</td><td>协作链路断裂</td><td>影响跨域服务能力</td></tr><tr><td>🟡 改进</td><td>体验优化</td><td>长期能力建设</td></tr></tbody></table><h3 id="优化检查清单" tabindex="-1">优化检查清单 <a class="header-anchor" href="#优化检查清单" aria-label="Permalink to &quot;优化检查清单&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">助手名</span><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">] 优化任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🔴 紧急</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 硬性边界定义</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 风控机制实现</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🟠 重要</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 平台API配置</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] sessions_send配置</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 协作链路打通</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🟡 改进</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 主动性设计</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 透明度提升</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 情感连接优化</span></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">six_layer_optimization</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  assistants</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-finance</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-law</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-yunying</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-fortune</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mo-richang</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">shenghuo</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  scoring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer1_agent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer2_knowledge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer3_collaboration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer4_domain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer5_compliance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    layer6_ux</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  thresholds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    excellent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    good</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">70</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    pass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    fail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span></code></pre></div><h2 id="相关文件" tabindex="-1">相关文件 <a class="header-anchor" href="#相关文件" aria-label="Permalink to &quot;相关文件&quot;">​</a></h2><table tabindex="0"><thead><tr><th>文件</th><th>说明</th></tr></thead><tbody><tr><td><code>docs/07-six-layer-agent-framework.md</code></td><td>六层架构教程</td></tr><tr><td><code>shared/self-improving/corrections.md</code></td><td>纠正记录</td></tr></tbody></table><hr><p><em>最后更新: 2026-04-06</em></p>`,57)])])}const g=a(p,[["render",l]]);export{c as __pageData,g as default};
