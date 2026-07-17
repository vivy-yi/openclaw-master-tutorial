# 通用 VPS 部署 OpenClaw 完全指南

> 适用所有服务器 · Ubuntu / Debian / CentOS
> **Stars: 1 | 方案: 通用脚本 + 手动部署**

---

## 一、方案概述

### 支持的服务器

| 类型 | 服务器 | 支持状态 |
|------|--------|---------|
| **国内** | 腾讯云轻量、阿里云 ECS、火山引擎、华为云 | ✅ 通用 |
| **海外** | Vultr、Hetzner、Linode、RackNerd、Hostwinds | ✅ 通用 |
| **特殊** | Oracle Cloud、DigitalOcean | ✅ 通用 |

### 部署要求

| 项目 | 最低要求 | 推荐配置 |
|------|---------|---------|
| CPU | 1核 | 2核+ |
| 内存 | 1GB | 2GB+ |
| 磁盘 | 10GB | 40GB+ |
| 系统 | Ubuntu 18.04+ / Debian 10+ / CentOS 7+ | Ubuntu 22.04 LTS |

---

## 二、一键部署脚本

### 智能检测脚本

```bash
#!/bin/bash
# openclaw-install.sh - OpenClaw 通用安装脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检测系统
detect_os() {
    log_info "检测操作系统..."
    
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
        VER=$VERSION_ID
        log_info "检测到: $PRETTY_NAME"
    else
        log_error "无法检测操作系统"
        exit 1
    fi
    
    # 检查 root 权限
    if [ "$EUID" -ne 0 ]; then
        log_error "请使用 root 权限运行此脚本"
        exit 1
    fi
}

# 安装 Docker
install_docker() {
    log_info "安装 Docker..."
    
    # 卸载旧版本
    apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # 安装依赖
    apt-get update
    apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # 添加 Docker GPG key
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/$OS/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # 添加 Docker 仓库
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # 安装 Docker
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # 启动 Docker
    systemctl enable docker
    systemctl start docker
    
    # 配置 Docker 镜像加速
    mkdir -p /etc/docker
    cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
        "https://docker.nju.edu.cn"
    ],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    }
}
EOF
    
    systemctl restart docker
    
    log_info "Docker 安装完成"
}

# 安装 OpenClaw
install_openclaw() {
    log_info "安装 OpenClaw..."
    
    # 创建目录
    mkdir -p ~/.openclaw
    mkdir -p ~/.openclaw/workspaces
    mkdir -p ~/.openclaw/skills
    mkdir -p ~/.openclaw/memory
    mkdir -p ~/.openclaw/sessions
    
    # 创建 docker-compose.yml
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
    
    log_info "docker-compose.yml 已创建"
}

# 配置防火墙
configure_firewall() {
    log_info "配置防火墙..."
    
    # UFW
    if command -v ufw &> /dev/null; then
        ufw allow 22/tcp comment 'SSH'
        ufw allow 18789/tcp comment 'OpenClaw'
        ufw --force enable
        ufw status
    fi
    
    # iptables
    if command -v iptables &> /dev/null; then
        iptables -A INPUT -p tcp --dport 22 -j ACCEPT
        iptables -A INPUT -p tcp --dport 18789 -j ACCEPT
        iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    fi
    
    log_info "防火墙配置完成"
}

# 启动 OpenClaw
start_openclaw() {
    log_info "启动 OpenClaw..."
    
    # 拉取镜像
    docker pull openclaw/openclaw:latest
    
    # 启动容器
    docker compose up -d
    
    # 等待启动
    sleep 5
    
    # 检查状态
    if docker ps | grep -q openclaw; then
        log_info "OpenClaw 启动成功！"
    else
        log_error "OpenClaw 启动失败，请检查日志"
        docker compose logs
        exit 1
    fi
}

# 显示信息
show_info() {
    echo ""
    echo "=========================================="
    echo "       OpenClaw 安装完成！"
    echo "=========================================="
    echo ""
    echo "访问地址：http://$(curl -s ifconfig.me):18789"
    echo ""
    echo "常用命令："
    echo "  - 查看状态：docker compose ps"
    echo "  - 查看日志：docker compose logs -f"
    echo "  - 重启服务：docker compose restart"
    echo "  - 停止服务：docker compose down"
    echo ""
    echo "配置文件位置：~/.openclaw"
    echo ""
}

# 主流程
main() {
    log_info "OpenClaw 安装脚本开始执行..."
    echo ""
    
    detect_os
    install_docker
    configure_firewall
    install_openclaw
    start_openclaw
    show_info
    
    log_info "安装完成！"
}

main "$@"
```

### 使用脚本

```bash
# 下载并执行
curl -fsSL https://raw.githubusercontent.com/masudme09/openclaw_vps_setup_guide/main/install.sh -o install.sh
chmod +x install.sh
./install.sh

# 或直接执行
bash -c "$(curl -fsSL https://raw.githubusercontent.com/masudme09/openclaw_vps_setup_guide/main/install.sh)"
```

---

## 三、手动部署

### Ubuntu / Debian

