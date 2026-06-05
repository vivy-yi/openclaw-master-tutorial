# 第16章 安全与权限

本章节帮助你掌握 OpenClaw 的安全机制，包括权限管理、数据安全、审计日志、多密钥治理、密钥管理等。

## 内容导航

| 小节 | 主题 | 核心内容 |
|-----|------|---------|
| [16.1](./16.1_security_overview.md) | 安全概述 | 安全架构、分层防御 |
| [16.2](./16.2_permission.md) | 权限管理 | Profile 机制、工具权限 |
| [16.3](./16.3_data_security.md) | 数据安全 | 加密、敏感信息保护 |
| [16.4](./16.4_audit_log.md) | 审计日志 | 日志记录、查询分析 |
| [16.5](./16.5_auth_profiles.md) | 多密钥治理 | keys、keyId、轮换策略 |
| [16.6](./16.6_secrets_management.md) | 密钥管理 | SecretRef、密钥提供商、1Password/Vault 集成 |
| [16.7](./16.7_security_advisory_84337.md) | 安全通告 | Hook ingress token 认证绕过漏洞 |
| [16.8](./16.8_secretref_migration.md) | 密钥迁移 | SecretRef 迁移指南 |
| [16.9](./16.9_security_advisory_90014.md) | 安全通告 | ReDoS 漏洞：exec approval argPattern 正则匹配 |
| [16.10](./16.10_security_advisory_90013.md) | 安全通告 | 安装程序执行未验证的下载脚本 |
| [16.11](./16.11_operator_install_policy.md) | 安全专题 | Operator Install Policy：插件安装安全机制重构（替代 dangerous-code scanner） |

## 学习目标

完成本章后，你将能够：

- ✅ 理解 OpenClaw 安全架构与分层防御
- ✅ 掌握 Profile 机制与工具权限管理
- ✅ 理解数据加密与敏感信息保护
- ✅ 掌握审计日志的记录与查询
- ✅ 理解多密钥治理与轮换策略
- ✅ 掌握密钥泄露应急响应流程
- ✅ 配置 SecretRef 密钥管理
- ✅ 理解 Operator Install Policy 安全机制

## 快速导航

- [上一章：12 云端部署 →](../12_云端部署/)
- [下一章：14 监控维护 →](../14_监控维护/)
- [文档总览 →](../)

---

**最后更新**：2026-06-06（由墨客-生成审核发布 cron 自动更新）
