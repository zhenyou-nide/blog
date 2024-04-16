---
title: set-cookie failed when SameSite is Lax
author: zhenyounide
pubDatetime: 2022-08-06T04:06:31Z
slug: samesite-lax-cross-site-error
featured: false
draft: false
tags:
  - problems
description: "这还能跨域吗，set-cookie （HttpOnly）set failed"
---

## Table of contents

# 背景

当服务端已设置了 Access-Control-Allow-Origin 为当前 url 后，set-cookie （HttpOnly）依旧不生效

# 解决

[SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)问题：以前 `None` 是默认值，但最近的浏览器版本将 `Lax` 作为默认值，以便对某些类型的跨站请求伪造（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）攻击具有相当强的防御能力，因此阻止了 cookie 是写入

设置 Set-Cookie: flavor=xxxxxx; SameSite=None; Secure

_注：设置 None 后，未标记 `Secure` 的任何 cookie 都将被拒绝。_
