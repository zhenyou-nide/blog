---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-07-30T10:00:00.400Z
title: 大宝典-工程化
slug: collection-pack
featured: false
draft: true
tags:
  - collections
description: 温故知新
---

## Table of contents

## 194. Webpack 作用

Webpack 是一个现代的前端模块打包工具，它用于构建和优化 Web 应用程序的前端资源，包括 JavaScript、Css、图片、字体等。Webpack 的主要目标是将项目的所有依赖项（模块、资源文件）打包到一个或多个最终的静态文件中，以便在浏览器中加载。改善前端开发的工作流程，提高代码的可维护性和性能解决了模块化、资源管理、性能优化和自动化等多个关键问题。

## 195. Webpack 构建流程

1. **读取配置文件**:Webpack 首先会读取项目中的配置文件，通常是 webpack.config.js，该配置文件包含了构建过程中的各种设置，如入口文件、输出目录、加载器 (Loaders)、插件 (Plugins) 等。
2. **解析入口文件**:Webpack 会根据配置文件中定义的入口点 (entry points) 来解析应用程序的依赖关系。入口文件通常是应用程序的主要 javaScript 文件，但也可以有多个入口点。
3. **依赖解析**:Webpack 分析入口文件和其依赖的模块，构建一个依赖关系图，以确定哪些模块依赖于其他模块，以及它们之间的依赖关系。
4. Loader 处理：Webpack 使用加载器来处理不同类型的资源文件，如 CSS、图片、字体等。加载器允许开发人员在构建过程中转换这些资源文件，以便将它们整合到最终的输出文件中。
5. **Plugin 处理**:Webpack 提供了插件系统，插件用于执行各种任务，如代码压缩、资源优化、HTML 生成、热模块替换 (HMR) 等。插件可以根据需要自定义 Webpack 的构建过程。

6. **生成输出文件**:Webpack 根据入口文件和依赖关系图生成一个或多个输出文件。这些输出文件包括 javaScript 文件、CSS 文件、图片、字体等资源文件。
7. **优化和压缩**:Webpack 可以进行各种优化，包括代码压缩、Tree Shaking、懒加载等以减小包的大小并提高性能。
8. **生成 Source Maps**:Webpack 可以生成 Source Maps，以便在开发中进行调试。Source Maps 是一种映射文件，将最终输出文件映射回原始源代码。
9. **输出到指定目录**: 最终的构建结果被输出到配置文件中指定的目录中，通常是一个名为"dist"的目录。输出文件的命名和目录结构也可以根据配置进行自定义。
10. **完成构建过程**:Webpack 构建过程完成后，它会生成构建报告，包括构建成功或失败的信息，输出文件的大小等统计信息。

## 196. Webpack 热更新原理

1. **监控文件变化**:Webpack 的开发服务器会监控项目中所有的块文件，包括：JS 文件、CSS 文件、模板文件等。
2. **模块热替换**: 当你在代码中做出更改并保存时，Webpack 检测到文件变化，会首先通过热替换插件 (Hot Module Replacement Plugin) 生成新的模块代码。
3. **构建更新的模块**: 生成的新模块代码会被构建成一个独立的文件或数据块，
4. **通知客户端**:Webpack 开发服务器会将更新的模块代码的信息发送到浏览器。
5. **浏览器端处理**: 浏览器接收到更新的模块信息后，会在不刷新页面的情况下通过热替换运行时 (Hot Module Replacement Runtime) 替换相应的模块。
6. **应用程序状态保持**: 热更新还可以保持应用程序的状态。当修改代码不会丢失已有的数据、用户登录状态等。
7. **回调处理**: 允许在模块更新时执行自定义的回调函数，可以处理特定的逻辑，以确保模块更新后的正确性。

## 197. Webpack 常用 Loader

