# 第2章 10分钟快速部署

> **本章学习目标**: 在10分钟内完成OpenClaw首次部署
> **预计用时**: 10-30分钟
> **前置要求**: Node.js >= 22.0

---

## 2.1 部署方案选择

### 三种部署方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|-----|-----|---------|
| **本地部署** | 免费、隐私好 | 需要电脑一直开着 | 个人使用 |
| **Docker** | 部署简单、可移植 | 需要Docker基础 | 开发者 |
| **云服务器** | 24/7在线 | 需要服务器费用 | 生产环境 |

### 推荐方案

- **个人用户**: 本地部署 + 飞书/Telegram
- **团队用户**: 云服务器 + 企业微信

---

## 2.2 一键安装

### 环境检查

```bash
# 检查Node.js版本
node --version  # 需要 >= 22.0

# 检查npm
npm --version
```

### 安装命令

```bash
# 一键安装
npm install -g openclaw

# 验证安装
openclaw --version
```

---

## 2.3 首次配置

### 配置文件位置

```bash
# 创建配置目录
mkdir -p ~/.openclaw

# 创建配置文件
touch ~/.openclaw/openclaw.json
```

### 最小配置示例

```json
{
  "model": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "apiKey": "your-api-key"
  },
  "channels": {
    "cli": {
      "enabled": true
    }
  }
}
```

### 启动OpenClaw

```bash
# 启动
openclaw

# 或者后台运行
openclaw &
```

---

## 2.4 验证部署

### 发送第一条消息

```
>>> 你好，请介绍一下自己

你好！我是OpenClaw，一个运行在你设备上的AI助手...
```

### 常见问题排查

| 问题 | 原因 | 解决方法 |
|-----|-----|---------|
| 命令找不到 | 没安装成功 | 重新执行 npm install |
| API错误 | key不正确 | 检查openclaw.json配置 |
| 端口占用 | 18789被占 | 更改端口或关闭占用程序 |

---

## 本章小结

1. 三种部署方案：本地/Docker/云服务器
2. 一键安装：`npm install -g openclaw`
3. 最小配置只需 model 和 channels 两项
4. 启动后即可开始对话

---

## 补充教程资源

> 以下来自社区整理的高质量教程，可作为本章补充学习材料：

| 教程 | 来源 | 特点 |
|------|------|------|
| [OpenClaw 新手入门手册（CSDN）](https://agent.csdn.net/69b37bfa7bbde9200ba0a052.html) | CSDN | 系统化入门路径 |
| [10分钟快速安装与配置（博客园）](https://www.cnblogs.com/gdutxiaoxu/p/19675485) | 博客园 | 快速上手 |
| [全场景超详细OpenClaw实操指南（米豆学社）](https://www.midou55.com/123791.html) | 米豆学社 | 覆盖场景最全 |
| [OpenClaw新手必看！从零到精通（B站）](https://www.bilibili.com/read/cv45574675) | B站视频 | 视频教程 |
| [3.2万字系统化教程（知乎）](https://zhuanlan.zhihu.com/p/2015027745743189513) | 知乎 | 深度全面 |
| [OpenClaw走红背后：Agent与团队协作（36氪）](https://m.36kr.com/p/3718202953037191) | 36氪 | 行业视角+趋势分析 |

## 入门路径推荐

```
新手推荐学习顺序：
  ① 知乎3.2万字教程（建立全局认知）
  ② 米豆学社实操指南（深度操作）
  ③ 博客园10分钟指南（快速验证）
  ④ B站视频（辅助理解）
  ⑤ 本章官方文档（权威参考）
```
