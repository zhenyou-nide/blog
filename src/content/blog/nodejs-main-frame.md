---
title: 常见 node.js 框架
author: zhenyounide
pubDatetime: 2022-10-04T04:06:31Z
slug: nodejs-main-frame
featured: false
draft: true
tags:
  - summary
  - nodejs
description: better enterprise frameworks and apps with Node.js
---

## Table of contents

# Koa.js

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

## 基本使用

1. 如何使用 Koa?

   - 手动安装手动配置

   - 利用 Koa 脚手架工具安装使用(Koa-generator)

2. 手动安装手动配置 https://www.npmjs.com/package/koa

### 手动安装手动配置

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

### 处理静态资源

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

#### 处理动态网页

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

### 处理路由

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

### 处理 get 请求

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

### 处理 post 请求

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

### 处理 cookie

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

### 处理错误

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

### 使用脚手架

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

---

# Express

1. 什么是 Express?

   Express 是一个基于 NodeJS 的 Web Server 开发框架, 能够帮助我们快速的搭建 Web 服务器

2. 为什么需要 Express?

   - 利用原生的 NodeJS 开发 Web 服务器,

     我们需要处理很多繁琐且没有技术含量的内容

     例如: 获取路由->解析路由->分配路由->处理路由等

     但是有了 Express 之后, 就能帮助我们省去大量繁琐的环节, 让我们只用关注核心业务逻辑

   - 利用原生的 NodeJS 开发 Web 服务器,

     我们需要自己手动去实现静态/动态资源处理, get/post 参数的解析, cookie 的解析, 日志处理等

     但是有了 Express 之后, 已经有现成的插件帮我们实现了上述功能

   - 所以作为单身的程序猿(媛), 如果你还想留一些时间去约会, 那么 Express 是你的最佳选择

3. 永不过时的 Express

   - Express 最早的版本是在 2010 年发布的, 目前最新的版本是 5.0 是在 2015 年左右发布的

   - 虽然 Express 是一个古老的框架, 但是它并没有过时，因为

     - 公司老项目仍然在使用
     - 目前比较火的 KOA 就是 Express 原班人马打造的(几乎有这相同的 API)
     - 目前比较火的 EggJS 就是 KOA 打造的

     所以

     - 学会 Express 能够帮助你很好的维护公司的老项目
     - 学会 Express 能够帮助你更快的学习 KOA 和 EggJS

## 基本使用

1. 如何使用 Express?

   - 手动安装手动配置

   - 利用 Express 脚手架工具安装使用(Express-generator)

2. 手动安装手动配置

   https://www.npmjs.com/package/express

### 手动安装手动配置

#### 基本使用

1. `npm init && npm install express`

2. app.js

   ```js
   // 1.导入express
   const express = require("express");

   // 2.调用express方法, 创建服务端实例对象
   const app = express();
   app.get("/", (req, res, next) => {
     res.writeHead(200, {
       "Content-Type": "text/plain; charset=utf-8;",
     });
     res.end("www.baidu.com");
   });

   // 3.告诉服务端需要监听哪一个端口
   app.listen(3000, () => {
     console.log("listen ok");
   });
   ```

3. 访问`localhost:3000`

#### 处理静态网页

1. 将静态资源 public 文件夹复制到项目目录下

2. app.js

   ```js
   // 1.导入express
   const express = require("express");
   const path = require("path");

   // 2.调用express方法, 创建服务端实例对象
   const app = express();

   // 处理静态资源
   app.use(express.static(path.join(__dirname, "public")));

   app.get("/", (req, res, next) => {
     res.writeHead(200, {
       "Content-Type": "text/plain; charset=utf-8;",
     });
     res.end("www.it666.com");
   });

   // 3.告诉服务端需要监听哪一个端口
   app.listen(3000, () => {
     console.log("listen ok");
   });
   ```

3. 访问`localhost:3000/login.html`

#### 处理动态网页

1. 讲动态网页 views 文件夹复制到项目目录下

2. 安装 ejs

   `npm install ejs`

