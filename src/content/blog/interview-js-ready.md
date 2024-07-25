---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-06-22T11:13:47.400Z
title: 大宝典-Javascript
slug: interview-js-ready
featured: false
draft: false
tags:
  - docs
  - summary
  - interview
  - 大宝典
description: 温故知新，持续更新
---

## Table of contents

## 39. 以下哪段代码运行效率更高？（隐藏类）

```js
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = { a: 1 };
```

```js
const obj1 = { a: 1 };
const obj2 = { b: 1 };
const obj3 = { c: 1 };
```

- 上面的效率更高，重用了 **隐藏类（Hidden Class）**

```js
// test
console.time("a");
for (let i = 0; i < 1000000; i++) {
  const obj = {};
  obj["a"] = i;
}
console.timeEnd("a");

console.time("b");
for (let i = 0; i < 1000000; i++) {
  const obj = {};
  obj[i] = i;
}
console.timeEnd("b");
```

- JS 运行机制：浏览器 -> 内核 -> JS 解析引擎
  | 浏览器 | 内核 | 引擎 |
  | -- | -- | -- |
  | chrome | 早期 Webkit, 现目前 Blink | V8 |
  | Mozilla Firebox | Gecko | SpiderMonkey |
  | Edge | Chromium | Chakra |
  | Safari | Webkit | JavascriptCore |

- 比较主流的 JS 引擎 v8，这里假设是在 chrome 或 node 上，用的是 v8 引擎。
- v8 是一个 c++ 实现的 js 解析引擎，内部利用隐藏类（Hidden Class）的方式存放 JS 对象。
- 隐藏类的特性是：多个 **属性顺序一致** 的 JS 对象，会重用同一个隐藏类，减少 new Class 的开销。
- 所以上面生成一个隐藏类，而下面只生成三个隐藏类，因此上面的性能更好
- **代码编写习惯**：定义对象或者类时，尽可能保证属性顺序一致。

## 40. 以下哪段代码运行效率更高？（数组- 快速模式/字典模式）

```js
const arr1 = [];
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
```

```js
const arr2 = [];
arr2[1000000 - 1] = 1;
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
```

- 上面的效率更高，利用了数组的 **快速模式**

```js
// test
console.time("a");
const arr1 = [];
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
console.timeEnd("a");

console.time("b");
const arr2 = [];
arr2[1000000 - 1] = 1;
for (let i = 0; i < 1000000; i++) {
  arr2[i] = 1;
}
console.timeEnd("b");
```

- JS 运行机制：浏览器 -> 内核 -> JS 解析引擎
  | 浏览器 | 内核 | 引擎 |
  | -- | -- | -- |
  | chrome | 早期 Webkit, 现目前 Blink | V8 |
  | Mozilla Firebox | Gecko | SpiderMonkey |
  | Edge | Chromium | Chakra |
  | Safari | Webkit | JavascriptCore |

- 比较主流的 JS 引擎 v8，这里假设是在 chrome 或 node 上，用的是 v8 引擎。
- v8 是一个 c++ 实现的 js 解析引擎，内部有很多种方式存放 JS 数组。
- "数组从 0 到 length - 1 无空洞", 会进入快速模式，存放为 array。
- "数组中间有空洞"，会进入字典模式，存放为 HashMap （v8 的一个优化厕所，保证用最合适的数据结构处理当下场景，如果遇到数据量过大或者松散结构的话，就改变为 HashMap，牺牲遍历性能，换取访问性能）。
- **代码编写习惯**：
  - 从 0 开始初始化数组，避免数组进入字典模式
  - 让数组保持紧凑，避免数组进入字典模式

> [[V8 Deep Dives] Understanding Array Internals](https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc)

## 41. 如何判断 object 为空

- 常用方法：
  - `Object.keys(obj).length === 0`
    = `JSON.stringfy(obj) === '{}'`
  - for in
- 以上都不太严谨，因为处理不了 `const obj = { [Symbol('a')]: 1 }` 的这种情况
- 更严谨：`Reflect.ownKeys(obj).length === 0`

## 42. 强制类型转换，隐式类型转换

- 强制类型转换
  ```js
  const num = Number("42");
  const str = String(123);
  const boo1 = Boolean(0);
  ```
- 隐式类型转换
  ```js
  const res = 10 + "5";
  true == 1;
  false == 0;
  ```

## 43. `==` vs `===`

- `==` ，先隐式转换，再判断值是否相等
- `===`，直接判断 类型 + 值 是否相等

```js
1 == "1"; // true
true == 1; // true

1 === "1"; // false
true === 1; // false
```

**补充**：当 a = ？以下代码成立

```js
if (a == 1 && a == 2 && a == 3) {
  console.log("hi");
}
```

```js
const a = {
  i: 1,
  valueOf: function () {
    return this.i++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log("hi");
}
```

## 44. JS 的数据类型

- 基础数据类型

  - String
  - Number
  - Boolean
  - Null
  - Undefined
  - Symbol

- 复杂数据类型
  - Object
  - Array
  - Function
- 在 ECMAScript 2020（ES11）规范种正式添加 BigInt 数据类型，用于对 **大整数** 的表示。
  - 结尾用 n 表示：100000n
- 基础数据类型存放于栈，变量记录原始值；引用类型存放于堆，变量记录地址

## 45. 如何判断 JS 的数据类型

- `typeof`: 用以确定一个值的基础数据类型，返回一个表示数据类型的字符串

  ```js
  typeof 42; // 'number'
  typeof "hello"; // 'string'
  typeof true; // 'boolean'
  typeof undefined; // 'undefined'
  typeof null; // 'object' (typeof 的常见误解)
  typeof [1, 2, 3]; // 'object'
  typeof { key: "value" }; // 'object'
  typeof function () {}; // 'function'
  ```

  _注意_：typeof null 返回 'object' 是历史遗留问题，不是很准确

- `Object.prototype.toString` : 用于获取更想起的数据类型信息。

  ```js
  Object.prototype.toString.call(42); //'[object Number]'
  Object.prototype.toString.call("hello"); // '[object String]'
  Object.prototype.toString.call(true); // '[object Boolean]'
  Object.prototype.toString.call(undefined); // '[object Undefined]'
  Object.prototype.toString.call(null); // '[object Null]'
  Object.prototype.toString.call([1, 2, 3]); // '[object Array]'
  Object.prototype.toString.call({ key: "value" }); // '[object Object]'
  Object.prototype.toString.call(function () {}); // '[object Function]'
  ```

- `instanceof` : 检查对象是否属于某个类的实例
  ```js
  const obj = {};
  obj instanceof Object; // true
  const arr = [];
  arr instanceof Array; // true
  function Person() {}
  const person = new Person();
  person instanceof Person; //true
  ```
- `Array.isArray`: 检查一个对象是否为数组
  ```js
  Array.isArray([1, 2, 3]); // true
  Array.isArray("hi"); //false
  ```

## 46. ES 每个版本引入了什么

ECMAScript 是一种用于编写 JS 的标准化脚本语言。下面是每个版本的一些重要特性和区别：

- ES6 （ECMAScript 2015）
  - `let/const`，用于声明块级作用域的变量
  - arrow function
  - 模板字符串 （template string）
  - 解构赋值 （destructuring assignment）
  - 类和模块（classed and modules）
  - Promise
- ES7 （ECMAScript 2016）
  - `Array.prototype.includes()`
  - 指数操作符
- ES8 （ECMAScript 2017）
  - async/await
  - `Object.values()` / `Object.entries()`
  - 引入字符串填充方法
- ES9 （ECMAScript 2018）
  - 异步迭代器（asynchronous iterators）
  - `Promise.finally()`
  - 对象的拓展运算符 （object spread）
- ES10 （ECMAScript 2019）
  - `Array.prototype.flat()`/`Array.prototype.flatMap()`
  - `String.prototype.trimStart()`/`String.prototype.trimEnd()`
  - 动态导入（dynamic imports）
- ES11 （ECMAScript 2020）
  - 可选链操作符（optional chaining）
  - 空值合并操作符（nullish coalescing）
  - Bigint

