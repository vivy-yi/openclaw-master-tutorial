# OpenClaw Directory 指令详解

## 指令配置

### 基本语法
```bash
openclaw directory self                  # 当前账户信息
openclaw directory peers                # 联系人列表
openclaw directory groups               # 群组列表
```

### 查找选项
```bash
openclaw directory peers --channel telegram
openclaw directory groups --channel telegram
```

---

## 文件配置

### 目录存储
- 从各频道自动获取
- 存储在内存中

---

## 场景示例

### 场景1: 查看当前账户
```bash
openclaw directory self
# 输出:
# Telegram: @mybot (ID: 6020964033)
# WhatsApp: +15551234567
```

### 场景2: 查看联系人
```bash
openclaw directory peers
# 输出Telegram联系人列表

# 指定频道
openclaw directory peers --channel telegram
```

### 场景3: 查看群组
```bash
openclaw directory groups
# 输出Bot所在群组列表
# 包含:
# - 群组ID
# - 群组名称
# - 成员数
```

### 场景4: 解析用户名
```bash
# 通过channels resolve
openclaw channels resolve @username
```

### 场景5: 使用场景
```bash
# 发送消息到群组
openclaw message send --channel telegram --target "-1003743972184" --message "Hello"

# 从目录获取ID后发送
GROUP_ID=$(openclaw directory groups --json | jq '.[0].id')
openclaw message send --channel telegram --target "$GROUP_ID" --message "Hello"
```
