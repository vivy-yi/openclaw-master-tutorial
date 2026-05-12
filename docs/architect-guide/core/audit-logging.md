# 审计日志与合规

> OpenClaw 审计日志架构与合规实践

---

## 概述

OpenClaw 实现了全面的审计日志系统，记录系统中的关键操作，满足企业合规和安全审计需求。本文档深入解析审计日志的架构、存储、分析和合规配置。

★ Insight ─────────────────────────────────────
• 审计日志是安全事件调查和合规审计的基础，完整性至关重要
• 合理的日志级别和过滤策略可以平衡可观测性和存储成本
• 审计日志应该防篡改，区块链或追加写入存储是常见方案
─────────────────────────────────────────────────

---

## 审计日志架构

### 1. 审计事件类型

```typescript
// src/security/audit.ts
enum AuditEventType {
  // 认证事件
  LOGIN = 'auth.login',
  LOGOUT = 'auth.logout',
  LOGIN_FAILED = 'auth.login_failed',
  TOKEN_REFRESH = 'auth.token_refresh',

  // 会话事件
  SESSION_CREATE = 'session.create',
  SESSION_END = 'session.end',
  SESSION_TIMEOUT = 'session.timeout',

  // 工具执行事件
  TOOL_EXECUTE = 'tool.execute',
  TOOL_DENIED = 'tool.denied',
  TOOL_ERROR = 'tool.error',

  // 配置变更
  CONFIG_CHANGE = 'config.change',
  SECRET_ROTATE = 'secret.rotate',

  // 管理操作
  USER_CREATE = 'user.create',
  USER_DELETE = 'user.delete',
  PERMISSION_CHANGE = 'permission.change',
}

interface AuditEvent {
  id: string;
  type: AuditEventType;
  timestamp: number;
  actor: {
    userId: string;
    sessionId: string;
    ip: string;
    userAgent: string;
  };
  target: {
    type: string;
    id: string;
  };
  action: string;
  result: 'success' | 'failure';
  metadata: Record<string, unknown>;
}
```

### 2. 审计日志收集

```typescript
// src/security/audit-channel.ts
class AuditChannel {
  private readonly buffer: AuditEvent[] = [];
  private readonly flushInterval = 5000; // 5秒

  async log(event: AuditEvent): Promise<void> {
    // 添加到缓冲区
    this.buffer.push(event);

    // 达到阈值或达到时间间隔时刷新
    if (this.buffer.length >= 100 || Date.now() - this.lastFlush > this.flushInterval) {
      await this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const events = this.buffer.splice(0);

    // 发送到多个目标
    await Promise.all([
      this.sendToFile(events),
      this.sendToSyslog(events),
      this.sendToSIEM(events),
    ]);
  }
}
```

---

## 存储策略

### 1. 本地文件存储

```yaml
# 日志配置
audit:
  file:
    enabled: true
    path: /var/log/openclaw/audit.json
    rotation:
      maxSize: 100MB
      maxFiles: 30
    format: json
    compress: true
```

```typescript
// 追加写入保证完整性
class AuditFileWriter {
  private readonly fd: number;

  async write(events: AuditEvent[]): Promise<void> {
    const data = events.map(e => JSON.stringify(e)).join('\n') + '\n';

    // 原子写入
    const tempPath = this.path + '.tmp';
    await fs.writeFile(tempPath, data);
    await fs.appendFile(this.path, await fs.readFile(tempPath));

    // 写入校验和
    const checksum = crypto.createHash('sha256').update(data).digest();
    await this.writeChecksum(checksum);
  }
}
```

### 2. Syslog 转发

```typescript
// 转发到 syslog
class SyslogWriter {
  private readonly client = new SyslogClient({
    host: 'syslog.company.com',
    port: 514,
    protocol: 'tls',
  });

  async write(events: AuditEvent[]): Promise<void> {
    for (const event of events) {
      const message = this.formatSyslog(event);
      await this.client.send(message, AuditFacility.USER);
    }
  }

  private formatSyslog(event: AuditEvent): string {
    const priority = AuditSeverity.INFO + AuditFacility.USER * 8;
    return `<${priority}>${event.timestamp} openclaw ${event.type} ${event.actor.userId} ${event.action} ${event.result}`;
  }
}
```

### 3. SIEM 集成

```typescript
// 发送到 SIEM (Splunk, ELK, etc.)
class SIEMWriter {
  async write(events: AuditEvent[]): Promise<void> {
    // 发送到 Splunk HEC
    await fetch('https://splunk.company.com:8088/services/collector', {
      method: 'POST',
      headers: {
        'Authorization': `Splunk ${this.hecToken}`,
        'Content-Type': 'application/json',
      },
      body: events.map(e => ({
        time: e.timestamp / 1000,
        host: 'openclaw',
        source: 'audit',
        sourcetype: 'openclaw:audit',
        event: e,
      })).join('\n'),
    });
  }
}
```

---

## 审计分析

### 1. 实时监控

