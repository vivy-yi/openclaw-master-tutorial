# Plugin SDK 深度开发指南

> 从架构设计到源码实现，全面掌握 OpenClaw 插件开发

---

## 插件架构原理

### 为什么使用插件化架构？

```
┌─────────────────────────────────────────────────────────────────────┐
│                    OpenClaw 插件化设计决策                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  核心原则: Core 保持精简，功能通过插件扩展                             │
│                                                                     │
│  设计动机:                                                          │
│  1. 模块化                                                           │
│     • 独立开发、测试、部署                                            │
│     • 版本隔离，避免依赖冲突                                          │
│     • 按需加载，减少内存占用                                          │
│                                                                     │
│  2. 生态开放                                                         │
│     • 社区贡献，无需合并到主仓库                                       │
│     • 实验性功能可独立发布                                            │
│     • 商业插件可闭源                                                  │
│                                                                     │
│  3. 安全隔离                                                         │
│     • 插件崩溃不影响 Core                                            │
│     • 沙箱限制插件权限                                                │
│     • 审计插件行为                                                    │
│                                                                     │
│  技术选型对比：                                                       │
│  ┌───────────┬──────────┬──────────┬──────────┐                      │
│  │ 方案       │ 启动速度  │ 隔离级别  │ 调试难度  │                      │
│  ├───────────┼──────────┼──────────┼──────────┤                      │
│  │ 进程       │ 慢(~50ms)│ 高       │ 难       │                      │
│  │ Worker     │ 中(~10ms)│ 中       │ 中       │                      │
│  │ VM2 (选中) │ 快(~1ms) │ 中       │ 易       │                      │
│  └───────────┴──────────┴──────────┴──────────┘                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 插件加载流程

```typescript
// 基于 src/plugins/ 实现简化

class PluginManager {
  private plugins = new Map<string, LoadedPlugin>();
  private hooks = new Map<string, HookCallback[]>();
  
  async load(pluginSpec: string): Promise<LoadedPlugin> {
    // 1. 解析插件标识符
    //    npm:package-name@version
    //    file:./local-path
    //    github:user/repo
    const { source, id, version } = this.parseSpec(pluginSpec);
    
    // 2. 下载/定位插件
    const pluginDir = await this.resolvePlugin(source, id, version);
    
    // 3. 安装依赖
    await this.installDependencies(pluginDir);
    
    // 4. 验证插件结构
    const manifest = await this.loadManifest(pluginDir);
    this.validateManifest(manifest);
    
    // 5. 沙箱中加载代码
    const sandbox = this.createSandbox(pluginDir, manifest.permissions);
    const pluginModule = await sandbox.run(manifest.entry);
    
    // 6. 初始化插件
    const context = this.createPluginContext(id);
    const instance = await pluginModule.default(context);
    
    // 7. 注册钩子
    this.registerHooks(instance, manifest.hooks);
    
    // 8. 保存状态
    const loaded: LoadedPlugin = {
      id,
      version,
      instance,
      sandbox,
      manifest,
      status: 'active'
    };
    this.plugins.set(id, loaded);
    
    return loaded;
  }
  
  // 沙箱创建
  private createSandbox(pluginDir: string, permissions: Permissions): Sandbox {
    return new VM2({
      timeout: 1000,
      sandbox: {
        // 受控的 Node API
        console: this.createPluginLogger(pluginDir),
        require: this.createSafeRequire(pluginDir, permissions),
        
        // OpenClaw SDK
        openclaw: {
          defineTool: this.sdk.defineTool.bind(this.sdk),
          defineChannel: this.sdk.defineChannel.bind(this.sdk),
          defineSkill: this.sdk.defineSkill.bind(this.sdk),
          
          // 事件订阅
          on: (event: string, handler: Function) => {
            this.subscribeHook(pluginDir, event, handler);
          },
          
          // 配置访问
          config: {
            get: (key: string) => this.getPluginConfig(pluginDir, key),
            set: (key: string, value: any) => this.setPluginConfig(pluginDir, key, value)
          },
          
          // 日志
          log: this.createPluginLogger(pluginDir)
        }
      },
      
      // 文件系统限制
      require: {
        external: permissions.externalModules || [],
        root: pluginDir,
        mock: {
          fs: this.createVirtualFs(pluginDir, permissions.fs)
        }
      }
    });
  }
}
```

---

## 开发 Channel 插件

### 完整实现示例

```typescript
// my-channel-plugin/src/index.ts

