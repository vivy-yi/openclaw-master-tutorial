# 会话与记忆系统深度解析

> 从源码层面理解 OpenClaw 的上下文管理和记忆压缩机制

---

## 会话生命周期管理

### 状态机模型

```
┌─────────────────────────────────────────────────────────────────────┐
│                      会话状态机                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌─────────┐     首次消息      ┌─────────┐                       │
│    │  None   │ ────────────────> │ Active  │                       │
│    └─────────┘                   │ 活跃    │                       │
│                                   └────┬────┘                       │
│                                        │                            │
│                    ┌───────────────────┼───────────────────┐        │
│                    │                   │                   │        │
│              空闲超时│            手动关闭│            继续对话│        │
│                    │                   │                   │        │
│                    ▼                   ▼                   │        │
│              ┌─────────┐        ┌─────────┐               │        │
│              │  Idle   │        │  Closed │               │        │
│              │ 空闲    │        │ 已关闭  │               │        │
│              └────┬────┘        └─────────┘               │        │
│                   │                                       │        │
│         恢复对话  │                                       │        │
│                   └───────────────────────────────────────┘        │
│                                                                     │
│  转换条件：                                                         │
│  • None → Active: 收到第一条消息                                    │
│  • Active → Idle: 超过 idleTimeout (默认30分钟)                     │
│  • Idle → Active: 收到新消息                                        │
│  • Active → Closed: 显式关闭或超过 maxAge (默认7天)                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 源码实现分析

```typescript
// 基于 src/config/sessions.ts 的简化实现

interface SessionEntry {
  sessionId: string;
  createdAt: number;
  updatedAt: number;
  lastActivityAt: number;
  messageCount: number;
  totalTokens: number;
  
  // 压缩相关
  compressionHistory: CompressionRecord[];
  originalTokenCount: number;
}

class SessionManager {
  private store: Map<string, SessionEntry>;
  private config: SessionConfig;
  
  constructor(config: SessionConfig) {
    this.config = {
      maxAge: 7 * 24 * 60 * 60 * 1000,      // 7天
      idleTimeout: 30 * 60 * 1000,           // 30分钟
      maxTokens: 8000,                       // 最大Token数
      compressionThreshold: 6000,            // 压缩阈值
      ...config
    };
    this.store = new Map();
    this.startCleanupTimer();
  }
  
  async getOrCreateSession(sessionKey: string): Promise<Session> {
    let entry = this.store.get(sessionKey);
    
    if (!entry) {
      // 创建新会话
      entry = {
        sessionId: generateId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastActivityAt: Date.now(),
        messageCount: 0,
        totalTokens: 0,
        compressionHistory: [],
        originalTokenCount: 0
      };
      this.store.set(sessionKey, entry);
    } else {
      // 更新活动时间
      entry.lastActivityAt = Date.now();
    }
    
    return this.loadSession(entry);
  }
  
  // 自动清理过期会话
  private startCleanupTimer(): void {
    setInterval(() => {
      const now = Date.now();
      
      for (const [key, entry] of this.store.entries()) {
        // 检查最大年龄
        if (now - entry.createdAt > this.config.maxAge) {
          this.store.delete(key);
          continue;
        }
        
        // 检查空闲超时
        if (now - entry.lastActivityAt > this.config.idleTimeout) {
          this.persistToDisk(entry);  // 持久化到磁盘
          this.store.delete(key);      // 从内存移除
        }
      }
    }, 5 * 60 * 1000);  // 每5分钟检查一次
  }
}
```

---

## 记忆存储架构

### 存储层抽象

```typescript
// 存储层接口设计

interface MemoryProvider {
  // 基础 CRUD
  getSession(id: string): Promise<Session>;
  saveSession(session: Session): Promise<void>;
  deleteSession(id: string): Promise<void>;
  
  // 消息操作
  appendMessage(sessionId: string, message: Message): Promise<void>;
  getMessages(sessionId: string, options: QueryOptions): Promise<Message[]>;
  
