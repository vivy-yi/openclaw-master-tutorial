# Plugin 插件开发详解

> 本章介绍 OpenClaw Plugin 插件开发，包括插件架构、API 接口、开发流程、实战案例等。

---

## 1. Plugin 概述

### 1.1 什么是 Plugin

Plugin 是 OpenClaw 的扩展模块，用于添加自定义功能：

| 类型 | 说明 | 示例 |
|------|------|------|
| **Channel Plugin** | 消息渠道 | Telegram、飞书 |
| **Tool Plugin** | 工具扩展 | 浏览器控制、文件处理 |
| **AI Plugin** | AI 模型 | 各大模型提供商 |
| **Storage Plugin** | 存储后端 | Redis、数据库 |

### 1.2 Plugin vs Skills

| | Plugin | Skill |
|---|---|---|
| **开发语言** | TypeScript/JavaScript | Markdown + 脚本 |
| **执行位置** | OpenClaw 核心 | Agent 运行时 |
| **权限级别** | 高（核心级） | 受限 |
| **性能** | 最优 | 一般 |
| **适用场景** | 核心功能扩展 | 业务逻辑封装 |

---

## 2. 插件架构

### 2.1 整体架构

```
┌─────────────────────────────────────────┐
│              OpenClaw Core              │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Plugin A │  │Plugin B │  │Plugin C │ │
│  └────┬────┘  └────┬────┘  └────┬────┘ │
│       │             │             │      │
├───────┴─────────────┴─────────────┴──────┤
│              Plugin API                  │
└─────────────────────────────────────────┘
```

### 2.2 插件目录结构

```
~/.openclaw/plugins/my-plugin/
├── package.json           # NPM 包配置
├── tsconfig.json          # TypeScript 配置
├── src/
│   ├── index.ts           # 入口文件
│   ├── plugin.ts          # 插件主类
│   ├── tools/             # 工具模块
│   ├── handlers/          # 事件处理
│   └── utils/             # 工具函数
├── dist/                  # 编译输出
└── README.md              # 插件说明
```

---

## 3. 快速开始

### 3.1 创建插件项目

```bash
# 1. 初始化项目
mkdir my-plugin && cd my-plugin
npm init -y

# 2. 安装依赖
npm install openclaw-plugin-sdk typescript @types/node

# 3. 创建 TypeScript 配置
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"]
}
EOF
```

### 3.2 编写插件主类

```typescript
// src/index.ts
import { Plugin, PluginContext, ToolDefinition } from 'openclaw-plugin-sdk';

export default class MyPlugin extends Plugin {
  name = 'my-plugin';
  version = '1.0.0';

  constructor() {
    super();
    
    // 注册工具
    this.tools = this.defineTools();
    
    // 注册事件处理
    this.handlers = this.defineHandlers();
  }

  // 定义插件提供的工具
  private defineTools(): ToolDefinition[] {
    return [
      {
        name: 'my_tool',
        description: '我的自定义工具',
        schema: {
          type: 'object',
          properties: {
            input: { type: 'string' }
          },
          required: ['input']
        },
        handler: this.myToolHandler.bind(this)
      }
    ];
  }

  // 工具处理函数
  private async myToolHandler(args: { input: string }) {
    return {
      success: true,
      result: `处理了: ${args.input}`
    };
  }

  // 定义事件处理
  private defineHandlers() {
    return {
      'message:received': this.onMessageReceived.bind(this),
      'agent:spawned': this.onAgentSpawned.bind(this)
    };
  }

  // 消息接收处理
  private async onMessageReceived(event: any) {
    console.log('收到消息:', event.content);
  }

  // Agent 启动处理
  private async onAgentSpawned(event: any) {
    console.log('Agent 启动:', event.agentId);
  }
}
```

### 3.3 编译和安装

```bash
# 编译
npm run build

# 安装插件
openclaw plugin install ./dist
# 或复制到插件目录
cp -r dist ~/.openclaw/plugins/my-plugin/
```

---

## 4. 插件配置

### 4.1 配置项定义

```typescript
// src/config.ts
export interface MyPluginConfig {
  apiKey: string;
  endpoint: string;
  timeout: number;
  retries: number;
}

export const defaultConfig: Partial<MyPluginConfig> = {
  endpoint: 'https://api.example.com',
  timeout: 30000,
  retries: 3
};
```

