# 知识图谱 Skills 完整教程

> 本章介绍 OpenClaw 知识图谱相关 Skills：ontology 和 ontology-engineer，帮助你构建结构化知识管理体系。

---

## 1. 知识图谱概述

### 1.1 什么是知识图谱

知识图谱是一种用图结构表示知识的方法，由**实体（Entity）**和**关系（Relation）**组成：

```
        ┌─────────────┐
        │   Person    │
        │    Alice     │
        └──────┬──────┘
               │ has_owner
               ▼
        ┌─────────────┐
        │   Project    │
        │   Website    │
        └──────┬──────┘
               │ has_task
               ▼
        ┌─────────────┐
        │    Task     │
        │  Homepage   │
        └─────────────┘
```

### 1.2 为什么需要知识图谱

| 场景 | 传统方式 | 知识图谱 |
|------|----------|----------|
| 查询关联 | 手动翻找 | 一键查询 |
| 关系维护 | 散落各处 | 统一管理 |
| 推理发现 | 人工分析 | 自动遍历 |
| 知识共享 | 口口相传 | 结构化存储 |

### 1.3 OpenClaw 知识图谱 Skills

| Skill | 功能 | 适用场景 |
|-------|------|----------|
| **ontology** | 实体/关系 CRUD、约束验证、图遍历 | 日常知识管理 |
| **ontology-engineer** | 本体提取、文件扫描、数据库分析 | 构建知识库 |

---

## 2. 安装与配置

### 2.1 已安装 Skills

```bash
~/.openclaw/skills/
├── ontology/                 # 知识图谱核心
│   ├── SKILL.md
│   ├── src/                 # Python 模块
│   └── references/          # 参考文档
└── ontology-engineer/      # 本体工程
    ├── SKILL.md
    ├── scripts/             # 扫描脚本
    └── references/          # 参考文档
```

### 2.2 初始化存储目录

```bash
# 创建知识图谱存储目录
mkdir -p memory/ontology

# 初始化 graph.jsonl (追加日志)
touch memory/ontology/graph.jsonl
```

### 2.3 Python 环境配置

```bash
# ontology 环境
cd ~/.openclaw/skills/ontology
uv venv .venv
source .venv/bin/activate
uv pip install pytest pyyaml

# ontology-engineer 环境
cd ~/.openclaw/skills/ontology-engineer
uv venv .venv
source .venv/bin/activate
uv pip install python-docx PyMuPDF openpyxl Pillow pyyaml
```

---

## 3. ontology 核心概念

### 3.1 实体（Entity）

实体是知识图谱的基本单元：

```json
{
  "id": "person_alice",
  "type": "Person",
  "properties": {
    "name": "Alice",
    "email": "alice@example.com",
    "role": "Engineer"
  },
  "relations": [],
  "created": "2026-03-30T10:00:00Z",
  "updated": "2026-03-30T10:00:00Z"
}
```

### 3.2 关系（Relation）

关系连接两个实体：

```json
{
  "from_id": "person_alice",
  "relation_type": "has_owner",
  "to_id": "project_website",
  "properties": {
    "since": "2026-01-01",
    "role": "lead"
  }
}
```

### 3.3 内置类型

#### 人员与组织

| 类型 | 必需属性 | 可选属性 |
|------|----------|----------|
| Person | name | email, phone, role, notes |
| Organization | name | type, members |

#### 项目与任务

| 类型 | 必需属性 | 可选属性 |
|------|----------|----------|
| Project | name, status | goals, owner |
| Task | title, status | due, priority, assignee, blockers |
| Goal | description | target_date, metrics |

#### 事件与文档

| 类型 | 必需属性 | 可选属性 |
|------|----------|----------|
| Event | title, start | end, location, attendees |
| Document | - | title, path, url, summary |

#### 资源与账户

| 类型 | 必需属性 | 可选属性 |
|------|----------|----------|
| Account | service, username | credential_ref |
| Credential | service, secret_ref | - |

### 3.4 内置关系类型

