# 项目二：早间简报助手 - 完整实施指南

本指南将帮助你构建一个每天自动生成个性化早间简报的 AI 助手。

---

## 2.1 项目概述

### 什么是早间简报助手

早间简报助手是一个自动化系统，每天定时收集各类信息并生成个性化的早间简报。

### 功能特性

```
★ Insight ─────────────────────────────────────
早间简报的价值：
1. 信息聚合 - 告别信息碎片化
2. 节省时间 - 5分钟了解全天动态
3. 个性化 - 只看与你相关的内容
4. 主动推送 - 不需要手动搜索
─────────────────────────────────────────────────
```

### 支持的数据源

| 类型 | 示例 | 状态 |
|------|------|------|
| 📰 RSS 订阅 | HackerNews、36Kr、TechCrunch | ✅ |
| 📅 日历 | Google Calendar、Apple Calendar | ✅ |
| 🌤️ 天气 | 位置天气、空气质量 | ✅ |
| 📧 邮件 | Gmail、Outlook 待处理邮件 | ✅ |
| 📊 待办 | Todoist、Notion、Taskade | ✅ |
| 📈 股票 | 关注的股票/加密货币 | ✅ |
| 🔔 通知 | Slack、Discord 未读消息 | ✅ |

---

## 2.2 准备工作

### 安装必要工具

```bash
# 安装 RSS 工具
openclaw tools install rss

# 安装日历工具
openclaw tools install calendar

# 安装天气工具
openclaw tools install weather

# 安装邮件工具 (可选)
openclaw tools install email

# 安装 Todoist 工具 (可选)
openclaw tools install todoist

# 验证安装
openclaw tools list | grep -E "rss|calendar|weather|email|todoist"
```

### API 配置

#### Google Calendar

```bash
# 设置环境变量
export GOOGLE_CLIENT_ID="your-client-id"
export GOOGLE_CLIENT_SECRET="your-client-secret"
```

#### RSS 源配置

```yaml
# ~/openclaw-brief/config/rss.yaml
rss_sources:
  - name: HackerNews
    url: https://news.ycombinator.com/rss
    category: tech

  - name: 36Kr
    url: https://36kr.com/feed/
    category: tech_zh

  - name: 极客时间
    url: https://time.geekbang.org/feed/0/cid/88
    category: tech_zh
```

---

## 2.3 项目结构

### 创建目录

```bash
mkdir -p ~/openclaw-brief/{config,skills,outputs,logs}
```

### 完整目录结构

```
openclaw-brief/
├── config/
│   ├── rss.yaml           # RSS 源配置
│   ├── calendar.yaml      # 日历配置
│   ├── weather.yaml       # 天气配置
│   ├── sources.yaml       # 所有数据源
│   └── template.md        # 简报模板
├── skills/
│   ├── morning-brief.yaml # 主技能
│   └── news-summary.yaml  # 新闻摘要
├── outputs/                # 简报输出
├── logs/                  # 运行日志
└── brief.yaml            # 主配置
```

---

## 2.4 配置文件

### 主配置文件

```yaml
# ~/openclaw-brief/brief.yaml
name: morning-brief
version: "1.0"

# 简报发送时间
schedule:
  timezone: Asia/Shanghai
  time: "07:00"
  days: [1, 2, 3, 4, 5]  # 工作日

# 数据源
sources:
  rss:
    enabled: true
    config_file: ~/openclaw-brief/config/rss.yaml
    limit: 10

  calendar:
    enabled: true
    provider: google
    days_ahead: 1

  weather:
    enabled: true
    location: beijing
    units: metric

  todoist:
    enabled: true
    filter: today | overdue

# 输出配置
output:
  format: markdown
  save_to_file: true
  output_dir: ~/openclaw-brief/outputs

# 发送渠道
channels:
  - type: telegram
    enabled: true
    chat_id: "${TELEGRAM_CHAT_ID}"

  - type: email
    enabled: false
    to: "${EMAIL_TO}"
    subject: "🌅 早间简报 - {date}"
```

### 简报模板

```markdown
# ~/openclaw-brief/config/template.md

# 🌅 早间简报 - {{date}}

> 生成时间: {{generated_at}}

---

## 📰 今日资讯

{{#each news}}
### {{title}}
- 来源: {{source}}
- 相关度: {{relevance}}%
- 链接: {{url}}

{{/each}}

---

## 📅 今日日程

{{#each calendar}}
### {{time}} - {{title}}
{{#if location}}
📍 {{location}}
{{/if}}
{{#if attendees}}
👥 {{attendees}}
{{/if}}

{{/each}}

---

## ✅ 待办事项

{{#each todos}}
- [ ] {{title}} {{#if due}}({{due}}){{/if}}

{{/each}}

---

## 💡 AI 建议

{{ai_suggestions}}

---

## 🌤️ 天气

{{weather}}

---

{{#if additional}}
## 📌 额外提醒

{{additional}}
{{/if}}

---

*简报由 OpenClaw 自动生成*
```

