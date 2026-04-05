# 工作流自动化详解

> 本章介绍如何设计和使用 OpenClaw 工作流自动化，实现多 Agent 协作完成复杂任务。

---

## 1. 工作流概述

### 1.1 什么是工作流

工作流是一系列预定义的任务步骤，由一个或多个 Agent 按顺序或并行执行。

### 1.2 工作流 vs 单次命令

| | 单次命令 | 工作流 |
|---|---|---|
| 适用场景 | 简单任务 | 复杂任务 |
| 执行方式 | 一次性 | 多步骤 |
| Agent 协作 | 单 Agent | 多 Agent |
| 状态保持 | 无 | 有 |

---

## 2. 工作流组件

### 2.1 Trigger（触发器）

触发工作流执行的条件：

| 类型 | 说明 | 示例 |
|------|------|------|
| **Cron** | 定时触发 | 每天 9:00 执行 |
| **Webhook** | HTTP 触发 | 收到特定请求 |
| **Keyword** | 关键词触发 | 用户说"帮我做..." |
| **Event** | 事件触发 | 新邮件、新文件 |

### 2.2 Agent（执行者）

工作流中的执行单元：

```json
{
  "id": "workflow-step-1",
  "name": "信息收集",
  "agent": "mo-searcher",
  "task": "搜索相关资料"
}
```

### 2.3 Action（动作）

可执行的具体操作：

| Action | 说明 |
|--------|------|
| `send_message` | 发送消息 |
| `create_task` | 创建任务 |
| `update_file` | 更新文件 |
| `call_agent` | 调用其他 Agent |
| `wait` | 等待 |
| `condition` | 条件判断 |

### 2.4 Condition（条件）

控制工作流走向：

```json
{
  "type": "condition",
  "if": {
    "status": "success",
    "then": ["step-2"],
    "else": ["step-error"]
  }
}
```

---

## 3. 工作流设计模式

### 3.1 线性流程

最简单的模式，按顺序执行：

```
[A] → [B] → [C] → [D]
```

```json
{
  "steps": [
    { "id": "a", "agent": "墨搜", "task": "搜索资料" },
    { "id": "b", "agent": "墨析", "task": "分析数据" },
    { "id": "c", "agent": "墨润", "task": "润色内容" },
    { "id": "d", "agent": "墨论", "task": "生成结论" }
  ]
}
```

### 3.2 并行流程

多个步骤同时执行：

```
    ┌─ [A] ─┐
[E] ┼─ [B] ─┤→ [F]
    └─ [C] ─┘
```

```json
{
  "steps": [
    { "id": "a", "agent": "mo-searcher", "task": "搜索A", "parallel": true },
    { "id": "b", "agent": "mo-searcher", "task": "搜索B", "parallel": true },
    { "id": "c", "agent": "mo-searcher", "task": "搜索C", "parallel": true }
  ],
  "join": {
    "type": "all",
    "next": "aggregate"
  }
}
```

### 3.3 条件分支

根据条件选择路径：

```
         ┌─ [A] ─┐
[Start] ┼─ [B] ─┤→ [Result]
         └─ [C] ─┘
```

```json
{
  "steps": [
    {
      "id": "classify",
      "type": "condition",
      "condition": "input.type",
      "branches": {
        "article": "article-workflow",
        "video": "video-workflow",
        "default": "default-workflow"
      }
    }
  ]
}
```

### 3.4 循环流程

重复执行直到满足条件：

```
[A] → [B] → [C] ─┐
          ↑      │
          └──[D]─┘
      (while D == true)
```

### 3.5 回退模式

失败时自动回退：

```
[A] → [B] → [C]
      ↓ (失败)
  [B-重试] → [C]
```

---

## 4. 工作流实战

### 4.1 案例：论文助手工作流

```
用户: 帮我研究这个主题：人工智能在医疗领域的应用
```

**完整工作流**：

```json
{
  "name": "论文研究助手",
  "trigger": "keyword:研究",
  "steps": [
    {
      "id": "search",
      "agent": "paper-墨搜",
      "task": "搜索 {topic} 相关论文，限制10篇",
      "output": "papers"
    },
    {
      "id": "analyze",
      "agent": "paper-墨析",
      "task": "分析 {papers}，提取摘要和关键发现",
      "input": "{papers}",
      "output": "analysis"
    },
    {
      "id": "polish",
      "agent": "paper-墨润",
      "task": "将 {analysis} 润色成报告格式",
      "input": "{analysis}",
      "output": "report"
    },
    {
      "id": "review",
      "agent": "paper-墨论",
      "task": "审阅 {report}，给出改进建议",
      "input": "{report}",
      "output": "final"
    },
    {
      "id": "deliver",
      "action": "send_message",
      "target": "telegram",
      "content": "{final}"
    }
  ]
}
```

