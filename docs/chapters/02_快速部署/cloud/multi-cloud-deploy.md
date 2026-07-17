# Multi-Cloud 部署 OpenClaw 完全指南

> 一次配置，多云部署 · DigitalOcean / GCP / Oracle / Azure / Hostinger
> **Stars: 3 | 方案: Terraform + 一键脚本**

---

## 一、方案概述

### 为什么选择 Multi-Cloud

| 优势 | 说明 |
|------|------|
| **灵活性** | 可以在多个云之间切换 |
| **成本优化** | 选择最便宜的方案 |
| **避免锁定** | 不依赖单一云厂商 |
| **统一管理** | 一次配置，统一部署 |

### 支持的云平台

| 云平台 | 推荐度 | 免费额度 | 特点 |
|--------|--------|---------|------|
| **DigitalOcean** | ⭐⭐⭐⭐⭐ | $200/60天 | 简单易用 |
| **Oracle Cloud** | ⭐⭐⭐⭐⭐ | 永久免费 | 资源丰富 |
| **Google Cloud** | ⭐⭐⭐⭐ | $300/90天 | 生态完善 |
| **Microsoft Azure** | ⭐⭐⭐⭐ | $200/30天 | 企业级 |
| **Hostinger** | ⭐⭐⭐⭐ | - | 性价比 |

### 项目信息

| 项目 | Stars | 链接 |
|------|-------|------|
| DisierTECH OpenClaw Stack | ⭐3 | https://github.com/disi3r/DisierTECH-OpenClaw-Stack |

---

## 二、云平台对比

### 详细对比

| 云平台 | 价格 | 免费 | CPU | 内存 | 磁盘 | 推荐场景 |
|--------|------|------|-----|------|------|---------|
| **Oracle Cloud** | 永久免费 | ✅ | 4核 | 24GB | 50GB | 长期项目 |
| **DigitalOcean** | $4/月起 | $200/60天 | 1核 | 1GB | 25GB | 开发测试 |
| **GCP** | $10/月起 | $300/90天 | 1核 | 1.7GB | 10GB | 学术研究 |
| **Azure** | $13/月起 | $200/30天 | 1核 | 1GB | 64GB | 企业用户 |
| **Hostinger** | $3.9/月起 | - | 1核 | 4GB | 50GB | 性价比 |

### 推荐选择

```
┌─────────────────────────────────────────────────────────────┐
│                    云平台选择建议                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  预算有限 + 长期项目 ────▶ Oracle Cloud (永久免费)             │
│                                                              │
│  简单易用 + 快速上手 ────▶ DigitalOcean ($4/月)               │
│                                                              │
│  学生 + 教育用途 ────────▶ GitHub Education + DO             │
│                                                              │
│  企业 + 合规要求 ────────▶ Azure (企业级)                    │
│                                                              │
│  追求性价比 ───────────▶ Hostinger ($3.9/月)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、DisierTECH Stack 部署

### 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                  DisierTECH OpenClaw Stack                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Terraform Layer (基础设施代码化)                              │ │
│  │                                                             │ │
│  │  ├── Cloud Provider Abstraction                              │ │
│  │  ├── Network Configuration                                   │ │
│  │  └── Instance Provisioning                                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                           │                                        │
│                           ▼                                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Docker Compose (应用编排)                                    │ │
│  │                                                             │ │
│  │  ├── OpenClaw Gateway                                       │ │
│  │  ├── Ollama (可选)                                          │ │
│  │  ├── Vector DB (可选)                                       │ │
│  │  └── Monitoring                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 部署步骤

```bash
# 1. 克隆仓库
git clone https://github.com/disi3r/DisierTECH-OpenClaw-Stack
cd DisierTECH-OpenClaw-Stack

# 2. 选择云平台
# ├── digitalocean/    # DigitalOcean
# ├── gcp/            # Google Cloud
# ├── oracle/         # Oracle Cloud
# ├── azure/          # Microsoft Azure
# └── hostinger/       # Hostinger

# 3. 选择云平台目录
cd digitalocean

# 4. 配置
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
nano terraform/terraform.tfvars

# 5. 部署
terraform init
terraform plan
terraform apply

# 6. 获取输出
terraform output
```

---

## 四、各平台详细配置

### 4.1 Oracle Cloud

```hcl
# oracle/terraform.tfvars
tenancy_ocid     = "your-tenancy-ocid"
user_ocid        = "your-user-ocid"
fingerprint      = "your-fingerprint"
private_key_path = "~/.oci/oci_api_key.pem"
region           = "ap-tokyo-1"

# 实例配置
instance_shape = "VM.Standard.A1.Flex"
ocpus          = 4
memory_in_gbs  = 24

# OpenClaw 配置
openclaw_version = "latest"
domain          = "your-domain.com"
```

```bash
# 部署 Oracle Cloud
cd oracle
terraform init
terraform apply
```

### 4.2 DigitalOcean

```hcl
# digitalocean/terraform.tfvars
do_token = "your-digitalocean-token"

# 实例配置
droplet_size = "s-2vcpu-4gb"
region       = "sgp1"  # 新加坡

# OpenClaw 配置
openclaw_version = "latest"
domain           = "your-domain.com"
```

```bash
# 部署 DigitalOcean
cd digitalocean
terraform init
terraform apply
```

### 4.3 Google Cloud

```hcl
# gcp/terraform.tfvars
project_id = "your-gcp-project"
region     = "asia-east1"  # 台湾

# 实例配置
machine_type = "e2-medium"
disk_size_gb = 20

