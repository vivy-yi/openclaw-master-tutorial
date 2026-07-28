# 动态模型切换最佳实践

**来源**: PR #114760
**适用版本**: v2026.7.1-beta.1+
**更新时间**: 2026-07-28

---

## 问题描述

### 症状

在之前的版本中，当用户执行以下操作时可能出现模型目录错误：

1. **动态切换模型** - 用户在运行时切换到不同的模型
2. **运行辅助 Agent** - 启动子 agent 或辅助 agent

**问题表现**：
- 辅助 agent 获得主 agent 的模型目录
- 模型切换后使用错误的 API 端点
- 工具调用失败，提示模型不支持

### 根本原因

问题出在 session 管理逻辑：

```
用户请求 → Session 创建 → 模型目录查询 → ❌ 错误地使用父 agent 的目录
```

所有 session 创建/变更/目录查询都通过**父 agent** 而不是**当前 agent** 进行解析。

---

## v2026.7.1-beta.1 修复

### 修复内容

修复后，所有 session 创建/变更/目录查询都通过**已解析的拥有 agent**（resolved owning agent）进行：

```typescript
// 修复前：使用父 agent 的模型目录
function createSession(parentAgent, config) {
  const directory = parentAgent.getModelDirectory(); // ❌ 错误
  // ...
}

// 修复后：使用当前 agent 的模型目录
function createSession(requestingAgent, config) {
  const owningAgent = resolveOwningAgent(requestingAgent);
  const directory = owningAgent.getModelDirectory(); // ✅ 正确
  // ...
}
```

### 修复效果

| 场景 | 修复前 | 修复后 |
|------|--------|--------|
| 主 agent 切换模型 | 可能使用旧模型 | ✅ 正确切换 |
| 启动子 agent | 继承父模型目录 | ✅ 使用自己的模型 |
| 辅助 agent 执行 | 模型配置混乱 | ✅ 配置正确 |

---

## 使用指南

### 动态模型切换

#### 方式一：使用 /switch-model 命令

```
/switch-model gpt-4
```

#### 方式二：配置文件切换

```yaml
# models.yaml
models:
  - name: gpt-4
    provider: openai
    
  - name: claude-3-opus
    provider: anthropic
    
  - name: deepseek-chat
    provider: deepseek
```

```bash
# 运行时切换
/openclaw switch-model claude-3-opus
```

#### 方式三：编程式切换

```typescript
// 在 agent 代码中切换模型
await agent.switchModel({
  model: 'claude-3-opus',
  temperature: 0.7
});
```

### 辅助 Agent 模型配置

#### 场景一：为辅助 agent 指定不同模型

```yaml
agents:
  main:
    model: gpt-4
    
  assistant:
    model: claude-3-opus
    parent: main
```

#### 场景二：动态分配模型

```typescript
// 创建辅助 agent 时动态选择模型
const assistant = await session.spawnAgent({
  name: 'research-assistant',
  model: 'claude-3-sonnet',  // 独立模型选择
  task: '帮助研究 OpenClaw 最新功能'
});
```

---

## 最佳实践

### 1. 明确模型职责

建议为不同类型的 agent 配置不同的模型：

| Agent 类型 | 推荐模型 | 理由 |
|-----------|---------|------|
| 主 Agent | GPT-4 / Claude-3-Opus | 强推理能力 |
| 辅助 Agent | Claude-3-Sonnet | 平衡性能与成本 |
| 工具 Agent | GPT-3.5-Turbo | 成本优化 |
| 分析 Agent | DeepSeek-Chat | 中文优化 |

### 2. 模型切换时的清理

切换模型后建议清理缓存：

```bash
# 清理模型缓存
openclaw cache clear --model

# 或使用 API
POST /api/cache/clear { "type": "model" }
```

### 3. 错误处理

处理模型切换失败：

```typescript
try {
  await agent.switchModel('claude-3-opus');
} catch (error) {
  if (error.code === 'MODEL_NOT_FOUND') {
    // 回退到默认模型
    await agent.switchModel('gpt-3.5-turbo');
  }
  throw error;
}
```

---

## 故障排除

### 问题：切换模型后工具调用失败

**原因**：新模型不支持某些工具

**解决方案**：
1. 检查模型能力矩阵
2. 配置工具白名单
3. 使用兼容的工具集

```yaml
agents:
  assistant:
    model: gpt-3.5-turbo
    tools:
      allowed:
        - web-search
        - calculator
        - memory
```

### 问题：辅助 agent 使用错误模型

**检查步骤**：

```bash
# 查看 agent 模型配置
openclaw agent info <agent-name>

# 查看当前使用的模型
openclaw agent status
```

### 问题：模型目录缓存导致问题

```bash
# 清理目录缓存
rm -rf ~/.openclaw/cache/model-directory/*

# 重启 gateway
openclaw gateway restart
```

---

## 相关配置

| 配置项 | 说明 |
|--------|------|
| `agents[].model` | Agent 默认模型 |
| `agents[].modelFallback` | 模型失败时的回退 |
| `session.modelOverride` | Session 级模型覆盖 |

---

## 参考链接

- [PR #114760 - 动态模型切换可靠性修复](https://github.com/openclaw/openclaw/pull/114760)
- [模型配置概述](../04_模型配置/4.1_providers_overview.md)
- [Manifest 模型路由](../04_模型配置/4.8_manifest_model_router.md)

---

*文档更新于 2026-07-28，基于官方 PR #114760*