import { defineChannel } from 'openclaw/plugin-sdk';
import { MyAPIClient } from './api-client';

export default defineChannel({
  // 元数据
  id: 'myplatform',
  name: 'My Platform',
  version: '1.0.0',
  
  // 声明平台能力
  capabilities: {
    media: {
      images: true,
      videos: true,
      maxFileSize: 50 * 1024 * 1024  // 50MB
    },
    threads: true,
    reactions: true,
    voice: false,
    presence: true
  },
  
  // 配置 Schema（用于 UI 生成配置表单）
  configSchema: {
    type: 'object',
    properties: {
      apiKey: {
        type: 'string',
        description: 'API Key from My Platform Developer Console',
        secret: true  // 标记为敏感，使用密码输入框
      },
      webhookSecret: {
        type: 'string',
        description: 'Webhook secret for signature verification',
        secret: true
      },
      pollingInterval: {
        type: 'number',
        default: 5000,
        minimum: 1000,
        description: 'Message polling interval in ms'
      }
    },
    required: ['apiKey']
  },
  
  // 初始化
  async initialize(config, context) {
    // 创建 API 客户端
    const client = new MyAPIClient({
      apiKey: config.apiKey,
      baseURL: 'https://api.myplatform.com/v1'
    });
    
    // 验证连接
    try {
      await client.verifyConnection();
    } catch (error) {
      throw new Error(`Failed to connect to My Platform: ${error.message}`);
    }
    
    // 设置 Webhook（如果有）
    if (config.webhookSecret) {
      const webhookUrl = await context.getWebhookUrl();
      await client.setWebhook(webhookUrl);
    }
    
    context.log.info('Connected to My Platform');
    
    return {
      client,
      config,
      pollingInterval: config.pollingInterval || 5000
    };
  },
  
  // 消息接收
  async subscribe(state, emitter) {
    const { client, config, pollingInterval } = state;
    
    // 方式 1: Webhook（推荐，如果有）
    if (config.webhookSecret) {
      emitter.onWebhook(async (request) => {
        // 验证签名
        const signature = request.headers['x-signature'];
        const valid = verifySignature(request.body, signature, config.webhookSecret);
        if (!valid) {
          throw new Error('Invalid webhook signature');
        }
        
        // 转换为标准消息格式
        const message = this.parseWebhookPayload(request.body);
        emitter.emit('message', message);
      });
    }
    
    // 方式 2: 轮询（兜底方案）
    const poll = async () => {
      try {
        const messages = await client.getMessages({ limit: 100 });
        for (const msg of messages) {
          emitter.emit('message', this.toStandardFormat(msg));
        }
      } catch (error) {
        emitter.log.error('Polling error:', error);
      }
      
      // 安排下一次轮询
      setTimeout(poll, pollingInterval);
    };
    
    // 启动轮询
    poll();
    
    // 返回清理函数
    return async () => {
      // 清理资源
      await client.disconnect();
    };
  },
  
  // 消息发送
  async send(state, message) {
    const { client } = state;
    
    // 支持的消息类型
    switch (message.type) {
      case 'text':
        return await client.sendText({
          chatId: message.chatId,
          text: message.text,
          replyTo: message.replyTo
        });
        
      case 'image':
        return await client.sendMedia({
          chatId: message.chatId,
          type: 'image',
          url: message.mediaUrl,
          caption: message.text
        });
        
      case 'typing':
        // 发送"正在输入"状态
        await client.sendTypingIndicator(message.chatId);
        break;
        
      default:
        throw new Error(`Unsupported message type: ${message.type}`);
    }
  },
  
  // 健康检查
  async healthCheck(state) {
    const { client } = state;
    try {
      await client.ping();
      return { healthy: true };
    } catch (error) {
      return { 
        healthy: false, 
        error: error.message 
      };
    }
  },
  
  // 辅助方法
  toStandardFormat(msg: PlatformMessage): ChannelMessage {
    return {
      id: msg.id,
      type: this.mapMessageType(msg.type),
      text: msg.content?.text,
      mediaUrl: msg.content?.media?.url,
      sender: {
        id: msg.sender.id,
        name: msg.sender.name,
        username: msg.sender.username
      },
      chat: {
        id: msg.chat.id,
        type: msg.chat.type,  // 'private' | 'group' | 'channel'
        title: msg.chat.title
      },
      timestamp: new Date(msg.createdAt).getTime(),
      replyTo: msg.replyTo?.id
    };
  },
  
  mapMessageType(type: string): MessageType {
    const mapping: Record<string, MessageType> = {
      'text': 'text',
      'image': 'image',
      'video': 'video',
      'file': 'file',
      'voice': 'voice'
    };
    return mapping[type] || 'unknown';
  }
});

