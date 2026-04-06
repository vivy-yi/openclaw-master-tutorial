# 墨析 CDP 扩展能力设计

## 一、CDP 能力全景

```
┌─────────────────────────────────────────────────────────┐
│                 OpenClaw browser tool                    │
├─────────────────────────────────────────────────────────┤
│  Web 采集 ─── 任意网站 ────────────────────────────── │
│  Electron ─── 桌面应用 ────────────────────────────── │
│  Remote CDP ── 云端浏览器 ──────────────────────────── │
│  Chrome MCP ── 已登录会话 ──────────────────────────── │
└─────────────────────────────────────────────────────────┘
```

---

## 二、Web 采集（基础）

### 能力

| 功能 | 命令 | 说明 |
|------|------|------|
| 打开页面 | browser.open(url) | 任意 URL |
| 页面快照 | browser.snapshot() | DOM 结构分析 |
| 拦截请求 | browser.intercept() | 发现 API |
| 响应提取 | browser.responsebody() | 获取 JSON |
| JS 执行 | browser.evaluate() | 提取数据 |
| 截图 | browser.screenshot() | 验证结果 |
| 点击 | browser.act(kind="click") | 元素交互 |
| 输入 | browser.act(kind="type") | 表单输入 |
| 滚动 | browser.act(kind="scroll") | 翻页 |

### 示例

```yaml
# 采集微博热搜
browser.open("https://weibo.com/hot Flow")
browser.intercept()
browser.wait()
browser.responsebody("**/hotSearch**")

# 采集知乎热榜
browser.open("https://www.zhihu.com/hot")
browser.snapshot()
browser.evaluate(() => {
  return Array.from(document.querySelectorAll('.HotItem'))
    .map(item => ({
      rank: item.querySelector('.rank')?.textContent,
      title: item.querySelector('.title')?.textContent
    }));
})
```

---

## 三、Electron 桌面应用控制

### 3.1 连接方式

应用需要开启 debug 端口：

```bash
# 方式1: 命令行参数
electron --remote-debugging-port=9222 /path/to/app.asar

# 方式2: 环境变量
ELECTRON_EXTRA_LAUNCH_ARGS="--remote-debugging-port=9222" electron .
```

### 3.2 常用应用端口

| 应用 | 端口 | 可控制内容 |
|------|------|------------|
| VS Code | 9222 | 编辑器、终端、文件 |
| Slack | 9223 | 消息、频道、搜索 |
| Discord | 9224 | 服务器、频道、DM |
| Notion | 9225 | 页面、数据库 |
| Telegram | 9226 | 聊天、群组 |
| 飞书 | 9227 | 文档、消息 |
| 钉钉 | 9228 | 消息、审批 |

### 3.3 配置

```json
{
  "browser": {
    "profiles": {
      "vscode": {
        "cdpUrl": "http://localhost:9222"
      },
      "slack": {
        "cdpUrl": "http://localhost:9223"
      }
    }
  }
}
```

### 3.4 使用示例

```yaml
# 连接 VS Code
browser.open("vscode://", profile="vscode")
browser.snapshot()

# 操作
browser.act(kind="click", ref="menu_file")
browser.act(kind="type", ref="editor", text="console.log('hello')")

# 终端操作
browser.act(kind="click", ref="terminal")
browser.act(kind="type", text="git status")
```

---

## 四、Remote CDP 云端浏览器

### 4.1 Browserless

```json
{
  "browser": {
    "profiles": {
      "browserless": {
        "cdpUrl": "wss://production-sfo.browserless.io?token=<KEY>",
        "color": "#00AA00"
      }
    }
  }
}
```

**适用场景**：
- 高频率采集
- 避开 IP 封锁
- 并行任务
- 大规模数据采集

### 4.2 Browserbase

```json
{
  "browser": {
    "profiles": {
      "browserbase": {
        "cdpUrl": "wss://connect.browserbase.com?apiKey=<KEY>",
        "color": "#F97316"
      }
    }
  }
}
```

**特殊能力**：
- 内置 CAPTCHA 解决
- 住宅 IP
- 隐身模式
- 自动化友好

### 4.3 自建远程浏览器

