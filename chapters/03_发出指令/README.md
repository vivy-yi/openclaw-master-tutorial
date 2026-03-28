# 第3章 发出第一条指令

> **本章学习目标**: 掌握OpenClaw基础对话和命令使用方法
> **预计用时**: 45-60分钟
> **前置要求**: 已完成第2章部署

---

## 3.1 基础对话

### 启动对话

```bash
openclaw
# 或指定端口
openclaw --port 18789
```

### 对话模式

OpenClaw支持多种对话模式：
- **交互模式**: 实时对话
- **命令模式**: 使用斜杠命令
- **批量模式**: 处理文件任务

---

## 3.2 核心命令

### 常用命令列表

| 命令 | 功能 | 示例 |
|-----|-----|-----|
| `/help` | 显示帮助 | `/help` |
| `/status` | 查看状态 | `/status` |
| `/reload` | 重载配置 | `/reload` |
| `/exit` | 退出 | `/exit` |

### 文件操作命令

```
# 读取文件
read file.txt

# 写入文件
write hello.txt "Hello World"

# 执行命令
exec ls -la
```

---

## 3.3 工作区文件系统

### 工作区结构

```
~/.openclaw/
├── workspace/          # 工作目录
│   ├── downloads/     # 下载文件
│   ├── uploads/        # 上传文件
│   └── temp/          # 临时文件
├── memory/            # 记忆存储
├── skills/            # 技能目录
└── openclaw.json      # 配置文件
```

### 快速访问

```
# 默认工作目录
workspace/

# 指定路径
~/Documents/project/
```

---

## 3.4 进阶使用

### 设置提醒

```
提醒我下午3点开会
```

### 搜索文件

```
帮我找一下上周的会议纪要
```

### 执行自动化任务

```
每天早上9点给我发送天气简报
```

---

## 本章小结

1. 基础对话：直接输入文字即可对话
2. 核心命令：/help、/status、/reload、/exit
3. 文件操作：read、write、exec
4. 工作区：~/.openclaw/workspace/
