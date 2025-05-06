---
title: 总结 js 中的相等性判断
author: zhenyounide
pubDatetime: 2024-04-29T07:56:31Z
slug: same-value-in-js
featured: false
draft: true
tags:
  - interview
  - summary
description: js 中的几种相等性判断分别是什么？他们之间都有些什么区别？
---

js 中有大致归纳为三种相等性的判断

1. strict equality 严格相等
   不会执行隐式转换，会按照 IEEE 754 标准对 NaN、-0 和 +0 进行特殊处理（故 NaN != NaN，且 -0 == +0）

2. loose equality
   会执行隐式转换，且会按照 IEEE 754 标准对 NaN、-0 和 +0 进行特殊处理

3. Object.is
   不会执行隐式转换，也不会按照 IEEE 754 标准对 NaN、-0 和 +0 进行特殊处理

js 中有四种相等算法

## Table of contents

## IsLooselyEqual

[IsLooselyEqual](https://tc39.es/ecma262/#sec-islooselyequal) 对应 ==

## IsStrictlyEqual

[IsStrictlyEqual](https://tc39.es/ecma262/#sec-isstrictlyequal) 对应 ===

运用于 Array.prototype.indexOf()、Array.prototype.lastIndexOf()、TypedArray.prototype.index()、TypedArray.prototype.lastIndexOf() 和 case

## SameValue

[SameValue](https://tc39.es/ecma262/#sec-samevalue) 对应 `Object.is()`

## SameValueZero

[SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero) 被许多内置运算使用

Array.prototype.includes()、TypedArray.prototype.includes() 及 Map 和 Set
