---
title: curried function
author: zhenyounide
pubDatetime: 2021-08-16T04:06:31Z
slug: curried-function
featured: true
draft: false
tags:
  - summary
description: 函数柯里化(Currying), 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
---

今儿个才接触到柯里化这个概念，想弄明白这是个啥，因此查了一堆资料，概念是说到

函数柯里化(Currying), 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

然而我记住且理解的只有

柯里化就是 `f(a,b,c)` => `f(a)(b)(c)`,认真读这句话 **实现多参函数提供了一个递归降解的实现思路**，把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数

首先，为啥要这么转换，柯里化的目的是什么？

资料说了柯里化三大好处就是

1. 参数复用：最终只输入一个参数，其余通过arguments来获取；或者说是固定参数，避免重复传参；
2. 提前返回：或者说是提前确认，避免重复判断；
3. 延迟执行：避免重复的去执行程序，等真正需要结果的时候再执行

举个例子

为了实现只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数这句话所描述的特性。 我们先写一个实现加法的函数 add：

```js
function add(x, y) {
  return x + y;
}
```

现在我们直接实现一个被 Currying 的 add 函数，该函数名为 curriedAdd，则根据上面的定义，curriedAdd 需要满足以下条件：

```js
curriedAdd(1)(3) === 4;

// true

var increment = curriedAdd(1);

increment(2) === 3;

// true

var addTen = curriedAdd(10);

addTen(2) === 12;

// true
```

满足以上条件的 curriedAdd 的函数可以用以下代码段实现：

```js
function curriedAdd(x) {
  return function (y) {
    return x + y;
  };
}
```

当然以上实现是有一些问题的：它并不通用，并且我们并不想通过重新编码函数本身的方式来实现 Currying 化。
但是这个 curriedAdd 的实现表明了实现 Currying 的一个基础 —— Currying 延迟求值的特性需要用到 JavaScript 中的作用域——说得更通俗一些，我们需要使用作用域来保存上一次传进来的参数。
对 curriedAdd 进行抽象，可能会得到如下函数 currying ：

```js
function currying(fn, ...args1) {
  return function (...args2) {
    return fn(...args1, ...args2);
  };
}

var increment = currying(add, 1);

increment(2) === 3;

// true

var addTen = currying(add, 10);

addTen(2) === 12;

// true
```

在此实现中，currying 函数的返回值其实是一个接收剩余参数并且立即返回计算值的函数。即它的返回值并没有自动被 Currying化 。所以我们可以通过递归来将 currying 的返回的函数也自动 Currying 化。

```js
function trueCurrying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return function (...args2) {
    return trueCurrying(fn, ...args, ...args2);
  };
}
```

最后介绍一个自动柯里化的库 ramda，找个机会好好学学
