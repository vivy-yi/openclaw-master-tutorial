# FormKit 表单框架完全指南

> AI 编程时代的表单框架，专为 AI 智能体优化

---

## 一、概述

### 1.1 什么是 FormKit

| 项目 | 说明 |
|------|------|
| **定位** | The form framework for coding agents |
| **官网** | https://formkit.com |
| **GitHub** | https://github.com/formkit/formkit |
| **许可** | MIT |
| **框架** | React · Vue |
| **客户** | NBC, Nike, Bosch, Anthem Blue Cross |

### 1.2 核心特点

```
┌─────────────────────────────────────────────────────────────┐
│                    FormKit 核心特点                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 一个组件，无限灵活                                        │
│     └── <FormKit type="text"> 全搞定                         │
│                                                              │
│  ✅ AI 编程友好                                              │
│     └── npx formkit skill 自动配置最佳实践                   │
│                                                              │
│  ✅ 协同验证                                                  │
│     └── 验证规则内联声明，无需单独 schema                    │
│                                                              │
│  ✅ 自结构化数据                                             │
│     └── group/list 自动嵌套为对象/数组                      │
│                                                              │
│  ✅ Schema 生成                                               │
│     └── JSON 即可生成完整表单                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、快速开始

### 2.1 安装

```bash
# Vue
npm install @formkit/vue @formkit/addons

# React
npm install @formkit/react @formkit/addons
```

### 2.2 AI 编程配置

```bash
# 为 AI 编程工具配置 FormKit 支持
npx formkit skill

# 支持的工具：Claude Code, Codex, Cursor, Cline, Gemini, OpenCode, Amp
```

### 2.3 基础用法

```jsx
// Vue
<template>
  <FormKit
    type="form"
    submit-label="注册"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      name="email"
      label="邮箱"
      placeholder="请输入邮箱"
      validation="required|email"
      :validation-messages="{
        required: '邮箱不能为空',
        email: '请输入有效的邮箱地址'
      }"
    />
    <FormKit
      type="password"
      name="password"
      label="密码"
      validation="required|length:8"
      :validation-messages="{
        length: '密码至少 8 个字符'
      }"
    />
  </FormKit>
</template>

// React
import { FormKit } from '@formkit/react'

function MyForm() {
  return (
    <FormKit
      type="form"
      submit-label="注册"
      onSubmit={handleSubmit}
    >
      <FormKit
        type="text"
        name="email"
        label="邮箱"
        validation="required|email"
      />
    </FormKit>
  )
}
```

---

## 三、架构

### 3.1 核心模块

```
@formkit/core          →  Node tree, events, plugins, schema compiler
@formkit/validation    →  Validation engine
@formkit/rules         →  Built-in validation rules (40个)
@formkit/i18n          →  Internationalization (30+ languages)
@formkit/inputs        →  Input type definitions
@formkit/themes        →  Theme utilities
─────────────────────────────────────────────
@formkit/react         →  React 18/19 bindings
@formkit/vue           →  Vue 3 bindings
```

### 3.2 FormKit Node

> 每个 `<FormKit>` 组件都拥有一个 **Node**，Node 自动在任意深度组件间结构化数据。

```
┌─────────────────────────────────────────────────────────────┐
│                      FormKit Node                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  无需 prop drilling                                         │
│  无需 event spaghetti                                       │
│  无需 ad-hoc state stores                                  │
│                                                              │
│  结果：AI 和人类都能理解的表单状态紧凑表示                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 四、40+ 验证规则详解

### 4.1 分类总览

| 类别 | 规则数 | 说明 |
|------|--------|------|
| **基础验证** | 8 | required, email, url, number 等 |
| **字符类型** | 12 | alpha, lowercase, uppercase 等 |
| **内容检测** | 8 | contains_alpha, contains_numeric 等 |
| **日期时间** | 7 | date_after, date_before 等 |
| **数值范围** | 4 | min, max, between 等 |
| **格式匹配** | 6 | matches, starts_with, ends_with 等 |
| **高级验证** | 5 | confirm, require_one 等 |

### 4.2 基础验证规则