3. app.js

   ```js
   // 1.导入express
   const express = require("express");
   const path = require("path");

   // 2.调用express方法, 创建服务端实例对象
   const app = express();

   // 处理静态资源
   app.use(express.static(path.join(__dirname, "public")));

   // 处理动态资源
   // 1.告诉express动态资源存储在什么地方
   app.set("views", path.join(__dirname, "views"));
   // 2.告诉express动态网页使用的是什么模板引擎
   app.set("view engine", "ejs");
   // 3.监听请求, 返回渲染之后的动态网页
   app.get("/", (req, res, next) => {
     // 注意点: express给请求对象和影响对象添加了很多自定义的方法
     res.render("index", { msg: "妮妮碎碎念" });
   });

   // 3.告诉服务端需要监听哪一个端口
   app.listen(3000, () => {
     console.log("listen ok");
   });
   ```

   _报错：_

   `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received an instance of Object`

   _解决_

   删除 node_module,重新安包

#### 处理路由

- 方式一

  app.js

  ```js
  // 通过express处理路由方式一
  app.get("/api/goods/list", (req, res, next) => {
    res.end("nini.get");
  });
  app.get("/api/user/login", (req, res, next) => {
    // 注意点: 响应对象的json方法是express给响应对象扩展的
    //         这个方法会自动将对象转换成字符串之后返回
    //         这个方法还会自动帮助我们设置响应头
    res.json({
      name: "nini",
      age: 18,
      method: "get",
    });
  });

  app.post("/api/goods/detail", (req, res, next) => {
    res.end("nini.detail.post");
  });
  app.post("/api/user/register", (req, res, next) => {
    res.json({
      name: "nini",
      age: 18,
      method: "post",
    });
  });
  ```

- 方式二

  1. 新建 router 目录

  2. router 下新建 user.js，goods.js

     /router/user.js

     ```js
     const express = require("express");
     const router = express.Router();
     // 会将注册的地址和当前的地址拼接在一起来匹配
     // /api/user/login
     router.get("/login", (req, res, next) => {
       // 注意点: 响应对象的json方法是express给响应对象扩展的
       //         这个方法会自动将对象转换成字符串之后返回
       //         这个方法还会自动帮助我们设置响应头
       res.json({
         name: "nini",
         age: 18,
         method: "get",
       });
     });
     router.post("/register", (req, res, next) => {
       res.json({
         name: "nini",
         age: 18,
         method: "post",
       });
     });
     module.exports = router;
     ```

  3. app.js

     ```js
     const userRouter = require('./router/user');
     ...
     // 通过express处理路由方式二
     app.use('/api/user', userRouter);
     ```

#### 处理请求参数

1. get 请求：express 会将 get 的请求参数转换成对象之后, 放到请求对象的 query 属性中

   ```js
   app.get("/get", (req, res, next) => {
     console.log(req.query);
   });
   ```

2. post 请求：

   ```js
   // 告诉express能够解析 application/json类型的请求参数
   app.use(express.json());
   // 告诉express能够解析 表单类型的请求参数 application/x-www-form-urlencoded
   // extended: false 使用系统自带
   app.use(express.urlencoded({ extended: false }));
   // express会将解析之后, 转换成对象的post请求参数放到请求对象的body属性中
   app.post("/post", (req, res, next) => {
     console.log(req.body);
   });
   ```

#### 处理 cookie

1. 设置 cookie

   ```js
   app.get("/setCookie", (req, res, next) => {
     res.cookie("username", "nini", {
       httpOnly: true,
       path: "/",
       maxAge: 10000,
     });
     res.end();
   });
   ```

2. 获取 cookie

   - 安装插件`npm install cookie-parser`

   ```js
   const cookieParser = require('cookie-parser')
   ...
   app.use(cookieParser());
   app.get('/getCookie', (req, res, next)=>{
       console.log(req.cookies);
   });
   ```

#### next 方法

默认情况下会从上至下的匹配路由处理方法, 一旦匹配到了就会执行,

执行完毕之后如果没有调用 next 就停止,

执行完毕之后如果调用了 next 就继续向下匹配

通过 next 方法, 我们可以将同一个请求的多个业务逻辑拆分到不同的方法中处理

这样可以提升代码的可读性和可维护性, 以及保证代码的单一性

