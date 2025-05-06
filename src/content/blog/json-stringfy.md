---
author: zhenyounide
pubDatetime: 2024-05-14T21:12:00Z
modDatetime: 2024-05-14T21:12:00Z
title: JSON.stringfy 用法
slug: json-stringfy-usage
featured: false
draft: true
tags:
  - interview
description: 总结 JSON.stringfy 的作用及常见应用场景
---

总结 JSON.stringfy 的作用及常见应用场景

## Table of contents

# 定义

The JSON.stringify() static method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

# 用法

用于序列化对象，接收三个参数 `JSON.stringify(value, replacer, space)`

- value: 要被序列化的 obj or array
- replacer: 标记对象中要被序列化的属性，可以是一个函数或者是一个 `(string | number )[]`
- space: 定义缩进字符串

# 应用场景

## webStorage

例如 localStorage 仅接收字符串的类型，且为 kv 形式，如果我们需要存储一个 obj：

```js
const obj = { name: "xxn", age: 18 };
localStorage.setItem("obj", obj);
localStorage.getItem("obj");
// result: '[object Object]'
```

会发现存储是失败的，因此需要用到 JSON.stringfy

```js
const obj = { name: "xxn", age: 18 };
localStorage.setItem("obj", JSON.stringify(obj));
localStorage.getItem("obj");
// result: '{"name":"xxn","age":18}'
```

## deep copy

```js
const obj = { name: "xxn", age: 18 };
const copiedObj = JSON.parse(JSON.stringify(obj));
copiedObj.name = "xxn-copied";
// copiedObj : {name: 'xxn-copied', age: 18}
// obj : {name: 'xxn', age: 18}
```

### 思考

1. 多层级的能否做深拷贝？

2. 会被丢弃或者忽略的数据类型

## 删除对象属性

```js
const obj = { name: "xxn", age: 18 };

const nameDeletedObj = JSON.parse(
  JSON.stringify(obj, (key, value) => (key === "name" ? undefined : value))
);

// nameDeletedObj : {age: 18}
```
