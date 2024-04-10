---
title: Koa Usage
author: zhenyounide
pubDatetime: 2022-10-03T04:06:31Z
slug: koa-usage
featured: false
draft: false
tags:
  - summary
  - nodejs
description: Express 是第一代最流行的 web 框架，它对 Node.js 的 http 进行了封装, 但是它是基于 ES5 的语法，内部实现异步代码，只有一个方法：回调
---

### 开篇

1. 什么是 Express?

   Express 是第一代最流行的 web 框架，它对 Node.js 的 http 进行了封装

   但是它是'基于 ES5'的语法，内部实现异步代码，只有一个方法：'回调'

2. 什么是 KOA1.x?

   随着新版 Node.js 开始支持 ES6，Express 的团队又'基于 ES6'重新编写了下一代 web 框架 koa。

   和 Express 相比，koa 1.x'使用 generator 实现异步'.

   用 generator 实现异步比回调简单了不少，但是 generator 的本意并不是异步

3. 什么是 KOA2.x?

   koa 团队并没有止步于 koa 1.x，他们非常超前地'基于 ES7'开发了 koa2，

   和 koa 1 相比，koa2 完全'使用 Promise 并配合 async 来实现异步'

4. Express、Koa1.x、Koa2.x 区别

   - 最大的区别就是内部实现异步的方式不同

     - Express 使用回调函数实现异步, 容易出现回调地狱问题, 但是语法更老兼容性更好
     - Koa1.x 使用 generator 实现异步, 解决了回调地域问题, 但是 generator 的本意并不是异步
     - Koa2.x 使用 Promise 并配合 async 来实现异步, 解决了回调地域问题, 但是语法太新兼容性不好

   - 第二大的区别就是重量级不同

     Express 中内置了很多封装好的功能, 而 Koa 中将这些功能都封装到了独立的模块中

     想要使用这些功能必须先安装对应的模块才能使用, 所以 Koa 比 Express 更轻量级

### 基本使用

1. 如何使用 Koa?

   - 手动安装手动配置

   - 利用 Koa 脚手架工具安装使用(Koa-generator)

2. 手动安装手动配置 https://www.npmjs.com/package/koa

#### 手动安装手动配置

1. `npm install koa`

2. app.js

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   // 2.创建服务端实例对象
   const app = new Koa();

   // response
   app.use(ctx => {
     ctx.body = "Hello Koa";
   });

   // 3.指定监听的端口
   app.listen(3000);
   ```

#### 处理静态资源

1. Koa 如何处理静态资源?

   Koa 是一个轻量级的框架, 它将所有的附加功能都封装到了独立的模块中

   所以想要使用这些功能, 都必须先安装才能使用

   https://www.npmjs.com/package/koa-static

   `npm install koa-static`

2. app.js

   ```js
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   // 2.创建服务端实例对象
   const app = new Koa();

   app.use(serve("public")); // 注册处理静态资源的中间件
   // response
   app.use(ctx => {
     ctx.body = "Hello Koa";
   });

   // 3.指定监听的端口
   app.listen(3000);
   ```

3. 访问`localhost:3000/login.html`

##### 处理动态网页

1. Koa 如何处理动态资源?

   https://www.npmjs.com/package/koa-views

   `npm install koa-views`

2. app.js

   ```js
   //1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块

   // 2.创建服务端实例对象
   const app = new Koa();

   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" }));

   // response
   // koa中的ctx就是express中的req,res的结合体
   app.use(async (ctx, next) => {
     // ctx.body = 'Hello Koa';
     await ctx.render("index", { msg: "妮妮碎碎念" });
   });

   // 3.指定监听的端口
   app.listen(3000);
   ```

3. 访问`localhost:3000`

#### 处理路由

1. Koa 如何处理路由?

   https://www.npmjs.com/package/koa-router

   https://github.com/ZijianHe/koa-router

   `npm install koa-router`

2. app.js

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块
   const Router = require("koa-router"); // 导入处理路由的模块
   const router = new Router(); // 创建路由对象

   // 2.创建服务端实例对象
   const app = new Koa();

   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" })); // 注册处理动态资源的中间件

   // 处理路由
   router.get("/api/goods/list", (ctx, next) => {
     ctx.body = "get /api/goods/list"; // ctx.body === res.writeHeader + res.end
   });
   router.get("/api/user/login", (ctx, next) => {
     ctx.body = {
       method: "get",
       name: "xxn",
       age: 66,
     };
   });
   router.post("/api/goods/detail", (ctx, next) => {
     ctx.body = "post /api/goods/detail";
   });
   router.post("/api/user/register", (ctx, next) => {
     ctx.body = {
       method: "post",
       name: "666",
       age: 33,
     };
   });

   app
     .use(router.routes()) // 启动路由功能
     .use(router.allowedMethods()); // 自动设置响应头

   // 3.指定监听的端口
   app.listen(3000);
   ```

