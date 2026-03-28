# OpenClaw Security 指令详解

## 指令配置

### 基本语法
```bash
openclaw security audit                  # 安全审计
```

---

## 审计项目

| 检查项 | 说明 |
|--------|------|
| API Key | 是否暴露 |
| Token | 是否安全存储 |
| 权限 | 是否有过度权限 |
| 配置 | 是否有安全隐患 |

---

## 文件配置

### 安全配置
```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "ask": "on-miss"
    },
    "elevated": {
      "enabled": true,
      "allowFrom": {}
    }
  }
}
```

---

## 场景示例

### 场景1: 运行安全审计
```bash
openclaw security audit
# 输出:
# ✅ API Key未暴露
# ⚠️ Gateway Token较短
# ✅ 执行权限已限制
# ✅ 提升权限已控制
```

### 场景2: 常见问题修复
```bash
# 建议操作:
# 1. 使用强Gateway Token
# 2. 限制exec权限
# 3. 配置ask选项
```

### 场景3: 安全最佳实践
```bash
# 1. 限制exec权限
openclaw config set tools.exec.security "allowlist"

# 2. 配置exec询问
openclaw config set tools.exec.ask "on-miss"

# 3. 禁用危险工具
openclaw config set tools.exec.deny '["rm -rf"]'
```
