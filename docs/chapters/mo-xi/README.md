# 墨析 - 自适应全链路数据分析 Skill

## 概述

墨析是一个基于 OpenClaw CDP 原生的自适应数据采集 Skill，不依赖任何第三方工具，可对任意网站进行全自动数据采集。

**核心理念**：零预配置 + 自动探索 + 自我学习 + 全自动运行

**用户选择**：
- 用途：竞品监控 + 内容聚合 + 个人画像
- 自动化：全自动运行
- 存储：本地 + 飞书云端

---

## 目录

1. [架构设计](./01-ARCHITECTURE.md) - 墨析的整体架构
2. [工作原理](./02-WORKFLOW.md) - 自适应采集工作流程
3. [CDP 工具箱](./03-CDP-TOOLS.md) - OpenClaw 浏览器工具详解
4. [知识库设计](./04-KNOWLEDGE-BASE.md) - 自我学习机制
5. [快速开始](./05-QUICKSTART.md) - 5 分钟上手
6. [场景示例](./06-SCENARIOS.md) - 实际采集示例
7. [OpenCLI vs CDP](./07-OPENCLI-VS-CDP.md) - 方案对比分析
8. [Skills 设计](./08-SKILL-DESIGN.md) - 自适应 Skills 架构
9. [CDP 扩展](./09-EXTENSION.md) - Electron/Remote/MCP 能力
10. [最终方案](./10-FINAL-DESIGN.md) - 用户选择的最终设计
11. [APP 自动化](./11-APP-AUTOMATION.md) - OpenClaw APP 控制能力
12. [支持的平台](./12-SUPPORTED-PLATFORMS.md) - 平台覆盖详情

---

## 核心能力

| 能力 | 说明 |
|------|------|
| **自适应采集** | 任意 URL，无需预配置 |
| **CDP 原生** | 仅使用 OpenClaw browser tool |
| **自我学习** | 记录成功方法，下次复用 |
| **全自动运行** | Cron 定时，无需人工干预 |
| **三链路覆盖** | 竞品监控 + 内容聚合 + 个人画像 |

---

## 技术优势

| 对比项 | opencli | 墨析 |
|--------|---------|------|
| 依赖 | 需要安装 | 零依赖 |
| 平台 | 73+ 预配置 | 任意网站 |
| 自动化 | 手动 | Cron 全自动 |
| 通知 | 无 | message 推送 |
| Skills | 无 | 原生集成 |

---

## 快速预览

```
用户: "帮我监控竞品A的小红书"
    ↓
墨析 Skill 响应
    ↓
Cron 每6小时自动采集
    ↓
对比变化 → 发现新内容
    ↓
Telegram 通知用户
```

---

## 文件清单

| 文件 | 内容 | 大小 |
|------|------|------|
| README.md | 概述和目录 | 2KB |
| 01-ARCHITECTURE.md | 架构设计 | 7KB |
| 02-WORKFLOW.md | 工作流程 | 10KB |
| 03-CDP-TOOLS.md | CDP 工具详解 | 7KB |
| 04-KNOWLEDGE-BASE.md | 知识库设计 | 8KB |
| 05-QUICKSTART.md | 快速开始 | 6KB |
| 06-SCENARIOS.md | 场景示例 | 11KB |
| 07-OPENCLI-VS-CDP.md | 方案对比 | 3KB |
| 08-SKILL-DESIGN.md | Skills 设计 | 5KB |
| 09-EXTENSION.md | CDP 扩展 | 6KB |
| 10-FINAL-DESIGN.md | 最终方案 | 7KB |
| 11-APP-AUTOMATION.md | APP 自动化 | 4KB |
| 12-SUPPORTED-PLATFORMS.md | 支持的平台 | 6KB |

**总计**：约 80KB
