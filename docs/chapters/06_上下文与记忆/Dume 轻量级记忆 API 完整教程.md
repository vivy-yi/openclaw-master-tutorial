# Dume 轻量级记忆 API 完整教程

> 专为开发者设计的轻量级 AI 记忆 API，快速集成，聚焦核心功能

**整理时间**: 2026-05-02
**适用场景**: 快速原型、个人项目、简单记忆需求

---

## 1. 产品概述

### 1.1 核心定位

**标语**: "Lightweight memory API for developers"

Dume 是一个极简主义的 AI 记忆 API，专为需要快速集成记忆功能但不需要复杂企业级特性的开发者设计。相比完整的记忆系统，Dume 专注于提供简单、直观的 API，让开发者能够在几分钟内为应用添加记忆能力。

### 1.2 设计理念

```
Dume vs 其他记忆系统:

其他系统:
├── 复杂配置
├── 企业级功能
├── 完整但庞大
└── 适合生产环境

Dume:
├── 简单 API
├── 核心功能
├── 轻量但够用
└── 适合原型和小型项目
```

### 1.3 与竞品对比

| 特性 | Dume | Mem0 | Zep | MemoryLake |
|------|------|------|-----|------------|
| **复杂度** | 低 | 中 | 高 | 高 |
| **API 设计** | 极简 | 丰富 | 完整 | 完整 |
| **记忆类型** | 无类型 | User/Session/Agent | 时序图谱 | 6种类型 |
| **版本控制** | ❌ | ❌ | ✅ | ✅ |
| **冲突处理** | ❌ | ❌ | ❌ | ✅ |
| **企业合规** | ❌ | SOC2 | SOC2 | 全合规 |
| **最适合** | 原型/小型 | 中型项目 | 企业级 | 跨平台 |

### 1.4 适用场景

- ✅ **快速原型**: 需要在 5 分钟内添加记忆功能
- ✅ **个人项目**: 小规模、简单记忆需求
- ✅ **学习研究**: 理解记忆系统工作原理
- ✅ **MVP 验证**: 验证记忆功能价值
- ❌ 企业级应用（考虑 Mem0 或 MemoryLake）
- ❌ 跨平台记忆（考虑 MemoryLake）
- ❌ 时序推理需求（考虑 Zep）

---

## 2. 核心概念

### 2.1 设计原则

Dume 的设计遵循极简原则：

| 原则 | 说明 |
|------|------|
| **简单优于完整** | 只提供核心功能，不做过度设计 |
| **API 优先** | 所有功能通过简单 API 访问 |
| **开发者友好** | 直观、一致、易于理解 |
| **快速集成** | 几分钟内完成集成 |

### 2.2 核心资源

```
Dume 核心资源:

1. User (用户)
   └── 用户身份和偏好

2. Memory (记忆)
   └── 具体的事实和知识

3. Session (会话)
   └── 对话上下文
```

### 2.3 与传统系统的区别

```
传统完整记忆系统:
├── 记忆类型定义
├── 版本控制
├── 冲突检测
├── 来源追踪
├── 多模态支持
└── ... (复杂)

Dume:
├── 添加记忆 (简单)
├── 获取记忆 (简单)
├── 搜索记忆 (简单)
└── 删除记忆 (简单)
```

---

## 3. API 使用详解

### 3.1 安装

```bash
# Node.js
npm install dume-js

# Python
pip install dume-python
```

### 3.2 初始化客户端

```javascript
// Node.js
import { DumeClient } from 'dume-js';

const dume = new DumeClient({
  apiKey: 'your-api-key',
  // 可选: 自定义 API 地址
  baseUrl: 'https://api.dume.ai'
});
```

```python
# Python
from dume import DumeClient

dume = DumeClient(api_key='your-api-key')
```

### 3.3 添加记忆

```javascript
// 基本添加
await dume.memory.add({
  userId: 'user-123',
  content: '用户偏好川菜，重辣',
  // 可选: 元数据
  metadata: {
    source: 'conversation',
    timestamp: new Date().toISOString()
  }
});

// 批量添加
await dume.memory.addBatch([
  { userId: 'user-123', content: '居住在上海' },
  { userId: 'user-123', content: '喜欢科幻电影' },
  { userId: 'user-123', content: '常用外卖平台是美团' }
]);
```

