## this

### 如何确认 this

- 非严格模式下，指向对象
- 严格模式下，可以是任意值，顶部标明 'use strict' 可开启严格模式

1. 全局执行环境中

   - 非严格模式：全局对象
   - 严格模式：全局对象

2. 函数

   - 直接调用
     - 非严格模式：全局对象（window）
     - 严格模式：undefined
   - 对象方法
     - 非严格模式：调用者
     - 严格模式：调用者

### 如何指定 this

1. 调用时指定：

   - call(thisArg, ...arg)
   - apply(thisArg, [arg])

2. 创建时指定：

   - bind(thisArg, ...arg)
   - 箭头函数

### 手写 call/apply/bind

#### call

1. 定义 myCall
2. 设置 this 并调用原函数
3. 接受剩余参数并返回结果
4. 使用 Symbol 调优

```js
// 1. 定义 myCall
Function.prototype.myCall = function (thisArg, ...args) {
  // 2. 指定 this 并调用原函数
  // 这里的 this 就是未来调用了 myCall 的函数，
  // thisArg.f = this; // f 有可能重名
  // // !!!当 thisArg.f 被调用时，函数内部的 this 将帮到到 thisArg 上
  // // 3. 传参
  // const res = thisArg.f(...args);
  // 4. 不重名
  const key = Symbol("key");
  thisArg[key] = this;
  const res = thisArg[key](...args);
  delete thisArg[key];
  return res;
};
```

#### apply

```js
Function.prototype.myApply = function (thisArg, args) {
  const key = Symbol("key");
  thisArg[key] = this;
  const res = thisArg[key](...args);
  delete thisArg[key];
  return res;
};
```

#### bind

```js
Function.prototype.myBind = function (thisArg, ...args) {
  // 箭头函数会去问上一级作用域 this
  return (...arg1) =>
    // this: 未来调用 myBind 的函数（原函数）
    this.call(thisArg, ...args, ...arg1);
};
```

## 继承

目的：简化编码

- ES6 继承：Class

- ES5 继承：原型和构造函数

## fetch

fetch vs axios vs ajax

## Generator

## Promise

### 核心功能

#### 构造函数

#### 状态及调用

#### then 方法

#### 异步任务

#### 链式编程

###
