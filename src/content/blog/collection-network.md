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

使用语义化的 URL 来表示资源的层级关系和操作，如 /users 表示用户资源，/user/:id 表示具体的用户，每个请求都是独立的，服务器不保存客户端的状态信息，客户端需要在请求中携带所有必要的信息。

## 264. 浏览器缓存（强缓存/协商缓存）

若缓存生效，强缓存返回 200，协商缓存返沪 304

详见 [HTTP 缓存机制](/posts/local-and-conditional-cache)

## 265. Cache-Control 的取值

`Cache-Control` 是 HTTP/1.1 中定义的用于指定缓存指令的头字段，可以用来控制缓存策略，决定资源如何被缓存、存储的时间长度以及缓存的权限

1. **max-age=seconds**

   - **定义**：指定资源在客户端缓存的最大时间（以秒为单位）。
   - **示例**：`Cache-Control: max-age=3600`（表示资源在客户端缓存1小时）

2. **no-cache**

   - **定义**：强制缓存机制在使用已缓存的副本前，向原服务器进行验证。
   - **示例**：`Cache-Control: no-cache`

3. **no-store**

   - **定义**：不允许缓存，任何情况下都不应缓存响应或请求的内容。
   - **示例**：`Cache-Control: no-store`

4. **public**

   - **定义**：表示响应可以被任何缓存，包括CDN等中间缓存服务器缓存。
   - **示例**：`Cache-Control: public`

5. **private**

   - **定义**：表示响应只能被单个用户缓存，不能被共享缓存（如CDN）缓存。
   - **示例**：`Cache-Control: private`

6. **must-revalidate**

   - **定义**：要求缓存必须在过期后重新验证，而不能使用过期的缓存。
   - **示例**：`Cache-Control: must-revalidate`

7. **proxy-revalidate**

   - **定义**：与 `must-revalidate` 类似，但该指令适用于所有缓存，包括中间代理缓存。
   - **示例**：`Cache-Control: proxy-revalidate`

8. **s-maxage=seconds**

   - **定义**：与 `max-age` 类似，但只适用于共享缓存（如代理服务器缓存），忽略 `max-age` 和 `Expires` 头字段。
   - **示例**：`Cache-Control: s-maxage=3600`

9. **immutable**

   - **定义**：表示资源是不可变的，一旦缓存，不会改变，因此在 `max-age` 期内不需要重新验证。
   - **示例**：`Cache-Control: immutable`

10. **stale-while-revalidate=seconds**

    - **定义**：允许客户端在资源过期后仍然使用旧的缓存，同时在后台重新验证。
    - **示例**：`Cache-Control: stale-while-revalidate=60`

11. **stale-if-error=seconds**
    - **定义**：在资源过期且服务器不可用时，允许客户端使用过期的缓存。
    - **示例**：`Cache-Control: stale-if-error=86400`

**组合使用**

多个 `Cache-Control` 指令可以组合使用，以实现更复杂的缓存策略。例如：

- `Cache-Control: public, max-age=3600, must-revalidate`

  - 表示资源可以被任何缓存缓存，最大缓存时间为1小时，到期后必须重新验证。

- `Cache-Control: private, no-cache`
  - 表示响应只能被单个用户缓存，且每次使用缓存前都要向服务器验证。

**示例**

1. **静态资源缓存**（如图片、CSS、JavaScript）：

   ```
   Cache-Control: public, max-age=31536000, immutable
   ```

2. **敏感数据缓存**（如用户个人信息）：

   ```
   Cache-Control: private, no-store
   ```

3. **动态内容缓存**（需要频繁更新）：
   ```
   Cache-Control: no-cache, must-revalidate
   ```

## 266. 常见的 HTTP 状态码及其意义

### 1xx - 信息响应（Informational Responses）

1. **100 Continue**：表示到目前为止一切正常，客户端应继续请求。
2. **101 Switching Protocols**：服务器同意客户端的协议切换请求。

### 2xx - 成功（Success）

1. **200 OK**：请求成功，服务器返回请求的数据。
2. **201 Created**：请求成功且资源已被创建。通常用于 POST 或 PUT 请求。
3. **202 Accepted**：请求已接收，但尚未处理。
4. **204 No Content**：请求成功但没有内容返回。通常用于 DELETE 请求。

### 3xx - 重定向（Redirection）

