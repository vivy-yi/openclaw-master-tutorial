# Browser/Automation 模块错误分析

分析时间: 2026-05-13

对比来源:
- 教程: `/Volumes/waku/github-维护/openclaw-master-tutorial/docs/chapters/12_浏览器与系统操作/12.3_browser_automation.md`
- 官方: `/opt/homebrew/lib/node_modules/openclaw/docs/tools/browser.md`
- 官方: `/opt/homebrew/lib/node_modules/openclaw/docs/tools/browser-control.md`
- 官方: `/opt/homebrew/lib/node_modules/openclaw/dist/extensions/browser/skills/browser-automation/SKILL.md`

---

## 一、章节标题错误

**文件**: `12.3_browser_automation.md`

| 错误 | 正确 |
|------|------|
| `# 16.3 浏览器自动化完全指南` | `# 12.3 浏览器自动化完全指南` |

该文件位于 `12_浏览器与系统操作/` 目录，文件名表明是 12.3，但标题写成了"16.3"。

---

## 二、loadState 参数位置错误

**文件**: `12.3_browser_automation.md` → "3.7 等待策略" 章节

教程错误地将 `loadState` 作为 `snapshot` action 的参数:

```json5
{
  "action": "snapshot",
  "targetId": "docs",
  "loadState": "networkidle",  // ← 错误位置
  "timeoutMs": 30000
}
```

**正确**: `loadState` 是 `wait` action 的参数，不是 `snapshot` 的参数。

官方 browser-control.md CLI:
```bash
openclaw browser wait --load networkidle
```

---

## 三、scrollintoview 在 CLI 中的位置

**文件**: `12.3_browser_automation.md` → act kind 表格

教程的 act kind 列表中没有提到 `scrollintoview`。

官方 browser-control.md CLI 中 `scrollintoview` 是**独立命令**，不是通过 `act` action 调用的 kind:
```bash
openclaw browser scrollintoview e12
```

browser.md 明确提到 existing-session profiles 中:
> `click`, `type`, `hover`, `scrollIntoView`, `drag`, and `select` require snapshot refs

因此 `scrollIntoView` 在 browser-automation skill 的 act kinds 表格中并不存在（它是 CLI 独立命令）。教程无需将其加入 act kind 表格。

---

## 四、wait kind 说明不完整

**文件**: `12.3_browser_automation.md` → act kind 表格

教程表格中 `wait` kind 说明是:
> 等待条件

官方 browser.md 明确说明:
> `wait --load networkidle` is **not supported** for existing-session profiles

教程未注明 existing-session profiles 的限制。

---

## 五、select values 单值限制未说明

**文件**: `12.3_browser_automation.md` → act kind 表格

教程示例:
```json
{ "kind": "select", "ref": "select1", "values": ["option1"] }
```

官方 browser.md 明确说明 existing-session profiles:
> `select` **accepts a single value**

教程的 values 是数组格式，适用 managed browser，但未注明 existing-session profiles 的限制。

---

## 六、type slowly 参数未说明

**文件**: `12.3_browser_automation.md` → act kind 表格

教程 act kind 表格没有提到 `slowly` 参数。

官方 browser.md 明确说明 existing-session profiles:
> `type` does **not** support `slowly=true`; use `fill` or `press`

教程应该注明此限制。

---

## 七、外部采集工具与 browser action 混用

**文件**: `12.3_browser_automation.md` → "3.10 外部数据采集工具（扩展）"

教程在同一章节列出了 `firecrawl_scrape`, `tavily_search` 等工具，容易让读者误以为这些是 browser tool 的 action。

实际上这些是**独立工具**，不是 browser action。官方 browser-automation skill 是在 "Web Scraping & Content Extraction Tools" 标题下单独列出的。

---

## 八、Browser Use 与 OpenClaw browser tool 混用

**文件**: `12_浏览器与系统操作/README.md` → "10.3 Browser Use — AI Agent 网页自动化"

