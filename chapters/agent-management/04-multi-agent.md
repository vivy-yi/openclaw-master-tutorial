# 多群多 Agent 管理

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 如果群里有多个agent呢,请对刚刚的问题再次回答,并且多agent之间还有协作关系

user: 关于多协作的agent在群里,当多个群,每个群下又有无数个agent,这样该如何管理呢

assistant: ## 群里有多个 Agent 时的协作机制

### 📊 群多 Agent 架构

```
群 (-5111532435 内容运营助手)
    │
    ├── Binding 1 → Agent A (mo-yunying 墨营 - 总监)
    │       │
    │       └── workspace: ~/.openclaw/workspaces/mo-yunying/
    │               └── 可以调用 subagents
    │
    ├── Binding 2 → Agent B (mo-youtube 墨油 - YouTube)
    │       │
    │       └── workspace: ~/.openclaw/workspaces/mo-youtube/
    │
    └── Binding 3 → Agent C (其他 Agent...)
            │
            └── workspace: ~/.openclaw/workspaces/...
```

### 🔄 多 Agent 协作方式

#### 方式 1：Subagent 委托（推荐）

使用 `sessions_spawn` 工具调用：

```
用户: "帮我做个 YouTube 视频"
    │
    ▼
mo-yunying (总监) 收到请求
    │
    ├── 判断需要 YouTube 能力
    │
    ├── 调用 sessions_spawn 启动 mo-youtube
    │
    └── mo-youtube 完成 → 返回结果给 mo-yunying
        │
        ▼
    mo-yunying 返回最终结果给用户
```

#### 方式 2：allowAgents 配置

```json
{
  "id": "mo-yunying",
  "name": "墨营",
  "workspace": "/Users/d/.openclaw/agents/mo-yunying",
  "subagents": {
    "allowAgents": ["mo-youtube", "mo-blog", "mo-podcast"]
  }
}
```

## 多群多 Agent 管理方案

### 📊 组织架构

```
Telegram 群
├─ 群 A: 内容运营助手 (-5111532435)
│   ├── mo-yunying (总监/协调者)
│   │     └── 可调用: mo-youtube, mo-blog, mo-podcast
│   ├── mo-youtube (YouTube)
│   ├── mo-blog (博客)
│   └── mo-podcast (播客)
│
├─ 群 B: 金融助手 (-1003633299525)
│   ├── jinrong (总监)
│   │     └── 可调用: 墨股神, 墨宏观, 墨策略...
│   └── ...
│
└─ 群 C: 生活助手 (-5153278498)
    └── shenghuo (生活服务)
          └── 可调用: 墨食, 墨住, 墨行...
```

### 🏗️ 管理方案

#### 1. 配置结构

```json
{
  "agents": {
    "list": [
      {"id": "mo-yunying", "workspace": "...", "subagents": {"allowAgents": ["mo-youtube", "mo-blog"]}},
      {"id": "mo-youtube", "workspace": "..."},
      ...
    ]
  },
  "bindings": [
    {"agentId": "mo-yunying", "match": {"channel": "telegram", "peer": {"kind": "group", "id": "-5111532435"}}},
    {"agentId": "mo-youtube", "match": {"channel": "telegram", "peer": {"kind": "group", "id": "-5111532435"}}},
    ...
  ]
}
```

#### 2. 推荐管理实践

1. **每群一个总监 Agent** - 作为协调者，负责分发任务
2. **同群多 Binding** - 多个 Agent 响应同一群，但由总监协调
3. **subagents 授权** - 只有总监能调用其他 Agent
4. **集中文档** - 维护一份群和 Agent 的映射表

需要我帮你生成一份管理文档或创建一个管理 Skill 吗？
