---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-05-17T11:13:47.400Z
title: 前端面试汇总
slug: interview-ready
featured: false
draft: false
tags:
  - docs
  - summary
  - interview
description: 温故知新，持续更新
---

## Table of contents

# HTML

## 1. 回流？重绘？如何避免

- 重绘；元素样式发生变化但不影响布局的情况下，浏览器重新绘制元素的过程，比如修改元素背景色等等

- 回流：元素布局属性发生改变，需要重新计算元素在页面中的布局位置时，浏览器重新进行布局的过程，例如修改元素宽度，高度，位置等

- 回流的成本比重绘高很多，因为它设计重新计算元素的几何属性和页面布局。

- 如何减少回流：
  - 使用 css 动画代替 js 动画: css 动画利用 GPU 加速，在性能方面比 js 动画更高效。尽量使用 css 的 transform 和 opacity 属性来创建动效，而不是改变元素的布局属性，例如宽高
  - 使用 translate3d 开启硬件加速？？：将元素的位移属性设置为 translate3d(0,0,0), 以强制浏览器使用 GPU 来渲染这个元素，而不是 CPU。这有助于避免回流，并提高动画的流畅度，Tailwind CSS 的话，官方就有 GPU 加速的玩法，直接加一个 transform-gpu
  - 避免频繁操作影响布局的样式属性
  - 使用 requestAnimationFrame 调度动画帧，可以确保动画在浏览器的重绘周期内执行，从而避免回流。确保动画在最佳时间点进行渲染
  - 使用文档片段（Document Fragment）: 当需向 DOM 中插入大量新元素的时候，可先将这这元素用 fragment 包裹，再一次性添加到 DOM 中（虚拟 dom vue 的方式）
  - 让元素脱离文档流：position absolute/fixed； float: left（只是减少回流，不是避免回流）
  - 使用 visibility hidden 而不是 display none: display none 会将元素从 dom 中移除，引起回流； visibility hidden 不会触发回流，元素仍然占据空间

## 2. margin 塌陷，BFC? 如何触发 BFC

- margin 塌陷：相邻元素外边距合并规则
- BFC: block formatting context, 一个独立的区域，与外部元素不会互相影响
- 触发方式
  - float 不为 none 都行
  - position absolute/fixed
  - display inline-block
  - overflow 不为 visible

## 3. 隐藏元素

- display none 不占位
- opacity 0 占位
- visibility hidden 占位
- clip-path circle(0) 占位
- position absolute top -999px 不占位

## 4. overflow 各值的区别

- visible 默认值，当溢出时会呈现在容器外，不隐藏或截断，溢出的内容会覆盖其他元素
- hidden 溢出时，被截断并隐藏
- scroll 溢出时，显示滚动条，（不溢出也会显示滚动条，但滚动无效
- auto 溢出时，显示滚动条，（不溢出不会显示，滚动无效
- inherit 继承

## 5. 圣杯模型

左右固定宽度，中间自适应

- flex

  ```css
  .container {
    display: flex;
  }

  .left,
  .right {
    width: 200px;
  }

  .main {
    flex: 1;
  }
  ```

- float

  ```css
  .container {
    width: 100%;
  }

  .left {
    width: 200px;
    float: left;
  }

  .right {
    width: 200px;
    float: right;
  }

  .main {
    margin: 0 200px;
  }
  ```

- grid

  ```css
  .container {
    display: grid;
    grid-template-column: 200px lfr 200px;
  }
  ```

- absolute

  ```css
  .container {
    position: relative;
  }

  .left,
  .right {
    width: 200px;
    position: absolute;
    top: 0;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .main {
    margin: 0 200px;
  }
  ```

## 6. calc

- 自适应宽度
  ```css
  .container {
    width: calc(100% - 200px);
  }
  ```
- 响应式间距
  ```css
  .box {
    margin: calc(1rem + 5%);
  }
  ```
- 动态尺寸
  ```css
  .dynamic {
    width: calc(50% - 20px);
  }
  ```

