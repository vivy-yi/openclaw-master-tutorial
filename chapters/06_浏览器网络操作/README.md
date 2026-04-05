# 第6章 浏览器与网络操作

> **本章学习目标**: 掌握 Playwright 浏览器控制、网络请求，以及 Browser Use AI 自动化
> **预计用时**: 90-120 分钟
> **前置要求**: 完成基础部署

---

## 6.1 Playwright 浏览器控制

### 启用浏览器

```json
{
  "browser": {
    "enabled": true,
    "headless": false
  }
}
```

### 常用操作

```
打开 https://example.com
截图
填写表单并提交
```

---

## 6.2 网络请求

### HTTP 请求

```
GET https://api.example.com/data
POST https://api.example.com/submit --data '{"key": "value"}'
```

### API 集成

支持 RESTful API、Webhook 等。

---

## 6.3 Browser Use — AI Agent 网页自动化 🆕

### 核心概念

Browser Use 是 AI Agent 驱动的新一代浏览器自动化工具，让 AI 自主理解网页、执行操作，而非依赖固定脚本。

📖 **详细内容**：[browser-use-教程.md](browser-use-教程.md)

包含：
- Browser Use 核心原理
- 安装与配置
- 基础使用示例
- OpenClaw 集成方式
- 多模型支持
- 常见问题处理

---

## 本章小结

1. 浏览器控制：Playwright 实现自动化
2. 网络请求：GET/POST 等 HTTP 方法
3. **Browser Use**：AI Agent 驱动的自主网页自动化（85.7k ⭐ 新工具）
4. 场景：数据抓取、表单提交、智能采集