| 关系 | 从 | 到 | 说明 |
|------|----|----|------|
| has_owner | Project, Task | Person | 拥有者 |
| has_member | Organization, Project | Person | 成员 |
| has_task | Project, Person | Task | 包含任务 |
| blocks | Task | Task | 阻塞 |
| has_project | Person, Organization | Project | 参与项目 |
| related_to | 任意 | 任意 | 关联 |
| assigned_to | Task | Person | 指派 |

---

## 4. ontology 使用方法

### 4.1 命令行接口

#### 创建实体

```bash
# 创建 Person
python3 -m src.cli create \
  --type Person \
  --props '{"name":"Alice","email":"alice@example.com"}'

# 创建 Project
python3 -m src.cli create \
  --type Project \
  --props '{"name":"Website","status":"active"}'

# 创建 Task
python3 -m src.cli create \
  --type Task \
  --props '{"title":"Design homepage","status":"open"}'
```

#### 查询实体

```bash
# 列出所有 Person
python3 -m src.cli list --type Person

# 查询特定 ID
python3 -m src.cli get --id person_alice

# 条件查询
python3 -m src.cli query \
  --type Task \
  --where '{"status":"open"}'
```

#### 关系操作

```bash
# 关联实体
python3 -m src.cli relate \
  --from person_alice \
  --rel has_owner \
  --to project_website

# 查询关联
python3 -m src.cli related \
  --id project_website \
  --rel has_owner

# 查询依赖
python3 -m src.cli related \
  --id task_homepage \
  --rel blocks
```

#### 验证与约束

```bash
# 验证图谱
python3 -m src.cli validate

# 查看 schema
python3 -m src.cli schema-show
```

### 4.2 Python API

```python
from src.services.entity_service import create_entity, query_entities, get_entity
from src.services.relation_service import create_relation, get_relations
from src.services.validation_service import validate_graph

# 创建实体
alice = create_entity(
    entity_type="Person",
    properties={"name": "Alice", "email": "alice@example.com"},
    storage_path="memory/ontology/graph.jsonl"
)

# 查询实体
tasks = query_entities(
    entity_type="Task",
    conditions={"status": "open"},
    storage_path="memory/ontology/graph.jsonl"
)

# 关联关系
create_relation(
    from_id=alice["id"],
    relation_type="owns",
    to_id=project["id"],
    properties={"since": "2026-01-01"},
    storage_path="memory/ontology/graph.jsonl"
)

# 验证图谱
errors = validate_graph(
    storage_path="memory/ontology/graph.jsonl",
    schema_path="memory/ontology/schema.yaml"
)
```

### 4.3 自然语言触发

当你对 OpenClaw 说以下内容时，会自动使用 ontology：

| 触发语句 | 执行的 Action |
|----------|---------------|
| "记住 Alice 负责网站项目" | 创建 Person + Project + 关系 |
| "Alice 负责哪些项目？" | 查询 Person → has_owner → Project |
| "把任务 A 关联到项目 B" | 创建 relation |
| "这个项目依赖哪些任务？" | 图遍历查询 |
| "显示我的所有任务" | 查询 Task |

---

## 5. ontology-engineer 使用方法

### 5.1 三种工作模式

| 模式 | 输入 | 输出 | 适用场景 |
|------|------|------|----------|
| **A: 数据库提取** | SQL DDL, Excel/Word 数据字典 | ontology.json + review.md | 企业系统分析 |
| **B: 文件扫描** | 本地目录 | graph.jsonl + schema.yaml | 个人知识库 |
| **C: 外部数据** | 共享文件夹 | graph.jsonl | 客户数据 |

### 5.2 模式 A：数据库提取

#### Phase 1: SCAN

```bash
python scripts/scan_directory.py "/path/to/ddl/files" \
  --output scan_result.json \
  --report
```

扫描结果示例：

```json
{
  "P1": ["schema.sql", "data_dictionary.xlsx"],
  "P2": ["table_definitions.docx"],
  "P3": ["erd_diagram.pdf"]
}
```

#### Phase 2: EXTRACT

```bash
# 提取 SQL 表结构
cat schema.sql | python scripts/extract_tables.py

# 提取 Excel 数据字典
python scripts/extract_tables.py \
  --input data_dictionary.xlsx \
  --format excel
```