## 47. let

- 块级作用域

  ```js
  for (var i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
  }
  ```

  1000ms 后输出 10 个 10，循环体变量 i 会渗透到循环体外部，所以在 `setTimeout` 1000ms 的过程中，i 的值实质上变成了 10；因此会在 1000ms 后输出 10 个 10；

  ```js
  for (let i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
  }
  ```

  改为 `let` 后，问题会消失，1000ms 后输出 0 - 9；因为 let 是块级作用域，仅局限于循环体内部。

  ```js
  for (var i = 0; i < 10; ++i) {
    (function (index) {
      setTimeout(() => console.log(index), 1000);
    })(i);
  }

  for (var i = 0; i < 10; ++i) {
    setTimeout(() => console.log(index), 1000, i);
  }
  ```

  如果用 `var`，可通过在循环体内部添加一个立即执行函数，把迭代变量的作用域保护起来；或者给 `setTimeout` 传第三个参数

- 暂时性死区（temporal dead zone）
  在 `let` 声明之前的执行瞬间被称为 **暂时性性死区**，此阶段引用任何后面声明的变量会抛出 ReferenceError 的错误

  ```js
  a = 1;
  let a;
  // VM5545:1 Uncaught ReferenceError: Cannot access 'a' before initialization at <anonymous>:1:4
  ```

- 同级作用域下不能重复声明

  ```js
  let x = 1;
  let x = 2;
  //VM5590:1 Uncaught SyntaxError: Identifier 'x' has already been declared
  ```

- 全局声明会挂到 Script 作用域下，不会挂在 window
  ![image](/let.jpg)

## 48. 变量提升 & 函数提升（优先级）

```js
console.log(s);
var s = 2;
function s() {}
console.log(s);

// ƒ s() {}
// 2
```

- `var` 变量提升
- 优先级：函数提升 > 变量提升
- 过程

  ```js
  function s() {}
  console.log(s);
  var s = 2;
  console.log(s);
  ```

  ```js
  function s() {}
  console.log(s);
  s = 2;
  console.log(s);
  ```

  ```js
  // 输出
  // ƒ s() {}
  // 2
  ```

## 49. 如何判断对象相等

较常用 `JSON.strinfyg(obj1) === JSON.stringfy(obj2)`

> [lodash/isEqual](https://lodash.com/docs/4.17.15#isEqual)

## 50. null vs undefined

**undefined**

- 声明但未初始化它，值为 `undefined`
- 访问对象属性或者数组元素不存在的属性或者缩影时，返回 `undefined`
- 放函数没有返回值，默认返回 `undefined`
- 函数的参数没有传递或者没有提供，函数内的对应参数值为 `undefined`

```js
let x;
console.log(x);

const obj = {};
console.log(obj.name);

function fn() {}
console.log(fn());

function add(a, b) {
  return a + b;
}
console.log(add(2));
```

**null**

- 特殊的关键字，表示一个空对象指针
- 通常用于显式的表示一个变量或属性的值是空的，`null` 是一个赋值的操作，用来表示 **没有值** 或者 **空**
- `null` 通常需要开发人员主动分配给变量，而不是自动分配的默认值
- `null` 是原型链的顶层，所有对象都继承自 Object 原型对象，Object 原型对象的原型是 `null`；

```js
const a = null;
console.log(a);

const obj = { a: 1 };
const proto = obj.__proto__;
console.log(proto.__proto__); // null
```

## 51. 用 setTimeout 来实现倒计时，与 setInterval 的区别？

```js
// setTimeout
const countDown = count => {
  setTimeout(() => {
    count--;
    if (count > 0) countDown(count);
    else {
      console.timeEnd("a");
      console.log("ended");
    }
  }, 1000);
};
console.time("a");
countDown(10);
// a: 10099.882080078125 ms
```

```js
// setInterval
let count = 10;
console.time("a");
let timer = setInterval(() => {
  count--;
  if (count <= 10) {
    console.timeEnd("a");
    clearInterval(timer);
    timer = null;
  }
}, 1000);
```

- `setTimeout`: 每隔一秒生成一个任务，等待一秒后执行，执行完成后，再生成下一个任务，等待一秒后执行，如此循环，所以上面任务时间间隔保证是 1 秒；
- `setInterval`: 无视执行时间，每隔一秒往任务队列里添加一个任务，等待一秒后执行，这样会导致任务执行间隔小于 1 秒，甚至任务堆积

**注意**: `setInterval` 中当任务执行时间大于任务间隔时间，会导致消费赶不上生产。

## JS 事件循环机制 - 宏任务微任务

1. 同步任务直接执行
2. 遇到微任务-放到微任务队列（`Promise.then`/`process.nextTick`等等）
3. 遇到宏任务-放到宏任务队列（`setTimeout`/`setInterval`等等）
4. 执行完所有同步任务
5. 执行微任务队列中的任务
6. 执行宏任务队列中的任务

```js
console.log(1);
Promise.resolve().then(() => {
  console.log(2);
  setTimeout(() => {
    console.log(3);
  }, 0);
});
setTimeout(() => {
  console.log(4);
  new Promise(resolve => {
    console.log(5);
    resolve();
  }).then(() => {
    console.log(6);
  });
}, 0);
console.log(7);
```

<details>
<summary>打印结果？</summary>
1,7,2,4,5,6,3</details>

**过程分析**

```js
// 输出 1 7
// 宏任务列表
const macroTaskQueue = [
  {
    console.log(4);
    new Promise((resolve)=> {
      console.log(5);
      resolve()
    }).then(()=> {
      console.log(6)
    })
  }
]
// 微任务列表
const microTaskQueue = [
  {
    console.log(2);
    setTimeout(()=> {
      console.log(3);
    },0)
  }
]

```

```js
// 输出 1 7 2
// 宏任务列表
const macroTaskQueue = [
  {
    console.log(4);
    new Promise((resolve)=> {
      console.log(5);
      resolve()
    }).then(()=> {
      console.log(6)
    })
  }
]
// 微任务列表
const microTaskQueue = []

```

```js
// 输出 1 7 2 4 5
// 宏任务列表
const macroTaskQueue = [
  {
    console.log(3)
  }
]
// 微任务列表
const microTaskQueue = [
  console.log(6)
]

```

```js
// 输出 1 7 2 4 5 6
// 宏任务列表
const macroTaskQueue = [
  {
    console.log(3)
  }
]
// 微任务列表
const microTaskQueue = []

```

```js
// 输出 1 7 2 4 5 6 3
// 宏任务列表
const macroTaskQueue = [];
// 微任务列表
const microTaskQueue = [];
```

## 53. 事件循环进阶（1）

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then(res => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  });
```

**过程分析**

```js
// 第 1 步
// 输出：
// 微任务:
[
  (() => {
    console.log(0);
    return Promise.resolve(4);
  }).then(res => {
    console.log(res);
  }),
  //
  (() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  });
];
// 宏任务:
[];
```

```js
// 第 2 步
// 输出：0
// 处理第一个微任务
(()=> {
  return Promise.resolve().then(()=> {
    return 4
  }).then((res)=> console.log(res) )
})
// 微任务:
[  (() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  });];
// 宏任务:
[];
```

```js
// 第 3 步
// 输出：
// 处理第一个微任务
(()=> {
  return Promise.resolve().then(()=> {
    return 4
  }).then(x=> {
    return x;
  }).then((res)=> console.log(res) )
})
// 微任务:
[(() => {
  console.log(1);
})
.then(() => {
  console.log(2);
})
.then(() => {
  console.log(3);
})
.then(() => {
  console.log(5);
});];
// 宏任务
[];
```

```js
// 第 4 步
// 输出：0
// 微任务:
[(() => {
  console.log(1);
})
.then(() => {
  console.log(2);
})
.then(() => {
  console.log(3);
})
.then(() => {
  console.log(5);
});
//
(()=> {
    return 4
  }).then(x=> {
    return x;
  }).then((res)=> console.log(res) )
];
// 宏任务
[];
```

```js
// 第 5 步
// 输出：0 1
// 微任务
[
  (() => {
    return 4;
  })
    .then(x => {
      return x;
    })
    .then(res => console.log(res)),
  //
  (() => {
  console.log(2);
})
.then(() => {
  console.log(3);
})
.then(() => {
  console.log(5);
});
];
// 宏任务
[];
```

```js
// 第 6 步
// 输出：0 1
// 微任务
[
  (() => {
    console.log(2);
  })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(5);
    }),
  //
  (() => {
    return 4;
  }).then(res => console.log(res)),
];
// 宏任务
[];
```

```js
// 第 7 步
// 输出：0 1 2
// 微任务
[
  (() => {
    return 4;
  }).then(res => console.log(res)),
  //
  (() => {
    console.log(3);
  }).then(() => {
    console.log(5);
  }),
];
// 宏任务
[];
```

```js
// 第 8 步
// 输出：0 1 2
// 微任务
[
  (() => {
    console.log(3);
  }).then(() => {
    console.log(5);
  }),
  //
  () => {
    console.log(4);
  },
];
// 宏任务
[];
```

```js
// 第 9 步
// 输出：0 1 2 3
// 微任务
[
  () => {
    console.log(4);
  },
  () => {
    console.log(5);
  },
];
// 宏任务
[];
```

```js
// 第 10 步
// 输出：0 1 2 3 4 5
// 微任务
[];
// 宏任务
[];
```

## 54. 事件循环进阶（2）

```js
const first = () =>
  new Promise(resolve => {
    console.log(3);
    let p = new Promise(resolve => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
        console.log(p);
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then(arg => {
      console.log(arg);
    });
  });

first().then(arg => {
  console.log(arg);
});

console.log(4);
```

**过程分析**

1. 第一步

输出 2 7 4

```js
const micro = [
  p.then(arg => {
    console.log(arg);
  }),

  first.then(arg => {
    console.log(arg);
  }),
];

const macro = [
  () => {
    console.log(5);
    resolve(6);
    console.log(p);
  },
];
```

2. 第二步

执行：

```js
p.then(arg => {
  console.log(arg);
});
```

输出 3 7 4 1

```js
const micro = [
  first.then(arg => {
    console.log(arg);
  }),
];

const macro = [
  () => {
    console.log(5);
    resolve(6);
    console.log(p);
  },
];
```

3. 第三步

执行：

```js
first.then(arg => {
  console.log(arg);
});
```

输出 3 7 4 1 2

```js
const micro = [];

const macro = [
  () => {
    console.log(5);
    resolve(6);
    console.log(p);
  },
];
```

4. 第四步

执行：

```js
() => {
  console.log(5);
  resolve(6);
  console.log(p);
};
```

输出 3 7 4 1 2 5 Promise(1)

```js
const micro = [];
const macro = [];
```

## 55. 事件循环进阶（3）

```js
let a;
let b = new Promise(resolve => {
  console.log(1);
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => {
  console.log(2);
});

a = new Promise(async resolve => {
  console.log(a);
  await b;
  console.log(a);
  console.log(3);
  await a;
  resolve(true);
  console.log(4);
});

console.log(5);
```

涉及 `await` 的题目，可先简单转换为 `Promise` ，便于理解

```js
let a;
let b = new Promise(resolve => {
  console.log(1);
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => {
  console.log(2);
});

a = new Promise(resolve => {
  console.log(a);
  b.then(() => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  });
});

console.log(5);
```

1. 第一步

输出 1 a(undefined) 5

```js
const micro = [
  b.then(() => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  }),
];

const macro = [
  ()=> {
    Promise{b}.resolve();
  },1000);
]
```

2. 第二步

因为 b.then 在 setTimeout 中 resolve，所以这里优先执行

```js
  ()=> {
    Promise{b}.resolve();
  },1000);
