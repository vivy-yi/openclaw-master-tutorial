# OpenClaw 已知问题追踪

> 本文档记录 OpenClaw 社区确认的已知问题，持续更新。
> 
> **更新时间**: 2026-06-12  
> **维护者**: 教程大师 🦉  
> **反馈渠道**: [GitHub Issues](https://github.com/openclaw/openclaw/issues)

---

## 一、严重问题（影响生产环境）

### 🔴 Issue #92270 — 会话恢复 stuck bug

| 字段 | 内容 |
|------|------|
| **严重程度** | 严重 🔴 |
| **影响版本** | 当前版本（待确认） |
| **发布日期** | 2026-06-11 |
| **来源** | [GitHub Issue #92270](https://github.com/openclaw/openclaw/issues/92270) |
| **状态** | 🟡 OPEN（待官方确认） |
| **优先级** | P1 ⭐⭐⭐⭐⭐ |

#### 问题现象

Stuck-session recovery never releases — 会话处于以下异常状态：

- `status = aborted`
- `released = 0`（每个事件都如此）
- wedge 状态持续约 **14 小时**
- 即使执行 5 次正确的 target aborts 仍无法恢复

#### 影响范围

- 受影响会话无法自动恢复正常
- 需要外部干预（重启进程）或使用 `/reset` 命令才能恢复
- 长时间运行的部署环境风险较高

#### 临时解决方案

1. **使用 `/reset` 命令**：在受影响的会话中发送 `/reset` 重置会话状态
2. **外部重启**：重启 OpenClaw 进程强制释放卡住的会话
3. **监控告警**：建议配置监控，当 `released=0` 状态持续超过阈值时触发告警

#### 复现步骤

1. 创建一个长时间运行的会话
2. 触发会话恢复机制
3. 观察 `status=aborted` 但 `released=0` 持续不变
4. 尝试多次 `correct-target abort`（约5次），会话仍处于 wedge 状态

#### 相关配置

```json
// 建议添加监控配置
{
  "monitoring": {
    "stuckSessionThreshold": "10m",
    "alertOnAbortedNoRelease": true
  }
}
```

#### 官方追踪

- GitHub Issue: [#92270](https://github.com/openclaw/openclaw/issues/92270)
- 标签: （待官方添加）

---

### 🟡 Issue #77359 — Discord 多 Bot 斜杠命令未注册

| 字段 | 内容 |
|------|------|
| **严重程度** | 高 🟡 |
| **影响版本** | 当前版本 |
| **优先级** | 🦞 diamond lobster（最高优先级标签） |
| **状态** | ❌ CLOSED — `clawsweeper:no-new-fix-pr`（已关闭，暂无修复计划） |

#### 问题描述

Discord 多 Bot 环境下，斜杠命令（slash commands）未能正确注册。

#### 影响范围

- 多 Bot 部署的 Discord 服务器
- 斜杠命令完全不可用

#### 临时解决方案

1. 使用传统的消息前缀命令替代斜杠命令
2. 单 Bot 部署可避免此问题
3. 等待官方重新开启修复计划

#### 相关资源

- GitHub Issue: [#77359](https://github.com/openclaw/openclaw/issues/77359)
- 状态: 已关闭（`clawsweeper:no-new-fix-pr`）

---

## 二、中等问题（影响特定功能）

### 🟡 Issue #92267 — Telegram typingMode 'instant' 不触发

| 字段 | 内容 |
|------|------|
| **严重程度** | 中 🟡 |
| **影响版本** | 当前版本 |
| **发布日期** | 2026-06-11 |
| **来源** | [GitHub Issue #92267](https://github.com/openclaw/openclaw/issues/92267) |
| **状态** | 🟡 OPEN |
| **优先级** | P2 ⭐⭐⭐⭐ |

#### 问题现象

`typingMode='instant'` 配置在以下场景不触发：
- 队列轮次（queued turns）
- 转向轮次（steered turns）

**根因**：`Telegram room_event` 无条件抑制 typing，导致 instant 模式失效。

#### 临时解决方案

暂无完美解决方案。可考虑：
1. 使用 `typingMode='always'` 替代（会持续显示 typing）
2. 在支持的通知渠道中配合使用

#### 相关文档

→ `05_渠道集成/5.1_Telegram集成.md`（详见"已知限制"章节）

---

## 三、待确认问题

### ⏳ Issue #10659 — Masked Secrets API Key 保护

| 字段 | 内容 |
|------|------|
| **类型** | 功能需求 |
| **标签** | enhancement, P1, impact: security |
| **优先级** | P1 ⭐⭐⭐⭐ |
| **状态** | 🔨 开发中 |

#### 功能描述

防止 Agent 访问原始 API Keys，实现 secrets masking。

#### 相关章节

→ `03_认证配置/`（功能上线后更新）

---

## 四、已修复问题（供参考）

| Issue | 问题 | 修复版本 | 状态 |
|-------|------|----------|------|
| #92265 | DeepSeek 模型 transport 继承修复 | 待 PR 合并 | 🔄 OPEN |
| #92261 | 孤儿会话转录可见性修复 | 待 PR 合并 | 🔄 OPEN |
| #92263 | 心跳 reasoning payload 选择修复 | 待 PR 合并 | 🔄 OPEN |
| #92254 | model-picker auth profile 覆盖问题 | 待 PR 合并 | 🔄 OPEN |

---

## 五、贡献指南

如果您发现新的已知问题，请通过以下方式报告：

1. **GitHub Issues**: https://github.com/openclaw/openclaw/issues
2. **建议格式**：
   - 问题现象描述
   - 复现步骤
   - 环境信息（版本、操作系统、配置）
   - 期望行为 vs 实际行为

---

🦉 教程大师 | 已知问题追踪 | 最后更新: 2026-06-12
