# PicoClaw 项目调研报告

## 项目概述

| 属性 | 详情 |
|------|------|
| **项目名称** | PicoClaw |
| **定位** | Go 编写的超高效 AI 助手 |
| **标语** | $10 Hardware · <10MB RAM · <1s Boot · 皮皮虾，我们走！ |
| **GitHub** | https://github.com/sipeed/picoclaw |
| **官网** | https://picoclaw.io |
| **出品** | Sipeed (矽速科技) |
| **许可证** | MIT |
| **开发语言** | Go 1.25+ |
| **最新版本** | v0.2.3 (2026-03-17) |
| **GitHub Stars** | 25K+ |

---

## 一、面向开发者 👨‍💻

### 1.1 技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                   PicoClaw 技术栈                            │
├─────────────────────────────────────────────────────────────┤
│  Runtime                                                    │
│  ├── Go 1.25+ · Single Static Binary                       │
│  └── Cross-Platform: x86_64, ARM64, MIPS, RISC-V, LoongArch │
├─────────────────────────────────────────────────────────────┤
│  Architecture                                               │
│  ├── Gateway (HTTP/WS 控制平面)                            │
│  ├── Agent Orchestration                                   │
│  ├── Channels (8+ IM)                                      │
│  ├── Providers (多 LLM)                                    │
│  ├── Tools (70+)                                           │
│  ├── Memory (JSONL store)                                  │
│  └── Skills (插件)                                         │
├─────────────────────────────────────────────────────────────┤
│  Special Features                                           │
│  ├── MCP Protocol Support                                  │
│  ├── Vision Pipeline                                       │
│  ├── Model Routing                                         │
│  └── Peripheral Support (ESP32/STM32/Arduino)              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心特性

**AI 自举开发**:
- 95% 核心代码由 AI Agent 生成
- Go 原生实现，从 Python 迁移重构

**极致性能**:
- <10MB 内存占用
- <1s 启动时间（0.6GHz 单核）
- 单文件二进制分发

**硬件支持**:
- $9.9 LicheeRV-Nano
- $30-50 NanoKVM
- $50 MaixCAM
- 旧 Android 手机（Termux）

### 1.3 快速开始

```bash
# 方式1: 官网下载（推荐）
# 访问 https://picoclaw.io 自动检测平台

# 方式2: GitHub Releases
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Linux_x86_64.tar.gz
tar xzf picoclaw_Linux_x86_64.tar.gz

# 初始化
./picoclaw onboard

# 配置 (~/.picoclaw/config.json)
{
  "model_list": [
    {
      "model_name": "gpt-5.4",
      "model": "openai/gpt-5.4",
      "api_key": "your-key"
    }
  ]
}

# 对话
./picoclaw agent -m "Hello!"
```

### 1.4 构建开发

```bash
git clone https://github.com/sipeed/picoclaw.git
cd picoclaw

make deps
make build

# 多平台构建
make build-all

# Raspberry Pi Zero 2 W
make build-pi-zero
```

### 1.5 渠道支持

| 渠道 | 难度 | 特点 |
|------|------|------|
| Telegram | ⭐ 简单 | 推荐，仅需 token |
| Discord | ⭐ 简单 | bot token + intents |
| WhatsApp | ⭐ 简单 | 原生 QR 扫码 |
| QQ | ⭐⭐ 中等 | AppID + AppSecret |
| DingTalk | ⭐⭐ 中等 | Stream Mode |
| Matrix | ⭐⭐ 中等 | homeserver + token |
| LINE | ⭐⭐ 中等 | webhook 配置 |
| WeCom | ⭐⭐ 中等 | 三种集成方式 |

---

## 二、面向产品经理 📊

### 2.1 产品定位

**PicoClaw** 是面向 **边缘设备** 和 **低成本硬件** 的超轻量级 AI 助手，主打"让 AI 跑在 $10 设备上"。

### 2.2 核心价值主张

| 用户群体 | 价值 |
|----------|------|
| **硬件爱好者** | 在低成本开发板运行 AI |
| **IoT 开发者** | 嵌入式 AI 助手方案 |
| **预算敏感用户** | 无需昂贵服务器 |
| **极客用户** | 极致性能体验 |

### 2.3 差异化特性

1. **硬件极致优化**: <10MB RAM，$10 设备可跑
2. **Go 语言重写**: 比 Python 版本更快更省资源
3. **AI 自举**: 展示 AI 辅助开发能力
4. **广泛硬件**: 支持 RISC-V、MIPS、ARM 等

### 2.4 使用场景

**智能家居中枢**:
- $10 设备作为家庭 AI 中心
- 语音控制、自动化场景

**边缘 AI 助手**:
- 工厂设备监控
- 远程运维助手

**旧设备复活**:
- 10 年前的 Android 手机
- 变成智能助手

### 2.5 发展里程碑