```js
app.get(
  "/api/user/info",
  (req, res, next) => {
    console.log("验证用户是否登陆");
    next();
  },
  (req, res, next) => {
    console.log("用户已经登陆, 可以查看用户信息");
  }
);
```

#### 处理错误

1. 安装 createError

   `npm install createError`

2. app.js

   ```js
   const createError = require('http-errors');
   ...
   // express错误处理
   app.get('/api/user/login', (req, res, next)=>{
       res.end('login');
   });
   app.get('/api/user/register', (req, res, next)=>{
       res.end('register');
   });
   /*
   由于在处理请求的时候会从上至下的匹配
   由于前面的处理方法都没有调用next方法, 所以处理完了就不会再继续向下匹配了
   由于use没有指定路由地址, 由于use既可以处理get请求, 又可以处理post请求
   所以只要前面的路由都没有匹配到, 就会执行下面的use
   * */
   app.use((req, res, next)=>{
       next(createError(404));
   });
   app.use((err, req, res, next)=>{
       console.log(err.status, err.message);
       res.end(err.message);
   });
   ```

#### 中间件

1. 什么是中间件?

   - 中间件的本质就是一个函数, 这个函数接收 3 个参数 request 请求对象、response 响应对象、next 函数
   - 当请求进来，会从第一个中间件开始进行匹配。如果匹配则进入，如果不匹配，则向后依次对比匹配

2. 中间件的作用?

- 将一个请求的处理过程，分发到多个环节中，目的效率高，便于维护。即每个环节专门干一件事

3. 中间件的分类

   - 应用级别中间件

     绑定到 app 实例上的中间件

     例如: app.get / app.post

   - 路由级别中间件

     绑定到 router 实例上的中间件

     例如: router.get / router.post

   - 错误处理中间件

     与其他中间件函数的定义基本相同，

     不同之处在于错误处理函数多了一个变量：err，即它有 4 个变量：err, req, res, next

   - 内置中间件

     express.static()、express.json()、express.urlencoded()、...

   - 第三方中间件

     cookie-parser、...

### 脚手架使用

1. 全局安装 express-generator

   `npm install -g express-generator`

2. `express demo`

3. `cd demo && npm install`

4. 为方便调试，继续安装 nodemon、cross-env

   `npm install nodemon cross-env`

5. 目录结构介绍

   - bin/www.js：服务端配置文件（创建服务端实例以及设置监听的端口）

   - node_module：依赖

   - public：静态资源

   - routes：处理路由的文件

   - views：存放动态网页

   - app.js：编写业务逻辑

     ```js
     // 导入了一些第三方的模块
     var createError = require("http-errors");
     var express = require("express");
     var path = require("path");
     var cookieParser = require("cookie-parser");
     var logger = require("morgan");

     // 导入了处理路由的模块
     var indexRouter = require("./routes/index");
     var usersRouter = require("./routes/users");

     // 创建了服务端实例对象
     var app = express();

     // 处理动态网页
     app.set("views", path.join(__dirname, "views"));
     app.set("view engine", "jade");

     app.use(logger("dev"));
     // 处理post请求参数
     app.use(express.json());
     app.use(express.urlencoded({ extended: false }));
     // 解析cookie
     app.use(cookieParser());

     // 处理静态网页
     app.use(express.static(path.join(__dirname, "public")));

     // 注册处理路由模块
     app.use("/", indexRouter);
     app.use("/users", usersRouter);

     // 处理错误
     // catch 404 and forward to error handler
     app.use(function (req, res, next) {
       next(createError(404));
     });
     // error handler
     app.use(function (err, req, res, next) {
       // set locals, only providing error in development
       res.locals.message = err.message;
       res.locals.error = req.app.get("env") === "development" ? err : {};

       // render the error page
       res.status(err.status || 500);
       res.render("error");
     });

     module.exports = app;
     ```

---

# Egg.js

1. 什么是 Egg.js?

   - Express 是基于 ES5 的 web 开发框架

   - Koa1.x 是 Express 原班人马打造的基于 ES6 的 web 开发框架

   - Koa2.x 是 Express 原班人马打造的基于 ES7 的 web 开发框架

   - Egg 是'阿里巴巴'基于 Koa 的'有约束和规范'的'企业级 web 开发框架'

   三个框架之间的关系其实是一部'编程界的进化论'

