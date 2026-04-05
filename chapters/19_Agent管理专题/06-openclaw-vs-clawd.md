# ~/.openclaw vs ~/clawd

> 日期：2026-03-25
> 来源：内容运营助手群
> 参考：OpenClaw 官方文档

---

user: ~/.openclaw vs ~/clawd 全面分析对比关于这个问题,我需要你根据openclaw的官方文档回答

assistant: 根据官方文档，我找到了以下信息：

## 官方定义

根据 OpenClaw 文档：

| 目录 | 官方定义 |
|------|---------|
| **`~/.openclaw/`** | **默认状态目录 (State Directory)**，包含配置、凭证，会话数据等 |
| **`~/.openclaw/workspace/`** | **默认工作空间**，包含 SOUL.md、AGENTS.md、MEMORY.md 等 |

---

### 官方文档原文

从 `/opt/homebrew/lib/node_modules/openclaw/docs/install/migrating.md`：

> "When you copy the **state directory** (`~/.openclaw/` by default)..."

> "Custom profiles use `~/.openclaw-<profile>/` or a path set via `OPENCLAW_STATE_DIR`."

从 `/opt/homebrew/lib/node_modules/openclaw/docs/start/openclaw.md`：

> "By default, OpenClaw uses `~/.openclaw/workspace` as the agent workspace..."

---

### 📊 结构说明

```
~/.openclaw/                          ← 状态目录 (State Directory)
├── openclaw.json    ← 主配置文件
├── credentials/     ← API 凭证
├── agents/         ← Agent 会话状态
├── workspace/      ← 默认工作空间 (Bootstrap 文件)
├── skills/        ← 安装的 Skills
├── cron/          ← 定时任务
└── ...
```

---

### ⚠️ 关于 ~/clawd

**官方文档中没有明确说明 `~/clawd` 的来源**。

可能的来源：
1. **旧版本遗留** - 早期版本使用的目录名
2. **符号链接** - `ls -la ~` 显示 `~/.clawdbot -> ~/.moltbot`，可能是版本演变
3. **自定义工作区** - 用户手动创建的额外工作空间

---

### 💡 总结

| 目录 | 状态 | 官方支持 |
|------|------|---------|
| `~/.openclaw/` | ✅ 正在使用 | 官方默认状态目录 |
| `~/clawd/` | ❓ 不明确 | 未在官方文档中找到定义 |

建议使用 **~/.openclaw/** 作为主目录，它是 OpenClaw 官方定义的默认路径。