```
2026-02-09: 🎉 PicoClaw 发布，1 天完成开发
2026-02-13: 5000 stars（4天）
2026-02-16: 12000 stars（1周）
2026-02-26: 20000 stars（17天）
2026-03-09: v0.2.1 - MCP、4 新渠道、视觉管道
2026-03-17: v0.2.3 - 25K stars、系统托盘、安全修复
```

---

## 三、面向架构师 🏗️

### 3.1 系统架构

```
┌─────────────────────────────────────────┐
│          PicoClaw Binary                │
├─────────────────────────────────────────┤
│  Gateway                                │
│  ├── HTTP/WebSocket Server              │
│  ├── Health/Metrics                     │
│  └── Web Dashboard (Launcher)           │
├─────────────────────────────────────────┤
│  Agent Core                             │
│  ├── Tool Dispatch                      │
│  ├── Memory Management                  │
│  └── Cron Scheduler                     │
├─────────────────────────────────────────┤
│  Adapters                               │
│  ├── Channels (8+)                      │
│  ├── Providers (多 LLM)                 │
│  ├── Tools (70+)                        │
│  └── MCP Client                         │
└─────────────────────────────────────────┘
```

### 3.2 部署架构

| 模式 | 资源需求 | 适用场景 |
|------|----------|----------|
| **原生二进制** | <10MB RAM | 边缘设备 |
| **Docker** | +容器开销 | 服务器部署 |
| **Launcher** | Web UI | 桌面用户 |

### 3.3 性能对比

| 指标 | OpenClaw | NanoBot | **PicoClaw** |
|------|----------|---------|--------------|
| **语言** | TypeScript | Python | **Go** |
| **RAM** | >1GB | >100MB | **<10MB** |
| **启动(0.8GHz)** | >500s | >30s | **<1s** |
| **成本** | $599 Mac Mini | ~$50 SBC | **$10** |

### 3.4 扩展性

**模型路由**:
```json
{
  "model_list": [
    {"model_name": "light", "model": "gpt-4o-mini"},
    {"model_name": "heavy", "model": "gpt-4"}
  ]
}
```

**技能系统**:
```bash
picoclaw skills list
picoclaw skills install <url>
```

**MCP 集成**:
- 连接任意 MCP 服务器
- 扩展工具能力

### 3.5 安全设计

- **Cron 安全门**: 定时任务权限控制
- **Sub-agent 状态跟踪**: spawn_status
- **配置隔离**: 多实例支持

---

## 四、面向 SaaS 客户 💼

### 4.1 商业化潜力

| 维度 | 评估 |
|------|------|
| **硬件生态** | Sipeed 硬件产品线协同 |
| **许可** | MIT，商业友好 |
| **社区** | 25K stars，活跃社区 |
| **商业化** | 目前免费，潜在企业服务 |

### 4.2 企业适用性

**优势**:
- 极低资源占用，降低基础设施成本
- 单文件部署，简化运维
- 广泛硬件支持，设备选择灵活

**限制**:
- 早期版本（v0.2.x），API 不稳定
- 缺乏企业级功能（审计、SSO）
- 社区支持为主

### 4.3 部署建议

**边缘场景**:
```bash
# LicheeRV-Nano $9.9 设备
wget https://.../picoclaw_Linux_riscv64.tar.gz
tar xzf picoclaw_Linux_riscv64.tar.gz
./picoclaw onboard
./picoclaw gateway
```

**服务器场景**:
```bash
# Docker Compose
docker compose -f docker/docker-compose.yml --profile gateway up -d
```

### 4.4 竞品对比

| 维度 | PicoClaw | ZeroClaw | NanoBot |
|------|----------|----------|---------|
| **语言** | Go | Rust | Python |
| **内存** | <10MB | <5MB | <100MB |
| **启动** | <1s | <10ms | 秒级 |
| **硬件** | $10 | $10 | ~$50 |
| **成熟度** | 新起 | 新起 | 较成熟 |
| **Stars** | 25K | 增长中 | 活跃 |

---

## 五、总结与建议

### 优势
1. **极致性能**: <10MB RAM，<1s 启动
2. **硬件友好**: 支持 $10 设备和多种架构
3. **AI 自举**: 展示 AI 开发能力
4. **社区爆发**: 25K stars，增长迅速

### 风险
1. **早期版本**: v0.2.x，快速迭代中
2. **功能精简**: 相比 Python 版本功能较少
3. **企业功能**: 缺乏审计、管理等

### 适用场景
- 边缘 AI 设备
- IoT 智能助手
- 低成本家庭自动化
- 嵌入式系统

### 建议
- **硬件厂商**: 参考 PicoClaw 集成 AI 能力
- **开发者**: 学习 Go 语言 AI 开发实践
- **用户**: 适合极客和技术爱好者

---

**报告日期**: 2026-03-21  
**数据来源**: GitHub 官方仓库、picoclaw.io、Sipeed 社区
