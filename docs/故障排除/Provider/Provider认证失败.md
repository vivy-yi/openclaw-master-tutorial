# Provider 认证失败故障排除

> **来源**: OpenClaw GitHub Issues #95574, #95612, #95586
> **更新日期**: 2026-06-22
> **严重程度**: P1 (核心功能)
> **影响版本**: v2026.6.5 及以上

---

## 概述

本文档涵盖 OpenClaw 中与 Provider 认证失败相关的已知问题。当配置了模型回退链（fallbacks）时，部分 Provider 在特定条件下会跳过回退机制，直接向用户显示认证错误。

---

## 问题 1: harnessOwnsTransport + Timeout 跳过 Fallback 链

**Issue**: #95574  
**标签**: `bug:behavior`, `P1`, `impact:message-loss`, `impact:auth-provider`

### 问题描述

当配置了 `model.fallbacks` 链时，使用 `harnessOwnsTransport` 的 Provider（如 Ollama、OpenRouter）在发生 timeout 后**直接向用户显示错误信息**，而不是尝试回退链。

### 错误信息

```
LLM request timed out.
```

用户期望看到的是自动切换到下一个 fallback provider，但实际行为是直接报错。

### 根因分析

**文件**: `embedded-agent-CpxCz9I4.js` 第 711-714 行

```javascript
// Stage === "prompt" 分支中的早返回
if (params.harnessOwnsTransport && params.failoverReason === "timeout") return {
    action: "surface_error",  // ← 提前返回，跳过 fallbackConfigured 检查
    reason: params.failoverReason
};
// 第 719 行 — 当 harnessOwnsTransport && timeout 时永远无法到达
if (params.fallbackConfigured && params.failoverFailure && ...) return { action: "fallback_model" };
```

### 触发条件

| 条件 | 值 |
|------|-----|
| Provider 类型 | Ollama、OpenRouter（`harnessOwnsTransport=true`） |
| 触发原因 | 慢硬件、大 context、低 `timeoutSeconds` |
| 配置要求 | `model.primary` + `model.fallbacks` 链 |

### 临时解决方案

在 Provider 配置中**移除** `harnessOwnsTransport` 相关的 timeout 配置，或**提高 timeout 值**：

```yaml
model:
  primary: ollama/llama3
  timeoutSeconds: 120  # 提高 timeout 值
  # 或者移除导致问题的配置
```

### 修复状态

| 字段 | 值 |
|------|-----|
| Issue 状态 | 🟡 OPEN |
| 根因定位 | ✅ 已精准定位 |
| 修复 PR | ❌ 暂无 |
| v2026.6.9 覆盖 | ❌ 不包含 |

---

## 问题 2: Anthropic CLI Backend 401 认证失败

**Issue**: #95612

### 问题描述

使用 `cli-backend` 模式连接 Anthropic 时出现 401 认证错误。

### 排查步骤

1. **检查 API Key 配置**
   ```bash
   openclaw config get providers.anthropic.apiKey
   ```

2. **验证 CLI 认证状态**
   ```bash
   anthropic auth status
   ```

3. **检查 backend 模式**
   ```yaml
   providers:
     anthropic:
       backend: cli  # 确认是 cli 而不是 direct
   ```

### 修复状态

| 字段 | 值 |
|------|-----|
| Issue 状态 | 🟡 OPEN |
| 修复 PR | ❌ 暂无 |

---

## 问题 3: Kimi Coding Auth Fallback in Systemd

**Issue**: #95586

### 问题描述

在 systemd 环境下运行的 Gateway 中，Kimi Coding 的认证回退机制失效。

### 排查步骤

1. **检查 systemd 日志**
   ```bash
   journalctl -u openclaw -n 100 | grep -i kimi
   ```

2. **验证环境变量**
   ```bash
   openclaw config get providers.kimi.apiKey
   ```

3. **尝试直接模式**
   ```yaml
   providers:
     kimi:
       backend: direct  # 尝试替代 cli 模式
   ```

### 修复状态

| 字段 | 值 |
|------|-----|
| Issue 状态 | 🟡 OPEN |
| 修复 PR | ❌ 暂无 |

---

## 通用排查流程

### Step 1: 确认 Provider 类型

```bash
openclaw config get providers
```

### Step 2: 检查认证状态

```bash
openclaw doctor --provider <provider-name>
```

### Step 3: 查看 Gateway 日志

```bash
tail -f ~/.openclaw/logs/gateway.log
```

### Step 4: 测试直连

临时移除 fallback 配置，测试单个 provider 是否正常工作。

---

## 相关文档

- [模型配置](../chapters/04_模型配置/README.md)
- [Provider 插件系统](../../chapters/08_插件与工具/README.md)

---

## 更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-06-22 | 1.0 | 初始版本，基于 #95574, #95612, #95586 |

---

🦉 **教程大师** | 持续更新中
