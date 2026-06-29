# MediaCrawler 完整教程

> 社交媒体多平台爬虫 — 从入门到精通

---

## 📌 项目信息

| 项目 | 内容 |
|------|------|
| **仓库** | [NanmiCoder/MediaCrawler](https://github.com/NanmiCoder/MediaCrawler) |
| **Stars** | ⭐ 49,011 |
| **语言** | Python |
| **架构** | mitmproxy 中间人代理 + 模块化爬虫框架 |
| **作者** | NanmiCoder |
| **许可证** | MIT |

---

## 1. 功能概述

MediaCrawler 是一款功能强大的**社交媒体数据爬虫**，通过拦截平台流量（mitmproxy）获取真实数据，支持以下平台：

### 支持的平台

| 平台 | 笔记/帖子 | 评论 | 视频 | 用户信息 |
|------|:---------:|:----:|:----:|:--------:|
| 小红书 | ✅ | ✅ | ✅ | ✅ |
| 抖音 | ✅ | ✅ | ✅ | ✅ |
| 快手 | ✅ | ✅ | ✅ | ✅ |
| B站（哔哩哔哩） | ✅ | ✅ | ✅ | ✅ |
| 微博 | ✅ | ✅ | ✅ | ✅ |
| 百度贴吧 | ✅ | ✅ | — | ✅ |
| 知乎 | ✅ | ✅ | — | ✅ |

### 核心能力

- **多线程并发爬取**：支持大量数据并行抓取
- **自动重试机制**：网络异常自动重试，保证数据完整性
- **代理池支持**：内置代理 IP 管理，减少封禁风险
- **数据存储**：MySQL / MongoDB / SQLite 多数据库支持
- **断点续爬**：支持增量爬取，避免重复抓取
- **搜索过滤**：关键词、用户、时间范围等多维度过滤

---

## 2. 核心原理

### 2.1 技术架构

```
┌─────────────────────────────────────────────────┐
│                   用户代码                       │
│              (配置爬取参数)                       │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│              ProxyPool（代理池）                  │
│         管理代理 IP，减少封禁风险                 │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│            mitmproxy（中间人代理）                │
│       拦截 HTTPS 流量，解密平台通信数据            │
│              ⚠️ 需要安装并信任 CA 证书            │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│             各平台解析器 (Parser)                 │
│    小红书解析器 / 抖音解析器 / B站解析器 ...       │
│         将拦截的流量解析为结构化数据               │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│              数据存储模块                         │
│         MySQL / MongoDB / SQLite                 │
└─────────────────────────────────────────────────┘
```

### 2.2 数据抓取流程

```
1. 启动 mitmproxy
      ↓
2. 配置手机/浏览器代理到本机 mitmproxy 端口
      ↓
3. 用户在目标平台搜索关键词或访问用户主页
      ↓
4. mitmproxy 拦截 HTTPS 请求，解析响应数据
      ↓
5. Parser 提取结构化数据（帖子、评论、用户信息等）
      ↓
6. 数据存储到数据库
```

### 2.3 mitmproxy 工作原理

mitmproxy 是一个支持 SSL/TLS 中间人攻击的代理工具。它通过以下步骤拦截 HTTPS 流量：

1. **证书颁发**：mitmproxy 生成自签名 CA 证书
2. **流量拦截**：客户端请求先到达 mitmproxy，再转发到真实服务器
3. **证书伪造**：mitmproxy 伪装成服务器，用伪造的证书响应客户端
4. **数据解密**：mitmproxy 持有伪造证书的私钥，可解密客户端数据

> ⚠️ **重要**：使用前需在设备上安装并信任 mitmproxy 的 CA 证书。不同平台对证书要求不同。

---

## 3. 快速开始

### 3.1 环境要求

- **Python**: 3.8+
- **系统**: macOS / Linux / Windows
- **依赖**: mitmproxy, requests, mysql-connector-python / pymongo 等

### 3.2 安装步骤

#### 第一步：克隆项目

```bash
git clone https://github.com/NanmiCoder/MediaCrawler.git
cd MediaCrawler
```

#### 第二步：安装依赖

```bash
pip install -r requirements.txt
```

#### 第三步：安装并配置 mitmproxy 证书

**macOS / Linux：**

```bash
# 安装 mitmproxy
pip install mitmproxy

# 生成证书（首次运行自动生成）
mitmproxy --version
```

**信任 CA 证书：**

- **macOS**：双击 `~/.mitmproxy/mitmproxy-ca-cert.pem`，在钥匙串访问中信任
- **Linux**：导入到系统信任存储
- **Android**：在设置 → 安全 → 凭据存储 → 从存储安装 CA
- **iOS**：通过 AirDrop/邮件传输 `.pem` 文件，在设置 → 通用 → VPN与设备管理 中安装

#### 第四步：配置数据库

编辑 `config.yaml` 或 `config/database.py`，配置 MySQL / MongoDB 连接信息：

```yaml
database:
  type: "mysql"  # mysql / mongodb / sqlite
  host: "localhost"
  port: 3306
  user: "root"
  password: "your_password"
  database: "media_crawler"
```

#### 第五步：运行爬虫

```bash
# 运行所有模块（mitmproxy + 爬虫 + 数据存储）
python main.py --platform xiaohongshu --keyword "美食"

# 仅运行 mitmproxy（手动拦截模式）
python -m mitmproxy -p 8080

# 查看帮助
python main.py --help
```

### 3.3 代理配置（可选）

如需使用代理池，编辑 `config/proxy.py` 或环境变量：

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
```

---

## 4. 典型使用示例

### 示例 1：小红书关键词爬取

```bash
# 爬取小红书中包含"旅游"关键词的笔记
python main.py --platform xiaohongshu --keyword "旅游" --pages 50
```

配置参数说明：
- `--platform`：平台名称（xiaohongshu / douyin / bilibili 等）
- `--keyword`：搜索关键词
- `--pages`：爬取页数
- `--max_comments`：每条笔记最多爬取评论数

### 示例 2：B站用户视频爬取

```bash
# 爬取 B站 用户主页的所有视频
python main.py --platform bilibili --user_id "12345678" --type user_video
```

### 示例 3：微博评论爬取

```bash
# 爬取微博帖子的评论
python main.py --platform weibo --keyword "热搜" --type comment --max_comments 1000
```

### 示例 4：抖音视频 + 评论完整爬取

```bash
# 爬取抖音视频及评论
python main.py --platform douyin --keyword "美食" --pages 100 --store_to mysql
```

### 示例 5：多平台同时爬取

```python
# 在代码中自定义爬取任务
from media_crawler import MediaCrawler

crawler = MediaCrawler(config={
    "platforms": ["xiaohongshu", "douyin", "bilibili"],
    "keywords": ["旅游", "美食", "摄影"],
    "max_pages": 50,
    "database": {"type": "mysql", "host": "localhost"}
})

crawler.run()
```

---

## 5. 配置详解

### 5.1 平台配置（config/platforms/）

每个平台有独立配置文件，如 `config/platforms/xiaohongshu.py`：

```python
XIAOHONGSHU_CONFIG = {
    "enable": True,
    "mitm_host": "127.0.0.1",
    "mitm_port": 8080,
    "proxy": None,  # 或 {"http": "http://127.0.0.1:7890"}
    "headers": {
        "User-Agent": "Mozilla/5.0 ...",
    },
    "request_interval": 2,  # 请求间隔（秒）
    "retry_times": 3,       # 重试次数
}
```

### 5.2 数据库配置

**MySQL：**

```python
MYSQL_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "password",
    "database": "media_crawler",
    "charset": "utf8mb4",
}
```

**MongoDB：**

```python
MONGODB_CONFIG = {
    "host": "localhost",
    "port": 27017,
    "database": "media_crawler",
    "username": None,
    "password": None,
}
```

### 5.3 代理池配置

```python
PROXY_POOL = {
    "enable": True,
    "proxies": [
        "http://user:pass@proxy1.com:8080",
        "http://user:pass@proxy2.com:8080",
    ],
    "rotate_interval": 300,  # 代理轮换间隔（秒）
}
```

---

## 6. 数据字段说明

### 6.1 笔记/帖子数据

| 字段 | 类型 | 说明 |
|------|------|------|
| `platform` | string | 平台名称 |
| `post_id` | string | 帖子唯一 ID |
| `author_id` | string | 作者 ID |
| `author_name` | string | 作者昵称 |
| `title` | string | 标题 |
| `content` | text | 正文内容 |
| `images` | list | 图片 URL 列表 |
| `videos` | list | 视频 URL 列表 |
| `likes` | int | 点赞数 |
| `comments` | int | 评论数 |
| `shares` | int | 分享数 |
| `publish_time` | datetime | 发布时间 |
| `crawl_time` | datetime | 爬取时间 |

### 6.2 评论数据

| 字段 | 类型 | 说明 |
|------|------|------|
| `comment_id` | string | 评论 ID |
| `post_id` | string | 所属帖子 ID |
| `user_id` | string | 评论用户 ID |
| `username` | string | 用户昵称 |
| `content` | text | 评论内容 |
| `like_count` | int | 评论点赞数 |
| `reply_count` | int | 回复数 |
| `publish_time` | datetime | 评论时间 |
| `parent_id` | string | 父评论 ID（回复用） |

### 6.3 用户数据

| 字段 | 类型 | 说明 |
|------|------|------|
| `user_id` | string | 用户唯一 ID |
| `username` | string | 用户昵称 |
| `avatar` | string | 头像 URL |
| `followers` | int | 粉丝数 |
| `following` | int | 关注数 |
| `posts` | int | 帖子数 |
| `bio` | text | 个人简介 |
| `verified` | bool | 是否认证 |
| `crawl_time` | datetime | 爬取时间 |

---

## 7. 常见问题

### Q1: mitmproxy 证书不被信任，HTTPS 请求失败

**原因**：CA 证书未安装或未信任

**解决方案：**

1. 确认证书文件存在：`ls ~/.mitmproxy/`
2. 按平台安装证书：
   - **Chrome / 系统**：双击 `.pem` 文件，按提示导入
   - **macOS**：钥匙串访问 → 系统根证书 → 文件 → 导入 `.pem`，然后始终信任
   - **Firefox**：设置 → 隐私与安全 → 证书 → 查看证书 → 导入
3. 重启浏览器和爬虫程序

### Q2: 小红书提示"请求过于频繁"

**原因**：触发了平台的反爬机制

**解决方案：**

```python
# 增加请求间隔
XIAOHONGSHU_CONFIG = {
    "request_interval": 5,  # 改为 5 秒
    "retry_times": 5,       # 增加重试次数
}
```

配合代理池使用效果更佳。

### Q3: 抖音视频无法下载

**原因**：抖音视频 URL 有有效期限制，且部分视频需要登录态

**解决方案：**

1. 使用 mitmproxy 拦截时确保 APP 保持登录
2. 在 `config/platforms/douyin.py` 中开启 `download_video: True`
3. 使用代理降低被封概率

### Q4: 数据库连接失败

**检查步骤：**

1. 确认数据库服务已启动
2. 验证用户名/密码正确
3. 检查端口未被防火墙拦截
4. 确认数据库已创建

```bash
# MySQL 测试连接
mysql -h localhost -u root -p -e "SHOW DATABASES;"
```

### Q5: 爬虫运行一段时间后无数据输出

**原因**：代理 IP 被封 / mitmproxy 连接断开

**解决方案：**

```bash
# 1. 检查 mitmproxy 是否正常运行
ps aux | grep mitmproxy