- **Babel Loader**: 用于将新版 JavaScript（如 ES6+) 转换为旧版 JavaScript，以确保在不同浏览器中的兼容性。解决了不同 javaScript 版本之间的问题。
- **Css Loader**: 处理 CSS 文件，使其能够被打包到应用程序中。可以配合其他 Loader（如 style-loader) 一起使用，以处理 CSS 的导入、模块化等问题。
- **style Loader**: 将 CSS 样式加载到页面中，通常与 CSS Loader 一起使用。
- **File Loader**: 处理文件资源（如图片、字体等），将它们复制到输出目录，并返回文件路径。
- **URL Loader**: 与 File Loader 类似，但可以将小文件转换为 Base64 编码的 Data URL，以减小 HTTP 请求的数量。
- **Sass/scss Loader**: 处理 Sass 或 SCSS 样式文件，将它们转换为 CSS，以便在浏览器中使用。
- **Less Loader**: 处理 Less 样式文件，将它们转换为 CSS.
- **Postcss Loader**: 通过 PostCss 插件对 CSS 进行转换，以实现自动前缀、代码压缩、变量替换等任务。

- **Image Loader**: 处理图片文件，包括压缩、优化和 Base64 编码等操作
- **Vue Loader**: 用于加载和解析 Vue.js 单文件组件，包括模板、脚本和样式，
- **Typescript Loader**: 将 TypeScript 代码转换为 JavaScript，使其可以在浏览器中运行。
- **ESLint Loader**: 与 ESLint 集成，用于在构建过程中进行代码质量检査，查找潜在的问题并确保代码规范。

## 198. Webpack 常用 Plugin

- **HtmlWebpackPlugin**: 用于生成 HTML 文件，并自动引入打包后的 JavaScript 和 CSS 文件。它还支持模板，可以根据模板生成 HTML，非常适合单页应用。
- **MiniCssExtractPlugin**: 用于提取 CSS 文件到单独的文件，而不是将 CSS 嵌入到 JavaScript 中，这有助于提高性能和代码可维护性。
- **CleanWebpackPlugin**: 用于在每次构建前清理输出目录，确保输出目录中不会残留旧的文件。
- **CopyWebpackPlugin**: 用于复制静态文件（如图片、字体等）到输出目录，以便在生产环境中引用。
- **DefinePlugin**: 允许你在代码中定义全局常量，用于在开发和生产环境中切换配置例如设置 API 的不同地址。
- **HotModuleReplacementPlugin**: 用于启用 Webpack 的热模块替换 (HMR) 功能允许在开发过程中实时查看代码更改的效果。
- **ProvidePlugin**: 用于在代码中自动加载模块，可以减少模块导入的代码，例如自动引入 jquery 等。
- **BundleAnalyzerPlugin**: 用于分析构建输出的包大小，帮助识别和解决优化问题
- **FriendlyErrorsWebpackPlugin**: 改善开发体验，提供更友好的构建错误信息，以便更容易定位问题。
- **ESLintWebpackPlugin**: 集成 ESLint 代码检查，用于在构建过程中检测和修复代码问题。
- **styleLint-webpack-plugin**: 用于集成 stylelint，对 CSS 和 Sass 等样式文件进行代码检查。

## 199. Loader 和 Plugin 的区别

在 Webpack 中，Loader 和 Plugin 是两个重要的概念，它们用于不同的目的并在 Webpack 构建过程中发挥不同的作用。

- Loader
  **作用：** Loader 主要用于转换模块的源代码。它们能够对文件进行预处理，从而将各种类型的资源（如 ES6、TypeScript、SCSS、图片等）转化为 Webpack 能够理解的模块。

  **工作方式：** Loader 在模块解析阶段生效。它们通过链式调用的方式，从右到左、从下到上依次对文件进行处理。Loader 的主要目的是让 Webpack 能够处理非 JavaScript 文件，并将其转换为 JavaScript 模块。

  **示例：**

  ```javascript
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ];
  }
  ```

- Plugin

  **作用：** Plugin 用于执行范围更广的任务，如打包优化、资源管理、环境变量注入等。它们可以在整个构建过程中执行更复杂和灵活的操作。

  **工作方式：** Plugin 通过 Webpack 的钩子机制进行工作，它们能够在 Webpack 构建生命周期的不同阶段插入自定义行为。Plugins 可以访问 Webpack 编译器和构建过程的详细信息，并通过这些信息来执行特定的操作。

  **示例：**

  ```javascript
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
  ```

