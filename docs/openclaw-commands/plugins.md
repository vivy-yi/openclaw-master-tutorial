# OpenClaw Plugins 指令详解

## 指令配置

### 基本语法
```bash
openclaw plugins list                   # 列出已发现插件
openclaw plugins install <spec>        # 安装插件
openclaw plugins update                # 更新插件
openclaw plugins disable <id>          # 禁用插件
openclaw plugins enable <id>           # 启用插件
openclaw plugins info <id>             # 插件详情
openclaw plugins doctor               # 报告插件问题
```

### 安装选项
```bash
# 从NPM安装
openclaw plugins install @openclaw/feishu
openclaw plugins install @openclaw/discord

# 从路径安装
openclaw plugins install --path /path/to/plugin

# 从归档安装
openclaw plugins install --source archive /path/to/archive.tar.gz
```

---

## 文件配置

### 插件目录
- **全局插件**: `~/.openclaw/extensions/`
- **工作区插件**: 内置

### 插件结构
```
plugin-name/
├── index.js           # 入口
├── package.json       # 依赖
├── schemas/          # 配置schema
└── locales/          # 国际化
```

### 插件配置 (openclaw.json)
```json
{
  "plugins": {
    "enabled": true,
    "allow": [],
    "deny": [],
    "load": {
      "paths": []
    },
    "entries": {
      "feishu": {
        "enabled": true
      },
      "telegram": {
        "enabled": true
      },
      "minimax-portal-auth": {
        "enabled": true
      }
    },
    "installs": {
      "feishu": {
        "source": "path",
        "sourcePath": "/path/to/feishu-plugin",
        "version": "2026.1.29-beta.1",
        "installedAt": "2026-01-30T02:39:23.344Z"
      }
    }
  }
}
```

### 插件类型

| 插件 | 类型 | 功能 |
|------|------|------|
| feishu | channel | 飞书消息 |
| telegram | channel | Telegram消息 |
| discord | channel | Discord消息 |
| whatsapp | channel | WhatsApp消息 |
| memory-core | memory | 记忆搜索 |
| memory-lancedb | memory | 向量记忆 |
| minimax-portal-auth | auth | MiniMax OAuth |

---

## 场景示例

### 场景1: 列出所有插件
```bash
openclaw plugins list
# 输出:
# - @openclaw/feishu (飞书)
# - @openclaw/telegram (Telegram)
# - @openclaw/discord (Discord)
# - @openclaw/memory-core (记忆)
# - ...
```

### 场景2: 安装新插件
```bash
# 从NPM安装
openclaw plugins install @openclaw/slack

# 指定版本
openclaw plugins install @openclaw/slack@1.0.0

# 从本地路径安装
openclaw plugins install --path /Volumes/waku/大模型/bolt/plugin-examples/feishu-plugin
```

### 场景3: 启用/禁用插件
```bash
# 禁用插件
openclaw plugins disable feishu

# 启用插件
openclaw plugins enable feishu

# 通过配置
openclaw config set plugins.entries.feishu.enabled false
```

### 场景4: 查看插件详情
```bash
openclaw plugins info feishu
# 输出:
# - 名称: 飞书
# - 版本: 2026.1.29-beta.1
# - 作者: OpenClaw Team
# - 功能: 飞书消息通道
# - 依赖: 无
```

### 场景5: 更新插件
```bash
# 更新所有插件
openclaw plugins update

# 更新特定插件
openclaw plugins update feishu
```

### 场景6: 诊断插件问题
```bash
openclaw plugins doctor
# 检查:
# - 插件加载状态
# - 依赖缺失
# - 版本冲突
# - 配置错误
```

### 场景7: 配置插件
```bash
# 配置飞书
openclaw config set plugins.entries.feishu.config.appId "xxx"
openclaw config set plugins.entries.feishu.config.appSecret "xxx"
openclaw config set plugins.entries.feishu.config.domain "feishu"

# 配置Telegram
openclaw config set plugins.entries.telegram.config.botToken "xxx"
```

### 场景8: 添加自定义插件路径
```bash
# 添加额外插件目录
openclaw config set plugins.load.paths '["/path/to/plugins","/Volumes/waku/custom-plugins"]'

# 重启Gateway
openclaw gateway restart
```

### 场景9: 插件白名单/黑名单
```bash
# 只允许特定插件
openclaw config set plugins.allow '["feishu","telegram"]'

# 禁止特定插件
openclaw config set plugins.deny '["discord"]'
```
