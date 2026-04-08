# 墨析知识库设计

## 一、知识库概述

知识库是墨析"自我学习"能力的核心，存储所有已学习的平台信息、采集方法和性能数据。

**核心价值**：
- 避免重复探索，提升效率
- 记录成功路径，快速复用
- 持续优化采集策略

---

## 二、目录结构

```
knowledge_base/
├── platforms/                    # 平台学习记录
│   ├── weibo.json
│   ├── zhihu.json
│   ├── jd.json
│   └── ...
├── api_endpoints/               # API 接口库
│   ├── weibo_hot.json
│   ├── weibo_user.json
│   └── ...
└── type_patterns/              # 类型模式
    ├── ecommerce.json
    ├── social.json
    ├── content.json
    └── ...
```

---

## 三、平台记录

### 3.1 完整格式

```json
{
  "platform": "weibo",
  "url_patterns": [
    "weibo.com/*",
    "*.weibo.com/*"
  ],
  "type": "social",
  "subtype": "microblog",
  
  "auth": {
    "required": true,
    "method": "cookie",
    "note": "需要登录态访问完整数据"
  },
  
  "discovered": [
    {
      "name": "热搜",
      "description": "微博热搜榜单",
      "method": "api",
      "endpoint": "https://weibo.com/ajax/side/hotSearch",
      "params": {},
      "response_format": "json",
      "auth_required": false,
      "reliability": 0.95
    },
    {
      "name": "用户信息",
      "description": "用户个人资料",
      "method": "dom",
      "url_pattern": "/u/*",
      "selector": ".user-info",
      "fields": ["name", "followers", "following"],
      "auth_required": true,
      "reliability": 0.9
    }
  ],
  
  "collection_history": [
    {
      "timestamp": "2026-04-04T05:00:00Z",
      "action": "hot_search",
      "method": "api",
      "duration": 2300,
      "success": true,
      "data_points": 50
    },
    {
      "timestamp": "2026-04-04T04:00:00Z",
      "action": "hot_search",
      "method": "api",
      "duration": 2500,
      "success": true,
      "data_points": 50
    }
  ],
  
  "performance": {
    "avg_duration": 2350,
    "success_rate": 0.98,
    "total_collections": 120,
    "last_success": "2026-04-04T05:00:00Z"
  },
  
  "created_at": "2026-03-01T00:00:00Z",
  "updated_at": "2026-04-04T05:00:00Z"
}
```

### 3.2 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `platform` | string | 平台名称 |
| `url_patterns` | array | URL 匹配模式 |
| `type` | string | 平台类型 |
| `discovered` | array | 发现的数据点 |
| `collection_history` | array | 采集历史 |
| `performance` | object | 性能统计 |
| `created_at` | string | 创建时间 |
| `updated_at` | string | 更新时间 |

---

## 四、API 端点库

### 4.1 格式

```json
{
  "name": "weibo_hot",
  "platform": "weibo",
  "endpoint": "https://weibo.com/ajax/side/hotSearch",
  "method": "GET",
  "headers": {},
  "params": {},
  "response_parser": "json",
  "fields_mapping": {
    "rank": "data.realtime[*].rank",
    "word": "data.realtime[*].word",
    "hot_value": "data.realtime[*].num"
  },
  "pagination": null,
  "rate_limit": {
    "requests": 60,
    "per_seconds": 60
  },
  "last_verified": "2026-04-04T00:00:00Z"
}
```

### 4.2 响应解析器

```javascript
// JSON 响应
{
  "response_parser": "json",
  "fields_mapping": {
    "title": "data.items[*].title",
    "url": "data.items[*].url"
  }
}

// 简化映射
{
  "title": "items[*].title",
  "url": "items[*].url"
}
```

---

## 五、类型模式

### 5.1 电商类型

```json
{
  "type": "ecommerce",
  "patterns": {
    "product_page": "/item/*",
    "search_page": "/search*",
    "cart_page": "/cart*"
  },
  "common_data": [
    "price",
    "title",
    "images",
    "description",
    "reviews",
    "sales_count"
  ],
  "collection_templates": {
    "product": {
      "method": "dom",
      "selectors": {
        "price": ".price",
        "title": ".title",
        "images": ".images img"
      }
    }
  }
}
```