1. **301 Moved Permanently**：请求的资源已被永久移动到新位置。响应中会包含新的 URL。
2. **302 Found**（或 Moved Temporarily）：请求的资源暂时被移动到新位置。响应中会包含新的 URL。
3. **304 Not Modified**：资源未被修改，客户端可以使用缓存的版本。

### 4xx - 客户端错误（Client Errors）

1. **400 Bad Request**：服务器无法理解请求的格式，客户端应修改请求后重试。
2. **401 Unauthorized**：请求未授权，需要进行身份验证。
3. **403 Forbidden**：服务器理解请求但拒绝执行。
4. **404 Not Found**：请求的资源不存在。
5. **405 Method Not Allowed**：请求方法不被服务器允许。
6. **408 Request Timeout**：服务器等待客户端发送请求超时。
7. **409 Conflict**：请求与资源的当前状态发生冲突。
8. **410 Gone**：请求的资源已永久删除，不再可用。

### 5xx - 服务器错误（Server Errors）

1. **500 Internal Server Error**：服务器内部错误，无法完成请求。
2. **501 Not Implemented**：服务器不支持请求的功能。
3. **502 Bad Gateway**：服务器作为网关或代理，从上游服务器收到无效响应。
4. **503 Service Unavailable**：服务器暂时不可用，通常是由于维护或过载。
5. **504 Gateway Timeout**：服务器作为网关或代理，未能及时从上游服务器接收响应。

### 扩展状态码

某些状态码不是在 HTTP/1.0 或 HTTP/1.1 标准中定义的，而是由扩展规范或应用程序引入的。例如：

1. **418 I'm a teapot**：一个愚人节玩笑的状态码，源自 1998 年的 RFC 2324（Hyper Text Coffee Pot Control Protocol）。
2. **429 Too Many Requests**：客户端在给定的时间内发送了太多请求。通常用于速率限制策略。

### 状态码分类总结

- **1xx 信息响应**：表示请求已被接受，需要继续处理。
- **2xx 成功**：表示请求已成功接收、理解、并处理。
- **3xx 重定向**：表示要完成请求，需要进行进一步操作。
- **4xx 客户端错误**：表示请求包含语法错误或无法完成。
- **5xx 服务器错误**：表示服务器在处理请求时发生错误。

## 267. 网络状态 301 vs 302 vs 303

### 301 Moved Permanently

**定义**：301 状态码表示请求的资源已被永久移动到新的 URI。未来的所有请求应使用新的 URI。

**特性**：

- **持久重定向**：资源的 URL 已永久更改，客户端和搜索引擎应更新书签和索引以使用新的 URL。
- **请求方法保持不变**：客户端将使用相同的请求方法（如 GET 或 POST）重新发起请求。

**使用场景**：

- 当网站迁移到新的域名时，旧的 URL 应重定向到新的 URL。
- 修正错误的 URL 结构，确保用户和搜索引擎使用正确的 URL。

**示例**：

```
HTTP/1.1 301 Moved Permanently
Location: https://www.newdomain.com/newpage
```

### 302 Found (Temporary Redirect)

**定义**：302 状态码表示请求的资源临时被移动到新的 URI。客户端应继续使用原有 URI 进行未来的请求。

**特性**：

- **临时重定向**：资源的 URL 可能会在未来恢复为原始 URL，客户端和搜索引擎不应更新书签或索引。
- **请求方法保持不变**：客户端将使用相同的请求方法重新发起请求，但实际行为可能会根据浏览器实现有所不同。

**使用场景**：

- 当资源暂时可用于另一个 URL，例如在网站维护或 A/B 测试期间。
- 临时移动页面，但计划稍后恢复原 URL。

**示例**：

```
HTTP/1.1 302 Found
Location: https://www.example.com/temporarypage
```

### 303 See Other

**定义**：303 状态码表示请求的资源已被移动到另一个 URI，客户端应使用 GET 方法请求新的 URI。

**特性**：

- **请求方法转换**：客户端应使用 GET 方法请求新的 URI，无论原始请求方法是什么。
- **避免 POST 重复提交**：常用于重定向 POST 请求的结果，以避免用户重复提交表单。

**使用场景**：

- 在提交表单后，重定向用户到一个确认页面。
- REST API 调用后，重定向到另一个资源或状态页面。

**示例**：

```
HTTP/1.1 303 See Other
Location: https://www.example.com/confirmationpage
```

### 区别总结

