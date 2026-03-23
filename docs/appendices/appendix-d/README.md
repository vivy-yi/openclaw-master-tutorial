# 附录D: 故障排查速查表

> 快速定位和解决OpenClaw常见问题

---

## 问题速查索引

| 现象 | 可能原因 | 跳转 |
|-----|---------|-----|
| 启动失败 | 端口占用/配置错误 | [启动问题](#启动问题) |
| API连接失败 | Key无效/网络问题 | [API问题](#api连接问题) |
| 飞书无响应 | 配置错误/URL问题 | [飞书问题](#飞书集成问题) |
| 命令无输出 | 工具禁用/权限问题 | [工具问题](#工具使用问题) |
| 响应慢 | 模型延迟/网络问题 | [性能问题](#性能问题) |

---

## 启动问题

### 端口已被占用

**现象**：
```
Error: Address already in use :::18789
```

**排查步骤**：
```bash
# 1. 查看占用端口的进程
lsof -i :18789
# 或
netstat -tlnp | grep 18789

# 2. 结束占用进程
kill -9 <PID>

# 3. 或更换端口启动
openclaw onboard --port 18790
```

### 配置文件语法错误

**现象**：
```
Error: Invalid JSON in config file
```

**排查步骤**：
```bash
# 1. 验证JSON格式
openclaw config validate

# 2. 或使用Python验证
python3 -m json.tool ~/.openclaw/config.json

# 3. 检查常见错误
# - 缺少逗号
# - 多余的逗号
# - 引号不匹配
```

### 环境变量未设置

**现象**：
```
Error: Required environment variable DEEPSEEK_API_KEY not set
```

**排查步骤**：
```bash
# 1. 检查环境变量
echo $DEEPSEEK_API_KEY

# 2. 设置环境变量
export DEEPSEEK_API_KEY="sk-xxx"

# 3. 添加到shell配置
echo 'export DEEPSEEK_API_KEY="sk-xxx"' >> ~/.zshrc
source ~/.zshrc
```

---

## API连接问题

### API Key无效

**现象**：
```
Error: 401 Unauthorized - Invalid API key
```

**排查步骤**：
```bash
# 1. 检查Key格式
echo $DEEPSEEK_API_KEY | head -c 10
# 应该以 sk- 开头

# 2. 测试API连接
curl https://api.deepseek.com/v1/models \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY"

# 3. 确认Key未过期
# 登录官网查看Key状态
```

### 网络连接超时

**现象**：
```
Error: Connection timeout
```

**排查步骤**：
```bash
# 1. 测试网络连通性
ping api.deepseek.com

# 2. 测试API端点
curl -v https://api.deepseek.com/v1/models

# 3. 检查代理设置
echo $HTTP_PROXY
echo $HTTPS_PROXY

# 4. 如果是国内访问海外API，检查加速器
# 使用代理
export HTTPS_PROXY=http://127.0.0.1:7890
```

### Rate Limit exceeded

**现象**：
```
Error: 429 Too Many Requests
```

**解决**：
```bash
# 1. 降低请求频率
# 在配置中添加速率限制
{
  "gateway": {
    "rateLimit": {
      "requestsPerMinute": 20
    }
  }
}

# 2. 检查API配额
# 登录官网查看使用量

# 3. 等待重置
# 大多数平台1分钟后重置
```

---

## 飞书集成问题

### 机器人无响应

**排查清单**：

1. **检查配置**
```bash
openclaw config get channels.feishu
# 确认 enabled: true
```

2. **验证事件订阅**
```
飞书开发者后台 → 事件订阅 → 请求地址
应该是：https://your-domain/feishu/webhook

# 测试连通性
curl https://your-domain/feishu/webhook \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"challenge":"test"}'
```

3. **检查权限**
```
确保机器人有这些权限：
- im:message:receive
- im:message:send
- im:chat:readonly
```

4. **查看日志**
```bash
openclaw logs --follow
# 查看是否有飞书事件收到
```

### Encrypt Key错误

**现象**：
```
Error: Failed to decrypt message
```

**解决**：
```bash
# 1. 检查Encrypt Key
openclaw config get channels.feishu.encryptKey

# 2. 与飞书后台对比
# 飞书后台 → 事件订阅 → Encrypt Key

# 3. 如果不使用加密，留空或删除该配置
```

### 无法@机器人

**排查步骤**：
1. 确认机器人已添加到群组
2. 检查群机器人权限设置
3. 确认用户有@机器人的权限
4. 查看群组ID是否在白名单中

---

## 工具使用问题

### 文件读取失败

**现象**：
```
Error: Read operation not allowed
```

**解决**：
```bash
# 1. 检查工具权限
openclaw config get tools.read.enabled
# 应该返回 true

# 2. 检查路径权限
openclaw config get tools.read.allowedPaths
# 确认目标路径在允许列表中

# 3. 添加允许路径
openclaw config set tools.read.allowedPaths "[\"~/Documents\"]"
```

### 命令执行被拒绝

**现象**：
```
Error: Exec operation not allowed
```

**解决**：
```bash
# 1. 启用命令执行（谨慎）
openclaw config set tools.exec.enabled true

# 2. 或检查allowedCommands
openclaw config get tools.exec.allowedCommands

# 3. 添加允许命令
openclaw config set tools.exec.allowedCommands "[\"git\",\"npm\",\"python3\"]"
```

### 工具未找到

**现象**：
```
Error: Tool not found: xxx
```

**排查**：
```bash
# 1. 查看可用工具
openclaw tools list

# 2. 安装缺失工具
openclaw skill install xxx

# 3. 重新加载工具
openclaw tools reload
```

---

## 性能问题

### 响应延迟高

**诊断步骤**：
```bash
# 1. 查看日志响应时间
openclaw logs | grep "response_time"

# 2. 测试模型延迟
time curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"hi"}]}'

# 3. 优化方案
# - 使用流式响应
# - 选择延迟更低的模型
# - 启用本地缓存
```

### 内存占用高

**解决**：
```bash
# 1. 查看内存使用
openclaw status

# 2. 限制上下文长度
openclaw config set agents.defaults.maxContextLength 8000

# 3. 启用自动清理
openclaw config set cleanup.enabled true
```

---

## 常见问题FAQ

### Q: 如何完全重置配置？

```bash
# 备份旧配置
mv ~/.openclaw/config.json ~/.openclaw/config.json.bak

# 重新初始化
openclaw onboard
```

### Q: 如何切换AI模型？

```bash
# 临时切换
openclaw chat --model gpt-4o

# 永久修改配置
openclaw config set agents.defaults.model.model "gpt-4o"
```

### Q: 日志文件在哪里？

```bash
# 默认位置
~/.openclaw/logs/openclaw.log

# 查看最近日志
openclaw logs --tail 100

# 查看错误日志
openclaw logs --level error
```

### Q: 如何更新OpenClaw？

```bash
# 检查更新
openclaw version --check

# 执行更新
curl -fsSL https://openclaw.ai/install.sh | bash

# 验证版本
openclaw version
```

### Q: 配置文件热重载？

```bash
# 发送重载信号
kill -HUP <openclaw_pid>

# 或重启服务
openclaw restart
```

---

## 获取帮助

如果以上方法无法解决问题：

1. **查看官方文档**：https://docs.openclaw.ai
2. **社区求助**：
   - GitHub Issues
   - Discord社区
   - 飞书/微信群
3. **提交日志**：
```bash
# 导出诊断信息
openclaw doctor --output diagnosis.txt
```

---

**提示**：遇到问题时，先运行 `openclaw doctor` 自动诊断，可以快速发现大部分配置问题。
