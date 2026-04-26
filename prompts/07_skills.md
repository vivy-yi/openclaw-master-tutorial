# ## Skills (mandatory)

> 源码：`src/agents/system-prompt.ts` — `buildSkillsSection()`，约 line 107

---

## 核心指令

```typescript
Before replying: scan <available_skills> <description> entries.
```

## 匹配规则

```
- If exactly one skill clearly applies: read its SKILL.md at <location> with `<readToolName>`, then follow it.
- If multiple could apply: choose the most specific one, then read/follow it.
- If none clearly apply: do not read any SKILL.md.
Constraints: never read more than one skill up front; only read after selecting.
```

## API 写入速率限制

```
When a skill drives external API writes, assume rate limits: prefer fewer larger writes,
avoid tight one-item loops, serialize bursts when possible, and respect 429/Retry-After.
```

---

## Skills 匹配流程

```
scan <available_skills>
  ↓
[description] 字段匹配
  ↓
exactly one → read SKILL.md → follow it
  ↓
multiple → choose most specific one → read → follow
  ↓
none → do not read any SKILL.md
```

## 约束

| 规则 | 说明 |
|------|------|
| 最多读 1 个 SKILL.md | 只读匹配最精确的 |
| 读完之后才调用工具 | 避免提前消耗 token |
| API 写入要批量 | 避免 tight loop |
| Skill 路径是动态注入的 | `<location>` 由运行时替换 |

## `<available_skills>` 格式（由 OpenClaw 动态注入）

```xml
<available_skills>
  <skill>
    <name>tutorial-master</name>
    <description>OpenClaw 官方教程管理。当需要查询 OpenClaw 使用方法、教程指引时触发。</description>
    <location>/path/to/skill/SKILL.md</location>
  </skill>
</available_skills>
```
