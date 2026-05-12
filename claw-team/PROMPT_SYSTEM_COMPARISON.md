# 提示词控制系统对比：ClawTeam vs AutoResearch

## 概述

本文档对比两种不同的 Agent 提示词控制方式：

1. **ClawTeam** - 多 Agent 协调框架
2. **AutoResearch** - 程序化动态提示词生成系统

---

## 系统架构对比

### ClawTeam 架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                        用户命令行                                     │
│  clawteam spawn --team X --agent-name Y --task "..."              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    build_agent_prompt()                             │
│  (clawteam/spawn/prompt.py)                                       │
│                                                                     │
│  输入:                                                             │
│  - agent_name, agent_id, agent_type                               │
│  - team_name, leader_name                                         │
│  - task (用户传入的静态字符串)                                     │
│  - workspace_dir, workspace_branch (可选)                         │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     生成的提示词结构                                 │
│                                                                     │
│  ## Identity                                                       │
│  - Name: pretrain-agent                                           │
│  - Type: general-purpose                                          │
│  - Team: minimind-training                                        │
│                                                                     │
│  ## Workspace (可选)                                               │
│  - Working directory: ...                                          │
│  - Branch: ...                                                     │
│                                                                     │
│  ## Task                                                           │
│  [用户传入的静态字符串]                                            │
│                                                                     │
│  ## Coordination Protocol                                          │
│  - CLI 操作指南                                                    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     大模型 (Claude Code)                            │
└─────────────────────────────────────────────────────────────────────┘
```

### AutoResearch 架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                        主程序循环                                    │
│                                                                     │
│  while not done:                                                   │
│    1. 获取当前状态 (CurrentState)                                  │
│    2. 读取历史记录 (ExperimentHistory)                             │
│    3. 调用 ContextGenerator.generate()                             │
│    4. 发送给大模型                                                │
│    5. 执行决策                                                    │
│    6. 更新状态                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│              ContextGenerator.generate()                            │
│  (src/context_generator.py)                                       │
│                                                                     │
│  输入:                                                             │
│  - task_description: 任务描述                                      │
│  - history: List[ExperimentHistory] - 历史实验结果                 │
│  - state: CurrentState - 当前训练状态                             │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     动态生成的提示词结构                             │
│                                                                     │
│  # AutoResearch 自动训练代理                                       │
│                                                                     │
│  ## 任务描述                                                       │
│  你正在训练一个 [task.name] 模型                                    │
│                                                                     │
│  ## 你的角色                                                       │
│  AI 训练工程师                                                     │
│                                                                     │
│  ## 当前训练状态 (动态)                                             │
│  - 当前阶段: sft                                                   │
│  - 当前模型: full_sft_512.pth                                      │
│  - 上次指标值: 0.8234                                             │
│  - 训练进度: 50%                                                   │
│                                                                     │
│  ## 历史实验 (动态)                                                 │
│  - 当前最佳: val_loss = 0.823                                     │
│  - 成功的实验: ...                                                 │
│  - 失败的实验: ...                                                 │
│                                                                     │
│  ## 阶段选择指南                                                   │
│  [根据任务类型动态生成的阶段建议]                                   │
│                                                                     │
│  ## 输出格式                                                        │
│  [根据任务类型动态生成的输出模板]                                    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     大模型 (任意 LLM)                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 核心差异对比

| 维度 | ClawTeam | AutoResearch |
|------|-----------|--------------|
| **提示词生成方式** | 静态模板填充 | 动态程序化生成 |
| **上下文更新** | 手动更新任务 | 自动根据状态/历史 |
| **多 Agent 协调** | 内置 (inbox/tasks) | 自定义实现 |
| **任务依赖管理** | 内置 (blocked-by) | StageSelector |
| **决策循环** | 一次性任务 | 持续自治循环 |
| **状态追踪** | 外部 (ClawTeam) | 内部 (results.tsv) |
| **适用场景** | 多 Agent 协作 | 单 Agent 自动训练 |

---

## 详细对比

### 1. 提示词生成机制

#### ClawTeam: 静态模板

```python
# clawteam/spawn/prompt.py
def build_agent_prompt(
    agent_name: str,
    agent_id: str,
    agent_type: str,
    team_name: str,
    leader_name: str,
    task: str,  # <-- 静态字符串
    ...
) -> str:
    return f"""
## Identity
- Name: {agent_name}
...

## Task
{task}  # <-- 直接插入，无处理

## Coordination Protocol
...
"""
```

**特点**：
- 任务描述是**静态字符串**
- 每次 spawn 时固定
- 不随训练进度变化
- 需要手动更新 `--task` 参数

#### AutoResearch: 动态生成

```python
# src/context_generator.py
class ContextGenerator:
    def generate(
        self,
        task_description: str,
        history: list[ExperimentHistory],  # <-- 动态传入
        state: CurrentState,                # <-- 动态传入
    ) -> str:
        # 根据历史分析最佳策略
        history_summary = self._analyze_history(history)

        # 根据当前状态生成上下文
        current_state_info = self._format_current_state(state)

        # 动态构建提示词
        return self._build_prompt(
            task=task,
            history_summary=history_summary,
            current_state=current_state_info,
        )
