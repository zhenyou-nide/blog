---
title: 回顾前端模块化的发展历程
author: zhenyounide
pubDatetime: 2021-06-10T04:06:31Z
slug: modules-history
featured: true
draft: false
tags:
  - summary
  - modules
description: 回顾前端模块化的发展历程， 持续更新中...
---

本文是基于自己对前端模块化发展历程的总结

## Table of contents

# 基于封装性的探索

1. global 污染，命名冲突 👎👎
   最早 code:

   ```
   var a, b;
   function foo1() {
     ...
   }

   function foo2() {
     ...
   }
   ```

2. 仅仅只是减少 global 上的变量声明，本质是对象，不安全, 外部能改 👎
   简单封装: namespace

   ```
   var foo = {
     foo1: function() {}
     foo2: function() {}
   }

   foo.foo1()
   ```

3. 函数是唯一作用域 👍
   闭包：IIFE 模式
   写法在老项目中很常见，一个 JS 文件中就是一个立即执行函数

   ```
   var Foo = (function() {
     var _private = 'I an safe'
     var innerFun = function() {
       console.log(_private)
     }
     return {
       innerFun: innerFun
     }
   })()

   Foo.innerFun()
   Foo._private() // undefined,
   ```

4. 增强版：引入依赖, 即为模块模式 👍👍

   ```
   var Foo = (function(prop){
     var _prop = prop;     // we can use prop now!
     var innerFun = function(){
       console.log(_prop);    // 特权方法
     }

     // Revelation Pattern
     return {
       innerFun: innerFun
     }
   })({name:'xxn'})

   Foo.innerFun()
   ```

script tag 引入 js 的问题有：

1. 加载的 js 脚本是按序的, 并行加载的, DOM 顺序即为执行顺序；
2. 而实际开发中往往需要加载很多的 js 脚本
   导致 **难以维护**,**依赖模糊**,**太多的 https 请求**

因此 仅仅优化封装还不够，还需要按需加载

# [LABjs](https://github.com/getify/LABjs)

**L**oading **A**nd **B**locking

# [YUI3](https://github.com/yui/yui3)

YUI's lightweight core and modular architecture,make it scalable, fast, and robust.

1. 基于模块的依赖管理
2. Cambo 功能解决 太多 HTTP 请求问题

# 几种模块化标准

## 1. Commonjs（2009.08）

该规范最初是用在服务器端的 node 的

**FLAG**: 跳出浏览器! FLAG 倒

### 模块的定义与引用

```
// math.js
exports.add = function(a, b) {
  return a + b
};

// index.js
var math = require('math'); // ./math in node
console.log(math.add(1, 3)); // 4
```

### 特点

- 优点：解决了依赖、全局变量污染的问题
- 缺点：同步/阻塞性加载（对于 服务器/本地环境 无所谓，但对 浏览器 来说是个问题）
  CommonJS 用同步的方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，CommonJS 不适合浏览器端模块加载，更合理的方案是使用异步加载

## 2. AMD VS CMD

AMD 是由 RequireJS 提出的，CMD 由 SeaJS 提出

### AMD （2011）

JavaScript file and module loader. It is optimized for in-browser use

1.  commonjs 中 require 是 sync 的, 因为如果是 async 的话:

    ```
    //CommonJS Syntax
    var Employee = require("types/Employee");

    function Programmer (){
      //do something
    }

    Programmer.prototype = new Employee();

    //如果 require call 是异步的，那么肯定 error
    //因为在执行这句前 Employee 模块根本来不及加载进来
    ```

2.  AMD 做了什么呢

    ```
    //AMD Wrapper
    define(
      ["types/Employee"],  //依赖
      function(Employee){  //这个回调会在所有依赖都被加载后才执行
        function Programmer(){
            //do something
        };

        Programmer.prototype = new Employee();
        return Programmer;  //return Constructor
      }
    )
    ```

3.  AMD VS Commonjs

    1. 书写风格上

       ```
       // Commonjs
       var a = require("./a"); // 依赖就近
       a.doSomething();

       var b = require("./b")
       b.doSomething();

       // AMD
       define(["a", "b"], function(a, b){ // 依赖前置
         a.doSomething();
         b.doSomething();
       })
       ```

    2. 执行顺序上

       ```
       // Commonjs
       var a = require("./a");  // 执行到此时，a.js 同步下载并执行

       // AMD
       define(["require"], function(require){
         // 在这里， a.js 已经下载并且执行好了
         var a = require("./a")
       })

       ```

AMD: Early Download, Early Executing
优点：适合在浏览器环境中异步加载模块、并行加载多个模块
缺点：不能按需加载、开发成本大

### CMD (2011)

Extremely simple experience of modular development

1.  书写风格 更像 Commonjs

    ```
    define(function(require, exports) {
        var a = require('./a');
        a.doSomething();

        exports.foo = 'bar';
        exports.doSomething = function() {};
    });

    // RequireJS 兼容风格
    define('hello', ['jquery'], function(require, exports, module) {
      return {
        foo: 'bar',
        doSomething: function() {}
      };
    });
    ```

2.  CMD VS AMD: 主要在执行顺序上

    ```
    // AMD
    define(['a', 'b'], function(a, b){
    a.doSomething(); // 依赖前置，提前执行
    b.doSomething();
    })

    // CMD
    define(function(require, exports, module){
      var a = require("a");
      a.doSomething();
      var b = require("b");
      b.doSomething();    // 依赖就近，延迟执行
    })
    ```

CMD: Early Download, Lazy Executing

## 3. UMD

此外同一时期还出现了一个 UMD 的方案，其实它就是 AMD 与 CommonJS 的集合体

## 4. browserify VS webpack

- Browserify 是 CommonJS 在浏览器中的一种实现；
- webpack 对 CommonJS 的支持和转换；也就是前端应用也可以在编译之前，尽情使用 CommonJS 进行开发。

### browserify

require('modules') in the browser by bundling up all of your dependencies

### webpack

transforming, bundling, or packaging just about any resource or asset

## 5. ES Module

CommonJS 输出值的拷贝，ES Module 输出值的引用

### 特性

1. 静态方法
   ES6 module 的引入和导出是静态的，import 会自动提升到代码的顶层。
   这种静态语法，在编译过程中确定了导入和导出的关系，所以更方便去查找依赖，更方便去 tree shaking， 可以使用 lint 工具对模块依赖进行检查，可以对导入导出加上类型信息进行静态的类型检查。
   **tree shaking**:
   [Tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) is a term commonly used within a JavaScript context to describe the removal of dead code.
2. 执行特性
   ES6 module 和 Common.js 一样，对于相同的 js 文件，会保存静态属性。
   但是与 Common.js 不同的是 ，CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件，ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。
3. 导出绑定
   **不能修改 import 引入的值**
   a.js:

   ```
    export let count = 1
    export const add = ()=>{
        count++
    }
   ```

   main.js

   ```
   import { count, add } from './a'
   count = 2 // error
   ```

   但是**属性绑定**

   ```
   import { count, add } from './a'

   console.log(count) // count = 1
   add()
   console.log(count) // count = 2
   ```
