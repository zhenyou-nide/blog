---
title: Web Components
author: zhenyounide
pubDatetime: 2024-04-09T10:16:11Z
slug: web-components
featured: false
draft: true
tags:
  - draft
description: 暂不公开
---

## introduction

[Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.
简言之，谷歌手握 Chrome 浏览器，一直在推动浏览器的原生组件。它相比第三方框架更简单直接，是官方定义的自定义组件的方式。Vue 在编写时也是参考了 Web Components 规范及设计思路。相较于项目开发中自定义封装的组件，它有着跨平台、与框架无关的优势，可以用来开发跨团队共享的 UI 组件。

## simple usage

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: "closed" });

    var templateElem = document.getElementById("userCardTemplate");
    var content = templateElem.content.cloneNode(true);
    content
      .querySelector("img")
      .setAttribute("src", this.getAttribute("image"));
    content.querySelector(".container>.name").innerText =
      this.getAttribute("name");
    content.querySelector(".container>.email").innerText =
      this.getAttribute("email");

    shadow.appendChild(content);
  }
}
window.customElements.define("user-card", UserCard);
```

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
  </head>
  <body>
    <user-card
      image="https://semantic-ui.com/images/avatar2/large/kristy.png"
      name="User Name"
      email="yourmail@some-email.com"
    ></user-card>

    <template id="userCardTemplate">
      <style>
        :host {
          display: flex;
          align-items: center;
          width: 450px;
          height: 180px;
          background-color: #d4d4d4;
          border: 1px solid #d5d5d5;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          overflow: hidden;
          padding: 10px;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }
        .image {
          flex: 0 0 auto;
          width: 160px;
          height: 160px;
          vertical-align: middle;
          border-radius: 5px;
        }
        .container {
          box-sizing: border-box;
          padding: 20px;
          height: 160px;
        }
        .container > .name {
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
          margin: 0;
          margin-bottom: 5px;
        }
        .container > .email {
          font-size: 12px;
          opacity: 0.75;
          line-height: 1;
          margin: 0;
          margin-bottom: 15px;
        }
        .container > .button {
          padding: 10px 25px;
          font-size: 12px;
          border-radius: 5px;
          text-transform: uppercase;
        }
      </style>

      <img class="image" />
      <div class="container">
        <p class="name"></p>
        <p class="email"></p>
        <button class="button">Follow John</button>
      </div>
    </template>
    <script src="./index.js"></script>
  </body>
</html>
```
