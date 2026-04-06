# OpenClaw 与主流 AI 工作流平台集成指南

> 本章介绍如何将 OpenClaw 与 Coze(扣子)、n8n、Dify 等主流 AI 工作流平台集成，实现跨平台任务调度和工作流自动化。

---

## 1. 集成架构总览

### 1.1 平台定位对比

| 平台 | 定位 | OpenClaw 角色 |
|------|------|---------------|
| **Coze/扣子** | AI Bot 发布平台 | 可作为 Bot 执行引擎 |
| **n8n** | 工作流自动化 | 可作为工作流节点 |
| **Dify** | LLM 应用平台 | 可作为工具调用后端 |
| **LangBot** | 多平台 Bot | 全能中间层 |

### 1.2 集成模式

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenClaw 作为调度中心                        │
│                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │
│  │  Coze   │◄──►│  n8n   │◄──►│  Dify   │◄──►│ Others │  │
│  └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘  │
│       │              │              │              │        │
│       └──────────────┴──────────────┴──────────────┘        │
│                            │                                │
│              OpenClaw Agent (调度者)                         │
│                            │                                │
│       ┌────────────────────┼────────────────────┐          │
│       │                    │                    │          │
│   Skills 执行          Cron 任务            记忆管理         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. n8n-to-Claw：n8n 工作流转 OpenClaw Skill

### 2.1 项目简介

**n8n-to-claw** 是一个 CLI 工具，可以将 n8n 工作流 JSON 自动转换为 OpenClaw 兼容的 Skill。

```
GitHub: https://github.com/just-claw-it/n8n-to-claw
Stars: -
语言: TypeScript
```

### 2.2 技术架构

```
n8n 工作流 JSON
       │
       ▼
┌─────────────────────────────────────────┐
│           n8n-to-claw CLI                │
├─────────────────────────────────────────┤
│  1. Parser (解析器)                      │
│     • parseNode() - 解析节点            │
│     • parseEdges() - 解析连接            │
│     • categorizeNode() - 节点分类        │
│                                          │
│  2. IR (中间表示)                        │
│     • WorkflowIR                        │
│     • IRNode                            │
│     • IREdge                            │
│                                          │
│  3. Transpiler (转换器)                  │
│     • 调用 LLM 转换                      │
│     • 生成 SKILL.md                      │
│     • 生成 skill.ts                      │
│                                          │
│  4. Package (打包)                      │
│     • 输出到 ~/.openclaw/skills/        │
└─────────────────────────────────────────┘
       │
       ▼
   OpenClaw Skill
```

### 2.3 节点类型映射

| n8n 节点类别 | 映射 | OpenClaw 实现 |
|-------------|------|---------------|
| `trigger` | → | Cron / Webhook |
| `http` | → | http_request skill |
| `code` | → | exec tool |
| `database` | → | bash CLI (psql/sqlite3) |
| `llm` | → | 内置 LLM |
| `webhook` | → | OpenClaw Webhook |
| `unknown` | → | TODO Stub |

### 2.4 安装

```bash
# 克隆仓库
git clone https://github.com/just-claw-it/n8n-to-claw.git
cd n8n-to-claw

# 安装依赖
npm install

# 构建
npm run build

# 或全局安装
npm install -g .
```

### 2.5 使用

```bash
# 基本用法 - 从本地文件转换
n8n-to-claw convert workflow.json

# 从 n8n API 获取
n8n-to-claw convert \
  --n8n-url https://my-n8n.example.com \
  --api-key <your-api-key> \
  --workflow-id <workflow-id>

# 预览模式 - 仅解析不转换
n8n-to-claw convert workflow.json --dry-run

# 详细输出
n8n-to-claw convert workflow.json --verbose

# 指定输出目录
n8n-to-claw convert workflow.json --output-dir ~/my-skills

# 覆盖已有文件
n8n-to-claw convert workflow.json --force
```

### 2.6 环境变量

