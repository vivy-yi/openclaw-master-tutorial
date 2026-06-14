# nanobot 架构师深度分析报告

> **文档版本**: v1.0  
> **分析日期**: 2026-03-22  
> **分析对象**: nanobot (https://github.com/HKUDS/nanobot)  
> **架构定位**: 超轻量级个人 AI 助手框架

---

## 目录

1. [执行摘要](#一执行摘要)
2. [架构全景](#二架构全景)
3. [技术选型深度分析](#三技术选型深度分析)
4. [核心子系统架构](#四核心子系统架构)
5. [数据流与状态管理](#五数据流与状态管理)
6. [安全架构](#六安全架构)
7. [部署与运维架构](#七部署与运维架构)
8. [扩展性设计](#八扩展性设计)
9. [性能考量](#九性能考量)
10. [竞品架构对比](#十竞品架构对比)
11. [架构决策记录](#十一架构决策记录)
12. [风险与建议](#十二风险与建议)

---

## 一、执行摘要

### 1.1 架构定位

**nanobot** 是一个超轻量级的个人 AI 助手框架，灵感来源于 OpenClaw，但仅使用约 1% 的代码量（约 5,000 行核心代码 vs OpenClaw 的 500,000+ 行）实现了核心 Agent 功能。定位为**研究友好、易于理解、快速部署**的个人智能助手解决方案。

### 1.2 核心架构特征

| 维度 | 架构特征 | 成熟度 |
|------|----------|:------:|
| **代码极简** | ~5,000 行核心代码 | ⭐⭐⭐⭐⭐ |
| **多模态通道** | 支持 11+ 种通信渠道 | ⭐⭐⭐⭐ |
| **多模型支持** | 支持 20+ 个 LLM Provider | ⭐⭐⭐⭐ |
| **MCP 集成** | 原生支持 Model Context Protocol | ⭐⭐⭐⭐ |
| **无状态设计** | 文件系统持久化，无外部数据库 | ⭐⭐⭐⭐ |
| **插件化扩展** | Entry Points 机制 | ⭐⭐⭐⭐ |

### 1.3 关键架构指标

```
代码统计:
├── Python 核心代码: ~5,000 行
├── 测试代码: ~3,000 行
├── 桥接服务 (TypeScript): ~300 行
└── 内置技能: 8 个

性能指标:
├── 启动时间: < 1 秒
├── 内存占用: 50-100 MB (基础运行)
└── 支持并发会话: 依赖 LLM Provider 限制
```

---

## 二、架构全景

### 2.1 系统上下文图

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              外部系统                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ Telegram │ │ Discord  │ │ WhatsApp │ │  飞书    │ │    Slack     │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘  │
│       │            │            │            │              │          │
│  ┌────┴─────┐ ┌────┴─────┐ ┌────┴─────┐ ┌────┴─────┐ ┌──────┴───────┐  │
│  │  钉钉    │ │  Matrix  │ │   QQ     │ │ 企业微信 │ │    Email     │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘  │
│       └────────────┴────────────┴────────────┴──────────────┘           │
│                              ▼                                          │
│                    ┌─────────────────┐                                  │
│                    │   Channel Layer │  ← 消息收发、权限控制              │
│                    │   (11+ adapters)│                                  │
│                    └────────┬────────┘                                  │
└─────────────────────────────┼───────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          nanobot Core (Python)                          │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                        Message Bus                               │   │
│  │          ┌──────────────┐              ┌──────────────┐         │   │
│  │          │   Inbound    │              │   Outbound   │         │   │
│  │          │    Queue     │              │    Queue     │         │   │
│  │          └──────┬───────┘              └──────┬───────┘         │   │
│  │                 │                             │                  │   │
│  └─────────────────┼─────────────────────────────┼──────────────────┘   │
│                    ▼                             │                      │
│  ┌───────────────────────────────────────────────┴─────────────────┐    │
│  │                         Agent Loop                               │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │    │
│  │  │ Context  │ │ Memory   │ │ Skills   │ │ Session  │          │    │
│  │  │ Builder  │ │ System   │ │ Loader   │ │ Manager  │          │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │    │
│  │       └────────────┴────────────┴────────────┘                  │    │
│  │                              │                                  │    │
│  │       ┌───────────────────────────────────────┐                 │    │
│  │       │      LLM Provider (20+ adapters)      │                 │    │
│  │       │  ┌────────┐┌────────┐┌────────┐      │                 │    │
│  │       │  │LiteLLM ││ OAuth  ││ Direct │      │                 │    │
│  │       │  │Adapter ││Provider││Provider│      │                 │    │
│  │       │  └────────┘└────────┘└────────┘      │                 │    │
│  │       └───────────────────────────────────────┘                 │    │
│  │                              │                                  │    │
│  │       ┌───────────────────────────────────────┐                 │    │
│  │       │         Tool Registry                 │                 │    │
│  │  ┌────┴────┐┌──────────┐┌──────────┐┌────────┴────┐          │    │
│  │  │read_file││shell_exec││web_search││mcp_<server> │          │    │
│  │  │write_file││list_dir ││web_fetch ││_<tool>      │          │    │
│  │  └─────────┘└──────────┘└──────────┘└────────────┘          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │  Heartbeat      │  │  Cron Service   │  │ Subagent Mgr    │         │
│  │  (定时唤醒)      │  │  (任务调度)      │  │ (后台任务)       │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         持久化层 (文件系统)                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ sessions/    │ │ memory/      │ │ skills/      │ │  *.md configs│   │
│  │ *.jsonl      │ │ MEMORY.md    │ │ SKILL.md     │ │ AGENTS.md    │   │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 分层架构图

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 5: 交互层 (Presentation)                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │  CLI (Rich) │ │  Channel    │ │  Entry Points Plugins   │ │
│  │  Interactive│ │  Adapters   │ │  (Extensible)           │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: 应用服务层 (Application)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ Agent Loop  │ │  Cron       │ │  Heartbeat Service      │ │
│  │ (核心引擎)   │ │  Service    │ │  (定时任务检查)          │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: 领域层 (Domain)                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ Context     │ │  Memory     │ │  Session Management     │ │
│  │ Builder     │ │  System     │ │  (Token-based)          │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: 基础设施层 (Infrastructure)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │ LLM Provider│ │  Tool       │ │  Skills     │ │ Sub-   │ │
│  │ Adapters    │ │  Registry   │ │  Loader     │ │ agent  │ │
│  │ (20+)       │ │  (8 base)   │ │             │ │ Mgr    │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: 集成层 (Integration)                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ Message Bus │ │  Security   │ │  MCP Client             │ │
│  │  (Async)    │ │  (SSRF)     │ │  (stdio/SSE/HTTP)       │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、技术选型深度分析

### 3.1 后端技术栈及选型理由

#### **Python 3.11+ 作为主要语言**

**选型理由：**
- **asyncio 成熟支持**：原生异步 IO 支持，适合高并发聊天场景
- **类型提示完善**：Pydantic 集成提供强大的配置验证
- **生态丰富**：LLM 相关库（LiteLLM、OpenAI SDK 等）原生支持
- **研究友好**：代码简洁易读，适合学术研究和二次开发

#### **LiteLLM - LLM 路由层**

```python
class LiteLLMProvider(LLMProvider):
    """Provider that uses LiteLLM for multi-provider support."""
    
    async def chat(self, messages, tools=None, model=None, **kwargs):
        # LiteLLM 统一接口，自动处理不同 Provider 的差异
        response = await litellm.acompletion(
            model=self._to_litellm_model(model),
            messages=messages,
            tools=tools,
            api_key=self.api_key,
            api_base=self.api_base,
            **kwargs
        )
```

**优势：**
- 统一 100+ LLM Provider 的调用接口
- 自动处理模型名称前缀映射
- 内置重试、超时、流式响应支持

#### **Pydantic - 配置管理**

```python
class Config(BaseSettings):
    """Root configuration for nanobot."""
    agents: AgentsConfig = Field(default_factory=AgentsConfig)
    channels: ChannelsConfig = Field(default_factory=ChannelsConfig)
    providers: ProvidersConfig = Field(default_factory=ProvidersConfig)
    # 支持环境变量: NANOBOT_AGENTS__DEFAULTS__MODEL=gpt-4
```

### 3.2 数据存储方案

**完全无状态设计 - 文件系统持久化**

| 存储类型 | 路径 | 格式 | 用途 |
|---------|------|------|------|
| 会话历史 | `~/.nanobot/sessions/*.jsonl` | JSONL | 对话记录，支持 Append-only |
| 长期记忆 | `~/.nanobot/memory/MEMORY.md` | Markdown | LLM 生成的关键事实 |
| 历史日志 | `~/.nanobot/memory/HISTORY.md` | Markdown | grep 可搜索的时间线 |
| 定时任务 | `~/.nanobot/cron/jobs.json` | JSON | Cron 任务定义与状态 |
| 配置文件 | `~/.nanobot/config.json` | JSON | 主配置 |

### 3.3 外部依赖

```
核心依赖:
├── typer>=0.20.0          # CLI 框架
├── litellm>=1.82.1        # LLM 路由
├── pydantic>=2.12.0       # 数据验证
├── websockets>=16.0       # WebSocket 支持
├── httpx>=0.28.0          # HTTP 客户端
├── ddgs>=9.5.5            # DuckDuckGo 搜索
├── mcp>=1.26.0            # Model Context Protocol
├── croniter>=6.0.0        # Cron 解析
├── python-telegram-bot    # Telegram 支持
├── slack-sdk              # Slack 支持
├── lark-oapi              # 飞书支持
└── dingtalk-stream        # 钉钉支持
```

---

## 四、核心子系统架构

### 4.1 Agent 引擎架构

**AgentLoop - 核心处理引擎**

```python
class AgentLoop:
    """
    核心处理循环:
    1. 接收消息 (Message Bus)
    2. 构建上下文 (Context + Memory + Skills + History)
    3. 调用 LLM (Provider)
    4. 执行工具调用 (Tool Registry)
    5. 发送响应 (Message Bus)
    """
    
    async def _run_agent_loop(self, messages, on_progress):
        """ReAct 风格的迭代循环"""
        while iteration < max_iterations:
            response = await self.provider.chat_with_retry(
                messages=messages, tools=tool_defs
            )
            if response.has_tool_calls:
                # 执行工具并继续迭代
                result = await self.tools.execute(tool_call.name, args)
                messages = self.context.add_tool_result(...)
            else:
                # 获得最终回答
                return response.content
```

**关键设计决策：**
- **最大迭代限制**：默认 40 次工具调用，防止无限循环
- **进度流式传输**：通过 `on_progress` 回调实时显示思考过程
- **工具调用追踪**：记录所有工具使用，用于记忆整合

### 4.2 记忆系统架构

**双层记忆架构**

```
┌─────────────────────────────────────────────────────┐
│              Session Messages                        │
│  (短期记忆，保留完整对话上下文，用于 LLM Prompt)         │
│  - 存储: ~/.nanobot/sessions/*.jsonl                │
│  - 格式: Append-only JSONL                          │
│  - 清理: Token-based consolidation                  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼ (触发条件: token > 阈值/2)
┌─────────────────────────────────────────────────────┐
│           Memory Consolidation                     │
│  (LLM 驱动的压缩整合)                                │
│  输入: 原始消息列表                                   │
│  输出: save_memory(history_entry, memory_update)    │
└─────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌─────────────────────┐     ┌─────────────────────┐
│   HISTORY.md        │     │   MEMORY.md         │
│  (时间线日志)         │     │  (结构化事实)        │
│  - 可 grep 搜索      │     │  - 关键信息聚合      │
│  - 自然语言描述      │     │  - 长期知识库        │
└─────────────────────┘     └─────────────────────┘
```

### 4.3 渠道网关架构

**BaseChannel 抽象与插件化**

```python
class BaseChannel(ABC):
    """所有渠道的抽象基类"""
    
    @abstractmethod
    async def start(self) -> None:
        """启动监听，必须阻塞"""
        
    @abstractmethod
    async def send(self, msg: OutboundMessage) -> None:
        """发送消息到平台"""
        
    async def _handle_message(self, sender_id, chat_id, content, ...):
        """统一入口：权限检查 -> Message Bus"""
        if not self.is_allowed(sender_id):
            return  # 拒绝未授权用户
        await self.bus.publish_inbound(InboundMessage(...))
```

**渠道实现矩阵：**

| 渠道 | 协议 | 难度 | 特点 |
|------|------|------|------|
| Telegram | HTTP Polling / Webhook | ⭐ 简单 | 最完善支持 |
| Discord | Gateway WebSocket | ⭐⭐ 中等 | 支持 Thread 隔离 |
| WhatsApp | WhatsApp Web | ⭐⭐ 中等 | 需要二维码登录 |
| 飞书 | WebSocket | ⭐ 简单 | 无需公网 IP |
| 钉钉 | Stream Mode | ⭐⭐ 中等 | 企业内部应用 |
| Slack | Socket Mode | ⭐⭐ 中等 | 企业集成 |
| Matrix | Client-Server API | ⭐⭐⭐ 复杂 | E2E 加密支持 |
| QQ | BotPy SDK | ⭐ 简单 | 仅支持私聊 |
| 企业微信 | WebSocket | ⭐⭐ 中等 | 智能机器人类型 |
| Email | IMAP/SMTP | ⭐⭐ 中等 | 邮件助理模式 |
| MoChat | Socket.IO | ⭐ 简单 | 官方 IM 平台 |

### 4.4 MCP 集成架构

**Model Context Protocol 客户端**

```python
async def connect_mcp_servers(mcp_servers, registry, stack):
    """连接 MCP 服务器并注册工具"""
    for name, cfg in mcp_servers.items():
        # 支持多种传输协议
        if cfg.type == "stdio":
            read, write = await stdio_client(params)
        elif cfg.type == "sse":
            read, write = await sse_client(cfg.url)
        elif cfg.type == "streamableHttp":
            read, write = await streamable_http_client(cfg.url)
            
        session = ClientSession(read, write)
        tools = await session.list_tools()
        
        # 包装为 nanobot Tool
        for tool_def in tools.tools:
            wrapper = MCPToolWrapper(session, name, tool_def)
            registry.register(wrapper)  # mcp_<server>_<tool>
```

---

## 五、数据流与状态管理

### 5.1 请求处理流程

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Client  │────►│  Channel     │────►│  Message Bus │────►│  Agent Loop  │
│  Message │     │  Adapter     │     │  (inbound Q) │     │  (处理分发)   │
└──────────┘     └──────────────┘     └──────┬───────┘     └──────┬───────┘
                                             │                    │
                              ┌──────────────┼────────────────────┤
                              ▼              ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────────┐
│  /stop       │     │  /restart    │     │  正常消息     │     │ Context   │
│  命令        │     │  命令        │     │              │     │ Builder   │
└──────────────┘     └──────────────┘     └──────────────┘     └─────┬─────┘
                                                                     │
                    ┌────────────────────────────────────────────────┼────┐
                    ▼                                                ▼    ▼
              ┌─────────┐                                       ┌─────────────────┐
              │  LLM    │◀─────────────────────────────────────│   Tool Calls    │
              │ Provider│    (迭代循环)                          │  (可选多次)      │
              └────┬────┘                                       └─────────────────┘
                   │
                   ▼
              ┌─────────┐
              │ Response│
              └────┬────┘
                   │
                   ▼
              ┌──────────────┐     ┌──────────┐
              │ Message Bus  │────►│ Channel  │────►┌─────────┐
              │ (outbound Q) │     │ (发送)    │     │  User   │
              └──────────────┘     └──────────┘     └─────────┘
```

### 5.2 状态一致性策略

**会话状态管理：**

```python
class SessionManager:
    def get_or_create(self, key: str) -> Session:
        """LRU 缓存 + 持久化加载"""
        if key in self._cache:
            return self._cache[key]
        session = self._load(key) or Session(key=key)
        self._cache[key] = session
        return session
    
    def save(self, session: Session) -> None:
        """原子写入 + 缓存更新"""
        # JSONL 格式，每行一个消息
        with open(path, "w") as f:
            f.write(json.dumps(metadata) + "\n")
            for msg in session.messages:
                f.write(json.dumps(msg) + "\n")
```

---

## 六、安全架构

### 6.1 安全分层模型

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: 应用安全                                             │
│  ├─ allowFrom 白名单控制 (每个 Channel)                        │
│  ├─ 命令白名单 (/stop, /restart, /new, /help)                │
│  └─ 工具级权限控制 (workspace 限制)                            │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: 网络安全                                             │
│  ├─ SSRF 防护 (validate_url_target)                          │
│  │   └─ 阻止私有 IP、链路本地地址、元数据端点                   │
│  ├─ 代理支持 (HTTP/SOCKS5)                                    │
│  └─ TLS 验证 (生产环境)                                       │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: 执行安全                                             │
│  ├─ ExecTool 可选禁用                                         │
│  ├─ 工作目录限制 (restrict_to_workspace)                      │
│  ├─ 超时控制 (默认 60s)                                       │
│  └─ 路径遍历防护                                              │
├─────────────────────────────────────────────────────────────┤
│ Layer 1: 数据安全                                             │
│  ├─ 配置文件权限 (~/.nanobot/)                                │
│  ├─ API Key 内存存储 (不记录日志)                              │
│  └─ 会话隔离 (channel:chat_id 命名空间)                       │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 SSRF 防护

```python
# nanobot/security/network.py
_BLOCKED_NETWORKS = [
    ipaddress.ip_network("0.0.0.0/8"),
    ipaddress.ip_network("10.0.0.0/8"),      # 私有网络
    ipaddress.ip_network("127.0.0.0/8"),     # 回环
    ipaddress.ip_network("169.254.0.0/16"),  # 链路本地 / 云元数据
    ipaddress.ip_network("172.16.0.0/12"),   # 私有网络
    ipaddress.ip_network("192.168.0.0/16"),  # 私有网络
    # ... IPv6 等价范围
]

def validate_url_target(url: str) -> tuple[bool, str]:
    """解析并验证 URL 的所有解析 IP"""
    for info in socket.getaddrinfo(hostname, None):
        addr = ipaddress.ip_address(info[4][0])
        if _is_private(addr):
            return False, f"Blocked: {hostname} resolves to private address"
    return True, ""
```

---

## 七、部署与运维架构

### 7.1 部署架构

**单机部署模式：**

```
┌─────────────────────────────────────┐
│            Host OS                  │
│  ┌─────────────────────────────┐   │
│  │      Python 3.11+           │   │
│  │  ┌─────────────────────┐    │   │
│  │  │     nanobot         │    │   │
│  │  │  ┌─────────────┐    │    │   │
│  │  │  │  Gateway    │    │    │   │
│  │  │  │  (HTTP 18790)│    │    │   │
│  │  │  └─────────────┘    │    │   │
│  │  │  ┌─────────────┐    │    │   │
│  │  │  │  Channels   │    │    │   │
│  │  │  │  (11+)      │    │    │   │
│  │  │  └─────────────┘    │    │   │
│  │  └─────────────────────┘    │   │
│  │  ┌─────────────────────┐    │   │
│  │  │  Node.js 18+        │    │   │
│  │  │  (WhatsApp Bridge)  │    │   │
│  │  └─────────────────────┘    │   │
│  └─────────────────────────────┘   │
│  ~/.nanobot/  (配置、数据、会话)     │
└─────────────────────────────────────┘
```

### 7.2 配置管理

**配置层级（优先级从高到低）：**

1. 命令行参数 (`-c config.json`, `-w workspace`)
2. 环境变量 (`NANOBOT_AGENTS__DEFAULTS__MODEL`)
3. 配置文件 (`~/.nanobot/config.json`)
4. 默认值 (Pydantic Schema)

**多实例支持：**

```bash
# 不同工作空间的独立实例
nanobot agent -c ~/.nanobot-work/config.json -w ~/workspace-a
nanobot agent -c ~/.nanobot-home/config.json -w ~/workspace-b
```

---

## 八、扩展性设计

### 8.1 水平扩展能力

| 组件 | 状态 | 扩展方式 | 限制 |
|------|------|----------|------|
| **CLI** | 无状态 | 多终端 | - |
| **Gateway** | 有状态 | 单实例 | 文件锁 |
| **Agent Loop** | 有状态 | 多进程 | 需共享存储 |

### 8.2 插件扩展机制

**Entry Points 机制：**

```python
# 外部插件的 pyproject.toml
[project.entry-points."nanobot.channels"]
mychannel = "my_package:MyChannel"

# 动态发现
from importlib.metadata import entry_points
discovered = entry_points(group="nanobot.channels")
```

---

## 九、性能考量

### 9.1 性能基准

| 指标 | 数值 | 说明 |
|------|------|------|
| 启动时间 | < 1s | Python 解释器 + 模块加载 |
| 内存占用 | <100MB | 基础运行时 |
| 首次 Token 延迟 | 取决于 Provider | 通常 1-3s |
| 并发会话 | 无硬性限制 | 受限于 LLM Provider 配额 |

### 9.2 优化策略

**1. Prompt Cache 优化：**
```python
# 支持 Anthropic prompt caching
if spec.supports_prompt_caching:
    # 在系统消息添加 cache_control
    messages[0]["content"] = [
        {"type": "text", "text": system_prompt, 
         "cache_control": {"type": "ephemeral"}}
    ]
```

**2. 会话历史截断：**
```python
def get_history(self, max_messages: int = 500):
    """滑动窗口，保留最近消息"""
    return unconsolidated[-max_messages:]
```

**3. 异步工具执行：**
- 所有工具实现为 async
- HTTP 请求使用 httpx AsyncClient

---

## 十、竞品架构对比

| 维度 | nanobot | CoPaw | PicoClaw |
|------|---------|-------|----------|
| **定位** | 极简助手 | 多工作区 | 边缘设备 |
| **代码量** | ~5K | ~30K | ~60K |
| **内存** | <100MB | ~200MB | <10MB |
| **语言** | Python | Python | Go |
| **MCP** | ✅ | ✅ | ✅ |
| **扩展** | Entry Points | Entry Points | Interface |

---

## 十一、架构决策记录

### ADR-001: LiteLLM 作为 LLM 路由层

**背景：** 需要支持 20+ LLM Provider

**决策：** 使用 LiteLLM 作为统一路由层

**权衡：**
- ✅ 减少 90% Provider 适配代码
- ⚠️ 引入外部依赖

### ADR-002: 文件系统作为唯一存储

**决策：** 使用文件系统存储所有状态

**理由：**
- ✅ 零外部依赖
- ✅ 人类可读
- ⚠️ 多机部署需要共享存储

### ADR-003: ReAct 风格的 Agent Loop

**决策：** 采用简单的 ReAct 循环

**优点：**
- ✅ 实现简单
- ✅ 兼容所有 Tool-use 模型

---

## 十二、风险与建议

### 12.1 架构风险评估

| 风险 | 级别 | 说明 | 缓解措施 |
|------|------|------|----------|
| **文件系统瓶颈** | 中 | 会话数量增长 | 监控，>10K 考虑迁移 |
| **LLM Provider 故障** | 中 | 依赖外部 API | 多 Provider 配置 |
| **并发限制** | 中 | 单进程模型 | 文档说明 |

### 12.2 演进建议

**短期：**
1. 监控增强 (Prometheus 导出)
2. 配置热重载

**中期：**
1. 向量记忆 (ChromaDB)
2. 多 Agent 协作

**长期：**
1. 分布式架构
2. Web UI

---

**报告完成时间**: 2026-03-22  
**分析版本**: nanobot v0.1.4.post5
