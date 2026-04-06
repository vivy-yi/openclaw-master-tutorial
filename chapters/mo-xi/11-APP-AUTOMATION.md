# OpenClaw APP 自动化能力

## 一、支持的协议/平台

| 类型 | 协议/工具 | OpenClaw 支持 | 说明 |
|------|------------|---------------|------|
| **浏览器** | CDP | ✅ 原生支持 | browser tool |
| **Electron** | CDP | ✅ 原生支持 | 同浏览器 |
| **Android APP** | ADB | ✅ 官方 Skill | android-adb Skill |
| **iOS APP** | WebKit/WDA | ⚠️ 部分支持 | 需要通过 node |
| **Android WebView** | CDP | ✅ 通过 ADB | 可调试 WebView |
| **远程浏览器** | WebSocket | ✅ 支持 | browser profiles |

---

## 二、OpenClaw 官方 Android ADB Skill

**GitHub**: `skills/staticai/android-adb`

### 2.1 连接方式

#### USB 连接
1. 在设备上启用**开发者选项**和 **USB 调试**
2. 通过 USB 连接，使用 `adb devices` 验证

#### 无线连接（Android 11+）
1. 在开发者选项中启用**无线调试**
2. **配对**：找到 IP、端口和配对码
   ```
   adb pair <ip>:<pairing_port> <pairing_code>
   ```
3. **连接**：使用无线调试页面显示的 IP 和端口
   ```
   adb connect <ip>:<connection_port>
   ```

### 2.2 常用命令

| 功能 | 命令 |
|------|------|
| 设备连接 | `adb devices` |
| 启动 APP | `adb shell monkey -p <package> -c android.intent.category.LAUNCHER 1` |
| UI 分析 | `adb shell uiautomator dump /sdcard/view.xml && adb pull /sdcard/view.xml` |
| 点击 | `adb shell input tap <x> <y>` |
| 输入文字 | `adb shell input text "<text>"` |
| 按键 | `adb shell input keyevent <keycode>` (Home: 3, Back: 4, Power: 26) |
| 滑动 | `adb shell input swipe <x1> <y1> <x2> <y2> <duration>` |
| 截图 | `adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png` |

### 2.3 常用 Keycode

| 按键 | Keycode |
|------|---------|
| Home | 3 |
| Back | 4 |
| Power | 26 |
| Search | 84 |
| Enter | 66 |

---

## 三、OpenClaw Nodes（设备节点）

### 3.1 架构

```
Gateway (Mac/PC/Linux)
    ↓ WebSocket
├── Android 设备（node）
├── iOS 设备（node）
└── 其他设备
```

### 3.2 节点能力

| 能力 | Android | iOS |
|------|---------|-----|
| 截图 | ✅ | ✅ |
| 摄像头控制 | ✅ | ✅ |
| 屏幕录制 | ✅ | ✅ |
| 通知监听 | ✅ | ✅ |
| 剪贴板 | ✅ | ✅ |
| 地理位置 | ✅ | ✅ |
| 传感器 | ✅ | ✅ |

### 3.3 节点配置

```bash
# 连接 Android 节点
openclaw nodes status

# 触发设备操作
openclaw nodes camera snap --node "Android" --facing front
```

---

## 四、OpenClaw exec 工具

通过 `exec` 工具，Agent 可以直接执行系统命令：

### 4.1 Android 命令

```bash
# 设备连接
adb devices

# 点击操作
adb shell input tap 500 500

# 截图
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png ./

# 启动 APP
adb shell monkey -p com.tencent.mm -c android.intent.category.LAUNCHER 1

# UI 分析
adb shell uiautomator dump /sdcard/view.xml
adb pull /sdcard/view.xml ./
```

### 4.2 iOS 命令

```bash
# 需要安装 libimobiledevice
ideviceinstaller -l
idevicescreenshot
ideviceinfo
```

---

## 五、能力对比矩阵

| 能力 | Web | Electron | Android | iOS | 其他 |
|------|-----|----------|---------|------|------|
| **浏览器控制** | ✅ | ✅ | ❌ | ❌ | - |
| **原生 APP 控制** | ❌ | ❌ | ✅ ADB | ⚠️ WDA | - |
| **UI 自动化** | ✅ | ✅ | ✅ UIAutomator | ⚠️ XCUITest | - |
| **设备直连** | ❌ | ❌ | ✅ ADB | ⚠️ | - |
| **远程控制** | ❌ | ❌ | ✅ node | ✅ node | - |
| **截图/摄像头** | ✅ | ✅ | ✅ | ✅ | - |
| **传感器** | ❌ | ❌ | ✅ | ✅ | - |

---

## 六、墨析扩展能力

基于 OpenClaw 的能力，墨析可以扩展：

| 平台 | 方式 | 状态 |
|------|------|------|
| **Android APP** | ADB + UIAutomator | ✅ 已支持 |
| **微信小程序** | ADB + WebView CDP | ⚠️ 可行 |
| **iOS APP** | WDA/XCUITest | ⚠️ 需配置 |
| **Electron** | CDP | ✅ 已支持 |
| **浏览器** | CDP | ✅ 已支持 |

---

## 七、小程序自动化

### 7.1 微信小程序

微信小程序运行在 WebView 中，可以通过 ADB 连接 Android 设备的 Chrome DevTools：

```
Android 设备
    ↓
微信小程序运行在 WebView
    ↓
adb forward tcp:9222 localabstract:webview_devtools_remote_xxx
    ↓
OpenClaw browser tool 连接 CDP
    ↓
可以控制小程序！
```

### 7.2 官方工具

| 平台 | 工具 | 说明 |
|------|------|------|
| 微信 | miniprogram-automator | Node.js SDK |
| 支付宝 | miniapploy | Node.js SDK |
| 抖音 | 开发者工具 CLI | 内置自动化 |

### 7.3 限制

- 各平台协议是**私有**的
- 没有像 CDP 那样公开的标准
- 只能依赖官方 SDK，无法突破限制

---

## 八、实现示例

### 8.1 Android APP 数据采集

```yaml
# 使用 ADB 打开微信
- exec: "adb shell monkey -p com.tencent.mm -c android.intent.category.LAUNCHER 1"

# 等待加载
- exec: "sleep 3"

# 截图验证
- exec: "adb shell screencap -p /sdcard/screen.png && adb pull /sdcard/screen.png ./wechat.png"

# UI 分析
- exec: "adb shell uiautomator dump /sdcard/view.xml && adb pull /sdcard/view.xml ./view.xml"

# 点击操作
- exec: "adb shell input tap 500 800"
```

### 8.2 节点方式

```bash
# 连接节点
openclaw nodes status

# 截图
openclaw nodes camera snap --node "Android" --facing front

# 查看通知
openclaw nodes notifications list --node "Android"
```

---

## 九、配置要求

### 9.1 Android

- USB 调试启用
- ADB 工具已安装
- 设备已授权

### 9.2 iOS

- WebDriverAgent (WDA) 已安装
- 开发者证书配置
- 设备已连接

---

## 十、结论

| 问题 | 答案 |
|------|------|
| **Agent 能直接操作 APP 吗？** | ✅ 可以 |
| **Android APP？** | ✅ ADB + UIAutomator |
| **iOS APP？** | ⚠️ 有限支持（需 WDA/XCUITest） |
| **小程序？** | ⚠️ 可行但依赖官方 SDK |
| **需要额外安装？** | ⚠️ ADB 需要配置 |
