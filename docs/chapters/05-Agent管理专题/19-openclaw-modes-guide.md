# OpenClaw 模式指南

> OpenClaw 提供了多种运行时模式，用于控制 AI 的思考深度、响应速度、调试信息等
> 日期：2026-03-27

---

## 1. Thinking 思考模式

### 1.1 级别说明

| 级别 | 命令 | 说明 | 适用场景 |
|------|------|------|---------|
| `off` | `/think off` | 关闭思考 | 简单问答 |
| `minimal` | `/think minimal` | 快速思考 | 简单任务 |
| `low` | `/think low` | 基本思考 | 普通对话 |
| `medium` | `/think medium` | 中度思考 | 复杂分析 |
| `high` | `/think high` | 深度思考 (ultrathink) | 复杂任务 |
| `xhigh` | `/think xhigh` | 极深度思考 (GPT-5.2+) | 专家级任务 |
| `adaptive` | `/think adaptive` | 模型自适应 | 默认推荐 |

### 1.2 命令语法

```bash
# 设置当前消息的思考级别（一次性）
/think high
/th high
/think:medium

# 设置会话默认（持久化）
/think:high

# 查看当前级别
/think
/think:
```

### 1.3 Thinking 层级对比

```
off → minimal → low → medium → high → xhigh
 │       │        │      │       │       │
 └───────┴────────┴──────┴───────┴───────┘
        思考深度递增 ←─────────────────────→
```

| 思考级别 | 推理成本 | 响应速度 | 输出质量 |
|---------|---------|---------|---------|
| off | 无 | 最快 | 基础 |
| low | 低 | 快 | 良好 |
| medium | 中 | 中等 | 较高 |
| high | 高 | 较慢 | 很高 |
| xhigh | 极高 | 最慢 | 最高 |

---

## 2. Fast Mode 快速模式

### 2.1 说明

Fast Mode 优先低延迟，适用于简单快速的问答场景。

### 2.2 命令

| 状态 | 命令 | 说明 |
|------|------|------|
| `off` | `/fast off` | 标准模式（默认） |
| `on` | `/fast on` | 快速模式 |

```bash
# 开启快速模式
/fast on

# 关闭快速模式
/fast off

# 查看状态
/fast
/fast status
```

### 2.3 不同 Provider 的效果

| Provider | Fast Mode 效果 |
|----------|---------------|
| **OpenAI** | `service_tier=priority` + 低推理成本 + 低文本冗余 |
| **Anthropic** | `service_tier=auto`（需要 API Key） |
| **Codex** | 同 OpenAI，低延迟配置 |

---

## 3. Verbose 详细模式

### 3.1 说明

Verbose 模式控制是否显示工具调用的详细信息，适用于调试和透明度需求。

### 3.2 命令

| 级别 | 命令 | 说明 |
|------|------|------|
| `off` | `/verbose off` | 关闭详细日志（默认） |
| `on` | `/verbose on` | 显示工具调用摘要 |
| `full` | `/verbose full` | 显示完整工具输出 |

```bash
# 开启详细模式
/verbose on

# 开启完整详细模式
/verbose full

# 关闭
/verbose off

# 查看状态
/verbose
/verbose:
```

### 3.3 输出示例

**Verbose off（默认）：**
```
✅ 搜索完成，找到 5 个结果
```

**Verbose on：**
```
🔧 exec: curl -s "https://api.github.com/..."
📤 message: 发送结果给用户
✅ 搜索完成，找到 5 个结果
```

---

## 4. Reasoning 推理可见性

### 4.1 说明

控制是否向用户显示 AI 的推理过程。

### 4.2 命令

| 级别 | 命令 | 说明 | 平台支持 |
|------|------|------|---------|
| `off` | `/reasoning off` | 隐藏推理过程（默认） | 通用 |
| `on` | `/reasoning on` | 显示推理块 | 通用 |
| `stream` | `/reasoning stream` | 流式推理 | Telegram 专属 |

```bash
# 开启推理可见
/reasoning on

# 开启流式推理
/reasoning stream

# 关闭
/reasoning off

# 查看状态
/reasoning
/reasoning:
```

### 4.3 流式推理效果（`/reasoning stream`）

```
正在输入...
Reasoning: 用户想了解 OpenClaw 的模式...
Reasoning: 我需要搜索相关文档...
Reasoning: 找到了 Thinking 模式的信息...
         ↓
[最终回复]
```

---

## 5. Elevated 提升模式

### 5.1 说明

Elevated 模式用于高风险操作，需要额外的权限确认。

### 5.2 触发条件

- 执行删除操作
- 执行外部支付
- 访问敏感数据
- 其他高风险操作

---

## 6. 模式自动切换规则

### 6.1 自动切换场景

| 场景 | 自动切换 | 说明 |
|------|---------|------|
| **搜索/API失败** | Thinking → `medium` | 失败后自动提升思考深度重试 |
| **复杂任务检测** | Low → `medium` | 模型自动判断任务复杂度 |
| **上下文过长** | 保持当前 | 触发 compaction 压缩 |
| **模型不支持 thinking** | 自动跳过 | 回退到无思考模式 |
| **错误后重试** | Low → `medium` | 首次失败后加深思考 |

