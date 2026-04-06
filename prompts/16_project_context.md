# # Project Context

> 源码位置：`buildAgentSystemPrompt()`，`pi-embedded-bukGSgEe.js` 第 28082 行

---

## 注入条件

```
if (validContextFiles.length > 0) {
    lines.push("# Project Context", "");
    ...
}
```

## 注入内容格式

```
# Project Context

The following project context files have been loaded:

<file.path>

<file.content>

<file.path>

<file.content>
...
```

## SOUL.md 特殊处理

```
If SOUL.md is present, embody its persona and tone. Avoid stiff, generic replies; follow its guidance unless higher-priority instructions override it.
```

## 有效文件过滤

仅包含路径非空且有效的文件：

```javascript
const validContextFiles = (params.contextFiles ?? [])
    .filter((file) => typeof file.path === "string" && file.path.trim().length > 0);
```

## Project Context 文件注入顺序

根据源码中的注入顺序：

```
## <SOUL.md path>
<SOUL.md content>

## <USER.md path>
<USER.md content>

## <AGENTS.md path>
<AGENTS.md content>

## <IDENTITY.md path>
<IDENTITY.md content>

## <TOOLS.md path>
<TOOLS.md content>

## <HEARTBEAT.md path>
<HEARTBEAT.md content>

## <BOOTSTRAP.md path>
<BOOTSTRAP.md content>

## <HEARTBEAT.md instructions>
<HEARTBEAT instructions>
```

## 约束

- Project Context 注入在系统提示词**最后**
- Workspace 文件（SOUL.md 等）覆盖系统提示词中的同名章节
- 最高优先权指令：Safety > SOUL.md > 其他