# 2. 重启 mitmproxy
pkill mitmproxy
python -m mitmproxy -p 8080 &

# 3. 更换代理 IP
```

### Q6: 如何爬取指定用户的所有内容？

```bash
# 以微博为例，通过用户主页 URL 提取 user_id
python main.py --platform weibo --user_id "1234567890" --type user_post
```

### Q7: 数据存储格式混乱

**原因**：多平台数据格式不统一

**解决方案**：在 `config/storage.py` 中为不同平台配置不同的表前缀或数据库：

```python
STORAGE_CONFIG = {
    "mysql": {
        "xiaohongshu_table": "xhs_posts",
        "douyin_table": "dy_posts",
        "bilibili_table": "bili_posts",
    }
}
```

---

## 8. 高级用法

### 8.1 自定义解析器

如需解析新的平台或字段，可在 `media_crawler/parser/` 下新建解析器：

```python
# media_crawler/parser/custom_parser.py
from .base import BaseParser

class CustomParser(BaseParser):
    def parse_post(self, response):
        # 解析帖子数据
        return {
            "post_id": response["id"],
            "content": response["content"],
            # ...
        }

    def parse_comment(self, response):
        # 解析评论数据
        return {...}
```

### 8.2 分布式部署

通过配置多台机器运行不同平台，分摊负载：

```yaml
# 机器 A
node:
  platforms: ["xiaohongshu", "douyin"]

