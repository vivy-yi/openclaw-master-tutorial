# Workspace 架构

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 还有一个问题,关于群会话的workspace和agent的workspace的区别

assistant: ## 群会话 Workspace vs Agent Workspace 区别

### 📁 两种 Workspace

| 类型 | 路径 | 说明 |
|------|------|------|
| **Agent Workspace** | `~/.openclaw/workspaces/<agent_id>/` | Agent 的"大脑"，存放 SOUL.md、AGENTS.md 等定义文件 |
| **Agent State** | `~/.openclaw/agents/<agent_id>/` | Agent 的状态，存放 sessions、memory 等运行时数据 |

### 🎯 具体例子

以 **内容运营群 (-5111532435)** 为例：

```
📂 ~/.openclaw/workspaces/mo-youtube/     ← Agent 工作空间
├── SOUL.md      ← Agent 角色定义
├── AGENTS.md    ← Agent 指令
└── TOOLS.md     ← 工具说明

📂 ~/.openclaw/agents/mo-youtube/        ← Agent 状态
├── sessions/   ← 对话历史
└── memory/     ← 记忆数据
```

### 🔄 群会话与 Agent 的关系

```
群 (-5111532435)
    │
    ├── Binding 绑定
    │
    ▼
Agent (mo-yunying / mo-youtube)
    │
    ├── workspace: ~/.openclaw/workspaces/mo-youtube/  ← 定义
    │
    └── agentDir: ~/.openclaw/agents/mo-youtube/     ← 状态
```

### 💡 关键区别

| 方面 | Agent Workspace | 群会话 |
|------|----------------|--------|
| **作用** | 定义 Agent 是谁、做什么 | 当前对话的上下文 |
| **持久性** | 静态配置 | 动态生成 |
| **文件** | SOUL.md, AGENTS.md | sessions/*.jsonl |
| **修改频率** | 偶尔修改 | 每次对话都变 |

---

### 📌 总结

- **Workspace** = Agent 的"身份"，定义它是什么角色
- **群会话** = 每次对话的"临时状态"，记录说过什么
- 群绑定 Agent → Agent 使用自己的 Workspace → 生成会话历史

这样清楚了吗？