### 4.2 配置验证

```typescript
// src/validator.ts
import { z } from 'zod';

export const configSchema = z.object({
  apiKey: z.string().min(1, 'API Key 不能为空'),
  endpoint: z.string().url().optional(),
  timeout: z.number().min(1000).max(60000).optional(),
  retries: z.number().min(0).max(5).optional()
});
```

### 4.3 OpenClaw 配置

```json
{
  "plugins": {
    "entries": {
      "my-plugin": {
        "enabled": true,
        "config": {
          "apiKey": "your-api-key",
          "endpoint": "https://api.example.com",
          "timeout": 30000
        }
      }
    }
  }
}
```

---

## 5. 工具开发

### 5.1 基础工具

```typescript
// src/tools/basic.ts
import { ToolHandler, ToolResult } from 'openclaw-plugin-sdk';

export const helloWorldTool: ToolHandler = async (args, context) => {
  const { name = 'World' } = args;
  
  return {
    success: true,
    output: `Hello, ${name}!`
  };
};
```

### 5.2 带状态的工具

```typescript
// src/tools/counter.ts
class CounterTool {
  private count = 0;

  readonly definition = {
    name: 'counter',
    description: '计数器工具',
    schema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['increment', 'decrement', 'reset', 'get']
        },
        value: { type: 'number' }
      }
    }
  };

  async handler(args: { action: string; value?: number }) {
    switch (args.action) {
      case 'increment':
        this.count += args.value || 1;
        return { success: true, count: this.count };
      case 'decrement':
        this.count -= args.value || 1;
        return { success: true, count: this.count };
      case 'reset':
        this.count = 0;
        return { success: true, count: this.count };
      case 'get':
        return { success: true, count: this.count };
    }
  }
}
```

### 5.3 异步工具

```typescript
// src/tools/fetcher.ts
import { ToolHandler } from 'openclaw-plugin-sdk';

export const fetchUrlTool: ToolHandler = async (args, context) => {
  const { url, method = 'GET', headers = {} } = args;
  
  try {
    const response = await fetch(url, {
      method,
      headers,
      signal: AbortSignal.timeout(30000)
    });
    
    const data = await response.text();
    
    return {
      success: true,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

---

## 6. 事件系统

### 6.1 事件类型

| 事件 | 说明 | 触发时机 |
|------|------|---------|
| `message:received` | 收到消息 | 新消息到达 |
| `message:sent` | 消息发送 | 消息发出后 |
| `agent:spawned` | Agent 启动 | 新 Agent 创建 |
| `agent:terminated` | Agent 结束 | Agent 销毁 |
| `tool:call` | 工具调用 | 工具执行前 |
| `tool:result` | 工具结果 | 工具执行后 |
| `cron:run` | Cron 执行 | 定时任务触发 |
| `error` | 错误 | 发生错误时 |

### 6.2 事件处理

```typescript
// src/handlers/index.ts
export function registerHandlers(plugin: MyPlugin) {
  // 消息处理
  plugin.on('message:received', async (event, context) => {
    console.log('收到消息:', event.content);
    
    // 可以修改消息内容
    return {
      ...event,
      processed: true
    };
  });
  
  // 工具调用拦截
  plugin.on('tool:call', async (event, context) => {
    console.log('工具调用:', event.tool);
    
    // 记录日志
    await logToolCall(event);
    
    return event; // 继续执行
  });
  
  // 错误处理
  plugin.on('error', async (error, context) => {
    console.error('插件错误:', error);
    
    // 发送告警
    await sendAlert(error);
  });
}
```

### 6.3 事件过滤

```typescript
// 只处理特定渠道的消息
plugin.on('message:received', 
  { channel: 'telegram' },
  async (event, context) => {
    // 处理 Telegram 消息
  }
);

// 只处理特定 Agent
plugin.on('agent:spawned',
  { agentId: 'mo-finance' },
  async (event, context) => {
    // 处理金融 Agent
  }
);
```

---

## 7. 生命周期

### 7.1 钩子方法

```typescript
// src/plugin.ts
export default class MyPlugin extends Plugin {
  // 插件启动时调用
  async onLoad(config: PluginConfig) {
    console.log('插件加载:', this.name);
    
    // 初始化资源
    await this.initialize();
    
    // 连接数据库
    await this.connectDB();
  }

