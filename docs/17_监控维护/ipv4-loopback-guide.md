# IPv4 Loopback 网络配置指南

**来源**: PR #114766
**适用版本**: v2026.7.1-beta.1+
**更新时间**: 2026-07-28

---

## 问题描述

### 背景

在之前的版本中，OpenClaw 的模型本地服务默认将有效的 IPv4 loopback 端点（如 `127.0.0.2`、`127.0.0.3` 等）错误地识别为**远程地址**。

这导致以下问题：
- 无法使用 `127.0.0.0/8` 范围内的多个地址
- 本地模型服务部署受限
- 必须使用 `127.0.0.1` 作为唯一地址

### 修复内容

v2026.7.1-beta.1 引入了核心分类器调用规范的 `@openclaw/net-policy/ip` 谓词，正确识别 IPv4 loopback 地址。

**修复后**：现在可以在 `127.0.0.0/8` 范围内使用任何规范地址。

---

## 使用指南

### 本地模型服务配置

现在可以为同一台机器上的多个本地模型服务分配不同的 loopback 地址：

```yaml
# openclaw.json
{
  "modelProviders": [
    {
      "type": "ollama",
      "name": "llama3-local",
      "endpoint": "http://127.0.0.2:11434",
      "models": ["llama3", "mistral"]
    },
    {
      "type": "ollama",
      "name": "qwen-local", 
      "endpoint": "http://127.0.0.3:11434",
      "models": ["qwen2.5", "qwen2"]
    },
    {
      "type": "ollama",
      "name": "default",
      "endpoint": "http://127.0.0.1:11434",
      "models": ["llama3:8b"]
    }
  ]
}
```

### 多端口监听

利用 loopback 地址范围实现端口复用测试：

```yaml
modelProviders:
  - type: "openai"
    name: "dev-model"
    endpoint: "http://127.0.0.2:8080/v1"
    
  - type: "openai"
    name: "staging-model"  
    endpoint: "http://127.0.0.3:8080/v1"
```

---

## @openclaw/net-policy/ip 谓词

### 功能说明

`@openclaw/net-policy/ip` 谓词用于判断一个 IP 地址是否属于本地 loopback 范围。

### 判定规则

| 地址范围 | 类型 | 判定结果 |
|----------|------|----------|
| `127.0.0.0/8` | IPv4 loopback | ✅ 本地 |
| `::1/128` | IPv6 loopback | ✅ 本地 |
| `localhost` | 主机名 | ✅ 本地 |
| `0.0.0.0` | 绑定所有 | ⚠️ 需配置 |
| 其他 | 远程 | ❌ 远程 |

### 使用示例

```yaml
# 网络策略配置
network:
  policy:
    - name: "local-model-access"
      from: "loopback"
      to: "model-provider"
      allow: true
      
    - name: "remote-access"  
      from: "any"
      to: "external-api"
      allow: true
```

---

## 故障排除

### 问题：仍然无法连接本地服务

**检查项**：
1. 确认服务确实在 loopback 地址上监听
2. 检查防火墙规则
3. 验证服务端口未被占用

```bash
# 检查端口监听
netstat -an | grep 11434
# 或
lsof -i :11434

# 测试连接
curl http://127.0.0.2:11434/api/tags
```

### 问题：使用非标准 loopback 地址

如果使用 `127.0.0.0/8` 范围外的地址，需要在配置中显式声明：

```yaml
network:
  customLoopback:
    - "169.254.0.0/16"  # 链路本地地址（需要明确声明）
```

---

## 最佳实践

### 1. 本地开发环境

```yaml
# 开发环境推荐配置
modelProviders:
  - type: "ollama"
    name: "dev"
    endpoint: "http://127.0.0.1:11434"
    
  - type: "ollama"  
    name: "test"
    endpoint: "http://127.0.0.2:11434"
```

### 2. 多模型测试

使用不同 loopback 地址运行多个模型实例进行对比测试：

```bash
# 启动多个 Ollama 实例
OLLAMA_HOST=127.0.0.1:11434 ollama serve  # 主实例
OLLAMA_HOST=127.0.0.2:11435 ollama serve  # 测试实例
```

### 3. 端口分配建议

| 地址 | 用途 |
|------|------|
| 127.0.0.1 | 默认/主服务 |
| 127.0.0.2 | 开发/测试服务 |
| 127.0.0.3 | 备用服务 |
| 127.0.0.4+ | 临时测试 |

---

## 相关配置

| 配置项 | 说明 |
|--------|------|
| `modelProviders[].endpoint` | 模型服务地址 |
| `network.policy` | 网络访问策略 |
| `network.loopbackRanges` | 自定义 loopback 范围 |

---

## 参考链接

- [PR #114766 - IPv4 Loopback 主机识别修复](https://github.com/openclaw/openclaw/pull/114766)
- [模型配置概述](../04_模型配置/4.1_providers_overview.md)

---

*文档更新于 2026-07-28，基于官方 PR #114766*
