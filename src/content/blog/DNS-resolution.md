---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-08-01T11:00:00.400Z
title: DNS resolution
slug: dns-resolution
featured: false
draft: false
tags:
  - docs
  - summary
description: ""
---

DNS（域名系统）解析是将人类易读的域名（如 www.example.com）转换为计算机易读的 IP 地址（如 192.0.2.1）的过程。这个过程分为以下几个步骤：

1. **检查本地缓存 (Checking Local Cache)**:

   - 浏览器首先检查本地缓存中是否已经有该域名的 IP 地址。如果有，直接使用缓存的 IP 地址，跳过后续步骤。

2. **检查操作系统缓存 (Checking OS Cache)**:

   - 如果本地缓存没有，浏览器会询问操作系统的 DNS 缓存是否有该域名的 IP 地址。如果有，直接使用该 IP 地址。

3. **检查路由器缓存 (Checking Router Cache)**:

   - 如果操作系统缓存没有，查询请求会被发送到本地路由器。路由器通常也有自己的 DNS 缓存，如果有缓存的 IP 地址，路由器会返回给操作系统。

4. **向 ISP 的 DNS 服务器发起查询 (Querying ISP’s DNS Server)**:

   - 如果路由器缓存也没有，查询请求会被发送到互联网服务提供商（ISP）的 DNS 服务器。ISP 的 DNS 服务器有更大的缓存，并且通常可以快速返回结果。

5. **递归查询 (Recursive Query)**:

   - 如果 ISP 的 DNS 服务器没有缓存该域名的 IP 地址，它会作为递归解析器继续向其他 DNS 服务器查询。这个过程如下：
     - **根域名服务器 (Root Name Servers)**: ISP 的 DNS 服务器首先向根域名服务器请求顶级域名服务器（如 .com、.net、.org）的地址。
     - **顶级域名服务器 (TLD Name Servers)**: 根域名服务器返回顶级域名服务器的地址后，ISP 的 DNS 服务器会向顶级域名服务器请求该域名的权威 DNS 服务器地址。
     - **权威 DNS 服务器 (Authoritative Name Servers)**: 顶级域名服务器返回权威 DNS 服务器的地址后，ISP 的 DNS 服务器会向权威 DNS 服务器请求该域名的 IP 地址。

6. **返回结果 (Returning the Result)**:

   - 权威 DNS 服务器返回域名的 IP 地址，ISP 的 DNS 服务器将结果缓存，并返回给本地路由器，再由路由器返回给操作系统，最后由操作系统返回给浏览器。

7. **缓存结果 (Caching the Result)**:
   - 浏览器会将结果缓存，以便下次查询相同域名时能快速获取 IP 地址。

通过以上步骤，浏览器获取了域名对应的 IP 地址，并使用该地址与服务器建立连接，继续后续的页面加载过程。
