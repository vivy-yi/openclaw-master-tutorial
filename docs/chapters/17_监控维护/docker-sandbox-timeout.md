# Docker Sandbox Timeout 故障排除

|字段 | 内容 |
|------|------|
| **Issue** | #91015 |
| **标题** | Docker exec timeout（未合并） |
| **严重度** | 高（Gateway 挂起） |
| **状态** | 🟡 OPEN（未合并） |
| **影响** | `sandbox.mode=all` 配置下所有 agent runs |
| **Workaround** | ✅ 可用 |

---

## 一、问题描述

### 1.1 现象

当 Docker socket 无响应或 Docker Engine 卡死时，`execDockerRaw` 函数会**无限期等待**，导致整个 Gateway 进程挂起，无法处理任何请求。

```
用户请求 → Agent Run → execDockerRaw → Docker socket 无响应 → Gateway 挂起 →❌ 所有请求超时
```

### 1.2 影响范围

| 配置项 | 说明 |
|--------|------|
| `sandbox.mode=all` | 所有 agent runs 都使用 Docker sandbox |
| `agents.defaults.sandbox.docker.initTimeoutMs` | Docker初始化超时（当前无默认值限制） |

**受影响场景**：
- CI/CD 环境中 Docker Agent 执行
- 高并发 Agent 请求导致 Docker Engine 过载
- 网络问题导致 Docker socket 通信中断

### 1.3 技术详情

| 字段 | 内容 |
|------|------|
| **PR** | #91015（未合并） |
| **修复内容** | 为 Docker exec 添加超时限制，防止无限等待 |
| **合并风险** | 🚨 compatibility + 🚨 availability |
| **最后更新** | 2026-06-06 22:01 UTC（已3天无更新） |

---

## 二、Workaround 配置

### 2.1 配置超时参数

在 `openclaw.yaml` 中添加以下配置：

```yaml
agents:
  defaults:
    sandbox:
      docker:
        # Docker初始化超时时间（毫秒）
        # 默认值：60000ms（60秒）
        initTimeoutMs: 60000
```

### 2.2 配置说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `initTimeoutMs` | number | 60000 | Docker初始化超时（毫秒） |

**配置建议**：
- 开发环境：`30000`（30秒）
- 生产环境：`60000`（60秒）
- 高负载环境：`120000`（120秒）

### 2.3 完整配置示例

```yaml
# openclaw.yaml
gateway:
  host: 0.0.0.0
  port: 18789

agents:
  defaults:
    sandbox:
      mode: all
      docker:
        # Docker exec 超时配置（毫秒）
        initTimeoutMs: 60000

        # 可选：限制并发 Docker 执行数
        maxConcurrent: 5
```

---

## 三、故障排查步骤

### 3.1 检查 Docker 状态

```bash
# 检查 Docker 服务状态
docker info

# 检查 Docker socket权限
ls -la /var/run/docker.sock

# 测试 Docker 是否响应
docker ps
```

### 3.2 检查 Gateway 日志

```bash
# 查看 Gateway 日志
openclaw gateway logs --lines 100

# 搜索 Docker 相关错误
openclaw gateway logs | grep -i docker
openclaw gateway logs | grep -i timeout
```

### 3.3 验证配置是否生效

```bash
# 检查当前 sandbox 配置
openclaw config show agents.defaults.sandbox

# 运行 doctor 检查
openclaw gateway doctor
```

### 3.4 诊断流程图

```
Gateway 无响应？
├── 是 → Docker socket 无响应？
│   ├── 是 → 检查 Docker 服务状态
│   └── 否 → 检查 initTimeoutMs 配置
└── 否 → 检查其他瓶颈
```

---

## 四、生产环境建议

### 4.1 Docker Engine 健康检查

```bash
# 在 crontab 中添加健康检查
# */5 * * * * docker info || systemctl restart docker
```

### 4.2 资源限制配置

```yaml
agents:
  defaults:
    sandbox:
      docker:
        initTimeoutMs: 60000
        
        # 可选：限制资源使用
        # 注意：这需要 Docker 开启资源配置
        # cpu: "0.5"
        # memory: "512m"
```

### 4.3 监控告警

建议配置监控，当 Docker exec 时间异常时发送告警：

```yaml
# 使用 OpenClaw 内置监控
monitoring:
  docker:
    execDurationThreshold: 30000  # 30秒以上记录日志
    alertOnTimeout: true
```

---

## 五、PR #91015 进展

### 5.1 当前状态

| 状态 | 说明 |
|------|------|
| 🟡 OPEN | PR 未合并 |
| 🚨 compatibility risk | 可能影响兼容性 |
| 🚨 availability risk | 可能影响可用性 |
| ⏳ 3天无更新 | 最后更新 2026-06-06 22:01 UTC |

### 5.2 跟踪方式

```bash
# 监控 PR状态（需要 GitHub CLI）
gh pr view 91015 --repo openclaw/openclaw

# 或访问
# https://github.com/openclaw/openclaw/pull/91015
```

### 5.3 合并后操作

PR合并后，`initTimeoutMs` 将成为**强制参数**，建议：
1. 关注官方 release notes 中的合并说明
2. 评估是否需要调整现有配置
3. 测试 Gateway 在 Docker 异常情况下的恢复能力

---

## 六、相关 Issue

| Issue | 描述 | 状态 |
|-------|------|------|
| #91015 | Docker exec timeout fix | 🟡 OPEN（未合并） |
| #85791 | macOS Gateway 连接问题 | ✅ 已修复（v2026.6.5） |
| #90668 | Gateway 内存泄漏 | ✅ 已修复（v2026.6.5） |

---

## 七、自检清单

- [ ] 确认 `sandbox.mode=all` 配置
- [ ] 配置 `initTimeoutMs` 参数（建议60000ms）
- [ ] 测试 Docker 服务异常时的 Gateway 行为
- [ ] 配置监控告警
- [ ] 定期检查 PR #91015 合并状态

---

**🦉 教程大师 | OpenClaw 故障排除指南**  
**更新日期**: 2026-06-08