```python
# Python
dume.memory.add(
    user_id='user-123',
    content='用户偏好川菜，重辣'
)

# 批量添加
dume.memory.add_batch([
    {'user_id': 'user-123', 'content': '居住在上海'},
    {'user_id': 'user-123', 'content': '喜欢科幻电影'}
])
```

### 3.4 获取记忆

```javascript
// 获取用户所有记忆
const memories = await dume.memory.get({
  userId: 'user-123'
});

// 获取特定记忆
const memory = await dume.memory.getById({
  memoryId: 'mem-456'
});
```

```python
# 获取用户所有记忆
memories = dume.memory.get(user_id='user-123')

# 获取特定记忆
memory = dume.memory.get_by_id(memory_id='mem-456')
```

### 3.5 搜索记忆

```javascript
// 语义搜索
const results = await dume.memory.search({
  userId: 'user-123',
  query: '用户的饮食偏好是什么？',
  limit: 5
});

// 关键词搜索
const keywordResults = await dume.memory.search({
  userId: 'user-123',
  query: '上海',
  mode: 'keyword',
  limit: 10
});
```

```python
# 语义搜索
results = dume.memory.search(
    user_id='user-123',
    query='用户的饮食偏好是什么？',
    limit=5
)

# 处理结果
for result in results:
    print(f"记忆: {result['content']}")
    print(f"相关性: {result['score']}")
```

### 3.6 更新记忆

```javascript
// 更新记忆内容
await dume.memory.update({
  memoryId: 'mem-456',
  content: '用户偏好中辣，不是重辣'
});
```

```python
# 更新
dume.memory.update(
    memory_id='mem-456',
    content='用户偏好中辣，不是重辣'
)
```

### 3.7 删除记忆

```javascript
// 删除单个记忆
await dume.memory.delete({
  memoryId: 'mem-456'
});

// 清空用户所有记忆
await dume.memory.clear({
  userId: 'user-123'
});
```

```python
# 删除
dume.memory.delete(memory_id='mem-456')

# 清空
dume.memory.clear(user_id='user-123')
```

---

## 4. 会话管理

### 4.1 创建会话

```javascript
// 创建新会话
const session = await dume.session.create({
  userId: 'user-123',
  // 可选: 会话元数据
  metadata: {
    channel: 'website',
    topic: '订餐咨询'
  }
});

console.log(session.id); // 'sess-789'
```

### 4.2 添加会话消息

```javascript
// 添加用户消息
await dume.session.addMessage({
  sessionId: 'sess-789',
  role: 'user',
  content: '我想点一份麻辣烫'
});

// 添加助手回复
await dume.session.addMessage({
  sessionId: 'sess-789',
  role: 'assistant',
  content: '好的，您喜欢什么口味的麻辣烫？'
});
```

### 4.3 获取会话历史

```javascript
// 获取会话历史
const history = await dume.session.getHistory({
  sessionId: 'sess-789',
  limit: 20
});

for (const msg of history) {
  console.log(`${msg.role}: ${msg.content}`);
}
```

---

## 5. 用户管理

### 5.1 创建用户

```javascript
const user = await dume.user.create({
  id: 'user-123',
  // 可选: 用户信息
  metadata: {
    name: '张三',
    timezone: 'Asia/Shanghai'
  }
});
```

### 5.2 获取用户信息

```javascript
const user = await dume.user.get({
  userId: 'user-123'
});
```

### 5.3 更新用户信息

```javascript
await dume.user.update({
  userId: 'user-123',
  metadata: {
    name: '张三（已验证）',
    verified: true
  }
});
```

---

## 6. 与 OpenClaw 集成

### 6.1 配置方式

```yaml
# openclaw 配置示例
memory:
  provider: "dume"
  config:
    apiKey: "${DUME_API_KEY}"
    userScope: "user"  # user | session
```

### 6.2 集成优势

| 优势 | 说明 |
|------|------|
| **简单集成** | 几分钟内完成配置 |
| **轻量级** | 不增加系统负担 |
| **够用的功能** | 满足原型和小型项目需求 |

### 6.3 集成限制

| 限制 | 说明 |
|------|------|
| **无版本控制** | 记忆更新是覆盖式 |
| **无冲突处理** | 需自建冲突逻辑 |
| **无企业合规** | 不适合严格合规需求 |
| **规模限制** | 大规模应用可能不够 |

---

## 7. 使用模式

### 7.1 基础模式：用户偏好存储