## 7. 固定大小的 div 在屏幕上垂直居中

```css
.centered-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 8. 渐进增强（progressive enhancement）和优雅降级（graceful degradation）

都是前端开发中的 **策略**，旨在处理不同浏览器和设备的兼容性问题。

- 渐进增强（progressive enhancement）:
  理念是从基本的，核心的功能开始，逐步增强用户体验；强调的是从用户需求和核心功能出发，根据能力来增强功能和效果

- 优雅降级（graceful degradation）:
  理念是首先构建功能丰富的版本，然后在较低能力的浏览器上提供一种相对简化的版本；强调的是在功能丰富的版本的基础上创建简化版本

## 9. iframe 优缺点以及使用场景

**优点**

- 分离内容：iframe 允许不同来源或者不同内容的页面嵌套在一起。有助于将内容分隔开，允许不同团队后者服务商提供各自的内容
- 实现跨域通信：例如父页面和嵌套的 iframe 页面之间传递数据，从而创建风度的嵌入式应用程序
- 安全性：iframe 将来自不受信任的来源的内容隔离在一个独立的沙盒中
- 无需刷新：允许在不刷新整个页面的情况下加载新内容。
  _说服不了我_

**缺点**

- 性能问题：每个 iframe 都会加载一个新页面，这可能导致性能问题，特别实在多个嵌套的 iframe 页面存在时
- 可访问性问题：屏幕阅读器无法正确处理嵌套的页面
- 不利于 SEO：搜索引擎不会索引 iframe 里的内容
- 兼容性问题：某些浏览器不支持

**使用场景**

- 嵌入外部应用：嵌入 youtube 视频，google 地图等等到页面
- 分离组件：将不同部分的网页分开进行模块化开发
- 安全沙盒：将不受信任的内容隔离在一个沙盒中
- 跨域通信：在不同源的页面之间进行数据交换，以创建富客户端应用
  _说服不了我_

  补充：vs 微前端

## 10. CSS 盒子模型

HTML 元素看作盒子，包括 内容 内边距 border 外边距

- IE盒模型（怪异模式）：内容 + 内边距 + border，box-sizing: border-box
- 标准和模型：内容 ，box-sizing: content-box

## 11. html5 特性

- **语义元素**：header, footer, section, nav 等更好的描述网页的解构
- **多媒体**：audio 和 video 标签，无需再使用 flash
- **canvas**：允许通过 js 创建和操作图形
- **本地存储**：web storage 和 indexedDB
- **新表单元素**：input type='date'/'email'/'range'
- **web workers**：允许在后台运行 js，以提高 web 应用的响应性，而不会阻塞用户界面
- **webSocket**：实时通信，可用于创建实时聊天和多人游戏
- **地理位置**：允许网页访问用户的地理位置信息
- **SVG**：支持 svg
- **拖放**：引入了拖放 API
- **离线应用**
- **新事件 API**：如 addEventListener

## 12. css3

- **border-radius**
- **box-shadow/text-shadow**
- **linear-gradient/radial-gradient**：创建渐变背景，包括线性和径向渐变
- **多列布局**：cplumn-count/column-with 可以创建多列布局，类似报纸排版
- **transform**：rotate/scale/translate...
- **transition**
- **@keyframe/animation**
- **2D/3D转换**：可以让元素在平面和三维空间旋转/缩放/倾斜
- **@font-face**：自定义字体
- **opacity**
- **grid 布局**
- **css 变量 var()**
- **用户界面控件**：如滚动条，复选框和单选框的自定义样式
- **响应式**：通过媒体查询和弹性布局

## 13. CSS 中选择器的优先级，权重计算方式

1. `!important`：具备最高优先级
2. 特定性：
3. 内联：1000
4. ID 选择器：100
5. 类选择器/属性选择器/伪类选择器：10
6. 元素选择器/伪元素选择器：1

案例

- `#header`: 100
- `.menu-item`: 10
- `ul li`: 2

