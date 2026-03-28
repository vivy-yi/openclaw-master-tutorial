# Agent 创建正确流程

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 现在你让我创建agent的完整流程是什么

assistant: ## 正确的流程总结

### ❌ 错误的流程（之前的问题）

1. 使用 `gateway config.apply` 仅传入部分配置（如 `agents` + `bindings`）
2. → 导致其他配置（channels、plugins等）丢失
3. → Gateway 重启失败或崩溃

---

### ✅ 正确的流程

**方案一：使用 jq 修改配置（推荐）**

```bash
# 1. 备份配置
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak

# 2. 添加新 Agent 到 agents.list
jq '.agents.list += [{"id":"mo-youtube","name":"墨油","workspace":"/Users/d/.openclaw/workspaces/mo-youtube"}]' ~/.openclaw/openclaw.json > /tmp/openclaw.json

# 3. 添加 binding
jq '.bindings += [{"agentId":"mo-youtube","match":{"channel":"telegram","peer":{"kind":"group","id":"-5111532435"}}}]' /tmp/openclaw.json > ~/.openclaw/openclaw.json

# 4. 验证配置
openclaw config validate

# 5. 重启 Gateway
openclaw gateway restart
```

**方案二：使用 openclaw config set**

```bash
# 需要用 --batch-file 或其他方式，暂时不如 jq 方便
```

**方案三：使用官方 CLI**

```bash
openclaw agents add <agent_id> --workspace ~/.openclaw/workspaces/<agent_id>
openclaw agents bind <agent_id> --bind telegram:<group_id>
```

**方案四：手动编辑**

直接编辑 `~/.openclaw/openclaw.json`，确保包含完整的配置结构。

---

### ⚠️ 关键教训

- `config.apply` / `config.patch` 需要完整的 raw 配置，否则会覆盖其他配置
- 优先使用 **jq 修改** 或 **手动编辑**
- 修改后务必先 `validate` 再 `restart`

---

现在配置已修复，你可以测试一下群里是否正常工作了！