**总结**

- **Loader：** 用于转换文件类型，通过链式调用预处理文件，使其能够被 Webpack 解析和打包。
- **Plugin：** 用于执行更广泛的构建任务，通过 Webpack 的钩子机制插入自定义行为，优化和扩展构建过程。

简单来说，Loader 处理文件转换，Plugin 处理构建过程中的各种任务。两者结合使用，使 Webpack 具有强大的灵活性和扩展性。

## 200. 写一个 Loader

编写一个自定义的 Webpack Loader 需要实现一个 Node.js 模块，该模块导出一个函数。这是一个基本的 Loader 示例，该 Loader 将文件内容转换为大写字母。

1. 创建 Loader 文件

   在项目根目录下创建一个名为 `uppercase-loader.js` 的文件：

   ```javascript
   // uppercase-loader.js

   module.exports = function (source) {
     // 将源文件内容转换为大写
     const result = source.toUpperCase();
     return result;
   };
   ```

2. 配置 Webpack

   在项目根目录下创建一个 `webpack.config.js` 文件：

   ```javascript
   // webpack.config.js

   const path = require("path");

   module.exports = {
     mode: "development",
     entry: "./src/index.js",
     output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
     },
     module: {
       rules: [
         {
           test: /\.txt$/,
           use: path.resolve(__dirname, "uppercase-loader.js"),
         },
       ],
     },
   };
   ```

## 201. 写一个 Plugin

编写一个自定义的 Webpack Plugin 需要创建一个 JavaScript 类，并定义一个 `apply` 方法，该方法在 Webpack 构建过程中会被调用。

```javascript
// advanced-plugin.js

class AdvancedPlugin {
  apply(compiler) {
    // 监听编译开始的钩子
    compiler.hooks.compile.tap("AdvancedPlugin", () => {
      console.log("编译开始。..");
    });

    // 监听编译完成的钩子
    compiler.hooks.done.tap("AdvancedPlugin", stats => {
      console.log("编译完成！");
    });
  }
}

module.exports = AdvancedPlugin;
```

在 `webpack.config.js` 中使用 `AdvancedPlugin`：

```javascript
const AdvancedPlugin = require("./advanced-plugin");

module.exports = {
  // ... 其他配置
  plugins: [new AdvancedPlugin()],
};
```

## 202. Webpack 构建速度提升

提升 Webpack 构建速度可以从以下几个方面入手：

1. **优化 Loader 配置**

   - **缓存**：使用 `cache-loader` 或 `babel-loader` 的 `cacheDirectory` 选项来缓存编译结果。
     ```javascript
     {
       loader: 'babel-loader',
       options: {
         cacheDirectory: true,
       },
     }
     ```
   - **限制作用范围**：通过 `include` 或 `exclude` 选项限制 Loader 的作用范围。
     ```javascript
     {
       test: /\.js$/,
       include: path.resolve(__dirname, 'src'),
       use: 'babel-loader',
     }
     ```

2. **分离开发和生产环境配置**

   使用 `webpack-merge` 将开发和生产环境的配置文件分离，确保只有必要的插件在相应环境下被加载。

3. **减少解析时间**

   - **模块别名**：使用 `resolve.alias` 配置来缩短模块路径，减少模块查找时间。
     ```javascript
     resolve: {
       alias: {
         '@': path.resolve(__dirname, 'src'),
       },
     }
     ```
   - **文件扩展名**：明确指定要解析的文件扩展名，减少文件解析次数。
     ```javascript
     resolve: {
       extensions: ['.js', '.jsx', '.json'],
     }
     ```

4. **DLLPlugin**

   使用 `DllPlugin` 将不常变动的依赖单独打包，可以显著提高构建速度。

   ```javascript
   const webpack = require("webpack");

   module.exports = {
     // ...
     plugins: [
       new webpack.DllPlugin({
         name: "[name]",
         path: path.resolve(__dirname, "dist/[name]-manifest.json"),
       }),
     ],
   };
   ```

