---
title: 面试计划
author: zhenyounide
pubDatetime: 2025-04-02T05:06:31Z
slug: interview-plan
featured: false
draft: true
tags:
  - interview
description: ""
---

## 前端基础

### Html

#### BOM 和 DOM?

#### 前端怎么获取页面上哪个元素是最多的?

#### requestAnimationFrame

### css 几种解决方案的对比

#### flex: 1 是什么意思?

`flex: 1 1 0%;` flex-grow: 1: 根据剩余空间拓展； flex-shrink: 1: 按比例收缩； flex-basic: 初始大小为 0%，再根据前面两个调整

#### BFC

### js

#### 浅拷贝和深拷贝?

基础类型，这类数据类型在内存中占据固定大小，保存在栈内存中。拷贝其实就是一个赋值，赋真正值的过程
引用类型的数据存储在栈中的是对象的引用地址，而真实的数据存放在堆内存中。
**浅拷贝**:

- 浅拷贝只复制对象的第一层属性。
- 基本数据类型，直接复制值。
- 引用数据类型（如对象或数组），只复制引用地址，拷贝后的对象与原对象共享同一块内存。

1. 使用 `Object.assign`: 浅拷贝

   ```javascript
   const obj = { a: 1, b: { c: 2 } };
   const shallowCopy = Object.assign({}, obj);
   shallowCopy.b.c = 3;
   console.log(obj.b.c); // 输出 3，原对象被影响
   ```

2. 使用扩展运算符: 浅拷贝
   ```javascript
   const obj = { a: 1, b: { c: 2 } };
   const shallowCopy = { ...obj };
   shallowCopy.b.c = 3;
   console.log(obj.b.c); // 输出 3，原对象被影响
   ```
3. [].concat(arr), arr.slice(0): 浅拷贝

---

**深拷贝**:

- 深拷贝会递归复制对象的所有层级。
- 拷贝后的对象与原对象完全独立，修改其中一个不会影响另一个。

1. **JSON 方法**（适用于简单对象）: 深拷贝

   ```javascript
   const obj = { a: 1, b: { c: 2 } };
   const deepCopy = JSON.parse(JSON.stringify(obj));
   deepCopy.b.c = 3;
   console.log(obj.b.c); // 输出 2，原对象未被影响
   ```

   **缺点**:

   - 无法拷贝函数/undefined/Symbol(丢失)、NaN/Infinity/null(null)、reg/Error/map/set/weakmap(空对象), date(字符串) 等。
   - 会丢失对象的原型链。

2. **递归实现**: 深拷贝

   ```javascript
   function deepClone(obj) {
     if (obj === null || typeof obj !== "object") {
       return obj;
     }
     if (Array.isArray(obj)) {
       return obj.map(item => deepClone(item));
     }
     if (obj instanceof Date) {
       return new Date(obj.getTime());
     }
     if (obj instanceof RegExp) {
       return new RegExp(obj.source, obj.flags);
     }
     if (obj instanceof Set) {
       return new Set([...obj].map(item => deepClone(item)));
     }
     if (obj instanceof Map) {
       return new Map(
         [...obj].map(([key, value]) => [deepClone(key), deepClone(value)])
       );
     }
     const clonedObj = {};
     // 原型上的不需要
     // for (const key in obj) {
     //   if (obj.hasOwnProperty(key)) {
     //     clonedObj[key] = deepClone(obj[key]);
     //   }
     // }
     Object.keys(obj).forEach(key => {
       clonedObj[key] = deepClone(obj[key]);
     });
     return clonedObj;
   }

   const obj = { a: 1, b: { c: 2 } };
   const deepCopy = deepClone(obj);
   deepCopy.b.c = 3;
   console.log(obj.b.c); // 输出 2，原对象未被影响
   ```

   如何对象中有循环引用，如何实现深拷贝? 回：weakmap 标记

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj);
  const copy = Array.isArray(obj) ? [] : {};
  hash.set(obj, copy);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], hash);
    }
  }
  return copy;
}
```

3. **使用库**: - 可以使用第三方库如 Lodash 的 `cloneDeep` 方法:`

#### 原型和原型链

