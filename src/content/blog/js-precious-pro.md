---
title: 关于 0.1 + 0.2 !== 0.3 的问题
author: zhenyounide
pubDatetime: 2024-04-11T09:25:23Z
slug: js-precision-pro
featured: true
draft: false
tags:
  - interview
  - problems
description: 把 0.1 + 0.2 ！== 0.3 理解透！
---

```
0.1+0.2
0.30000000000000004
```

??? why ???

其实关于这个问题，网上的解释很多，归根到底，普遍都在甩锅给 **js 精度缺失**、**位数溢出** 等等...也确实不能说不对，但一直觉得没解释到点上,例如

- 精度是怎么丢失的？
- 位数怎么溢出的？溢出的临界点是什么？
- 都是 js 的锅吗？

那我们来深入的解释下 为什么 `0.1 + 0.2 ！== 0.3`

## Table of contents

# 计算的本质是 二进制 进行的

我们知道 十进制转化为 二进制的过程是辗转相乘，且

- 整数部分：除 2 取余 逆序排列

```
8 / 2 = 4 余 0
4 / 2 = 2 余 0
2 / 2 = 1 余 0
1 / 2 = 0 余 1

8 => 1000
```

- 小数部分：乘 2 取整，顺序排列

```
0.1 * 2 = 0.2 取整 0
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
......
0.1 => 00011 0011 0011 0011 .... (0011 循环)
```

# Number (js) 类型是使用 IEEE754 标准 64 位存储 （double, 双精度浮点数）

系统为每个 num 分配 64 位存储空间，以科学技术法存储 1.xxx \* 2^n。

而 64 位存储空间分为三个部分

- 1 符号位：0 正数 1 负数
- 11 位指数位：固定值（1023）+ 指数实际值，IEEE754 标准 `（2 ^（ e - 1 ））- 1 => （2 ^（ 11 - 1 ））- 1 = 1023`
- 52位小数位：存放小数点后的数值

举个栗子

0.1 转化为科学计数法：`0.1 = 0.00011 0011 0011 0011 .... = 1.1001 1001... * 2^(-4)`

- 符号位：0
- 指数位：`-4 + 1023 = 1019 = 0011 1111 1011`
- 小数位：
  - `1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1`（53位） 只能存 52 位 因此进位
  - `1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010`（52位）

**这里发生了第一次精度丢失！** 存储过程中丢失

`0.1 = 0 01111111011 1001100110011001100110011001100110011001100110011010`

`0.2 = 0 01111111100 1001100110011001100110011001100110011001100110011010`

# IEEE754 标准 64 位 数值相加

0.1 偏移 -4：`0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1010`

0.2 偏移 -3：`0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0100`

相加得到 `0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 111` （53 位）

截取保留 52 位 `0.010011001100110011001100110011001100110011001100110100` (52位)

**这里发生了第二次精度丢失！** 相加过程中丢失

转化为 10 进制 `0.30000000000000004`