#### required - 必填

```jsx
<FormKit
  type="text"
  name="username"
  validation="required"
/>
```

**说明**：字段不能为空

---

#### email - 邮箱格式

```jsx
<FormKit
  type="email"
  name="email"
  validation="required|email"
/>
```

**说明**：验证邮箱格式

---

#### url - URL 格式

```jsx
<FormKit
  type="url"
  name="website"
  validation="url"
/>
```

**说明**：验证 URL 格式（需要 http:// 或 https://）

---

#### number - 数字

```jsx
<FormKit
  type="text"
  name="age"
  validation="number"
/>
```

**说明**：值必须是有效数字

---

#### confirm - 确认匹配

```jsx
<FormKit
  type="password"
  name="password"
  label="密码"
/>
<FormKit
  type="password"
  name="confirm_password"
  label="确认密码"
  validation="confirm"
/>
```

**说明**：值必须与另一个字段匹配（默认匹配 `name`_confirm）

---

#### length - 长度验证

```jsx
<FormKit
  type="text"
  name="username"
  validation="length:3:16"
/>
```

**语法**：`length:min` 或 `length:min:max`

| 示例 | 说明 |
|------|------|
| `length:5` | 至少 5 个字符 |
| `length:3:16` | 3-16 个字符 |

---

#### matches - 正则匹配

```jsx
<FormKit
  type="text"
  name="phone"
  validation="matches:/^[0-9]{11}$/"
/>
```

**说明**：值必须匹配给定的正则表达式

---

### 4.3 字符类型规则

#### alpha - 仅字母

```jsx
<FormKit
  type="text"
  name="name"
  validation="alpha"
/>
// 仅允许 a-z, A-Z
```

---

#### alpha_spaces - 字母和空格

```jsx
<FormKit
  type="text"
  name="fullname"
  validation="alpha_spaces"
/>
// 允许 a-z, A-Z 和空格
```

---

#### alphanumeric - 字母和数字

```jsx
<FormKit
  type="text"
  name="username"
  validation="alphanumeric"
/>
// 允许 a-z, A-Z, 0-9
```

---

#### lowercase - 仅小写

```jsx
<FormKit
  type="text"
  name="code"
  validation="lowercase"
/>
// 仅允许 a-z
```

---

#### uppercase - 仅大写

```jsx
<FormKit
  type="text"
  name="code"
  validation="uppercase"
/>
// 仅允许 A-Z
```

---

#### symbol - 仅符号

```jsx
<FormKit
  type="text"
  name="code"
  validation="symbol"
/>
// 仅允许符号字符
```

---

### 4.4 内容检测规则

#### contains_alpha - 包含字母

```jsx
<FormKit
  type="text"
  name="password"
  validation="contains_alpha"
/>
// 值中必须包含至少一个字母
```

---

#### contains_numeric - 包含数字

```jsx
<FormKit
  type="text"
  name="password"
  validation="contains_numeric"
/>
// 值中必须包含至少一个数字
```

---

#### contains_lowercase - 包含小写字母

```jsx
<FormKit
  type="text"
  name="password"
  validation="contains_lowercase"
/>
```

---

#### contains_uppercase - 包含大写字母

```jsx
<FormKit
  type="text"
  name="password"
  validation="contains_uppercase"
/>
```

---

#### contains_symbol - 包含符号

```jsx
<FormKit
  type="text"
  name="password"
  validation="contains_symbol"
/>
// 值中必须包含至少一个特殊符号
```

---

### 4.5 日期时间规则

#### date_after - 之后日期

```jsx
<FormKit
  type="date"
  name="start_date"
  validation="date_after:2024-01-01"
/>
// 值必须晚于指定日期
```

---

#### date_before - 之前日期

```jsx
<FormKit
  type="date"
  name="end_date"
  validation="date_before:2025-12-31"
/>
// 值必须早于指定日期
```

---

#### date_between - 日期范围

```jsx
<FormKit
  type="date"
  name="booking"
  validation="date_between:2024-01-01:2024-12-31"
/>
// 值必须在指定日期范围内
```

---

