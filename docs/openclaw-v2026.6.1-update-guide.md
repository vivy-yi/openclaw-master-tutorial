# OpenClaw v2026.6.1 完整更新指南

> **版本**: v2026.6.1  
> **更新日期**: 2026-06-07  
> **数据来源**: GitHub Release (v2026.6.1, 2026-06-03) + 墨客-深度调研报告-2026-06-06  
> **对比基准**: openclaw-v2026.5-update-guide.md (2026年5月版)  
> **官方文档**: https://docs.openclaw.ai

---

## 一、核心功能更新

### 1.1 MiniMax M3 模型支持 🆕

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

OpenClaw 新增对 MiniMax M3 模型的支持，提供更强大的 AI 推理能力。

| 模型 | 支持状态 | 说明 |
|------|---------|------|
| MiniMax M3 | 🆕 新增 | 最新一代 MiniMax 模型 |
| MiniMax M2 | ✅ 已支持 | 延续支持 |
| MiniMax M1 | ✅ 已支持 | 延续支持 |

**配置示例**:

```json
{
  "models": {
    "providers": {
      "minimax": {
        "apiKey": "your-minimax-api-key",
        "models": [
          {
            "name": "MiniMax-M3",
            "enabled": true
          }
        ]
      }
    }
  }
}
```

### 1.2 iMessage 监控 SQLite 迁移 🆕

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

iMessage 监控状态后端从旧存储迁移至 SQLite，带来更好的性能和可靠性。

| 指标 | 改进前 | 改进后 |
|------|--------|--------|
| 存储后端 | 旧存储 | SQLite |
| 查询性能 | 一般 | 显著提升 |
| 数据可靠性 | 一般 | 更高 |
| 迁移方式 | — | 自动迁移（首次启动） |

> ⚠️ **重要**: 升级前建议备份现有 iMessage 配置。SQLite 迁移将在首次启动时自动完成。

### 1.3 Agents/CLI 恢复机制增强 🆕

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

Agents 和 CLI 的中断恢复能力得到全面增强，显著提升长时间运行任务的可靠性。

| 恢复能力 | 说明 |
|---------|------|
| 中断工具调用恢复 | 工具调用中断后可从断点恢复 |
| 会话绑定 | 恢复后保持正确的会话上下文 |
| 压缩交接 | 会话压缩时无缝衔接 |
| 媒体投递重试 | 图片/视频/音频投递失败自动重试 |

**适用场景**:
- 长时间运行的自动化任务
- 网络不稳定环境
- 需要高可靠性的生产环境

### 1.4 Workboard 编排功能 🆕

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

Workboard 新增多代理规划编排能力，支持更复杂的工作流。

| 功能 | 说明 |
|------|------|
| SecretRef 集成 | 安全引用外部密钥 |
| GitHub Copilot 集成 | 与 Copilot 协同工作 |
| Tokenjuice 集成 | 优化 Token 使用 |
| 多代理规划编排 | 多智能体协同规划 |

**典型应用场景**:
```javascript
// 多代理协作示例
const plan = await workboard.createPlan({
  agents: ['planner', 'executor', 'reviewer'],
  secretRefs: {
    github: 'workflow://github-token',
    openai: 'workflow://openai-key'
  },
  orchestration: 'sequential' // sequential | parallel | hierarchical
});
```

### 1.5 Skills 运行时优化 🆕

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

Skills 加载和执行路径优化，减少重复工作和热路径延迟。

| 优化项 | 说明 |
|--------|------|
| 热路径重复工作消除 | 避免重复执行相同操作 |
| Stale disabled snapshots 处理 | 正确处理已禁用的旧快照 |
| 加载性能提升 | Skills 启动更快 |

### 1.6 memory-core 优化

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

| 优化项 | 说明 |
|--------|------|
| QMD 更新/embed 写入串行化 | 避免并发写入冲突 |
| Vector-disabled FTS indexes 优化 | 禁用向量时的全文索引优化 |

---

## 二、多渠道稳定性提升

**版本要求**: v2026.6.1+  
**来源**: GitHub Release v2026.6.1

v2026.6.1 对以下渠道进行了全面稳定性修复：

| 渠道 | 改进内容 |
|------|---------|
| Telegram | 消息投递稳定性提升 |
| WhatsApp | 会话管理优化 |
| iMessage | SQLite 后端迁移 |
| Slack | 长期运行稳定性 |
| Discord | 事件处理优化 |
| Teams | 连接稳定性 |
| Google Chat/Meet | 集成稳定性 |
| iOS Talk | 兼容性改进 |

