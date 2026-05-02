# OpenClaw CLI Quick Reference

> 源码：`src/agents/system-prompt.ts`，约 line 740
>
> **注入条件**：`hasGateway && !isMinimal`

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `openclaw status` | 查看 Gateway 和 Agent 状态 |
| `openclaw gateway start` | 启动 Gateway |
| `openclaw gateway stop` | 停止 Gateway |
| `openclaw gateway restart` | 重启 Gateway |
| `openclaw config get <path>` | 获取配置项 |
| `openclaw config set <path> <value>` | 设置配置项 |
| `openclaw config apply` | 应用配置变更 |
| `openclaw config patch` | 补丁式更新配置 |
| `openclaw channel add <platform>` | 添加渠道 |
| `openclaw channel list` | 列出已配置渠道 |
| `openclaw skills list` | 列出已安装 Skills |
| `openclaw skills install <name>` | 安装 Skill |
| `openclaw update run` | 执行更新 |
| `openclaw --version` | 查看版本 |

---

## Gateway 管理

### 启动

```bash
openclaw gateway start
```

### 停止

```bash
openclaw gateway stop
```

### 重启

```bash
openclaw gateway restart
```

### 状态检查

```bash
openclaw gateway status
```

输出示例：
```
✅ Gateway running at ws://127.0.0.1:18789
✅ Dashboard: http://127.0.0.1:18789/
```

---

## 配置管理

### 查看配置

```bash
openclaw config get gateway.port
```

### 设置配置

```bash
openclaw config set gateway.port 18790
```

### 应用配置

```bash
openclaw config apply
```

### 补丁更新

```bash
openclaw config patch --json '{"gateway": {"port": 18791}}'
```

---

## 渠道管理

### 添加渠道

```bash
openclaw channel add feishu
openclaw channel add telegram
openclaw channel add discord
```

### 列出渠道

```bash
openclaw channel list
```

### 配置渠道

编辑 `~/.openclaw/openclaw.json` 中的 `channels` 部分。

---

## Skills 管理

### 列出 Skills

```bash
openclaw skills list
```

### 安装 Skill

```bash
openclaw skills install <skill-name>
```

### 卸载 Skill

```bash
openclaw skills uninstall <skill-name>
```

---

## 与 Self-Update 的关系

CLI Reference 配合 **Self-Update** 使用：

```
## OpenClaw Self-Update
Get Updates (self-update) is ONLY allowed when the user explicitly asks for it.
Do not run config.apply or update.run unless the user explicitly requests an update or config change; if it's not explicit, ask first.
```

---

## 源码参考

```typescript
// 约 line 740
if (hasGateway && !isMinimal) {
  lines.push(
    "## OpenClaw CLI Quick Reference",
    "OpenClaw is controlled via subcommands. Do not invent commands.",
    // ... 命令列表
  );
}
```

---

## 相关文件

- [08_self_update.md](./08_self_update.md) — 自我更新规范
- [22_documentation.md](./22_documentation.md) — 文档路径说明