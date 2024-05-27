---
author: zhenyounide
pubDatetime: 2024-05-14T05:50:00Z
modDatetime: 2024-05-27T10:14:00Z
title: learning the foundations of Next.js and building a fully functional demo website
slug: learn-nextjs
featured: true
draft: false
tags:
  - docs
description: 16 chapters, 帮助你系统的学习 Next.js.（有 React 基础）
---

简单翻译 [Next.js learn](https://nextjs.org/learn)

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

打开终端，cd 到任意文件夹，运行以下命名：

```bash
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

`create-next-app` 创建 Nextjs 的一个 cli 工具

## Exploring the project

与让你从头开始编写代码的教程不同，本课程的大部分代码已经为你编写好了。这也更贴近现实中的实战开发。

我们的目标是帮助您专注于学习 Next.js 的主要特性，而不必编写所有的应用程序代码。

安装后，cd 到 nextjs-dashboard 下

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

目前你的主页没有任何样式，接下来让我们看看如何在 Next.js 中写样式。

当前章节，我们将学到

1. 给项目添加全局样式.
2. 使用 Tailwind and CSS modules.
3. 用 clsx 有条件的添加类名.

## Global styles

在 /app/ui folder 下有个 global.css. 你可以在这个文件下自定义 css，这将应用于全局，例如重置一些 css 样式，比如 link 标签等等

您可以在任何组件下 import global.css, 最佳实践是将他添加早顶层组件里，在 Next.js 里通常是 root layout (more on this later).

```tsx
// /app/layout.tsx
import "@/app/ui/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

保存后，开发环境会自动刷新，你可以在浏览器中进行预览，预期是长这样子：
![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fhome-page-with-tailwind.png&w=1920&q=75)

欸稍等，你并没有写任何的 css 样式，这些样式来自哪里呢？仔细看 global.css, 你会注意到顶部声明了几个 @tailwind:

```css
/* /app/ui/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind

Tailwind 是一个 CSS 框架，它可以直接在 TSX 元素中写入类名来快速实现 styling。

举个栗子，给 h1 标签添加 class "text-blue-500" , text color 将会变为 blue:

```html
<h1 className="text-blue-500">I'm blue!</h1>
```

虽然这里 CSS 样式是 global 的，但是每个类都单独应用于每个元素。这意味着如果添加或删除一个元素，就不必担心维护单独的 css、样式冲突或者 CSS bundle 的大小。

当你使用 `create-next-app` 来初始化项目，Next.js 会询问你是否使用 Tailwind，如果你选择了 yes，Next.js 会自动帮你安装和配置好 Tailwind 所需的东西

来到 /app/page.tsx, 你将看到我们的项目正在使用

```tsx
// /app/page.tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    // These are Tailwind classes:
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    // ...
  )
}
```

不必担心你是否有 Tailwind 开发经验，为节省时间，我们已经写好所有需要用到的 ui 组件
接下来让我们体验下 Tailwind 吧，将下面的代码 paste 到 /app/page.tsx 的 p 标签：

```tsx
// /app/page.tsx
<div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
```

<details>
<summary>q：上面的代码片段实现了个什么形状？</summary>
a：A black triangle
</details>

如果你更喜欢写传统 css 样式，不写在 jsx/tsx 里，CSS Module 是个不错的选择

## CSS Module

CSS Module 可以自动创建唯一的类名，并作用于组件，避免了样式冲突。

在本课程中，我们将继续使用 Tailwind，在此之前可以小体验一下 CSS Module。

在/app/ui 中，创建一个名为 home.module.CSS 的新文件:

```css
/* /app/ui/home.module.css */
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

/app/page.tsx 中 import 这个文件， 在 `<div />` 中用 `style.shale` 替换 Tailwind class :

```tsx
// /app/page.tsx
import styles from "@/app/ui/home.module.css";
<div className={styles.shape} />;
```

保存后，你将看到与之前一样的形状。
Save your changes and preview them in the browser. You should see the same shape as before.

Tailwind 和 CSS modules 都是 Next.js 中比较普遍的 Style 方案，选你喜欢的用就好，当然也可以二者一起使用

<details>
<summary>q：以下哪个是 CSS module 的优点？</summary>
a: 提供一种使 CSS 拥有局部作用域的方案，减少样式冲突的风险。
</details>

## Using the clsx library to toggle class names

如果需要条件性的添加或者移除某些类呢？
There may be cases where you may need to conditionally style an element based on state or some other condition.

clsx 是一个方便切换类名的库，在这里仅对这个库做一个基础的介绍

试想你创建了一个 `InvoiceStatus` 组件，它接收 `status` 属性，status 可以是 'pending' 或者 'paid'.如果是 'paid', color 为 green，'pending' 的为 gray。

这种情况下你可以使用 clsx 来条件性的应用 class：