2. Egg.js 发展史

   2013 年蚂蚁的 chair 框架，可以视为 egg 的前身。

   2015 年 11 月，在苏千的召集下，阿里各 BU(Business Unit) 的前端骨干齐聚黄龙，闭门共建。

   2016 年中，广泛使用在绝大部分阿里的前端 Node.js 应用。

   2016 年 09 月，在 JSConf China 2016 上亮相并宣布开源。

   2017 年初，官网文档 egg - 为企业级框架和应用而生 亮相

3. Egg.js 在阿里的应用

   阿里旗下蚂蚁金服，天猫，UCWeb，村淘，神马搜索等项目的基础框架都是在 egg 之上扩展的

4. 为什么是 Egg, 而不是 Express 或 Koa?

   - Express 和 Koa 没有约束和规范, 会导致团队的沟通成本和项目的维护成本变高

     EggJS 有约束和规范, 会大大降低团队的沟通成本和项目的维护成本

   - 阿里内部大量企业级项目使用 egg 开发, 实践出真知

   - Node 社区 5 位国人核心贡献者 4 人在阿里, 技术有保障

   - 阿里前端安全专家，负责 egg-security 等 类库, 安全有保障

5. 什么是有约束和规范?

   和 ESLint 检查 JS 代码一样, 有一套标准, 必须严格遵守这套标准 ,否则就会报错

   https://eggjs.org/zh-cn/basics/structure.html

6. 什么是 MVC?

   M(Model) :处理应用程序'数据逻辑'的部分(service)

   V(View) :处理数据显示的部分(静态/动态网页)

   C(Controller):处理应用程序业务逻辑, 数据和页面的桥梁(controller)

   推荐阅读: https://github.com/atian25/blog/issues/18

## 基本使用

### 手动安装手动配置

1. `npm init --y`

2. `npm i egg --save` 其中 egg 模块就是 egg.js 的核心模块

3. `npm i egg-bin --save-dev` 其中 egg-bin 用于快速启动项目，用于本地开发调试

4. scripts 脚本中

   `“dev”:"egg-bin dev”`

```
基本目录
egg-example
├── app  #开发目录
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config  #配置目录
│   └── config.default.js
└── package.json
```

config/config.default.js 中

```js
exports.keys = "nini"; // 用户生成客户端中保存的userID
```

app/router.js

```js
// 在router.js中必须暴露出去一个方法, 这个方法接收一个参数, 这个参数就是服务端的实例对象
// console.log(app);
module.exports = app => {
  /*
    {
      env: 'local',
      name: 'egg-example',
      baseDir: 'C:\\Users\\Jonathan_Lee\\Desktop\\Node_Common\\egg-example',
      subdomainOffset: 2,
      config: '<egg config>',
      controller: '<egg controller>',
      httpclient: '<egg httpclient>',
      loggers: '<egg loggers>',
      middlewares: '<egg middlewares>',
      router: '<egg router>',
      serviceClasses: '<egg serviceClasses>'
    }
    * */
  // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
  const { router, controller } = app;
  // 2.利用处理路由的对象监听路由的请求
  //   由于EggJS是基于KOA的, 所以监听方式和KOA一样
  /*
    在EggJS中不用导入控制器, 只要拿到了从服务器实例中解构出来的控制器对象
    就相当于拿到了controller目录, 我们就可以通过点语法拿到这个目录中的文件
    只要拿到了controller目录中的文件, 我们就可以通过点语法拿到这个文件中的方法
    * */
  router.get("/", controller.home.index);
};
```

app/controller/home.js

```js
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    /*
        在EggJS中, EggJS会自动给控制器的this挂载一些属性
        this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
        this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
        this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
        this.config：应用运行时的配置项。
        this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。
        * */
    this.ctx.body = "nini-hub";
  }
}

module.exports = HomeController;
```

### 处理请求

app/controller/home.js

