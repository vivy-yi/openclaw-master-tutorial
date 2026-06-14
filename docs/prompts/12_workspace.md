# ## Workspace

> 源码：`src/agents/system-prompt.ts`，约 line 778
>
> **注入条件**：始终（Always）

---

## 基本定义

```
Your working directory is: <workspaceDir>
```

OpenClaw 将指定目录视为**唯一的全局工作区**，所有文件操作默认在此目录下进行。

---

## 目录优先级

```
工作区目录 > 其他目录
```

除非明确指示，否则：
- `read`/`write`/`edit` 默认在工作区
- `exec` 命令默认在工作区执行
- glob 模式默认在工作区搜索

---

## 工作区内容

典型的 OpenClaw workspace 结构：

```
~/.openclaw/
├── workspace/           # 主工作区
│   ├── AGENTS.md        # Agent 协作规范
│   ├── SOUL.md          # Agent 人格定义
│   ├── USER.md          # 用户画像
│   ├── IDENTITY.md      # Agent 身份记录
│   ├── TOOLS.md         # 工具说明
│   ├── HEARTBEAT.md     # 心跳任务
│   ├── MEMORY.md        # 长期记忆
│   ├── memory/          # 每日日志
│   │   └── YYYY-MM-DD.md
│   ├── docs/            # 文档
│   └── ...
├── skills/              # Skills 目录
├── shared/              # 共享知识库
├── sessions/            # 会话记录
└── openclaw.json        # 主配置
```

---

## Workspace 规范

### ✅ 正确做法

1. **使用相对路径**
   ```
   read memory/2026-04-21.md
   ```

2. **先确认存在再操作**
   ```
   ls docs/
   read docs/intro.md
   ```

3. **明确指定工作区内路径**
   ```
   write content to docs/new.md
   ```

### ❌ 错误做法

1. **直接操作工作区外路径**
   ```
   read /Users/otheruser/secret.txt
   write /tmp/output.txt  # 除非确实需要
   ```

2. **假设路径存在**
   ```
   edit somefile.md  # 未确认存在
   ```

3. **忽略 workspace 边界**
   ```
   cd / && ls  # 不必要地切换目录
   ```

---

## 路径解析规则

### 正常模式（非沙箱）

```
文件路径 → 解析为 <workspaceDir>/<path>
```

### 沙箱模式

```
文件工具（read/write/edit）→ 使用 host workspace 路径
exec/bash 命令 → 使用 sandbox container 路径
```

---

## 跨 Workspace 操作

有时需要操作其他位置：

| 场景 | 方法 |
|------|------|
| 临时文件 | `/tmp/` 或使用 `exec` 创建 |
| 系统配置 | 需要用户明确授权 |
| 其他 workspace | 使用 `exec` + 绝对路径 |

---

## 源码参考

```typescript
// 约 line 778
const workspaceGuidance =
  params.sandboxInfo?.enabled && sanitizedSandboxContainerWorkspace
    ? `For read/write/edit/apply_patch, file paths resolve against host workspace: ${sanitizedWorkspaceDir}. For bash/exec commands, use sandbox container paths under ${sanitizedSandboxContainerWorkspace} (or relative paths from that workdir), not host paths.`
    : "Treat this directory as the single global workspace for file operations unless explicitly instructed otherwise.";

lines.push("## Workspace", `Your working directory is: ${displayWorkspaceDir}`, workspaceGuidance, "");
```

---

## 相关文件

- [AGENTS.md](./bootstrap_AGENTS.md) — Agent 协作规范
- [SOUL.md](./bootstrap_SOUL.md) — Agent 人格定义
- [USER.md](./bootstrap_USER.md) — 用户画像
- [13_sandbox.md](./13_sandbox.md) — 沙箱模式
- [14_project_context.md](./14_project_context.md) — 项目上下文文件