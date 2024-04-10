---
title: 一行代码系列
author: zhenyounide
pubDatetime: 2020-07-16T02:16:31Z
slug: one-line-code
featured: false
draft: false
tags:
  - summary
description: 一行代码实现日常 code 使用频率较高的逻辑
---

一行只是噱头...

### new Date get next month

```js
const nextMonth = new Date(
  new Date().setMont(newDate().getMonth() + current - 1)
);
```

### number format

```js
// to percentage
const PERCENT_NUMBER =
  new Intl.NumberFormat("de-DE", { style: "percent" }).format(
    123456789.123456789
  ) / "12.345.678.912 %";

// 千分位
const formatted = (12345.6789).toLocaleString([navigator.language, "en"], {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
```

### get url query

```js
Object.fromEntries(new URLSearchParams(window.location.search));
```

### ~~ 代替 parseInt

```js
~~1.2; // 1
~~1.8; // 1

~~false; // 0
~~true; // 1
```

### deep clone

```js
const obj = {
  title: "xxx",
  date: new Date(),
  attendees: ["xxxxxxx"],
};

const copied = structuredClone(obj);
```

### 格式化时间差

```ts
const formatDateDiff = (diff: number) => {
  const d = diff / 1000;
  const days = Math.floor(d / 86400); // 天  24*60*60*1000
  const hours = Math.floor(d / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数
  const minutes = Math.floor((d % 3600) / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  const seconds = Math.floor(d % 60); //
  return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
};
```
