# Telegram群组Agent配置指南

## 更新日期
2026-03-02

---

## 1. 群组发现流程

### 步骤1：让用户在群内发送消息
```bash
# 查看日志获取群ID
openclaw logs --limit 50 | grep -i "chatId\|not-allowed"
```

### 步骤2：识别群组
日志中显示：
- `{"chatId":-5279734352,"title":"金融助手","reason":"not-allowed"}` → 群ID为 -5279734352
- 状态 `not-allowed` 表示未被允许

---

## 2. 完整配置流程

### 步骤1：添加到groups配置
```bash
openclaw config set channels.telegram.groups '{"-5279734352":{"requireMention":false}}'
```

### 步骤2：添加到allowFrom白名单
```bash
openclaw config set channels.telegram.allowFrom '["6020964033", "-5279734352"]'
```

### 步骤3：配置Bindings（正确格式）
```bash
openclaw config set bindings '[
  {
    "agentId": "moguan",
    "match": {
      "channel": "telegram",
      "peer": {
        "kind": "group",
        "id": "-5279734352"
      }
    }
  }
]'
```

**重要**：必须同时包含 `kind` 和 `id` 字段！

### 步骤4：重启Gateway
```bash
openclaw gateway restart
```

---

## 3. Bindings配置（正确格式）

### 正确格式 ✅
```json
{
  "bindings": [
    {
      "agentId": "moguan",
      "match": {
        "channel": "telegram",
        "peer": {
          "kind": "group",
          "id": "-5279734352"
        }
      }
    }
  ]
}
```

**peer字段说明**：
- `kind`: 群组类型 (direct/group/channel/dm)
- `id`: 群组ID (负数，如 -5279734352)

### 配置多个Agent到同一群
```bash
openclaw config set bindings '[
  {"agentId":"moguan","match":{"channel":"telegram","peer":{"kind":"group","id":"-5279734352"}}},
  {"agentId":"mocelue","match":{"channel":"telegram","peer":{"kind":"group","id":"-5279734352"}}},
  {"agentId":"mohongguan","match":{"channel":"telegram","peer":{"kind":"group","id":"-5279734352"}}}
]'
```

---

## 4. 配置检查清单

每次配置后检查：

- [ ] `channels.telegram.groups` 包含群ID
- [ ] `channels.telegram.allowFrom` 包含群ID
- [ ] `bindings` 包含正确的 agentId + peer
- [ ] Gateway已重启

### 验证命令
```bash
# 检查groups
openclaw config get channels.telegram.groups

# 检查allowFrom
openclaw config get channels.telegram.allowFrom

# 检查bindings
openclaw config get bindings
```

---

## 5. 常见问题

### Q1: 群消息被拦截 (not-allowed)
**原因**：群ID未添加到白名单  
**解决**：
1. 添加到groups配置
2. 添加到allowFrom配置
3. 重启Gateway

### Q2: 消息发出但收不到回复
**检查**：
1. 群ID是否正确（日志中获取）
2. Bot是否已加入群
3. Bot隐私模式是否已关闭

### Q3: 配置的Agent没有响应
**检查**：
1. bindings中agentId是否正确
2. peer.kind是否为"group"
3. peer.id是否正确

### Q4: 多个Agent同时回复
**解决**：使用方案1 - 主Agent分发模式

---

## 6. 主Agent分发模式（推荐）

### 原理
- 群里只绑定1个主Agent
- 主Agent根据关键词分发任务给子Agent
- 只有主Agent在群里回复

### 配置
```bash
# 只绑定主Agent
openclaw config set bindings '[
  {"agentId":"moguanjia","match":{"channel":"telegram","peer":{"kind":"group","id":"-5153278498"}}}
]'
```

### 主Agent需要配置分发规则
在主Agent的SOUL.md中添加：
```markdown
## 消息分发规则

| 关键词 | 分发Agent |
|--------|-----------|
| 吃、饭、餐厅 | moshi2 (墨食) |
| 住、租房 | mozu (墨住) |
| 行、出行 | moxing3 (墨行) |
| 健康、医 | moyi (墨医) |
```

---

## 7. Telegram Bot设置

### 关闭隐私模式
1. 打开 @BotFather
2. 输入 `/setprivacy`
3. 选择你的Bot
4. 选择 **Disable**

### 获取群ID
1. 让群成员发送消息
2. 查看OpenClaw日志：`openclaw logs | grep chatId`
3. 或者使用API：`curl "https://api.telegram.org/bot<TOKEN>/getChat?chat_id=@群链接"`

---

## 8. 当前已配置群组

| 群名称 | 群ID | 绑定Agent | 模式 |
|--------|------|-----------|------|
| 金融助手 | -5279734352 | moguan, mocelue, mohongguan, mohangye, mojishu, mogushen | 多Agent |
| 生活助手 | -5153278498 | moguanjia | 主Agent分发 |

---

## 9. 经验总结

### 容易踩坑的点
1. **必须同时配置groups和allowFrom** - 只配一个不行
2. **peer.kind是必需的** - 不是可选的
3. **每次重启Gateway后要验证配置** - 有时候配置会丢失
4. **群ID可能变化** - 新群ID需要重新获取

### 排查流程
```
1. openclaw logs | grep "群名称" → 获取chatId
2. 检查channels.telegram.groups → 确认已添加
3. 检查channels.telegram.allowFrom → 确认已添加
4. 检查bindings → 确认agentId正确
5. openclaw gateway restart → 重启
```

---

*最后更新: 2026-03-02*
*基于实际配置金融助手和生活助手群的经验*