```

输出 1 undefined 5 等待一秒

```js
const micro = [
  ()=> {
    console.log(2);
  }).then(() => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  })
];

const macro = []
```

3. 第三步

执行：

```js
  ()=> {
    console.log(2);
  }).then(() => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  })
```

输出 1 undefined 5 等待一秒 2

```js
const micro = [
  () => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  },
];

const macro = [];
```

4. 第四步

执行：

```js
() => {
  console.log(a);
  console.log(3);
  a.then(() => {
    resolve(true);
    console.log(4);
  });
};
```

输出 1 undefined 5 等待一秒 2 Promise{<pending>} 3

```js
const micro = [
   a.then(() => {
    resolve(true);
    console.log(4);
  });
]

const macro = []
```

结束 因为 a.then 需要被 resolve 才会被执行

## 56. 内存泄漏

应用程序中的内存不再被舒勇但是仍然被占用，导致内存消耗逐渐增加，最终可能导致程序性能下降或崩溃。

通常是因为开发者编写的代码未正确释放不再需要的对象或者数组导致的

**特征：**: 程序对内存失去控制

**案例：**

- 意外的全局变量

  ```js
  function fn() {
    obj = {...}
  }
  ```

- 闭包

  闭包可能会无意中持有对不再需要的变量或对象的引用，组织它们被垃圾回收

  ```js
  function createClosure() {
    const data = []; // 大量数据
    return function () {
      // 闭包持有对 data 的引用，即使他不再被使用
      console.log(data);
    };
  }

  const closureFn = createClosure();
  // closureFn 不再被需要时，它仍然保留着 data 的引用，导致内存泄漏
  ```

- 事件监听器

  忘记 remove event listener 可能会导致内存泄漏，因为与监听器相关联的对象将无法被垃圾回收

  ```js
  function createListener() {
    const ele = document.getElementById("some-ele");
    ele.addEventListener("click", () => {});
  }

  createListener();
  // 即使 some-ele 从 dom 中移除，该元素及事件监听器仍将在内存中
  //
  ```

- 循环引用

  对象之间的循环引用会阻止他们被垃圾回收

  ```js
  function createCircleReference() {
    const obj1 = {};
    const obj2 = {};
    obj1.ref = obj2;
    obj2.ref = obj1;
  }

  createCircleReference();
  ```

- `setTimeout`/`setInterval`

  如果没有正确 clear，可能会导致内存泄漏，特别是当回调函数持有对大型对象的引用时

  ```js
  function doSomethingRepeat() {
    const data = []; // 大量数据
    setInterval(() => {
      console.log(data);
    }, 1000);
  }
  doSomethingRepeat();
  ```

## 57. 闭包

**定义**

引用了另一个函数作用域中变量的函数，通常在嵌套函数中发生

**作用**

可以保留其被定义时的作用域，这意味着

- 闭包内部可访问外部函数的局部变量，即使外部函数已执行完毕

**注意**

闭包会使函数内部的变量在函数执行后，仍存在于内存中，知道没有任何引用指向闭包。

若不注意管理闭包，可能会导致内存泄漏

**案例**

```js
const accumulation = function (initial = 0) {
  let result = initial;
  return function () {
    result += 1;
    return result;
  };
};
```

```js
for (var i = 0; i < 10; ++i) {
  (function (index) {
    setTimeout(function () {
      console.log(index);
    }, 1000);
  })(i);
}
```

## 58. 常用的 `console`

1. 普通打印 `console.log('a')`;
2. 按级别打印

   - `console.error('a')`
   - `console.warn('a')`
   - `console.info('a')`
   - `console.debug('a')`

3. 占位符

   - `console.log('%o a', {a:1})`
   - `console.log('%s a', 'ss')`
   - `console.log('%d d', 123)`

4. 打印任何对象，比如 dom 节点 `console.dir(document.body)`
5. 打印表格 `console.table({a: 1,b: 2})`
6. 计数

   ```js
   for (let i = 0; i < 10; ++i) {
     console.count("a");
   }
   ```

7. 分组

   ```js
   console.group("group1");
   console.log("a");
   console.group("group2");
   console.log("b");
   console.groupEnd("group2");
   console.groupEnd("group1");
   ```

8. 计时

   ```js
   console.time("a");
   const now = Date.now();
   while (Date.now() - now < 1000) {}
   console.timeEnd("a");
   ```

9. 断言 `console.assert(1 === 2, 'error')`

10. 调用栈

    ```js
    function a() {
      console.trace();
    }
    function b() {
      a();
    }
    b();
    ```

11. 内存占用 `console.memory`

## 59. 数组去重

1. 使用 Set

   ```javascript
   let array = [1, 2, 3, 2, 4, 1, 5];
   let uniqueArray = [...new Set(array)];
   console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
   ```

2. 使用 filter 和 indexOf

   ```javascript
   let array = [1, 2, 3, 2, 4, 1, 5];
   let uniqueArray = array.filter(
     (item, index) => array.indexOf(item) === index
   );
   console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
   ```

3. 使用 reduce

   ```javascript
   let array = [1, 2, 3, 2, 4, 1, 5];
   let uniqueArray = array.reduce((acc, item) => {
     if (!acc.includes(item)) {
       acc.push(item);
     }
     return acc;
   }, []);
   console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
   ```

4. 使用 forEach 和 includes

   ```javascript
   let array = [1, 2, 3, 2, 4, 1, 5];
   let uniqueArray = [];
   array.forEach(item => {
     if (!uniqueArray.includes(item)) {
       uniqueArray.push(item);
     }
   });
   console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
   ```

5. 使用 Map (适用于对象数组去重)

   ```javascript
   let array = [
     { id: 1, name: "Alice" },
     { id: 2, name: "Bob" },
     { id: 1, name: "Alice" },
   ];
   let uniqueArray = Array.from(
     new Map(array.map(item => [item.id, item])).values()
   );
   console.log(uniqueArray); // 输出: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
   ```

## 60. 数组常用方法

```js
const list = [];
// 遍历
for (let i = 0; i < list.length; i++) {}
for (const key in list) {
}
for (const key of list) {
}
list.forEach(i => {});
list.map(i => {}); // 返回构造后的新数组

