# Zep 完整教程

> 时序知识图谱架构的 AI 记忆系统，专为 Agent 长期记忆设计

**整理时间**: 2026-05-02
**适用场景**: 企业级 AI 应用、实时 Agent、多会话对话系统

---

## 1. 产品概述

### 1.1 核心定位

**标语**: "Temporal Knowledge Graph Architecture for Agent Memory"

Zep 是一个专注于时序知识图谱的 AI 记忆层，基于开源项目 Graphiti 构建，旨在解决 Agent 在长时间对话和多会话场景下的记忆管理问题。

### 1.2 与竞品对比

| 特性 | Zep | Mem0 | Letta | Supermemory |
|------|-----|------|-------|-------------|
| **架构** | 时序知识图谱 | 向量存储 | LLM-as-OS | RAG + 画像 |
| **开源** | ✅ | ✅ | ✅ | ✅ |
| **版本控制** | ✅ | ❌ | ✅ | ❌ |
| **时序推理** | ✅ | ❌ | ❌ | ❌ |
| **DMR Benchmark** | #1 | - | - | - |
| **记忆类型** | TKG (时序图) | User/Session/Agent | 分层上下文 | 用户画像 |

### 1.3 适用场景

- ✅ 实时 AI Agent 需要长期记忆
- ✅ 多会话对话需要时序上下文
- ✅ 企业级应用需要可靠记忆
- ✅ 需要 Deep Memory Retrieval (DMR) 高精度召回
- ❌ 轻量级原型快速验证（推荐 Dume）
- ❌ 跨平台记忆（推荐 MemoryLake）

---

## 2. 核心架构

### 2.1 Temporal Knowledge Graph (TKG)

Zep 的核心创新是基于时序知识图谱的记忆表示：

```
┌─────────────────────────────────────────────────────────┐
│                   Temporal Knowledge Graph              │
│                                                         │
│   [实体节点] ←──关系边──→ [实体节点]                   │
│       │                           │                    │
│   时间戳                      时间戳                     │
│       │                           │                    │
│       └────────── 时间边 ──────────┘                    │
│                                                         │
│   特点:                                                 │
│   - 实体和关系都带时间戳                               │
│   - 支持时间旅行查询                                   │
│   - 关系可随时间失效                                   │
└─────────────────────────────────────────────────────────┘
```

**图谱组成**:

| 组件 | 说明 | 示例 |
|------|------|------|
| **实体 (Entity)** | 事实主体 | 用户、产品、概念 |
| **关系 (Relation)** | 实体间连接 | 购买、喜欢、属于 |
| **时间边 (Temporal Edge)** | 带时间的关系 | "2024-01 购买" 有效期到 "2024-06" |
| **事实 (Fact)** | 三元组 + 时间 | (用户A, 购买, 产品B, 2024-01) |

### 2.2 基于 Graphiti 开源实现

Zep 的 TKG 架构基于 Graphiti 项目构建：

```
Graphiti 核心特性:
├── 时序图构建器
│   └── 从对话/文档中提取时序事实
├── 时间感知编码
│   └── 实体关系随时间演化
├── Graph RAG
│   └── 图增强的检索增强生成
└── 并发写入支持
    └── 多 Agent 同时写入
```

**Graphiti 开源地址**: https://github.com/GradientEdge/graphiti

### 2.2 与传统向量存储对比

| 维度 | 传统向量存储 | Zep TKG |
|------|------------|---------|
| **表示方式** | Embedding 向量 | 图结构 + 向量 |
| **关系建模** | 隐式（相似度） | 显式（边） |
| **时间建模** | 无 | 原生支持 |
| **推理能力** | 相似性检索 | 图遍历 + 多跳 |
| **更新方式** | 覆盖/追加 | 时间边失效 |

---

## 3. Deep Memory Retrieval (DMR) Benchmark

### 3.1 什么是 DMR

DMR 是评估深度记忆检索能力的 benchmark，主要测试:

