# 墨家多用户架构设计方案

> 分析日期：2026-04-27
> 作者：墨家 AI 助手

---

## 一、现状梳理

### 现有架构

```
用户侧
├── Telegram Bot (@xxx_bot, token=xxx)
│   ├── 11 个已配置的群组
│   └── 所有 DM 用户
│
└── OpenClaw Gateway (Mac mini)
    ├── 1 个主会话 (main)
    │   └── 共享的 HEARTBEAT + 系统协调
    │
    ├── 12 个 Agent 工作空间
    │   ├── mo-finance (墨财)
    │   ├── mo-law (墨法)
    │   ├── mo-yunying (墨营)
    │   ├── mo-richang
    │   ├── mo-family
    │   ├── gaokao-service
    │   ├── paper-assistant
    │   ├── openclaw-assistant
    │   ├── game-director
    │   ├── meta-team
    │   ├── shenghuo
    │   └── 论文
    │
    ├── 22+ 个 Skills
    │   ├── mo-yunying (内容运营技能)
    │   ├── mo-fortune (运势技能)
    │   ├── mo-xi (墨星技能)
    │   ├── finance-framework
    │   ├── law-* (法律系列)
    │   └── ... 共 22 个
    │
    ├── 共享知识库
    │   ├── consensus/ (工作流协议)
    │   ├── knowledge/ (知识)
    │   └── context/ (活跃任务上下文)
    │
    └── 记忆系统 (4层)
        ├── Layer0: lossless-claw (上下文压缩)
        ├── Layer1: active-memory
        ├── Layer2: memory-lancedb-pro
        └── Layer3: wiki (Obsidian)
```

### 当前多用户能力分配

| 能力 | 当前归属 | 说明 |
|------|---------|------|
| 群组对话 | 共享 | 11 个群，所有用户共享 |
| 技能 | 共享 | mo-yunying, mo-fortune 等所有用户都能触发 |
| Agent | 共享 | 所有用户都能调用任意 Agent |
| 记忆 | 共享 | 用户边界模糊，无隔离 |
| Cron | 共享 | 系统级定时任务，共用 |

---

## 二、需求分析

### 典型使用场景

**场景 A：社群共用**
```
你建了一个 AI 交流群，把 bot 拉进去
→ 群里的所有用户都能 @bot 调用能力
→ 所有用户共享 mo-finance、mo-yunying 等技能
→ 群成员之间的对话 history 完全共享
```

**场景 B：独立用户**
```
用户 A 有自己的问题想要 AI 回答
→ 用户 A DM bot，bot 调用 mo-finance 分析
→ 用户 B DM bot，bot 调用 mo-finance 分析
→ 两个用户看到的是同一个 mo-finance workspace
→ 两个用户的上下文会相互污染
```

**场景 C：多业务线隔离**
```
mo-finance 服务金融用户
mo-law 服务法律咨询用户
mo-yunying 服务内容创作者
→ 三个业务线共用同一个 bot 和 workspace
→ 但用户不希望自己的数据被其他业务线看到
```

**场景 D：多租户平台（最复杂）**
```
你自己运营一个 AI 服务平台
→ 多个人/团队付费使用你的服务
→ 每个租户有独立的数据空间
→ 他们不知道彼此的存在
→ 你是管理员，可以跨租户管理
```

### 需求优先级

| 维度 | 优先级 |
|------|--------|
| 用户隔离 | 高 - 用户不想让别人看到自己的对话 |
| 能力复用 | 高 - mo-yunying 等技能要复用给所有用户 |
| 部署简便 | 高 - 不想维护多套复杂系统 |
| 数据安全 | 高 - 不希望用户数据混在一起 |
| 扩展性 | 中 - 目前 12 个 Agent，未来可能更多 |

---

## 三、架构方案对比

### 方案 A：单实例共享（当前架构）

```
架构图：
                    Telegram
                    11 个群 + DM
                         │
                    ┌────▼────┐
                    │  Bot    │
                    └────┬────┘
                         │
                 ┌───────▼────────┐
                 │  OpenClaw      │
                 │  单实例         │
                 │  ├── mo-finance│
                 │  ├── mo-law    │
                 │  └── mo-yunying │
                 └────────────────┘
```

**工作原理：**
- 1 个 bot token，1 个 OpenClaw 实例
- 所有群消息和 DM 都进入同一个 gateway
- Agent 根据 message 的 sender 判断调用哪个 workspace

**优点：**
- 部署最简单，维护成本低
- 实时同步，所有用户看到一致的能力
- 共享 knowledge base 无需同步

**缺点：**
- ❌ 无用户隔离
- ❌ 群组边界模糊
- ❌ Agent 状态共享

**适用场景：** 私密小群体（家人、挚友），无隐私隔离需求

---

### 方案 B：多实例独立部署

