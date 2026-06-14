# awesome-openclaw-examples 精选案例库

> 来源: [OthmaneBlial/awesome-openclaw-examples](https://github.com/OthmaneBlial/awesome-openclaw-examples)  
> 评分: ⭐⭐⭐⭐⭐ (必收录)  
> 分类: 案例 (Case)  
> 目标章节: `案例集/`  
> 更新: 2026-05-28

---

## 一、案例库概览

awesome-openclaw-examples 是社区维护的 OpenClaw 实践案例库，每个案例均包含：
- **Setup**: 完整的配置文件
- **KPI**: 关键性能指标
- **Sample Output**: 实际输出示例
- **Rollback**: 回滚方案

**总案例数**: 101+ 个可运行案例

---

## 二、精选案例列表

### 2.1 Engineering (工程) 团队

#### 案例 01: PR Radar (PR 状态追踪)

| 字段 | 内容 |
|------|------|
| **功能** | 追踪 GitHub PR 状态变化 |
| **团队** | Engineering |
| **触发** | Cron 定时 / Webhook |
| **KPI** | PR 响应时间 |
| **核心组件** | GitHub API, Cron |

**配置示例**:

```yaml
# openclaw.yaml
agents:
  pr-radar:
    model: claude-sonnet
    skills:
      - github
    cron:
      schedule: "0 */2 * * *"  # 每2小时检查
      message: "检查待 review 的 PR 状态"
    delivery:
      channel: slack
      to: "#engineering"
```

#### 案例 07: CI Flake Doctor (持续集成问题诊断)

| 字段 | 内容 |
|------|------|
| **功能** | 诊断 flaky CI 测试 |
| **团队** | Engineering |
| **触发** | GitHub Webhook (push/pr) |
| **KPI** | CI 成功率 |
| **核心组件** | GitHub Actions, exec |

---

### 2.2 Support (支持) 团队

#### 案例 02: SLA Guardian (SLA 守护)

| 字段 | 内容 |
|------|------|
| **功能** | 监控工单响应时间，确保 SLA |
| **团队** | Support |
| **触发** | Cron 定时 |
| **KPI** | 首次响应时间 |
| **核心组件** | Zendesk/Jira API, Cron |

```yaml
agents:
  sla-guardian:
    model: gpt-4o
    cron:
      schedule: "0 9 * * *"  # 每天早上9点
      message: "检查未满足SLA的工单"
    delivery:
      channel: telegram
      to: "channel:support-alerts"
```

#### 案例 11: Inbox to Action (收件箱自动化)

| 字段 | 内容 |
|------|------|
| **功能** | 自动分类和处理收件箱邮件 |
| **团队** | Support |
| **触发** | 邮件 Webhook |
| **KPI** | 邮件处理效率 |
| **核心组件** | Gmail/Outlook API |

---

### 2.3 Marketing (市场) 团队

#### 案例 05: Content Idea Miner (内容创意挖掘)

| 字段 | 内容 |
|------|------|
| **功能** | 从社交媒体挖掘内容创意 |
| **团队** | Marketing |
| **触发** | Cron 定时 |
| **KPI** | 内容产出量 |
| **核心组件** | Twitter/X API, web-search |

```yaml
agents:
  content-miner:
    model: gpt-4o
    skills:
      - web-search
      - browser
    cron:
      schedule: "0 10 * * 1-5"  # 工作日上午
      message: "挖掘今日热门话题"
    delivery:
      channel: slack
      to: "#marketing-ideas"
```

#### 案例 66: SEO Drift Watcher (SEO 排名监控)

| 字段 | 内容 |
|------|------|
| **功能** | 监控关键词 SEO 排名变化 |
| **团队** | Marketing |
| **触发** | Cron 定时 |
| **KPI** | 排名变化率 |
| **核心组件** | Google Search Console API |

---

### 2.4 Finance (财务) 团队

#### 案例 78: Contract Redline Summary (合同红线摘要)

| 字段 | 内容 |
|------|------|
| **功能** | AI 自动标注合同风险条款 |
| **团队** | Finance |
| **触发** | 文件上传 / Email |
| **KPI** | 合同审核时间 |
| **核心组件** | PDF 解析, Claude |

```yaml
agents:
  contract-reviewer:
    model: claude-opus
    skills:
      - pdf
    triggers:
      - type: file_upload
        extensions: [".pdf", ".docx"]
    delivery:
      channel: email
```

---

### 2.5 Leadership (领导) 团队

#### 案例 96: Executive Weekly Wins Digest (每周高管摘要)

| 字段 | 内容 |
|------|------|
| **功能** | 汇总团队每周亮点 |
| **团队** | Leadership |
| **触发** | Cron (每周一) |
| **KPI** | 信息覆盖率 |
| **核心组件** | Notion, Slack |

```yaml
agents:
  weekly-digest:
    model: gpt-4o
    cron:
      schedule: "0 8 * * 1"  # 每周一早上8点
      message: "生成上周团队亮点摘要"
    delivery:
      channel: email
      to: "leadership@company.com"
```

---

## 三、案例库结构参考

每个案例的标准化结构：

```
{案例编号}-{案例名}/
├── setup/
│   ├── openclaw.yaml       # Agent 配置
│   ├── skills/            # 依赖的 Skills
│   └── prompts/
│       └── cron_prompt.txt # Cron 触发提示词
├── kpi/
│   └── metrics.json        # KPI 定义
├── sample-output.md        # 实际输出示例
├── rollback.md             # 回滚方案
└── README.md               # 案例说明
```

---

## 四、快速上手

### 4.1 克隆案例库

```bash
git clone https://github.com/OthmaneBlial/awesome-openclaw-examples.git
cd awesome-openclaw-examples
```

### 4.2 选择案例

```bash
# 列出所有案例
ls -la runnable/

# 查看案例详情
cat runnable/01-pr-radar/README.md
```

### 4.3 部署案例

```bash
# 复制配置到 OpenClaw
cp runnable/01-pr-radar/setup/* ~/.openclaw/

# 重启 Gateway
openclaw gateway restart
```

---

## 五、相关资源

| 资源 | 链接 |
|------|------|
| GitHub 仓库 | https://github.com/OthmaneBlial/awesome-openclaw-examples |
| 官方 Cookbook | https://github.com/openclaw/cookbook |
| OpenClaw 官方 | https://docs.openclaw.ai |

---

## 六、本地化说明

> 本案例库来自社区维护，部分案例可能需要根据实际情况调整配置。建议先在测试环境验证后再部署到生产环境。

---

🦉 **awesome-openclaw-examples 精选案例库** | 2026-05-28