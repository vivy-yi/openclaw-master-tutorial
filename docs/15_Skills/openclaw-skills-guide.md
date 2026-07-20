# OpenClaw 完全指南：Skills 技能系统

> 📖 来源：[知乎 - OpenClaw 完全指南](https://zhuanlan.zhihu.com/p/2015027745743189513)  
> ✍️ 作者：ConardLi（code秘密花园）  
> ⭐ 评分：⭐⭐⭐⭐⭐  
> 📅 采集日期：2026-07-20

---

## 七、OpenClaw 怎么安装技能？

### 7.1 Skills 概述

**Skills（技能）**是 OpenClaw 的扩展能力模块，让 AI Agent 能够执行复杂任务和工作流。

```
┌─────────────────────────────────────────────────┐
│                  Skills Ecosystem                │
├─────────────────────────────────────────────────┤
│                                                  │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │  Skill  │  │  Skill  │  │  Skill  │       │
│   │  #001   │  │  #002   │  │  #003   │       │
│   │  代码   │  │  搜索   │  │  写作   │       │
│   └────┬────┘  └────┬────┘  └────┬────┘       │
│        │             │             │             │
│        └─────────────┼─────────────┘             │
│                      ▼                           │
│              ┌──────────────┐                    │
│              │  Skill Hub   │                    │
│              │  (技能市场)  │                    │
│              └──────────────┘                    │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 7.2 官方 Skills

OpenClaw 官方提供了 52+ 内置 Skills：

| 分类 | Skills 数量 | 示例 |
|------|-------------|------|
| 开发工具 | 10+ | code-review, debugging |
| 数据处理 | 8+ | csv-analysis, json-transform |
| 内容创作 | 6+ | writing, summarize |
| 研究调研 | 5+ | research, web-search |
| 效率工具 | 10+ | schedule, reminder |
| 运维监控 | 8+ | healthcheck, logs-analysis |

### 7.3 安装 Skills

#### 从官方市场安装

```bash
# 列出可用 Skills
openclaw skills list

# 安装指定 Skill
openclaw skills install code-review

# 安装多个 Skills
openclaw skills install research web-search
```

#### 从 GitHub 安装

```bash
# 安装社区 Skill
openclaw skills install https://github.com/user/custom-skill
```

#### 本地开发 Skill

```bash
# 创建新 Skill
openclaw skills create my-skill

# 进入开发目录
cd ~/.openclaw/skills/my-skill

# 编辑 Skill 配置
openclaw skills edit my-skill
```

### 7.4 Skill 结构

```
~/.openclaw/skills/my-skill/
├── SKILL.md          # Skill 定义文件
├── scripts/          # 脚本目录
│   ├── main.sh       # 主脚本
│   └── utils.sh      # 工具函数
├── templates/        # 模板目录
├── prompts/         # 提示词目录
└── config.yaml       # Skill 配置
```

### 7.5 SKILL.md 格式

```markdown
# SKILL.md - My Custom Skill

## 基本信息
- **名称**: my-skill
- **版本**: 1.0.0
- **作者**: Your Name
- **描述**: 这是一个自定义技能

## 触发条件
- **触发词**: my-skill, 执行自定义任务

## 执行流程
1. 解析用户输入
2. 调用相应脚本
3. 返回执行结果

## 配置参数
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| verbose | boolean | false | 详细输出 |

## 示例
```
用户: my-skill 分析代码质量
助手: 开始执行代码分析...
```
```

### 7.6 Skill 配置

```yaml
skills:
  enabled: true
  installPath: ~/.openclaw/skills
  
  # Skill 特定配置
  code-review:
    enabled: true
    language: [python, javascript, typescript]
    maxFiles: 50
    
  research:
    enabled: true
    searchEngine: google
    maxResults: 10
```

### 7.7 使用 Skills

#### 在对话中使用

```
用户: @skill code-review 审查这个代码文件
助手: [触发 code-review Skill 执行]
```

#### 编程调用

```javascript
// 在 Hook 或 Skill 中调用其他 Skill
const result = await openclaw.skills.run('code-review', {
  files: ['./src/main.py'],
  language: 'python'
});
```

### 7.8 Skill 开发示例

#### 创建天气查询 Skill

```markdown
# SKILL.md - weather-skill

## 基本信息
- **名称**: weather
- **版本**: 1.0.0
- **描述**: 查询天气预报

## 触发条件
- **触发词**: 天气, weather, 预报

## 执行脚本 (scripts/query.sh)
```bash
#!/bin/bash
CITY=$1
curl -s "wttr.in/${CITY}?format=3"
```

## 触发注册
```yaml
triggers:
  - pattern: "(.*)天气(.*)"
    script: ./scripts/query.sh
    args: ["$1"]
```

## 示例
```
用户: 北京天气怎么样？
助手: 🌤️ 北京: 25°C, 多云
```
```

### 7.9 Skill 市场

访问 [OpenClaw Skill Hub](https://skills.openclaw.ai) 探索更多社区 Skills：

```bash
# 打开 Skill 市场
openclaw skills browse
```

### 7.10 常见问题

#### Q: Skill 安装失败

```bash
# 检查网络
curl -I https://api.openclaw.ai

# 清理缓存重试
openclaw skills cache clean
openclaw skills install <skill-name>
```

#### Q: Skill 不触发

检查触发词配置：

```yaml
skills:
  <skill-name>:
    triggers:
      - exact: "skill-name"  # 精确匹配
      - pattern: "skill.*"    # 正则匹配
```

---

## 相关资源

- 🔗 原文链接：[OpenClaw 完全指南 - 知乎](https://zhuanlan.zhihu.com/p/2015027745743189513)
- 📦 [官方 Skills 库](https://github.com/openclaw/openclaw/tree/main/skills)
- 🔧 [多 Agent 协作](../05-Agent协作/README.md)

---

*本文档由墨客自动采集整理，遵循原文 CC BY-SA 协议*
