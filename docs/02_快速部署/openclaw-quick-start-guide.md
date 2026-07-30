---
title: OpenClaw 快速开始指南
description: 基于知乎 ConardLi《OpenClaw 完全指南》第四章内容，详细介绍 OpenClaw 的安装、配置和快速上手
---

# OpenClaw 快速开始指南

> **来源**: 知乎专栏 - code秘密花园  
> **作者**: ConardLi  
> **原文**: [OpenClaw 完全指南：这可能是全网最新最全的系统化教程了！](https://zhuanlan.zhihu.com/p/2015027745743189513)  
> **对应章节**: 第四章 - OpenClaw 怎么跑起来？  
> **版本**: 基于 2026年3月版本编写  
> **评分**: ⭐⭐⭐⭐⭐ (必收录)

---

## 一、环境准备

### 1.1 系统要求

| 要求 | 最低配置 | 推荐配置 |
|------|---------|---------|
| **操作系统** | macOS 12+ / Ubuntu 20.04+ / Windows 10+ (WSL2) | macOS 14+ / Ubuntu 22.04+ |
| **内存** | 4GB RAM | 16GB RAM |
| **磁盘空间** | 10GB 可用空间 | 50GB+ SSD |
| **Node.js** | v18+ | v20 LTS |
| **npm/yarn** | 最新版本 | 最新版本 |

### 1.2 安装 Node.js

**macOS:**

```bash
# 使用 Homebrew
brew install node

# 验证安装
node --version  # 应显示 v18+ 或 v20+
npm --version
```

**Ubuntu/Debian:**

```bash
# 使用 NodeSource 仓库安装 v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

**Windows (WSL2):**

```bash
# 在 WSL2 终端中执行
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 1.3 准备模型 API

OpenClaw 支持多种模型 provider，建议提前准备：

| Provider | 说明 | 获取方式 |
|----------|------|---------|
| **OpenAI** | GPT-4/GPT-3.5 | https://platform.openai.com/api-keys |
| **Anthropic** | Claude 3 | https://console.anthropic.com/ |
| **本地模型** | Ollama 等 | 本地部署 |
| **Azure OpenAI** | 企业版 | Azure 门户 |

---

## 二、安装 OpenClaw

### 2.1 方式一：npm 全局安装（推荐）

```bash
# 全局安装 OpenClaw
npm install -g openclaw

# 验证安装
openclaw --version

# 查看帮助
openclaw --help
```

### 2.2 方式二：Docker 部署

```bash
# 拉取最新镜像
docker pull openclaw/openclaw:latest

# 创建配置目录
mkdir -p ~/.openclaw

# 启动容器（交互模式）
docker run -it \
  -v ~/.openclaw:/root/.openclaw \
  -p 3000:3000 \
  openclaw/openclaw:latest

# 启动容器（守护模式）
docker run -d \
  --name openclaw \
  -v ~/.openclaw:/root/.openclaw \
  -p 3000:3000 \
  openclaw/openclaw:latest
```

### 2.3 方式三：从源码编译

```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 安装依赖
npm install

# 编译
npm run build

# 链接到全局
npm link

# 验证
openclaw --version
```

---

## 三、首次配置

### 3.1 初始化项目

```bash
# 创建新项目
openclaw init my-agent

# 进入项目目录
cd my-agent

# 查看项目结构
ls -la
```

**初始化后的项目结构：**

```
my-agent/
├── .openclaw/           # 配置文件目录
│   ├── config.yaml      # 主配置文件
│   ├── skills/          # 技能目录
│   └── memory/          # 记忆存储
├── prompts/             # Prompt 模板
├── hooks/               # 自定义 Hooks
└── package.json
```

### 3.2 配置模型

编辑 `~/.openclaw/config.yaml` 或使用命令行：

```bash
# 设置 OpenAI 作为默认模型
openclaw config set model.provider openai
openclaw config set model.api-key YOUR_OPENAI_API_KEY
openclaw config set model.default-model gpt-4

# 设置 Anthropic Claude
openclaw config set model.provider anthropic
openclaw config set model.api-key YOUR_ANTHROPIC_API_KEY
openclaw config set model.default-model claude-3-opus
```

**完整配置示例 (config.yaml):**

```yaml
model:
  provider: openai
  api-key: ${OPENAI_API_KEY}
  default-model: gpt-4
  temperature: 0.7
  max-tokens: 4096

memory:
  type: local
  persist: true
  path: ./memory

channels:
  - type: terminal
    enabled: true
  
skills:
  enabled: true
  install-on-startup:
    - github
    - browser-automation

hooks:
  enabled: true
  path: ./hooks

cron:
  enabled: true
  timezone: Asia/Shanghai
```

### 3.3 环境变量管理

```bash
# 创建 .env 文件
cat > ~/.openclaw/.env << 'EOF'
# OpenAI
OPENAI_API_KEY=sk-xxxxx

# Anthropic (可选)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# 飞书配置 (可选)
FEISHU_APP_ID=cli_xxxxx
FEISHU_APP_SECRET=xxxxx
EOF

# 设置权限（安全）
chmod 600 ~/.openclaw/.env
```

---

## 四、启动服务

### 4.1 交互模式启动

```bash
# 启动交互式会话
openclaw start

# 或简写
openclaw
```

**首次启动会看到：**

```
🚀 OpenClaw Gateway 启动中...
✅ Gateway:     运行中 (端口 3000)
✅ Channels:    已连接
✅ Memory:      就绪
✅ Skills:      已加载 12 个技能
✅ Cron:        已调度 0 个任务

🎉 OpenClaw 已就绪！

输入你的指令（或按 Ctrl+C 退出）:
>
```

### 4.2 后台服务启动

```bash
# 启动为后台服务
openclaw start --daemon

# 查看服务状态
openclaw status

# 停止服务
openclaw stop
```

### 4.3 Docker 环境启动

```bash
# 后台运行
docker run -d \
  --name openclaw \
  -p 3000:3000 \
  -v ~/.openclaw:/root/.openclaw \
  -e OPENAI_API_KEY=sk-xxxxx \
  openclaw/openclaw:latest

# 查看日志
docker logs -f openclaw

# 进入容器交互
docker exec -it openclaw /bin/bash
```

---

## 五、连接聊天渠道

### 5.1 飞书配置

**Step 1: 创建飞书应用**

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 创建企业自建应用
3. 获取 `App ID` 和 `App Secret`

**Step 2: 配置权限**

在飞书开放平台控制台，添加以下权限：
- `im:message`
- `im:message.receive_v1`
- `im:chat.member`

**Step 3: 配置 Webhook**

```bash
openclaw config set channels.feishu.enabled true
openclaw config set channels.feishu.app-id ${FEISHU_APP_ID}
openclaw config set channels.feishu.app-secret ${FEISHU_APP_SECRET}
openclaw config set channels.feishu.bot-name OpenClaw
```

**Step 4: 在飞书开放平台配置**

1. 启用「机器人」能力
2. 配置「事件订阅」- 选择 `im.message.receive_v1`
3. 配置「权限管理」

### 5.2 Telegram 配置

**Step 1: 创建 Bot**

1. 在 Telegram 搜索 `@BotFather`
2. 发送 `/newbot`
3. 获取 Bot Token

**Step 2: 配置**

```bash
openclaw config set channels.telegram.enabled true
openclaw config set channels.telegram.bot-token ${TELEGRAM_BOT_TOKEN}
openclaw config set channels.telegram.allowed-users:
  - user_id_1
  - user_id_2
```

### 5.3 微信（企业微信）配置

```bash
openclaw config set channels.wechat.enabled true
openclaw config set channels.wechat.corp-id ${CORP_ID}
openclaw config set channels.wechat.agent-id ${AGENT_ID}
openclaw config set channels.wechat.corp-secret ${CORP_SECRET}
```

---

## 六、验证安装

### 6.1 基本功能测试

```bash
# 进入交互模式
openclaw

# 测试对话
> 你好，请介绍一下你自己

# 测试工具调用
> 帮我查看当前目录的文件

# 测试代码执行
> 用 Python 打印 Hello World
```

### 6.2 API 测试

```bash
# 健康检查
curl http://localhost:3000/health

# 应返回
{
  "status": "ok",
  "version": "x.x.x",
  "uptime": 12345
}
```

### 6.3 日志查看

```bash
# 实时日志
openclaw logs

# 查看最近 100 行
openclaw logs --lines 100

# 搜索关键词
openclaw logs --grep "error"
```

---

## 七、常见问题排查

### 7.1 端口占用

```bash
# 检查端口占用
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或更换端口
openclaw config set gateway.port 3001
```

### 7.2 模型连接失败

```bash
# 检查 API Key
openclaw config get model.api-key

# 测试 API 连接
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

### 7.3 权限问题

```bash
# macOS/Linux 权限修复
chmod -R 755 ~/.openclaw
chmod 600 ~/.openclaw/.env
```

---

## 八、后续步骤

恭喜完成基础安装！接下来：

| 步骤 | 文档 | 说明 |
|------|------|------|
| 1️⃣ | [模型配置指南](../04_模型配置/openclaw-model-config-guide.md) | 深入配置模型参数 |
| 2️⃣ | [上下文与记忆](../06_上下文与记忆/openclaw-memory-system.md) | 配置记忆系统 |
| 3️⃣ | [技能安装](../15_Skills/openclaw-skills-guide.md) | 安装扩展技能 |
| 4️⃣ | [安全配置](../16_安全配置/openclaw-security-guide.md) | 保护你的部署 |

---

## 参考资源

| 资源 | 链接 |
|------|------|
| **官方安装文档** | https://docs.openclaw.ai/getting-started/installation |
| **配置参考** | https://docs.openclaw.ai/configuration |
| **渠道配置** | https://docs.openclaw.ai/channels |
| **飞书开发文档** | https://open.feishu.cn/document/home |

---

*本文档由「墨客」根据知乎 ConardLi 原著整理生成*  
*整理时间: 2026-07-20*  
*版本: v1.0*
