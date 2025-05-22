---
title: 记录几个常见面试大大大题汇总
author: zhenyounide
pubDatetime: 2020-03-09T10:16:11Z
slug: interview-collection
featured: false
draft: true
tags:
  - interview
description: ""
---

## Table of contents

# 渲染方式

## 单页 Web 应用（SPA - Single Page web Application）

理解：只有一个 HTML 文件的 Web 应用, 我们就称之为单页 Web 应用, 就称之为 SPA 应用

### SPA 的特点

1. SPA 应用只有一个 HTML 文件, 所有的内容其实都在这个页面中呈现的

2. SPA 应用只会加载一次 HTML 文件, 不会因为用户的操作而进行页面的重新加载

3. 当用户与应用程序交互时, 是通过动态更新页面内容的方式来呈现不同的内容

### SPA 优点

1. 有良好的交互体验

   不会重新加载整个网页, 只是局部更新

2. 前后端分离开发

   前端负责页面呈现和交互, 后端负责数据

3. 减轻服务器压力

   只用处理数据不用处理界面

4. 共用一套后端程序代码

### SPA 缺点

1. SEO 难度较高

   只有一个界面, 无法针对不同的内容编写不同的 SEO 信息

2. 初次加载耗时多

   为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将所有 JavaScript、CSS 统一加载，

## 如何解决单页面应用的 SEO 困难问题?

解决这个问题之前首先我们需要了解常见的三种网页渲染方式

#### 客户端渲染(CSR - Client Side Render)

后端只提供数据，前端做视图和交互逻辑(SPA 应用就是典型的客户端渲染)

##### 客户端渲染过程

1. 客户端请求 html (请求)

2. 服务端返回 html

3. 客户端渲染 HTML,找到依赖的 JS/CSS 文件

4. 客户端请求对应的 JS/CSS 文件 (请求)

5. 服务端返回对应的 JS/CSS 文件

6. 客户端等待 JS/CSS 文件下载完成

7. 客户端加载并初始化下载好的 JS 文件

8. 客户端执行 JS 代码向后端请求数据 (请求)

9. 服务端返回数据

10. 客户端利用服务端返回的数据填充网页

##### 优缺点

**最大优点:** 交互体验好可以做局部更新

**最大缺点:** 首屏加载慢(因为要等到 HTML 下载完才会去下载 JS/CSS, 要等到 JS 下载完初始化完才会去获取数据),

#### 服务端渲染(SSR - Server Side Render)

后端既提供数据又提供视图和交互逻辑

也就是服务器接到客户端请求之后，找到对应的数据并根据找到的数据生成对应的视图

然后将包含数据的视图一次性发给客户端，客户端直接将渲染即可

##### 服务端渲染过程

1. 客户端请求 html (请求)

2. 服务端内部查找对应的 html 文件和数据

3. 服务器内部根据数据 html 文件和数据生成完整网页

4. 服务端返回完整网页

5. 客户端渲染 HTML,找到依赖的 JS/CSS 文件

6. 客户端请求对应的 JS/CSS 文件 (请求)

7. 客户端等待 JS/CSS 文件下载完成

8. 客户直接展示网页

##### 优缺点

**最大优点:** 首屏加载快(因为服务器返回的网页已经包含数据, 所以之下载完 JS/CSS 就可以直接渲染)

​ 每次请求返回的都是一个独立完成的网页, 更利于 SEO

**最大缺点:**网络传输数据量大

#### 预渲染

无需服务器实时动态编译，采用预渲染，在构建时针对特定路由简单的生成静态 HTML 文件

本质就是客户端渲染, 只不过和 SPA 不同的是预渲染有多个界面

##### 优缺点

**最大优点:** 由于有多个界面, 所以更利于 SEO

**最大缺点:** 首屏加载慢, 预编译会非常的慢

#### 如何选择

1. 注重 SEO 的新闻、电商网站，建议采用服务器端渲染

2. 强交互的页面，不注重 SEO，采用客户端渲染

3. 两者之间, 只需改善少数页面的 SEO，采用预渲染

# 页面性能优化

浏览器有一个重要的对象 performance，很多的和时间节点有关的数据都可以从这个对象上去获取
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

## 渲染优化

### 布局和绘制

动画可以走复合的过程，不会触发回流和重绘；
复合是关键渲染路径中最后一个环节，主要的作用就是把页面拆解成不同的图层；使用 transform 和 opacity 可以把涉及到的元素提取到一个图层，那么这些元素的发生视觉上变化的时候就只会触发复合，而不会触发布局和重绘。

### 高频事件防抖

比如滚动，这类事件在一帧里会触发多次，我们只关心滚动到哪里，解决页面卡顿大利器 requestAnimationFrame（每一帧的布局和绘制之前）。

### 代码优化

1. js 优化
   同时 100kb 的文件，js 和图片加载时间相同，但是 js 之后要经过编译，解析，执行等等更耗时，虽然这个过程是跟浏览器处理引擎有关，但如果再代码层面进行配合，实际上可以优化这个过程
   两种方案：代码拆分，按需加载，和 tree shaking（代码减重）；另外从解析和执行来看，应该减少主线程的工作量，避免长任务，避免超过 1kb 的脚本，使用 raf 进行时间调度
2. html 优化
   减少 iframes 使用；避免节点深层次嵌套；避免 table 布局，开销很大；css js 尽量外链

## 资源优化

### 压缩与合并

