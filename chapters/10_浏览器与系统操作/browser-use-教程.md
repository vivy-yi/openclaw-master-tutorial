# Browser Use 教程 — AI Agent 网页自动化

> **本章学习目标**: 掌握 Browser Use 的核心概念、安装配置、Agent 集成，以及与 OpenClaw 的结合使用
> **预计用时**: 45-60 分钟
> **前置要求**: 了解 OpenClaw 基础，了解 Playwright 概念

---

## 6.X.1 Browser Use 是什么

### 核心定位

Browser Use 是 GitHub 上 85.7k ⭐ 的开源项目（MIT License），它让 AI Agent 能够通过自然语言描述来控制 Web 浏览器，实现真正的**自主网页操作**。

```
传统自动化：写死脚本 → 网页变 → 脚本报废
Browser Use：描述任务 → AI 理解页面 → 自主决策操作 → 适应变化
```

### 与 OpenClaw browser 工具的对比

| 维度 | OpenClaw browser 工具 | Browser Use |
|------|----------------------|------------|
| **控制方式** | 你→截图→决策→发指令（单步） | 描述任务→Agent 自动循环（多步） |
| **适用场景** | 需要人工判断的复杂操作 | 流程明确的多步任务 |
| **开发成本** | 需要逐步描述 | 一句话描述任务 |
| **执行速度** | 快（人工快） | 慢（每步需 LLM 推理 2-10s） |
| **可靠性** | 高（人工作用） | 中（依赖 AI 推理准确性） |
| **维护成本** | 高（网页变需改指令） | 低（AI 能自适应） |

### 工作原理

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Use Agent                         │
│                                                               │
│  1. 获取页面状态                                               │
│     HTML DOM → Accessibility Tree → 可视化截图                │
│                                                               │
│  2. LLM 理解页面                                              │
│     "页面显示登录表单，包含用户名、密码输入框和登录按钮"          │
│                                                               │
│  3. LLM 决策下一步                                             │
│     "应先在用户名框输入账号，然后密码框输入密码，最后点击登录"    │
│                                                               │
│  4. 执行操作 + 验证                                           │
│     click[id=username] → type[xxx] → verify                  │
│                                                               │
│  5. 循环直到任务完成                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 6.X.2 安装与配置

### 方式一：pip 安装（推荐）

```bash
pip install browser-use
```

### 方式二：Docker 环境

```bash
docker pull browser-use/browser-use:latest
docker run -it --rm \
  -e OPENAI_API_KEY=your-key \
  browser-use/browser-use
```

### 方式三：集成到 OpenClaw 作为 Skill

创建文件 `~/.openclaw/skills/browser-use/SKILL.md`：

```markdown
# Browser Use Web Automation

让 AI Agent 能够自主操作网页，完成多步骤自动化任务。

## 核心能力
- 自然语言描述任务 → 自动执行
- 支持 click, type, scroll, screenshot 等操作
- 智能页面理解 + 失败重试

## 使用场景
- 表单自动填写
- 数据采集（竞品价格、新闻等）
- 网页测试
- 复杂多步骤操作

## 前置要求
- 安装 browser-use: `pip install browser-use`
- 设置 OPENAI_API_KEY 或其他 LLM API Key

## 使用示例
用户说"帮我填这份表单"，Agent 自动：
1. 打开目标网页
2. 分析页面结构
3. 依次填写各字段
4. 提交表单
5. 返回结果
```

---

## 6.X.3 基础使用

### 3.1 最简单的例子

```python
from browser_use import Agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
agent = Agent(task="帮我填写这个表单：姓名张三，邮箱 zhangsan@example.com", llm=llm)
result = agent.run()
```

### 3.2 带浏览器配置

```python
from browser_use import Agent
from langchain_anthropic import ChatAnthropic
from playwright.sync_api import sync_playwright

# 使用 Claude
llm = ChatAnthropic(model="claude-sonnet-4-20250514")

# 配置浏览器
with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # False=可见浏览器
    agent = Agent(
        task="访问知乎热榜，把前5条标题复制下来",
        llm=llm,
        browser=browser
    )
    result = agent.run()
```

### 3.3 查看执行过程

```python
agent = Agent(
    task="在 Google 搜索 'OpenClaw AI'，打开第一个结果",
    llm=llm,
    headless=False,
    verbose=True  # 打印每一步决策
)
result = agent.run()
```

---

## 6.X.4 常见任务模板

### 4.1 表单填写

```python
task = """
完成以下任务：
1. 打开 https://example.com/form
2. 填写姓名：张三
3. 填写邮箱：zhangsan@example.com
4. 选择国家：中国
5. 填写留言：这是一次测试
6. 点击提交按钮
7. 等待页面跳转后截图
"""

agent = Agent(task=task, llm=llm)
agent.run()
```

### 4.2 数据采集

```python
task = """
采集知乎热榜前10条文章的信息：
1. 打开知乎热榜
2. 对每条内容记录：标题、链接、热度
3. 将结果保存为 JSON 格式输出
"""

agent = Agent(task=task, llm=llm)
result = agent.run()
print(result)
```

