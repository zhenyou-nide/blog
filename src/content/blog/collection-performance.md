---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-07-30T11:00:00.400Z
title: 大宝典-性能相关
slug: collection-performance
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 213. 性能优化的参考指标

前端性能优化的参考指标可以帮助开发者评估和提升网页的加载速度和响应能力。以下是一些常见的参考指标：

1. **页面加载时间（Page Load Time）**：

   - **首字节时间（Time to First Byte, TTFB）**：从用户请求页面到第一个字节数据返回所需的时间。
   - **首屏时间（First Paint/First Contentful Paint）**：用户看到页面第一个内容的时间。这是页面对用户可见的最早的时间点。
   - **首次有意义绘制（First Meaningful Paint, FMP）**：页面主要内容完成渲染的时间。
   - **完全加载时间（Fully Loaded Time）**：页面所有资源完全加载完成的时间。

2. **交互性（Interactivity）**：

   - **首次输入延迟（First Input Delay, FID）**：用户第一次与页面交互（如点击按钮）到浏览器能够响应交互的时间。
   - **总阻塞时间（Total Blocking Time, TBT）**：页面加载过程中超过50毫秒的长任务时间总和。

3. **可见性（Visibility）**：

   - **累积布局偏移（Cumulative Layout Shift, CLS）**：页面元素在加载过程中意外移动的程度。
   - **首内容绘制（First Contentful Paint, FCP）**：页面主要内容（如文本、图片）首次呈现在屏幕上的时间。

4. **资源加载（Resource Loading）**：

   - **资源大小（Resource Size）**：所有加载资源（如CSS、JavaScript、图片等）的大小。
   - **请求数量（Number of Requests）**：页面加载过程中发出的HTTP请求数量。

5. **网络效率（Network Efficiency）**：

   - **带宽利用率（Bandwidth Utilization）**：网络带宽的使用情况。
   - **延迟（Latency）**：从请求发出到接收到响应所需的时间。

6. **缓存效果（Caching Efficiency）**：

   - **缓存命中率（Cache Hit Ratio）**：从缓存中加载资源的比例。
   - **离线支持（Offline Support）**：页面在离线模式下的可用性。

7. **其他用户体验指标**：
   - **首屏渲染时间（Time to Interactive, TTI）**：页面完全可交互的时间。
   - **用户感知加载时间（Perceived Load Time）**：用户感知页面加载完成的时间。

这些指标可以通过工具如Google Lighthouse、WebPageTest、GTmetrix等进行监测和评估。通过分析这些指标，开发者可以识别性能瓶颈并进行针对性的优化，例如优化资源加载、减少阻塞脚本、利用缓存等。

## 214. performance 对象

```json
{
  "timeOrigin": 1722340871590.8,
  "timing": {
    "connectStart": 1722340871604, // 开始建立于服务器的连接的时间
    "navigationStart": 1722340871590, // 浏览器开始导航的时间，通常为页面加载开始的时间
    "secureConnectionStart": 1722340871607, //
    "fetchStart": 1722340871601, // 浏览器准备好使用 HTTP 请求来获取文档的时间
    "domContentLoadedEventStart": 1722340873054, // DOMContentLoaded 事件开始的时间
    "responseStart": 1722340872580, // 浏览器从服务器接收到第一个字节的时间
    "domInteractive": 1722340873026, // 结束解析并开始加载子资源的时间
    "domainLookupEnd": 1722340871601, // 完成 DNS 查询的时间
    "responseEnd": 1722340872584, // 浏览器接收响应完成的时间
    "redirectStart": 0, // 重定向开始的世家，如果没有重定向则为 0
    "requestStart": 1722340871998, // 浏览器向服务其发出请求的时间
    "unloadEventEnd": 0, // 前一个页面卸载的结束时间
    "unloadEventStart": 0, // 前一个页面卸载的开始时间
    "domLoading": 1722340872590, // 开始解析 DOM 结构的时间
    "domComplete": 1722340873380, // DOM 解析完成的时间
    "domainLookupStart": 1722340871601, // 开始执行 DNS 查询的时间
    "loadEventStart": 1722340873380, // load 事件开始的事件
    "domContentLoadedEventEnd": 1722340873054, // DOMContentLoaded 事件结束的时间
    "loadEventEnd": 1722340873381, // load 事件结束的时间
    "redirectEnd": 0, // 重定向结束的时间，没有重定向则为 0
    "connectEnd": 1722340871998 // 与服务器的连接建立完成的时间
  },
  // 包含有关导航的信息，如重定向次数，导航类型等
  "navigation": {
    "type": 0,
    "redirectCount": 0
  },
  // 内存使用信息
  "memory": {
    "jsHeapSizeLimit": 4294705152,
    "totalJSHeapSize": 43618524,
    "usedJSHeapSize": 31012928
  }
  // ...
}
```

2. **Resource Timing API**：

   - `performance.getEntriesByType('resource')`: 返回页面上所有资源（如图像、脚本、样式表等）的性能数据。