### 5.2 内容平台

```json
{
  "type": "content",
  "patterns": {
    "article_page": "/article/*",
    "user_page": "/user/*",
    "search_page": "/search*"
  },
  "common_data": [
    "title",
    "content",
    "author",
    "publish_time",
    "views",
    "likes",
    "comments"
  ]
}
```

### 5.3 社交平台

```json
{
  "type": "social",
  "patterns": {
    "profile_page": "/u/*",
    "post_page": "/status/*"
  },
  "common_data": [
    "username",
    "bio",
    "followers",
    "following",
    "posts",
    "likes"
  ]
}
```

---

## 六、学习机制

### 6.1 学习时机

| 触发条件 | 学习内容 |
|----------|----------|
| 首次采集 | 记录平台基础信息 |
| 发现新端点 | 记录 API/选择器 |
| 采集成功 | 更新性能数据 |
| 采集失败 | 记录失败原因 |
| 性能下降 | 标记不稳定 |

### 6.2 学习流程

```
采集请求
    ↓
┌─────────────────────────────────────┐
│ 检查知识库                           │
│ platform in knowledge_base?          │
└─────────────────────────────────────┘
    ↓ 是              ↓ 否
┌─────────────┐   ┌─────────────────────┐
│ 获取已有记录  │   │ CDP 探索            │
│ 直接复用     │   │ - 打开页面          │
└─────────────┘   │ - 分析结构          │
                  │ - 拦截 API         │
                  └─────────────────────┘
                      ↓
                  ┌─────────────────────┐
                  │ 学习记录            │
                  │ - 保存端点         │
                  │ - 记录选择器       │
                  │ - 设置置信度       │
                  └─────────────────────┘
                      ↓
                  ┌─────────────────────┐
                  │ 执行采集            │
                  │ - 记录性能         │
                  │ - 更新成功率       │
                  └─────────────────────┘
```

### 6.3 置信度计算

```javascript
// 置信度 = 基础分 × 成功率 × 时效因子
confidence = 0.8 * success_rate * recency_factor

// 示例
success_rate = 0.95  // 95% 成功率
recency_factor = 0.9  // 近期数据

confidence = 0.8 * 0.95 * 0.9 = 0.684
```

---

## 七、知识复用

### 7.1 复用判断

```yaml
# 复用条件
reuse_threshold:
  min_confidence: 0.7
  max_age: 30d  # 超过30天需重新验证
  success_rate: > 0.9
```

### 7.2 降级复用

当高置信度方法失败时，自动尝试低置信度方法：

```yaml
fallback_chain:
  - method: "api"
    confidence: 0.95
  - method: "dom"
    confidence: 0.85
  - method: "screenshot"
    confidence: 0.5
```

---

## 八、知识库更新

### 8.1 自动更新

```yaml
update_strategy:
  # 每次成功采集后更新性能
  on_success:
    - append_to_history
    - recalculate_avg_duration
    - update_last_success
  
  # 失败时更新状态
  on_failure:
    - append_to_history
    - decrease_confidence
    - trigger_re_explore
```

### 8.2 定期维护

```yaml
maintenance:
  # 每周清理过期记录
  cleanup:
    schedule: "0 3 * * 0"  # 每周日凌晨3点
    criteria:
      last_used: "> 90d"
      success_rate: "< 0.5"
  
  # 每月验证热门平台
  verify:
    schedule: "0 2 1 * *"  # 每月1日凌晨2点
    platforms: ["weibo", "zhihu", "douyin"]
```

---

## 九、导入/导出

### 9.1 导出

```yaml
export:
  format: "json"
  path: "knowledge_base_backup_{date}.json"
  include:
    - platforms
    - api_endpoints
    - type_patterns
```

### 9.2 导入

```yaml
import:
  source: "knowledge_base_backup_2026-03-01.json"
  strategy: "merge"  # merge / replace
  conflict_resolution: "keep_higher_confidence"
```