README 说:
> Browser Use 是 AI Agent 驱动的新一代浏览器自动化工具

但 `12.3_browser_automation.md` 内容是 OpenClaw 内置 browser tool 教程，而不是 Browser Use。

`Browser Use` 是独立的 GitHub 项目 (85.7k ⭐)，与 OpenClaw 的 browser tool 是**不同东西**。教程混用了这两个概念。

---

## 正确架构（官方）

### Browser Tool Actions (官方 17 个 Action)

根据官方 browser-automation skill:

| Action | Description |
|--------|-------------|
| `status` | Check if browser is running |
| `start` | Launch/start the browser |
| `stop` | Stop the browser |
| `doctor` | Diagnose setup issues |
| `profiles` | List and manage profiles |
| `tabs` | List open tabs, manage handles |
| `open` | Open URL in new tab (supports `label`) |
| `navigate` | Navigate current tab |
| `focus` | Bring window to foreground |
| `close` | Close tab or browser |
| `snapshot` | Capture DOM (refs="aria" for durable refs) |
| `screenshot` | Take screenshot |
| `act` | UI interactions (12 kinds) |
| `console` | Read console logs |
| `upload` | Upload files to input |
| `pdf` | Export as PDF |
| `dialog` | Handle dialogs |

### act kinds (官方 12 种)

| Kind | Notes |
|------|-------|
| `click` | Left-button only |
| `clickCoords` | Viewport coordinates, no ref needed |
| `type` | Does NOT support `slowly=true` (existing-session) |
| `press` | Does NOT support `delayMs` (existing-session) |
| `hover` | |
| `drag` | |
| `select` | Single value only (existing-session) |
| `fill` | Clear + type |
| `resize` | |
| `wait` | `--load networkidle` NOT supported (existing-session) |
| `evaluate` | Requires `browser.evaluateEnabled=true` |
| `close` | Close element (e.g., modal) |

---

## 错误汇总

| # | 文件 | 位置 | 错误内容 | 正确内容 |
|---|------|------|----------|----------|
| 1 | 12.3_browser_automation.md | 标题 | `# 16.3 浏览器自动化完全指南` | `# 12.3 浏览器自动化完全指南` |
| 2 | 12.3_browser_automation.md | 3.7 | `snapshot` action 使用 `loadState` 参数 | `loadState` 是 `wait` action 的参数，不是 `snapshot` 的参数 |
| 3 | 12.3_browser_automation.md | 3.4.1表格 | `wait` kind 说明过于简略，未注明 existing-session profiles 的限制 | 应说明 `--load networkidle` 在 existing-session profiles 中不支持 |
| 4 | 12.3_browser_automation.md | 3.4.1表格 | `select` 的 `values` 数组未注明 existing-session profiles 单值限制 | 应说明 existing-session profiles 的 `select` 只接受单值 |
| 5 | 12.3_browser_automation.md | 3.4.1表格 | `type` 未注明 existing-session 不支持 `slowly` | 应说明 existing-session profiles 的 `type` 不支持 `slowly=true`，应使用 `fill` 或 `press` |
| 6 | 12.3_browser_automation.md | 3.10 | 外部采集工具作为"扩展"与 browser action 混在一起 | `firecrawl_scrape`、`tavily_search` 等是独立工具，不是 browser action，应明确区分 |
| 7 | README.md | 10.3节 | Browser Use 与 OpenClaw browser tool 混用 | Browser Use 是独立 GitHub 项目 (85.7k ⭐)，不是 OpenClaw 内置功能 |

---

## 修复优先级

1. **高优先级**: 章节编号错误 (#1)、loadState 位置错误 (#2)
2. **中优先级**: wait/select/type 的 existing-session 限制未说明 (#3, #4, #5)
3. **低优先级**: 工具归属说明 (#6)、Browser Use 概念澄清 (#7)