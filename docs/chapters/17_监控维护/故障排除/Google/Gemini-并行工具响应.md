# Gemini 并行工具响应问题

> **Issue**: [#93780](https://github.com/openclaw/openclaw/pull/93780)  
> **标签**: P1 · extensions: google · size: M  
> **状态**: ✅ 已修复并合并 (2026-06-16)  
> **影响版本**: OpenClaw 2026.6.x  
> **发现者**: @yetval  
> **修复版本**: v2026.6.8 (Stable, 2026-06-16 16:32 UTC)

---

## 一、问题概述

### 1.1 问题描述

在 Gemini < 3 视觉模型（`gemini-2.5-*`）上，当单个助手轮次执行**并行工具调用**，且非最后结果返回图像时，后续用户轮次携带的 `functionResponse` 部分数量少于模型发出的 `functionCall` 部分数量。

在强制执行并行函数调用契约的 Gemini 端点（Cloud Code Assist OAuth 路径和 Vertex）上，这种轮次形状会被拒绝，返回：

```
400 INVALID_ARGUMENT: the number of function response parts must match the number of function call parts
```

### 1.2 影响范围

| 受影响模型 | 受影响场景 | 严重程度 |
|-----------|-----------|---------|
| `gemini-2.5-flash` | 并行工具调用 + 图像响应 | 🔴 P1 |
| `gemini-2.5-pro` | 并行工具调用 + 图像响应 | 🔴 P1 |
| `gemini-2.0-flash` | 并行工具调用 + 图像响应 | 🔴 P1 |

### 1.3 根本原因

Gemini 模型在处理并行工具调用时，如果某个工具（非最后一个）返回了图像内容，模型会在下一轮期望收到数量完全匹配的 `functionResponse`。但当中间工具返回图像时，序列化顺序出现问题，导致响应部分数量不匹配。

---

## 二、错误日志

### 2.1 典型错误信息

```text
[google-gemini] error model=gemini-2.5-flash-pro vision status=400
message=the number of function response parts must match the number of function call parts
```

### 2.2 错误触发条件

```text
用户: 请帮我分析这张图片并搜索相关信息
  ↓
助手: [并行调用 tool_A(分析图片) + tool_B(搜索)]
  ↓
tool_A: 返回图像分析结果
tool_B: 返回搜索结果
  ↓
助手: 期望收到 2 个 functionResponse，但只收到不匹配的序列
  ↓
400 INVALID_ARGUMENT
```

---

## 三、修复方案

### 3.1 修复内容 (PR #93780)

修复在并行工具响应的 turn after the model 中保持正确的响应序列化顺序。

**关键修改**:
- 确保所有 `functionResponse` 按调用顺序正确序列化
- 图像响应被正确包装在响应序列中
- 修复 Gemini < 3 模型的并行函数调用契约

### 3.2 修复验证

```bash
# 验证并行工具调用是否正常工作
openclaw agent --agent main --model gemini-2.5-flash \
  --message "请分析这张图片并搜索相关资料" \
  --attach /path/to/image.jpg
```

---

## 四、workaround 临时方案

如果暂时无法升级到修复版本，可采用以下临时方案：

### 4.1 单工具调用替代并行

```javascript
// 避免并行调用，改用顺序调用
async function sequentialToolCalls(tools, image) {
  // 先分析图片
  const analysis = await tool_A(image);
  
  // 再搜索（使用分析结果）
  const search = await tool_B(analysis.summary);
  
  return { analysis, search };
}
```

### 4.2 限制图像响应工具

在并行调用场景中，避免让返回图像的工具参与并行：

```javascript
// 只对文本响应工具进行并行
const parallelResults = await Promise.all([
  tool_text_only_A(),
  tool_text_only_B()
]);
// 图像工具单独调用
const imageResult = await tool_with_image();
```

### 4.3 使用 Gemini 3+ 模型

如果业务允许，升级到 Gemini 3 及以上版本可以完全避免此问题。

---

## 五、升级建议

| 当前版本 | 建议升级 | 说明 |
|---------|---------|------|
| v2026.6.6 及以下 | → v2026.6.8 Stable | 包含完整修复 |
| v2026.6.7 | → v2026.6.8 Stable | 包含完整修复 |
| v2026.6.8+ | ✅ 已包含 | 无需操作 |

### 5.1 升级命令

```bash
# 升级到最新稳定版
npm install -g openclaw@latest

# 验证版本
openclaw --version
# 应显示 2026.6.8 或更高
```

---

## 六、相关 Issue

| Issue/PR | 说明 | 状态 |
|----------|------|------|
| [#93780](https://github.com/openclaw/openclaw/pull/93780) | 本问题修复 PR | ✅ 已合并 |
| [gemini-probe](#) | Gemini provider探测问题 | 🔄 跟踪中 |

---

## 七、延伸阅读

- [Google Gemini 官方文档](https://ai.google.dev/docs)
- [并行函数调用指南](https://ai.google.dev/docs/function_calling)
- [OpenClaw 模型配置](../04_模型配置/)

---

🦉 **教程大师** | 故障排除 · Google  
**最后更新**: 2026-06-18 23:30 CST  
**关联 Issue**: #93780
