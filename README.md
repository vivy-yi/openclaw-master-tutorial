# 🦞 OpenClaw Master Tutorial

> 从零基础到熟练使用 — 构建你自己的 AI 助手

---

## 👉 你想做什么？

| 你的情况 | 跳转 |
|---------|------|
| 🆕 刚听说 OpenClaw，想了解是什么 | [👉 认识 OpenClaw](chapters/01_认识openclaw/) |
| 🚀 想快速部署并运行 | [👉 快速部署](chapters/02_快速部署/) |
| 💬 想接入飞书 / Telegram / 钉钉 | [👉 渠道集成](chapters/05_渠道集成/) |
| ⏰ 想设置定时任务和自动化 | [👉 日程与任务自动化](chapters/05_日程任务自动化/) |
| 📁 想管理文件和知识库 | [👉 文件与知识管理](chapters/04_文件知识管理/) |
| 🧠 想了解 Agent 工作原理 | [👉 发出指令](chapters/03_发出指令/) |
| 🛠️ 想开发插件或 Skills | [👉 工具与 Skills 系统](chapters/10_工具与Skills系统/) |
| 👨‍💻 想开发代码或使用 AI 辅助 | [👉 代码开发辅助](chapters/07_代码开发辅助/) |
| 🔐 想配置安全策略 | [👉 安全配置](chapters/13_安全配置/) |
| 🔧 遇到问题需要排查 | [👉 监控维护](chapters/14_监控维护/) |

> 💡 **完整导航**：所有读者路径见 [读者导航.md](读者导航.md)

---

## 🚀 快速上手

```
第一步：认识 OpenClaw
  chapters/01_认识openclaw/1.1_历史与诞生.md

第二步：10 分钟完成部署
  chapters/02_快速部署/2.2_安装指引.md

第三步：连接第一个渠道（推荐 Telegram）
  chapters/05_渠道集成/5.7_Telegram集成.md

第四步：发出第一条指令
  chapters/03_发出指令/3.2_第一条命令.md
```

**常用命令：**

```bash
openclaw status              # 查看状态
openclaw gateway restart     # 重启 Gateway
openclaw gateway logs -f     # 查看日志
```

---

## 📚 目录结构

| 目录 | 内容 | 受众 |
|------|------|------|
| [chapters/01_认识openclaw/](chapters/01_认识openclaw/) | 产品认知、核心能力、竞品对比 | 所有人 |
| [chapters/02_快速部署/](chapters/02_快速部署/) | 安装、本地、云端、Docker、移动端 | 所有人 |
| [chapters/03_发出指令/](chapters/03_发出指令/) | Agent 循环、会话、工作区、记忆 | 进阶用户 |
| [chapters/03_模型配置/](chapters/03_模型配置/) | DeepSeek / OpenAI / Claude / Ollama | 配置用户 |
| [chapters/04_文件知识管理/](chapters/04_文件知识管理/) | 文件系统、CLI、知识库 | 知识管理 |
| [chapters/05_渠道集成/](chapters/05_渠道集成/) | 飞书 / Telegram / 钉钉 / Discord / 企业微信 / QQ 等 15 个渠道 | 集成用户 |
| [chapters/05_日程任务自动化/](chapters/05_日程任务自动化/) | Cron、Heartbeat、Webhook、工作流 | 自动化 |
| [chapters/06_上下文与记忆/](chapters/06_上下文与记忆/) | 上下文、消息历史、人格配置、长期记忆 | 进阶用户 |
| [chapters/06_浏览器网络操作/](chapters/06_浏览器网络操作/) | 浏览器自动化、API 调用、邮件、日历 | 技术用户 |
| [chapters/07_代码开发辅助/](chapters/07_代码开发辅助/) | 代码辅助、Git 集成、开发流程 | 开发者 |
| [chapters/10_工具与Skills系统/](chapters/10_工具与Skills系统/) | 工具三层架构、内置 Skills、ClawHub、**自定义技能** | 所有用户 |
| [chapters/11_自定义Web界面/](chapters/11_自定义Web界面/) | WebClaw、ClawDeck、LobsterBoard、插件开发 | 开发者 |
| [chapters/13_安全配置/](chapters/13_安全配置/) | 权限、Profile、审计日志、密钥管理 | 运维安全 |
| [chapters/14_监控维护/](chapters/14_监控维护/) | 故障排查、Gateway、限流、重试策略 | 运维 |
| [chapters/16_扩展开发/](chapters/16_扩展开发/) | 插件 SDK、自定义工具、Hook 事件 | 开发者 |
| [chapters/17_进阶专题/](chapters/17_进阶专题/) | Pi 引擎、TTS、Nodes 移动节点 | 高级用户 |
| [chapters/18_Skills开发/](chapters/18_Skills开发/) | Skills 进阶：知识图谱、Excalidraw、RAG、自优化 | 高级开发者 |
| [chapters/19_多Agent协作/](chapters/19_多Agent协作/) | 多 Agent 协作模式、ACP 协议、并行编排 | 系统设计 |
| [chapters/21_CLI工具与命令开发/](chapters/21_CLI工具与命令行开发/) | OpenCLI、飞书 CLI、浏览器自动化工具 | 开发者 |
| [chapters/案例集/](chapters/案例集/) | 23 个实战项目案例（生活/自动化/金融等） | 实践者 |
| [chapters/附录/](chapters/附录/) | 附录 A~H + 反馈指南 | 参考 |
| [chapters/agent-management/](chapters/agent-management/) | 27 篇 Agent 管理专题（YouTube/Gateway/团队设计等） | 高级运营 |
| [chapters/mo-xi/](chapters/mo-xi/) | 墨家 AI 量化系统设计文档 | 开发者 |

