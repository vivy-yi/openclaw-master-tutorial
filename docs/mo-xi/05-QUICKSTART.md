# 墨析快速开始

## 环境要求

- OpenClaw 已安装
- 浏览器配置完成
- Agent 权限正常

## 5 分钟上手

### Step 1: 创建墨析 Agent

在 OpenClaw 工作区创建 Agent：

```
/Users/d/.openclaw/workspaces/元团队/agents/墨析/
├── SOUL.md        # 角色定义
├── SKILL.md       # 自适应框架
├── TOOLS.md       # 工具配置
└── profiles/      # 数据目录
    ├── knowledge_base/
    └── collected_data/
```

### Step 2: 配置目录结构

```bash
mkdir -p profiles/{knowledge_base/{platforms,api_endpoints,type_patterns},collected_data/{trending,search,products}}
```

### Step 3: 初始化知识库模板

创建 `knowledge_base/template.json`：

```json
{
  "platform": "",
  "url_patterns": [],
  "type": "",
  "discovered": [],
  "collection_history": [],
  "performance": {
    "avg_duration": 0,
    "success_rate": 0,
    "total_collections": 0
  },
  "created_at": "",
  "updated_at": ""
}
```

---

## 基础采集示例

### 示例 1: 采集微博热搜

**用户请求**：
```
采集微博热搜
```

**墨析执行**：

```yaml
# 1. 打开页面
browser.open("https://weibo.com/hot Flow")

# 2. 拦截 API
browser.intercept()

# 3. 等待数据
browser.act(kind="wait", timeoutMs=3000)

# 4. 获取响应
response = browser.responsebody("**/hotSearch**")

# 5. 解析数据
data = JSON.parse(response)
hot_list = data.data.realtime.map(item => ({
  rank: item.rank,
  title: item.word,
  hot_value: item.num
}))

# 6. 存储
save_json("collected_data/trending/weibo_2026-04-04.json", {
  meta: { platform: "weibo", type: "hot_search" },
  data: hot_list
})
```

### 示例 2: 采集知乎热榜

**用户请求**：
```
帮我采集知乎热榜内容
```

**墨析执行**：

```yaml
# 1. 打开页面
browser.open("https://www.zhihu.com/hot")

# 2. 页面分析
browser.snapshot()

# 3. 提取数据
browser.evaluate(() => {
  const items = document.querySelectorAll('.HotItem');
  return Array.from(items).map(item => ({
    rank: item.querySelector('.HotItem-rank')?.textContent,
    title: item.querySelector('.HotItem-title')?.textContent,
    metrics: item.querySelector('.HotItem-metrics')?.textContent
  }));
})
```

### 示例 3: 采集京东商品

**用户请求**：
```
采集这个商品信息 https://item.jd.com/100012043978.html
```

**墨析执行**：

```yaml
# 1. 打开商品页
browser.open("https://item.jd.com/100012043978.html")

# 2. 等待加载
browser.act(kind="wait", selector=".sku-name", timeoutMs=5000)

# 3. 提取数据
browser.evaluate(() => {
  return {
    title: document.querySelector('.sku-name')?.textContent?.trim(),
    price: document.querySelector('.price')?.textContent?.trim(),
    shop: document.querySelector('.shop-name')?.textContent?.trim(),
    images: Array.from(document.querySelectorAll('.spec-items img'))
      .map(img => img.src)
  };
})
```

---

## 监控任务示例

### 示例: 定时监控微博热搜变化

**用户请求**：
```
每小时监控一次微博热搜，有变化时通知我
```

**墨析设置 Cron**：

```yaml
# Cron 配置
cron:
  name: "微博热搜监控"
  schedule: "0 * * * *"  # 每小时
  
  action: |
    # 1. 采集当前热搜
    browser.open("https://weibo.com/hot Flow")
    browser.intercept()
    browser.wait()
    current = browser.responsebody("**/hotSearch**")
    
    # 2. 读取上次数据
    last = read_json("collected_data/trending/weibo_latest.json")
    
    # 3. 对比变化
    changes = diff(last.data, current.data)
    
    # 4. 如有变化，通知
    if changes.length > 0:
      message.send(
        to: "telegram:6020964033",
        message: "微博热搜有变化:\n" + format_changes(changes)
      )
    
    # 5. 保存最新数据
    save_json("collected_data/trending/weibo_latest.json", current)
```

---

## 自我学习示例

### 示例: 首次采集自动学习

**用户请求**：
```
采集小红书上关于 AI 的内容
```

**墨析执行（首次，学习模式）**：

```yaml
# 1. 打开搜索页
browser.open("https://www.xiaohongshu.com/search_result?keyword=AI")

# 2. 分析页面结构
browser.snapshot()

# 3. 拦截 API（尝试发现接口）
browser.intercept()

# 4. 执行 JS 提取数据
raw_data = browser.evaluate(() => {
  // 尝试多种数据提取方式
  try {
    // 方式1: 从 __INITIAL_STATE__ 提取
    return JSON.parse(window.__INITIAL_STATE__).noteList;
  } catch {
    // 方式2: DOM 提取
    return Array.from(document.querySelectorAll('.note-item'))
      .map(item => ({
        title: item.querySelector('.title')?.textContent,
        author: item.querySelector('.author')?.textContent
      }));
  }
})

# 5. 学习记录
learned = {
  platform: "xiaohongshu",
  search_url_pattern: "/search_result?keyword={keyword}",
  method: "mixed",  # API + DOM
  selectors: {
    note_item: ".note-item",
    title: ".title"
  },
  performance: {
    duration: 3500,
    success: true,
    data_points: 20
  }
}

# 6. 保存到知识库
save_json("knowledge_base/platforms/xiaohongshu.json", learned)
```

**后续采集（复用模式）**：

```yaml
# 1. 查询知识库
method = read_json("knowledge_base/platforms/xiaohongshu.json")

# 2. 直接使用记录的方法
browser.open("https://www.xiaohongshu.com/search_result?keyword=AI")
browser.evaluate(() => {
  return Array.from(document.querySelectorAll(method.selectors.note_item))
    .map(item => ({
      title: item.querySelector(method.selectors.title)?.textContent
    }));
})
```

---

## 常见问题

### Q1: 采集失败怎么办？

```yaml
# 使用降级策略
try:
  - api_method()
catch:
  try:
    - dom_method()
  catch:
    - screenshot_method()
```

### Q2: 需要登录怎么办？

```yaml
# 使用 user profile（已登录浏览器）
browser.open(url, profile="user")
```

### Q3: 反爬拦截怎么办？

```yaml
# 降低频率 + 添加延迟
- browser.open(url)
- browser.act(kind="wait", timeoutMs=2000)
- delay(5000)  # 添加 5 秒延迟
```

---

## 下一步

- 阅读 [场景示例](./06-SCENARIOS.md) 了解更多用法
- 阅读 [CDP 工具箱](./03-CDP-TOOLS.md) 深入了解工具
- 阅读 [知识库设计](./04-KNOWLEDGE-BASE.md) 了解学习机制