```bash
# LLM 配置 (必需)
export LLM_BASE_URL=https://api.openai.com/v1
export LLM_API_KEY=sk-...
export LLM_MODEL=gpt-4o

# 可选
export LLM_TIMEOUT_MS=60000
export LLM_MAX_RETRIES=3
```

### 2.7 核心代码解析

#### 解析器 (Parser)

```typescript
// src/parse/parser.ts
import { categorizeNode } from "./categorize.js";

function parseNode(raw: N8nRawNode, warnings: IRWarning[]): IRNode {
  const id = raw.id ?? raw.name ?? "unknown";
  const name = raw.name ?? "Unnamed Node";
  const type = raw.type ?? "unknown";
  const category = categorizeNode(type);
  const hasExpressions = containsExpression(parameters);

  return {
    id,
    name,
    type,
    category,
    parameters,
    hasExpressions,
    credentials: parseCredentials(raw.credentials),
    raw,
  };
}

// 节点分类 - categorize.ts
const EXACT_MAP: Record<string, NodeCategory> = {
  "n8n-nodes-base.manualTrigger": "trigger",
  "n8n-nodes-base.scheduleTrigger": "trigger",
  "n8n-nodes-base.cronTrigger": "trigger",
  "n8n-nodes-base.httpRequest": "http",
  "n8n-nodes-base.code": "code",
  "n8n-nodes-base.postgres": "database",
  // ... 400+ 节点类型
};
```

#### 转换器 (Transpiler)

```typescript
// src/transpile/transpile.ts
export async function transpile(
  ir: WorkflowIR,
  config?: LLMConfig
): Promise<TranspileResult> {
  // 构建 LLM 提示词
  const messages = buildTranspilePrompt(ir);
  
  // 调用 LLM 转换
  const attempt1 = await runAttempt(llmConfig, messages);
  
  // 验证 TypeScript
  if (attempt1.validationResult.valid) {
    return { status: "success", output: attempt1.output };
  }
  
  // 失败重试
  const retryMessages = buildRetryPrompt(...);
  const attempt2 = await runAttempt(llmConfig, retryMessages);
  
  return attempt2.validationResult.valid
    ? { status: "success", output: attempt2.output }
    : { status: "draft", output: attempt2.output };
}
```

---

## 3. OpenClaw + n8n 一键部署

### 3.1 项目简介

**openclaw-n8n-stack** 是一个 Docker 一键部署模板，集成了 OpenClaw 和 n8n。

```
GitHub: https://github.com/caprihan/openclaw-n8n-stack
Stars: -
Docker: ✅
```

### 3.2 架构

```
┌─────────────────────────────────────────────┐
│                  Docker Stack                │
├─────────────────────────────────────────────┤
│                                              │
│  ┌─────────────┐    ┌─────────────┐       │
│  │  OpenClaw   │◄──►│     n8n      │       │
│  │   Gateway   │    │  Workflows   │       │
│  └─────────────┘    └─────────────┘       │
│         │                   │                │
│         └─────────┬─────────┘                │
│                   │                          │
│              400+ Integrations               │
│                                              │
└─────────────────────────────────────────────┘
```

### 3.3 快速部署

```bash
# 1. 克隆
git clone https://github.com/caprihan/openclaw-n8n-stack.git
cd openclaw-n8n-stack

# 2. 配置
cp .env.template .env
nano .env

# 编辑配置
cat > .env << 'EOF'
# OpenClaw
OPENAI_API_KEY=sk-...

# n8n
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your-password
N8N_HOST=localhost
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-domain.com

# 可选: 多模型
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...
EOF

# 3. 启动
docker-compose up -d

# 4. 访问
# OpenClaw: http://localhost:18789
# n8n: http://localhost:5678
```