# 机器 B
node:
  platforms: ["bilibili", "weibo"]
```

### 8.3 数据导出

```python
# 导出为 CSV
from media_crawler.utils import export_to_csv

export_to_csv(
    table="xhs_posts",
    output="output/xhs_posts.csv",
    format="csv"
)
```

### 8.4 定时任务

配合 crontab 实现定时爬取：

```bash
# 每天早上 9 点爬取一次
0 9 * * * cd /path/to/MediaCrawler && python main.py --platform xiaohongshu --keyword "热点" >> /var/log/crawler.log 2>&1
```

---

## 9. 注意事项与免责声明

### ⚠️ 使用须知

1. **遵守平台规则**：请遵守各平台的用户协议和 robots.txt 规则
2. **控制爬取频率**：建议请求间隔 ≥ 2 秒，避免对平台造成过大负担
3. **仅供学习研究**：本工具仅用于技术学习和数据研究
4. **商业使用风险**：如需商业使用，请咨询法律顾问，确保合规
5. **数据安全**：妥善保管爬取的数据，不要泄露用户隐私信息

### 📚 相关资源

- **GitHub 仓库**：[NanmiCoder/MediaCrawler](https://github.com/NanmiCoder/MediaCrawler)
- **mitmproxy 官方文档**：[mitmproxy.org](https://mitmproxy.org/)
- **项目 Issue 区**：遇到问题先搜索 [Issues](https://github.com/NanmiCoder/MediaCrawler/issues)

---

*教程最后更新：2026-05-08*