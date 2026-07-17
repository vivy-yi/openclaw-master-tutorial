# OpenClaw Configure 指令详解

## 指令配置

### 基本语法
```bash
openclaw configure                      # 完整交互式配置
openclaw configure --section workspace  # 只配置工作区
openclaw configure --section model       # 只配置模型
openclaw configure --section channels   # 只配置频道
openclaw configure --section skills     # 只配置技能
openclaw configure --section health     # 只配置健康检查
```

---

## 配置章节

| 章节 | 说明 |
|------|------|
| workspace | 工作区、路径 |
| model | API Key、模型选择 |
| web | Web搜索配置 |
| gateway | Gateway配置 |
| daemon | 系统服务配置 |
| channels | 消息频道配置 |
| skills | 技能配置 |
| health | 健康检查配置 |

---

## 场景示例

### 场景1: 完整配置
```bash
openclaw configure
# 逐步引导配置所有项目
```

### 场景2: 只配置模型
```bash
openclaw configure --section model
# 1. 选择Provider
# 2. 输入API Key
# 3. 选择默认模型
```

### 场景3: 只配置频道
```bash
openclaw configure --section channels
# 配置Telegram/WhatsApp/Discord等
```

### 场景4: 配置技能
```bash
openclaw configure --section skills
# 选择安装哪些技能
```

### 场景5: 健康检查配置
```bash
openclaw configure --section health
# 配置自动健康检查选项
```
