# 墨析 CDP 工具箱

## 一、browser 工具概述

`browser` 是 OpenClaw 的核心浏览器控制工具，墨析仅依赖此工具实现所有采集能力。

**特点**：
- 基于 CDP (Chrome DevTools Protocol)
- 支持多 Profile
- 原生集成于 OpenClaw
- 零额外依赖

---

## 二、基础操作

### 2.1 打开页面

```yaml
browser.open(url, profile="openclaw"):
  - 功能: 打开任意 URL
  - 参数:
    - url: 目标地址
    - profile: 浏览器配置
  - 示例:
    browser.open("https://weibo.com/hot Flow")
    browser.open("https://zhihu.com/hot", profile="user")
```

### 2.2 页面快照

```yaml
browser.snapshot(targetId):
  - 功能: 获取页面结构
  - 输出: DOM 树 + 元素引用
  - 用途: 分析页面布局，发现数据容器
  - 示例:
    browser.snapshot()
```

**输出格式**：
```
<div role="main">
  <div aria-label="热搜列表">
    <div ref="1">热搜1</div>
    <div ref="2">热搜2</div>
  </div>
</div>
```

### 2.3 截图

```yaml
browser.screenshot(targetId, fullPage=true):
  - 功能: 页面截图
  - 选项: 全页/可视区域
  - 用途: 验证采集结果
  - 示例:
    browser.screenshot()
    browser.screenshot(fullPage=true)
```

---

## 三、网络拦截

### 3.1 拦截请求

```yaml
browser.intercept():
  - 功能: 拦截网络请求
  - 类型: XHR, Fetch
  - 用途: 发现 API 接口
  - 示例:
    browser.intercept()
```

### 3.2 获取响应体

```yaml
browser.responsebody(filter):
  - 功能: 获取响应内容
  - 参数: URL 过滤规则
  - 用途: 提取 JSON 数据
  - 示例:
    browser.responsebody("**/hotSearch**")
```

---

## 四、JavaScript 执行

### 4.1 执行 JS

```yaml
browser.evaluate(fn):
  - 功能: 在页面上下文执行 JavaScript
  - 用途: 提取动态数据、触发交互
  - 示例:
    browser.evaluate(() => document.title)
    browser.evaluate(() => window.__INITIAL_STATE__)
```

### 4.2 实用 JS 片段

```javascript
// 提取页面所有链接
() => Array.from(document.querySelectorAll('a')).map(a => ({
  text: a.textContent,
  href: a.href
}))

// 提取 JSON 数据
() => JSON.parse(document.querySelector('#__INITIAL_DATA__').textContent)

// 滚动并加载更多
() => {
  window.scrollTo(0, document.body.scrollHeight);
  return 'scrolled';
}

// 提取表格数据
() => Array.from(document.querySelectorAll('table tr')).map(row =>
  Array.from(row.querySelectorAll('td')).map(td => td.textContent)
)
```

---

## 五、元素交互

### 5.1 点击

```yaml
browser.act(targetId, kind="click", ref="1"):
  - 功能: 点击元素
  - 参数: 元素引用（来自 snapshot）
  - 示例:
    browser.act(kind="click", ref="1")
    browser.act(kind="click", ref="e12", doubleClick=true)
```

### 5.2 输入

```yaml
browser.act(kind="type", ref="23", text="关键词"):
  - 功能: 输入文字
  - 参数:
    - ref: 元素引用
    - text: 输入内容
  - 示例:
    browser.act(kind="type", ref="23", text="AI")
```

### 5.3 滚动

```yaml
browser.act(kind="scroll", y=1000):
  - 功能: 滚动页面
  - 参数:
    - y: 垂直滚动像素
  - 示例:
    browser.act(kind="scroll", y=500)
    browser.act(kind="scroll", y="bottom")
```

### 5.4 等待

```yaml
browser.act(kind="wait", selector=".content", timeoutMs=5000):
  - 功能: 等待元素或条件
  - 参数:
    - selector: CSS 选择器
    - timeoutMs: 超时
  - 示例:
    browser.act(kind="wait", selector="#loading", state="hidden")
    browser.act(kind="wait", timeoutMs=3000)
```

---

## 六、高级操作

### 6.1 文件上传

