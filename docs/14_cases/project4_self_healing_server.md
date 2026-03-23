# 项目四：自愈式服务器 - 完整实施指南

本指南将帮助你构建一个自动化基础设施监控系统，具备故障检测、诊断和自愈能力。

---

## 4.1 项目概述

### 什么是自愈式服务器

自愈式服务器是一种自动化运维系统，能够自动检测故障、分析原因、执行修复，无需人工干预。

```
★ Insight ─────────────────────────────────────
自愈系统的价值：
1. 7×24 监控 - 不需要人工值班
2. 快速响应 - 缩短故障恢复时间
3. 标准化处理 - 减少人为错误
4. 告警升级 - 复杂问题及时通知
─────────────────────────────────────────────────
```

### 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                     自愈式服务器架构                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ⏰ 定时触发 (每分钟)                                               │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                      监控层                                   │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │   │
│   │  │ 服务状态 │ │ 资源使用 │ │ 网络连通 │ │ 进程监控 │            │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                      诊断层                                   │   │
│   │  症状收集 → 模式匹配 → 根因分析                               │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                      修复层                                   │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │   │
│   │  │ 重启服务 │ │ 清理磁盘 │ │ 释放内存 │ │ 网络重置 │            │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │   │
│   └─────────────────────────────────────────────────────────────┘   │
│        │                                                           │
│        ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                      告警层                                   │   │
│   │  Telegram / 邮件 / 短信                                        │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 监控项

| 类别 | 监控项 | 阈值 | 动作 |
|------|--------|------|------|
| 服务 | Docker/Nginx/OpenClaw | 停止 | 重启 |
| 资源 | CPU | > 90% 5分钟 | 告警 |
| 资源 | 内存 | > 85% 3分钟 | 清理缓存 |
| 资源 | 磁盘 | > 90% | 清理日志 |
| 网络 | DNS | 不可达 | 切换DNS |
| 网络 | 端口 | 80/443 不可用 | 告警 |
| 应用 | 错误日志 | 异常增长 | 分析 |

---

## 4.2 准备工作

### 安装必要工具

```bash
# 安装系统工具
openclaw tools install system
openclaw tools install ssh
openclaw tools install docker
openclaw tools install process

# 安装通知工具
openclaw tools install telegram
openclaw tools install email

# 验证安装
openclaw tools list | grep -E "system|ssh|docker|telegram"
```

### SSH 密钥配置

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -f ~/.ssh/openclaw_monitoring

# 添加到目标服务器
ssh-copy-id -i ~/.ssh/openclaw_monitoring.pub user@server
```

---

## 4.3 项目结构

### 创建目录

```bash
mkdir -p ~/openclaw-selfheal/{config,skills,servers,logs,scripts}
```

### 目录结构

```
openclaw-selfheal/
├── config/
│   ├── servers.yaml        # 服务器配置
│   ├── monitoring.yaml     # 监控配置
│   ├── repair.yaml         # 修复策略
│   ├── alerts.yaml         # 告警配置
│   └── schedule.yaml       # 定时配置
├── skills/
│   ├── health-check.yaml   # 健康检查
│   ├── diagnose.yaml       # 故障诊断
│   ├── repair.yaml         # 自动修复
│   └── alert.yaml          # 告警通知
├── servers/
│   ├── prod-server.yaml   # 生产服务器
│   ├── dev-server.yaml    # 开发服务器
│   └── home-server.yaml   # 家庭服务器
├── logs/                   # 运行日志
├── scripts/                # 自定义脚本
└── selfheal.yaml          # 主配置
```

---

## 4.4 配置文件

### 服务器配置

```yaml
# config/servers.yaml
servers:
  # 生产服务器
  - name: prod-server
    host: 192.168.1.100
    port: 22
    user: admin
    key: ~/.ssh/openclaw_monitoring
    sudo: true

    tags:
      - production
      - critical

    # 服务列表
    services:
      - name: docker
        check: systemctl is-active docker
        restart: systemctl restart docker

      - name: nginx
        check: systemctl is-active nginx
        restart: systemctl restart nginx

      - name: openclaw
        check: docker ps | grep openclaw
        restart: cd ~/openclaw && docker-compose restart

  # 开发服务器
  - name: dev-server
    host: 192.168.1.101
    port: 22
    user: dev
    key: ~/.ssh/openclaw_monitoring
    sudo: true

    tags:
      - development

    services:
      - name: docker
        check: systemctl is-active docker