  // 插件卸载时调用
  async onUnload() {
    console.log('插件卸载:', this.name);
    
    // 清理资源
    await this.cleanup();
    
    // 关闭连接
    await this.disconnectDB();
  }

  // Gateway 启动时调用
  async onGatewayStart() {
    console.log('Gateway 启动');
  }

  // Gateway 关闭时调用
  async onGatewayStop() {
    console.log('Gateway 关闭');
  }
}
```

### 7.2 健康检查

```typescript
export default class MyPlugin extends Plugin {
  async healthCheck(): Promise<HealthStatus> {
    try {
      // 检查数据库连接
      await this.db.ping();
      
      // 检查外部 API
      const response = await fetch(this.config.endpoint + '/health');
      
      return {
        status: 'healthy',
        details: {
          db: 'connected',
          api: 'reachable'
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}
```

---

## 8. 实战案例

### 8.1 案例：天气插件

```typescript
// src/plugins/weather/index.ts
import { Plugin } from 'openclaw-plugin-sdk';
import { weatherApi } from './api';
import { formatWeatherResponse } from './formatter';

export default class WeatherPlugin extends Plugin {
  name = 'weather';
  version = '1.0.0';

  constructor() {
    super();
    this.tools = [
      {
        name: 'get_weather',
        description: '获取指定城市的天气信息',
        schema: {
          type: 'object',
          properties: {
            city: { type: 'string', description: '城市名称' },
            days: { type: 'number', description: '预报天数', default: 1 }
          },
          required: ['city']
        },
        handler: this.getWeather.bind(this)
      }
    ];
  }

  async getWeather(args: { city: string; days?: number }) {
    try {
      const data = await weatherApi.getWeather(args.city, args.days || 1);
      const response = formatWeatherResponse(data);
      
      return {
        success: true,
        output: response
      };
    } catch (error) {
      return {
        success: false,
        error: `获取天气失败: ${error.message}`
      };
    }
  }
}
```

### 8.2 案例：数据库插件

```typescript
// src/plugins/database/index.ts
import { Plugin, ToolHandler } from 'openclaw-plugin-sdk';
import { createClient, SqlClient } from './client';

export default class DatabasePlugin extends Plugin {
  private db: SqlClient;

  constructor() {
    super();
    this.db = createClient({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    this.tools = this.defineTools();
  }

  private defineTools(): ToolDefinition[] {
    return [
      {
        name: 'db_query',
        description: '执行 SQL 查询',
        schema: {
          type: 'object',
          properties: {
            sql: { type: 'string' },
            params: { type: 'array' }
          },
          required: ['sql']
        },
        handler: this.query.bind(this)
      },
      {
        name: 'db_execute',
        description: '执行 SQL 更新',
        schema: {
          type: 'object',
          properties: {
            sql: { type: 'string' },
            params: { type: 'array' }
          },
          required: ['sql']
        },
        handler: this.execute.bind(this)
      }
    ];
  }

  private query: ToolHandler = async (args) => {
    const { sql, params = [] } = args;
    const results = await this.db.query(sql, params);
    return { success: true, rows: results };
  };

  private execute: ToolHandler = async (args) => {
    const { sql, params = [] } = args;
    const result = await this.db.execute(sql, params);
    return { success: true, affectedRows: result.affectedRows };
  };

  async onLoad() {
    await this.db.connect();
  }

  async onUnload() {
    await this.db.disconnect();
  }
}
```

### 8.3 案例：WebSocket 实时通信插件

```typescript
// src/plugins/realtime/index.ts
import { Plugin } from 'openclaw-plugin-sdk';
import WebSocket from 'ws';

export default class RealtimePlugin extends Plugin {
  private wss: WebSocket.Server;
  private clients: Set<WebSocket> = new Set();

  constructor() {
    super();
    
    this.wss = new WebSocket.Server({ port: 8080 });
    this.wss.on('connection', this.handleConnection.bind(this));
    
    // 注册内部事件
    this.on('message:sent', this.broadcastMessage.bind(this));
  }

  private handleConnection(ws: WebSocket) {
    this.clients.add(ws);
    console.log('新客户端连接');
    
    ws.on('close', () => {
      this.clients.delete(ws);
    });
    
    ws.on('message', (data) => {
      this.handleClientMessage(data);
    });
  }

  private handleClientMessage(data: any) {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'ping':
          this.sendToClient(message.client, { type: 'pong' });
          break;
        case 'subscribe':
          this.subscribeToChannel(message.channel);
          break;
      }
    } catch (error) {
      console.error('消息解析失败:', error);
    }
  }

  private broadcastMessage(event: any) {
    const payload = JSON.stringify({
      type: 'message',
      channel: event.channel,
      content: event.content
    });
    
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  async onUnload() {
    this.wss.close();
  }
}
```

---

## 9. 测试

### 9.1 单元测试

```typescript
// src/__tests__/tools.test.ts
import { helloWorldTool } from '../tools/basic';

describe('helloWorldTool', () => {
  it('应该返回默认问候', async () => {
    const result = await helloWorldTool({}, {} as any);
    expect(result.success).toBe(true);
    expect(result.output).toContain('Hello, World!');
  });

  it('应该使用提供的名字', async () => {
    const result = await helloWorldTool(
      { name: 'Alice' },
      {} as any
    );
    expect(result.output).toContain('Hello, Alice!');
  });
});
```

### 9.2 集成测试

```typescript
// src/__tests__/integration.test.ts
import { createTestPlugin, TestContext } from 'openclaw-plugin-sdk';

describe('插件集成测试', () => {
  let plugin: MyPlugin;
  let context: TestContext;

  beforeEach(async () => {
    plugin = new MyPlugin();
    context = await createTestContext(plugin);
    await plugin.onLoad({});
  });

  afterEach(async () => {
    await plugin.onUnload();
  });

  it('工具应该正常工作', async () => {
    const result = await context.callTool('my_tool', {
      input: 'test'
    });
    expect(result.success).toBe(true);
  });
});
```

### 9.3 运行测试

```bash
# 运行测试
npm test

# 带覆盖率
npm test -- --coverage

# 监听模式
npm test -- --watch
```

---

## 10. 发布与分发

### 10.1 package.json 配置

```json
{
  "name": "openclaw-plugin-weather",
  "version": "1.0.0",
  "description": "天气查询插件",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "publish": "npm publish"
  },
  "keywords": [
    "openclaw",
    "openclaw-plugin",
    "weather"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "openclaw-plugin-sdk": ">=1.0.0"
  }
}
```

### 10.2 发布到 npm

```bash
# 1. 登录 npm
npm login

# 2. 发布
npm publish

# 3. 打标签
git tag v1.0.0
git push origin v1.0.0
```

### 10.3 社区分享

```markdown
# openclaw-plugin-weather

天气查询插件，支持全球城市天气预报。

## 安装

\`\`\`bash
openclaw plugin install openclaw-plugin-weather
\`\`\`

## 使用

\`\`\`
帮我查一下北京的天气
\`\`\`

## 配置

需要免费 API Key：[OpenWeatherMap](https://openweathermap.org/api)

\`\`\`json
{
  "plugins": {
    "entries": {
      "weather": {
        "config": {
          "apiKey": "your-api-key"
        }
      }
    }
  }
}
\`\`\`
```

---

## 11. 调试技巧

### 11.1 开发模式

```bash
# 启用调试日志
DEBUG=openclaw:plugin:* npm run dev

# 监视模式重载
npm run dev -- --watch
```

### 11.2 日志查看

```bash
# 查看插件日志
openclaw gateway logs --filter plugin

# 实时跟踪
openclaw gateway logs -f | grep my-plugin
```

### 11.3 常见问题

| 问题 | 解决方案 |
|------|---------|
| 插件不加载 | 检查 `npm install` 和依赖 |
| 工具不可用 | 检查 schema 和 handler |
| 事件不触发 | 检查事件名称和过滤器 |
| 内存泄漏 | 记得在 `onUnload` 清理 |

---

_本章介绍了 OpenClaw Plugin 插件开发的完整流程，包括架构设计、工具开发、事件系统、测试部署等。_
