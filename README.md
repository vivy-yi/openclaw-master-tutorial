# 🦞 OpenClaw Master Tutorial

> 从零基础到熟练使用 — 构建你自己的 AI 助手

---

## 👉 你想做什么？

| 你的情况 | 跳转 |
|---------|------|
| 🆕 刚听说 OpenClaw，想了解是什么 | [👉 认识 OpenClaw](chapters/01_认识openclaw/) |
| 🚀 想快速部署并运行 | [👉 快速部署](chapters/02_快速部署/) |
| 💬 想接入飞书 / Telegram / 钉钉 | [👉 渠道集成](chapters/05_渠道集成/) |
| ⏰ 想设置定时任务和自动化 | [👉 日程任务自动化](chapters/09_日程任务自动化/) |
| 🧠 想了解 Agent 工作原理 | [👉 Agent 运行循环](chapters/03_Agent运行循环/) |
| 🤖 想理解内置提示词如何工作 | [👉 内置提示词全集合](prompts/) |
| 🛠️ 想开发插件或 Skills | [👉 工具与 Skills 系统](chapters/10_工具与Skills系统/) |
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
  chapters/03_Agent运行循环/3.2_第一条命令.md
```

**常用命令：**

```bash
openclaw status              # 查看状态
openclaw gateway restart     # 重启 Gateway
openclaw gateway logs -f     # 查看日志
```

---

## 📚 目录结构

### 主教程（chapters/）

| 目录 | 内容 | 受众 |
|------|------|------|
| [01_认识openclaw/](chapters/01_认识openclaw/) | 产品认知、核心能力、竞品对比 | 所有人 |
| [02_快速部署/](chapters/02_快速部署/) | 安装、本地、云端、Docker、移动端 | 所有人 |
| [03_Agent运行循环/](chapters/03_Agent运行循环/) | Agent Loop、会话、Workspace、记忆 | 进阶用户 |
| [04_模型配置/](chapters/04_模型配置/) | DeepSeek / OpenAI / Claude / Ollama | 配置用户 |
| [05_渠道集成/](chapters/05_渠道集成/) | 飞书/钉钉/企业微信/QQ/Telegram/Discord/Slack/WhatsApp/Signal/LINE/Teams 等 15 个渠道 | 集成用户 |
| [06_上下文与记忆/](chapters/06_上下文与记忆/) | 上下文、消息历史、人格配置、长期记忆、知识蒸馏 | 进阶用户 |
| [07_代码开发辅助/](chapters/07_代码开发辅助/) | （整理中） | 开发者 |
| [09_日程任务自动化/](chapters/09_日程任务自动化/) | Cron、Heartbeat、Webhook、工作流 | 自动化 |
| [10_浏览器与系统操作/](chapters/10_浏览器与系统操作/) | 浏览器自动化、API 调用、数据库、邮件、日历、截图 | 技术用户 |
| [10_工具与Skills系统/](chapters/10_工具与Skills系统/) | 工具三层架构、内置 Skills、ClawHub、自定义技能 | 所有用户 |
| [11_自定义Web界面/](chapters/11_自定义Web界面/) | Web UI、Control UI、LobsterBoard | 开发者 |
| [12_云端部署/](chapters/12_云端部署/) | Docker 部署原理、Gateway 架构、Sandbox 沙箱、多 Agent 路由 | 运维/开发者 |
| [13_安全配置/](chapters/13_安全配置/) | 权限、Profile、审计日志、密钥管理 | 运维安全 |
| [14_监控维护/](chapters/14_监控维护/) | **Gateway API 参考手册**、故障排查、限流、重试策略 | 运维 |
| [16_扩展开发/](chapters/16_扩展开发/) | 插件 SDK、自定义工具、Hook 事件 | 开发者 |
| [17_进阶专题/](chapters/17_进阶专题/) | Pi 引擎、TTS、Nodes 移动节点 | 高级用户 |
| [18_Skills开发/](chapters/18_Skills开发/) | Skills 进阶：知识图谱、Excalidraw、RAG、自优化 | 高级开发者 |
| [19_Agent管理专题/](chapters/19_Agent管理专题/) | 多 Agent 协作模式、ACP 协议、并行编排、团队设计 | 系统设计 |
| [21_CLI工具与命令行开发/](chapters/21_CLI工具与命令行开发/) | OpenCLI、浏览器自动化工具 | 开发者 |
| [22_新兴应用场景/](chapters/22_新兴应用场景/) | Moltbook / Hyperliquid 交易 / 浏览器自动化 / 自动化生活 | 实践者 |
| [案例集/](chapters/案例集/) | 23 个实战项目案例 | 实践者 |
| [附录/](chapters/附录/) | 附录 A~H + 反馈指南 | 参考 |

### 参考手册（prompts/）

| 目录 | 内容 | 说明 |
|------|------|------|
| [prompts/](prompts/) | **OpenClaw 内置提示词全集合** | 23 个文件，源码逐节提取 |

### 迁移中的目录（已废弃，仅保留重定向）

以下目录内容已迁移至上方对应位置，原始目录保留为重定向页：
- `04_文件知识管理/` → 内容已迁入 `06_上下文与记忆/` 和 `10_浏览器与系统操作/`
- `05_平台集成/` → 已并入 `05_渠道集成/`
- `08_国内渠道集成/` → 已并入 `05_渠道集成/`
- `09_国际渠道集成/` → 已并入 `05_渠道集成/`
- `10_新兴渠道/` → 已并入 `05_渠道集成/`
- `19_多Agent协作/` → 已并入 `19_Agent管理专题/`

---

## 🔧 Troubleshooting

> 🟡 **已知 Bug（更新于 2026-04-06）**

| Bug | 问题 | 解决方案 |
|-----|------|---------|
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | `/stop` 无法中断执行 | `messages.queue.mode: steer` ✅ |
| [#56049](https://github.com/openclaw/openclaw/issues/56049) | Heartbeat 风暴（subagent 重复触发） | 暂无 workaround |
| [#56032](https://github.com/openclaw/openclaw/issues/56032) | Telegram 群组 subagent 回复丢失 | 暂无 workaround |
| [#56045](https://github.com/openclaw/openclaw/issues/56045) | Cron 删除后持续投递 | 删除后需手动 `gateway restart` |

| 问题类型 | 文档 |
|---------|------|
| 启动问题 | [chapters/14_监控维护/](chapters/14_监控维护/) |
| 渠道问题 | [chapters/05_渠道集成/](chapters/05_渠道集成/) |
| 工具问题 | [chapters/10_工具与Skills系统/](chapters/10_工具与Skills系统/) |

---

## 🗺️ 学习路径

完整 7 天学习计划见 [LEARNING_PATH.md](LEARNING_PATH.md)

```
Day 1 → 认识 + 部署
Day 2 → 配置 + 命令 + 模型
Day 3 → 渠道集成（飞书/Telegram）
Day 4 → Agent 运行原理 + 上下文与记忆
Day 5 → 日程自动化 + Skills
Day 6 → 浏览器 + 云端部署
Day 7 → 多 Agent 协作 + 实战
```

---

## 快速链接

- [读者导航](读者导航.md) — 按读者身份分类
- [7 天学习路径](LEARNING_PATH.md)
- [OpenClaw 内置提示词全集合](prompts/) — 源码提示词逐节提取
- [Gateway API 参考手册](chapters/14_监控维护/Gateway_API参考手册.md) — Cron/Agent/Session/Config/Channel
- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [GitHub Issues](https://github.com/openclaw/openclaw/issues)

---

## 参与贡献

欢迎提交 Issue 和 Pull Request！

## License

[CC BY-NC-SA 4.0](LICENSE)

---

**最后更新**：2026-04-06（v1.4：章节编号整理 + 提示词手册独立 + Gateway API 参考）

---

## 📌 OpenClaw 版本追踪

> 追踪最新稳定版本，配套教程同步更新

| 版本 | 日期 | 说明 |
|------|------|------|
| [v2026.4.2](https://github.com/openclaw/openclaw/releases) | 2026-04-02 | 最新稳定版 |
| [v2026.4.1](https://github.com/openclaw/openclaw/releases) | 2026-04-01 | 稳定版更新 |
| v2026.3.24 | 2026-03-24 | ⚠️ 含已知 Bug，建议升级 |

| 资源 | 链接 |
|------|------|
| OpenClaw Release Notes | [GitHub Releases](https://github.com/openclaw/openclaw/releases) |
| Awesome OpenClaw | [GitHub](https://github.com/openclaw/awesome-openclaw) |
| 官方文档 | [docs.openclaw.ai](https://docs.openclaw.ai) |
| ClawHub Skills 市场 | [clawhub.ai](https://clawhub.ai) |
| OpenClaw 社区 | [Discord](https://discord.com/invite/clawd) |