---

## 2.5 RSS 配置详解

### 基础 RSS 配置

```yaml
# config/rss.yaml
sources:
  # 科技新闻
  - name: HackerNews
    url: https://news.ycombinator.com/rss
    enabled: true
    filter:
      keywords: [AI, GPT, Claude, LLM]
      min_score: 10

  - name: 36Kr
    url: https://36kr.com/feed/
    enabled: true
    filter:
      keywords: [AI, 大模型, LLM]
      min_score: 5

  # 开发者
  - name: DevTo
    url: https://dev.to/feed
    enabled: true
    filter:
      tags: [programming, ai, tutorial]

  # 设计师
  - name: Smashing Magazine
    url: https://www.smashingmagazine.com/feed/
    enabled: true

# 处理选项
processing:
  max_items: 15
  summary_length: 100
  include_images: false
```

### 自定义 RSS 源

```bash
# 添加自定义源
openclaw rss add "我的科技" https://example.com/feed.xml

# 查看源列表
openclaw rss list

# 删除源
openclaw rss remove "我的科技"
```

---

## 2.6 日历配置

### Google Calendar

```yaml
# config/calendar.yaml
google:
  enabled: true
  credentials_file: ~/.config/google/credentials.json

  calendars:
    - id: primary
      name: 主日历
      color: blue

    - id: work
      name: 工作日历
      color: red

    - id: personal
      name: 个人日历
      color: green

  # 过滤选项
  filters:
    max_events: 10
    min_duration: 30
    show_description: true

  # 获取范围
  time_range:
    start: "00:00"
    end: "23:59"
```

### Apple Calendar (CalDAV)

```yaml
# config/calendar.yaml
apple:
  enabled: true

  server: https://caldav.icloud.com
  username: "${APPLE_ID}"
  password: "${APPLE_APP_PASSWORD}"

  calendars:
    - name: 工作
      color: blue
    - name: 个人
      color: green
```

---

## 2.7 天气配置

```yaml
# config/weather.yaml
providers:
  # OpenWeatherMap (免费)
  openweather:
    enabled: true
    api_key: "${OPENWEATHER_API_KEY}"

    locations:
      - name: beijing
        city: Beijing
        country: CN

      - name: shanghai
        city: Shanghai
        country: CN

  # WeatherAPI
  weatherapi:
    enabled: false
    api_key: "${WEATHERAPI_KEY}"

# 显示选项
display:
  show_forecast: true
  forecast_days: 3
  units: metric
  include_uv: true
  include_aqi: true
```

---

## 2.8 Skill 配置

### 创建 Morning Brief Skill

```yaml
# skills/morning-brief.yaml
name: morning-brief
description: 生成每日早间简报

trigger:
  type: cron
  expression: "0 7 * * 1-5"

variables:
  date: "{{now | format 'YYYY-MM-DD'}}"
  location: beijing

steps:
  # Step 1: 获取新闻
  - name: fetch_news
    tool: rss_fetch
    config:
      sources_file: ~/openclaw-brief/config/rss.yaml
      max_items: 10
    output: news

  # Step 2: 获取日历
  - name: fetch_calendar
    tool: calendar_today
    config:
      calendars: [primary, work]
    output: calendar

  # Step 3: 获取天气
  - name: fetch_weather
    tool: weather_current
    config:
      location: "{{location}}"
    output: weather

  # Step 4: 获取待办
  - name: fetch_todos
    tool: todoist_tasks
    config:
      filter: today | overdue
    output: todos

  # Step 5: AI 汇总
  - name: generate_brief
    tool: llm_generate
    model: claude-sonnet-4-20250514
    input:
      template_file: ~/openclaw-brief/config/template.md
      data:
        news: "{{news}}"
        calendar: "{{calendar}}"
        weather: "{{weather}}"
        todos: "{{todos}}"
        date: "{{date}}"
        generated_at: "{{now | format 'HH:mm'}}"
    output: brief

  # Step 6: 保存到文件
  - name: save_brief
    tool: file_write
    config:
      path: ~/openclaw-brief/outputs/brief-{{date}}.md
      content: "{{brief}}"

  # Step 7: 发送简报
  - name: send_telegram
    tool: telegram_send
    config:
      chat_id: "${TELEGRAM_CHAT_ID}"
      text: "{{brief}}"
      parse_mode: Markdown
```

### 安装 Skill

```bash
# 保存 Skill
openclaw skills save ~/openclaw-brief/skills/morning-brief.yaml

# 启用 Skill
openclaw skills enable morning-brief

# 手动触发测试
openclaw skills run morning-brief --dry-run
```

