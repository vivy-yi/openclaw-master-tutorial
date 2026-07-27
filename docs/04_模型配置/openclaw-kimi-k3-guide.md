# OpenClaw Kimi K3 模型使用指南

> 🦉 教程大师出品 | 深度调研日期: 2026-07-26
> 
> **功能来源**: PR #113909 | **状态**: ✅ 已合并 (v2026.7.2)

---

## 一、概述

Kimi K3 是月之暗面（Moonshot AI）推出的新一代大语言模型，OpenClaw 在 v2026.7.2 版本中正式将其升级为**一级支持模型**，提供完整的工具调用和思考级别控制能力。

### 核心能力

| 能力 | 支持情况 |
|------|----------|
| 上下文窗口 | 1,048,576 tokens (1M) |
| 最大输出 | 131,072 tokens (128K) |
| 多模态输入 | ✅ 支持 |
| 工具调用 (Tool Use) | ✅ 完整支持 |
| 思考级别控制 | ✅ 支持自适应级别 |

---

## 二、配置方法

### 2.1 环境变量配置

```bash
# 方式一：直接设置 API Key
export OPENAI_API_KEY="sk-xxxxx"
export OPENAI_API_BASE="https://api.moonshot.cn/v1"

# 方式二：在配置文件中设置
```

### 2.2 模型选择

在 OpenClaw 中使用 Kimi K3：

```
模型名称: kimi/k3
```

支持的模型 ID 格式：

| 格式 | 说明 | 兼容性 |
|------|------|--------|
| `kimi/k3` | ✅ 推荐 | 规范化格式 |
| `k3` | ✅ 支持 | 简短格式 |
| `k3[1m]` | ❌ 已废弃 | 已被 Kimi 服务拒绝 |

### 2.3 配置文件示例

```yaml
# openclaw.yaml 或 gateway 配置
model:
  provider: openai
  name: kimi/k3
  apiKey: ${OPENAI_API_KEY}
  baseURL: https://api.moonshot.cn/v1

# 或使用环境变量
# OPENAI_API_KEY=sk-xxx
# OPENAI_API_BASE=https://api.moonshot.cn/v1
```

---

## 三、思考级别配置

Kimi K3 支持**自适应思考级别**，可根据任务复杂度自动调整。

### 3.1 支持的思考级别

| 级别 | 说明 | 适用场景 |
|------|------|----------|
| `low` | 快速响应 | 简单问答、即时回复 |
| `adaptive` | 自适应（推荐） | 通用场景，模型自动选择 |
| `high` | 深度思考 | 复杂分析、多步推理 |
| `max` | 最大思考深度 | 深度研究、复杂规划 |

### 3.2 配置思考级别

```yaml
model:
  name: kimi/k3
  parameters:
    thinking_level: adaptive  # 可选: low, adaptive, high, max
```

### 3.3 思考级别对比

| 思考级别 | 响应速度 | 深度 | Token 消耗 |
|----------|----------|------|------------|
| `low` | ⚡ 最快 | ★★☆ | 最低 |
| `adaptive` | ⚡ 快 | ★★★ | 中等 |
| `high` | 🐢 较慢 | ★★★★ | 较高 |
| `max` | 🐢 最慢 | ★★★★★ | 最高 |

---

## 四、工具调用 (Tool Use)

Kimi K3 支持完整的 OpenClaw 工具调用能力，包括：

### 4.1 支持的工具类别

- **文件操作**: `read`, `write`, `edit`
- **终端操作**: `exec`, `bash`
- **浏览器操作**: `browser` (Playwright)
- **会话管理**: `sessions_*`
- **消息发送**: `message`
- **网络搜索**: `web_search`
- **知识库**: `wiki_*`

### 4.2 工具结果回放

Kimi K3 保留**空的思考签名**以支持工具结果回放功能。这意味着：

```
用户问题 → 模型思考 → 调用工具 → 工具结果 → 模型回答
                           ↑                      ↓
                           └──── 回放机制 ←───────┘
```

### 4.3 示例对话

```
用户: 帮我读取 /path/to/file.txt 的内容

模型 (思考): [分析任务] → [决定使用 read 工具]

工具调用: read(path="/path/to/file.txt")

工具结果: 文件内容...

模型: 文件内容如下: [内容摘要]
```

---

## 五、使用场景

### 5.1 推荐场景

| 场景 | 推荐思考级别 | 说明 |
|------|-------------|------|
| 日常对话 | `low` | 快速响应 |
| 代码编写 | `adaptive` | 平衡速度与质量 |
| 技术文档生成 | `high` | 深度分析 |
| 复杂问题研究 | `max` | 最大思考深度 |
| 自动化任务 | `adaptive` | 工具调用场景 |

### 5.2 国内用户优势

- 🌐 **网络优化**: 国内 API 节点，延迟更低
- 💰 **成本优势**: 相比 GPT-4o，性价比更高
- 🔒 **数据合规**: 国内部署，数据不出境

---

## 六、常见问题

### Q1: 如何切换不同 Kimi 模型？

OpenClaw 支持所有 Kimi 系列模型：

```yaml
# Kimi K3 (最新)
model:
  name: kimi/k3

# Kimi K1.5 (之前的版本)
model:
  name: kimi/k1.5
```

### Q2: 工具调用失败怎么办？

1. **检查 API Key**: 确认 Key 有效且余额充足
2. **检查网络**: 确认能访问 api.moonshot.cn
3. **降级思考级别**: 尝试 `low` 级别减少 Token 消耗
4. **查看日志**: `openclaw logs` 查看详细错误

### Q3: `k3[1m]` 格式为什么报错？

**原因**: Kimi 服务已停止支持旧的 `k3[1m]` Wire ID 格式。

**解决方案**: 统一使用规范化的模型 ID：

```yaml
# ❌ 旧格式 (已废弃)
model:
  name: k3[1m]  # ❌ 会报错

# ✅ 新格式
model:
  name: kimi/k3  # ✅ 推荐
```

### Q4: 如何优化 Token 消耗？

1. **使用 `adaptive` 级别**: 自动平衡质量与成本
2. **设置最大输出**: 限制单次响应长度
3. **开启缓存**: 减少重复 Token 消耗
4. **会话复用**: 保持会话上下文复用

---

## 七、技术规格

| 规格 | 值 |
|------|-----|
| 上下文窗口 | 1,048,576 tokens (1M) |
| 最大输出 | 131,072 tokens (128K) |
| 多模态 | 支持文本、图像 |
| 定价 | 参见 Kimi 官方定价 |
| API 版本 | v1 |

---

## 八、参考资源

| 资源 | 链接 |
|------|------|
| Kimi 官方文档 | https://platform.moonshot.cn/docs |
| OpenClaw GitHub | https://github.com/openclaw/openclaw |
| PR #113909 | https://github.com/openclaw/openclaw/pull/113909 |
| v2026.7.2 Release | https://github.com/openclaw/openclaw/releases/tag/v2026.7.2 |

---

## 九、更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-07-26 | v2026.7.2 | ✅ K3 升级为一级支持，完整工具调用支持 |

---

🦉 **教程大师** | OpenClaw 官方教程