// 逻辑判断
list.every(i => {}); // 全部 true 即为 true
list.some(i => {}); // 任一 true 即为 true

// filter
list.filter(i => {}); // 返回 过滤后的数组

// 查找
list.indexOf(); // 返回找到的第一个索引，没找到 -1
list.lastIndexOf(); // 返回最后一个找到的位置，没找到 -1
list.includes(); // 如果找到 返回 true
list.find(); // 如果找到，返回目标值，否则 undefined
list.findIndex(); // 如果找到，返回索引，否则 -1
```

## 61. reduce

```js
const list = [1, 2, 3, 4, 1];

const sum = list.reduce((prev, cur) => prev + cur);
const maxValue = list.reduce((prev, cur) => Math.max(prev, cur));
const uniqArr = list.reduce((prev, cur) => {
  if (prev.indexOf(cur) === -1) {
    prev.push(cur);
  }
  return prev;
}, []);

const reverseStr = Array.from("hello world").reduce((prev, cur) => {
  return `${cur}${prev}`;
}, "");
```

## 62. 如何遍历对象

```js
const obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
  console.log(key, obj[key]);
}

const keys = Object.keys(obj);
keys.forEach(key => {
  console.log(key, obj[key]);
});

const entries = Object.entries(obj);
entries.forEach(([key, value]) => {
  console.log(key, value);
});

Reflect.ownKeys(obj).forEach(key => {
  console.log(key, obj[key]);
});
```

## 63. 创建函数的几种方式

- 函数声明（function declaration）
  函数声明提升，可以再声明之前掉用

  ```js
  function fn() {
    console.log("hello");
  }

  fn();
  ```

- 函数表达式（function expression）
  将函数赋值给变量或者属性，不会提升

  ```js
  var fn = function () {
    console.log("hello");
  };
  fn();

  var greet = function (name) {
    console.log("hello" + name);
  };
  greet("mary");
  ```

- 匿名函数
  没有名称，通常用于回调函数或者临时函数

  ```js
  setTimeout(function () {
    console.log("this is an anonymous function");
  });
  ```

- 箭头函数
  ES6 引入，不能用作构造函数，且没有自己的 `this`,`arguments`,`super`或`new.target`

  ```js
  const greet = () => {
    console.log("hello");
  };

  greet();
  ```

- 构造函数
  可以使用 `Function` 构造函数来创建函数，但这种方式较少用

  ```js
  const greet = new Function("name", "console.log(`hello, ${name}`)");
  ```

- 方法定义

  ```js
  const obj = {
    greet: function () {
      console.log("hello");
    },
  };

  const objSimple = {
    greet() {
      console.log("hello");
    },
  };
  ```

- Generator

  ```js
  function* generateFn() {
    yield "hello";
    yield "world";
  }

  const generator = generateFn();
  console.log(generator.next().value); // hello
  console.log(generator.next().value); // world
  ```

- Async
  ```js
  const greet = async () => {
    const message = await Promise.resolve("hello");
    console.log(message);
  };
  await greet();
  ```

## 64. 创建对象的几种方式

- 对象字面量（object literal）

  ```js
  const obj = {
    name: "xxn",
    age: 1,
    sayHello: function () {
      console.log("hello");
    },
  };
  ```

- 构造函数

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  const person = new Person("xxn", 1);
  ```

- `Object.create`

  ```js
  const person = Object.create(null);
  person.name = "xxn";
  person.age = 1;
  ```

- 工厂函数 （Factory Function）

  ```js
  function createPerson(name, age) {
    return {
      name,
      age,
    };
  }

  const person = createPerson("xxn", 1);
  ```

- class
  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  ```

## 65. 宿主对象/内置对象/原生对象

1. 宿主对象（Host Object）
   宿主对象是由宿主环境(通常是浏览器或者 nodejs)提供的对象。他们不属于 js 的核心，而是根据运行环境提供的功能而存在

   - 浏览器中的 `window`,`document`,`XMLHttpRequest`
   - nodejs 中的 `process`,`global`等

2. 内置对象
   js 本身提供的对象，包括全局对象，数学对象，日期对象，正则表达式对象等。例如：

   - 全局对象 `Math`
   - 日期对象 `Date`

3. 原生对象
   通过构造函数或者字面量方式创建的对象，例如数组，字符串，函数，对象等。

## 66. 如何区分数组和对象

1. **数组（Array）**：

   - 数组是一种有序的集合，其中每个元素都有一个数字型索引。索引从0开始，依次递增。
   - 数组的元素可以是任意类型的数据，包括数字、字符串、对象、甚至其他数组等。
   - 通常用于存储一组相关的数据，比如一组数字、一组字符串等。
   - 在JavaScript中，可以使用方括号 `[]` 来创建数组，或者使用 `new Array()` 构造函数。

   ```javascript
   let myArray = [1, 2, 3, 4, 5]; // 创建数组
   let myArray2 = new Array(3); // 使用构造函数创建一个包含3个元素的数组
   ```

2. **对象（Object）**：

   - 对象是一种键值对的集合，其中每个键（也称为属性）都对应一个值。值可以是任意类型的数据。
   - 对象的键是唯一的，但值可以重复。
   - 对象通常用于表示实体的属性，比如一个人的名字、年龄等。
   - 在 JavaScript 中，对象的字面量形式是使用花括号 `{}`，或者使用 `new Object()` 构造函数。

   ```javascript
   let myObject = { name: "Alice", age: 30, city: "New York" }; // 创建对象
   let myObject2 = new Object(); // 使用构造函数创建一个空对象
   myObject2.name = "Bob"; // 添加属性到对象
   ```

数组是一种有序集合，通常用于存储一组相关的数据；而对象是一种键值对的集合，用于表示实体的属性。

## 67. 什么是类数组（伪数组），如何转为真实的数组

是一种类似数组的对象。具有与数组类似的结构，具有索引和 `length` 属性。但不具有数组对象上的方法。

**常见的类数组：**

- 函数内部的 `arguments`
- DOM 元素列表（例如 `querySelectorAll` 获取的元素集合）
- 一些内置方法（如 `getElementByTagName` 返回的集合）

**类数组转为真实数组的方法：**

1. `Array.from`

   ```js
   const nodeList = document.querySelectorAll("#test");
   const array = Array.from(nodeList);
   ```

2. `Array.prototype.slice.call()`

   ```js
   const nodeList = document.querySelectorAll("#test");
   const array = Array.prototype.slice.call(nodeList);
   ```

3. `Spread`
   ```js
   const nodeList = document.querySelectorAll("#test");
   const array = [...nodeList];
   ```

## 68. 什么是作用域链

js 中用于查找变量或函数的一种机制，当代码中某个变量或者函数不在当前作用域（当前执行上下文），js 引擎会像外层作用域查找，直到找到为止，这种嵌套的作用域链形成了一个作用域层级结构。

## 69. 作用域链如何延长

作用域链的一个重要应用就是闭包。闭包是指函数可以访问其定义时所处的作用域以外的变量。

当一个函数内部定义的函数被外部引用时，闭包就形成了。

这时，内部函数依然可以访问外部函数的作用域，因为他们共享同一个作用域链

**闭包**

```js
function createCounter() {
  var count = 0;
  return function () {
    count++;
    return count;
  };
}

