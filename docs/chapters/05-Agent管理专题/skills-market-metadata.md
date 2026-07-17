# Skills Market 元数据规范 v2

> 基于本地 skills-git 仓库分析的 Skills Market 数据结构设计
> 版本：2.0 | 日期：2026-03-27

---

## 一、仓库结构总览

### 1.1 嵌套层级

```
skills-git/                          (顶层目录)
│
├── ⭐ 顶级仓库 (17个)
│   ├── ai-labs-claude-skills/
│   ├── anthropic-agent-skills/
│   ├── awesome-agent-skills/
│   ├── awesome-claude-skills/
│   ├── awesome-openclaw/
│   ├── baoyu-skills/
│   ├── claude-code-plugins-plus-skills/
│   ├── claude-skills/
│   ├── claude-skills-1/
│   ├── claudekit-skills/
│   ├── data-ai-skills/              (含4个子仓库)
│   ├── openclaw-skills/             (含5个子仓库)
│   ├── Agent-Skills-for-Context-Engineering/
│   ├── agent-skills-cli/
│   ├── AI-Research-SKILLs/
│   ├── skills/
│   └── superpowers/
│
├── ⭐ 二级嵌套仓库 (35+个)
│   ├── claude-skills-by-role/      (25+个子仓库)
│   │   ├── 程序员/
│   │   │   ├── claude-code-tresor/
│   │   │   ├── claude-code-action/
│   │   │   └── ...
│   │   ├── 产品经理/
│   │   ├── 人力资源/
│   │   ├── 电商运营/
│   │   ├── 新媒体运营/
│   │   ├── 视频处理/
│   │   └── Generative-Media-Skills/
│   │
│   ├── data-ai-skills/
│   │   ├── data-analytics-claude/
│   │   ├── agent-skills/
│   │   ├── agentic-data-kit/
│   │   └── skilless.ai/
│   │
│   └── openclaw-skills/
│       ├── awesome openclaw/
│       ├── awesome-openclaw-skills/
│       ├── awesome-moltbot-skills/
│       ├── clawdhub/
│       └── skills/
│
└── 📊 总计：约 50 个子仓库
```

---

## 二、仓库分类

### 2.1 按类型分类

| 类型 | 说明 | 数量 |
|------|------|------|
| **Awesome 仓库** | 技能列表索引 | 3 |
| **Skills 仓库** | 实际技能包集合 | 8 |
| **嵌套子仓库** | 被其他仓库包含 | 35+ |

### 2.2 顶级仓库详情

| 仓库 ID | GitHub | 类型 | Skills 数量 |
|---------|--------|------|-------------|
| claude-code-plugins-plus-skills | jeremylongshore/... | skills | 3,148 |
| openclaw-skills | 本地 | skills | 655 |
| data-ai-skills | 本地 | skills | 76 |
| ai-labs-claude-skills | ailabs-393/... | skills | 54 |
| claudekit-skills | mrgoinion/... | skills | 44 |
| claude-skills | glebis/claude-skills | skills | 28 |
| anthropic-agent-skills | anthropics/skills | skills | 18 |
| baoyu-skills | JimLiu/baoyu-skills | skills | 18 |
| claude-skills-1 | alirezarezvani/... | skills | 44 |
| awesome-agent-skills | heilcheng/... | awesome | 列表 |
| awesome-claude-skills | travisvn/... | awesome | 列表 |
| awesome-openclaw | SamurAIGPT/... | awesome | 列表 |

---

## 三、嵌套仓库详情

### 3.1 claude-skills-by-role（按角色分类）

