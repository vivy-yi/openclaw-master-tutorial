# 🦞 OpenClaw Master Tutorial

> From beginner to expert — Build your own AI assistant

---

## 👉 What are you looking for?

| Your situation | Go to |
|---------------|-------|
| 🆕 Just heard about OpenClaw, want to know what it is | [👉 User Guide](#-user-guide) |
| 💬 Want to connect Telegram / Feishu / DingTalk | [👉 Channels](#-channels) |
| ⏰ Want to set up scheduled tasks and automations | [👉 Automation](#-automation) |
| 👨‍💻 Want to develop plugins or integrate OpenClaw into a product | [👉 Developer](#-developer) |
| 🏗️ Need to design a system architecture based on OpenClaw | [👉 Architect](#-architect) |
| 💰 Evaluating OpenClaw's value and business scenarios | [👉 Decision Maker](#-decision-maker) |
| 🔧 Having a problem | [👉 Troubleshooting](#-troubleshooting) |

> 💡 **Full navigation**: All reader paths are in [读者导航.md](读者导航.md) (Chinese)

---

## 🚶 User Guide

**Goal**: Get OpenClaw up and running

### Quick Start Path

```
① Learn OpenClaw
   docs/01_overview/1.1_history.md

② Install
   docs/02_setup/2.2_installation.md

③ Connect a channel
   docs/03_channels/8.3_telegram_integration.md  (fastest)

④ Issue your first command
   docs/05_minimal_loop/3.2_first_command.md
```

### Common Commands

```bash
openclaw status
openclaw gateway restart
openclaw gateway logs -f
```

---

## 👨‍💻 Developer

| Topic | Document |
|-------|----------|
| Architecture overview | [1.2 System Architecture](docs/01_overview/1.2_architecture.md) |
| Tool system | [5.1 Tools Overview](docs/07_tools_skills/5.1_tools_overview.md) |
| Custom Skills | [5.5 Custom Skill](docs/07_tools_skills/5.5_custom_skill.md) |
| Plugin SDK | [12.2 Plugin Development](docs/08_extension/12.2_plugin_dev.md) |
| **Deep docs** | [architect-guide/](architect-guide/README.md) |

---

## 🏗️ Architect

| Topic | Document |
|-------|----------|
| [Architecture Guide Index](architect-guide/README.md) | All deep-dive docs |
| [System Architecture](architect-guide/core/architecture-overview.md) | Architecture philosophy |
| [Agent Loop](architect-guide/core/agent-loop.md) | Execution engine |
| [Security Model](architect-guide/core/security-model.md) | Security architecture |
| [Cost Optimization](architect-guide/core/cost-optimization.md) | LLM cost model |
| [High Availability](architect-guide/operation/high-availability.md) | HA architecture |

---

## 🔧 Troubleshooting

> 🔴 **Latest Bugs (Updated 2026-03-28)**

| Bug | Problem | Solution |
|-----|---------|----------|
| [#56270](https://github.com/openclaw/openclaw/issues/56270) | WhatsApp reconnect loop (v2026.3.24 regression) | Use Telegram instead |
| [#56274](https://github.com/openclaw/openclaw/issues/56274) | Discord Gateway crash | Monitor + auto-restart |
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | `/stop` doesn't interrupt | `messages.queue.mode: steer` ✅ |

| Problem Type | Document |
|--------------|----------|
| Startup issues | [15.1 Startup Issues](docs/15_troubleshooting/15.1_startup_issues.md) |
| Channel issues | [15.2 Channel Issues](docs/15_troubleshooting/15.2_channel_issues.md) |
| Tool issues | [15.3 Tool Issues](docs/15_troubleshooting/15.3_tool_issues.md) |

---

## 📚 Documentation Structure

| Directory | Purpose | Audience |
|-----------|---------|----------|
| [docs/](docs/) | Feature module reference (by tech area) | All readers |
| [chapters/](chapters/) | Learning path chapters (by sequence) | Learners |
| [architect-guide/](architect-guide/) | Architect-level deep docs (source-level) | Devs / Architects |

---

## Examples

| File | Description |
|------|-------------|
| [docker-compose.yml](examples/docker-compose.yml) | Docker deployment |
| [.env.example](examples/.env.example) | Environment config |

---

## Quick Links

- [Full Reader Navigation](读者导航.md) — by reader identity
- [Troubleshooting](docs/15_troubleshooting/)
- [Architect Guide](architect-guide/README.md)
- [GitHub Issues](https://github.com/openclaw/openclaw/issues)

## Contributing

Contributions welcome! Submit issues and pull requests.

## License

[CC BY-NC-SA 4.0](LICENSE)

---

**Last Updated**: 2026-03-28