减少 http 请求数，减少请求资源大小
html 压缩：使用 HtmlWebpackPlugin 的时候配置 minify
css 压缩：mini-css-extract-plugin
js 压缩：
uglifyjs：单线程压缩代码，也就是说多个 js 文件需要被压缩，它需要一个个文件进行压缩。所以说在正式环境打包压缩代码速度非常慢
webpack-parallel-uglify-plugin：w4
terser-webpack-plugin：w4 并行处理
TerserPlugin：w5
预计算：const day = 7 - 5；线上的话直接变成 const day = 2; 在编译器把一些能计算出结果的代码先计算出来，这样子就不会在运行时进行计算（terse 自动帮你做）

### 图片优化

选择合适的图片格式
JPEG/JPG：首屏轮播图
png：做小的图标或者 logo
webp：不是标准 google
小图标可以用 iconfont 处理，字体文件非常小
合适的图片大小
图片资源优先级：重要的图片（首屏图片）先进行加载
懒加载

##### 小 tips

需求是能够根据前端页面的相应使用需求和相应的请求来获取相应尺寸的图片，以及能够转换成 webp
边缘计算：是指的在靠近物或源的一测，采用网络，计算，存储等能力为一体的开放平台，就近提供最近端的计算和服务

使用场：视频分析，智能家居，无人驾驶等等

1. 客户端请求图片，例如 www.aaa.com/path/hello_180*180.jpg
   如果 cdn 存在缓存，就直接返回第 4 步
2. 在边缘节点获取相应的图片参数，并去相应的源服务器获取原图
3. 根据之前获取的图片参数，对图片进行 webp，压缩，resize 尺寸
4. 缓存到边缘节点，并返回给客户端

cloudflare 国外有名的 cdn 和边缘计算运营商
通过新建 worker 服务开放边缘计算的能力

## 构建优化

### webpack 的优化配置

####Tree-shaking（前提是模块化）
w4 里设置 mode：production 会开启 tersePlugin
其简单的工作原理是找到入口文件，入口相当于树的根节点，去看入口文件引用了什么东西。又会进一步去分析这些应用的包或者模块里面又引用了什么模块。不断地进行分析之后把所有需要的东西保留下来，把那些引入了但是没有用到的 shaking 下去，最后打包生成的 bundle 只包含运行时真正需要的代码
但是有时候会涉及到在全局作用域上添加或者修改属性，export 是体现不出来的，就会被 shaking 掉，把所有不需要被 shaking 掉的文件放在 sideEffect 数组里

#### webpack 依赖优化

第一种是利用 noParse 参数提高构建速度。noParse 的意思就是不解析，直接通知 webpack 忽略较大的库
第二种方式通过 DllPlugin 插件，避免打包时对不变的库重复构建提高构建速度。比如项目中引入的 react,react-dom

#### webpack 代码拆分

对于大型的 web 应用，如果我们把所有的东西都打包到一起是十分低效和不可接受的。需要把 bundle 拆分成若干个小的 bundles/chunks。把大的文件拆分成小的文件分散进行加载，先加载更重要的文件以缩短首屏加载时间，可提升用户体验。第一种方式在 entry 中添加其他入口，这样工程就会被拆分成多个不同的 bundle。这种方式比较直接，但是需要手工去添加和维护。第二种方式通过 splitChunks 插件提取公有代码，拆分业务代码与第三方库。react 相关的单独提取；cra 的分包策略第一步把 webpack 运行时（runtimeChunks）的东西抽离出来，第二步就是把所有 react 相关的都给分离出来，他有个 chunks 写的是 all 是什么意思： initialChunk asyncChunk（异步 import 的那些东西，懒加载的那些）

### webpack 持久缓存

w5：cache，w4：cache-loader

## 传输加载优化

### 启用 Gzip

Gzip 是用来进行网络资源压缩，减少资源文件在网络传输大小的技术
插曲：Compression-webpack-plugin 不要使用，前端这边不需要做 gzip，如果前端做了 gzip，服务端那边也把 gzip 打开，他去和浏览器商量，浏览器在请求头中会带上 Accept-Encoding 这个参数来说明自己支持哪些内容编码方式，服务端返回的 Response Headers 中则存在一个 Content-Encoding，用来说明数据的压缩方法，问浏览器支不支持 gzip，浏览器说我不支持，那代码就不能用了；所以前端不需要做 gzip，只要把没做过 gzip 的代码送到去送到服务器或者 proxy，然后这个代理去和浏览器商量，gzip 这部分应该在 nginx 那边去做，或者在 cdn 或者 oss 这边去做，前端做会有协商失败的情况

### 启用 Keep Alive

对 TCP 连接进行复用，http 1.1 开始这个参数就是默认开启的

### http 资源缓存

index.html 走强缓存 现在流行的方式是文件 hash+强缓存的一个方案。比如 hash+ cache control: max-age=1 年。
css js 文件走强缓存或者协商缓存
http 1.0 没有实现 Cache-Control，需要写上 pragma

## 高阶

服务端渲染：在服务端完成页面插值/数据组装，直接返回包含有数据的页面
客户端渲染：客户端分别请求页面静态资源和接口数据，然后操作 DOM 赋值到页面。
.net、jsp 前后端不分离，直到 ajax 出现，客户端渲染就开始
https://zhuanlan.zhihu.com/p/157214413

SSR：

优点：

1. 优秀的 SEO

2. 首屏加载快

缺点：

1. 负载大：由于渲染任务都交由服务端进行，在高并发的情况下，对于服务端负载压力大。
2. 复用性能差：因为返回的是整个页面，对于每个路由都要重新进行页面刷新，复用性能 上不友好。
3. 前后端耦合严重，前端开发依赖于后端，开发形式上不友好。

