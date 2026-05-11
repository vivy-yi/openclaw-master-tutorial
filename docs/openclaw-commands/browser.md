# OpenClaw Browser 指令详解

## 指令配置

### 浏览器控制
```bash
openclaw browser start                 # 启动浏览器
openclaw browser stop                 # 停止浏览器
openclaw browser status               # 浏览器状态
openclaw browser profiles              # 列出浏览器配置
```

### 标签页操作
```bash
openclaw browser tabs                 # 列出标签页
openclaw browser open <url>           # 新标签页打开URL
openclaw browser focus <target-id>  # 聚焦标签页
openclaw browser close <target-id>   # 关闭标签页
```

### 导航
```bash
openclaw browser navigate <url>      # 当前标签页导航
openclaw browser back                # 后退
openclaw browser forward             # 前进
openclaw browser reload               # 刷新
```

### 页面操作
```bash
openclaw browser snapshot            # 截图(AI格式)
openclaw browser snapshot --format aria # 无障碍格式
openclaw browser screenshot          # 截图(PNG)
openclaw browser screenshot --full-page # 全页截图
openclaw browser pdf                 # 保存为PDF
openclaw browser console             # 控制台日志
openclaw browser errors              # 页面错误
openclaw browser requests            # 网络请求
```

### 元素交互
```bash
openclaw browser click <ref>         # 点击元素
openclaw browser click <ref> --double # 双击
openclaw browser type <ref> "文本"    # 输入文本
openclaw browser type <ref> "文本" --submit # 输入并提交
openclaw browser press <key>         # 按键
openclaw browser hover <ref>         # 悬停
openclaw browser drag <ref1> <ref2>  # 拖拽
openclaw browser fill                # 表单填充
openclaw browser select <ref> <opt>  # 选择选项
```

### 高级操作
```bash
openclaw browser evaluate --fn "js代码"      # 执行JS
openclaw browser wait --text "文本"          # 等待文本
openclaw browser wait --selector ".btn"      # 等待选择器
openclaw browser wait --url "*.example.com"  # 等待URL
openclaw browser resize 1920 1080            # 调整窗口
openclaw browser scroll 0 500                 # 滚动
openclaw browser highlight <ref>             # 高亮元素
```

---

## 文件配置

### 浏览器配置 (openclaw.json)
```json
{
  "browser": {
    "enabled": true,
    "headless": false,
    "defaultProfile": "clawd",
    "evaluateEnabled": true,
    "profiles": {
      "clawd": {
        "color": "#FF6B6B",
        "driver": "clawd"
      },
      "chrome": {
        "cdpPort": 9222,
        "driver": "extension"
      }
    }
  }
}
```

### 浏览器配置目录
- **配置**: `~/.openclaw/browser/`
- **用户数据**: `~/.openclaw/browser-profiles/`

### 快照配置
```json
{
  "browser": {
    "snapshotDefaults": {
      "mode": "efficient"
    }
  }
}
```

---

## 场景示例

### 场景1: 启动浏览器
```bash
# 启动默认配置
openclaw browser start

# 查看状态
openclaw browser status
```

### 场景2: 打开网页
```bash
# 新标签页打开
openclaw browser open https://www.google.com

# 当前标签页导航
openclaw browser navigate https://news.ycombinator.com
```

### 场景3: 截图
```bash
# AI格式快照
openclaw browser snapshot
# 输出:
# [A12] 🔍 Search
# [A13] 🔗 Results

# 截图
openclaw browser screenshot
# 输出:
# MEDIA:/path/to/screenshot.png

# 全页截图
openclaw browser screenshot --full-page
```

### 场景4: 交互操作
```bash
# 获取页面快照
openclaw browser snapshot
# 假设输出:
# [A1] 🔍 Search input
# [A2] 🔗 Search button
# [A3] 🔗 Result link 1
# [A4] 🔗 Result link 2

# 点击搜索按钮
openclaw browser click A2

# 输入搜索词
openclaw browser type A1 "OpenClaw"

# 提交
openclaw browser type A1 "OpenClaw" --submit
# 或
openclaw browser press Enter
```

### 场景5: 等待加载
```bash
# 等待文本出现
openclaw browser wait --text "Search Results"

# 等待元素出现
openclaw browser wait --selector "#results"

# 等待URL变化
openclaw browser wait --url "*example.com*"

# 等待一定时间
openclaw browser wait --time 3000
```

### 场景6: 表单填写
```bash
# JSON方式填充
openclaw browser fill --fields '[
  {"ref": "A1", "value": "John"},
  {"ref": "A2", "value": "john@example.com"}
]'

# 选择下拉框
openclaw browser select A3 "Option Value"
```

### 场景7: 执行JavaScript
```bash
# 获取页面标题
openclaw browser evaluate --fn "document.title"

# 点击某个元素
openclaw browser evaluate --fn "document.querySelector('.btn').click()"

# 获取元素属性
openclaw browser evaluate --fn "document.querySelector('img').src"
```

### 场景8: 处理弹窗
```bash
# 接受弹窗
openclaw browser dialog --accept

# 拒绝弹窗
openclaw browser dialog --dismiss

# 输入文本到prompt
openclaw browser dialog --accept --prompt-text "用户名"
```

### 场景9: 文件上传
```bash
# 上传文件
openclaw browser upload --ref A5 /path/to/file.pdf
```

### 场景10: 滚动页面
```bash
# 滚动到指定位置
openclaw browser evaluate --fn "window.scrollTo(0, 500)"

# 滚动到底部
openclaw browser evaluate --fn "window.scrollTo(0, document.body.scrollHeight)"
```

### 场景11: 调整窗口大小
```bash
# 调整视口
openclaw browser resize 1920 1080

# 移动窗口
openclaw browser evaluate --fn "window.moveTo(100, 100)"
```

### 场景12: 查看网络请求
```bash
# 列出最近请求
openclaw browser requests

# 等待特定响应
openclaw browser responsebody --url "*/api/data*"
```

### 场景13: 创建浏览器配置
```bash
openclaw browser create-profile myprofile --color "#00FF00"
openclaw browser start --profile myprofile
```

### 场景14: 录制操作
```bash
# 开始录制trace
openclaw browser trace start

# 执行操作
openclaw browser click A1

# 停止录制并保存
openclaw browser trace stop --output trace.zip
```
