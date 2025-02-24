---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-08-01T01:00:00.400Z
title: 大宝典-性能相关
slug: collection-performance
featured: false
draft: false
tags:
  - collections
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
   - **总阻塞时间（Total Blocking Time, TBT）**：页面加载过程中超过 50 毫秒的长任务时间总和。

3. **可见性（Visibility）**：

   - **累积布局偏移（Cumulative Layout Shift, CLS）**：页面元素在加载过程中意外移动的程度。
   - **首内容绘制（First Contentful Paint, FCP）**：页面主要内容（如文本、图片）首次呈现在屏幕上的时间。

4. **资源加载（Resource Loading）**：

   - **资源大小（Resource Size）**：所有加载资源（如 CSS、JavaScript、图片等）的大小。
   - **请求数量（Number of Requests）**：页面加载过程中发出的 HTTP 请求数量。

5. **网络效率（Network Efficiency）**：

   - **带宽利用率（Bandwidth Utilization）**：网络带宽的使用情况。
   - **延迟（Latency）**：从请求发出到接收到响应所需的时间。

6. **缓存效果（Caching Efficiency）**：

   - **缓存命中率（Cache Hit Ratio）**：从缓存中加载资源的比例。
   - **离线支持（Offline Support）**：页面在离线模式下的可用性。

7. **其他用户体验指标**：
   - **首屏渲染时间（Time to Interactive, TTI）**：页面完全可交互的时间。
   - **用户感知加载时间（Perceived Load Time）**：用户感知页面加载完成的时间。

这些指标可以通过工具如 Google Lighthouse、WebPageTest、GTmetrix 等进行监测和评估。通过分析这些指标，开发者可以识别性能瓶颈并进行针对性的优化，例如优化资源加载、减少阻塞脚本、利用缓存等。

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
// 执行一些任务。..
performance.mark("end-task");
performance.measure("task-duration", "start-task", "end-task");

// 获取高精度时间
const start = performance.now();
// 执行一些任务。..
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

## 216. 如何实现长缓存 (Long-term caching)

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
     console.log("结果：", e.data);
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

## 219. 延迟加载（Lazy Loading）的方式有哪些

1. **图像延迟加载**：

   - **占位符图片**：使用低分辨率或空白图片作为占位符，当图像进入视口时再加载真实图片。
   - **Intersection Observer API**：通过 JavaScript 监测图像是否进入视口，当图像进入视口时加载图片。

2. **滚动加载（Infinite Scroll）**：

   - 通过 JavaScript 监听用户滚动事件，当用户接近页面底部时，自动加载更多内容。这种方式常用于社交媒体、商品列表等需要展示大量数据的页面。

3. **组件延迟加载**：

   - **React Suspense**：在 React 中，可以使用`React.Suspense`和动态导入（`import()`）来延迟加载组件。
   - **Vue.js 异步组件**：Vue.js 支持通过异步函数定义组件，从而实现组件的延迟加载。

4. **模块延迟加载**：

   - **Webpack**：使用代码分割（Code Splitting）和动态导入（`import()`）来实现模块的延迟加载。只有在需要时才加载相关模块，从而减少初始加载时间。

5. **脚本延迟加载**：

   - **defer 和 async 属性**：在 HTML 中使用`<script>`标签的`defer`或`async`属性来延迟脚本的执行。`defer`会在 HTML 解析完成后执行脚本，而`async`会在脚本下载完成后立即执行，不会阻塞 HTML 解析。

6. **数据延迟加载**：

   - **按需加载数据**：通过 AJAX 或 Fetch API，当用户与页面交互时（如点击按钮或滚动到特定区域）再加载相关数据。

7. **页面内容分块加载**：

   - **Skeleton Screen**：在页面加载时显示骨架屏（Skeleton Screen），提供一种渐进加载的视觉反馈，提升用户体验。

8. **Service Workers 和缓存**：
   - 使用 Service Workers 缓存资源，通过网络请求失败时从缓存中读取资源，实现离线访问和快速加载。

## 220. 图片懒加载和预加载的区别

图片懒加载和预加载是两种不同的优化策略，它们的目的和实现方式有显著差异。

### 图片懒加载（Lazy Loading）

**目的**：

- 减少初始加载时间，提高页面性能。
- 只有当用户需要查看图片时（如滚动到图片所在的区域）才加载图片，从而节省带宽。

**实现方式**：

1. **占位符图片**：使用低分辨率或空白图片作为占位符，当图像进入视口时再加载真实图片。
2. **Intersection Observer API**：通过 JavaScript 监测图像是否进入视口，当图像进入视口时加载图片。
3. **数据属性**：在 HTML 中使用`data-src`属性来存储图片的真实 URL，当需要加载图片时，再将`data-src`的值赋给`src`属性。