5. **HappyPack**

   使用 `HappyPack` 将任务分解到多个子进程中并行处理，减少总编译时间。

   ```javascript
   const HappyPack = require("happypack");

   module.exports = {
     // ...
     module: {
       rules: [
         {
           test: /\.js$/,
           use: "happypack/loader?id=js",
         },
       ],
     },
     plugins: [
       new HappyPack({
         id: "js",
         loaders: ["babel-loader"],
       }),
     ],
   };
   ```

6. **Thread-loader**

   利用 `thread-loader` 开启多进程编译。

   ```javascript
   {
     test: /\.js$/,
     use: [
       'thread-loader',
       'babel-loader',
     ],
   }
   ```

7. **优化插件**

   - **`terser-webpack-plugin`**：在生产环境下使用更快的压缩插件。

     ```javascript
     const TerserPlugin = require("terser-webpack-plugin");

     module.exports = {
       optimization: {
         minimize: true,
         minimizer: [new TerserPlugin()],
       },
     };
     ```

   - **`webpack-parallel-uglify-plugin`**：并行压缩 JS 文件。

     ```javascript
     const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

     module.exports = {
       plugins: [
         new ParallelUglifyPlugin({
           uglifyJS: {
             output: {
               comments: false,
             },
             compress: {
               warnings: false,
             },
           },
         }),
       ],
     };
     ```

8. **持久化缓存**

   Webpack 5 引入了持久化缓存，可以显著减少重复构建时间。

   ```javascript
   module.exports = {
     cache: {
       type: "filesystem",
     },
   };
   ```

9. **缩小编译范围**

   - **Tree Shaking**：移除无用代码。
     ```javascript
     module.exports = {
       optimization: {
         usedExports: true,
       },
     };
     ```

10. **其他工具**

    - **`speed-measure-webpack-plugin`**：衡量构建时间，找出瓶颈。

      ```javascript
      const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
      const smp = new SpeedMeasurePlugin();

      module.exports = smp.wrap({
        // webpack config
      });
      ```

    - **`webpack-bundle-analyzer`**：分析打包后的文件，优化体积。

      ```javascript
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

      module.exports = {
        plugins: [new BundleAnalyzerPlugin()],
      };
      ```

## 203. Webpack 神奇注释

Webpack 的“神奇注释”（Magic Comments）是一种内联注释，它们可以用来提供额外的构建指令，从而优化打包过程和改善开发体验。

1. **动态导入 (Dynamic Imports)**

   动态导入允许你按需加载模块，可以用 `import()` 函数结合神奇注释实现代码拆分和懒加载。

   - **webpackChunkName** 指定拆分后生成的 chunk 的名称。

     ```javascript
     import(/* webpackChunkName: "my-chunk-name" */ "./module");
     ```

   - **webpackMode** 指定导入模式，可以是 `lazy`、`lazy-once` 或 `eager`。

     ```javascript
     import(/* webpackMode: "lazy" */ "./module"); // 默认模式
     import(/* webpackMode: "eager" */ "./module"); // 立即加载
     ```

   - **webpackPrefetch** 指示浏览器在空闲时预取资源，优化性能。

     ```javascript
     import(/* webpackPrefetch: true */ "./module");
     ```

   - **webpackPreload** 指示浏览器立即加载资源，优先级高于 `webpackPrefetch`。

     ```javascript
     import(/* webpackPreload: true */ "./module");
     ```

   - **webpackInclude 和 webpackExclude** 用于正则表达式匹配，包含或排除特定文件。

     ```javascript
     import(
       /* webpackInclude: /\.js$/ */
       /* webpackExclude: /\.test\.js$/ */
       "./module"
     );
     ```

2. **注释中的魔法**

   在注释中添加魔法注释，可以在代码分割和异步加载时提供更多的控制。

   - **webpackIgnore** 忽略特定的动态导入。

     ```javascript
     import(/* webpackIgnore: true */ "./module");
     ```

下面是一个使用各种神奇注释的示例：

