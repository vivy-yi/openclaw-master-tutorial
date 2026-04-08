import{_ as a,o as n,c as i,ae as p}from"./chunks/framework.Czhw_PXq.js";const o=JSON.parse('{"title":"4.6 模型切换工具 (cc-switch)","description":"","frontmatter":{},"headers":[],"relativePath":"chapters/04_模型配置/4.6_model_switch_tools.md","filePath":"chapters/04_模型配置/4.6_model_switch_tools.md"}'),l={name:"chapters/04_模型配置/4.6_model_switch_tools.md"};function e(t,s,h,k,c,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="_4-6-模型切换工具-cc-switch" tabindex="-1">4.6 模型切换工具 (cc-switch) <a class="header-anchor" href="#_4-6-模型切换工具-cc-switch" aria-label="Permalink to &quot;4.6 模型切换工具 (cc-switch)&quot;">​</a></h1><h2 id="本节目标" tabindex="-1">本节目标 <a class="header-anchor" href="#本节目标" aria-label="Permalink to &quot;本节目标&quot;">​</a></h2><ul><li>掌握 cc-switch 桌面应用的使用</li><li>理解模型配置的图形化切换方式</li><li>学会配置多模型提供商</li><li>了解 MCP 和 Skills 管理</li></ul><hr><h2 id="_4-6-1-工具概述" tabindex="-1">4.6.1 工具概述 <a class="header-anchor" href="#_4-6-1-工具概述" aria-label="Permalink to &quot;4.6.1 工具概述&quot;">​</a></h2><h3 id="什么是-cc-switch" tabindex="-1">什么是 cc-switch <a class="header-anchor" href="#什么是-cc-switch" aria-label="Permalink to &quot;什么是 cc-switch&quot;">​</a></h3><p>cc-switch 是一个<strong>跨平台桌面应用程序</strong>，用于管理和切换 Claude Code、Codex、OpenCode、OpenClaw 和 Gemini 的模型配置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          cc-switch 功能概览                                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  支持的应用                                                                   │</span></span>
<span class="line"><span>│  ├── Claude Code (Claude CLI)                                               │</span></span>
<span class="line"><span>│  ├── Codex                                                                   │</span></span>
<span class="line"><span>│  ├── OpenCode                                                                │</span></span>
<span class="line"><span>│  ├── OpenClaw                                                                │</span></span>
<span class="line"><span>│  └── Gemini                                                                  │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  主要功能                                                                     │</span></span>
<span class="line"><span>│  ├── 多模型提供商配置管理                                                     │</span></span>
<span class="line"><span>│  ├── 一键切换模型                                                            │</span></span>
<span class="line"><span>│  ├── MCP 服务器管理                                                           │</span></span>
<span class="line"><span>│  ├── Skills 技能管理                                                         │</span></span>
<span class="line"><span>│  └── 提示词预设管理                                                          │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  支持的模型提供商                                                            │</span></span>
<span class="line"><span>│  ├── OpenAI (GPT-4o, o1, o3-mini)                                          │</span></span>
<span class="line"><span>│  ├── Anthropic (Claude Sonnet, Haiku, Opus)                                 │</span></span>
<span class="line"><span>│  ├── Google (Gemini 1.5/2.0)                                               │</span></span>
<span class="line"><span>│  ├── DeepSeek (V3, Chat, Coder)                                            │</span></span>
<span class="line"><span>│  ├── 智谱 (GLM-4)                                                           │</span></span>
<span class="line"><span>│  ├── Moonshot (Kimi)                                                        │</span></span>
<span class="line"><span>│  ├── OpenRouter (100+ 模型)                                                 │</span></span>
<span class="line"><span>│  └── 自定义 API Endpoint                                                     │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>![模型切换]/assets/diagrams/81_model_switching.png)</p><p>![模型回退]/assets/diagrams/42_model_fallback.png)</p><hr><h2 id="_4-6-2-安装指南" tabindex="-1">4.6.2 安装指南 <a class="header-anchor" href="#_4-6-2-安装指南" aria-label="Permalink to &quot;4.6.2 安装指南&quot;">​</a></h2><h3 id="windows-安装" tabindex="-1">Windows 安装 <a class="header-anchor" href="#windows-安装" aria-label="Permalink to &quot;Windows 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：从 Release 页面下载</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 访问 https://github.com/farion1231/cc-switch/releases</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 下载 CC-Switch-v{version}-Windows.msi 或便携版</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：使用 winget</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CCSwitch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式三：使用 Chocolatey</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">choco</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cc-switch</span></span></code></pre></div><h3 id="macos-安装" tabindex="-1">macOS 安装 <a class="header-anchor" href="#macos-安装" aria-label="Permalink to &quot;macOS 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：使用 Homebrew</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> farion1231/ccswitch</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cask</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cc-switch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：从 Release 页面下载 .dmg 文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 访问 https://github.com/farion1231/cc-switch/releases</span></span></code></pre></div><h3 id="linux-安装" tabindex="-1">Linux 安装 <a class="header-anchor" href="#linux-安装" aria-label="Permalink to &quot;Linux 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：使用 apt (Debian/Ubuntu)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./cc-switch_{version}_amd64.deb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：使用 dnf (Fedora/RHEL)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./cc-switch-{version}.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式三：使用 AppImage</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cc-switch-{version}.AppImage</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./cc-switch-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{version}</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.AppImage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式四：使用 Flatpak</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">flatpak</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cc-switch.flatpak</span></span></code></pre></div><hr><h2 id="_4-6-3-快速开始" tabindex="-1">4.6.3 快速开始 <a class="header-anchor" href="#_4-6-3-快速开始" aria-label="Permalink to &quot;4.6.3 快速开始&quot;">​</a></h2><h3 id="配置流程图" tabindex="-1">配置流程图 <a class="header-anchor" href="#配置流程图" aria-label="Permalink to &quot;配置流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       cc-switch 配置流程                                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    开始</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  1. 安装 cc-switch  │</span></span>
<span class="line"><span>                          │  (按系统选择方式)    │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  2. 启动应用程序    │</span></span>
<span class="line"><span>                          │  打开 cc-switch     │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  3. 添加提供商      │</span></span>
<span class="line"><span>                          │  点击 &quot;Add Provider&quot; │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  4. 选择预设或自定义 │</span></span>
<span class="line"><span>                          │  ┌───────────────┐  │</span></span>
<span class="line"><span>                          │  │ • 预设配置   │  │</span></span>
<span class="line"><span>                          │  │ • 自定义配置 │  │</span></span>
<span class="line"><span>                          │  └───────────────┘  │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  5. 输入 API Key    │</span></span>
<span class="line"><span>                          │  配置 Endpoint      │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  6. 启用提供商      │</span></span>
<span class="line"><span>                          │  点击 &quot;Enable&quot;      │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                          ┌───────────────────────┐</span></span>
<span class="line"><span>                          │  7. 重启终端/应用   │</span></span>
<span class="line"><span>                          │  使配置生效          │</span></span>
<span class="line"><span>                          └───────────┬───────────┘</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                              ┌───────────────┐</span></span>
<span class="line"><span>                              │   配置完成 ✅   │</span></span>
<span class="line"><span>                              └───────────────┘</span></span></code></pre></div><h3 id="界面说明" tabindex="-1">界面说明 <a class="header-anchor" href="#界面说明" aria-label="Permalink to &quot;界面说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                            cc-switch 主界面                                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │  CC Switch                              [MCP] [Skills] [Prompts]   │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │    │</span></span>
<span class="line"><span>│  │  │  OpenAI   │  │ Anthropic │  │  DeepSeek │  │  智谱 GLM  │  +    │    │</span></span>
<span class="line"><span>│  │  │           │  │           │  │           │  │           │        │    │</span></span>
<span class="line"><span>│  │  │  ● Enabled│  │  ○       │  │  ○       │  │  ○       │        │    │</span></span>
<span class="line"><span>│  │  │  gpt-4o  │  │ sonnet   │  │   v3     │  │  glm-4   │        │    │</span></span>
<span class="line"><span>│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │  当前激活: OpenAI (gpt-4o)                                          │    │</span></span>
<span class="line"><span>│  │  状态: 已连接                                                        │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>主要按钮说明：</span></span>
<span class="line"><span>- [MCP]: 管理 MCP 服务器</span></span>
<span class="line"><span>- [Skills]: 管理技能/插件</span></span>
<span class="line"><span>- [Prompts]: 管理提示词预设</span></span>
<span class="line"><span>- [+]: 添加新的模型提供商</span></span>
<span class="line"><span>- ●/○: 已启用/未启用状态</span></span></code></pre></div><hr><h2 id="_4-6-4-添加模型提供商" tabindex="-1">4.6.4 添加模型提供商 <a class="header-anchor" href="#_4-6-4-添加模型提供商" aria-label="Permalink to &quot;4.6.4 添加模型提供商&quot;">​</a></h2><h3 id="方式一-使用预设配置" tabindex="-1">方式一：使用预设配置 <a class="header-anchor" href="#方式一-使用预设配置" aria-label="Permalink to &quot;方式一：使用预设配置&quot;">​</a></h3><p>cc-switch 内置了常用提供商的预设配置，只需输入 API Key 即可：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 预设支持的提供商</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> OpenAI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Anthropic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Claude)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Google</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Gemini</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DeepSeek</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 智谱</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GLM</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Moonshot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Kimi)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MiniMax</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 百度</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ERNIE</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 阿里</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Qwen</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 腾讯</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Hunyuan</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> OpenRouter</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Cohere</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Mistral</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xAI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Grok)</span></span></code></pre></div><h3 id="方式二-自定义配置" tabindex="-1">方式二：自定义配置 <a class="header-anchor" href="#方式二-自定义配置" aria-label="Permalink to &quot;方式二：自定义配置&quot;">​</a></h3><p>对于自定义 API Endpoint 或代理配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>添加自定义提供商步骤：</span></span>
<span class="line"><span>1. 点击 &quot;+&quot; 按钮</span></span>
<span class="line"><span>2. 选择 &quot;Custom&quot; 或 &quot;Other&quot;</span></span>
<span class="line"><span>3. 填写配置：</span></span>
<span class="line"><span>   - Name: 提供商名称</span></span>
<span class="line"><span>   - API Endpoint: API 地址</span></span>
<span class="line"><span>   - API Key: 密钥</span></span>
<span class="line"><span>   - Model: 默认模型</span></span>
<span class="line"><span>4. 保存并启用</span></span></code></pre></div><h3 id="常用-api-endpoint-参考" tabindex="-1">常用 API Endpoint 参考 <a class="header-anchor" href="#常用-api-endpoint-参考" aria-label="Permalink to &quot;常用 API Endpoint 参考&quot;">​</a></h3><table tabindex="0"><thead><tr><th>提供商</th><th>Endpoint</th></tr></thead><tbody><tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td></tr><tr><td>Anthropic</td><td><code>https://api.anthropic.com</code></td></tr><tr><td>DeepSeek</td><td><code>https://api.deepseek.com/v1</code></td></tr><tr><td>智谱 GLM</td><td><code>https://open.bigmodel.cn/api/paas/v4</code></td></tr><tr><td>Moonshot</td><td><code>https://api.moonshot.cn/v1</code></td></tr><tr><td>Google Gemini</td><td><code>https://generativelanguage.googleapis.com/v1beta</code></td></tr></tbody></table><hr><h2 id="_4-6-5-切换模型" tabindex="-1">4.6.5 切换模型 <a class="header-anchor" href="#_4-6-5-切换模型" aria-label="Permalink to &quot;4.6.5 切换模型&quot;">​</a></h2><h3 id="基本切换" tabindex="-1">基本切换 <a class="header-anchor" href="#基本切换" aria-label="Permalink to &quot;基本切换&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>切换步骤：</span></span>
<span class="line"><span>1. 在主界面点击目标提供商卡片</span></span>
<span class="line"><span>2. 点击 &quot;Enable&quot; 按钮启用</span></span>
<span class="line"><span>3. 重启终端或 Claude Code/Codex/Gemini 应用</span></span>
<span class="line"><span>4. 配置生效</span></span></code></pre></div><h3 id="通过系统托盘快速切换" tabindex="-1">通过系统托盘快速切换 <a class="header-anchor" href="#通过系统托盘快速切换" aria-label="Permalink to &quot;通过系统托盘快速切换&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>托盘菜单使用：</span></span>
<span class="line"><span>1. cc-switch 运行时会显示在系统托盘</span></span>
<span class="line"><span>2. 点击托盘图标显示菜单</span></span>
<span class="line"><span>3. 直接点击提供商名称</span></span>
<span class="line"><span>4. 即时切换（部分应用需要重启）</span></span></code></pre></div><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>⚠️ 重要提示：</span></span>
<span class="line"><span>- 切换后需要重启终端或 Claude Code / Codex / Gemini 客户端才能应用更改</span></span>
<span class="line"><span>- 部分应用可能需要完全退出再重新启动</span></span>
<span class="line"><span>- 切换后首次使用可能需要等待配置加载</span></span></code></pre></div><hr><h2 id="_4-6-6-mcp-服务器管理" tabindex="-1">4.6.6 MCP 服务器管理 <a class="header-anchor" href="#_4-6-6-mcp-服务器管理" aria-label="Permalink to &quot;4.6.6 MCP 服务器管理&quot;">​</a></h2><h3 id="功能说明" tabindex="-1">功能说明 <a class="header-anchor" href="#功能说明" aria-label="Permalink to &quot;功能说明&quot;">​</a></h3><p>cc-switch 可以管理 MCP (Model Context Protocol) 服务器配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                           MCP 管理界面                                         │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  [MCP 按钮] → 打开 MCP 管理面板                                              │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  功能：                                                                       │</span></span>
<span class="line"><span>│  ├── 查看已配置的 MCP 服务器                                                 │</span></span>
<span class="line"><span>│  ├── 添加内置 MCP 模板                                                       │</span></span>
<span class="line"><span>│  ├── 添加自定义 MCP 服务器                                                  │</span></span>
<span class="line"><span>│  ├── 启用/禁用 MCP 服务器                                                  │</span></span>
<span class="line"><span>│  └── 同步到实时配置                                                         │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="添加-mcp-服务器" tabindex="-1">添加 MCP 服务器 <a class="header-anchor" href="#添加-mcp-服务器" aria-label="Permalink to &quot;添加 MCP 服务器&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：使用内置模板</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;MCP&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 按钮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 选择</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Browse Templates&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 选择需要的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MCP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 服务器模板</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Install&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：自定义 MCP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;MCP&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 按钮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Add Custom&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 填写</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MCP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 服务器配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 保存并启用</span></span></code></pre></div><hr><h2 id="_4-6-7-skills-管理" tabindex="-1">4.6.7 Skills 管理 <a class="header-anchor" href="#_4-6-7-skills-管理" aria-label="Permalink to &quot;4.6.7 Skills 管理&quot;">​</a></h2><h3 id="功能说明-1" tabindex="-1">功能说明 <a class="header-anchor" href="#功能说明-1" aria-label="Permalink to &quot;功能说明&quot;">​</a></h3><p>cc-switch 可以管理 Claude Code 的 Skills（技能）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          Skills 管理界面                                        │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  [Skills 按钮] → 打开 Skills 管理面板                                        │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  功能：                                                                       │</span></span>
<span class="line"><span>│  ├── 浏览预配置的 GitHub 仓库                                                │</span></span>
<span class="line"><span>│  ├── 添加自定义 Skills 仓库                                                  │</span></span>
<span class="line"><span>│  ├── 一键安装 Skills 到 ~/.claude/skills/                                  │</span></span>
<span class="line"><span>│  └── 卸载 Skills                                                            │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  安装路径：~/.claude/skills/                                                 │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Skills</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Skills&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 按钮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 浏览或搜索需要的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Skill</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Install&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 等待安装完成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装到指定目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cc-switch 会使用仓库目录名作为安装路径</span></span></code></pre></div><hr><h2 id="_4-6-8-提示词预设管理" tabindex="-1">4.6.8 提示词预设管理 <a class="header-anchor" href="#_4-6-8-提示词预设管理" aria-label="Permalink to &quot;4.6.8 提示词预设管理&quot;">​</a></h2><h3 id="功能说明-2" tabindex="-1">功能说明 <a class="header-anchor" href="#功能说明-2" aria-label="Permalink to &quot;功能说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         提示词预设管理                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  [Prompts 按钮] → 打开提示词管理面板                                        │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  功能：                                                                       │</span></span>
<span class="line"><span>│  ├── 创建系统提示词预设                                                     │</span></span>
<span class="line"><span>│  ├── 使用 Markdown 编辑器编写                                               │</span></span>
<span class="line"><span>│  ├── 预览效果                                                              │</span></span>
<span class="line"><span>│  └── 快速切换提示词                                                        │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="创建提示词预设" tabindex="-1">创建提示词预设 <a class="header-anchor" href="#创建提示词预设" aria-label="Permalink to &quot;创建提示词预设&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Prompts&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 按钮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;New Prompt&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 输入提示词名称</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 使用</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Markdown</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 编辑器编写内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 预览效果</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">6.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 保存</span></span></code></pre></div><hr><h2 id="_4-6-9-集成-openclaw" tabindex="-1">4.6.9 集成 OpenClaw <a class="header-anchor" href="#_4-6-9-集成-openclaw" aria-label="Permalink to &quot;4.6.9 集成 OpenClaw&quot;">​</a></h2><h3 id="配置-openclaw" tabindex="-1">配置 OpenClaw <a class="header-anchor" href="#配置-openclaw" aria-label="Permalink to &quot;配置 OpenClaw&quot;">​</a></h3><p>cc-switch 完全支持 OpenClaw 的模型配置管理：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         OpenClaw 集成                                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  添加 OpenClaw 提供商：                                                      │</span></span>
<span class="line"><span>│  1. 点击 &quot;+&quot; 添加新提供商                                                   │</span></span>
<span class="line"><span>│  2. 选择 &quot;OpenClaw&quot; 或自定义                                                │</span></span>
<span class="line"><span>│  3. 配置 API Endpoint (如使用反代)                                         │</span></span>
<span class="line"><span>│  4. 输入 API Key                                                            │</span></span>
<span class="line"><span>│  5. 启用并重启 OpenClaw                                                    │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>│  支持的模型：                                                                 │</span></span>
<span class="line"><span>│  ├── OpenAI 兼容模型                                                        │</span></span>
<span class="line"><span>│  ├── Anthropic 兼容模型                                                     │</span></span>
<span class="line"><span>│  ├── DeepSeek                                                               │</span></span>
<span class="line"><span>│  └── 自定义 Endpoint                                                        │</span></span>
<span class="line"><span>│                                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="常用-openclaw-配置" tabindex="-1">常用 OpenClaw 配置 <a class="header-anchor" href="#常用-openclaw-配置" aria-label="Permalink to &quot;常用 OpenClaw 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// OpenClaw 配置文件 ~/.openclaw/openclaw.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;models&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;providers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-xxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;baseUrl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://api.openai.com/v1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gpt-4o&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;anthropic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;apiKey&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sk-ant-xxxxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;defaultModel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;claude-sonnet-4-20250514&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="_4-6-10-常见问题" tabindex="-1">4.6.10 常见问题 <a class="header-anchor" href="#_4-6-10-常见问题" aria-label="Permalink to &quot;4.6.10 常见问题&quot;">​</a></h2><h3 id="q1-切换后模型没有生效" tabindex="-1">Q1: 切换后模型没有生效 <a class="header-anchor" href="#q1-切换后模型没有生效" aria-label="Permalink to &quot;Q1: 切换后模型没有生效&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决步骤：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 确保已点击</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Enable&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 启用提供商</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 完全退出</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Claude</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Code</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Codex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Gemini</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 应用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 重新启动应用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查托盘图标是否显示正确</span></span></code></pre></div><h3 id="q2-api-key-验证失败" tabindex="-1">Q2: API Key 验证失败 <a class="header-anchor" href="#q2-api-key-验证失败" aria-label="Permalink to &quot;Q2: API Key 验证失败&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> API</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 是否正确</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> API</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 是否有足够额度</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 网络是否可以访问</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> API</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Endpoint</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 是否使用代理需要额外配置</span></span></code></pre></div><h3 id="q3-mcp-服务器无法连接" tabindex="-1">Q3: MCP 服务器无法连接 <a class="header-anchor" href="#q3-mcp-服务器无法连接" aria-label="Permalink to &quot;Q3: MCP 服务器无法连接&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 排查：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MCP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 服务器地址是否正确</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 确认</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MCP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 服务器是否运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查网络连通性</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 查看</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cc-switch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 日志</span></span></code></pre></div><h3 id="q4-skills-安装失败" tabindex="-1">Q4: Skills 安装失败 <a class="header-anchor" href="#q4-skills-安装失败" aria-label="Permalink to &quot;Q4: Skills 安装失败&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可能原因：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 网络问题无法访问</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GitHub</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 磁盘空间不足</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.claude/skills/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 目录权限问题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查网络连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 清理磁盘空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查目录权限</span></span></code></pre></div><hr><h2 id="本节小结" tabindex="-1">本节小结 <a class="header-anchor" href="#本节小结" aria-label="Permalink to &quot;本节小结&quot;">​</a></h2><ol><li><strong>cc-switch</strong>：跨平台桌面应用，管理 Claude Code/Codex/OpenClaw/Gemini</li><li><strong>安装</strong>：Windows/macOS/Linux 多平台支持</li><li><strong>添加提供商</strong>：预设配置 + 自定义配置</li><li><strong>切换</strong>：GUI 界面点击启用，重启生效</li><li><strong>MCP/Skills/Prompts</strong>：一站式管理</li></ol><hr><h2 id="课后练习" tabindex="-1">课后练习 <a class="header-anchor" href="#课后练习" aria-label="Permalink to &quot;课后练习&quot;">​</a></h2><ol><li>下载安装 cc-switch 桌面应用</li><li>添加一个模型提供商并测试切换</li><li>探索 MCP 和 Skills 管理功能</li><li>配置 OpenClaw 与 cc-switch 集成</li></ol>`,85)])])}const F=a(l,[["render",e]]);export{o as __pageData,F as default};