**示例**：

```html
<img data-src="real-image.jpg" alt="Lazy Loaded Image" />
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => {
      observer.observe(img);
    });
  });
</script>
```

### 图片预加载（Preloading）

**目的**：

- 提前加载即将需要的资源，以减少用户等待时间。
- 提高用户体验，例如在用户可能会立即访问的下一页或区域提前加载图片。

**实现方式**：

1. **`<link rel="preload">` 标签**：在 HTML 中使用`<link rel="preload">`标签指定需要预加载的资源。
2. **JavaScript**：通过 JavaScript 在后台加载图片，将它们存储在浏览器缓存中，以便在实际需要时快速显示。

**示例**：

```html
<!-- HTML 方式 -->
<link rel="preload" href="image-to-preload.jpg" as="image" />

<!-- JavaScript 方式 -->
<script>
  const preloadImage = new Image();
  preloadImage.src = "image-to-preload.jpg";
</script>
```

### 总结

- **懒加载**：在用户需要查看图片时再加载图片，目的是减少初始加载时间和节省带宽。
- **预加载**：提前加载将来可能需要的图片，以减少未来的等待时间，目的是提高用户体验。

## 221. 加载大量图片的优化方案

1. 图片懒加载（Lazy Loading）

   只有当用户滚动到图片所在区域时才加载图片，减少初始加载时间和带宽使用。

   ```html
   <img data-src="real-image.jpg" alt="Lazy Loaded Image" />
   <script>
     document.addEventListener("DOMContentLoaded", function () {
       const lazyImages = document.querySelectorAll("img[data-src]");
       const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             const img = entry.target;
             img.src = img.getAttribute("data-src");
             img.removeAttribute("data-src");
             observer.unobserve(img);
           }
         });
       });
       lazyImages.forEach(img => {
         observer.observe(img);
       });
     });
   </script>
   ```

2. 图片压缩与格式优化

   使用合适的图片格式和压缩技术，减少图片大小。

   - **WebP**：相比 JPEG 和 PNG，WebP 格式具有更好的压缩率和图像质量。
   - **工具**：使用工具如 ImageOptim、TinyPNG、JPEG-Optimizer 等进行图片压缩。

3. 响应式图片（Responsive Images）

   根据不同设备和屏幕大小加载合适尺寸的图片，避免加载过大的图片。

   ```html
   <img
     srcset="image-320w.jpg 320w, image-480w.jpg 480w, image-800w.jpg 800w"
     sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
     src="image-800w.jpg"
     alt="Responsive Image"
   />
   ```

4. 图片预加载（Preloading）

   提前加载将要展示的图片，减少用户等待时间。

   ```html
   <!-- HTML 方式 -->
   <link rel="preload" href="image-to-preload.jpg" as="image" />

   <!-- JavaScript 方式 -->
   <script>
     const preloadImage = new Image();
     preloadImage.src = "image-to-preload.jpg";
   </script>
   ```

5. 使用 CDN（内容分发网络）

   将图片托管在 CDN 上，利用其全球分布的节点加速图片加载。

   - **优势**：降低服务器负载，提升图片加载速度。

6. 图像占位符（Placeholder）

   在图片加载之前显示低分辨率或颜色块占位符，提供更好的用户体验。

   ```html
   <img
     src="low-res-placeholder.jpg"
     data-src="high-res-image.jpg"
     alt="Placeholder Image"
     class="lazyload"
   />
   ```

7. 渐进式 JPEG（Progressive JPEG）

   使用渐进式 JPEG 格式，图片会逐步加载，提高感知加载速度。

8. 分片加载（Chunk Loading）

   将图片列表分成多个部分，逐步加载，避免一次性加载大量图片。

   ```javascript
   const loadImagesInChunks = (images, chunkSize) => {
     for (let i = 0; i < images.length; i += chunkSize) {
       setTimeout(() => {
         images.slice(i, i + chunkSize).forEach(img => {
           const image = new Image();
           image.src = img.dataset.src;
           img.src = image.src;
         });
       }, i * 100);
     }
   };
   ```

9. 优化缓存策略

   配置缓存头，确保浏览器能缓存图片，减少重复加载。

   ```http
   Cache-Control: public, max-age=31536000
   ```

10. 使用服务端渲染（SSR）

    在服务端生成图片 HTML，减少客户端的渲染负担，提高首屏加载速度。

11. 图像精灵（CSS Sprites）

    将多个小图片合并成一张大图片，通过 CSS 定位显示，提高加载效率。

## 222. CDN 能加速访问资源的原因

1. 靠近用户

   当用户请求资源时，CDN 会根据用户的地理位置将请求路由到最近的节点，从而减少网络延迟和传输时间。

2. 负载均衡

   CDN 使用负载均衡技术将请求分散到多个服务器上，避免单一服务器过载。

