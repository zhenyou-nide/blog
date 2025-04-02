---
title: 记录日常开发中使用频率较高的一些 css 小技巧
author: zhenyounide
pubDatetime: 2022-06-08T04:06:31Z
slug: css-tec
featured: false
draft: false
tags:
  - css
description: 日常会使用到的一些样式
---

秉着 **不过度设计 css** 的原则下记录一下 css 小技巧

## Table of contents

## irregular border

```css
clippath: polygon(
  10px 0,
  calc(100% - 10px) 0,
  100% 10px,
  100% calc(100% - 10px),
  calc(100% - 10px) 100%,
  10px 100%,
  0 calc(100% - 10px),
  0 10px
);
```

## 自定义滚动条样式

使用`-webkit-scrollbar` 来自定义滚动条的外观。该属性提供了七个伪元素：

- `::-webkit-scrollbar`：整个滚动条
- `::-webkit-scrollbar-button`：滚动条上的按钮（下下箭头）
- `::-webkit-scrollbar-thumb`：滚动条上的滚动滑块
- `::-webkit-scrollbar-track`：滚动条轨道
- `::-webkit-scrollbar-track-piece`：滚动条没有滑块的轨道部分
- `::-webkit-scrollbar-corner`：当同时有垂直和水平滚动条时交汇的部分
- `::-webkit-resizer`：类似 textarea 的可拖动按钮

示例如下

```css
html {
  scrollbar-color: linear-gradient(to bottom, #ff8a00, #da1b60);
  scrollbar-width: 10px;
  background: #100e17;
  color: #fff;
  overflow-x: hidden;
}
html::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
html::-webkit-scrollbar-thumb {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ff8a00),
    to(#da1b60)
  );
  background: linear-gradient(to bottom, #ff8a00, #da1b60);
  border-radius: 10px;
  -webkit-box-shadow:
    inset 2px 2px 2px rgba(255, 255, 255, 0.25),
    inset -2px -2px 2px rgba(0, 0, 0, 0.25);
  box-shadow:
    inset 2px 2px 2px rgba(255, 255, 255, 0.25),
    inset -2px -2px 2px rgba(0, 0, 0, 0.25);
}

html::-webkit-scrollbar-track {
  background: linear-gradient(
    to right,
    #201c29,
    #201c29 1px,
    #100e17 1px,
    #100e17
  );
}
```

## 长文字分 n 行显示，超出省略号

`-webkit-line-clamp`: 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。
常见结合属性：

1. `display: -webkit-box;` :必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
2. `-webkit-box-orient` :必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
3. `text-overflow: ellipsis;` :可以用来多行文本的情况下，用省略号 “…” 隐藏超出范围的文本

```css
.show2line {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
```

## 一些动效

```less
* {
  box-sizing: border-box;
  &:before,
  &:after {
    content: "";
    position: absolute;
  }
}
// Subtlety
.button-jittery button {
  animation: jittery 4s infinite;
  &:hover {
    animation: heartbeat 0.2s infinite;
  }
}

@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  15% {
    transform: scale(1.15);
  }
  20% {
    transform: scale(1.15) rotate(-5deg);
  }
  25% {
    transform: scale(1.15) rotate(5deg);
  }
  30% {
    transform: scale(1.15) rotate(-3deg);
  }
  35% {
    transform: scale(1.15) rotate(2deg);
  }
  40% {
    transform: scale(1.15) rotate(0);
  }
}

@keyframes heartbeat {
  50% {
    transform: scale(1.1);
  }
}

// Handsy
.button-hand button {
  &:before {
    content: "👇";
    font-size: 60px;
    transform: scaleX(-1);
    right: 0px;
    top: -68px;
    animation: up-down 1s infinite;
  }
  .hands {
    &:before,
    &:after {
      content: "👇";
      font-size: 40px;
      opacity: 0;
      transition: 0.4s ease-in-out;
    }
    &:before {
      transform: rotate(-60deg);
      left: -45px;
      top: -10px;
    }
    &:after {
      transform: rotate(170deg);
      right: 30px;
      top: 50px;
    }
  }
  &:hover .hands {
    &:before {
      opacity: 1;
      left: -35px;
    }
    &:after {
      opacity: 1;
      top: 40px;
    }
  }
}

@keyframes up-down {
  50% {
    margin-top: -20px;
  }
}
```

```html
<div class="button-jittery" style="--bg-color: #f1c40f">
  <button>Click Me!</button>
  <div class="name">Subtlety</div>
</div>

<div class="item button-hand" style="--bg-color: #3498db">
  <button>
    Click Me!
    <div class="hands"></div>
  </button>
  <div class="name">Handsy</div>
</div>
```

## irregular dash

```css
.irregular_dash {
  width: 290px;
  height: 1px;
  margin: 76px auto 16px auto
  background-image: linear-gradient(to right, black 33%,#FCFFC0 0%);
  background-position: bottom;
  background-size: 16px 1px;
  background-repeat: repeat-x;
}
```