```js
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "www.it666.com";
  }
  async getQuery() {
    // 获取传统get请求参数
    // this.ctx.request.query
    let query = this.ctx.query;
    this.ctx.body = query;
  }
  async getParams() {
    // 获取动态路由形式的get请求参数
    let params = this.ctx.params;
    this.ctx.body = params;
  }
  async getBody() {
    // 获取post请求参数
    let body = this.ctx.request.body;
    this.ctx.body = body;
  }
}

module.exports = HomeController;
```

app/router.js

```js
module.exports = app => {
  // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
  const { router, controller } = app;
  // 2.利用处理路由的对象监听路由的请求
  router.get("/", controller.home.index);
  /*
    1.EggJS如何处理Get/Post请求参数?
    "和Koa一样"
    * */
  router.get("/user", controller.home.getQuery);
  router.get("/register/:name/:age", controller.home.getParams);
  router.post("/login", controller.home.getBody);
  // 需要额外安全配置
};
```

config/config.default.js

```js
// exports.keys = 'nini.test'; // 用于生成客户端中保存的userId
module.exports = {
  keys: "nini.test",
  security: {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  },
};
```

### 处理静态资源

1. 将静态资源放置于 app/public 下

   直接访问http://127.0.0.1:7001/public/login.html

### 处理动态网页

1. EggJS 如何处理动态资源?

   - 什么是插件?

     EggJS 中的插件就是特殊的中间件

     用来处理那些和请求无关独立的业务逻辑

     https://eggjs.org/zh-cn/basics/plugin.html

   - 插件的使用

     `npm i egg-view-ejs --save`

2. 代码

   1. 在 app 目录中新建 view 目录, 将动态网页放到这个目录中

   2. 在 config/新建 plugin.js

      ```js
      exports.ejs = {
        enable: true,
        package: "egg-view-ejs",
      };
      ```

   3. 在 config.default.js 中新增如下配置

      ```js
          view:{
              mapping:{
                  '.html':'ejs'
              }
          }
      ```

   4. 在控制器中通过上下文 render 方法渲染

      ```js
          async getHome(){
              await this.ctx.render('index', {msg:'妮妮'});
          }
      ```

### 处理网络请求

EggJS 处理数据

在 EggJS 中无论是处理数据库中的数据还是处理网络数据, 都是在 Service 中处理的

1. 在 app 目录下新建 service 目录

2. 在 service 新建 home.js

   - 和控制器一样, Service 类的 this 上也挂载了很多属性

     - this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法
     - this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法
     - this.service：应用定义的 Service，通过它我们可以访问到其他业务层，等价于 this.ctx.service
     - this.config：应用运行时的配置项
     - this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置

   - ervice 的上下文属性上还挂载了一些其它的属性
     - this.ctx.curl 发起网络调用
     - this.ctx.service.otherService 调用其他 Service
     - this.ctx.db 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块

   ```js
   const Service = require("egg").Service;

   class HomeService extends Service {
     async findNews() {
       // 在Service定义的方法中处理数据库和网络的数据即可
       // 发送get不带参数的请求
       // let response = await this.ctx.curl('http://127.0.0.1:3000/getUser');
       // 发送get带参数的请求
       // let response = await this.ctx.curl('http://127.0.0.1:3000/getUser2?name=nini&age=16');
       // 发送post不带参数的请求
       // let response = await this.ctx.curl('http://127.0.0.1:3000/getNews', {
       //     method: 'post'
       // });
       // 发送post带参数的请求
       let response = await this.ctx.curl("http://127.0.0.1:3000/getNews2", {
         method: "post",
         data: {
           name: "nini",
           age: 18,
         },
       });
       let data = JSON.parse(response.data);
       console.log("HomeService", data);
       return data;
     }
   }

   module.exports = HomeService;
   ```

3. app/router.js

   新增`router.get('/news', controller.home.getNews);`;

4. app/controller/home.js

   ```js
       async getNews(){
           let data = await this.ctx.service.home.findNews();
           this.ctx.body = data;
       }
   ```

### service 注意点

### 处理 cookie

### 处理日志

### 定时任务

### 自定义启动项

### 框架拓展

### 利用 egg 脚手架工具安装使用（egg-init）
