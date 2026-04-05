# 18-20 Skill_Seekers 深度解析

> **学习目标**: 深入理解 Skill_Seekers 的架构、方法论、提示词组装机制，以及与 OpenClaw Skills 的关系
> **预计用时**: 40 分钟
> **前置要求**: 熟悉 Skills 基础概念（第18章）、了解 RAG 概念

---

## 18.20.1 项目概览

| 属性 | 值 |
|------|---|
| **GitHub** | [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) |
| **版本** | 3.4.0 |
| **Python** | 3.10+ |
| **PyPI** | `skill-seekers` |
| **Stars** | 活跃开源项目，多语言文档 |
| **License** | MIT |

### 核心定位

> Skill_Seekers 是**通用预处理层**，位于原始文档和所有使用它的 AI 系统之间。无论目标平台是 Claude、LangChain 还是 Pinecone——数据准备工作完全相同。

```
一次预处理 → 导出到所有目标平台
```

### 支持的来源类型（17种）

```
文档网站 | GitHub | PDF | Word | EPUB | 视频 | 本地代码库
Jupyter | HTML | OpenAPI | AsciiDoc | PPTX | RSS | ManPage
Confluence | Notion | Chat(Slack/Discord)
```

### 支持的输出目标（24+）

```
LLM 平台: Claude | Gemini | OpenAI | MiniMax | DeepSeek | Qwen
          OpenRouter | Together | Fireworks | OpenCode | Kimi

向量数据库: ChromaDB | FAISS | Qdrant | Weaviate | Pinecone

RAG 框架: LangChain | LlamaIndex | Haystack
```

---

## 18.20.2 架构流程详解

### 五阶段数据流

```
Phase 1: Scrape（抓取）
  └─ 17 种来源各有专用 scraper
     src/skill_seekers/cli/{type}_scraper.py

Phase 2: Build（构建）
  └─ unified_skill_builder.py
     ├─ smart_categorize() — 评分分类
     └─ 生成 SKILL.md + references/

Phase 3: Merge（合并）
  └─ unified_codebase_analyzer.py — 三流架构
     ├─ Stream 1: 代码分析 (AST, patterns, tests)
     ├─ Stream 2: 文档 (README, docs/)
     └─ Stream 3: 社区 (issues, PRs, metadata)

Phase 4: Enhance（增强, 可选）
  └─ enhance_skill.py / enhance_skill_local.py
     ├─ API mode: Anthropic/Gemini/Kimi/OpenAI
     └─ LOCAL mode: Claude Code/Codex/Copilot/OpenCode/Kimi

Phase 5: Package（打包）
  └─ adaptors/ 策略模式
     ├─ 24+ LLM 平台
     └─ 6+ 向量数据库
```

### 核心组件对照表

| 组件 | 文件 | 功能 |
|------|------|------|
| **统一入口** | `create_command.py` | 自动检测来源类型，路由到对应 scraper |
| **冲突检测** | `conflict_detector.py` | 检测文档 vs 代码的 4 类冲突 |
| **Skill 构建** | `unified_skill_builder.py` | 多源合并 + pairwise synthesis |
| **代码分析** | `unified_codebase_analyzer.py` | 三流架构抓取 |
| **增强提示** | `enhance_skill.py` | LLM 重写 SKILL.md |
| **平台适配** | `adaptors/*.py` | 策略模式，24+ 平台输出 |

---

## 18.20.3 冲突检测机制（核心亮点）

`conflict_detector.py` 实现四类冲突检测：

### 四类冲突

| 冲突类型 | 定义 | 检测方式 |
|---------|------|---------|
| `missing_in_docs` | 代码有但文档没有 | 代码 AST vs 文档内容比对 |
| `missing_in_code` | 文档有但代码没有 | 文档 vs 代码实际 API |
| `signature_mismatch` | 参数/类型不一致 | 签名 diff |
| `description_mismatch` | 描述矛盾 | 文档 vs 代码注释比对 |

### 冲突数据结构

```python
@dataclass
class Conflict:
    type: str          # 冲突类型
    severity: str     # 'low' | 'medium' | 'high'
    api_name: str      # API 名称
    docs_info: dict    # 文档中的信息
    code_info: dict    # 代码中的信息
    difference: str    # 差异描述
    suggestion: str    # 修复建议
```

### 冲突输出

```
SKILL.md 内注入：
## Known Discrepancies
⚠️ [API名称]: 文档说X，代码实际是Y

references/
└── conflicts.md  # 完整冲突报告
```

---

## 18.20.4 增强提示词组装解析

### 增强提示词结构（`_build_enhancement_prompt`）

```markdown
# 角色设定
You are enhancing an LLM skill's SKILL.md file.

# 元信息注入
- Name: {skill_name}
- Source Types: {sources_found}
- Multi-Source: Yes/No
- Conflicts Detected: Yes/No

# 当前 SKILL.md
(已有则展示，无则 "create from scratch")

# 来源分析
按 source_type 分组，Top 5 文件（confidence + size）

# 参考文档（核心）
grouped by (source, repo_id):
- 每个文件截断至 30K chars
- markdown code fence 包裹

# 来源优先级（冲突时）
1. 代码模式 (codebase_analysis) — Ground truth
2. 官方文档 — intended API
3. GitHub issues — 实际问题
4. PDF — 附加教程

# 多仓库处理（特殊逻辑）
当多 repo 时:
- 比较差异 ("httpx uses Strategy 50次, httpcore 32次")
- 揭示关系 ("httpx built on httpcore")
- 展示双方示例

# 任务指令（8 项）
1. Multi-Source Synthesis
2. "When to Use This Skill" — 具体触发条件
3. Quick Reference — 5-10 个最佳代码示例（5-20行）
4. Detailed Reference Files — 导航指引
5. "Working with This Skill" — 各级用户指南
6. Key Concepts — 核心概念
7. Conflict Handling — 已知差异透明化
8. 保持 frontmatter 完整
```