```javascript
// 使用 webpackChunkName 指定 chunk 名称
import(/* webpackChunkName: "login" */ "./login").then(module => {
  const login = module.default;
  login();
});

// 使用 webpackMode 设置懒加载模式
import(/* webpackMode: "eager" */ "./dashboard").then(module => {
  const dashboard = module.default;
  dashboard();
});

// 使用 webpackPrefetch 指示浏览器预取资源
import(/* webpackPrefetch: true */ "./analytics").then(module => {
  const analytics = module.default;
  analytics();
});

// 使用 webpackPreload 指示浏览器立即加载资源
import(/* webpackPreload: true */ "./performance").then(module => {
  const performance = module.default;
  performance();
});

// 使用 webpackInclude 和 webpackExclude 进行正则匹配
import(
  /* webpackInclude: /\.js$/ */
  /* webpackExclude: /\.test\.js$/ */
  "./components"
).then(module => {
  const components = module.default;
  components.init();
});

// 使用 webpackIgnore 忽略特定的动态导入
import(/* webpackIgnore: true */ "./config");
```

## 204. Webpack 分包案例

**目的**：尽量按改动频率来区分，利用浏览器缓存

1. vendor: 第三方 lib 库，基本不会改动，除非依赖版本升级
2. common: 业务组件代码的公共部分提取出来，改动较少
3. entry: 不同页面的 entry 里业务组件代码的差异部分，会经常改动

## 205. Webpack vs Vite

**Webpack**: 一个打包工具（对标 Rollup）, 静态构建，在项目工程化，依赖，打包，构建等过程发挥作用

**Vite**: 一个更上层的工具链方案（对标 Webpack + 针对 web 的常用配置 + webpack-dev-server）。旨在提供快速的开发体验，使用 ES modules 和现代浏览器特性来实现即时开发，不需要预构建或编译

## 206. Babel 的原理

js 的编译工具，将新版本的 js(ES6+) 转换为向后兼容的 js 代码，以便在旧版 js 引擎上运行

**工作原理如下：**

1. 解析（parsing）：
   将输入的 js 代码解析成抽奖语法树（AST，将代码分解成语法树节点，以便后续的分析和转换）
2. 转换（Transformation）：
   在这一步，Babel 会根据配置的插件和预设，对 AST 进行各种转换操作。这些转换可能包括将现代的 ES6+ 语法转换为 ES5 语法，移除类型注解（如 Flow 或 TypeScript），或添加 polyfill 以支持新的标准库功能。例如，`@babel/plugin-transform-arrow-functions` 插件会将箭头函数转换为普通函数

3. 生成（Generation）：
   转换后的 AST 会被重新生成为 JavaScript 代码。在生成过程中，Babel 会输出与转换后的 AST 对应的代码字符串。这个新生成的代码是向后兼容的，可以在较旧的 JavaScript 环境中运行

## 207. 模块化和组件化的区别

**模块化**

1. 重点：主要关注代码的组织和封装，将代码分割成小的独立单元（模块），每个模块通常负责特定功能或任务
2. 特点：通过导入和导出语法来定义模块之间的依赖关系；

**组件化**

1. 重点：主要关注构建用户界面和交互。将用户界面的不同部分拆分成可重用的组件，每个组件包含特定的 UI 元素和交互逻辑
2. 特点：通常使用组件库或框架来创建组合和渲染可重用的 UI 组件

## 208. CommonJS vs ESM

CommonJS 通常用于服务端（Node.js），在浏览器环境需要使用工具转译或打包

ESM（ECMAScript Modules）模块是浏览器原生支持的，可以直接在浏览器中使用

1. 加载方式

   - **CommonJS:** 同步加载，模块在运行时（runtime）加载，按需加载
   - **ESM:** 可异步加载 `<script type='module' />`

2. 执行时机

   - **CommonJS:** 在第一次 `require` 时执行
   - **ESM:** 加载和解析时执行

3. 依赖关系

   - **CommonJS:** 动态的，意味着模块可以在运行时根据条件加载不同的依赖
   - **ESM:** 静态的，解析时加载，代码执行前就被加载，依赖关系在模块加载前就确定

4. 导出方式

   - **CommonJS:** `require`和`module.export`，可到处任务类型的值，包含函数，对象，类等
   - **ESM:** `export`和`import`关键字。导出时要明确指定导出的变量，函数或类，导入也需要明确指定