```

**特点**：
- 每次循环都重新生成
- 包含完整上下文（状态 + 历史）
- 动态调整指导策略

---

### 2. 上下文感知能力

#### ClawTeam

```markdown
## Identity
- Name: pretrain-agent
- Team: minimind-training

## Task
执行预训练

## Coordination Protocol
- clawteam task update ...
```

**局限性**：
- 只知道"执行预训练"这个任务
- 不知道当前训练到了什么阶段
- 不知道之前尝试过什么
- 不知道效果如何

#### AutoResearch

```markdown
## 当前训练状态
- 当前阶段: sft
- 当前模型: full_sft_512.pth
- 上次指标值: 0.8234
- 训练进度: 50%

## 历史实验
- 当前最佳: val_loss = 0.823
- 成功的实验:
  - pretrain: val_loss = 1.234 (keep)
  - sft: val_loss = 0.823 (keep)
- 失败的实验:
  - sft_lr=1e-3: val_loss = 0.890 (discard)
```

**优势**：
- 完整训练历史
- 决策有据可依
- 自动避免重复失败

---

### 3. 决策循环

#### ClawTeam: 一次性任务

```
用户 spawn Agent → Agent 执行任务 → 任务完成 → Agent 退出
```

- 每个 Agent 是一次性的
- 多个 Agent 通过任务依赖协调
- 需要手动管理状态

#### AutoResearch: 持续自治

```
while not done:
    1. 生成提示词（含状态+历史）
    2. 发送给 LLM
    3. LLM 返回决策
    4. 执行训练
    5. 评估结果
    6. 更新状态/历史
    7. 判断是否继续
```

- 持续循环直到达成目标
- 自动根据结果调整策略
- 真正的自治

---

### 4. 多 Agent 协调

#### ClawTeam: 内置协调协议

```bash
# 任务依赖
clawteam task create X "task1" -o agent1
clawteam task create X "task2" -o agent2 --blocked-by task1_id

# 消息通信
clawteam inbox send X agent1 "完成了吗?"

# 任务状态
clawteam task update X task_id --status completed  # 自动解除依赖
```

#### AutoResearch: 单 Agent 自治

```python
# 阶段选择器 (src/stage_selector.py)
STAGE_DEPENDENCIES = {
    "pretrain": [],
    "sft": ["pretrain"],
    "dpo": ["sft"],
    "grpo": ["sft"],
    ...
}

class StageSelector:
    def select_next_stage(self, completed, current) -> StageDecision:
        # 根据已完成阶段和当前状态推荐下一个阶段
```

---

## 混合方案设计

结合两者优势的设计：

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ClawTeam 协调层                              │
│                                                                     │
│  - 多 Agent 任务分配                                               │
│  - 任务依赖管理                                                    │
│  - 团队通信                                                        │
│  - 看板监控                                                        │
└─────────────────────────────────────────────────────────────────────┘
                              │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ pretrain │     │   sft    │     │   rl    │
    │  Agent   │     │  Agent   │     │  Agent   │
    └──────────┘     └──────────┘     └──────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                          ▼
          ┌───────────────────────────────────────────┐
          │         AutoResearch 动态提示词            │
          │                                           │
          │  - 读取 results.tsv 获取历史              │
          │  - 读取当前训练状态                        │
          │  - 生成上下文感知的提示词                  │
          │  - 注入 program.md 行为准则               │
          └───────────────────────────────────────────┘
                          │
                          ▼
          ┌───────────────────────────────────────────┐
          │              大模型 (LLM)                  │
          └───────────────────────────────────────────┘
```

---

## 总结

| 方面 | ClawTeam | AutoResearch |
|------|----------|--------------|
| **核心理念** | 多 Agent 协调 | 动态提示词 |
| **状态感知** | 外部追踪 | 内部生成 |
| **适用场景** | 团队协作、并行任务 | 自动实验、持续优化 |
| **优势** | 任务隔离、并行执行 | 上下文感知、自动化 |
| **劣势** | 静态任务、需手动更新 | 单 Agent、依赖记录 |

两者可以结合使用：ClawTeam 负责多 Agent 协调，AutoResearch 负责单个 Agent 的动态提示词生成。