# OpenClaw 配置
openclaw_version = "latest"
domain           = "your-domain.com"
```

```bash
# 部署 GCP
cd gcp
terraform init
terraform apply
```

### 4.4 Microsoft Azure

```hcl
# azure/terraform.tfvars
subscription_id = "your-subscription-id"
tenant_id      = "your-tenant-id"
client_id      = "your-client-id"
client_secret  = "your-client-secret"

# 实例配置
vm_size = "Standard_B1s"
region  = "eastasia"

# OpenClaw 配置
openclaw_version = "latest"
domain           = "your-domain.com"
```

```bash
# 部署 Azure
cd azure
terraform init
terraform apply
```

### 4.5 Hostinger

```hcl
# hostinger/terraform.tfvars
hostinger_api_token = "your-hostinger-token"

# 实例配置
server_id    = "your-server-id"
server_plan  = "starter"

# OpenClaw 配置
openclaw_version = "latest"
domain           = "your-domain.com"
```

```bash
# 部署 Hostinger
cd hostinger
terraform init
terraform apply
```

---

## 五、通用部署脚本

### 一键安装脚本

```bash
#!/bin/bash
# openclaw-multi-cloud-install.sh

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}OpenClaw Multi-Cloud 安装脚本${NC}"

# 检测系统
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
    else
        echo -e "${RED}无法检测操作系统${NC}"
        exit 1
    fi
}

# 安装 Docker
install_docker() {
    echo "安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
}

# 安装 OpenClaw
install_openclaw() {
    echo "安装 OpenClaw..."
    npm install -g openclaw
    
    # 创建数据目录
    mkdir -p ~/.openclaw
    mkdir -p ~/.openclaw/workspaces
    mkdir -p ~/.openclaw/skills
    mkdir -p ~/.openclaw/memory
}

# 配置防火墙
configure_firewall() {
    echo "配置防火墙..."
    
    # UFW
    if command -v ufw &> /dev/null; then
        ufw allow 22/tcp
        ufw allow 18789/tcp
        ufw --force enable
    fi
    
    # iptables
    if command -v iptables &> /dev/null; then
        iptables -A INPUT -p tcp --dport 22 -j ACCEPT
        iptables -A INPUT -p tcp --dport 18789 -j ACCEPT
    fi
}

# 启动 OpenClaw
start_openclaw() {
    echo "启动 OpenClaw..."
    
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
    restart: unless-stopped
    network_mode: host
EOF

    docker compose up -d
}

# 主流程
main() {
    detect_os
    install_docker
    install_openclaw
    configure_firewall
    start_openclaw
    
    echo -e "${GREEN}OpenClaw 安装完成！${NC}"
    echo "访问 http://localhost:18789"
}

main "$@"
```

```bash
# 使用
chmod +x openclaw-multi-cloud-install.sh
./openclaw-multi-cloud-install.sh
```

---

## 六、Kubernetes 部署

### K8s 配置文件

```yaml
# openclaw-k8s.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw
  labels:
    app: openclaw
spec:
  replicas: 1
  selector:
    matchLabels:
      app: openclaw
  template:
    metadata:
      labels:
        app: openclaw
    spec:
      containers:
        - name: openclaw
          image: openclaw/openclaw:latest
          ports:
            - containerPort: 18789
          resources:
            limits:
              cpu: "1"
              memory: 1Gi
            requests:
              cpu: 500m
              memory: 512Mi
          volumeMounts:
            - name: openclaw-data
              mountPath: /root/.openclaw
          env:
            - name: TZ
              value: "Asia/Shanghai"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 18789
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /healthz
              port: 18789
            initialDelaySeconds: 5
            periodSeconds: 5
      volumes:
        - name: openclaw-data
          persistentVolumeClaim:
            claimName: openclaw-data

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: openclaw-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

---
apiVersion: v1
kind: Service
metadata:
  name: openclaw
spec:
  selector:
    app: openclaw
  ports:
    - port: 80
      targetPort: 18789
  type: LoadBalancer
```

```bash
# 部署
kubectl apply -f openclaw-k8s.yaml

# 查看状态
kubectl get pods
kubectl get services

# 查看日志
kubectl logs -f deployment/openclaw
```

---

## 七、成本优化

### 成本对比

| 云平台 | 月成本 | 年成本 | 节省 |
|--------|--------|--------|------|
| Oracle Cloud | $0 | $0 | 100% |
| DigitalOcean | $24 | $288 | 0% |
| GCP | $25 | $300 | 0% |
| Azure | $30 | $360 | 0% |
| Hostinger | $3.9 | $47 | 84% |

### 省钱技巧

```
┌─────────────────────────────────────────────────────────────┐
│                    成本优化策略                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 首选 Oracle Cloud (永久免费)                               │
│                                                              │
│  2. 利用学生包 (GitHub Education)                             │
│     └── DigitalOcean $200/年                                 │
│                                                              │
│  3. 按需付费                                                  │
│     └── Render / Railway (按量付费)                          │
│                                                              │
│  4. 预留实例                                                  │
│     └── 长期使用选择年付                                      │
│                                                              │
│  5. 善用免费额度                                              │
│     └── Oracle $300试用 / GCP $200试用                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 八、相关资源

| 资源 | 链接 |
|------|------|
| DisierTECH OpenClaw Stack | https://github.com/disi3r/DisierTECH-OpenClaw-Stack |
| Oracle Cloud | https://www.oracle.com/cloud/free |
| DigitalOcean | https://www.digitalocean.com |
| Google Cloud | https://cloud.google.com/free |
| Azure | https://azure.microsoft.com/free |
| Hostinger | https://www.hostinger.com |

---

*文档版本: 2026-04-21*