### 3.4 docker-compose.yml

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw:local
    container_name: openclaw
    restart: unless-stopped
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./openclaw:/home/node/.openclaw
    networks:
      - internal

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=${N8N_HOST}
      - N8N_PROTOCOL=${N8N_PROTOCOL}
      - WEBHOOK_URL=${WEBHOOK_URL}
    volumes:
      - ./n8n:/home/node/.n8n
    networks:
      - internal
    depends_on:
      - openclaw

networks:
  internal:
    driver: bridge
```

### 3.5 OpenClaw 调用 n8n

```typescript
// skills/n8n-trigger/SKILL.md
# n8n Workflow Trigger

触发 n8n 工作流执行

## 使用

\`\`\`
用户: 帮我执行销售报告工作流
Agent: 调用 n8n_trigger skill
Agent: 等待工作流完成
Agent: 返回结果
\`\`\`

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| workflow_name | string | 工作流名称 |
| input_data | object | 输入数据 |
| wait_for_result | boolean | 等待结果 |

## 实现

\`\`\`typescript
async function n8n_trigger(params: {
  workflow_name: string;
  input_data: object;
  wait_for_result?: boolean;
}) {
  // 触发 n8n webhook
  const response = await fetch(
    `http://n8n:5678/webhook/${params.workflow_name}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.input_data),
    }
  );
  
  if (params.wait_for_result) {
    // 轮询等待结果
    return await pollExecution(response.executionId);
  }
  
  return { status: 'triggered', execution_id: response.id };
}
\`\`\`
```

---

## 4. OpenClaw + Dify 集成

### 4.1 项目简介

**openclaw-dify-starter** 实现了 OpenClaw 与 Dify 的完整集成。

```
GitHub: https://github.com/gaoios/openclaw-dify-starter
Docker: ✅
一键部署: ✅
```

### 4.2 架构

```
┌─────────────────────────────────────────────────────────┐
│                      Docker Stack                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│  │   OpenClaw   │◄──►│   Dify API   │◄──►│  Dify   │ │
│  │   Gateway    │    │              │    │  Workers │ │
│  └──────────────┘    └──────────────┘    └──────────┘ │
│         │                   │                   │       │
│         └───────────────────┴───────────────────┘       │
│                          │                               │
│              ┌───────────┴───────────┐                  │
│              │     PostgreSQL        │                  │
│              │        Redis          │                  │
│              │    Caddy (HTTPS)      │                  │
│              └─────────────────────┘                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.3 快速部署

```bash
# 1. 克隆
git clone https://github.com/gaoios/openclaw-dify-starter.git
cd openclaw-dify-starter

# 2. 配置
cp .env.template .env
nano .env

# 3. 一键启动
docker-compose up -d
```

### 4.4 环境变量

```bash
# 必填
OPENAI_API_KEY=sk-...
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_USER_ID=your-user-id

# Dify
DIFY_API_KEY=app-xxx
DIFY_API_URL=http://dify-api:80

# 域名
DOMAIN_NAME=your-domain.com

# 数据库
POSTGRES_USER=openclaw
POSTGRES_PASSWORD=your-password
POSTGRES_DB=openclaw

# Redis
REDIS_PASSWORD=your-password

# Dify Secret
DIFY_SECRET_KEY=your-secret-key
```

### 4.5 访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| OpenClaw | http://localhost:18789 | Telegram Bot |
| Dify | http://localhost:80 | Web UI |
| Caddy | https://dify.your-domain.com | 反向代理 |

---

## 5. Dify Auth Plugin：双向集成

### 5.1 项目简介

**openclaw-plugin-dify-auth** 实现了 Dify 调用 OpenClaw 本地工具的能力。

```
GitHub: https://github.com/taichuy/openclaw-plugin-dify-auth
功能: Dify → OpenClaw 工具调用
```

### 5.2 交互流程

```
1. 用户在 OpenClaw 发送消息
         │
         ▼
2. OpenClaw 转发到 Dify
         │
         ▼
3. Dify LLM 判断需要调用工具
         │
         ▼