var counter1 = createCounter();
var counter2 = createCounter();

console.log(counter1()); //1
console.log(counter1()); //2

console.log(counter2()); //1

// 每个 counter 具有自己的作用域链，且都延长了 count 的作用域
```

## 70. DOM 的 Attribute 和 Property 的区别

在JavaScript中，DOM（文档对象模型）的Attribute（属性）和Property（属性）之间有一些区别：

1. **Attribute（属性）**：

   - 属性是 HTML 标签上的声明的静态属性，它们定义了HTML元素的初始值。
   - 通过 `getAttribute()` 方法可以获取属性的值，通过 `setAttribute()` 方法可以设置属性的值。
   - 属性值通常在HTML中以字符串形式指定，并且一般与标签的属性相对应，如`<input type="text" id="myInput" value="Hello">`中的`type`、`id`和`value`都是属性。

2. **Property（属性）**：
   - 属性是 DOM 元素的 JavaScript 对象上的动态属性，它们表示了 DOM 元素的当前状态。
   - 通过直接访问 JavaScript 对象的属性来获取和设置属性值。
   - 属性的值通常是对应属性类型的 JavaScript 对象，例如对于 input 元素的`value`属性，它可以是字符串、数字等类型。`

## 71. DOM 创建/添加/移除/复制/查找

1. 创建

   ```js
   const newEle = document.createElement("div");
   const newTextNode = document.createTextNode("Hello");
   const fragment = document.createDocumentFragment();
   ```

2. 添加

   ```js
   const newEle = document.createElement("div");
   // 添加子节点
   parentEle.appendChild(newEle);
   // 在参考节点前插入
   parentEle.insertBefore(newEle, referenceEle);
   ```

3. 移除

   ```js
   parentEle.removeChild(childEle);
   ```

4. 复制

   ```js
   const cloneEle = originalNode.cloneNode(true);
   ```

5. 查找

   ```js
   // id
   const ele = document.getElementById("id");
   // 选择器
   const ele = document.querySelector(".class");

   // 节点遍历
   const firstChild = parentEle.firstChild;
   ```

## 72. DOM 事件模型

DOM（文档对象模型）事件模型是浏览器用来处理和管理网页上的事件的机制。它定义了事件如何传播、事件处理程序如何附加以及如何在事件中传递数据。DOM 事件模型主要包括三个阶段：捕获阶段、目标阶段和冒泡阶段。

### 捕获阶段（Capturing Phase）

- 在捕获阶段，事件从文档的根节点开始，向下传播到目标元素。
- 这时可以在事件捕获的路径上拦截事件。
- 捕获阶段主要用于为事件添加前置处理逻辑。

### 目标阶段（Target Phase）

- 当事件到达目标元素时，进入目标阶段。
- 在目标元素上触发事件处理程序。
- 此时处理的事件处理程序不区分捕获或冒泡。

### 冒泡阶段（Bubbling Phase）

- 在冒泡阶段，事件从目标元素开始向上传播回文档的根节点。
- 这时可以在事件冒泡的路径上拦截事件。
- 冒泡阶段主要用于为事件添加后续处理逻辑。

### 事件绑定和处理

在 JavaScript 中，可以通过 `addEventListener` 方法为 DOM 元素添加事件处理程序。

```javascript
// 添加一个点击事件处理程序
element.addEventListener(
  "click",
  function (event) {
    console.log("Element clicked!");
  },
  false
); // false 表示在冒泡阶段处理事件
```

参数说明：

1. **事件类型**（如 'click'、'mouseover' 等）。
2. **事件处理程序函数**，在事件触发时执行的代码。
3. **useCapture**（可选），布尔值，指示事件处理程序是否在捕获阶段触发。默认值为 `false`（即在冒泡阶段触发）。

### 事件委托

事件委托是一种将事件处理程序添加到父元素上，而不是直接添加到多个子元素上的技术。利用事件冒泡机制，可以有效地管理大量子元素的事件。

```javascript
// 为父元素添加事件处理程序
parentElement.addEventListener("click", function (event) {
  if (event.target && event.target.matches("childSelector")) {
    console.log("Child element clicked!");
  }
});
```

### 停止事件传播

在某些情况下，可能需要阻止事件传播。可以使用 `event.stopPropagation()` 方法停止事件在 DOM 树中的传播。

```javascript
element.addEventListener("click", function (event) {
  event.stopPropagation(); // 停止事件传播
  console.log("Propagation stopped.");
});
```

### 默认行为和 preventDefault

有些事件会触发浏览器的默认行为（如表单提交、链接跳转）。可以使用 `event.preventDefault()` 方法阻止这些默认行为。

```javascript
linkElement.addEventListener("click", function (event) {
  event.preventDefault(); // 阻止默认的链接跳转行为
  console.log("Default action prevented.");
});
```

## 73. 事件三要素

DOM 事件模型中的事件三要素是事件的核心组成部分，它们分别是事件类型、事件目标和事件处理程序。这些要素决定了事件的行为、触发对象以及响应方式。以下是对每个要素的详细解释：

1. 事件类型（Event Type）

   事件类型指的是事件的具体种类，它决定了事件触发的条件。例如，鼠标点击、键盘输入、页面加载等。常见的事件类型包括：

   - **鼠标事件**：
     - `click`：当用户点击某个元素时触发。
     - `dblclick`：当用户双击某个元素时触发。
     - `mouseover`：当鼠标指针移到某个元素上方时触发。
     - `mouseout`：当鼠标指针移出某个元素时触发。
     - `mousedown`：当用户按下鼠标按钮时触发。
     - `mouseup`：当用户释放鼠标按钮时触发。
   - **键盘事件**：
     - `keydown`：当用户按下键盘按键时触发。
     - `keypress`：当用户按下并按住键盘按键时触发。
     - `keyup`：当用户释放键盘按键时触发。
   - **表单事件**：
     - `submit`：当表单提交时触发。
     - `change`：当表单元素的值改变时触发。
     - `focus`：当元素获得焦点时触发。
     - `blur`：当元素失去焦点时触发。
   - **窗口事件**：
     - `load`：当页面加载完成时触发。
     - `resize`：当窗口大小变化时触发。
     - `scroll`：当页面滚动时触发。

2. 事件目标（Event Target）

   事件目标是事件触发的具体元素。即用户与之交互并触发事件的元素。例如，用户点击按钮时，按钮就是事件的目标。事件对象中可以通过 `event.target` 属性访问事件目标。

   ```javascript
   document
     .getElementById("myButton")
     .addEventListener("click", function (event) {
       console.log("Event target:", event.target); // 输出触发事件的元素
     });
   ```

3. 事件处理程序（Event Handler）

   事件处理程序是当事件触发时执行的函数。它包含处理事件的逻辑。事件处理程序可以通过 `addEventListener` 方法附加到目标元素上。

   ```javascript
   document
     .getElementById("myButton")
     .addEventListener("click", function (event) {
       alert("Button clicked!");
     });
   ```

## 73. 如何绑定事件，解除事件

**绑定事件**

```js
element.addEventListener("click", () => {});

element.addEventListener("keydown", () => {});
```

