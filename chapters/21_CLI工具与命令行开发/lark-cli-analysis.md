# 飞书 CLI (lark-cli) 技术分析报告

> 📅 分析时间：2026-03-29
> 🔗 项目：https://github.com/larksuite/cli
> ⭐ Stars：1,424（发布 4 天）
> 🐹 语言：Go

---

## 1. 项目概览

### 基本信息

| 属性 | 值 |
|------|-----|
| **GitHub** | [larksuite/cli](https://github.com/larksuite/cli) |
| **发布时间** | 2026-03-25（4 天前） |
| **Stars** | 1,424 ⭐ |
| **语言** | Go |
| **许可** | MIT |
| **维护者** | LarkSuite 官方 |

### 核心特性

```
┌─────────────────────────────────────────────────────────────────┐
│  飞书 CLI - 为人类和 AI Agent 构建                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ 11 个业务域 · 200+ 命令 · 19 个 AI Agent Skills            │
│                                                                  │
│  📅 Calendar    💬 Messenger    📄 Docs      📁 Drive          │
│  📊 Base       📈 Sheets       ✅ Tasks     📚 Wiki            │
│  👤 Contact    📧 Mail         🎥 Meetings                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 技术架构

### 2.1 三层命令系统

这是 lark-cli 最核心的设计创新：

```
┌─────────────────────────────────────────────────────────────────┐
│                    三层命令架构                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Shortcuts (高级封装)  ← AI & 人类友好 ⭐              │
│  ─────────────────────────────────────────────────────────────  │
│  +agenda, +messages-send, +chat-create                         │
│  智能默认值、表格输出、dry-run 预览                              │
│                                                                  │
│  Layer 2: API Commands (平台同步)                               │
│  ─────────────────────────────────────────────────────────────  │
│  calendar.events.instance_view                                   │
│  从 Open API 元数据自动生成，1:1 映射                           │
│                                                                  │
│  Layer 3: Raw API (完整覆盖)                                    │
│  ─────────────────────────────────────────────────────────────  │
│  api GET /open-apis/calendar/v4/calendars                      │
│  调用任意 2500+ API 端点                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 项目结构

```
larksuite/cli/
├── main.go                 # 入口
├── cmd/                    # CLI 命令定义
├── internal/               # 内部实现
│   ├── auth/              # 认证逻辑
│   ├── api/               # API 调用
│   └── schema/            # Schema 解析
├── shortcuts/             # Shortcut 命令定义
├── skills/                # AI Agent Skills ⭐
│   ├── lark-shared/      # 共享配置（自动加载）
│   ├── lark-calendar/
│   ├── lark-im/
│   ├── lark-docs/
│   └── ... (19 个)
└── skill-template/        # Skill 模板
```

---

## 3. AI Agent Skills 设计

### 3.1 Skills 列表

| Skill | 说明 |
|-------|------|
| `lark-shared` | 共享配置、认证、身份切换、scope 管理 |
| `lark-calendar` | 日历事件、会议议程、空闲查询 |
| `lark-im` | 消息收发、群聊管理、文件上传下载 |
| `lark-doc` | 文档创建、读取、更新、搜索 |
| `lark-drive` | 文件上传下载、权限管理 |
| `lark-sheets` | 电子表格增删改查 |
| `lark-base` | 多维表格数据操作 |
| `lark-task` | 任务、子任务、提醒 |
| `lark-mail` | 邮件收发、搜索、草稿 |
| `lark-contact` | 用户搜索、联系人查询 |
| `lark-wiki` | 知识库节点管理 |
| `lark-event` | 实时事件订阅 (WebSocket) |
| `lark-vc` | 会议记录查询 |
| `lark-whiteboard` | 白板 DSL 渲染 |
| `lark-minutes` | 会议纪要元数据 |
| `lark-openapi-explorer` | API 浏览器 |
| `lark-skill-maker` | 自定义 Skill 创建框架 |
| `lark-workflow-meeting-summary` | 会议纪要聚合工作流 |
| `lark-workflow-standup-report` | 日报/站报聚合工作流 |

### 3.2 SKILL.md 格式

```yaml
---
name: lark-im
version: 1.0.0
description: "飞书即时通讯：收发消息和管理群聊..."
metadata:
  requires:
    bins: ["lark-cli"]
  cliHelp: "lark-cli im --help"
---

# im (v1)

**CRITICAL — 开始前 MUST 先读取 lark-shared/SKILL.md**

## Core Concepts

- **Message**: 消息，ID 格式 om_xxx
- **Chat**: 群聊/单聊，ID 格式 oc_xxx
- **Thread**: 消息线程，ID 格式 omt_xxx

## Shortcuts（推荐）

| Shortcut | 说明 |
|----------|------|
| `+messages-send` | 发送消息 |
| `+chat-messages-list` | 获取消息列表 |
| `+messages-reply` | 回复消息 |
| `+chat-create` | 创建群聊 |

## API Resources

lark-cli schema im.<resource>.<method>
```

### 3.3 核心设计原则

1. **lark-shared 自动加载** - 所有 Skill 之前必须先读 shared
2. **Shortcut 优先** - 有 Shortcut 的操作不用原生 API
3. **Identity 明确** - `--as user` vs `--as bot` 权限不同
4. **Schema 必须查看** - 用 `lark-cli schema` 查看参数结构

---

## 4. 认证与安全

### 4.1 认证机制

```bash
# 交互式登录
lark-cli auth login

# 推荐权限（自动选择）
lark-cli auth login --recommend

# 按域登录
lark-cli auth login --domain calendar,task

# 身份切换
lark-cli calendar +agenda --as user
lark-cli im +messages-send --as bot --chat-id "oc_xxx"
```

### 4.2 安全设计

| 安全措施 | 说明 |
|----------|------|
| **输入注入保护** | 防止命令注入 |
| **输出清理** | Terminal 输出安全过滤 |
| **系统 Keychain** | 凭证安全存储 |
| **Dry Run** | 预览操作再执行 |
| **Scope 限制** | 最小权限原则 |

### 4.3 风险警告

> ⚠️ AI Agent 调用飞书 API 存在固有权风险：
> - 模型幻觉
> - 不可预测的执行
> - Prompt 注入
>
> **建议**：
> 1. 不随意修改默认安全设置
> 2. 作为私人助手使用，不加入群聊
> 3. 了解所有使用风险

---

## 5. 与 Google Workspace CLI 对比

### 5.1 功能对比

| 维度 | 飞书 CLI | Google Workspace CLI |
|------|----------|---------------------|
| **业务域** | 11 个 | 4 个 (Drive/Gmail/Calendar/Meet) |
| **命令数** | 200+ | 40+ |
| **Skills** | 19 个 ⭐ | 无 |
| **Shortcuts** | 有 ⭐ | 无 |
| **语言** | Go | Rust |
| **Token 节省** | Skill 封装 | 无 |
| **发布时间** | 2026-03 | 2025 |

### 5.2 创新点

| 创新 | 飞书 CLI | Google Workspace CLI |
|------|----------|---------------------|
| **三层命令** | ✅ Shortcut + API + Raw | ❌ 只有 API |
| **AI Skills** | ✅ 19 个开箱即用 | ❌ 无 |
| **工作流** | ✅ 会议纪要聚合、日报 | ❌ 无 |
| **Skill Maker** | ✅ 自定义 Skill 框架 | ❌ 无 |

---

## 6. 技术实现亮点

### 6.1 Shortcut 设计

```bash
# 人类和 AI 友好的高级封装
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello"

# vs 原生 API
lark-cli api POST /open-apis/im/v1/messages \
  --params '{"receive_id_type":"chat_id"}' \
  --body '{"receive_id":"oc_xxx","msg_type":"text","content":"{\"text\":\"Hello\"}"}'
```

### 6.2 Schema 内省

```bash
# 查看任意 API 的参数结构
lark-cli schema
lark-cli schema calendar.events.instance_view
lark-cli schema im.messages.delete

# 输出参数、请求体、响应结构、支持的身份、需要的 scope
```

### 6.3 输出格式

```bash
--format json      # 完整 JSON（默认）
--format pretty   # 人类友好格式化
--format table    # 表格
--format ndjson   # 换行分隔 JSON（管道）
--format csv      # CSV
```

---

## 7. 安装与使用

### 7.1 安装

```bash
# npm 安装
npm install -g @larksuite/cli

# 安装 SKILL（必须）
npx skills add larksuite/cli -y -g
```

### 7.2 快速开始

```bash
# 1. 配置应用凭证（一次性）
lark-cli config init

# 2. 登录
lark-cli auth login --recommend

# 3. 使用
lark-cli calendar +agenda
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello"
```

### 7.3 AI Agent 使用

```bash
# Step 1: 安装
npm install -g @larksuite/cli
npx skills add larksuite/cli -y -g

# Step 2: 配置凭证（后台运行，获取授权 URL）
lark-cli config init --new

# Step 3: 登录
lark-cli auth login --recommend

# Step 4: 验证
lark-cli auth status
```

---

## 8. 与 CLI-Anything 的对比

### 8.1 定位差异

| 项目 | lark-cli | CLI-Anything |
|------|----------|--------------|
| **目标** | 官方平台 CLI | 通用软件 → CLI |
| **维护** | 官方维护 | 社区驱动 |
| **输入** | 飞书 Open API | 任意软件源码/GUI |
| **生成方式** | 手工策划 + 自动同步 | AI 自动生成 |
| **SKILL** | 19 个精心设计 | 自动生成 |

### 8.2 互补性

```
lark-cli          → 飞书平台（官方支持，精细打磨）
CLI-Anything     → 其他软件（社区贡献，快速生成）
mcp2cli          → MCP Server（Token 优化）
```

---

## 9. 关键洞察

### 9.1 为什么飞书要做 CLI？

1. **AI Agent 原生支持** - 让 Agent 可以操作飞书
2. **提升效率** - 减少 Web UI 操作
3. **标准化** - 统一 API 调用方式
4. **生态扩展** - 吸引开发者构建自动化

### 9.2 为什么 LarkSuite 要做这个？

| 原因 | 分析 |
|------|------|
| **竞争压力** | 对标 Google Workspace CLI |
| **开发者友好** | 降低 API 使用门槛 |
| **AI 时代** | Agent 需要标准化接口 |
| **生态锁定** | 通过 CLI 增加粘性 |

### 9.3 对行业的启示

```
1. 未来所有 SaaS 都会提供 CLI
2. CLI 会成为 AI Agent 的标准接口
3. SKILL 规范会越来越重要
4. Shortcut 模式是 AI 友好的创新
```

---

## 10. 总结

### 核心创新

| 创新点 | 说明 |
|--------|------|
| **三层命令架构** | Shortcut → API → Raw API，兼顾易用性和灵活性 |
| **AI Skills 生态** | 19 个开箱即用的 Skills，Agent 零配置 |
| **工作流封装** | 会议纪要、日报等高频场景模板 |
| **安全设计** | 注入保护、Keychain、Dry Run |
| **身份切换** | user/bot 灵活切换 |

### 值得学习的地方

1. **三层命令设计** - 可以在其他 CLI 项目中复用
2. **SKILL 格式** - lark-im 的 SKILL.md 非常详细
3. **安全第一** - 默认安全，谨慎放开
4. **文档优先** - 每个操作都有详细的 SKILL.md

---

## 相关链接

- [GitHub: larksuite/cli](https://github.com/larksuite/cli)
- [npm: @larksuite/cli](https://www.npmjs.com/package/@larksuite/cli)
- [Skills 市场](https://skills.sh)

---

*分析报告完成于 2026-03-29*
