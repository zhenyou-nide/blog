---
title: gatsby build throw "window" is not available during server side rendering.
author: zhenyounide
pubDatetime: 2021-07-20T11:25:23Z
slug: gatsby-build-window-undefined-error
featured: false
draft: false
tags:
  - problems
  - gatsbyjs
description: ""
---

## Table of contents

gatsby 搭建企业站，使用`scrollreveal`在元素滚动到视图中时对其进行动画处理，在执行`gatsby build`的时候出现如下错误

ERROR #95312

```log

"window" is not available during server side rendering.

See our docs page for more info on this error: https://gatsby.dev/debug-html

var index = window.requestAnimationFrame ||

window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
polyfill;

WebpackError: ReferenceError: window is not defined

- miniraf.es.js:38
  node_modules/miniraf/dist/miniraf.es.js:38:1

- scrollreveal.es.js:1
  node_modules/scrollreveal/dist/scrollreveal.es.js:1:1

- service.js:1
  src/components/home/service.js:1:1

- index.js:1
  src/pages/index.js:1:1

not finished Generating image thumbnails - 18.303s
```

1. 问题分析

   通常，由于以下原因之一，在生成静态 HTML 文件时发生错误：

   - 某些代码引用了“浏览器全局变量”，例如 window 或 document。 如果这是您的问题，则应该在上面看到类似`window is not defined`的错误。 要解决此问题，请找出有问题的代码，或者
     - 在定义窗口之前调用此代码之前进行检查，以便在构建盖茨比时该代码无法运行（请参见下面的代码示例）；
     - 如果该代码位于的 render 函数中 一个 React.js 组件，将该代码移动到 componentDidMount 生命周期或 useEffect 挂钩中，以确保该代码除非在浏览器中运行，否则不会运行
   - 检查页面目录（和所有子目录）中列出的每个 JS 文件是否正在导出 React 组件或字符串。 Gatsby 会将页面目录下列出的所有 JS 文件都视为页面组件，因此它必须具有默认导出，即组件或字符串。

   - 您混淆了导入，并要求在同一文件中进行调用。 由于 webpack 4 的版本比 v3 严格，因此这可能会导致“ WebpackError: Invariant Violation: Minified React error”。 解决方案是仅使用导入，这也扩展到 gatsby-ssr 和 gatsby-browser 文件。

   - 您的应用程序未正确[hydrated](https://reactjs.org/docs/react-dom.html)，导致 gatsby 开发和 gatsby 构建不一致。 gatsby-ssr 或 gatsby-browser 之类的文件中的更改很可能具有另一个文件中未反映的结构，这意味着客户端和服务器输出之间不匹配。

2. 解决方案

   定位问题后，是使用了`scrollreveal`的原因，该模块期望定义 window。

   1. 修复第三方模块的问题

      一种解决方案是自定义 Webpack 配置，以在服务器渲染期间用虚拟模块替换有问题的模块。

      项目根目录中的 gatsby-node.js：

      ```js
      exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
        if (stage === "build-html") {
          actions.setWebpackConfig({
            module: {
              rules: [
                {
                  test: /bad-module/, // 写上问题模块 此处我的应该是`scrollreveal`
                  use: loaders.null(),
                },
              ],
            },
          });
        }
      };
      ```

   2. 另一种解决方案是 [loadable-components](https://github.com/gregberge/loadable-components). 尝试使用窗口的模块将仅在客户端动态加载（而不是在 SSR 期间加载).

3. 总结

   当在 Gatsby 中使用带有 window 定义的第三方模块时，需要向其自己的 webpack 配置中添加一个空的 loader，以避免在 SSR（服务器端渲染）期间进行编译。 因为执行 gatsby develop 的环境是发生在浏览器中，而执行 gatsby build 是在 Node 服务器中（显然没有 window 或其他全局对象。）
