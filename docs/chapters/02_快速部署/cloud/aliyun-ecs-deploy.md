# 阿里云 ECS 部署 OpenClaw

> 云服务器 ECS · 品牌保障 · 生态完善

---

## 一、方案概述

### 为什么选择阿里云 ECS

| 项目 | 说明 |
|------|------|
| **价格** | ¥30/月起 |
| **特点** | 品牌保障、稳定性高、生态完善 |
| **适用** | 企业用户、长期项目 |
| **备案** | 需要备案 |

### 推荐配置

| 配置 | CPU | 内存 | 磁盘 | 价格 |
|------|-----|------|------|------|
| 入门版 | 1核 | 1GB | 40GB SSD | ¥30/月 |
| 基础版 | 2核 | 2GB | 40GB SSD | ¥68/月 |
| 进阶版 | 2核 | 4GB | 60GB SSD | ¥106/月 |
| 高性能版 | 4核 | 8GB | 100GB SSD | ¥209/月 |

---

## 二、购买与初始化

### 1. 购买服务器

```
1. 访问 https://www.aliyun.com
2. 进入「云服务器 ECS」
3. 选择「立即购买」
4. 配置：
   - 地域：华东1（杭州）/ 华北2（北京）
   - 实例规格：ecs.t5-lc2m1.nano（入门）
   - 镜像：Ubuntu 22.04 LTS
   - 存储：40GB SSD
   - 带宽：按量付费或固定带宽
5. 设置实例密码
6. 完成购买
```

### 2. 登录服务器

```bash
# Mac/Linux 使用 SSH
ssh root@你的服务器IP

# Windows 使用 PowerShell
ssh root@你的服务器IP
```

### 3. 基础配置

```bash
# 更新系统
apt update && apt upgrade -y

# 安装必要工具
apt install -y curl wget vim git
```

---

## 三、Docker 安装（阿里云镜像加速）

### 方法一：官方脚本（后配置镜像）

```bash
# 官方安装脚本
curl -fsSL https://get.docker.com | sh

# 启动 Docker
systemctl enable docker
systemctl start docker
```

### 方法二：阿里云镜像安装（推荐）

```bash
# 安装必要依赖
apt update
apt install -y apt-transport-https ca-certificates curl gnupg

# 添加阿里云 Docker 镜像源
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动
systemctl enable docker
systemctl start docker
```

### 配置 Docker 镜像加速

```bash
# 创建配置目录
mkdir -p /etc/docker

# 配置阿里云镜像加速
cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://registry.cn-shanghai.aliyuncs.com",
        "https://registry.cn-hangzhou.aliyuncs.com",
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.ustc.edu.cn"
    ],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    }
}
EOF

# 重启 Docker
systemctl daemon-reload
systemctl restart docker

# 验证
docker info | grep "Registry Mirrors" -A 10
```

---

## 四、OpenClaw 安装

### 创建目录

```bash
# 创建 OpenClaw 数据目录
mkdir -p ~/.openclaw
mkdir -p ~/.openclaw/workspaces
mkdir -p ~/.openclaw/skills
mkdir -p ~/.openclaw/memory
```

### 创建 docker-compose.yml

```bash
cd ~/.openclaw

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    ports:
      - "18789:18789"
    volumes:
      - ~/.openclaw:/root/.openclaw
    environment:
      - TZ=Asia/Shanghai
      - NODE_ENV=production
    restart: unless-stopped
    network_mode: host
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

networks:
  default:
    driver: bridge
EOF
```

### 拉取镜像并启动

```bash
# 拉取镜像
cd ~/.openclaw
docker compose pull

# 启动
docker compose up -d

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f
```

---

## 五、配置安全组

### 阿里云控制台

```
1. 登录阿里云控制台
   https://ecs.console.aliyun.com

2. 进入「实例」
   └── 选择你的实例

3. 点击「安全组」
   └── 配置规则：
       - 协议：TCP
       - 端口：18789
       - 授权对象：0.0.0.0/0

4. 保存规则
```

### 常用端口

| 端口 | 用途 | 备注 |
|------|------|------|
| 22 | SSH | 默认已开放 |
| 80 | HTTP | Web 服务 |
| 443 | HTTPS | SSL |
| 18789 | OpenClaw | 需手动开放 |

---

## 六、域名与备案

### 备案说明

```
阿里云服务器需要备案才能访问公网：
- 备案地址：https://beian.aliyun.com
- 备案时间：7-20个工作日
- 备案后可以绑定域名访问
```

### Nginx 反向代理

```bash
# 安装 Nginx
apt install -y nginx

# 创建配置
cat > /etc/nginx/sites-available/openclaw << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名

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
EOF

# 启用配置
ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### SSL 证书

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 申请证书（需要域名已备案）
certbot --nginx -d your-domain.com

# 自动续期
systemctl enable certbot.timer
```

---

## 七、服务管理

### 基本命令

```bash
# 进入目录
cd ~/.openclaw

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启
docker compose restart

# 停止
docker compose stop
```

### Systemd 服务

```ini
# /etc/systemd/system/openclaw.service
[Unit]
Description=OpenClaw AI Agent
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/root/.openclaw
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
# 启用服务
systemctl daemon-reload
systemctl enable openclaw
systemctl start openclaw
```

---

## 八、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 镜像拉取失败 | 网络限制 | 配置阿里云镜像加速 |
| 安全组拒绝 | 端口未开放 | 阿里云控制台开放端口 |
| 内存不足 | 默认 1GB 太小 | 升级套餐或加 SWAP |
| 启动失败 | 配置错误 | `docker compose logs` 查看 |

### 诊断命令

```bash
# 检查 Docker
systemctl status docker
docker version
docker info

# 检查容器
docker compose ps
docker compose logs

# 检查端口
netstat -tlnp | grep 18789

# 检查资源
free -h
df -h
docker stats
```

---

## 九、成本优化

### 省钱技巧

```
┌─────────────────────────────────────────────────────────────┐
│                    阿里云成本优化                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 选择按量付费 + 预留实例                                   │
│     └── 长期使用可节省 30-60%                               │
│                                                              │
│  2. 使用抢占式实例                                           │
│     └── 价格低 50-90%，适合临时使用                        │
│                                                              │
│  3. 选择合适带宽                                             │
│     └── 固定带宽 5Mbps通常够用                              │
│                                                              │
│  4. 善用学生优惠                                             │
│     └── 学生认证后享受优惠价格                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 成本对比

| 计费方式 | 适用场景 |
|---------|---------|
| 按量付费 | 临时测试、短期使用 |
| 包年包月 | 长期稳定使用 |
| 预留实例 | 长期高负载 |

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| 阿里云 ECS | https://www.aliyun.com/product/ecs |
| 阿里云镜像加速 | https://cr.console.aliyun.com |
| 备案中心 | https://beian.aliyun.com |
| Docker 官方文档 | https://docs.docker.com |

---

*文档版本: 2026-04-21*