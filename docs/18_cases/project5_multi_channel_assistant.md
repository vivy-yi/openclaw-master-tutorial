# 项目五：多渠道个人助理 - 完整实施指南

本指南将帮助你构建一个通过多个消息平台统一访问的个人 AI 助手。

---

## 5.1 项目概述

### 什么是多渠道个人助理

多渠道个人助理是一个统一的 AI 助手，可以通过 Telegram、Slack、飞书、WhatsApp 等多个平台访问，所有平台的对话历史和上下文自动同步。

```
★ Insight ─────────────────────────────────────
多渠道的价值：
1. 统一入口 - 不需要记住多个平台
2. 上下文连续 - 切换平台不丢失对话
3. 能力聚合 - 各平台优势互补
4. 永远在线 - 任何平台都能联系到你
─────────────────────────────────────────────────
```

### 支持的渠道

| 渠道 | 特点 | 适用场景 |
|------|------|---------|
| Telegram | 功能最全、速度快 | 主要入口 |
| Slack | 企业集成、协作 | 工作场景 |
| 飞书 | 文档/日历集成 | 中国企业 |
| WhatsApp | 全球通用 | 国际用户 |
| Discord | 社区/群组 | 团队协作 |

### 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                     多渠道个人助理架构                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   📱 渠道层                                                         │
│        │                                                           │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│   │ Telegram│ │  Slack  │ │  飞书   │ │WhatsApp│               │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘               │
│        │              │           │          │                        │
│        └──────────────┴───────────┴──────────┘                        │
│                           │                                          │
│                           ▼                                          │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    统一消息总线                               │   │
│   │  - 消息标准化                                              │   │
│   │  - 用户身份映射                                            │   │
│   │  - 上下文同步                                              │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                           │                                          │
│                           ▼                                          │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    能力引擎                                   │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│   │  │ 日历    │ │  邮件   │ │  笔记   │ │  提醒   │       │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│   │  │  搜索   │ │  天气   │ │  翻译   │ │  文件   │       │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5.2 准备工作

### 安装渠道插件

```bash
# 安装核心渠道
openclaw plugins install telegram
openclaw plugins install slack

# 安装中国渠道（可选）
openclaw plugins install @m1heng-clawd/feishu

# 安装国际渠道（可选）
openclaw plugins install whatsapp

# 安装能力工具
openclaw tools install calendar
openclaw tools install email
openclaw tools install notes
openclaw tools install reminder
openclaw tools install search
openclaw tools install weather

# 验证安装
openclaw channels list
```

---

## 5.3 项目结构

### 创建目录

```bash
mkdir -p ~/openclaw-assistant/{config,skills,channels,users}
```

### 目录结构

```
openclaw-assistant/
├── config/
│   ├── channels.yaml        # 渠道配置
│   ├── routing.yaml        # 路由配置
│   ├── capabilities.yaml   # 能力配置
│   └── users.yaml          # 用户配置
├── skills/
│   ├── assistant.yaml      # 主助手技能
│   ├── calendar.yaml       # 日历技能
│   ├── email.yaml         # 邮件技能
│   ├── notes.yaml         # 笔记技能
│   └── reminder.yaml       # 提醒技能
├── users/                  # 用户数据
│   └── mapping.yaml       # 跨渠道用户映射
├── templates/             # 消息模板
└── assistant.yaml         # 主配置
```

---

## 5.4 配置文件

### 渠道配置

```yaml
# config/channels.yaml
channels:
  # Telegram
  telegram:
    enabled: true
    bot_token: "${TELEGRAM_BOT_TOKEN}"

    # 私聊策略
    dm_policy: open
    allow_from: ["*"]

    # 群组策略
    group_policy: allowlist
    group_allow_from:
      - "${PRIVATE_GROUP_ID}"

    # 功能配置
    features:
      inline_buttons: true
      commands: true

  # Slack
  slack:
    enabled: true
    app_token: "${SLACK_APP_TOKEN}"
    bot_token: "${SLACK_BOT_TOKEN}"

    # 触发方式
    mention: true
    direct_message: true

    # 工作区
    workspace: "${SLACK_TEAM_ID}"

    features:
      interactive: true
      shortcuts: true

  # 飞书
  feishu:
    enabled: false
    app_id: "${FEISHU_APP_ID}"
    app_secret: "${FEISHU_APP_SECRET}"

    # 连接模式
    connection_mode: websocket

    # 群组
    group_policy: open

  # WhatsApp
  whatsapp:
    enabled: false

    # 配对方式
    pairing: qr

    # 访问控制
    dm_policy: pairing
```

