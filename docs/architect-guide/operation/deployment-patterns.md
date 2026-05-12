# 部署模式与策略

> 从开发到生产的完整部署路径

---

## 部署模式概览

OpenClaw 支持多种部署模式，从单机开发环境到大规模生产集群，满足不同场景需求。

★ Insight ─────────────────────────────────────
• 单机部署适合开发测试，集群部署是生产环境的必要选择
• Docker 是本地开发的首选，Kubernetes 是生产部署的标准
• 边缘部署需要考虑网络延迟和离线运行能力
─────────────────────────────────────────────────

---

## 1. 单机部署

### 1.1 Docker 单容器

```bash
# 快速启动
docker run -d \
  --name openclaw \
  -p 8080:8080 \
  -v ./data:/data \
  -e API_KEY=your-api-key \
  openclaw/openclaw:latest
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "8080:8080"
    volumes:
      - ./data:/data
      - ./config:/config
    environment:
      - API_KEY=${API_KEY}
      - LOG_LEVEL=info
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "openclaw", "health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 1.2 开发模式

```bash
# 本地开发启动
npm run dev

# 带热重载
npm run dev:watch
```

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  openclaw:
    build:
      context: .
      target: development
    ports:
      - "8080:8080"
      - "9229:9229"  # Node inspector
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
    environment:
      - NODE_ENV=development
      - DEBUG=*
    command: npm run dev
```

---

## 2. Docker Compose 集群

### 2.1 基本架构

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  gateway:
    image: openclaw/gateway:latest
    ports:
      - "8080:8080"
    environment:
      - REDIS_HOST=redis
      - POSTGRES_HOST=postgres
    depends_on:
      - redis
      - postgres
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G

  agent:
    image: openclaw/agent:latest
    environment:
      - REDIS_HOST=redis
      - POSTGRES_HOST=postgres
      - GATEWAY_URL=http://gateway:8080
    depends_on:
      - redis
      - gateway
    deploy:
      replicas: 3

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=openclaw
      - POSTGRES_USER=openclaw
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  redis-data:
  postgres-data:
```

### 2.2 横向扩展

```bash
# 扩展 Gateway 实例
docker-compose up -d --scale gateway=3

# 扩展 Agent 实例
docker-compose up -d --scale agent=5
```

---

## 3. Kubernetes 部署

### 3.1 Deployment 配置

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw-gateway
  labels:
    app: openclaw
    component: gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      component: gateway
  template:
    metadata:
      labels:
        component: gateway
    spec:
      containers:
        - name: gateway
          image: openclaw/gateway:v1.2.0
          ports:
            - containerPort: 8080
          env:
            - name: REDIS_HOST
              valueFrom:
                configMapKeyRef:
                  name: openclaw-config
                  key: redis.host
            - name: POSTGRES_HOST
              valueFrom:
                configMapKeyRef:
                  name: openclaw-config
                  key: postgres.host
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
```

### 3.2 Service 配置

```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: openclaw-gateway
spec:
  type: LoadBalancer
  selector:
    component: gateway
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  sessionAffinity: ClientIP
```

### 3.3 Helm Chart

```bash
# 添加 Helm 仓库
helm repo add openclaw https://openclaw.github.io/helm-charts

# 安装
helm install openclaw openclaw/openclaw \
  --set gateway.replicas=3 \
  --set redis.enabled=true \
  --set postgres.enabled=true
```

```yaml
# values.yaml
gateway:
  replicas: 3
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    targetCPUUtilization: 70

agent:
  replicas: 5
  pool:
    minIdle: 2
    maxIdle: 10

redis:
  enabled: true
  cluster:
    enabled: true
    nodes: 6

postgres:
  enabled: true
  replication:
    enabled: true
    readReplicas: 2
```

---

## 4. 云原生部署

### 4.1 AWS EKS