4. Dify 返回 tool_call 指令
         │
         ▼
5. OpenClaw 执行本地工具
   (文件操作、系统命令、MCP插件等)
         │
         ▼
6. 工具结果返回给 Dify
         │
         ▼
7. Dify 生成最终回复
```

### 5.3 安装

```bash
# 1. 安装插件
openclaw plugins install @taichuy/dify-auth

# 2. 启用插件
openclaw plugins enable dify-auth

# 3. 配置认证
openclaw models auth login --provider dify

# 输入 API Key
# 输入 API URL (默认 Dify Cloud)
```

### 5.4 配置 Dify

由于需要修改版 Dify 支持：

```bash
# 克隆修改版 Dify
git clone https://github.com/JAVA-LW/dify.git
cd dify
git checkout taichuy_dev

# 构建
docker-compose build
```

---

## 6. LangBot：全能 Bot 平台

### 6.1 项目简介

**LangBot** 是一个生产级的多平台 Bot 开发平台，集成 Coze、n8n、Dify。

```
GitHub: https://github.com/langbot-app/LangBot
Stars: -
平台: Discord / Slack / LINE / WeChat / 飞书 / 钉钉 / QQ / Telegram
```

### 6.2 架构

```
┌─────────────────────────────────────────────────────────┐
│                     LangBot                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                    Bot 核心                         │ │
│  │  • 多平台适配器                                     │ │
│  │  • 会话管理                                        │ │
│  │  • 中间件                                          │ │
│  └─────────────────────────────────────────────────────┘ │
│                          │                               │
│       ┌──────────────────┼──────────────────┐            │
│       │                  │                  │            │
│   ┌───┴───┐          ┌───┴───┐          ┌───┴───┐       │
│   │ Coze  │          │  n8n  │          │ Dify  │       │
│   │ Bot   │          │Workflow│          │ LLM   │       │
│   └───┬───┘          └───┬───┘          └───┬───┘       │
│       │                  │                  │            │
│       └──────────────────┼──────────────────┘            │
│                          │                               │
│              ┌────────────┴────────────┐                 │
│              │    OpenClaw Agent      │                 │
│              │    • Skills            │                 │
│              │    • Memory            │                 │
│              │    • Cron              │                 │
│              └─────────────────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.3 支持平台

| 平台 | 状态 | 说明 |
|------|------|------|
| Telegram | ✅ | 完整支持 |
| Discord | ✅ | 完整支持 |
| Slack | ✅ | 完整支持 |
| LINE | ✅ | 完整支持 |
| WeChat | ✅ | 企业微信/公众号 |
| 飞书 | ✅ | 完整支持 |
| 钉钉 | ✅ | 完整支持 |
| QQ | ✅ | 完整支持 |
| Satori | ✅ | 通用适配器 |

### 6.4 集成方式

```yaml
# langbot.config.yaml
channels:
  telegram:
    enabled: true
    bot_token: ${TELEGRAM_BOT_TOKEN}
    
  discord:
    enabled: false
    bot_token: ${DISCORD_BOT_TOKEN}

providers:
  coze:
    enabled: true
    api_key: ${COZE_API_KEY}
    
  n8n:
    enabled: true
    webhook_url: ${N8N_WEBHOOK_URL}
    
  dify:
    enabled: true
    api_key: ${DIFY_API_KEY}
    base_url: ${DIFY_BASE_URL}

openclaw:
  enabled: true
  skills:
    - stock-analysis
    - weather
    - excalidraw
```

---

## 7. n8n-custom-mcp：n8n MCP Server

### 7.1 项目简介

**n8n-custom-mcp** 是一个功能完整的 n8n MCP Server，提供 31 个 n8n 管理工具。

```
GitHub: https://github.com/duynghien/n8n-custom-mcp
版本: v2.2.0
测试: 201 passed
```

### 7.2 能力对比