---

## 三、升级指南

### 3.1 从 v2026.5.x 升级

**升级路径**:

```bash
# 1. 备份配置
openclaw config export > backup-$(date +%Y%m%d).json

# 2. 升级 OpenClaw
# Docker
docker pull openclaw/openclaw:latest

# npm
npm update -g openclaw

# 3. 验证升级
openclaw status
openclaw gateway probe
openclaw doctor
```

### 3.2 升级检查清单

| 检查项 | 说明 |
|--------|------|
| ✅ 备份配置 | 升级前导出配置 |
| ✅ 渠道连接测试 | 升级后验证所有渠道 |
| ✅ iMessage SQLite 迁移 | 首次启动自动完成 |
| ✅ Agents/CLI 恢复 | 测试中断恢复功能 |
| ✅ Workboard 功能 | 验证编排功能正常 |

---

## 四、版本推荐

### 4.1 版本推荐表

| 版本 | 状态 | 推荐场景 |
|------|------|---------|
| **v2026.6.1** | ✅ **Latest Stable** | **生产首选** |
| v2026.6.2-beta.1 | 🟡 最新Beta | 测试环境尝鲜 |
| v2026.5.28-beta.3 | 🟡 历史Beta | 特殊需求 |
| v2026.5.27 | ✅ 历史Stable | 保守升级 |

### 4.2 场景推荐

| 场景 | 推荐版本 |
|------|---------|
| **生产环境** | ✅ v2026.6.1 |
| **新功能尝鲜** | v2026.6.2-beta.1 |
| **保守升级** | v2026.5.27 |
| **iMessage 用户** | ✅ v2026.6.1+（SQLite 迁移） |
| **MiniMax M3 模型** | ✅ v2026.6.1+ |
| **多代理编排** | ✅ v2026.6.1+（Workboard） |

---

## 五、相关资源链接

| 资源 | 链接 |
|------|------|
| 官方文档 | https://docs.openclaw.ai |
| GitHub Release | https://github.com/openclaw/openclaw/releases/tag/v2026.6.1 |
| 官方讨论 | https://github.com/openclaw/openclaw/discussions |
| 问题反馈 | https://github.com/openclaw/openclaw/issues |
| Skills 文档 | https://docs.openclaw.ai/development/skills |
| Workboard 文档 | https://docs.openclaw.ai/advanced/workboard |
| 渠道文档 | https://docs.openclaw.ai/channels/overview |

---

## 六、相关更新记录

| 日期 | 版本 | 类型 | 更新内容 |
|------|------|------|---------|
| 2026-06-03 | v2026.6.1 | 正式版 | Agents/CLI 恢复、MiniMax M3、iMessage SQLite、Workboard |
| 2026-06-03 | v2026.6.2-beta.1 | Beta | Operator Install Policy（安全重构） |
| 2026-05-29 | v2026.5.28-beta.3 | Beta | Agent/Codex 运行时、媒体路由 |
| 2026-05-28 | v2026.5.27 | 正式版 | Zen/Go API Key 分离、npm 插件恢复 |

---

## 七、v2026.6.2-beta.1 预览

> 以下为 v2026.6.2-beta.1 预览内容，建议等待正式版后再升级生产环境。

### 7.1 Operator Install Policy（重要安全变更）

v2026.6.2-beta.1 引入了重大安全重构：

- **替代** `dangerous-code` scanner
- **新机制**: 白名单 + 插件签名验证
- **影响**: 插件安装需要显式授权
- **详细文档**: `docs/chapters/16_安全配置/16.11_operator_install_policy.md`

### 7.2 其他 Beta 改进

| 功能 | 说明 |
|------|------|
| 多渠道安全提升 | Telegram/WhatsApp 等渠道安全加固 |
| UI 流式文本可见性 | Chat/Control UI/Skill Workshop/Workboard 改善 |
| Corrupt shell snapshots 拒绝 | 拒绝损坏的 shell 快照 |
| 不安全 exec approval precheck | 执行前安全检查 |

---

*🦉 OpenClaw 教程大师 | 2026-06-07 墨客-内容生成审核 Cron*  
*质量等级: ⭐⭐⭐⭐⭐ (必收录级稳定版更新)*