```
claude-skills-by-role/
│
├── 程序员/
│   ├── claude-code-tresor/
│   ├── claude-code-action/
│   ├── claude-code-skill-factory/
│   ├── knowledge-work-plugins/
│   ├── cursor-rules-java/
│   ├── ai-guide/
│   └── jeffreysprompts.com/
│
├── 产品经理/
│   ├── Product-Manager-Skills/
│   ├── pm-skills-for-claude/
│   ├── pm-claude-skills/
│   ├── product-manager-prompts/
│   └── pm-ai-playbook/
│
├── 人力资源/
│   ├── resume-skill-extractor/
│   └── Resume-Analysis-and-Recruitment-Assistant/
│
├── 电商运营/
│   ├── dgtldept/
│   └── ecommerce-product-import-skill/
│
├── 新媒体运营/
│   ├── Claude-Code-Content-Marketing-Toolkit/
│   ├── claude-prompt-engineering-guide/
│   ├── create-viral-content/
│   ├── head-of-content/
│   ├── prompt-engineering-skills/
│   └── social-media-manager-skills/
│
└── 视频处理/
    └── Video-Wrapper-Skills/
```

### 3.2 data-ai-skills

```
data-ai-skills/
├── data-analytics-claude/  (donparay114-code/)
├── agent-skills/            (spivx/)
├── agentic-data-kit/        (luccapinto/)
└── skilless.ai/            (BrikerMan/)
```

### 3.3 openclaw-skills

```
openclaw-skills/
├── awesome openclaw/           (vivy-yi/)
├── awesome-openclaw-skills/    (VoltAgent/)
├── awesome-moltbot-skills/     (VoltAgent/)
├── clawdhub/                   (clawdbot/)
└── skills/                     (clawdbot/)
```

---

## 四、元数据层级模型 v2

### 4.1 三层模型

```
┌─────────────────────────────────────────────────────────────┐
│ Level 1: 根目录 (Root)                                    │
│ - skills-git/ 的整体索引                                  │
│ - 包含的顶级仓库列表                                       │
│ - 嵌套结构信息                                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 2: 顶级仓库 (Top-level Repository)                  │
│ - 仓库元数据                                               │
│ - 直接包含的 Skills 数量                                  │
│ - 子仓库引用                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 3: 嵌套仓库 (Nested Repository)                     │
│ - 被父仓库包含                                            │
│ - 独立的 Git 仓库                                         │
│ - 自己的 Skills                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 4: 单个 Skill (SKILL.md)                            │
│ - 技能元数据                                               │
│ - 功能描述                                                 │
│ - 使用场景                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 五、数据结构规范

### 5.1 根目录索引

```json
{
  "root": {
    "path": "/Volumes/waku/大模型/Agentic-tools/skills/skills-git",
    "version": "2.0",
    "lastScanned": "2026-03-27T19:58:00Z",
    "stats": {
      "totalRepositories": 50,
      "topLevelRepositories": 17,
      "nestedRepositories": 35,
      "totalSkills": 4041,
      "awesomeLists": 3
    }
  },

  "topLevelRepositories": [
    {
      "id": "claude-skills-by-role",
      "name": "Claude Skills by Role",
      "type": "skills",
      "nested": true,
      "localPath": "claude-skills-by-role",
      "children": [
        {
          "id": "claude-skills-by-role/程序员",
          "localPath": "claude-skills-by-role/程序员",
          "children": [
            { "id": "claude-skills-by-role/程序员/claude-code-tresor", "remote": "alirezarezvani/claude-code-tresor" },
            { "id": "claude-skills-by-role/程序员/claude-code-action", "remote": "anthropics/claude-code-action" }
          ]
        }
      ]
    }
  ]
}
```

### 5.2 仓库元数据 (Level 2)

```json
{
  "repository": {
    "id": "claude-skills-by-role",
    "name": "Claude Skills by Role",
    "description": "按角色分类的 Claude Skills 集合",
    "localPath": "claude-skills-by-role",
    "type": "skills",
    "nested": true,
    "parent": null,
    "remote": null,
    "language": "多语言",
    "categories": ["程序员", "产品经理", "人力资源", "电商运营", "新媒体运营", "视频处理"],
    "childRepositories": 25,
    "lastSync": "2026-03-27T19:58:00Z"
  }
}
```

### 5.3 嵌套仓库元数据 (Level 3)

```json
{
  "nestedRepository": {
    "id": "claude-skills-by-role/程序员/claude-code-tresor",
    "name": "Claude Code Tresor",
    "description": "Claude Code 安全存储技能",
    "localPath": "claude-skills-by-role/程序员/claude-code-tresor",
    "type": "skill",
    "nested": true,
    "parent": {
      "id": "claude-skills-by-role/程序员",
      "name": "程序员"
    },
    "root": "claude-skills-by-role",
    "remote": {
      "owner": "alirezarezvani",
      "repo": "claude-code-tresor",
      "url": "https://github.com/alirezarezvani/claude-code-tresor"
    },
    "platform": ["claude", "claude-code"],
    "language": "en",
    "skillCount": 1,
    "files": {
      "SKILL.md": "claude-skills-by-role/程序员/claude-code-tresor/SKILL.md"
    }
  }
}
```

### 5.4 单 Skill 元数据 (Level 4)

```json
{
  "skill": {
    "id": "claude-code-tresor",
    "name": "Claude Code Tresor",
    "description": "Secure storage and secrets management for Claude Code",
    "repository": "claude-skills-by-role/程序员/claude-code-tresor",
    "category": "程序员",
    "tags": ["security", "storage", "secrets", "加密"],
    "platform": ["claude", "claude-code"],
    "language": "en",
    "triggers": ["secure storage", "secrets", "加密存储"],
    "prerequisites": {
      "cli": [],
      "env": []
    },
    "files": {
      "SKILL.md": "claude-skills-by-role/程序员/claude-code-tresor/SKILL.md"
    }
  }
}
```

---

## 六、索引文件结构

### 6.1 主索引文件

```
~/.openclaw/skills-market/
├── index.json              # 主索引（包含所有仓库）
├── trees/
│   ├── root.json          # 根目录树
│   ├── by-category.json    # 按分类组织
│   └── by-platform.json    # 按平台组织
├── repositories/          # 每个仓库的元数据
│   ├── claude-skills-by-role.json
│   └── ...
├── skills/                # 每个 skill 的元数据
│   └── ...
└── cache/
    └── last-sync.json
