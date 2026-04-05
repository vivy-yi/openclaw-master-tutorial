# 🦞 OpenClaw 完备教程

> 从入门到精通 — 打造你的专属 AI 助手

---

## 👉 你在找什么？

**第一次来？先回答这个问题：**

| 你的情况 | 点击进入 |
|---------|---------|
| 🆕 刚听说 OpenClaw，想了解它是什么 | [👉 普通用户路径](#-普通用户) |
| 💬 想接入 Telegram / 飞书 / 钉钉等渠道 | [👉 渠道接入](#-渠道接入) |
| ⏰ 想设置定时任务、自动化工作流 | [👉 自动化](#-自动化) |
| 👨‍💻 想开发插件或把 OpenClaw 集成到产品 | [👉 开发者](#-开发者) |
| 🏗️ 需要设计基于 OpenClaw 的系统架构 | [👉 架构师](#-架构师) |
| 💰 想评估 OpenClaw 的价值和商业场景 | [👉 决策者](#-决策者) |
| 🔧 遇到问题了 | [👉 故障排查](#-故障排查) |

> 💡 **完整导航**：所有读者路径都在 [读者导航.md](读者导航.md) 中

---

## 🚶 普通用户

**目标**：把 OpenClaw 用起来

### 快速开始

```
① 认识 OpenClaw
   docs/01_overview/1.1_history.md → 是什么

② 安装部署
   docs/02_setup/2.2_installation.md → 安装（选一个）
   docs/02_setup/2.3_configuration.md → 基础配置

③ 接入渠道
   docs/03_channels/8.3_telegram_integration.md → Telegram（最快）
   docs/03_channels/10.1_china_channels_overview.md → 中国渠道总览

④ 发出第一个指令
   docs/05_minimal_loop/3.2_first_command.md → 快速上手
   docs/05_minimal_loop/3.4_memory.md → 让它记住重要信息
```

### 常用命令

```bash
openclaw status          # 查看状态
openclaw gateway restart # 重启
openclaw gateway logs -f # 查看日志
```

---

## 💬 渠道接入

| 渠道 | 文档 | 难度 |
|------|------|------|
| Telegram | [8.3 Telegram 集成](docs/03_channels/8.3_telegram_integration.md) | ⭐ 最简单 |
| 飞书 | [8.2 飞书集成](docs/03_channels/8.2_feishu_integration.md) | ⭐ 简单 |
| 钉钉 | [10.2 钉钉集成](docs/03_channels/10.2_dingtalk_integration.md) | ⭐ 简单 |
| 企业微信 | [10.3 企业微信集成](docs/03_channels/10.3_wecom_integration.md) | ⭐⭐ 中等 |
| Discord | [8.4 Discord 集成](docs/03_channels/8.4_discord_integration.md) | ⭐⭐ 中等 |
| WhatsApp | ⚠️ [有已知问题，见故障排查](#-故障排查) | — |

> ⚠️ **Microsoft Teams**（v2026.3.24 新支持）：[chapters/10_新兴渠道](chapters/10_新兴渠道/README.md#104-microsoft-teams)

---

## 👨‍💻 开发者

| 学习阶段 | 文档 |
|---------|------|
| 架构概览 | [1.2 系统架构](docs/01_overview/1.2_architecture.md) |
| 工具系统 | [5.1 Tools 概述](docs/07_tools_skills/5.1_tools_overview.md) |
| Skill 开发 | [5.5 自定义 Skill](docs/07_tools_skills/5.5_custom_skill.md) |
| Plugin 开发 | [12.2 插件开发](docs/08_extension/12.2_plugin_dev.md) |
| Gateway 协议 | [10.6 Gateway 协议](docs/03_gateway/10.6_gateway_protocol.md) |
| **深度文档** | [architect-guide/](architect-guide/README.md) |

---

## 🏗️ 架构师

| 文档 | 内容 |
|------|------|
| [架构指南目录](architect-guide/README.md) | 全部深度文档索引 |
| [系统架构](architect-guide/core/architecture-overview.md) | 架构设计哲学 |
| [Agent Loop](architect-guide/core/agent-loop.md) | 执行引擎深度解析 |
| [会话与记忆](architect-guide/core/session-memory.md) | 记忆系统架构 |
| [安全模型](architect-guide/core/security-model.md) | 安全架构 |
| [成本优化](architect-guide/core/cost-optimization.md) | LLM 成本模型 |
| [部署模式](architect-guide/operation/deployment-patterns.md) | 部署拓扑 |
| [高可用设计](architect-guide/operation/high-availability.md) | HA 架构 |

---

## 💰 决策者

| 文档 | 内容 |
|------|------|
| [OpenClaw 是什么](docs/01_overview/1.1_history.md) | 产品定位 |
| [对比其他方案](docs/01_overview/1.3_comparison.md) | 竞品分析 |
| [典型案例](docs/14_cases/14.1_comprehensive_cases.md) | 应用场景 |
| [盈利项目参考](docs/14_cases/top10-profit-projects.md) | 商业模式 |
| [成本估算](architect-guide/core/cost-optimization.md) | 投入产出 |

---

## 🔧 故障排查

> 🔴 **今日最新 Bug**（2026-03-28 更新）

| Bug | 问题 | 解决方案 |
|-----|------|---------|
| [#56270](https://github.com/openclaw/openclaw/issues/56270) | WhatsApp 重连循环（v2026.3.24 regression） | 暂用 Telegram 替代 |
| [#56274](https://github.com/openclaw/openclaw/issues/56274) | Discord Gateway 完全崩溃 | 监控 + 自动重启 |
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | `/stop` 无法中断任务 | `messages.queue.mode: steer` ✅ |
| [#56045](https://github.com/openclaw/openclaw/issues/56045) | Cron 删除后持续投递 | 删除后重启 Gateway ✅ |

| 问题类型 | 文档 |
|---------|------|
| 启动失败 | [15.1 启动问题](docs/15_troubleshooting/15.1_startup_issues.md) |
| 渠道问题 | [15.2 渠道问题](docs/15_troubleshooting/15.2_channel_issues.md) |
| 工具问题 | [15.3 工具问题](docs/15_troubleshooting/15.3_tool_issues.md) |
| 模型问题 | [15.4 模型问题](docs/15_troubleshooting/15.4_model_issues.md) |

> 👋 **需要反馈或建议？** → [👋 社区反馈指南](docs/feedback/README.md)

---

## 📚 文档结构说明

| 目录 | 说明 | 适合谁 |
|------|------|--------|
| [docs/](docs/) | 功能模块参考手册（按技术域分类） | 所有读者 |
| [chapters/](chapters/) | 学习路径章节（按学习顺序） | 按步骤学习的用户 |
| [chapters/22_新兴应用场景/](chapters/22_新兴应用场景/) | 🆕 最新：Agent 社交、安全、自主交易、生活自动化、多 Agent 编排 | 早期采用者 |
| [architect-guide/](architect-guide/) | 架构师深度文档（源码级） | 开发者 / 架构师 |

---

## 示例配置

| 文件 | 说明 |
|------|------|
| [examples/docker-compose.yml](examples/docker-compose.yml) | Docker 部署 |
| [.env.example](examples/.env.example) | 环境变量模板 |

---

## 快速链接

- [完整读者导航](读者导航.md) — 按身份找路径
- [故障排查入口](docs/15_troubleshooting/)
- [架构师指南](architect-guide/README.md)
- [GitHub Issues](https://github.com/openclaw/openclaw/issues)

---

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[CC BY-NC-SA 4.0](LICENSE)

---

**最后更新**: 2026-03-28
