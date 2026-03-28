# Agent 常用 CLI 工具指南

> OpenClaw Agent 可调用的命令行工具分类汇总
> 日期：2026-03-27

---

## 1. 工具调用方式

Agent 通过 `exec` 工具调用 CLI 命令：

```bash
# 语法
exec(command: "命令", timeout?: 30)

# 示例
exec(command: "curl -s https://api.github.com/users/octocat | jq '.name'")
```

---

## 2. 网络请求类

### curl - HTTP 请求

| 命令 | 用途 |
|------|------|
| `curl -s url` | 简单 GET 请求 |
| `curl -X POST -d 'data' url` | POST 请求 |
| `curl -H "Authorization: Bearer token" url` | 带 Header |
| `curl -s url \| jq '.data'` | 解析 JSON |
| `curl -o file.pdf url` | 下载文件 |

**实战：**
```bash
# GET 请求
curl -s "https://api.github.com/repos/openclaw/openclaw"

# POST 请求
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"test"}' \
  "https://api.example.com/create"

# 带认证
curl -s -H "Authorization: Bearer $API_KEY" \
  "https://api.example.com/user"
```

### wget - 文件下载

| 命令 | 用途 |
|------|------|
| `wget -O output.txt url` | 下载并保存 |
| `wget -q url` | 静默下载 |
| `wget -c url` | 断点续传 |
| `wget -r -l 1 url` | 递归下载（1层） |

**实战：**
```bash
# 下载文件
wget -O video.mp4 "https://example.com/video.mp4"

# 批量下载
wget -i urls.txt
```

### httpx - 现代 HTTP 客户端

| 命令 | 用途 |
|------|------|
| `httpx -b url` | JSON 响应 |
| `httpx -x PROXY url` | 使用代理 |
| `httpx -follow-redirects url` | 跟随重定向 |

---

## 3. 文本处理类

### jq - JSON 解析

| 命令 | 用途 |
|------|------|
| `jq '.key'` | 提取字段 |
| `jq '.[]'` | 遍历数组 |
| `jq 'map(.name)'` | 数组转换 |
| `jq 'select(.age > 18)'` | 条件过滤 |

**实战：**
```bash
# 提取嵌套字段
curl -s "https://api.github.com/users/octocat" | jq '{name: .name, company: .company}'

# 数组操作
echo '[1,2,3]' | jq 'map(. * 2)'

# 过滤
curl -s "https://api.github.com/users" | jq '[.[] | select(.public_repos > 10)]'

# 聚合
curl -s "https://api.github.com/users" | jq 'length'
```

### grep / ripgrep - 文本搜索

| 命令 | 用途 |
|------|------|
| `grep "pattern" file` | 简单搜索 |
| `grep -r "pattern" dir/` | 递归搜索 |
| `grep -i "pattern" file` | 忽略大小写 |
| `grep -n "pattern" file` | 显示行号 |
| `rg "pattern" ./src` | 快速搜索（推荐） |

**实战：**
```bash
# 搜索文件
grep -r "TODO" ./src

# 忽略大小写
grep -ri "error" ./logs

# 显示行号
grep -n "function" script.js

# 使用 ripgrep（更快）
rg "export const" ./src
```

### sed - 文本替换

| 命令 | 用途 |
|------|------|
| `sed 's/old/new/g' file` | 全局替换 |
| `sed -i 's/old/new/' file` | 直接修改 |
| `sed '1,5d' file` | 删除行 |
| `sed -n '3p' file` | 打印第3行 |

**实战：**
```bash
# 全局替换
sed -i 's/old/new/g' file.txt

# 替换并备份
sed -i.bak 's/local/remote/g' config.conf
```

### awk - 文本分析

| 命令 | 用途 |
|------|------|
| `awk '{print $1}' file` | 打印第一列 |
| `awk -F',' '{print $2}' file` | 指定分隔符 |
| `awk 'NR>1 {sum+=$2} END {print sum}'` | 求和 |

**实战：**
```bash
# CSV 第一列
awk -F',' '{print $1}' data.csv

# 统计
awk -F'\t' '{sum+=$2} END {print sum/NR}' data.txt

# 条件过滤
awk -F',' '$3 > 100 {print $1}' data.csv
```

---

## 4. 文档转换类

### pandoc - 格式转换

| 命令 | 用途 |
|------|------|
| `pandoc input.md -o output.pdf` | MD → PDF |
| `pandoc input.md -o output.html` | MD → HTML |
| `pandoc input.md -o output.docx` | MD → Word |

**实战：**
```bash
# Markdown 转 PDF
pandoc report.md -o report.pdf --pdf-engine=xelatex

# Markdown 转 HTML（含目录）
pandoc README.md -o README.html --toc

# 批量转换
for f in *.md; do pandoc "$f" -o "${f%.md}.html"; done
```

### markmap - 思维导图

| 命令 | 用途 |
|------|------|
| `markmap input.md -o output.html` | MD → 思维导图 |

---

## 5. 媒体处理类

