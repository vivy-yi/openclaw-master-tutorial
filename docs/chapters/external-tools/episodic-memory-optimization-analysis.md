# Episodic-Memory 存储优化分析报告

**文档类型**: 技术问题分析与优化建议
**创建日期**: 2025-01-21
**分析对象**: episodic-memory v1.0.15
**问题级别**: 存储浪费 (2.7GB)

---

## 目录

1. [问题发现](#问题发现)
2. [存储架构分析](#存储架构分析)
3. [问题根源](#问题根源)
4. [技术细节](#技术细节)
5. [解决方案](#解决方案)
6. [实施建议](#实施建议)

---

## 问题发现

### 初始疑问

在研究论文分析过程中，发现 superpowers 插件占用了大量存储空间。用户提出关键问题：

> **"superpower 为什么不是直接读取 claude 的 conversation-project 里面的资源，而是又保存了一份，这严重会影响电脑的存储"**

这个问题指向了一个重要的设计缺陷。

### 存储现状检查

经过系统检查，发现以下存储分布：

```
✅ Claude Code 原始对话 (~/.claude/projects):      2.9GB
❌ Episodic-Memory 备份 (~/.config/superpowers):   2.7GB  ← 完全重复！
📊 搜索索引 (SQLite):                              128KB

总计浪费存储空间: 2.7GB
```

**关键发现**：
- conversation-project: 2.9GB (原始数据)
- conversation-archive: 2.7GB (重复备份)
- 数据库索引: 128KB (唯一需要的额外存储)

---

## 存储架构分析

### 当前架构（低效）

```
┌─────────────────────────────────────────────────────────┐
│  Claude Code Conversation System                       │
│                                                         │
│  ~/.claude/projects/ (2.9GB)                           │
│  ├── project-a/                                        │
│  │   ├── session-1.jsonl (500MB)                      │
│  │   └── session-2.jsonl (300MB)                      │
│  └── project-b/                                        │
│      └── session-3.jsonl (200MB)                       │
└─────────────────────────────────────────────────────────┘
                         ↓
                 复制整个文件 (浪费)
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Episodic-Memory Archive (2.7GB - 完全重复)           │
│                                                         │
│  ~/.config/superpowers/conversation-archive/           │
│  ├── project-a/                                        │
│  │   ├── session-1.jsonl (500MB) ← 副本1              │
│  │   └── session-2.jsonl (300MB) ← 副本2              │
│  └── project-b/                                        │
│      └── session-3.jsonl (200MB) ← 副本3              │
│                                                         │
│  + summary 文件 (每个几KB)                              │
└─────────────────────────────────────────────────────────┘
                         ↓
              提取嵌入向量 + 元数据
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Search Index (128KB)                                  │
│                                                         │
│  ~/.config/superpowers/conversation-index/             │
│  └── db.sqlite                                         │
│      ├── exchanges 表 (文本 + 行号)                    │
│      ├── vec_exchanges 表 (384维向量)                  │
│      └── archive_path 字段 (指向副本)                  │
└─────────────────────────────────────────────────────────┘
```

### 理想架构（高效）

```
┌─────────────────────────────────────────────────────────┐
│  Claude Code Conversation System                       │
│                                                         │
│  ~/.claude/projects/ (2.9GB)                           │
│  ├── project-a/                                        │
│  │   ├── session-1.jsonl (500MB) ← 唯一副本           │
│  │   └── session-2.jsonl (300MB)                       │
│  └── project-b/                                        │
│      └── session-3.jsonl (200MB)                       │
└─────────────────────────────────────────────────────────┘
                         ↓
                 直接读取 (无复制)
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Search Index (128KB)                                  │
│                                                         │
│  ~/.config/superpowers/conversation-index/             │
│  └── db.sqlite                                         │
│      ├── exchanges 表 (文本 + 行号)                    │
│      ├── vec_exchanges 表 (384维向量)                  │
│      └── source_path 字段 (指向原始文件)               │
└─────────────────────────────────────────────────────────┘
```

**对比总结**：
- 当前: 2.9GB + 2.7GB + 128KB = **5.6GB 总存储**
- 理想: 2.9GB + 128KB = **2.9GB 总存储**
- **可节省: 2.7GB (48% 存储空间)**

---

## 问题根源

### 代码分析

#### 1. 复制逻辑 (indexer.js:69-73)

**位置**: `/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/dist/indexer.js`

```javascript
// 第 69-73 行
const sourcePath = path.join(projectPath, file);
const archivePath = path.join(projectArchive, file);

// Copy to archive
if (!fs.existsSync(archivePath)) {
    fs.copyFileSync(sourcePath, archivePath);  ← 复制整个文件
    console.log(`  Archived: ${file}`);
}
```

**问题**: 每次索引时，都会完整复制 JSONL 文件到 archive 目录。

#### 2. 数据库设计 (db.js:53)

**位置**: `/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/dist/db.js`

```sql
CREATE TABLE IF NOT EXISTS exchanges (
  id TEXT PRIMARY KEY,
  project TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_message TEXT NOT NULL,
  archive_path TEXT NOT NULL,  ← 存储备份路径
  line_start INTEGER NOT NULL,
  line_end INTEGER NOT NULL,
  ...
)
```

**问题**: 数据库存储 `archive_path` 而不是 `source_path`，导致后续读取必须依赖副本。

#### 3. 读取逻辑 (mcp-server.js:19690)

**位置**: `/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/dist/mcp-server.js`

```javascript
// 第 19690 行
if (name === "read") {
    const params = ShowConversationInputSchema.parse(args);
    const jsonlContent = fs.readFileSync(params.path, "utf-8");
    // params.path 来自数据库的 archive_path
    // 因此必须依赖副本文件
}
```

**问题**: MCP 服务器的 read 操作依赖数据库中的 `archive_path` 字段。

### 设计初衷推测

通过代码分析和 README.md 文档，推测原始设计意图：

1. **独立性**: Archive 作为独立快照，即使原始对话被删除也能搜索
2. **集中管理**: 所有历史对话统一存放在 `~/.config/superpowers/`
3. **不变性**: Archive 不受原始文件后续修改影响（虽然实际 JSONL 是追加写入的）

### 为什么这是不必要的？

**现实情况分析**：

| 假设 | 实际 | 结论 |
|------|------|------|
| 原始文件可能被修改 | JSONL 是追加写入，不会修改已有内容 | ❌ 无需快照 |
| 原始文件可能被删除 | 删除对话是罕见操作 | ❌ 过度保护 |
| Archive 提供额外价值 | 2.7GB 复制 vs 128KB 索引 | ❌ 性价比极低 |

**证据**：README.md:227 明确说明工作流程

> **How It Works**
> 1. **Sync** - Copies conversation files from `~/.claude/projects` to archive
> 2. **Parse** - Extracts user-agent exchanges from JSONL format
> 3. **Embed** - Generates vector embeddings using Transformers.js (local, offline)
> 4. **Index** - Stores in SQLite with sqlite-vec for fast similarity search

这证明**复制是设计选择，而非配置选项**。

---

## 技术细节

### 文件结构分析

#### Summary 文件大小

```bash
-rw-r--r--@ 1 d  staff   862B  [conversation-1]-summary.txt
-rw-r--r--@ 1 d  staff   500B  [conversation-2]-summary.txt
-rw-r--r--@ 1 d  staff   874B  [conversation-3]-summary.txt
```

**发现**: Summary 文件每个只有 500-900 字节，占用空间极小。

#### 存储占比分析

```
总存储: 5.6GB
├── 原始 JSONL: 2.9GB (52%)
├── 副本 JSONL: 2.7GB (48%) ← 完全浪费
└── SQLite 索引: 128KB (<0.01%)

副本数据占比: 48%
```

### JSONL 文件特征

**观察**: 对话文件具有以下特征：

1. **追加写入**: 新消息追加到文件末尾
2. **不可变性**: 已有的对话内容不会修改
3. **会话隔离**: 每个会话一个独立文件

**结论**: JSONL 文件的追加写入特性意味着不需要"快照"保护。

### 能否通过 SKILL 说明改变？

**问题**: 能否通过修改 episodic-memory 的 SKILL.md 来改变备份行为？

**答案**: **❌ 不能**

**原因分析**：

```
┌─────────────────────────────────────────────────────────┐
│  架构分层                                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  SKILL.md (说明文档)                            │   │
│  │  作用: 告诉 AI 如何使用工具                      │   │
│  │  能控制: 搜索时机、查询构造、结果解读            │   │
│  │  ❌ 不能改变: MCP 服务器内部实现                 │   │
│  └─────────────────────────────────────────────────┘   │
│                    ↑ MCP 协议调用                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  MCP Server (独立进程)                          │   │
│  │  - 编译后的 JavaScript                          │   │
│  │  - 硬编码的文件复制逻辑                          │   │
│  │  - 无法通过外部说明修改                          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**技术原因**：
1. episodic-memory 是**编译后的独立程序**
2. 备份逻辑**硬编码**在 JavaScript 代码中
3. SKILL.md 只影响"使用方式"，不影响"实现逻辑"

---

## 解决方案

### 方案对比矩阵

| 方案 | 难度 | 效果 | 风险 | 推荐度 |
|------|------|------|------|--------|
| **A: 禁用插件** | ⭐ 低 | 节省 2.7GB | 失去搜索功能 | ⭐⭐⭐ |
| **B: 修改源码** | ⭐⭐⭐⭐ 高 | 节省 2.7GB | 兼容性问题 | ⭐⭐⭐⭐ |
| **C: 联系作者** | ⭐⭐ 中 | 长期解决 | 需要等待 | ⭐⭐⭐⭐⭐ |
| **D: 替代方案** | ⭐⭐ 中 | 部分功能 | 功能减少 | ⭐⭐ |

### 方案 A: 禁用插件（快速解决）

**适用场景**: 存储空间紧张，暂时不需要搜索功能

**操作步骤**:

```bash
# 1. 禁用 episodic-memory 插件
/plugin uninstall episodic-memory

# 2. 删除重复数据
rm -rf ~/.config/superpowers/

# 3. 验证空间释放
df -h ~/.claude

# 结果: 立即释放 2.7GB 存储空间 ✅
```

**优点**:
- ✅ 立即释放 2.7GB
- ✅ 操作简单，无风险
- ✅ 可随时重新安装

**缺点**:
- ❌ 失去语义搜索功能
- ❌ 无法查看历史对话摘要

### 方案 B: 修改源码（彻底解决）

**适用场景**: 需要搜索功能，且有开发能力

#### 修改点汇总

**文件 1: indexer.js** (第 69-86 行)

```javascript
// 当前代码
const sourcePath = path.join(projectPath, file);
const archivePath = path.join(projectArchive, file);

// Copy to archive
if (!fs.existsSync(archivePath)) {
    fs.copyFileSync(sourcePath, archivePath);
    console.log(`  Archived: ${file}`);
}

const exchanges = await parseConversation(sourcePath, project, archivePath);

toProcess.push({
    file,
    sourcePath,
    archivePath,  // ← 存储备份路径
    summaryPath: archivePath.replace('.jsonl', '-summary.txt'),
    exchanges
});

// 修改后代码
const sourcePath = path.join(projectPath, file);

// 删除复制逻辑
// if (!fs.existsSync(archivePath)) {
//     fs.copyFileSync(sourcePath, archivePath);
//     console.log(`  Archived: ${file}`);
// }

const exchanges = await parseConversation(sourcePath, project, sourcePath);

toProcess.push({
    file,
    sourcePath,
    sourcePath,  // ← 直接使用源路径
    summaryPath: path.join(path.dirname(sourcePath), file.replace('.jsonl', '-summary.txt')),
    exchanges
});
```

**文件 2: db.js** (第 53 行)

```sql
-- 当前代码
CREATE TABLE IF NOT EXISTS exchanges (
  ...
  archive_path TEXT NOT NULL,
  ...
)

-- 修改后代码
CREATE TABLE IF NOT EXISTS exchanges (
  ...
  source_path TEXT NOT NULL,
  ...
)
```

**文件 3: search.js** (第 43 行)

```javascript
// 当前代码
SELECT
  e.id,
  e.project,
  e.timestamp,
  e.user_message,
  e.assistant_message,
  e.archive_path,  ← 返回备份路径
  e.line_start,
  e.line_end,
  vec.distance
FROM vec_exchanges AS vec
JOIN exchanges AS e ON vec.id = e.id

-- 修改后代码
SELECT
  e.id,
  e.project,
  e.timestamp,
  e.user_message,
  e.assistant_message,
  e.source_path,  ← 返回源路径
  e.line_start,
  e.line_end,
  vec.distance
FROM vec_exchanges AS vec
JOIN exchanges AS e ON vec.id = e.id
```

**文件 4: mcp-server.js** (第 18013, 18027 行)

```javascript
// 需要同步修改所有使用 archive_path 的地方
// 改为使用 source_path
```

#### 实施步骤

**选项 1: 直接修改编译后的文件** (不推荐)

```bash
# 1. 备份原文件
EPISODIC_DIR="/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15"
BACKUP_DIR="/tmp/episodic-memory-backup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$EPISODIC_DIR/dist/indexer.js" "$BACKUP_DIR/"
cp "$EPISODIC_DIR/dist/db.js" "$BACKUP_DIR/"
cp "$EPISODIC_DIR/dist/search.js" "$BACKUP_DIR/"

# 2. 手动编辑编译后的 JS 文件 (不推荐)
# - 代码已被压缩和混淆
# - 容易引入错误
# - 无法维护
```

**选项 2: Fork 源码修改** (推荐)

```bash
# 1. Clone episodic-memory 仓库
git clone https://github.com/[username]/episodic-memory.git
cd episodic-memory

# 2. 修改源码
# - src/indexer.ts
# - src/db.ts
# - src/search.ts
# - src/mcp-server.ts

# 3. 重新构建
npm install
npm run build

# 4. 替换本地文件
cp dist/* ~/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/dist/

# 5. 清理旧数据
rm -rf ~/.config/superpowers/conversation-archive/

# 6. 重建索引
episodic-memory sync
```

**优点**:
- ✅ 彻底解决问题
- ✅ 保持搜索功能
- ✅ 节省 2.7GB 空间
- ✅ 提升索引速度（无需复制）

**缺点**:
- ❌ 需要开发能力
- ❌ 需要维护自定义版本
- ❌ 升级时需要重新修改

### 方案 C: 联系作者（最佳方案）

**适用场景**: 希望官方支持此优化

#### 建议内容

**主题**: Feature Request: Optional archive to save 2.7GB storage

**正文**:

```
Hi Jesse,

I've been using episodic-memory and found it incredibly useful for semantic search across conversations.

However, I noticed a significant storage overhead: the plugin creates a full copy of all conversation files in ~/.config/superpowers/conversation-archive/ (2.7GB in my case), even though the original files in ~/.claude/projects/ remain unchanged.

**Current behavior:**
- Source: ~/.claude/projects/ (2.9GB)
- Archive copy: ~/.config/superpowers/conversation-archive/ (2.7GB) ← duplicate
- Search index: 128KB
- Total: 5.6GB

**Proposed optimization:**
Since JSONL files are append-only and never modify existing content, would it be possible to:
1. Add a configuration option like --no-archive or USE_ARCHIVE=false
2. Store source_path instead of archive_path in the database
3. Read directly from ~/.claude/projects/ during search

This would reduce storage from 5.6GB to 2.9GB (48% reduction) without losing any functionality.

**Benefits:**
- Save 2.7GB disk space per user
- Faster indexing (no file copying)
- Simpler architecture
- Backward compatible (opt-in via config)

Would you be open to a PR for this feature?

Thanks for the great plugin!
[Your Name]
```

**联系方式**:
- Email: jesse@fsck.com
- GitHub: [查找 episodic-memory 仓库]

**优点**:
- ✅ 官方支持，长期维护
- ✅ 所有用户受益
- ✅ 向后兼容
- ✅ 无需自定义版本

**缺点**:
- ❌ 需要等待实现
- ❌ 不确定是否会被接受

### 方案 D: 替代方案（临时方案）

**适用场景**: 快速搜索，无需复杂功能

#### 选项 1: 使用 grep

```bash
# 创建别名
alias search-conversations='grep -r ~/.claude/projects/*.jsonl'

# 使用
search-conversations "RAG optimization"
```

#### 选项 2: 使用 jq

```bash
# 安装 jq
brew install jq

# 搜索
jq -r '.[] | select(.content | contains("关键词"))' ~/.claude/projects/*.jsonl
```

#### 选项 3: 自建简单索引

```bash
#!/bin/bash
# simple-search.sh

INDEX_FILE="$HOME/.conversation-index.txt"

# 构建索引
build_index() {
    echo "Building conversation index..."
    > "$INDEX_FILE"
    find ~/.claude/projects -name "*.jsonl" | while read file; do
        echo "=== $file ===" >> "$INDEX_FILE"
        grep -h "content" "$file" | jq -r '.content' >> "$INDEX_FILE"
        echo "" >> "$INDEX_FILE"
    done
}

# 搜索
search() {
    grep -C 3 "$1" "$INDEX_FILE"
}

# 使用
# ./simple-search.sh build
# ./simple-search.sh search "关键词"
```

**优点**:
- ✅ 无需额外存储
- ✅ 简单直接
- ✅ 完全可控

**缺点**:
- ❌ 无语义搜索
- ❌ 功能有限
- ❌ 性能较差（大文件）

---

## 实施建议

### 推荐路线图

**短期（立即）**:

```bash
# 评估存储压力
du -sh ~/.config/superpowers/

# 如果空间紧张，先禁用
/plugin uninstall episodic-memory
rm -rf ~/.config/superpowers/
```

**中期（1-2周）**:

1. 联系作者提交 feature request
2. 评估是否需要 Fork 自定义版本
3. 测试替代搜索方案

**长期（1-3月）**:

1. 等待官方支持（或 PR 被合并）
2. 升级到优化版本
3. 重建索引

### 风险评估

| 方案 | 数据丢失 | 功能中断 | 兼容性 | 维护成本 |
|------|---------|---------|--------|---------|
| A: 禁用 | 无 | 高 (失去搜索) | - | 低 |
| B: 修改源码 | 低 | 低 | 中 | 高 |
| C: 等待官方 | 无 | 无 | 高 | 低 |
| D: 替代方案 | 无 | 中 | - | 中 |

### 回滚策略

对于每种方案，都应准备回滚方案：

**方案 B 回滚**:

```bash
# 如果修改导致问题，立即回滚
cd /tmp/episodic-memory-backup-[timestamp]/
cp dist/* ~/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/dist/

# 重建 archive
episodic-memory sync
```

**方案 A 回滚**:

```bash
# 重新安装插件
/plugin install episodic-memory@superpowers-marketplace

# 恢复数据（如果有备份）
# cp -r backup/conversation-archive ~/.config/superpowers/
```

---

## 附录

### A. 存储分析脚本

```bash
#!/bin/bash
# storage-analysis.sh

echo "=== Episodic-Memory 存储分析 ==="
echo ""

# 原始对话大小
SOURCE_SIZE=$(du -sh ~/.claude/projects 2>/dev/null | awk '{print $1}')
echo "📁 原始对话 (~/.claude/projects): $SOURCE_SIZE"

# Archive 大小
ARCHIVE_SIZE=$(du -sh ~/.config/superpowers/conversation-archive 2>/dev/null | awk '{print $1}')
echo "📁 Archive 副本: $ARCHIVE_SIZE"

# 索引大小
INDEX_SIZE=$(du -sh ~/.config/superpowers/conversation-index 2>/dev/null | awk '{print $1}')
echo "📊 搜索索引: $INDEX_SIZE"

# 可节省空间
WASTED_SIZE=$(du -sk ~/.config/superpowers/conversation-archive 2>/dev/null | awk '{print $1/1024/1024 " GB"}')
echo ""
echo "💾 可优化存储空间: $WASTED_SIZE"

# 对话文件数量
FILE_COUNT=$(find ~/.claude/projects -name "*.jsonl" | wc -l | tr -d ' ')
echo "📝 对话文件数量: $FILE_COUNT"

# 最大的对话文件
echo ""
echo "📊 最大的 5 个对话文件:"
du -h ~/.claude/projects/*/*.jsonl 2>/dev/null | sort -rh | head -5
```

### B. 监控脚本

```bash
#!/bin/bash
# monitor-episodic-growth.sh

LOG_FILE="$HOME/episodic-growth.log"

while true; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    ARCHIVE_SIZE=$(du -sk ~/.config/superpowers/conversation-archive 2>/dev/null | awk '{print $1}')

    echo "$TIMESTAMP,$ARCHIVE_SIZE" >> "$LOG_FILE"
    echo "[$TIMESTAMP] Archive size: ${ARCHIVE_SIZE}KB"

    sleep 3600  # 每小时检查一次
done
```

### C. 相关文件路径

```
配置文件:
~/.config/superpowers/conversation-index/exclude.txt  # 排除配置
~/.config/superpowers/conversation-index/db.sqlite    # 搜索数据库

数据目录:
~/.claude/projects/                                    # 原始对话
~/.config/superpowers/conversation-archive/           # 备份副本
~/.config/superpowers/conversation-index/            # 索引文件

插件目录:
~/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/
```

### D. 环境变量

```bash
# Episodic-Memory 配置
EPISODIC_MEMORY_CONFIG_DIR=/custom/path          # 配置目录
PERSONAL_SUPERPOWERS_DIR=/custom/path            # 超能力目录
XDG_CONFIG_HOME=/custom/path                     # XDG 配置目录

# API 配置
EPISODIC_MEMORY_API_MODEL=opus                   # 摘要模型
EPISODIC_MEMORY_API_MODEL_FALLBACK=sonnet        # 备用模型
EPISODIC_MEMORY_API_BASE_URL=https://...         # API 端点
EPISODIC_MEMORY_API_TOKEN=your-token             # API Token
EPISODIC_MEMORY_API_TIMEOUT_MS=3000000           # 超时时间

# 测试/调试
TEST_ARCHIVE_DIR=/tmp/test-archive              # 测试存档目录
TEST_PROJECTS_DIR=/tmp/test-projects            # 测试项目目录
EPISODIC_MEMORY_DB_PATH=/tmp/test.db            # 测试数据库
```

### E. 参考资料

- **Episodic-Memory README**: `/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/README.md`
- **Package.json**: `/Users/d/.claude/plugins/cache/superpowers-marketplace/episodic-memory/1.0.15/package.json`
- **作者**: Jesse Vincent (jesse@fsck.com)
- **许可证**: MIT
- **版本**: 1.0.15

### F. 联系作者模板

**GitHub Issue Template**:

```markdown
## Feature Request: Optional archive to save storage space

### Problem
Episodic-memory creates a full copy of all conversation files, resulting in ~2.7GB of duplicated data.

### Current Storage
- Source: ~/.claude/projects/ (2.9GB)
- Archive: ~/.config/superpowers/conversation-archive/ (2.7GB) ← duplicate
- Index: 128KB
- **Total: 5.6GB**

### Proposed Solution
Add a `--no-archive` option that:
1. Skips file copying during sync
2. Stores `source_path` instead of `archive_path` in database
3. Reads directly from original files during search

### Benefits
- **48% storage reduction** (5.6GB → 2.9GB)
- Faster indexing (no file copying overhead)
- Simpler architecture
- Backward compatible (opt-in)

### Implementation Notes
Since JSONL files are append-only and never modify existing content, the archive copy provides no additional safety. The search index (128KB) is sufficient for semantic search.

Would you be open to a PR implementing this feature?
```

---

## 总结

### 关键发现

1. **存储浪费**: episodic-memory 创建 2.7GB 重复备份
2. **设计缺陷**: 备份逻辑硬编码在实现中，无法通过配置禁用
3. **可优化**: JSONL 追加写入特性使备份变得不必要
4. **无法通过说明修改**: SKILL.md 只影响使用方式，不影响实现逻辑

### 推荐行动

**立即行动**:
```bash
# 评估存储压力
du -sh ~/.config/superpowers/

# 如果紧张，先禁用插件节省空间
```

**短期行动**:
- 联系作者提交 feature request
- 测试替代搜索方案

**长期行动**:
- 等待官方支持（或参与贡献）
- 升级到优化版本

### 影响评估

**用户规模影响**:
- 假设 1000 用户，每人浪费 2.7GB
- **总浪费: 2.7TB 存储空间**

**优化价值**:
- 个人: 节省 2.7GB (48%)
- 社区: 节省数 TB 存储空间
- 环境: 减少存储能耗

---

**文档版本**: v1.0
**最后更新**: 2025-01-21
**状态**: 待实施
**优先级**: 高（存储优化）