3. **User Timing API**：

   - `performance.mark()`: 为自定义时间点创建一个时间戳。
   - `performance.measure()`: 测量两个时间点之间的时间。

4. **High Resolution Time API**：
   - `performance.now()`: 返回从页面加载开始经过的高精度时间（以毫秒为单位），可以用于精确的时间测量。

**示例**

```javascript
// 获取页面加载的详细时间点
console.log(performance.timing);

// 获取所有资源的性能数据
const resources = performance.getEntriesByType("resource");
resources.forEach(resource => {
  console.log(`Resource: ${resource.name}, Duration: ${resource.duration}`);
});

// 创建和测量自定义时间点
performance.mark("start-task");
// 执行一些任务...
performance.mark("end-task");
performance.measure("task-duration", "start-task", "end-task");

// 获取高精度时间
const start = performance.now();
// 执行一些任务...
const end = performance.now();
console.log(`Task duration: ${end - start}ms`);
```

**使用场景**

1. **性能调试**：帮助开发者了解页面加载的各个阶段，从而优化资源加载和减少页面加载时间。
2. **用户体验改进**：通过精确测量用户交互时间点，改进网站的响应速度和交互体验。
3. **性能监控**：在生产环境中监控和记录性能数据，以便及时发现和解决性能问题。

## 215. Webpack 优化前端性能

Webpack 是一个流行的 JavaScript 模块打包工具，它提供了许多功能来优化前端性能。通过使用 Webpack，开发者可以改进页面加载速度、减少带宽消耗，并提高整体用户体验。以下是一些关键的优化技术和配置：

1. 代码拆分 (Code Splitting)

   代码拆分是将代码分成多个小块，按需加载，而不是一次性加载所有代码。

   ```javascript
   module.exports = {
     optimization: {
       splitChunks: {
         chunks: "all",
       },
     },
   };
   ```

2. 按需加载 (Lazy Loading)

   按需加载可以使某些代码仅在需要时加载，从而减少初始加载时间。

   ```javascript
   // 使用动态 import 实现按需加载
   import(/* webpackChunkName: "my-chunk-name" */ "./myModule").then(module => {
     const myModule = module.default;
     // 使用 myModule
   });
   ```

3. Tree Shaking

   Tree Shaking 是一个消除未使用代码的优化技术，它依赖于 ES6 模块语法。

   ```javascript
   module.exports = {
     mode: "production",
     optimization: {
       usedExports: true,
     },
   };
   ```

4. 压缩和缩小代码 (Minification)

   通过压缩和缩小代码，可以减少文件大小，提高加载速度。

   ```javascript
   const TerserPlugin = require("terser-webpack-plugin");

   module.exports = {
     optimization: {
       minimize: true,
       minimizer: [new TerserPlugin()],
     },
   };
   ```

5. 使用缓存 (Caching)

   利用缓存可以减少用户多次访问时的加载时间。

   ```javascript
   module.exports = {
     output: {
       filename: "[name].[contenthash].js",
     },
     optimization: {
       moduleIds: "deterministic",
       runtimeChunk: "single",
       splitChunks: {
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: "vendors",
             chunks: "all",
           },
         },
       },
     },
   };
   ```

6. 资源压缩 (Asset Compression)

   压缩静态资源（如 CSS、JavaScript 和图片）以减少传输时间。

   ```javascript
   const CompressionPlugin = require("compression-webpack-plugin");

   module.exports = {
     plugins: [
       new CompressionPlugin({
         test: /\.(js|css)$/,
         algorithm: "gzip",
       }),
     ],
   };
   ```

7. 使用 Service Workers

   Service Workers 允许缓存资源，并在离线或网络不稳定时提供快速响应。

   ```javascript
   const WorkboxPlugin = require("workbox-webpack-plugin");

   module.exports = {
     plugins: [
       new WorkboxPlugin.GenerateSW({
         clientsClaim: true,
         skipWaiting: true,
       }),
     ],
   };
   ```

8. 移除未使用的 CSS (PurifyCSS)

   PurifyCSS 可以分析和移除未使用的 CSS。

   ```javascript
   const PurgeCSSPlugin = require("purgecss-webpack-plugin");
   const glob = require("glob");
   const path = require("path");

   module.exports = {
     plugins: [
       new PurgeCSSPlugin({
         paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
           nodir: true,
         }),
       }),
     ],
   };
   ```

9. 预取和预加载模块 (Prefetching and Preloading)

   通过预取和预加载，可以在用户可能需要时提前加载资源。

   ```javascript
   // Prefetch example
   import(/* webpackPrefetch: true */ "./someModule");

   // Preload example
   import(/* webpackPreload: true */ "./anotherModule");
   ```

10. 优化图像

    使用图像压缩工具减少图像大小。

    ```javascript
    const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

    module.exports = {
      plugins: [
        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ["mozjpeg", { quality: 70 }],
              ["optipng", { optimizationLevel: 5 }],
            ],
          },
        }),
      ],
    };
    ```