3. 缓存优化

   CDN 会缓存资源并根据设定的缓存策略在用户请求时提供缓存内容。

4. 减少网络拥塞

   分布式的网络架构，用户的请求不需要穿越繁忙的骨干网，而是通过 CDN 节点的优化路径进行传输。

5. 压缩和优化

   CDN 提供的内容通常经过压缩和优化，例如，CDN 可以对静态文件进行 Gzip 压缩，或者将多个小文件合并成一个大文件，减少请求数量。

6. 动态内容加速

   尽管 CDN 主要用于加速静态内容的传输，但许多现代 CDN 还支持动态内容加速。

7. 安全性增强

   CDN 提供的 DDoS 防护、Web 应用防火墙（WAF）等安全功能，防止恶意流量的干扰，从而间接提高资源访问速度。

8. 提高可用性和冗余性

   CDN 的多节点结构提供了冗余，即使某个节点出现故障，流量可以自动切换到其他节点，确保资源始终可用

**总结**

CDN 通过地理分布的服务器网络、负载均衡、缓存优化、减少网络拥塞、压缩和优化、动态内容加速、安全性增强以及提高可用性和冗余性等多种方式，加速了资源的访问，从而显著提升用户体验。

## 223. 浏览器的渲染过程，DOM 树和 render 树的区别

浏览器的渲染过程是将 HTML、CSS 和 JavaScript 代码转换为用户可以看到和交互的网页内容的过程。这个过程包括多个步骤，其中构建 DOM 树和 Render 树是两个重要环节。下面是详细的浏览器渲染过程以及 DOM 树和 Render 树的区别。

**浏览器的渲染过程**

1. **解析 HTML，构建 DOM 树**：

   - 浏览器从上到下解析 HTML 文档，并将 HTML 标签转换为 DOM 节点，构建出 DOM 树（Document Object Model Tree）。DOM 树表示文档的结构，HTML 标签、属性和内容都被表示为节点。

2. **解析 CSS，构建 CSSOM 树**：

   - 浏览器解析所有相关的 CSS 样式，包括外部样式表、内部样式表和行内样式，构建出 CSSOM 树（CSS Object Model Tree）。CSSOM 树表示样式的层次结构和每个元素的样式信息。

3. **合并 DOM 树和 CSSOM 树，生成 Render 树**：

   - 浏览器将 DOM 树和 CSSOM 树结合起来，生成 Render 树（渲染树）。Render 树的节点是可见元素的渲染对象，包含样式和布局信息。

4. **布局（Layout）**：

   - 浏览器根据 Render 树计算每个节点的几何信息（位置和大小），这个过程称为布局或回流（Reflow）。

5. **绘制（Painting）**：

   - 浏览器根据布局结果，将 Render 树的节点绘制到屏幕上，这个过程称为绘制或重绘（Repaint）。

6. **组合和显示（Compositing）**：
   - 最后，浏览器将各个绘制后的图层合并并显示在屏幕上。

**DOM 树和 Render 树的区别**

- DOM 树（Document Object Model Tree）

  - **内容**：DOM 树表示 HTML 文档的结构，包括所有 HTML 标签、属性和文本内容。
  - **节点类型**：DOM 树包含所有类型的节点，包括文档节点、元素节点、属性节点和文本节点。
  - **可见性**：DOM 树中的节点不区分可见和不可见的元素，所有 HTML 元素都在 DOM 树中表示。

- Render 树（Render Tree）
  - **内容**：Render 树表示用于渲染页面的可见元素和样式信息。
  - **节点类型**：Render 树的节点是渲染对象，每个节点对应一个或多个 DOM 元素，但只包括那些对用户可见的元素。
  - **可见性**：Render 树只包含可见的元素。如果一个元素在 CSS 中被设置为`display: none`，它及其子元素不会出现在 Render 树中；但如果是`visibility: hidden`，它会在 Render 树中，只是不显示。
  - **样式信息**：Render 树的节点包含计算好的样式信息，这些信息是从 CSSOM 树中获取的。

```html
<!doctype html>
<html>
  <head>
    <style>
      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <div>
      <p>Hello World</p>
      <p class="hidden">This is hidden</p>
    </div>
  </body>
</html>
```

**DOM 树**：

```
html
└── head
└── body
    └── div
        └── p (Hello World)
        └── p (This is hidden, class="hidden")
```

**Render 树**：

```
RenderObject (div)
└── RenderObject (p, "Hello World")
```

在这个例子中，第二个`<p>`元素因为有`display: none`属性，不会出现在 Render 树中，但在 DOM 树中仍然存在。

**总结**