### 4.3 购物自动化

```python
task = """
在京东搜索 'iPhone 15'：
1. 打开京东并搜索
2. 获取前5个商品的名称和价格
3. 记录最便宜的那个商品链接
"""

agent = Agent(task=task, llm=llm)
agent.run()
```

### 4.4 内容发布

```python
task = """
发一条微博：
1. 打开微博发布页
2. 登录账号（使用预存的 cookies）
3. 输入内容："用 AI Agent 自动发微博，真香！"
4. 添加话题：#AI #自动化
5. 点击发布
"""

agent = Agent(task=task, llm=llm)
agent.run()
```

---

## 6.X.5 OpenClaw 集成

### 5.1 创建 Browser Use Skill

```python
# ~/.openclaw/skills/browser-use/scripts/browser_task.py

import asyncio
from browser_use import Agent
from langchain_openai import ChatOpenAI
import json

class BrowserUseTool:
    """Browser Use 工具封装，供 OpenClaw Agent 调用"""

    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o")

    async def execute(self, task: str, headless: bool = True) -> str:
        """
        执行 Browser Use 任务
        
        Args:
            task: 自然语言任务描述
            headless: 是否使用无头模式（不显示浏览器）
        
        Returns:
            执行结果描述
        """
        from playwright.sync_api import sync_playwright

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=headless)
            
            agent = Agent(
                task=task,
                llm=self.llm,
                browser=browser,
                verbose=True
            )
            
            try:
                result = agent.run()
                return f"✅ 任务完成：{result}"
            except Exception as e:
                return f"❌ 任务失败：{str(e)}"
            finally:
                await browser.close()

    async def fill_form(self, url: str, fields: dict) -> str:
        """
        快速表单填写
        
        Args:
            url: 表单页面 URL
            fields: 字段字典，如 {"姓名": "张三", "邮箱": "test@example.com"}
        """
        field_text = "\n".join([f"- {k}: {v}" for k, v in fields.items()])
        task = f"""
访问 {url} 并填写表单：
{field_text}
填写完成后提交表单，并返回提交结果。
"""
        return await self.execute(task)

    async def scrape_page(self, url: str, selector: str = None) -> str:
        """
        采集页面内容
        
        Args:
            url: 页面 URL
            selector: 可选的 CSS 选择器，指定采集范围
        """
        if selector:
            task = f"打开 {url}，使用选择器 '{selector}' 采集内容，返回采集到的文本"
        else:
            task = f"打开 {url}，采集页面主要内容，返回文本格式的结果"
        
        return await self.execute(task)
```

### 5.2 OpenClaw Agent 调用示例

在 OpenClaw Agent 的 SOUL.md 或对话中：

```markdown
## 可用工具

当用户需要执行网页自动化任务时，使用 browser-use 工具：

**支持的命令：**
- `browser_task:<自然语言任务描述>` — 执行任意网页自动化任务
- `fill_form:<URL>|<字段字典>` — 快速填写表单
- `scrape_page:<URL>|[选择器]` — 采集页面内容

**使用示例：**
用户: "帮我填这份表单"
Agent: 调用 fill_form("https://example.com/form", {"姓名": "张三", "邮箱": "test@example.com"})

用户: "采集这个页面的信息"
Agent: 调用 scrape_page("https://news.example.com", None)
```

### 5.3 MCP 服务器方式

如果你使用 MCP（Model Context Protocol），可以快速集成 Browser Use：

```json
// openclaw.json 配置
{
  "mcpServers": {
    "browser-use": {
      "command": "npx",
      "args": ["-y", "@browser-use/mcp-server"]
    }
  }
}
```

MCP 服务器暴露的工具：

| 工具 | 参数 | 描述 |
|------|------|------|
| `browser_task` | `task: string` | 执行自然语言任务 |
| `browser_screenshot` | `url: string` | 获取页面截图 |
| `browser_click` | `url: string, selector: string` | 点击元素 |
| `browser_fill` | `url: string, selector: string, value: string` | 填写表单 |

---

## 6.X.6 多模型支持

### 6.1 支持的模型

Browser Use 支持多种 LLM：

```python
# OpenAI
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o")

# Anthropic
from langchain_anthropic import ChatAnthropic
llm = ChatAnthropic(model="claude-sonnet-4-20250514")

# Google
from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# 本地模型（Ollama）
from langchain_community.chat_models import ChatOllama
llm = ChatOllama(model="llama3")
```

### 6.2 模型选择建议

| 任务复杂度 | 推荐模型 | 成本 | 速度 |
|-----------|---------|------|------|
| 简单表单填写 | GPT-4o-mini / Haiku | 低 | 快 |
| 普通多步操作 | GPT-4o / Claude Sonnet | 中 | 中 |
| 复杂页面理解 | GPT-4o / Opus | 高 | 慢 |
| 本地隐私需求 | Ollama (Llama3) | 免费 | 慢 |

---

## 6.X.7 高级配置

### 7.1 自定义操作延迟

有些网站需要操作间隔：