```javascript
// 场景: 存储用户偏好
async function rememberPreference(userId, key, value) {
  await dume.memory.add({
    userId,
    content: `用户偏好: ${key} = ${value}`,
    metadata: { type: 'preference', key }
  });
}

async function getPreferences(userId) {
  return await dume.memory.search({
    userId,
    query: '用户偏好',
    limit: 20
  });
}

// 使用
await rememberPreference('user-123', 'spicy', '重辣');
const prefs = await getPreferences('user-123');
```

### 7.2 中级模式：会话上下文

```javascript
// 场景: 管理对话上下文
async function continueConversation(sessionId, userMessage) {
  // 添加用户消息
  await dume.session.addMessage({
    sessionId,
    role: 'user',
    content: userMessage
  });

  // 获取相关记忆
  const memories = await dume.memory.search({
    query: userMessage,
    limit: 5
  });

  // 构建上下文
  const context = memories
    .map(m => m.content)
    .join('\n');

  return { context, memories };
}
```

### 7.3 高级模式：记忆召回优化

```javascript
// 场景: 结合 LLM 进行智能记忆召回
async function smartRecall(userId, query) {
  // 1. 获取原始记忆
  const rawMemories = await dume.memory.search({
    userId,
    query,
    limit: 10
  });

  // 2. 使用 LLM 排序和总结
  const ranked = await llm.rankMemories({
    query,
    memories: rawMemories.map(m => m.content)
  });

  return ranked;
}
```

---

## 8. 错误处理

### 8.1 常见错误

```javascript
try {
  await dume.memory.add({...});
} catch (error) {
  if (error.code === 'INVALID_API_KEY') {
    console.error('API Key 无效');
  } else if (error.code === 'RATE_LIMIT') {
    console.error('请求过于频繁');
  } else if (error.code === 'USER_NOT_FOUND') {
    console.error('用户不存在');
  }
}
```

### 8.2 重试策略

```javascript
async function withRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * Math.pow(2, i)); // 指数退避
    }
  }
}

// 使用
await withRetry(() => dume.memory.add({...}));
```

---

## 9. 架构决策指南

### 9.1 何时选择 Dume

| 场景 | 推荐度 | 原因 |
|------|--------|------|
| **快速原型** | ⭐⭐⭐ | 5 分钟集成，即刻使用 |
| **个人项目** | ⭐⭐⭐ | 简单够用，成本低 |
| **学习研究** | ⭐⭐⭐ | API 简单易理解 |
| **小型应用** | ⭐⭐ | 功能满足基础需求 |
| **中大型应用** | ⭐ | 功能可能不够丰富 |
| **企业级应用** | ❌ | 需要 Mem0 或 MemoryLake |

### 9.2 升级路径

```
Dume → Mem0 → MemoryLake

适合快速验证    中小型应用    企业级应用
    ↓               ↓              ↓
5分钟集成     完整记忆功能    跨平台+合规
```

### 9.3 替代方案

| 需求 | Dume 替代方案 | 说明 |
|------|--------------|------|
| **更完整功能** | Mem0 | 25K+ stars，开源完整 |
| **时序推理** | Zep | 时序知识图谱 |
| **跨平台** | MemoryLake | 唯一跨平台选择 |
| **自托管** | LangChain Memory | 完全可控 |

---

## 10. 总结

### 10.1 核心优势

1. **极简 API**: 几分钟内完成集成
2. **开发者友好**: 直观、一致、易于理解
3. **轻量级**: 不增加系统负担
4. **够用的功能**: 满足原型和小型项目需求
5. **低成本**: 适合个人项目和快速验证

### 10.2 适用边界

- ✅ 快速原型和 MVP 验证
- ✅ 个人项目和小型应用
- ✅ 学习研究和概念验证
- ❌ 企业级应用（用 Mem0 或 MemoryLake）
- ❌ 需要版本控制和冲突处理（用 MemoryLake）
- ❌ 跨平台记忆需求（用 MemoryLake）

### 10.3 技术栈建议

```
快速验证栈:
├── Dume (记忆) + LangChain (编排) + 小型 LLM
└── 适合: 原型、MVP、个人项目

生产级栈:
├── Mem0 (记忆) + LangChain (编排) + GPT-4/Claude
└── 适合: 中小型应用

企业级栈:
├── MemoryLake (完整记忆) + 自选 LLM
└── 适合: 企业级应用
```

---

*文档参考: https://dume.ai (官方)*  
*整理时间: 2026-05-02*