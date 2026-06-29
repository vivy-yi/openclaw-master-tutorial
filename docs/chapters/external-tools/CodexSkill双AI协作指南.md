# Codex Skill for Claude Code

> 让 Claude Code 获得"第二意见"，通过 OpenAI Codex CLI 进行独立验证

---

## 一、概述

### 1.1 什么是 Codex Skill

| 项目 | 说明 |
|------|------|
| **定位** | Claude Code 的"第二意见"工具 |
| **功能** | 让 Codex CLI 自动审查 Claude Code 的计划 |
| **Stars** | 开源项目 |
| **作者** | Cathryn Lavery |
| **许可** | MIT |

### 1.2 解决的问题

```
┌─────────────────────────────────────────────────────────────┐
│                      问题场景                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ❌ Claude Code 创建的计划可能遗漏边缘情况                     │
│  ❌ 单个 AI 可能存在盲点                                      │
│  ❌ 架构决策缺乏独立验证                                      │
│                                                              │
│  ✅ Two AIs checking each other's work                      │
│     两个 AI 互相检查，捕获更多边缘情况                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│                    Codex Skill 核心特点                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🤖 自动审查                                                 │
│     └── 每次 Claude Code 创建计划时自动触发                 │
│                                                              │
│  🔍 双重检查                                                 │
│     └── Claude 创建计划 → Codex 审查 → 用户决策             │
│                                                              │
│  💡 第二意见                                                 │
│     └── 获取独立视角，发现更好的替代方案                     │
│                                                              │
│  ⚡ 速度优先                                                 │
│     └── 默认使用 gpt-5.3-codex-spark（超快 1000+ tok/s）    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、工作原理

### 2.1 自动审查流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Claude    │────>│ ExitPlanMode│────>│   Codex     │
│ creates plan│     │   (hook)    │     │  reviews    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               v
                                        ┌─────────────┐
                                        │ You approve │
                                        │ with context│
                                        └─────────────┘
```

### 2.2 审查内容

Codex 会审查：

| 审查维度 | 说明 |
|---------|------|
| **Potential issues** | 潜在问题或风险 |
| **Missing steps** | 遗漏的步骤 |
| **Better alternatives** | 更好的替代方案 |
| **Edge cases** | 未处理的边缘情况 |

### 2.3 Hook 机制

```
ExitPlanMode (hook)
    │
    ├── 拦截 Claude Code 的计划
    ├── 从 tool_response.plan 读取内容
    ├── 传递给 Codex 审查
    └── 在用户批准前显示审查结果
```

---

## 三、支持的模型

| 模型 | 上下文 | 速度 | 最佳用途 |
|------|--------|------|---------|
| `gpt-5.4` | 272k | 标准 | 最强能力 - 深度分析、架构、新问题 |
| `gpt-5.3-codex-spark` | 128k | 超快 1000+ tok/s | 快速查询、事实检查（默认） |
| `gpt-5.3-codex` | 272k | 标准 | 通用编码任务 |
| `gpt-5.2-codex` | 272k | 标准 | 较旧替代 |
| `gpt-5.1-codex-max` | 272k | 标准 | 较旧替代 |
| `gpt-5.1-codex-mini` | 272k | 快 | 预算选项 |

---

## 四、安装

### 4.1 方法一：作为 Claude Code 插件安装（推荐）

```bash
claude plugin add cathrynlavery/codex-skill
```

自动注册：
- `/codex` 技能
- 自动计划审查 Hook

### 4.2 方法二：手动安装

#### 1. 安装技能

```bash
git clone https://github.com/cathrynlavery/codex-skill.git
mkdir -p ~/.claude/skills/codex
cp codex-skill/skills/codex/SKILL.md ~/.claude/skills/codex/
```

#### 2. 设置自动计划审查

复制 Hook 脚本：

```bash
mkdir -p ~/.claude/hooks
cp codex-skill/hooks/plan-review.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/plan-review.sh
```

