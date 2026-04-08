# 05 渠道集成

> **本章学习目标**：掌握 OpenClaw 的多渠道接入能力，包括国内平台（飞书/钉钉/企业微信/QQ）、国际平台（Telegram/Discord/Slack/WhatsApp/Signal/LINE/Microsoft Teams）以及 Webhook 自定义通道。
> **预计用时**：60-90 分钟
> **前置要求**：完成基础部署

---

## 内容导航

### 基础

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [5.1](./5.1_渠道系统概述.md) | 渠道系统概述 | 15分钟 |
| [5.2](./5.2_中国平台概述.md) | 中国平台集成总览 | 15分钟 |

### 中国平台

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [5.3](./5.3_飞书集成.md) | 飞书集成 | 30分钟 |
| [5.4](./5.4_钉钉集成.md) | 钉钉集成 | 30分钟 |
| [5.5](./5.5_企业微信集成.md) | 企业微信集成 | 30分钟 |
| [5.6](./5.6_QQ集成.md) | QQ 集成 | 25分钟 |

### 国际平台

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [5.7](./5.7_Telegram集成.md) | Telegram 集成 | 25分钟 |
| [5.8](./5.8_Discord集成.md) | Discord 集成 | 20分钟 |
| [5.9](./5.9_Slack集成.md) | Slack 集成 | 20分钟 |
| [5.10](./5.10_WhatsApp集成.md) | WhatsApp 集成 | 25分钟 |
| [5.11](./5.11_Signal集成.md) | Signal 集成 | 20分钟 |
| [5.12](./5.12_LINE集成.md) | LINE 集成 | 20分钟 |
| [5.13](./5.13_Microsoft_Teams集成.md) | Microsoft Teams 集成 | 35分钟 |

### 进阶

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [5.14](./5.14_Webhook配置.md) | Webhook 配置 | 25分钟 |
| [5.15](./5.15_自定义通道.md) | 自定义通道开发 | 20分钟 |

---

## 学习目标

完成本章后，你将能够：

- ✅ 理解 OpenClaw 渠道系统架构
- ✅ 接入国内主流平台（飞书/钉钉/企业微信/QQ）
- ✅ 接入国际平台（Telegram/Discord/Slack/WhatsApp/Signal/LINE/Teams）
- ✅ 配置 Webhook 实现事件驱动
- ✅ 开发自定义渠道适配器

## 核心概念

```
渠道 (Channel)  = 用户消息入口
       ↓
    Gateway     = 统一接入层，负责协议转换和消息路由
       ↓
     Agent      = 业务逻辑处理
       ↓
    Binding     = 消息 → Agent 的路由规则
```

## 渠道分类

### 按地域

| 分类 | 平台 |
|------|------|
| 中国平台 | 飞书、钉钉、企业微信、QQ |
| 国际平台 | Telegram、Discord、Slack、WhatsApp、Signal、LINE、Teams |

### 按协议类型

| 类型 | 平台 | 说明 |
|------|------|------|
| Bot API | Telegram、Discord、Slack、飞书 | 基于官方 Bot/Webhook 协议 |
| WhatsApp Business API | WhatsApp | 需要官方 Business 账号 |
| 端到端加密 | Signal | 安全性优先 |
| 即时通讯 | 企业微信、钉钉、QQ | 国内企业场景 |
| 协作平台 | Microsoft Teams、Slack | 企业办公套件 |

---

## 快速导航

- [上一章：04 模型配置 →](../04_模型配置/)
- [下一章：06 上下文与记忆 →](../06_上下文与记忆/)
- [文档总览 →](../)

## 补充资源

- [OpenClaw 官方渠道文档](https://docs.openclaw.ai/channels)
- [飞书开放平台](https://open.feishu.cn/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Microsoft Bot Framework](https://docs.microsoft.com/en-us/azure/bot-service/)

---

**最后更新**：2026-04-06（由 Tutorial Master Skill 整理合并）
