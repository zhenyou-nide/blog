---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-07-29T10:00:00.400Z
title: 大宝典-工程化
slug: collection-pack
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 194. Webpack 作用

Webpack 是一个现代的前端模块打包工具，它用于构建和优化 Web 应用程序的前端资源，包括 JavaScript、Css、图片、字体等。Webpack 的主要目标是将项目的所有依赖项（模块、资源文件）打包到一个或多个最终的静态文件中，以便在浏览器中加载。改善前端开发的工作流程，提高代码的可维护性和性能解决了模块化、资源管理、性能优化和自动化等多个关键问题。

## 195. Webpack 构建流程

1. **读取配置文件**:Webpack 首先会读取项目中的配置文件, 通常是 webpack.config.js，该配置文件包含了构建过程中的各种设置，如入口文件、输出目录、加载器 (Loaders)、插件 (Plugins) 等。
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

## 200. 写一个 Loader

## 201. 写一个 Plugin

## 202. Webpack 构建速度提升

## 203. Webpack 神奇注释

## 204. Webpack 分包案例

## 205. Webpack vs Vite

## 206. Babel 的原理

## 207. 模块化和组件化的区别

## 208. CommonJS vs ESM

## 209. SSR vs SCR

## 210. SPA vs MPA