添加到 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "ExitPlanMode",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/plan-review.sh",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

---

## 五、前置要求

### 5.1 安装 Codex CLI

```bash
npm install -g @openai/codex
```

### 5.2 配置 API Key

配置你的 OpenAI API 密钥。

---

## 六、使用方式

### 6.1 自动审查

当 Claude Code 创建计划时自动触发（通过 Hook）。

### 6.2 手动使用

直接调用：

```
/codex
```

或让 Claude 请求：

> "Can you verify this approach with Codex?"
> "Get a second opinion on this architecture"

### 6.3 模型选择

| 类型 | 使用模型 | 说明 |
|------|---------|------|
| **默认** | `gpt-5.3-codex-spark` | 速度优先 |
| **复杂问题** | `gpt-5.4` | 自动切换，高推理 effort |

---

## 七、输出示例

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEX SECOND OPINION ON PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LGTM - Plan covers the main implementation steps.

Minor suggestions:
- Consider adding error handling for the API timeout case
- Step 3 could be split into separate DB migration and code changes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 八、故障排查

### 8.1 Hook 不触发

| 检查项 | 解决方案 |
|--------|---------|
| Codex CLI 安装 | 运行 `codex --version` 确认 |
| PATH 配置 | 确保 Codex 在系统 PATH 中 |

### 8.2 无法找到计划内容

Hook 从以下位置读取：
1. `tool_response.plan`（主要）
2. `tool_response.filePath`（备用）
3. 文件系统搜索（最终）

确保使用当前版本的 Claude Code。

---

## 九、与 OpenClaw 的结合

### 9.1 双 AI 协作模式

| 项目 | Codex Skill | OpenClaw 应用 |
|------|-----------|--------------|
| **多 AI 审查** | Claude + Codex | 多 Agent 协作 |
| **Hook 机制** | ExitPlanMode 拦截 | 事件驱动 |
| **计划审查** | 架构决策验证 | 决策支持 |
| **第二意见** | 独立验证 | Agent 间协作 |

### 9.2 可行性分析

| 功能 | 可迁移性 | 说明 |
|------|---------|------|
| **自动计划审查** | ⭐⭐⭐⭐ | OpenClaw 可以实现类似 Hook |
| **多 AI 协作** | ⭐⭐⭐⭐⭐ | OpenClaw subagents 已支持 |
| **第二意见机制** | ⭐⭐⭐⭐ | 可作为决策支持参考 |
| **模型选择** | ⭐⭐⭐⭐ | OpenClaw 模型配置已支持 |

### 9.3 潜在应用

1. **OpenClaw 多 Agent 审查**：让一个 Agent 审查另一个的计划
2. **决策验证**：复杂决策前获取第二意见
3. **质量保证**：架构决策前进行独立验证

### 9.4 设计模式

```
OpenClaw 双 Agent 审查模式：

Agent A (主) ──> 创建计划 ──> Agent B (审查) ──> 反馈
                                        │
                                        v
                                   用户决策
```

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| GitHub | https://github.com/cathrynlavery/codex-skill |
| Codex CLI | https://github.com/openai/codex |
| 作者 | Cathryn Lavery |

---

## 十一、核心价值

### 11.1 为什么需要"第二意见"？

| 方面 | 单 AI | 双 AI |
|------|-------|-------|
| **边缘情况** | 可能遗漏 | 互相检查 |
| **架构决策** | 单一视角 | 多角度验证 |
| **风险识别** | 有限制 | 互补发现 |
| **用户信心** | 一般 | 更高 |

### 11.2 适用场景

| 场景 | 说明 |
|------|------|
| **架构决策** | 重要技术选型前验证 |
| **实现方案** | 代码计划审查 |
| **复杂问题** | 不熟悉的 API/库调研 |
| **代码模式** | 复杂模式验证 |

---

*文档版本: 2026-04-22*
