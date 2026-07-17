# 教程采集日报 | 2026-06-05

**采集时间**: 2026-06-05 10:00 (Asia/Shanghai)
**任务ID**: cron:395536bd-24f4-49ba-9a3a-acac6799c7c1
**任务类型**: 墨客-全网搜索
**网络状态**: ⚠️ Web搜索超时，使用GitHub同步数据

---

## 一、执行概况

| 项目 | 数值 |
|------|------|
| Web搜索 | ⚠️ 超时不可用 |
| GitHub同步 | ✅ 正常 |
| 高质量内容 | 10+ 条 |
| 新增Commit | 待推送 |

---

## 二、最新官方Release (2026-06-03)

### 2.1 v2026.6.2-beta.1 (Pre-release) ⭐⭐⭐⭐⭐

**发布时间**: 2026-06-03 23:46 UTC
**质量评级**: ⭐⭐⭐⭐⭐ (安全重大更新)

**核心更新**:
1. **Operator Install Policy** - 替代dangerous-code scanner，插件安装更安全
2. **渠道安全提升** - Telegram重复transcript镜像、admin writeback权限检查
3. **流式文本可见性** - Chat/Control UI/Skill Workshop/Workboard改善
4. **Android companion shell** - 体验优化
5. **配置恢复强化** - 拒绝corrupt shell snapshots、不安全exec approval precheck

**重要修复**:
- Channel sends在transcript镜像失败时保持durability
- Telegram admin writeback需要admin权限
- Session write-lock release failures恢复
- Gemini stop sequences转发
- Kimi cache markers剥离

**发布验证**:
- npm: https://www.npmjs.com/package/openclaw/v/2026.6.2-beta.1

### 2.2 v2026.6.1 (Stable) ⭐⭐⭐⭐⭐

**发布时间**: 2026-06-03 19:35 UTC
**质量评级**: ⭐⭐⭐⭐⭐ (当前稳定版)

**核心更新**:
1. **Agents/CLI恢复机制** - 中断工具调用、会话绑定、压缩交接、媒体投递重试
2. **多渠道稳定性** - Telegram, WhatsApp, iMessage, Slack, Discord, Teams, Google Chat/Meet, iOS realtime Talk
3. **Provider/plugin请求** - 更多timer/retry上限
4. **Skills/插件加载** - 清晰处理disabled snapshots和loader failures
5. **Workboard编排** - SecretRef/GitHub Copilot/Tokenjuice集成
6. **Skill Workshop** - Control UI完整流程
7. **MiniMax M3模型支持**
8. **iMessage监控** - 迁移至SQLite后端

**重要修复**:
- memory-core QMD更新/embed写入串行化，减少Linux watcher fan-out
- Vector-disabled FTS indexes不再请求embedding provider
- Google/Vertex catalog修复，Copilot Claude 1M capabilities保留

**发布验证**:
- npm: https://www.npmjs.com/package/openclaw/v/2026.6.1
- 完整性: sha512-rGSWhIo8N37cQQ5puG8vmWZESE8q/
- Windows x64: OpenClawCompanion-Setup-x64.exe
- Windows arm64: OpenClawCompanion-Setup-arm64.exe

---

## 三、P1 Bug追踪 (过去24小时)

### 3.1 Issue汇总

| # | 标题 | 状态 | 优先级 | 问题类型 |
|---|------|------|--------|----------|
| 90462 | LM Studio fallback pinning trap | OPEN | P1 | 模型回退死锁 |
| 90455 | Matrix E2EE heap grows unbounded → OOM | OPEN | P1 | 内存泄漏 |
| 90456 | OpenAI OAuth Realtime Talk HTTP 500 | OPEN | P1 | OAuth认证失败 |
| 90454 | memory-core verbose sub-agent responses discarded | OPEN | P2 | 数据丢失 |
| 90466 | memory-core dreaming session-corpus污染 | OPEN | P2 | 会话数据损坏 |

### 3.2 重要PRs

| # | 标题 | 状态 | 评级 |
|---|------|------|------|
| 90459 | Gateway diagnostic troubleshooting guide | **CLOSED** | ⭐⭐⭐⭐ |
| 90450 | Preserve streamed assistant text when CLI result empty | OPEN | ⭐⭐⭐⭐ |
| 90453 | Guard searches during safe reindex | OPEN | ⭐⭐⭐⭐ |
| 90458 | Stop repeat talk provider normalization | OPEN | ⭐⭐⭐ |

---

## 四、必收录内容清单

### 4.1 ⭐⭐⭐⭐⭐ 立即收录

| 内容 | 路径建议 | 说明 |
|------|----------|------|
| v2026.6.1 Release Notes | `01_认识openclaw/版本更新日志.md` | 当前稳定版 |
| v2026.6.2-beta.1 安全更新 | `09_安全与权限/operator-install-policy.md` | 新增 |
| Operator Install Policy | `09_安全与权限/` | 替代dangerous-code scanner |
| Gateway诊断指南 | `18_进阶专题/故障排除.md` | PR已合并 |

### 4.2 ⭐⭐⭐⭐ 待收录

| 内容 | 说明 |
|------|------|
| P1 Bug解决方案汇总 | LM Studio/Matrix/OAuth问题 |
| memory-core最佳实践 | 避免dreaming和session-corpus污染 |

---

## 五、待处理事项

### 5.1 立即行动

| 行动 | 内容 | 优先级 |
|------|------|--------|
| 🟢 提交变更 | 今日采集报告 | P1 |
| 🟢 创建Operator Install Policy文档 | 新安全功能说明 | P1 |
| 🟢 更新版本日志 | v2026.6.1/v2026.6.2-beta.1 | P1 |

### 5.2 计划行动

| 行动 | 内容 | 优先级 |
|------|------|--------|
| 📝 P1 Bug教程 | LM Studio回退陷阱解决方案 | P1 |
| 📝 memory-core维护指南 | 避免dreaming和污染 | P1 |
| 📝 Gateway诊断指南整合 | 官方文档已合并 | P2 |

---

## 六、版本追踪

| Tag | 类型 | 发布日期 | 状态 |
|-----|------|----------|------|
| **v2026.6.2-beta.1** | Beta | 2026-06-03 | 测试版 |
| **v2026.6.1** | Stable | 2026-06-03 | 当前稳定版 |
| v2026.5.28 | Stable | 2026-05-30 | 上期稳定版 |

---

## 七、网络状态说明

**Web搜索持续超时**，已使用GitHub同步作为替代数据源

**可能原因**:
1. 外部搜索API暂时不可用
2. 网络连接问题
3. 搜索API限流

**建议**: 人工排查网络连接

---

🦉 **墨客-全网搜索** | 2026-06-05 10:00 CST
