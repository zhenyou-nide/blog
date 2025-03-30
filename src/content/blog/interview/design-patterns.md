---
title: 设计模式小结
author: zhenyounide
pubDatetime: 2023-01-20T05:06:31Z
slug: design-patterns
featured: false
draft: true
tags:
  - interview
description: ""
---

在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。通俗一点说，设计模式就是给面向对象软件开发中的一些好的设计取个名字。

## Table of contents

## 工厂模式

**直接调用即可返回新对象的函数**

### 场景：

- vue3 中创建实例的 api 改为 createApp,vue2 中是 new Vue

  - Vue3 中，没有影响所有 Vue 实例的 api 了，全都变成了影响某个 app 对象的 api, 比如 Vue.component => app.component

- axios.create 基于传入的配置，创建一个新的请求对象，可以用来设置多个基地址

## 单例模式

单例对象整个系统需要保证**只有一个**存在

```js
class SingleTon {
  constructor() {}
  // 私有属性，保存唯一实例
  static #instance;

  // 获取单例的方法
  static getInstance() {
    if (SingleTon.#instance === undefined) {
      // 内部可以调用构造函数
      SingleTon.#instance = new SingleTon();
    }
    return SingleTon.#instance;
  }
}
```

### 场景：

- 组件库中的 toast，notify 之类的组件，保证单例
- vue 中注册插件，vue2 和 vue3 都会判断插件是否已经注册，已注册，直接提示用户

## 观察者模式

在对象之间定义一个**一对多**的依赖，当一个独享状态改变时，所有以来的对象会自动收到通知

### 场景

- dom 事件绑定

```js
window.addEventListener('load', () =&gt; {
  console.log('load 触发 1')
})
window.addEventListener('load', () =&gt; {
  console.log('load 触发 2')
})
window.addEventListener('load', () =&gt; {
  console.log('load 触发 3')
})
```

- vue 中的 watch

## 发布订阅模式

类似观察者模式，区别是一个有中间商（发布订阅模式），一个没有中间商（观察者模式）

### 场景

- vue2 中的 EventBus

**核心逻辑：**

- 添加类，内部定义私有属性#handlers={}, 以对象的形式来保存回调函数
- 添加实例方法：
  - on:
    - 接收事件名和回调函数
    - 内部判断并将回调函数保存到#handlers 中，以{事件名：[回调函数 1, 回调函数 2]}格式保存
  - emit
    - 接收事件名和回调函数参数
    - 内部通过#handlers 获取保存的回调函数，如果获取不到设置为空数组 []
      然后挨个调用回调函数即可
  - off
    - 接收事件名
    - 将#handlers 中事件名对应的值设置为 undefined 即可
  - once
    - 接收事件名和回调函数
    - 内部通过$on 注册回调函数，- 内部调用 callback 并通过$off 移除注册的事件

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>Design Patterns</h2>
    <button class="on">on</button>
    <button class="emit">emmi</button>
    <button class="off">off</button>
    <button class="once-on">once</button>
    <button class="once-emit">once</button>
    <script>
      class MyEmmiter {
        #handlers = {};

        on(event, callback) {
          if (!this.#handlers[event]) {
            this.#handlers[event] = [];
          }
          this.#handlers[event].push(callback);
        }

        emit(event, ...args) {
          if (!this.#handlers[event]) return;
          this.#handlers[event].forEach(callback => {
            callback(...args);
          });
        }

        off(event, callback) {
          this.#handlers[event] = undefined;
        }

        once(event, callback) {
          this.on(event, (...args) => {
            this.off(event);
            callback(...args);
          });
        }
      }

      const emitter = new MyEmmiter();
      function qs(selector) {
        return document.getElementsByClassName(selector)[0];
      }

      qs("on").addEventListener("click", () => {
        emitter.on("event", (arg1, arg2) => {
          console.log("on event", arg1, arg2);
        });
        emitter.on("event", (arg1, arg2) => {
          console.log("on event 2", arg1, arg2);
        });
      });

      qs("emit").addEventListener("click", () => {
        emitter.emit("event", "arg1", "arg2");
      });
      qs("off").addEventListener("click", () => {
        emitter.off("event");
      });
      qs("once-on").addEventListener("click", () => {
        emitter.once("once-event", (arg1, arg2) => {
          console.log("once event", arg1, arg2);
        });
        emitter.once("once-event", (arg1, arg2) => {
          console.log("once event 2", arg1, arg2);
        });
      });
      qs("once-emit").addEventListener("click", () => {
        emitter.emit("once-event", "arg1", "arg2");
      });
    </script>
  </body>