### ffmpeg - 音视频处理

| 命令 | 用途 |
|------|------|
| `ffmpeg -i video.mp4 audio.mp3` | 提取音频 |
| `ffmpeg -i video.mp4 -ss 00:05 -t 10 clip.mp4` | 剪切片段 |
| `ffmpeg -i video.mp4 -vf scale=720:-1 output.mp4` | 缩放 |
| `ffmpeg -i video.mp4 -r 30 output.gif` | 转 GIF |
| `ffmpeg -i img%03d.jpg video.mp4` | 图片转视频 |

**实战：**
```bash
# 提取音频（中医讲座录音转文字用）
ffmpeg -i lecture.mp4 -vn -acodec mp3 audio.mp3

# 剪切精彩片段
ffmpeg -i video.mp4 -ss 00:05:30 -t 00:01:00 -c copy clip.mp4

# 提取关键帧（每10秒一帧）
ffmpeg -i video.mp4 -vf "fps=0.1" frame_%03d.jpg

# 合并多个视频
ffmpeg -f concat -i list.txt -c copy merged.mp4
```

### whisper - 语音转文字

| 命令 | 用途 |
|------|------|
| `whisper audio.mp3 --model base` | 基础模型 |
| `whisper audio.mp3 --model medium --language zh` | 中文模型 |
| `whisper audio.mp3 --output_format srt` | 输出字幕 |

**实战：**
```bash
# 音频转文字（英文）
whisper audio.mp3 --model base

# 中文音频转文字
whisper audio.mp3 --model medium --language Chinese

# 输出多种格式
whisper audio.mp3 --model base --output_format json,text,srt
```

### ImageMagick - 图片处理

| 命令 | 用途 |
|------|------|
| `convert input.jpg -resize 50% output.jpg` | 缩放 |
| `convert input.jpg -blur 5 output.jpg` | 模糊 |
| `convert -size 100x100 xc:red circle.png` | 生成图片 |
| `identify image.png` | 查看图片信息 |

**实战：**
```bash
# 批量缩放
for f in *.jpg; do convert "$f" -resize 800x600 "resized_$f"; done

# 格式转换
convert input.png output.jpg

# 添加水印
convert photo.jpg -gravity southeast -draw "text 0,0 'Watermark'" output.jpg
```

---

## 6. 数据库类

### sqlite3 - SQLite

| 命令 | 用途 |
|------|------|
| `sqlite3 db.sqlite "SELECT * FROM table"` | 查询 |
| `sqlite3 db.sqlite -header -column "SQL"` | 格式化输出 |
| `.tables` | 列出表 |
| `.schema table_name` | 查看表结构 |

**实战：**
```bash
# 查询
sqlite3 data.db "SELECT * FROM users WHERE age > 18"

# 格式化
sqlite3 -header -column data.db "SELECT * FROM logs"

# 导入 CSV
sqlite3 data.db ".mode csv" ".import data.csv table_name"
```

---

## 7. Git 版本控制

### git - 版本控制

| 命令 | 用途 |
|------|------|
| `git clone url` | 克隆仓库 |
| `git add . && git commit -m "msg"` | 提交 |
| `git push origin main` | 推送 |
| `git pull origin main` | 拉取 |
| `git status` | 状态 |
| `git log --oneline -10` | 最近10次提交 |

**实战：**
```bash
# 克隆并更新
git clone https://github.com/user/repo.git
cd repo && git pull origin main

# 自动提交
git add . && git commit -m "$(date '+%Y-%m-%d %H:%M') auto-commit" && git push

# 查看差异
git diff HEAD~5 --stat
```

---

## 8. Python / 脚本

### Python - 脚本执行

| 命令 | 用途 |
|------|------|
| `python3 script.py` | 执行脚本 |
| `python3 -c "code"` | 单行代码 |
| `pip install package` | 安装包 |

**实战：**
```bash
# 安装依赖
pip3 install requests pandas

# 执行脚本
python3 analyze.py

# 单行处理 JSON
python3 -c "import json,sys; print(json.load(sys.stdin)['name'])"
```

---

## 9. 数据处理

### csvkit - CSV 处理

| 命令 | 用途 |
|------|------|
| `csvstat data.csv` | 统计信息 |
| `csvcut -c 1,3 data.csv` | 选择列 |
| `csvgrep -c name -m "john"` | 过滤行 |
| `csvjoin data1.csv data2.csv` | 合并表 |

### jq - 高级 JSON 处理

```bash
# 复杂 JSON 转换
curl -s API | jq '[.data[] | {id, name, score: (.metrics.score // 0)}] | sort_by(-.score) | .[:10]'

# 分组统计
curl -s API | jq 'group_by(.category) | map({category: .[0].category, count: length})'

# 多字段
curl -s API | jq '.[] | "\(.name) - \(.value)"'
```

---

## 10. 定时任务

### crontab - 定时任务