// 辅助函数
function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

---

## 开发 Tool 插件

### 带 UI 的复杂工具

```typescript
// data-visualization-tool/src/index.ts

import { defineTool } from 'openclaw/plugin-sdk';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';

export default defineTool({
  id: 'data.visualize',
  name: 'Data Visualization',
  description: 'Create charts and graphs from data',
  
  // 参数定义
  parameters: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { type: 'object' },
        description: 'Array of data objects'
      },
      chartType: {
        type: 'string',
        enum: ['bar', 'line', 'pie', 'scatter', 'heatmap'],
        description: 'Type of chart to create'
      },
      xField: {
        type: 'string',
        description: 'Field to use for X axis'
      },
      yField: {
        type: 'string',
        description: 'Field to use for Y axis'
      },
      title: {
        type: 'string',
        description: 'Chart title'
      }
    },
    required: ['data', 'chartType', 'xField', 'yField']
  },
  
  // 返回类型定义（用于 LLM 理解）
  returns: {
    type: 'object',
    properties: {
      imageUrl: { type: 'string' },
      description: { type: 'string' },
      insights: { type: 'array', items: { type: 'string' } }
    }
  },
  
  // 执行实现
  async execute(args, context) {
    const { data, chartType, xField, yField, title } = args;
    
    // 1. 数据验证和清理
    const cleanData = data.filter(row => 
      row[xField] != null && row[yField] != null
    );
    
    if (cleanData.length === 0) {
      throw new Error('No valid data points after filtering');
    }
    
    // 2. 生成 Vega-Lite 规范
    const spec = this.generateVegaLiteSpec({
      data: cleanData,
      chartType,
      xField,
      yField,
      title
    });
    
    // 3. 编译为 Vega
    const vegaSpec = vegaLite.compile(spec).spec;
    
    // 4. 渲染为 SVG
    const view = new vega.View(vega.parse(vegaSpec), { renderer: 'svg' });
    const svg = await view.toSVG();
    
    // 5. 转换为 PNG（使用 Canvas）
    const pngBuffer = await this.svgToPng(svg, { width: 800 });
    
    // 6. 保存到临时文件
    const tempPath = context.temp.file('chart.png');
    await context.fs.writeFile(tempPath, pngBuffer);
    
    // 7. 获取可访问 URL
    const imageUrl = await context.media.publish(tempPath, {
      mimeType: 'image/png',
      maxAge: 3600  // 1小时过期
    });
    
    // 8. 生成数据洞察
    const insights = this.generateInsights(cleanData, xField, yField);
    
    return {
      imageUrl,
      description: `Generated ${chartType} chart showing ${yField} by ${xField}`,
      insights
    };
  },
  
  // 生成 Vega-Lite 规范
  generateVegaLiteSpec(params) {
    const { data, chartType, xField, yField, title } = params;
    
    const baseSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      title,
      data: { values: data },
      mark: chartType,
      encoding: {
        x: { field: xField, type: this.inferType(data, xField) },
        y: { field: yField, type: this.inferType(data, yField) }
      }
    };
    
    // 根据图表类型添加特定配置
    switch (chartType) {
      case 'bar':
        return { ...baseSpec, mark: { type: 'bar', tooltip: true } };
      case 'line':
        return { 
          ...baseSpec, 
          mark: { type: 'line', point: true, tooltip: true } 
        };
      case 'pie':
        return {
          ...baseSpec,
          mark: 'arc',
          encoding: {
            ...baseSpec.encoding,
            theta: { field: yField, type: 'quantitative' },
            color: { field: xField, type: 'nominal' }
          }
        };
      default:
        return baseSpec;
    }
  },
  
  // 推断字段类型
  inferType(data: any[], field: string): string {
    const value = data[0]?.[field];
    if (typeof value === 'number') return 'quantitative';
    if (!isNaN(Date.parse(value))) return 'temporal';
    return 'nominal';
  },
  
  // 生成数据洞察
  generateInsights(data: any[], xField: string, yField: string): string[] {
    const insights: string[] = [];
    
    // 计算基础统计
    const values = data.map(d => d[yField]).filter(v => typeof v === 'number');
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    insights.push(`Total: ${sum.toFixed(2)}`);
    insights.push(`Average: ${avg.toFixed(2)}`);
    insights.push(`Range: ${min.toFixed(2)} - ${max.toFixed(2)}`);
    
    // 趋势分析（如果是时间序列）
    if (data.length > 1) {
      const first = values[0];
      const last = values[values.length - 1];
      const change = ((last - first) / first) * 100;
      insights.push(`Overall change: ${change > 0 ? '+' : ''}${change.toFixed(1)}%`);
    }
    
    return insights;
  }
});
```

