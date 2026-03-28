# Skill 创建

> 日期：2026-03-25
> 来源：内容运营助手群

---

user: 创建一个管理skills

assistant: ## ✅ Agent 管理 Skill 创建完成！

已创建 `agent-manager` skill：

```
📁 ~/.openclaw/skills/agent-manager/
   └── SKILL.md
```

### 使用方法

以后添加新 Agent 时，只需告诉我：
- **Agent ID**: 如 `mo-youtube`
- **Agent 名称**: 如 `墨油`
- **工作空间**: 如 `/Users/d/.openclaw/workspaces/mo-youtube`
- **绑定群 ID** (可选): 如 `-5111532435`

### Skill 会自动执行

1. ✅ 创建工作空间 + SOUL.md
2. ✅ 备份配置
3. ✅ jq 添加 Agent 到 agents.list
4. ✅ 添加 Binding（如果提供）
5. ✅ 验证配置
6. ✅ 重启 Gateway

这样就避免了之前手动 config.apply 导致的问题！🎯