传统 CSR：

优点：

1. 节省服务器性能。
2. 局部刷新，无需每次都请求完整页面，体验更好。
3. 前后端分离开发。

缺点：

1. 由于页面显示过程要进行 JS 文件拉取和 React 代码执行，首屏加载时间会比较慢。

2. 对于 SEO(Search Engine Optimazition, 即搜索引擎优化），完全无能为力，因为搜索引擎爬虫只认识 html 结构的内容，而不能识别 JS 代码内容。

同构渲染：

优点：兼顾前端渲染的大部分优点和后端渲染 SEO 和首屏加载的优点

缺点：1. 需要额外的开发构建成本 2. 对服务器有一定负载

# 从输入 url 到页面呈现的过程

URL 解析：
判断输入的是一个合法的 URL 还是一个待搜索的关键词，并且根据你输入的内容进行自动完成、字符编码等操作
接着发起真正的 URL 请求
如果浏览器本地缓存了这个资源，则会直接将数据转发给浏览器进程，如果没有缓存，则会查询 DNS 解析域名
首先先找浏览器有没有 DNS 缓存（之前有访问记录），如果有则 返回 ip
如果没有，则寻找本地的 host 文件，看看有没有域名记录，如果有则返回 ip
如果本地 host 没有则直接向 DNS 服务器请求，如果还是没有，继续向上 DNS 服务器请求，直至返回
浏览器拿到 ip 后，再向服务器发送 http 请求之前，先要和服务器建立 tcp 连接，其实就是三次握手
第一次握手：客户端发送 SYN，数据包给服务端
第二次握手：服务端收到客户端的数据包，返回 SYN，ACK 数据包给客户端
第三次握手：客户端收到服务端的数据包，发送 ACK ，数据包给服务端
连接建立成功后，就可以发送 http 请求到腐恶去请求数据了
客户端向服务器发起 http 请求的时候，会有一些请求信息，请求信息包含三个部分

1. 请求方法，uri 协议、版本，2. 请求头，3. 请求正文
   请求头和请求正文之间是一个空行，这个行非常重要，它表示请求头已经结束，接下来是请求正文
   然后后端从在固定的端口接收到 tcp 报文开始，他会对 tcp 连接进行处理，对 http 协议进行解析，并按照报文格式进一步封装成 http request 对象
   一般大型的网站会将你的请求到反向代理的服务器中
   因为网站访问量非常大，网站越来越慢，一台服务器已经不够用了
   于是将同一个应用部署在多台服务器上，将大量用户的请求分配给多台服务器处理
   此时客户端不是直接通过 http 协议访问某网站应用服务器
   而是先请求到 nginx，nginx 再请求应用服务器，然后再讲结果返回给客户端
   这里 nginx 的作用的反向代理服务器
   同时也带来一个好处，其中万一一台服务器挂了，只要还有其他服务器正常运行，就不会影响用户使用
   通过 nginx 的反向代理，我们到达了 web 服务器，服务端处理请求，访问数据库，然后将处理结果返回
   也就是返回一个 http 响应
   http 响应 与 http 请求相似，http 响应也是由三个部分构成，分别是：状态行，响应头，响应正文
   浏览器接收到来自服务器的响应资源后，如果响应资源进行了压缩，需要进行解压
   然后对相应资源做缓存
   接下来就对资源进行解析
   1 html 通过 html 解析器解析输出 DOM 树
   2 css 样式通过 css 解析器解析输出 css 规则
   3 结合 dom 树和 css 规则，计算出 DOM 树中每个节点的具体样式，生成渲染树
   4 浏览器根据渲染树开始布局和绘制，会触发回流和重绘
   5 构建图层数，显示页面

浏览器在解析 html 文件时，会”自上而下“加载，并在加载过程中进行解析渲染。在解析过程中，如果遇到请求外部资源时，如图片、外链的 CSS、iconfont 等，请求过程是异步的，并不会影响 html 文档进行加载。

解析过程中，浏览器首先会解析 HTML 文件构建 DOM 树，然后解析 CSS 文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上。这个过程比较复杂，涉及到两个概念：reflow（回流）和 repain（重绘）。

DOM 节点中的各个元素都是以盒模型的形式存在，这些都需要浏览器去计算其位置和大小等，这个过程称为 relow; 当盒模型的位置，大小以及其他属性，如颜色，字体，等确定下来之后，浏览器便开始绘制内容，这个过程称为 repain。

页面在首次加载时必然会经历 reflow 和 repain。reflow 和 repain 过程是非常消耗性能的，尤其是在移动设备上，它会破坏用户体验，有时会造成页面卡顿。所以我们应该尽可能少的减少 reflow 和 repain。

当文档加载过程中遇到 js 文件，html 文档会挂起渲染（加载解析渲染同步）的线程，不仅要等待文档中 js 文件加载完毕，还要等待解析执行完毕，才可以恢复 html 文档的渲染线程。因为 JS 有可能会修改 DOM，最为经典的 document.write，这意味着，在 JS 执行完成前，后续所有资源的下载可能是没有必要的，这是 js 阻塞后续资源下载的根本原因。所以我明平时的代码中，js 是放在 html 文档末尾的。

**三次握手为什么是三次不是四次？**
为什么是 3 次？：避免历史连接，确认客户端发来的请求是这次通信的人。
为什么不是 4 次？：3 次够了第四次浪费
**为什么建立连接是三次握手，而关闭连接却是四次挥手呢？**
这是因为服务端在 LISTEN 状态下，收到建立连接请求的 SYN 报文后，把 ACK 和 SYN 放在一个报文里发送给客户端。而关闭连接时，当收到对方的 FIN 报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即 close，也可以发送一些数据给对方后，再发送 FIN 报文给对方来表示同意现在关闭连接，因此，己方 ACK 和 FIN 一般都会分开发送。

**DNS 负载均衡**
不知道你们有没有注意这样一件事，你访问 http://baidu.com 的时候，每次响应的并非是同一个服务器（IP 地址不同），一般大公司都有成百上千台服务器来支撑访问，假设只有一个服务器，那它的性能和存储量要多大才能支撑这样大量的访问呢？DNS 可以返回一个合适的机器的 IP 给用户，例如可以根据每台机器的负载量，该机器离用户地理位置的距离等等，这种过程就是 DNS 负载均衡

**若协议是 https 则会做加密**
要先申请 CA 证书，并安装在服务器上（一个文件，配置 nginx 支持监听 443 端口开启 ssl 并设置证书路径）

在 **应用层** 中，将 DNS 解析成 IP，发送 http 请求；
建立 **传输层** 中的 tcp/ip 协议，通过 tcp/ip 协议建立可靠连接；
再通过 **网络层** 的 ip 选址
在 **数据链路层** 封装成对应的 帧
在 **物理层** 中进行传输

## 构建请求的过程

1. DNS 解析：找到目标服务器（通过 ip 的方式寻址）
   浏览器缓存 =》系统缓存（host）=》路由器缓存 =》运营商缓存（联通，电信。..) =》域名服务器