- **事实召回**: 从长时间记忆中准确提取事实
- **关系推理**: 基于实体关系进行推理
- **时序感知**: 理解事件发生的时间顺序

### 3.2 Zep 在 DMR 的表现

Zep 在 DMR benchmark 中表现优异，超越 MemGPT 等竞品：

| 任务类型 | Zep 表现 | 说明 |
|----------|---------|------|
| **事实召回** | 领先 | 时序图结构提升召回率 |
| **关系推理** | 领先 | 图遍历支持多跳推理 |
| **时序排序** | 领先 | 时间边原生支持 |

### 3.3 DMR 与其他 Benchmark 的关系

| Benchmark | 侧重点 | Zep 表现 |
|-----------|--------|---------|
| **DMR** | 深度记忆检索 | #1 |
| **LoCoMo** | 长期记忆综合 | 表现中等 |
| **LongMemEval** | 记忆召回 | 表现中等 |

---

## 4. 三种记忆模式

Zep 提供三种记忆模式，适应不同场景：

### 4.1 短时记忆 (Short-term)

```
特点:
├── 存储: 当前会话上下文
├── 生命周期: 会话结束即清除
├── 容量: 受限于 LLM 上下文窗口
└── 用途: 维持对话连贯性
```

**使用场景**:
- 单次会话内的上下文保持
- 当前任务的中间状态

### 4.2 长时记忆 (Long-term)

```
特点:
├── 存储: 持久化的时序知识图谱
├── 生命周期: 永久保留（或按策略过期）
├── 容量: 无限制（基于图存储）
└── 用途: 跨会话知识保留
```

**使用场景**:
- 用户偏好跨会话保持
- 业务知识长期积累
- Agent 学习曲线优化

### 4.3 元记忆 (Meta-memory)

```
特点:
├── 存储: 关于记忆本身的记忆
├── 内容: "用户上次问过这个"、"这个事实可靠性如何"
├── 用途: 记忆来源追踪、置信度评估
└── 机制: 自引用图结构
```

**使用场景**:
- 记忆来源验证
- 矛盾检测
- 置信度排序

---

## 5. 企业级关键记忆

### 5.1 SOC 2 Type II 合规

Zep 提供企业级安全保障：

| 合规项 | 说明 |
|--------|------|
| **SOC 2 Type II** | 已认证，数据安全、可用性、处理完整性 |
| **SSO** | 企业级单点登录支持 |
| **角色控制** | 细粒度权限管理 |
| **审计日志** | 完整的操作审计 |

### 5.2 企业功能

| 功能 | 说明 |
|------|------|
| **数据隔离** | 多租户数据完全隔离 |
| **加密存储** | 静态数据加密 |
| **合规导出** | GDPR/CCPA 数据导出支持 |
| **SLA 保障** | 企业级服务协议 |

---

## 6. API 使用详解

### 6.1 安装

```bash
npm install @getzep/zep-js
# 或
pip install zep-js
```

### 6.2 初始化客户端

```javascript
import { ZepClient } from "@getzep/zep-js";

const client = new ZepClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.getzep.com"
});
```

### 6.3 添加记忆

```javascript
// 添加对话记忆
await client.memory.add({
  sessionId: "user-123-session-456",
  messages: [
    { role: "user", content: "我想要预订下周去东京的机票" },
    { role: "assistant", content: "好的，您希望哪家航空公司？" }
  ],
  metadata: {
    intent: "booking",
    destination: "东京",
    timeframe: "下周"
  }
});

// 添加事实记忆
await client.memory.addFact({
  entity: "用户-123",
  relation: "旅行计划",
  target: "东京",
  timestamp: new Date().toISOString(),
  confidence: 0.95
});
```

### 6.4 检索记忆

```javascript
// 自然语言检索
const results = await client.memory.search({
  sessionId: "user-123-session-456",
  query: "用户最近的旅行计划是什么？",
  limit: 5
});

// 时序检索
const timeRangeResults = await client.memory.searchTimeRange({
  sessionId: "user-123-session-456",
  startTime: "2024-01-01",
  endTime: "2024-03-31",
  query: "东京行程"
});
```

