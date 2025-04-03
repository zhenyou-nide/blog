---
title: 场景题
author: zhenyounide
pubDatetime: 2024-01-30T04:06:31Z
slug: scene-question
featured: false
draft: true
tags:
  - interview
description: ""
---

### js

- 浅拷贝和深拷贝
- 原型和原型链
- 函数柯里化
- BOM 和 DOM
- [for in 和 for of](/posts/design-patterns#迭代器模式)
- 哪些地方不能箭头函数
- 创建一个对象的过程
- 防抖节流
- 写一个自定义事件
- 前端怎么获取页面上哪个元素是最多的
- flex: 1 是什么意思
- BFC
- 聊一下 [js 事件循环](/posts/event-loop)
- requestAnimationFrame 
- requestIdleCallback
- [设计模式了解过吗 写一个发布订阅](/posts/design-patterns)
- webwoker
- 写一个 [Promise.all](/posts/promise-basic) 介绍一下 Promise 以及用法，async/await
- 闭包
- 页面菜单切换
- es module 和 commonjs
- 假设我的 promise 里面全部都是同步代码，promise 里面没有做任何异步，不写 pending 是不是也可以？
- 在 setTimeout 里产生一个 promise，当前的 promise 会在当前次执行掉吗？还是在下一次循环里执行？
- 解释一下 ES6 模块化的解析过程， 是怎么运作的
- 在 ES6，let 和 const
- promise(A).catch(f1).then(f2) ,f1 执行后 f2 会执行吗，为什么

### react

- react diff
- redux 源码
- hooks useEffect/useCallback/useMemo
- react fiber, react 18 并发
- useEffect 原理， 先执行还是 dom 先渲染，生命周期的深入理解，useEffct vs useLayoutEffect
- 纯函数 高阶函数 高阶组件
- 父组件和子组件渲染过程
- 函数组件和类组件
- useCallback vs useRefs
- react 相比于原生 js 或者 jq，说出觉得最重要的一个特点是什么
- 组件卸载怎么卸载
- 受控组件和非受控组件，非受控组件怎么操作
- 纯函数里发一个请求，那么这么函数还是纯函数吗
- react 中设置一个随机 key 会怎么样
- react 中一个父组件，两个子组件，一个传 props，一个不传 props，父组件重新渲染，两个子组件会不会都重新渲染
- vue vs react
- 单向数据流和双向数据绑定的原理，区别
- props 数据流向
- ref 和 reactive 区别
- react 白屏检测
- hooks 为什么只能写在顶层，不写在顶层会报错吗
- 函数组件中的生命周期
- React 里面 虚拟 DOM 有啥用，为啥不直接更新 DOM
- 虚拟 DOM 优势？

### 打包

- plugin
- loader
- webpack 做过哪些配置
- webpack 打包流程
- babel 原理
- tree shaking 原理
- webpack 中的环境变量是怎么注入的
- monorepo 是怎么做的
- vite 的优势，为什么比 webpack 快
- webpack 打包的产物是怎么样的，要你去写你怎么写
- webpack 打包优化

### 网络

- http 1.1/2/3
- http vs https
- OSI 七层
- tcp 和 udp
- 强缓存和协商缓存 浏览器缓存
- csrf 原理和解决方案
- 302 怎么确定重定向路径
- http 3 次 握手？为什么要握手 3 次，握手的流程？

### 浏览器

- 输入一个 url 到页面显示的整个过程
- 跨域
- 浏览器存储，使用的时候一般什么样的数据存在 cookie、什么样的数据存localStorage

### 优化相关

- 大数量加载优化
- 前端页面性能优化

### 算法

- 用栈实现队列
- 写一个前序遍历
- 两数之和
- 数组去重
- 反转链表
- 有效括号匹配
- js 对象数组转树形结构

### 工具

- git 相关操作
- 技术分享做过哪些

## 场景
- 生产环境下如何实现页面自动检测更新
- 如何实现共享单车扫码解锁，分析一下过程
- 如何实现 pc 扫码登陆
- Hybrid 混合开发和 JSBridge 的原理
- 如何监控页面卡顿
- 如何排查内存泄露，一般由什么情况引起
- 如何限制一个账号只能在一处登录
- 如果后端一下子返回一万条数据，用虚拟列表怎么做，虚拟列表滑动很快怎么办，不用虚拟列表怎么做
- 平时出现问题是如何排查错误的