```

### 监控配置

```yaml
# config/monitoring.yaml
monitoring:
  # 检查间隔
  interval: 60  # 秒

  # 服务检查
  services:
    enabled: true
    timeout: 10

    # 服务列表（在 servers.yaml 中定义）
    services_from: servers

  # 资源检查
  resources:
    enabled: true
    timeout: 30

    checks:
      # CPU
      - name: cpu
        metric: cpu_percent
        threshold: 90
        duration: 300  # 持续 5 分钟
        severity: warning

      - name: cpu
        metric: cpu_percent
        threshold: 95
        duration: 60
        severity: critical

      # 内存
      - name: memory
        metric: memory_percent
        threshold: 85
        duration: 180
        severity: warning

      # 磁盘
      - name: disk
        metric: disk_percent
        path: /
        threshold: 90
        severity: critical

      - name: disk
        metric: disk_percent
        path: /var/log
        threshold: 80
        severity: warning

  # 网络检查
  network:
    enabled: true
    timeout: 10

    checks:
      # DNS
      - name: dns
        targets:
          - 8.8.8.8
          - 1.1.1.1
        severity: critical

      # 端口
      - name: port
        ports:
          - 80
          - 443
          - 22
        severity: critical

  # 日志检查
  logs:
    enabled: true
    patterns:
      - pattern: "ERROR"
        threshold: 10
        duration: 300

      - pattern: "CRITICAL"
        threshold: 1
        duration: 0
