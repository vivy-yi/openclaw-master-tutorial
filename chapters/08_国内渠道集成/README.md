# 第8章 国内渠道集成

> **本章学习目标**: 掌握飞书、企业微信、钉钉配置
> **预计用时**: 45-60分钟
> **前置要求**: 完成基础部署

---

## 8.1 飞书应用配置

### 创建应用

1. 前往 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 App ID 和 App Secret

### 配置权限

需要开启的权限：
- 接收消息
- 发送消息
- 读取用户信息

### OpenClaw配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "your-app-id",
      "appSecret": "your-app-secret",
      "verificationToken": "your-verification-token"
    }
  }
}
```

---

## 8.2 企业微信配置

### 创建企业微信应用

1. 登录企业微信管理后台
2. 创建自建应用
3. 获取AgentId和Secret

### OpenClaw配置

```json
{
  "channels": {
    "wechatwork": {
      "enabled": true,
      "corpId": "your-corp-id",
      "agentId": "your-agent-id",
      "secret": "your-secret"
    }
  }
}
```

---

## 8.3 钉钉机器人

### 创建机器人

1. 打开钉钉群设置
2. 添加群机器人
3. 获取Webhook地址

### OpenClaw配置

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx"
    }
  }
}
```

---

## 本章小结

1. 飞书：企业自建应用模式
2. 企业微信：Agent模式
3. 钉钉：Webhook机器人
