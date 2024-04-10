---
title: Express Usage
author: zhenyounide
pubDatetime: 2022-10-02T04:06:31Z
slug: express-usage
featured: false
draft: false
tags:
  - summary
  - nodejs
description: 一个基于 NodeJS 的 Web Server 开发框架, 能够帮助我们快速的搭建 Web 服务器
---

### Express 介绍

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

### 基本使用

1. 如何使用 Express?

   - 手动安装手动配置

   - 利用 Express 脚手架工具安装使用(Express-generator)

2. 手动安装手动配置

   https://www.npmjs.com/package/express

#### 手动安装手动配置

##### 基本使用

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

##### 处理静态网页

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

##### 处理动态网页

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

##### 处理路由

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

##### 处理请求参数

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

##### 处理 cookie

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

##### next 方法

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

##### 处理错误

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

##### 中间件

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

#### 脚手架使用

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
