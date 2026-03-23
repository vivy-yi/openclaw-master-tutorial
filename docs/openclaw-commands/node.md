# OpenClaw Node 指令详解

## 指令配置

### 基本语法
```bash
openclaw node run                       # 运行节点
openclaw node status                    # 节点状态
openclaw node start                     # 启动节点服务
openclaw node stop                      # 停止节点服务
openclaw node restart                   # 重启节点服务
openclaw node install                   # 安装节点服务
openclaw node uninstall                 # 卸载节点服务
```

---

## 文件配置

### 节点配置
```json
{
  "nodeHost": {
    "browserProxy": {
      "enabled": true,
      "allowProfiles": ["clawd"]
    }
  }
}
```

### 节点功能
- **远程执行**: 执行shell命令
- **浏览器控制**: 提供浏览器代理
- **屏幕截图**: 远程屏幕捕获

---

## 场景示例

### 场景1: 运行节点
```bash
# 前台运行
openclaw node run

# 查看状态
openclaw node status
```

### 场景2: 安装系统服务
```bash
# macOS
openclaw node install

# 自动配置launchd
```

### 场景3: 节点管理
```bash
openclaw node start
openclaw node stop
openclaw node restart
```

### 场景4: 卸载节点
```bash
openclaw node uninstall
```

### 场景5: 浏览器代理
```bash
# 启用浏览器代理
openclaw config set nodeHost.browserProxy.enabled true

# 配置允许的配置
openclaw config set nodeHost.browserProxy.allowProfiles '["clawd","chrome"]'
```
