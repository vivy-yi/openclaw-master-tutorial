# Continuous Auto QA Skill

> **技能版本**: v2026.7.2+  
> **技能类型**: 自动化测试与质量保障  
> **PR**: [#113727](https://github.com/openclaw/openclaw/pull/113727)  
> **作者**: Vincent Koc, Peter Steinberger  
> **发布日期**: 2026-07-25

---

## 一、技能概述

Continuous Auto QA Skill 是 OpenClaw 官方推出的自动化质量保障技能，通过协调**实时根因测试活动**（Live Root-Cause Testing Campaigns）来确保系统的持续稳定性。

### 1.1 核心能力

| 能力 | 说明 |
|------|------|
| 根因修复验证 | 要求 Auto QA 活动中包含根因修复 |
| 实时测试协调 | 协调 `current-main` 分支的根因测试活动 |
| 渠道证据记录 | 从实际驱动记录实时渠道证据 |
| 场景统计 | 记录跳过的场景并计入套件摘要 |

---

## 二、工作原理

### 2.1 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                    Auto QA Campaign                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │ Root-Cause │ → │   Fix       │ → │ Validation  │       │
│  │ Detection  │   │  Applied    │   │  Report     │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
│         ↓                ↓                ↓                 │
│  ┌─────────────────────────────────────────────────┐       │
│  │         Live Channel Evidence Collection         │       │
│  │         (from actual driver)                     │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 关键约束

| 约束类型 | 说明 |
|----------|------|
| 强制根因修复 | 每个 Auto QA 活动必须包含根因修复（不允许仅报告问题） |
| 实时证据 | 必须从实际驱动收集渠道证据（非模拟数据） |
| 场景统计 | 跳过的场景必须计入套件摘要 |

---

## 三、配置选项

### 3.1 基础配置

```yaml
# openclaw.yaml
skills:
  auto-qa:
    enabled: true
    
    # 频道配置
    channels:
      - telegram
      - discord
      - feishu
      
    # 根因修复要求
    require-root-cause-fix: true
    
    # 证据收集
    evidence:
      collect-from-driver: true
      screenshot-on-failure: true
      log-level: verbose
```

### 3.2 高级配置

```yaml
# openclaw.yaml
skills:
  auto-qa:
    # 测试活动协调
    campaigns:
      current-main:
        enabled: true
        root-cause-first: true
        
      feature-branch:
        enabled: true
        auto-merge-on-pass: false
        
    # 报告配置
    reporting:
      include-skipped: true
      channel-evidence: true
      
    # 超时配置
    timeouts:
      campaign-run: 3600      # 1小时
      evidence-collection: 300 # 5分钟
```

---

## 四、使用方法

### 4.1 启动 QA 活动

```bash
# 启动完整 QA 活动
openclaw qa campaign run --name "current-main-root-cause"

/# 启动特定渠道测试
openclaw qa campaign run --name "telegram-regression" --channel telegram

# 查看运行状态
openclaw qa campaign status
```

### 4.2 查看测试结果

```bash
# 查看最新报告
openclaw qa report latest

# 查看特定活动报告
openclaw qa report show --campaign-id <id>

# 导出报告
openclaw qa report export --format markdown --output qa-report.md
```

### 4.3 在 Skill 中调用

```typescript
import { AutoQASkill } from '@openclaw/sdk';

// 初始化 Auto QA Skill
const autoQA = new AutoQASkill({
  requireRootCauseFix: true,
  collectChannelEvidence: true,
});

// 记录测试发现
await autoQA.recordFinding({
  severity: 'high',
  description: 'Message delivery delay on Telegram channel',
  evidence: {
    channel: 'telegram',
    timestamp: new Date(),
    logs: errorLogs,
  },
  rootCause: 'Rate limiter configuration issue',
  fix: {
    description: 'Adjust rate limiter thresholds',
    pr: '#113729',
  },
});
```

---

## 五、根因修复工作流

### 5.1 正确的 QA 活动结构

```
✅ 正确的 QA 活动结构:
├── 问题描述
├── 复现步骤
├── 根因分析
├── 修复方案 ← 必须包含
└── 验证结果

❌ 错误的 QA 活动结构:
├── 问题描述
├── 复现步骤
└── (缺少根因和修复)
```

### 5.2 根因分析模板

```markdown
## 根因分析报告

### 问题概述
[清晰描述观察到的问题]

### 根因
[分析导致问题的根本原因]

### 影响范围
[哪些渠道/功能受影响]

### 修复方案
[具体说明如何修复]

### 验证计划
[如何确认修复有效]
```

---

## 六、渠道证据收集

### 6.1 支持的渠道

| 渠道 | 证据类型 | 支持状态 |
|------|----------|----------|
| Telegram | 消息日志、延迟指标 | ✅ 完整 |
| Discord | 消息日志、Webhook 响应 | ✅ 完整 |
| Feishu | 消息日志、API 响应 | ✅ 完整 |
| Slack | 消息日志、事件流 | ✅ 完整 |
| WhatsApp | 消息日志 | 🔄 开发中 |
| Matrix | 消息日志、加密状态 | 🔄 开发中 |

### 6.2 证据收集示例

```typescript
// 收集 Telegram 渠道证据
const evidence = await autoQA.collectChannelEvidence({
  channel: 'telegram',
  timeRange: {
    start: new Date('2026-07-25T10:00:00Z'),
    end: new Date('2026-07-25T11:00:00Z'),
  },
  includeMessages: true,
  includeMetrics: true,
  includeLogs: true,
});

console.log('Collected evidence:', {
  messageCount: evidence.messages.length,
  avgLatency: evidence.metrics.avgLatency,
  errorCount: evidence.errors.length,
});
```

---

## 七、套件统计

### 7.1 统计指标

| 指标 | 说明 |
|------|------|
| 总场景数 | 测试套件中的场景总数 |
| 通过数 | 成功通过的场景数 |
| 失败数 | 失败的场景数 |
| 跳过数 | 跳过的场景数（**计入摘要**） |
| 通过率 | 通过数 / 总场景数 |

### 7.2 查看统计

```bash
# 查看完整统计
openclaw qa stats --campaign-id <id>

# 查看渠道统计
openclaw qa stats --channel telegram

# 查看趋势分析
openclaw qa stats --trend --days 30
```

### 7.3 输出示例

```
QA Campaign Statistics
=====================
Campaign ID: camp_abc123
Run Date: 2026-07-25 14:30:00 UTC
Branch: main

Total Scenarios:    150
├── Passed:         145 (96.7%)
├── Failed:           3 (2.0%)
└── Skipped:         2 (1.3%)

Channel Coverage:
├── Telegram:  ✅ 50/50 passed
├── Discord:  ✅ 48/50 passed
└── Feishu:   ⚠️  2/50 failed

Root Cause Fixes: 3/3 (100%)
Evidence Collected: 52 MB
```

---

## 八、集成 CI/CD

### 8.1 GitHub Actions 集成

```yaml
# .github/workflows/auto-qa.yml
name: Auto QA Campaign

on:
  push:
    branches: [main, 'feature/**']
  schedule:
    - cron: '0 2 * * *'  # 每日 02:00 UTC

jobs:
  auto-qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run OpenClaw
        uses: openclaw/action-run@latest
        with:
          command: openclaw start
        
      - name: Execute QA Campaign
        run: |
          openclaw qa campaign run \
            --name "ci-${{ github.sha }}" \
            --output results/
            
      - name: Upload Evidence
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: qa-evidence
          path: results/
          
      - name: Notify on Failure
        if: failure()
        uses: openclaw/notify-action@v1
        with:
          channel: telegram
          message: "QA Campaign failed: ${{ job.status }}"
```

### 8.2 质量门禁

```yaml
# openclaw.yaml - Quality Gates
quality-gates:
  auto-qa:
    enabled: true
    
    # 通过率门禁
    pass-rate:
      minimum: 95%
      
    # 根因修复门禁
    root-cause-fix:
      required: true
      rate: 100%
      
    # 严重级别门禁
    severity-thresholds:
      critical: 0   # 不允许 Critical 问题
      high: 2        # 最多 2 个 High 问题
      medium: 10     # 最多 10 个 Medium 问题
      
    # 阻止合并条件
    block-merge-on-fail: true
```

---

## 九、最佳实践

### 9.1 QA 活动设计

| 实践 | 说明 |
|------|------|
| 每个活动一个根因 | 避免在一个活动中混合多个问题 |
| 提供可复现步骤 | 确保其他人可以复现问题 |
| 包含实际证据 | 使用真实的渠道日志和截图 |
| 明确修复方案 | 不仅描述问题，还要说明如何修复 |

### 9.2 证据收集

| 实践 | 说明 |
|------|------|
| 及时收集 | 问题发生后尽快收集证据 |
| 保留原始日志 | 不要修改原始日志内容 |
| 标注时间戳 | 确保所有证据有时间信息 |
| 敏感信息脱敏 | 移除 API keys、tokens 等敏感信息 |

### 9.3 持续改进

```markdown
## QA 改进建议

1. **覆盖率提升**: 每季度审查测试覆盖率
2. **场景优化**: 根据故障率调整场景优先级
3. **工具升级**: 关注 Auto QA Skill 更新
4. **团队培训**: 确保团队了解根因分析方法
```

---

## 十、故障排除

### 10.1 常见问题

| 问题 | 解决方案 |
|------|----------|
| 渠道证据收集失败 | 检查渠道配置和网络连接 |
| 根因修复被拒绝 | 确保修复方案完整且可验证 |
| 统计不准确 | 检查场景标记和跳过原因 |

### 10.2 调试命令

```bash
# 启用详细日志
openclaw qa campaign run --verbose --name <name>

# 检查渠道连接
openclaw qa diagnose --channel telegram

# 重置统计数据
openclaw qa reset --campaign-id <id>
```

---

## 十一、相关文档

| 文档 | 说明 |
|------|------|
| [Skills 指南](../15_Skills/openclaw-skills-guide.md) | OpenClaw Skills 概述 |
| [Supervisor 模式](../architect-guide/operation/supervisor-mode.md) | 自动化运行模式 |
| [故障排除](../故障排除/runtime-issues.md) | 常见问题解决 |

---

## 十二、变更日志

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-07-25 | v2026.7.2 | 初始发布：Continuous Auto QA Skill |

---

*本文档由墨客-内容生成审核 Cron 自动生成*  
*数据来源: PR #113727, PR #113710, OpenClaw 官方仓库*
