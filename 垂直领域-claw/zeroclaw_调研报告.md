# ZeroClaw 项目调研报告

## 项目概述

| 属性 | 详情 |
|------|------|
| **项目名称** | ZeroClaw |
| **定位** | 100% Rust 个人 AI 助手 |
| **标语** | Zero overhead. Zero compromise. 100% Rust. 100% Agnostic. |
| **副标题** | Runs on $10 hardware with <5MB RAM |
| **GitHub** | https://github.com/zeroclaw-labs/zeroclaw |
| **官网** | https://zeroclawlabs.ai |
| **团队** | Harvard/MIT/Sundai.Club |
| **许可证** | MIT OR Apache 2.0 (双许可) |
| **开发语言** | Rust |
| **最新版本** | 活跃开发中 |

---

## 一、面向开发者 👨‍💻

### 1.1 技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                   ZeroClaw 技术栈                            │
├─────────────────────────────────────────────────────────────┤
│  Runtime                                                    │
│  ├── Rust Stable · Single Binary                            │
│  └── Zero Runtime Dependencies                              │
├─────────────────────────────────────────────────────────────┤
│  Core Systems                                               │
│  ├── Gateway (HTTP/WS/SSE)                                  │
│  ├── Agent Orchestration (Hands)                           │
│  ├── 25+ Channels                                          │
│  ├── 20+ LLM Providers                                     │
│  ├── 70+ Tools                                             │
│  ├── Memory System                                         │
│  ├── Skills Platform                                       │
│  ├── Peripherals (ESP32/STM32/Arduino)                     │
│  └── Tunnel (Cloudflare/Tailscale/ngrok)                   │
├─────────────────────────────────────────────────────────────┤
│  Frontend                                                   │
│  └── React 19 + Vite 6 + Tailwind CSS 4                    │
│      (served from Gateway)                                  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心特性

**极致性能**:
- <5MB RAM 占用
- <10ms 冷启动
- ~8.8MB 二进制文件

**多认证方式**:
- **OAuth**: OpenAI Codex, Gemini, GitHub Copilot
- **API Key**: 20+ 提供商支持

**Hardware Peripherals**:
- ESP32 / ESP32-UI
- STM32 Nucleo
- Arduino / Uno Q Bridge

### 1.3 快速开始

```bash
# 方式1: Homebrew
brew install zeroclaw

# 方式2: 一键安装
git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw
./install.sh

# 或带 API Key 安装
./install.sh --api-key "sk-..." --provider openrouter

# 初始化
zeroclaw onboard

# 启动网关
zeroclaw gateway  # 默认 127.0.0.1:42617

# 对话
zeroclaw agent -m "Hello, ZeroClaw!"

# 完整自主运行
zeroclaw daemon
```

### 1.4 开发构建

```bash
git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw

cargo build --release --locked
cargo install --path . --force --locked

# 开发模式
cargo run --release -- status
```

**构建资源需求**:

| 资源 | 最低 | 推荐 |
|------|------|------|
| RAM + Swap | 2GB | 4GB+ |
| 磁盘空间 | 6GB | 10GB+ |

### 1.5 核心命令

```bash
zeroclaw onboard              # 引导配置
zeroclaw status               # 状态检查
zeroclaw doctor               # 诊断
zeroclaw gateway              # 启动网关
zeroclaw daemon               # 完整自主模式
zeroclaw agent -m "..."       # 单条消息
zeroclaw service install      # 安装为系统服务
zeroclaw cron add "*/5 * * * *" --prompt "Check health"
zeroclaw migrate openclaw     # 从 OpenClaw 迁移
```

---

## 二、面向产品经理 📊

### 2.1 产品定位

**ZeroClaw** 是面向追求 **极致性能** 和 **完全控制** 用户的 **100% Rust AI 助手**。

### 2.2 核心价值主张

| 用户群体 | 价值 |
|----------|------|
| **性能追求者** | <5MB RAM，<10ms 启动 |
| **安全敏感者** | Rust 内存安全，多层沙盒 |
| **硬件极客** | 支持 ESP32、Arduino 等外设 |
| **自托管用户** | 完全本地运行，数据自控 |

### 2.3 差异化特性

1. **Rust 原生**: 100% Rust，零运行时依赖
2. **双许可**: MIT + Apache 2.0，最大自由度
3. **学术背景**: Harvard/MIT/Sundai.Club
4. **SOP 支持**: 标准作业程序自动化
5. **硬件集成**: 物联网设备控制

### 2.4 使用场景

**个人 AI 中枢**:
- 本地运行的私密助手
- 多平台消息聚合

**边缘 AI**:
- 超低资源设备运行
- 物联网场景

**开发测试**:
- 快速验证 AI 应用
- 工具开发和测试

### 2.5 功能亮点

| 功能 | 描述 |
|------|------|
| **25+ Channels** | WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Matrix, IRC, Email, Bluesky, Nostr... |
| **20+ Providers** | OpenAI, Anthropic, Azure, Gemini, Groq, OpenRouter... |
| **70+ Tools** | Shell, Git, Browser, Jira, Notion, Google Workspace... |
| **Web Dashboard** | React 19 实时聊天、记忆浏览器、配置编辑 |
| **Autonomy Levels** | ReadOnly / Supervised / Full |
| **Sandboxes** | Landlock, Bubblewrap, Docker |

---