| 状态码 | 定义                       | 持久性 | 请求方法处理                   |
| ------ | -------------------------- | ------ | ------------------------------ |
| 301    | Moved Permanently          | 持久   | 保持不变                       |
| 302    | Found (Temporary Redirect) | 临时   | 通常保持不变，但可能依赖浏览器 |
| 303    | See Other                  | 临时   | 转换为 GET                     |

## 268. 400 vs 401 vs 403

HTTP 状态码 400、401 和 403 都表示客户端错误，但它们各自有不同的含义和使用场景。以下是每个状态码的详细解释及其区别：

### 400 Bad Request

**定义**：400 状态码表示服务器无法处理客户端发送的请求，因为请求有语法错误或参数错误。

**特性**：

- **请求无效**：客户端请求中存在语法错误、格式错误或无效参数，导致服务器无法理解请求。
- **常见原因**：错误的请求头、无效的请求参数、格式错误的 JSON 数据等。

**使用场景**：

- 客户端发送的请求有错误，服务器无法处理。
- API 调用中，客户端提交的参数不符合预期格式。

**示例**：

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Invalid request format"
}
```

### 401 Unauthorized

**定义**：401 状态码表示请求需要用户认证，但客户端未提供有效的身份验证凭据。

**特性**：

- **需要认证**：客户端必须提供有效的身份验证信息才能访问资源。
- **WWW-Authenticate 头**：响应头通常包含 `WWW-Authenticate` 字段，指示客户端需要提供哪种类型的认证。

**使用场景**：

- 用户未登录或登录凭据已过期。
- 需要验证用户身份的资源或 API 端点。

**示例**：

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Access to the site"

Content-Type: application/json

{
  "error": "Authentication required"
}
```

### 403 Forbidden

**定义**：403 状态码表示服务器理解请求，但拒绝执行。

**特性**：

- **拒绝访问**：客户端的身份验证信息有效，但客户端没有权限访问请求的资源。
- **权限问题**：通常与权限设置或访问控制有关。

**使用场景**：

- 用户已登录但没有权限访问特定资源。
- 资源被禁止访问，即使身份验证成功。

**示例**：

```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Access to this resource is forbidden"
}
```

### 区别总结

| 状态码 | 定义         | 含义                               | 使用场景                                               |
| ------ | ------------ | ---------------------------------- | ------------------------------------------------------ |
| 400    | Bad Request  | 请求有语法错误或参数错误           | 请求格式错误、参数无效、客户端提交的 JSON 格式错误等   |
| 401    | Unauthorized | 请求需要用户认证，但未提供有效凭据 | 用户未登录、认证信息无效或过期、需要登录才能访问的资源 |
| 403    | Forbidden    | 请求已被服务器理解，但拒绝执行     | 用户已登录但没有权限访问特定资源、资源被禁止访问       |

## 269. HTTP vs HTTPS

1. **安全性**：

   - **HTTP**：数据是明文传输的，容易被中间人攻击和窃取。
   - **HTTPS**：数据是加密传输的，可以有效防止数据被窃取和篡改。

2. **端口**：

   - **HTTP**：默认使用端口 80。
   - **HTTPS**：默认使用端口 443。

3. **证书**：

   - **HTTP**：不需要 SSL/TLS 证书。
   - **HTTPS**：需要由可信的证书颁发机构 (CA) 颁发的 SSL/TLS 证书。

4. **性能**：

   - **HTTP**：性能较高，因为没有加密和解密的开销。
   - **HTTPS**：略有性能开销，但现代硬件和优化后的加密算法使得性能影响很小。

5. **SEO 优势**：
   - **HTTPS**：搜索引擎（如 Google）更倾向于优先索引 HTTPS 网站，有助于提升 SEO 排名。

**选择使用 HTTPS 的理由**

1. **安全性**：保护用户的隐私和敏感信息，如登录凭据、支付信息等。
2. **数据完整性**：防止数据在传输过程中被篡改。
3. **用户信任**：浏览器会标识 HTTPS 网站为安全网站，提高用户的信任度。
4. **SEO 优势**：搜索引擎更倾向于优先索引 HTTPS 网站，有助于提升网站排名。
5. **符合标准**：现代 Web 标准和浏览器政策越来越倾向于强制使用 HTTPS，某些浏览器甚至会对 HTTP 网站显示不安全警告。

## 270. 描述下 HTTPS 的加密过程

详见 [Https 加密通信过程](/posts/https-encryption)

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
