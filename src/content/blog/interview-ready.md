---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-04-16T09:12:47.400Z
title: 前端面试汇总
slug: interview-ready
featured: true
draft: false
tags:
  - docs
  - summary
  - interview
description: ""
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
    width: calc(100% - 200px)
  }
  ```
- 响应式间距
  ```css
  .box {
    margin: calc(1rem + 5%)
  }
  ```
- 动态尺寸
  ```css
  .dynamic {
    width: calc(50% - 20px)
  }
  ```

## 7. 固定大小的 div 在屏幕上垂直居中
```css
.centered-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
```

## 8. 渐进增强（progressive enhancement）和优雅降级（graceful degradation）
都是前端开发中的 **策略**，旨在处理不同浏览器和设备的兼容性问题。
### 渐进增强（progressive enhancement）
理念是从基本的，核心的功能开始，逐步增强用户体验；强调的是从用户需求和核心功能出发，根据能力来增强功能和效果
### 优雅降级（graceful degradation）
理念是首先构建功能丰富的版本，然后在较低能力的浏览器上提供一种相对简化的版本；强调的是在功能丰富的版本的基础上创建简化版本
