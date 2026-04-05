# 教程更新日志

> 记录每次文档更新的内容、原因和数据来源

---

## 2026-04-06

### 更新统计
- 更新文档数: 9
- 新增教程: 2 篇
- 目录合并: 4 个 → 1 个

### 详细变更
| 文件 | 操作 | 原因 |
|------|------|------|
| chapters/06_上下文与记忆/知识蒸馏与遗忘机制.md | new | 新增知识蒸馏三层架构完整教程 |
| chapters/06_上下文与记忆/README.md | update | 加入新教程导航 |
| chapters/12_云端部署/OpenClaw_Docker部署Agent原理与架构.md | new | 新增 Docker Agent 深度原理教程 |
| chapters/12_云端部署/README.md | update | 加入新教程导航 |

### 新增内容摘要
**知识蒸馏教程：**
- 三层记忆架构：提取→蒸馏→遗忘完整闭环
- 与 Letta/MemGPT 等开源项目的横向对比
- 置信度机制详解（初始值、调整规则、遗忘阈值）
- Cron 配置示例（每周蒸馏 + 每月遗忘）
- OpenClaw 记忆机制现状自评（Level 1.5/5）

**Docker Agent 架构教程：**
- Gateway 组件详解（WS Server、消息路由、渠道管理）
- Agent Loop 完整流程（7步）
- Docker 部署两种模式对比
- Agent Sandbox 沙箱隔离机制（mode/scope/workspaceAccess）
- 多 Agent 路由与 Bindings 优先级
- 完整 Docker 部署流程（从零到生产）
- VPS 云端部署要点（Binary Bake 规范）
- 安全加固 checklist

---

## 2026-03-28

### 更新统计
- 更新文档数: 6
- Bug workaround 更新: 5 个
- 新功能文档: 1 个

### 详细变更
| 文件 | 操作 | 原因 |
|------|------|------|
| docs/03_channels/WhatsApp集成.md | update | ⏳ #56270 WhatsApp 499 reconnect loop + self-reply/echo loops + false completion |
| docs/15_troubleshooting/ | update | ⏳ #56270 WhatsApp 499 reconnect loop + self-reply/echo loops + false completion |
| docs/03_channels/Discord集成.md | update | ⏳ #56274 Discord WebSocket stale-socket causes full gateway crash |
| docs/15_troubleshooting/ | update | ⏳ #56274 Discord WebSocket stale-socket causes full gateway crash |
| docs/15_troubleshooting/ | update | ⏳ #56284 Windows gateway restart loses session state |
| docs/03_channels/8.3_telegram_integration.md | update | ⏳ #56286 Telegram exec approval bubble not dismissed after clicking approve |
| docs/07_tools_skills/ | update | ⏳ #56288 Nitter 失效 — Twitter/X 数据抓取替代方案调研 |
| chapters/12_云端部署/ | create_section | ⏳ Linux Gateway Client |
| docs/02_setup/ | create_section | ⏳ Linux Gateway Client |
| chapters/13_安全配置/README.md | create | ⏳ 13_安全配置 |
| chapters/14_监控维护/README.md | create | ⏳ 14_监控维护 |
| chapters/15_Pi引擎/README.md | create | ⏳ 15_Pi引擎 |
| chapters/16_TTS语音/README.md | create | ⏳ 16_TTS语音 |
| chapters/17_模型提供商/README.md | create | ⏳ 17_模型提供商 |
| chapters/20_Nodes移动节点/README.md | create | ⏳ 20_Nodes移动节点 |

### 数据来源
- 调研报告: `tmp/深度调研报告-2026-03-28.md`
- GitHub Sync: `tmp/github-sync-2026-03-28.md`

*由 tutorial-master/doc-update.sh 自动生成*

### 2026-04-05
| 文件 | 操作 | 原因 |
|------|------|------|
| docs/07_tools_skills/5.1_tools_overview.md | rewrite | 重写为三层架构（Core→Advanced→Knowledge），参考 https://yu-wenhao.com/zh-TW/blog/openclaw-tools-skills-tutorial/ 的同心圆结构 |
| docs/07_tools_skills/README.md | update | 添加三层架构全景导航说明 |

*由 OpenClaw 助手根据用户建议自动更新*

### 2026-04-05（续）
| 文件 | 操作 | 原因 |
|------|------|------|
| docs/07_tools_skills/5.6_builtin_skills.md | rewrite | 改为分类表格结构（名称/文件位置/功能），参考 https://yu-wenhao.com/ 的 Skills 目录组织方式 |

*由 OpenClaw 助手根据用户建议自动更新*