| 能力 | 其他 MCP | n8n-custom-mcp |
|------|---------|---------------|
| 列出/查看工作流 | ✅ | ✅ |
| 运行工作流 | ✅ | ✅ |
| 启用/禁用工作流 | ✅ | ✅ |
| **创建工作流** | ❌ | ✅ |
| **编辑工作流** | ❌ | ✅ |
| **删除工作流** | ❌ | ✅ |
| **测试 Webhook** | ❌ | ✅ |
| **执行历史** | ❌ | ✅ |
| **Debug 执行** | ❌ | ✅ |
| **列出节点类型** | ❌ | ✅ |
| **管理 Credentials** | ❌ | ✅ |

### 7.3 工具列表

```json
{
  "tools": [
    // Workflow CRUD
    { "name": "list_workflows", "description": "列出所有工作流" },
    { "name": "get_workflow", "description": "获取工作流详情" },
    { "name": "create_workflow", "description": "创建新工作流" },
    { "name": "update_workflow", "description": "更新工作流" },
    { "name": "delete_workflow", "description": "删除工作流" },
    { "name": "activate_workflow", "description": "激活工作流" },
    { "name": "deactivate_workflow", "description": "停用工作流" },
    
    // Execution
    { "name": "run_workflow", "description": "手动执行工作流" },
    { "name": "test_webhook", "description": "测试 Webhook" },
    { "name": "get_executions", "description": "获取执行历史" },
    { "name": "get_execution", "description": "获取单个执行详情" },
    { "name": "retry_execution", "description": "重试执行" },
    
    // Credentials
    { "name": "list_credentials", "description": "列出凭证" },
    { "name": "create_credential", "description": "创建凭证" },
    { "name": "test_credential", "description": "测试凭证有效性" },
    { "name": "delete_credential", "description": "删除凭证" },
    
    // Validation
    { "name": "lint_workflow", "description": "验证工作流" },
    { "name": "check_circular_loops", "description": "检查循环" },
    { "name": "check_orphaned_nodes", "description": "检查孤立节点" },
    
    // Node Types
    { "name": "list_node_types", "description": "列出可用节点" }
  ]
}
```

### 7.4 安装使用

```bash
# Docker 部署
docker run -d \
  --name n8n-mcp \
  -p 3000:3000 \
  -e N8N_HOST=your-n8n.com \
  -e N8N_API_KEY=your-api-key \
  n8n-custom-mcp

# 在 OpenClaw 中配置 MCP
# openclaw config set mcp.servers.n8n.url=http://localhost:3000
```

---

## 8. OpenClaw 调用外部平台 Skills

### 8.1 Coze Skill

```typescript
// skills/coze/SKILL.md
# Coze API Skill

调用 Coze API 管理 Bot 和工作流

## 使用场景
- 创建/发布 Coze Bot
- 触发 Coze 工作流
- 查询 Bot 状态

## 实现

\`\`\`typescript
class CozeSkill {
  private baseUrl = "https://api.coze.com/v1";
  
  async createBot(config: BotConfig) {
    const response = await fetch(`${this.baseUrl}/bots`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });
    return response.json();
  }
  
  async triggerWorkflow(workflowId: string, inputs: object) {
    const response = await fetch(
      `${this.baseUrl}/workflows/${workflowId}/run`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ inputs })
      }
    );
    return response.json();
  }
  
  async getWorkflowResult(runId: string) {
    // 轮询获取结果
    // ...
  }
}
\`\`\`
```

### 8.2 Dify Skill

```typescript
// skills/dify/SKILL.md
# Dify API Skill

调用 Dify 应用和工作流

## 使用场景
- 调用 Dify Chat 应用
- 触发 Dify 工作流
- 查询知识库

## 实现

\`\`\`typescript
class DifySkill {
  private baseUrl: string;
  
  async chat(applicationId: string, query: string, user: string) {
    const response = await fetch(`${this.baseUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {},
        query,
        user,
        response_mode: "blocking"  // 或 "streaming"
      })
    });
    return response.json();
  }
  
  async runWorkflow(workflowId: string, inputs: object) {
    const response = await fetch(`${this.baseUrl}/workflows/run`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        inputs,
        response_mode: "blocking"
      })
    });
    return response.json();
  }
}
\`\`\`
```