### 4.2 案例：每日内容运营工作流

```
定时触发：每天 8:00
```

```json
{
  "name": "每日内容运营",
  "trigger": {
    "type": "cron",
    "expr": "0 8 * * *"
  },
  "steps": [
    {
      "id": "gather",
      "agent": "mo-yunying",
      "parallel": true,
      "tasks": [
        { "id": "news", "task": "收集今日热点新闻" },
        { "id": "trends", "task": "分析微博热搜趋势" },
        { "id": "competitors", "task": "监控竞品动态" }
      ]
    },
    {
      "id": "plan",
      "agent": "mo-yunying",
      "task": "根据收集的信息，制定今日内容计划",
      "input": "{gather}"
    },
    {
      "id": "create",
      "parallel": true,
      "tasks": [
        { "id": "post1", "agent": "mo-tui", "task": "生成微博文案" },
        { "id": "post2", "agent": "mo-tuwen", "task": "生成小红书笔记" },
        { "id": "video", "agent": "mo-bo", "task": "生成短视频脚本" }
      ]
    },
    {
      "id": "review-all",
      "agent": "mo-shen",
      "task": "审核所有生成的内容"
    },
    {
      "id": "publish",
      "condition": "review-all.status == approved",
      "then": ["publish-ready"],
      "else": ["notify-revision"]
    }
  ]
}
```

### 4.3 案例：客服工单处理工作流

```json
{
  "name": "智能客服",
  "trigger": {
    "type": "event",
    "source": "telegram",
    "event": "new_message"
  },
  "steps": [
    {
      "id": "classify",
      "agent": "mo-finance",
      "task": "分析用户问题类型：咨询/投诉/技术/其他"
    },
    {
      "id": "route",
      "type": "condition",
      "branches": {
        "咨询": "handle-inquiry",
        "投诉": "handle-complaint",
        "技术": "handle-tech",
        "其他": "handle-other"
      }
    },
    {
      "id": "handle-inquiry",
      "agent": "mo-finance",
      "task": "回复用户咨询，提供解决方案"
    },
    {
      "id": "handle-complaint",
      "agent": "mo-finance",
      "parallel": true,
      "tasks": [
        { "task": "安抚用户情绪" },
        { "task": "记录投诉内容" },
        { "task": "创建工单" }
      ]
    },
    {
      "id": "escalate",
      "condition": "complaint.level == high",
      "then": ["notify-manager"]
    },
    {
      "id": "notify-manager",
      "action": "send_message",
      "target": "telegram:manager",
      "content": "高等级投诉需要处理"
    }
  ]
}
```

---

## 5. 工作流状态管理

### 5.1 状态存储

```json
{
  "workflow_id": "wf-001",
  "status": "running",
  "current_step": "step-2",
  "context": {
    "user_input": "...",
    "step1_result": "...",
    "step2_result": "..."
  },
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:05:00Z"
}
```

### 5.2 状态持久化

```javascript
// 保存状态到文件
async function saveState(workflowId, state) {
  const path = `~/.openclaw/workflows/${workflowId}.json`;
  await fs.writeFile(path, JSON.stringify(state));
}

// 加载状态
async function loadState(workflowId) {
  const path = `~/.openclaw/workflows/${workflowId}.json`;
  return JSON.parse(await fs.readFile(path));
}
```

---

## 6. 错误处理与重试

### 6.1 重试配置

```json
{
  "step": {
    "id": "api-call",
    "task": "调用外部API",
    "retry": {
      "max_attempts": 3,
      "delay": 1000,
      "backoff": "exponential",
      "on_error": ["network", "timeout"]
    }
  }
}
```

### 6.2 错误处理策略

| 策略 | 说明 |
|------|------|
| `retry` | 重试执行 |
| `skip` | 跳过继续 |
| `fallback` | 使用备用方案 |
| `abort` | 终止工作流 |
| `notify` | 通知管理员 |

### 6.3 完整错误处理示例

