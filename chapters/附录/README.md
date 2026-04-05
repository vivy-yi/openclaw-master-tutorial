# 社区反馈指南

> 遇到问题或有任何建议？这里有最便捷的反馈方式。

---

## 🎯 选择最适合你的反馈方式

| 你想做什么 | 推荐渠道 | 响应速度 |
|-----------|---------|---------|
| 🐛 报告 Bug | [GitHub Issues](#-github-issues) | ⭐⭐⭐ |
| 💡 提出功能建议 | [GitHub Discussions](#-github-discussions) | ⭐⭐ |
| 💬 使用问题/讨论 | [Discord 社区](#-discord-社区) | ⭐⭐⭐ |
| 📝 文档纠错/补充 | [GitHub Issues](#-github-issues) | ⭐⭐⭐ |
| 🔒 安全漏洞 | [邮件支持](#-邮件支持) | ⭐ (优先) |
| 📰 教程内容问题 | [GitHub Issues](#-github-issues) | ⭐⭐⭐ |

---

## 🐛 GitHub Issues（推荐用于 Bug）

**适用场景**：发现程序错误、功能异常、需要开发团队介入的问题。

### 方式一：使用反馈模板（推荐 ⭐）

点击这里直接创建 Issue：
👉 **https://github.com/openclaw/openclaw/issues/new/choose**

我们提供了三种预设模板，选择最符合你情况的类型，填空即可。

### 方式二：快捷创建

```bash
# 一键打开浏览器创建 Issue
openclaw feedback --type bug
```

### Bug 报告模板说明

> 提交 Bug 时，请尽量填写以下信息（带 ⭐ 的为必填）：

| 字段 | 说明 | 示例 |
|-----|------|------|
| ⭐ 版本号 | `openclaw --version` | v2026.3.25 |
| ⭐ 操作步骤 | 你是怎么操作的 | 在飞书发送"/help"后无响应 |
| ⭐ 实际结果 | 发生了什么 | 机器人无响应，日志显示 timeout |
| ⭐ 预期结果 | 你希望发生什么 | 机器人应返回帮助信息 |
| 环境信息 | 系统、渠道、模型 | macOS 15.3 + 飞书 + DeepSeek |
| 日志片段 | relevant log lines | `Error: timeout at 14:23:05` |
| 可复现性 | 能否稳定复现 | 100% 必现 / 偶发 |

### 常见 Bug 快速链接

| Bug | 状态 | 解决方案 |
|-----|------|---------|
| [#56270](https://github.com/openclaw/openclaw/issues/56270) | WhatsApp 重连循环 | 暂用 Telegram 替代 |
| [#56274](https://github.com/openclaw/openclaw/issues/56274) | Discord Gateway 崩溃 | 监控 + 自动重启 |
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | `/stop` 无法中断 | `messages.queue.mode: steer` |

---

## 💬 Discord 社区（推荐用于讨论）

**适用场景**：入门疑问、使用技巧分享、社区交流。

### 加入方式

| 方式 | 操作 |
|-----|------|
| 官网链接 | https://discord.gg/cline |
| 飞书备用群 | https://openclaw.ai/community |

### Discord 频道导航

| 频道 | 内容 |
|-----|------|
| `#general` | 通用讨论 |
| `#help` | 使用问题求助 |
| `#showcase` | 展示你的项目 |
| `#skills` | Skills 分享 |
| `#bugs` | Bug 反馈（非紧急） |

### 提问技巧（让回答更快）

```
✅ 好的提问：
"飞书接入后机器人无响应，日志显示 401 错误，是哪里配置错了？"

❌ 不好的提问：
"飞书不行啊怎么办" （信息不足，无法回答）
```

---

## 💡 GitHub Discussions（推荐用于建议）

**适用场景**：功能建议、文档改进、社区投票。

👉 https://github.com/openclaw/openclaw/discussions

---

## 📧 邮件支持

**适用场景**：安全问题、私密信息、商业合作。

```
support@openclaw.ai
```

> ⚠️ **安全问题请勿在公开渠道提交**，请通过邮件联系我们。

---

## 📖 本教程反馈

对本教程（openclaw-master-tutorial）有改进建议？

| 方式 | 说明 |
|-----|------|
| GitHub Issues | https://github.com/your-repo/issues/new/choose |
| 直接 PR | 欢迎提交文档更正和补充 |

---

## 🔧 提交前先排查

在提交反馈前，建议先运行诊断命令，可能直接解决问题：

```bash
# 自动诊断（推荐第一步）
openclaw doctor

# 查看详细日志
openclaw logs --limit 100

# 导出诊断报告（附在 Issue 中很有用）
openclaw doctor --output diagnosis.txt
```

---

## 📋 反馈优先级说明

| 优先级 | 定义 | 处理方式 |
|-------|------|---------|
| P0 | 服务完全不可用 | 紧急修复 |
| P1 | 核心功能受损 | 尽快修复 |
| P2 | 非核心问题 | 常规迭代 |
| P3 | 体验优化 | 后续处理 |

---

**提示**：详细的反馈 = 快速的解决。提供问题时尽量包含版本号、操作步骤和日志信息。

---

**最后更新**：2026-03-30
