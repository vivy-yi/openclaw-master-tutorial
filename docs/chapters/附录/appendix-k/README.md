# 附录K: 额外配置体系

> OpenClaw 标准配置之外的完整配置体系指南

---

## 定位说明

| 对比维度 | 附录J 内置配置 | 附录K 额外配置 |
|----------|----------------------|----------------------|
| **配置位置** | `~/.openclaw/openclaw.json` | `~/.openclaw/workspace/*.md` |
| **配置格式** | JSON | Markdown |
| **管理方式** | `openclaw config` CLI | 文件编辑 |
| **更新频率** | 低（基础配置） | 高（持续进化） |
| **主要作用** | 功能开关、API配置 | 行为准则、知识管理 |
| **版本相关** | ✅ 有版本兼容性 | ❌ 与版本无关 |
| **目标读者** | 需要配置功能的用户 | 深度定制 Agent 的用户 |

**本指南解决的问题**：
- 标准 `openclaw.json` 配置只控制功能开关，无法定义 Agent 的**行为准则**、**知识管理**、**协作协议**
- 这些"额外配置"才是让 OpenClaw 真正服务于复杂场景的关键

**核心价值主张**：
> 内置配置让 OpenClaw **能运行**，额外配置让 OpenClaw **更好地服务**。

---

## 内容导航

| 章节 | 主题 | 核心价值 |
|------|------|----------|
| [1. Workspace 文件系统](./openclaw-extra-configuration-guide.md#1-workspace-文件系统) | SOUL/USER/MEMORY/HEARTBEAT等文件 | 定义Agent人格和行为 |
| [2. 共享知识库](./openclaw-extra-configuration-guide.md#2-共享知识库) | consensus/knowledge/context等目录 | 跨Agent知识共享 |
| [3. 自我改进系统](./openclaw-extra-configuration-guide.md#3-自我改进系统) | corrections/heartbeat-rules/pattern提升 | 持续学习和进化 |
| [4. 多Agent架构](./openclaw-extra-configuration-guide.md#4-多-agent-架构) | 11个Agent协作/群组绑定/subagent白名单 | 多Agent协同 |
| [5. Harness系统](./openclaw-extra-configuration-guide.md#5-harness-系统) | cron_harness/subagent_harness/五层架构 | 任务自动化管理 |
| [6. Projects和Domains](./openclaw-extra-configuration-guide.md#6-projects-和-domains) | 领域归档/ontology/清理策略 | 知识管理 |
| [7. 实际使用规范](./openclaw-extra-configuration-guide.md#7-实际使用规范) | 每日日志/配置管理/Exec安全 | 生产级实践 |
| [8. 设计原则](./openclaw-extra-configuration-guide.md#8-设计原则与最佳实践) | Agent-centric/原生API/搜索优先级 | 核心设计理念 |

---

## 快速入门

### 谁应该阅读本指南？

✅ **适合阅读**：
- 需要深度定制 Agent 行为的用户
- 构建多 Agent 系统的开发者
- 希望 Agent 能持续学习和进化的用户
- 需要跨 Agent 共享知识的团队

❌ **暂不需要**：
- 刚刚安装 OpenClaw，还未完成基础配置
- 只需要简单的聊天功能

### 从哪里开始？

建议按顺序阅读以下章节：
1. **[1. Workspace 文件系统](./openclaw-extra-configuration-guide.md#1-workspace-文件系统)** - 理解 Workspace 结构
2. **[3. 自我改进系统](./openclaw-extra-configuration-guide.md#3-自我改进系统)** - 让 Agent 学习用户偏好
3. **[8. 设计原则](./openclaw-extra-configuration-guide.md#8-设计原则与最佳实践)** - 理解核心设计理念

---

## 与附录J的互补关系

```
openclaw.json (内置配置 - 附录J)
    │
    ├── agents.defaults.workspace → 指定 Workspace 路径
    │
    └── Workspace 内（额外配置 - 附录K）
        ├── SOUL.md          ← 定义 Agent 人格（无内置对应）
        ├── USER.md          ← 记录用户偏好（无内置对应）
        ├── AGENTS.md        ← 工作区规范（无内置对应）
        ├── MEMORY.md        ← 长期记忆（部分对应 memorySearch）
        └── HEARTBEAT.md     ← 心跳任务（部分对应 cron）
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [附录J: 完整配置参考](./appendix-j/) | OpenClaw 标准 JSON 配置 |
| [07 六层架构](../07_Agent协作/07.1_six_layer_framework.md) | Agent协作框架 |
| [06 上下文与记忆](../06_上下文与记忆/) | 记忆系统详解 |

---

*最后更新：2026-04-24*