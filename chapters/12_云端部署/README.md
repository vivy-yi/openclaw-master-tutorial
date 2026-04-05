# 第12章 云端部署方案

> **本章学习目标**: 掌握各云平台部署方案
> **预计用时**: 45-60分钟
> **前置要求**: 完成基础部署

---

## 12.1 主流云平台对比

| 平台 | 价格 | 易用性 | 推荐场景 |
|-----|-----|-----|---------|
| 腾讯云轻量 | 20元/月 | ⭐⭐⭐⭐ | 国内用户 |
| 火山引擎 | 9.9元/月 | ⭐⭐⭐⭐ | 性价比 |
| 阿里云ECS | 30元+/月 | ⭐⭐⭐ | 高性能 |
| AWS | $10+/月 | ⭐⭐⭐ | 国际化 |

---

## 12.2 Docker 部署

### 安装 Docker

```bash
# Ubuntu
curl -fsSL https://get.docker.com | sh

# 启动
sudo systemctl start docker
```

### 核心架构与原理

| 文档 | 主题 | 说明 |
|------|------|------|
| [OpenClaw Docker 部署 Agent 原理与架构](./OpenClaw_Docker部署Agent原理与架构.md) | 深度原理 | Gateway 架构、Agent Loop、Sandbox 机制、多 Agent 路由 |

### 运行OpenClaw

```bash
docker run -d \
  -v ~/.openclaw:/root/.openclaw \
  -p 18789:18789 \
  openclaw/openclaw:latest
```

---

## 12.3 一键部署脚本

### 腾讯云脚本

```bash
#!/bin/bash
# 腾讯云一键部署脚本
```

---

## 本章小结

1. 平台选择：腾讯云、火山引擎、阿里云
2. Docker：容器化部署
3. 一键脚本：快速部署