```json
{
  "steps": [
    {
      "id": "risky-operation",
      "task": "调用不稳定的API",
      "on_error": {
        "strategy": "retry",
        "max_attempts": 3,
        "fallback": {
          "strategy": "skip",
          "continue_with": { "result": "cached_data" }
        }
      }
    },
    {
      "id": "critical-operation",
      "task": "必须成功的操作",
      "on_error": {
        "strategy": "abort",
        "notify": {
          "target": "admin",
          "message": "工作流失败: {error}"
        }
      }
    }
  ]
}
```

---

## 7. 工作流监控

### 7.1 Dashboard 监控

在 OpenClaw Dashboard 查看工作流状态：

```
http://localhost:18790/workflow
```

### 7.2 Cron 任务触发

```bash
# 查看工作流任务
openclaw cron list | grep workflow

# 手动触发
openclaw cron run <workflow-job-id>
```

### 7.3 日志查看

```bash
# 查看工作流日志
openclaw gateway logs --filter workflow

# 实时跟踪
openclaw gateway logs -f | grep workflow
```

---

## 8. 最佳实践

### 8.1 设计原则

1. **单一职责**：每个 Step 只做一件事
2. **松耦合**：Step 之间通过 Context 通信
3. **幂等性**：重复执行不会产生副作用
4. **可观测**：添加日志和状态追踪

### 8.2 性能优化

| 优化项 | 方法 |
|--------|------|
| 并行执行 | 独立任务同时跑 |
| 缓存结果 | 避免重复计算 |
| 异步处理 | 非关键步骤异步 |
| 限流 | 防止外部 API 过载 |

### 8.3 安全考虑

```json
{
  "workflow": {
    "allowed_agents": ["mo-finance", "mo-yunying"],
    "allowed_actions": ["send_message", "read_file"],
    "denied_actions": ["delete_file", "exec"],
    "rate_limit": {
      "max_runs_per_hour": 100
    }
  }
}
```

---

## 9. 常用工作流模板

### 9.1 内容创作模板

```json
{
  "name": "内容创作流水线",
  "trigger": "keyword:创作",
  "steps": [
    { "id": "1-选题", "agent": "mo-yunying", "task": "选择热门选题" },
    { "id": "2-收集", "agent": "mo-yunying", "task": "收集相关素材" },
    { "id": "3-生成", "agent": "mo-yunying", "task": "生成初稿" },
    { "id": "4-审核", "agent": "mo-shen", "task": "内容审核" },
    { "id": "5-发布", "action": "publish", "platforms": ["twitter", "xiaohongshu"] }
  ]
}
```

### 9.2 数据分析模板

```json
{
  "name": "数据分析流水线",
  "trigger": "keyword:分析",
  "steps": [
    { "id": "1-获取", "agent": "mo-finance", "task": "获取数据源" },
    { "id": "2-清洗", "agent": "mo-finance", "task": "数据清洗" },
    { "id": "3-分析", "agent": "mo-finance", "task": "数据分析" },
    { "id": "4-可视化", "agent": "mo-finance", "task": "生成图表" },
    { "id": "5-报告", "agent": "mo-finance", "task": "生成报告" }
  ]
}
```

### 9.3 项目汇报模板

```json
{
  "name": "项目汇报生成",
  "trigger": "keyword:汇报",
  "steps": [
    { "id": "1-收集", "agent": "openclaw-assistant", "task": "收集项目进展" },
    { "id": "2-汇总", "agent": "openclaw-assistant", "task": "汇总任务状态" },
    { "id": "3-风险", "agent": "openclaw-assistant", "task": "识别风险项" },
    { "id": "4-计划", "agent": "openclaw-assistant", "task": "制定下周计划" },
    { "id": "5-生成", "agent": "openclaw-assistant", "task": "生成汇报文档" }
  ]
}
```

---

## 10. 调试技巧

### 10.1 单步执行

```bash
# 单步执行工作流
openclaw workflow run <workflow-id> --step-by-step
```

### 10.2 查看上下文

```bash
# 查看工作流当前状态
openclaw workflow status <workflow-id>
```

### 10.3 重放执行

```bash
# 从失败步骤重新执行
openclaw workflow replay <workflow-id> --from <step-id>
```

---

_本章介绍了 OpenClaw 工作流自动化的完整体系，包括设计模式、实战案例、最佳实践等。_