```python
agent = Agent(
    task="...",
    llm=llm,
    page_delay=1000,  # 每步操作间隔 1000ms
    after_wait_timeout=3000,  # 操作后等待 3s
)
```

### 7.2 禁用部分操作

出于安全考虑，可以禁用危险操作：

```python
agent = Agent(
    task="...",
    llm=llm,
    allowed_actions=["click", "type", "scroll", "screenshot"],  # 只允许这些
    # 禁用：goto, download, upload, evaluate
)
```

### 7.3 设置代理

```python
agent = Agent(
    task="...",
    llm=llm,
    proxy="http://my-proxy:8080"  # 代理服务器
)
```

### 7.4 保存登录状态

```python
# 复用登录状态（避免每次重新登录）
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    context = p.chromium.launch_persistent_context(
        user_data_dir="/tmp/browser-profile"
    )
    page = context.new_page()
    
    # 首次登录
    page.goto("https://example.com/login")
    # ... 手动登录一次
    
    # 后续使用已登录状态
    agent = Agent(task="...", llm=llm, page=page)
```

---

## 6.X.8 常见问题与解决

### 问题 1：页面加载慢

```python
# 增加超时时间
agent = Agent(
    task="...",
    llm=llm,
    max_steps=50,  # 增加最大步数
    timeout=120,   # 增加超时时间（秒）
)
```

### 问题 2：被网站检测为 Bot

```python
# 使用 stealth 模式
agent = Agent(
    task="...",
    llm=llm,
    stealth=True,  # 模拟真实浏览器行为
)
```

### 问题 3：需要处理验证码

Browser Use 本身无法处理验证码，可选方案：

1. **外部打码服务**：
```python
# 集成 2Captcha 等服务
captcha_token = solve_captcha(site_key, url)
# 将 token 填入表单
```

2. **人工介入**：
```python
agent = Agent(task="...")
try:
    result = agent.run()
except CaptchaRequired:
    print("需要人工处理验证码")
    # 暂停任务，等待人工处理
```

### 问题 4：操作失败重试

```python
max_retries = 3
for attempt in range(max_retries):
    try:
        agent = Agent(task=task, llm=llm)
        result = agent.run()
        break
    except ActionFailedError as e:
        if attempt == max_retries - 1:
            raise
        print(f"尝试 {attempt + 1} 失败，重试...")
```

---

## 6.X.9 性能优化

### 9.1 减少 Token 消耗

```python
# 使用更小的模型处理简单任务
def get_llm_for_task(task: str):
    if len(task) < 100 and "搜索" in task:
        return ChatOpenAI(model="gpt-4o-mini")  # 简单任务用小模型
    return ChatOpenAI(model="gpt-4o")  # 复杂任务用大模型

llm = get_llm_for_task(task)
agent = Agent(task=task, llm=llm)
```

### 9.2 并行处理多页面

```python
from concurrent.futures import ThreadPoolExecutor

def scrape_one(url):
    agent = Agent(task=f"采集 {url} 的标题", llm=llm_small)
    return agent.run()

urls = [f"https://news.site.com/{i}" for i in range(10)]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(scrape_one, urls))
```

### 9.3 缓存稳定内容

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_page_structure(url):
    """缓存页面结构（避免重复分析）"""
    agent = Agent(task=f"分析 {url} 的页面结构，返回关键元素列表", llm=llm)
    return agent.run()
```

---

## 6.X.10 安全注意事项

### ⚠️ 使用前必读

1. **robots.txt 遵守**：爬取前检查目标网站的 robots.txt
2. **请求频率**：添加延迟，避免对服务器造成压力
3. **登录凭证**：不要在代码中硬编码密码，使用环境变量
4. **隐私数据**：避免采集个人隐私信息
5. **法律合规**：了解当地法律法规，某些场景可能违规

### 推荐的安全实践

```python
import os

# ✅ 好：使用环境变量
api_key = os.getenv("BROWSER_USE_KEY")

# ❌ 坏：硬编码密钥
api_key = "sk-xxxxxx"

# ✅ 好：设置请求间隔
page_delay = 1000  # 1秒

# ❌ 坏：无间隔疯狂请求
```

---

## 6.X.11 相关资源

- [Browser Use GitHub](https://github.com/browser-use/browser-use)
- [Browser Use Web UI](https://github.com/browser-use/web-ui)
- [Browser Use 文档](https://docs.browser-use.com)
- [BU Bench 基准测试](https://github.com/browser-use/benchmark)
- [OpenClaw 浏览器工具](../16_system_layer/README.md#browser)

---

## 本章小结

| 知识点 | 掌握程度 |
|--------|---------|
| Browser Use 核心原理 | 理解 Agent 循环机制 |
| 安装与配置 | 能独立安装运行 |
| 基础使用 | 能执行简单任务 |
| OpenClaw 集成 | 能创建 Browser Use Skill |
| 多模型支持 | 会选择合适模型 |
| 常见问题处理 | 能解决卡顿、重试等问题 |

---

*更新时间: 2026-04-04*
