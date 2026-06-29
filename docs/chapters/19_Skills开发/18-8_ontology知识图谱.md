# 18.8 Ontology 知识图谱

> 让 Agent 拥有结构化记忆，实现实体管理和关系推理

## 概述

Ontology 是一个**类型化知识图谱**系统，用于：
- 创建/查询实体（人员、项目、任务、事件、文档）
- 链接相关对象
- 执行约束验证
- 将多步骤操作建模为图转换

## 核心概念

### 一切皆是实体

```
Entity = { id, type, properties, relations, created, updated }
Relation = { from_id, relation_type, to_id, properties }
```

每个实体都有：
- **类型**（Person、Project、Task、Event 等）
- **属性**（名称、状态、描述等）
- **关系**（与其他实体的连接）

## 内置类型

### 人员与组织

```yaml
Person: { name, email?, phone?, notes? }
Organization: { name, type?, members[] }
```

### 工作相关

```yaml
Project: { name, status, goals[], owner? }
Task: { title, status, due?, priority?, assignee?, blockers[] }
Goal: { description, target_date?, metrics[] }
```

### 时间与地点

```yaml
Event: { title, start, end?, location?, attendees[], recurrence? }
Location: { name, address?, coordinates? }
```

### 信息资源

```yaml
Document: { title, path?, url?, summary? }
Message: { content, sender, recipients[], thread? }
Note: { content, tags[], refs[] }
```

### 凭证与设备

```yaml
Account: { service, username, credential_ref? }
Device: { name, type, identifiers[] }
Credential: { service, secret_ref }
```

## 触发条件

| 触发词 | 动作 |
|--------|------|
| "Remember that..." | 创建/更新实体 |
| "What do I know about X?" | 查询图谱 |
| "Link X to Y" | 创建关系 |
| "Show all tasks for project Z" | 图遍历查询 |
| "What depends on X?" | 依赖查询 |
| Planning multi-step work | 建模为图转换 |

## 快速开始

### 1. 初始化存储

```bash
mkdir -p memory/ontology
touch memory/ontology/graph.jsonl
```

### 2. 创建实体

```bash
# 创建人员
python3 -m src.cli create --type Person --props '{"name":"Alice"}'

# 创建项目
python3 -m src.cli create --type Project --props '{"name":"Website Redesign","status":"active"}'

# 创建任务
python3 -m src.cli create --type Task --props '{"title":"Design mockups","status":"open","priority":"high"}'
```

### 3. 链接实体

```bash
# 将人员链接到项目（拥有关系）
python3 -m src.cli relate --from proj_001 --rel has_owner --to p_001

# 将任务链接到项目
python3 -m src.cli relate --from proj_001 --rel has_task --to task_001

# 链接阻塞关系
python3 -m src.cli relate --from task_002 --rel blocks --to task_001
```

### 4. 查询

```bash
# 查询特定类型的实体
python3 -m src.cli query --type Task --where '{"status":"open"}'

# 获取单个实体
python3 -m src.cli get --id task_001

# 查询关联实体
python3 -m src.cli related --id proj_001 --rel has_task
```

## 存储格式

默认存储在 `memory/ontology/graph.jsonl`（追加写入）：

```jsonl
{"op":"create","entity":{"id":"p_001","type":"Person","properties":{"name":"Alice"}}}
{"op":"create","entity":{"id":"proj_001","type":"Project","properties":{"name":"Website Redesign","status":"active"}}}
{"op":"relate","from":"proj_001","rel":"has_owner","to":"p_001"}
```

## 约束配置

在 `memory/ontology/schema.yaml` 定义约束：

```yaml
types:
  Task:
    required: [title, status]
    status_enum: [open, in_progress, blocked, done]
  
  Event:
    required: [title, start]
    validate: "end >= start if end exists"

  Credential:
    required: [service, secret_ref]
    forbidden_properties: [password, secret, token]

relations:
  has_owner:
    from_types: [Project, Task]
    to_types: [Person]
    cardinality: many_to_one
  
  blocks:
    from_types: [Task]
    to_types: [Task]
    acyclic: true
```

## 与其他 Skill 集成

### 与 Proactive Self-Improving 集成

记录因果关系：

```python
# 创建/更新实体时，同时记录到因果日志
action = {
    "action": "create_entity",
    "domain": "ontology",
    "context": {"type": "Task", "project": "proj_001"},
    "outcome": "created"
}
```

### 跨 Skill 通信

```python
# Email skill 创建承诺
commitment = ontology.create("Commitment", {
    "source_message": msg_id,
    "description": "Send report by Friday",
    "due": "2026-01-31"
})

# Task skill 接收
tasks = ontology.query("Commitment", {"status": "pending"})
```

## 使用场景

### 场景 1：论文研究管理

```
1. 创建 Researcher 实体
2. 创建 Paper 实体
3. 链接 Researcher -author_of-> Paper
4. 链接 Paper -cites-> Paper
5. 查询：找出某领域所有论文
```

### 场景 2：项目管理

```
1. 创建 Project 实体
2. 创建多个 Task 实体
3. 链接 Task 之间 blocking 关系
4. 查询：项目的关键路径
```

### 场景 3：个人知识库

```
1. 创建 Document 实体
2. 创建 Note 实体
3. 链接 Document -has_note-> Note
4. 查询：某主题所有相关文档
```

## 安装

```bash
# 克隆到 skills 目录
git clone https://github.com/hiveminderbot/ontology.git ~/.openclaw/skills/ontology

# 运行测试
cd ~/.openclaw/skills/ontology
python3 -m pytest tests/ -v
```

## 最佳实践

1. **追加而非覆盖** - 保护历史记录
2. **定义约束** - 防止无效数据
3. **定期验证** - `python3 -m src.cli validate`
4. **链接关系** - 实体价值在于关系网络

---

## 相关资源

- [Ontology GitHub](https://github.com/hiveminderbot/ontology)
- [Schema 参考](../18_Skills开发/18-8_ontology知识图谱.md)
- [Query 模式参考](../18_Skills开发/18-9_proactive-self-improving.md)
