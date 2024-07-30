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
  },
  "now": ""
}
```

## 215. webpack 优化前端性能

## 216. 如何实现长缓存

## 217. 遍历 100000000 项的数组如何优化

## 218. webworker 优化 100000000 数组遍历

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
