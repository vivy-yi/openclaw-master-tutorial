# 1Panel 集成部署 OpenClaw 完全指南

> 国产开源 · 可视化面板 · 原生集成 Ollama + OpenClaw
> **Stars: 63k | 特点: 一键安装，可视化管理**

---

## 一、方案概述

### 为什么选择 1Panel

| 特点 | 说明 |
|------|------|
| **国产开源** | 完全国产，社区活跃 |
| **原生集成** | OpenClaw + Ollama 一键安装 |
| **可视化** | Web 界面，操作简单 |
| **多功能** | 主机管理 + Docker + AI Agent |

### 1Panel 特点

```
┌─────────────────────────────────────────────────────────────────┐
│                         1Panel 功能                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🖥️ 主机管理                                                   │
│     ├── 文件管理                                                │
│     ├── 进程管理                                                │
│     ├── 计划任务                                                │
│     └── 日志查看                                                │
│                                                                  │
│  🐳 Docker 管理                                                │
│     ├── 镜像管理                                                │
│     ├── 容器管理                                                │
│     ├── 编排管理                                                │
│     └── 网络管理                                                │
│                                                                  │
│  🤖 AI Agent 集成                                              │
│     ├── OpenClaw 一键部署                                      │
│     ├── Ollama 本地模型                                        │
│     └── Agent 可视化管理                                       │
│                                                                  │
│  🌐 网站管理                                                   │
│     ├── Nginx / Caddy                                          │
│     ├── SSL 证书                                               │
│     └── 反向代理                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、安装 1Panel

### 环境要求

| 项目 | 要求 |
|------|------|
| 系统 | Ubuntu 20.04+ / Debian 11+ / CentOS 7+ |
| CPU | 1核+ |
| 内存 | 2GB+ |
| 磁盘 | 10GB+ |

### 一键安装

```bash
# 方式一：一键脚本
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && bash quick_start.sh

# 方式二：国内镜像
curl -sSL https://1panel.cn/1panel-package/quick_start.sh -o quick_start.sh && bash quick_start.sh
```

### 安装输出

```
正在下载 1Panel 最新版本...
正在安装 1Panel...
正在启动 1Panel 服务...

🎉 1Panel 安装成功！

请访问以下地址登录 1Panel：
   - 本地地址：http://localhost:18789
   - 网络地址：http://你的服务器IP:18789

默认账号：admin
默认密码：[随机生成]

请务必记住默认密码！
```

---

## 三、OpenClaw 一键部署

### 通过 1Panel 应用商店

```bash
# 在 1Panel Web 界面中：
# 1. 打开「应用商店」
# 2. 搜索「OpenClaw」
# 3. 点击「一键部署」
# 4. 配置参数
# 5. 点击「确认」
```

### 应用配置

```yaml
# 1Panel OpenClaw 配置
image: openclaw/openclaw:latest
container_name: openclaw

# 端口映射
ports:
  - "18789:18789"

# 数据持久化
volumes:
  - ./openclaw:/root/.openclaw

# 环境配置
environment:
  - TZ=Asia/Shanghai

# 重启策略
restart: unless-stopped
```

### 详细步骤

```
1Panel Web 界面
    │
    ├──「应用商店」
    │     │
    │     └──🔍 搜索 "openclaw"
    │         │
    │         └──📦 OpenClaw AI Agent
    │              │
    │              ├──「安装」
    │              │     │
    │              │     ├── 选择「最新版本」
    │              │     │
    │              │     ├── 配置端口：「18789」
    │              │     │
    │              │     ├── 配置数据目录
    │              │     │
    │              │     └── 点击「确认」
    │              │
    │              └──「管理」
    │                    │
    │                    ├──「日志」- 查看运行日志
    │                    ├──「重启」- 重启服务
    │                    └──「卸载」- 卸载应用
```

---

## 四、Ollama 集成部署

### 1Panel + Ollama + OpenClaw

```
┌─────────────────────────────────────────────────────────────────┐
│                    1Panel 集成架构                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      1Panel Web UI                          │ │
│  │                    http://your-ip:18789                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                           │                                        │
│         ┌─────────────────┼─────────────────┐                    │
│         ▼                 ▼                 ▼                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  OpenClaw   │  │   Ollama    │  │   Nginx     │            │
│  │  Gateway    │  │   Server    │  │  (反向代理)  │            │
│  │  :18789     │  │  :11434     │  │   :80      │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Ollama 一键部署

