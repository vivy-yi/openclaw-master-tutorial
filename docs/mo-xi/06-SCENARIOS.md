# 墨析场景示例

## 场景 1: 竞品监控

### 需求
监控竞品在小红书、微博、抖音的官方账号内容发布

### 实现

```yaml
# 竞品监控任务
monitoring:
  competitors:
    - name: "竞品A"
      accounts:
        xiaohongshu: "竞品A官方"
        weibo: "竞品A_official"
        douyin: " competitor_a"
    
    - name: "竞品B"
      accounts:
        xiaohongshu: "竞品B"
        weibo: "竞品BOfficial"
  
  schedule: "0 9,18 * * *"  # 每天 9:00 和 18:00
  
  action: |
    # 采集所有竞品账号
    results = []
    
    for competitor in competitors:
      for platform, account in competitor.accounts:
        # 1. 打开账号页面
        if platform == "xiaohongshu":
          url = f"https://www.xiaohongshu.com/user/profile/{account}"
        elif platform == "weibo":
          url = f"https://weibo.com/u/{account}"
        
        browser.open(url)
        browser.snapshot()
        
        # 2. 提取最新内容
        latest = browser.evaluate(() => {
          const posts = document.querySelectorAll('.post-item');
          return Array.from(posts).slice(0, 3).map(post => ({
            title: post.querySelector('.title')?.textContent,
            time: post.querySelector('.time')?.textContent,
            likes: post.querySelector('.likes')?.textContent
          }));
        })
        
        # 3. 对比上次记录
        last_record = read_json(f"竞品监控/{competitor.name}_{platform}_last.json")
        new_posts = diff(latest, last_record)
        
        results.push({
          competitor: competitor.name,
          platform: platform,
          new_posts: new_posts
        })
        
        # 4. 更新记录
        save_json(f"竞品监控/{competitor.name}_{platform}_last.json", latest)
    
    # 5. 汇总通知
    if results.any(r => r.new_posts.length > 0):
      message.send(
        to: "telegram:6020964033",
        message: format_alert(results)
      )
```

### 输出

```
📢 竞品监控日报

竞品A:
  小红书: 2 条新内容
    - "新品发布预告" (1小时前, 500赞)
    - "618活动介绍" (3小时前, 1200赞)
  微博: 1 条新内容
    - "新品发布会直播回顾" (5小时前)

竞品B:
  ...
```

---

## 场景 2: 跨平台价格监控

### 需求
同一商品在淘宝、京东、拼多多的价格对比

### 实现

```yaml
# 价格监控任务
price_monitor:
  products:
    - name: "iPhone 15 Pro 256G"
      urls:
        taobao: "https://search.jd.com/Search?keyword=iPhone+15+Pro"
        jd: "https://item.jd.com/100012043978.html"
        pinduoduo: "https://mobile.yangkeduo.com/search.html?query=iPhone+15+Pro"
  
  action: |
    results = []
    
    for product in products:
      product_data = { name: product.name, prices: [] }
      
      # 淘宝
      browser.open(product.urls.taobao)
      browser.snapshot()
      taobao_price = browser.evaluate(() => {
        return document.querySelector('.price')?.textContent;
      })
      product_data.prices.push({
        platform: "taobao",
        price: taobao_price,
        url: current_url
      })
      
      # 京东
      browser.open(product.urls.jd)
      browser.act(kind="wait", selector=".price", timeoutMs=5000)
      jd_price = browser.evaluate(() => {
        return document.querySelector('.price')?.textContent;
      })
      product_data.prices.push({
        platform: "jd",
        price: jd_price,
        url: current_url
      })
      
      # 拼多多
      browser.open(product.urls.pinduoduo)
      browser.snapshot()
      pdd_price = browser.evaluate(() => {
        return document.querySelector('.price')?.textContent;
      })
      product_data.prices.push({
        platform: "pinduoduo",
        price: pdd_price,
        url: current_url
      })
      
      results.push(product_data)
    
    # 保存对比数据
    save_json(f"价格监控/{product.name}_{date}.json", results)
    
    # 找出最低价
    for product in results:
      min_price = product.prices.min(p => p.price)
      if min_price < product.prices[0].price * 0.9:  # 降价超过10%
        message.send(
          to: "telegram:6020964033",
          message: f"💰 {product.name} 降价通知!\n最低价: {min_price.price} ({min_price.platform})"
        )
```

### 输出

```
💰 iPhone 15 Pro 256G 价格对比

| 平台   | 价格    | 链接 |
|--------|---------|------|
| 京东   | ¥8999   | 🔗  |
| 淘宝   | ¥8699   | 🔗  |
| 拼多多 | ¥7999 ⭐ | 🔗  |

⚠️ 拼多多价格最低！
```

---

## 场景 3: 内容聚合

### 需求
某个话题（如"AI创业"）在各平台的讨论汇总

### 实现

