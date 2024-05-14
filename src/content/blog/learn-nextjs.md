---
author: zhenyounide
pubDatetime: 2024-05-14T05:50:00Z
modDatetime: 2024-05-14T05:50:00Z
title: learning the foundations of Next.js and building a fully functional demo website
slug: learn-nextjs
featured: true
draft: false
tags:
  - docs
description:
---

16 chapters, 帮助你系统的学习 Next.js.（有 React 基础）

## Table of contents

# Learn Next.js

本次课程我们将尝试构建一个简单的 financial dashboard，包括

- 一个公共主页
- 一个 login 页
- 一个带有 auth 的 dashboard 页
- 用户可增删改数据

## overview

- Styling: 在 Next.js 中几种 style 应用.
- Optimizations: 如何优化 images, links, and fonts.
- Routing: 使用 file-system routing 来创建嵌套式的 layout 和 pages.
- Data Fetching: 在 Vercel 中如何安装数据库，以及 fetching and streaming 的最佳实践.
- Search and Pagination: 使用 url search params 来集成搜索和分页.
- Mutating Data: 如何使用 React Server Actions 变更数据，并重新 validate Next.js 缓存。.
- Error Handling: 如何处理普通的或者 404 错误.
- Form Validation and Accessibility: 如何在服务端做表单验证和提示来优化体验.
- Authentication: 使用 NextAuth.js and Middleware 来添加 authentication.
- Metadata: 如何添加 metadata, 为社交共享做准备.

## Prerequisite knowledge

本次课程的前提是你对 React 和 js 有基础的理解，如果你是个新手，我们建议你先学习 React Foundations 课程，这里面包括 components, props, state, and hooks, 以及 Server Components and Suspense 等新特性

## System requirements

确保你的开发环境：

- Node.js 18.17.0 or later installed. Download here.
- Operating systems: macOS, Windows (including WSL), or Linux.
- GitHub Account and a Vercel Account.

# Getting Start

## Creating a new project

To create a Next.js app, open your terminal, cd into the folder you'd like to keep your project, and run the following command:
打开终端，cd 到任意文件夹，运行以下命名：

Terminal

```bash
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

`create-next-app` 创建 Nextjs 的一个 cli 工具

## Exploring the project

与让你从头开始编写代码的教程不同，本课程的大部分代码已经为你编写好了。这也更贴近现实中的实战开发。

我们的目标是帮助您专注于学习 Next.js 的主要特性，而不必编写所有的应用程序代码。
Our goal is to help you focus on learning the main features of Next.js, without having to write all the application code.

安装后，cd 到 nextjs-dashboard.下

接下来我们来了解下项目结构

### Folder structure

- app: 所有 routes, components, and logic, 大部分的编码都在此进行
  - ui: UI components, 例如 cards, tables, and forms. 为了节约时间，我们已经封装好所有 ui 组件供你使用.
  - lib: 用到的 functions, 例如可复用的一些函数，数据请求等等.
- public: static assets, 例如 images.
- scripts: seed 脚本，您将在后面的章节中使用该脚本填充数据库.
- next.config.ts
- ... 一些配置文件，本次课程中不会修改到. 实际开发中按需修改即可

### Placeholder data

在构建用户界面时，拥有一些默认数据会有所帮助。如果数据库或 API 尚未可用，可以:

- 使用 JSON format or as JavaScript objects
- 使用第三方服务，例如 mockAPI

当前项目下，我们在 app/lib/placeholder-data.js 文件中提供了一些初始数据。 每个 Each JavaScript object 代表你数据库里的一张表。例如 invoices

```js
const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: "pending",
    date: "2022-12-06",
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: "pending",
    date: "2022-11-14",
  },
  // ...
];
```

在 setting up your database 章节中, 您将会使用这些数据来填充你的数据库

### TypeScript

本项目是用 ts 实现的，如果你未曾使用过 ts 也没关系，我们提供了一些必需的 ts 的代码片段

在 /app/lib/definitions.ts 中，我们定义了一些将会从数据库返回的数据类型例如 invoices table：

```ts
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};
```

使用 ts 可以确保你不会将错误的数据格式传给组件或者数据库，例如给 number 类型的 invoice amount 传了 字符串。

如果你是个使用 ts 的开发者

我们建议你使用 Prisma ，达到更佳的类型检查，他会基于数据库语法来自动生成类型定义。

## running development server

`npm i && npm run dev` , 并在你的浏览器中打开 http://localhost:3000.

# CSS styling