5. 全局共享

   - **CommonJS: **模块有自己的作用域，不会污染全局作用域
   - **ESM: **默认是严格模式（strict mode），变量不会污染全局作用域，模块内部的变量不会被提升

6. 静态分析
   - **CommonJS: **模块的依赖关系无法在编译时静态分析，这对一些工具的性能和优化产生了挑战
   - **ESM: **模块的依赖关系可以在编译时进行静态分析，这有助于提高性能，比如 tree-shaking

在 Node.js 中使用 ESM，可以将文件扩展名改为 .mjs，在 package.json 文件中添加 "type": "module"。

## 209. SSR vs CSR

### 服务端渲染 (SSR)

服务端渲染是指在服务器上生成完整的 HTML 页面，然后将其发送到客户端浏览器进行展示。传统的 Web 开发多采用这种方式。

1. 特点：

   1. **初始加载快**：由于服务器直接返回完整的 HTML，客户端在接收到页面时无需额外的 JavaScript 处理，因此初始加载时间较短。
   2. **SEO 友好**：搜索引擎爬虫能够直接读取和索引服务器生成的 HTML 内容，有利于搜索引擎优化。
   3. **更少的客户端负担**：服务器完成了大部分渲染工作，客户端只需渲染已经生成的 HTML。

2. 优缺点：

   - **优点**：

     - 初始加载速度快。
     - 对 SEO 友好。
     - 适合内容驱动的网站。

   - **缺点**：
     - 服务器压力大，需要更多的计算资源。
     - 动态更新交互较慢，因为每次都需要重新请求和渲染页面。

### 客户端渲染 (CSR)

客户端渲染是指在客户端（通常是浏览器）上使用 JavaScript 动态生成和更新页面内容。最常见的例子是单页应用程序 (SPA)。

1. 特点：

   1. **初始加载慢**：客户端需要先下载 HTML 框架和大量的 JavaScript 文件，然后执行这些脚本以生成内容，因此初始加载时间较长。
   2. **更好的用户体验**：一旦加载完成，页面之间的导航和更新速度更快，因为不需要每次都从服务器请求完整的页面。
   3. **动态交互强**：适合复杂的动态交互场景，可以实现更丰富的用户体验。

2. 优缺点：

   - **优点**：

     - 更好的用户体验，页面交互更流畅。
     - 适合复杂的单页应用程序。
     - 服务器负担较轻，减少了服务器的计算压力。

   - **缺点**：
     - 初始加载时间较长。
     - SEO 不友好，搜索引擎爬虫可能无法抓取动态生成的内容。
     - 对低端设备和慢速网络不友好。

### 总结

#### SSR vs CSR

| 特点         | SSR                              | CSR                                    |
| ------------ | -------------------------------- | -------------------------------------- |
| 初始加载时间 | 较快                             | 较慢                                   |
| SEO 友好性   | 高                               | 低                                     |
| 用户体验     | 初始加载快，但后续导航较慢       | 初始加载慢，但后续导航和交互更流畅     |
| 服务器负担   | 高                               | 低                                     |
| 适用场景     | 内容驱动的网站，如博客和新闻网站 | 交互丰富的单页应用程序，如社交媒体平台 |

现代 Web 开发中，许多应用会结合 SSR 和 CSR 的优点，采用混合渲染的方式。往往是首屏 SSR，保证首页渲染速度，次屏 CSR，保证用户交互体验。例如，Next.js 是一个 React 框架，它支持页面级别的 SSR 和 CSR，允许开发者根据具体需求选择合适的渲染方式。

## 210. SPA vs MPA vs SSG

### 单页应用（SPA）

单页应用（Single Page Application, SPA）是一种 Web 应用架构，整个应用只有一个 HTML 页面，通过动态加载和替换页面内容来实现不同的视图和交互。