#### date_format - 日期格式

```jsx
<FormKit
  type="date"
  name="birthday"
  validation="date_format:YYYY-MM-DD"
/>
// 验证日期格式
```

---

### 4.6 数值范围规则

#### min - 最小值

```jsx
<FormKit
  type="number"
  name="age"
  validation="min:18"
/>
// 数值不能小于 18
```

---

#### max - 最大值

```jsx
<FormKit
  type="number"
  name="quantity"
  validation="max:100"
/>
// 数值不能大于 100
```

---

#### between - 范围

```jsx
<FormKit
  type="number"
  name="rating"
  validation="between:1:5"
/>
// 值必须在 1-5 之间
```

---

### 4.7 格式匹配规则

#### starts_with - 开头匹配

```jsx
<FormKit
  type="text"
  name="phone"
  validation="starts_with:+86"
/>
// 值必须以 +86 开头
```

---

#### ends_with - 结尾匹配

```jsx
<FormKit
  type="email"
  name="email"
  validation="ends_with:@company.com"
/>
// 值必须以 @company.com 结尾
```

---

#### is - 精确匹配

```jsx
<FormKit
  type="text"
  name="country"
  validation="is:China"
/>
// 值必须完全等于 "China"
```

---

#### not - 排除匹配

```jsx
<FormKit
  type="text"
  name="username"
  validation="not:admin:root"
/>
// 值不能是 admin 或 root
```

---

### 4.8 高级规则

#### require_one - 至少填写一个

```jsx
<FormKit
  type="tel"
  name="phone"
  validation="require_one"
/>
<FormKit
  type="email"
  name="email"
  validation="require_one"
/>
// phone 和 email 至少填写一个
```

---

#### accepted - 接受条款

```jsx
<FormKit
  type="checkbox"
  name="terms"
  validation="accepted"
/>
// 必须勾选（值为 on/true/yes/1）
```

---

## 五、规则组合使用

### 5.1 管道语法

```jsx
<FormKit
  type="password"
  name="password"
  validation="required|length:8|matches:/[A-Z]/|matches:/[0-9]/"
/>
```

### 5.2 常用组合

#### 强密码验证

```jsx
validation="required|length:8|contains_uppercase|contains_lowercase|contains_numeric"
```

#### 中国手机号

```jsx
validation="matches:/^1[3-9]\d{9}$/"
```

#### 身份证号

```jsx
validation="matches:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"
```

---

## 六、自定义验证消息

```jsx
<FormKit
  type="text"
  name="email"
  validation="required|email"
  :validation-messages="{
    required: '请输入邮箱地址',
    email: '请输入有效的邮箱格式'
  }"
/>
```

---

## 七、Schema 生成表单

```js
const schema = [
  {
    $formkit: 'text',
    name: 'username',
    label: '用户名',
    validation: 'required|length:3:16'
  },
  {
    $formkit: 'email',
    name: 'email',
    label: '邮箱',
    validation: 'required|email'
  },
  {
    $formkit: 'password',
    name: 'password',
    label: '密码',
    validation: 'required|length:8'
  },
  {
    $formkit: 'submit',
    label: '注册'
  }
]
```

---

## 八、与 OpenClaw 的结合

### 8.1 表单场景

| FormKit 解决的问题 | OpenClaw 应用场景 |
|-------------------|------------------|
| 表单状态管理 | Agent 对话状态 |
| 验证规则内联 | Agent 指令验证 |
| 多层级嵌套 | 多 Agent 协作 |
| AI Coding 支持 | OpenClaw Skills |

### 8.2 可能的结合点

1. **OpenClaw 配置表单**：FormKit 构建配置界面
2. **Agent 输出结构化**：Schema 概念规范 Agent 输出
3. **AI Coding 工具**：FormKit skill 思路借鉴

---

## 九、相关资源

| 资源 | 链接 |
|------|------|
| 官网 | https://formkit.com |
| 文档 | https://formkit.com/docs |
| GitHub | https://github.com/formkit/formkit |
| Discord | https://discord.gg/Vhu97pAC76 |

---

*文档版本: 2026-04-22*