### 路由配置

```yaml
# config/routing.yaml
routing:
  # 用户身份映射
  identity_mapping:
    # 跨渠道用户关联
    enabled: true
    storage: ~/openclaw-assistant/users/mapping.yaml

    # 匹配规则
    rules:
      - type: email
        field: email
        priority: 1

      - type: phone
        field: phone
        priority: 2

  # 消息路由
  message:
    # 上下文同步
    sync_context: true
    sync_history: true

    # 会话管理
    session:
      # 基于用户ID
      by_user: true
      # 跨渠道共享
      cross_channel: true

  # 能力路由
  capabilities:
    # 根据渠道特性选择能力
    fallback:
      telegram: ["tts", "buttons"]
      slack: ["channel_share", "app_home"]
      whatsapp: ["voice", "location"]
```

### 用户配置

```yaml
# config/users.yaml
users:
  # 主用户
  - id: primary
    name: 主用户
    channels:
      telegram: 123456789
      slack: U123456
      feishu: ou_xxxxx
      whatsapp: "+1234567890"

    preferences:
      language: zh-CN
      timezone: Asia/Shanghai
      default_model: claude-sonnet-4-20250514

    capabilities:
      - calendar
      - email
      - notes
      - reminder

    # 允许的其他用户
  - id: family
    name: 家人
    channels:
      telegram: 987654321
      whatsapp: "+0987654321"

    preferences:
      language: zh-CN

    capabilities:
      - notes
      - reminder
```

### 能力配置

```yaml
# config/capabilities.yaml
capabilities:
  # 日历
  calendar:
    provider: google
    default_calendar: primary
    permissions:
      - read
      - write

    # 自动创建事件
    auto_create: false

  # 邮件
  email:
    provider: gmail
    auto_process: true

    # 自动标签
    labels:
      important: ["AI", "urgent"]
      archive_after_days: 30

  # 笔记
  notes:
    provider: obsidian
    vault: ~/notes
    auto_capture: true

  # 提醒
  reminder:
    channels:
      - telegram
      - slack

    # 默认提前时间
    default_before: 300  # 5分钟

  # 搜索
  search:
    providers:
      - google
      - duckduckgo

    # 默认搜索引擎
    default: google
```

---

## 5.5 统一命令系统

### 命令映射

```yaml
# config/commands.yaml
commands:
  # 日历命令
  calendar:
    - name: 查看日程
      aliases: ["日程", "calendar", "calendar today"]
      channel: all

    - name: 添加日程
      aliases: ["添加日程", "add event", "新建日程"]
      examples:
        - "添加日程：明天 3点 团队会议"

    - name: 创建会议
      aliases: ["创建会议", "new meeting"]
      examples:
        - "创建会议：项目评审 - 明天 10:00"

  # 邮件命令
  email:
    - name: 查看邮件
      aliases: ["邮件", "email", "收件箱"]
      channel: all

    - name: 发送邮件
      aliases: ["发送邮件", "send email"]
      examples:
        - "发送邮件给 xxx@email.com，主题：xxx，内容：xxx"

  # 笔记命令
  notes:
    - name: 记录
      aliases: ["记录", "记住", "note", "save"]
      channel: all

    - name: 搜索笔记
      aliases: ["搜索笔记", "find note"]
      channel: all

  # 提醒命令
  reminder:
    - name: 设置提醒
      aliases: ["提醒", "remind", "提醒我"]
      examples:
        - "提醒我 2 小时后开会"
        - "提醒：明天下午 3 点提交报告"

    - name: 查看提醒
      aliases: ["我的提醒", "reminders"]
      channel: all
```

### 跨渠道命令示例

```markdown
# 统一命令参考

## 日历
"查看今天日程"
"明天 3 点有会议吗？"
"添加日程：周五 2 点 团队同步"

## 邮件
"查看最新邮件"
"发送邮件给张三：项目进度更新"
"标记这封邮件为重要"

## 笔记
"记录：今天学到的关键知识点是..."
"搜索关于 Python 的笔记"
"列出最近的笔记"

## 提醒
"提醒我 2 小时后喝水"
"设置提醒：明早 9 点开会"
"取消所有提醒"

## 搜索
"搜索最近的科技新闻"
"查找关于 AI 的内容"

## 天气
"北京天气怎么样"
"上海明天天气"

## 通用
"帮助" - 显示所有命令
"设置" - 配置偏好
```

---

## 5.6 Skill 配置

### 主助手 Skill

