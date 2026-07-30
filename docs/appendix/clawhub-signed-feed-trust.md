# ClawHub Signed Feed Trust 安全指南

> 📖 来源：GitHub PR #101981 - `feat: bind signed ClawHub default feed trust`  
> ✍️ 贡献者：Gio Della-Libera (giodl73-repo)  
> ⭐ 评分：⭐⭐⭐⭐⭐  
> 📅 采集日期：2026-07-24  
> 🔒 安全等级：高

---

## 一、概述

**ClawHub Signed Feed Trust** 是 OpenClaw 与 ClawHub 之间的安全信任框架，通过签名机制确保来源可信、数据完整、不可篡改。

```
┌─────────────────────────────────────────────────────────────────┐
│           ClawHub Signed Feed Trust 架构                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  信任链条：                                                      │
│  ┌─────────────────┐    ┌──────────────────┐    ┌─────────────┐ │
│  │ clawhub-public  │───→│ payload identity  │───→│clawhub-     │ │
│  │    profile      │    │    binding        │    │official     │ │
│  └─────────────────┘    └──────────────────┘    └─────────────┘ │
│                                                                  │
│  关键特性：                                                      │
│  ✅ 内置 clawhub-public profile 绑定到 payload identity           │
│  ✅ 自定义 profile 保留环境信任                                  │
│  ✅ 支持配对 key-id/public-key 环境覆盖                          │
│  ✅ 签名 DSSE HTTP 合同强制执行                                  │
│  ✅ Payload 过期、单调回滚/等同保护                              │
│  ✅ Snapshot 重新验证                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、核心安全机制

### 2.1 信任绑定流程

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  clawhub-public │────→│ payload identity  │────→│clawhub-official │
│     profile    │     │     binding       │     │    identity    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 2.2 DSSE 合同强制执行

| 安全机制 | 说明 |
|----------|------|
| **Payload 过期检查** | 签名 payload 必须在有效期内 |
| **单调回滚保护** | 防止版本回滚攻击 |
| **等同保护** | 防止同一时间不同状态 |
| **Snapshot 重新验证** | 安装前重新验证签名 |

### 2.3 安全边界

```
┌─────────────────────────────────────────────────────────────────┐
│  安全边界定义                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ 允许的操作：                                                  │
│  - 有效签名的 snapshot 安装                                      │
│  - 过期 snapshot 查看（但不可安装）                               │
│  - Schema-v2 条目完整声明验证                                    │
│                                                                  │
│  ❌ 禁止的操作：                                                  │
│  - 过期/遗留 snapshot 安装                                       │
│  - 遗留 snapshot 剥离安装权限                                     │
│  - 无效签名验证                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、Rollout 阶段

| 阶段 | 状态 | 说明 |
|------|------|------|
| Stage 1 | ✅ 已完成 | 代码堆叠 - PR #101981 |
| Stage 2 | ⏳ 待完成 | ClawHub 签名者 + 密钥管理 |
| Stage 3 | ⏳ 待完成 | 生产公钥捆绑 + 激活 |

---

## 四、环境配置

### 4.1 内置 Profile

```bash
# 强制使用内置 clawhub-public profile
CLAWHUB_PROFILE=clawhub-public
```

### 4.2 自定义签名 Profile

```bash
# 使用自定义签名 profile（过渡期保留信任）
CLAWHUB_PROFILE=custom-signed
CLAWHUB_FEED_ID=your-feed-id
```

### 4.3 Key Pair 配置

```bash
# 公钥覆盖
CLAWHUB_PUBLIC_KEY=<base64-encoded-public-key>

# Key ID 覆盖
CLAWHUB_KEY_ID=<key-id>
```

### 4.4 完整配置示例

```yaml
clawhub:
  # 内置信任绑定
  profile: clawhub-public
  
  # 或自定义配置
  custom:
    profile: custom-signed
    feedId: your-feed-id
    publicKey: "${CLAWHUB_PUBLIC_KEY}"
    keyId: "${CLAWHUB_KEY_ID}"
  
  # 安全选项
  security:
    # 签名验证严格模式
    verifySignature: true
    # 允许过期 snapshot 查看
    allowExpiredView: true
    # 不允许过期 snapshot 安装
    allowExpiredInstall: false
```

---

## 五、信任模型详解

### 5.1 身份绑定

```
┌─────────────────────────────────────────────────────────────────┐
│  Identity Binding Flow                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. ClawHub 发布签名 feed                                        │
│     └─→ 包含 payload + DSSE 签名                                │
│                                                                  │
│  2. OpenClaw 验证签名                                           │
│     ├─→ 使用 clawhub-public profile 内置公钥                    │
│     └─→ 验证 payload identity                                   │
│                                                                  │
│  3. 信任链建立                                                   │
│     └─→ clawhub-public → payload identity → clawhub-official   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 信任级别

| 级别 | Profile | 信任度 | 用途 |
|------|---------|--------|------|
| **L0** | 内置 clawhub-public | 最高 | 官方发布 |
| **L1** | 自定义 + feedId | 中高 | 社区验证 |
| **L2** | 自定义 + 签名 | 中 | 过渡期兼容 |

### 5.3 Schema-v2 要求

```yaml
# Schema-v2 条目必须完整声明
schema-v2-entry:
  available: true      # 必需
  official:            # 必需
    - permission-pair  # 至少一个权限对
```

---

## 六、Doctor 诊断

```bash
# 诊断 ClawHub 连接状态
openclaw doctor --clawhub

# 检查签名验证
openclaw clawhub verify --feed <feed-id>

# 查看信任状态
openclaw clawhub trust status
```

---

## 七、最佳实践

### 7.1 生产环境建议

```yaml
clawhub:
  profile: clawhub-public  # 使用内置信任
  security:
    verifySignature: true
    allowExpiredInstall: false  # 禁止过期安装
```

### 7.2 开发环境配置

```yaml
clawhub:
  profile: custom-signed  # 开发用自定义
  custom:
    feedId: dev-feed-id
    publicKey: "${DEV_PUBLIC_KEY}"
  security:
    verifySignature: true
    allowExpiredInstall: false
```

### 7.3 故障排查

| 问题 | 解决方案 |
|------|----------|
| 签名验证失败 | 检查 CLAWHUB_PUBLIC_KEY 配置 |
| Feed 不可用 | 确认网络连接和 feedId 正确 |
| 过期 snapshot 无法安装 | 预期行为，需获取新版本 |
| Doctor 推断失败 | 不要从 URL 推断 feed identity |

---

## 八、相关资源

- 🔗 PR #101981: [feat: bind signed ClawHub default feed trust](https://github.com/openclaw/openclaw/pull/101981)
- 📖 [OpenClaw Security Guide](../16_安全配置/openclaw-security-guide.md)
- 🔧 [配置参考](../04_模型配置/README.md)

---

*本文档由墨客自动采集整理，基于 GitHub PR #101981 官方实现*
