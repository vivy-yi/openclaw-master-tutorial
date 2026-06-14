# Oracle Cloud 部署 OpenClaw 完全指南

> Oracle Cloud Infrastructure (OCI) Always Free - 永久免费 4核 24GB 内存
> **Stars: 4 | 方案: Terraform + 一键部署**

---

## 一、方案概述

### 为什么选择 Oracle Cloud

| 项目 | 说明 |
|------|------|
| **价格** | 永久免费（Always Free） |
| **CPU** | 4核 ARM (Ampere) 或 1核 AMD |
| **内存** | 高达 24GB |
| **磁盘** | 50GB Block Volume |
| **网络** | 独立公网 IP |

### 可用方案

| 项目 | Stars | 特点 | 推荐度 |
|------|-------|------|--------|
| [statickidz/openclaw-oci-free](https://github.com/statickidz/openclaw-oci-free) | ⭐4 | 一键部署按钮 | ⭐⭐⭐⭐⭐ |
| [soohyunme/openclaw-cloud-quickstarter](https://github.com/soohyunme/openclaw-cloud-quickstarter) | ⭐8 | Terraform 模板 | ⭐⭐⭐⭐ |
| [shaan-duggal/claw-on-oci](https://github.com/shaan-duggal/claw-on-oci) | - | Ollama + OpenClaw | ⭐⭐⭐⭐ |

---

## 二、一键部署（推荐）

### 部署步骤

```
1. 点击部署按钮
   ↓
2. 登录 Oracle Cloud 账号
   ↓
3. 选择 compartment
   ↓
4. 上传 SSH 公钥
   ↓
5. 点击 Create
   ↓
6. SSH 连接并运行 openclaw onboard
```

### 部署按钮

[![Deploy to Oracle Cloud](https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/statickidz/openclaw-oci-free/archive/refs/heads/main.zip)

### 架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                    Oracle Cloud Infrastructure                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  VCN (Virtual Cloud Network)                                │ │
│  │  ├── Internet Gateway                                      │ │
│  │  └── Public Subnet                                         │ │
│  │       └── Security List (SSH 22)                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                           │                                        │
│                           ▼                                        │
│                    ┌─────────────┐                              │
│                    │   Ubuntu    │                              │
│                    │   22.04     │                              │
│                    │  (VM 实例)  │                              │
│                    └─────────────┘                              │
│                           │                                        │
│         ┌─────────────────┼─────────────────┐                    │
│         ▼                 ▼                 ▼                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Node.js   │  │  OpenClaw   │  │   SSH       │            │
│  │    LTS      │  │  Gateway    │  │   Access    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、手动部署（Terraform）

### 前置要求

```bash
# 安装 Terraform
brew install terraform  # macOS
# 或: https://developer.hashicorp.com/terraform/downloads

# Oracle Cloud CLI (可选)
brew install oci-cli
```

### 部署步骤

```bash
# 1. 克隆仓库
git clone https://github.com/statickidz/openclaw-oci-free
cd openclaw-oci-free

# 2. 配置 Oracle Cloud
# 在 OCI Console 创建 API Key，获取指纹

# 3. 初始化 Terraform
cd terraform
terraform init

# 4. 配置变量
cat > terraform.tfvars << EOF
 tenancy_ocid = "your-tenancy-ocid"
 user_ocid = "your-user-ocid"
 fingerprint = "your-fingerprint"
 private_key_path = "~/.oci/oci_api_key.pem"
 region = "ap-tokyo-1"  # 东京区域，延迟低
EOF

# 5. 部署
terraform plan
terraform apply

# 6. 获取实例 IP
terraform output instance_ip
```

### Terraform 配置说明

```hcl
# main.tf 示例
resource "oci_core_instance" "openclaw" {
  count = 1
  
  compartment_id = var.tenancy_ocid
  availability_domain = data.oci_identity_availability_domains.ads.ads[0].name
  
  shape = "VM.Standard.A1.Flex"
  shape_config {
    ocpus = 4
    memory_in_gbs = 24
  }
  
  source_details {
    source_id = "ocid1.image.oc1.ap-tokyo-1.aaaaaaa..."
    source_type = "image"
  }
  
  create_vnic_details {
    subnet_id = oci_core_subnet.public_subnet.id
    assign_public_ip = true
  }
  
  metadata = {
    ssh_authorized_keys = file("~/.ssh/id_rsa.pub")
  }
}
```

---

## 四、Ollama + OpenClaw 方案

### 适用场景

- 本地 LLM + OpenClaw
- 完全离线运行
- 节省 API 费用

### 部署步骤

```bash
# 1. SSH 连接到 Oracle 实例
ssh ubuntu@your-instance-ip

# 2. 安装 Docker
curl -fsSL https://get.docker.com | sh

# 3. 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 4. 拉取模型
ollama pull llama3.2
ollama pull nomic-embed-text

# 5. 安装 OpenClaw
npm install -g openclaw

# 6. 配置 OpenClaw 使用 Ollama
openclaw config set model.provider ollama
openclaw config set model.model llama3.2

# 7. 启动
openclaw
```

### Docker Compose 配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "18789:18789"
    volumes:
      - ~/.openclaw:/root/.openclaw
    environment:
      - MODEL_PROVIDER=ollama
      - OLLAMA_BASE_URL=http://host.docker.internal:11434
    network_mode: host
    restart: unless-stopped

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    runtime: nvidia  # 如果有 GPU
    restart: unless-stopped

volumes:
  ollama-data:
```

---

## 五、部署后配置

### 1. 防火墙配置

```bash
# 在 Oracle Console 中
# Networking → Virtual Cloud Networks → 安全列表
# 添加规则:
# - Stateful: Yes
# - Direction: Ingress
# - Source: 0.0.0.0/0
# - IP Protocol: TCP
# - Destination Port: 22 (SSH)
```

### 2. 安装 OpenClaw

```bash
# SSH 连接到实例
ssh ubuntu@your-instance-ip

# 安装 Node.js (如果 cloud-init 未自动安装)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 OpenClaw
npm install -g openclaw

# 初始化
openclaw onboard
```

### 3. 配置域名（可选）

```bash
# 安装 Nginx
sudo apt install -y nginx

# 配置反向代理
sudo cat > /etc/nginx/sites-available/openclaw << EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. 配置 SSL（Let's Encrypt）

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 六、性能优化

### 内核参数优化

```bash
# /etc/sysctl.conf
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.ip_local_port_range = 10000 65535
fs.file-max = 1000000

# 应用
sudo sysctl -p
```

### SWAP 配置

```bash
# 创建 4GB SWAP
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 永久启用
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 七、故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 实例无法连接 | 防火墙未开放端口 | 检查安全列表规则 |
| 部署失败 | API Key 错误 | 重新生成并配置 |
| 内存不足 | 默认配置 | 使用 A1.Flex 4核 24GB |
| SSH 连接超时 | IP 错误 | 检查实例公共 IP |

### 检查日志

```bash
# OpenClaw 日志
docker logs openclaw
# 或
journalctl -u openclaw -f

# Terraform 日志
terraform show
terraform output
```

---

## 八、成本说明

| 资源 | Always Free 限制 | 说明 |
|------|-----------------|------|
| Compute | 2个 x86 / 1个 ARM | 永久免费 |
| ARM | 4 OCPU + 24GB | 永久免费 |
| Block Storage | 200GB | 永久免费 |
| Object Storage | 10GB | 永久免费 |
| Outbound Traffic | 10TB/月 | 永久免费 |

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| Oracle Cloud 注册 | https://www.oracle.com/cloud/free |
| openclaw-oci-free | https://github.com/statickidz/openclaw-oci-free |
| openclaw-cloud-quickstarter | https://github.com/soohyunme/openclaw-cloud-quickstarter |
| claw-on-oci | https://github.com/shaan-duggal/claw-on-oci |

---

*文档版本: 2026-04-21*