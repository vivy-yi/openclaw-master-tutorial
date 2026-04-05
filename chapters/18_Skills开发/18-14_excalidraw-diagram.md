# Excalidraw 图表绘制 Skill 教程

> 本章介绍如何使用 OpenClaw 的 Excalidraw Skill 生成各种图表、流程图和架构图。

---

## 1. Excalidraw 概述

### 1.1 什么是 Excalidraw

Excalidraw 是一个开源的绘图工具，以手绘风格著称，特别适合绘制：
- 架构图
- 流程图
- 系统示意图
- 用户界面原型

### 1.2 OpenClaw Excalidraw Skill

| 属性 | 值 |
|------|-----|
| **Skill 名称** | excalidraw |
| **功能** | 生成 .excalidraw 文件 + 导出 PNG/SVG |
| **触发词** | 画图、diagram、流程图、架构图、visualize |
| **导出格式** | SVG（在线）、PNG（本地） |

---

## 2. 安装与配置

### 2.1 Skill 安装

**方式一：GitHub 安装**
```bash
git clone https://github.com/Agents365-ai/excalidraw-skill.git ~/.openclaw/skills/excalidraw
```

**方式二：ClawHub 安装**
```bash
clawhub install excalidraw
```

### 2.2 导出工具安装 ✅ 已完成

#### Kroki API（SVG）- 无需额外安装
```bash
# 验证 curl 可用
curl --version
```

#### 本地 CLI（PNG + SVG）- ✅ 已安装
```bash
# 安装 CLI 工具
npm install -g excalidraw-brute-export-cli

# 安装 Firefox 浏览器（用于 PNG 导出）
npx playwright install firefox

# 验证安装
excalidraw-export --version
```

### 2.3 导出方式对比

| 方式 | 格式 | 质量 | 速度 | 需要安装 |
|------|------|------|------|----------|
| **Kroki API** | SVG | ⭐⭐⭐⭐ | 快 | 仅 curl ✅ |
| **本地 CLI** | PNG + SVG | ⭐⭐⭐⭐⭐ | 较慢 | Firefox ✅ |

### 2.4 安装验证

```bash
# 验证 Skill
ls ~/.openclaw/skills/excalidraw/

# 验证 CLI
excalidraw-export --help

# 验证 Firefox
which firefox
# 或检查: ~/Library/Caches/ms-playwright/firefox-*/
```

---

## 3. 快速开始

### 3.1 基本语法

```
帮我画一个简单的用户登录流程图
```

```
创建一个微服务架构图
```

### 3.2 支持的图表类型

| 类型 | 触发词 | 示例 |
|------|---------|------|
| 流程图 | flowchart, 流程图 | 用户登录流程 |
| 架构图 | architecture, 架构图 | 微服务架构 |
| UML 图 | UML, 类图 | 类关系图 |
| ER 图 | ER, 数据库 | 表关系图 |
| 时间线 | timeline | 项目计划 |
| 思维导图 | mindmap | 脑图 |
| 网络图 | network | 网络拓扑 |

---

## 4. 图表类型详解

### 4.1 流程图 (Flowchart)

**触发**：`帮我画一个用户登录的流程图`

**输出示例**：

```
┌─────────────┐
│   开始      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 输入用户名   │
└──────┬──────┘
       │
       ▼
┌─────────────┐     是    ┌─────────────┐
│ 验证用户名   ├──────────→│ 登录成功   │
└──────┬──────┘           └─────────────┘
       │
       否
       ▼
┌─────────────┐
│ 显示错误   │
└─────────────┘
```

### 4.2 架构图 (Architecture)

**触发**：`创建一个微服务架构图`

**输出示例**：

```
                              ┌─────────────────┐
                              │   Load Balancer  │
                              └────────┬────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
              ▼                        ▼                        ▼
     ┌────────────────┐      ┌────────────────┐      ┌────────────────┐
     │  API Gateway   │      │  API Gateway   │      │  API Gateway   │
     └───────┬────────┘      └───────┬────────┘      └───────┬────────┘
             │                        │                        │
             ▼                        ▼                        ▼
     ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
     │ Auth Service  │      │ User Service  │      │ Order Service │
     └───────────────┘      └───────────────┘      └───────────────┘
             │                        │                        │
             └────────────────────────┼────────────────────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │     Database    │
                             └─────────────────┘
```