```bash
# 1. 更新系统
apt update && apt upgrade -y

# 2. 安装必要工具
apt install -y curl wget git vim

# 3. 安装 Docker
curl -fsSL https://get.docker.com | sh

# 4. 验证 Docker
docker --version
docker compose version

# 5. 创建 OpenClaw 目录
mkdir -p ~/.openclaw
mkdir -p ~/.openclaw/workspaces
mkdir -p ~/.openclaw/skills
mkdir -p ~/.openclaw/memory

# 6. 创建 docker-compose.yml
cat > ~/.openclaw/docker-compose.yml << 'EOF'
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
    network_mode: host

networks:
  default:
    driver: bridge
EOF

# 7. 启动 OpenClaw
cd ~/.openclaw
docker compose up -d

# 8. 查看状态
docker compose ps

# 9. 查看日志
docker compose logs -f
```

### CentOS / RHEL

```bash
# 1. 更新系统
yum update -y

# 2. 安装必要工具
yum install -y curl wget git vim

# 3. 安装 Docker
curl -fsSL https://get.docker.com | sh

# 4. 启动 Docker
systemctl enable docker
systemctl start docker

# 5. 验证 Docker
docker --version

# 6. 创建目录
mkdir -p ~/.openclaw
mkdir -p ~/.openclaw/workspaces

# 7. 创建 docker-compose.yml
cat > ~/.openclaw/docker-compose.yml << 'EOF'
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

# 8. 启动
cd ~/.openclaw
docker compose up -d

# 9. 查看状态
docker compose ps
```

---

## 四、国内服务器优化

### Docker 镜像加速

```json
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.ustc.edu.cn",
        "https://hub-mirror.c.163.com"
    ]
}
```

### 阿里云镜像加速

```bash
# 1. 获取加速地址
# 访问 https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

# 2. 配置镜像加速
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://your-id.mirror.aliyuncs.com"
    ]
}
EOF

# 3. 重启 Docker
systemctl daemon-reload
systemctl restart docker
```

### NPM 镜像加速

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 或 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
```

---

## 五、安全配置

### 创建普通用户

```bash
# 创建用户
useradd -m -s /bin/bash openclaw
usermod -aG docker openclaw

# 切换用户
su - openclaw

# 配置 sudo
echo "openclaw ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
```

### SSH 安全配置

```bash
# 编辑 SSH 配置
vim /etc/ssh/sshd_config

# 修改默认端口
Port 2222

# 禁止 root 登录
PermitRootLogin no

# 禁止密码登录
PasswordAuthentication no

# 重启 SSH
systemctl restart sshd
```

### Fail2ban 防暴力破解

```bash
# 安装
apt install -y fail2ban

# 配置
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
EOF

# 启动
systemctl enable fail2ban
systemctl start fail2ban
```

### 防火墙配置

```bash
# UFW 配置
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp comment 'SSH'
ufw allow 18789/tcp comment 'OpenClaw'
ufw --force enable
```

---

## 六、服务管理

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

# 查看状态
systemctl status openclaw
```

### 更新 OpenClaw

```bash
# 进入目录
cd ~/.openclaw

# 拉取新版本
docker pull openclaw/openclaw:latest

# 重启
docker compose up -d --force-recreate

# 清理旧镜像
docker image prune -f
```

---

## 七、监控与日志

### Docker 日志配置

```bash
# 配置日志轮转
cat > /etc/docker/daemon.json << 'EOF'
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    },
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com"
    ]
}
EOF

# 重启 Docker
systemctl restart docker
```

### 监控脚本

```bash
#!/bin/bash
# monitor.sh - OpenClaw 监控脚本

while true; do
    STATUS=$(docker inspect -f '{{.State.Running}}' openclaw 2>/dev/null || echo "stopped")
    
    if [ "$STATUS" != "true" ]; then
        echo "[$(date)] OpenClaw 已停止，正在重启..."
        cd ~/.openclaw && docker compose up -d
    fi
    
    sleep 30
done
```

### Crontab 自动重启

```bash
# 添加定时任务
crontab -e

# 添加以下行
*/5 * * * * cd ~/.openclaw && docker compose restart >> /dev/null 2>&1

# 或每天凌晨重启
0 3 * * * cd ~/.openclaw && docker compose restart
```

---

## 八、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 端口占用 | 18789 被占用 | 修改端口映射 |
| 内存不足 | 1GB 太小 | 增加 SWAP 或升级配置 |
| 镜像拉取慢 | 网络问题 | 配置镜像加速 |
| 启动失败 | 配置错误 | 查看日志 `docker compose logs` |
| 无法连接 | 防火墙 | 开放 18789 端口 |

### 诊断命令

```bash
# 检查 Docker 状态
systemctl status docker
docker version

# 检查容器状态
docker ps -a
docker compose ps

# 查看日志
docker compose logs -f
docker logs openclaw

# 检查端口
netstat -tlnp | grep 18789
ss -tlnp | grep 18789

# 检查资源
docker stats
free -h
df -h
```

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| openclaw_vps_setup_guide | https://github.com/masudme09/openclaw_vps_setup_guide |
| Docker 官方文档 | https://docs.docker.com |
| OpenClaw 官方文档 | https://docs.openclaw.ai |
| Docker 镜像加速 | https://cr.console.aliyun.com |

---

*文档版本: 2026-04-21*