3. 访问`localhost:3000`

#### 处理 get 请求

1. Koa 如何处理 Get 请求参数?

   - 处理传统 get 参数

   - 处理动态路由形式 get 参数

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块
   const Router = require("koa-router"); // 导入处理路由的模块
   const router = new Router(); // 创建路由对象

   // 2.创建服务端实例对象
   const app = new Koa();

   router.get("/user", (ctx, next) => {
     let request = ctx.request;
     console.log(request.query); // 获取转换成对象之后的get请求参数
     console.log(request.querystring); // 获取字符串形式的get请求参数
   });
   router.get("/login/:name/:age", (ctx, next) => {
     console.log(ctx.params);
   });
   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" })); // 注册处理动态资源的中间件

   // 处理路由

   app
     .use(router.routes()) // 启动路由功能
     .use(router.allowedMethods()); // 自动设置响应头

   // 3.指定监听的端口
   app.listen(3000);
   ```

#### 处理 post 请求

1. Koa 如何处理 Post 请求参数?

   - 借助 koa-bodyparser 中间件

   - koa-bodyparser 中间件会将 post 请求参数转换成对象之后放到请求对象的 body 中

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块
   const Router = require("koa-router"); // 导入处理路由的模块
   const router = new Router(); // 创建路由对象
   const bodyParser = require("koa-bodyparser"); // 导入处理post请求参数的模块

   // 2.创建服务端实例对象
   const app = new Koa();

   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" })); // 注册处理动态资源的中间件

   app.use(bodyParser()); // 注册处理post请求参数的中间件
   // 处理路由
   router.post("/user", (ctx, next) => {
     let request = ctx.request;
     console.log(request.body);
   });

   app
     .use(router.routes()) // 启动路由功能
     .use(router.allowedMethods()); // 自动设置响应头

   // 3.指定监听的端口
   app.listen(3000);
   ```

#### 处理 cookie