每个函数都有个原型（prototype 对象），用于存放一些属性和方法，实现继承
每个对象都有个隐式原型（[[prototype]]/**proto**）或者 getPrototypeOf，

```js
function Person() {}
const p = new Person();
console.log(p.__proto__ === Person.prototype);
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // 特殊
console.log(Object.__proto__ === Function.prototype);
console.log(Person.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Function.__proto__ === Function.prototype); // 特殊
```

#### 如何实现继承？

通过原型链实现继承的方式：

```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayHello = function () {
  console.log(`Hello, ${this.name}`);
};

function Child(name, age) {
  Parent.call(this, name); // 调用父类构造函数
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype); // 继承原型
Child.prototype.constructor = Child; // 修复 constructor 指向

const child = new Child("Alice", 18);
child.sayHello(); // 输出: Hello, Alice
```

#### 如何判断对象的原型链中是否包含某个原型

使用 `instanceof` 或 `isPrototypeOf`：

```javascript
console.log(obj instanceof Constructor); // 判断 obj 是否是 Constructor 的实例
console.log(Constructor.prototype.isPrototypeOf(obj)); // 判断 obj 的原型链中是否包含 Constructor.prototype
```

#### `Object.create` 的作用是什么？

`Object.create(proto)` 创建一个新对象，并将其原型设置为 `proto`。

```javascript
const parent = { name: "Parent" };
const child = Object.create(parent);
console.log(child.name); // 输出: Parent
```

#### `new` 操作符的内部实现原理是什么？

实现：

```javascript
function myNew(constructor, ...args) {
  // 1. 创建一个空对象。将该对象的原型设置为构造函数的 prototype。
  const obj = Object.create(constructor.prototype);
  // 2. 执行构造函数，将 this 绑定到新对象。
  const result = constructor.apply(obj, args);
  // 3. 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象。
  return typeof result === "object" && result !== null ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p1 = myNew(Person, "John", 30);
console.log(p1); // Person { name: 'John', age: 30 }
```

#### `Function.prototype` 和 `Object.prototype` 有什么区别？

- `Function.prototype` 是所有函数的原型。
- `Object.prototype` 是所有对象的原型链终点。

#### 函数柯里化

是将一个接受多个参数的函数转换为一系列接受单一参数的函数的技术。每次调用返回一个新函数，直到所有参数被提供为止。

#### 为什么需要柯里化？

- **参数复用**：可以固定部分参数，生成新的函数。
- **延迟计算**：可以在需要时再提供参数，延迟执行。
- **代码可读性和复用性**：通过分步传递参数，代码更清晰。

#### 如何实现一个通用的柯里化函数？

实现一个通用的 `curry` 函数：

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 示例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 输出: 6
console.log(curriedAdd(1, 2)(3)); // 输出: 6
console.log(curriedAdd(1, 2, 3)); // 输出: 6
```

#### 如何实现一个无限柯里化函数？

实现一个可以接受无限参数的柯里化函数：

```javascript
function infiniteCurry(fn) {
  const curried = (...args) => {
    return (...nextArgs) => {
      if (nextArgs.length === 0) {
        return fn(...args);
      }
      return curried(...args, ...nextArgs);
    };
  };
  return curried;
}

// 示例
const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
const curriedSum = infiniteCurry(sum);

console.log(curriedSum(1)(2)(3)()); // 输出: 6
console.log(curriedSum(4, 5)(6)(7, 8)()); // 输出: 30
```

#### 柯里化与闭包的关系是什么？

柯里化依赖于闭包来保存函数的参数。每次调用返回一个新函数，闭包会捕获并存储当前的参数，直到所有参数被提供。

#### 如何实现一个简单的柯里化函数？

手写一个简单的柯里化函数：

```javascript
function simpleCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return curried.bind(null, ...args);
    }
  };
}

// 示例
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = simpleCurry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 输出: 24
console.log(curriedMultiply(2, 3)(4)); // 输出: 24
```

#### [for in 和 for of](/posts/design-patterns#迭代器模式)

按循环性能由高到低：

- for 可退出，知道循环次数（性能最优
- while/dowhile 可退出
- forEach 不能退出，没有返回值；适用于循环次数未知，或者计算循环次数比较麻烦情况下使用效率更高
- map 不能退出，有返回值
- for of 可退出，遍历可迭代对象（obj 不行），与 forEach() 不同的是，它可以正确响应break、continue 和 return 语句，性能要好于 forin，但仍然比不上普通 for 循环，这个方法避开了 for-in 循环的所有缺陷，for of 循环出的是value。
- for in 可退出，遍历数组或者对象（循环出的是 key，是 string），通常用来遍历对象（包括原型链上的属性），建议不要用该方法来遍历数组，因为它的效率是最低的。在ECMAScript规范中定义了 「数字属性应该按照索引值⼤⼩升序排列，字符串属性根据创建时的顺序升序排列。

#### 哪些地方不能箭头函数

需要用 this 的地方, 要用 arguments 的地方

#### 防抖节流

```js
function myDebounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
function myThrottle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
function myThrottle1(fn, delay) {
  let lastTime = +new Date();
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```

#### 写一个自定义事件

```js
const button = document.querySelector("button");

const myEvent = new Event("myEvent");

button.addEventListener("click", function (e) {
  button.dispatchEvent(myEvent);
});

button.addEventListener("myEvent", function (e) {
  console.log("myEvent triggered");
});
```

#### 聊一下 [js 事件循环](/posts/event-loop)

#### ！！！！requestIdleCallback

React 并没有直接依赖浏览器的 requestIdleCallback，而是实现了自己的调度器（Scheduler），以更精确地控制任务的执行时间。React 的调度器会根据任务的优先级和剩余时间动态调整任务的执行方式。

#### [设计模式了解过吗 写一个发布订阅](/posts/design-patterns#发布订阅模式)

#### webwoker

是一种在浏览器中运行的独立线程，用于执行耗时的任务而不阻塞主线程（UI 渲染线程）；主线程和 Worker 通过 `postMessage` 和 `onmessage` 进行双向通信。

Web Worker 的限制有哪些？

1. **无法操作 DOM**：Worker 运行在独立线程中，无法直接访问主线程的 DOM。
2. **受限的 API**：Worker 中只能使用部分 Web API，如 `fetch`、`WebSocket`、`setTimeout` 等。
3. **同源限制**：Worker 的脚本必须与主页面同源。
4. **通信开销**：主线程与 Worker 之间通过消息传递通信，可能会有一定的性能开销。

Web Worker 的实际使用场景

1. **复杂计算**：
   - 如大数据处理、图像处理、加密解密等。
2. **文件处理**：
   - 如文件解析（CSV、JSON）、压缩和解压缩。
3. **实时数据处理**：
   - 如音视频流处理、实时图表渲染。
4. **Web 应用性能优化**：
   - 如在 React/Vue 应用中，将复杂逻辑放入 Worker 中执行。

#### Promise

- promise(A).catch(f1).then(f2) ,f1 执行后 f2 会执行吗，为什么:
  如果 f1 处理了错误并返回一个值，f2 会接收到该值。
  如果 f1 抛出错误或返回一个被拒绝的 Promise，f2 不会执行，错误会继续向下传递。
- 假设我的 promise 里面全部都是同步代码，promise 里面没有做任何异步，不写 pending 是不是也可以？
  不行，一个是违反 Promise/A+ 规范，且状态不可逆的特性里，需要对 状态进行 pending 的判断
- 在 setTimeout 里产生一个 promise，当前的 promise 会在当前次执行掉吗？还是在下一次循环里执行？
- 写一个 [Promise.all](/posts/promise-basic) 介绍一下 Promise 以及用法，async/await

#### 闭包

```js
function outer() {
  let a = 0;
  function inner() {
    a++; // 访问了 inner 外部，outer 的变量
    console.log(a);
  }
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
```

#### 在 ES6

#### 解释一下 ES6 模块化的解析过程， 是怎么运作的

#### let 和 const 和 var

#### map 和 weakmap

#### 迭代器

是一个具有 next() 方法的对象，每次调用返回一个 { value, done } 对象。

### ts

### 设计模式

## 前端框架

- React
- Next.js

## 工程化

- 模块化 （ES Module, CommonJS, AMD）
- turbopack
- vite
- webpack vs vite vs turpoback vs rspack
- webpack
- npm vs yarn vs pnpm
  - npm link
  - package.json 中的 script 执行后会发生什么
- babel
- (eslint + husky + lint-staged + prettier)
- git
- CI/CD

## 性能优化

- 首屏相关
- Lighthouse

## 浏览器/网络

- 跨域
- 网络模型
- http
- 浏览器渲染过程
- XSS/CSRF/CSP 等
- Google reCAPTCHA
- 接口加密
- websocket

## 测试

- jest 单元测试
- puppeteer

## 基建

- npm 私服
- UI 库
- Docker
- 业务组件库

## 团队管理

- 敏捷开发
- 故事点
- 技术分享
- 技术选型怎么做

## 项目相关

- Wheel 自己实现
- graphQl
