# 远程编码会话 (Remote Coding Sessions)

> **版本**: v2026.7.2-beta.3+  
> **状态**: 🟡 Beta  
> **最后更新**: 2026-07-24

## 概述

远程编码会话是 OpenClaw v2026.7.2 引入的核心功能，允许用户在云工作站（Cloud Workers）上运行 Control UI 会话，并在本地终端中恢复 Codex、Claude Code 会话。

## 核心功能

### 1. Cloud Workers 云工作站

Cloud Workers 是 OpenClaw 提供的远程会话执行能力：

- **会话放置**: 自动将会话分配到合适的云工作节点
- **调度优化**: 根据负载和延迟选择最优工作节点
- **路由转发**: 将用户交互转发到远程会话

```yaml
# 配置文件示例
cloudWorkers:
  enabled: true
  defaultRegion: us-west-2
  autoScale: true
```

### 2. 终端会话恢复

支持在终端中直接恢复多种编码会话：

| 会话类型 | 命令 | 描述 |
|---------|------|------|
| Codex | `opencode resume` | 恢复 Codex 会话 |
| Claude Code | `claude resume` | 恢复 Claude Code 会话 |
| Pi | `pi session resume` | 恢复 Pi 会话 |

### 3. Control UI 集成

Control UI 现在支持在云工作站上运行：

- 直接在云端启动 Control UI 会话
- 跨设备无缝切换
- 本地终端与云端会话状态同步

## 使用场景

### 场景 1: 云端开发环境

```
用户 A 在咖啡店使用轻薄本 → 通过 Cloud Worker 运行完整开发环境 → 代码保存在云端
```

### 场景 2: 跨设备编码

```
用户在家用 Mac 开发 → 出差时用 Windows PC → 通过终端直接恢复原有会话
```

### 场景 3: 资源密集任务

```
大型代码分析任务 → Cloud Worker 提供更强算力 → 本地设备无感知
```

## 配置指南

### 启用 Cloud Workers

```bash
# 通过 CLI 启用
openclaw config set cloudWorkers.enabled true

# 指定默认区域
openclaw config set cloudWorkers.defaultRegion us-east-1
```

### 终端会话管理

```bash
# 列出可用会话
openclaw sessions list

# 恢复特定会话
openclaw sessions resume --session-id <id>

# 在终端启动新会话
openclaw sessions start --type codex --cloud
```

## 技术细节

### 关联 PRs

| PR | 描述 |
|----|------|
| #107670 | Cloud Workers 核心功能 |
| #107086 | Control UI Catalog Terminals |
| #107200 | 终端会话恢复协议 |

### 依赖要求

- OpenClaw Gateway v2026.7.1+
- 配对节点支持（可选，本地终端恢复时需要）

## 注意事项

1. **网络依赖**: 远程会话需要稳定网络连接
2. **数据安全**: 云端会话数据加密传输和存储
3. **成本控制**: Cloud Worker 使用按量计费，建议设置使用上限

## 相关文档

- [Cloud Workers 架构](./cloud-workers.md)
- [配对节点编码](./paired-node-coding.md)
- [v2026.7.2-beta.3 Changelog](../changelog/v2026.7.2-beta.3.md)

---

*文档基于 OpenClaw v2026.7.2-beta.3 官方 Release Notes*
