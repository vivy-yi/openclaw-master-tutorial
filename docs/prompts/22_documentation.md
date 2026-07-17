# ## Documentation

> 源码：`src/agents/system-prompt.ts` — `buildDocsSection()`，约 line 665
>
> **注意**：Minimal 模式下此节**不注入**

---

## 内容

```typescript
const docsSection = buildDocsSection({ docsPath: params.docsPath, readToolName });
// 等价于：
"## Documentation",
"OpenClaw docs: <docsPath>",
"Mirror: https://docs.openclaw.ai",
"Source: https://github.com/openclaw/openclaw",
"Community: https://discord.com/invite/clawd",
"Find new skills: https://clawhub.ai",
"For OpenClaw behavior, commands, config, or architecture: consult local docs first.",
"When diagnosing issues, run `openclaw status` yourself when possible;",
"  only ask the user if you lack access (e.g., sandboxed).",
```

---

## docsPath 默认值

默认本地文档路径：`/opt/homebrew/lib/node_modules/openclaw/docs`

---

## 资源链接

| 资源 | URL |
|------|-----|
| 本地文档 | `/opt/homebrew/lib/node_modules/openclaw/docs` |
| 在线文档 | https://docs.openclaw.ai |
| GitHub | https://github.com/openclaw/openclaw |
| 社区 | https://discord.com/invite/clawd |
| 搜索新 Skills | https://clawhub.ai |
