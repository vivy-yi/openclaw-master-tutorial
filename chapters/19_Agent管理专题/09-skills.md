# Skills 系统与目录结构

> 日期：2026-03-25
> 更新：2026-03-30

---

## 一、Skills 四种目录详解

OpenClaw 采用多层级 Skills 架构，理解目录结构是高效使用 Skills 的基础。

### 全景图

```
OpenClaw Skills 搜索路径 (按优先级):
┌─────────────────────────────────────────────────────────┐
│  1. ~/.openclaw/workspace/skills/     (自定义开发)     │
│  2. ~/.openclaw/skills/               (全局共享Skills) │
│  3. ~/.agents/skills/                  (主Agent专用)     │
│                                                         │
│  Agent个人目录:                                        │
│  4. ~/.openclaw/workspaces/<agent>/                   │
│     └── .openclaw/skills/           (Skills软链接)     │
└─────────────────────────────────────────────────────────┘
```

---

### 目录对比表

| 目录 | 作用域 | 说明 |
|------|--------|------|
| `~/.openclaw/workspace/skills/` | **主Agent专用** | 我自己开发的Skills |
| `~/.openclaw/skills/` | **全局共享** | 所有Agent可用 |
| `~/.agents/skills/` | **主Agent专用** | 从ClawHub安装的Skills |
| `.openclaw/skills/` | **各Agent私有** | 软链接到需要的Skills |

---

### 详细说明

#### 1️⃣ `~/.openclaw/workspace/skills/` - 我开发的Skills

```
位置: ~/.openclaw/workspace/skills/
内容: 我自己编写的Skills

包含:
├── agent-team-builder/     # Agent团队构建器
├── find-skills/            # 技能发现
├── movie-producer-scene/   # 电影场景生成
└── skillhub-preference/    # SkillHub偏好
```

#### 2️⃣ `~/.openclaw/skills/` - 全局共享Skills

```
位置: ~/.openclaw/skills/
内容: 所有Agent都可用的Skills

包含 (部分):
├── agent-reach/           # 社交媒体
├── article-collector/    # 文章采集
├── game-development/      # 游戏开发
├── excalidraw/           # 图表绘制
├── academic-research/    # 学术搜索
├── self-improving/       # 自我改进
├── weather-automation/    # 天气自动化
└── ... (共116+个)
```

#### 3️⃣ `~/.agents/skills/` - 主Agent专用Skills

```
位置: ~/.agents/skills/
内容: ClawHub安装的Skills（我专用的）

包含:
├── self-improving/        # 主动自我改进
├── self-improving-agent/  # 自我改进代理
├── tavily-skill/         # Tavily搜索
├── macro-strategy/       # 宏观策略
├── stock-analysis/        # 股票分析
├── esg-analysis/          # ESG分析
├── finance-news/          # 金融新闻
├── eastmoney-finance-news/ # 东方财富
├── compliance-framework/ # 合规框架
├── behavioral-finance/    # 行为金融
├── quantitative-factors/ # 量化因子
├── alternative-investment/ # 另类投资
├── portfolio-optimizer/  # 组合优化
├── retirement-planning/   # 退休规划
└── ... (共20+个)
```

#### 4️⃣ `.openclaw/skills/` - 各Agent私有Skills

```
位置: ~/.openclaw/workspaces/<agent>/.openclaw/skills/
内容: 每个Agent通过软链接使用需要的Skills

示例 - 墨宏观:
├── macro-strategy → ~/.agents/skills/macro-strategy/
├── finance-news → ~/.agents/skills/finance-news/
├── behavioral-finance → ~/.agents/skills/behavioral-finance/
├── tavily-skill → ~/.agents/skills/tavily-skill/
└── self-improving → ~/.openclaw/skills/self-improving/
```

---

## 二、优先级规则

```
当Agent调用Skill时，搜索顺序:

1. 首先查找 Agent私有目录 (.openclaw/skills/)
2. 然后查找 全局目录 (~/.openclaw/skills/)
3. 最后查找 工作区Skills (~/.openclaw/workspace/skills/)

⚠️ 找到第一个匹配就停止
```

---

## 三、团队Skills配置规范

### 金融团队 mo-finance

```bash
Skills: macro-strategy, finance-news, stock-analysis, 
        esg-analysis, quantitative-factors, tavily-skill
```

### 内容运营 mo-yunying

```bash
Skills: article-collector, social-content, agent-reach, 
        weather-automation, tavily-skill
```

### 游戏团队 game-director

```bash
Skills: game-development, excalidraw, stable-diffusion, 
        tavily-skill
```

---

## 四、Skills链接脚本

### 升级Agent脚本

```bash
# 位置: ~/workspace/scripts/upgrade-agent.sh
# 使用: upgrade-agent.sh <agent-name> <type> <skills>

# 示例
./upgrade-agent.sh 墨宏观 finance "macro-strategy,finance-news,behavioral-finance"
```

### 创建核心文件脚本

```bash
# 位置: ~/workspace/scripts/agent-template.sh
# 使用: agent-template.sh <agent-name> <emoji> <type>

# 示例
./agent-template.sh 墨宏观 "📊" finance
```

---

## 五、安装新Skill流程

### 1. 查找Skill

```bash
# 使用 clawhub CLI
clawhub search <keyword>

# 或直接访问 https://clawhub.ai
```

### 2. 安装到源码库

```bash
# 全局Skills
clawhub install <skill-name> --global

# 主Agent专用
clawhub install <skill-name> -g ~/.agents/skills/
```

### 3. 链接到需要的Agent

```bash
# 为单个Agent添加链接
ln -s ~/.agents/skills/<skill-name> \
   ~/.openclaw/workspaces/<agent>/.openclaw/skills/

# 为团队所有Agent添加
for agent in ~/.openclaw/workspaces/<team>/agents/*/; do
    ln -sf ~/.agents/skills/<skill-name> "$agent/.openclaw/skills/"
done
```

---

## 六、最佳实践

### 目录使用建议

| 场景 | 推荐目录 |
|------|----------|
| 全局工具（如 excalidraw） | `~/.openclaw/skills/` |
| 专业技能（如金融分析） | `~/.agents/skills/` |
| 个人创作（如教程生成） | `~/.openclaw/workspace/skills/` |
| Agent专属 | `.openclaw/skills/` |

### 安全管理

```
✅ Skill源码在 ~/.agents/skills/（可版本控制）
✅ Agent通过软链接使用（不能修改源码）
✅ 全局Skill在 ~/.openclaw/skills/（需谨慎修改）
❌ 不要把Skill直接复制到多个目录（难维护）
```

---

## 七、简单比喻

```
 ~/.agents/skills/         = 我的私人衣柜（贵重物品）
 ~/.openclaw/skills/       = 家庭共用衣柜（日常衣物）
 ~/.openclaw/workspace/skills/ = 我的卧室衣柜（常穿搭配）

 .openclaw/skills/         = 当前出门的穿着（软链接）
```

理解这个结构后，就能高效地管理上百个Skills了！
