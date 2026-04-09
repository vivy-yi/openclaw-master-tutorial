# OpenClaw Kubernetes 部署与问题排查

本文档介绍 OpenClaw 在 Kubernetes 环境中的部署及常见问题解决方案。

## 前提条件

- Kubernetes 1.24+
- kubectl 已配置
- Helm 3.x

## 快速开始

### 1. 添加仓库

```bash
helm repo add openclaw https://openclaw.github.io/helm-charts
helm repo update
```

### 2. 安装

```bash
helm install openclaw openclaw/openclaw \
  --namespace openclaw \
  --create-namespace \
  --set gateway.port=3100
```

### 3. 验证

```bash
kubectl get pods -n openclaw
kubectl logs -n openclaw deployment/openclaw-gateway
```

## 配置示例

### 基本配置

```yaml
# values.yaml
gateway:
  port: 3100
  model: "claude-sonnet-4-20250514"
  
replicas: 2

resources:
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

### 高可用配置

```yaml
# values-ha.yaml
gateway:
  port: 3100
  
replicas: 3

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilization: 70

persistence:
  enabled: true
  storageClass: "slow"
  size: "10Gi"
```

## 常见问题

### 🟥 K8s OOM Crashes

**问题**: v2026.3.28 版本在 K8s 启动时 OOM

**原因**: 内存分配过大

**解决方案**:

```yaml
resources:
  limits:
    memory: "4Gi"
  requests:
    memory: "2Gi"
    cpu: "500m"
```

或降级到 v2026.3.27：

```bash
helm upgrade openclaw openclaw/openclaw \
  --set image.tag=v2026.3.27
```

### 🟥 Pod 无法启动

**检查**:

```bash
kubectl describe pod -n openclaw <pod-name>
kubectl logs -n openclaw <pod-name>
```

**常见原因**:
- 端口冲突
- 资源不足
- 配置错误

### 🟥 WebSocket 连接失败

**服务暴露**:

```yaml
service:
  type: LoadBalancer
  ports:
    - name: gateway
      port: 3100
      targetPort: 3100
```

### 健康检查

```bash
kubectl exec -it <pod-name> -n openclaw -- openclaw doctor
```

## 监控

### Prometheus 配置

```yaml
metrics:
  enabled: true
  port: 3101
  path: "/metrics"
```

### Grafana Dashboard

导入 OpenClaw dashboard ID: `17900`

## 相关资源

- [OpenClaw Helm Charts](https://github.com/openclaw/helm-charts)
- [K8s 部署文档](https://docs.openclaw.ai/deploy/kubernetes)