## 三、面向架构师 🏗️

### 3.1 系统架构

```
┌─────────────────────────────────────────┐
│           ZeroClaw Binary               │
│  (~8.8MB, <5MB RAM runtime)             │
├─────────────────────────────────────────┤
│  Control Plane                          │
│  ├── Gateway HTTP/WS/SSE               │
│  ├── Sessions & Presence               │
│  ├── Config & Cron                     │
│  └── Web Dashboard (React 19)          │
├─────────────────────────────────────────┤
│  Agent Core                             │
│  ├── Orchestration Loop                │
│  ├── Tool Dispatch                     │
│  ├── Memory Loading                    │
│  └── SOP Engine                        │
├─────────────────────────────────────────┤
│  Traits (Swappable)                     │
│  ├── Provider (20+)                    │
│  ├── Channel (25+)                     │
│  ├── Tool (70+)                        │
│  ├── Memory                            │
│  └── Tunnel                            │
└─────────────────────────────────────────┘
```

### 3.2 安全架构

**多层防护**:
```
┌─────────────────────────────────────┐
│  1. DM Pairing (配对码机制)         │
├─────────────────────────────────────┤
│  2. Autonomy Levels                 │
│     - ReadOnly                      │
│     - Supervised (default)          │
│     - Full                          │
├─────────────────────────────────────┤
│  3. Sandboxing                      │
│     - Workspace Isolation           │
│     - Path Traversal Blocking       │
│     - Landlock (Linux)              │
│     - Bubblewrap                    │
│     - Docker Runtime                │
├─────────────────────────────────────┤
│  4. Rate Limiting                   │
│     - Max actions/hour              │
│     - Cost caps/day                 │
├─────────────────────────────────────┤
│  5. E-Stop (紧急停止)               │
└─────────────────────────────────────┘
```

### 3.3 性能基准

| 指标 | OpenClaw | NanoBot | PicoClaw | **ZeroClaw** |
|------|----------|---------|----------|--------------|
| **语言** | TypeScript | Python | Go | **Rust** |
| **RAM** | >1GB | >100MB | <10MB | **<5MB** |
| **启动(0.8GHz)** | >500s | >30s | <1s | **<10ms** |
| **Binary** | ~28MB | N/A | ~8MB | **~8.8MB** |
| **成本** | $599 | ~$50 | $10 | **$10** |

### 3.4 部署模式

| 运行时 | 适用场景 | 配置 |
|--------|----------|------|
| **native** | 信任环境 | `runtime.kind = "native"` |
| **docker** | 严格隔离 | `runtime.kind = "docker"` |

### 3.5 配置示例

**最小配置** (`~/.zeroclaw/config.toml`):
```toml
default_provider = "anthropic"
api_key = "sk-ant-..."
```

**完整配置**:
```toml
[channels.telegram]
bot_token = "123456:ABC..."

[channels.discord]
token = "..."

[tunnel]
kind = "cloudflare"  # tailscale, ngrok, openvpn
```

---

## 四、面向 SaaS 客户 💼

### 4.1 企业级特性

| 特性 | 状态 | 说明 |
|------|------|------|
| **审计日志** | ✅ | 完整操作记录 |
| **RBAC** | ⚠️ | 基础权限控制 |
| **SSO** | ❌ | 需自建 |
| **多租户** | ❌ | 单用户设计 |
| **高可用** | ⚠️ | 单实例运行 |

### 4.2 商业化考量

**当前状态**:
- 开源免费（MIT/Apache 2.0）
- 社区驱动开发
- 无商业支持承诺

**潜在商业路径**:
- ZeroClaw Labs 可能提供企业服务
- 托管版本
- 定制开发

### 4.3 企业部署建议

**适用**:
- 技术团队内部使用
- 边缘设备部署
- 隐私敏感场景

**不适用**:
- 大规模团队部署
- 需要集中管理
- 非技术用户

### 4.4 竞品对比

| 维度 | ZeroClaw | PicoClaw | nanobot |
|------|----------|----------|---------|
| **语言** | Rust | Go | Python |
| **内存** | <5MB | <10MB | <100MB |
| **启动** | <10ms | <1s | 秒级 |
| **安全** | 最强 | 强 | 基础 |
| **外设** | ✅ | ✅ | ❌ |
| **成熟度** | 新 | 新 | 较新 |
| **学术背景** | Harvard/MIT | 商业公司 | 大学 |

---

## 五、总结与建议

### 优势
1. **极致性能**: <5MB RAM，<10ms 启动
2. **Rust 安全**: 内存安全，无运行时错误
3. **双许可**: MIT + Apache 2.0，最大自由度
4. **学术背景**: Harvard/MIT 出品
5. **功能丰富**: 25+ 渠道，70+ 工具

### 风险
1. **早期项目**: 快速迭代，API 可能变动
2. **社区支持**: 无商业支持
3. **学习曲线**: Rust 门槛较高

### 适用场景
- 极致性能要求的边缘部署
- Rust 生态技术栈
- 安全敏感的自托管场景
- 学术研究和实验

### 建议
- **追求性能**: ZeroClaw 是最佳选择
- **生产使用**: 建议等 1.0 版本
- **学习参考**: 优秀的 Rust AI 项目范例

---

**报告日期**: 2026-03-21  
**数据来源**: GitHub 官方仓库、zeroclawlabs.ai、社区文档