### 8.3 n8n Skill

```typescript
// skills/n8n/SKILL.md
# n8n API Skill

调用 n8n API 触发工作流

## 使用场景
- 触发 n8n Webhook
- 查询执行状态
- 管理工作流

## 实现

\`\`\`typescript
class N8nSkill {
  private baseUrl: string;
  
  async triggerWebhook(webhookPath: string, data: object) {
    const response = await fetch(`${this.baseUrl}/webhook/${webhookPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  async runWorkflow(workflowId: string, data: object) {
    const response = await fetch(
      `${this.baseUrl}/workflows/${workflowId}/execute`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      }
    );
    return response.json();
  }
}
\`\`\`
```

---

## 9. 工作流转 OpenClaw 任务

### 9.1 转换规则

| n8n/Dify 概念 | → | OpenClaw 实现 |
|---------------|---|---------------|
| Schedule Trigger | → | Cron Job |
| Webhook Trigger | → | Webhook Endpoint |
| HTTP Request | → | http skill |
| Code Node | → | exec tool |
| Condition | → | if/else in Agent |
| Loop | → | for/while in Agent |
| LLM Node | → | 内置 LLM |
| Database | → | exec + bash |

### 9.2 示例转换

#### n8n 工作流

```json
{
  "name": "Daily Report",
  "nodes": [
    {
      "name": "Schedule",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": { "interval": [{ "field: "day", "days": 1 }] }
      }
    },
    {
      "name": "Fetch Data",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.example.com/data"
      }
    },
    {
      "name": "Process",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "return items.map(i => ({...i.json, processed: true}));"
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend"
    }
  ]
}
```

#### 转换为 OpenClaw Cron 任务

```yaml
# OpenClaw Cron Job
cron_jobs:
  - name: "daily-report"
    schedule: "0 9 * * *"  # 每天 9 点
    session: isolated
    action: |
      # 步骤 1: 获取数据
      data = http_get("https://api.example.com/data")
      
      # 步骤 2: 处理数据
      processed = data.map(item => ({...item, processed: true}))
      
      # 步骤 3: 发送邮件
      send_email(
        to="team@example.com",
        subject="Daily Report",
        body=format_report(processed)
      )
```

### 9.3 手动转换工具

```python
#!/usr/bin/env python3
"""n8n workflow to OpenClaw cron converter"""

import json
import yaml
from typing import Dict, Any

class WorkflowConverter:
    def __init__(self, workflow_json: Dict):
        self.workflow = workflow_json
        self.nodes = workflow_json.get('nodes', [])
        self.edges = workflow_json.get('connections', {})
    
    def find_trigger(self) -> Dict[str, Any]:
        """找到触发节点"""
        for node in self.nodes:
            node_type = node.get('type', '')
            if 'trigger' in node_type.lower() or 'schedule' in node_type.lower():
                return node
        return None
    
    def parse_schedule(self, trigger_node: Dict) -> str:
        """解析调度规则为 cron 表达式"""
        params = trigger_node.get('parameters', {})
        rule = params.get('rule', {})
        
        # n8n interval to cron
        interval = rule.get('interval', [{}])[0]
        field = interval.get('field', '')
        
        if field == 'day':
            return "0 9 * * *"  # 每天 9 点
        elif field == 'hour':
            return f"0 */{interval.get('hours', 1)} * * *"
        elif field == 'minute':
            return f"*/{interval.get('interval', 1)} * * * *"
        
        return "0 9 * * *"  # 默认
    
    def convert_node(self, node: Dict) -> str:
        """将节点转换为 OpenClaw 代码"""
        node_type = node.get('type', '')
        params = node.get('parameters', {})
        
        if 'httpRequest' in node_type:
            url = params.get('url', '')
            method = params.get('method', 'GET')
            return f'{method.lower()}("{url}")'
        
        elif 'code' in node_type:
            code = params.get('jsCode', params.get('pythonCode', ''))
            return f'# Code: {code[:100]}...'
        
        elif 'email' in node_type:
            return 'send_email(...)'
        
        return f'# {node.get("name", "Unknown")}'
    
    def to_openclaw_cron(self) -> Dict:
        """转换为 OpenClaw Cron 格式"""
        trigger = self.find_trigger()
        if not trigger:
            return {'error': 'No trigger found'}
        
        schedule = self.parse_schedule(trigger)
        
        # 转换其他节点
        steps = []
        for node in self.nodes:
            if node != trigger:
                steps.append(self.convert_node(node))
        
        return {
            'name': self.workflow.get('name', 'converted-workflow'),
            'schedule': schedule,
            'steps': steps
        }

# 使用
with open('workflow.json') as f:
    workflow = json.load(f)

converter = WorkflowConverter(workflow)
openclaw_cron = converter.to_openclaw_cron()

print(yaml.dump({'cron_jobs': [openclaw_cron]}, default_flow_style=False))
```

