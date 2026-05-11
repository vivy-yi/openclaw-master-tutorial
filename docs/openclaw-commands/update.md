# OpenClaw Update 指令详解

## 指令配置

### 基本语法
```bash
openclaw update                         # 更新到最新版本
openclaw update --channel stable        # 切换到稳定版
openclaw update --channel beta          # 切换到测试版
openclaw update --channel dev           # 切换到开发版
openclaw update status                  # 查看更新状态
openclaw update wizard                  # 交互式更新向导
```

### 更新选项
```bash
openclaw update --tag <version>        # 指定版本
openclaw update --no-restart           # 不重启Gateway
openclaw update --yes                   # 自动确认
openclaw update --json                  # JSON输出
openclaw update --timeout 600          # 超时时间(秒)
```

---

## 文件配置

### 更新配置
```json
{
  "update": {
    "channel": "stable",
    "checkOnStart": true
  }
}
```

### 更新通道
- **stable**: 稳定版 (推荐)
- **beta**: 测试版 (新功能)
- **dev**: 开发版 (最新但可能不稳定)

---

## 场景示例

### 场景1: 检查更新
```bash
openclaw update status
# 输出:
# 当前版本: 2026.2.6-3
# 更新通道: stable
# 最新版本: 2026.2.7
```

### 场景2: 执行更新
```bash
# 标准更新
openclaw update

# 不重启Gateway
openclaw update --no-restart

# 自动确认
openclaw update --yes
```

### 场景3: 切换通道
```bash
# 切换到测试版
openclaw update --channel beta

# 切换到开发版
openclaw update --channel dev

# 切回稳定版
openclaw update --channel stable
```

### 场景4: 安装特定版本
```bash
# 安装特定版本
openclaw update --tag 2026.2.5

# 安装最新测试版
openclaw update --tag beta
```

### 场景5: 交互式更新
```bash
openclaw update wizard
# 引导选择:
# 1. 更新通道
# 2. 版本
# 3. 是否重启
```

### 场景6: 查看可用版本
```bash
# NPM包查看
npm view openclaw versions --json
```