#### Phase 3: MERGE

```bash
# 合并多个来源的本体
python scripts/merge_ontology.py \
  --inputs source1.json source2.json \
  --output merged_ontology.json
```

### 5.3 模式 B：文件扫描

#### Step 1: 指定目录

```bash
# 指定要扫描的目录
python scripts/scan_directory.py "/Users/d/Projects" \
  --output scan_result.json
```

#### Step 1.5: 确认扫描 ⭐（必须）

**这是强制步骤**，在扫描任何内容前必须获得用户确认。

```
⚠️ 安全确认
即将扫描以下目录：
/Users/d/Projects/work
/Users/d/Projects/personal

是否继续？ (yes/no)
```

#### Step 2: 索引文件

```bash
python scripts/scan_filesystem.py \
  --input scan_result.json \
  --output graph.jsonl \
  --schema schema.yaml
```

#### 支持的文件格式

| 格式 | 扩展名 | 处理方式 |
|------|--------|----------|
| Word | .docx, .doc | python-docx |
| Excel | .xlsx, .xls, .et | openpyxl |
| PowerPoint | .pptx, .ppt, .dps | python-pptx |
| PDF | .pdf | PyMuPDF |
| Markdown | .md | 直接读取 |
| SQL | .sql | 直接读取 |
| JSON/YAML | .json, .yaml | 直接读取 |
| CSV | .csv | 直接读取 |

### 5.4 提取规则

#### 实体识别规则

1. **人名** → Person
2. **公司/组织名** → Organization
3. **项目代号** → Project
4. **任务/待办项** → Task
5. **日期+事件** → Event
6. **文件路径** → Document
7. **数值指标** → Metric

#### 关系发现规则

1. **"负责"、"管理"** → has_owner
2. **"包含"、"属于"** → has_member / has_task
3. **"依赖"、"阻塞"** → depends_on / blocks
4. **"相关"、"类似"** → related_to

---

## 6. 实战案例

### 6.1 案例：构建项目知识图谱

**场景**：Alice 正在开发一个网站项目，需要管理项目相关的所有信息。

#### Step 1: 创建项目结构

```
Alice:
  - 负责项目: Website Redesign
    - 包含任务:
      - Design homepage (负责人: Alice, 状态: open)
      - Implement API (负责人: Bob, 状态: open)
      - Write tests (依赖: Implement API)
    - 截止日期: 2026-04-15
```

#### Step 2: 执行命令

```bash
# 创建 Person
python3 -m src.cli create \
  --type Person \
  --props '{"name":"Alice","role":"Tech Lead"}'

python3 -m src.cli create \
  --type Person \
  --props '{"name":"Bob","role":"Backend Engineer"}'

# 创建 Project
python3 -m src.cli create \
  --type Project \
  --props '{"name":"Website Redesign","status":"active"}'

# 创建 Tasks
python3 -m src.cli create \
  --type Task \
  --props '{"title":"Design homepage","status":"open"}'

python3 -m src.cli create \
  --type Task \
  --props '{"title":"Implement API","status":"open"}'

python3 -m src.cli create \
  --type Task \
  --props '{"title":"Write tests","status":"open"}'

# 建立关系
python3 -m src.cli relate --from alice --rel has_owner --to website
python3 -m src.cli relate --from bob --rel has_member --to website
python3 -m src.cli relate --from website --rel has_task --to task_homepage
python3 -m src.cli relate --from website --rel has_task --to task_api
python3 -m src.cli relate --from website --rel has_task --to task_tests
python3 -m src.cli relate --from task_tests --rel blocks --to task_api
```

#### Step 3: 查询

```bash
# Alice 负责哪些项目？
python3 -m src.cli query --type Project --where '{}'
# 返回: Website Redesign

# 项目有哪些任务？
python3 -m src.cli related --id website --rel has_task
# 返回: Design homepage, Implement API, Write tests

# 任务的依赖关系？
python3 -m src.cli related --id task_tests --rel blocks
# 返回: Implement API
```

