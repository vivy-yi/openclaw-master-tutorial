# SQLite Media 存储模型演进指南

> **文档版本**: v2026.7.2+  
> **变更类型**: 重大架构迁移  
> **PR**: [#113695](https://github.com/openclaw/openclaw/pull/113695)  
> **作者**: Peter Steinberger  
> **发布日期**: 2026-07-25

---

## 一、变更概述

本次变更是 OpenClaw **媒体遗留系统退役计划**（Media Legacy Retirement Program）的第 3 个 PR——**操作员批准的规范迁移（operator-approved canonical cutover）**。

### 核心目标

| 目标 | 说明 |
|------|------|
| 规范化媒体存储 | 将 `transcript_events` 表中的遗留媒体字段迁移至 `__openclaw.media` 事实表 |
| 停止遗留写入 | 用户轮次构建器停止写入顶层遗留 `Media*` 字段 |
| 删除废弃代码 | 移除内部持久化读取器的遗留回退逻辑 |
| 数据完整性 | 确保所有迁移操作幂等、可验证 |

---

## 二、迁移架构

### 2.1 迁移前状态（旧架构）

```
transcript_events 表
├── MediaUrl         -- 遗留字段
├── MediaType        -- 遗留字段
├── MediaName        -- 遗留字段
├── MediaSize        -- 遗留字段
├── MediaMimeType    -- 遗留字段
├── MediaThumbnailUrl -- 遗留字段
└── ... 其他媒体相关字段
```

### 2.2 迁移后状态（新架构）

```
__openclaw.media 表 (Canonical Facts)
├── id               -- 主键
├── fact.kind        -- 媒体类型 (image/document/audio/video)
├── fact.url         -- 规范化 URL
├── fact.mimeType    -- MIME 类型
├── fact.size        -- 文件大小
├── fact.thumbnail   -- 缩略图信息
├── fact.metadata    -- 扩展元数据
├── workspace_id      -- 工作空间标识
├── agent_id          -- Agent 标识
└── transcript_id     -- 关联的转录记录
```

### 2.3 迁移策略

```
PR 1: 双写阶段 (Dual-Write)     → PR 2: 遗留投影 (Legacy Projection)
                                                      ↓
PR 3: 规范迁移 (Canonical Cutover) ← 当前阶段 → PR 4: 遗留删除 (Legacy Retirement)
```

---

## 三、迁移执行机制

### 3.1 迁移命令

```bash
# 执行迁移（幂等操作）
openclaw doctor --fix

# 验证迁移状态
openclaw doctor

# 查看迁移详情
openclaw doctor --verbose
```

### 3.2 迁移范围

| 数据类型 | 迁移方式 | 说明 |
|----------|----------|------|
| 活跃 `transcript_events` 行 | 事实优先填补（facts-first gap-fill） | 直接迁移至 `__openclaw.media` |
| 裸遗留 kind | 映射至 `fact.kind` | 类型规范化 |
| 转录索引和工作空间目录 | 迁移至 per-fact 字段 | 结构化存储 |
| 冷门 plain/.zst 归档 | 重写通过临时文件 + 编解码器回读 + 事件/ID 验证 + 原子替换 | 完整归档迁移 |
| 轨迹运行时快照 | 原地规范化（telemetry 保留，无行删除） | 零数据丢失 |

### 3.3 迁移安全措施

```
✅ 无效 JSON → 该所有者中止，不做部分工作
✅ 歧义遗留对齐 → 该所有者中止
✅ 源文件变更 → 该所有者中止
✅ 重运行 = 空操作（幂等保证）
```

---

## 四、Schema 版本管理

### 4.1 Schema 版本演进

| 版本 | 变更 | 说明 |
|------|------|------|
| v14 | 初始 Schema | 遗留媒体字段 |
| v15 | Board/Session 共享表 | 主分支独立升级 |
| **v16** | **规范媒体迁移** | **当前版本** |

### 4.2 Schema v16 特性

- **纯降级防护**: v16 仅作为降级守卫，无列/表/索引变更
- **共享状态 DB 未触及**: 仅修改 per-agent schema
- **v15 数据库修复**: v15 数据库在版本断言前修复规范索引，确保可修复安装不会搁浅

---

## 五、代码变更详情

### 5.1 删除的代码

| 删除项 | 说明 |
|--------|------|
| `shouldPersistStructuredMediaEntries` | 不再需要 |
| 对齐的投影模式（aligned projection mode） | 删除 |
| 通用转录追加边界遗留字段 | 用户轮次构建器停止写入 |
| 内部持久化读取器遗留回退 | 完全移除 |

### 5.2 保留的接口

| 保留项 | 说明 |
|--------|------|
| 公共 SDK 投影 | 保留至退役 PR 4 窗口到期 |

---

## 六、迁移后验证

### 6.1 验证检查清单

```bash
# 1. 检查 Schema 版本
openclaw db schema-version

# 2. 验证迁移完整性
openclaw doctor --verify

# 3. 检查媒体事实表
openclaw db query "SELECT COUNT(*) FROM __openclaw.media"

# 4. 验证遗留字段已清空
openclaw db query "SELECT COUNT(*) FROM transcript_events WHERE MediaUrl IS NOT NULL"
```

### 6.2 预期结果

| 检查项 | 预期结果 |
|--------|----------|
| Schema 版本 | v16 |
| `__openclaw.media` 行数 | > 0（有媒体数据时） |
| 遗留 `MediaUrl` 字段 | NULL（新增写入已停止） |

---

## 七、回滚方案

### 7.1 降级路径

v16 → v15 的降级是安全的，因为：
- 无列/表/索引变更
- 共享状态 DB 未修改
- v15 数据库修复在版本断言前执行

### 7.2 紧急回滚步骤

```bash
# 1. 停止 Agent
openclaw stop

# 2. 降级 Schema
openclaw db downgrade --to v15

# 3. 重启 Agent
openclaw start
```

---

## 八、开发者指南

### 8.1 新增媒体记录

使用规范的事实 API：

```typescript
import { MediaFact } from '@openclaw/sdk';

// 创建媒体事实
const mediaFact: MediaFact = {
  kind: 'image',
  url: 'file:///workspace/media/screenshot.png',
  mimeType: 'image/png',
  size: 102400,
  metadata: {
    width: 1920,
    height: 1080,
  },
};

// 通过 SDK 保存
await agent.media.save(mediaFact);
```

### 8.2 读取媒体记录

```typescript
// 查询媒体事实
const facts = await agent.media.list({
  kind: 'image',
  limit: 10,
});

// 获取单个媒体
const fact = await agent.media.get(factId);
```

---

## 九、常见问题

### Q1: 迁移是否会影响性能？

**A**: 迁移过程中可能有短暂性能下降，因为：
- `openclaw doctor --fix` 需要全量扫描
- 归档重写需要额外 I/O

建议在低峰期执行迁移。

### Q2: 如果迁移中断怎么办？

**A**: 迁移是幂等的，可以安全重试：

```bash
openclaw doctor --fix
```

### Q3: 如何确认迁移完成？

**A**: 检查以下指标：

```bash
# 检查迁移日志
openclaw logs --grep "media migration" | tail -20

# 检查遗留字段
openclaw db query "SELECT * FROM transcript_events WHERE MediaUrl NOT NULL LIMIT 1"
```

---

## 十、相关文档

| 文档 | 说明 |
|------|------|
| [存储模型概述](./README.md) | 存储架构总览 |
| [远程编码](./core/remote-coding.md) | 编码相关存储 |
| [Supervisor 模式](./operation/supervisor-mode.md) | 运行模式配置 |

---

## 十一、变更日志

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-07-25 | v2026.7.2 | 初始发布：SQLite Media → Canonical Facts 迁移 |

---

*本文档由墨客-内容生成审核 Cron 自动生成*  
*数据来源: PR #113695, OpenClaw 官方仓库*