```bash
# 在 1Panel 中：
# 1. 打开「应用商店」
# 2. 搜索「Ollama」
# 3. 点击「一键部署」
```

### 拉取模型

```bash
# 进入 OpenClaw 容器
docker exec -it openclaw bash

# 拉取模型
ollama pull llama3.2
ollama pull nomic-embed-text

# 查看已安装模型
ollama list
```

---

## 五、反向代理配置

### 通过 1Panel 配置

```
1Panel Web 界面
    │
    ├──「网站」
    │     │
    │     └──「创建网站」
    │           │
    │           ├──「反向代理」
    │           │
    │           ├── 域名：openclaw.your-domain.com
    │           │
    │           ├── 代理地址：http://127.0.0.1:18789
    │           │
    │           └── 点击「确认」
    │
    └──「SSL」
          │
          └──「申请证书」
                │
                ├── 域名：openclaw.your-domain.com
                │
                └── 选择「Let's Encrypt」
```

### Nginx 手动配置

```nginx
# /etc/nginx/sites-available/openclaw
server {
    listen 80;
    server_name openclaw.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL 证书配置

```nginx
# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name openclaw.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/openclaw.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/openclaw.your-domain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 六、Docker 可视化管理

### 1Panel Docker 功能

| 功能 | 说明 |
|------|------|
| **镜像管理** | 搜索/拉取/删除镜像 |
| **容器管理** | 创建/启动/停止/删除容器 |
| **编排管理** | Docker Compose 可视化 |
| **网络管理** | 创建/配置 Docker 网络 |
| **卷管理** | 管理数据卷 |

### OpenClaw 容器管理

```
1Panel Web 界面
    │
    ├──「容器」
    │     │
    │     └── openclaw
    │           │
    │           ├──「概览」
    │           │     ├── 状态：运行中
    │           │     ├── 镜像：openclaw/openclaw:latest
    │           │     ├── 创建时间：2026-04-21
    │           │     └── 端口：18789
    │           │
    │           ├──「日志」
    │           │     └── 实时查看容器日志
    │           │
    │           ├──「终端」
    │           │     └── 进入容器命令行
    │           │
    │           ├──「重启」
    │           │     └── 重启容器
    │           │
    │           └──「设置」
    │                 ├── 环境变量
    │                 ├── 端口映射
    │                 └── 挂载卷
```

---

## 七、备份与恢复

### 1Panel 备份功能

```
1Panel Web 界面
    │
    ├──「备份」
    │     │
    │     ├──「备份账户」
    │     │     ├── S3
    │     │     ├── 阿里云 OSS
    │     │     ├── 腾讯云 COS
    │     │     └── 本地
    │     │
    │     └──「备份记录」
    │           │
    │           └── OpenClaw 数据
    │                 ├── 配置
    │                 ├── 记忆
    │                 └── 技能
```

### 备份脚本

```bash
#!/bin/bash
# openclaw-backup.sh

BACKUP_DIR="/opt/backup/openclaw"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="openclaw_backup_${DATE}.tar.gz"

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 备份 OpenClaw 数据
tar -czf ${BACKUP_DIR}/${BACKUP_FILE} \
    -C ~ .openclaw

# 删除 7 天前的备份
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: ${BACKUP_DIR}/${BACKUP_FILE}"
```

---

## 八、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 无法访问 1Panel | 端口未开放 | 检查防火墙，开放 18789 端口 |
| OpenClaw 无法启动 | 配置错误 | 检查容器日志 |
| 端口冲突 | 18789 被占用 | 修改端口映射 |
| 无法拉取镜像 | 网络问题 | 配置 Docker 镜像加速 |

### 检查日志

```bash
# 1Panel 日志
tail -f /var/log/1panel/1panel.log

# OpenClaw 容器日志
docker logs -f openclaw

# Docker 日志
journalctl -u docker -f
```

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| 1Panel 官网 | https://1panel.cn |
| 1Panel GitHub | https://github.com/1Panel-dev/1Panel |
| OpenClaw 官网 | https://openclaw.ai |
| OpenClaw GitHub | https://github.com/openclaw/openclaw |

---

*文档版本: 2026-04-21*