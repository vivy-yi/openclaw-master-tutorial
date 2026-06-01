# OpenClaw 配置文件结构与 API Key 配置完全指南

> 数据来源：awesome-openclaw-tutorial (⭐4454, xianyu110)  
> 版本基线：v2026.4.14（稳定版）  
> 最后更新：2026-06-01  
> 许可：GPL-3.0

---

## 一、配置文件目录结构

### 1.1 全局配置目录

```
~/.openclaw/                          # 全局配置根目录
├── openclaw.json                     # 全局配置（所有 Agent 共享）
├── credentials/                      # 认证凭据目录
│   └── oauth.json                   # OAuth 凭据
├── agents/                           # Agent 配置目录
│   ├── main-assistant/               # 主助理 Agent
│   │   ├── openclaw.json            # Agent 专属配置
│   │   ├── agent/
│   │   │   └── auth-profiles.json   # 认证配置
│   │   └── sessions/                # 会话记录
│   │       └── *.jsonl
│   └── tech-dev/                     # 技术开发 Agent
│       ├── openclaw.json
│       └── agent/
│           └── auth-profiles.json
├── skills/                           # 用户级 Skills
│   └── custom-skill/
│       └── SKILL.md
└── logs/                             # 日志文件
    └── openclaw.log
```

### 1.2 旧版配置目录（已废弃）

```
~/.openclaw-main-assistant/           # 旧版配置目录（已废弃）
└── openclaw.json                     # 不再使用，已迁移到新结构
```

> ⚠️ **注意**：如果你的系统中还有 `~/.openclaw-*` 目录，建议运行 `openclaw doctor` 进行迁移。

---

## 二、配置文件详解

### 2.1 全局配置文件

**路径**：`~/.openclaw/openclaw.json`

**用途**：所有 Agent 共享的全局配置

**优先级**：低于 Agent 专属配置

**示例内容**：
```json
{
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "providers": {
      "anthropic": {
        "apiKey": "sk-ant-xxx"
      }
    }
  },
  "gateway": {
    "mode": "local",
    "port": 18789
  }
}
```

**查看命令**：
```bash
# 查看全局配置
openclaw config get

# 查看特定配置项
openclaw config get models.default

# 编辑配置文件
nano ~/.openclaw/openclaw.json
```

### 2.2 Agent 专属配置

**路径**：`~/.openclaw/agents/<agentId>/openclaw.json`

**用途**：特定 Agent 的专属配置

**优先级**：高于全局配置

**示例内容**：
```json
{
  "models": {
    "default": "openai/gpt-4",
    "providers": {
      "openai": {
        "apiKey": "sk-xxx"
      }
    }
  },
  "persona": {
    "name": "技术开发助手",
    "role": "专注于代码开发和技术问题"
  }
}
```

**查看命令**：
```bash
# 查看 Agent 配置
openclaw config get --agent tech-dev

# 设置 Agent 配置
openclaw config set models.default "openai/gpt-4" --agent tech-dev

# 编辑配置文件
nano ~/.openclaw/agents/tech-dev/openclaw.json
```

### 2.3 认证配置文件

**路径**：`~/.openclaw/agents/<agentId>/agent/auth-profiles.json`

**用途**：存储 API Key 等认证信息

**优先级**：最高（覆盖其他配置）

**示例内容**：
```json
{
  "profiles": [
    {
      "provider": "anthropic",
      "apiKey": "sk-ant-xxx",
      "createdAt": "2026-02-14T10:00:00Z"
    },
    {
      "provider": "openai",
      "apiKey": "sk-xxx",
      "createdAt": "2026-02-14T10:00:00Z"
    }
  ]
}
```

**管理命令**：
```bash
# 添加认证（交互式）
openclaw models auth add

# 查看认证配置
cat ~/.openclaw/agents/main-assistant/agent/auth-profiles.json

# 删除认证
rm ~/.openclaw/agents/main-assistant/agent/auth-profiles.json
```

---

## 三、API Key 配置方式

### 3.1 配置方式对比

| 方式 | 优先级 | 适用场景 | 持久化 | 难度 |
|------|--------|----------|--------|------|
| 环境变量 | ⭐⭐⭐⭐⭐ 最高 | 临时测试、Docker、CI/CD | ❌ | ⭐ 简单 |
| Agent 专属配置 | ⭐⭐⭐⭐ 高 | 多 Agent 不同 Key | ✅ | ⭐⭐ 中等 |
| 全局配置 | ⭐⭐⭐ 中 | 所有 Agent 共享 | ✅ | ⭐ 简单 |
| 配置向导 | ⭐⭐ 低 | 首次安装 | ✅ | ⭐ 简单 |

### 3.2 配置优先级

**优先级顺序（从高到低）**：
```
1. 环境变量（最高优先级）
   ↓
2. Agent 专属配置
   ↓
3. 全局配置
   ↓
4. 配置向导
   ↓
5. 默认值（最低优先级）
```

### 3.3 方式一：环境变量（推荐：临时测试）

**适用场景**：
- ✅ 临时测试不同的 API Key
- ✅ Docker 容器部署
- ✅ CI/CD 自动化
- ✅ 不想写入配置文件
- ✅ 需要最高优先级

**配置方法**：

**macOS/Linux (zsh)**:
```bash
# 添加到 ~/.zshrc
echo 'export ANTHROPIC_API_KEY="sk-ant-xxx"' >> ~/.zshrc
source ~/.zshrc
```

**macOS/Linux (bash)**:
```bash
# 添加到 ~/.bashrc
echo 'export ANTHROPIC_API_KEY="sk-ant-xxx"' >> ~/.bashrc
source ~/.bashrc
```

**Windows (PowerShell)**:
```powershell
# 临时设置
$env:ANTHROPIC_API_KEY="sk-ant-xxx"

# 永久设置（用户级）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-xxx", "User")
```

**验证配置**：
```bash
# 查看环境变量
echo $ANTHROPIC_API_KEY

# 测试连接
openclaw models list
```

### 3.4 方式二：Agent 专属配置（推荐：多 Agent）

**适用场景**：
- ✅ 多个 Agent 使用不同的 API Key
- ✅ 需要隔离配置
- ✅ 长期使用
- ✅ 需要持久化

**配置方法**：
```bash
# 为特定 Agent 配置
openclaw config set models.providers.anthropic.apiKey "sk-ant-xxx" --agent tech-dev

# 为另一个 Agent 配置不同的 Key
openclaw config set models.providers.openai.apiKey "sk-yyy" --agent content-writer

# 验证配置
openclaw config get models.providers.anthropic.apiKey --agent tech-dev
```

### 3.5 方式三：配置向导（推荐：首次安装）

```bash
openclaw models auth add
```

---

## 四、相关资源

- [OpenClaw 官方文档](https://docs.openclaw.ai) - 官方配置指南
- [OpenClaw Commands 速查](./官方Commands速查.md) - CLI 命令参考
- [新手入门完全指南](./新手入门完全指南.md) - 完整入门教程

---

**🦉 教程大师** | 2026-06-01 23:38 CST  
**数据来源**：awesome-openclaw-tutorial (⭐4454)  
**许可**：GPL-3.0