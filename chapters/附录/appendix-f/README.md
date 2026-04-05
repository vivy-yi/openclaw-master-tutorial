# 附录F: 性能优化指南

> 提升OpenClaw响应速度和资源利用率的实用技巧

---

## 优化策略概览

| 优化方向 | 预期提升 | 难度 |
|---------|---------|-----|
| 模型选择 | 50-70%成本降低 | ⭐ |
| 缓存策略 | 30-50%延迟降低 | ⭐⭐ |
| 连接优化 | 20-30%响应提升 | ⭐⭐ |
| 并发控制 | 40%吞吐量提升 | ⭐⭐⭐ |
| 上下文管理 | 25%成本降低 | ⭐⭐ |

---

## 1. 模型优化

### 智能路由

根据任务类型选择最合适的模型：

```json
{
  "agents": {
    "defaults": {
      "models": {
        "light": {
          "provider": "openai",
          "model": "gpt-4o-mini",
          "costPer1K": 0.15
        },
        "standard": {
          "provider": "deepseek",
          "model": "deepseek-chat",
          "costPer1K": 0.14
        },
        "heavy": {
          "provider": "anthropic",
          "model": "claude-3-5-sonnet",
          "costPer1K": 3.0
        }
      },
      "routingRules": [
        { "pattern": "^(计算|编程|代码|debug)", "model": "heavy" },
        { "pattern": "^(翻译|总结|简单|快速)", "model": "light" },
        { "model": "standard" }
      ]
    }
  }
}
```

### 成本与质量平衡

| 场景 | 推荐模型 | 成本指数 | 质量指数 |
|-----|---------|---------|---------|
| 日常对话 | gpt-4o-mini | ⭐ | ⭐⭐⭐ |
| 中文任务 | deepseek-chat | ⭐ | ⭐⭐⭐⭐ |
| 复杂推理 | claude-3.5 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 多模态 | gpt-4o | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 2. 缓存策略

### 启用响应缓存

```json
{
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": "100MB",
    "strategy": "semantic"
  }
}
```

缓存命中场景：
- 重复的问题
- 固定的查询模板
- 参考文档问答

### 向量缓存

```json
{
  "cache": {
    "vectorCache": {
      "enabled": true,
      "similarityThreshold": 0.95,
      "embeddingModel": "text-embedding-3-small"
    }
  }
}
```

### 预加载热门内容

```bash
# 启动时预热缓存
openclaw cache warmup --file ./faq.json

# faq.json 格式
{
  "questions": [
    "公司报销流程是什么？",
    "WiFi密码是多少？",
    "请假如何申请？"
  ]
}
```

---

## 3. 连接优化

### 连接池配置

```json
{
  "gateway": {
    "connectionPool": {
      "maxConnections": 100,
      "keepAlive": true,
      "keepAliveTimeout": 30
    }
  }
}
```

### HTTP/2支持

```json
{
  "gateway": {
    "http2": {
      "enabled": true,
      "maxConcurrentStreams": 100
    }
  }
}
```

### WebSocket优化

```json
{
  "channels": {
    "websocket": {
      "enabled": true,
      "pingInterval": 30,
      "compression": true
    }
  }
}
```

---

## 4. 上下文管理

### 上下文截断

```json
{
  "agents": {
    "defaults": {
      "contextManagement": {
        "maxTokens": 8000,
        "truncationStrategy": "smart",
        "preserveSystemMessage": true,
        "preserveLastNMessages": 10
      }
    }
  }
}
```

### 消息压缩

```json
{
  "agents": {
    "defaults": {
      "contextManagement": {
        "compression": {
          "enabled": true,
          "summarizeThreshold": 4000,
          "summaryModel": "gpt-4o-mini"
        }
      }
    }
  }
}
```

### 会话隔离

```json
{
  "agents": {
    "defaults": {
      "session": {
        "ttl": 1800,
        "maxMessages": 50,
        "autoCleanup": true
      }
    }
  }
}
```

---

## 5. 并发控制

### 限流配置

```json
{
  "gateway": {
    "rateLimit": {
      "enabled": true,
      "strategy": "token-bucket",
      "burst": 10,
      "sustained": 5
    }
  }
}
```

### 队列管理

```json
{
  "gateway": {
    "queue": {
      "enabled": true,
      "maxSize": 100,
      "timeout": 60,
      "priority": true
    }
  }
}
```

### 批量处理

```json
{
  "agents": {
    "defaults": {
      "batching": {
        "enabled": true,
        "maxBatchSize": 5,
        "maxWaitMs": 100
      }
    }
  }
}
```

---

## 6. 流式优化

### 启用流式响应

```json
{
  "agents": {
    "defaults": {
      "streaming": {
        "enabled": true,
        "chunkSize": 100,
        "flushInterval": 50
      }
    }
  }
}
```

**效果对比**：

| 模式 | 首字节延迟 | 完整响应时间 | 用户体验 |
|-----|-----------|------------|---------|
| 非流式 | 3-5s | 3-5s | ⭐⭐ |
| 流式 | 0.5s | 3-5s | ⭐⭐⭐⭐⭐ |

---

## 7. 资源监控

### 性能指标

```bash
# 实时监控
openclaw metrics --watch

# 关键指标
- 平均响应时间: < 2s
- P99响应时间: < 5s
- 缓存命中率: > 30%
- 错误率: < 1%
```

### 资源使用

```bash
# 查看资源使用
openclaw status --verbose

# 输出示例
CPU: 15% | Memory: 256MB | Connections: 12
Cache Hit: 45% | Avg Latency: 1.2s
```

---

## 8. 性能测试

### 基准测试

```bash
# 负载测试
openclaw benchmark \
  --concurrent 10 \
  --requests 100 \
  --duration 60s

# 输出报告
Summary:
  Total Requests: 100
  Success Rate: 98%
  Avg Latency: 1.5s
  P99 Latency: 4.2s
  Throughput: 15 req/s
```

### 压力测试

```bash
# 极限测试
openclaw stress \
  --ramp-up 30s \
  --sustained 120s \
  --target 50rps
```

---

## 9. 容器优化

### Docker配置

```dockerfile
# 多阶段构建
FROM openclaw/base:latest AS builder
# ...构建步骤

FROM openclaw/runtime:latest
COPY --from=builder /app /app
EXPOSE 18789
CMD ["openclaw", "start"]
```

### 资源限制

```yaml
# docker-compose.yml
services:
  openclaw:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## 10. 优化检查清单

部署前确认：

- [ ] **模型路由**已配置，避免大材小用
- [ ] **缓存**已启用，设置合理TTL
- [ ] **连接池**已调优，启用keep-alive
- [ ] **上下文限制**已设置，防止token溢出
- [ ] **流式响应**已启用，提升用户体验
- [ ] **监控**已配置，实时了解性能
- [ ] **资源限制**已设置，防止OOM

---

## 优化效果对比

| 场景 | 优化前 | 优化后 | 提升 |
|-----|-------|-------|-----|
| 平均延迟 | 3.5s | 1.2s | -66% |
| 月API成本 | $500 | $150 | -70% |
| 并发能力 | 20 | 100 | +400% |
| 缓存命中 | 0% | 45% | - |
| P99延迟 | 8s | 3s | -63% |

---

**提示**：性能优化是渐进过程，建议每次只调整一个参数，观察效果后再继续。
