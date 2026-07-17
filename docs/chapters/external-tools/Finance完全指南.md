# Finance 完全指南

> ClawHub 评分最高的金融类 Skill。股票/ETF/外汇/加密货币实时行情。

## 概述

**评分**: ⭐⭐⭐⭐ (4.347)  
**作者**: Clawic  
**依赖**: `python`, `yfinance`, `requests`

---

## 支持类型

| 类型 | 示例 | 数据源 |
|------|------|--------|
| 股票/ETF | `AAPL`, `MSFT`, `VOO` | Yahoo Finance |
| 指数 | `^GSPC`, `^DJI` | Yahoo Finance |
| 外汇 | `USD/ZAR`, `EURUSD`, `GBP-JPY` | ExchangeRate-API |
| 加密货币 | BTC, ETH | Yahoo Finance |

---

## 安装

```bash
clawhub install finance
```

**Python 环境**：
```bash
cd ~/.openclaw/workspace/skills/finance
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**可选 API Key**：
```bash
# Twelve Data (付费)
export TWELVEDATA_API_KEY="..."

# Alpha Vantage (付费)
export ALPHAVANTAGE_API_KEY="..."
```

---

## 命令

### 1. 最新报价

```bash
# 股票
python scripts/market_quote.py AAPL

# 指数
python scripts/market_quote.py ^GSPC

# 外汇
python scripts/market_quote.py USD/ZAR
```

### 2. 历史数据

```bash
# 30天历史
python scripts/market_series.py AAPL --days 30

# 外汇
python scripts/market_series.py USD/ZAR --days 30
```

### 3. 自选股管理

```bash
# 添加
python scripts/market_watchlist.py add AAPL MSFT USD/ZAR

# 移除
python scripts/market_watchlist.py remove MSFT

# 汇总
python scripts/market_watchlist.py summary
```

---

## 数据源策略

| 类型 | 默认 | 付费选项 |
|------|------|---------|
| 股票/ETF | Yahoo Finance (无 key) | Twelve Data, Alpha Vantage |
| 外汇 | ExchangeRate-API (免费, 每日) | Twelve Data |
| 加密货币 | Yahoo Finance | - |

> ⚠️ Yahoo Finance 可能限制频率，建议添加付费 provider

---

## 使用场景

| 用户意图 | 命令 |
|---------|------|
| AAPL 现在多少钱 | `market_quote.py AAPL` |
| 跟踪 MSFT 和 GOOG | `market_watchlist.py add MSFT GOOG` |
| 最近30天走势 | `market_series.py AAPL --days 30` |
| USD 换 ZAR 汇率 | `market_quote.py USD/ZAR` |

---

## 对比其他金融工具

| 维度 | Finance | Bloomberg | Yahoo Finance | tradingview |
|------|---------|-----------|---------------|-------------|
| **评分** | 4.347 | - | - | - |
| **免费** | ✅ | ❌ 付费 | ✅ | ✅ |
| **本地存储** | ✅ | ❌ | ❌ | ❌ |
| **API 集成** | ✅ | ❌ | ⚠️ | ⚠️ |

---

## 安全隐私

| 数据 | 处理 |
|------|------|
| API Key | 可选_env 本地存储 |
| 网络请求 | ✅ 调用 Yahoo/ExchangeRate |
| 本地缓存 | ✅ `.cache/finance/` |

---

## 相关链接

- [15.4 ClawHub热门Skills](./15_Skills/15.4_ClawHub热门Skills排行榜.md)
- [GitHub](https://github.com/clawic/finance)