```
架构图：
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ 用户 A 实例      │  │ 用户 B 实例      │  │ 用户 C 实例      │
│ OpenClaw        │  │ OpenClaw        │  │ OpenClaw        │
│ ├── mo-finance  │  │ ├── mo-finance  │  │ ├── mo-finance  │
│ └── mo-yunying  │  │ └── mo-yunying  │  │ └── mo-yunying  │
│ bot: @bot_a     │  │ bot: @bot_b     │  │ bot: @bot_c     │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
    Telegram              Telegram              Telegram

核心能力包（只读）
├── skills/           ← 技能逻辑（只读，同步更新）
├── shared/           ← 共享知识（只读）
└── consensus/       ← 协议（只读）
```

**工作原理：**
- 每个用户/团体部署独立的 OpenClaw 实例
- 技能包和知识库作为只读共享资源
- 各实例独立运行，各自的 bot token 互不相同

**部署流程：**
```bash
# 1. 导出技能包（不含隐私）
openclaw skills export --output=skills-package.tar.gz

# 2. 用户部署自己的实例
scp skills-package.tar.gz user@server:/opt/openclaw/
openclaw setup --new-bot

# 3. 导入技能包
openclaw skills import --file=skills-package.tar.gz

# 4. 技能更新时，重新导出同步
openclaw skills export --output=skills-v2.tar.gz
```

**优点：**
- ✅ 完全隔离 - 每个用户的数据、对话、历史完全独立
- ✅ 安全边界清晰 - 一个实例被攻破不影响其他
- ✅ 个性化定制 - 不同用户可以修改自己的 workspace

**缺点：**
- ❌ 部署复杂 - 每个用户需要独立的服务器/container
- ❌ 技能同步难 - 更新 mo-yunying 技能，其他实例不会自动更新
- ❌ 资源占用高 - 每个实例都要跑一个完整的 OpenClaw
- ❌ 管理成本高 - 12+ 个实例需要分别维护、升级

**适用场景：** 高隐私要求、愿意自己维护服务器的用户

---

### 方案 C：单实例 + 用户隔离层（混合架构）⭐ 推荐

```
架构图：
                         Telegram
                    11 个群 + 所有 DM
                           │
                      ┌────▼────┐
                      │  Bot    │
                      └────┬────┘
                           │
              ┌────────────▼────────────┐
              │   OpenClaw Gateway      │
              │                          │
              │  用户路由层               │
              │  ├── 用户 A → workspace_A│
              │  ├── 用户 B → workspace_B│
              │  └── 匿名 → default      │
              │                          │
              │  共享技能层（只读）        │
              │  ├── mo-yunying skill   │
              │  ├── mo-fortune skill   │
              │  └── 共享知识库           │
              │                          │
              │  核心 Agent 层           │
              │  ├── mo-finance         │
              │  └── mo-law             │
              └─────────────────────────┘

workspace_A/  workspace_B/  workspace_C/
├── memory/   ├── memory/   ├── memory/
├── MEMORY.md ├── MEMORY.md ├── MEMORY.md
└── USER.md   └── USER.md   └── USER.md
```

**工作原理：**
- 单个 OpenClaw 实例 + 单个 bot
- 通过 sender ID 识别用户，路由到各自的 workspace
- 新用户第一次使用自动创建 workspace
- 核心技能（mo-yunying 等）作为共享只读资源
- 每个用户有独立的 memory/USER.md/MEMORY.md

**优点：**
- ✅ 保持简单 - 仍是单实例单 bot
- ✅ 用户隔离 - 每个人的 memory、USER.md、MEMORY.md 完全独立
- ✅ 技能复用 - mo-yunying 等共享技能只需维护一份
- ✅ 部署难度低 - 无需多实例管理

**缺点：**
- ❌ Agent 共享 - mo-finance 的 session 可能被多人触发
- ❌ 无法限制群组间可见性 - 所有群共享同一个 bot

**适用场景：** 中等隐私需求，想在简单性和隔离性之间取得平衡

---

### 方案 D：Hub-Spoke 架构（最优解）

```
架构图：
                         Telegram
                      ┌────────────┐
                      │    Hub     │
                      │ (你的 Mac) │
                      └─────┬──────┘
                            │ Skills + Knowledge + 核心 Agents
                  ┌─────────┼─────────┐
                  │         │         │
             ┌────▼────┐┌──▼──┐  ┌───▼────┐
             │ Spoke A ││Spoke B│  │Spoke C │
             │用户A专属 ││用户B  │  │用户C   │
             │- memory ││专属  │  │专属    │
             │- USER   ││      │  │        │
             │- 定制   ││      │  │        │
             └─────────┘└──────┘  └────────┘

通信协议：OpenClaw sessions_send / 跨 Agent 消息
```

**工作原理：**
- Hub 负责：共享技能、共享知识库、核心 Agent 推理
- Spoke 负责：用户私有 memory、USER 配置、个性化 prompt
- 用户消息 → Spoke → Hub 调用技能 → 结果返回 Spoke → 用户

