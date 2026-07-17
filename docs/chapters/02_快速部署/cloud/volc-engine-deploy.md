# 火山引擎部署 OpenClaw

> 字节跳动 · 性价比之王 · ¥9.9/月起

---

## 一、方案概述

### 为什么选择火山引擎

| 项目 | 说明 |
|------|------|
| **价格** | ¥9.9/月起（性价比最高） |
| **背景** | 字节跳动旗下 |
| **特点** | 性价比高、配置简单 |
| **备案** | 需要备案 |

### 推荐配置

| 配置 | CPU | 内存 | 磁盘 | 价格 |
|------|-----|------|------|------|
| 入门版 | 1核 | 1GB | 40GB | ¥9.9/月 |
| 标准版 | 2核 | 2GB | 60GB | ¥29/月 |
| 进阶版 | 2核 | 4GB | 80GB | ¥49/月 |
| 高配版 | 4核 | 8GB | 120GB | ¥89/月 |

---

## 二、购买与初始化

### 1. 购买服务器

```
1. 访问 https://www.volcengine.com
2. 注册账号（可用抖音账号登录）
3. 进入「云服务器」
4. 选择「火山引擎」：
   - 地域：华北（北京）/ 华东（上海）
   - 实例规格：ecs.s3.small（入门）
   - 镜像：Ubuntu 22.04 LTS
   - 存储：40GB SSD
   - 带宽：按量付费
5. 设置密码
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

## 三、Docker 安装（国内镜像）

### 方法一：官方脚本

```bash
# 官方安装脚本
curl -fsSL https://get.docker.com | sh

# 启动 Docker
systemctl enable docker
systemctl start docker
```

### 方法二：火山引擎镜像源

```bash
# 安装必要依赖
apt update
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 镜像源（使用中科大镜像）
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

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

# 配置镜像加速
cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.ustc.edu.cn",
        "https://mirror.ccs.tencentyun.com"
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

## 五、配置防火墙

### 火山引擎控制台

```
1. 登录火山引擎控制台
   https://console.volcengine.com

2. 进入「云服务器」
   └── 选择你的实例

3. 点击「安全组」
   └── 配置规则：
       - 协议：TCP
       - 端口：18789
       - 来源：0.0.0.0/0

4. 保存规则
```

### 命令行配置（备选）

```bash
# 检查防火墙
ufw status

# 开放端口
ufw allow 22/tcp
ufw allow 18789/tcp

# 启用防火墙
ufw enable
```

---

## 六、域名与备案

### 备案说明

```
火山引擎服务器需要备案才能公网访问：
- 备案地址：在火山引擎控制台提交
- 备案时间：7-20个工作日
```

### Nginx 反向代理

```bash
# 安装 Nginx
apt install -y nginx

# 创建配置
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
| 镜像拉取失败 | 网络问题 | 配置国内镜像加速 |
| 防火墙拒绝 | 端口未开放 | 火山引擎控制台开放 |
| 内存不足 | 1GB 太小 | 升级套餐 |
| 启动失败 | 配置错误 | `docker compose logs` 查看 |

### 诊断命令

```bash
# 检查 Docker
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
```

---

## 九、成本对比

### 火山引擎 vs 其他

| 平台 | 2核 2GB | 2核 4GB | 特点 |
|------|---------|---------|------|
| **火山引擎** | ¥29/月 | ¥49/月 | 性价比最高 |
| 腾讯云轻量 | ¥24/月 | ¥56/月 | 国内首选 |
| 阿里云 ECS | ¥68/月 | ¥106/月 | 品牌保障 |

### 推荐

```
┌─────────────────────────────────────────────────────────────┐
│                    国内服务器选择                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🥇 性价比首选 ────────────▶ 火山引擎 ¥9.9/月              │
│                                                              │
│  🥈 国内首选 ──────────────▶ 腾讯云轻量 ¥24/月              │
│                                                              │
│  🥉 品牌保障 ──────────────▶ 阿里云 ECS ¥30/月              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 十、相关资源

| 资源 | 链接 |
|------|------|
| 火山引擎官网 | https://www.volcengine.com |
| 云服务器 | https://www.volcengine.com/product/VCS |
| Docker 官方文档 | https://docs.docker.com |

---

*文档版本: 2026-04-21*