3. 覆盖规则：后面定义的将覆盖前面定义的

## 14. HTML5 input type

- text: 单行文本
- password: 密码，输入的字符会被覆盖
- radio: 单选按钮
- checkbox: 复选框
- number:输入数字，包括上下箭头
- range: 范围，例如滑动条
- date: 日期
- time: 时间
- file: 文件上传
- color: 颜色选择器
- hidden: 存储数据，但不会在页面中显示
- submit: 提交表单
- reset: 重置表单
- button: 创建自定义按钮

## 15. CSS 继承性

|            | 属性                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| 有继承性的 | color, font, line-height, text-align, text-indent, text-transform, visibility                          |
| 无继承性的 | border, margin, padding, background, width, height, position, top, right, left, bottom, display, float |

## 16. 画一条 0.5px 的线

```html
<html>
  <head>
    <style type="text/css">
      .line {
        height: 1px;
        background: white;
        transform: scaleY(0.5);
        transform-origin: 0 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="line"></div>
  </body>
</html>
```

## 17. position

- static: 默认值，元素按正常文档流排列
- relative: 元素相对于其正常位置定位；可使用 top 等定位；不脱离文档流
- absolute: 相对最近的已定位祖先元素而定位；可使用 top 等定位；脱离文档流
- fixed: 元素相对视口定位，不随页面滚动而移动；可使用 top 等定位；脱离文档流
- sticky: 元素在跨越阈值前为相对定位，之后为固定定位；通常用于创建粘性导航栏或者侧边栏；

## 18. 什么是浮动，会引起什么问题，有何方案

float 是 css 中的一种布局属性，用于控制元素在其父元素的位置，可以浮动到其父元素的左侧或者右侧。常用于实现文本环绕图片，创建多列布局等。

**导致问题**

- 高度塌陷：会导致其父元素高度塌陷，父元素无法自适应浮动元素的告诉
- 元素重叠：浮动元素可能会重叠在一起，导致布局错乱

**解决方案**

- 清除浮动：在包含浮动元素的父元素之后，可以使用 clear 来清除浮动
  ```css
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
  ```
- `display: inline-block`: 将需要浮动的元素设置 inline-block；可以模拟浮动，但不会导致高度塌陷，因为 inline-block 元素会受到文本行的影响
- `position: absolute/display: flex/ display: grid`: 模拟 float
- `overflow: hidden`: 在包含浮动的父元素上添加 overflow hidden，可以清除浮动

## 19. line-height vs height

- `line-height`
  - 行高，用于控制文字的行高，而不是整体的高度；
  - 用于指定行内元素的文本行的垂直高度，可以影响文本的垂直居中和行距；
- `height`
  - 控制元素整体高度，包括文本内容，内边距和边框；
  - 用于指定块级元素的高度，例如 `<div />`,`<section />`

## 20. 设置一个元素的背景颜色会填充的区域

`background-color` 默认填充区域为 content/padding/border，该行为由 `background-clip` 决定，默认为 `border-box`

|         | border-box | padding-box | context-box | text |
| ------- | ---------- | ----------- | ----------- | ---- |
| margin  | ×          | x           | x           | x    |
| border  | ✔         | ×           | x           | x    |
| padding | ✔         | ✔          | ×           | x    |
| context | ✔         | ✔          | ✔          | ×    |
| text    | --         | --          | ×           | ✔   |

## 21. inline-block vs inline vs block

|              | 类型         | 是否独占一行               | 是否可设置宽高                                                             |
| ------------ | ------------ | -------------------------- | -------------------------------------------------------------------------- |
| block        | 块级元素     | 独占一行，由上到下垂直排列 | 可以设置宽高，内外边距                                                     |
| inline       | 内联元素     | 不独占一行，行内水平排列   | 不可以设置宽高，内外边距                                                   |
| inline-block | 内联块级元素 | 同一行内水平排列           | 可以设置宽高，内外边距，通常用于创建水平排列的块状元素，如按钮或者导航链接 |