- **DOM 树**是 HTML 文档的结构表示，包含所有节点，无论是否可见。
- **Render 树**是用于渲染页面的结构表示，只包含可见节点和样式信息。
- 浏览器的渲染过程包括解析 HTML 和 CSS、构建 DOM 树和 CSSOM 树、生成 Render 树、布局、绘制和组合显示。

通过理解这些概念，可以更好地优化网页性能和用户体验。

## 224. 浏览器输入 URL 到页面加载显示完成的过程

当你在浏览器中输入一个 URL 并访问一个页面时，浏览器会经历以下几个步骤：

1. **DNS 解析 (DNS Resolution)**:

   - 用户再浏览器重输入 URL，浏览器开始解析域名（URL）并查找 DNS 缓存，以查找域名对应的 IP 地址
   - 如果域名对应的 IP 地址未在本地 DNS 缓存中找到，浏览器将传递给操作系统中的 DNS 解析器，操作系统将查询操作传递给本地域名服务器
   - 本地域名服务器再自己的 DNS 缓存中查找域名对应的 IP 地址，如果找到则返回，否则继续查询更高级别的 DNS 服务器，直到查找到 IP 地址
   - 详见 [DNS resolution](/posts/dns-resolution)

2. **建立连接 (Establishing a Connection)**:

   - 浏览器会使用 IP 地址与服务器建立一个 TCP 连接，通常是通过端口 80 (HTTP) 或 443 (HTTPS)。
   - 通过 TCP 三次握手建立连接，确保浏览器和服务器之间可以互相通信

3. **发送 HTTP 请求 (Sending HTTP Request)**:

   - 建立连接后，浏览器会向服务器发送一个 HTTP 请求

4. **服务器处理请求 (Server Processes Request)**:

   - 服务器接收到请求后，会处理该请求。服务器通常会查询数据库、执行服务器端脚本或读取文件系统以生成响应内容。

5. **服务器发送响应 (Server Sends Response)**:

   - 处理完成后，服务器会将生成的内容（如 HTML 文件、图像、CSS 文件等）作为 HTTP 响应发送回浏览器。响应中还包含状态码（如 200、404、500 等）和一些响应头信息。

6. **浏览器接收 HTML**:

   - 浏览器接收 HTTP 响应，并爱上解析响应数据，查找 HTML。

7. **构建 DOM 树**

   - 浏览器解析 HTML，构建 DOM 树，表示页面的结构

8. **构建 CSSOM 树**

   - 同时，浏览器开始解析 CSS 样式表，构建 CSSOM，表示页面的样式信息

9. **构建渲染树**

   - 浏览器将 DOM 树和 CSSOM 树结合起来，构建渲染树（render tree），表示页面的可见内容

10. **布局和绘制**

    - 浏览器计算渲染树中每个元素的大小和位置，然后进行页面布局
    - 最后，浏览器绘制页面上的每一个元素，呈现给用户

11. **交互和 Javascript**
    - 如果遇到了 js，浏览器会去执行，可以修改 DOM 和 CSSOM，以及处理用户交互
12. **完成页面加载**:

    - 当资源（包括嵌入的资源，样式表，脚本等）加载完成，浏览器会触发 onload 事件，表示页面加载完成

13. **页面渲染完成**:
    - 用户看到页面内容

## 225. 列表无限滚动，页面逐渐卡顿，解决方案

- 分页
- 虚拟列表

## 226. 虚拟列表，如果子元素高度不固定，处理方案

不知道

## 227. 域名发散

**PC 时代产物**

以前，server 的负载能力差，网速慢，设备性能，server 支撑不了大并发请求，为了避免服务器崩溃，浏览器要对并发链接上限有所限制，如果每个用户的并发连接上限不限制的话，结果就是 server 极易崩溃，这样会导致另外的问题，如果一个页面同时请求多张图片时，图片需要分批请求，再渲染，性能和用户体验就会很差，所以以前的 PC 时代对静态资源优化时，通常会将静态资源分布在几个不同的域，保证资源分域名存储，以提供最大并行度，让客户端加载静态资源更加迅速，这个分散域名的过程，就叫**域名发散**

对于使用 HTTP/2 的网站，域名发散可能没有必要。HTTP/2 支持多路复用；

创建子域名的数量应适当。一般来说，2-4 个子域名是合适的，过多的子域名可能会导致 DNS 查找开销增加，反而影响性能。

## 228. 域名收敛

**移动端时代产物**

在整个 http 请求过程中，DNS 解析这部分占比非常高，而当 DNS 解析占比高的情况下，更加需要把资源集中在一个域名下，使得后续可以使用缓存结果，而非把域名发散，这个把多个域名下资源合并到同一个域名下的过程叫做**域名收敛**

随着 HTTP/2 的普及，域名收敛变得越来越重要，因为 HTTP/2 允许多路复用，即在单个连接上并行传输多个资源。
