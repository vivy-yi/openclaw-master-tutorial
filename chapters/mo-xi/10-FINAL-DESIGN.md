# 墨析最终方案设计

## 一、用户选择确认

| 问题 | 选择 | 说明 |
|------|------|------|
| **主要用途** | D. 全部 | 竞品监控 + 内容聚合 + 个人画像 |
| **参与程度** | A. 全自动 | 用户设置后自动运行 |
| **数据存储** | C. 两者都要 | 本地 + 云端（飞书） |

---

## 二、定位确认

```
墨析 = 全自动、全链路的数据采集 Skill
├── 竞品监控（内容运营用）
├── 内容聚合（选题参考）
└── 个人画像（用户分析）
```

---

## 三、架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│  Skill: mo-xi                                             │
│  ~/.openclaw/skills/mo-xi/                               │
├─────────────────────────────────────────────────────────┤
│  SKILL.md ── 能力定义、触发、工作流                       │
│  profiles/ ── 本地数据存储                              │
│  workflows/ ── 预设工作流                              │
│  templates/ ── 通知模板                                  │
└─────────────────────────────────────────────────────────┘
         ↓ 被调用
┌─────────────────────────────────────────────────────────┐
│  触发方式                                                   │
│  ├── Agent 直接调用（mo-finance/mo-yunying）               │
│  ├── Cron 定时（自动运行）                                  │
│  └── 消息触发（用户指令）                                   │
└─────────────────────────────────────────────────────────┘
         ↓ 使用
┌─────────────────────────────────────────────────────────┐
│  Tools: browser, cron, message, memory, feishu_bitable  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 目录结构

```
~/.openclaw/skills/mo-xi/
├── SKILL.md              # Skill 定义
├── profiles/            # 本地数据
│   ├── competitors/     # 竞品监控数据
│   │   ├── data/        # 原始数据
│   │   └── latest/      # 最新快照
│   ├── aggregated/       # 聚合内容
│   │   └── {topic}/    # 按话题分类
│   └── users/           # 用户画像
│       └── me/          # 个人画像
├── workflows/           # 工作流
│   ├── competitor-monitor.yaml
│   ├── content-aggregate.yaml
│   └── user-profile.yaml
├── templates/           # 模板
│   ├── alert-compact.md
│   └── summary-daily.md
└── config/
    └── sync.yaml        # 飞书同步配置
```

---

## 四、全自动化设计

### 4.1 Cron 定时任务

| 任务 | 频率 | 执行内容 |
|------|------|----------|
| **竞品监控** | 每6小时 | 采集 → 对比 → 通知 |
| **内容聚合** | 每天2次 | 跨平台 → 汇总 → 推送 |
| **个人画像** | 每天1次 | 增量更新 |

### 4.2 自动化流程

```
定时触发 / 用户指令
         ↓
    解析任务类型
         ↓
┌────────────────────────────────────────┐
│  竞品监控                               │
│  1. 采集各平台竞品账号                 │
│  2. 对比上次数据                        │
│  3. 发现新内容 → 通知                 │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│  内容聚合                               │
│  1. 采集各平台热门话题                 │
│  2. 按话题汇总                          │
│  3. 生成日报 → 推送                   │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│  个人画像                               │
│  1. 增量采集各平台数据                 │
│  2. 更新画像                           │
│  3. 异常检测 → 通知                   │
└────────────────────────────────────────┘
         ↓
    本地存储（profiles/）
         ↓
    同步飞书 Bitable（可选）
         ↓
    通知用户（消息）
```

---

## 五、数据存储设计

### 5.1 本地存储

```
profiles/
├── competitors/                    # 竞品监控
│   ├── {competitor_name}/
│   │   ├── xiaohongshu/         # 小红书数据
│   │   ├── weibo/              # 微博数据
│   │   └── douyin/             # 抖音数据
│   └── config.yaml             # 监控配置
│
├── aggregated/                    # 内容聚合
│   └── {topic}/
│       ├── sources/             # 各平台原始数据
│       └── summary.md           # 汇总报告
│
└── users/
    └── me/
        ├── platform_profiles/  # 各平台画像
        │   ├── github.json
        │   ├── zhihu.json
        │   └── ...
        ├── taste_preference.json  # 口味偏好
        └── consumption_level.json # 消费水平
```

### 5.2 飞书同步（云端）

```yaml
# config/sync.yaml
feishu:
  enabled: true
  
  bitables:
    competitors:
      app_token: "xxx"
      table_id: "竞品监控"
    
    aggregated:
      app_token: "yyy"
      table_id: "内容聚合"
    
    users:
      app_token: "zzz"
      table_id: "用户画像"

  sync:
    frequency: "daily"
    time: "22:00"
    conflict: "local_wins"  # 冲突策略
```

