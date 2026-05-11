# OpenClaw Skills 指令详解

## 指令配置

### 基本语法
```bash
openclaw skills list                   # 列出所有可用技能
openclaw skills info <skill>          # 显示技能详情
openclaw skills check                 # 检查技能就绪状态
```

### 技能安装
```bash
# 通过ClawHub安装
clawhub install <skill-name>

# 本地安装
openclaw skills install --path /path/to/skill
```

---

## 文件配置

### 技能目录结构
```
~/.openclaw/skills/                    # 全局技能
/Users/d/clawd/skills/                 # 工作区技能
/Users/d/clawd/agents/foundation/墨析/ # Agent专属技能
```

### 技能结构
```
skill-name/
├── SKILL.md              # 技能定义
├── index.js              # 入口文件
├── lib/                  # 依赖库
└── profiles/             # 配置目录
    ├── config.json       # 默认配置
    └── platforms/        # 平台配置
```

### SKILL.md 格式
```markdown
# 技能名称

## 触发条件
- 关键词: 分析、投资、股票

## 能力
1. 获取实时行情
2. 技术分析
3. 生成投资报告

## 依赖
- yfinance
- pandas
```

### 技能配置 (openclaw.json)
```json
{
  "skills": {
    "load": {
      "extraDirs": [
        "/Users/d/clawd/skills"
      ],
      "watch": true
    },
    "install": {
      "nodeManager": "npm"
    }
  }
}
```

### Agent技能配置
```json
{
  "agents": {
    "list": [
      {
        "id": "moguan",
        "skills": ["stock-analyst", "macro-analyst"]
      }
    ]
  }
}
```

---

## 场景示例

### 场景1: 列出所有技能
```bash
openclaw skills list
# 输出:
# - weather (天气查询)
# - stock-analyst (股票分析)
# - ai-research (AI调研)
# - github (GitHub交互)
# - ...
```

### 场景2: 查看技能详情
```bash
openclaw skills info stock-analyst
# 输出:
# - 名称: 股票分析
# - 描述: 提供股票行情分析
# - 触发词: 股票、行情、A股
# - 依赖: yfinance
```

### 场景3: 检查技能状态
```bash
openclaw skills check
# 输出:
# ✅ weather - 就绪
# ✅ stock-analyst - 就绪
# ⚠️ ai-research - 缺少依赖: requests
```

### 场景4: 配置Agent使用技能
```bash
# 为Agent添加技能白名单
openclaw config set agents.list.moguan.skills '["stock-analyst","risk-analyzer"]'

# 禁用所有技能
openclaw config set agents.list.moguan.skills '[]'
```

### 场景5: 添加技能目录
```bash
# 添加额外技能目录
openclaw config set skills.load.extraDirs '["/Users/d/clawd/skills","/Users/d/clawd/agents/foundation"]'

# 开启技能文件监控(热更新)
openclaw config set skills.load.watch true
```

### 场景6: 创建自定义技能
```bash
# 技能目录结构
mkdir -p /Users/d/clawd/skills/my-skill
cd /Users/d/clawd/skills/my-skill

# 创建SKILL.md
cat > SKILL.md << 'EOF'
# 我的自定义技能

## 触发条件
- 关键词: 你好、hello

## 能力
1. 问候
2. 简单对话
EOF

# 创建入口文件
cat > index.js << 'EOF'
module.exports = {
  name: 'my-skill',
  trigger: ['你好', 'hello'],
  handler: async (context) => {
    return { message: '你好！我是自定义技能。' };
  }
};
EOF
```

### 场景7: 技能间调用
```bash
# 在一个技能中调用另一个技能
const weather = context.skill('weather');
const result = await weather.execute({ city: '上海' });
```
