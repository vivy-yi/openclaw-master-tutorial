# OpenClaw 部署故障排查完全指南

> 跨平台统一故障排查手册

---

## 一、问题分类

| 类别 | 问题类型 |
|------|---------|
| **安装问题** | Docker 安装失败、镜像拉取慢 |
| **启动问题** | 端口占用、内存不足 |
| **连接问题** | 防火墙阻止、端口未开放 |
| **网络问题** | 镜像加速、DNS 问题 |
| **性能问题** | 内存不足、CPU 过高 |

---

## 二、安装问题

### 2.1 Docker 安装失败

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `curl: (7) Failed to connect` | 网络问题 | 使用国内镜像源 |
| `permission denied` | 权限不足 | 使用 `sudo` 或配置无 root |
| `package not found` | 源配置错误 | 检查 apt 源 |

#### 解决方案

```bash
# 方法一：使用国内镜像安装
curl -fsSL https://get.docker.com | sh

# 方法二：手动配置源
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg

# 添加 Docker 官方 GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 添加 Docker 仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 2.2 镜像拉取失败

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `connection timeout` | 网络超时 | 配置镜像加速 |
| `TLS handshake timeout` | DNS/网络问题 | 配置 DNS |
| `404 Not Found` | 镜像不存在 | 检查镜像名称 |

#### 解决方案

```bash
# 创建配置目录
mkdir -p /etc/docker

# 配置镜像加速
cat > /etc/docker/daemon.json << 'EOF'
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.cn-hangzhou.aliyuncs.com"
    ]
}
EOF

# 重启 Docker
systemctl daemon-reload
systemctl restart docker
```

### 2.3 镜像加速配置

#### 国内推荐镜像源

| 提供商 | 镜像地址 |
|--------|---------|
| 腾讯云 | `https://mirror.ccs.tencentyun.com` |
| 南京大学 | `https://docker.nju.edu.cn` |
| 中科大 | `https://docker.mirrors.ustc.edu.cn` |
| 阿里云 | `https://registry.cn-hangzhou.aliyuncs.com` |

---

## 三、启动问题

### 3.1 端口占用

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `Bind for 0.0.0.0:18789 failed: port already allocated` | 端口被占用 | 找到并停止占用进程，或更换端口 |

#### 解决方案

```bash
# 方法一：查找占用端口的进程
lsof -i :18789
# 或
netstat -tlnp | grep 18789

# 方法二：杀死占用进程
kill -9 <PID>

# 方法三：更换端口
# 修改 docker-compose.yml
ports:
  - "18790:18789"  # 使用 18790 外部端口

# 方法四：停止旧的 OpenClaw 容器
docker compose down
docker rm openclaw
docker compose up -d
```

### 3.2 内存不足

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `Killed` | OOM | 增加 SWAP 或升级配置 |
| 容器自动退出 | 内存限制 | 调整容器资源限制 |

#### 解决方案

```bash
# 方法一：增加 SWAP
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 方法二：创建 SWAP 文件（如果 fallocate 不可用）
dd if=/dev/zero of=/swapfile bs=1M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# 方法三：修改 docker-compose.yml 添加内存限制
services:
  openclaw:
    deploy:
      resources:
        limits:
          memory: 1G
```

### 3.3 启动失败

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `Exited (1)` | 配置错误 | 查看日志 |
| `Module not found` | 依赖缺失 | 重新构建镜像 |
| `Permission denied` | 权限问题 | 检查挂载目录权限 |

#### 解决方案

```bash
# 查看详细日志
docker compose logs -f

# 以交互模式启动（调试）
docker compose run --rm openclaw sh

# 检查配置文件
cat ~/.openclaw/openclaw.json

# 重建容器
docker compose down
docker compose up -d --force-recreate
```

---

## 四、连接问题

### 4.1 防火墙阻止

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `Connection refused` | 防火墙阻止 | 开放端口 |
| 无法从外部访问 | 云服务器安全组 | 配置安全组 |

#### 各平台开放端口

```bash
# Ubuntu/Debian UFW
ufw allow 22/tcp
ufw allow 18789/tcp
ufw enable

# CentOS/RHEL firewalld
firewall-cmd --permanent --add-port=18789/tcp
firewall-cmd --reload

# 检查防火墙状态
ufw status
firewall-cmd --list-all
```

#### 云服务器安全组配置

