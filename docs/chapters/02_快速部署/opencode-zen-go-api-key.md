# Zen/Go API Key 独立配置

> 来源: [github.com/openclaw/openclaw/issues/87790](https://github.com/openclaw/openclaw/issues/87790)  
> 评分: ⭐⭐⭐⭐⭐ (必收录)  
> 分类: 教程 (Tutorial) / 故障排除 (Troubleshooting)  
> 目标章节: `02_快速部署/环境变量配置` 或 `17_监控维护/常见问题.md`  
> 更新: 2026-05-29

---

## 一、问题背景

### 当前问题

`OPENCODE_API_KEY` 被 `opencode` 和 `opencode-go` 两个插件共用，导致用户无法同时为两个插件提供不同的 API Key。

```
当前限制:
- opencode 插件使用 OPENCODE_API_KEY
- opencode-go 插件也使用 OPENCODE_API_KEY
- 无法同时使用 Zen (即用即付) 和 Go (订阅) 两种 API Key
```

### 影响范围

| 插件 | 用途 | 当前限制 |
|------|------|----------|
| `opencode` | Zen 即用即付 API | 必须与 opencode-go 共用同一 Key |
| `opencode-go` | Go 订阅 API | 必须与 opencode 共用同一 Key |

---

## 二、解决方案

### 2.1 新增环境变量

| 环境变量 | 用途 | 优先级 |
|----------|------|--------|
| `OPENCODE_ZEN_API_KEY` | Zen 即用即付 API Key（opencode 插件用） | 🔴 最高 |
| `OPENCODE_GO_API_KEY` | Go 订阅 API Key（opencode-go 插件用） | 🔴 最高 |
| `OPENCODE_API_KEY` | 向后兼容（优先级最低） | 🟡 回退 |

### 2.2 优先级规则

```
优先级从高到低:
1. OPENCODE_ZEN_API_KEY  →  opencode 插件使用
2. OPENCODE_GO_API_KEY   →  opencode-go 插件使用
3. OPENCODE_API_KEY      →  两者共用（向后兼容）
```

### 2.3 配置示例

```bash
# 分别配置 Zen 和 Go API Key
export OPENCODE_ZEN_API_KEY="sk-zen-xxxxx"    # opencode 插件使用
export OPENCODE_GO_API_KEY="sk-go-xxxxx"      # opencode-go 插件使用

# 或仅使用单一 Key（向后兼容）
export OPENCODE_API_KEY="sk-xxxxx"            # 两插件共用
```

---

## 三、配置步骤

### 3.1 分离配置（推荐）

```bash
# 在 ~/.openclaw/env 或 .env 文件中设置
OPENCODE_ZEN_API_KEY=sk-zen-your-zen-key-here
OPENCODE_GO_API_KEY=sk-go-your-go-key-here

# 可选：保留向后兼容（优先级最低）
# OPENCODE_API_KEY=sk-legacy-key
```

### 3.2 配置验证

```bash
# 验证环境变量
echo $OPENCODE_ZEN_API_KEY
echo $OPENCODE_GO_API_KEY

# 测试插件配置
openclaw plugins list | grep opencode
```

### 3.3 常见问题

**Q: 如果只设置了 `OPENCODE_API_KEY` 会怎样？**  
A: 两个插件都会使用同一个 Key，无法分别控制。

**Q: 如何确认哪个插件使用了哪个 Key？**  
A: 查看 Gateway 日志：
```bash
tail -f ~/.openclaw/logs/openclaw.log | grep opencode
```

---

## 四、向后兼容

### 4.1 兼容策略

| 场景 | 行为 |
|------|------|
| 设置了 `OPENCODE_ZEN_API_KEY` 和 `OPENCODE_GO_API_KEY` | 各自使用对应的 Key |
| 只设置了 `OPENCODE_API_KEY` | 两插件共用该 Key（回退模式） |
| 三个都设置了 | `OPENCODE_ZEN_API_KEY` 和 `OPENCODE_GO_API_KEY` 优先 |

### 4.2 迁移建议

```bash
# 旧配置（共用）
export OPENCODE_API_KEY="sk-old-key"

# 新配置（分离）
export OPENCODE_ZEN_API_KEY="sk-zen-new-key"
export OPENCODE_GO_API_KEY="sk-go-new-key"
```

---

## 五、相关文档

| 文档 | 说明 |
|------|------|
| [opencode 插件文档](https://docs.openclaw.ai/tools/opencode) | Zen API 配置 |
| [opencode-go 插件文档](https://docs.openclaw.ai/tools/opencode-go) | Go API 配置 |
| [#87762](https://github.com/openclaw/openclaw/pull/87762) | 相关 PR（opencode 支持独立 Key） |

---

## 六、相关 Issue/PR

| 编号 | 类型 | 说明 |
|------|------|------|
| [#87790](https://github.com/openclaw/openclaw/issues/87790) | Feature Request | 支持独立 Zen/Go API Key 环境变量（本文） |
| [#87762](https://github.com/openclaw/openclaw/pull/87762) | PR | opencode 支持独立 Zen/Go API Key（对应实现） |

---

🦉 **Zen/Go API Key 独立配置** | 2026-05-29