```yaml
# skills/assistant.yaml
name: assistant
description: 多渠道个人助理

# 触发方式
trigger:
  # 所有消息
  default: true

# 用户识别
user_recognition:
  enabled: true
  mapping_file: ~/openclaw-assistant/users/mapping.yaml

steps:
  # 1. 识别用户
  - name: identify_user
    tool: identify_user
    channel: "{{channel}}"
    user_id: "{{user_id}}"
    output: user

  # 2. 加载用户配置
  - name: load_user_config
    tool: load_user_config
    user: "{{user}}"
    config_file: ~/openclaw-assistant/config/users.yaml
    output: user_config

  # 3. 解析意图
  - name: parse_intent
    tool: llm_intent
    model: "{{user_config.default_model}}"
    prompt: |
      分析用户意图，分类到以下类别之一：

      - calendar: 日历相关
      - email: 邮件相关
      - notes: 笔记相关
      - reminder: 提醒相关
      - search: 搜索相关
      - general: 一般对话

      用户消息: {{message}}
      历史上下文: {{history}}

    output: intent

  # 4. 调用能力
  - name: invoke_capability
    tool: invoke_skill
    skill: "{{intent}}_skill"
    input: "{{message}}"
    config: "{{user_config.capabilities}}"
    output: result
    fallback: general_response

  # 5. 格式化回复
  - name: format_response
    tool: format_message
    channel: "{{channel}}"
    template: "{{result}}"
    output: formatted

  # 6. 发送回复
  - name: send_response
    tool: send_to_channel
    channel: "{{channel}}"
    target: "{{channel_id}}"
    message: "{{formatted}}"
```

### 日历 Skill

```yaml
# skills/calendar.yaml
name: calendar
description: 日历管理

trigger:
  keywords: ["日程", "calendar", "会议", "event"]

steps:
  # 1. 解析日程信息
  - name: parse_event
    tool: llm_parse_event
    message: "{{user_input}}"
    output: event_info

  # 2. 操作日历
  - name: calendar_op
    tool: calendar
    action: "{{event_info.action}}"
    # action: create / list / update / delete

    params:
      title: "{{event_info.title}}"
      time: "{{event_info.time}}"
      duration: "{{event_info.duration}}"
      attendees: "{{event_info.attendees}}"
      location: "{{event_info.location}}"

    output: result

  # 3. 确认回复
  - name: confirm
    tool: respond
    template: |
      {% if action == 'create' %}
      ✅ 已创建日程：

      📅 {{title}}
      🕐 {{time}}
      {% if location %}
      📍 {{location}}
      {% endif %}

      {% elif action == 'list' %}
      📅 今日日程：

      {% for event in events %}
      - {{event.time}} {{event.title}}
      {% endfor %}

      {% else %}
      ✅ {{result}}
      {% endif %}
```

### 提醒 Skill

```yaml
# skills/reminder.yaml
name: reminder
description: 提醒管理

trigger:
  keywords: ["提醒", "remind", "提醒我"]

steps:
  # 1. 解析提醒
  - name: parse_reminder
    tool: llm_parse_reminder
    message: "{{user_input}}"
    output: reminder_info

  # 2. 创建提醒
  - name: create_reminder
    tool: reminder_create
    message: "{{reminder_info.message}}"
    time: "{{reminder_info.time}}"
    channels: "{{user_config.preferences.reminder_channels}}"
    output: reminder

  # 3. 确认
  - name: confirm
    tool: respond
    template: |
      ✅ 已设置提醒！

      🔔 {{message}}
      🕐 {{time}}

      {% if channels %}
      提醒渠道: {{channels}}
      {% endif %}

      {% if user_input contains '取消' %}
      如需取消，请说"取消提醒"
      {% endif %}
```

---

## 5.7 用户映射配置

### 跨渠道用户关联

```yaml
# users/mapping.yaml
mappings:
  # 主用户
  primary:
    channels:
      telegram: 123456789
      slack: U1234567890
      feishu: ou_1234567890abcdef
      whatsapp: "+12345678901"

    # 关联标识
    identifiers:
      email: "user@example.com"
      phone: "+12345678901"

    # 会话ID（跨渠道共享）
    session_id: sess_primary

  # 家人
  family:
    channels:
      telegram: 987654321
      whatsapp: "+09876543210"

    identifiers:
      phone: "+09876543210"

    session_id: sess_family
```

### 会话管理

