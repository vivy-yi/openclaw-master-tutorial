# lossless-claw 使用教程

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 项目地址：[Martian-Engineering/lossless-claw](https://github.com/Martian-Engineering/lossless-claw)
> 官方概念网站：[losslesscontext.ai](https://www.losslesscontext.ai)
> 最新版本：v0.5.3 | 开源协议：MIT
> 关联项目：[LCM 论文 (Voltropy)](https://papers.voltropy.com/LCM)

---

## 什么是 lossless-claw？

lossless-claw 是 OpenClaw 的 **LCM（Lossless Context Management，无损上下文管理）插件**，解决了传统 Agent 在长对话中**上下文丢失**的核心问题。

### 传统方案的问题

当对话上下文满了，OpenClaw 默认的 **compaction（压缩）** 会将旧消息**替换**为摘要：

```
❌ 丢失的信息：工具调用细节、代码片段、错误日志、对话细节
❌ 摘要的局限：LLM 生成的摘要不可逆，信息一旦丢失就无法恢复
❌ 简单截断：直接丢弃最早的消息，Agent 对很久以前的上下文毫无感知
```

### lossless-claw 的解决方案

**不删除任何消息**——所有内容都被保存到 SQLite 数据库，通过 **DAG（有向无环图）** 结构组织成多层摘要，Agent 可随时**按需展开**恢复原始细节：

```
✅ 完整保留：所有消息都存入数据库，一条不删
✅ 分层抽象：D0 / D1 / D2 多级摘要，平衡上下文大小与信息密度
✅ 随时展开：任何摘要都能展开回原始消息
✅ 无fresh tail保护：最近的消息始终保持原始状态
```

---

## 工作原理：LCM 架构详解

### 核心概念图

```
┌─────────────────────────────────────────────────────┐
│                  对话上下文（模型可见）                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │Fresh │  │Fresh │  │Fresh │  │Fresh │  ← 始终保持  │
│  │ Tail │  │ Tail │  │ Tail │  │ Tail │    原始状态  │
│  └──────┘  └──────┘  └──────┘  └──────┘            │
└─────────────────────────────────────────────────────┘
         ↓  Compaction 触发时
┌─────────────────────────────────────────────────────┐
│              SQLite DAG 存储（永久保留）               │
│                                                      │
│    D2 摘要（叙事层 — 最高抽象）←── D1 摘要            │
│       ↑                              ↑              │
│       │                              │              │
│    D1 摘要（概述层）←──────── D0 摘要（细节层）        │
│       ↑                              ↑              │
│       │                              │              │
│    原始消息 ←───────────────── 原始工具调用             │
│                                                      │
│    lcm_grep 可搜索所有层级，带 depth 标签              │
│    lcm_expand 可展开任意摘要回原始消息                 │
└─────────────────────────────────────────────────────┘
```

### 层级深度说明

| 层级 | 名称 | 说明 |
|------|------|------|
| **Raw** | 原始消息 | 工具调用/结果/对话原文，完整保留 |
| **D0** | 细节摘要 | 保留关键事实、决策、代码片段 |
| **D1** | 概述摘要 | 项目结构、进度、问题诊断 |
| **D2** | 叙事摘要 | 整体目标、长期记忆、经验总结 |

### Compaction 引擎的三个阶段

`compaction.ts` 实现了完整的压缩流程：

1. **Leaf Passes（叶层遍历）** — 从最新的原始消息开始，识别需要压缩的段落
2. **Condensation（冷凝）** — 将原始消息转换为 D0 层摘要
3. **Sweeps（清扫）** — 触发高层摘要（D1、D2）的更新，确保层级一致性

### Fresh Tail（新鲜尾巴）机制

LCM 始终保护最近的原始消息不被压缩，这些消息构成 **Fresh Tail**：

- Fresh Tail 永远保持原始状态，Agent 可直接访问
- 当 Fresh Tail 足够长时，早于它的消息才会被压缩
- 确保当前对话上下文不因历史信息而受损

---

## 安装

### 方式一：npm 安装（稳定版）

```bash
openclaw plugins install lossless-claw
```

### 方式二：Git 克隆 + 链接开发模式

```bash
git clone https://github.com/Martian-Engineering/lossless-claw.git
openclaw plugins install --link ./lossless-claw
```

> 链接模式会在修改代码后即时生效，适合开发者调试。

### 方式三：lossless-claw-enhanced（含 CJK 修复）

如需更好的中文/日文/韩文支持，安装 enhanced 版本：

```bash
git clone https://github.com/win4r/lossless-claw-enhanced.git
openclaw plugins install --link ./lossless-claw-enhanced
```

该版本修复了：
- CJK 字符 token 估算偏差（上游错误：0.25 tokens/字，正确：1.5 tokens/字）
- Emoji / 补充平面字符 token 估算
- 多个上游 bug 修复（auth 误报、会话轮换检测等）

### 验证安装

```bash
openclaw plugins list
# 应看到 lossless-claw 在列表中
```

---

## 配置

lossless-claw 开箱即用，默认配置足够大多数场景。高级配置通过 `~/.openclaw/openclaw.json` 的 `plugins.entries.lossless-claw.config` 字段覆盖。

### 关键配置项

```json
{
  "plugins": {
    "entries": {
      "lossless-claw": {
        "enabled": true,
        "config": {
          "dbPath": "~/.openclaw/lossless-claw.db",
          "maxDepth": 3,
          "freshTailMessages": 10,
          "summarizeModel": "gpt-4o-mini",
          "autoExpand": false
        }
      }
    }
  }
}
```

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `dbPath` | `~/.openclaw/lossless-claw.db` | SQLite 数据库路径 |
| `maxDepth` | 3 | 最大摘要深度（D0 / D1 / D2 / D3） |
| `freshTailMessages` | 10 | 保护多少条最新消息不被压缩 |
| `summarizeModel` | `gpt-4o-mini` | 用于生成摘要的模型 |
| `autoExpand` | `false` | 检索时是否自动展开摘要 |

### 配合 LLM 提供商

如需指定特定的 LLM 用于摘要生成，需要配置 provider：

```bash
openclaw config set plugins.entries.lossless-claw.config.summarizeModel "claude-3-haiku"
```

---

## Agent 工具（4个核心工具）

### lcm_grep — 全局搜索

搜索 DAG 中所有节点（原始消息 + 各层摘要），返回带 **depth 标签** 的结果：

```
lcm_grep("项目架构", limit=10)
```

返回示例：
```
- [D0] 讨论了项目使用 Next.js 架构（2026-03-28）
- [Raw] 用户提供了 architecture.md 文件内容
- [D1] 项目技术栈：Next.js + Prisma + PostgreSQL
- [D2] 用户在开发一个 SaaS 产品
```

depth 标签帮助 Agent 判断信息位置：
- `Raw` → 原始消息中，直接可用
- `D0/D1/D2` → 摘要中，需要时可展开

### lcm_describe — 描述状态

查看当前对话的 DAG 状态：

```
lcm_describe()
```

返回示例：
```
Conversation DAG Summary:
- Total messages: 847
- Raw (Fresh Tail): 10 messages
- D0 summaries: 3
- D1 summaries: 2
- D2 summaries: 1
- Oldest raw message: 2026-03-15
- Estimated tokens in context: 32,450
```

### lcm_expand — 展开摘要

将任意深度的摘要展开回原始消息或下层摘要：

```
lcm_expand("summary_id_of_D2", target_depth=0)
```

展开后的内容可重新加入模型上下文，实现**无损恢复**。

### lcm_expand_query — 智能展开（主 Agent 用）

主 Agent 专用的查询展开工具，比 `lcm_expand` 更智能：

```
lcm_expand_query("关于上次那个 API 问题的讨论")
```

### 工具使用示例

**场景：Agent 忘记 3 天前讨论的技术选型**

```
用户：之前我们决定用什么数据库来着？
Agent：让我查一下...
    lcm_grep("数据库 选型 PostgreSQL MongoDB")
    → 找到 D1 摘要："2026-03-30 讨论了数据库选型"
    lcm_expand("D1_summary_id")
    → 展开回原始讨论，确认是 PostgreSQL
Agent：根据 3 月 30 日的讨论，我们选择了 PostgreSQL + Prisma 方案。
```

---

## TUI 终端界面

lossless-claw 自带一个 Go 编写的交互式终端界面：

### 安装 TUI

```bash
# 从 GitHub Releases 下载预编译二进制
# 或使用 goreleaser 构建
git clone https://github.com/Martian-Engineering/lossless-claw
cd lossless-claw/tui
go build -o lcm-tui .
```

### TUI 功能

| 命令 | 说明 |
|------|------|
| `data` | 浏览对话数据，加载 DAG |
| `dissolve` | 溶解摘要，将高层摘要拆回下层 |
| `repair` | 修复损坏的摘要 |
| `rewrite` | 重新总结（用新模型/新提示词） |
| `transplant` | 跨会话复制 DAG |

### 使用示例

```bash
# 启动 TUI
./lcm-tui

# 查看当前对话数据
> data

# 重新总结某个摘要
> rewrite <summary-id>

# 修复损坏的 DAG 节点
> repair <node-id>
```

---

## 与 memory-lancedb-pro 的区别

| 特性 | lossless-claw | memory-lancedb-pro |
|------|--------------|-------------------|
| **架构层级** | ContextEngine（上下文引擎） | Memory Plugin（记忆插件） |
| **核心机制** | DAG 压缩 + 无损摘要 | 向量检索 + BM25 |
| **解决的问题** | Compaction 时信息丢失 | 记忆检索不准确 |
| **存储内容** | 所有原始消息 + 分层摘要 | 抽取的关键记忆 |
| **检索方式** | 展开 + grep | 语义向量搜索 |
| **LLM 调用** | 摘要生成（额外消耗） | 嵌入生成 |
| **Fresh Tail** | ✅ 始终保护最新消息 | ❌ 无此机制 |
| **配合使用** | ✅ 可与 LanceDB 叠加 | ✅ 可与 lossless-claw 叠加 |

### 最佳实践：双插件组合

lossless-claw 处理**上下文压缩**（解决编译时信息丢失），memory-lancedb-pro 处理**长期记忆检索**（解决语义搜索）：

```
lossless-claw（ContextEngine）
    ↓ 处理 compaction，永远不丢失上下文
    + memory-lancedb-pro（Memory Plugin）
        ↓ 处理长期记忆的语义检索
```

---

## 与内置 Compaction 的对比

| 维度 | 内置 Compaction | lossless-claw |
|------|----------------|---------------|
| 压缩方式 | 替换为单一摘要 | 多层 DAG 摘要 |
| 信息保留 | 摘要不可逆 | 全部可逆，可展开 |
| Fresh Tail | 无 | 有 |
| 工具调用保留 | 通常丢弃 | 保留结构化信息 |
| 摘要层级 | 1层 | D0/D1/D2... 多层 |
| 搜索能力 | 无 | lcm_grep 跨深度搜索 |

---

## 故障排除

### 插件未加载

```bash
# 确认插件已安装
openclaw plugins list | rg lossless

# 查看详细日志
openclaw logs --plain | rg "lossless-claw"
```

### Context 持续增长

可能是 compaction 未触发（v0.5.2 已知 bug）：

```bash
# 检查 session 是否轮换后 compaction 未重启
# 解决方法：/reset 重置会话触发 compaction
```

### 摘要质量下降

用新模型重新总结：

```bash
# 通过 TUI
./lcm-tui
> rewrite <summary-id>

# 或在配置中更新模型
openclaw config set plugins.entries.lossless-claw.config.summarizeModel "gpt-4o"
```

### 数据库损坏

```bash
# 使用 TUI repair 功能
./lcm-tui
> repair
```

---

## 完整配置示例

```json
{
  "plugins": {
    "entries": {
      "lossless-claw": {
        "enabled": true,
        "config": {
          "dbPath": "~/.openclaw/lossless-claw.db",
          "maxDepth": 3,
          "freshTailMessages": 10,
          "summarizeModel": "gpt-4o-mini",
          "autoExpand": false,
          "largeFileThreshold": 100000
        }
      }
    }
  }
}
```

---

## 相关资源

- [GitHub 仓库](https://github.com/Martian-Engineering/lossless-claw)
- [LCM 论文](https://papers.voltropy.com/LCM)（Voltropy）
- [LCM 概念官网](https://www.losslesscontext.ai)
- [lossless-claude](https://lossless-claude.com/) — 同架构的 Claude Code 版本
- [lossless-claw-enhanced](https://github.com/win4r/lossless-claw-enhanced) — CJK 优化版
- [OpenClaw ContextEngine 指南](https://www.shareuhack.com/en/posts/openclaw-v2026-3-7-contextengine-guide)

---

## 与 memory-lancedb-pro 的完整对比

详见专项对比文档：[lossless-claw vs memory-lancedb-pro 对比](./lossless-claw与memory-lancedb-pro对比.md)

---

*🦦 由 OpenClaw 助手生成 | 项目作者：Martian-Engineering*
