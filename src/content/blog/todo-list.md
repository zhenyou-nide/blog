---
title: TODO LIST
author: zhenyounide
pubDatetime: 2022-05-23T04:06:31Z
modDatetime: 2024-06-11T10:06:31Z
slug: todo-list
featured: false
draft: false
tags:
  - other
description: "一些杂七杂八的碎碎念"
---

## Table of contents

# TODO

- [ ] blog 还没接 cms
- [ ] [vite source code](https://blog.shenzjd.com/pages/a094da54e65f/)
- [ ] 整理网络基础
- [ ] [redwood](https://redwoodjs.com/)
- [ ] [sanity](https://www.sanity.io/learn/course) 好东西，考虑重构博客
- [ ] LLM
  - 了解概念
  - 找一个方向
  - 应用层开始了解
- [ ] next.js demo
  - [ ] 过一下官方文档 （顺便总结）
  - [ ] next-auth vs auth0 （ next-auth 简单看，实践 auth0 ）
- [ ] 1. 小研究一下 [turbopack](https://turbo.build/pack/docs)
  - [ ] usage
  - [ ] why use it
- [ ] 2. [Rspack](https://www.rspack.dev/guide/introduction.html) 弯道超车 2023.3.10 开源
- [ ] 3. vite@4.3

  - [ ] why `new URL()`耗性能 [vite faster](https://juejin.cn/post/7224310314807345209?utm_source=gold_browser_extension)
        new URL() 需要从一个字符串里解析出来 host/orgin/pathname/searchParamas/hash 一大堆东西，而且合法性校验也不是很轻易就能完成。可以试着自己实现一下。工作量还是很多的。因此，只是在可以根据已有的 url 获取新 url 字符串这种场景下，直接通过拼接、slice() 操作字符串得到新的 url 字符串，效率会比 new URL() 快很多，因为我们裁切了很多不必要的工作。vite 是有大量的 url 需要转换处理，避免使用 new URL 可以带来可观的性能提升，大家日常项目中放心使用即可

- [x] 4. 模块化历史
- [x] 5. curl
- [ ] 6. node 中间层做接口转发
- [ ] 7. web component
- [ ] 8. qiankun
- [ ] 9. 自研 [前端监控平台](https://juejin.cn/post/7172072612430872584?#heading-0)
- [ ] 10. GraphQL
- [x] 11. response 与 preview 数据不一致
- [ ] 12. debug
- [ ] 13. [挺不错的动画库](https://motion.ant.design/components/queue-anim#components-queue-anim-demo-custom)
- [ ] 14. 内网搭建私有的 NPM 服务器 Sinopia
- [ ] 15. RSC
- [ ] 16. stylex
- [ ] 17. hls.js
- [ ] 18. nest.js

# 一些还没做的总结

- [ ] mixpanel 埋点 一个月 3000 个 event
- [ ] 接口 aws 签名
- [ ] 命令式调用而非状态驱动 Modal
- [ ] xbn 入选 Binance labs 孵化项目 （12/1500 国内 2 个）
- [x] 判断元素是否在可视区域中 [ahooks/useInViewport](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useInViewport/index.ts)
- [ ] cocos 业务

# 一些杂七杂八的记录

- `<meta name='theme-color' content='#000000'></meta>` [参考](https://zhuanlan.zhihu.com/p/413255714)
- vscode `ctrl + shift + L` 或者 `ctrl + f2`: 光标聚焦左右匹配项
- android studio 访问开发者菜单 `ctrl + M` 或者 `adb shell input keyevent 82`
- github 进入具体某个仓库 按下 `.` 就进入到 github 在线编译器 `https://github.dev/alibaba/hooks` [ahooks](https://github.dev/alibaba/hooks)
- git 基于特定远程分支创建分支 `git checkout -b test origin/test`
- [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log) `alt + shift + d`: 删除所有插件生成（选中需要 log 的值 `ctrl + alt  + L`）的 console.log()
- 禁用 `<input type=number>` 上的滚动: ` <input type="number" onWheel={(e) => e.target.blur()} />` or ` <input type="number" onWheel={() => document.activeElement.blur()} />`
- bignumber toNumber 踩坑
  本金(59200000000000000)-已经付款的(29564251555003287) bigNumber(59200000000000000).minus(29564251555003287).toNumber() 竟然等于 29635748444996710，正确的应该等于 bigNumber(59200000000000000).minus(29564251555003287).toString(): 29635748444996713

- ttf 8M \* 3，太大 https://github.com/allanguys/font-spider-plus
