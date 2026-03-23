# 🦞 OpenClaw 完备教程

> 从入门到精通 - 打造你的专属 AI 助手

[English](README.md) | **中文**

---

## 概述

OpenClaw 开源 AI 智能体平台的综合学习指南，包含情境化、交互式内容。

---

## 文档结构

### 入门基础

| 章节 | 主题 | 说明 |
|-----|------|-----|
| [01 概述](docs/01_overview/) | 介绍 | 历史、架构、对比 |
| [02 部署](docs/02_setup/) | 安装 | 环境要求、安装、Docker、云端 |

### 核心功能

| 章节 | 主题 | 说明 |
|-----|------|-----|
| [03 最小循环](docs/05_minimal_loop/) | Agent Loop | 执行引擎、指令、工作区 |
| [04 模型配置](docs/02_config_models/) | 模型选择 | DeepSeek、OpenAI、Claude、Ollama |
| [05 工具与 Skills](docs/07_tools_skills/) | 能力扩展 | 工具系统、Skill 市场、自定义 |
| [06 上下文与记忆](docs/06_context_memory/) | 记忆系统 | 上下文管理、长期记忆、人设 |

### 多 Agent 与渠道

| 章节 | 主题 | 说明 |
|-----|------|-----|
| [07 多 Agent](docs/05_multi_agent/) | 团队协作 | Agent 团队、协作模式、工作流 |
| [08 渠道](docs/03_channels/) | 国际渠道 | Telegram、Discord、Slack、Webhook |
| [09 中国渠道](docs/03_channels/) | 中国平台 | 飞书、钉钉、企业微信、QQ |
| [10 自动化](docs/04_automation/) | 任务自动化 | 定时任务、Webhook、工作流 |
| [11 Web UI](docs/09_web_ui/) | Web 界面 | 状态看板、任务管理、监控 |

### 运维与安全

| 章节 | 主题 | 说明 |
|-----|------|-----|
| [12 Gateway](docs/03_gateway/) | API 网关 | API 配置、认证、限流、监控 |
| [13 安全](docs/11_security/) | 安全配置 | 权限管理、数据安全、审计日志 |
| [14 扩展](docs/08_extension/) | 自定义开发 | 插件开发、自定义工具 |

### 高级与实战

| 章节 | 主题 | 说明 |
|-----|------|-----|
| [15 高级功能](docs/13_advanced/) | 高级特性 | Pi 语音、TTS、Nodes |
| [16 实战案例](docs/14_cases/) | 综合案例 | 客服、知识库、开发助手 |
| [17 故障排查](docs/15_troubleshooting/) | 问题解决 | 启动、渠道、工具、模型 |
| [18 系统层](docs/16_system_layer/) | 系统工具 | 文件、命令行、浏览器、API |

### 命令参考

| 章节 | 说明 |
|-----|-----|
| [OpenClaw 命令](docs/openclaw-commands/) | 完整命令参考 |

### 附录

| 附录 | 主题 |
|-----|-----|
| [附录 A](docs/appendices/appendix-a/) | 命令速查 |
| [附录 B](docs/appendices/appendix-b/) | 配置模板 |
| [附录 C](docs/appendices/appendix-c/) | API 提供商对比 |
| [附录 D](docs/appendices/appendix-d/) | 故障排查指南 |
| [附录 E](docs/appendices/appendix-e/) | 安全检查清单 |
| [附录 F](docs/appendices/appendix-f/) | 性能优化 |
| [附录 G](docs/appendices/appendix-g/) | 学习资源 |
| [附录 H](docs/appendices/appendix-h/) | 更新日志 |

---

## 架构师指南

面向开发者、架构师和技术负责人的深度技术文档：

| 章节 | 主题 | 目标读者 |
|-----|------|---------|
| [核心](architect-guide/core/) | 架构总览 | 架构师 |
| [Agent Loop](architect-guide/core/agent-loop.md) | 执行引擎 | 后端开发 |
| [安全模型](architect-guide/core/security-model.md) | 安全分析 | 安全工程师 |
| [协议](architect-guide/protocol/) | 协议文档 | 后端/客户端开发 |
| [Gateway](architect-guide/protocol/gateway-architecture.md) | WebSocket 协议 | 后端开发 |
| [扩展](architect-guide/extension/) | 扩展开发 | 插件开发 |
| [Plugin SDK](architect-guide/extension/plugin-sdk.md) | 插件开发 | 插件开发者 |
| [运维](architect-guide/operation/) | 运维指南 | 运维工程师 |

---

## 快速开始

```bash
# 快速开始指南 - 参见 docs/02_setup/
```

---

## 示例

| 文件 | 说明 |
|------|-----|
| [docker-compose.yml](examples/docker-compose.yml) | Docker 部署配置 |
| [.env.example](examples/.env.example) | 环境变量配置 |

---

## 贡献

欢迎提交 Issue 和 Pull Request！

---

## 许可证

[CC BY-NC-SA 4.0](LICENSE)

---

**最后更新**: 2026-03-23