### 6.2 自动切换逻辑

```typescript
// 伪代码：OpenClaw 内部逻辑

async function handleMessage(message) {
  // 1. 评估任务复杂度
  const complexity = assessComplexity(message);
  
  // 2. 如果检测到复杂任务，自动提升思考深度
  if (complexity === 'high' && thinkingLevel < 'medium') {
    thinkingLevel = 'medium'; // 自动提升
  }
  
  // 3. 如果首次执行失败，自动加深思考
  const result = await execute(message);
  if (result.failed && attempt === 1) {
    thinkingLevel = incrementThinking(thinkingLevel);
    result = await execute(message); // 重试
  }
  
  // 4. 如果用户配置了 adaptive，自动选择
  if (thinkingLevel === 'adaptive') {
    thinkingLevel = model.getAdaptiveThinkingLevel();
  }
}
```

### 6.3 手动覆盖自动

```
用户输入 "/think high" → 覆盖自动切换
                       ↓
会话级别思考深度 = high
                       ↓
即使模型判断应该用 low，也使用 high
```

---

## 7. 模式组合使用

### 7.1 日常使用（推荐）

```
/think low          # 基础思考
/fast on            # 快速响应
/reasoning off      # 隐藏推理
```

### 7.2 复杂任务

```
/think high         # 深度思考
/fast off           # 标准速度
/reasoning on       # 显示推理过程
```

### 7.3 调试模式

```
/think medium       # 中度思考
/verbose full       # 显示所有工具调用
/reasoning on       # 显示推理
```

### 7.4 简单问答

```
/think off          # 无思考
/fast on            # 最快响应
/reasoning off      # 隐藏推理
```

---

## 8. 优先级规则

当多个模式同时生效时：

```
命令行参数 > 会话默认 > Agent配置 > 全局默认 > Provider默认
   │              │          │          │          │
   └── 最高优先级  ──────────┴──────────┴──────────┘
                                              └── 最低优先级
```

### 优先级详解

| 优先级 | 来源 | 范围 | 覆盖方式 |
|--------|------|------|---------|
| 1 | 消息内联指令 | 当前消息 | `/think high` |
| 2 | 会话指令 | 当前会话 | `/think:high` |
| 3 | Agent 配置 | 所有该 Agent 会话 | `agents.list[].thinkingDefault` |
| 4 | 全局配置 | 所有会话 | `agents.defaults.thinkingDefault` |
| 5 | Provider 默认 | 所有会话 | 模型自带默认 |

---

## 9. 配置示例

### 9.1 在 openclaw.json 中设置默认

```json5
{
  agents: {
    defaults: {
      thinkingDefault: "low",      // 默认思考级别
      fastModeDefault: "off",      // 默认快速模式
      reasoningDefault: "off",     // 默认推理可见性
    },
    list: [
      {
        id: "main",
        thinkingDefault: "medium", // main Agent 默认 medium
      },
      {
        id: "shenghuo",
        thinkingDefault: "low",    // 生活 Agent 默认 low
        fastModeDefault: "on",     // 快速模式
      },
    ],
  },
}
```

### 9.2 在 SOUL.md 中定义

```markdown
## 运行时模式规则

### 思考模式
- 默认使用: low
- 搜索任务: 自动提升到 medium
- 失败重试: 自动提升一级

### 快速模式
- 简单问答: 开启
- 复杂任务: 关闭

### 推理可见性
- 默认: off
- 用户要求时: on
```

---

## 10. 常见问题

### Q: Thinking 级别越高越好吗？

**不是。** 简单任务用 high 会浪费时间和成本。

| 任务类型 | 推荐级别 |
|---------|---------|
| 简单问答 | `off` / `low` |
| 日常对话 | `low` |
| 搜索研究 | `medium` |
| 复杂分析 | `high` |
| 专家任务 | `xhigh` |

### Q: Fast Mode 会影响质量吗？

**可能会。** Fast Mode 优化延迟，可能牺牲一定的输出质量。

### Q: Verbose 和 Reasoning 有什么区别？

| 模式 | 显示内容 | 用途 |
|------|---------|------|
| **Verbose** | 工具调用详情 | 调试 |
| **Reasoning** | AI 思考过程 | 透明度 |

### Q: 模式会自动切换，我需要手动设置吗？

**看情况：**
- 简单任务：自动足够
- 复杂任务：建议手动 `/think high`
- 调试：建议 `/verbose on`

---

## 11. 总结速查表

| 需求 | 命令 |
|------|------|
| 深度思考 | `/think high` |
| 快速响应 | `/fast on` |
| 显示推理 | `/reasoning on` |
| 调试工具 | `/verbose on` |
| 查看状态 | `/think` / `/fast` / `/verbose` / `/reasoning` |

---

*文档更新时间: 2026-03-27*
*来源：DM主控对话*