### 6.2 案例：从文件构建知识图谱

**场景**：扫描工作目录，自动提取项目结构。

#### Step 1: 扫描目录

```bash
python scripts/scan_directory.py "/Users/d/Work/ProjectX" \
  --output scan_result.json
```

#### Step 2: 用户确认

```
即将分析以下文件：
- /Users/d/Work/ProjectX/README.md
- /Users/d/Work/ProjectX/docs/api.md
- /Users/d/Work/ProjectX/src/main.py

继续扫描？ (yes/no)
```

#### Step 3: 生成图谱

```bash
python scripts/scan_filesystem.py \
  --input scan_result.json \
  --output memory/ontology/graph.jsonl \
  --schema memory/ontology/schema.yaml
```

#### 输出示例

```jsonl
{"op":"create","entity":{"id":"proj_projectx","type":"Project","properties":{"name":"ProjectX","status":"active"}}}
{"op":"create","entity":{"id":"doc_api","type":"Document","properties":{"title":"API Documentation","path":"/docs/api.md"}}}
{"op":"create","entity":{"id":"task_auth","type":"Task","properties":{"title":"Implement Auth","status":"open"}}}
{"op":"relate","from":"proj_projectx","rel":"has_task","to":"task_auth"}
{"op":"relate","from":"task_auth","rel":"related_to","to":"doc_api"}
```

### 6.3 案例：数据库表结构提取

**场景**：分析遗留数据库，理解表关系。

#### Step 1: 扫描 DDL 文件

```bash
python scripts/scan_directory.py "/Users/d/legacy/db" \
  --output scan_result.json
```

#### Step 2: 提取表结构

```bash
cat schema.sql | python scripts/extract_tables.py \
  --format sql \
  --output tables.json
```

#### 输出

```json
{
  "tables": [
    {
      "name": "users",
      "columns": ["id", "name", "email", "created_at"],
      "primary_key": "id"
    },
    {
      "name": "orders",
      "columns": ["id", "user_id", "amount", "created_at"],
      "foreign_keys": [{"column": "user_id", "references": "users.id"}]
    }
  ]
}
```

#### Step 3: 生成 Ontology

```json
{
  "entities": [
    {"type": "Entity", "name": "users", "category": "table"},
    {"type": "Entity", "name": "orders", "category": "table"}
  ],
  "relations": [
    {"from": "orders", "rel": "belongs_to", "to": "users"}
  ]
}
```

---

## 7. Schema 约束配置

### 7.1 定义约束

在 `memory/ontology/schema.yaml` 中定义约束：

```yaml
types:
  Person:
    required: [name]
    properties:
      name: string
      email: string?
      role: enum[engineer, manager, designer]?
  
  Task:
    required: [title, status]
    properties:
      title: string
      status: enum[open, in_progress, blocked, done]
      priority: enum[low, medium, high, urgent]?
    validate: "priority != urgent OR status != done"

relations:
  has_owner:
    from_types: [Project, Task]
    to_types: [Person]
    cardinality: many_to_one
  
  blocks:
    from_types: [Task]
    to_types: [Task]
    acyclic: true  # 禁止循环依赖
```

### 7.2 验证规则

| 规则类型 | 说明 | 示例 |
|----------|------|------|
| required | 必需属性 | name: required |
| enum | 枚举值 | status: [open, done] |
| forbidden | 禁止属性 | password: forbidden |
| cardinality | 基数约束 | many_to_one |
| acyclic | 无环约束 | blocks: acyclic |

---

## 8. 与其他 Skills 集成

### 8.1 与 system-lifecycle-manager 集成

```python
# 在 system-lifecycle-manager 中记录学习
commitment = ontology.create("Commitment", {
    "source_message": msg_id,
    "description": "完成网站首页设计",
    "due": "2026-04-01"
})

# 转化为任务
task = ontology.create("Task", {
    "title": commitment["description"],
    "due": commitment["due"],
    "source": commitment["id"],
    "status": "open"
})

ontology.relate(task, "related_to", commitment)
```

### 8.2 与 memory 系统集成

