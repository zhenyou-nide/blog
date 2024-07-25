---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-06-22T11:13:47.400Z
title: 大宝典-Typescript
slug: collection-ts
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 107. ts vs js

1. 静态类型检查：

   - ts: 一种静态类型的编程语言，他在代码编译时期进行类型检查，这意味着开发者必须在编写代码时声明变量和函数返回值的类型。可在代码运行前发现潜在的错误。
   - js：一种动态类型的脚本语言，他在运行时进行类型检查。这意味着变量的类型实在代码运行时自动确定的，而不需要在代码中显式声明。

2. 类型注解和接口：

   - ts：提供了类型注解和接口等功能，允许开发者定义自己的类型，使得代码更加清晰和易于维护
   - js：不支持类型注解和接口。它使用原型继承而不是传统的类继承

3. 编译

   - ts：需要被编译成 js 才能在浏览器或 node.js 环境中运行。
   - js：作为一种解释性语言，可以直接在浏览器或 node.js 环境中运行，不需要编译过程。

4. 工具支持：
   - ts：静态类型的特性，提供更强大的编辑器支持，例如自动完成，重构工具和更详细的错误提示
   - js：虽然现代开发环境也提供了对 js 的广泛支持，但由于其动态类型的特性，这些支持通常不如 ts 那样强大和精确
5. 生态和社区
   - ts：被许多大型项目和团队采用，特别是哪些需要更严格的代码质量和可维护性的项目
   - js：有一个更大，更广泛的社区和生态系统，因为他是 web 开发的基石，所有的网页都在使用它

## 108. ts 定义变量类型的方法

```ts
const name: string | undefined; // 类型注解
const name = "xxn"; // 类型推断
```

## 109. ts 类型注解（type annotation）

1. 变量的类型注解：为变量指定类型，确保变量只能存储特定类型的值

   ```ts
   let name: string = "xxn";
   let age: number = 18;
   let isStudent: boolean = true;
   ```

2. 函数参数和返回值的类型注释

   ```ts
   function greet(name: string): string {
     return `Hello, ${name}`;
   }
   ```

3. 接口（interface）和类型别名（type aliases）

   ```ts
   interface Person {
     name: string;
     age: number;
   }

   let emplyee: Person = {
     name: "bob",
     age: 25,
   };

   type Point = {
     x: number;
     y: number;
   };

   let coord: Point = {
     x: 10,
     y: 10,
   };
   ```

## 110. 类型别名 和 交叉类型

类型别名：可以给一个类型起一个新的名字。这不仅限于对象类型，也可以适用于联合类型，元组以及任何其他类型

```ts
type Point = {
  x: number;
  y: number;
};

let coord: Point = {
  x: 10,
  y: 10,
};
```

交叉类型：将多个类型合并为一个类型，这个新类型将具有所有成员类型的特性。通过 `&` 操作符实现

```ts
type Name = {
  name: string;
};
type Age = {
  age: number;
};

type Person = Name & Age;
```

## 111. 接口（interface）用途

用于定义独享的结构。可以指定一个对象应该有哪些属性以及这些属性的类型。它们是 ts 进行静态类型检查的重要工具，尤其在处理复杂数据结构时。

1. 定义对象结构

   ```ts
   interface Person {
     name: string;
     age: string;
   }
   ```

2. 函数参数

   ```ts
   function greet(person: Person) {
     console.log(`Hello, ${person.name}`);
   }
   ```

3. 强制实现特定的类结构

   ```ts
   interface ClockInterface {
     currentTime: Date;
     setTime(d: Date): void;
   }

   class Clock implements ClockInterface {
     currentTime: Date = new Date();
     setTime(d: Date) {
       this.currentTime = d;
     }
   }
   ```

4. 继承

   ```ts
   interface Shape {
     color: string;
   }
   interface Square extends Shape {
     sideLength: number;
   }
   ```

## 112. interface vs type

1. 拓展性

   - interface: 可以通过声明合并来拓展。这意味着可以多次声明同一个接口，ts 会将它们合并为一个。接口支持拓展多个接口
   - type：不能通过生命合并来拓展，可以使用交叉类型雷实现类似功能

   ```ts
   interface Person {
     name: string;
   }
   interface Person {
     age: string;
   }
   // 等同于
   interface Person {
     name: string;
     age: number;
   }

   type Name = {
     name: string;
   };
   type Age = {
     age: number;
   };
   type Person = Name & Age;
   ```

2. 使用场景

   - interface：主要用于定义对象的形状，特别适用于定义类的实现或者是对象字面量的结构。因为他们支持声明合并，接口非常适合定义公共的外部 API 的形状。
   - type：更适用于定义类型的联合或元组，以及其他需要具体类型组合的场景。类型别名的灵活性更高，可以用来定义几乎任何类型。

3. 声明合并

   - interface：支持
   - type：不支持

4. 继承与交叉类型

   - interface：可以 `extends` 关键字继承其他接口或者类
   - type：可以用 `&` 创建交叉类型
