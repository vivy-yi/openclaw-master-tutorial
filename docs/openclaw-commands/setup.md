# OpenClaw Setup 指令详解

## 指令配置

### 基本语法
```bash
openclaw setup                          # 初始化配置
openclaw setup --wizard                 # 交互式引导
openclaw setup --mode local             # 本地模式
openclaw setup --mode remote            # 远程模式
openclaw setup --workspace <dir>        # 指定工作区
```

---

## 文件配置

### 初始化创建的文件
```
~/.openclaw/
├── openclaw.json          # 主配置
├── gateway-state.json    # Gateway状态
├── auth-profiles.json     # 认证配置
├── agents/
│   └── main/             # 主Agent
│       ├── agent/
│       └── sessions/
├── memory/
├── skills/
└── logs/
```

### 工作区结构
```
<workspace>/
├── AGENTS.md
├── SOUL.md
├── USER.md
├── MEMORY.md
├── HEARTBEAT.md
├── TOOLS.md
└── IDENTITY.md
```

---

## 场景示例

### 场景1: 首次初始化
```bash
openclaw setup
# 引导创建:
# 1. 工作区目录
# 2. 主配置文件
# 3. 基本Agent
```

### 场景2: 交互式引导
```bash
openclaw setup --wizard
# 逐步配置:
# 1. 选择模式 (local/remote)
# 2. 配置模型
# 3. 配置频道
# 4. 配置技能
```

### 场景3: 指定工作区
```bash
openclaw setup --workspace /Users/d/clawd
# 在指定目录创建工作区
```

### 场景4: 远程模式
```bash
openclaw setup --mode remote
# 配置:
# - Remote Gateway URL
# - Remote Token
```

### 场景5: 开发模式初始化
```bash
openclaw gateway --dev
# 创建:
# - 开发配置 (~/.openclaw-dev/)
# - 隔离工作区
```