1. Koa 如何处理 cookie?

   Koa 中处理 cookie 不需要引入其他模块, 只要拿到 ctx 对象就可以操作 cookie

   https://demopark.github.io/koa-docs-Zh-CN/

   https://demopark.github.io/koa-docs-Zh-CN/api/context.html

   _注意点：如何在 koa 中存储值为中文的 cookie_

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块
   const Router = require("koa-router"); // 导入处理路由的模块
   const router = new Router(); // 创建路由对象
   const bodyParser = require("koa-bodyparser"); // 导入处理post请求参数的模块

   // 2.创建服务端实例对象
   const app = new Koa();

   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" })); // 注册处理动态资源的中间件
   app.use(bodyParser()); // 注册处理post请求参数的中间件

   // 处理路由
   router.get("/setCookie", (ctx, next) => {
     // ctx.cookies.set('name', 'nini', {
     //     path: '/',
     //     httpOnly: true,
     //     maxAge: 24 * 60 * 60 * 1000
     // });
     // 注意点: 在koa中不能给cookie设置中文的值
     let value = new Buffer("妮妮").toString("base64");
     ctx.cookies.set("userName", value, {
       path: "/",
       httpOnly: true,
       maxAge: 24 * 60 * 60 * 1000,
     });
     // let value = new Buffer('妮妮').toString('base64');
     // console.log(value); // 5p2O5Y2X5rGf
     // let res = new Buffer('5p2O5Y2X5rGf', 'base64').toString();
     // console.log(res);
   });
   router.get("/getCookie", (ctx, next) => {
     // console.log(ctx.cookies.get('name'));
     let value = ctx.cookies.get("userName");
     let res = new Buffer(value, "base64").toString();
     console.log(res);
   });
   app
     .use(router.routes()) // 启动路由功能
     .use(router.allowedMethods()); // 自动设置响应头

   // 3.指定监听的端口
   app.listen(3000);
   ```

#### 处理错误

1. Koa 如何处理错误?

   使用 koa-onerror 模块

   https://www.npmjs.com/package/koa-onerror

   ```js
   // 1.导入Koa
   const Koa = require("koa");
   const serve = require("koa-static"); // 导入处理静态资源的模块
   const views = require("koa-views"); // 导入处理动态资源的模块
   const Router = require("koa-router"); // 导入处理路由的模块
   const router = new Router(); // 创建路由对象
   const bodyParser = require("koa-bodyparser"); // 导入处理post请求参数的模块
   const onerror = require("koa-onerror"); // 导入处理错误的模块

   // 2.创建服务端实例对象
   const app = new Koa();
   onerror(app); // 告诉koa-onerror我们需要捕获所有服务端实例对象的错误

   app.use(serve("public")); // 注册处理静态资源的中间件
   app.use(views("views", { extension: "ejs" })); // 注册处理动态资源的中间件
   app.use(bodyParser()); // 注册处理post请求参数的中间件

   // 处理路由
   router.get("/api/user/login", (ctx, next) => {
     ctx.body = "我是登录";
   });
   router.get("/api/user/register", (ctx, next) => {
     ctx.body = "我是注册";
   });
   app
     .use(router.routes()) // 启动路由功能
     .use(router.allowedMethods()); // 自动设置响应头

   // 处理错误
   app.use((err, ctx) => {
     console.log(err.status, err.message);
     ctx.body = err.message;
   });

   // 3.指定监听的端口
   app.listen(3000);
   ```

撒花撒花~~

#### 使用脚手架

1. 全局安装 koa-generator

   - `npm install -g koa-generator`

   - quickly start

     `koa demo && cd demo`

     `koa2 demo && cd demo`

2. 与 express-generator 不同的是，通过 koa-generator 生成项目里已经使用了 nodemon，无序额外安装及设置

3. 目录结构介绍-参照 express

   app.js

   ```js
   const Koa = require("koa"); // 导入koa
   const app = new Koa(); // 创建服务端实例对象
   const views = require("koa-views"); // 导入了处理动态资源包
   const json = require("koa-json"); // 导入了输出json格式的包
   const onerror = require("koa-onerror"); // 导入了处理错误的包
   const bodyparser = require("koa-bodyparser"); // 导入了处理post请求参数包
   const logger = require("koa-logger"); // 导入了记录日志包

   const index = require("./routes/index"); // 导入了封装好的路由
   const users = require("./routes/users");

   // error handler
   onerror(app); // 告诉系统需要捕获哪一个程序的错误

   // 注册了解析post请求参数的中间件
   app.use(
     bodyparser({
       enableTypes: ["json", "form", "text"],
     })
   );
   app.use(json());
   // 注册了记录日志的中间件
   app.use(logger());
   // 注册了处理静态资源的中间件
   app.use(require("koa-static")(__dirname + "/public"));
   // 注册了处理动态资源的中间件
   app.use(
     views(__dirname + "/views", {
       extension: "pug",
     })
   );

   // 记录日志
   app.use(async (ctx, next) => {
     const start = new Date();
     await next();
     const ms = new Date() - start;
     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
   });

   // 注册启用了路由
   app.use(index.routes(), index.allowedMethods());
   app.use(users.routes(), users.allowedMethods());

   // 处理错误
   app.on("error", (err, ctx) => {
     console.error("server error", err, ctx);
   });

   module.exports = app;
   ```