## 22. 为什么 img 是 inline 却可以设置宽高

html 规范对 `img` 元素的默认样式有特殊的定义，因为 img 需要具体的宽高以确保图像以正确的尺寸显示，而不会引起页面重新布局。

## 23. box-sizing 的作用，如何使用

用于控制元素的盒模型如何计算尺寸。

- context-box(initial): 元素的宽高只包含 context，不包括 padding 和 border。这是传统的盒模型。
- border-box: 元素的宽高包含 context，padding，border。这意味着设置元素宽高的同时，padding 和 border 不会增加元素的总宽高，而是占用 context 的空间

```css
.element {
  box-sizing: border-box;
  width: 100px;
  /* 总宽度还是 100px */
  padding: 10px;
  border: 2px solid black;
}

.element {
  box-sizing: context-box;
  width: 100px;
  /* 总宽高是 100 + 10 + 2  */
  pading: 10px;
  border: 2px solid black;
}
```

_注意_：box-sizing 通常在全局样式中设置，以确保整个页面使用一致的盒模型

## 24. CSS 实现动画

通过 `@keyframes` 和 `animation` 来实现。

1. 定义 keyframes

```css
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

2. 应用动画

```css
.animation-element {
  animatiin-name: scale;
  animation-duration: 2s;
  animation-time-function: ease-in-out;
  animation-delay: 0.5s;
  animation-interation-count: infinite;
}
```

3. 触发动画

```html
<div class="animation-element">animation element</div>
```

## 25. transition vs animation

- transition(过渡)

  - 让元素在状态改变时平滑的过渡到新样式。
  - 需要一个触发状态变化的事件，比如 hover，focus；

  ```css
  .button {
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: pink;
  }
  ```

- animation

  - 可创建更复杂的动画，可定义 keyframes。
  - 动画可以在元素的状态，时间轴或者事件触发下进行

  ```css
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(100px);
    }
    100% {
      transform: translateX(200px);
    }
  }

  .slide {
    animation: slide 2s linear infinite;
  }
  ```

**总结**

- 使用 transition 可创建简单的状态过渡效果，适用于 hover，focus 等触发的状态变化。
- 使用 animation 可创建更复杂的动画，包括关键帧，持续时间，循环和更精细的控制，它适用于需要更多控制和复杂度的动画场景

## 26. 如何实现在某个容器中居中

```html
<html>
  <head>
    <style type="text/css">
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div>居中的元素</div>
    </div>
  </body>