### 6.5 记忆管理

```javascript
// 获取用户记忆摘要
const summary = await client.memory.getSummary({
  sessionId: "user-123-session-456"
});

// 删除特定记忆
await client.memory.delete({
  sessionId: "user-123-session-456",
  memoryId: "memory-789"
});

// 清空会话记忆
await client.memory.purge({
  sessionId: "user-123-session-456"
});
```

### 6.6 Python SDK 示例

```python
from zep_client import ZepClient

client = ZepClient(api_key="your-api-key")

# 添加记忆
client.memory.add(
    session_id="user-123-session-456",
    messages=[
        {"role": "user", "content": "我想要预订下周去东京的机票"}
    ]
)

# 检索
results = client.memory.search(
    session_id="user-123-session-456",
    query="旅行计划",
    limit=5
)

for result in results:
    print(f"记忆: {result.content}")
    print(f"相关性: {result.score}")
    print(f"时间: {result.timestamp}")
```

---

## 7. 与 OpenClaw 集成

### 7.1 集成方式

Zep 可以作为 OpenClaw 的外部记忆后端：

```yaml
# openclaw 配置示例
memory:
  provider: "zep"
  config:
    apiKey: "${ZEP_API_KEY}"
    baseUrl: "https://api.getzep.com"
    sessionScope: "user"  # user | agent | session
```

### 7.2 集成优势

| 优势 | 说明 |
|------|------|
| **时序记忆** | 保留事件时间线 |
| **关系推理** | 支持多跳查询 |
| **长期记忆** | 跨会话知识保持 |
| **企业合规** | SOC 2 支持 |

### 7.3 集成限制

| 限制 | 说明 |
|------|------|
| **非跨平台** | 仅 Zep API 可用 |
| **无版本控制** | 记忆更新是覆盖式 |
| **非开源** | 云服务为主 |

---

## 8. 架构决策指南

### 8.1 何时选择 Zep

| 场景 | 推荐度 | 原因 |
|------|--------|------|
| **企业级 Agent** | ⭐⭐⭐ | SOC 2 合规，时序图谱 |
| **多会话客服** | ⭐⭐⭐ | 时序记忆提升连贯性 |
| **金融/法律顾问** | ⭐⭐⭐ | 关系推理 + 事实追溯 |
| **实时推荐系统** | ⭐⭐ | 时序图谱支持 |
| **轻量级原型** | ⭐ | 过度设计，考虑 Dume |

### 8.2 架构替代方案

| 需求 | Zep 替代方案 |
|------|-------------|
| **更简单** | Mem0（开源流行，25K+ stars） |
| **跨平台** | MemoryLake（唯一跨 ChatGPT/Claude/Qwen） |
| **LLM-as-OS** | Letta（开创分层记忆范式） |
| **Benchmark 第一** | Supermemory（LoCoMo/DMR 多项第一） |

---

## 9. 总结

### 9.1 核心优势

1. **时序知识图谱**: 原生支持时间维度，实体关系可追踪
2. **DMR Benchmark 领先**: 深度记忆检索精度高
3. **企业级合规**: SOC 2 Type II 认证
4. **Graphiti 开源**: 基于成熟开源项目，可自托管

### 9.2 适用边界

- ✅ 企业级 AI Agent 记忆
- ✅ 多会话时序推理场景
- ✅ 需要记忆来源追溯的应用
- ❌ 轻量级快速原型（用 Dume）
- ❌ 跨平台记忆（用 MemoryLake）

### 9.3 技术栈建议

```
推荐组合:
├── Zep (记忆层) + LangChain (编排) + OpenAI/Claude (LLM)
└── 适用: 企业级生产环境

轻量组合:
├── Mem0 (记忆层) + LangChain (编排)
└── 适用: 快速原型开发
```

---

*文档参考: https://www.getzep.com, https://github.com/GradientEdge/graphiti*
*整理时间: 2026-05-02*