---

## 插件测试

### 单元测试

```typescript
// __tests__/channel.test.ts

import { createMockContext, createMockEmitter } from 'openclaw/test-utils';
import myChannel from '../src/index';

describe('MyChannel', () => {
  let context: MockContext;
  let emitter: MockEmitter;
  let state: any;
  
  beforeEach(async () => {
    context = createMockContext();
    emitter = createMockEmitter();
    
    state = await myChannel.initialize({
      apiKey: 'test-key'
    }, context);
  });
  
  afterEach(async () => {
    await myChannel.cleanup?.(state);
  });
  
  test('should convert message format correctly', () => {
    const platformMsg = {
      id: '123',
      type: 'text',
      content: { text: 'Hello' },
      sender: { id: 'user1', name: 'Alice' },
      chat: { id: 'chat1', type: 'private' },
      createdAt: '2024-01-01T00:00:00Z'
    };
    
    const standard = myChannel.toStandardFormat(platformMsg);
    
    expect(standard).toMatchObject({
      id: '123',
      type: 'text',
      text: 'Hello',
      sender: { id: 'user1', name: 'Alice' },
      chat: { id: 'chat1', type: 'private' }
    });
  });
  
  test('should handle webhook signature verification', async () => {
    const request = {
      headers: { 'x-signature': 'invalid' },
      body: '{}'
    };
    
    emitter.onWebhook(async (req) => {
      expect(() => verifySignature(req.body, req.headers['x-signature'], 'secret'))
        .toThrow('Invalid signature');
    });
    
    await myChannel.subscribe(state, emitter);
  });
});
```

### 集成测试

```typescript
// __tests__/integration.test.ts

import { createTestGateway } from 'openclaw/test-utils';

describe('MyChannel Integration', () => {
  let gateway: TestGateway;
  
  beforeAll(async () => {
    gateway = await createTestGateway({
      plugins: ['file:./']
    });
  });
  
  afterAll(async () => {
    await gateway.stop();
  });
  
  test('should receive and respond to messages', async () => {
    // 模拟发送消息
    const response = await gateway.injectMessage({
      channel: 'myplatform',
      text: 'Hello bot'
    });
    
    expect(response).toBeDefined();
    expect(response.text).toContain('Hello');
  });
});
```

---

## 插件发布

### 发布到 npm

```bash
# 1. 构建
npm run build

# 2. 测试
npm test

# 3. 版本 bump
npm version patch  # or minor/major

# 4. 发布
npm publish
```

### 提交到 OpenClaw 社区

1. Fork https://github.com/openclaw/awesome-openclaw-plugins
2. 添加插件信息到 `plugins.json`
3. 提交 PR

```json
{
  "name": "my-plugin",
  "description": "Short description",
  "author": "Your Name",
  "npm": "openclaw-plugin-myplugin",
  "github": "yourname/openclaw-plugin-myplugin",
  "categories": ["channel", "tool"],
  "verified": false
}
```

---

## 性能优化

### 启动优化

```typescript
// 延迟加载重型依赖
let heavyModule: any;

export default defineTool({
  async execute(args) {
    // 只在需要时加载
    if (!heavyModule) {
      heavyModule = await import('heavy-dependency');
    }
    
    return heavyModule.process(args);
  }
});
```

### 缓存策略

```typescript
import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5  // 5 分钟
});

export default defineTool({
  async execute(args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = await expensiveOperation(args);
    cache.set(key, result);
    
    return result;
  }
});
```