```yaml
# users/sessions.yaml
sessions:
  # 主用户会话
  sess_primary:
    user_id: primary
    context:
      # 共享的上下文
      preferences:
        language: zh-CN
        model: claude-sonnet-4-20250514

      # 最近的对话历史
      history: []

      # 用户数据
      data:
        calendar_events: []
        reminders: []

    # 跨渠道状态
    channel_states:
      telegram:
        last_active: 2024-01-15T10:30:00Z
      slack:
        last_active: 2024-01-15T10:25:00Z
```

---

## 5.8 消息模板

### 跨渠道消息适配

```yaml
# templates/message.yaml
templates:
  # 日程列表
  calendar_list:
    telegram: |
      📅 *今日日程*

      {% for event in events %}
      • *{{event.time}}* {{event.title}}
      {% if event.location %}
      📍 {{event.location}}
      {% endif %}
      {% endfor %}

    slack: |
      📅 *今日日程*

      {% for event in events %}
      • *{{event.time}}* {{event.title}}
      {% if event.location %}
      📍 {{event.location}}
      {% endif %}
      {% endfor %}

    feishu: |
      📅 今日日程

      {% for event in events %}
      • {{event.time}} {{event.title}}
      {% endfor %}

  # 提醒确认
  reminder_confirm:
    telegram: |
      ✅ 提醒已设置

      🔔 {{message}}
      🕐 {{time}}

      /取消提醒 - 取消所有提醒

    slack: |
      ✅ 提醒已设置

      🔔 {{message}}
      🕐 {{time}}

    button:
      label: 取消提醒
      action: cancel_reminder
```

---

## 5.9 使用示例

### Telegram 使用

```
用户: @myassistant 查看今天日程

助手:
📅 今日日程

• 10:00 团队会议
• 14:00 项目评审
• 16:00 客户演示
```

### Slack 使用

```
用户: @assistant 添加提醒：2小时后提交报告

助手:
✅ 已设置提醒！

🔔 提交报告
🕐 14:00 (2小时后)
```

### 飞书使用

```
用户: 记录今天学到的知识点

助手:
请告诉我需要记录的内容
```

---

## 5.10 高级功能

### 上下文自动续接

```yaml
# config/context.yaml
context:
  # 自动续接
  auto_resume:
    enabled: true

    # 检测关键词
    resume_keywords:
      - "继续"
      - "刚才"
      - "上面"

    # 续接来源
    sources:
      - telegram
      - slack
      - feishu

  # 上下文保留时间
  retention:
    hours: 24
    max_messages: 100
```

### 智能渠道选择

```yaml
# config/smart_routing.yaml
smart_routing:
  # 根据内容类型选择渠道
  content_based:
    # 重要通知
    important:
      channels: [telegram, email]
      always_notify: true

    # 即时消息
    im:
      channels: [telegram, slack]
      notify_all: false

    # 异步通知
    async:
      channels: [email, slack]
      batch: true

  # 根据用户状态选择
  user_state:
    # 在线
    online:
      prefer: telegram

    # 忙碌
    busy:
      prefer: email
      delay: 300

    # 离线
    offline:
      prefer: email
      notify_all: true
```

### 消息翻译

```yaml
# config/translation.yaml
translation:
  enabled: true

  # 自动检测
  auto_detect: true

  # 翻译引擎
  provider: google

  # 翻译场景
  scenarios:
    # 用户使用非偏好语言
    - trigger: language_mismatch
      action: translate_to_user_lang

    # 用户发送外语文档
    - trigger: foreign_content
      action: translate_content
```

---

## 5.11 故障排除

### 常见问题

```bash
# 问题 1: 渠道连接失败
# 解决: 检查 Token 和配置
openclaw channels status telegram
openclaw channels test telegram

# 问题 2: 消息不同步
# 解决: 检查会话配置
openclaw sessions list
openclaw sessions sync --force

# 问题 3: 命令识别失败
# 解决: 查看意图解析日志
openclaw logs --skill assistant --intent
```

### 调试命令

```bash
# 查看渠道状态
openclaw channels list

# 测试消息发送
openclaw message send --channel telegram --to 123456789 --message "test"

# 查看用户映射
openclaw users list

# 会话调试
openclaw sessions debug --user primary
```

---

## 本章小结

1. **多渠道**: Telegram/Slack/飞书/WhatsApp
2. **统一入口**: 单一命令，跨平台响应
3. **上下文同步**: 跨渠道会话共享
4. **能力集成**: 日历/邮件/笔记/提醒

## 下一步

- 添加更多渠道
- 自定义命令
- 配置自动化工作流

---

## 参考资源

- [awesome-openclaw-usecases - Multi-Channel Assistant](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/multi-channel-assistant.md)
- [OpenClaw Channels Documentation](https://docs.openclaw.ai/channels)