```yaml
# 内容聚合任务
content_aggregation:
  topic: "AI创业"
  platforms:
    - name: "微博"
      url: "https://s.weibo.com/weibo?q=AI创业"
    - name: "知乎"
      url: "https://www.zhihu.com/search?type=content&q=AI创业"
    - name: "微信公众号"
      url: "https://weixin.sogou.com/weixin?type=2&query=AI创业"
    - name: "小红书"
      url: "https://www.xiaohongshu.com/search_result?keyword=AI创业"
  
  action: |
    aggregated = {
      topic: "AI创业",
      collected_at: now(),
      contents: []
    }
    
    for platform in platforms:
      # 1. 打开平台
      browser.open(platform.url)
      browser.wait(3000)
      
      # 2. 提取内容
      contents = browser.evaluate(() => {
        return Array.from(document.querySelectorAll('.content-item'))
          .map(item => ({
            title: item.querySelector('.title')?.textContent,
            source: item.querySelector('.source')?.textContent,
            time: item.querySelector('.time')?.textContent,
            summary: item.querySelector('.abstract')?.textContent?.slice(0, 100)
          }));
      })
      
      # 3. 添加来源
      for content in contents:
        content.platform = platform.name
        aggregated.contents.push(content)
    
    # 4. 按时间排序
    aggregated.contents.sort((a, b) => b.time > a.time)
    
    # 5. 保存
    save_json(f"内容聚合/{topic}_{date}.json", aggregated)
    
    # 6. 生成摘要
    summary = generate_summary(aggregated.contents)
    
    message.send(
      to: "telegram:6020964033",
      message: f"📊 {topic} 内容聚合\n\n{summary}"
    )
```

### 输出

```
📊 AI创业 内容聚合

最新讨论 (2026-04-04 05:00)

🔥 知乎: "AI创业者的机会与挑战" (2小时前)
   "随着大模型能力提升，越来越多的AI创业机会涌现..."

🔥 微博: "#AI创业# 话题热议中..." (3小时前)
   "投资圈看好这5个AI创业方向..."

🔥 小红书: "AI创业第100天经验分享" (5小时前)
   "从0到1，我的AI创业复盘..."

📖 公众号: "2026年AI创业白皮书" (1天前)
   "本文盘点AI创业的最佳赛道..."
```

---

## 场景 4: 舆情监控

### 需求
监控用户对品牌的评价（好评/差评）

### 实现

```yaml
# 舆情监控任务
sentiment_monitor:
  brand: "某品牌"
  platforms:
    - name: "微博"
      search: "某品牌"
    - name: "小红书"
      search: "某品牌"
    - name: "大众点评"
      search: "某品牌"
  
  action: |
    results = {
      brand: brand,
      analyzed_at: now(),
      positive: 0,
      negative: 0,
      neutral: 0,
      samples: []
    }
    
    for platform in platforms:
      browser.open(platform.search_url)
      browser.wait(3000)
      
      # 提取评论
      comments = browser.evaluate(() => {
        return Array.from(document.querySelectorAll('.comment'))
          .slice(0, 20)
          .map(comment => ({
            text: comment.querySelector('.text')?.textContent,
            sentiment: comment.querySelector('.sentiment')?.textContent,
            time: comment.querySelector('.time')?.textContent
          }));
      })
      
      # 情感分析
      for comment in comments:
        sentiment = analyze_sentiment(comment.text)
        results[sentiment]++
        results.samples.push({
          ...comment,
          platform: platform.name,
          sentiment: sentiment
        })
    
    # 生成报告
    report = {
      brand: brand,
      total: results.positive + results.negative + results.neutral,
      positive_rate: results.positive / total * 100,
      negative_rate: results.negative / total * 100,
      alert: results.negative > 10
    }
    
    save_json(f"舆情监控/{brand}_{date}.json", report)
    
    # 负面预警
    if report.alert:
      message.send(
        to: "telegram:6020964033",
        message: f"⚠️ 舆情预警\n{brand} 负面评价增加\n负面率: {report.negative_rate}%"
      )
```

### 输出

```
📊 某品牌 舆情分析报告

整体评价: 🟢 偏正面

统计:
  ✅ 正面: 156 (62%)
  ⚪ 中性: 68 (27%)
  ❌ 负面: 28 (11%)

负面评价关键词:
  - "发货慢" (5次)
  - "客服态度" (3次)
  - "质量问题" (2次)

📌 最近负面评价:
  小红书: "收到货发现有划痕..." (2小时前)
  微博: "售后体验太差了..." (5小时前)
```

---

## 场景 5: 学术文献采集

### 需求
采集 arXiv 上最新 AI 论文

### 实现

```yaml
# 学术采集任务
paper_collector:
  keywords: ["large language model", "diffusion", "reinforcement learning"]
  max_per_keyword: 10
  
  action: |
    results = []
    
    for keyword in keywords:
      # 1. 打开 arXiv
      url = f"https://arxiv.org/search/?searchtype=all&query={keyword}&max_results={max_per_keyword}"
      browser.open(url)
      
      # 2. 等待加载
      browser.act(kind="wait", selector=".arxiv-result", timeoutMs=10000)
      
      # 3. 提取论文信息
      papers = browser.evaluate(() => {
        return Array.from(document.querySelectorAll('.arxiv-result'))
          .map(paper => ({
            title: paper.querySelector('.title')?.textContent?.trim(),
            authors: Array.from(paper.querySelectorAll('.authors a'))
              .map(a => a.textContent),
            abstract: paper.querySelector('.abstract')?.textContent?.slice(0, 300),
            published: paper.querySelector('.dateline')?.textContent,
            link: paper.querySelector('.abs-title-link')?.href
          }));
      })
      
      results.push({
        keyword: keyword,
        papers: papers,
        count: len(papers)
      })
    
    # 保存
    save_json(f"学术/{date}.json", results)
    
    # 格式化输出
    message.send(
      to: "telegram:6020964033", 
      message: format_papers(results)
    )
```

### 输出

```
📚 arXiv 最新 AI 论文 (2026-04-04)

关键词: large language model (10篇)

1. "Emergent Abilities in Large Language Models"
   Authors: Wei et al.
   Published: 2026-04-03
   🔗 https://arxiv.org/abs/...

2. "Chain-of-Thought Prompting in LLMs"
   Authors: Liu et al.
   Published: 2026-04-02
   🔗 https://arxiv.org/abs/...

...
```
