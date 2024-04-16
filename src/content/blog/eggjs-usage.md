---
title: Eggjs Usage - better enterprise frameworks and apps with Node.js & Koa
author: zhenyounide
pubDatetime: 2022-10-04T04:06:31Z
slug: eggjs-usage
featured: false
draft: false
tags:
  - summary
  - nodejs
description: better enterprise frameworks and apps with Node.js & Koa
---

## Table of contents

# 开篇

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