## 216. 如何实现长缓存(Long-term caching)

一种前端性能优化策略，旨在浏览器能够缓存应用程序的静态资源（如 js，css，图像等）更长时间，以减少不必要的网络请求，加速页面的加载速度。

通过将资源文件的内容与他们的文件名关联，可以实现长缓存

通常，浏览器会更及资源文件的 URL 来判断是否从缓存中获取资源。

**落地方案**

1. 文件名哈希：文件只有在内容发生变化时具有不同的文件名
2. 合理分包：将代码与第三方库，样式表和其他资源分开打包成多个文件。这样只有在发生变化时候重新下载应用程序代码，而其他资源可长期缓存
3. 配置缓存控制：服务端配置好资源的缓存控制策略，示例：

   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
   expires 1y;
   add_header Cache-Control "public, immutable";
   }

   ```

4. 版本号控制：如需要强制浏览器重新下载文件，可将资源本舰的版本号添加到 URL 中，如 `<link ref='stylesheet' href='styles.css?v=2'/>`
5. 使用文件指纹：生成资源的指纹（如 MD5 哈希），并将指纹添加在资源文件名中，一切包文件内容发生变化时 URL 也会发生变化
   ```js
   const md5 = require("md5");
   const fileContent = fs.readFileSync("file.js");
   const fileHash = md5(fileContent);
   const fileName = `file.${fileHash}.js`;
   ```

## 217. 遍历 100000000 项的数组如何优化

1. 使用高效的循环

   在 JavaScript 中，`for` 循环通常比其他迭代方法（如 `forEach`、`map`）更高效。

   ```javascript
   const array = new Array(100000000).fill(0); // 假设数组已填充

   console.time("for loop");
   for (let i = 0; i < array.length; i++) {
     // 执行操作
   }
   console.timeEnd("for loop");
   ```

2. 避免频繁的数组长度访问

   将数组长度存储在一个变量中，避免在每次循环中访问 `array.length`。

   ```javascript
   const array = new Array(100000000).fill(0); // 假设数组已填充

   console.time("optimized for loop");
   for (let i = 0, len = array.length; i < len; i++) {
     // 执行操作
   }
   console.timeEnd("optimized for loop");
   ```

3. 使用 Web Workers

   Web Workers 允许你在后台线程中运行脚本，从而避免阻塞主线程。这对处理大量数据非常有用。

   **主线程代码**：

   ```javascript
   const worker = new Worker("worker.js");
   const array = new Array(100000000).fill(0);

   worker.postMessage(array);

   worker.onmessage = function (e) {
     console.log("结果:", e.data);
   };
   ```

   **worker.js**：

   ```javascript
   self.onmessage = function (e) {
     const array = e.data;
     let result = 0;

     for (let i = 0; i < array.length; i++) {
       result += array[i]; // 假设某个计算操作
     }

     self.postMessage(result);
   };
   ```

4. 分块处理 (Chunking)

   将数组分成较小的块，以减少单次操作的负担，并使用 `setTimeout` 或 `requestIdleCallback` 处理每个块。

   ```javascript
   const array = new Array(100000000).fill(0);
   const chunkSize = 1000000;
   let currentIndex = 0;

   function processChunk() {
     const end = Math.min(currentIndex + chunkSize, array.length);

     for (let i = currentIndex; i < end; i++) {
       // 执行操作
     }

     currentIndex = end;

     if (currentIndex < array.length) {
       setTimeout(processChunk, 0);
     } else {
       console.log("处理完成");
     }
   }

   processChunk();
   ```

5. 使用 Typed Arrays

   如果数据是数值类型，可以使用 `Typed Arrays`（如 `Float64Array`）提高性能。

   ```javascript
   const array = new Float64Array(100000000);

   console.time("typed array for loop");
   for (let i = 0; i < array.length; i++) {
     // 执行操作
   }
   console.timeEnd("typed array for loop");
   ```

6. 避免不必要的计算和内存分配

   确保在循环中避免不必要的计算和内存分配，这会显著提高性能。

7. JIT (Just-In-Time) 优化

   确保你的代码符合 JavaScript 引擎的 JIT 编译器优化模式。避免使用会触发降级的代码模式，例如：

   - 不要在循环内动态改变数组的长度。
   - 避免在循环内使用 `try-catch`。

## 218. webworker 优化 100000000 数组遍历

见上一问题

## 219. 延迟加载的方式有哪些

## 220. 图片懒加载和预加载的区别

## 221. 加载大量图片的优化方案

## 222. CDN 能加速访问资源的原因

## 223. 浏览器的渲染过程，DOM 树和 render 树的区别

## 224. 浏览器输入 URL 到页面加载显示完成的过程

## 225. 列表无线滚动，页面逐渐卡顿，解决方案

## 226. 虚拟列表，如果子元素高度不固定，处理方案

## 227. 域名发散

## 228. 域名收敛
