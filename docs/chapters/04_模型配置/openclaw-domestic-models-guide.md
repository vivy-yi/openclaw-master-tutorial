# OpenClaw 国产模型配置指南 (Qwen3/DeepSeek/Moonshot)

本文档介绍如何在 OpenClaw 中配置国产大模型，包括 Qwen3、DeepSeek、Moonshot 等。

## 支持的模型

| 模型 | API 端点 | 特点 |
|------|---------|------|
| Qwen3-14B | api.alibaba.com/qwen | 开源免费 |
| DeepSeek | api.deepseek.com | 高性价比 |
| Moonshot | api.moonshot.cn | 长上下文 |

## 快速开始

### 1. 获取 API Key

**Qwen3 (阿里云)**

```bash
# 通过 HuggingFace 获取免费 token
# https://huggingface.co/settings/tokens

# 或通过阿里云 DashScope
# https://dashscope.console.aliyun.com/
```

**DeepSeek**

```bash
# https://platform.deepseek.com/
# 注册后获取 API Key
```

**Moonshot (月之暗面)**

```bash
# https://platform.moonshot.cn/
# 注册后获取 API Key
```

### 2. 配置 openclaw.json

**Qwen3 配置**:

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "qwen-turbo",
      "apiKey": "your-qwen-api-key",
      "baseUrl": "https://api.alibaba.com/qwen/v1"
    }
  }
}
```

**DeepSeek 配置**:

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "deepseek-chat",
      "apiKey": "your-deepseek-api-key",
      "baseUrl": "https://api.deepseek.com/v1"
    }
  }
}
```

**Moonshot 配置**:

```json
{
  "models": {
    "primary": {
      "provider": "openai", 
      "model": "moonshot-v1-8k",
      "apiKey": "your-moonshot-api-key",
      "baseUrl": "https://api.moonshot.cn/v1"
    }
  }
}
```

### 3. 验证配置

```bash
openclaw doctor --model
```

## 高级配置

### 本地模型 (Ollama)

**安装 Ollama**:

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | bash
```

**配置 OpenClaw**:

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "qwen2.5:14b",
      "apiKey": "ollama",
      "baseUrl": "http://localhost:11434/v1"
    }
  }
}
```

### 多模型组合

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "qwen-turbo",
      "apiKey": "xxx",
      "baseUrl": "https://api.alibaba.com/qwen/v1"
    },
    "fallback": {
      "provider": "openai",
      "model": "deepseek-chat", 
      "apiKey": "xxx",
      "baseUrl": "https://api.deepseek.com/v1"
    }
  }
}
```

### 长上下文配置

**Moonshot 128K 上下文**:

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "moonshot-v1-128k",
      "apiKey": "xxx",
      "baseUrl": "https://api.moonshot.cn/v1",
      "maxTokens": 32000
    }
  }
}
```

## 工具调用

配置完成后，模型可以使用 OpenClaw 工具：

```
Agent: 请帮我总结这段代码的功能 (使用代码分析工具)
Agent: 查询今天的天气 (使用 weather 工具)
```

## 费用优化

### 使用本地模型

- Qwen3-14B 免费（Ollama 本地运行）
- 仅消耗计算资源

### API 成本对比

| 模型 | 输入 | 输出 | 性价比 |
|------|-----|------|------|
| Qwen3 Turbo | ¥1/1M | ¥1/1M | ⭐⭐⭐⭐⭐ |
| DeepSeek | ¥1/1M | ¥1/1M | ⭐⭐⭐⭐⭐ |
| GPT-4o | ¥75/1M | ¥150/1M | ⭐⭐ |

### 成本控制

```json
{
  "models": {
    "primary": {
      "provider": "openai",
      "model": "qwen-turbo",
      "maxTokens": 4096,
      "temperature": 0.7
    }
  },
  "cost": {
    "dailyLimit": 10,
    "warningThreshold": 0.8
  }
}
```

## 故障排除

### API Key 无效

- 检查 Key 是否正确
- 确认 API 余额充足
- 验证端点 URL

### 连接超时

- 检查网络连接
- 增加 timeout 设置
- 使用代理

### 模型不支持工具

- 确认模型支持 function calling
- 检查 model 参数是否正确

## 相关资源

- [Qwen 官方文档](https://qwenLM.github.io)
- [DeepSeek API](https://platform.deepseek.com)
- [Moonshot API](https://platform.moonshot.cn)
- [Ollama 下载](https://ollama.com)