| 云平台 | 配置位置 | 端口 |
|--------|---------|------|
| 阿里云 | 安全组 → 入方向规则 | 18789 TCP |
| 腾讯云 | 防火墙 → 添加规则 | 18789 TCP |
| 火山引擎 | 安全组 → 网络ACL | 18789 TCP |
| AWS | 安全组 → 入站规则 | 18789 TCP |
| Oracle Cloud | 安全列表 | 18789 TCP |

### 4.2 端口转发问题

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| 本地可访问，外部不行 | 端口转发未配置 | 配置 Nginx/反向代理 |
| ngrok 无法连接 | 认证 token 错误 | 检查 ngrok 配置 |

#### Nginx 反向代理配置

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
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 启用配置
ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 五、网络问题

### 5.1 DNS 解析失败

| 症状 | 原因 | 解决方案 |
|------|------|---------|
| `Could not resolve host` | DNS 配置错误 | 修改 DNS 服务器 |
| 国内无法访问 Docker Hub | 防火长城 | 使用国内镜像 |

#### 解决方案

```bash
# 方法一：修改 DNS
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
echo "nameserver 114.114.114.114" >> /etc/resolv.conf

# 方法二：配置 Docker DNS
cat > /etc/docker/daemon.json << 'EOF'
{
    "dns": ["8.8.8.8", "114.114.114.114"]
}
EOF

systemctl restart docker
```

### 5.2 代理配置

```bash
# 配置 HTTP 代理
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

# Docker 配置代理
mkdir -p /etc/systemd/system/docker.service.d
cat > /etc/systemd/system/docker.service.d/http-proxy.conf << 'EOF'
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080"
Environment="HTTPS_PROXY=http://proxy.example.com:8080"
EOF

systemctl daemon-reload
systemctl restart docker
```

---

## 六、性能问题

### 6.1 内存使用过高

```bash
# 查看内存使用
free -h

# 查看 Docker 容器资源使用
docker stats

# 限制容器内存
docker update --memory 1G openclaw
```

### 6.2 CPU 使用过高

```bash
# 查看 CPU 使用
top
htop

# 查看容器 CPU 使用
docker stats

# 限制容器 CPU
docker update --cpus 1.0 openclaw
```

### 6.3 磁盘空间不足

```bash
# 查看磁盘使用
df -h

# 清理 Docker
docker system prune -a
docker volume prune

# 清理日志
journalctl --vacuum-time=7d
```

---

## 七、诊断命令速查

```bash
# ========== Docker 状态 ==========
systemctl status docker           # Docker 服务状态
docker version                   # Docker 版本
docker info                      # Docker 信息

# ========== 容器状态 ==========
docker compose ps               # 容器列表
docker compose logs -f           # 查看日志
docker stats                     # 资源使用

# ========== 网络诊断 ==========
netstat -tlnp | grep 18789     # 端口监听
curl -f http://localhost:18789/healthz  # 健康检查

# ========== 系统资源 ==========
free -h                         # 内存
df -h                          # 磁盘
top                            # CPU/进程

# ========== 日志查看 ==========
journalctl -u docker -f        # Docker 日志
docker compose logs --tail=100  # 应用日志
```

---

## 八、常见错误码

| 错误码 | 含义 | 解决方案 |
|--------|------|---------|
| `exit 137` | OOM 被杀死 | 增加内存 |
| `exit 1` | 配置错误 | 检查配置 |
| `exit 139` | Segmentation fault | 重启容器 |
| `exit 143` | 正常退出 | 无需处理 |

---

## 九、恢复出厂设置

如果遇到无法解决的问题，可以重置：

```bash
# 停止容器
docker compose down

# 备份配置
cp -r ~/.openclaw ~/.openclaw.backup

# 删除配置
rm -rf ~/.openclaw

# 重新创建
mkdir -p ~/.openclaw
docker compose up -d

# 如果需要恢复配置
docker compose down
rm -rf ~/.openclaw
mv ~/.openclaw.backup ~/.openclaw
docker compose up -d
```

---

## 十、获取帮助

| 渠道 | 地址 |
|------|------|
| 官方文档 | https://docs.openclaw.ai |
| GitHub Issues | https://github.com/openclaw/openclaw/issues |
| Discord | https://discord.gg/clawd |
| 社区论坛 | https://discord.com/invite/clawd |

---

*文档版本: 2026-04-21*