---

## 🔧 Troubleshooting

> 🔴 **最新 Bug（更新于 2026-03-28）**

| Bug | 问题 | 解决方案 |
|-----|------|---------|
| [#56270](https://github.com/openclaw/openclaw/issues/56270) | WhatsApp 重连风暴（v2026.3.24 回归） | 暂时使用 Telegram |
| [#56274](https://github.com/openclaw/openclaw/issues/56274) | Discord Gateway 崩溃 | 监控 + 自动重启 |
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | `/stop` 无法中断执行 | `messages.queue.mode: steer` ✅ |

| 问题类型 | 文档 |
|---------|------|
| 启动问题 | [chapters/14_监控维护/15.1_启动问题排查.md](chapters/14_监控维护/) |
| 渠道问题 | [chapters/14_监控维护/15.2_渠道问题排查.md](chapters/14_监控维护/) |
| 工具问题 | [chapters/14_监控维护/15.3_工具问题排查.md](chapters/14_监控维护/) |

---

## 🗺️ 学习路径

完整 7 天学习计划见 [LEARNING_PATH.md](LEARNING_PATH.md)

```
Day 1 → 认识 + 部署
Day 2 → 配置 + 命令
Day 3 → 文件 + 知识库
Day 4 → 日程 + 自动化
Day 5 → 平台集成
Day 6 → 浏览器 + 开发辅助
Day 7 → 实战项目
```

---

## 快速链接

- [读者导航](读者导航.md) — 按读者身份分类
- [7 天学习路径](LEARNING_PATH.md)
- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [GitHub Issues](https://github.com/openclaw/openclaw/issues)

---

## 参与贡献

欢迎提交 Issue 和 Pull Request！

## License

[CC BY-NC-SA 4.0](LICENSE)

---

**最后更新**：2026-04-06（v1.3：整合排错实战 + 外部教程资源 + 版本更新）

---

## 📌 OpenClaw 版本追踪

> 追踪最新稳定版本，配套教程同步更新

| 版本 | 日期 | 说明 |
|------|------|------|
| [v2026.4.2](https://github.com/openclaw/openclaw/releases) | 2026-04-02 | 最新稳定版 |
| [v2026.4.1](https://github.com/openclaw/openclaw/releases) | 2026-04-01 | 稳定版更新 |
| v2026.3.24 | 2026-03-24 | ⚠️ 含已知 Bug，详见故障排查章节 |

| 资源 | 链接 |
|------|------|
| OpenClaw Release Notes | [GitHub Releases](https://github.com/openclaw/openclaw/releases) |
| Awesome OpenClaw | [GitHub](https://github.com/openclaw/awesome-openclaw) |
| 官方文档 | [docs.openclaw.ai](https://docs.openclaw.ai) |
