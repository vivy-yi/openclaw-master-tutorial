# Exec Approval Retraction（执行审批撤回机制）

> **来源**: GitHub Issue [#93423](https://github.com/openclaw/openclaw/issues/93423)  
> **类型**: Feature Request（提案阶段）  
> **优先级**: P2 📝  
> **状态**: Open  
> **收录日期**: 2026-06-17

---

## 一、问题背景

### 1.1 现有 Exec 审批流程

在标准配置下，Agent 发出的高危操作（如 `exec` 命令）需要人工审批才能执行：

```jsonc
// openclaw.yaml
approvals:
  exec:
    enabled: true
    mode: "targets"          // targets | all | none
    targets:
      - channel: "telegram"
        to: "YOUR_CHAT_ID"
```

**标准流程**：
```
Agent 请求 exec
    ↓
Gateway 暂停执行，推送审批消息给人类
    ↓
人类 approve/deny
    ↓
Gateway 执行或拒绝
```

### 1.2 痛点

在以下场景中，Agent **事后意识到不需要执行**，但人类已在手机上收到了推送：

- Agent 在思考过程中，已自行解决问题（如文件已存在、路径已创建）
- 审批消息推送后，Agent 又花了额外步骤才确认实际不需要该命令
- 人类看到审批通知 → 感到困惑 → 需要重新确认上下文

**核心诉求**：在推送给人类**之前**，给 Agent 一个"反悔窗口"。

---

## 二、提案方案：holdMs 缓冲机制

### 2.1 配置项

```jsonc
// openclaw.yaml
approvals:
  exec:
    enabled: true
    mode: "targets"
    holdMs: 12000          // ⭐ NEW: 缓冲窗口（毫秒）
    targets:
      - channel: "telegram"
        to: "YOUR_CHAT_ID"
```

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `holdMs` | `number` | Agent 发出请求后，缓冲多少毫秒再推送审批给人类 |

### 2.2 工作原理

```
Agent 发出的 exec 请求
    ↓
进入 holdMs 缓冲窗口（如 12 秒）
    ↓
┌─────────────────────────────────────────────┐
│  在缓冲期内，Agent 可通过 RPC retract(approvalId)  │
│  撤回该请求                                   │
└─────────────────────────────────────────────┘
    ↓
┌─────────────┐     ┌──────────────────┐
│  Agent 已撤回  │     │  窗口到期，无撤回  │
│  → 直接 Deny  │     │  → 推送给人类审批  │
│  不推送人类    │     │                  │
└─────────────┘     └──────────────────┘
```

### 2.3 Agent 端调用示例

```typescript
// Agent 代码中，事后判断不需要执行
const approvalId = pendingApprovalId;  // 从上下文中获取

// 调用 retract（撤回）
await api.runtime.agent.retractApproval({
  approvalId: approvalId,
  reason: "目标文件已存在，无需重复操作"  // 可选，供审计
});

// exec 请求被取消，人类不会收到推送
```

---

## 三、安全约束

Issue #93423 中明确的安全要求：

### 3.1 核心原则

| 原则 | 说明 |
|------|------|
| **Never silently drop** | 任何环节出错（RPC 超时、retract 失败）→ 立即推送给人类 |
| **Retract = Cancel = Deny** | 撤回绝不触发执行，只产生 deny 日志 |
| **可审计** | 撤回操作必须有日志记录（谁、什么时候、为什么撤回） |

### 3.2 错误处理矩阵

| 错误场景 | 处理策略 |
|---------|---------|
| Agent retract RPC 超时 | 降级为"立即推送人类"，不静默丢弃 |
| Agent retract 返回 404（approvalId 不存在） | 忽略，继续正常推送人类 |
| holdMs 到期，无 retract | 正常推送给人类审批 |
| Gateway 重启，pending approvals | 恢复推送（取决于实现） |

---

## 四、使用场景

### 4.1 适合开启 holdMs 的场景

| 场景 | holdMs 建议值 | 说明 |
|------|-------------|------|
| CLI 工具构建 Agent（自动确认文件状态） | 8000–15000ms | Agent 通常在几秒内自行验证 |
| 多步骤部署脚本 | 20000–30000ms | 步骤间有等待，Agent 思考时间更长 |
| 调试模式（频繁 retry） | 5000ms | 快速迭代 |

### 4.2 不建议开启 holdMs 的场景

| 场景 | 原因 |
|------|------|
| 安全敏感操作（rm -rf 类） | 撤回窗口增加了"静默取消"的可能性 |
| 实时性要求极高 | holdMs 本身引入延迟 |
| 人类在线率高、响应快 | holdMs 收益不明显 |

---

## 五、配置示例

### 5.1 Telegram + holdMs

```yaml
approvals:
  exec:
    enabled: true
    mode: "targets"
    holdMs: 12000
    targets:
      - channel: "telegram"
        to: "123456789"
```

### 5.2 多渠道 + 不同 holdMs

```yaml
approvals:
  exec:
    enabled: true
    mode: "targets"
    targets:
      - channel: "telegram"
        to: "123456789"
        holdMs: 15000      # Telegram 响应较慢，给更长窗口
      - channel: "discord"
        guildId: "..."
        channelId: "..."
        holdMs: 8000       # Discord 响应快，窗口可短
```

---

## 六、FAQ

**Q: holdMs 太长会影响体验吗？**  
A: holdMs 仅影响"推送给人类"的时机，不影响 Agent 执行速度（除非 retract）。即使不撤回，holdMs 到期后才会推送，对实时性要求不高的场景可接受。

**Q: 如果 Agent 发了多个 exec，retract 一个会影响其他的吗？**  
A: 每个 approval 有独立 ID，retract 是针对单个 approvalId 的操作，互不影响。

**Q: holdMs=0 等于关闭该功能吗？**  
A: 是的，等同于旧行为（立即推送）。

---

## 七、相关文档

| 文档 | 说明 |
|------|------|
| `approvals.exec` 基础配置 | 见 Gateway 配置文档 |
| `agent问题排查.md` | Agent 执行相关问题 |
| [Issue #93423](https://github.com/openclaw/openclaw/issues/93423) | 原始提案 |

---

*🦉 收录自 GitHub Issue #93423 | 2026-06-17*
