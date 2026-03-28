# OpenClaw 完备教程 - 文档导航

> 欢迎来到 OpenClaw 完备教程的文档中心！这里汇集了从入门到精通的所有学习内容。

---

## 📐 目录设计哲学

docs/ 的目录按 **OpenClaw 六层架构** 组织，而非章节顺序：

| 架构层次 | 目录 | 说明 |
|---------|------|------|
| Layer 1 用户层 | [03_channels/](03_channels/) | 渠道：飞书/Telegram/Discord 等 |
| Layer 2 Gateway 层 | [03_gateway/](03_gateway/) | 网关：认证、限流、协议 |
| Layer 3 Agent 层 | [05_minimal_loop/](05_minimal_loop/) | Agent 执行循环 |
| Layer 3 Agent 层 | [05_multi_agent/](05_multi_agent/) | 多 Agent 协作 |
| Layer 4 Model 层 | [02_config_models/](02_config_models/) | 模型配置 |
| Layer 5 Tools 层 | [07_tools_skills/](07_tools_skills/) | 工具 + Skills |
| Layer 6 System 层 | [16_system_layer/](16_system_layer/) | 系统操作 |

> 📍 **首次使用？** 先读 [编号对照表](00_编号对照.md)，了解章节号和目录的对应关系。

---

## 按功能分类

### 🚀 入门

| 目录 | 适合谁 | 核心内容 |
|------|--------|---------|
| [01_overview/](01_overview/) | 所有初学者 | OpenClaw 是什么、历史、架构 |
| [02_setup/](02_setup/) | 刚装好的用户 | 安装、配置、运行 |
| [02_config_models/](02_config_models/) | 需要配置模型的用户 | DeepSeek、OpenAI、Claude |

### 💬 渠道接入

| 目录 | 支持的渠道 |
|------|---------|
| [03_channels/](03_channels/) | Telegram、Discord、Slack、飞书、钉钉、企业微信、QQ、Signal、WhatsApp、Webhook |

### ⚙️ 核心机制

| 目录 | 核心内容 |
|------|---------|
| [05_minimal_loop/](05_minimal_loop/) | Agent Loop、发出指令、工作区、Session、消息路由 |
| [05_multi_agent/](05_multi_agent/) | 多 Agent 协作、Agent Teams、工作流设计 |
| [06_context_memory/](06_context_memory/) | 记忆系统、上下文管理、人设 |

### 🛠️ 工具与扩展

| 目录 | 核心内容 |
|------|---------|
| [07_tools_skills/](07_tools_skills/) | 内置工具、Skills、Browser 自动化、ClawHub |
| [08_extension/](08_extension/) | Plugin 开发、自定义工具、Hook 事件 |

### ⏰ 自动化

| 目录 | 核心内容 |
|------|---------|
| [04_automation/](04_automation/) | Cron 定时任务、Heartbeat、Webhook、工作流自动化 |

### 🖥️ 运维与部署

| 目录 | 核心内容 |
|------|---------|
| [03_gateway/](03_gateway/) | Gateway 配置、API、认证、限流、重试、命令队列 |
| [02_setup/](02_setup/) | Docker 部署、云端部署（腾讯云/Fly.io/Hetzner）|
| [11_security/](11_security/) | 权限管理、数据安全、审计日志、密钥管理 |

### 🌐 界面

| 目录 | 核心内容 |
|------|---------|
| [09_web_ui/](09_web_ui/) | Control UI、Web UI、状态看板 |

### 🔬 高级功能

| 目录 | 核心内容 |
|------|---------|
| [13_advanced/](13_advanced/) | Pi 语音引擎、TTS、Nodes 移动节点 |

### 📊 实战案例

| 目录 | 核心内容 |
|------|---------|
| [14_cases/](14_cases/) | 22 个案例 + 5 个完整项目（AI 团队、早间简报、知识库 RAG 等）|

### 🔧 故障排查

| 目录 | 核心内容 |
|------|---------|
| [15_troubleshooting/](15_troubleshooting/) | 启动问题、渠道问题、工具问题、模型问题、记忆问题 |

### 📚 附录

| 目录 | 内容 |
|------|------|
| [appendices/](appendices/) | A-H：命令速查、配置模板、API对比、故障指南、安全清单、性能优化、资源 |

---

## 快速导航

| 需求 | 推荐文档 |
|------|---------|
| 快速安装 OpenClaw | [02_setup/2.2_installation.md](02_setup/2.2_installation.md) |
| 接入 Telegram | [03_channels/8.3_telegram_integration.md](03_channels/8.3_telegram_integration.md) |
| 接入飞书 | [03_channels/8.2_feishu_integration.md](03_channels/8.2_feishu_integration.md) |
| 设置定时任务 | [04_automation/9.2_scheduled_tasks.md](04_automation/9.2_scheduled_tasks.md) |
| 了解 Agent Loop | [05_minimal_loop/3.1_agent_loop.md](05_minimal_loop/3.1_agent_loop.md) |
| 多 Agent 协作 | [05_multi_agent/7.1_multi_agent_overview.md](05_multi_agent/7.1_multi_agent_overview.md) |
| 配置模型 | [02_config_models/4.1_providers_overview.md](02_config_models/4.1_providers_overview.md) |
| 开发自定义 Skill | [07_tools_skills/5.5_custom_skill.md](07_tools_skills/5.5_custom_skill.md) |
| 遇到问题了 | [15_troubleshooting/](15_troubleshooting/) |
| 看完整项目案例 | [14_cases/](14_cases/) |
| 想看所有 Bug workaround | [读者导航.md](../读者导航.md#--故障排查) |

---

## 补充资源

- [读者导航（按身份找内容）](../读者导航.md)
- [编号对照表](00_编号对照.md)（章节号 → 目录 → 文件）
- [Awesome OpenClaw Use Cases](https://github.com/openclaw/awesome-openclaw-usecases)
- [官方文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)

---

**最后更新**：2026-03-28
