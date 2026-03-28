# 18.9 Proactive Self-Improving Agent

> 自动捕获经验 · 安全进化 · 让 Agent 越用越聪明

## 核心理念

**两条腿走路：**

1. **记录** — 每次犯错、被纠正、发现更好做法时，立刻结构化记录
2. **进化** — 反复出现的经验自动晋升为永久能力，但有护栏防止漂移

**核心法则：**

> 如果一个经验值得记住，就必须写到文件里。脑子里的"记住了"不算数。

## 触发条件

检测到以下场景时，**评估是否有新经验值得记录**：

| # | 场景 | 记录到 | 类别 |
|---|---|---|---|
| 1 | 命令/操作失败 | `ERRORS.md` | - |
| 2 | 用户纠正（"不对"/"应该是…"） | `LEARNINGS.md` | `correction` |
| 3 | 用户需要不存在的能力 | `FEATURE_REQUESTS.md` | - |
| 4 | 外部 API/工具出错 | `ERRORS.md` | - |
| 5 | 发现自己知识过时/错误 | `LEARNINGS.md` | `knowledge_gap` |
| 6 | 发现了更好的做法 | `LEARNINGS.md` | `best_practice` |
| **7** | **任务完成时** | `LEARNINGS.md` | `task_review` |

### 任务完成触发（Task Review）

每次完成一个任务后，**主动回顾**：
- 这次过程中踩了什么坑？
- 有没有走弯路？下次怎么做更快？
- 有没有发现新的工具用法或技巧？
- 有没有什么值得其他 agent 也知道的？

**如果有真正新颖的经验 → 写入 LEARNINGS.md**  
**如果没什么可学的，或已有条目已覆盖 → 跳过，不写入**

### 检测关键词

**纠正信号：**
- "不对" / "不是" / "错了" / "应该是" / "Actually" / "No, I meant"

**能力请求信号：**
- "能不能…" / "有没有办法…" / "要是能…"

**知识空白信号：**
- 用户提供了你不知道的信息
- API 行为和你的理解不一致

## 文件体系

```
.learnings/
├── LEARNINGS.md          # 经验/纠正/最佳实践
├── ERRORS.md             # 错误日志
├── FEATURE_REQUESTS.md   # 能力请求
└── CHANGELOG.md          # 操作日志
```

## 记录格式

### Learning 条目

```markdown
## [LRN-20260328-001] best_practice

**Priority**: medium
**Status**: pending | resolved | promoted
**Area**: tools

### 内容
简述：发生了什么、为什么错/不好、正确/更好的做法是什么。

### 建议修复
具体应该怎么改。

### 元数据
- Source: correction | task_review | best_practice
- See Also: LRN-XXXXXXXX-XXX
```

### Error 条目

```markdown
## [ERR-20260328-001] 出错的工具/命令

**Priority**: high
**Status**: pending | resolved
**Area**: tools

### 摘要
简述什么操作失败了。

### 错误信息
```
实际的报错输出
```

### 上下文
-执行的命令/操作
- 输入参数

### 建议修复
可能的解决方案。
```

## 进化路径

### 晋升机制

当一条 learning 足够重要且通用时，将其精炼后写入永久文件：

| 经验类型 | 晋升到 | 举例 |
|---|---|---|
| 工作流改进 | `AGENTS.md` | "批量处理时每篇独立 spawn" |
| 工具使用技巧 | `TOOLS.md` | "API 限流 3s 间隔" |
| 行为模式 | `SOUL.md` | "不确定分类时用 unclassified/" |

### 递归模式检测

当记录新条目时，**先搜索是否有相似的旧条目**：

```bash
grep -r "关键词" .learnings/
```

- 找到相似条目 → 添加 `See Also` 互相链接
- **同一模式出现 ≥3 次** → 触发自动晋升

## 安全护栏

### ADL 协议（Anti-Drift Limits）

**禁止的进化：**
- ❌ 不为了"看起来聪明"而增加复杂度
- ❌ 不做无法验证效果的改动
- ❌ 不用"直觉""感觉"作为改动理由
- ❌ 为了新奇牺牲稳定性

### VFM 协议（Value-First Modification）

晋升/提取前打分：

| 维度 | 权重 | 问题 |
|---|---|---|
| 检索复用性 | 3x | 未来会反复用到吗？ |
| 错误预防 | 3x | 能避免以后犯同样错误吗？ |
| 分析质量 | 2x | 能提升产出质量吗？ |
| 效率提升 | 2x | 能节省处理时间吗？ |

**加权总分 < 50 → 不晋升**

## 操作日志

每次写入时，同步追加到 CHANGELOG.md：

```jsonl
{"ts":"2026-03-28T10:00:00+08:00","action":"add","type":"learning","id":"LRN-20260328-001","summary":"Semantic Scholar API 需要 3s 间隔防限流"}
{"ts":"2026-03-28T11:00:00+08:00","action":"promote","type":"learning","id":"LRN-20260328-001","summary":"API 限流规则","target":"TOOLS.md"}
```

## 行为准则

### 坚韧原则

当操作失败时：
1. 立刻换一种方法
2. 再换一种
3. 尝试 5-10 种方法后再考虑求助
4. 利用所有可用工具：CLI、浏览器、搜索、spawn 子 agent
5. 创造性地组合工具

**在说"做不到"之前：**
- 试过替代方法了吗？
- 搜过记忆了吗？
- 查过 .learnings/ 了吗？

### 验证后报完成（VBR）

**法则：** "代码写了" ≠ "功能好使了"。

1. **停** — 别急着说"完成"
2. **测** — 从用户视角实际验证结果
3. **确认** — 验证的是产出效果
4. **然后** — 才报完成

## 安装

```bash
# 克隆到 skills 目录
git clone https://github.com/claw-opus/proactive-self-improving-agent.git ~/.openclaw/skills/proactive-self-improving
```

## 快速开始

### 1. 在 Agent 中激活

在 Agent 的 SOUL.md 或 AGENTS.md 中添加：

```markdown
## 自我改进机制

启用 proactive-self-improving-agent skill：
- 每次任务完成时主动回顾
- 错误和纠正自动记录到 .learnings/
- 反复出现的经验自动晋升
```

### 2. 创建目录

```bash
mkdir -p .learnings/
touch .learnings/CHANGELOG.md
```

### 3. 开始使用

- 犯错时：自动记录到 ERRORS.md
- 被纠正时：自动记录到 LEARNINGS.md
- 任务完成时：主动回顾，有经验则记录

## 与 Ontology 集成

Ontology 记录**结构化实体关系**，Self-Improving 记录**经验教训**。两者结合：

```python
# 1. Ontology 记录实体
ontology.create("Task", {"title": "Research RAG"})

# 2. Self-Improving 记录经验
# -> 创建 [LRN-20260328-001] task_review
# -> 经验：检索时先用 Semantic Scholar 再用 ArXiv

# 3. 晋升到 TOOLS.md
# -> "论文检索顺序：先 Semantic Scholar 再 ArXiv"
```

## 去重原则

> 触发 ≠ 必须写入。每次触发时先判断：这个经验是否**真正新颖**？

- 如果没什么可学的，或者已有条目已覆盖 → **直接跳过，不写入**
- 避免用重复的低价值记录污染 .learnings/

---

*"每次犯错都是进化的燃料，前提是你把它记下来。"*