---

## 10. 最佳实践

### 10.1 集成原则

| 原则 | 说明 |
|------|------|
| **OpenClaw 作为调度** | OpenClaw 负责任务编排，外部平台负责执行 |
| **异步优先** | 长时间任务用 webhook/callback |
| **错误处理** | 每个集成都要有重试和降级 |
| **安全第一** | API keys 用环境变量，不过代码 |

### 10.2 架构建议

```
┌─────────────────────────────────────────────────────────────┐
│                    推荐架构                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  OpenClaw (调度中心)                                          │
│  ├── Cron 任务 → 触发 n8n/Dify                            │
│  ├── 用户请求 → 调用 Coze Bot                              │
│  └── Skills → 封装所有外部 API                             │
│                                                              │
│  n8n (数据处理)                                              │
│  ├── 定时数据采集                                           │
│  ├── API 聚合                                              │
│  └── 复杂数据转换                                           │
│                                                              │
│  Dify (AI 能力)                                             │
│  ├── Chat 应用                                              │
│  ├── 知识库问答                                             │
│  └── 工作流编排                                             │
│                                                              │
│  Coze (Bot 发布)                                            │
│  ├── 快速发布 Bot                                           │
│  └── 多平台分发                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 常见问题

| 问题 | 解决方案 |
|------|----------|
| n8n API 认证失败 | 使用 API Key + Basic Auth |
| Dify 工作流超时 | 设置合理的 timeout + async callback |
| Coze Bot 响应慢 | 使用 webhook 异步响应 |
| 复杂循环无法转换 | 手动转换为 Agent 循环 |

---

## 11. 项目索引

| 项目 | 地址 | 用途 |
|------|------|------|
| **n8n-to-claw** | https://github.com/just-claw-it/n8n-to-claw | n8n → OpenClaw |
| **ClawFlow** | https://github.com/khallad2/ClawFlow | OpenClaw + n8n |
| **openclaw-n8n-stack** | https://github.com/caprihan/openclaw-n8n-stack | Docker 一键部署 |
| **openclaw-dify-starter** | https://github.com/gaoios/openclaw-dify-starter | OpenClaw + Dify |
| **openclaw-plugin-dify-auth** | https://github.com/taichuy/openclaw-plugin-dify-auth | Dify → OpenClaw |
| **n8n-custom-mcp** | https://github.com/duynghien/n8n-custom-mcp | n8n MCP Server |
| **LangBot** | https://github.com/langbot-app/LangBot | 多平台 Bot |

---

_本章介绍了 OpenClaw 与主流 AI 工作流平台的集成方式，包括技术架构、部署方法和最佳实践。_