```

### 修复策略配置

```yaml
# config/repair.yaml
repair:
  # 启用修复
  enabled: true

  # 最大重试次数
  max_retries: 3
  retry_interval: 60

  # 策略列表
  strategies:
    # 高 CPU
    - name: high_cpu
      condition:
        metric: cpu_percent
        operator: ">"
        value: 90
        duration: 300

      actions:
        - name: find_heavy_process
          command: |
            ps aux --sort=-%cpu | head -10
          output: top_processes

        - name: log_and_notify
          message: "CPU 使用率超过 90%: {{top_processes}}"

        - name: kill_if_suspended
          if: "top_processes contains 'suspended'"
          command: |
            pkill -9 -f suspended_process
          notify: true

    # 高内存
    - name: high_memory
      condition:
        metric: memory_percent
        operator: ">"
        value: 85
        duration: 180

      actions:
        - name: clear_cache
          command: |
            sync && echo 3 > /proc/sys/vm/drop_caches
          sudo: true

        - name: restart_if_critical
          if: memory_percent > 95
          command: systemctl restart {{service}}
          notify: true

    # 磁盘满
    - name: disk_full
      condition:
        metric: disk_percent
        operator: ">"
        value: 90

      actions:
        - name: clean_logs
          command: |
            find /var/log -type f -size +100M -exec rm {} \;
            journalctl --vacuum-time=7d
          sudo: true
          notify: true

        - name: clean_docker
          command: |
            docker system prune -af
            docker volume prune -f
          notify: true

        - name: clean_tmp
          command: |
            rm -rf /tmp/*
          notify: true

    # 服务停止
    - name: service_down
      condition:
        service_status: "inactive"
        duration: 30

      actions:
        - name: restart_service
          command: systemctl restart {{service}}
          max_retries: 3

        - name: notify_on_failure
          if: retry_failed
          message: "服务 {{service}} 重启失败，需要人工介入"
          severity: critical
          notify: true

    # 网络不可达
    - name: network_down
      condition:
        network_status: unreachable
        duration: 60

      actions:
        - name: restart_network
          command: systemctl restart networking
          sudo: true
          notify: true

        - name: flush_dns
          command: |
            systemd-resolve --flush-caches
            # 或
            resolvectl flush-caches
          notify: false
```

### 告警配置

```yaml
# config/alerts.yaml
alerts:
  # 告警级别
  levels:
    info:
      notify_channels: [telegram]
    warning:
      notify_channels: [telegram, email]
    critical:
      notify_channels: [telegram, email, sms]

  # 渠道配置
  channels:
    telegram:
      enabled: true
      chat_id: "${TELEGRAM_ALERT_CHAT_ID}"
      parse_mode: Markdown

    email:
      enabled: true
      smtp_host: smtp.gmail.com
      smtp_port: 587
      from: "${EMAIL_FROM}"
      to: "${EMAIL_TO}"

    sms:
      enabled: false
      provider: twilio
      to: "${PHONE_NUMBER}"

  # 告警模板
  templates:
    issue_detected: |
      🔍 问题检测 - {{server}}

      类型: {{issue_type}}
      指标: {{metric}} = {{value}}
      阈值: {{threshold}}
      持续: {{duration}}

      正在分析原因...

    repair_started: |
      🔧 开始修复 - {{server}}

      问题: {{issue_type}}
      动作: {{action}}

    repair_completed: |
      ✅ 修复完成 - {{server}}

      问题: {{issue_type}}
      动作: {{action}}
      耗时: {{elapsed_time}}

      系统已恢复正常。

    repair_failed: |
      ❌ 修复失败 - {{server}}

      问题: {{issue_type}}
      尝试: {{attempts}}
      原因: {{error}}

      需要人工介入！

    daily_summary: |
      📊 每日监控报告 - {{date}}

      服务器: {{server_count}}
      检查次数: {{check_count}}
      问题数: {{issue_count}}
      修复数: {{repair_count}}
      失败数: {{failed_count}}

      {% if issues %}
      问题详情:
      {% for issue in issues %}
      - {{issue.time}} {{issue.type }}: {{issue.description}}
      {% endfor %}
      {% endif %}
```

---

## 4.5 Skill 配置

### 健康检查 Skill

```yaml
# skills/health-check.yaml
name: health-check
description: 服务器健康检查

trigger:
  type: cron
  expression: "*/1 * * * *"  # 每分钟

variables:
  servers_file: ~/openclaw-selfheal/config/servers.yaml

steps:
  # 1. 加载服务器列表
  - name: load_servers
    tool: file_read
    path: "{{servers_file}}"
    output: servers

  # 2. 并行检查所有服务器
  - name: check_all
    tool: parallel_execute
    config:
      max_parallel: 5
      timeout: 60

    tasks:
      - name: check_server
        tool: ssh_health_check
        server: "{{item}}"
        timeout: 30
        output: health_results

    loop: servers
    output: all_results

  # 3. 汇总结果
  - name: aggregate
    tool: aggregate_results
    input: "{{all_results}}"
    output: summary

  # 4. 检测问题
  - name: detect_issues
    tool: detect_issues
    config:
      monitoring: ~/openclaw-selfheal/config/monitoring.yaml
    input: "{{summary}}"
    output: issues

  # 5. 触发修复（如有问题）
  - name: trigger_repair
    tool: trigger_repair
    if: issues | length > 0
    config:
      repair: ~/openclaw-selfheal/config/repair.yaml
    input: "{{issues}}"
```

### 诊断 Skill

```yaml
# skills/diagnose.yaml
name: diagnose
description: 故障诊断分析