</html>
```

## 原型模式

在原型模式下，当我们想要创建一个对象时，会先找到一个对象作为原型，然后通过克隆原型的方式来创建出一个与原型一样（共享一套数据/方法）的对象。在 JavaScript 中，Object.create 就是实现原型模式的内置 api

- 原型模式：

  - 基于某个对象，创建一个新的对象
  - JS 中，通过 Object.create 就是实现了这个模式的内置 api
  - 比如 vue2 中重写数组方法就是这么做的

- vue2 中数组重写了 7 个方法，内部基于数组的原型 Array.prototype 创建了一个新对象

- 创建的方式是通过 Object.create 进行浅拷贝

- 重写的时候：
  - 调用数组的原方法，获取结果并返回—方法的功能和之前一致
  - 通知了所有的观察者去更新视图

```js
const app = new Vue({
  el: "#app",
  data: {
    arr: [1, 2, 3],
  },
});
app.arr.push === Array.prototype.push; //false
```

## 代理模式

**拦截与控制** 与目标对象的交互

- 比如可以通过缓存代理：
  - 缓存获取到的数据
  - 拦截获取数据的请求：
    - 已有缓存：直接返回缓存数据
    - 没有缓存：去服务器获取数据并缓存
- 提升数据获取效率，降低服务器性能消耗

```js
//  1. 创建对象缓存数据
const cache = {};
async function searchCity(pname) {
  // 2. 判断是否缓存数据
  if (!cache[pname]) {
    // 2.1 没有：查询，缓存，并返回
    const res = await axios({
      url: "http://hmajax.itheima.net/api/city",
      params: {
        pname,
      },
    });
    cache[pname] = res.data.list;
  }
  // 2.2 有：直接返回
  return cache[pname];
}

document.querySelector(".query").addEventListener("keyup", async function (e) {
  if (e.keyCode === 13) {
    const city = await searchCity(this.value);
    console.log(city);
  }
});
```

## 迭代器模式

提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。简而言之就是：**遍历**

- for in 和 for of 的区别？
  - for...in 语句以任意顺序迭代一个对象的除 Symbol 以外的可枚举属性，包括继承的可枚举属性。
    - 对象默认的属性以及动态增加的属性都是可枚举属性
    - 遍历出来的是属性名
    - 继承而来的属性也会遍历
  - for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环
    - for of 不会遍历继承而来的属性
    - 遍历出来的是属性值

_for of 不可遍历 object_

### 自定义可迭代对象

\*_需要符合 2 个协议：_

- 可迭代协议：
  - 给对象增加属方法 [Symbol.iterator](){}
  - 返回一个符合迭代器协议的对象
- 迭代器协议
  - 有 next 方法的一个对象，内部根据不同情况返回对应结果：
    - {done:true}, 迭代结束
    - {done:false,value:'xx'}, 获取解析并接续迭代

_其实就是按照语法要求实现功能而已_

**实现方式：**

- 自己手写实现逻辑
- 直接返回一个 Generator

```js
const obj = {
  [Symbol.iterator]() {
    const arr = [1, 2, 3, 4, 5];
    let index = 0;
    return {
      next() {
        if (index < arr.length) {
          return { value: arr[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
    // --- generator function ---
    // function* generator() {
    //   yield 1
    //   yield 2
    //   yield 3
    // }
    // const res = generator()
    // return res
  },
};

for (const element of obj) {
  console.log(element);
}
```