```typescript
// 实时审计分析
class AuditAnalyzer {
  async analyze(event: AuditEvent): Promise<void> {
    // 检测异常模式
    await this.detectBruteForce(event);
    await this.detectPrivilegeEscalation(event);
    await this.detectDataExfiltration(event);
  }

  private async detectBruteForce(event: AuditEvent): Promise<void> {
    if (event.type !== AuditEventType.LOGIN_FAILED) return;

    const recent = await this.getRecentEvents({
      type: AuditEventType.LOGIN_FAILED,
      actor: event.actor.ip,
      window: '15m',
    });

    if (recent.length > 10) {
      await this.alert({
        severity: 'high',
        title: 'Possible brute force attack',
        details: { ip: event.actor.ip, attempts: recent.length },
      });
    }
  }
}
```

### 2. 合规报表

```typescript
// 合规报表生成
class ComplianceReporter {
  async generateReport(
    start: Date,
    end: Date,
    standard: 'SOC2' | 'GDPR' | 'HIPAA'
  ): Promise<ComplianceReport> {
    const events = await this.queryEvents({ start, end });

    switch (standard) {
      case 'SOC2':
        return this.generateSOC2Report(events);
      case 'GDPR':
        return this.generateGDPRReport(events);
      case 'HIPAA':
        return this.generateHIPAReport(events);
    }
  }

  private async generateSOC2Report(events: AuditEvent[]): Promise<ComplianceReport> {
    return {
      standard: 'SOC2',
      period: { start: events[0].timestamp, end: events[events.length - 1].timestamp },

      // CC6.1: 逻辑访问安全
      accessControl: {
        totalLogins: events.filter(e => e.type === AuditEventType.LOGIN).length,
        failedLogins: events.filter(e => e.type === AuditEventType.LOGIN_FAILED).length,
        privilegeChanges: events.filter(e => e.type === AuditEventType.PERMISSION_CHANGE).length,
      },

      // CC7.2: 系统运行监控
      systemMonitoring: {
        toolExecutions: events.filter(e => e.type === AuditEventType.TOOL_EXECUTE).length,
        toolDenials: events.filter(e => e.type === AuditEventType.TOOL_DENIED).length,
        errors: events.filter(e => e.result === 'failure').length,
      },
    };
  }
}
```

---

## 合规配置

### 1. GDPR 合规

```yaml
# GDPR 配置
compliance:
  gdpr:
    enabled: true
    retention:
      personalData: 90d   # 个人数据保留90天
      auditLogs: 365d     # 审计日志保留1年
    anonymization:
      enabled: true
      fields: [ip, userAgent]

    # 数据主体权利
    dataSubjectRights:
      access: true
      erasure: true
      portability: true
```

### 2. 数据脱敏

```typescript
// 审计日志脱敏
class AuditSanitizer {
  sanitize(event: AuditEvent): AuditEvent {
    return {
      ...event,
      actor: {
        ...event.actor,
        ip: this.maskIP(event.actor.ip),
        userAgent: '[REDACTED]',
      },
      target: {
        ...event.target,
        id: event.target.type === 'user' ? this.maskUserId(event.target.id) : event.target.id,
      },
    };
  }

  private maskIP(ip: string): string {
    const parts = ip.split('.');
    return parts.length === 4
      ? `${parts[0]}.xxx.xxx.xxx`
      : `${ip.substring(0, 8)}...`;
  }
}
```

---

## 监控告警

### 1. 关键事件告警

```yaml
# 告警配置
audit:
  alerts:
    - name: admin_login
      condition: "type == 'auth.login' && actor.isAdmin"
      severity: high
      channels: [email, slack]

    - name: mass_download
      condition: "tool == 'file_download' && count > 100"
      severity: medium
      channels: [slack]

    - name: failed_auth
      condition: "type == 'auth.login_failed' && count > 5"
      severity: low
      channels: []
```

### 2. 指标采集

| 指标 | 描述 | 告警阈值 |
|------|------|----------|
| `audit.events.total` | 审计事件总数 | - |
| `audit.events.failed` | 失败事件数 | > 100/min |
| `audit.auth.failures` | 认证失败次数 | > 10/min |
| `audit.tool.denials` | 工具拒绝次数 | > 50/min |
| `audit.storage.lag` | 存储延迟 | > 1s |

---

## 配置参考

```yaml
# config/audit.yaml
audit:
  # 审计日志开关
  enabled: true

  # 事件类型过滤
  events:
    include:
      - auth.*
      - session.*
      - tool.*
      - config.*
      - user.*
    exclude:
      - session.heartbeat

  # 存储配置
  storage:
    # 本地文件
    file:
      enabled: true
      path: /var/log/openclaw/audit
      rotation:
        maxSize: 100MB
        maxFiles: 30

    # Syslog
    syslog:
      enabled: true
      host: syslog.company.com
      port: 514
      protocol: tls

    # SIEM
    siem:
      enabled: false
      type: splunk
      endpoint: https://splunk.company.com:8088
      token: ${SPLUNK_TOKEN}

  # 合规配置
  compliance:
    gdpr:
      enabled: true
      retention: 365d
    hipaa:
      enabled: false
      retention: 2190d  # 6年
```

---

## 最佳实践

1. **启用审计日志**
   - 生产环境必须启用
   - 记录所有关键操作

2. **配置合理保留期**
   - 根据合规要求设置
   - 平衡存储成本和合规需求

3. **实时监控告警**
   - 关键事件实时告警
   - 异常模式检测

4. **定期审计**
   - 周/月度审计报表
   - 异常趋势分析

5. **防止篡改**
   - 使用追加写入
   - 定期备份
   - 完整性校验

---

*最后更新：2024年1月*
