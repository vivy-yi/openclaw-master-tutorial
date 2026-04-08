import{_ as a,o as n,c as i,ae as l}from"./chunks/framework.Czhw_PXq.js";const c=JSON.parse('{"title":"OpenClaw 六层记忆架构教程","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/06_上下文与记忆/6.6_six_layer_memory.md","filePath":"chapters/06_上下文与记忆/6.6_six_layer_memory.md"}'),p={name:"chapters/06_上下文与记忆/6.6_six_layer_memory.md"};function e(t,s,h,r,d,o){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="openclaw-六层记忆架构教程" tabindex="-1">OpenClaw 六层记忆架构教程 <a class="header-anchor" href="#openclaw-六层记忆架构教程" aria-label="Permalink to &quot;OpenClaw 六层记忆架构教程&quot;">​</a></h1><blockquote><p>本教程基于墨家 Agent 系统实战经验总结</p></blockquote><h2 id="_1-架构概览" tabindex="-1">1. 架构概览 <a class="header-anchor" href="#_1-架构概览" aria-label="Permalink to &quot;1. 架构概览&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                   OpenClaw 记忆系统                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 1: 每日日志 (Daily Logs)                      │   │</span></span>
<span class="line"><span>│  │ 路径: memory/YYYY-MM-DD.md                          │   │</span></span>
<span class="line"><span>│  │ 内容: 原始任务记录、讨论、决策                        │   │</span></span>
<span class="line"><span>│  │ 触发: 自动每日21:00生成                              │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                           ↓                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 2: 长期记忆 (MEMORY.md)                       │   │</span></span>
<span class="line"><span>│  │ 路径: workspace/MEMORY.md                            │   │</span></span>
<span class="line"><span>│  │ 内容: 蒸馏精华、规则、偏好、重大决策                   │   │</span></span>
<span class="line"><span>│  │ 规则: 日志超过200行时清理提取                         │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                           ↓                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 3: 纠正记录 (Corrections)                     │   │</span></span>
<span class="line"><span>│  │ 路径: shared/self-improving/corrections.md           │   │</span></span>
<span class="line"><span>│  │ 内容: 用户纠正、偏好、错误模式                         │   │</span></span>
<span class="line"><span>│  │ 规则: 同一type出现≥3次才提升到MEMORY.md              │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                           ↓                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 4: 共享知识库 (Shared Knowledge)             │   │</span></span>
<span class="line"><span>│  │ 路径: shared/consensus/                             │   │</span></span>
<span class="line"><span>│  │ 内容: 跨Agent协议、工作流、知识                        │   │</span></span>
<span class="line"><span>│  │ 规则: 影响≥2个Agent才写入shared                      │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                           ↓                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 5: 向量数据库 (LanceDB) [可选]                │   │</span></span>
<span class="line"><span>│  │ 路径: memories/lancedb/                             │   │</span></span>
<span class="line"><span>│  │ 内容: 语义检索、向量化记忆                            │   │</span></span>
<span class="line"><span>│  │ 触发: 需要语义搜索时启用                              │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                           ↓                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │ Layer 6: 外部知识库 (External KB) [可选]            │   │</span></span>
<span class="line"><span>│  │ 路径: Obsidian/Notion/GitHub                        │   │</span></span>
<span class="line"><span>│  │ 内容: 备份、同步、外部查阅                            │   │</span></span>
<span class="line"><span>│  │ 触发: 手动同步或重要决策时                            │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="_2-各层详解" tabindex="-1">2. 各层详解 <a class="header-anchor" href="#_2-各层详解" aria-label="Permalink to &quot;2. 各层详解&quot;">​</a></h2><h3 id="layer-1-每日日志-daily-logs" tabindex="-1">Layer 1: 每日日志 (Daily Logs) <a class="header-anchor" href="#layer-1-每日日志-daily-logs" aria-label="Permalink to &quot;Layer 1: 每日日志 (Daily Logs)&quot;">​</a></h3><p><strong>位置</strong>: <code>memory/YYYY-MM-DD.md</code></p><p><strong>内容</strong>:</p><ul><li>完成任务清单</li><li>重要讨论摘要</li><li>待处理事项</li><li>明日计划</li></ul><p><strong>触发</strong>: 每日21:00自动生成</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 2026-04-06 日志</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 完成任务</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 配置墨自Cron任务</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 修复预测追踪delivery.to</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 重要讨论</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用户要求修复Cron任务sessionKey问题</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mo-fortune技能开发完成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 待处理</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 测试mo-fortune完整流程</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 启用Chrome remote debugging</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 明日计划</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 继续完善mo-fortune知识库</span></span></code></pre></div><h3 id="layer-2-长期记忆-memory-md" tabindex="-1">Layer 2: 长期记忆 (MEMORY.md) <a class="header-anchor" href="#layer-2-长期记忆-memory-md" aria-label="Permalink to &quot;Layer 2: 长期记忆 (MEMORY.md)&quot;">​</a></h3><p><strong>位置</strong>: <code>workspace/MEMORY.md</code></p><p><strong>内容</strong>:</p><ul><li>精选的日志精华</li><li>用户偏好和规则</li><li>重要决策记录</li><li>系统配置要点</li></ul><p><strong>规则</strong>:</p><ul><li>日志超过200行时清理并提取精华</li><li>每周蒸馏一次（7条日志→3-5条精华）</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># MEMORY.md - 长期记忆</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 用户偏好</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不要先问，直接执行</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用OpenClaw原生工具</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 健康报告发送到私聊</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 重要规则</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cron任务配置: sessionKey + delivery.to + payload身份必须匹配</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 文件删除用trash不用rm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 系统配置</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Gateway监听: ws://127.0.0.1:18789</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代理配置: 移除env.vars中的代理</span></span></code></pre></div><h3 id="layer-3-纠正记录-corrections" tabindex="-1">Layer 3: 纠正记录 (Corrections) <a class="header-anchor" href="#layer-3-纠正记录-corrections" aria-label="Permalink to &quot;Layer 3: 纠正记录 (Corrections)&quot;">​</a></h3><p><strong>位置</strong>: <code>~/.openclaw/shared/self-improving/corrections.md</code></p><p><strong>格式</strong>:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">uuid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">correction|preference|pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">内容</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">来源</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">日期</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  applied</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">次数</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p><strong>规则</strong>:</p><ul><li>correction: 用户明确纠正 → 直接记录</li><li>preference: 用户偏好 → 出现2次记录</li><li>pattern: 行为模式 → 出现3次提升到MEMORY.md</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Corrections Log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id: 001</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: preference</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  content: 不要先问，直接执行任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  source: 用户纠正</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  date: 2026-04-05</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  applied: 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id: 002</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: pattern</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  content: 使用OpenClaw原生工具</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  source: 用户纠正</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  date: 2026-04-05</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  applied: 1</span></span></code></pre></div><h3 id="layer-4-共享知识库-shared-knowledge" tabindex="-1">Layer 4: 共享知识库 (Shared Knowledge) <a class="header-anchor" href="#layer-4-共享知识库-shared-knowledge" aria-label="Permalink to &quot;Layer 4: 共享知识库 (Shared Knowledge)&quot;">​</a></h3><p><strong>位置</strong>: <code>~/.openclaw/shared/</code></p><p><strong>目录结构</strong>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>shared/</span></span>
<span class="line"><span>├── consensus/     # 共识协议</span></span>
<span class="line"><span>│   ├── agent-group-binding.md</span></span>
<span class="line"><span>│   ├── triggers.md</span></span>
<span class="line"><span>│   └── protocols.md</span></span>
<span class="line"><span>├── knowledge/     # 知识</span></span>
<span class="line"><span>│   └── self-improving.md</span></span>
<span class="line"><span>├── context/       # 上下文</span></span>
<span class="line"><span>├── memory/        # 集体记忆</span></span>
<span class="line"><span>└── sync/         # 同步状态</span></span></code></pre></div><p><strong>规则</strong>:</p><ul><li>✅ 影响≥2个Agent的决策</li><li>✅ 重大架构/配置变更</li><li>✅ 用户明确要求</li><li>❌ 禁止：日常对话、私有内部讨论</li></ul><h3 id="layer-5-向量数据库-lancedb" tabindex="-1">Layer 5: 向量数据库 (LanceDB) <a class="header-anchor" href="#layer-5-向量数据库-lancedb" aria-label="Permalink to &quot;Layer 5: 向量数据库 (LanceDB)&quot;">​</a></h3><p><strong>位置</strong>: <code>memories/lancedb/</code></p><p><strong>用途</strong>:</p><ul><li>语义搜索记忆</li><li>跨会话上下文检索</li><li>长期知识积累</li></ul><p><strong>触发</strong>: 需要语义搜索时启用</p><h3 id="layer-6-外部知识库" tabindex="-1">Layer 6: 外部知识库 <a class="header-anchor" href="#layer-6-外部知识库" aria-label="Permalink to &quot;Layer 6: 外部知识库&quot;">​</a></h3><p><strong>位置</strong>: Obsidian / Notion / GitHub</p><p><strong>用途</strong>:</p><ul><li>备份重要记忆</li><li>跨设备同步</li><li>外部查阅分享</li></ul><h2 id="_3-关键规则" tabindex="-1">3. 关键规则 <a class="header-anchor" href="#_3-关键规则" aria-label="Permalink to &quot;3. 关键规则&quot;">​</a></h2><h3 id="_3-1-写入时机" tabindex="-1">3.1 写入时机 <a class="header-anchor" href="#_3-1-写入时机" aria-label="Permalink to &quot;3.1 写入时机&quot;">​</a></h3><table tabindex="0"><thead><tr><th>情况</th><th>写入位置</th><th>备注</th></tr></thead><tbody><tr><td>每日日志</td><td><code>memory/YYYY-MM-DD.md</code></td><td>自动生成</td></tr><tr><td>提炼精华</td><td><code>MEMORY.md</code></td><td>200行时清理</td></tr><tr><td>用户纠正</td><td><code>corrections.md</code></td><td>立即记录</td></tr><tr><td>同一纠正≥3次</td><td>提升到<code>MEMORY.md</code></td><td>蒸馏</td></tr><tr><td>跨Agent知识</td><td><code>shared/</code></td><td>影响≥2个Agent</td></tr></tbody></table><h3 id="_3-2-记忆召回优先级" tabindex="-1">3.2 记忆召回优先级 <a class="header-anchor" href="#_3-2-记忆召回优先级" aria-label="Permalink to &quot;3.2 记忆召回优先级&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前会话</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>HEARTBEAT检查</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>MEMORY.md (长期记忆)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>corrections.md (纠正记录)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>shared/ (共享知识)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>memory/ (每日日志)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>向量数据库 (可选)</span></span></code></pre></div><h3 id="_3-3-自我优化触发条件" tabindex="-1">3.3 自我优化触发条件 <a class="header-anchor" href="#_3-3-自我优化触发条件" aria-label="Permalink to &quot;3.3 自我优化触发条件&quot;">​</a></h3><ul><li><strong>被动触发</strong>: 用户纠正 → 立即记录</li><li><strong>主动触发</strong>: 每日检查 corrections.md <ul><li>统计各type出现次数</li><li>同一type≥3次 → 提升到MEMORY.md</li><li>分析Pattern趋势</li></ul></li></ul><h2 id="_4-cron任务中的记忆配置" tabindex="-1">4. Cron任务中的记忆配置 <a class="header-anchor" href="#_4-cron任务中的记忆配置" aria-label="Permalink to &quot;4. Cron任务中的记忆配置&quot;">​</a></h2><h3 id="_4-1-sessionkey与delivery-to必须匹配" tabindex="-1">4.1 sessionKey与delivery.to必须匹配 <a class="header-anchor" href="#_4-1-sessionkey与delivery-to必须匹配" aria-label="Permalink to &quot;4.1 sessionKey与delivery.to必须匹配&quot;">​</a></h3><p><strong>错误配置</strong>:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">sessionKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">agent:main:cron:...</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是一个法律助手&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">delivery.to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-5207101318</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 法律群</span></span></code></pre></div><p><strong>正确配置</strong>:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式1: 保持isolated，但payload身份正确</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">sessionTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;isolated&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你是mo-law，执行法律任务&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">delivery.to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-5207101318</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式2: 在目标Agent的workspace中创建任务</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">sessionTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mo-law&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;法律任务&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">delivery.to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-5207101318</span></span></code></pre></div><h3 id="_4-2-修改cron任务时检查清单" tabindex="-1">4.2 修改Cron任务时检查清单 <a class="header-anchor" href="#_4-2-修改cron任务时检查清单" aria-label="Permalink to &quot;4.2 修改Cron任务时检查清单&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>□ delivery.to - 消息发送到哪</span></span>
<span class="line"><span>□ sessionTarget - 任务在哪个session运行</span></span>
<span class="line"><span>□ payload.message中的Agent身份 - 必须与目标群匹配</span></span></code></pre></div><h2 id="_5-记忆生命周期" tabindex="-1">5. 记忆生命周期 <a class="header-anchor" href="#_5-记忆生命周期" aria-label="Permalink to &quot;5. 记忆生命周期&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>新建任务</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>记录到每日日志</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[可选] 用户纠正 → corrections.md</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[每日21:00] 日志自动生成</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[超过200行?] 清理并提取到MEMORY.md</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[同一type≥3次?] 蒸馏提升到MEMORY.md</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[影响≥2个Agent?] 写入shared/</span></span></code></pre></div><h2 id="_6-最佳实践" tabindex="-1">6. 最佳实践 <a class="header-anchor" href="#_6-最佳实践" aria-label="Permalink to &quot;6. 最佳实践&quot;">​</a></h2><h3 id="_6-1-写入习惯" tabindex="-1">6.1 写入习惯 <a class="header-anchor" href="#_6-1-写入习惯" aria-label="Permalink to &quot;6.1 写入习惯&quot;">​</a></h3><ul><li><strong>立即记录</strong>: 重要决策、用户偏好、错误教训</li><li><strong>定期蒸馏</strong>: 每周7条日志→3-5条精华</li><li><strong>不过度</strong>: 不需要记录每句话，只记重要内容</li></ul><h3 id="_6-2-召回习惯" tabindex="-1">6.2 召回习惯 <a class="header-anchor" href="#_6-2-召回习惯" aria-label="Permalink to &quot;6.2 召回习惯&quot;">​</a></h3><ul><li><strong>每次对话</strong>: 检查MEMORY.md关键配置</li><li><strong>每日heartbeat</strong>: 检查corrections.md新模式</li><li><strong>遇到错误</strong>: 回溯每日日志定位问题</li></ul><h3 id="_6-3-遗忘策略" tabindex="-1">6.3 遗忘策略 <a class="header-anchor" href="#_6-3-遗忘策略" aria-label="Permalink to &quot;6.3 遗忘策略&quot;">​</a></h3><ul><li>MEMORY.md超过200行才清理</li><li>corrections中同一type&lt;3次的不提升</li><li>简单任务不提取，复杂任务提取3-5条</li></ul><h2 id="_7-常见问题" tabindex="-1">7. 常见问题 <a class="header-anchor" href="#_7-常见问题" aria-label="Permalink to &quot;7. 常见问题&quot;">​</a></h2><h3 id="q1-什么时候用shared-什么时候用memory-md" tabindex="-1">Q1: 什么时候用shared/什么时候用MEMORY.md? <a class="header-anchor" href="#q1-什么时候用shared-什么时候用memory-md" aria-label="Permalink to &quot;Q1: 什么时候用shared/什么时候用MEMORY.md?&quot;">​</a></h3><p><strong>shared/</strong>: 影响多个Agent的配置、协议、知识 <strong>MEMORY.md</strong>: 单个Agent的长期记忆、用户偏好</p><h3 id="q2-corrections-md和memory-md的区别" tabindex="-1">Q2: corrections.md和MEMORY.md的区别? <a class="header-anchor" href="#q2-corrections-md和memory-md的区别" aria-label="Permalink to &quot;Q2: corrections.md和MEMORY.md的区别?&quot;">​</a></h3><p><strong>corrections.md</strong>: 原始纠正记录，用于分析模式 <strong>MEMORY.md</strong>: 蒸馏后的精华，已确认的规则</p><h3 id="q3-向量数据库什么时候用" tabindex="-1">Q3: 向量数据库什么时候用? <a class="header-anchor" href="#q3-向量数据库什么时候用" aria-label="Permalink to &quot;Q3: 向量数据库什么时候用?&quot;">​</a></h3><p>当需要语义搜索、跨会话回忆时启用。简单场景不需要。</p><h2 id="_8-搜索工具选用原则-⚠️" tabindex="-1">8. 搜索工具选用原则 ⚠️ <a class="header-anchor" href="#_8-搜索工具选用原则-⚠️" aria-label="Permalink to &quot;8. 搜索工具选用原则 ⚠️&quot;">​</a></h2><h3 id="优先级排序-正确顺序" tabindex="-1">优先级排序（正确顺序） <a class="header-anchor" href="#优先级排序-正确顺序" aria-label="Permalink to &quot;优先级排序（正确顺序）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                   搜索工具优先级                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                          │</span></span>
<span class="line"><span>│  1. 平台原生API  ✅ 优先                               │</span></span>
<span class="line"><span>│     - Twitter/GitHub/知乎/微博官方API                    │</span></span>
<span class="line"><span>│     - 精确、无配额、官方支持                             │</span></span>
<span class="line"><span>│                                                          │</span></span>
<span class="line"><span>│  2. browser.open()  ✅ 其次                            │</span></span>
<span class="line"><span>│     - 页面抓取、登录态、交互                            │</span></span>
<span class="line"><span>│     - 灵活、不消耗API配额                               │</span></span>
<span class="line"><span>│                                                          │</span></span>
<span class="line"><span>│  3. web_search (Tavily)  ⚠️ 最后兜底                │</span></span>
<span class="line"><span>│     - 无特定数据源时使用                                │</span></span>
<span class="line"><span>│     - 有配额限制，不滥用                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="为什么这样排序" tabindex="-1">为什么这样排序？ <a class="header-anchor" href="#为什么这样排序" aria-label="Permalink to &quot;为什么这样排序？&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>平台API</strong></td><td>精确、无配额、官方支持</td><td>需要配置</td><td>有官方API的场景</td></tr><tr><td><strong>browser</strong></td><td>灵活、通用、不耗配额</td><td>需要页面加载</td><td>大部分场景</td></tr><tr><td><strong>Tavily</strong></td><td>快速、结构化</td><td>有限额、易耗尽</td><td>无API时的兜底</td></tr></tbody></table><h3 id="设计原则" tabindex="-1">设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 搜索信息时：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 优先使用平台原生API (Twitter/GitHub/知乎等)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 其次 browser.open(url)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 最后才考虑 web_search</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 遇到限流/失败时：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 自动降级：API → browser → web_search → 本地缓存</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 记录失败原因到 corrections.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 批量搜索时：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 优先使用平台API批量接口</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 避免连续调用 web_search</span></span></code></pre></div><h3 id="示例工作流" tabindex="-1">示例工作流 <a class="header-anchor" href="#示例工作流" aria-label="Permalink to &quot;示例工作流&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 正确的搜索流程</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  1. 尝试平台原生API</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 有API</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  2. 使用API获取数据</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 无API或失败</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  3. browser.open(url)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 成功</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  4. browser.snapshot() + 提取</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 不可访问</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  5. web_search(query) 作为兜底</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 有配额</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  6. 使用搜索结果</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     ↓ 配额不足</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  7. 返回&quot;搜索服务暂时不可用&quot;</span></span></code></pre></div><p>| heartbeat-state.json | shared/self-improving/ | 心跳状态 |</p><hr><p><em>最后更新: 2026-04-06</em></p>`,83)])])}const g=a(p,[["render",e]]);export{c as __pageData,g as default};
