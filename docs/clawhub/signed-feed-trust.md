# ClawHub Signed Feed Trust

> **功能版本**: v2026.7.2+  
> **PR**: [#101981](https://github.com/openclaw/openclaw/pull/101981)  
> **贡献者**: Gio Della-Libera  
> **状态**: ✅ 已合并

---

## 概述

ClawHub Signed Feed Trust 是 OpenClaw v2026.7.2 引入的安全增强功能，旨在确保插件源的身份验证和完整性保护。

### 核心目标

| 目标 | 说明 |
|------|------|
| **身份绑定** | 将内置 `clawhub-public` profile 绑定到 `clawhub-official` 负载身份 |
| **完整性保护** | 通过 Ed25519 签名验证插件包的完整性 |
| **防回滚攻击** | 防止降级到恶意旧版本 |
| **过期保护** | 拒绝使用过期签名的插件包 |

---

## 工作原理

### 1. 签名架构

```
┌─────────────────────────────────────────────────────────────┐
│                      ClawHub 服务端                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Ed25519 私钥 (生产密钥)                      │   │
│  │           存储在 ClawHub 部署密钥存储                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           签名插件包 (DSSE 格式)                       │   │
│  │           - payload (插件内容)                        │   │
│  │           - signature (Ed25519 签名)                  │   │
│  │           - keyId (公钥标识)                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP + DSSE
┌─────────────────────────────────────────────────────────────┐
│                      OpenClaw 客户端                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Ed25519 公钥 (预置/环境变量覆盖)              │   │
│  │           - keyId                                   │   │
│  │           - publicKey                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           签名验证引擎                                │   │
│  │           1. 验证签名有效性                           │   │
│  │           2. 检查 payload 过期时间                    │   │
│  │           3. 防止回滚攻击                            │   │
│  │           4. 重验证快照                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2. DSSE (Dead Simple Signing Envelopes)

OpenClaw 使用 DSSE 格式进行签名交换：

```json
{
  "payloadType": "application/vnd.openclaw.plugin-manifest+json",
  "payload": "<base64 encoded plugin content>",
  "signatures": [
    {
      "keyId": "clawhub-official-2026",
      "signature": "<Ed25519 signature>"
    }
  ]
}
```

### 3. 安全特性

#### 3.1 Payload 过期机制

每个签名包包含过期时间：

| 字段 | 说明 |
|------|------|
| `notBefore` | 签名生效时间 |
| `notAfter` | 签名过期时间 |
| `issuedAt` | 签发时间 |

**验证规则**: `notBefore ≤ 当前时间 ≤ notAfter`

#### 3.2 防回滚攻击

OpenClaw 维护一个快照版本数据库：

```
snapshot_v3 (最新) ←→ snapshot_v2 ←→ snapshot_v1 (已废弃)
     │                    │                │
     ▼                    ▼                ▼
  可安装              可见但不可安装       隐藏
```

**规则**:
- 过期或无过期时间的快照**保持可见**但**不可安装**
- 安装权限在回滚场景下会被剥离

#### 3.3 equivocation 防护

equivocation 攻击指服务器对不同客户端返回不同签名。OpenClaw 通过以下方式防护：

1. **单调性检查**: 确保新快照版本号 > 旧版本号
2. **密钥轮换验证**: 支持密钥更新并验证新旧密钥关系
3. **重验证机制**: 使用 ETag 进行 304 条件重验证

---

## 配置选项

### 1. 内置 Profile

OpenClaw 预置了官方 ClawHub profile：

```yaml
# 内置 clawhub-public profile (已身份绑定到 clawhub-official)
profiles:
  clawhub-public:
    feedId: clawhub-official
    url: https://registry.clawhub.ai
    verify: true
```

### 2. 环境变量覆盖

| 环境变量 | 说明 | 示例 |
|----------|------|------|
| `OPENCLAW_CLAWHUB_KEY_ID` | 公钥标识 | `clawhub-official-2026` |
| `OPENCLAW_CLAWHUB_PUBLIC_KEY` | Ed25519 公钥 (Base64) | `base64:MCowBQYDK...` |

**要求**: 必须同时设置两个变量，否则启动时**失败关闭** (fail closed)

### 3. 自定义 Signed Profile

对于使用自定义签名 profile 的用户：

```yaml
profiles:
  my-custom-feed:
    feedId: my-org-feed
    url: https://internal.clawhub.company.com
    verify: true
    keyId: my-org-2026
    publicKey: "base64:MCowBQYDK..."
```

#### 兼容性说明

| 场景 | 行为 |
|------|------|
| 现有自定义 signed profile **无** `feedId` | 在过渡期保留签名验证但**无** payload 身份绑定 |
| 新建 signed profile | **必须**声明完整的 `available` + `official` 安装权限对 |
| 缺少 `feedId` | 诊断并提示用户补充 |

---

## Schema v2 要求

对于 Schema v2 格式的插件清单，新增要求：

```json
{
  "schemaVersion": 2,
  "name": "my-plugin",
  "versions": ["1.0.0"],
  "authority": {
    "available": "https://registry.clawhub.ai",
    "official": "clawhub-official"
  }
}
```

**规则**: 缺少 `authority.available` 或 `authority.official` 的条目在 catalog overlays 或 clones 之前会**失去安装权限**。

---

## 信任根分发

### 官方信任根

OpenClaw 官方分发以下信任根：

| 环境 | Key ID | 公钥来源 |
|------|--------|----------|
| 生产 | `clawhub-official-2026` | ClawHub 官方部署 |
| 测试 | `clawhub-staging-2026` | ClawHub 预发布环境 |

### Doctor 迁移

运行 `openclaw doctor` 时会检测并报告：

```
⚠️  Missing ClawHub trust root
   Run: openclaw doctor --fix-clawhub-trust
   
🔐 ClawHub trust root configured
   Key ID: clawhub-official-2026
   Valid until: 2027-01-01
```

---

## 生产部署注意事项

### 1. ClawHub 服务端要求

ClawHub 必须提供：

- ✅ Ed25519 私钥的安全存储
- ✅ 私钥访问和签名接口
- ✅ 公钥和 Key ID 的公开端点

### 2. OpenClaw 客户端要求

- ✅ 接收重言式等效的刷新证明 (refresh proof)
- ✅ 验证签名时间和过期时间
- ✅ 维护本地缓存的签名状态

### 3. 激活条件

| 阶段 | 说明 |
|------|------|
| **阶段 1** (当前) | 代码栈落地，trust binding 强制执行 |
| **阶段 2** | ClawHub 提供签名实现和密钥传递 |
| **阶段 3** | OpenClaw 接收生产公钥信任根 |
| **阶段 4** | 激活生产默认签名验证 |

---

## 故障排查

### 常见错误

#### 1. 签名验证失败

```
Error: Signature verification failed for plugin "xxx"
Cause: Public key does not match signature
Solution: 
  1. Verify ClawHub registry URL is correct
  2. Check OPENCLAW_CLAWHUB_PUBLIC_KEY is set correctly
  3. Contact plugin author if issue persists
```

#### 2. Payload 已过期

```
Error: Plugin payload has expired
Plugin: xxx@1.0.0
Expired at: 2026-07-01T00:00:00Z
Solution: 
  1. Request plugin author to re-sign with longer expiry
  2. Use --force with caution
```

#### 3. 回滚检测

```
Error: Snapshot version regression detected
Current: v5, Attempted: v3
Solution: 
  1. Clear local snapshot cache: rm -rf ~/.openclaw/snapshots/
  2. Re-sync with ClawHub
```

#### 4. 环境变量不完整

```
Error: Incomplete ClawHub key configuration
Both OPENCLAW_CLAWHUB_KEY_ID and OPENCLAW_CLAWHUB_PUBLIC_KEY required
Solution: Set both environment variables
```

### 调试模式

启用调试日志：

```bash
OPENCLAW_LOG=debug openclaw install <plugin-name>
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [Plugin Installation](../16_安全配置/plugin-security.md) | 插件安装安全配置 |
| [MCP Isolation](../16_安全配置/mcp-isolation.md) | MCP 隔离安全模型 |
| [OpenClaw Doctor](../17_监控维护/openclaw-doctor.md) | 诊断工具 |

---

## 更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-07-24 | v2026.7.2 | 初始文档创建 (Gio Della-Libera) |

---

*本文档基于 [PR #101981](https://github.com/openclaw/openclaw/pull/101981) 生成*