</html>
```

## 27. 如何改变一个 dom 的字体颜色.....

这问题太抽象了，不回答

## 28. 相对布局和绝对布局

很少用到了吧，不回答

## 29. flex 布局

- 容器和项：flex 布局中存在容器元素和容器内的项（子元素）。容器元素设置 `display: flex`;
- 主轴和交叉轴：主轴是项排列的主要方向，交叉抽是垂直于主轴的方向
- 弹性布局：允许项根据可用空间自动调整大小，以填充容器。项具有弹性的宽高。
- 自动换行：如果项在主轴上无法适应容器的宽度，可以自动换行到下一行
- 嵌套支持：支持嵌套

## 30. Less（Lener Style Sheets） vs Scss（Sassy Css）

todo，原文总结不到位

## 31. 伪类，伪元素

**伪类**

- `:hover`: hover
- `:active`: 被点击的 active
- `:focus`: 获得焦点的元素
- `:nth-child(n)`: 父元素下第 n 个位置
- `:not(selector)`: 不匹配指定选择器的元素
- `:first-child`: 第一个
- `:last-child`: 最后一个

**伪元素**

- `::before`: 在元素内容之前生成内容，通常用于添加装饰或图标
- `::after`: 在元素内容之后生成内容，通常用于添加装饰或图标
- `::first-line`: 选择元素的首行文本，用于样式段落中的首行文字
- `::first-letter`: 选择元素的首字母，用于样式段落中的首字母
- `::selection`: 选择用户选择的文本部分，允许自定义选中的文本样式

## 32. `::before` 和 `::after` 中双冒号的区别

CSS 中用双冒号表示伪元素，单冒号表示伪类，虽然实际应用中都两种写法浏览器都支持，但规范来说还是建议双冒号表示伪元素，单冒号表示伪类

## 33. 响应式布局的方案 -- 不到位,待补充

响应式布局是一种适应不同屏幕尺寸和设备的设计方法，以确保网站在各个设备上都能提供良好的用户体验

- 媒体查询：根据屏幕宽/高/分辨率来应用不同样式
- 流式布局：使用百分比宽度（而不是绝对像素值）
- 弹性布局
- 图像大小调整：使用 `max-width: 100%` 或者 `width: 100%` 来确保图像能够根据屏幕尺寸适配

## 34. link vs @import

二者都应用于引入外部 css 文件，区别如下
| | 语法和用法 | 加载方式 | 兼容性 | 维护和管理 |
| -- | -- | -- | -- | -- |
| `<link />` | 用在 `<head />`，并且有自己的属性, 比如 rel, href 等 | 在页面加载过程中并行加载，不会阻止页面渲染 | 广泛支持 | 更易维护，它与 html 分开，并可以快速在 head 中找到 |
| `@import` | 用在 css 文件中，用以导入其他样式文件 | 只会在当前 css 文件加载完成后才会加载引用的外部 css，一定程度上会导致页面渲染的延迟 | CSS2 引入的，较旧的浏览器不一定支持，现代浏览器中通常都可正确使用 | css 与外部 css 文件混在一起，可能导致维护成本的增加 |

## 35. 块元素 vs 行内元素 vs 置换元素

**块元素**

- 以新行开始，占据父元素所有可用宽度
- 可包含其他块元素或行内元素
- `div`,`p`,`h1-h6`,`ul`,`ol`,`li`

**行内元素**

- 只占据自己内容的宽度，不会从新行开始
- 通常包裹在块元素内，与其他行内元素在同一行上
- `span`,`a`,`strong`,`em`,`img`

**置换元素**

- 特殊类型的元素，其内容通常由外部资源来替换
- 尺寸和外观由外部元素决定，而不是 css
- `img`,`video`,`iframe`

## 36. 当行元素的文本省略号样式

```html
<html>
  <head>
    <style>
      .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <p class="ellipsis">ha, hello, hi, ha, bi li ba la biu biu biu</p>
  </body>
</html>
```

## 37. 语义化标签

- `<header>`
- `<nav>`
- `<main>`
- `<article>`
- `<section>`
- `<aside>`
- `<footer>`
- `<figure>`
- `<time>`

## 38. `px` vs `rpx` vs `vw` vs `vh` vs `rem` vs `em`

| 单位  |                                                |                                      |                                            |
| ----- | ---------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `px`  | 像素，相对单位，逻辑像素                       | 不会根据屏幕尺寸或分辨率自动调整大小 | 高分辨率的屏幕上可能显得很小               |
| `rpx` | 微信小程序单位，相对单位                       | 基于屏幕宽度进行缩放                 | 可以在不同设备上保持一致的布局             |
| `vw`  | 视窗宽度单位，相对单位，表视窗宽度的百分比     | 1vw 等于视窗宽度的 1%                | 用于创建适应不同屏幕宽度的布局             |
| `vh`  | 视窗高度单位，相对单位，表视窗高度的百分比     | 1vw 等于视窗高度的 1%                | 用于创建适应不同屏幕高度的布局             |
| `rem` | 根元素单位，相对单位，基于根元素的字体大小     | 1rem 等于根元素字体大小              | 可用于实现相对大小的字体和元素，响应式设计 |
| `em`  | 字体相对单位，相对单位，基于当前元素的字体大小 | 1em 等于当前元素的字体大小           | 通常用于设置相对于父元素的字体大小         |

# js

## 39. 以下哪段代码运行效率更高？（隐藏类）

```js
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = { a: 1 };
```

```js
const obj1 = { a: 1 };
const obj2 = { b: 1 };
const obj3 = { c: 1 };
```

- 上面的效率更高，重用了 **隐藏类（Hidden Class）**

```js
// test
console.time("a");
for (let i = 0; i < 1000000; i++) {
  const obj = {};
  obj["a"] = i;
}
console.timeEnd("a");

