# CLI 工具速查表

> 快速参考 | 更新于 2026-03-29

---

## OpenCLI

### 安装

```bash
# 安装 Browser Bridge Extension
# 1. 下载 opencli-extension.zip from Releases
# 2. chrome://extensions 加载

# 安装 CLI
npm install -g @jackwener/opencli

# 验证
opencli doctor
```

### 常用命令

```bash
# 列出所有命令
opencli list

# 公开 API（无需浏览器）
opencli hackernews top --limit 5
opencli reddit hot --limit 10

# 浏览器命令（需要登录）
opencli bilibili hot --limit 5
opencli twitter trending --limit 10

# 下载内容
opencli xiaohongshu download <note-id> --output ./xhs

# AI Agent 工具发现
opencli explore https://example.com
opencli synthesize mysite
```

### 输出格式

```bash
-f json    # JSON（管道）
-f yaml    # YAML
-f csv     # CSV
-f table   # 表格（默认）
-v         # 详细日志
```

---

## mcp2cli

### 安装

```bash
# 方式1：直接运行（推荐）
uvx mcp2cli --help

# 方式2：全局安装
uv tool install mcp2cli
```

### 常用命令

```bash
# 连接 MCP 服务器
mcp2cli --mcp https://mcp.example.com/sse --list

# 调用工具
mcp2cli --mcp https://mcp.example.com/sse search --query "test"

# 带认证
mcp2cli --mcp https://mcp.example.com/sse \
  --auth-header "x-api-key:sk-..." \
  query --sql "SELECT 1"

# 搜索工具
mcp2cli --mcp https://mcp.example.com/sse --search "task"

# OAuth 认证
mcp2cli --mcp https://mcp.example.com/sse --oauth --list
```

### Token 节省效果

| 方式 | Token 消耗 |
|------|-----------|
| 传统 MCP | ~10-15K/token |
| mcp2cli | ~300-500/token |
| **节省** | **96-99%** |

---

## Google Workspace CLI (gws)

### 安装

```bash
# npm
npm install -g @googleworkspace/cli

# 或下载预编译二进制
# https://github.com/googleworkspace/cli/releases
```

### 认证

```bash
# 交互式设置
gws auth setup

# OAuth 登录
gws auth login
```

### 常用命令

```bash
# Drive
gws drive files list --params '{"pageSize": 5}'
gws drive.files.create --name "Test File"

# Gmail
gws gmail messages.list --params '{"maxResults": 10}'
gws gmail.messages.send --to "user@example.com" --subject "Hello"

# Calendar
gws calendar events.list --calendar-id "primary"
gws calendar.events.create --summary "Meeting" --start "2026-04-01T10:00:00"

# Sheets
gws sheets.spreadsheets.get --spreadsheet-id "xxx"
```

### 命令结构

```
gws <service>.<resource>.<method> [flags]

示例：
gws drive.files.list
gws gmail.messages.send
gws calendar.events.create
```

---

## CLI-Anything

### 安装

```bash
# pip
pip install cli-anything

# Claude Code 插件市场
/plugin marketplace add HKUDS/CLI-Anything
/plugin install cli-anything
```

### 使用

```bash
# 为软件生成 CLI
cli-anything ./gimp
cli-anything ./blender
cli-anything ./libreoffice

# Claude Code 中
/cli-anything:cli-anything ./gimp
```

### 输出结构

```
generated-cli/
├── cli.py           # Click CLI
├── repl.py          # 交互式 REPL
├── skill.md         # AI 发现文件 ⭐
├── TEST.md         # 测试文档
├── setup.py        # 安装脚本
└── README.md       # 使用说明
```

---

## OpenAPI → CLI (通用模板)

### 模板代码

```python
#!/usr/bin/env python3
import click
import httpx
import json

@click.command()
@click.option('--spec', required=True, help='OpenAPI spec URL')
@click.option('--base-url', help='Override base URL')
def cli(spec, base_url):
    """OpenAPI to CLI converter"""
    # 加载 spec
    if spec.startswith('http'):
        spec_data = httpx.get(spec).json()
    else:
        with open(spec) as f:
            spec_data = json.load(f)
    
    base = base_url or spec_data.get('servers', [{}])[0].get('url', '')
    print(f"API Base: {base}")
    
    # 动态构建命令...
    
if __name__ == '__main__':
    cli()
```

### 使用

```bash
# 运行
python openapi2cli.py --spec https://petstore.swagger.io/v2/swagger.json

# 调用生成的 API
python openapi2cli.py --spec petstore.json get-/pet-findByStatus
```

---

## 快速选择指南

```
我需要...
│
├─ AI Agent 控制浏览器？
│   ├─ 复杂任务 → Browser-Use ✅
│   ├─ MCP 协议 → Playwright MCP ✅
│   ├─ GitHub 操作 → GitHub MCP ✅
│   └─ 高性能 → Agent Browser ✅
│
├─ 操作网站（预构建适配器）？
│   └─ → OpenCLI (Website → CLI) ✅
│
├─ 节省 MCP Token？
│   └─ → mcp2cli (MCP → CLI) ✅
│
├─ 调用飞书 API？
│   └─ → lark-cli (API → CLI) ✅
│
├─ 调用 Google API？
│   └─ → gws (API → CLI) ✅
│
├─ 把桌面软件变成 CLI？
│   └─ → CLI-Anything (GUI → CLI) ✅
│
└─ 转换自定义 API？
    └─ → openapi2cli (自建) ✅
```

---

## CLI 框架对比

| 框架 | 语言 | 特点 | 适用场景 |
|------|------|------|----------|
| **Click** | Python | 装饰器模式，命令组合 | 复杂 CLI |
| **Typer** | Python | 类型提示，自动生成 | 快速开发 |
| **Fire** | Python | 任意对象 → CLI | 快速原型 |
| **Cobra** | Go | 功能完善 | 生产级 CLI |
| **Clap** | Rust | 高性能 | 性能敏感 |
| **Argparse** | Python | 标准库 | 简单脚本 |

---

## 常用工具库

### Python

| 库 | 用途 |
|---|------|
| `click` | CLI 框架 |
| `typer` | 类型化 CLI |
| `fire` | 对象转 CLI |
| `httpx` | HTTP 客户端 |
| `jsonschema` | JSON 验证 |
| `rich` | 富文本输出 |

### Rust

| 库 | 用途 |
|---|------|
| `clap` | CLI 解析 |
| `reqwest` | HTTP 客户端 |
| `serde` | 序列化 |
| `tokio` | 异步运行时 |

---

## 环境变量模式

mcp2cli 和 gws 支持从环境变量读取敏感信息：

```bash
# mcp2cli
export MY_API_TOKEN="sk-..."
mcp2cli --mcp https://api.example.com \
  --auth-header "Authorization:env:MY_API_TOKEN"

# gws
export GWS_CLIENT_ID="xxx"
export GWS_CLIENT_SECRET="xxx"
gws auth login
```

---

*速查表更新于 2026-03-29*
