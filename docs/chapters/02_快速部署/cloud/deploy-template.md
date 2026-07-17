# {平台} 部署 OpenClaw

> 简短描述

---

## 一、方案概述

### 为什么选择 {平台}

| 项目 | 说明 |
|------|------|
| **价格** | X/月 |
| **特点** | 特点描述 |
| **适用** | 适用场景 |

### 推荐配置

| 配置 | CPU | 内存 | 磁盘 | 价格 |
|------|-----|------|------|------|
| 入门版 | 1核 | 1GB | 40GB | ¥X/月 |

---

## 二、购买与初始化

### 1. 购买服务器

```
1. 访问官网
2. 选择配置
3. 完成购买
```

### 2. 登录服务器

```bash
ssh root@你的服务器IP
```

### 3. 基础配置

```bash
apt update && apt upgrade -y
apt install -y curl wget vim git
```

---

## 三、安装 OpenClaw

### Docker 安装

```bash
# 安装 Docker（如有特色配置可写）
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
```

### OpenClaw 安装

```bash
mkdir -p ~/.openclaw
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
    restart: unless-stopped
EOF

docker compose up -d
```

---

## 四、平台特色配置

### 防火墙配置

```
控制台 → 安全组 → 开放端口 18789
```

### 域名配置（可选）

```bash
# 安装 Nginx
apt install -y nginx

# 配置反向代理
cat > /etc/nginx/sites-available/openclaw << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
EOF

ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
systemctl reload nginx
```

### SSL 证书

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 五、服务管理

### 基本命令

```bash
cd ~/.openclaw

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启
docker compose restart

# 停止
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
systemctl daemon-reload
systemctl enable openclaw
systemctl start openclaw
```

---

## 六、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 镜像拉取失败 | 网络问题 | 配置镜像加速 |
| 端口无法访问 | 防火墙未开放 | 开放端口 |
| 内存不足 | 配置太低 | 升级配置或加 SWAP |

### 诊断命令

```bash
# 检查 Docker
systemctl status docker
docker version

# 检查容器
docker compose ps
docker compose logs

# 检查资源
free -h
df -h
docker stats
```

---

## 七、成本说明

| 配置 | 价格 | 说明 |
|------|------|------|
| 入门版 | ¥X/月 | 适合尝鲜 |
| 标准版 | ¥X/月 | 推荐配置 |

---

## 八、相关资源

| 资源 | 链接 |
|------|------|
| 官网 | https://example.com |
| 文档 | https://docs.example.com |

---

*模板版本: 2026-04-21*
