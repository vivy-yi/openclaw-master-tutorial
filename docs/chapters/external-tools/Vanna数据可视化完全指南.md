# Vanna 数据可视化框架完全指南

> Text-to-SQL + 智能数据可视化 — 23,302 Stars

---

## 一、概述

### 1.1 什么是 Vanna

| 项目 | 说明 |
|------|------|
| **定位** | 自然语言转 SQL + 数据可视化 |
| **GitHub** | https://github.com/vanna-ai/vanna |
| **语言** | Python |
| **stars** | 23,302 |
| **创建时间** | 2023-05-13 |
| **版本** | v2.0 |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│                      Vanna 核心特点                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 自然语言 → SQL → 答案                                    │
│     └── 描述问题 → 自动生成 SQL → 返回可视化结果           │
│                                                              │
│  ✅ RAG 驱动的准确性                                        │
│     └── 结合数据库 Schema 知识，确保 SQL 正确              │
│                                                              │
│  ✅ 2.0 企业级安全                                          │
│     └── 用户感知权限、行级安全、审计日志                    │
│                                                              │
│  ✅ 流式响应                                                │
│     └── 实时表格、图表、进度更新                           │
│                                                              │
│  ✅ 预构建 Web UI                                           │
│     └── <vanna-chat> 组件，开箱即用                        │
│                                                              │
│  ✅ 多数据库支持                                            │
│     └── PostgreSQL, MySQL, Snowflake, BigQuery, 等         │
│                                                              │
│  ✅ 多 LLM 支持                                            │
│     └── OpenAI, Anthropic, Ollama, Azure, Gemini, Bedrock  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 v2.0 新特性

| 特性 | 说明 |
|------|------|
| **用户感知** | 查询自动按用户权限过滤 |
| **行级安全** | 自动应用 RLS 策略 |
| **审计日志** | 追踪每个用户的查询 |
| **速率限制** | 生命周期钩子实现配额控制 |
| **流式 UI** | 实时表格、图表、进度 |

---

## 二、工作原理

### 2.1 架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  👤 用户 → "Show Q4 sales"                                      │
│                      ↓                                          │
│  🌐 <vanna-chat> Web 组件                                      │
│                      ↓                                          │
│  🐍 FastAPI 服务器（带认证）                                    │
│                      ↓                                          │
│  🤖 Vanna Agent（用户感知）                                     │
│                      ↓                                          │
│  🧰 Tools（权限过滤）→ 📊 数据库 → 📈 图表                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 核心技术

**RAG (Retrieval Augmented Generation)：**
1. 索引数据库 Schema（表结构、字段、关系）
2. 用户问题 → 检索相关 Schema 知识
3. 生成准确 SQL

### 2.3 响应流程

```
用户问题 → Agent → Tool(SQL) → 执行查询
                           ↓
              流式返回：Table → Chart → Summary
```

---

## 三、安装与配置

### 3.1 快速开始

```bash
pip install vanna
```

### 3.2 基本配置

```python
from vanna import Agent

# 初始化 Agent
vn = Agent()

# 连接到数据库（示例：PostgreSQL）
vn.connect_to_postgres(
    host="localhost",
    dbname="mydb",
    user="myuser",
    password="mypassword"
)

# 训练（索引 Schema）
vn.train()
```

### 3.3 Web 界面

```html
<!-- 嵌入现有网页 -->
<script src="https://img.vanna.ai/vanna-components.js"></script>
<vanna-chat
  sse-endpoint="https://your-api.com/chat"
  theme="dark">
</vanna-chat>
```

### 3.4 FastAPI 集成

```python
from fastapi import FastAPI
from vanna import Agent
from vanna.servers.fastapi.routes import register_chat_routes

app = FastAPI()
agent = Agent()

# 注册聊天路由
register_chat_routes(app, agent)
```

---

## 四、企业安全（v2.0）

### 4.1 用户感知

```python
# 用户识别
class MyUserResolver(UserResolver):
    def resolve_user(self, request) -> User:
        # 从 cookie/JWT 提取用户身份
        token = request.cookies.get("auth_token")
        return decode_jwt(token)

agent = Agent(user_resolver=MyUserResolver())
```

### 4.2 行级安全

```python
# 自动应用权限过滤
result = agent.run_sql(
    "Show sales by region",
    user_groups=["sales_east"]  # 只返回东部数据
)
```

### 4.3 审计日志

```python
# 每个查询都被追踪
audit_log = agent.get_audit_log(user_id="alice")
```

---

## 五、支持的数据库

| 数据库 | 支持 |
|--------|------|
| PostgreSQL | ✅ |
| MySQL | ✅ |
| Snowflake | ✅ |
| BigQuery | ✅ |
| Redshift | ✅ |
| SQLite | ✅ |
| Oracle | ✅ |
| SQL Server | ✅ |
| DuckDB | ✅ |
| ClickHouse | ✅ |

---

## 六、支持的 LLM

| LLM 提供商 | 支持 |
|------------|------|
| OpenAI | ✅ |
| Anthropic | ✅ |
| Ollama | ✅ |
| Azure OpenAI | ✅ |
| Google Gemini | ✅ |
| AWS Bedrock | ✅ |
| Mistral | ✅ |

---

## 七、输出格式

### 7.1 流式响应

**1. 进度更新**
```
Generating SQL...
```

**2. SQL 代码块**（默认仅 admin 用户可见）
```sql
SELECT region, SUM(sales) 
FROM orders 
WHERE quarter = 'Q4' 
GROUP BY region;
```

**3. 交互式数据表格**
```
| Region  | Sales   |
|---------|---------|
| East    | $1.2M   |
| West    | $980K   |
```

**4. 图表**（Plotly 可视化）

**5. 自然语言摘要**
```
Q4 sales totaled $2.18M across all regions,
with East region leading at $1.2M.
```

---

## 八、与传统 BI 对比

| 维度 | **Vanna** | 传统 BI |
|------|-----------|---------|
| **门槛** | 低（自然语言） | 高（需要 SQL） |
| **部署** | 简单（pip install） | 复杂（独立平台） |
| **成本** | 按 API 调用 | 昂贵（许可证） |
| **灵活性** | 高（自定义） | 中等 |
| **安全** | 企业级 | 企业级 |
| **适用** | 嵌入式 | 大型组织 |

---

## 九、使用场景

| 场景 | 说明 |
|------|------|
| **嵌入式分析** | 在现有应用中嵌入对话式 BI |
| **数据产品** | 快速构建数据问答功能 |
| **自助服务** | 让非技术用户也能查询数据 |
| **原型验证** | 快速验证数据分析想法 |

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/vanna-ai/vanna |
| 文档 | https://vanna.ai/docs |
| 托管版 | https://screenshottocode.com |

---

*文档版本: 2026-04-22*
