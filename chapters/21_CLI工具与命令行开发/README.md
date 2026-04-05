# 第21章 CLI 工具与命令行开发

> **本章学习目标**: 掌握 CLI 转化技术，理解 MCP → CLI、API → CLI、NL → CLI 三种模式，能够构建自己的 CLI 工具
> **预计用时**: 45-60 分钟
> **前置要求**: 了解 AI Agent 基本概念，有 Python/Rust 基础

---

## 外部补充资源

| 文章 | 来源 | 特点 |
|------|------|------|
| [CLI工具速查（quick-ref）](./quick-ref.md) | 内部文档 | OpenClaw CLI 常用命令速查表 |

---

## 21.1 CLI 转化技术概述

### 背景问题

AI Agent 在执行任务时面临一个核心矛盾：

| 问题 | 描述 |
|------|------|
| **Tool Schema 膨胀** | 每个工具定义占用大量 Token |
| **Context 浪费** | 96-99% 的 Token 用于传递工具定义 |
| **动态性差** | Agent 难以动态发现和使用新工具 |
| **标准化缺失** | 各平台工具格式不统一 |

### 解决方案

CLI 转化技术的核心思想是：

```
将各种工具/API/网站/软件 转化为统一的 CLI 接口
让 AI Agent 可以通过标准 shell 命令调用任意工具
```

### 四种转化模式

| 类型 | 输入 | 输出 | 代表项目 |
|------|------|------|----------|
| **MCP → CLI** | MCP Server | CLI 包装 | mcp2cli |
| **API → CLI** | Open API | 完整 CLI | lark-cli, Google Workspace CLI |
| **Website → CLI** | 网站（浏览器） | CLI 命令 | OpenCLI |
| **GUI → CLI** | 桌面软件 | CLI 命令 | CLI-Anything |

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLI 转化技术                                  │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   MCP → CLI     │   API → CLI    │        NL → CLI            │
│   (运行时反射)   │   (Discovery)  │      (AI 生成)             │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ mcp2cli         │ Google          │ CLI-Anything               │
│ 将 MCP Server   │ Workspace CLI   │ 将任意软件                   │
│ 转为 CLI        │ 动态解析        │ 源码/GUI                    │
│                 │ Discovery API   │ 自动生成 CLI                │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

---

## 21.2 MCP → CLI (mcp2cli)

### 项目信息