  // 高级功能
  search(query: string, sessionId?: string): Promise<SearchResult[]>;
  compact(sessionId: string): Promise<void>;
}

interface QueryOptions {
  limit?: number;
  offset?: number;
  since?: number;           // 时间戳过滤
  includeSystem?: boolean;  // 是否包含系统消息
  before?: string;          // 游标分页
}
```

### 三种存储实现对比

```typescript
// 1. 文件存储（默认实现）
class FileMemoryProvider implements MemoryProvider {
  private baseDir: string;
  
  async saveSession(session: Session): Promise<void> {
    const filePath = path.join(this.baseDir, `${session.id}.json`);
    
    // 使用临时文件 + 原子重命名，防止数据损坏
    const tempPath = `${filePath}.tmp`;
    await fs.writeFile(
      tempPath, 
      JSON.stringify(session, null, 2)
    );
    await fs.rename(tempPath, filePath);
  }
  
  async appendMessage(sessionId: string, message: Message): Promise<void> {
    // 追加模式写入，避免全量重写
    const transcriptPath = path.join(this.baseDir, `${sessionId}.transcript`);
    const line = JSON.stringify(message) + '\n';
    await fs.appendFile(transcriptPath, line);
  }
  
  async getMessages(sessionId: string, options: QueryOptions): Promise<Message[]> {
    const transcriptPath = path.join(this.baseDir, `${sessionId}.transcript`);
    
    // 使用流式读取，避免大文件内存问题
    const messages: Message[] = [];
    const stream = createReadStream(transcriptPath, { encoding: 'utf-8' });
    const rl = createInterface({ input: stream });
    
    let skipped = 0;
    for await (const line of rl) {
      if (!line.trim()) continue;
      
      // 支持 offset 分页
      if (skipped < (options.offset || 0)) {
        skipped++;
        continue;
      }
      
      messages.push(JSON.parse(line));
      
      // 达到 limit 时提前结束
      if (options.limit && messages.length >= options.limit) {
        break;
      }
    }
    
    return messages;
  }
}

// 2. Redis 存储（生产环境推荐）
class RedisMemoryProvider implements MemoryProvider {
  private redis: Redis;
  
  async saveSession(session: Session): Promise<void> {
    const key = `session:${session.id}`;
    const pipeline = this.redis.pipeline();
    
    // 使用 Hash 存储会话元数据
    pipeline.hset(key, 'metadata', JSON.stringify({
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }));
    
    // 设置过期时间
    pipeline.expire(key, 7 * 24 * 60 * 60);  // 7天
    
    await pipeline.exec();
  }
  
  async appendMessage(sessionId: string, message: Message): Promise<void> {
    const key = `session:${sessionId}:messages`;
    
    // 使用 List 存储消息，支持 O(1) 追加
    await this.redis.lpush(key, JSON.stringify(message));
    
    // 保持列表长度，防止无限增长
    await this.redis.ltrim(key, 0, 9999);  // 保留最近10000条
  }
  
  async getMessages(sessionId: string, options: QueryOptions): Promise<Message[]> {
    const key = `session:${sessionId}:messages`;
    
    // 使用 LRANGE 获取范围，O(N) N为获取数量
    const start = options.offset || 0;
    const end = options.limit ? start + options.limit - 1 : -1;
    
    const messages = await this.redis.lrange(key, start, end);
    return messages.map(m => JSON.parse(m));
  }
  
  // Redis 特有的搜索功能
  async search(query: string, sessionId?: string): Promise<SearchResult[]> {
    // 使用 RediSearch 模块
    const results = await this.redis.call(
      'FT.SEARCH',
      'messages:index',
      query,
      'LIMIT', 0, 10
    );
    
    return this.parseSearchResults(results);
  }
}

