# 腾讯云轻量应用服务器部署 OpenClaw

> 轻量应用服务器 · 国内首选 · 高性价比

---

## 一、方案概述

### 为什么选择腾讯云轻量

| 项目 | 说明 |
|------|------|
| **价格** | ¥24/月起 |
| **特点** | 国内访问快、配置简单 |
| **适用** | 国内用户首选 |
| **备案** | 需要备案（国内服务器） |

### 推荐配置

| 配置 | CPU | 内存 | 磁盘 | 价格 |
|------|-----|------|------|------|
| 入门版 | 2核 | 2GB | 50GB SSD | ¥24/月 |
| 标准版 | 2核 | 4GB | 80GB SSD | ¥56/月 |
| 高级版 | 4核 | 8GB | 120GB SSD | ¥90/月 |

---

## 二、购买与初始化

### 1. 购买服务器

```
1. 访问 https://cloud.tencent.com/lighthouse
2. 选择「轻量应用服务器」
3. 选择地域（推荐：上海、广州）
4. 选择镜像：Ubuntu 22.04 LTS
5. 选择套餐：2核 4GB（推荐）
6. 设置密码
7. 完成购买
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

## 三、Docker 安装（国内优化）

### 方法一：官方脚本（推荐）

```bash
# 官方安装脚本
curl -fsSL https://get.docker.com | sh

# 启动 Docker
systemctl enable docker
systemctl start docker

# 验证
docker --version
```

### 方法二：国内镜像安装

```bash
# 安装必要依赖
apt update
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 国内镜像源
echo "deb [trusted=yes] https://mirrors.tencent.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

# 安装 Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动
systemctl enable docker
systemctl start docker
```

### 配置 Docker 镜像加速

```bash
# 创建配置目录
mkdir -p /etc/docker

# 配置腾讯云镜像加速
cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
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
# 拉取镜像（使用国内加速）
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

## 五、配置防火墙

### 腾讯云控制台

```
1. 登录腾讯云控制台
   https://console.cloud.tencent.com

2. 进入「轻量应用服务器」
   └── 选择你的服务器

3. 点击「防火墙」
   └── 添加规则：
       - 协议：TCP
       - 端口：18789
       - 策略：允许

4. 保存
```

### 命令行配置（备选）

```bash
# 查看防火墙状态
ufw status

# 开放端口
ufw allow 22/tcp
ufw allow 18789/tcp

# 启用防火墙
ufw enable
```

---

## 六、域名配置（可选）

### 备案说明

```
国内服务器访问公网需要备案：
- 如果只需要内网访问，跳过此步
- 如果需要公网访问，需要域名备案
- 备案地址：https://beian.cloud.tencent.com
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

# 测试并重载
nginx -t
systemctl reload nginx
```

### SSL 证书（Let's Encrypt）

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 申请证书
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

# 启动
docker compose start

# 卸载
docker compose down
```

### Systemd 服务（可选）

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

# 查看状态
systemctl status openclaw
```

---

## 八、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 镜像拉取失败 | 网络问题 | 配置 Docker 镜像加速 |
| 端口无法访问 | 防火墙未开放 | 腾讯云控制台开放端口 |
| 内存不足 | 2GB 太小 | 增加 SWAP 或升级套餐 |
| 启动失败 | 配置错误 | `docker compose logs` 查看日志 |

### 诊断命令

```bash
# 检查 Docker 状态
systemctl status docker
docker version

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

## 九、成本说明

| 资源 | 价格 | 说明 |
|------|------|------|
| 入门套餐 | ¥24/月 | 2核 2GB 50GB |
| 标准套餐 | ¥56/月 | 2核 4GB 80GB |
| 高级套餐 | ¥90/月 | 4核 8GB 120GB |
| 流量 | 包月可选 | 轻量服务器通常不限流量 |

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| 腾讯云轻量应用服务器 | https://cloud.tencent.com/lighthouse |
| Docker 官方文档 | https://docs.docker.com |
| OpenClaw 官方文档 | https://docs.openclaw.ai |

---

*文档版本: 2026-04-21*