**Spoke 配置示例：**
```yaml
# spoke_user_A/workspace.yaml
spoke:
  hub:
    endpoint: "http://hub:3000"  # Hub 地址
    apiKey: "spoke_secret_key"   # 认证密钥
  capabilities:
    inherit: ["mo-yunying", "mo-fortune", "mo-law", "mo-finance"]
  private:
    - memory/
    - USER.md
    - MEMORY.md
    - custom_skills/
```

**优点：**
- ✅ 完全隔离 - 每个用户有独立 Spoke，数据物理隔离
- ✅ 能力复用 - Hub 上的技能只需维护一份
- ✅ 灵活定制 - 用户可以在自己的 Spoke 里改 prompt
- ✅ 可扩展 - 新增用户只需新增 Spoke，不影响 Hub

**缺点：**
- ❌ 架构最复杂 - 需要开发 Spoke 之间的通信层
- ❌ 延迟增加 - 消息要经过 Spoke → Hub → Spoke 两跳
- ❌ 运维成本 - 需要管理 Hub + N 个 Spoke

**适用场景：** 有技术能力、长期运营、隐私和复用都要的用户

---

### 方案对比矩阵

| 维度 | A 共享单实例 | B 多实例独立 | C 单实例+隔离层 | D Hub-Spoke |
|------|------------|-------------|---------------|-------------|
| 部署难度 | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐ |
| 用户隔离 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 技能复用 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 管理成本 | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐ |
| 个性化 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 容错性 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 数据安全 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 适用规模 | 1-10人 | 1-100人/实例 | 10-100人 | 100+用户 |

---

## 四、推荐路线图

```
第一阶段（立即可行）：
方案 C（单实例+隔离层）
↓ 
理由：
1. 无需新增服务器资源
2. 利用现有 OpenClaw 架构
3. 技术难度最低
4. 3-5 天可完成开发和测试
5. 用户无感知，体验一致

第二阶段（6-12个月后）：
方案 B（多实例独立部署）
↓
理由：
1. 用户量超过 50 人
2. 隐私要求提升
3. 用户有技术能力自维护

第三阶段（长期）：
方案 D（Hub-Spoke）
↓
理由：
1. 需要服务 100+ 用户
2. 要求实时同步技能更新
3. 需要跨实例协作能力
```

---

## 五、隐私分级指南

| 内容 | 是否可分享 | 原因 |
|------|-----------|------|
| `openclaw.json` | ❌ 不可 | 含 bot token + 所有群组 ID |
| `credentials/` | ❌ 不可 | API key 等 |
| `workspaces/*/memory/` | ❌ 不可 | 包含对话历史、用户数据 |
| `workspaces/MEMORY.md` | ❌ 不可 | 你的长期记忆 |
| `workspaces/USER.md` | ❌ 不可 | 用户画像 |
| `skills/mo-yunying/` | ✅ 可分享 | 技能逻辑本身（无凭据） |
| `skills/mo-fortune/` | ✅ 可分享 | 技能本身 |
| `shared/` 知识库 | ⚠️ 需审查 | consensus 可以分享，context 要看内容 |
| workspace 模板（无 memory/） | ✅ 可分享 | 只含配置和 prompt |

---

## 六、能力迁移到其他平台

### 可迁移性分析

| OpenClaw 资产 | 可迁移到 Coze/Dify/Claude 等？ | 说明 |
|--------------|------------------------------|------|
| Agent 对话 prompt（SOUL.md、AGENTS.md） | ✅ 完全可以 | 就是文本 prompt，改格式即可 |
| Skill 逻辑（SKILL.md + 工具定义） | ⚠️ 部分可以 | 需要重写工具调用逻辑 |
| 共享知识（shared/knowledge/） | ✅ 完全可以 | 就是 Markdown 文件 |
| 工作流协议（shared/consensus/） | ✅ 完全可以 | 纯文本协议，可迁移 |
| Cron 配置 | ❌ 不可以 | 各平台有各自的定时任务机制 |
| 记忆/内存数据（memory/） | ⚠️ 需清理后迁移 | LLM 对话记忆，重新开始即可 |
| OpenClaw 工具链（message.send 等） | ❌ 无法迁移 | 平台特定的原生 API |

### 迁移路径

1. **技能 → Coze Bot / Dify Workflow**
   - 提取 SKILL.md 的 prompt 逻辑
   - OpenClaw 工具调用 → Coze Actions / Dify Tool节点
   - 工作流逻辑可通用

2. **Agent 配置 → Coze Agent / Claude AI**
   - SOUL.md、AGENTS.md 直接作为 system prompt
   - USER.md 作为 prompt 模板一部分

3. **共享知识库 → Coze 知识库 / Notion**
   - `shared/knowledge/` Markdown 文件直接导入

---

## 七、待解决问题

- [ ] OpenClaw 是否支持多 workspace 路由？（需要调研）
- [ ] 如何在单实例中实现用户隔离？（中间件开发）
- [ ] 方案 C 的用户路由配置格式
- [ ] Hub-Spoke 通信协议设计

---

*文档版本：v1.0*
*创建时间：2026-04-27*
*下次审查：2026-05-27*