```yaml
browser.upload(targetId, ref, path):
  - 功能: 上传文件
  - 示例:
    browser.upload(ref="1", path="/tmp/file.pdf")
```

### 6.2 文件下载

```yaml
browser.download(targetId, ref, filename):
  - 功能: 下载文件
  - 示例:
    browser.download(ref="23", filename="report.pdf")
```

### 6.3 PDF 导出

```yaml
browser.pdf(targetId):
  - 功能: 导出页面为 PDF
  - 示例:
    browser.pdf()
```

---

## 七、状态管理

### 7.1 Cookie

```yaml
browser.cookies(action="get"):
  - 功能: 读取/设置/清除 Cookie
  - 示例:
    browser.cookies()
    browser.cookies(action="set", name="token", value="xxx")
    browser.cookies(action="clear")
```

### 7.2 Storage

```yaml
browser.storage(kind="local", action="get", key):
  - 功能: 操作 LocalStorage/SessionStorage
  - 示例:
    browser.storage(kind="local", action="get", key="user")
    browser.storage(kind="session", action="set", key="token", value="xxx")
```

### 7.3 离线模式

```yaml
browser.set.offline(enabled=true):
  - 功能: 设置离线模式
  - 示例:
    browser.set.offline(enabled=true)
```

### 7.4 地理位置

```yaml
browser.set.geo(latitude, longitude, accuracy):
  - 功能: 模拟地理位置
  - 示例:
    browser.set.geo(37.7749, -122.4194, 100)
```

---

## 八、Profile 配置

### 8.1 Profile 类型

| Profile | 说明 | 使用场景 |
|---------|------|----------|
| `openclaw` | OpenClaw 管理的独立浏览器 | 默认/隔离环境 |
| `user` | 用户的真实 Chrome（登录态） | 需要登录的采集 |

### 8.2 使用示例

```yaml
# 使用用户已登录的浏览器
browser.open("https://weibo.com", profile="user")

# 使用隔离的浏览器
browser.open("https://weibo.com", profile="openclaw")
```

---

## 九、墨析采集模板

### 模板 1: API 采集

```yaml
# 1. 打开页面
browser.open("https://weibo.com/hot Flow")

# 2. 拦截 API
browser.intercept()

# 3. 等待数据加载
browser.act(kind="wait", timeoutMs=3000)

# 4. 获取响应
browser.responsebody("**/hotSearch**")
```

### 模板 2: DOM 采集

```yaml
# 1. 打开页面
browser.open("https://weibo.com/hot Flow")

# 2. 分析结构
browser.snapshot()

# 3. 提取数据
browser.evaluate(() => {
  return Array.from(document.querySelectorAll('.hot-list .item'))
    .map(item => ({
      rank: item.querySelector('.rank')?.textContent,
      title: item.querySelector('.title')?.textContent
    }));
})
```

### 模板 3: 翻页采集

```yaml
# 1. 打开首页
browser.open("https://example.com/list")

# 2. 循环采集
for page in range(1, 10):
  # 采集当前页
  data = browser.evaluate(js_extract)
  
  # 翻页
  browser.act(kind="click", ref="next_button")
  browser.act(kind="wait", selector=".loading", state="hidden")
```

### 模板 4: 登录采集

```yaml
# 1. 使用用户浏览器（已登录）
browser.open("https://weibo.com", profile="user")

# 2. 验证登录态
is_logged_in = browser.evaluate(() => 
  document.querySelector('.user-info') !== null
)

# 3. 采集私有数据
if is_logged_in:
  browser.open("https://weibo.com/profile")
  # ... 采集逻辑
```

---

## 十、错误处理

### 常见错误

| 错误 | 原因 | 解决 |
|------|------|------|
| `browser timeout` | 页面加载慢 | 增加 wait 时间 |
| `element not found` | 选择器错误 | 重新 snapshot |
| `intercept failed` | 无网络请求 | 改用 DOM 采集 |
| `evaluate error` | JS 执行错误 | 检查 JS 语法 |

### 重试示例

```yaml
- name: "采集并重试"
  steps:
    - browser.open("https://example.com")
    - browser.snapshot()
    - name: "extract"
      try:
        - browser.evaluate(js_extract)
      catch:
        - browser.act(kind="wait", timeoutMs=2000)
        - retry: extract, times=3
```