```

### 6.2 按分类索引

```json
{
  "categories": {
    "程序员": {
      "repositories": [
        "claude-skills-by-role/程序员/claude-code-tresor",
        "claude-skills-by-role/程序员/claude-code-action"
      ],
      "skillCount": 10
    },
    "产品经理": {
      "repositories": [...],
      "skillCount": 8
    },
    "电商运营": {
      "repositories": [...],
      "skillCount": 5
    }
  }
}
```

---

## 七、实施要点

### 7.1 扫描策略

```
1. 扫描 skills-git 目录
2. 递归查找所有 .git 目录
3. 确定嵌套层级
4. 解析每个仓库的 SKILL.md
5. 构建完整的树结构
```

### 7.2 数据去重

```
问题：同一个仓库可能被多个父仓库引用
解决：
- 每个仓库只存储一次
- 记录所有引用关系
- 去重后按 ID 唯一化
```

### 7.3 路径规范

```
本地路径格式：<父仓库>/<子仓库>/.../<skill>
示例：claude-skills-by-role/程序员/claude-code-tresor

远程 URL 格式：https://github.com/<owner>/<repo>
示例：https://github.com/alirezarezvani/claude-code-tresor
```

---

## 八、Skills Market 完整元数据

```json
{
  "market": {
    "version": "2.0",
    "lastUpdated": "2026-03-27T19:58:00Z",
    "root": "/Volumes/waku/大模型/Agentic-tools/skills/skills-git",
    "stats": {
      "totalRepositories": 50,
      "topLevelRepositories": 17,
      "nestedRepositories": 35,
      "totalSkills": 4041
    }
  },

  "repositories": {
    "claude-skills-by-role": {
      "type": "container",
      "children": {
        "程序员": {
          "repositories": ["claude-code-tresor", "claude-code-action", ...]
        },
        "产品经理": {
          "repositories": ["Product-Manager-Skills", ...]
        }
      }
    }
  },

  "skills": [...]
}
```

---

*文档更新时间：2026-03-27 v2.0*
*更新内容：增加嵌套仓库结构支持*
