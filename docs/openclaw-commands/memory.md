# OpenClaw Memory 指令详解

## 指令配置

### 基本语法
```bash
openclaw memory search <query>          # 搜索记忆
openclaw memory index                   # 重新索引
openclaw memory status                  # 查看状态
```

### 搜索选项
```bash
openclaw memory search <query> --limit 10
openclaw memory search <query> --agent <agent-id>
```

---

## 文件配置

### 记忆文件位置
- **工作区**: `/Users/d/clawd/memory/`
- **主记忆**: `/Users/d/clawd/MEMORY.md`

### 记忆文件结构
```
memory/
├── 2026-01-30.md    # 每日笔记
├── 2026-01-31.md
├── 2026-02-01.md
└── MEMORY.md        # 长期记忆
```

### 记忆配置 (openclaw.json)
```json
{
  "memory": {
    "backend": "builtin",
    "citations": "auto"
  },
  "agents": {
    "defaults": {
      "memorySearch": {
        "enabled": true,
        "sources": ["memory"],
        "extraPaths": [],
        "provider": "openai",
        "model": "text-embedding-3-small"
      }
    }
  }
}
```

---

## 场景示例

### 场景1: 搜索记忆
```bash
openclaw memory search "股票分析"
# 输出相关记忆片段

openclaw memory search "AI新闻" --limit 5
```

### 场景2: 重新索引
```bash
# 当添加新记忆文件后
openclaw memory index
```

### 场景3: 查看索引状态
```bash
openclaw memory status
# 显示:
# - 索引文件数
# - 最后更新时间
# - 向量维度
```

### 场景4: 配置记忆搜索
```bash
# 启用记忆搜索
openclaw config set agents.defaults.memorySearch.enabled true

# 添加额外路径
openclaw config set agents.defaults.memorySearch.extraPaths '["/Users/d/clawd/agents/foundation/墨析/profiles"]'

# 设置嵌入模型
openclaw config set agents.defaults.memorySearch.model "text-embedding-3-small"
```

### 场景5: Agent级配置
```bash
# 为特定Agent禁用记忆
openclaw config set agents.list.moguan.memorySearch.enabled false
```