2. 在应用层封装 http 请求报文；（报文）
   > _传输层需要的数据：2 封装的报文 + tcp 头部_；
   > 在传输层中传输协议最常用的 UDP，TCP
   > UDP：无状态；TCP：建立可靠链接
3. 在传输层建立 tcp 连接；（数据段）
   - 在网络层：为了确保数据的可靠传输；（帧）
     > 从应用层走到网络层就是加各种头部，由 报文 =》帧
   - 物理层：转化为二进制比特流
     > 网络层，数据链路层，物理层不用关心

## 网络传输的过程

建立物理设备的连接 =》去做数据的传输

## 浏览器渲染过程

### 解析 html 的过程

1. 解码：转为 unicode 的过程
2. 分词：把字节流 =》短语
3. html 解析：构建节点的过程
4. 建树：构建 dom 树
5. 解析：css
   render tree renderLayerTree
6. 解析 js
   动态修改 dom 树
7. 回流和重绘

# webpack

webpack 中的这种万物皆模块的理念实际上的蛮值得我们思考的，因为他确实打破了我们传统中在页面去引入各种各样资源的这种固化思维，让我们可以在业务代码中去载入一切所需资源，这样真正意义上让 js 去驱动一切，那如果之前保守饱受维护这些资源的痛苦，那你一定要去尝试这种方式；

## 1. webpack 的构建流程？

从入口文件出发，根据代码中出现的 import 或者 require 之类的语句解析，推断出来这个文件所依赖的一些资源模块，再分别去解析每个资源模块的依赖，最终形成整个项目中所有用到的文件之间的一个依赖关系树
webpack 会递归的遍历这个依赖树，读到每个文件，需要交给 loader 的就交给 loader 翻译，最后输出；

1. webpack cli 启动打包流程
2. 载入核心模块，创建 Compiler 对象
3. 使用 Compiler 对象开始编译整个项目
4. 从入口文件开始，解析模块依赖，形成依赖关系树
5. 递归依赖树，把递归到的模块交给对应 Loader 去处理
6. 合并 Loader 处理完的结果，将打包结果输出到 dist 目录

w4 开始，cli 就被单独抽取到 webpack-cli 这样的模块中，目的是增强 webpack 本身的一个灵活性，因为 webpack 本身还可以以代码的方式去调用，并不一定都是通过 cli 去调用

