# 云端部署

> 在云服务器上部署 OpenClaw，实现 24/7 在线运行

---

## ⚠️ 官方文档优先

**强烈推荐直接参考 OpenClaw 官方文档**：https://docs.openclaw.ai/install

---

## 官方文档覆盖

### Containers（容器运行时）

| 容器 | 说明 | 官方文档 |
|------|------|---------|
| **Docker** | 通用容器，最流行 | [docs.openclaw.ai/install/docker](https://docs.openclaw.ai/install/docker) |
| **Podman** | 无守护进程，rootless | [docs.openclaw.ai/install/podman](https://docs.openclaw.ai/install/podman) |
| **Ansible** | 自动化配置管理 | [docs.openclaw.ai/install/ansible](https://docs.openclaw.ai/install/ansible) |
| **Nix** | 可重现构建 | [docs.openclaw.ai/install/nix](https://docs.openclaw.ai/install/nix) |
| **Bun** | 实验性支持 | [docs.openclaw.ai/install/bun](https://docs.openclaw.ai/install/bun) |

### Hosting（托管平台）

| 平台 | 官方文档 |
|------|---------|
| Oracle Cloud, DigitalOcean, Fly.io, Render, Railway | [docs.openclaw.ai/install](https://docs.openclaw.ai/install) |
| GCP, Azure, Hetzner, Hostinger, Kubernetes | [docs.openclaw.ai/install](https://docs.openclaw.ai/install) |
| Linux Server, Raspberry Pi, macOS VMs, Northflank | [docs.openclaw.ai/install](https://docs.openclaw.ai/install) |

---

## 本教程内容

### 🇨🇳 国内云服务器（独家）

| 文档 | 说明 | 价格 |
|------|------|------|
| [volc-engine-deploy.md](./volc-engine-deploy.md) | 火山引擎 | ¥9.9/月起 |
| [tencent-deploy.md](./tencent-deploy.md) | 腾讯云轻量 | ¥24/月起 |
| [aliyun-ecs-deploy.md](./aliyun-ecs-deploy.md) | 阿里云 ECS | ¥30/月起 |

### 🌍 海外云服务器

| 文档 | 说明 |
|------|------|
| [servers-comparison.md](./servers-comparison.md) | 平台对比总览 |
| [oracle-cloud-deploy.md](./oracle-cloud-deploy.md) | 永久免费 4核 24GB |
| [digitalocean-deploy.md](./digitalocean-deploy.md) | 官方 App Platform |

### 🔧 特殊方案

| 文档 | 说明 | Stars |
|------|------|-------|
| [1panel-deploy.md](./1panel-deploy.md) | 国产可视化面板 | ⭐35k |
| [multi-cloud-deploy.md](./multi-cloud-deploy.md) | 多云统一部署 | 社区 |
| [deploy-solutions-overview.md](./deploy-solutions-overview.md) | 方案总览 | GitHub |

### 📖 原理与运维

| 文档 | 说明 |
|------|------|
| [docker-agent-architecture.md](./docker-agent-architecture.md) | 深度原理分析 |
| [troubleshooting.md](./troubleshooting.md) | 故障排查汇总 |
| [deploy-template.md](./deploy-template.md) | 文档模板 |

### 📦 官方备份

| 文档 | 说明 |
|------|------|
| [official/](./official/) | 官方文档备份（仅供参考） |

---

## 快速选择

```
┌─────────────────────────────────────────────────────────────┐
│                    国内用户                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🥇 性价比首选 ──────────▶ 火山引擎 ¥9.9/月               │
│     └── [volc-engine-deploy.md](./volc-engine-deploy.md)   │
│                                                              │
│  🥈 国内首选 ───────────▶ 腾讯云轻量 ¥24/月               │
│     └── [tencent-deploy.md](./tencent-deploy.md)          │
│                                                              │
│  🥉 品牌保障 ───────────▶ 阿里云 ECS ¥30/月               │
│     └── [aliyun-ecs-deploy.md](./aliyun-ecs-deploy.md)    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    海外用户                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  永久免费 ────────────▶ Oracle Cloud                        │
│     └── [oracle-cloud-deploy.md](./oracle-cloud-deploy.md)  │
│                                                              │
│  官方出品 ───────────▶ DigitalOcean                         │
│     └── [digitalocean-deploy.md](./digitalocean-deploy.md) │
│                                                              │
│  边缘部署 ───────────▶ Fly.io                               │
│     └── 官方文档 → docs.openclaw.ai/install/fly           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 飞书零部署

> 无需公网服务器，直接在飞书内使用 OpenClaw

| 文档 | 说明 | Stars |
|------|------|-------|
| [飞书零部署指南](../05_渠道集成/飞书零部署指南.md) | 无需 ngrok/公网 | ⭐321 |

---

## 文档结构

```
cloud/
├── README.md                    # 本文件
│
├── 🇨🇳 国内云服务器
├── volc-engine-deploy.md       # 火山引擎
├── tencent-deploy.md           # 腾讯云轻量
└── aliyun-ecs-deploy.md        # 阿里云 ECS
│
├── 🌍 海外云服务器
├── servers-comparison.md       # 平台对比
├── oracle-cloud-deploy.md      # Oracle Cloud
└── digitalocean-deploy.md      # DigitalOcean
│
├── 🔧 特殊方案
├── 1panel-deploy.md           # 1Panel 可视化
├── multi-cloud-deploy.md      # 多云统一
└── deploy-solutions-overview.md # 方案总览
│
├── 📖 原理与运维
├── docker-agent-architecture.md # 深度原理
└── deploy-template.md         # 文档模板
│
└── official/                   # 官方文档备份
    ├── 2.5_docker.md
    ├── 2.6_cloud.md
    ├── 2.8_cloud_fly.md
    └── 2.9_cloud_advanced.md
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [飞书零部署](../05_渠道集成/飞书零部署指南.md) | 无需公网服务器 |
| [本地部署](../local/) | 本地设备部署 |
| [官方文档](https://docs.openclaw.ai/install) | OpenClaw 官方安装文档 |

---

*最后更新: 2026-04-21*
