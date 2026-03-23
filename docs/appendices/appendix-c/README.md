# 附录C: API提供商对比

> 主流AI模型API全面对比，助您选择最佳方案

---

## 快速选择

| 需求 | 推荐 | 理由 |
|-----|-----|-----|
| 性价比最高 | DeepSeek | 价格低70%，中文强 |
| 代码能力强 | Claude 3.5 | 编程准确率92% |
| 综合能力最强 | GPT-4o | 多模态，生态完善 |
| 国内访问 | 智谱/通义千问 | 国内节点，延迟低 |
| 免费试用 | Gemini/Groq | 免费额度充足 |

---

## 价格对比表

### 输入/输出价格（每百万tokens）

| 模型 | 提供商 | 输入价格 | 输出价格 | 性价比 |
|-----|-------|---------|---------|-------|
| deepseek-chat | DeepSeek | ¥1 / $0.14 | ¥2 / $0.28 | ⭐⭐⭐⭐⭐ |
| deepseek-coder | DeepSeek | ¥1 / $0.14 | ¥2 / $0.28 | ⭐⭐⭐⭐⭐ |
| claude-3.5-sonnet | Anthropic | $3 | $15 | ⭐⭐⭐⭐ |
| gpt-4o-mini | OpenAI | $0.15 | $0.60 | ⭐⭐⭐⭐⭐ |
| gpt-4o | OpenAI | $2.50 | $10 | ⭐⭐⭐⭐ |
| gpt-4-turbo | OpenAI | $10 | $30 | ⭐⭐ |
| glm-4 | 智谱AI | ¥0.1 / k | ¥0.1 / k | ⭐⭐⭐⭐ |
| qwen-max | 阿里云 | ¥0.04 / k | ¥0.12 / k | ⭐⭐⭐⭐ |
| gemini-pro | Google | $0.5 | $1.5 | ⭐⭐⭐⭐⭐ |
| llama-3.1-70b | Groq | $0.59 | $0.79 | ⭐⭐⭐⭐⭐ |

*注：价格为2025年Q1数据，以实际官网为准*

---

## 性能对比

### 编程能力

| 模型 | HumanEval | MBPP | 代码审查 | 代码补全 |
|-----|-----------|------|---------|---------|
| Claude 3.5 Sonnet | 92% | 81% | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| GPT-4o | 90% | 80% | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| deepseek-coder | 79% | 75% | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Llama 3.1 70B | 72% | 68% | ⭐⭐⭐ | ⭐⭐⭐ |
| Gemini Pro | 74% | 70% | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### 中文能力

| 模型 | 翻译 | 写作 | 问答 | 理解 |
|-----|-----|-----|-----|-----|
| deepseek-chat | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Qwen-Max | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| GLM-4 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Claude 3.5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| GPT-4o | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 推理能力

| 模型 | 数学 | 逻辑 | 分析 | 创意 |
|-----|-----|-----|-----|-----|
| Claude 3.5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| GPT-4o | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| deepseek-chat | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Gemini Pro | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 特性对比

| 特性 | DeepSeek | Claude | OpenAI | 智谱 | 通义 | Gemini |
|-----|----------|--------|--------|-----|-----|--------|
| 函数调用 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 流式输出 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 多模态 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 长上下文(128k) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| JSON模式 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 国内直连 | ⚠️ | ❌ | ❌ | ✅ | ✅ | ⚠️ |
| OpenAI兼容 | ✅ | 需适配 | - | ✅ | ✅ | ✅ |

---

## 接入配置

### DeepSeek

```json
{
  "provider": "openai",
  "model": "deepseek-chat",
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKey": "${DEEPSEEK_API_KEY}"
}
```

- 官网：https://platform.deepseek.com
- 注册：手机号即可
- 充值：支付宝/微信
- 免费额度：¥10

### Claude (Anthropic)

```json
{
  "provider": "anthropic",
  "model": "claude-3-5-sonnet-20241022",
  "apiKey": "${ANTHROPIC_API_KEY}"
}
```

- 官网：https://console.anthropic.com
- 注册：需海外手机号
- 充值：国际信用卡
- 免费额度：$5

### OpenAI

```json
{
  "provider": "openai",
  "model": "gpt-4o",
  "apiKey": "${OPENAI_API_KEY}"
}
```

- 官网：https://platform.openai.com
- 注册：需海外手机号
- 充值：国际信用卡
- 免费额度：$5（3个月有效）

### 智谱AI

```json
{
  "provider": "openai",
  "model": "glm-4",
  "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
  "apiKey": "${ZHIPU_API_KEY}"
}
```

- 官网：https://open.bigmodel.cn
- 注册：手机号即可
- 充值：支付宝/微信
- 免费额度：¥100

### 通义千问

```json
{
  "provider": "openai",
  "model": "qwen-max",
  "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  "apiKey": "${DASHSCOPE_API_KEY}"
}
```

- 官网：https://dashscope.aliyun.com
- 注册：阿里云账号
- 充值：阿里云账户
- 免费额度：¥100万tokens

### Gemini

```json
{
  "provider": "openai",
  "model": "gemini-pro",
  "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
  "apiKey": "${GEMINI_API_KEY}"
}
```

- 官网：https://ai.google.dev
- 注册：Google账号
- 免费额度：60 queries/min

### Groq

```json
{
  "provider": "openai",
  "model": "llama-3.1-70b-versatile",
  "baseUrl": "https://api.groq.com/openai/v1",
  "apiKey": "${GROQ_API_KEY}"
}
```

- 官网：https://console.groq.com
- 注册：邮箱即可
- 免费额度：$18/月

---

## 选择建议

### 个人用户（性价比优先）

```json
{
  "model": "deepseek-chat",
  "baseUrl": "https://api.deepseek.com/v1"
}
```

- 成本：最低
- 质量：优秀（中文）
- 访问：国内直连（需加速器）

### 开发团队（代码优先）

```json
{
  "models": {
    "coding": "claude-3.5-sonnet",
    "general": "deepseek-chat"
  }
}
```

- 主力：Claude 3.5（代码）
- 备用：DeepSeek（日常）
- 策略：智能路由

### 企业用户（稳定优先）

```json
{
  "models": {
    "primary": "qwen-max",
    "fallback": "glm-4"
  }
}
```

- 主选：通义千问（阿里云服务）
- 备选：智谱GLM
- 优势：国内服务，合规保障

### 国际用户（能力优先）

```json
{
  "model": "gpt-4o"
}
```

- 能力：最强综合能力
- 生态：最完善的工具链
- 注意：需解决访问问题

---

## 成本计算器

以每月10万tokens使用量为例：

| 模型 | 估算成本（月） |
|-----|--------------|
| deepseek-chat | ¥3-6 |
| gpt-4o-mini | $0.15-0.30 |
| claude-3.5-sonnet | $1.8-4.5 |
| gpt-4o | $1.5-3.5 |
| glm-4 | ¥10-20 |
| qwen-max | ¥4-16 |

---

## 注意事项

1. **API Key安全**：使用环境变量，不要硬编码
2. **Rate Limiting**：注意各平台的速率限制
3. **余额监控**：设置成本告警
4. **Fallback配置**：配置备用模型防止单点故障

---

**最后更新**：2025年Q1 | **价格请以官方为准**
