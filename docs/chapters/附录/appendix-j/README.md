# 附录J: 完整配置参考

> OpenClaw 配置的完整参考文档

---

## 简介

本文档是 OpenClaw 配置的完整参考，涵盖所有配置项的详细说明。包括：

- 核心配置文件结构
- 认证和模型提供商配置
- Agent 系统配置
- 记忆系统配置
- 频道集成（Telegram、飞书、Discord）
- 浏览器自动化配置
- Skills 系统配置
- 安全配置
- Cron 和自动化
- 网关和网络配置
- 插件系统配置

## 目标读者

- 需要深度配置 OpenClaw 的用户
- 开发者需要了解完整配置选项
- 运维人员需要配置参考

## 内容速览

| 章节 | 主题 |
|------|------|
| [1. 核心配置文件](./openclaw-complete-config-reference.md#1-核心配置文件) | openclaw.json 结构、加载顺序 |
| [2. 认证和模型提供商](./openclaw-complete-config-reference.md#2-认证和模型提供商) | API Key、OAuth、多模型 |
| [3. Agent 系统配置](./openclaw-complete-config-reference.md#3-agent-系统配置) | Agent定义、子Agent白名单 |
| [4. 记忆系统](./openclaw-complete-config-reference.md#4-记忆系统) | memorySearch、压缩模式 |
| [5. 频道集成](./openclaw-complete-config-reference.md#5-频道集成) | Telegram、飞书、Discord |
| [6. 浏览器自动化](./openclaw-complete-config-reference.md#6-浏览器自动化) | Chrome配置、profile管理 |
| [7. Skills 系统](./openclaw-complete-config-reference.md#7-skills-系统) | Skill目录、安装 |
| [8. 安全配置](./openclaw-complete-config-reference.md#8-安全配置) | dmPolicy、exec安全 |
| [9. Cron 和自动化](./openclaw-complete-config-reference.md#9-cron-和自动化) | 定时任务、session管理 |
| [10. 网关和网络](./openclaw-complete-config-reference.md#10-网关和网络) | 端口绑定、WebSocket |
| [11. 插件系统](./openclaw-complete-config-reference.md#11-插件系统) | 插件加载、内置插件 |
| [12. 其他配置](./openclaw-complete-config-reference.md#12-其他配置) | MCP、日志、性能调优 |

## 相关文档

- [2.3 配置文件详解](../02_快速部署/2.3_configuration.md) - 入门级配置
- [04 模型配置](../04_模型配置/) - 模型配置章节
- [06 上下文与记忆](../06_上下文与记忆/) - 记忆系统详解
- [13 安全配置](../13_安全配置/) - 安全配置章节

---

*最后更新：2026-04-24*