---
title: 一行代码系列
author: zhenyounide
pubDatetime: 2020-07-16T02:16:31Z
modDatetime: 2024-03-20T02:16:31Z
slug: one-line-code
featured: false
draft: false
tags:
  - summary
description: 一行代码实现日常 code 使用频率较高的逻辑
---

一行只是噱头...

### create

```js
/**
 *  Object.create() 是创建一个新对象并将其原型设置为指定对象的方法
 * @returns
 */
const create = obj => {
  // 参数必须是一个对象或 null
  if (typeof obj !== "object" && typeof obj !== "function") {
    throw new TypeError("Object prototype may only be an Object or null.");
  }
  // 创建一个空的构造函数
  function F() {}
  // 将构造函数的原型指向传入的对象
  F.prototype = obj;
  // 返回一个新的实例对象，该对象的原型为传入的对象
  return new F();
};
```

### curried

```js
const curried = (fn, ...args) => {
  if (fn.length > args.length) {
    return (..._args) => {
      return curried(fn, ...args, ..._args);
    };
  } else {
    return fn(...args);
  }
};

const add = (a, b, c, d) => {
  return a + b + c + d;
};
```

### debounce

```js
const debounce = (fn, delay = 3000) => {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
  /**
   * 
   *  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }

   */
};
```

### new

```js
/**
 *  1. 创建一个空对象
 *  2. 将对象的 __proto__ 指向构造函数的 prototype
 *  3. 将这个对象作为构造函数的 this
 *  4. 确保返回值为对象，如果构造函数返回了一个对象，则返回该对象；否则返回步骤 1 中创建的空对象。
 * @param {*} Con
 * @param  {...any} arg
 * @returns
 */
const newObject = (Con, ...arg) => {
  let obj = Object.create(Con.prototype);
  let result = Con.apply(obj, arg);
  return typeof result === "object" ? result : obj;
};
```

### sleep

```js
const sleep = async time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const test = async () => {
  console.warn("start");
  await Sleep(5000);
  console.warn("end");
};

test();
```

### throttle

```js
const throttle = (fn, delay = 2000) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
  /**
   *  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
   */
};

const handleConsoleLog = myDebounce(v => {
  console.log(Math.random(), v);
});
```

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