---

## 2.9 高级功能

### 智能筛选

```yaml
# 基于关键词的智能筛选
intelligence:
  # 用户兴趣关键词
  interests:
    - AI
    - LLM
    - Claude
    - GPT
    - 产品经理
    - 用户增长

  # 排除关键词
  exclude:
    - crypto
    - nft
    - 加密货币

  # 相关度计算
  relevance:
    title_weight: 0.6
    content_weight: 0.4
    min_score: 50
```

### 个性化建议

```yaml
# AI 建议生成
suggestions:
  # 基于日程
  calendar_based:
    - if:
        has_meeting: true
        meeting_duration: ">2h"
      then: "今天会议较多，建议预留时间处理紧急任务"

  # 基于天气
  weather_based:
    - if:
        weather: "rain"
      then: "天气阴雨，可以专注室内工作"

  # 基于待办
  todoist_based:
    - if:
        overdue_count: ">3"
      then: "有 {{overdue}} 项逾期待办，优先处理"

  # 基于新闻
  news_based:
    - if:
        trending: "AI"
      then: "AI 领域有重大更新，建议关注"
```

### 多语言支持

```yaml
# 多语言配置
i18n:
  default_locale: zh-CN

  # 语言检测
  detect: true

  # 翻译服务
  translate:
    enabled: false
    provider: google
    target_languages:
      - en
      - zh-CN
```

---

## 2.10 示例输出

### 实际简报示例

```
🌅 早间简报 - 2024-01-15

📰 今日资讯

### OpenAI 发布 GPT-5 预览版
- 来源: HackerNews
- 相关度: 92%
- 链接: https://news.ycombinator.com/item?id=123456

### 2024 年 AI 发展趋势报告
- 来源: 36Kr
- 相关度: 85%
- 链接: https://36kr.com/p/123456

---

📅 今日日程

### 10:00 - 团队周会
📍 线上
👥 产品团队

### 14:00 - 项目评审
📍 3号会议室

### 16:00 - 客户演示

---

✅ 待办事项

- [ ] 完成 API 设计文档
- [ ] 审查 PR #123
- [ ] 更新周报
- [ ] (逾期) 发送发票

---

💡 AI 建议

1. 📊 今天有 3 个会议，建议利用上午时间处理核心工作
2. ⚡ 团队周会后可跟进项目评审，准备好演示内容
3. 🌤️ 北京天气晴朗，适合外出午餐

---

🌤️ 天气

北京: ☀️ 晴
温度: 15-22°C
空气质量: 良

---

*简报由 OpenClaw 自动生成*
```

---

## 2.11 故障排除

### 常见问题

```bash
# 问题 1: RSS 源无法获取
# 解决: 检查网络和源 URL
openclaw tools debug rss --source HackerNews

# 问题 2: 日历授权失败
# 解决: 重新授权
openclaw auth calendar --reauth

# 问题 3: Skill 未触发
# 解决: 检查 cron 表达式
openclaw cron list
openclaw cron run morning-brief --test
```

### 日志查看

```bash
# 查看 Skill 运行日志
openclaw logs --skill morning-brief --tail 50

# 查看特定日期日志
openclaw logs --date 2024-01-15
```

---

## 2.12 扩展建议

### 添加股票行情

```yaml
# config/stocks.yaml
stocks:
  - symbol: AAPL
    name: Apple

  - symbol: BTC
    name: Bitcoin
    type: crypto
```

### 添加自定义提醒

```yaml
# config/reminders.yaml
reminders:
  - name: 喝水提醒
    cron: "0 */2 * * *"
    message: "该喝水了！"

  - name: 站立活动
    cron: "0 11,15 * * *"
    message: "起来活动一下吧！"
```

### 添加情感分析

```yaml
# 基于新闻情感的建议
sentiment_analysis:
  enabled: true

  # 正面新闻多
  positive:
    threshold: 0.7
    suggestion: "今天氛围不错，适合推进重要决策"

  # 负面新闻多
  negative:
    threshold: -0.5
    suggestion: "今天负面消息较多，保持低调专注"
```

---

## 本章小结

1. **数据源**: RSS/日历/天气/待办
2. **自动化**: 定时生成和发送
3. **模板化**: 可自定义输出格式
4. **智能化**: AI 建议和筛选

## 下一步

- 根据需要添加更多数据源
- 自定义简报模板
- 调整发送时间和渠道

---

## 参考资源

- [awesome-openclaw-usecases - Custom Morning Brief](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/custom-morning-brief.md)
- [OpenClaw RSS Tool](https://github.com/openclaw/openclaw-tools)
- [Google Calendar API](https://developers.google.com/calendar)
