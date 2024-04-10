---
title: network 面板下 response 与 preview 不一致问题
author: zhenyounide
pubDatetime: 2023-05-20T11:25:23Z
slug: js-precision-error-on-network-panel
featured: true
draft: false
tags:
  - problems
description:
  js 精度有问题？ 客户端收到的数据与服务端返回的不一致？
---

今天在开发过程中遇到一个奇怪的问题，客户端收到的数据与服务端返回的不一致，打开控制台发现，response 与 preview 的数据竟然不一致（response 与 服务端的数据的一致的），为什么会这样呢？

```
// response 返回 30924119419701995
// preview 返回 30924119419701996
```

且通过 curl 或者 postman 发送请求，返回的数据与服务端（response）是一致的，也就是说 response 是对的，preview 是错的
问题出在哪里呢

## 分析

该字段在后端的类型里定义为 Long，而众所周知 JavaScript 是弱类型语言，所有的数字类型统称为 Number 类型，不区分 int、long、double 等。而 Number 是根据 IEEE 754 标准中的 double 来实现的，即所有的 Number 类型都是 64 位双精度实型。安全整数是 53 位。如果超过 53 位的，你不能用 json 传递，需要用其他数据类型，比如字符串，或拆分成两个数据字段。

因此，转为 Number 类型后的数字在精度上会出现一定误差，上述问题反映出来的就是大数误差。比较经典的还有 js 面试：0.1+0.2===0.3 吗，属于浮点数误差。

前面的 preview 和 response 不一致的问题就是因为 preview 在显示的时候处理 response 的 Long 类型的时候触发了精度丢失。因此当我们 在项目中 console.log 打印出来的也是 preview 显示的数值。

## 解决

1. 让后端将 Long => String，这也是比较常用的方法
2. [Jison](https://github.com/zaach/jison) 通过它可以实现对后端返回数据的重新定义一个自己的 json parser。