| 项目 | 链接 |
|------|------|
| GitHub | [knowsuchagency/mcp2cli](https://github.com/knowsuchagency/mcp2cli) |
| Stars | ⭐ 1,732 |
| 语言 | Python |
| 安装 | `uvx mcp2cli` 或 `uv tool install mcp2cli` |

### 核心原理

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ MCP Server  │───▶│  工具发现     │───▶│  CLI 包装   │
│ (Tool Schema)│    │  JSON-RPC    │    │  click/typer │
└─────────────┘    └──────────────┘    └─────────────┘
```

**关键技术**：运行时反射 + 零代码生成

### 实现步骤

| 阶段 | 描述 |
|------|------|
| **1. 连接 MCP** | 支持 HTTP/SSE + stdio 两种传输 |
| **2. 工具发现** | 调用 `tools/list` 获取所有工具定义 |
| **3. Schema 解析** | 提取 `name`, `description`, `inputSchema` |
| **4. CLI 生成** | 用 click 动态生成子命令 |
| **5. 参数映射** | JSON Schema → CLI 参数类型 |
| **6. 调用转发** | 调用 `tools/call` 并格式化输出 |

### Token 节省效果

| 指标 | 传统方式 | mcp2cli | 节省 |
|------|----------|---------|------|
| Tool Schema | 每次请求传递 | 运行时获取 | - |
| Token 消耗 | ~10-15K/token | ~300-500/token | **96-99%** |

### 使用示例

```bash
# 连接 MCP 服务器
mcp2cli --mcp https://mcp.example.com/sse --list

# 调用工具
mcp2cli --mcp https://mcp.example.com/sse search --query "test"

# 带认证
mcp2cli --mcp https://mcp.example.com/sse \
  --auth-header "x-api-key:sk-..." \
  query --sql "SELECT 1"

# OAuth 认证
mcp2cli --mcp https://mcp.example.com/sse --oauth --list
```

---

## 21.3 API → CLI (lark-cli, Google Workspace CLI)

### 项目信息

| 项目 | 链接 |
|------|------|
| GitHub | [googleworkspace/cli](https://github.com/googleworkspace/cli) |
| Stars | ⭐ 22,800+ |
| 语言 | Rust |
| 安装 | `npm install -g @googleworkspace/cli` |

### 核心原理

```
┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐
│ Google Discovery │───▶│  动态构建命令树  │───▶│  REST API    │
│   Service API    │    │  运行时解析 Spec  │    │   调用       │
└─────────────────┘    └─────────────────┘    └──────────────┘
```

**关键技术**：Google Discovery API 动态构建命令树

### Google Discovery API

Google 提供了一个元 API，可以获取所有 Google API 的定义：

```
https://discovery.googleapis.com/discovery/v1/apis
```

### 命令结构

```
gws <service>.<resource>.<method> [flags]

示例：
gws drive.files.list
gws gmail.messages.send
gws calendar.events.create
```

### 使用示例

```bash
# 认证设置
gws auth setup
gws auth login

# 列出 Drive 文件
gws drive files list --params '{"pageSize": 5}'

# 发送 Gmail
gws gmail messages.send \
  --to "user@example.com" \
  --subject "Hello" \
  --body "Test message"
```

### 核心优势

| 优势 | 说明 |
|------|------|
| **动态更新** | Google 新增 API，CLI 自动获得 |
| **零维护** | 不需要手动同步 API 变更 |
| **MCP 兼容** | 同时提供 MCP Server 模式 |

---

## 21.4 Website → CLI

### 项目信息

| 项目 | 链接 |
|------|------|
| GitHub | [jackwener/opencli](https://github.com/jackwener/opencli) |
| Stars | ⭐ 8,351 |
| 语言 | TypeScript |
| 安装 | `npm install -g @jackwener/opencli` |

### 核心原理

```
┌──────────────┐    ┌───────────────┐    ┌─────────────┐
│ 任意网站/平台 │───▶│ Browser Bridge │───▶│  CLI 命令   │
│ (B站/小红书) │    │  CDP 协议     │    │  确定性输出 │
└──────────────┘    └───────────────┘    └─────────────┘
```

**关键技术**：复用浏览器登录态 + 反检测 + AI Agent 工具发现

### 核心功能

| 功能 | 说明 |
|------|------|
| **内置 50+ 适配器** | B站、小红书、Twitter、Reddit 等 |
| **CLI Hub** | 集成 gh、docker、lark-cli 等 |
| **Electron 应用** | 控制 Cursor、ChatGPT 等桌面应用 |
| **AI Agent 工具** | explore、synthesize、cascade |

### 使用示例

```bash
# 列出所有命令
opencli list

# 公开 API（无需浏览器）
opencli hackernews top --limit 5
opencli bilibili hot --limit 10

# 下载内容
opencli xiaohongshu download <note-id>

# AI Agent 工具发现
opencli explore https://example.com
opencli synthesize mysite
```

详见：[OpenCLI 详细教程](./opencli-tutorial.md)

---

## 21.5 Browser → MCP/CLI (浏览器自动化工具)

### 项目概览

| 工具 | Stars | 类型 | 语言 |
|------|-------|------|------|
| **browser-use** | ⭐ 84,829 | Python 库 | Python |
| **playwright-mcp** | ⭐ 29,874 | MCP Server | TypeScript |
| **github-mcp-server** | ⭐ 28,339 | MCP Server | TypeScript |
| **agent-browser** | ⭐ 25,187 | CLI | Rust |
| **mcp-chrome** | ⭐ 10,994 | MCP Server | TypeScript |
| **bb-browser** | ⭐ 3,041 | CLI + MCP | TypeScript |

### 核心分类

| 类型 | 工具 | 说明 |
|------|------|------|
| **AI Agent 控制** | browser-use | Python 库，让 AI 控制浏览器 |
| **MCP 协议** | playwright-mcp, mcp-chrome | 通过 MCP 协议暴露浏览器 |
| **CLI** | agent-browser | 命令行浏览器自动化 |
| **GitHub 专用** | github-mcp-server | MCP 操作 GitHub |

### 快速选择

```
需要 AI Agent 控制浏览器？
├─ 复杂任务、需要反检测 → Browser-Use Cloud ✅
├─ 开源自托管 → Browser-Use ⭐
├─ 需要 MCP 协议 → Playwright MCP ✅
├─ 高性能 CLI → Agent Browser (Rust) ✅
└─ GitHub 操作 → GitHub MCP Server ✅
```

详见：[浏览器自动化工具专题](./browser-automation-tools.md)

---

## 21.6 GUI → CLI (CLI-Anything)

### 项目信息

| 项目 | 链接 |
|------|------|
| GitHub | [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) |
| Stars | ⭐ 24,204 |
| 语言 | Python |
| 安装 | `pip install cli-anything` |

### 核心原理

```
┌──────────────┐    ┌───────────────┐    ┌─────────────┐
│ 桌面软件      │───▶│  AI Agent 编排 │───▶│  完整 CLI   │
│ (GIMP/Blender)│    │  6阶段流水线   │    │  + SKILL.md │
└──────────────┘    └───────────────┘    └─────────────┘
```

**关键技术**：AI 驱动的代码生成 + SKILL.md 自动生成

### 支持的软件

| 软件 | 类型 | 说明 |
|------|------|------|
| GIMP | GUI | 图像编辑 |
| Blender | GUI | 3D 建模 |
| LibreOffice | GUI | 办公套件 |
| Zoom | GUI | 视频会议 |
| MuseScore | GUI | 乐谱编辑 |
| Shotcut | GUI | 视频编辑 |

### 6 阶段流水线

| 阶段 | 任务 | 输出 |
|------|------|------|
| **Phase 1** | 分析软件 | 源码/GUI 功能映射 |
| **Phase 2** | 设计架构 | 命令结构、参数模型 |
| **Phase 3** | 实现 CLI | click/typer 代码 |
| **Phase 4** | 规划测试 | TEST.md 测试计划 |
| **Phase 5** | 编写测试 | 单元 + E2E 测试 |
| **Phase 6** | 发布包 | setup.py + SKILL.md |

### 命令结构

```
/cli-anything:cli-anything <software-path-or-repo>

示例：
/cli-anything:cli-anything ./gimp        # 为 GIMP 生成 CLI
/cli-anything:cli-anything ./blender      # 为 Blender 生成 CLI
```

### 生成的 CLI 结构

```
generated-cli/
├── cli.py           # Click CLI 主入口
├── repl.py          # 交互式 REPL
├── skill.md         # AI 发现文件 ⭐
├── TEST.md         # 测试计划 + 结果
├── setup.py        # pip 安装脚本
└── README.md       # 使用文档
```

---

## 21.7 四者对比与选择

### 功能对比

| 维度 | mcp2cli | lark-cli | OpenCLI | CLI-Anything |
|------|---------|-----------|---------|--------------|
| **类型** | MCP → CLI | API → CLI | Website → CLI | GUI → CLI |
| **输入** | MCP Server | Open API | 网站（浏览器） | 桌面软件 |
| **输出** | CLI 包装 | 完整 CLI | CLI 命令 | 完整 CLI 项目 |
| **Token 节省** | 96-99% | N/A | N/A | N/A |
| **动态性** | 运行时 | 运行时 | 运行时 | 编译时 |
| **AI 介入** | 无 | 无 | 无 | 完整生成 |
| **维护成本** | 极低 | 中 | 低 | 高 |

### 适用场景

```
┌─────────────────────────────────────────────────────────────┐
│                     选择决策树                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  你有 MCP Server？                                          │
│     │                                                       │
│     ├─ Yes ──▶ 想要节省 Token？                            │
│     │              │                                        │
│     │              ├─ Yes ──▶ mcp2cli ✅                   │
│     │              └─ No  ──▶ 直接用 MCP SDK              │
│     │                                                       │
│     └─ No ──▶ 需要操作哪个平台？                           │
│                  │                                          │
│                  ├─ 飞书 ──▶ lark-cli ✅                   │
│                  │                                          │
│                  ├─ Google ──▶ Google Workspace CLI ✅     │
│                  │                                          │
│                  ├─ 网站（需要登录） ──▶ OpenCLI ✅        │
│                  │                                          │
│                  └─ 桌面软件 ──▶ CLI-Anything ✅           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 技术优势总结

| 技术 | 核心价值 |
|------|----------|
| **mcp2cli** | 解决 MCP Tool Schema 的 Token 膨胀问题 |
| **Google Workspace CLI** | 动态适配 API 变化，零维护成本 |
| **CLI-Anything** | 将任意软件 AI Agent 化，自动生成 SKILL.md |

---

## 21.8 案例：飞书 CLI (lark-cli)

> 📅 2026-03-28 飞书官方发布

### 项目概览

| 属性 | 值 |
|------|-----|
| **GitHub** | [larksuite/cli](https://github.com/larksuite/cli) |
| **发布** | 2026-03-25（4 天前） |
| **Stars** | 1,424 ⭐ |
| **语言** | Go |
| **许可** | MIT |

### 核心创新

| 创新 | 说明 |
|------|------|
| **三层命令架构** | Shortcut → API → Raw API |
| **AI Skills 生态** | 19 个开箱即用的 Skills |
| **工作流封装** | 会议纪要聚合、日报模板 |
| **安全设计** | 注入保护、Keychain、Dry Run |

### 三层命令示例

```bash
# Layer 1: Shortcut（推荐）
lark-cli im +messages-send --chat-id "oc_xxx" --text "Hello"

# Layer 2: API Commands
lark-cli calendar events instance_view --params '{"calendar_id":"primary"}'

# Layer 3: Raw API
lark-cli api POST /open-apis/im/v1/messages --body '{"receive_id":"oc_xxx"...}'
```

### 19 个 AI Skills

```
lark-shared (自动加载)    lark-calendar          lark-im
lark-doc                  lark-drive             lark-sheets
lark-base                 lark-task              lark-mail
lark-contact              lark-wiki              lark-event
lark-vc                   lark-whiteboard        lark-minutes
lark-openapi-explorer     lark-skill-maker
lark-workflow-meeting-summary  lark-workflow-standup-report
```

详见：[lark-cli-analysis.md](./lark-cli-analysis.md)

---

## 21.9 实战：构建自己的 CLI 转化工具

### OpenAPI → CLI 模板

以下是一个简化版的 OpenAPI to CLI 转换器：

```python
#!/usr/bin/env python3
"""
openapi2cli - 将 OpenAPI Spec 转换为 CLI
"""
import click
import json
import httpx
from pathlib import Path
from typing import Dict, Any

class OpenAPICLI:
    def __init__(self, spec_url: str):
        self.spec = self._fetch_spec(spec_url)
        self.commands = {}
    
    def _fetch_spec(self, url: str) -> Dict:
        """从 URL 或文件加载 OpenAPI Spec"""
        if url.startswith('http'):
            return httpx.get(url).json()
        return json.loads(Path(url).read_text())
    
    def build_cli(self) -> click.Group:
        """动态构建 CLI"""
        @click.group()
        def cli():
            """OpenAPI CLI - Auto-generated from OpenAPI Spec"""
            pass
        
        # 遍历所有路径
        for path, methods in self.spec.get('paths', {}).items():
            for method, details in methods.items():
                if method not in ['get', 'post', 'put', 'delete', 'patch']:
                    continue
                
                @cli.command(f"{method}-{path.replace('/', '-')}")
                @click.option('--data', default=None, help='Request body')
                def cmd(data, method=method, details=details):
                    """{details.get('summary', path)}"""
                    return self._call_api(method, path, data)
        
        return cli
    
    def _call_api(self, method: str, path: str, data: Any):
        """调用实际的 API"""
        base_url = self.spec.get('servers', [{}])[0].get('url', '')
        # ... 调用逻辑
        return {"status": "ok", "path": path}

@click.command()
@click.option('--spec', required=True, help='OpenAPI spec URL or file path')
def main(spec: str):
    """OpenAPI to CLI converter"""
    cli = OpenAPICLI(spec)
    cli.build_cli().()

if __name__ == '__main__':
    main()
```

### 关键实现点

| 组件 | 实现要点 |
|------|----------|
| **Spec 解析** | 使用 `jsonschema` 验证 + `httpx` 获取 |
| **命令构建** | `click.group()` + 动态 `@cli.command()` |
| **参数映射** | JSON Schema type → click.Option type |
| **输出格式化** | JSON → 彩色 terminal 输出 |
| **认证处理** | 支持 API Key / OAuth / Bearer Token |

---

## 21.10 常见问题

### Q1: mcp2cli 连接失败

```bash
# 检查 MCP Server 是否运行
curl -s https://mcp.example.com/sse

# 指定传输类型
mcp2cli --mcp https://mcp.example.com/sse --transport sse --list
```

### Q2: Google Workspace CLI 认证失败

```bash
# 重新设置认证
gws auth setup

# 检查 OAuth token
ls ~/.cache/gws/oauth/
```

### Q3: CLI-Anything 生成不完整

```bash
# 检查目标软件是否可访问
ls -la ./gimp

# 查看详细日志
cli-anything ./gimp --verbose
```

---

## 21.11 最佳实践

```
✅ 推荐做法：

1. 优先使用 mcp2cli 节省 Token
   → 特别是 MCP Server 工具多时

2. Google API 使用 gws
   → 动态适应 API 变化

3. 所有生成的 CLI 都应生成 SKILL.md
   → 便于 AI Agent 发现和使用

4. 优先使用运行时解析
   → 避免硬编码，减少维护成本

❌ 避免做法：

1. 不要每次请求都传递完整 Tool Schema
   → Token 浪费严重

2. 不要硬编码 API 路径
   → API 变化时需要手动更新

3. 不要忽略错误处理
   → CLI 应该优雅地处理网络错误
```

---

## 相关章节

- [第18章 Skills 开发与生态](../18_Skills开发/README.md) - SKILL.md 规范与发布
- [第7章 代码开发辅助](../07_代码开发辅助/README.md) - AI 辅助编程

---

## 延伸阅读

| 项目 | 链接 | 说明 |
|------|------|------|
| mcp2cli | [GitHub](https://github.com/knowsuchagency/mcp2cli) | MCP → CLI |
| Google Workspace CLI | [GitHub](https://github.com/googleworkspace/cli) | API → CLI |
| CLI-Anything | [GitHub](https://github.com/HKUDS/CLI-Anything) | NL → CLI |
| Click | [文档](https://click.palletsprojects.com/) | CLI 框架 |
| Fire | [GitHub](https://github.com/google/python-fire) | Python 对象 → CLI |

---

*更新时间: 2026-03-29*
