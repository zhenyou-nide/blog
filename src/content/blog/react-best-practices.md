---
title: React/Nextjs 最强 Agent Skills - React Best Practices"
author: zhenyounide
pubDatetime: 2026-01-15T02:06:31Z
slug: react-best-practices
featured: true
draft: false
tags:
  - react
  - performance
  - ai
description: Vercel 开源的 React Best Practices Skills，让 AI 写代码时自动避开性能陷阱，好东西哇
---

Vercel 发了篇博客：[Introducing React Best Practices](https://vercel.com/blog/introducing-react-best-practices)，把他们 10+ 年的 React/Next.js 性能优化经验打包成了一套 AI Skills。

看完之后第一反应是：这东西解决的问题太实在了。

翻了一遍具体的 rules 文件，发现这些规则不仅可以给 AI 看的，本开发看了也能补不少性能优化的盲区。每条规则都是从实战中提炼出来的，不是那种"理论正确但用不上"的东西

## Table of contents

简单说，就是 Vercel 把自己这些年踩过的坑、优化过的点，整理成了一套 AI 能看懂的"规则手册"。

作者是 Shu Ding（[@shuding](https://twitter.com/shuding)）和 Andrew Qu。如果你关注 Next.js 生态，应该对 Shu 不陌生，他写过 SWR、better-all 这些库，一直在推"极致并行化"的理念。

40+ 条规则，按影响级别从 CRITICAL 到 LOW 排序，每条都是 Incorrect vs Correct 对比代码。AI 装上这个 skills 之后，写代码时会自动参考这些规则。

## 怎么用

一行命令就能装上：

```bash
npx add-skill vercel-labs/agent-skills
```

这个命令会把 skills 安装到你的文件下（支持 Claude Code、Cursor、Windsurf 等）。装完之后 AI 就会自动参考这些规则了。

## 它在管什么

举两个例子看看这些规则具体在约束什么。

### 1. 避免请求瀑布流（CRITICAL）

这条规则的定义在 `async-api-routes.md`，标注为 CRITICAL 级别（2-10× 性能提升）。

它要求：在 API Routes 和 Server Actions 里，独立的异步操作要立即启动，而不是等前一个完成再开始下一个。

错误写法：

```typescript
export async function GET(request: Request) {
  const session = await auth()
  const config = await fetchConfig()  // 等 auth 完成才开始
  const data = await fetchData(session.user.id)  // 等 config 完成才开始
  return Response.json({ data, config })
}
```

正确写法：

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth()
  const configPromise = fetchConfig()  // 立即启动，不等 auth
  const session = await sessionPromise
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id)
  ])
  return Response.json({ data, config })
}
```

auth 和 config 是独立的，可以同时开始。只有 data 依赖 session，才需要等 auth 完成。

如果依赖关系更复杂，rules 里还推荐用 `better-all` 这个库（shuding 写的），它能自动找出最优的并行方案。

### 2. 基于依赖的并行化（CRITICAL）

这条规则在 `async-dependencies.md`，同样是 CRITICAL 级别。

它针对的场景是：有些操作之间有部分依赖关系，用 `Promise.all` 会让不该等的操作也在等。

错误写法：

```typescript
const [user, config] = await Promise.all([
  fetchUser(),
  fetchConfig()
])
const profile = await fetchProfile(user.id)  // profile 只能等前面都完成
```

这里 profile 依赖 user，但不依赖 config。用 `Promise.all` 的话，profile 会等 config 也完成才开始，浪费了时间。

正确写法：

```typescript
import { all } from 'better-all'

const { user, config, profile } = await all({
  async user() { return fetchUser() },
  async config() { return fetchConfig() },
  async profile() {
    return fetchProfile((await this.$.user).id)  // 只等 user
  }
})
```

`better-all` 会分析依赖关系，让 config 和 profile 并行执行（因为它们不互相依赖），profile 只等自己需要的 user 完成就开始。

### 3. 避免 Barrel Import（CRITICAL）

这条规则在 `bundle-barrel-imports.md`，也是 CRITICAL 级别（200-800ms 导入成本）。

它指出：从大型组件库导入时，不要用 barrel file（那种 `export *` 的 index.js），要直接引用具体文件。

错误写法：

```tsx
import { Check, X, Menu } from 'lucide-react'
// 加载 1,583 个模块，开发环境慢 2.8 秒
// 生产环境每次冷启动多耗 200-800ms
```

正确写法：

```tsx
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
import Menu from 'lucide-react/dist/esm/icons/menu'
// 只加载 3 个模块（~2KB vs ~1MB）
```

为什么 tree-shaking 解决不了？因为如果库是 external（不打包），bundler 就没法优化。如果打包它来启用 tree-shaking，构建会变得特别慢。

装了这个 skills 之后，AI 在引入图标库时会自动用直接路径，不再写那种看起来简洁但实际很慢的 barrel import。


当然也不是完美的。复杂场景下 AI 还是会出错，但至少在那些"教科书级别"的性能陷阱上，它现在基本不踩了。

## 值得一试

如果你也在用 AI 写 React/Next.js，强烈推荐装上这个 skills。

对前端开发来说，最直接的好处是：不用严格盯着 AI 生成的代码一行行检查性能问题了。对 vibe coding 的场景更有用，以往为了快很容易忽略性能细节，等到项目变大了再回头优化，成本就高了。装了这个 skills，AI 在写代码的时候就把性能考虑进去了，省得后面返工。

而且这些规则本身也值得读一遍（对开发来说）。就算不用 AI，翻翻 rules 文件夹，也能发现不少平时没注意到的优化点。