cli 就是将 cli 的参数和 webpack 配置文件中的配置整合到一起，得到一个完整的配置对象 (cli 的入口文件，bin 目录下的 cli.js 中）

cli 通过 yargs 解析命令行参数，然后调用 conver-argv 的 js 模块，将我们命令行的参数转换为 webpack 的配置对象，重复的话就优先使用 cli 参数

开始调用 webpack 核心模块，传入配置对象

Compiler 对象就是整个 webpack 工作过程中最核心的一个对象，负责完成整个项目的构建工作；
lib 目录下的 webpack.js 文件，这个文件导出的就是个用于创建 compiler 对象的一个函数；
首先校验传递过来的 option 参数是否符合要求，如果 option 是一个数组，webpack 创建 multiCompiler，即支持同时开启多路打包；

注册已配置的插件，plugin.call(compiler， compiler)，因为往后 webpack 生命周期就开始了，所以说必须要先去注册每个插件，这样才能确保每一个插件中的每一个钩子都能被命中；

创建 compiler 之后，紧接着就去判断了以下在配置选项中是否启用了 监视模式，是的话就调用 compiler 对象的 watch 方法，以监视模式启用构建；不是的话就调用 compiler 对象的 run 方法，开始构建整个应用；

run 方法在 lib 下的 compiler.js 文件中，这个方法触发了 before run 和 run 这两个钩子，最关键的是调用了 当前对象的 compile 方法，开始真正去编译整个项目；

compile 方法内部主要是创建了一个 compilation 对象（一次构建过程中的一个上下文对象，里面会包含这一次构建过程中全部的资源和一个额外的信息）；

创建完 compilation 对象后触发 make 钩子，进入到整个构建过程当中最核心的 make 阶段（this.hooks.make.callAsync），这一阶段主要根据 entry 配置，找到入口模块，开始依次递归出所有依赖，形成依赖关系树，然后递归到每个模块交给不同的 Loader 去处理

webpack 插件系统是事件机制是基于官方自己的一个叫 tapable；通过`事件名称。tab`去注册

make 阶段：
调用 compilation 对象的 add entry 方法开始解析入口文件
add entry 方法中调用 \_addModuleChain 方法，将入口模块添加到模块依赖列表中；
紧接着通过 compilation 对象的 buildModule 方法进行模块构建
buildModule 方法中执行具体的 loader，处理特殊资源加载
build 完成之后通过 acorn 库生成模块代码的 ast 语法树
根据语法树分析这个模块是否还有依赖的模块，如果又则继续循环 build 每个依赖；
所有依赖解析完成，build 阶段结束
最后合并生成需要输出到 bundle.js 写入 dist 目录

## 2. 是否写过 Loader？简单描述一下编写 loader 的思路？

loader 支持链式调用，所以开发上需要严格遵循‘单一职责’，每个 loader 只负责自己需要负责的模块

loader 管道必须返回 js 代码的原因，返回的内容会拼接到 bundle.js 中，考虑到语法

```js
const marked = require("marked");
module.exports = source => {
  console.log(source);
  const html = marked(source);
  const code = `module.exports = ${JSON.stringify(html)}`;
  // const code = `export default ${JSON.stringify(html)}`;
  return code;
};
```

1. loader 运行在 nodejs 中，我们可以调用任意 nodejs 自带的 api 或者安装 第三方模块进行调用
2. webpack 传给 loader 的原内容都是 utf-8 格式编码的字符串，在某些场景下 loader 处理二进制文件时，需要通过 exports.raw = true 告诉 webpack 该 loader 需要二进制数据
3. 尽可能异步化 loader，如果计算量很小，同步也可接收
4. loader 是无状态的，不应该在 loader 中保留状态
5. 使用 loader-utils 和 schema-utils 为我们提供的 实用工具
6. 加载本地的 loader 方法：npm link 和 resolveLoader

## 3. 是否写过 Plugin？简单描述一下编写 Plugin 的思路？

webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。
webpack 几乎为每一个环节都埋下了一个钩子，开发插件的时候就可以往这些不同的钩子上去挂载不同的任务
webpack 要求插件必须是一个函数，或者是一个包含 apply 方法的类型

Plugin 的 API 可以去官网查阅

1. compiler 暴露了和 Webpack 整个生命周期相关的钩子
2. compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
3. 插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
4. 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
5. 找出合适的事件点去完成想要的功能。emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改 (emit 事件是修改 Webpack 输出资源的最后时机）。watch-run 当依赖的文件发生变化时会触发
6. 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

```js
class RemoveCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("RemoveCommentsPlugin", compilation => {
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, "");
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          };
        }
      }
    });
  }
}
```

## 4. source map 是什么，生产环境咋用？

source map 是将编译、打包。压缩后的代码映射回源代码的过程。打包压缩的代码不具备良好的可读性，想要调试源码就需要 source map
map 文件只要不打开开发者工具，就蓝旗是不会加载的
线上环境一般有三种处理方案：

1. hidden-source-map：借助第三方错误监控平台 sentry 使用
2. nosources-source-map：只会显示具体行数及查看源代码的错误栈。安全性比 sourcemap 高
3. sourcemap：通过 nginx 将 .map 文件只对白名单开放

## 5. 模块打包原理？

webpack 实际上为，每个模块创造了一个可以导入和导出的环境，本质上并没有修改代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致

## 6. 文件监听原理？

在发现源代码发生改变时，自动重新构建出新的输出文件
webpack 开启监听模式，有两种方式：
启动 webpack --watch：在配置 webpack.config 中设置 watch：true
缺点：每次需要手动刷新浏览器
原理：轮询判断文件的最后编辑时间是否变化，如果变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout  后再执行

## 7. 说一下 webpack 热更新原理？

又称为热替换，不用刷新浏览器而将新变更的模块替换掉旧的模块
HMR 的核心是客户端去服务端拉取更新后的文件，准确来说的 chunk diff（需要更新的 chunk），实际上，WDS 与浏览器之间维护了一个 websocket，当本地资源变更时，WDS 会向刘浏览器推送更新，并带上构建时的 hash，然后客户端与上一次资源进行对比。
客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容，这样客户端就可以再借助这些信息来继续向 WDS 发起 jsonp 请求来获取 chunk 的增量更新。
后续的部分（拿到增量更新后如何处理？哪些状态该保留，哪些需要更新？）由 HotModulePlugin 来完成，提供了相关 api 以供开发者对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 api 来实现 HMR

## 8. 如何对 bundle 体积进行监控和分析？

vscode 有个插件 import cost 可以帮助我么对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积

bundlesize 工具包 可以进行自动化资源体积监控

## 9. 在实际工作中，配置上百行是常事，如何保证各个 loader 按预想工作？

可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline 官方不推荐使用）

## 10. 如何优化 webpack 构建速度？

1. 使用高版本的 webpack 和 nodejs
2. 多进程/多实例：happypack（不维护了），thread-loader
3. 压缩代码

- webpack-paralle-uglify-plugin
- uglifyjs-webpack-plugin：开启 parallel 参数（不支持 ES6）
- terse-webpack-plugin：开启 parallel 参数
- 多进程并行压缩
- 通过 mini-css-extract-plugin 提取 chunk 中的 css 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 css

4. 图片压缩
   使用基于 node 库的 imagemin
   配置 image-webpack-loader
5. 缩小打包作用域
   exclude/include 确定 loader 规则范围
   resolve.modules 知名第三方模块的绝对路径（减少不必要的查找）
   resolve.mainFields 只采用 main 字段作为入口文件描述字段
   noParse 对完全不需要解析的库进行忽略
   ignorePlugin 完全排除模块
   合理使用 alias
6. 提起页面公共资源
   使用 html-webpack-externals-plugin 将基础包通过 CDN 引入，不打入 bundle
   使用 splitChunksPlugin 进行（公共脚本，基础包，页面公共文件）分离（webpack4 内置），替代了 commonsChunkPlugin 插件
   基础包分离
7. DLL
   使用 DLLPlugin 进行分包，使用 DllReferencePlugin（索引链接）对 manifest.json 引用，让一些基本不会改动的 代码先打包成静态资源，避免反复编译浪费时间
   hashedModuleIdsPlugin 解决模块数字 id 问题
8. 充分利用缓存提升二次构建速度
   babel-loader 开启缓存
   terser-webpack-plugin 开启缓存
   使用 cache-loader 或者 hard-source-webpack-plugin
9. tree-shaking
   purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用（建议）
   打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉（只能对 ES6 Modlue 生效） 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
   禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
   使用 PurifyCSS（不在维护） 或者 uncss 去除无用 CSS 代码
10. Scope hoisting
    构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
    必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
11. 动态 Polyfill
    建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。（部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)

## 11. 聊一聊 Babel 原理吧？

大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目（轻量级现代 JavaScript 解析器） Babel 大概分为三大部分：

1. 解析：将代码转换成 AST 词法分析：将代码（字符串）分割为 token 流，即语法单元成的数组
2. 语法分析：分析 token 流（上面生成的数组）并生成 AST
3. 转换：访问 AST 的节点进行变换操作生产新的 ASTTaro 就是利用 babel 完成的小程序语法转换
4. 生成：以新的 AST 为基础生成代码

## 12. 有哪些常见的 loader，用过哪些 loader

- style-loader/css-loader/postcss-loader: 将 css 以链接形式插入到 style/加载 css 模块，支持模块化，压缩，文件导入等 / 拓展 css，使用下一代 css，可以配合 autoprefixer 插件自动补齐前缀
- sass-loader：sass/scss 转为 css
- file-loader/url-loader: 将文件输出到一个文件夹（处理图片和字体）/ 与前者类似，区别是可以设置阈值，大于阈值返回 publicPath，小于阈值返回 base64
- image-loader：加载并压缩图片
- source-map-loader：加载额外的 source map 文件，方便断点调试
- babel-loader：将 ES6 转换为 ES5
- ts-loader/awesome-typescript-loader：ts 转 js / 后者性能优于前者

## 13. 哪些常见 plugin，用过哪些

- define-plugin：定义环境变量（webpack4 之后指定 mode 即可）
- ignore-plgin：忽略部分文件
- mini-css-entra-plugin：分离 css，提取为独立文件，支持按需加载
- speed-measure-webpack-plugin：可以看到每个 loader 和 plugin 的耗时
- webpack-bundle-analyzer：可视化 webpack 输出文件的体积
- @sentry/webpack-plugin: 可以配置源映射并自动将它们上传到 Sentry

## 14. plugin 和 loader 的区别？

- loader 本质是一个函数，在函数中对接收到的内容进行转换，返回转换后的结果。因为 webpack 只认识 js，所以 loader 就是个翻译官，对其他类型的资源进行转译的预处理工作
- plugin 就是插件，基于事件流框架 tabtable，可以拓展 webpack 的功能，在 webpack 运行的生命周期中会广播出许多时间，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 api 改变输出结果

loader 在 Module.rules 中配置，作为模块的解析规则，类型为数组
plugin 在 plugins 中单独配置，类型为数组，每一项都是个 plugin 实例

## 15. 使用 webpack 开发时，用过哪些提高效率的插件

- webpack-dashboard： 可以友好的展示相关打包信息
- webpack-merge：提取公共配置，减少重读配置代码
- speed-measure-webpack-plugin：简称 SMP，分析 webpack 打包过程中 loader 和 plugin 的耗时，有助于找到构建过程中的性能瓶颈
- size-plugin：监控资源体积变化，今早发现问题
- HotModuleReplacementPlugin：模块热替换

# vue vs react

Vue 和 React 相同点非常多：

- 都使用 Virtural DOM
- 都使用组件化思想，流程基本一致
- 都是响应式，推崇单向数据流
- 都有成熟的社区，都支持服务端渲染
- Vue 和 React 实现原理和流程基本一致，都是使用 Virtual DOM + Diff 算法。不管是 Vue 的 template 模板 + options api 写法，还是 React 的 Class 或者 Function（js 的 class 写法也是 function 函数的一种）写法，底层最终都是为了生成 render 函数，render 函数执行返回 VNode（虚拟 DOM 的数据结构，本质上是棵树）。当每一次 UI 更新时，总会根据 render 重新生成最新的 VNode，然后跟以前缓存起来老的 VNode 进行比对，再使用 Diff 算法（框架核心）去真正更新真实 DOM（虚拟 DOM 是 JS 对象结构，同样在 JS 引擎中，而真实 DOM 在浏览器渲染引擎中，所以操作虚拟 DOM 比操作真实 DOM 开销要小的多）。

Vue 和 React 通用流程：vue template/react jsx -> render 函数 -> 生成 VNode -> 当有变化时，新老 VNode diff -> diff 算法对比，并真正去更新真实 DOM。

核心还是 Virtual DOM，

## 为什么 Vue 和 React 都选择 Virtual DOM（React 首创 VDOM，Vue2.0 开始引入 VDOM）？，个人认为主要有以下几点：

- 减少直接操作 DOM。框架给我们提供了屏蔽底层 dom 书写的方式，减少频繁的整更新 dom，同时也使得数据驱动视图
- 为函数式 UI 编程提供可能（React 核心思想）
- 可以跨平台，渲染到 DOM（web）之外的平台。比如 ReactNative，Weex
  以下重点说下两者不同的点。

## 1. 核心思想不同

Vue 早期定位是尽可能的降低前端开发的门槛（这跟 Vue 作者是独立开发者也有关系）。所以 Vue 推崇灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React 早期口号是 Rethinking Best Practices。背靠大公司 Facebook 的 React，从开始起就不缺关注和用户,所以 React 推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的 React 适合大型应用，根本原因还是在于其函数式编程。

由于两者核心思想的不同，所以导致 Vue 和 React 许多外在表现不同（从开发层面看）。

### 1.1 核心思想不同导致写法差异

Vue 推崇 template（简单易懂，从传统前端转过来易于理解）、单文件 vue。而且虽然 Vue2.0 以后使用了 Virtual DOM，使得 Vue 也可以使用 JSX（bebel 工具转换支持），但 Vue 官方依然首先推荐 template，这跟 Vue 的核心思想和定位有一定关系。

React 推崇 JSX、HOC、all in js。

### 1.2 核心思想不同导致 api 差异

Vue 定位简单易上手，基于 template 模板 + options API，所以不可避免的有较多的概念和 api。比如 template 模板中需要理解 slot、filter、指令等概念和 api，options API 中需要理解 watch、computed（依赖收集）等概念和 api。

React 本质上核心只有一个 Virtual DOM + Diff 算法，所以 API 非常少，知道 setState 就能开始开发了。

### 1.3 核心思想不同导致社区差异

由于 Vue 定义简单易上手，能快速解决问题，所以很多常见的解决方案，是 Vue 官方主导开发和维护。比如状态管理库 Vuex、路由库 Vue-Router、脚手架 Vue-CLI、Vutur 工具等。属于那种大包大揽，遇到某类通用问题，只需要使用官方给出的解决方案即可。

React 只关注底层，上层应用解决方案基本不插手，连最基础的状态管理早期也只是给出 flow 单向数据流思想，大部分都丢给社区去解决。比如状态管理库方面，有 redux、mobx、redux-sage、dva 等一大堆（选择困难症犯了），所以这也造就了 React 社区非常繁荣。同时由于有社区做上层应用解决方案，所以 React 团队有更多时间专注于底层升级，比如花了近 2 年时间把底层架构改为 Fiber 架构，以及创造出 React Hooks 来替换 HOC，Suspense 等。

### 1.4 核心思想不同导致未来升级方向不同

核心思想不同，决定了 Vue 和 React 未来不管怎么升级变化，Vue 和 React 考虑的基本盘不变。

Vue 依然会定位简单易上手（渐进式开发），依然是考虑通过依赖收集来实现数据可变。这点从 Vue3 核心更新内容可以看到：template 语法基本不变、options api 只增加了 setup 选项（composition api）、基于依赖收集（Proxy）的数据可变。

React 的函数式编程这个基本盘不会变。React 核心思想，是把 UI 作为 Basic Type，比如 String、Array 类型，然后经过 render 处理，转换为另外一个 value（纯函数）。

## 2. 组件实现不同

Vue 源码实现是把 options 挂载到 Vue 核心类上，然后再 new Vue({options}) 拿到实例（vue 组件的 script 导出的是一个挂满 options 的纯对象而已）。所以 options api 中的 this 指向内部 Vue 实例，对用户是不透明的，所以需要文档去说明 this.$slot、this.$xxx 这些 api。另外 Vue 插件都是基于 Vue 原型类基础之上建立的，这也是 Vue 插件使用 Vue.install 的原因，因为要确保第三方库的 Vue 和当前应用的 Vue 对象是同一个。

React 内部实现比较简单，直接定义 render 函数以生成 VNode，而 React 内部使用了四大组件类包装 VNode，不同类型的 VNode 使用相应的组件类处理，职责划分清晰明了（后面的 Diff 算法也非常清晰）。React 类组件都是继承自 React.Component 类，其 this 指向用户自定义的类，对用户来说是透明的。

## 3. 响应式原理不同

### Vue

Vue 依赖收集，自动优化，数据可变。
Vue 递归监听 data 的所有属性，直接修改。
当数据改变时，自动找到引用组件重新渲染。

### React

React 基于状态机，手动优化，数据不可变，需要 setState 驱动新的 State 替换老的 State。
当数据改变时，以组件为根目录，默认全部重新渲染

## 4. diff 算法不同

两者流程思维上是类似的，都是基于两个假设（使得算法复杂度降为 O(n)）：

不同的组件产生不同的 DOM 结构。当 type 不相同时，对应 DOM 操作就是直接销毁老的 DOM，创建新的 DOM。
同一层次的一组子节点，可以通过唯一的 key 区分。
但两者源码实现上有区别：

Vue 基于 snabbdom 库，它有较好的速度以及模块机制。Vue Diff 使用双向链表，边对比，边更新 DOM。

React 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。

## 5. 事件机制不同

### Vue

Vue 原生事件使用标准 Web 事件
Vue 组件自定义事件机制，是父子组件通信基础
Vue 合理利用了 snabbdom 库的模块插件

### React

React 原生事件被包装，所有事件都冒泡到顶层 document 监听,17 之后是冒泡到 root，然后在这里合成事件下发。基于这套，可以跨端使用事件机制，而不是和 Web DOM 强绑定。
React 组件上无事件，父子组件通信使用 props

# html

1. 页面导入样式时，使用 link 和 @import 有什么区别。

   - 从属关系区别。@import 只能导入样式表，link 还可以定义 RSS、rel 连接属性、引入网站图标等；
   - 加载顺序区别；加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载；
   - 兼容性区别；

2. 常见浏览器内核

   - 内核

   | 名称    |                            内核                             |
   | ------- | :---------------------------------------------------------: |
   | Trident |                        IE 浏览器内核                        |
   | Gecko   |                     Firefox 浏览器内核                      |
   | Presto  |                      Opera 浏览器内核                       |
   | Webkit  |                      Safari 浏览器内核                      |
   | Blink   | 谷歌浏览器内核，属于 Webkit 的一个分支，与 Opera 一起在研发 |

   - 浏览器

   | 浏览器                    |                   内核                   |
   | ------------------------- | :--------------------------------------: |
   | IE                        |             Trident，IE 内核             |
   | Chrome                    |     以前是 Webkit，现在是 Blink 内核     |
   | Firefox                   |                Gecko 内核                |
   | Safari                    |               Webkit 内核                |
   | Opera                     |     一起是 Presto，现在是 Blink 内核     |
   | 360、猎豹浏览器内核       |            IE + Blink 双内核             |
   | 搜狗、遨游、QQ 浏览器内核 | Trident（兼容模式）+ Webkit（高速模式）  |
   | 百度浏览器、世界之窗内核  |                 IE 内核                  |
   | 2345 浏览器               | 以前是 IE 内核，现在是 IE + Blink 双内核 |
   | UC 浏览器内核             |             Webkit + Trident             |

3. 浏览器的渲染原理

   - 首先解析收到的文档，根据文档定义构建一颗 DOM 树，DOM 树是由 DOM 元素及属性节点组成的；
   - 然后对 CSS 进行解析，生成 CSSOM 规则树；
   - 根据 DOM 树和 CSSOM 规则树构建 Render Tree。渲染树的节点被称为渲染对象，渲染对象是一个包含有颜色和大小等属性的矩形，渲染对象和 DOM 对象相对应，但这种对应关系不是一对一的，不可见的 DOM 元素不会被插入渲染树。
   - 当渲染对象被创建并添加到树中，它们并没有位置和大小，所以当浏览器生成渲染树以后，就会根据渲染树来进行布局（也可以叫做回流）。这一阶段浏览器要做的事情就是要弄清楚各个节点在页面中的确切位置和大小。通常这一行为也被称为“自动重排”。
   - 布局阶段结束后是绘制阶段，比那里渲染树并调用对象的 paint 方法将它们的内容显示在屏幕上，绘制使用 UI 基础组件。

   为了更好的用户体验，渲染引擎会尽可能早的将内容呈现到屏幕上，并不会等到所有的 html 解析完成之后再去构建和布局 render tree。它是解析完一部分内容就显示一部分内容，同时可能还在网络下载其余内容。

4. HTML5 的 form 的自动完成功能是什么？
   `autocomplete` 属性规定输入字段是否应该启用自动完成功能，默认为启用，设置为 autocomplete=off 可以关闭该功能。

   自动完成允许浏览器预测对字段的输入。在用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

5. 如何实现浏览器内多个标签页之间的通信？

   实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此我们可以找一个中介者来让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。

   - 使用 Websocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端；
   - 可以地调用 localStorage，localStorage 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个 storage 事件，我们可以通过监听 storage 事件，控制它的值来进行页面信息通信；
   - 如果我们能够获得对应标签页的引用，通过 postMessage 方法也是可以实现多个标签页通信的；

6. 简述前端性能优化

   - 页面内容方面

     - 通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况；
     - 通过 DNS 缓存等机制来减少 DNS 的查询次数；
     - 通过设置缓存策略，对常用不变的资源进行缓存；
     - 通过延迟加载的方式，来减少页面首屏加载时需要请求的资源，延迟加载的资源当用户需要访问时，再去请求加载；
     - 通过用户行为，对某些资源使用预加载的方式，来提高用户需要访问资源时的响应速度；

   - 服务器方面
     - 使用 CDN 服务，来提高用户对于资源请求时的响应速度；
     - 服务器端自用 Gzip、Deflate 等方式对于传输的资源进行压缩，减少传输文件的体积；
     - 尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie；

7. 什么是 webp？

   WebP 是谷歌开发的一种新图片格式，它是支持有损和无损两种压缩方式的使用直接色的点阵图。使用 webp 格式的最大优点是是，在相同质量的文件下，它拥有更小的文件体积。因此它非常适合于网络图片的传输，因为图片体积的减少，意味着请求时间的减少，这样会提高用户的体验。这是谷歌开发的一种新的图片格式。

   - 浏览器如何判断是否支持 webp 格式图片？

     通过创建 Image 对象，将其 src 属性设置为 webp 格式的图片，然后在 onload 事件中获取图片的宽高，如果能够获取，则说明浏览器支持 webp 格式图片。如果不能获取或者触发了 onerror 函数，那么就说明浏览器不支持 webp 格式的图片。
