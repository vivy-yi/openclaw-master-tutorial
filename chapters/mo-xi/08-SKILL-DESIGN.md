# 墨析自适应 Skills 设计

## 一、两种架构选择

### 架构 A: 墨析作为 Agent

```
/workspaces/元团队/agents/墨析/
├── SOUL.md
├── SKILL.md
└── TOOLS.md
```

**特点**：
- 独立运行的 Agent
- 有自己的会话和上下文
- 可以有独立的 Cron/心跳

### 架构 B: 墨析作为 Skill（推荐）

```
~/.openclaw/skills/mo-xi/
├── SKILL.md
├── skills/
│   ├── web-collector/
│   ├── electron-ctrl/
│   └── cloud-browser/
└── profiles/
```

**特点**：
- 可被任何 Agent 调用
- 复用性高
- 维护成本低
- OpenClaw 原生架构

---

## 二、为什么选择 Skill 模式

### 2.1 你已有的 Agent 系统

| Agent | 用途 | 需要采集能力 |
|--------|------|-------------|
| mo-finance | 金融分析 | 财经数据 |
| mo-yunying | 内容运营 | 微博/小红书 |
| mo-richang | 日常开发 | GitHub/文档 |
| 墨析 | 数据采集 | 全平台 |

**如果墨析是 Agent**：其他 Agent 需要通过消息调用

**如果墨析是 Skill**：其他 Agent 可以直接调用

```yaml
# Skill 模式调用
agent:
  skills:
    - mo-xi
  tasks:
    - "请采集微博热搜"
      skill: mo-xi
      action: collect_trending
      platform: weibo
```

### 2.2 维护成本对比

| 维度 | Agent 模式 | Skill 模式 |
|------|------------|------------|
| 代码重复 | 高（每个 Agent 都要写采集逻辑） | 低（统一 Skill） |
| 更新维护 | 多个地方要改 | 只需改 Skill |
| 知识共享 | 困难 | 容易 |
| 依赖管理 | 复杂 | 简单 |

---

## 三、Skill 模式架构

### 3.1 目录结构

```
~/.openclaw/skills/mo-xi/
├── SKILL.md              # Skill 定义
├── skills/               # 子 Skills
│   ├── web-collector/    # Web 采集
│   ├── electron-ctrl/     # Electron 控制
│   └── data-analyzer/    # 数据分析
├── profiles/             # 数据存储
│   ├── competitors/       # 竞品数据
│   ├── aggregated/        # 聚合内容
│   └── users/            # 用户画像
├── workflows/            # 工作流
│   ├── competitor-monitor.yaml
│   ├── content-aggregate.yaml
│   └── user-profile.yaml
└── templates/            # 模板
    └── alerts.md
```

### 3.2 SKILL.md 定义

```yaml
name: mo-xi
version: 1.0.0
description: 自适应全链路数据采集 Skill

capabilities:
  - 采集: browser, intercept, evaluate
  - 存储: file system
  - 定时: cron
  - 通知: message

triggers:
  collect:
    pattern: "采集(.*)"
    action: collect
    params:
      - platform
  
  monitor:
    pattern: "监控(.*)"
    action: monitor
    params:
      - target
  
  analyze:
    pattern: "分析(.*)"
    action: analyze
    params:
      - topic

data_storage:
  local: profiles/
  cloud: feishu_bitable  # 可选
```

### 3.3 子 Skill 示例

```yaml
# skills/web-collector/SKILL.md
name: web-collector
description: Web 数据采集

capabilities:
  - browser.open()
  - browser.snapshot()
  - browser.intercept()
  - browser.evaluate()
  - browser.screenshot()

triggers:
  "采集(.*)": collect
  "监控(.*)": monitor
```

---

## 四、调用方式

### 4.1 Agent 直接调用

```yaml
# mo-yunying agent
tasks:
  - name: "采集竞品内容"
    skill: mo-xi
    action: collect
    params:
      platform: xiaohongshu
      target: "竞品A"
```

### 4.2 Cron 定时触发

```yaml
# mo-xi skill 内部 Cron
cron:
  - name: "竞品监控"
    schedule: "0 */6 * * *"  # 每6小时
    action: skill.mo-xi.monitor
    params:
      targets: ["竞品A", "竞品B"]
```

### 4.3 消息触发

```
用户: "帮我采集微博热搜"
    ↓
墨析 Skill 响应
    ↓
执行采集
    ↓
返回结果
```

---

## 五、数据流

```
┌─────────────────────────────────────────────────────────┐
│  触发源                                                   │
│  ├── Agent 调用（mo-finance/mo-yunying）                │
│  ├── Cron 定时                                         │
│  └── 消息指令                                         │
└─────────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────┐
│  墨析 Skill                                            │
│  ├── 解析意图                                          │
│  ├── 选择采集方法                                       │
│  └── 标准化输出                                         │
└─────────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────┐
│  Tools                                                  │
│  ├── browser（采集）                                    │
│  ├── cron（定时）                                      │
│  ├── message（通知）                                    │
│  └── memory（存储）                                     │
└─────────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────┐
│  存储                                                   │
│  ├── 本地: profiles/                                   │
│  └── 云端: feishu_bitable（可选）                     │
└─────────────────────────────────────────────────────────┘
```

---

## 六、与 Agent 模式的关键区别

| 维度 | Agent 模式 | Skill 模式 |
|------|------------|------------|
| **定位** | 独立的"人" | 工具/能力 |
| **启动** | 需要启动会话 | 被调用时激活 |
| **上下文** | 有持久会话 | 无状态 |
| **复用** | 困难 | 容易 |
| **组合** | 消息传递 | 直接调用 |
| **维护** | 独立更新 | 集中更新 |

---

## 七、选择建议

| 场景 | 推荐模式 |
|------|----------|
| 需要独立决策、聊天 | Agent |
| 需要多 Agent 协同 | Skill |
| 能力需要被复用 | Skill |
| 纯工具/服务 | Skill |
| 有持久状态需求 | Agent |
