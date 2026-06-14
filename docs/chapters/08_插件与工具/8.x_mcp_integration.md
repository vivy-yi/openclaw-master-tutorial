# OpenClaw MCP 服务器集成指南

本文档介绍如何在 OpenClaw 中集成 MCP (Model Context Protocol) 服务器，包括 Notion、Google Calendar、Home Assistant 等常用服务。

## 前提条件

- OpenClaw v2026.4.x 或更高版本
- MCP 服务器已运行（本地或远程）

## 快速开始

### 1. 配置 MCP 服务器

在 `openclaw.json` 中添加 MCP 配置：

```json
{
  "mcp": {
    "servers": {
      "notion": {
        "command": "npx",
        "args": ["-y", "@notionhq/notion-mcp-server"],
        "env": {
          "NOTION_API_KEY": "your-api-key"
        }
      },
      "google-calendar": {
        "command": "npx",
        "args": ["-y", "@anthropic/google-calendar-mcp"],
        "env": {
          "GOOGLE_API_KEY": "your-api-key"
        }
      },
      "home-assistant": {
        "command": "npx",
        "args": ["-y", "@home-assistant/mcp-server"],
        "url": "http://localhost:8123"
      }
    }
  }
}
```

### 2. 验证配置

```bash
openclaw doctor --mcp
```

## 常用 MCP 服务器

### Notion

连接 Notion 获取数据库和页面内容：

```json
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@notionhq/notion-mcp-server"],
    "env": {
      "NOTION_API_KEY": "secret_xxx"
    }
  }
}
```

### Google Calendar

管理日历事件：

```json
{
  "google-calendar": {
    "command": "npx", 
    "args": ["-y", "@anthropic/google-calendar-mcp"],
    "env": {
      "GOOGLE_API_KEY": "xxx"
    }
  }
}
```

### Home Assistant

控制智能家居设备：

```json
{
  "home-assistant": {
    "command": "npx",
    "args": ["-y", "@home-assistant/mcp-server"],
    "url": "http://localhost:8123",
    "env": {
      "HA_TOKEN": "your-long-lived-token"
    }
  }
}
```

## 多实例配置

### OAuth 认证

```json
{
  "mcp": {
    "servers": {
      "notion-oauth": {
        "command": "npx",
        "args": ["-y", "@notionhq/notion-mcp-server"],
        "auth": {
          "type": "oauth",
          "clientId": "your-client-id",
          "clientSecret": "your-client-secret"
        }
      }
    }
  }
}
```

### 多账户管理

```json
{
  "mcp": {
    "servers": {
      "notion-work": {
        "command": "npx",
        "args": ["-y", "@notionhq/notion-mcp-server"],
        "env": {
          "NOTION_API_KEY": "work_workspace_key"
        }
      },
      "notion-personal": {
        "command": "npx",
        "args": ["-y", "@notionhq/notion-mcp-server"],
        "env": {
          "NOTION_API_KEY": "personal_workspace_key"
        }
      }
    }
  }
}
```

## 工具调用

配置完成后，Agent 可以直接调用 MCP 工具：

```
Agent: 请帮我查看 Notion 中标记为"重要"的待办事项
Agent: 创建一个下周三下午3点的日历会议
```

## 故障排除

### 连接失败

```bash
# 检查 MCP 服务器状态
openclaw doctor --mcp --verbose

# 手动启动测试
npx @notionhq/notion-mcp-server
```

### 认证错误

- 确保 API Key 正确
- 检查 OAuth 权限
- 验证 token 有效性

### 性能问题

- 使用本地 MCP 服务器而非远程
- 增加 timeout 设置
- 限制并发请求数

## 相关资源

- [OpenClaw MCP Protocol 文档](https://docs.openclaw.ai)
- [MCP 官方规范](https://modelcontextprotocol.io)
- [freema/openclaw-mcp 配置参考](https://github.com/freema/openclaw-mcp)