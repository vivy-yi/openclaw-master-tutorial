# Tool 结果中继丢失故障排除

> **来源**: OpenClaw GitHub Issue #95597, PR #95611
> **更新日期**: 2026-06-22
> **严重程度**: P2
> **评分**: 🦞 diamond lobster
> **影响版本**: v2026.6.5 及以上

---

## 概述

Codex 原生 `post_tool_use` 跳过 `agentToolResultMiddleware`，导致工具执行结果在某些情况下无法正确中继到后续处理流程。

---

## 问题描述

### 症状

1. **工具执行成功但结果丢失**: 工具正常执行，但结果未传递给后续 Agent 流程
2. **中间件被绕过**: `agentToolResultMiddleware` 未收到工具结果
3. **响应不完整**: Agent 生成的响应中缺少工具调用应有的内容

### 影响

- 工具执行效果无法反映在最终响应中
- 多步骤 Agent 工作流中断
- 调试困难（结果被静默丢弃）

---

## 相关 Issue

| Issue/PR | 描述 | 状态 |
|-----------|------|------|
| #95597 | Codex native post_tool skips middleware | 🟡 OPEN |
| #95611 | fix(codex): run native post-tool middleware | ⚠️ needs proof |

---

## 排查步骤

### Step 1: 检查工具执行日志

```bash
tail -f ~/.openclaw/logs/gateway.log | grep -E "(tool|post_tool|middleware)"
```

### Step 2: 验证 Agent 工作流

启用详细日志：
```bash
openclaw gateway --log-level debug
```

### Step 3: 测试复现

使用简单的工具调用测试：
```javascript
// 测试工具
const result = await agent.execute("请列出当前目录的文件");
console.log("Tool result:", result);
```

---

## 根因分析

**问题链路**:

```
Codex post_tool_use 
  → 跳过 agentToolResultMiddleware 
  → 工具结果未经过标准中继流程
  → 结果丢失
```

**关键代码位置**: Codex 集成相关模块

---

## 修复进度

| PR | 描述 | 状态 |
|-----|------|------|
| #95611 | fix(codex): run native post-tool middleware | ⚠️ needs proof |

---

## 临时解决方案

### 方案 1: 禁用 Codex 原生模式

```yaml
providers:
  codex:
    nativePostTool: false  # 禁用原生 post_tool
```

### 方案 2: 使用备用 Provider

```yaml
model:
  primary: anthropic/claude-3-5-sonnet
  # 临时切换到非 Codex provider
```

### 方案 3: 添加结果验证

在工具执行后添加验证步骤：
```javascript
const result = await tool.execute(args);
if (!result) {
  throw new Error("Tool result missing");
}
```

---

## 相关文档

- [Agent 管理专题](../../chapters/05-Agent管理专题/README.md)
- [Tool 系统](../../chapters/08_插件与工具/README.md)

---

## 更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-06-22 | 1.0 | 初始版本，基于 #95597 |

---

🦉 **教程大师** | 持续更新中