console.time("b");
for (let i = 0; i < 1000000; i++) {
  const obj = {};
  obj[i] = i;
}
console.timeEnd("b");
```

- JS 运行机制：浏览器 -> 内核 -> JS 解析引擎
  | 浏览器 | 内核 | 引擎 |
  | -- | -- | -- |
  | chrome | 早期 Webkit, 现目前 Blink | V8 |
  | Mozilla Firebox | Gecko | SpiderMonkey |
  | Edge | Chromium | Chakra |
  | Safari | Webkit | JavascriptCore |

- 比较主流的 JS 引擎 v8，这里假设是在 chrome 或 node 上，用的是 v8 引擎。
- v8 是一个 c++ 实现的 js 解析引擎，内部利用隐藏类（Hidden Class）的方式存放 JS 对象。
- 隐藏类的特性是：多个 **属性顺序一致** 的 JS 对象，会重用同一个隐藏类，减少 new Class 的开销。
- 所以上面生成一个隐藏类，而下面只生成三个隐藏类，因此上面的性能更好
- **代码编写习惯**：定义对象或者类时，尽可能保证属性顺序一致。

## 40. 以下哪段代码运行效率更高？（数组- 快速模式/字典模式）

```js
const arr1 = [];
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
```

```js
const arr2 = [];
arr2[1000000 - 1] = 1;
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
```

- 上面的效率更高，利用了数组的 **快速模式**

```js
// test
console.time("a");
const arr1 = [];
for (let i = 0; i < 1000000; i++) {
  arr1[i] = 1;
}
console.timeEnd("a");

console.time("b");
const arr2 = [];
arr2[1000000 - 1] = 1;
for (let i = 0; i < 1000000; i++) {
  arr2[i] = 1;
}
console.timeEnd("b");
```

- JS 运行机制：浏览器 -> 内核 -> JS 解析引擎
  | 浏览器 | 内核 | 引擎 |
  | -- | -- | -- |
  | chrome | 早期 Webkit, 现目前 Blink | V8 |
  | Mozilla Firebox | Gecko | SpiderMonkey |
  | Edge | Chromium | Chakra |
  | Safari | Webkit | JavascriptCore |

- 比较主流的 JS 引擎 v8，这里假设是在 chrome 或 node 上，用的是 v8 引擎。
- v8 是一个 c++ 实现的 js 解析引擎，内部有很多种方式存放 JS 数组。
- "数组从 0 到 length - 1 无空洞", 会进入快速模式，存放为 array。
- "数组中间有空洞"，会进入字典模式，存放为 HashMap （v8 的一个优化厕所，保证用最合适的数据结构处理当下场景，如果遇到数据量过大或者松散结构的话，就改变为 HashMap，牺牲遍历性能，换取访问性能）。
- **代码编写习惯**：
  - 从 0 开始初始化数组，避免数组进入字典模式
  - 让数组保持紧凑，避免数组进入字典模式

> [[V8 Deep Dives] Understanding Array Internals](https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc)

## 41. 如何判断 object 为空

- 常用方法：
  - `Object.keys(obj).length === 0`
    = `JSON.stringfy(obj) === '{}'`
  - for in
- 以上都不太严谨，因为处理不了 `const obj = { [Symbol('a')]: 1 }` 的这种情况
- 更严谨：`Reflect.ownKeys(obj).length === 0`

## 42. 强制类型转换，隐式类型转换

- 强制类型转换
  ```js
  const num = Number("42");
  const str = String(123);
  const boo1 = Boolean(0);
  ```
- 隐式类型转换
  ```js
  const res = 10 + "5";
  true == 1;
  false == 0;
  ```

## 43. `==` vs `===`

- `==` ，先隐式转换，再判断值是否相等
- `===`，直接判断 类型 + 值 是否相等

```js
1 == "1"; // true
true == 1; // true

