---
title: react event pooling error （react version < 17)
author: zhenyounide
pubDatetime: 2021-05-20T04:06:31Z
slug: react-event-pooling-error
featured: false
draft: false
tags:
  - problems
  - react
description: ""
---

### 13. React < 17 合成事件的 bug

react 底层为了优化性能，在你防抖或者是异步的时候会把 e.target 设置成 null，调用 e.target.value 报错

[事件池 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/legacy-event-pooling.html)

SyntheticEvent 对象会被放入池中统一管理。这意味着 SyntheticEvent 对象可以被复用，当所有事件处理函数被调用之后，其所有属性都会被置空。例如，以下代码是无效的：

```js
function handleChange(e) {
  // This won't work because the event object gets reused.
  setTimeout(() => {
    console.log(e.target.value); // Too late!
  }, 100);
}
```

如果你需要在事件处理函数运行之后获取事件对象的属性，你需要调用 e.persist()：

```js
function handleChange(e) {
  // Prevents React from resetting its properties:
  e.persist();

  setTimeout(() => {
    console.log(e.target.value); // Works
  }, 100);
}
```
