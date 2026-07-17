# knowledge-management 完全指南

> ClawHub Skill：本地知识分类归档工具。8 种分类 + YAML frontmatter。

## 概述

**评分**: ⭐⭐⭐⭐ (4.183)  
**作者**: Claire (OpenClaw Agent)  
**仓库**: https://github.com/ClaireAICodes/openclaw-skill-knowledge-management  
**依赖**: `km` CLI（内置 skill）

---

## 工作原理

```
MEMORY.md + memory/*.md
        ↓
解析 entry（关键词匹配分类）
        ↓
计算 content hash（去重）
        ↓
写入对应文件夹（带时间戳 + hash 文件名）
        ↓
更新 local-sync-state.json（幂等同步）
```

---

## 8 种内容分类

| 分类 | 说明 | 关键词 |
|------|------|--------|
| `Research` | 研究、学习 | research, study, learn |
| `Decision` | 决策、选择 | decision, decide, choose |
| `Insight` | 洞察、感悟 | insight, realize, epiphany |
| `Lesson` | 教训、经验 | lesson, learn, mistake |
| `Pattern` | 模式、范式 | pattern, pattern |
| `Project` | 项目 | project, pipeline |
| `Reference` | 参考资料 | reference, link, doc |
| `Tutorial` | 教程 | how-to, guide, tutorial |

---

## 命令

| 命令 | 说明 |
|------|------|
| `km sync --days_back 7` | 同步过去 7 天 |
| `km classify` | 预览分类（不存储） |
| `km summarize` | 生成索引文件 |
| `km cleanup` | 清理孤儿文件 |
| `km list_types` | 列出分类类型 |

---

## 输出结构

```
memory/KM/
├── local-sync-state.json
├── local-sync-log.md
├── Research/
│   └── 20260215T1448_Title_e4b30e75.md
├── Decision/
├── Insight/
├── Lesson/
├── Pattern/
├── Project/
├── Reference/
├── Tutorial/
└── *_Index.md (每个分类的索引)
```

---

## Frontmatter 元数据

```yaml
---
title: "Protocol Name"
content_type: "Research"
domain: "OpenClaw"
certainty: "Verified"
impact: "Medium"
confidence_score: 8
tags: ["AI", "Automation"]
source: "MEMORY.md"
source_file: "MEMORY.md"
date: "2026-02-11"
content_hash: "e4b30e75d0f5a662"
---
```

---

## 安装

```bash
clawhub install knowledge-management
```

---

## 使用方式

### 基本同步

```bash
# 同步过去 7 天
km sync --days_back 7

# 带清理
km sync --days_back 7 --cleanup
```

### 预览模式

```bash
# 预览分类（不存储）
km classify --days_back 3

# 导出 JSON
km classify --days_back 3 > entries.json
```

### 生成索引

```bash
km summarize
```

### 清理孤儿文件

```bash
# 预览
km cleanup --dry_run

# 执行
km cleanup
```

---

## Cron 集成

```bash
openclaw cron add \
  --name "Daily Knowledge Sync" \
  --cron "0 5 * * *" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "km sync --days_back 7"
```

---

## 与 memory-wiki 对比

| 维度 | knowledge-management | memory-wiki |
|------|---------------------|------------|
| **类型** | ClawHub Skill | 官方内置插件 |
| **评分** | ⭐⭐⭐⭐ (4.183) | 内置 |
| **存储** | 本地文件 + 分类 | 编译 Wiki + Entities |
| **分类** | 8 种固定类型 | Entities / Concepts / Syntheses |
| **搜索** | grep / 关键词 | Semantic + Claims 追踪 |
| **Dashboard** | ❌ | ✅ 7+ 报告 |
| **Claims/Evidence** | ❌ | ✅ 完整支持 |
| **Provenance** | 基础（source_file） | 完整溯源 |
| **Entity 路由** | ❌ | ✅ personCard |
| **Obsidian 集成** | ❌ | ✅ 可选 |
| **Bridge 模式** | ❌ | ✅ 桥接 memory |
| **依赖** | 无外部 API | 无外部 API |
| **状态管理** | local-sync-state.json | 内置 |

---

## 什么时候选择哪个？

| 场景 | 推荐 |
|------|------|
| 简单分类归档 | knowledge-management |
| 需要结构化 Claims | memory-wiki |
| 需要 Dashboard 报告 | memory-wiki |
| 需要 provenance 溯源 | memory-wiki |
| 需要 Entity 路由 | memory-wiki |
| 需要 Obsidian 集成 | memory-wiki |
| 需要 Bridge 模式 | memory-wiki |
| 轻量级本地分类 | knowledge-management |

---

## 组合使用

两者可以互补：

```bash
# 1. 使用 knowledge-management 分类归档
km sync --days_back 7

# 2. 使用 memory-wiki 构建知识库
openclaw wiki compile

# 3. 搜索跨越两层
memory_search corpus=all "query"
```

---

## 结论

| 推荐 |
|------|
| ✅ 直接使用 **memory-wiki**（内置，更强大） |
| ⚠️ knowledge-management 可作为轻量备选 |

---

## 相关链接

- [GitHub](https://github.com/ClaireAICodes/openclaw-skill-knowledge-management)
- [ClawHub](https://clawhub.ai/s/knowledge-management)
- [memory-wiki 完全指南](./memory-wiki完全指南.md)