### 2026-04-05（下午）
| 文件 | 操作 | 原因 |
|------|------|------|
| 全部 docs/ 子目录 | mv → chapters/ | docs 与 chapters 合并，docs/ 仅保留 2 个元数据文件 |
| README.md | rewrite | 更新路径引用，反映合并后目录结构 |
| chapters/LEARNING_PATH.md | sed | 更新所有 docs/ 路径为 chapters/ |
| docs/00_编号对照.md | rewrite | 改为迁移对照表 |
| chapters/LEARNING_PATH.md | sed | 路径迁移完成 |

**合并详情：**
- docs/01_overview → chapters/01_认识openclaw/
- docs/02_setup → chapters/02_快速部署/
- docs/02_config_models → chapters/03_模型配置/
- docs/03_channels → chapters/05_平台集成/
- docs/04_automation → chapters/05_日程任务自动化/
- docs/05_minimal_loop → chapters/03_发出指令/
- docs/05_multi_agent → chapters/19_多Agent协作/
- docs/06_context_memory → chapters/06_上下文与记忆/
- docs/07_tools_skills → chapters/10_工具与Skills系统/
- docs/08_extension → chapters/16_扩展开发/
- docs/09_web_ui → chapters/11_自定义Web界面/
- docs/11_security → chapters/13_安全配置/
- docs/15_troubleshooting+03_gateway → chapters/14_监控维护/
- docs/17_advanced → chapters/17_进阶专题/
- docs/18_cases → chapters/案例集/
- docs/appendices → chapters/附录/
- docs/feedback → chapters/附录/

*由 OpenClaw 助手执行 docs→chapters 合并任务*


### 2026-04-05（下午-续）
| 文件 | 操作 | 原因 |
|------|------|------|
| chapters/19_多Agent协作/7.12_领域任务架构设计实战手册.md | create | 新增专家级实战手册：四层三环架构（Multi-Agent矩阵/Skills三层/Tools三层/运行时资源）+ Agent三环驱动模型 + 金融投研实战案例 |

*由 OpenClaw 助手根据用户框架分析生成*


### 2026-04-05（下午-续2）
| 文件 | 操作 | 原因 |
|------|------|------|
| chapters/10_工具与Skills系统/.assets/diagrams/ | create | 保存 OpenClaw 三层架构全景图 |
| chapters/10_工具与Skills系统/5.1_tools_overview.md | update | 在三层架构章节插入官方架构图 |

*由 OpenClaw 助手根据用户建议插入*


### 2026-04-05（下午-续3）
| 文件 | 操作 | 原因 |
|------|------|------|
| 01-入门教程/ | mv → chapters/03_发出指令/ | 合并遗漏目录 |
| 02-进阶功能/ | mv → chapters/06_上下文与记忆/等 | 合并遗漏目录 |

**分配详情：**
- `OpenClaw Workspace 维护指南.md` → `chapters/03_发出指令/`
- `AI记忆系统横向对比.md` → `chapters/06_上下文与记忆/`
- `OpenClaw内部提示词全解析.md` → `chapters/06_上下文与记忆/`
- `lossless-claw 使用教程.md` → `chapters/10_工具与Skills系统/`
- `lossless-claw与memory-lancedb-pro对比.md` → `chapters/06_上下文与记忆/`
- `manifest 智能路由插件使用教程.md` → `chapters/16_扩展开发/`
- `memory-lancedb-pro 使用教程.md` → `chapters/06_上下文与记忆/`
- `内存插件使用教程.md` → `chapters/06_上下文与记忆/`

*由 OpenClaw 助手执行合并*


### 2026-04-06（内容整合）
| 文件 | 操作 | 原因 |
|------|------|------|
| chapters/14_监控维护/README.md | rewrite | 整合Gateway+排错内容，补充外部教程资源 |
| chapters/02_快速部署/README.md | update | 补充6个高质量外部教程链接 |
| chapters/14_监控维护/14.1_会话重连与数据持久化实战.md | create | 基于Issue #60549/#60542 |
| chapters/14_监控维护/14.2_Read工具路径验证实战.md | create | 基于Issue #60550/#60554 |
| chapters/14_监控维护/14.3_Webchat性能与UI问题实战.md | create | 基于Issue #60553/#60543/#60547 |

*由 OpenClaw 助手根据内容分类报告执行*


### 2026-04-06（续）
| 文件 | 操作 | 原因 |
|------|------|------|
| chapters/17_进阶专题/README.md | update | 补充3个深度技术解析外部资源 |
| chapters/19_多Agent协作/README.md | update | 补充2个Multi-Agent技术解析资源 |
| chapters/21_CLI工具与命令行开发/README.md | update | 补充CLI工具速查资源 |
| README.md | update | 新增版本追踪章节（v2026.4.1/4.2）|

*由 OpenClaw 助手根据内容分类报告执行*

