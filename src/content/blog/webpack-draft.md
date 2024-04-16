---
title: webpack
author: zhenyounide
pubDatetime: 2022-06-19T04:06:31Z
slug: webpack
featured: false
draft: true
tags:
  - problems
description: ""
---

## Table of contents

1. 修改 webpack 配置文件

```js
	entry: "./src/js/index.ts",
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
   	},
    module: {
        rules: [
            // ts编译配置
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
```

2. sourcemap 存储映射关系

   - **development**： cheap-module-eval-source-map

   只需要行错误信息, 并且包含第三方模块错误信息, 并且不会生成单独 sourcemap 文件

   - **production**: cheap-module-source-map

   只需要行错误信息, 并且包含第三方模块错误信息, 并且会生成单独 sourcemap 文件

3. module: 告诉 webpack 如何处理 webpack 不能够识别的文件

   - 打包图片规则:url-loader

     优势:(相比于 file-loader)

     - 图片比较小的时候直接转换成 base64 字符串图片, 减少请求次数
     - 图片比较大的时候由于生成的 base64 字符串图片也比较大, 就保持原有的图片

   ```js
               {
                   test: /\.(png|jpg|gif)$/,
                   use: [
                       {
                           loader: 'url-loader',
                           options: {
                               // 指定图片限制的大小
                               limit: 1024 * 100,
                               // 指定打包后文件名称
                               name: '[name].[ext]',
                               // 指定打包后文件存放目录
                               outputPath: 'images/',
                           }
                       }
                   ]
               },
   ```

   - 配置 less-loader

```js
                {
                  test: /\.less$/,
                  use: [{
                      loader: "style-loader" // 将 JS 字符串生成为 style 节点
                  }, {
                      loader: "css-loader" ,// 将 CSS 转化成 CommonJS 模块
                       options: {
                        modules: true // 开启CSS模块化
                       }
                  }, {
                      loader: "less-loader" // 将 less 编译成 CSS
                  }]
                }
```

​ _use:自下而上，自右向左_

4. plugins: 告诉 webpack 需要新增一些什么样的功能

   - HtmlWebpackPlugin

   ```js
   plugins: [
     new HtmlWebpackPlugin({
       // 指定打包的模板, 如果不指定会自动生成一个空的
       template: "./index.html",
       minify: {
         // 告诉htmlplugin打包之后的html文件需要压缩
         collapseWhitespace: true,
       },
     }),
   ];
   ```

5. webpack-watch

```js
    watch: true,
    watchOptions: {
        aggregateTimeout: 300, // 防抖, 和函数防抖一样, 改变过程中不重新打包, 只有改变完成指定时间后才打包
        poll: 1000, // 每隔多少时间检查一次变动
        ignored: /node_modules/ // 排除一些巨大的文件夹, 不需要监控的文件夹
    },
    /*
    optimization: 配置webpack的优化项
    * */
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
```

6. devServer:自动检测文件变化配置

```js
    devServer: {
        contentBase: "./bundle", // 打包后的目录
        open: true, // 是否自动在浏览器中打开
        port: 9090 // 服务器端口号
        proxy: [{
            context: ["/user", "/login"],
            target: "http://127.0.0.1:3000",
            changeOrigin: true,     // 域名跨域
            secure: false,          // https跨域
            pathRewrite:{"": "/api"} // 路径重写, 将路径中的api替换为空
        }],
        hot: true, // 开启热更新, 只要开启了热更新就不会自动刷新网页了
        hotOnly: true // 哪怕不支持热更新也不要刷新网页
    }
```
