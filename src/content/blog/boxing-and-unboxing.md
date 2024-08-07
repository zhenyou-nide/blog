---
title: JavaScript 的装箱机制（Boxing）和拆箱机制（Unboxing)
author: zhenyounide
pubDatetime: 2024-06-13T04:06:31Z
slug: boxing-and-unboxing
featured: true
draft: false
tags:
  - summary
description: 理解装箱机制（Boxing）和拆箱机制（Unboxing)
---

```js
const a = 1;
console.log(a.__proto__ === Number.prototype); // true
consolo.log(a instanceof Number); // false
```

> q: 为啥第二行输出 true，第三行输出 false？

---

想分析这个问题，就不得不提到 js 中的装箱机制（Boxing）和拆箱机制（Unboxing）

- **装箱（boxing）**: 原始数据类型（Primitive types）转为对象类型（Object types）

- **拆箱（unboxing）**：对象类型（Object types）转为原始数据类型（Primitive types）

## Table of contents

## 原始类型和对象类型

JavaScript 有六种原始数据类型：

1. `Number`
2. `String`
3. `Boolean`
4. `Null`
5. `Undefined`
6. `Symbol` (ES6 引入)

此外还有复杂数据类型：`Object`（比如数组、函数、日期...）。

## 装箱机制（Boxing）

原始类型在 **调用到对象方法** 或 **访问到对象属性** 时自动发生装箱。

- `Number` 对应 `Number` 对象
- `String` 对应 `String` 对象
- `Boolean` 对应 `Boolean` 对象
- `Symbol` 对应 `Symbol` 对象

### 自动装箱（auto boxing）

当你对一个原始类型调用方法时，JavaScript 会自动地将它装箱为对象类型。例如：

```javascript
let str = "hello";
let length = str.length; // 自动装箱，等价于 new String("hello").length
console.log(length); // 输出 5
```

在上面的代码中，字符串 `str` 被临时转换为 `String` 对象以访问其 `length` 属性。

## 拆箱机制（Unboxing）

拆箱是指将对象类型转换回原始类型，这通常在需要原始值的上下文中发生。例如：

```javascript
let numObj = new Number(42);
let num = numObj.valueOf(); // 拆箱为原始类型
console.log(num); // 输出 42
```

在上面的代码中，通过调用 `valueOf()` 方法将 `Number` 对象转换回原始类型。

## 手动装箱与拆箱

```javascript
// 手动装箱
let num = 42;
let numObj = new Number(num); // 手动装箱
console.log(numObj); // 输出 [Number: 42]

// 手动拆箱
let boolObj = new Boolean(true);
let bool = boolObj.valueOf(); // 手动拆箱
console.log(bool); // 输出 true
```

## 注意事项

- **临时对象**：自动装箱创建的对象是临时的，只有在需要时才会存在。例如，`"hello".length` 创建了一个临时 `String` 对象，该对象在表达式求值后立即被销毁。
- **性能**：频繁的装箱和拆箱操作可能会影响性能，因此在性能关键的代码中，应尽量避免不必要的装箱和拆箱。

## 解答

所以本文开头的问题，是因为基础类型是没有 `__proto__` ，第二行之所以会输出 true，是因为触发了 js 的装箱机制，当一个基础类型尝试访问 `__proto__` 的时候，js 会把基础类型临时装箱，理解为 `const a = new Number(1)`, 所以第二行会输出 true；
而第三行没有触发装箱机制，因此输出 false
