# Base64 传输问题

> **Issues**: [#94280](https://github.com/openclaw/openclaw/issues/94280) + [#94281](https://github.com/openclaw/openclaw/pull/94281)  
> **标签**: P1 · nodes · base64 · screenshots  
> **状态**: 🔴 Open (#94280) → ✅ 已修复合并 (#94281, 2026-06-18)  
> **影响版本**: OpenClaw 2026.6.x  
> **发现者**: @node-operator  
> **修复PR**: #94281 (merged 2026-06-18)

---

## 一、问题概述

### 1.1 问题描述

在 OpenClaw 节点集成中，较大的 Base64 编码负载（如截图）在传输过程中被**截断**，导致截图无法正常交付。

这影响：
- 远程节点截图功能
- 图像数据的完整性
- 依赖视觉反馈的工作流

### 1.2 影响范围

| 受影响场景 | 数据类型 | 截断阈值 | 严重程度 |
|-----------|---------|---------|---------|
| 节点截图传输 | Base64 图像 | > 4MB | 🔴 P1 |
| 节点文件传输 | Base64 文件 | > 4MB | 🔴 P1 |
| 跨节点数据同步 | 任意 Base64 | > 4MB | 🔴 P1 |

### 1.3 根本原因

节点集成在处理 `invoke` 结果时，较大的 Base64 有效载荷缺少大小检查和清理逻辑，导致传输管道截断数据。

---

## 二、错误日志

### 2.1 问题表现

```
# 截图请求成功，但图像数据不完整
[node] Invoke camera_snap completed
[node] Base64 payload size: 4,194,304 bytes (truncated)
[node] Warning: payload exceeds transmission limit

# 客户端收到的图像无法解码
[client] ERROR: Image decode failed - incomplete base64 data
```

### 2.2 错误触发条件

```text
□ 节点捕获了较大的截图（> 4MB）
□ Base64 编码后超过传输限制
□ invoke 结果在序列化时被截断
□ 接收端无法解码不完整的 Base64
```

---

## 三、相关 Issue

### 3.1 Issue #94280

**报告内容**:
> base64 truncation prevents screenshot delivery - Screenshots larger than ~4MB (before base64 encoding) get silently truncated during node invoke result serialization, resulting in corrupted images on the client side.

### 3.2 PR #94281

**修复内容**:
> fix(nodes): sanitize large base64 payloads in invoke results - Added size validation and chunking for large base64 payloads in node invoke results.

---

## 四、workaround 临时方案

### 4.1 方案一：降低图像质量

```bash
# 使用较低分辨率截图
openclaw nodes camera_snap \
  --node <node-id> \
  --max-width 1024 \
  --quality 0.7

# 避免全屏截图
openclaw nodes camera_snap \
  --node <node-id> \
  --crop "0,0,1920,1080"
```

### 4.2 方案二：压缩后传输

```bash
# 先压缩再截图
openclaw nodes camera_snap \
  --node <node-id> \
  --format jpeg \
  --quality 60

# 使用文件传输而非 Base64
openclaw nodes invoke \
  --node <node-id> \
  --command camera_snap \
  --output-file /tmp/screenshot.jpg
```

### 4.3 方案三：分块传输

如果业务允许，可将大图分割为多个小图：

```javascript
// 分块截图
async function chunkedScreenshot(nodeId, chunkSize = 10) {
  const width = 3840;
  const height = 2160;
  const chunks = [];
  
  for (let i = 0; i < chunkSize; i++) {
    const result = await nodes.invoke(nodeId, {
      command: 'camera_snap',
      crop: `0,${i * (height/chunkSize)},${width},${(i+1) * (height/chunkSize)}`
    });
    chunks.push(result);
  }
  
  return chunks;
}
```

---

## 五、修复说明

### 5.1 修复内容 (PR #94281)

在节点 `invoke` 结果中添加大型 Base64 有效载荷的清理和分块：

**关键修改**：
1. 添加大小验证（默认阈值 4MB）
2. 实现自动分块机制
3. 添加传输警告日志
4. 支持配置自定义阈值

### 5.2 验证修复

```bash
# 查看节点状态
openclaw nodes status --json | jq '.'

# 截图测试
openclaw nodes camera_snap \
  --node <node-id> \
  --max-bytes 5242880  # 5MB 限制

# 检查日志
openclaw logs --filter "base64" --since 1h
```

---

## 六、相关 Issue

| Issue/PR | 说明 | 状态 |
|----------|------|------|
| [#94280](https://github.com/openclaw/openclaw/issues/94280) | Base64 截断问题 | 🔴 Open → 修复中 |
| [#94281](https://github.com/openclaw/openclaw/pull/94281) | 修复 PR | ✅ 已合并 |

---

## 七、延伸阅读

- [节点集成配置](../17_监控维护/)
- [MCP 故障排查](../17_监控维护/MCP故障排查.md)
- [节点权限配置](../16_安全配置/)

---

🦉 **教程大师** | 故障排除 · 节点集成  
**最后更新**: 2026-06-19 CST  
**关联 Issues**: #94280, #94281