```tsx
// /app/ui/invoices/status.tsx
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

<details>
<summary>q：在你项目里搜索一下哪些组件用了 clsx?</summary>
a: `status.tsx` and `pagination.tsx`
</details>

## Other styling solutions

除了我们讨论的上述几种方案，你也可以使用：

- Sass: 可 import .css 和 .scss 的文件.
- CSS-in-JS: 例如 styled-jsx, styled-components， emotion.
- 其他...

# Optimizing Fonts and Images

在之前的章节里，我们学习了 styling, 现在我们继续来讨论，如何添加自定义字体及 image 的显示，依旧以 home page 为例

当前章节，我们将学到

1. 使用 next/font 添加自定义字体.
2. 使用 next/font 来显示图片.
3. 如何优化 fonts 及 images.

## Why optimize fonts?

字体在网站设计中是一个比较重要的角色，在项目中使用自定义字体，加载对应字体文件可能会影响你的性能

Cumulative Layout Shift 是 Google 用来评估网站性能和用户体验的指标。使用字体时，当浏览器最初以备用字体或系统字体呈现文本，然后在加载后将其转换为自定义字体时，会发生布局变化。这种变化可能导致文本大小、间距或布局发生变化，引起回流或者重绘。
![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffont-layout-shift.png&w=3840&q=75)

next/font 会自动优化 fonts，他会在 build 阶段下载字体文件，并用其他的静态资源托管着，这意味着当用户访问你的网站时，并不会发生额外加载字体文件的网络请求，也就不会因此影响性能了

<details>
<summary>q: Next.js 是如何做字体优化的？</summary>
a: 用其他静态资产托管字体文件，这样就不会有额外的网络请求。
</details>

## Adding a primary font

来吧，体验一下给项目添加个 Google font

在 /app/ui 文件夹下, 创建 fonts.ts，用来保存字体配置。

从 next/font/google Import Inter font ，这将作为主要的字体，可以指定要加载的 subset，比如 'latin':

```ts
// /app/ui/fonts.ts
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
```

最后，将它添加到 /app/layout.tsx 的 <body > 下

```tsx
// /app/layout.tsx
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

这样 Inter 字体将在整个应用程序中被应用。在这里，您还要添加 Tailwind antialiased，它可以平滑字体。（不是必须使用的，他只是一个小优化）

```css
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Practice: Adding a secondary font

您也可以给特性元素添加特定字体

轮到你啦，在 fonts.ts 里导入 Lusitana 为二级字体，并应用于 /app/page.tsx 的 p 标签中，记得指定 subset 及 weight。

Hints:

- 如果你不确定 weight 如何配置，可配合 TypeScript 提示。
- 访问 Google Fonts 网站，搜索 Lusitana，看看有哪些选项可供选择。
- 请参阅有关添加多种字体和完整选项列表的文档。

```ts
// /app/ui/fonts.ts
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
```

```tsx
// /app/page.tsx
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    // ...
    <p
      className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
    >
      <strong>Welcome to Acme.</strong> This is the example for the{" "}
      <a href="https://nextjs.org/learn/" className="text-blue-500">
        Next.js Learn Course
      </a>
      , brought to you by Vercel.
    </p>
    // ...
  );
}
```

最后， <AcmeLogo /> 组件也使用 Lusitana. 在这之前为了避免错误已注释，现在你可以打开注释

```tsx
// /app/page.tsx
// ...

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
        {/* ... */}
      </div>
    </main>
  );
}
```

好极啦，你现在已经配置了两种字体，接下来学习如何在主页中添加 Image

## Why optimize images?

Next.js 可以在顶层 /public 文件夹下存放静态资源，比如图像，然后应用于程序内部。

如果使用常规 `<img />`：

```html
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

然而，你需要额外做如下优化：

- responsive，适配不同尺寸的屏幕.
- 为不同的设备提供不同是图片尺寸.
- 当 image load 时避免移位/回流/重绘.
- 用户视图外的 image 需要懒加载.

image 优化是 web 开发中的一个大课题，它本身就是一个专业领域。您可以使用 next/image 组件来自动优化，而不是手动实现这些优化。

## The `<Image>` component

`<Image />` 是 `<img />` 的拓展, 且已经自动做了一部分优化，例如:

- 避免 image load 时图像避免移位/回流/重绘。
- 自动调整 image 大小，以避免将大图发送到具有较小视窗的设备。
- 默认情况下延迟加载图像(图像在进入视口时加载)。
- 在浏览器支持的情况下，以 WebP 和 AVIF 等现代格式提供图像服务

## Adding the desktop hero image

/public 文件夹下有两张图片: hero-desktop.png，hero-mobile.png. 这两张图片完全不同，显示哪张图片取决于用户设备是 desktop 还是 mobile

```tsx
// /app/page.tsx
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
    //...
  );
}
```

这会儿可以看到，您给 image 设了 1000px 宽和 760px 的高，这对于避免页面移位是个不错的方案，当然前提是与源图的纵横比对应

并且，你会注意到 hidden class 隐藏了 mobile 端的 image dom，`md;block` 显示了 desktop 端的 image。

至此，主页该长这样啦
![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fhome-page-with-hero.png&w=1080&q=75)