```bash
# VPS 上启动 Chrome
chromium --remote-debugging-port=9222 \
         --headless \
         --no-sandbox \
         --disable-dev-shm-usage
```

```json
{
  "browser": {
    "profiles": {
      "remote_vps": {
        "cdpUrl": "http://your-vps-ip:9222"
      }
    }
  }
}
```

---

## 五、Chrome MCP 已登录会话

### 5.1 配置

```json
{
  "browser": {
    "profiles": {
      "user": {
        "driver": "existing-session",
        "attachOnly": true,
        "userDataDir": "~/.config/google-chrome/Default"
      }
    }
  }
}
```

### 5.2 Chrome 设置

1. 打开 Chrome
2. 访问 `chrome://inspect/#remote-debugging`
3. 勾选 "Enable remote debugging"
4. 保持浏览器打开

### 5.3 使用

```yaml
# 使用用户已登录的 Chrome
browser.open("https://weibo.com", profile="user")

# 直接访问需要登录的页面
browser.open("https://xiaohongshu.com/profile")
```

**优势**：
- ✅ 复用已有登录态
- ✅ 无需重新登录
- ✅ Cookie/Session 保持
- ✅ 无需管理凭证

---

## 六、自适应方法选择

```
采集请求
    ↓
┌─────────────────────────────────────────┐
│  目标识别                                │
│  - URL 解析                              │
│  - 端口检测（localhost:9222?）           │
│  - Profile 检测                          │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  方法选择                                │
│  1. localhost 端口 → Electron 连接      │
│  2. wss:// → Remote CDP               │
│  3. profile=user → Chrome MCP        │
│  4. 普通 URL → Web CDP                │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  执行采集                                │
│  统一输出标准化格式                     │
└─────────────────────────────────────────┘
```

---

## 七、能力矩阵

| 能力 | Web | Electron | Remote | Chrome MCP |
|------|-----|----------|--------|------------|
| 网站采集 | ✅ | ❌ | ✅ | ✅ |
| 桌面应用 | ❌ | ✅ | ❌ | ❌ |
| 登录态复用 | ❌ | ❌ | ❌ | ✅ |
| 反爬绕过 | ❌ | ❌ | ✅ | ❌ |
| 高频采集 | ❌ | ❌ | ✅ | ❌ |
| 文件操作 | ✅ | ✅ | ❌ | ❌ |
| 剪贴板 | ✅ | ✅ | ❌ | ✅ |
| 自动化测试 | ✅ | ✅ | ✅ | ✅ |

---

## 八、任务调度设计

```yaml
# 混合任务调度
scheduler:
  strategies:
    - name: "高频任务"
      target: "browserless"    # 云端并行
      concurrency: 10
      use_case: "大规模数据采集"
    
    - name: "登录任务"
      target: "chrome_mcp"     # 复用登录
      concurrency: 2
      use_case: "需要登录的数据"
    
    - name: "桌面应用"
      target: "electron"       # 本地控制
      concurrency: 1
      use_case: "VS Code 操作"
    
    - name: "普通任务"
      target: "web"           # 默认
      concurrency: 5
      use_case: "公开数据采集"
```

---

## 九、配置示例

```json
{
  "browser": {
    "enabled": true,
    "profiles": {
      "openclaw": {
        "cdpPort": 18800
      },
      "user": {
        "driver": "existing-session",
        "attachOnly": true
      },
      "vscode": {
        "cdpUrl": "http://localhost:9222"
      },
      "slack": {
        "cdpUrl": "http://localhost:9223"
      },
      "browserless": {
        "cdpUrl": "wss://production.browserless.io?token=<KEY>"
      },
      "browserbase": {
        "cdpUrl": "wss://connect.browserbase.com?apiKey=<KEY>"
      }
    }
  }
}
```

---

## 十、安全考虑

| 风险 | 缓解措施 |
|------|----------|
| CDP 端口暴露 | 仅本地连接 |
| 远程 CDP | 使用 WSS 加密 |
| Token 泄露 | 使用环境变量 |
| Electron 安全 | 应用自身权限 |
| 浏览器安全 | profile 隔离 |
