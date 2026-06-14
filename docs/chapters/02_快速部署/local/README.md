# 本地部署

> 在本地设备上运行 OpenClaw，适合开发测试和个人使用

---

## 部署方式

| 文档 | 说明 | 适用场景 |
|------|------|---------|
| [local-deploy.md](./local-deploy.md) | Mac/Linux/Windows 本地部署 | 开发测试 |
| [mobile-deploy.md](./mobile-deploy.md) | Android/Termux 部署 | 手机运行 |

---

## 方案对比

| 方案 | 平台 | 难度 | 说明 |
|------|------|------|------|
| **官方脚本** | Mac/Linux/Windows | ⭐ | 一键安装 |
| **Docker Desktop** | Mac/Windows/Linux | ⭐⭐ | 容器化 |
| **Termux** | Android | ⭐⭐ | 手机运行 |

---

## 本地部署优势

```
┌─────────────────────────────────────────────────────────────────┐
│                     本地部署优势                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ 成本低                                                      │
│     └── 无需购买服务器                                          │
│                                                                  │
│  ✅ 隐私好                                                      │
│     └── 数据留在本地                                            │
│                                                                  │
│  ✅ 开发友好                                                    │
│     └── 快速迭代，即时调试                                      │
│                                                                  │
│  ❌ 需要设备一直开着                                            │
│  ❌ 无法公网访问（需要内网穿透）                                │
│  ❌ 性能和存储受限于本地硬件                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 适用场景

| 场景 | 推荐方案 |
|------|---------|
| **日常开发** | 官方脚本 + IDE |
| **快速测试** | Docker Desktop |
| **移动使用** | Termux (Android) |
| **演示展示** | 本地 + ngrok |

---

## 快速开始

### Mac / Linux

```bash
# 一键安装
curl -fsSL https://openclaw.ai/install.sh | sh

# 启动
openclaw
```

### Windows

```powershell
# PowerShell 安装
irm https://openclaw.ai/install.ps1 | iex

# 启动
openclaw
```

### Docker Desktop

```bash
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/root/.openclaw \
  openclaw/openclaw:latest
```

### Android Termux

```bash
# 安装 Termux
# 在 F-Droid 下载 Termux

# 安装 OpenClaw
pkg install openclaw
openclaw
```

---

## 文档目录

```
local/
├── README.md              # 本文件
├── local-deploy.md        # 本地电脑部署（Mac/Linux/Windows）
└── mobile-deploy.md       # 移动端部署（Android/Termux）
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [本地部署](./local-deploy.md) | 详细本地部署指南 |
| [移动端部署](./mobile-deploy.md) | Android/Termux |
| [首次运行](../2.4_first_run.md) | 启动和配置 |
| [配置指南](../2.3_configuration.md) | OpenClaw 配置 |
| [故障排查](../cloud/troubleshooting.md) | 常见问题解决 |

---

*最后更新: 2026-04-21*