## Practice: Adding the mobile hero image

轮到你啦，现在添加一下 mobile 端的图片
Now it's your turn! Under the image you've just added, add another <Image> component for hero-mobile.png.

- 这张图片是 560px 宽，620px 高
- 预期是将他展示在 mobile 端，在 desktop 隐藏，你可以通过 控制台 Element，检查 desktop 和 mobile 端的图像是否正确显示。

```tsx
// /app/page.tsx
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
    //...
  );
}
```

好极啦哈哈哈哈，现在主页已经拥有自定义的字体和图片啦

<details>
<summary>True or False: 没有设置大小的图像和字体是页面移位的主要原因</summary>
true
</details>

## Recommended reading

关于本章节的话题，比如优化 remote images，如何使用 本地字体文件，如果你感兴趣且想要深入了解的话，推荐以下内容：

- [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)

# Creating Layouts and Pages

至此，网站仅有一个主页，现在让我们来学习如何创建路由以及布局吧

当前章节，我们将学到

1. 文件路由：创建一个 `dashboard`
2. 创建新路由的时候理解 文件夹和问价的角色.
3. 创建一个可共享在多个 dashboard 页面之间的嵌套的 layout
4. 理解 root layout，partial rendering，colocation.

## Nested routing

Next.js 使用的是文件路由，用文件夹来创建嵌套路由，每个文件夹表示一个 route segment，与 url 一一对应

![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=1920&q=75)

你可以使用 `layout.tsx` 和 `page.tsx` 来为每一个 `route` 创建隔离的不同的样式

`page.tsx` 是 Next.js 中的特殊文件，用于到处一个 React 组件，是路由可用的必须条件。在目前的项目结构中，已存在 `/app/page.tsx` -- 用于主页也就是根路由 `/`

你可以通过创建嵌套的文件夹来创建嵌套路由。

![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard-route.png&w=3840&q=75)

`/app/dashboard/page.tsx` 是路由 `/dashboard` 的路径。

## Creating the dashboard page

在 `/app` 下创建 `dashboard` 文件夹，然后在该文件夹下创建 `page.tsx`。

```tsx
// /app/dashboard/page.tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

现在，访问 http://localhost:3000/dashboard. 预期是看到 "Dashboard Page" 字眼。

这就是在 Next.js 中创建页面的方式。创建文件夹来创建一个新路由片段，然后在里面添加 `page` 文件。

Next.js 允许您将 UI 组件、测试文件以及其他相关代码与您的路由共存。只有 `page` 文件会被公开访问。

## Practice: Creating the dashboard pages

让我们来联系创建更多路由。在 `/dashboard` 下创建两个页面：

1. **Customers Page**：访问 http://localhost:3000/dashboard/customers. ，预期呈现 'Customers Page'

2. **Invoices Page**：访问 http://localhost:3000/dashboard/invoices. ，预期呈现 'Invoices Page'

文件结构预期是

![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Frouting-solution.png&w=3840&q=75)

```tsx
// /app/dashboard/customers/page.tsx
export default function Page() {
  return <p>Customers Page</p>;
}
```

```tsx
// /app/dashboard/invoices/page.tsx
export default function Page() {
  return <p>Invoices Page</p>;
}
```

## Creating the dashboard layout

dashboard 有着跨多个页面的导航栏。在 Next.js 中，可以使用一个特殊的 `layout.tsx` 文件来创建在多个页面之间共享的 UI。让我们为 dashboard 创建一个 layout 吧！

在 `/dashboard` 文件夹中，添加一个名为 `layout.tsx` 的新文件并粘贴以下代码:

```tsx
// /app/dashboard/layout.tsx
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

这段代码中有一些内容，所以让我们小小分析一下:

首先，将 `<SideNav/>` 组件导入到布局中.

`<Layout/>` 组件接收一个 `children`, 可以是页面，也可以是其他布局。在这种情况下, `/dashboard` 中的页面将自动嵌套在 `<Layout/>` 中，如下所示:

![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fshared-layout.png&w=3840&q=75)

然后，预取如下：
![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fshared-layout-page.png&w=1920&q=75)

在 Next.js 中使用 layouts 的一个优化点是，当页面更新时，layouts 将不会重复渲染，这叫做 部分渲染 （partial rendering）

![image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&w=3840&q=75)

## Root Layout

更新 根布局：

```tsx
// /app/layout.tsx
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

这称为 root layout，是必需的。添加到 root layout 中的任何 UI 都将在所有页面之间共享。您可以使用根布局来修改 `<html>` 和 `<body >` 标签，并添加 metadata (您将在后面的章节中了解更多关于 metadata 的内容)。

由于您刚刚创建的新布局 (/app/dashboard/layout.tsx) 对于 dashboard 是唯一的，所以您不需要向上面的根布局添加任何 UI】。

<details>
<summary>Next.js 中 layout 的作用是？</summary>
在多个页面间共享 UI 样式。
</details>
-- 未完待续 --