| 格式 | 用途 |
|------|------|
| `* * * * *` | 每分钟 |
| `0 9 * * *` | 每天 9 点 |
| `0 */2 * * *` | 每 2 小时 |
| `0 9-17 * * 1-5` | 工作日 9-17 点 |

**实战：**
```bash
# 编辑 crontab
crontab -e

# 示例：每天 9 点执行
0 9 * * * /path/to/daily-report.sh

# 查看 crontab
crontab -l

# 删除所有任务
crontab -r
```

---

## 11. 系统监控

| 命令 | 用途 |
|------|------|
| `top` / `htop` | 进程监控 |
| `df -h` | 磁盘使用 |
| `free -h` | 内存使用 |
| `uptime` | 运行时间 |
| `ps aux \| grep process` | 查找进程 |

**实战：**
```bash
# 磁盘使用
df -h / /Volumes

# 内存状态
free -h

# 查找并杀掉进程
ps aux | grep python | grep -v grep | awk '{print $2}' | xargs kill
```

---

## 12. Agent 实战组合

### 场景 1：抓取网页数据 → 提取 → 存储

```bash
# 1. 抓取 API
curl -s "https://api.example.com/data" > raw.json

# 2. 提取字段
cat raw.json | jq '[.[] | {id, name, value}]' > extracted.json

# 3. 导入数据库
sqlite3 data.db ".mode json" ".import extracted.json table_name"
```

### 场景 2：视频音频提取 → 转录 → 分析

```bash
# 1. 提取音频
ffmpeg -i lecture.mp4 -vn -acodec mp3 audio.mp3 -y

# 2. 语音转文字
whisper audio.mp3 --model medium --language Chinese --output_format json

# 3. 提取关键段落
cat audio.json | jq '.segments[] | select(.text | contains("穴位")) | {start, end, text}'
```

### 场景 3：定时生成报告

```bash
# 每天早上 9 点生成报告
0 9 * * * cd /path/to && python3 generate_report.py && git add . && git commit -m "Daily report $(date '+\%Y-\%m-\%d')" && git push
```

### 场景 4：批量文件处理

```bash
# Markdown 转 PDF 批量
for f in ./docs/*.md; do
  pandoc "$f" -o "${f%.md}.pdf" --pdf-engine=xelatex
  echo "Converted: $f"
done
```

---

## 13. 工具配置示例

在 `SOUL.md` 或 `AGENTS.md` 中配置：

```markdown
## 可用 CLI 工具

### 网络请求
- curl, wget, httpx
- 用法: `curl -s URL | jq '.data'`

### 文本处理
- jq: JSON 解析（首选）
- grep/rg: 文本搜索
- sed/awk: 文本替换和分析

### 文档转换
- pandoc: MD ↔ PDF/HTML/Word
- markmap: MD → 思维导图

### 媒体处理
- ffmpeg: 音视频剪辑、格式转换
- whisper: 语音转文字
- ImageMagick: 图片处理

### 数据处理
- sqlite3: SQLite 数据库
- csvkit: CSV 分析

### 系统
- git: 版本控制
- cron: 定时任务
- python3: 脚本执行

## 使用规范

1. **JSON 优先**：处理 JSON 用 `jq`，不用 Python
2. **检查存在**：操作文件前 `ls -la` 确认
3. **超时控制**：复杂操作设置 `timeout`
4. **错误处理**：命令后加 `|| echo "Error"` 捕获错误
5. **安全第一**：敏感操作先确认
```

---

## 14. 常见问题

### Q: 如何处理超时？

```bash
# 设置 30 秒超时
timeout 30 curl -s "https://slow-api.com"

# 或在 exec 工具中
exec(command: "curl -s url", timeout: 30)
```

### Q: 如何后台运行？

```bash
# nohup 后台执行
nohup long_running_script.sh > output.log 2>&1 &

# 查看后台任务
jobs -l
```

### Q: 如何传变量？

```bash
# 环境变量
API_KEY="xxx" curl -s -H "Authorization: Bearer $API_KEY" url

# 命令替换
TODAY=$(date '+%Y-%m-%d')
echo "Report for $TODAY"
```

---

## 15. 速查表

| 需求 | 命令 |
|------|------|
| HTTP GET | `curl -s url \| jq` |
| HTTP POST | `curl -X POST -d '{}' url` |
| 下载文件 | `wget -O file url` |
| JSON 解析 | `cat file.json \| jq '.key'` |
| 文本搜索 | `grep -r "pattern" ./dir` |
| 文本替换 | `sed -i 's/old/new/g' file` |
| 提取音频 | `ffmpeg -i video.mp4 audio.mp3` |
| 语音转文字 | `whisper audio.mp3 --model medium` |
| 图片缩放 | `convert input.jpg -resize 800 output.jpg` |
| 数据库查询 | `sqlite3 db.sqlite "SELECT * FROM t"` |
| Git 提交 | `git add . && git commit -m "msg" && git push` |
| 定时任务 | `crontab -e` |

---

*文档更新时间: 2026-03-27*
*来源：DM主控对话*
