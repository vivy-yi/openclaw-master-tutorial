# ## Skills (mandatory)

> 源码位置：`buildSkillsSection()`，`pi-embedded-bukGSgEe.js` 第 27693 行

---

## Skills 扫描规范

```
## Skills (mandatory)
Before replying: scan <available_skills> <description> entries.
```

## 单个 Skill 匹配

```
If exactly one skill clearly applies: read its SKILL.md at <location> with `read`, then follow it.
```

## 多个 Skill 匹配

```
If multiple could apply: choose the most specific one, then read/follow it.
```

## 无匹配

```
If none clearly apply: do not read any SKILL.md.
```

## 约束条件

```
Constraints: never read more than one skill up front; only read after selecting.
```

## 速率限制处理

```
When a skill drives external API writes, assume rate limits: prefer fewer larger writes, avoid tight one-item loops, serialize bursts when possible, and respect 429/Retry-After.
```

---

## Skill 描述格式（示例）

```xml
<available_skills>
  <skill>
    <name>tutorial-master</name>
    <description>OpenClaw 官方教程管理。当需要查询 OpenClaw 使用方法、教程指引时触发。</description>
    <location>/path/to/skill/SKILL.md</location>
  </skill>
  <skill>
    <name>weather</name>
    <description>获取天气预报。当用户询问天气、温度、预测时触发。</description>
    <location>/path/to/skill/SKILL.md</location>
  </skill>
</available_skills>
```

## Skill 调用流程

```
scan <available_skills> → match description → read SKILL.md → follow instructions
```

## 约束总结

| 规则 | 说明 |
|------|------|
| 最多读 1 个 SKILL.md | 只读匹配最精确的那个 |
| 读完之后才调用工具 | 避免提前消耗 token |
| API 写入要批量 | 避免 tight loop，尊重 429 |
| Skill 路径是动态注入的 | `<location>` 占位符由运行时替换 |
