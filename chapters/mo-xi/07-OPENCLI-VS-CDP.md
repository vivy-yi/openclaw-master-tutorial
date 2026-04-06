# OpenCLI vs OpenClaw CDP 对比分析

## 一、核心对比

| 维度 | OpenCLI | OpenClaw CDP |
|------|---------|--------------|
| **定位** | CLI 工具封装 | 原生浏览器控制 |
| **平台数量** | 73+ 预配置 | **任意网站** |
| **依赖** | 需要安装 | **OpenClaw 内置** |
| **维护** | 人工更新适配器 | 零维护 |
| **灵活性** | 受限于已有适配器 | **完全自适应** |

---

## 二、功能对比

### 2.1 基础能力

| 功能 | OpenCLI | OpenClaw CDP |
|------|---------|--------------|
| 网站打开 | `opencli weibo hot` | ✅ browser.open(url) |
| API 拦截 | ✅ 内置 | ✅ browser.intercept() |
| 响应提取 | ✅ 自动解析 | ✅ browser.responsebody() |
| DOM 操作 | ✅ 封装 | ✅ click/type/scroll |
| JS 执行 | ✅ 支持 | ✅ browser.evaluate() |
| 截图 | ✅ | ✅ browser.screenshot() |
| 翻页采集 | ✅ | ✅ auto_scroll |

### 2.2 高级能力

| 能力 | OpenCLI | OpenClaw CDP |
|------|---------|--------------|
| 多 Profile | ❌ | ✅ openclaw/user/work/remote |
| Remote CDP | ❌ | ✅ 云端浏览器 |
| Chrome MCP | ❌ | ✅ 复用登录态 |
| 定时任务 | ❌ | ✅ Cron 集成 |
| 消息通知 | ❌ | ✅ message 集成 |
| Skills 触发 | ❌ | ✅ 自动触发 |

---

## 三、OpenClaw 独有优势

### 3.1 Skills 原生集成

```
用户请求
    ↓
墨析 Skill 解析
    ↓
browser 执行采集
    ↓
Cron 定时任务
    ↓
message 通知用户
```

OpenCLI 只能手动执行，OpenClaw 可以**全自动运行**。

### 3.2 多 Profile 支持

```json
{
  "browser": {
    "profiles": {
      "openclaw": { "cdpPort": 18800 },
      "user": { "driver": "existing-session" },
      "remote": { "cdpUrl": "wss://..." }
    }
  }
}
```

- `openclaw`: 隔离的浏览器
- `user`: 复用用户已登录的 Chrome
- `remote`: 连接云端浏览器

### 3.3 自适应能力

| OpenCLI | OpenClaw CDP |
|---------|--------------|
| 需要为每个平台写适配器 | 任意网站直接采集 |
| 遇到新平台需要开发 | 遇到新平台自动探索 |
| 73 个平台 | **无限平台** |

---

## 四、OpenClaw CDP 全链路能力

### 4.1 Web 采集

```yaml
# 采集微博热搜
browser.open("https://weibo.com/hot Flow")
browser.intercept()
browser.wait()
browser.responsebody("**/hotSearch**")

# 采集知乎热榜
browser.open("https://www.zhihu.com/hot")
browser.snapshot()
browser.evaluate(js_extract)
```

### 4.2 Electron 桌面应用

```yaml
# 连接 VS Code（需开启 debug 端口）
browser.open("vscode://", profile="vscode")

# 连接 Slack
browser.open("slack://", profile="slack")
```

### 4.3 云端浏览器

```yaml
# Browserless
browser.open("https://target.com", profile="browserless")

# Browserbase（支持 CAPTCHA）
browser.open("https://target.com", profile="browserbase")
```

### 4.4 Chrome MCP（复用登录态）

```yaml
browser.open("https://weibo.com", profile="user")
# 直接使用用户已登录的 Chrome 会话
```

---

## 五、结论

### 为什么墨析选择 OpenClaw CDP

| 原因 | 说明 |
|------|------|
| **零依赖** | 不需要安装 opencli |
| **无限平台** | 任何网站都可以 |
| **Skills 集成** | 自动触发、定时、通知 |
| **多 Profile** | 隔离/登录态/远程 |
| **自我进化** | 知识库自动学习 |

### OpenCLI 适合场景

- 快速 CLI 测试
- 一次性数据导出
- 无需自动化的简单任务

### OpenClaw CDP 适合场景

- **墨析这类自动化 Agent**
- 需要定时采集的任务
- 需要通知和报警的场景
- 跨平台数据聚合
- 竞品监控
