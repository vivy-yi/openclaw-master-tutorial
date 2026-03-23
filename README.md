# 🦞 OpenClaw Master Tutorial

> From beginner to expert - Build your own AI assistant

**[中文](README.zh-CN.md)** | English

---

## Overview

A comprehensive, contextual, and interactive learning guide for OpenClaw - an open-source AI agent platform.

---

## Documentation Structure

### Getting Started

| Section | Topic | Description |
|---------|-------|-------------|
| [01 Overview](docs/01_overview/) | Introduction | History, architecture, comparisons |
| [02 Setup](docs/02_setup/) | Installation | Requirements, installation, Docker, cloud deployment |

### Core Features

| Section | Topic | Description |
|---------|-------|-------------|
| [03 Minimal Loop](docs/05_minimal_loop/) | Agent Loop | Core execution engine, commands, workspace |
| [04 Config Models](docs/02_config_models/) | Model Configuration | DeepSeek, OpenAI, Claude, Ollama |
| [05 Tools & Skills](docs/07_tools_skills/) | Capabilities | Tool system, Skill marketplace, custom skills |
| [06 Context & Memory](docs/06_context_memory/) | Memory | Context management, long-term memory, persona |

### Multi-Agent & Channels

| Section | Topic | Description |
|---------|-------|-------------|
| [07 Multi-Agent](docs/05_multi_agent/) | Collaboration | Agent teams, collaboration patterns, workflows |
| [08 Channels](docs/03_channels/) | Integrations | Telegram, Discord, Slack, webhooks |
| [09 China Channels](docs/03_channels/) | China Platforms | Feishu, DingTalk, WeCom, QQ |
| [10 Automation](docs/04_automation/) | Automation | Scheduled tasks, webhooks, workflows |
| [11 Web UI](docs/09_web_ui/) | Web Interface | Dashboard, task management, monitoring |

### Operations & Security

| Section | Topic | Description |
|---------|-------|-------------|
| [12 Gateway](docs/03_gateway/) | API Gateway | API config, authentication, rate limiting |
| [13 Security](docs/11_security/) | Security | Permissions, data security, audit logging |
| [14 Extension](docs/08_extension/) | Development | Plugin SDK, custom tools |

### Advanced & Practice

| Section | Topic | Description |
|---------|-------|-------------|
| [15 Advanced](docs/13_advanced/) | Advanced Features | Pi voice, TTS, Nodes |
| [16 Use Cases](docs/14_cases/) | Case Studies | Customer service, knowledge base, dev assistant |
| [17 Troubleshooting](docs/15_troubleshooting/) | Problem Solving | Startup, channels, tools, models |
| [18 System Layer](docs/16_system_layer/) | System Tools | File, CLI, browser, API operations |

### Command Reference

| Section | Description |
|---------|-------------|
| [OpenClaw Commands](docs/openclaw-commands/) | Complete command reference |

### Appendices

| Appendix | Topic |
|----------|-------|
| [Appendix A](docs/appendices/appendix-a/) | Command Quick Reference |
| [Appendix B](docs/appendices/appendix-b/) | Configuration Templates |
| [Appendix C](docs/appendices/appendix-c/) | API Provider Comparison |
| [Appendix D](docs/appendices/appendix-d/) | Troubleshooting Guide |
| [Appendix E](docs/appendices/appendix-e/) | Security Checklist |
| [Appendix F](docs/appendices/appendix-f/) | Performance Optimization |
| [Appendix G](docs/appendices/appendix-g/) | Learning Resources |
| [Appendix H](docs/appendices/appendix-h/) | Changelog |

---

## Architect Guide

For developers, architects, and technical leads - deep technical documentation:

| Section | Topic | Target |
|---------|-------|--------|
| [Core](architect-guide/core/) | Architecture | Architects |
| [Agent Loop](architect-guide/core/agent-loop.md) | Execution Engine | Backend Dev |
| [Security Model](architect-guide/core/security-model.md) | Security Analysis | Security Engineer |
| [Protocol](architect-guide/protocol/) | Protocols | Backend/Client Dev |
| [Gateway](architect-guide/protocol/gateway-architecture.md) | WebSocket Protocol | Backend Dev |
| [Extension](architect-guide/extension/) | Extensions | Plugin Dev |
| [Plugin SDK](architect-guide/extension/plugin-sdk.md) | Plugin Development | Plugin Dev |
| [Operation](architect-guide/operation/) | Operations | DevOps |

---

## Quick Start

```bash
# Quick start guide - see docs/02_setup/
```

---

## Examples

| File | Description |
|------|-------------|
| [docker-compose.yml](examples/docker-compose.yml) | Docker deployment |
| [.env.example](examples/.env.example) | Environment configuration |

---

## Contributing

Contributions welcome! Please submit issues and pull requests.

---

## License

[CC BY-NC-SA 4.0](LICENSE)

---

**Last Updated**: 2026-03-23