```yaml
# aws/eks-cluster.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: openclaw-prod
  region: us-west-2

nodeGroups:
  - name: gateway-nodes
    instanceType: t3.large
    desiredCapacity: 3
    minSize: 2
    maxSize: 10
    volumeSize: 50
    labels:
      component: gateway

  - name: agent-nodes
    instanceType: t3.xlarge
    desiredCapacity: 5
    minSize: 3
    maxSize: 20
    volumeSize: 100
    labels:
      component: agent
```

### 4.2 Azure AKS

```bash
# 创建 AKS 集群
az aks create \
  --resource-group openclaw-rg \
  --name openclaw-prod \
  --node-count 3 \
  --enable-cluster-autoscaler \
  --min-count 2 \
  --max-count 10
```

### 4.3 GCP GKE

```bash
# 创建 GKE 集群
gcloud container clusters create openclaw-prod \
  --zone us-central1-a \
  --num-nodes 3 \
  --enable-autoscaling \
  --min-nodes 2 \
  --max-nodes 10
```

---

## 5. 边缘部署

### 5.1 Docker Edge

```bash
# Raspberry Pi / ARM 设备
docker run -d \
  --name openclaw-edge \
  --platform linux/arm64 \
  -p 8080:8080 \
  -v /opt/openclaw:/data \
  openclaw/openclaw:edge
```

### 5.2 离线模式

```yaml
# docker-compose.offline.yml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:offline
    environment:
      - MODE=offline
      - MODEL_PATH=/models
    volumes:
      - ./models:/models
      - ./data:/data

  # 本地模型缓存
  model-cache:
    image: openclaw/model-cache:latest
    volumes:
      - ./models:/cache
```

---

## 6. 部署配置

### 6.1 环境变量

```bash
# .env.production
# Gateway
GATEWAY_PORT=8080
GATEWAY_MAX_CONNECTIONS=10000

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=xxx

# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=openclaw
POSTGRES_USER=openclaw
POSTGRES_PASSWORD=xxx

# LLM Providers
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx

# Security
SESSION_SECRET=xxx
ENCRYPTION_KEY=xxx
```

### 6.2 配置文件

```yaml
# config/production.yaml
gateway:
  host: 0.0.0.0
  port: 8080
  maxConnections: 10000
  timeout: 30000

agent:
  maxConcurrent: 10
  defaultModel: gpt-4
  fallbackModels:
    - gpt-3.5-turbo
    - claude-3-haiku

storage:
  redis:
    host: redis
    port: 6379
    maxConnections: 50

  postgres:
    host: postgres
    port: 5432
    pool:
      min: 5
      max: 20

security:
  rateLimit:
    windowMs: 60000
    maxRequests: 100
```

---

## 7. 部署检查清单

### 7.1 部署前检查

- [ ] 验证配置文件的语法正确性
- [ ] 测试数据库连接
- [ ] 验证 Redis 连接
- [ ] 检查 API Keys 有效性
- [ ] 确认防火墙规则
- [ ] 验证存储卷权限

### 7.2 部署后验证

```bash
# 健康检查
curl http://localhost:8080/health

# 活跃连接数
curl http://localhost:8080/metrics | grep connections

# 日志检查
kubectl logs -l component=gateway --tail=100
```

### 7.3 回滚策略

```bash
# Docker 回滚
docker-compose rollback

# Kubernetes 回滚
kubectl rollout undo deployment/openclaw-gateway

# Helm 回滚
helm rollback openclaw 1
```

---

## 8. 容量规划

| 规模 | 用户数 | Gateway | Agent | Redis | PostgreSQL |
|------|--------|---------|-------|-------|------------|
| 小型 | < 100 | 1 | 2 | 1 节点 | 1 节点 |
| 中型 | 100-1000 | 2 | 5 | 3 节点 | 1 主 1 从 |
| 大型 | 1000-10000 | 5 | 20 | 6 节点集群 | 1 主 2 从 |
| 超大型 | > 10000 | 10+ | 50+ | 分片集群 | 分布式 |

---

*最后更新：2024年1月*