### 4.3 UML 类图

**触发**：`画一个电商系统的 UML 类图`

**输出示例**：

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ - id: int          │
│ - name: string     │
│ - email: string     │
├─────────────────────┤
│ + login()          │
│ + logout()         │
│ + update()         │
└─────────────────────┘
              △
              │
              │ implements
              │
┌─────────────────────┐
│    Customer        │◄──────────────┐
├─────────────────────┤               │
│ - cart: Cart[]     │               │ has
└─────────┬───────────┘               │
          │                    ┌─────────┴─────────┐
          │                    │       Order        │
          │ has              ├─────────────────────┤
          ▼                    │ - id: int          │
┌─────────────────────┐       │ - date: datetime  │
│       Cart          │       │ - status: string │
├─────────────────────┤       └─────────┬─────────┘
│ - items: Item[]    │                 │
│ - total: float     │                 │
└─────────────────────┘                 │
                                      │
┌─────────────────────┐               │
│       Item          │◄──────────────┘
├─────────────────────┤        contains
│ - product: Product  │
│ - quantity: int     │
└─────────────────────┘
```

### 4.4 数据库 ER 图

**触发**：`创建一个博客系统的 ER 图`

**输出示例**：

```
┌─────────────────┐         ┌─────────────────┐
│     users       │         │    posts       │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │──┐      │ id (PK)         │
│ username        │  │      │ user_id (FK)    │──┐
│ email           │  └──────│ title           │  │
│ password_hash   │         │ content         │  │
└─────────────────┘         │ created_at      │  │
                            └─────────────────┘  │
                                                │
              ┌─────────────────┐              │
              │    comments     │◄─────────────┘
              ├─────────────────┤
              │ id (PK)         │
              │ post_id (FK)    │──┐
              │ user_id (FK)    │──┘
              │ content         │
              │ created_at      │
              └─────────────────┘
```

### 4.5 时间线图

**触发**：`画一个项目计划时间线`

**输出示例**：

```
项目计划时间线
═══════════════════════════════════════════════════════════

Phase 1          Phase 2          Phase 3          Phase 4
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 需求分析  │    │   设计    │    │   开发    │    │   测试   │
└─────┬────┘    └─────┬────┘    └─────┬────┘    └─────┬────┘
      │                │                │                │
      ▼                ▼                ▼                ▼
   3/1-3/10       3/11-3/20       3/21-4/10       4/11-4/20

      │                │                │                │
      └────────────────┴────────────────┴────────────────┘
                              │
                              ▼
                       4/21 上线
```

### 4.6 网络拓扑图

**触发**：`画一个典型的 Web 应用网络拓扑`

**输出示例**：

```
                         ┌─────────────┐
                         │   Internet  │
                         └──────┬──────┘
                                │
                     ┌──────────┴──────────┐
                     │    CDN / WAF         │
                     └──────────┬──────────┘
                                │
                     ┌──────────┴──────────┐
                     │    Load Balancer     │
                     └──────────┬──────────┘
                                │
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
           ▼                     ▼                     ▼
    ┌────────────┐       ┌────────────┐       ┌────────────┐
    │  Server 1  │       │  Server 2  │       │  Server 3  │
    │  (Web)     │       │  (Web)     │       │  (Web)     │
    └──────┬─────┘       └──────┬─────┘       └──────┬─────┘
           │                     │                     │
           └─────────────────────┼─────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
           ┌─────────────┐            ┌─────────────┐
           │   Master    │◄──────────│    Slave    │
           │  Database   │            │  Database  │
           └─────────────┘            └─────────────┘
```

---

## 5. 高级用法

### 5.1 自定义样式

```
用蓝色主题画一个 API 架构图
```

```
创建一个暗色模式的系统架构图
```

### 5.2 多图表组合

```
画一个完整的电商系统架构，包含：
1. 用户端 App
2. API Gateway
3. 微服务（用户、商品、订单、支付）
4. 数据库
5. 消息队列
```

### 5.3 添加注释

```
创建一个微服务架构图，并标注每个服务的职责
```

### 5.4 交互式图表

```
画一个决策树，表示用户注册流程的选择逻辑
```

---

## 6. 输出格式

### 6.1 .excalidraw 文件

原始 JSON 格式，可在 https://excalidraw.com 打开编辑

```json
{
  "type": "excalidraw",
  "version": 2,
  "elements": [
    {
      "id": "rect-1",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 200,
      "height": 100,
      "fillStyle": "solid"
    }
  ]
}
```

### 6.2 SVG 导出

```bash
# 通过 Kroki API 导出 SVG
curl -X POST https://kroki.io/excalidraw/svg \
  -d @diagram.excalidraw \
  -H "Content-Type: application/json"
