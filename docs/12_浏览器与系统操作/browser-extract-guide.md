# Browser Extract 页面问答实战

> 🦉 教程大师出品 | 深度调研日期: 2026-07-26
> 
> **功能来源**: PR #113861 | **状态**: ✅ 已合并 (v2026.7.2)

---

## 一、概述

Browser Extract 是 OpenClaw v2026.7.2 引入的**页面问答功能**，允许用户对当前浏览器页面提出自然语言问题，系统自动提取页面内容并给出答案。

### 核心能力

| 能力 | 说明 |
|------|------|
| **智能提取** | AI 理解页面内容并回答问题 |
| **多格式支持** | 自动转换 HTML → Markdown |
| **子模型调用** | 专用小模型处理提取任务 |
| **超时控制** | 5-120 秒可配置超时 |

---

## 二、技术原理

### 2.1 工作流程

```
用户问题 → 页面捕获 → 内容转换 → AI 提取 → 答案返回
   │           │           │           │
   │      page.content()  sanitize   子模型
   │           ↓           ↓           ↓
   │        HTML源码   纯净HTML   Markdown
   │                       ↓
   │                 规范化文本
   │                       ↓
   │                 问题回答
```

### 2.2 处理步骤

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 页面捕获 | `Playwright page.content()` |
| 2 | HTML 净化 | `sanitizeHtml` 移除脚本和样式 |
| 3 | 格式转换 | `htmlToMarkdown` 转 Markdown |
| 4 | 文本规范 | `normalizeWhitespace` 规范化空白 |
| 5 | AI 提取 | 子模型分析并回答问题 |

---

## 三、使用方法

### 3.1 基本语法

```
browser.extract("<question>")
```

### 3.2 调用示例

#### 示例 1：提取页面标题

```
browser.extract("这个页面的标题是什么？")
```

**输出**:
```json
{
  "content": "页面标题内容",
  "metadata": {
    "url": "https://example.com",
    "chars": 1234,
    "truncated": false,
    "model": "gpt-4o-mini"
  }
}
```

#### 示例 2：提取关键数据

```
browser.extract("这篇文章的发布日期是什么？")
```

#### 示例 3：提取总结

```
browser.extract("用一句话总结这个页面的主要内容")
```

### 3.3 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `question` | string | ✅ | 自然语言问题 |
| `timeout` | number | ❌ | 超时秒数 (5-120s) |

### 3.4 高级用法

#### 带超时的提取

```
browser.extract("提取所有价格信息", { timeout: 90 })
```

#### 结合 snapshot 使用

```javascript
// 1. 先截取页面快照
browser.snapshot({ ref: "main" })

// 2. 基于快照提问
browser.extract("这个表格包含哪些数据？")
```

---

## 四、输出格式

### 4.1 成功响应

```json
{
  "content": "答案文本内容",
  "metadata": {
    "url": "https://example.com/page",
    "chars": 5432,
    "truncated": false,
    "model": "gpt-4o-mini"
  }
}
```

### 4.2 未找到响应

当页面中没有相关内容时：

```json
{
  "content": "NOT_FOUND",
  "metadata": {
    "url": "https://example.com/page",
    "chars": 1234,
    "truncated": false,
    "model": "gpt-4o-mini"
  }
}
```

### 4.3 截断响应

当页面内容超过限制时：

```json
{
  "content": "部分答案...",
  "metadata": {
    "url": "https://example.com/long-page",
    "chars": 80000,
    "truncated": true,
    "model": "gpt-4o-mini"
  }
}
```

---

## 五、限制说明

| 限制项 | 值 | 说明 |
|--------|-----|------|
| 输入上限 | 80k 字符 | 单次提取最大页面内容 |
| 默认超时 | 60 秒 | 可配置范围 5-120 秒 |
| 未找到 | `NOT_FOUND` | 页面无相关内容时的返回值 |

---

## 六、实际应用场景

### 6.1 自动化测试

```javascript
// 提取表单验证消息
const errorMsg = browser.extract("表单验证失败时的错误消息是什么？")
console.log(errorMsg.content)
```

### 6.2 数据采集

```javascript
// 从页面提取结构化数据
const prices = browser.extract("提取所有产品的价格信息")
```

### 6.3 内容审核

```javascript
// 检查页面内容合规性
const hasAdult = browser.extract("这个页面是否包含成人内容？")
```

### 6.4 价格监控

```javascript
// 监控电商页面价格变化
const price = browser.extract("当前商品的价格是多少？")
```

### 6.5 新闻提取

```javascript
// 提取新闻关键信息
const summary = browser.extract("总结这篇新闻的要点")
```

---

## 七、与 Snapshot 的对比

| 功能 | Browser Extract | Browser Snapshot |
|------|-----------------|------------------|
| **用途** | 问答 | 页面截取 |
| **输出** | 答案文本 | 页面结构 |
| **交互** | AI 理解 | 原始内容 |
| **适用** | 快速获取信息 | 结构化分析 |
| **响应速度** | 较快 | 即时 |

### 使用建议

- **需要答案** → 使用 `extract`
- **需要分析结构** → 使用 `snapshot`
- **两者结合** → 先 snapshot 再 extract

---

## 八、故障排查

### Issue 1: 提取结果为 NOT_FOUND

**原因**: 页面内容与问题不相关

**解决方案**:
1. 确认问题与页面内容相关
2. 尝试简化问题表述
3. 使用 `snapshot` 先查看页面内容

### Issue 2: 响应超时

**解决方案**:

```javascript
// 增加超时时间
browser.extract("复杂问题", { timeout: 120 })
```

### Issue 3: 内容被截断

**原因**: 页面内容超过 80k 字符限制

**解决方案**:
1. 缩小页面范围
2. 使用更精确的问题
3. 分多次提取

### Issue 4: 子模型调用失败

**排查步骤**:

```bash
# 1. 检查 API Key 配置
echo $OPENAI_API_KEY

# 2. 检查网络连接
ping api.openai.com

# 3. 查看详细日志
openclaw logs | grep -i extract
```

---

## 九、配置参考

### 9.1 子模型配置

```yaml
browser:
  extract:
    model: gpt-4o-mini  # 默认使用的小模型
    timeout: 60         # 默认超时(秒)
    max_chars: 80000    # 最大输入字符
```

### 9.2 代理配置

如需通过代理访问：

```yaml
browser:
  extract:
    proxy:
      server: http://proxy.example.com:8080
      bypass:
        - "*.internal.com"
```

---

## 十、测试用例

### 10.1 基础功能测试

```javascript
// 测试页面标题提取
const result = browser.extract("这个页面的 URL 是什么？")
console.assert(result.content.includes("http"), "Should contain URL")
```

### 10.2 完整测试套件

OpenClaw 提供了完整的测试用例：

- **146 个** extract 专项测试
- **2,040 个** 完整浏览器测试
- **覆盖**: 正常场景、边界条件、错误处理

---

## 十一、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v2026.7.2 | 2026-07-26 | ✅ 新增 Browser Extract 功能 |

---

## 十二、参考资源

| 资源 | 链接 |
|------|------|
| PR #113861 | https://github.com/openclaw/openclaw/pull/113861 |
| Playwright Docs | https://playwright.dev/docs/ |
| 内置工具文档 | `../reference/builtin_tools.md` |

---

🦉 **教程大师** | OpenClaw 官方教程
