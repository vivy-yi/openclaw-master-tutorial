# 第2章 10分钟快速部署

> **本章学习目标**: 在10分钟内完成 OpenClaw 首次部署
> **预计用时**: 10-30分钟
> **前置要求**: Node.js >= 22.0（部分部署方式）

---

## 部署方案

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|-----|-----|---------|
| **本地部署** | 免费、隐私好 | 需要设备一直开着 | 开发测试 |
| **云端部署** | 24/7在线 | 需要服务器费用 | 生产环境 |

---

## 快速导航

```
02_快速部署/
│
├── 本地部署/
│   ├── README.md            # 本地部署入口
│   ├── local-deploy.md      # Mac/Linux/Windows
│   └── mobile-deploy.md     # Android/Termux
│
├── cloud/                   # 🌤️ 云端部署
│   ├── README.md            # 云端部署入口
│   ├── volc-engine-deploy.md    # 火山引擎
│   ├── tencent-deploy.md         # 腾讯云
│   ├── aliyun-ecs-deploy.md      # 阿里云
│   ├── oracle-cloud-deploy.md    # Oracle Cloud
│   ├── digitalocean-deploy.md    # DigitalOcean
│   ├── 1panel-deploy.md          # 1Panel
│   ├── multi-cloud-deploy.md    # 多云部署
│   ├── servers-comparison.md    # 平台对比
│   ├── troubleshooting.md        # 故障排查
│   └── docker-agent-architecture.md  # 原理分析
│
├── 基础文档/
│   ├── 2.1_requirements.md   # 系统要求
│   ├── 2.2_installation.md  # 安装步骤
│   ├── 2.3_configuration.md # 配置详解
│   └── 2.4_first_run.md     # 首次运行
│
└── 飞书零部署/
    └── ../05_渠道集成/飞书零部署指南.md  # 无需公网
```

---

## 基础文档

| 文档 | 内容 | 预计用时 |
|------|------|---------|
| [2.1_requirements.md](./2.1_requirements.md) | 系统要求与运行前检查 | 10分钟 |
| [2.2_installation.md](./2.2_installation.md) | 安装步骤 | 10分钟 |
| [2.3_configuration.md](./2.3_configuration.md) | 配置文件详解 | 15分钟 |
| [2.4_first_run.md](./2.4_first_run.md) | 首次运行与验证 | 10分钟 |

---

## 新手推荐路径

```
┌─────────────────────────────────────────────────────────────┐
│                    新手部署路径                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 阅读 [系统要求](../2.1_requirements.md)                   │
│     └── 确认环境符合要求                                    │
│                                                              │
│  2. 选择部署方式：                                          │
│     ├── 本地部署 → [local-deploy.md](./local/)             │
│     └── 云端部署 → [cloud/README.md](./cloud/)             │
│                                                              │
│  3. 按照部署指南完成安装                                    │
│                                                              │
│  4. 阅读 [首次运行](./2.4_first_run.md)                     │
│     └── 验证安装成功                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 官方文档

**OpenClaw 官方安装文档**：https://docs.openclaw.ai/install

---

## 补充教程资源

| 教程 | 来源 | 特点 |
|------|------|------|
| [OpenClaw 新手入门手册（CSDN）](https://agent.csdn.net/69b37bfa7bbde9200ba0a052.html) | CSDN | 系统化入门路径 |
| [10分钟快速安装与配置（博客园）](https://www.cnblogs.com/gdutxiaoxu/p/19675485) | 博客园 | 快速上手 |
| [全场景超详细OpenClaw实操指南（米豆学社）](https://www.midou55.com/123791.html) | 米豆学社 | 覆盖场景最全 |
| [OpenClaw新手必看！从零到精通（B站）](https://www.bilibili.com/read/cv45574675) | B站视频 | 视频教程 |
| [3.2万字系统化教程（知乎）](https://zhuanlan.zhihu.com/p/2015027745743189513) | 知乎 | 深度全面 |

---

## 本章小结

1. **本地部署**：适合开发测试，免费且快速
2. **云端部署**：适合生产环境，24/7 在线
3. **飞书零部署**：无需公网服务器，5 分钟配置

---

*最后更新: 2026-04-21*