**解除事件**

```js
element.removeEventListener("click", () => {});

element.removeEventListener("keydown", () => {});
```

## 75. 事件冒泡与事件捕获的区别

捕获是向下走，从根节点开始，向下去捕获到目标元素；（可通过 `addEventListener` 的第三个参数，设为 true 来开启事件捕获）

冒泡是向上走，从目标元素开始，逐级向上冒泡到根节点（是默认的事件传播方式，可通过 `stopPropagation` 来阻止冒泡）

见 [事件模型](#72-dom-事件模型)

## 76. 事件委托

见 [事件模型](#事件委托)

**优点**

1. 性能优势：可减少事件处理程序的数量
2. 动态元素：适用于动态生成的元素，因为无需为新添加的元素单独绑定事件，而是在祖先元素上继续使用相同的事件处理程序
3. 代码间接性
4. 处理多个事件类型

## 77. JS 动画 vs css3 动画

|          | 优点                                                                              | 缺点                                                                 |
| -------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| JS 动画  | 更可控，可使用复杂的逻辑/灵活性高/可使用 `requestAnimationFrame` 实现更高级的动画 | 性能较差/实现较为复杂                                                |
| CSS 动画 | 性能好，可利用 GPU 加速/简洁易用/逻辑分离                                         | 控制力弱，无法精细控制每一帧，动画效果有限/交互能力有限，需要配合 js |

**适用场景**

- **CSS3 动画** 适合简单的过渡和动画效果，如元素的淡入淡出、位移、缩放、旋转等。例如：

  ```css
  .fade-in {
    animation: fadeIn 2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  ```

- **JavaScript 动画** 适合复杂、动态交互和高需求的动画效果。例如：

  ```javascript
  const element = document.getElementById("myElement");
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    element.style.transform =
      "translateX(" + Math.min(progress / 10, 200) + "px)";
    if (progress < 2000) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
  ```

**小结**

- **CSS3 动画**：适合简单、性能要求高的动画，实现简单，代码易于维护。
- **JavaScript 动画**：适合复杂、需要高灵活性和交互性的动画，可以实现更复杂的效果。

## 78. document.write vs innerHtml

1. 输出位置

   - `document.write` 将内容直接写入到页面，会覆盖已存在的内容。如果它在页面加载后调用，会覆盖整个页面的内容，因此不建议在文档加载后使用它。
   - `innerHTML` 是 DOM 元素的属性，可用来设置嚯获取元素的 HTML 内容。

2. 用法

   - `document.write` 通常用于在页面加载过程重生成 HTML 内容。不太推荐使用，不宜维护
   - `innerHTML` 通常用户通过 js 动态更改特定元素的内容。更加灵活

3. DOM 操作
   - `document.write` 不是 DOM 操作，仅用于输出文本到页面
   - `innerHTML` 是 DOM 操作

## 80. mouseover vs mouseenter

- 触发时机
  - `mouseover` 鼠标指针从一个元素的外部进入到元素的范围内触发该事件，他会在进入时触发一次，然后在内部元素（有子元素）移动时多次触发
  - `mouseenter` 鼠标指针从一个元素的外部进入到元素的范围内触发该事件，他只会在进入时触发一次，内部移动不会多次触发
- 冒泡
  - `mouseover` 会冒泡，也就是说鼠标进入子元素时，父元素的 mouseover 事件也会触发
  - `mouseenter` 不会冒泡，进入特定元素才会触发
- 应用场景
  - `mouseover` 监听鼠标进入和离开，特别是当需要处理子元素的情况
  - `mouseenter` 更常用于只需要鼠标第一次进入的监听，通常用于菜单，工具提示等忽略子元素的场景

## 81. 元素拖动

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>元素拖动实例</title>
    <style type="text/css">
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }

      .draggable {
        width: 100px;
        height: 100px;
        background-color: pink;
        color: black;
        text-align: center;
        line-height: 100px;
        cursor: grab;
        user-select: none;
        position: absolute;
      }
    </style>
  </head>
  <body>
    <div class="draggable" id="draggableEle">拖动我</div>

    <script>
      const draggableEle = document.getElementById("draggableEle");
      let offsetX, offsetY;
      let isDragging = false;
      draggableEle.addEventListener("mousedown", event => {
        isDragging = true;
        offsetX = event.clientX - draggableEle.getBoundingClientRect().left;
        offsetY = event.clientY - draggableEle.getBoundingClientRect().top;
        draggableEle.style.cursor = "grabbing";
      });
      draggableEle.addEventListener("mousemove", event => {
        if (!isDragging) return;
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        draggableEle.style.left = newX + "px";
        draggableEle.style.top = newY + "px";
      });
      draggableEle.addEventListener("mouseup", event => {
        isDragging = false;
        draggableEle.style.cursor = "grab";
      });
    </script>
  </body>
</html>
```

## 82. script 的 async vs defer

- 默认（无 `async` 或 `defer`）: 浏览器会按照标签在 HTML 中的顺序，阻塞页面渲染，下载后并同步加载脚本，脚本会阻塞页面的加载和渲染。

- `async`: 脚本将异步下载并执行，不会阻塞页面的加载和渲染。脚本将在下载完成后立刻执行，而不管其在文档中的位置。

- `defer`: 脚本会异步下载，但不会立刻执行。它将在文档解析完成（DOMContentLoaded 事件之前）时按照他们在文档中的顺序执行。

## ES6 的继承和 ES5 的继承的区别

**ES6**：

1. `Class` 和 `extends` 关键字
2. `constructor` 构造函数，定义类的初始化逻辑，并通过 `super` 调用父类的构造函数。
3. 方法定义：类中的方法不需要使用原型链，而是可以直接定义在类内部
4. `super` 用于在子类中调用父类的方法，包括构造函数和普通方法

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log("my name is" + this.name);
  }
}

class Dog extends Animal {
  constructor(name, bread) {
    super(name);
    this.bread = bread;
  }

  speak() {
    console.log("barks" + this.name);
  }
}

const myDog = new Dog("dahuang", "golden");
myDog.speak();
```

**ES5**:

- 原型链继承：

  ```js
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.speak = function () {
    console.log(this.name + "make a sound");
  };

  function Dog(breed) {
    this.breed = breed;
  }

  Dog.prototype = new Animal("Unkown");

  const myDog = new Dog("Golden");
  myDog.speak();
  ```

  - 缺点1 属性共享：子类共享父类原型上的属性，一旦父类有引用类型，其中一个实例修改了这个引用类型的属性值，会影响所有其他实例
  - 缺点2 不能传递参数：无法向弗雷构造函数传参，因为父类构造函数已经被调用

- 构造函数继承

  ```js
  function Animal(name) {
    this.name = name;
  }

  function Dog(name, breed) {
    Animal.call(this.name);
    this.breed = breed;
  }

  const myDog = new Dog("dahuang", "Golden");
  console.log(myDog.nam);
  ```

  在这个实例中，`Dog` 构造函数内部调用了 `Animal` 构造函数，从而继承了 `Animal` 的属性

  - 缺点1 属性继承：构造函数继承只能继承父类的属性，而没有继承父类的方法。子类无法访问父类原型上的方法
  - 缺点2 属性复制：将属性复制到子类实例中，而不是通过原型链共享。导致内存浪费，特别是创建大量实例时。
  - 不能继承方法：子类无法继承父类原型上的方法

- 寄生组合继承

  结合了构造函数继承和原型继承，通过在子类构造函数内部调用父类构造函数来继承属性，然后通过 `Object.create()` 方法来继承父类原型上的方法。

  ```js
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.speak = function () {
    console.log(this.name + "makes a sound");
  };

  function Dog(name, breed) {
    // 使用构造函数继承，继承属性
    Animal.call(this, name);
    this.breed = breed;
  }

  // 使用 Object.create 继承原型
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog; // 修复 constructor 引用

  Dog.prototype.speak = function () {
    console.log(this.name + "barks");
  };
  ```

  避免了原型链中属性共享的问题，并允许灵活定义子类的构造函数和方法

## 84. Promise

js 中处理 **异步操作** 的一种解决方案，尤其是在处理回调地狱问题上。

三种状态：

- pending
- fulfilled
- rejected

模拟实现：

```js
function MyPromise(executor) {
  // 初始化 Promise 的状态和结果
  this._state = "pending";
  this._value = undefined;

  // 回调函数数组，用于存储成功和失败的回调
  this._callback = [];

  // 定义 resolve
  const resolve = value => {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = value;
      this._callback.forEach(item => item.onFulfilled(value));
    }
  };

  // 定义 reject
  const reject = reason => {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = reason;
      this._callback.forEach(item => item.onRejected(reason));
    }
  };

  // 执行 executor, 传入 resolve 和 reject 作为参数
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if ((this._state = "fulfilled")) {
    onFulfilled(this._value);
  } else if (this._state === "rejected") {
    this.onRejected(this._value);
  } else if (this._state === "pending") {
    this._callback.push({
      onFulfilled,
      onRejected,
    });
  }
};

// 实例

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("成功"), 1000);
});

P.then(
  result => {
    console.log(result);
  },
  error => {
    console.log(error);
  }
);
```

## 85. 如何解决异步回调地狱

**定义：** 嵌套的回调函数中处理多个异步操作，导致代码变得混乱和难以维护的情况

```js
asyncFunc1(function(result1) {​
  asyncFunc2(result1, function(result2) {​
    asyncFunc3(result2, function(result3) {​
      asyncFunc4(result3, function(result4) {​
        // 更多的嵌套回调...​
      });​
    });​
  });​
});
```

**解决方案：**

- Promise: 链式调用以便清晰的处理异步操作

  ```js
  asyncFunction()
    .then(result => {
      return anotherAsyncFunction(result);
    })
    .then(finalResult => {
      // 处理最终结果
    })
    .catch(error => {
      // 处理错误
    });
  ```

- async/await: ES6 的异步处理发过誓，允许你使用类似同步代码的方式来处理异步操作

  ```js
  async function fetchData() {
    try {
      const res1 = await asyncFn1();
      const res2 = await asyncFn2(res1);
      // 处理结果
    } catch (error) {
      // 处理 error
    }
  }
  ```

- generators/yield: 可暂停和可恢复的异步代码

## 86. 链式调用的实现方式

```js
class Calculator {
  constructor() {
    this.value = 0;
  }

  add(num) {
    this.value += num;
    return this; // 返回自身，以实现链式调用
  }

  minus(num) {
    this.value -= num;
    return this;
  }
  multiply(num) {
    this.value *= num;
    return this;
  }
  divide(num) {
    this.value /= num;
    return this;
  }

  getValue() {
    return this.value;
  }
}

const calculator = new Calculator();

const res = calculator().add(5).minus(1).multiply(3).divide(4).getValue();
```

## 87. new 操作符内在逻辑

```js
function myNew(constructor, ...args) {
  // 1. 创造一个新对象并连接到构造函数的原型
  const obj = Object.create(constructor.prototype);
  // 2. 将构造函数的 this 指向新对象并执行构造函数
  const result = constructor.apply(obj, args);
  // 3. 确保构造函数返回一个对象，如果没有则返回新对象
  return result instanceof Object ? result : obj;
}

function Person(name) {
  this.name = name;
}
const p1 = myNew(Person, "xxn");
console.log(p1.name);
```

## 88. bind vs apply vs call, 以及内在实现

### `call`

- 用于调用一个函数，显示指定函数内部的 `this` 指向，参与以**列表**的形式传递给函数
- 语法 `func.call(thisArg, arg1, arg2, ...)`
- 直接调用函数，立即执行
- 模拟实现

  ```js
  Function.prototype.myCall = function (context, ...args) {
    // 1. 如果没有传入上下文，则默认为全局对象
    context = context || window;
    // 创建一个唯一的键，以避免属性名冲突
    const uniqueID = Symbol();
    // 在上下文中添加属性，将函数赋值给这个属性
    context[uniqueID] = this;
    // 调用函数
    const res = context[uniqueID](...args);
    // 删除属性
    delete context[uniqueID];
    // 返回函数执行结果
    return res;
  };

  function greet(message) {
    console.log(`${message}, ${this.name}`);
  }

  const person = { name: "xxn" };

  greet.myCall(person, "Hello");
  greet.call(person, "Hello");
  ```

### `apply`

- 用于调用一个函数，显示指定函数内部的 `this` 指向，参与以**数组**的形式传递给函数
- 语法 `func.call(thisArg, [arg1, arg2, ...])`
- 直接调用函数，立即执行
- 模拟实现

  ```js
  Function.prototype.myApply = function (context, args) {
    // 1. 如果没有传入上下文，则默认为全局对象
    context = context || window;
    // 创建一个唯一的键，以避免属性名冲突
    const uniqueID = Symbol();
    // 在上下文中添加属性，将函数赋值给这个属性
    context[uniqueID] = this;
    // 调用函数
    const res = context[uniqueID](...args);
    // 删除属性
    delete context[uniqueID];
    // 返回函数执行结果
    return res;
  };

  function greet(message) {
    console.log(`${message}, ${this.name}`);
  }

  const person = { name: "xxn" };

  greet.myApply(person, ["Hello"]);
  greet.apply(person, ["Hello"]);
  ```

### `bind`

- `bind` 方法不会立即调用函数，而是创建一个新的函数，该函数的 `this` 指向由 bind 的第一个参数执行，参数以列表的形式传递给函数。
- 语法 `newFunc = func.bind(thisArg, arg1, arg2, ...)`
- 不会立即执行函数，而是返回一个新函数
- 模拟实现

  ```js
  Function.prototype.myBind = function (context, ...args) {
    const func = this;
    return function (...newArgs) {
      return func.apply(context, args.concat * newArgs);
    };
  };

  function greet(message) {
    console.log(`${message}, ${this.name}`);
  }

  const person = { name: "xxn" };

  const myBoundGreet = greet.myBind(person, "hi");
  myBoundGreet();

  const boundGreet = greet.bind(person, "hi");
  boundGreet();
  ```

## 89. Ajax 避免浏览器缓存方法

Http 请求时，浏览器会缓存响应数据，以提高性能。

- 添加时间戳或随机参数

```js
const timestamp = new Date().getTime();
const url = "data.json?timestamp=" + timestamp;
```

- 禁用缓存 header, 添加 `Cache-Control: no-cache` 或者 `Pragma: no-cache` 告诉服务器不用缓存

  ```js
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.send();
  ```

- 设置响应头: 服务器可在 response header 中设置缓存控制信息，以告诉浏览器不用缓存

  ```text
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
  ```

- 使用 POST？？？: GET 请求通常更容易被六拉你去缓存，而 POST 请求通常不会被缓存。如果没有特殊需求，可以考虑 POST

## 90. `eval` 的功能和危害

用于执行包含 js 代码的字符串，动态执行字符串内的 js 代码，例如

```js
const x = 1;
const y = 2;
const code = "x + y";
const res = eval(code);
```

**危害：**

1. 安全风险：允许执行来自不受信任来源的代码。如果恶意代码被注入到 `eval` 中
2. 性能问题：运行时解析和执行代码。
3. 可读性差：入参为字符串的代码，难以分析和调试
4. 移植性问题：不同 js 引擎对 `eval` 的实现可能有差异，导致代码在不同环境中出现问题
5. 限制代码优化：难以进行静态分析和优化

## 91. 惰性函数

指在第一次调用是执行特定操作，之后将函数重写或修改，以便在后续的调试中直接返回缓存的结果，而不再执行该操作。通常用于性能优化，以避免重复执行开销较大的操作。

```js
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    addEvent = function (element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else if (element.attachEvent) {
    addEvent = function (element, type, handler) {
      element.attachEvent("on" + type, handler);
    };
  } else {
    addEvent = function (element, type, handler) {
      element["on" + type] = handler;
    };
  }
  return addEvent(element, type, handler);
}

// 栗子
const btn = document.getElementById("btn");
addEvent(btn, "click", function () {
  console.log("click btn");
});
```

## 92. JS 监听对象属性的改变

- `Object.defineProperty`

  ```js
  const person = {
    firstName: "john",
    lastName: "dow",
  };

  Object.defineProperty(person, "firstName", {
    get() {
      return this._firstName;
    },
    set(value) {
      this._firstName = value;
      console.log("firstName 改变为:", value);
    },
    configurable: true,
  });

  person.firstName = "mary"; // firstName 改变为: mary
  ```

- `Proxy`

  ```js
  const person = {
    firstName: "john",
    lastName: "dow",
  };

  const handler = {
    get(target, property) {
      console.log("访问了：", property);
      return target[property];
    },
    set(target, property, value) {
      console.log("设置了：", property, "为：", value);
      target[property] = value;
      return true;
    },
  };

  const proxyPerson = new Proxy(person, handler);
  console.log(proxyPerson.firstName); // 访问了： firstName
  proxyPerson.lastName = "mick"; // 设置了： lastName 为： mick
  ```

## 93. `prototype` vs `__proto__`

- `prototype`

  - 函数对象（构造函数）特有属性，每个函数对象都有一个`prototype`，他是一个对象
  - 通常用于定义共享的属性和方法，可以被构造函数创建的实例对象所继承。可以在构造函数的`prototype`上定义方法，以便多个实例对象共享这些方法，从而节省内存。
  - 主要用于原型集成，他是构造函数和实例对象之间的链接，用于共享方法和属性。

- `__proto__`

  - 每个对象（包括函数对象和普通对象）都具有的属性，只想对象的原型，也就是他的父对象
  - 用于实现原型链，当你访问一个对象的属性时，如果对象本社没有这个属性，js 引擎慧眼和原型链（通过`__proto__`属性）向上插好，知道好到属性或和到达原型链的顶部（通常是 `Object.prototype` ）。
  - 主要用于对象之间的继承，建立了对象之间的原型关系

```js
// 创建一个构造函数
function Person(name) {
  this.name = name;
}
// 在构造函数的 prototype 上定义一个方法
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
};

// 创建一个实例对象
const person1 = new Person("Tom");

// 访问实例对象的属性和方法
console.log(person1.name);
person1.sayHello();

// 查看实例对象的 __proto__ 属性，他指向构造函数的 prototype 对象
console.log(person1.__proto__ === Person.prototype);
```

## 94. 如何理解箭头函数没有 this

所谓的 `this` ，不是箭头函数中没有 `this` 这个变量，而是箭头i函数不绑定自己的 `this`，它们会捕获其所爱上下文的 `this` 值，作为自己的 `this`。这对于回校函数特别有用，可以避免传统函数中常见的 `this` 指向问题。例如在对象方法中使用箭头函数可以确保 `this` 保持一致

## 95. 上下文与 this 指向

```js
globalThis.a = 100;
function fn() {
  return {
    a: 200,
    m: function () {
      console.log(this.a);
    },
    n: () => {
      console.log(this.a);
    },
    k: function () {
      return function () {
        console.log(this.a);
      };
    },
  };
}

const fn0 = fn();
fn0.m(); // 200 this 指向 {a, m, n}
fn0.n(); // 100 this 指向 globalThis
fn0.k()(); // 100 this 指向 globalThis

const context = { a: 300 };
const fn1 = fn.call(context); // 改变箭头函数 this 指向
fn1.m(); // 200 this 指向 {a, m, n}
fn1.n(); // 300 this 指向 context
fn1.k()(); // 300 this 指向 context
```

## 97. 上下文与 this 指向 2

```js
let length = 10;
function fn() {
  return this.length + 1;
}

const obj = {
  length: 5,
  test1: function () {
    return fn();
  },
};

obj.test2 = fn;
console.log(obj.test1()); // window 窗口数量
console.log(fn() === obj.test2()); // false
```

## 98. 去除首尾空格

`str.trim()`

## 99. Symbol 特性与作用

1. 唯一性，即使有相同的描述字符串，也不想等
2. 不可枚举：不会出现在 `for...in` 循环中
3. 用作属性名：主要用途是作为对象属性的键，以确保属性的唯一性
4. 常量：通常用来定义常量，以避免意外的修改值

## 100. String 的 starstwith vs indexof

- startsWith:

  - 字符串对象的方法，用于检查字符串是否以指定的子字符串开始。
  - 返回 bool
  - 可接收两个参数，第一个参数是要查找的子字符串，第二个可选参数表示开始搜索的位置

- indexOf:
  - 字符串对象的方法，用于查找子字符串在字符串中第一次出现的位置
  - 返回子字符串在字符串中的索引位置，没找到就返回 -1
  - 可接收两个参数，第一个参数是要查找的子字符串，第二个可选参数表示开始搜索的位置

## 101. 字符串转数字

```js
const num1 = parseInt("123");

const num2 = parseFloat("123.456");

const num3 = Number("123");

const num4 = +"123";
```

## 102. Promise 和 async/await

- Promise
  一种用于处理异步操作的对象。代表了一个异步操作的最终完成或者失败，并允许在异步操作完成后执行相关代码

- async/await
  一种构建在 Promise 之上的语法糖。ES8 引入的特性，旨在简化异步代码的编写和理解。asynd 函数返回一个 Promise，允许在函数内部使用 await 等待异步操作完成

**关系**

- async 函数返回一个 Promise 对象。意味着可在 async 函数内使用 await 来等待一个 Promise 对象的完成。
- async/await 是一种更直观的方式来处理 Promise，可避免嵌套的回调函数

## 103. Array.prototype.sort 在 v8 的实现机制

**知识点：默认情况下都会把数组项，转换为 字符串 进行比较**

_v8 版本查看方式：chrome://version/_

- 5.9 版本以前，用 JavaScript 语言实现（不稳定）

  > https://github.com/v8/v8/blob/5.9.221/src/js/array.js

  - 数组项 0~10：插入排序
  - 数组项 10~1000：常规快速排序
  - 数组项大于 1000：优化快速排序（）快排中间值通过多个中间值求得

- 7.6版本以后：用 Torque 语言实现（稳定）

  > https://github.com/v8/v8/blob/main/third_party/v8/builtins/array-sort.tq

  采用 timsort 算法实现

## 104. JS 装箱机制（auto boxing）

```js
const a = 1;
console.log(a.__proto__ === Number.prototype); // true
consolo.log(a instanceof Number); // false
```

<details>
<summary>
q: 为什么上述代码第二行输出 true，第三行输出 false

</summary>
首先，基础类型是没有 <code>__proto__</code> 的，第二行之所以会输出 true，是因为触发了 js 的装箱机制，当一个基础类型尝试访问 <code>__proto__</code> 的时候，js 会把基础类型临时装箱，理解为 <code>const a = new Number(1)</code> , 所以第二行会输出 true；
而第三行没有触发装箱机制，因此输出 false
</details>

详见 [JavaScript 的装箱机制（Boxing）和拆箱机制（Unboxing)](/posts/boxing-and-unboxing)

## 105. 函数传值

```js
function test(m) {
  m = { v: 50 };
  console.log(m, "inner");
}

var m = { v: 30 };
test(m); //  {v:50}'inner'
console.log(m.v, "outer"); // 30 'outer'
```

js 中，对象是按引用传递的。在 `test` 函数中，m 参数被重新复制 `{v:50}`, 但这个只是对局部变量 m 的修改，不会影响外部变量

## 106. 不同类型宏任务的优先级

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="test">测试</button>
    <script type="text/javascript">
      function wait(time) {
        const start = Date.now();
        while (Date.now() - start < time) {}
      }

      document.getElementById("test").addEventListener("click", () => {
        console.log("click");
      });

      setTimeout(() => {
        console.log("setTimeout");
      }, 0);

      wait(5000); // 阻塞页面 5s
    </script>
  </body>
</html>
```

当页面初始化，生成了一个延迟类宏任务。则色页面 5s，而在这 5s 内，点击 test 按钮，新创建了交互类型的宏任务，而交互类型的宏任务优先级要高于延时类型，因此最终页面会先输出 'click'，再输出 'setTimeout'
