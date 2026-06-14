# memory-wiki 完全指南

> OpenClaw 内置知识 vault 插件。Structured claims + provenance + dashboards。

## 概述

**类型**: 官方内置插件  
**定位**: 编译型知识库（Wiki）  
**依赖**: OpenClaw 3.2+  

---

## 工作原理

```
Active Memory (memory-core)
        ↓ Bridge Mode
memory-wiki (Knowledge Vault)
        ↓ compile
Wiki Pages + Claims + Dashboards
```

### 三种 Vault 模式

| 模式 | 说明 | 信任边界 |
|------|------|---------|
| `isolated` | 独立 Vault，自有来源 | 安全 |
| `bridge` | 桥接 active memory artifacts | 安全（推荐） |
| `unsafe-local` | 本地私有路径 | 实验性 |

---

## 核心功能

### 1. Wiki 页面结构

```
wiki/
├── sources/          # 导入的原始材料
├── entities/        # 实体（人、项目、系统）
├── concepts/       # 概念、模式、策略
├── syntheses/     # 编译摘要
├── reports/       # Dashboard 报告
└── _attachments/  # 附件
```

### 2. Structured Claims

```yaml
claims:
  - id: claim.xxx
    text: "声明内容"
    status: supported|contested|stale
    confidence: 0.9
    evidence:
      - kind: source
        sourceId: source.xxx
        path: docs/page.md
        lines: "10-15"
        weight: 0.8
```

### 3. Dashboard 报告

| 报告 | 说明 |
|------|------|
| `reports/open-questions.md` | 开放问题 |
| `reports/contradictions.md` | 矛盾声明 |
| `reports/low-confidence.md` | 低置信度页面 |
| `reports/stale-pages.md` | 过时页面 |
| `reports/provenance-coverage.md` | 证据覆盖 |

### 4. Entity Routing

```yaml
pageType: entity
entityType: person
canonicalId: person.xxx
aliases: ["昵称", "@handle"]
privacyTier: public|local-private|confirm-before-use
personCard:
  handles: ["@twitter"]
  timezone: Asia/Shanghai
  askFor: ["技术问题"]
  avoidAskingFor: ["billing"]
```

---

## 安装

已内置，无需安装，直接启用：

```json5
{
  plugins: {
    entries: {
      "memory-wiki": {
        enabled: true,
        config: {
          vaultMode: "bridge",
          bridge: {
            enabled: true,
            readMemoryArtifacts: true,
            indexDreamReports: true,
            indexDailyNotes: true,
            indexMemoryRoot: true,
            followMemoryEvents: true
          },
          render: {
            createDashboards: true,
            createBacklinks: true
          },
          search: {
            backend: "shared",
            corpus: "all"
          }
        }
      }
    }
  }
}
```

---

## CLI 命令

```bash
# 状态检查
openclaw wiki status
openclaw wiki doctor

# 初始化 / 导入
openclaw wiki init
openclaw wiki bridge import

# 编译（生成 Dashboard）
openclaw wiki compile

# 搜索 / 读取
openclaw wiki search "query"
openclaw wiki get entity.xxx

# 语法检查
openclaw wiki lint

# Obsidian 集成
openclaw wiki obsidian status
```

---

## Agent 工具

| 工具 | 说明 |
|------|------|
| `wiki_search` | 搜索 Wiki + memory corpora |
| `wiki_get` | 读取 Wiki 页面 |
| `wiki_apply` | 窄量级合成/元数据更新 |
| `wiki_lint` | 结构检查、矛盾、开放问题 |
| `wiki_status` | Vault 状态 |

### 搜索模式

| 模式 | 场景 |
|------|------|
| `auto` | 平衡默认 |
| `find-person` | 查找人 |
| `route-question` | 问题路由 |
| `source-evidence` | 溯源证据 |
| `raw-claim` | 结构化 Claims |

---

## 对比 memory-core / QMD

| 维度 | memory-core / QMD | memory-wiki |
|------|------------------|------------|
| **定位** | 活跃记忆 / 语义搜索 | 编译知识库 |
| **数据** | Raw notes, session exports | 结构化页面 |
| **Claims** | ❌ | ✅ 支持证据链 |
| **Dashboard** | ❌ | ✅ 7+ 报告 |
| **Provenance** | 基础 | 完整溯源 |
| **模式** | 召回 / promotion | 编译 / 维护 |

---

## 混合使用模式（推荐）

```json5
{
  memory: { backend: "qmd" },
  plugins: {
    entries: {
      "memory-wiki": {
        enabled: true,
        config: {
          vaultMode: "bridge",
          bridge: { enabled: true, readMemoryArtifacts: true },
          search: { backend: "shared", corpus: "all" }
        }
      }
    }
  }
}
```

### 使用规则

- **`memory_search`** = 宽泛召回（memory + wiki）
- **`wiki_search`** = 溯源优先
- **`wiki_get`** = 页面级访问

---

## 与外部 Skill 对比

详见：→ [knowledge-management 对比指南](./knowledge-management完全指南.md#与-memory-wiki-对比)

---

## 触发场景

| 关键词 | 场景 |
|--------|------|
| `knowledge`, `wiki`, `knowledge base` | 构建知识库 |
| `claim`, `evidence`, `provenance` | 事实声明溯源 |
| `contradiction`, `conflict` | 矛盾检测 |
| `dashboard`, `report` | 生成报告 |
| `entity`, `person`, `project` | 实体管理 |

---

## 相关链接

- [官方文档](/plugins/memory-wiki)
- [CLI: wiki](/cli/wiki)
- [Memory Overview](/concepts/memory)