### 来源优先级设计

```
优先级 1: 代码模式 (codebase_analysis)
  → 为什么: 代码是 Ground Truth，实际在做什么
  → 证据: AST 分析 + 测试用例

优先级 2: 官方文档
  → 为什么: intended API 和设计意图
  → 证据: doc strings + 官方指南

优先级 3: GitHub issues
  → 为什么: 真实使用中的问题
  → 证据: 社区反馈

优先级 4: PDF 文档
  → 为什么: 附加教程和背景
  → 证据: 非结构化内容
```

---

## 18.20.5 三流代码分析架构

`unified_codebase_analyzer.py` 实现三层流同步抓取：

### Stream 1: 代码分析

```
AST 解析 → 设计模式检测 → 测试用例提取 → 指南生成
```

### Stream 2: 文档

```
README → docs/ → wiki → API reference
```

### Stream 3: 社区

```
issues → PRs → metadata → 社区反馈
```

---

## 18.20.6 Agent 模式支持

### API Mode

```bash
# 使用 API Key 调用 LLM
skill-seekers enhance output/react/ \
  --api-key sk-ant-... \
  --target claude
```

### LOCAL Mode

```bash
# 使用本地 Agent
skill-seekers enhance output/react/ \
  --agent claude \      # Claude Code
  --agent codex \       # Codex
  --agent copilot \     # Copilot
  --agent opencode \    # OpenCode
  --agent kimi          # Kimi Code
```

### 增强级别

```bash
--enhance-level 0   # 关闭
--enhance-level 1   # 仅 SKILL.md
--enhance-level 2   # 默认，均衡
--enhance-level 3   # 完整增强
```

---

## 18.20.7 与 skill-creator 的关系

### 本质区别

| 维度 | skill-creator | Skill_Seekers |
|------|--------------|--------------|
| **定位** | 从零创建 Skill 的框架 | 从外部文档**蒸馏** Skill 的流水线 |
| **输入** | 人工提炼的知识 | 文档网站/GitHub/PDF/视频等 17 种来源 |
| **核心问题** | "如何组织一个 Skill？" | "如何从海量文档中提取精华并转化为 Skill？" |
| **自动化程度** | 中等（框架辅助，人工主导） | 高（自动抓取 + 冲突检测 + 多源合并） |

### 互补关系

```
skill-creator                    Skill_Seekers
     │                                  │
     │  从"人脑知识"创建 Skill          │  从"外部文档"蒸馏 Skill
     │                                  │
     └──────── 产出都是 SKILL.md ────────┘
                      ↓
         共同组成完整知识管理闭环：
         "人工经验 → skill-creator 固化"
         "外部文档 → Skill_Seekers 蒸馏"
```

---

## 18.20.8 安装与快速开始

### 安装

```bash
# 从 PyPI 安装
pip install skill-seekers

# 完整安装（含所有依赖）
pip install skill-seekers[all]

# 开发模式
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers
pip install -e .
```

### 快速使用

```bash
# 从文档网站构建
skill-seekers create https://docs.react.dev/

# 从 GitHub 构建
skill-seekers create facebook/react

# 从本地项目构建
skill-seekers create ./my-project

# 从 PDF 构建
skill-seekers create manual.pdf

# 导出到指定平台
skill-seekers package output/react --target claude
skill-seekers package output/react --format langchain
```

### 完整流水线示例

```bash
# 1. 创建 Skill
skill-seekers create https://docs.swift.org/ --name swift

# 2. 增强（可选）
skill-seekers enhance output/swift/ --enhance-level 2

# 3. 打包到多个平台
skill-seekers package output/swift/ --target claude
skill-seekers package output/swift/ --target openai
skill-seekers package output/swift/ --format chroma
```

---

## 18.20.9 对 OpenClaw Skills 开发的启发

Skill_Seekers 的方法论可直接借鉴到 OpenClaw Skills 开发：

| Skill_Seekers 的机制 | 对应 OpenClaw Skills 的需求 |
|---------------------|--------------------------|
| `conflict_detector` — 多源冲突检测 | Skills 可能有版本冲突、规则矛盾 |
| `unified_skill_builder` — pairwise synthesis | 多 Skills 间的知识合并 |
| 增强提示词 — 来源优先级设计 | 知识蒸馏可复用这套 prompt 模板 |
| 三流架构（代码/文档/社区）| Skills 可有 `references/`（文档）+ `scripts/`（代码）+ `corrections/`（社区反馈） |

---

## 相关章节

- [18-18 知识蒸馏](./18-18_知识蒸馏.md) — 知识蒸馏方法论
- [18-19 Skills 创建工具全景](./18-19_Skills创建工具全景.md) — 工具链全图
- [18-21 RAG 与 Skills 对比](./18-21_RAG与Skills对比.md) — RAG-MCP 流水线