1 === "1"; // false
true === 1; // false
```

**补充**：当 a = ？以下代码成立

```js
if (a == 1 && a == 2 && a == 3) {
  console.log("hi");
}
```

```js
const a = {
  i: 1,
  valueOf: function () {
    return this.i++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log("hi");
}
```

## 44. JS 的数据类型

- 基础数据类型

  - String
  - Number
  - Boolean
  - Null
  - Undefined
  - Symbol

- 复杂数据类型
  - Object
  - Array
  - Function
- 在 ECMAScript 2020（ES11）规范种正式添加 BigInt 数据类型，用于对 **大整数** 的表示。
  - 结尾用 n 表示：100000n
- 基础数据类型存放于栈，变量记录原始值；引用类型存放于堆，变量记录地址

## 45. 如何判断 JS 的数据类型

- `typeof`: 用以确定一个值的基础数据类型，返回一个表示数据类型的字符串

  ```js
  typeof 42; // 'number'
  typeof "hello"; // 'string'
  typeof true; // 'boolean'
  typeof undefined; // 'undefined'
  typeof null; // 'object' (typeof 的常见误解)
  typeof [1, 2, 3]; // 'object'
  typeof { key: "value" }; // 'object'
  typeof function () {}; // 'function'
  ```

  _注意_：typeof null 返回 'object' 是历史遗留问题，不是很准确

- `Object.prototype.toString` : 用于获取更想起的数据类型信息。

  ```js
  Object.prototype.toString.call(42); //'[object Number]'
  Object.prototype.toString.call("hello"); // '[object String]'
  Object.prototype.toString.call(true); // '[object Boolean]'
  Object.prototype.toString.call(undefined); // '[object Undefined]'
  Object.prototype.toString.call(null); // '[object Null]'
  Object.prototype.toString.call([1, 2, 3]); // '[object Array]'
  Object.prototype.toString.call({ key: "value" }); // '[object Object]'
  Object.prototype.toString.call(function () {}); // '[object Function]'
  ```

- `instanceof` : 检查对象是否属于某个类的实例
  ```js
  const obj = {};
  obj instanceof Object; // true
  const arr = [];
  arr instanceof Array; // true
  function Person() {}
  const person = new Person();
  person instanceof Person; //true
  ```
- `Array.isArray`: 检查一个对象是否为数组
  ```js
  Array.isArray([1, 2, 3]); // true
  Array.isArray("hi"); //false
  ```

## 46. ES 每个版本引入了什么

ECMAScript 是一种用于编写 JS 的标准化脚本语言。下面是每个版本的一些重要特性和区别：

- ES6 （ECMAScript 2015）
  - let/const，用于声明块级作用域的变量
  - arrow function
  - 模板字符串 （template string）
  - 解构赋值 （destructuring assignment）
  - 类和模块（classed and modules）
  - Promise
- ES7 （ECMAScript 2016）
  - Array.prototype.includes()
  - 指数操作符
- ES8 （ECMAScript 2017）
  - async/await
  - Object.values() / Object.entries()
  - 引入字符串填充方法
- ES9 （ECMAScript 2018）
  - 异步迭代器（asynchronous iterators）
  - Promise.finally()
  - 对象的拓展运算符 （object spread）
- ES10 （ECMAScript 2019）
  - Array.prototype.flat()/flatMap()
  - STring.prototype.trimStart()/trimEnd()
  - 动态导入（dynamic imports）
- ES11 （ECMAScript 2020）
  - 可选链操作符（optional chaining）
  - 空值合并操作符（nullish coalescing）
  - Bigint

## 47. let

-- pending --
