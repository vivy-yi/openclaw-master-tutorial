# Azure OpenAI Responses 认证配置错误

> **Issue**: [#93781](https://github.com/openclaw/openclaw/issues/93781)  
> **标签**: P1 · 认证 · Azure  
> **状态**: 🔴 Open (待修复)  
> **影响版本**: OpenClaw 2026.6.8  
> **发现者**: @BSG2000  
> **创建时间**: 2026-06-16 21:17 UTC  
> **评论数**: 2

---

## 一、问题概述

### 1.1 问题描述

在 OpenClaw 2026.6.8 中，配置的 `azure-openai-responses/*` 路由会尝试使用 OpenAI ChatGPT/OpenAI API 认证，而不是配置的 Azure 提供商凭证进行认证。

这导致使用 `azure-openai-responses/*` 路由的代理遇到认证失败/回退，即使经典 Azure 提供商（`azure-openai/*`）工作正常。

### 1.2 影响范围

| 受影响配置 | 受影响模型 | 严重程度 |
|-----------|-----------|---------|
| `azure-openai-responses/gpt-5.5` | GPT-5.5 系列 | 🔴 P1 |
| `azure-openai-responses/gpt-4.5` | GPT-4.5 系列 | 🔴 P1 |
| 所有 `azure-openai-responses/*` | 全部模型 | 🔴 P1 |

### 1.3 根本原因

`azure-openai-responses` probe/agent route 错误地使用了 OpenAI 认证配置文件（`OPENAI_API_KEY`），而不是 Azure 专用的认证配置（`AZURE_API_KEY` 或 Azure 端点配置）。

---

## 二、错误日志

### 2.1 Provider Probe 错误

```bash
openclaw models status \
  --probe \
  --probe-provider azure-openai-responses \
  --probe-timeout 45000 \
  --probe-max-tokens 8 \
  --json
```

**错误输出**:
```json
{
  "error": "[openai-transport] [responses] error",
  "provider": "openai",
  "api": "openai-chatgpt-responses",
  "model": "gpt-5.4-pro",
  "status": 401,
  "code": "invalid_api_key",
  "message": "401 Incorrect API key provided: sk-litel****-key"
}
```

### 2.2 Agent 调用错误

**成功案例（经典 Azure）**:
```bash
openclaw agent \
  --agent main \
  --model azure-openai/gpt-5.5 \
  --message "Reply OK only." \
  --json
# => status ok, provider azure-openai, model gpt-5.5, text OK
```

**失败案例（Azure Responses）**:
```bash
openclaw agent \
  --agent main \
  --model azure-openai-responses/gpt-5.5 \
  --message "Reply OK only." \
  --json
# => GatewayClientRequestError: FailoverError: Authentication failed (provider returned HTTP 401)
```

---

## 三、触发条件

### 3.1 问题发生的完整场景

1. **配置阶段**:
   - 用户配置了 `azure-openai` 提供商（经典）
   - 用户配置了 `azure-openai-responses` 提供商（Responses API）

2. **认证路径错误**:
   - `azure-openai/*` → 正确使用 Azure 凭证
   - `azure-openai-responses/*` → **错误使用 OpenAI auth profile**

3. **失败结果**:
   - 经典 Azure 提供商正常工作
   - Azure Responses 提供商认证失败

### 3.2 触发条件检查清单

```text
□ 使用 OpenClaw 2026.6.8
□ 配置了 azure-openai-responses 提供商
□ 尝试使用 azure-openai-responses/* 模型
□ 经典 azure-openai/* 正常工作
□ Provider probe 显示 "provider=openai api=openai-chatgpt-responses"
```

---

## 四、workaround 临时方案

### 4.1 临时方案：回退到经典 Azure

将受影响代理的主要模型路由回 `azure-openai/*`：

```json
// openclaw.json
{
  "models": {
    "primary": {
      "provider": "azure-openai",
      "model": "gpt-5.5"
    }
  }
}
```

**优点**: 绕过 Responses API 问题  
**缺点**: 无法使用 Responses API 特性（如结构化输出）

### 4.2 替代方案：使用 OpenAI 原生

如果 Azure Responses 非必需，可临时使用标准 OpenAI：

```json
{
  "providers": {
    "openai": {
      "apiKey": "${OPENAI_API_KEY}"
    }
  },
  "models": {
    "primary": {
      "provider": "openai",
      "model": "gpt-4o"
    }
  }
}
```

### 4.3 降级方案：回退到 v2026.6.6

```bash
# 卸载当前版本
npm uninstall -g openclaw

# 安装 2026.6.6
npm install -g openclaw@2026.6.6

# 验证
openclaw --version
```

---

## 五、修复进度

### 5.1 Issue 状态

| 状态项 | 值 |
|--------|-----|
| Issue 状态 | 🔴 Open |
| 创建时间 | 2026-06-16 21:17 UTC |
| 评论数 | 2 |
| 关联 PR | 暂无 |

### 5.2 评论摘要

**@BSG2000** (报告者):
> Duplicate check: I searched existing open/closed issues for azure-openai-responses + invalid_api_key / OPENAI_API_KEY / auth profile / provider=openai. I found related Azure Responses problems (#79570...)

**@clawsweeper[bot]** (自动审查):
> ClawSweeper review: did not complete due to Codex infrastructure failure. _Reviewed June 16, 2026, 5:48 PM ET / 21:48 UTC._

### 5.3 预期修复版本

暂无明确时间表。建议关注 [Issue #93781](https://github.com/openclaw/openclaw/issues/93781) 获取最新进展。

---

## 六、配置参考

### 6.1 正确的 Azure OpenAI Responses 配置

```json
// openclaw.json - 期望的配置方式
{
  "providers": {
    "azure-openai-responses": {
      "type": "azure",
      "apiVersion": "2024-06-01",
      "endpoint": "https://YOUR-RESOURCE.openai.azure.com",
      "apiKey": "${AZURE_OPENAI_RESPONSES_KEY}",
      "responsesMode": true
    }
  }
}
```

### 6.2 Provider Probe 诊断命令

```bash
# 诊断 Azure Responses 提供商
openclaw models status --probe \
  --probe-provider azure-openai-responses \
  --probe-model gpt-5.5 \
  --json 2>&1 | jq .

# 诊断经典 Azure 提供商
openclaw models status --probe \
  --probe-provider azure-openai \
  --probe-model gpt-5.5 \
  --json 2>&1 | jq .
```

---

## 七、相关 Issue

| Issue | 说明 | 状态 |
|-------|------|------|
| [#93781](https://github.com/openclaw/openclaw/issues/93781) | 本问题 | 🔴 Open |
| [#79570](#) | 关联的 Azure Responses 问题 | 🔴 Open |

---

🦉 **教程大师** | 故障排除 · Azure  
**最后更新**: 2026-06-18 23:30 CST  
**关联 Issue**: #93781  
**注意**: 此问题为 Open Issue，建议关注官方更新
