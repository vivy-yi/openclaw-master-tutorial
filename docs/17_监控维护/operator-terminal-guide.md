# Operator Terminal 快速上手指南

> 🦉 教程大师出品 | 深度调研日期: 2026-07-26
> 
> **功能来源**: PR #113888 | **状态**: ✅ 已合并 (v2026.7.2)

---

## 一、概述

Operator Terminal 是 OpenClaw v2026.7.2 引入的全新功能，允许管理员在 Control UI 中直接访问沙盒化终端环境。该功能在 v2026.7.2 版本中**默认启用**。

### 核心特性

| 特性 | 说明 |
|------|------|
| **默认启用** | `gateway.terminal.enabled` 默认为 `true` |
| **权限控制** | 仅对 admin 作用域生效 |
| **安全隔离** | 完全沙盒化的 agent 环境 |
| **多端支持** | Web UI、移动端均支持 |

---

## 二、配置方法

### 2.1 默认配置 (v2026.7.2+)

```yaml
# v2026.7.2+ 默认启用
gateway:
  terminal:
    enabled: true  # ✅ 默认开启
```

### 2.2 禁用 Operator Terminal

如需禁用该功能：

```yaml
gateway:
  terminal:
    enabled: false  # 禁用
```

### 2.3 配置文件位置

```bash
# OpenClaw 配置文件
~/.openclaw/openclaw.yaml
# 或
/etc/openclaw/openclaw.yaml
```

---

## 三、访问方式

### 3.1 Control UI 访问

1. **打开 Control UI**
   - 访问 OpenClaw 控制台
   - 登录管理员账号

2. **找到终端按钮**
   - 界面右上角可见终端图标
   - 管理员可见所有终端功能

3. **点击连接**
   - 点击终端按钮建立连接
   - 自动进入沙盒化终端环境

### 3.2 移动端访问

- 📱 **iOS/Android**: 移动端屏幕直接可见终端入口
- 点击即可访问，无需额外配置

---

## 四、安全模型

### 4.1 权限隔离

```
┌─────────────────────────────────────────────────────┐
│                   Admin 作用域                        │
├─────────────────────────────────────────────────────┤
│  ✅ 可访问 Operator Terminal                        │
│  ✅ 可执行命令                                       │
│  ✅ 可访问沙盒化 agent 环境                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   普通用户作用域                      │
├─────────────────────────────────────────────────────┤
│  ❌ 不可访问 Operator Terminal                      │
│  ❌ 仅能使用标准 agent 能力                          │
└─────────────────────────────────────────────────────┘
```

### 4.2 沙盒限制

| 限制项 | 说明 |
|--------|------|
| **完全沙盒化 Agent** | ❌ 被拒绝执行 |
| **标准 Agent** | ✅ 可执行 |
| **文件系统访问** | 仅限 workspace 目录 |
| **网络访问** | 受限于安全策略 |

### 4.3 CSP 变更

Terminal 功能需要 WebAssembly 执行权限：

```yaml
# 新增的 CSP 策略
Content-Security-Policy:
  - default-src 'self'
  - script-src 'self' 'wasm-unsafe-eval'  # 新增
  - connect-src 'self' wss:// api.openclaw.ai
```

---

## 五、使用场景

### 5.1 适用场景

| 场景 | 说明 |
|------|------|
| **系统诊断** | 快速检查 Gateway 状态 |
| **日志查看** | 实时查看日志输出 |
| **配置调试** | 测试配置变更效果 |
| **远程维护** | 无需 SSH 即可维护 |
| **故障排查** | 快速定位问题根因 |

### 5.2 典型工作流

```
1. 管理员登录 Control UI
2. 点击终端按钮连接
3. 执行诊断命令：
   - openclaw status
   - openclaw logs
   - openclaw gateway status
4. 查看实时输出
5. 排查完成后断开连接
```

---

## 六、命令参考

### 6.1 常用诊断命令

```bash
# 查看 Gateway 状态
openclaw gateway status

# 查看实时日志
openclaw logs -f

# 查看活跃会话
openclaw sessions list

# 检查配置
openclaw config get

# 健康检查
openclaw healthcheck
```

### 6.2 终端快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+C` | 中断当前命令 |
| `Ctrl+L` | 清屏 |
| `Tab` | 自动补全 |
| `↑/↓` | 命令历史 |

---

## 七、故障排查

### Issue 1: 终端按钮不可见

**原因**: 非管理员用户或功能被禁用

**解决方案**:

```bash
# 1. 确认是管理员账号
# 2. 检查配置
grep -A5 "terminal" ~/.openclaw/openclaw.yaml

# 如需启用
gateway:
  terminal:
    enabled: true
```

### Issue 2: 连接建立失败

**排查步骤**:

```bash
# 1. 检查 Gateway 状态
openclaw gateway status

# 2. 检查端口监听
netstat -an | grep 18789

# 3. 查看错误日志
openclaw logs | grep -i terminal
```

### Issue 3: CSP 阻止 wasm-eval

**症状**: 浏览器控制台报错 CSP 违规

**解决方案**:

```yaml
# 在反向代理配置中添加 CSP 头
Content-Security-Policy: script-src 'self' 'wasm-unsafe-eval'
```

---

## 八、与传统 SSH 的对比

| 对比项 | Operator Terminal | SSH |
|--------|-------------------|-----|
| **访问方式** | Web UI | 命令行 |
| **权限控制** | 精细化权限 | 主机 root |
| **审计日志** | 完整记录 | 需额外配置 |
| **移动端** | ✅ 原生支持 | ❌ 不支持 |
| **安全隔离** | 沙盒化 | 主机权限 |
| **配置复杂度** | 低 | 高 |

---

## 九、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v2026.7.2 | 2026-07-26 | ✅ 默认启用，Control UI 集成 |
| v2026.7.1 | 2026-07-19 | 🔧 修复阶段 |

---

## 十、参考资源

| 资源 | 链接 |
|------|------|
| PR #113888 | https://github.com/openclaw/openclaw/pull/113888 |
| v2026.7.2 Release | https://github.com/openclaw/openclaw/releases/tag/v2026.7.2 |
| Security Guide | `../16_安全配置/openclaw-security-guide.md` |

---

🦉 **教程大师** | OpenClaw 官方教程