steps:
  # 1. 收集症状
  - name: collect_symptoms
    tool: ssh_collect
    commands:
      - "uptime"
      - "free -h"
      - "df -h"
      - "docker ps"
      - "journalctl -n 50 --no-pager"
      - "netstat -tuln"
    output: symptoms

  # 2. 模式匹配
  - name: match_pattern
    tool: pattern_match
    patterns:
      high_cpu:
        - "Cpu.*([9][0-9]|100)%"
        - "load average: [5-9]"
      high_memory:
        - "Mem.*([8-9][0-9]|100)%"
        - "swap.*[0-9]+M"
      disk_full:
        - "Use%.*9[0-9]%"
        - "No space left"
      service_down:
        - "inactive \(dead\)"
        - "failed"
    input: symptoms
    output: matched_patterns

  # 3. 根因分析
  - name: analyze
    tool: llm_analyze
    model: claude-sonnet-4-20250514
    prompt: |
      分析以下症状，诊断根因：

      症状：
      {{symptoms}}

      匹配模式：
      {{matched_patterns}}

      请给出：
      1. 根因分析
      2. 建议的修复动作
      3. 优先级
    output: diagnosis

  # 4. 输出结果
  - name: result
    tool: format_diagnosis
    input: diagnosis
    output: formatted
```

### 自动修复 Skill

```yaml
# skills/repair.yaml
name: repair
description: 自动修复故障

steps:
  # 1. 确认修复策略
  - name: load_strategy
    tool: load_repair_strategy
    config: ~/openclaw-selfheal/config/repair.yaml
    condition: "{{issue}}"
    output: strategy

  # 2. 执行修复
  - name: execute
    tool: ssh_execute
    server: "{{issue.server}}"
    commands: "{{strategy.commands}}"
    sudo: "{{strategy.sudo}}"
    timeout: "{{strategy.timeout}}"
    output: result

  # 3. 验证修复
  - name: verify
    tool: ssh_verify
    server: "{{issue.server}}"
    check: "{{strategy.verify_check}}"
    output: verified

  # 4. 处理结果
  - name: handle_result
    tool: handle_repair_result
    if: verified == true
    then:
      - name: log_success
        tool: log
        level: info
        message: "修复成功: {{issue}}"

      - name: alert_success
        tool: send_alert
        template: repair_completed
        channels: [telegram]
    else:
      - name: retry_or_fail
        tool: retry_or_escalate
        max_retries: 3
        if: retry_count < max
        then: execute  # 重新执行
        else:
          - name: alert_failure
            tool: send_alert
            template: repair_failed
            severity: critical
            channels: [telegram, email]
```

---

## 4.6 修复脚本示例

### 服务重启脚本

```bash
#!/bin/bash
# scripts/restart-service.sh

SERVICE=$1
SERVER=$2

echo "Restarting $SERVICE on $SERVER..."

ssh -o ConnectTimeout=10 $USER@$SERVER sudo systemctl restart $SERVICE

if [ $? -eq 0 ]; then
    echo "Success: $SERVICE restarted"
    sleep 5
    ssh -o ConnectTimeout=10 $USER@$SERVER sudo systemctl status $SERVICE
else
    echo "Failed: $SERVICE restart failed"
    exit 1
fi
```

### 磁盘清理脚本

```bash
#!/bin/bash
# scripts/clean-disk.sh

SERVER=$1

echo "Cleaning disk on $SERVER..."

ssh $USER@$SERVER << 'EOF'
# 清理日志
sudo find /var/log -type f -name "*.log" -size +100M -exec truncate -s 0 {} \;

# 清理 Docker
docker system prune -af --filter "until=72h"

# 清理 tmp
sudo find /tmp -type f -atime +7 -delete

# 清理旧内核
sudo apt-get autoremove -y

# 显示结果
df -h /
EOF
```

### 内存释放脚本

```bash
#!/bin/bash
# scripts/free-memory.sh

SERVER=$1

ssh $USER@$SERVER << 'EOF'
# 记录当前内存
free -h