// 3. PostgreSQL 存储（企业级）
class PostgresMemoryProvider implements MemoryProvider {
  private pool: Pool;
  
  async appendMessage(sessionId: string, message: Message): Promise<void> {
    await this.pool.query(
      `INSERT INTO messages (session_id, role, content, created_at, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, message.role, message.content, new Date(), message.metadata]
    );
  }
  
  async getMessages(sessionId: string, options: QueryOptions): Promise<Message[]> {
    const result = await this.pool.query(
      `SELECT * FROM messages 
       WHERE session_id = $1 
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [sessionId, options.limit || 100, options.offset || 0]
    );
    
    return result.rows.map(row => ({
      role: row.role,
      content: row.content,
      timestamp: row.created_at.getTime()
    }));
  }
  
  // 全文搜索
  async search(query: string, sessionId?: string): Promise<SearchResult[]> {
    const result = await this.pool.query(
      `SELECT * FROM messages 
       WHERE to_tsvector('chinese', content) @@ plainto_tsquery('chinese', $1)
       ${sessionId ? 'AND session_id = $2' : ''}
       ORDER BY ts_rank(to_tsvector(content), plainto_tsquery($1)) DESC
       LIMIT 10`,
      sessionId ? [query, sessionId] : [query]
    );
    
    return result.rows;
  }
}
```

### 存储选型决策树

```
选择存储方案的决策流程：

是否需要多实例共享？
├── 否 → 文件存储（简单，零依赖）
└── 是 → 需要持久化？
    ├── 否 → Redis（高速缓存）
    └── 是 → 数据量？
        ├── < 100万条 → Redis + 定期快照
        └── > 100万条 → PostgreSQL（可扩展）

其他考虑因素：
• 是否需要全文搜索？ → PostgreSQL 或 RedisSearch
• 是否需要审计合规？ → PostgreSQL（事务日志）
• 预算限制？ → 文件存储（免费）
```

---

## 上下文压缩算法

### 问题背景

LLM 有 Token 限制（如 GPT-4 8k/32k），但长对话会超过限制：

```
场景：用户与 Agent 进行了 100 轮对话
• 每轮平均 500 tokens
• 总上下文：50,000 tokens
• 超过 GPT-4 8k 限制 6 倍！

需要：智能压缩策略，保留关键信息，丢弃冗余
```

### 压缩策略详解

```typescript
// 基于 src/agents/context.ts 的压缩实现

interface CompressionStrategy {
  name: string;
  compress(messages: Message[], targetTokens: number): Message[];
}

// 策略 1: 滑动窗口（最简单）
class SlidingWindowStrategy implements CompressionStrategy {
  name = 'sliding-window';
  
  compress(messages: Message[], targetTokens: number): Message[] {
    // 始终保留系统消息和最近的对话
    const systemMessages = messages.filter(m => m.role === 'system');
    const conversation = messages.filter(m => m.role !== 'system');
    
    // 从开头丢弃旧消息，直到满足 Token 限制
    let currentTokens = this.estimateTokens(systemMessages);
    const result = [...systemMessages];
    
    // 倒序遍历，优先保留最近的消息
    for (let i = conversation.length - 1; i >= 0; i--) {
      const msg = conversation[i];
      const msgTokens = this.estimateTokens([msg]);
      
      if (currentTokens + msgTokens <= targetTokens) {
        result.unshift(msg);  // 插入开头保持顺序
        currentTokens += msgTokens;
      } else {
        break;
      }
    }
    
    return result;
  }
  
  private estimateTokens(messages: Message[]): number {
    // 简化估算：中文 1 字 ≈ 1 token，英文 1 词 ≈ 1.3 tokens
    return messages.reduce((sum, m) => {
      const charCount = m.content.length;
      return sum + Math.ceil(charCount * 1.2);
    }, 0);
  }
}

// 策略 2: 摘要生成（信息密度高）
class SummaryStrategy implements CompressionStrategy {
  name = 'summary';
  private llm: LLMClient;
  
