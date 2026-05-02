# DigitalOcean 部署 OpenClaw 完全指南

> 官方出品 · App Platform · 容器化部署
> **Stars: 63 | 方案: App Platform + Terraform**

---

## 一、方案概述

### 为什么选择 DigitalOcean

| 项目 | 说明 |
|------|------|
| **价格** | $4/月 起（学生 $200/年） |
| **特点** | 官方出品，App Platform 原生支持 |
| **部署方式** | 容器化，一键部署 |
| **管理** | Web 控制台，简单易用 |

### 可用方案

| 项目 | Stars | 类型 | 特点 | 推荐度 |
|------|-------|------|------|--------|
| [digitalocean-labs/openclaw-appplatform](https://github.com/digitalocean-labs/openclaw-appplatform) | ⭐63 | App Platform | 官方出品，容器化 | ⭐⭐⭐⭐⭐ |
| [Goodsmileduck/openclaw-deploy-do](https://github.com/Goodsmileduck/openclaw-deploy-do) | ⭐1 | Terraform + Ansible | 基础设施代码化 | ⭐⭐⭐ |
| DisierTECH OpenClaw Stack | ⭐3 | 多云 | 含 DO 部署指南 | ⭐⭐⭐⭐ |

---

## 二、App Platform 一键部署（推荐）

### 部署架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    DigitalOcean App Platform                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Web Container                                             │ │
│  │  ├── s6-overlay (进程管理)                                 │ │
│  │  ├── Ubuntu 24.04 + Node.js LTS                           │ │
│  │  ├── OpenClaw Gateway (:18789)                            │ │
│  │  └── SSH Server (可选)                                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                           │                                        │
│                           ▼                                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Access Layer (三选一)                                      │ │
│  │  ├── Stage 1: doctl apps console (仅 CLI)                  │ │
│  │  ├── Stage 2: ngrok (公网访问 UI)                          │ │
│  │  └── Stage 3: Tailscale (私有网络)                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 部署步骤

```bash
# 1. 点击一键部署
# https://cloud.digitalocean.com/apps/new?repo=https://github.com/digitalocean-labs/openclaw-appplatform/tree/main

# 2. 在 DO Console 中配置
# - 选择区域 (新加坡/纽约等)
# - 设置实例大小
# - 配置环境变量

# 3. 部署完成
```

### 应用配置 (app.yaml)

```yaml
# app.yaml
name: openclaw
region: singapore  # 或 nyc, ams 等

services:
  - name: web
    github:
      repo: digitalmars-labs/openclaw-appplatform
      branch: main
      deploy_on_push: true
    build_command: |
      # 无需构建，使用预构建镜像
    run_command: |
      # 启动命令
    environment_slug: node-js
    instance_size_slug: apps-s-1vcpu-2gb  # 最小 1CPU 2GB
    http_port: 18789
    health_check:
      path: /healthz
    envs:
      - key: OPENCLAW_GATEWAY_TOKEN
        value: your-secure-token
        type: SECRET
      - key: NODE_ENV
        value: production

# 可选：添加 ngrok 访问 Web UI
static_sites:
  - name: ngrok
    github:
      repo: your-repo/ngrok-tunnel
    ...
```

---

## 三、多阶段部署

### Stage 1: CLI Only（基础）

```bash
# 克隆并部署
git clone https://github.com/digitalocean-labs/openclaw-appplatform
cd openclaw-appplatform

# 创建应用
doctl apps create --spec app.yaml

# 获取应用 ID
doctl apps list

# 访问 CLI
doctl apps console <app-id>

# 在 CLI 中初始化 OpenClaw
openclaw onboard
```

### Stage 2: Web UI + ngrok

```bash
# 在 app.yaml 中启用 ngrok
envs:
  - key: ENABLE_NGROK
    value: "true"
  - key: NGROK_AUTHTOKEN
    value: your-ngrok-token
    type: SECRET
  - key: NGROK_REGION
    value: ap  # 亚太区域
```

```yaml
# 完整配置
services:
  - name: openclaw
    github:
      repo: digitalmars-labs/openclaw-appplatform
      branch: main
    instance_size_slug: apps-s-1vcpu-2gb
    http_port: 18789
    envs:
      - key: OPENCLAW_GATEWAY_TOKEN
        value: your-token
        type: SECRET
      - key: ENABLE_NGROK
        value: "true"
      - key: NGROK_AUTHTOKEN
        value: your-ngrok-token
        type: SECRET
```

### Stage 3: Tailscale 私有网络

```bash
# 配置 Tailscale
envs:
  - key: TAILSCALE_ENABLE
    value: "true"
  - key: TAILSCALE_AUTHKEY
    value: your-auth-key
    type: SECRET
  - key: TAILSCALE_HOSTNAME
    value: openclaw-agent
```

```yaml
# Tailscale 网络配置
services:
  - name: openclaw
    github:
      repo: digitalmars-labs/openclaw-appplatform
      branch: main
    instance_size_slug: apps-s-1vcpu-2gb
    http_port: 18789
    envs:
      - key: TAILSCALE_ENABLE
        value: "true"
      - key: TAILSCALE_AUTHKEY
        value: your-auth-key
        type: SECRET
      - key: TAILSCALE_HOSTNAME
        value: openclaw-agent
```

---

## 四、持久化存储

### 添加 DO Spaces

```yaml
# 添加持久化存储
assign_alias: openclaw

databases:
  - name: openclaw-db
    engine: PG
    version: "15"
    size_slug: db-s-dev-database
    node_count: 1

volumes:
  - name: openclaw-data
    size_gb: 10
    mount_path: /root/.openclaw
```

### 完整配置示例

```yaml
name: openclaw
region: singapore

services:
  - name: openclaw
    github:
      repo: digitalmars-labs/openclaw-appplatform
      branch: main
    instance_size_slug: apps-s-2vcpu-4gb
    http_port: 18789
    health_check:
      path: /healthz
    envs:
      - key: OPENCLAW_GATEWAY_TOKEN
        value: your-token
        type: SECRET
      - key: ENABLE_NGROK
        value: "true"
    volumes:
      - volume_name: openclaw-data
        mount_path: /root/.openclaw

databases:
  - name: openclaw-db
    engine: PG
    version: "15"
    size_slug: db-s-dev-database
```

---

## 五、Terraform 部署

### 前置要求

```bash
# 安装 Terraform
brew install terraform

# 安装 doctl
brew install doctl

# 认证
doctl auth init
```

### Terraform 配置

```hcl
# main.tf
provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "openclaw" {
  spec {
    name   = "openclaw"
    region = "singapore"

    service {
      name               = "openclaw"
      instance_size_slug = "apps-s-1vcpu-2gb"
      instance_count     = 1
      github {
        repo           = "digitalmars-labs/openclaw-appplatform"
        branch         = "main"
        deploy_on_push = true
      }
      http_port = 18789
      env {
        key    = "OPENCLAW_GATEWAY_TOKEN"
        value  = var.gateway_token
        type   = "SECRET"
      }
      health_check {
        path = "/healthz"
      }
    }
  }
}

variable "do_token" {
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "gateway_token" {
  description = "OpenClaw Gateway Token"
  sensitive   = true
}

output "app_url" {
  value = digitalocean_app.openclaw.live_url
}

output "app_id" {
  value = digitalocean_app.openclaw.id
}
```

```bash
# 初始化
terraform init

# 部署
terraform plan -var "do_token=$DO_TOKEN" -var "gateway_token=$GATEWAY_TOKEN"
terraform apply -var "do_token=$DO_TOKEN" -var "gateway_token=$GATEWAY_TOKEN"

# 查看输出
terraform output
```

---

## 六、Ansible 部署

### 基础设施代码化

```bash
# 克隆仓库
git clone https://github.com/Goodsmileduck/openclaw-deploy-do
cd openclaw-deploy-do

# 安装依赖
brew install ansible
brew install terraform

# 配置
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# 编辑 terraform.tfvars

# 部署
make deploy
```

### Ansible 配置

```yaml
# ansible/playbook.yml
- hosts: openclaw
  become: yes
  vars:
    openclaw_version: latest
    openclaw_user: openclaw

  tasks:
    - name: Install Node.js
      shell: |
        curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
        apt-get install -y nodejs

    - name: Install OpenClaw
      npm:
        name: openclaw
        global: yes

    - name: Create OpenClaw user
      user:
        name: "{{ openclaw_user }}"
        system: yes
        create_home: yes

    - name: Configure OpenClaw service
      template:
        src: openclaw.service.j2
        dest: /etc/systemd/system/openclaw.service
      notify: restart openclaw

    - name: Start OpenClaw
      systemd:
        name: openclaw
        state: started
        enabled: yes

  handlers:
    - name: restart openclaw
      systemd:
        name: openclaw
        state: restarted
```

---

## 七、Docker Compose 本地开发

### 开发环境

```yaml
# docker-compose.yml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "18789:18789"
    volumes:
      - ./data:/root/.openclaw
    environment:
      - OPENCLAW_GATEWAY_TOKEN=dev-token
    restart: unless-stopped
    networks:
      - openclaw-net

networks:
  openclaw-net:
    driver: bridge
```

```bash
# 启动
docker compose up -d

# 查看日志
docker compose logs -f

# 访问
open http://localhost:18789
```

---

## 八、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 部署失败 | 镜像构建超时 | 增加实例规格 |
| 连接超时 | 端口未开放 | 检查 App Platform 端口配置 |
| 内存不足 | 实例太小 | 升级到 2CPU 4GB |
| Token 错误 | 环境变量未设置 | 在 Console 中配置 SECRET |

### 检查日志

```bash
# App Platform 日志
doctl apps logs <app-id>

# 查看最近日志
doctl apps logs <app-id> --follow

# 特定组件日志
doctl apps logs <app-id> --component web
```

---

## 九、成本说明

| 资源 | 价格 | 说明 |
|------|------|------|
| Basic Droplet | $4/月 | 1CPU 1GB 25GB |
| Starter App | Free | 静态站点 |
| App Platform | $5-50/月 | 按需付费 |
| Spaces (S3) | $5/月 | 250GB |

### 推荐配置

| 场景 | 配置 | 价格 |
|------|------|------|
| 尝鲜 | App Platform 1CPU 1GB | $5/月 |
| 开发 | App Platform 2CPU 2GB | $10/月 |
| 生产 | App Platform 2CPU 4GB | $20/月 |

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| DigitalOcean 注册 | https://www.digitalocean.com |
| openclaw-appplatform | https://github.com/digitalmars-labs/openclaw-appplatform |
| openclaw-deploy-do | https://github.com/Goodsmileduck/openclaw-deploy-do |
| 学生包 | https://education.github.com |

---

*文档版本: 2026-04-21*