# 清理缓存
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# 清理 Swap
sudo swapoff -a && sudo swapon -a

# 显示结果
free -h

# 列出占用内存最多的进程
ps aux --sort=-%mem | head -10
EOF
```

---

## 4.7 使用示例

### 手动触发检查

```bash
# 立即执行健康检查
openclaw skills run health-check

# 检查特定服务器
openclaw skills run health-check --server prod-server

# 调试模式
openclaw skills run health-check --debug
```

### 查看状态

```bash
# 查看服务器状态
openclaw selfheal status

# 查看最近问题
openclaw selfheal issues --last 24h

# 查看修复历史
openclaw selfheal history --last 7d
```

### 手动修复

```bash
# 手动重启服务
openclaw selfheal repair --server prod-server --service nginx

# 手动清理磁盘
openclaw selfheal clean --server prod-server --target disk
```

---

## 4.8 告警通知示例

### Telegram 告警

```
🔍 问题检测 - prod-server

类型: high_cpu
指标: cpu_percent = 95
阈值: 90
持续: 5分钟

正在分析原因...

---

🔧 开始修复 - prod-server

问题: high_cpu
动作: 查找占用进程

top_processes:
USER       PID %CPU %MEM COMMAND
nginx      123 85.2  2.1 nginx: worker
node       456 10.3  4.5 node server.js

---

✅ 修复完成 - prod-server

问题: high_cpu
动作: 清理缓存
耗时: 15s

系统已恢复正常。
```

### 每日报告

```
📊 每日监控报告 - 2024-01-15

服务器: 3
检查次数: 1440
问题数: 2
修复数: 2
失败数: 0

问题详情:
- 14:32 high_cpu: CPU 使用率 92%，已清理缓存
- 09:15 disk_warning: 磁盘使用率 85%，已清理日志
```

---

## 4.9 高级配置

### 智能告警抑制

```yaml
# config/suppression.yaml
suppression:
  # 维护窗口
  maintenance_windows:
    - server: prod-server
      start: "02:00"
      end: "04:00"
      day: sunday

  # 告警抑制
  rules:
    # 同类告警聚合
    - name: same_issue
      duration: 3600  # 1小时内不重复告警
      notify_aggregated: true

    # 升级延迟
    - name: escalate_delay
      initial_delay: 300  # 5分钟内不升级
      escalate_after: 1800
```

### 机器学习预测

```yaml
# config/prediction.yaml
prediction:
  enabled: false

  # 基于历史预测
  historical:
    enabled: true
    lookback_days: 30

  # 预测模型
  models:
    - name: disk_full
      metric: disk_percent
      predict: days_until_90

    - name: memory_trend
      metric: memory_percent
      predict: trend
```

---

## 4.10 故障排除

### 常见问题

```bash
# 问题 1: SSH 连接失败
# 解决: 检查密钥和权限
ssh -v -i ~/.ssh/openclaw_monitoring user@server

# 问题 2: 服务检查超时
# 解决: 增加超时时间
timeout: 30

# 问题 3: 修复失败
# 解决: 手动执行修复命令
ssh user@server sudo systemctl restart service
```

### 日志查看

```bash
# 查看健康检查日志
openclaw logs --skill health-check --tail 100

# 查看系统日志
tail -f ~/openclaw-selfheallogs/selfheal.log

# 查看告警记录
openclaw selfheal alerts --last 7d
```

---

## 本章小结

1. **监控层**: 服务/资源/网络/日志
2. **诊断层**: 症状收集/模式匹配/根因分析
3. **修复层**: 策略执行/验证/重试
4. **告警层**: 多渠道/模板/升级

## 下一步

- 添加更多服务器
- 自定义修复策略
- 配置告警升级规则

---

## 参考资源

- [awesome-openclaw-usecases - Self-Healing Home Server](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/self-healing-home-server.md)
- [OpenClaw SSH Tool](https://github.com/openclaw/openclaw-tools)
