# OpenClaw Skills 生态系统完全指南

> 数据来源：awesome-openclaw-tutorial (⭐4454, xianyu110)  
> 版本基线：v2026.4.14（稳定版）  
> 最后更新：2026-06-01  
> 许可：GPL-3.0

---

## 一、Skills 概述

OpenClaw 的 Skills（技能）系统是其核心扩展机制，允许用户通过安装额外的 Skills 来扩展 AI 助手的能力。与传统 AI 助手不同，OpenClaw 的 Skills 系统提供了近乎无限的功能扩展可能性。

**核心定位**：
- Skills 是 OpenClaw 的"超能力"系统
- 通过 Skills，AI 可以执行文件管理、知识搜索、自动化任务等
- Skills 生态覆盖 1800+ 场景

---

## 二、Skills 分类统计（2026年）

### 2.1 内置 Skills（预装）

| 属性 | 值 |
|------|------|
| 数量 | **49个** |
| 位置 | OpenClaw 安装包自带 |
| 特点 | 开箱即用，无需安装 |
| 类型 | 文件管理、知识管理、日程管理、自动化等 |

**查看命令**：
```bash
openclaw skills list --builtin
```

### 2.2 ClawHub 官方 Skills

| 属性 | 值 |
|------|------|
| 数量 | **93个**（包含49个内置） |
| 位置 | ClawHub 官方仓库 |
| 特点 | 官方维护，质量保证 |
| 安装命令 | `clawhub install <skill-name>` |

**访问方式**：
```bash
# 搜索 Skills
clawhub search <关键词>

# 安装 Skills
clawhub install <skill-name>

# 查看已安装
openclaw skills list
```

### 2.3 社区 Skills（扩展）

| 属性 | 值 |
|------|------|
| 数量 | **1715+个** |
| 位置 | GitHub 社区贡献 |
| 特点 | 功能丰富，需要筛选 |
| 安装 | 手动安装或通过 GitHub |

**安装方式**：
```bash
# 从 GitHub 克隆
git clone https://github.com/user/skill-name ~/.openclaw/skills/skill-name

# 或使用 clawhub（如果已发布）
clawhub install community/skill-name
```

### 2.4 企业级 Skills（百度千帆）

| 属性 | 值 |
|------|------|
| 数量 | **1715个** |
| 位置 | 百度千帆平台 |
| 特点 | 企业级质量，覆盖20+行业 |
| 适用 | 企业用户、行业应用 |

**行业覆盖**：
- 金融、医疗、教育、零售
- 制造、物流、客服、营销
- 等 20+ 行业

---

## 三、总计统计

| 类型 | 数量 | 质量 | 推荐度 |
|------|------|------|--------|
| 内置 Skills | 49个 | ⭐⭐⭐⭐⭐ | 必用 |
| ClawHub 官方 | 93个 | ⭐⭐⭐⭐⭐ | 强烈推荐 |
| 社区 Skills | 1715+个 | ⭐⭐⭐ | 按需选择 |
| 企业级 Skills | 1715个 | ⭐⭐⭐⭐⭐ | 企业推荐 |
| **总计** | **1800+个** | - | - |

---

## 四、Skills 使用指南

### 4.1 选择 Skills 的原则

1. **优先使用内置 Skills** - 稳定可靠，经过充分测试
2. **官方 Skills 次之** - 质量有保证，有官方维护
3. **社区 Skills 谨慎选择** - 查看评价和文档，了解兼容性
4. **企业用户考虑企业级 Skills** - 专业支持，稳定性高

### 4.2 安装建议

**✅ 推荐做法**：
- 从内置 Skills 开始 - 熟悉基本功能
- 安装 Top 5 核心 Skills - 扩展核心能力
- 根据需求选择社区 Skills - 满足特定场景

**❌ 避免做法**：
- 不要一次性安装太多 Skills
- 不要安装来源不明的 Skills
- 定期清理不用的 Skills

### 4.3 管理命令

```bash
# 查看所有可用 Skills
openclaw skills list

# 查看内置 Skills
openclaw skills list --builtin

# 搜索 Skills
clawhub search <关键词>

# 安装 Skills
clawhub install <skill-name>

# 更新 Skills
clawhub update <skill-name>

# 卸载 Skills
clawhub uninstall <skill-name>

# 查看 Skills 详情
openclaw skills info <skill-name>
```

---

## 五、推荐 Skills 清单

### 5.1 新手必装（Top 5）

| 序号 | Skills | 功能 | 优先级 |
|------|--------|------|--------|
| 1 | 文件管理类 | 智能搜索、批量处理 | ⭐⭐⭐⭐⭐ |
| 2 | 知识管理类 | 网页剪藏、笔记同步 | ⭐⭐⭐⭐⭐ |
| 3 | 日程管理类 | 日历同步、智能提醒 | ⭐⭐⭐⭐ |
| 4 | 自动化类 | 定时任务、网站监控 | ⭐⭐⭐⭐ |
| 5 | 工具类 | 截图、翻译、画图 | ⭐⭐⭐⭐ |

### 5.2 进阶 Skills

| 序号 | Skills | 功能 | 适用场景 |
|------|--------|------|----------|
| 1 | 视频生成 | video_generate | 创意内容 |
| 2 | 音乐生成 | music_generate | 创意内容 |
| 3 | TTS | 文字转语音 | 无障碍访问 |
| 4 | ComfyUI | 图像工作流 | 高级图像处理 |
| 5 | MCP | 模型上下文协议 | 外部工具集成 |

---

## 六、相关资源

- [ClawHub 市场](https://clawhub.ai) - 官方 Skills 市场
- [OpenClaw Skills 文档](https://docs.openclaw.ai/skills) - 官方 Skills 开发文档
- [awesome-openclaw-tutorial](https://github.com/xianyu110/awesome-openclaw-tutorial) - 最全中文教程
- [官方 Skills 索引](./官方Skills索引.md) - OpenClaw 官方 Skills 列表

---

## 七、版本说明

**版本基线**：v2026.4.14（稳定版）

> ⚠️ **注意**：本教程按 `v2026.4.14` 稳定版校对。如果 GitHub Releases 出现更高版本，请以官方 Release Notes 和官方文档为准。

**已优先更新的章节**：README 与第 10~15 章已按 2026.4+ 当前主线重写

**仍含历史内容的章节**：部分旧案例、旧截图、旧 Skill 名称仍保留在其他章节里，适合作为思路参考

---

**🦉 教程大师** | 2026-06-01 23:35 CST  
**数据来源**：awesome-openclaw-tutorial (⭐4454)  
**许可**：GPL-3.0