---
title: how to get random number
author: zhenyounide
pubDatetime: 2024-03-01T04:06:31Z
slug: how-to-get-random-number
featured: true
draft: false
tags:
  - summary
description: 伪随机？真随机？如何得到一个随机数
---

## Table of contents

结论先行：我们在程序中谈到的随机数**都是**伪随机数。

先解释下 **伪随机数** 真正意义上的随机数是通过真实的物理现象（随机事件）产生的，其结果无法预测。而计算机生成的随机数都是通过某种算法来实现，只要是通过算法实现，就存在一定的规律性和周期性，其结果就可能被预测，所以不是真正意义上的随机数，称为伪随机数。

JavaScript 自带的随机数 Math.random() 生成方法是以当前时间为随机数种子，多次取值的结果是均匀分布的

伪随机数于日常开发中也够用了，但如果是生成密钥的场景下，尤其是在 Node.js 服务层，则 Math.random() 就有问题了，会有潜在的安全风险

为什么呢？
我么知道 Math.random() 底层算法是 xorshift128+ (我们都知道)，且为了保证性能，是直接生成一组随机数在缓存中，用完了再重新生成，并非实时生成，这就给攻击者机会了

crypto.getRandomValues() 与 Math.random() 不同的在于随机数都是实时生成的，因此（用性能换的）

借用 zhangxinxu 大佬的原话：

> Web 前端而言，必须要使用 getRandomValues() 方法的场景很少，不过由于纯前端几乎不存在所谓的高并发，因此，你使用 getRandomValues() 方法也是可以的，有装逼的作用。

```ts
const getRandomNumber = (min: number, max: number) => {
  if (!window?.crypto) {
    return ~~(Math.random() * max) + min;
  }
  const range = max - min + 1;
  const randomArray = new Uint32Array(1);
  let randomNumber = 0;

  do {
    window.crypto.getRandomValues(randomArray);
    randomNumber = randomArray[0] % range;
  } while (randomNumber >= range);

  return min + randomNumber;
};

export default getRandomNumber;
```
