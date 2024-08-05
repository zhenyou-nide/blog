---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-08-05T11:13:47.400Z
title: 大宝典-计算机网络
slug: collection-network
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 261. HTTP 请求方式

1. **GET**

   - **用途**：从服务器获取资源。
   - **特点**：请求数据附加在 URL 中；无请求体；一般用于查询操作；对数据不产生副作用。
   - **幂等性**：是。
   - **安全性**：是。
   - **示例**：获取网页内容、查询数据。
   - **示例代码**：
     ```bash
     curl -X GET http://example.com/resource
     ```

2. **POST**

   - **用途**：向服务器提交数据以创建或更新资源。
   - **特点**：数据包含在请求体中；请求可能会更改服务器状态。
   - **幂等性**：否。
   - **安全性**：否。
   - **示例**：提交表单数据、上传文件。
   - **示例代码**：
     ```bash
     curl -X POST -d "param1=value1&param2=value2" http://example.com/resource
     ```

3. **PUT**

   - **用途**：向服务器提交数据以创建或完全替换指定资源。
   - **特点**：数据包含在请求体中；如果资源存在则更新，不存在则创建。
   - **幂等性**：是。
   - **安全性**：否。
   - **示例**：更新或创建资源。
   - **示例代码**：
     ```bash
     curl -X PUT -d '{"name":"value"}' http://example.com/resource
     ```

4. **DELETE**

   - **用途**：删除指定的资源。
   - **特点**：请求数据附加在 URL 中；删除资源。
   - **幂等性**：是。
   - **安全性**：否。
   - **示例**：删除数据。
   - **示例代码**：
     ```bash
     curl -X DELETE http://example.com/resource
     ```

5. **HEAD**

   - **用途**：与 GET 相同，但只返回响应的头部，不包含响应体。
   - **特点**：用于获取资源的元数据。
   - **幂等性**：是。
   - **安全性**：是。
   - **示例**：检查资源是否存在，获取资源的元数据。
   - **示例代码**：
     ```bash
     curl -X HEAD http://example.com/resource
     ```

6. **OPTIONS**

   - **用途**：获取服务器支持的 HTTP 方法或对特定资源的支持情况。
   - **特点**：用于获取服务器的能力。
   - **幂等性**：是。
   - **安全性**：是。
   - **示例**：检查服务器支持哪些 HTTP 方法。
   - **示例代码**：
     ```bash
     curl -X OPTIONS http://example.com/resource
     ```

7. **PATCH**
   - **用途**：对资源进行部分修改。
   - **特点**：数据包含在请求体中；与 PUT 不同，PATCH 只更新资源的部分内容。
   - **幂等性**：不一定，视具体实现而定。
   - **安全性**：否。
   - **示例**：部分更新资源。
   - **示例代码**：
     ```bash
     curl -X PATCH -d '{"name":"new value"}' http://example.com/resource
     ```

**幂等性和安全性**

- **幂等性**：如果多次相同请求对服务器资源的结果是相同的。即使方法被调用多次，结果也与第一次调用相同。GET、PUT、DELETE、HEAD、OPTIONS 方法是幂等的，POST 方法不是。
- **安全性**：只读取资源而不修改资源，则是安全的。安全方法不会引起资源状态的改变。GET、HEAD、OPTIONS 方法是安全的，POST、PUT、DELETE、PATCH 方法不是。

## 262. GET vs POST

| 特性         | GET                        | POST                           |
| ------------ | -------------------------- | ------------------------------ |
| 用途         | 获取数据                   | 发送数据                       |
| 数据传输     | URL 参数                   | 请求体                         |
| 缓存         | 可以被缓存                 | 不会被缓存                     |
| 书签         | 可以被书签保存             | 不能被书签保存                 |
| 数据长度限制 | 有限（取决于 URL 长度）    | 无显著限制                     |
| 幂等性       | 是（对资源无副作用）       | 否（可能产生副作用）           |
| 安全性       | 是（不会改变服务器资源）   | 否（通常用于修改资源）         |
| 数据可见性   | URL 中的数据对所有人可见   | 请求体中的数据相对隐藏         |
| 使用场景     | 查询操作，如搜索、获取数据 | 修改操作，如表单提交、文件上传 |

_tip:_ 其实参数并没有大小限制，是 URL 大小有限制，因为要保护服务器（Chrome 2M，IE 2048）

## 263. RESTful 规范

使用语义化的 URL 来表示资源的层级关系和操作，如 /users 表示用户资源，/user/:id 表示具体的用户

## 264. 浏览器缓存（强缓存/协商缓存）

## 265. Cache-Control 的取值

## 266. 常见的 HTTP 状态码及其意义

## 267. 网络状态 301 vs 302 vs 303

## 268. 400 和 401，402 的区别

## 269. HTTP vs HTTPS

## 270. 描述下 HTTPS 的加密过程

## 271. Cookie 为了解决什么问题

## 272. Cookie vs Session

## 273. TCP（传输控制协议）vs UDP（用户数据报协议）

## 274. TCP 三次握手

## 275. 如果 TCP 变成二次握手会导致的问题

## 276. TCP 四次挥手

## 277. 描述一下 TCP 的拥塞控制

## 278. 什么是跨域，如何解决

## 279. 同源策略具体限制的具体内容

## 280. 发起请求是浏览器做了什么

## 281. XSS 攻击

## 282. SQL 注入

## 283. DDoS 攻击

## 284. CSRF 攻击

## 285. Ajax 的定义及其优缺点

## 286. XMLHttpRequest 对象用法

## 287. 封装一个 Ajax 请求方法

## 288. Fetch API

## 289. fetch vs XMLHttpRequest

## 290. 请求会发 2 次的原因

## 291. WebSocket

## 292. WebSocket 建立连接的过程

## 293. WebSocket 支持传输的数据格式

## 294. Server-Sent Events（SSE）

## 295. Server-Sent Events（SSE）示例代码

## 296. SSE vs WebSocket

## 297.http2.0
