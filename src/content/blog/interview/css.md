---
title: css
author: zhenyounide
pubDatetime: 2025-03-30T05:06:31Z
slug: css
featured: false
draft: true
tags:
  - interview
description: ""
---

1. css module
   style.xxx 是一种 作用域隔离的 CSS 方案，它允许 CSS 代码在组件内部使用，而不会影响其他组件的样式
2. css in js
   Styled Component CSS / Emotion
   样式定义嵌入到 JavaScript，它允许在 JavaScript 代码中动态生成和管理样式。这个方案特别适用于 组件化开发，它将样式与组件的逻辑、状态紧密结合
   与传统的 CSS 或 CSS Modules 不同，CSS-in-JS 将样式完全依赖于 JavaScript 运行时
3. tailwindcss(utility classes（原子类）设计理念)
4. 预处理器（ SASS、LESS 和 Stylus）为 CSS 提供了编程语言的特性，使得 CSS 的**编写**更具模块化和可维护性，变量/嵌套/mixin
5. postcss CSS **后处理工具** 构建过程中对 CSS 进行转换、优化、增强，支持各种功能，比如自动添加浏览器前缀、CSS 嵌套、自动优化代码等

- 运行时：styled-components、Emotion（默认模式）、JSS、Tailwind CSS（JIT 模式）。
- 非运行时：传统 CSS、SCSS、LESS、CSS Modules、Tailwind CSS（非 JIT 模式）、静态生成的 CSS-in-JS（Emotion 支持在构建阶段提取样式喂静态 CSS 文件）。
