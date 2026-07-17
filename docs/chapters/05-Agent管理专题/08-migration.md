# 从 clawd 迁移

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 现在我的电脑上有很多clawd里的文件,请问如何根据之前我们讨论的群,多agent,多agent协作等移植到对应的~/.openclaw/

assistant: ## 深度迁移方案：~/clawd → ~/.openclaw

### 📊 当前状态分析

| 源目录 | 内容 | 目标 |
|--------|------|------|
| `~/clawd/workspaces/mo-yunying` | 内容运营工作空间 | → `~/.openclaw/workspaces/mo-yunying` ✅ 已存在 |
| `~/clawd/agents/teams/内容运营团队/agents/` | 24个 Agent | → `~/.openclaw/workspaces/` 或 `~/.openclaw/agents/` |
| `~/clawd/agents/teams/金融团队/` | 金融团队多个部门 | → `~/.openclaw/workspaces/mo-finance/` |
| `~/clawd/agents/元团队/` | 元团队架构 | → `~/.openclaw/` 根目录 |

---

### 🎯 迁移架构设计

基于**群 → Agent → 协作**的架构，建议如下：

```
~/.openclaw/
│
├── workspaces/                    ← Agent 工作空间（定义文件）
│   ├── mo-yunying/               ← 内容运营总监
│   │   ├── SOUL.md
│   │   └── AGENTS.md             ← 定义可调度的 subagents
│   ├── mo-youtube/               ← YouTube Agent
│   ├── mo-blog/                  ← 博客 Agent
│   ├── mo-podcast/               ← 播客 Agent
│   ├── mo-finance/                ← 金融团队
│   └── mo-shenghuo/              ← 生活服务
│
├── agents/                        ← Agent 状态（会话历史）
│   ├── mo-yunying/
│   ├── mo-youtube/
│   └── ...
│
└── openclaw.json                  ← 配置文件
```

---

### 📋 迁移步骤

#### 1. 内容运营团队（已部分迁移）

| Agent | 源位置 | 目标位置 | 状态 |
|-------|--------|----------|------|
| 总监 (mo-yunying) | clawd | `~/.openclaw/workspaces/mo-yunying/` | ✅ 已存在 |
| 墨推 | clawd | `~/.openclaw/workspaces/mo-tui/` | ⬜ 待迁移 |
| 墨播 | clawd | `~/.openclaw/workspaces/mo-bo/` | ⬜ 待迁移 |
| 墨记 | clawd | `~/.openclaw/workspaces/mo-ji/` | ⬜ 待迁移 |
| 墨星 | clawd | `~/.openclaw/workspaces/mo-xing/` | ⬜ 待迁移 |
| ... | | | |

#### 2. 金融团队

| Agent | 源位置 | 目标位置 |
|-------|--------|----------|
| jinrong | clawd | `~/.openclaw/workspaces/jinrong/` |
| 墨股神 | clawd | `~/.openclaw/workspaces/mo-gushen/` |
| 墨宏观 | clawd | `~/.openclaw/workspaces/mo-hongguan/` |

#### 3. 配置更新

```bash
# 修改 openclaw.json，添加新 Agent
jq '.agents.list += [
  {"id": "mo-tui", "name": "墨推", "workspace": "~/.openclaw/workspaces/mo-tui"},
  ...
]' ~/.openclaw/openclaw.json > /tmp/openclaw.json

# 添加 bindings
jq '.bindings += [
  {"agentId": "mo-tui", "match": {"channel": "telegram", "peer": {"kind": "group", "id": "-5111532435"}}}
]' /tmp/openclaw.json > ~/.openclaw/openclaw.json
```

---

### 🔄 协作关系迁移

基于 clawd 中的团队架构，保留协作关系：

```markdown
## 内容运营团队协作
- 总监 (mo-yunying) → 可调用: 墨推, 墨播, 墨记, 墨星, 墨拍, 墨短, 墨社
- 墨推 → 负责推广内容
- 墨播 → 负责视频/播客
- ...

## 金融团队协作
- jinrong (总监) → 可调用: 墨股神, 墨宏观, 墨策略...
```

---

### ⚠️ 注意事项

1. **先备份** - 迁移前备份 `~/.openclaw/`
2. **逐个迁移** - 每次迁移一个 Agent，验证后再继续
3. **保留状态** - 如果需要保留会话历史，迁移 `agents/` 目录
4. **更新配置** - 每个新 Agent 都需要添加到 `openclaw.json`

---

### 💡 建议

**优先级顺序**：
1. 先迁移**内容运营团队**的核心 Agent（墨推、墨播等）
2. 再迁移**金融团队**的 Agent
3. 最后迁移其他团队

需要我帮你开始迁移具体某个团队吗？
