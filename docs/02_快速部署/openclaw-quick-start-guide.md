# OpenClaw 完全指南：快速开始

> 📖 来源：[知乎 - OpenClaw 完全指南](https://zhuanlan.zhihu.com/p/2015027745743189513)  
> ✍️ 作者：ConardLi（code秘密花园）  
> ⭐ 评分：⭐⭐⭐⭐⭐  
> 📅 采集日期：2026-07-20

---

## 四、OpenClaw 怎么跑起来？

### 4.1 环境要求

| 要求 | 最低配置 | 推荐配置 |
|------|----------|----------|
| 操作系统 | macOS 12+, Linux, Windows (WSL) | macOS 14+, Linux |
| 内存 | 4GB | 16GB+ |
| 磁盘 | 10GB | 50GB+ |
| 网络 | 需要网络连接（API 调用） | 稳定宽带 |

### 4.2 安装方式

#### Homebrew（macOS/Linux 推荐）

```bash
# 安装 OpenClaw
brew install openclaw/openclaw/openclaw

# 启动服务
openclaw start
```

#### npm/npx（跨平台）

```bash
# 全局安装
npm install -g openclaw

# 启动
npx openclaw start
```

#### Docker（适合服务器部署）

```bash
# 拉取镜像
docker pull openclaw/openclaw:latest

# 运行容器
docker run -d \
  --name openclaw \
  -v ~/.openclaw:/root/.openclaw \
  -p 18789:18789 \
  openclaw/openclaw:latest
```

#### 源码编译（开发者）

```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw.git

# 进入目录
cd openclaw

# 安装依赖
npm install

# 编译
npm run build

# 启动
npm start
```

### 4.3 首次配置

#### 1. 获取 API Key

```bash
# 创建配置目录
mkdir -p ~/.openclaw

# 编辑配置
openclaw config edit
```

#### 2. 配置模型（config.yaml）

```yaml
model:
  provider: openai        # 或 anthropic, ollama 等
  name: gpt-4o           # 模型名称
  apiKey: your-api-key   # 你的 API Key
```

#### 3. 配置消息渠道

```yaml
channels:
  telegram:
    enabled: true
    botToken: your-telegram-bot-token
```

### 4.4 启动与验证

```bash
# 检查配置
openclaw doctor

# 启动 OpenClaw
openclaw start

# 查看状态
openclaw status
```

### 4.5 常见问题

#### Q: 启动报错 "Permission denied"

```bash
# 修复权限
chmod +x ~/.openclaw/openclaw
```

#### Q: API 调用超时

检查网络连接，或在配置中增加超时时间：

```yaml
model:
  timeout: 60000  # 60秒超时
```

#### Q: 无法连接 Telegram

1. 确认 Bot Token 正确
2. 检查防火墙设置
3. 验证 Webhook 回调地址可访问

---

## 五、OpenClaw 如何配置模型？

### 5.1 支持的模型提供商

| 提供商 | 支持的模型 | 备注 |
|--------|-----------|------|
| OpenAI | GPT-4o, GPT-4-turbo, GPT-3.5-turbo | 最常用 |
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus | 强大推理 |
| Google | Gemini Pro, Gemini Ultra | 多模态 |
| Ollama | 本地 Llama, Mistral 等 | 完全本地 |
| Azure OpenAI | GPT-4, GPT-3.5 | 企业版 |
| 自定义 | 任何兼容 OpenAI API 的服务 | 灵活 |

### 5.2 OpenAI 配置

```yaml
model:
  provider: openai
  name: gpt-4o
  apiKey: sk-xxxxx
  baseUrl: https://api.openai.com/v1  # 默认值
```

### 5.3 Anthropic 配置

```yaml
model:
  provider: anthropic
  name: claude-3-5-sonnet-20241022
  apiKey: sk-ant-xxxxx
```

### 5.4 Ollama 本地模型

```yaml
model:
  provider: ollama
  name: llama3.2
  baseUrl: http://localhost:11434/v1
```

### 5.5 模型参数调优

```yaml
model:
  temperature: 0.7      # 创造性（0-2）
  maxTokens: 4096       # 最大输出 token 数
  topP: 1               # 核采样概率
  frequencyPenalty: 0    # 频率惩罚
  presencePenalty: 0    # 存在惩罚
```

---

## 相关资源

- 🔗 原文链接：[OpenClaw 完全指南 - 知乎](https://zhuanlan.zhihu.com/p/2015027745743189513)
- 📖 [认识 OpenClaw](../01_认识openclaw/openclaw-complete-guide-overview.md)
- 🔧 [配置参考](../04_模型配置/README.md)

---

*本文档由墨客自动采集整理，遵循原文 CC BY-SA 协议*
