# ClickClack 引导式配置指南

> **版本**: v2026.7.2-beta.3+  
> **状态**: 🟡 Beta  
> **最后更新**: 2026-07-24

## 概述

ClickClack 是 OpenClaw v2026.7.2 引入的全新渠道集成方案，提供引导式配置流程，支持交互式设置 URL、Token 和 Workspace 参数。

## 快速开始

### 方式一: 使用 onboard 命令

```bash
openclaw onboard
```

`openclaw onboard` 会启动交互式引导流程：

1. 选择 "Add Channel" → "ClickClack"
2. 输入 ClickClack 服务器 URL
3. 输入认证 Token
4. 输入 Workspace 名称
5. 验证连接（可选，非致命）

### 方式二: 直接添加渠道

```bash
openclaw channels add clickclack
```

此命令同样会触发交互式配置流程。

## 配置参数

### 必填参数

| 参数 | 说明 | 示例 |
|------|------|------|
| URL | ClickClack 服务器地址 | `https://clickclack.example.com` |
| Token | 认证令牌 | `ck_live_xxxxx` |
| Workspace | 工作区名称 | `my-workspace` |

### 可选配置

```bash
# 使用环境变量作为默认账户
export OPENCLAW_CLICKCLACK_ACCOUNT=default

# 自定义配置
openclaw config set channels.clickclack.url https://clickclack.example.com
openclaw config set channels.clickclack.workspace my-workspace
```

## 交互式配置流程

### 完整流程示例

```
$ openclaw onboard

🤖 OpenClaw 引导设置

1. 添加新渠道 (Add Channel)
2. 配置模型提供商
3. 高级设置
4. 退出

> 选择 [1]: 添加新渠道

支持的渠道:
1. Telegram
2. Discord
3. Slack
4. ClickClack
5. Signal
6. WhatsApp

> 选择渠道 [4]: ClickClack

🔧 ClickClack 配置

服务器 URL: https://clickclack.example.com
认证 Token: ********
工作区: my-workspace

✓ 正在验证连接...
✓ 连接成功！

下一步:
1. 启动 Gateway
2. 查看命令菜单
3. 完成

> 选择 [1]: 启动 Gateway

✅ ClickClack 配置完成！
```

## 命令菜单

配置完成后，每个 Bot 的原生 OpenClaw 命令会自动发布到 ClickClack composer 自动补全。

### 功能特性

- **自动发布**: Gateway 启动时自动同步命令列表
- **账户级控制**: 可按账户选择退出
- **兼容性处理**: 对旧版 Token 和服务器自动降级处理

### 手动管理命令

```bash
# 查看可用命令
openclaw channels clickclack commands list

# 禁用命令菜单（按账户）
openclaw channels clickclack commands disable --account <account-id>
```

## 故障排除

### 连接验证失败

```
✗ 连接验证失败
可能原因:
- URL 不可达
- Token 无效
- 服务器不支持
```

**解决方案**:

1. 检查 URL 是否正确
2. 验证 Token 是否过期
3. 确认服务器版本兼容

### 环境变量回退

如果交互式输入失败，ClickClack 会尝试从环境变量读取：

```bash
export CLICKCLACK_URL=https://clickclack.example.com
export CLICKCLACK_TOKEN=ck_live_xxxxx
export CLICKCLACK_WORKSPACE=my-workspace
```

## 安全注意事项

1. **Token 安全**: 不要将 Token 提交到代码仓库
2. **HTTPS 优先**: 生产环境必须使用 HTTPS
3. **权限最小化**: 仅授予必要的 Workspace 访问权限

## 相关文档

- [ClickClack 命令菜单](./clickclack-commands.md)
- [渠道配置总览](../05-Agent协作/channels.md)
- [v2026.7.2-beta.3 Changelog](../changelog/v2026.7.2-beta.3.md)

---

*文档基于 OpenClaw v2026.7.2-beta.3 官方 Release Notes*
