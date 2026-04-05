# MemOS vs OpenViking 外部记忆系统调研报告

> 本文档对比 MemOS 和 OpenViking 两种 OpenClaw 外部记忆解决方案，以及为什么需要外部 Memory
> 日期：2026-03-27
> 来源：GitHub 调研 + 深度分析

---

## 一、为什么需要外部 Memory？

### 1.1 OpenClaw 内置 Memory 现状

| 类型 | 存储位置 | 能力 |
|------|---------|------|
| **每日日志** | memory/*.md | 简单追加 |
| **长期记忆** | MEMORY.md | 手工维护 |
| **向量索引** | *.sqlite | 基础语义搜索 |
| **QMD后端** | 本地 | BM25+向量（可选） |

### 1.2 规模问题

| 场景 | 内置方案 | 外部方案 |
|------|---------|---------|
| 100篇文档 | ⚠️ 慢 | ✅ 快 |
| 1000篇文档 | ❌ 难 | ✅ 快 |
| 跨Agent共享 | ❌ 不能 | ✅ 可以 |

### 1.3 能力差距

| 能力 | 内置 | MemOS | OpenViking |
|------|------|-------|------------|
| 跨会话记忆 | ❌ | ✅ | ✅ |
| 自动摘要 | ❌ | ❌ | ✅ L0/L1/L2 |
| 分层加载 | ❌ | ❌ | ✅ 按需 |
| 技能复用 | ❌ | ✅ | ✅ |
| 可视化 | ❌ | ❌ | ✅ |

### 1.4 简单类比

```
内置 Memory = 笔记本（记笔记）
外部 Memory = 图书馆（检索+管理+复用）
```

**当"知识"变多、变复杂时，笔记本不够用了。**

### 1.5 适合你的场景吗？

看你的系统：
- 8个群 + 100+个子Agent
- 大量内容运营、金融分析文档

**可能需要**：OpenViking 管理大文档库

---

## 二、项目概览

| 项目 | 厂商 | Stars | 语言 | 定位 |
|------|------|-------|------|------|
| **MemOS** | MemOS | 7.8K | Python | AI Memory OS，跨任务技能复用 |
| **OpenViking** | 字节火山引擎 | 19.3K | Python | 上下文数据库，文件系统范式 |

---

## 三、MemOS 详解

### 简介

**描述**：AI Memory OS for LLM and Agent systems，支持跨任务技能复用和进化。

### OpenClaw 插件

| 插件 | Stars | 说明 |
|------|-------|------|
| **memos-cloud-openclaw-plugin** | 330 | 官方插件 |
| **memos-openclaw-local** | 5 | 自托管版本 |

### 核心功能

- **Recall**：执行前从 MemOS Cloud 召回记忆
- **Add**：执行后将消息添加到 MemOS Cloud
- **Token Auth**：使用 API Key 认证

### 安装方式

```bash
# NPM 安装（推荐）
openclaw plugins install @memtensor/memos-cloud-openclaw-plugin@latest

# 手动安装
# 1. 下载 .tgz 包
# 2. 解压到 ~/.openclaw/extensions/memos-cloud-openclaw-plugin
# 3. 配置 openclaw.json
```

### 环境变量配置

```env
MEMOS_API_KEY=YOUR_TOKEN
MEMOS_BASE_URL=https://memos.memtensor.cn/api/openmem/v1  # 可选
MEMOS_USER_ID=openclaw-user  # 可选
MEMOS_MULTI_AGENT_MODE=false  # 多Agent数据隔离
```

### 高级配置

| 配置 | 默认值 | 说明 |
|------|--------|------|
| `MEMOS_CONVERSATION_ID` | - | 指定会话ID |
| `MEMOS_RECALL_GLOBAL` | `true` | 全局搜索不过滤会话 |
| `MEMOS_RECALL_FILTER_ENABLED` | `false` | 注入前运行模型过滤 |

### 适用场景

- ✅ 需要跨任务记忆复用的场景
- ✅ 多Agent共享记忆
- ✅ 云端同步，一处更新处处生效
- ❌ 不适合完全本地化部署

---

## 四、OpenViking 详解

### 简介

**描述**：专为 AI Agents 设计的上下文数据库，采用文件系统范式统一管理 memory、resources、skills。

### 核心特性

| 特性 | 说明 |
|------|------|
| **文件系统范式** | 像管理本地文件一样管理上下文 |
| **分层加载** | L0/L1/L2 三层，按需加载，节省 token |
| **目录递归检索** | 结合目录定位和语义搜索 |
| **可视化检索轨迹** | 可观测的上下文 |
| **自动会话管理** | 自动压缩、提取长期记忆 |

### OpenClaw Skill

| 插件 | Stars | 说明 |
|------|-------|------|
| **openclaw_openviking_skill** | 20 | NVIDIA NIM API |
| **openclaw-memory-openviking** | 4 | Memory后端 |
| **openclaw-vikingfs** | 8 | 轻量级框架 |

### 安装方式

```bash
# 1. 安装 Python 包
pip install openviking

# 2. 获取 NVIDIA API Key（免费）
# https://build.nvidia.com/

# 3. 创建配置
mkdir -p ~/.openviking
cat > ~/.openviking/ov.conf << 'EOF'
{
  "embedding": {
    "dense": {
      "api_base": "https://integrate.api.nvidia.com/v1",
      "api_key": "YOUR_NVIDIA_API_KEY",
      "provider": "openai",
      "dimension": 4096,
      "model": "nvidia/nv-embed-v1"
    }
  },
  "vlm": {
    "api_base": "https://integrate.api.nvidia.com/v1",
    "api_key": "YOUR_NVIDIA_API_KEY",
    "provider": "openai",
    "model": "meta/llama-3.3-70b-instruct"
  }
}
EOF

# 4. 设置环境变量
echo 'export OPENVIKING_CONFIG_FILE=~/.openviking/ov.conf' >> ~/.bashrc
```

### 与默认 qmd 对比

| 能力 | qmd (默认) | OpenViking |
|------|------------|------------|
| 语义搜索 | 基础向量匹配 | 目录递归+语义融合 |
| 自动摘要 | ❌ | ✅ L0/L1/L2三层 |
| 结构化浏览 | ❌ | ✅ 虚拟文件系统 |
| Token节省 | ❌ | ✅ 按需加载 |

### 适用场景

- ✅ 大型文档库（书籍、代码库、论文）
- ✅ 需要分层记忆的场景
- ✅ 需要可视化和可调试的检索
- ✅ 本地部署优先

---

## 五、功能对比

| 功能 | MemOS | OpenViking |
|------|-------|------------|
| **记忆类型** | 跨任务技能记忆 | 上下文（memory/resources/skills） |
| **存储方式** | 云端（MemOS Cloud） | 本地/云端 |
| **检索方式** | 语义搜索 | 文件系统+语义融合 |
| **分层加载** | ❌ | ✅ L0/L1/L2 |
| **多Agent支持** | ✅ | ✅ |
| **API Key** | MemOS API Key | NVIDIA NIM（免费） |
| **安装复杂度** | 中等 | 较高 |

---

## 六、使用建议

### 选择 MemOS 当：

- 需要跨会话、跨任务的统一记忆
- 团队/多Agent需要共享记忆
- 接受云端服务
- 想要开箱即用的插件

### 选择 OpenViking 当:

- 有大量文档需要索引
- 需要本地化部署
- 需要精细的记忆分层控制
- 需要可视化的检索过程

### 混合使用

```
┌─────────────────────────────────────────────┐
│              OpenClaw Agent                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────┐      ┌─────────────────┐    │
│  │  qmd       │      │  OpenViking     │    │
│  │ (日常记忆) │  +   │ (大型文档库)    │    │
│  └─────────────┘      └─────────────────┘    │
│                                             │
│  ┌─────────────┐                           │
│  │  MemOS     │  ← 跨任务技能复用          │
│  │ (可选)      │                           │
│  └─────────────┘                           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 七、相关资源

### MemOS
- GitHub: https://github.com/MemTensor/MemOS
- 插件: https://github.com/MemTensor/MemOS-Cloud-OpenClaw-Plugin
- API Keys: https://memos-dashboard.openmem.net/cn/apikeys/

### OpenViking
- GitHub: https://github.com/volcengine/OpenViking
- 文档: https://openviking.ai/docs
- OpenClaw Skill: https://github.com/swizardlv/openclaw_openviking_skill

---

*文档更新时间: 2026-03-27*