```

### 6.3 PNG 导出

```bash
# 使用本地 CLI 导出 PNG
excalidraw-export diagram.excalidraw --format png --output ./output/
```

---

## 7. 实战案例

### 7.1 案例：API 架构图

**触发**：
```
创建一个 API Gateway + 微服务的架构图，包含：
- API Gateway（统一入口）
- Auth Service（认证）
- User Service（用户）
- Product Service（商品）
- Order Service（订单）
- Redis（缓存）
- MySQL（数据库）
```

### 7.2 案例：数据流图

**触发**：
```
画一个用户下单的数据流：
1. 用户选择商品
2. 购物车结算
3. 支付验证
4. 库存扣减
5. 订单创建
6. 发送确认邮件
```

### 7.3 案例：系统组件图

**触发**：
```
画一个监控系统架构图：
- 数据采集层（Agent）
- 消息队列（Kafka）
- 数据处理层（Flink）
- 存储层（Elasticsearch）
- 可视化层（Grafana）
```

### 7.4 案例：决策流程

**触发**：
```
创建一个贷款申请的决策流程：
1. 提交申请
2. 信用评估
3. ├─ 分数 > 700 → 人工审核
4. ├─ 分数 600-700 → 补充材料
5. └─ 分数 < 600 → 拒绝
```

---

## 8. 与其他 Skills 集成

### 8.1 与 ontology 集成

```
根据 ontology 知识图谱，生成对应的架构图
```

### 8.2 与 system-lifecycle-manager 集成

```
为系统生命周期生成阶段流程图
```

### 8.3 与文档生成集成

```
生成技术文档时，同步生成架构图
```

---

## 9. 最佳实践

### 9.1 何时使用图表

| 适合使用 | 不需要使用 |
|----------|------------|
| 3+ 组件的系统 | 简单问答 |
| 多步骤流程 | 1-2 步操作 |
| 复杂关系 | 单一概念 |
| 技术方案设计 | 快速原型 |

### 9.2 图表命名规范

```
{项目}-{类型}-{版本}.excalidraw

示例：
- ecom-api-architecture-v1.excalidraw
- order-flow-v2.excalidraw
```

### 9.3 存储位置

```
~/openclaw/diagrams/
├── architecture/
│   └── api-gateway.excalidraw
├── flowchart/
│   └── order-process.excalidraw
└── uml/
    └── domain-model.excalidraw
```

### 9.4 团队协作

1. 导出 SVG 嵌入文档
2. 导出 PNG 用于 PPT
3. 原始 .excalidraw 存入 Git

---

## 10. 常见问题

### Q1: 如何导出为 PNG？

**方案 A**：使用 Kroki 转 SVG 后截图

**方案 B**：安装本地 CLI
```bash
npm install -g excalidraw-brute-export-cli
excalidraw-export diagram.excalidraw --format png
```

### Q2: 如何在 Excalidraw 中编辑？

1. 打开 https://excalidraw.com
2. 导入生成的 .excalidraw 文件
3. 编辑后重新导出

### Q3: 支持中文吗？

支持！Excalidraw 支持多语言，包括中文标签。

### Q4: 如何保持样式一致？

```bash
# 使用主题配置
{
  "theme": "dark",
  "colors": {
    "primary": "#2563eb",
    "background": "#1e293b"
  }
}
```

---

## 11. 参考资源

| 资源 | 链接 |
|------|------|
| Excalidraw 官网 | https://excalidraw.com |
| Kroki API | https://kroki.io |
| Excalidraw CLI | https://github.com/excalidraw/excalidraw-cli |
| Skill 仓库 | https://github.com/Agents365-ai/excalidraw-skill |

---

_本章介绍了 OpenClaw Excalidraw Skill 的使用方法，包括基础图表、架构图、流程图、UML 图等，以及与 OpenClaw 其他功能的集成方式。_