### 5.3 同步策略

| 数据类型 | 本地 | 飞书 | 说明 |
|----------|------|------|------|
| 竞品监控 | ✅ 实时 | ✅ 日同步 | 高频本地，低频云端 |
| 内容聚合 | ✅ 实时 | ✅ 日同步 | 方便查看 |
| 用户画像 | ✅ 实时 | 🔒 可选 | 隐私数据 |

---

## 六、功能模块

### 6.1 竞品监控模块

**功能**：
- 监控多个竞品在微博/小红书/抖音的账号
- 检测新内容发布
- 追踪互动数据变化
- 发现负面评价

**Cron**：每6小时

**输出**：
```
📢 竞品监控日报

竞品A:
  小红书: 2条新内容
    - "新品发布" (500👍)
    - "618预告" (1200👍)
  微博: 1条新内容
  
竞品B:
  ...
```

### 6.2 内容聚合模块

**功能**：
- 跨平台采集特定话题内容
- 按热度/时间排序
- 生成日报/周报

**Cron**：每天 9:00、18:00

**输出**：
```
📊 AI创业 内容聚合

最新 (2026-04-04 18:00)

🔥 知乎: "AI创业的机会"
   200回答 | 热度 ↑15%

🔥 微博: "#AI创业#"
   50万阅读 | 1000讨论

🔥 小红书: "AI创业第100天"
   5000👍 | 800收藏
```

### 6.3 个人画像模块

**功能**：
- 采集各平台用户数据
- 分析口味偏好、消费水平
- 增量更新，自动学习

**Cron**：每天 22:00

**输出**：
```
👤 个人画像更新

口味偏好: 麻辣、重口味
消费水平: ¥10-20（外卖）
常点: 麻辣烫、螺蛳粉、饺子

变化检测:
  🆕 新增: 螺蛳粉（近期高频）
  📈 上升: 炸鸡偏好 +20%
```

---

## 七、Cron 配置

```yaml
# 工作流配置
workflows:
  competitor-monitor:
    cron: "0 */6 * * *"  # 每6小时
    enabled: true
    
    targets:
      - name: "竞品A"
        platforms:
          - xiaohongshu: "竞品A官方"
          - weibo: "竞品A_official"
          - douyin: "competitor_a"
      - name: "竞品B"
        platforms:
          - xiaohongshu: "竞品B"
          - weibo: "竞品BOfficial"
    
    alert:
      new_content: true
      negative_review: true
      engagement_drop: 0.2  # 下降20%告警

  content-aggregate:
    cron: "0 9,18 * * *"  # 每天9点和18点
    enabled: true
    
    topics:
      - "AI创业"
      - "大模型应用"
      - "产品经理"
    
    platforms:
      - zhihu
      - weibo
      - xiaohongshu
    
    output:
      format: "markdown"
      channel: "telegram"

  user-profile:
    cron: "0 22 * * *"  # 每天22点
    enabled: true
    
    platforms:
      - github
      - zhihu
      - xiaohongshu
      - meituan
      - eleme
    
    update_strategy: "incremental"
```

---

## 八、实现优先级

| 阶段 | 内容 | 说明 |
|------|------|------|
| **P0** | 核心采集流程 | browser + 存储 |
| **P1** | Cron 自动调度 | 定时任务 |
| **P2** | 消息通知 | Telegram 推送 |
| **P3** | 竞品监控 | 第一个完整场景 |
| **P4** | 内容聚合 | 第二个完整场景 |
| **P5** | 个人画像 | 第三个完整场景 |
| **P6** | 飞书同步 | 云端备份 |
| **P7** | 自我学习 | 知识库进化 |

---

## 九、与现有 Agent 协同

```
mo-finance
    ↓ 调用
mo-xi skill (采集财经数据)
    ↓
返回数据
    ↓
mo-finance (分析)

mo-yunying
    ↓ 调用
mo-xi skill (采集竞品内容)
    ↓
返回数据
    ↓
mo-yunying (内容策划)
```

**调用示例**：

```yaml
# mo-yunying 任务
tasks:
  - name: "采集竞品内容"
    skill: mo-xi
    action: competitor_monitor
    params:
      targets: ["竞品A", "竞品B"]
      platforms: ["xiaohongshu", "weibo"]
```

---

## 十、下一步

1. **创建 Skill 目录结构**
2. **实现核心采集流程**
3. **配置 Cron 任务**
4. **测试竞品监控场景**
5. **扩展到内容聚合**
6. **添加个人画像**
7. **配置飞书同步**