```python
# 从 memory 中提取结构化信息
recent_decisions = memory.get_recent("decisions")

for decision in recent_decisions:
    ontology.create("Decision", {
        "content": decision["content"],
        "timestamp": decision["timestamp"],
        "context": decision["context"]
    })
```

### 8.3 与 Agent 协作

```python
# Agent 间共享知识
# Agent A: 记录决策
ontology.create("Decision", {
    "content": "采用微服务架构",
    "rationale": "可扩展性强"
})

# Agent B: 查询决策
decisions = ontology.query("Decision", {
    "content": "架构"
})
```

---

## 9. 最佳实践

### 9.1 命名规范

| 类型 | 命名格式 | 示例 |
|------|----------|------|
| Person | person_{name_lowercase} | person_alice |
| Project | project_{name_slug} | project_website |
| Task | task_{action_slug} | task_design_homepage |
| Relation | snake_case | has_owner, blocks |

### 9.2 ID 生成规则

```python
import hashlib

def generate_id(entity_type, name):
    slug = name.lower().replace(" ", "_")
    hash_suffix = hashlib.md5(name.encode()).hexdigest()[:6]
    return f"{entity_type}_{slug}_{hash_suffix}"
```

### 9.3 图谱维护

| 操作 | 建议 |
|------|------|
| 新增实体 | 直接 append 到 graph.jsonl |
| 更新实体 | append 更新操作，不修改原记录 |
| 删除实体 | 标记 deleted=True，不物理删除 |
| 定期验证 | 每周运行 validate 检查完整性 |

### 9.4 性能优化

| 数据量 | 推荐存储 | 查询方式 |
|--------|----------|----------|
| < 1000 实体 | JSONL | 内存加载 |
| 1000 - 10000 | SQLite | SQL 查询 |
| > 10000 | Neo4j | 图数据库 |

---

## 10. 常见问题

### Q1: 如何备份知识图谱？

```bash
# 复制 graph.jsonl 和 schema.yaml
cp memory/ontology/graph.jsonl memory/ontology/graph.jsonl.bak
cp memory/ontology/schema.yaml memory/ontology/schema.yaml.bak
```

### Q2: 如何迁移到新环境？

```bash
# 导出
tar -czf ontology_backup.tar.gz memory/ontology/

# 导入
tar -xzf ontology_backup.tar.gz
```

### Q3: 图谱太慢怎么办？

```python
# 迁移到 SQLite
from src.utils.graph_loader import migrate_to_sqlite

migrate_to_sqlite(
    source="memory/ontology/graph.jsonl",
    target="memory/ontology/graph.db"
)
```

### Q4: 如何处理冲突？

当多个来源对同一实体有不同定义时：

1. 保留所有版本
2. 标记冲突标记
3. 人工审核合并

---

## 11. 进阶话题

### 11.1 因果推理

```python
# 记录因果链
ontology.create("CauseEffect", {
    "cause": "增加超时配置",
    "effect": "任务成功率提升",
    "confidence": 0.85,
    "evidence": ["日志1", "日志2"]
})
```

### 11.2 时序知识

```python
# 记录时间线
ontology.create("Timeline", {
    "entity_id": "project_website",
    "events": [
        {"date": "2026-01-01", "event": "项目启动"},
        {"date": "2026-02-01", "event": "完成设计"},
        {"date": "2026-03-01", "event": "上线发布"}
    ]
})
```

### 11.3 概率知识

```python
# 记录不确定性
ontology.create("Probability", {
    "entity_id": "task_api",
    "outcome": "按时完成",
    "probability": 0.75,
    "factors": ["团队经验", "技术难度"]
})
```

---

## 12. 参考资源

| 资源 | 路径 |
|------|------|
| ontology schema 参考 | `references/schema.md` |
| ontology 查询示例 | `references/queries.md` |
| ontology-engineer 价值场景 | `references/value-scenarios.md` |
| ontology-engineer 分析规则 | `references/analysis-rules.md` |

---

_本章介绍了 OpenClaw 知识图谱 Skills 的完整使用方法，包括安装配置、核心概念、命令行/ API 用法、实战案例和最佳实践。_