  async compress(messages: Message[], targetTokens: number): Message[] {
    // 将消息分成 chunks
    const chunks = this.createChunks(messages, 4000);  // 每 chunk 4000 tokens
    
    // 并行生成摘要
    const summaries = await Promise.all(
      chunks.map(chunk => this.summarize(chunk))
    );
    
    // 合并摘要
    return [
      {
        role: 'system',
        content: `Previous conversation summaries:\n${summaries.join('\n')}`
      },
      // 保留最近的几轮完整对话
      ...messages.slice(-4)
    ];
  }
  
  private async summarize(messages: Message[]): Promise<string> {
    const prompt = `
Summarize the following conversation in 3-5 bullet points.
Focus on key decisions, action items, and important context.

${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
    `;
    
    const response = await this.llm.complete({
      prompt,
      maxTokens: 200
    });
    
    return response.text;
  }
}

// 策略 3: 向量检索（语义保留）
class VectorRetrievalStrategy implements CompressionStrategy {
  name = 'vector-retrieval';
  private embedding: EmbeddingClient;
  private vectorStore: VectorStore;
  
  async compress(messages: Message[], targetTokens: number): Promise<Message[]> {
    // 当前查询（最后一条用户消息）
    const query = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    // 为所有消息生成 embedding
    const embeddings = await Promise.all(
      messages.map(async m => ({
        message: m,
        embedding: await this.embedding.embed(m.content)
      }))
    );
    
    // 查询向量
    const queryEmbedding = await this.embedding.embed(query);
    
    // 计算相似度，保留最相关的消息
    const scored = embeddings.map(e => ({
      ...e,
      score: cosineSimilarity(e.embedding, queryEmbedding)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    // 按分数选择消息，直到达到 Token 限制
    const result: Message[] = [];
    let tokens = 0;
    
    for (const item of scored) {
      const msgTokens = this.estimateTokens([item.message]);
      if (tokens + msgTokens <= targetTokens) {
        result.push(item.message);
        tokens += msgTokens;
      }
    }
    
    // 按时间排序恢复
    return result.sort((a, b) => a.timestamp - b.timestamp);
  }
}

// 策略 4: 分层存储（最先进）
class HierarchicalStrategy implements CompressionStrategy {
  name = 'hierarchical';
  
  async compress(messages: Message[], targetTokens: number): Promise<Message[]> {
    // 将对话分层：
    // Level 0: 最近 4 轮（完整保留）
    // Level 1: 之前的对话（摘要）
    // Level 2: 更早的对话（主题标签）
    
    const recent = messages.slice(-4);
    const middle = messages.slice(-20, -4);
    const old = messages.slice(0, -20);
    
    const compressed: Message[] = [
      // 旧对话：主题标签
      {
        role: 'system',
        content: `Topics discussed: ${await this.extractTopics(old)}`
      },
      // 中期对话：摘要
      {
        role: 'system', 
        content: `Previous context: ${await this.summarize(middle)}`
      },
      // 最近对话：完整保留
      ...recent
    ];
    
    return compressed;
  }
  
  private async extractTopics(messages: Message[]): Promise<string> {
    // 使用简单关键词提取或 LLM
    const allText = messages.map(m => m.content).join(' ');
    // ... 主题提取逻辑
    return 'project-setup, api-design, authentication';
  }
}
```

### 压缩策略对比

| 策略 | 压缩率 | 信息保留 | 计算成本 | 适用场景 |
|-----|-------|---------|---------|---------|
| 滑动窗口 | 50% | 低（直接丢弃） | 极低 | 简单对话 |
| 摘要生成 | 80% | 中（语义压缩） | 中（需 LLM） | 长对话 |
| 向量检索 | 70% | 高（语义相关） | 高（需 embedding） | 知识问答 |
| 分层存储 | 75% | 很高 | 中 | 复杂项目 |

---

## 性能优化实战

### 大规模会话处理

```typescript
// 处理 1000+ 并发会话的优化策略

class OptimizedSessionManager {
  // 1. 使用 LRU 缓存热点会话
  private cache = new LRUCache<string, Session>({
    max: 1000,                    // 最多缓存 1000 个会话
    ttl: 1000 * 60 * 5,          // 5 分钟过期
    updateAgeOnGet: true,         // 访问时更新过期时间
    
    // 淘汰时持久化到磁盘
    dispose: (session) => {
      this.persistToDisk(session);
    }
  });
  
  // 2. 批量写入优化
  private writeBuffer = new Map<string, Session>();
  private flushTimer: NodeJS.Timeout;
  
  constructor() {
    // 每 5 秒批量写入磁盘
    this.flushTimer = setInterval(() => this.flush(), 5000);
  }
  
  async saveSession(session: Session): Promise<void> {
    // 更新缓存
    this.cache.set(session.id, session);
    
    // 加入写入缓冲区
    this.writeBuffer.set(session.id, session);
  }
  
  private async flush(): Promise<void> {
    if (this.writeBuffer.size === 0) return;
    
    // 批量写入
    const batch = Array.from(this.writeBuffer.entries());
    this.writeBuffer.clear();
    
    // 使用事务批量写入数据库
    await this.db.transaction(async (trx) => {
      for (const [id, session] of batch) {
        await trx('sessions')
          .insert({ id, data: JSON.stringify(session) })
          .onConflict('id')
          .merge();
      }
    });
  }
  
  // 3. 读写分离
  async getSession(id: string): Promise<Session | null> {
    // 先读缓存
    const cached = this.cache.get(id);
    if (cached) return cached;
    
    // 再读磁盘
    const data = await this.db('sessions').where({ id }).first();
    if (!data) return null;
    
    const session = JSON.parse(data.data);
    this.cache.set(id, session);
    return session;
  }
}
```

### 内存优化

```typescript
// 处理大文件的流式存储

class StreamingSessionStorage {
  // 大消息使用外部存储，内存只保留引用
  async storeLargeMessage(sessionId: string, message: Message): Promise<void> {
    const messageSize = JSON.stringify(message).length;
    
    if (messageSize > 100 * 1024) {  // > 100KB
      // 存储到文件系统
      const filePath = await this.storeToFile(message);
      
      // 内存中只保留元数据
      const metadata: Message = {
        role: message.role,
        content: `[Large content stored at: ${filePath}]`,
        metadata: {
          externalStorage: filePath,
          originalSize: messageSize
        }
      };
      
      await this.appendToTranscript(sessionId, metadata);
    } else {
      // 小消息直接存储
      await this.appendToTranscript(sessionId, message);
    }
  }
  
  // 按需加载大消息
  async loadMessageContent(message: Message): Promise<string> {
    if (message.metadata?.externalStorage) {
      return fs.readFile(message.metadata.externalStorage, 'utf-8');
    }
    return message.content;
  }
}
```

---

## 监控与调试

### 会话健康检查

```typescript
// 会话健康指标

interface SessionHealth {
  sessionId: string;
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    messageCount: number;
    totalTokens: number;
    avgResponseTime: number;
    errorRate: number;
    compressionRatio: number;
  };
  alerts: string[];
}

class SessionHealthMonitor {
  async checkHealth(sessionId: string): Promise<SessionHealth> {
    const session = await this.getSession(sessionId);
    const alerts: string[] = [];
    
    // 检查 Token 数
    if (session.totalTokens > 6000) {
      alerts.push(`Token count high: ${session.totalTokens}`);
    }
    
    // 检查消息数
    if (session.messageCount > 500) {
      alerts.push(`Message count high: ${session.messageCount}`);
    }
    
    // 检查压缩率
    const compressionRatio = session.originalTokenCount / session.totalTokens;
    if (compressionRatio > 2) {
      alerts.push(`High compression ratio: ${compressionRatio.toFixed(1)}x`);
    }
    
    // 确定状态
    let status: SessionHealth['status'] = 'healthy';
    if (alerts.length > 2) status = 'critical';
    else if (alerts.length > 0) status = 'warning';
    
    return {
      sessionId,
      status,
      metrics: {
        messageCount: session.messageCount,
        totalTokens: session.totalTokens,
        avgResponseTime: session.avgResponseTime,
        errorRate: session.errorCount / session.messageCount,
        compressionRatio
      },
      alerts
    };
  }
}
```

---

## 最佳实践

### 会话设计模式

```typescript
// 模式 1: 项目隔离（推荐）
// 每个项目有独立会话，防止上下文污染

const projectSessionKey = `project:${projectId}:agent:default`;
const session = await sessionManager.getOrCreateSession(projectSessionKey);

// 模式 2: 用户隔离
// 多租户场景，每个用户独立会话

const userSessionKey = `user:${userId}:agent:${agentId}`;

// 模式 3: 时间分片
// 每日新会话，避免历史积累

const dailySessionKey = `user:${userId}:${new Date().toISOString().split('T')[0]}`;

// 模式 4: 主题分片
// 不同主题不同会话，精准上下文

const topicSessionKey = `user:${userId}:topic:${topicId}`;
```

---

## ⚠️ v2026.3.24 已知 Bug 对记忆系统的影响

### Bug #55385 — memory_search / memory_get 在 Subagent 中被禁用

**问题**：`memory_search` 和 `memory_get` 被硬编码进 `SUBAGENT_TOOL_DENY_ALWAYS` 黑名单，Subagent 无法调用这两个工具。

**影响范围**：

| 场景 | 是否受影响 |
|------|-----------|
| 主 session（main） | ❌ 不受影响 |
| Subagent isolated session | ✅ 被禁用 |
| Cron isolated session | ✅ 被禁用 |
| ACP 编码 session | ❌ 不受影响 |

**架构影响**：Subagent 无法自主检索长期记忆（MEMORY.md、daily memory），只能依赖主 Agent 注入。

**临时解决方案 — 主 Agent 中转**：

```
┌─────────────────────────────────────────────────────────────────┐
│              Subagent 记忆访问架构（workaround）                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  主 Agent                                                        │
│  1. 先调用 memory_search 检索所需记忆                            │
│  2. 将记忆内容拼接到 task 消息中                                  │
│  3. 通过 sessions_spawn 传给 Subagent                            │
│                                                                  │
│  sessions_spawn 传入：                                           │
│  {                                                              │
│    "task": "基于以下记忆回答：\n[MEMORY_CONTENT]\n\n问题：...",  │
│    "runtime": "subagent",                                        │
│    "mode": "run"                                                 │
│  }                                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**官方修复跟踪**：[Issue #55385](https://github.com/openclaw/openclaw/issues/55385)

### Session Target 选择指南

| Target | 记忆访问 | 上下文共享 | 适用场景 |
|--------|---------|-----------|---------|
| `main` | ✅ 完整访问 | ✅ 与主 Agent 共享 | 需要上下文连续性 |
| `isolated` | ❌ memory_search 被禁用 | ❌ 全新上下文 | Cron 后台任务、独立 Subagent |
| `current` | ✅ 完整访问 | ✅ 当前 session | 与当前对话协作 |

> ⚠️ 如果 Subagent 需要访问记忆，必须使用 `main` session target，或通过主 Agent 中转记忆内容。

### 配置推荐

```json
{
  "session": {
    "provider": "redis",
    "config": {
      "url": "redis://localhost:6379"
    },
    "maxAge": "7d",
    "idleTimeout": "30m",
    "maxTokens": 8000,
    "compression": {
      "enabled": true,
      "threshold": 6000,
      "strategy": "summary"
    }
  }
}
```
