# 官方 Skills 索引

> 📅 创建时间: 2026-05-31  
> 📚 来源: [github.com/openclaw/openclaw/tree/main/skills](https://github.com/openclaw/openclaw/tree/main/skills)  
> ⭐ 质量评分: ⭐⭐⭐⭐⭐ (5/5)  
> 🦉 教程大师出品 | 墨客内容生成

---

## 📊 Skills 概览

OpenClaw 的 Skills 系统分为两大类：**官方内置 Skills** 和 **社区 Skills**。

| 类型 | 数量 | 路径 |
|------|------|------|
| 官方内置 Skills | 40+ | `openclaw/skills/` |
| 社区 Skills | 30+ | `~/.agents/skills/` |

---

## 🔧 官方内置 Skills 完整索引

以下 Skills 随 OpenClaw 官方发布包一起提供，安装 OpenClaw 后即可直接使用。

### 📱 效率与工具类

| Skill 名称 | 功能描述 |
|-----------|----------|
| 1password | 1Password 密码管理器集成 |
| apple-notes | Apple Notes 笔记应用集成 |
| apple-reminders | Apple Reminders 提醒集成 |
| bear-notes | Bear 笔记应用集成 |
| blogwatcher | 博客内容监控 |
| canvas | 画布与图表绘制 |
| diagram-maker | 流程图/架构图制作 |
| meme-maker | 表情包生成 |
| obsidian-vault-maintainer | Obsidian 知识库维护 |
| ordercli | 订单管理 CLI |
| session-logs | 会话日志管理 |
| skill-creator | 自定义 Skill 创建器 |
| summarize | 文本摘要生成 |
| tts | 文本转语音 (TTS) |
| video-frames | 视频帧提取 |
| weather | 天气查询 |
| wiki-maintainer | Wiki 知识库维护 |

### 🔌 通信与渠道类

| Skill 名称 | 功能描述 |
|-----------|----------|
| discord | Discord 频道集成 |
| feishu-doc | 飞书文档操作 |
| feishu-drive | 飞书云盘操作 |
| feishu-wiki | 飞书知识库操作 |
| feishu-perm | 飞书权限管理 |
| github | GitHub 全功能集成 |
| gh-issues | GitHub Issues 管理 |

### 🌐 硬件与设备控制类

| Skill 名称 | 功能描述 |
|-----------|----------|
| blucli | 蓝牙设备控制 |
| camsnap | 相机拍照 |
| eightctl | 八位堂手柄控制 |
| mcporter | Minecraft 服务器集成 |
| node-connect | 节点连接 |
| node-inspect-debugger | Node.js 调试器 |
| tmux | tmux 终端复用 |

### 🔬 搜索与数据类

| Skill 名称 | 功能描述 |
|-----------|----------|
| tavily-search | Tavily 深度搜索 |
| web_search | 网页搜索 |

### 🤖 AI 与模型类

| Skill 名称 | 功能描述 |
|-----------|----------|
| gemini | Google Gemini 模型集成 |
| stock-analysis | 股票分析 |

### 📋 任务与流程类

| Skill 名称 | 功能描述 |
|-----------|----------|
| taskflow | 任务流程管理 |
| taskflow-inbox-triage | 收件箱分类 |
| things-mac | Things 3 任务管理 |

### 🔮 其他类

| Skill 名称 | 功能描述 |
|-----------|----------|
| coding-agent | 编码代理 |
| clawhub | OpenClaw 技能市场 |

---

## 🌐 社区 Skills 索引

以下 Skills 由社区贡献，需要单独安装。安装方式：`npx clawhub@latest install <skill-name>`

### 💰 金融与投资类

| Skill 名称 | 说明 |
|-----------|------|
| alternative-investment | 另类投资分析 |
| behavioral-finance | 行为金融学分析 |
| derivatives-analyst | 衍生品分析 |
| esg-analysis | ESG 投资分析 |
| finance-framework | 金融分析框架 |
| macro-strategy | 宏观策略分析 |
| multi-family-portfolio | 多家族资产管理 |
| portfolio-optimizer | 资产组合优化 |
| prediction-tracker | 预测追踪 |
| retirement-planning | 退休规划 |
| seven-dimension-analysis | 七维分析模型 |
| stock-analysis | 股票分析 |
| tax-optimization | 税务优化 |

### ⚖️ 法律与合规类

| Skill 名称 | 说明 |
|-----------|------|
| compliance-framework | 合规框架 |
| law-admin | 行政管理法律 |
| law-contract | 合同法律 |
| law-criminal | 刑事法律 |
| law-digital | 数字法律 |
| law-document | 法律文书 |
| law-enterprise | 企业法律 |
| law-family | 家庭法律 |
| law-import-export | 进出口法律 |
| law-international-arbitration | 国际仲裁 |
| law-investment | 投资法律 |
| law-ip | 知识产权 |
| law-labor | 劳动法律 |
| law-overseas-invest | 海外投资法律 |
| law-traffic | 交通法律 |
| legal-knowledge | 法律知识库 |

### 👨‍👩‍👧‍👦 家族治理类

| Skill 名称 | 说明 |
|-----------|------|
| family-governance | 家族治理 |
| family-office-core | 家族办公室核心 |
| humanizer-zh | 中文人性化处理 |
| insurance-analysis | 保险分析 |
| self-improving | 自改进代理 |
| social-content | 社交内容生成 |
| succession-planning | 继任规划 |
| trust-management | 信托管理 |

### 🔬 研究与分析类

| Skill 名称 | 说明 |
|-----------|------|
| insurance-analysis | 保险分析 |
| quantitative-factors | 量化因子分析 |

---

## 📖 使用指南

### 安装 Skills

```bash
# 通过 ClawHub 安装
npx clawhub@latest install <skill-name>

# 或者直接在配置文件中启用
openclaw skills enable <skill-name>
```

### 查看可用 Skills

```bash
# 列出所有已安装的 Skills
openclaw skills list

# 搜索 ClawHub
npx clawhub@latest search <keyword>
```

### 配置 Skills

大部分 Skills 需要在 `~/.openclaw/openclaw.json` 中配置相关参数（如 API Key、连接凭证等）。

---

## 📚 相关文档

- **[官方 Skills 完全指南](./15.1_官方内置Skills完全指南.md)** — 官方 Skills 详细使用手册
- **[Skills 与 Plugins 对比](./15.2_Skills与Plugins对比.md)** — 功能边界说明
- **[自定义 Skill 开发](./15.3_自定义Skill开发.md)** — 开发自己的 Skills
- **[ClawHub 热门排行](./15.4_ClawHub热门Skills排行榜.md)** — 社区热门 Skills