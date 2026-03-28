# 第6章 浏览器与网络操作

> **本章学习目标**: 掌握Playwright浏览器控制和网络请求
> **预计用时**: 60-90分钟
> **前置要求**: 完成基础部署

---

## 6.1 Playwright浏览器控制

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

### HTTP请求

```
GET https://api.example.com/data
POST https://api.example.com/submit --data '{"key": "value"}'
```

### API集成

支持RESTful API、Webhook等。

---

## 本章小结

1. 浏览器控制：Playwright实现自动化
2. 网络请求：GET/POST等HTTP方法
3. 场景：数据抓取、表单提交
