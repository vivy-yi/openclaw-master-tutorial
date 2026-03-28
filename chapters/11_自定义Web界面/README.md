# 第11章 自建Web控制界面

> **本章学习目标**: 掌握Web API和自定义界面开发
> **预计用时**: 60-90分钟
> **前置要求**: 完成基础部署

---

## 11.1 Web API使用

### 启用Web服务

```json
{
  "server": {
    "enabled": true,
    "port": 8080,
    "host": "0.0.0.0"
  }
}
```

### API端点

| 端点 | 方法 | 功能 |
|-----|-----|-----|
| /api/chat | POST | 发送消息 |
| /api/history | GET | 获取历史 |
| /api/config | GET | 获取配置 |

---

## 11.2 WebSocket实时通信

### 连接

```javascript
const ws = new WebSocket('ws://localhost:8080/ws');
ws.onmessage = (event) => {
  console.log(event.data);
};
```

---

## 11.3 自定义界面开发

### 示例：简单聊天界面

```html
<!DOCTYPE html>
<html>
<head>
  <title>OpenClaw Chat</title>
</head>
<body>
  <div id="messages"></div>
  <input type="text" id="input" />
  <button onclick="send()">发送</button>
  <script>
    // WebSocket连接代码
  </script>
</body>
</html>
```

---

## 本章小结

1. Web API：RESTful接口
2. WebSocket：实时通信
3. 自定义界面：HTML/CSS/JS
