---
title: BFF Draft Post
author: zhenyounide
pubDatetime: 2022-06-06T04:06:31Z
slug: bff
featured: false
draft: true
tags:
  - nodejs
  - summary
description: bff 整理
---

backend for frontend

### for

服务端的单一业务功能和端的差异性诉求之间的矛盾

1. 多端的（web, mobile(android, ios)...） UI 差异
2. 后端的业务逻辑与 web 端已耦合

具体为

1. 外部依赖多、场景间取数存在差异、用户体验要求高
2. 展示逻辑多、场景之间存在差异，共性个性逻辑耦合

backend backend for frontend => graphql
这种模式目前最广泛的实践是基于 GraphQL 搭建的后端 BFF 方案，具体是：后端将展示字段封装成展示服务，通过 GraphQL 编排之后暴露给前端使用。