1. 特点

   1. **单一页面结构**：所有的页面内容都在一个 HTML 文件中，通过 JavaScript 动态更新页面。
   2. **客户端渲染**：大部分渲染工作由客户端（浏览器）完成，使用框架如 React、Vue、Angular 等。
   3. **快速导航**：页面切换和内容更新不需要重新加载整个页面，用户体验流畅，路由跳转是基于特定的实现（如 `react-router` 等）而非原生浏览器的文档跳转
   4. **状态管理**：通常需要管理复杂的前端状态，可以使用 Redux、Vuex 等状态管理库。

2. 优缺点

   - **优点**：

     - 流畅的用户体验，页面切换速度快。
     - 减少服务器请求次数，降低服务器压力。
     - 更适合交互性强的应用，如社交媒体、单页仪表盘等。

   - **缺点**：
     - 首次加载时间较长，需要下载大量的 JavaScript 文件。
     - SEO 不友好，需要额外的配置和工具（如服务器端渲染或预渲染）来改善。
     - 对低端设备和慢速网络不友好。

### 多页应用（MPA）

多页应用（Multi Page Application, MPA）是一种传统的 Web 应用架构，每个页面都有一个独立的 HTML 文件，每次导航时都会请求新的 HTML 页面。

1. 特点

   1. **多页面结构**：每个页面都是独立的 HTML 文件，通过服务器请求加载新页面。
   2. **服务端渲染**：大部分渲染工作由服务器完成，生成完整的 HTML 页面发送给客户端。
   3. **独立页面加载**：每次页面切换都会请求新的 HTML 页面，重新加载页面内容。不同页面路由切换有原生浏览器文档跳转。
   4. **简单的状态管理**：每个页面独立，不需要复杂的前端状态管理。

2. 优缺点

   - **优点**：

     - 初次加载速度快，每个页面可以单独优化和缓存。
     - 对 SEO 友好，搜索引擎能够轻松抓取和索引页面内容。
     - 适合内容驱动的网站，如博客、新闻网站、企业官网等。

   - **缺点**：
     - 页面切换时需要重新加载整个页面，用户体验不如 SPA 流畅。
     - 服务器请求次数多，可能增加服务器压力。
     - 前后端代码分离度较低，可能需要更多的开发和维护工作。

### 静态网站生成（SSG）

静态网站生成（Static Site Generation, SSG）是一种 Web 应用架构，在构建时生成静态 HTML 页面，用户请求时直接提供这些预生成的页面。

1. 特点

   1. **构建时生成静态文件**：在构建阶段将所有页面生成静态 HTML 文件，部署到静态服务器上。
   2. **快速加载**：由于页面是静态的，加载速度非常快，不需要额外的服务器处理。
   3. **SEO 友好**：静态 HTML 文件天然对搜索引擎友好，容易被爬虫抓取和索引。
   4. **适合内容更新频率低的网站**：适用于内容较为固定，不需要频繁更新的网站。

2. 优缺点

   - **优点**：

     - 加载速度快，性能好。
     - 对 SEO 友好，搜索引擎爬虫容易抓取内容。
     - 维护成本低，部署简单。

   - **缺点**：
     - 不适合频繁更新的内容，构建过程较慢。
     - 动态功能和复杂交互实现较困难，需要依赖客户端渲染或 API 调用。

### 总结

| 特点         | SPA                                      | MPA                                | SSG                            |
| ------------ | ---------------------------------------- | ---------------------------------- | ------------------------------ |
| 页面结构     | 单一页面，动态内容                       | 多页面，静态内容                   | 预生成静态页面                 |
| 渲染方式     | 客户端渲染                               | 服务端渲染                         | 构建时生成静态文件             |
| 页面导航     | 快速，流畅                               | 较慢，需要重新加载页面             | 快速，因为是静态文件           |
| 初次加载时间 | 较长                                     | 较短                               | 较短                           |
| SEO 友好性   | 较差，需要额外配置                       | 较好，天然支持                     | 非常好                         |
| 适用场景     | 交互性强的应用，如社交媒体、单页仪表盘等 | 内容驱动的网站，如博客、新闻网站等 | 内容固定的网站，如博客、文档等 |
| 状态管理     | 复杂，需要使用状态管理库                 | 简单，每个页面独立                 | 简单，页面内容固定             |
