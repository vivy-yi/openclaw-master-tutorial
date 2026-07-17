# MCP 故障排查指南

> **适用版本**: v2026.6.5+  
> **最后更新**: 2026-06-10  
> **相关 PR**: #91406

---

## 一、概述

本文档涵盖 MCP (Model Context Protocol) 常见故障的排查方法与解决方案。

**相关文档**：
- [MCP 官方文档](https://docs.openclaw.ai/mcp)
- [MCP Server 配置](./MCP服务器配置.md)

---

## 二、常见故障

### 2.1 MCP SSE Authorization 401 错误

> **严重程度**: P1 ⭐⭐⭐⭐⭐  
> **影响版本**: v2026.6.0 ~ v2026.6.4  
> **修复版本**: v2026.6.5+

#### 问题描述

使用 HTTP/SSE MCP server 配合 bearer token 认证时，出现 HTTP 401 错误。

**错误日志**：
```
Error: MCP request failed with status 401
Unauthorized
```

#### 原因分析

MCP SSE transport 的 `buildSseEventSourceFetch` 在合并 headers 时：
- SDK 自动添加的 `authorization` header（ 小写）
- 用户配置的 `Authorization` header（ 大写）

两个 header 同时存在导致服务器只识别最后一个，从而认证失败。

#### 解决方案

**方案一：升级到 v2026.6.5+**

```bash
# 使用 Homebrew 升级
brew upgrade openclaw

# 或手动下载最新版本
# https://github.com/openclaw/openclaw/releases
```

**方案二：临时 Workaround（v2026.6.4 及以下）**

在 MCP server 配置中使用小写 `authorization` header：

```yaml
mcp_servers:
  homeassistant:
    url: http://homeassistant:8080/mcp
    headers:
      authorization: "Bearer your_token_here"
```

**注意**：某些 MCP server 可能不识别小写 header，此方案可能需要同时修改 server 端配置。

#### 验证方法

1. 升级后重启 OpenClaw
2. 测试 MCP 工具调用：
   ```bash
   openclaw doctor
   ```
3. 检查 MCP server 连接状态

---

### 2.2 MCP 工具调用超时

#### 问题描述

MCP 工具调用超过默认超时时间（通常 30 秒）后返回超时错误。

**错误日志**：
```
Error: MCP tool execution timed out after 30000ms
```

#### 解决方案

1. **增加超时配置**：
   ```yaml
   mcp_servers:
     your_server:
       timeout: 120000  # 120 秒
   ```

2. **优化工具调用**：
   - 减少返回数据量
   - 使用分页参数
   - 考虑在 MCP server 端进行数据预处理

---

### 2.3 MCP 工具返回类型错误

> **相关修复**: v2026.6.5+ 中的 MCP 工具结果边界强制转换

#### 问题描述

MCP provider 返回的工具结果类型不符合 OpenClaw 预期，导致 Provider 400 错误。

**错误日志**：
```
Error: Invalid tool result type. Expected object, got array
```

#### 解决方案

**升级到 v2026.6.5+**，该版本已包含类型强制转换修复。

---

### 2.4 MCP Server 连接失败

#### 问题描述

无法连接到 MCP server。

**错误日志**：
```
Error: connect ECONNREFUSED 127.0.0.1:8080
```

#### 排查步骤

1. **检查 MCP server 是否运行**：
   ```bash
   # 检查进程
   ps aux | grep mcp_server
   
   # 检查端口
   lsof -i :8080
   ```

2. **检查配置**：
   ```yaml
   mcp_servers:
     your_server:
       url: http://127.0.0.1:8080  # 使用 IP 而非 localhost
   ```

3. **检查网络**：
   - 确认防火墙允许
   - 确认容器/VM 网络配置正确

---

## 三、诊断命令

### 3.1 MCP 状态检查

```bash
openclaw doctor --mcp
```

### 3.2 MCP 配置验证

```bash
openclaw config validate --mcp
```

### 3.3 日志查看

```bash
# 查看 MCP 相关日志
openclaw logs --grep MCP

# 查看实时日志
openclaw logs -f --grep MCP
```

---

## 四、配置参考

### 4.1 MCP Server 完整配置

```yaml
mcp_servers:
  # Home Assistant 示例
  homeassistant:
    url: http://homeassistant:8124/mcp
    headers:
      Authorization: "Bearer ${HA_TOKEN}"
    timeout: 60000
    transport: sse
    
  # 自定义 MCP Server
  custom:
    url: http://localhost:3000/mcp
    command: node /path/to/server.js
    args:
      - --port
      - "3000"
    env:
      API_KEY: ${API_KEY}
```

### 4.2 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `MCP_SERVER_URL` | MCP server 地址 | `http://localhost:8080/mcp` |
| `MCP_TIMEOUT` | 超时时间（毫秒） | `30000` |
| `MCP_TRANSPORT` | 传输协议 | `sse`, `stdio` |

---

## 五、获取帮助

- **官方文档**: https://docs.openclaw.ai/mcp
- **GitHub Issues**: https://github.com/openclaw/openclaw/issues
- **Discord**: https://discord.gg/openclaw

---

*🦉 教程大师 | MCP 故障排查指南 | 最后更新 2026-06-10*