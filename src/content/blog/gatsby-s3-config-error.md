---
title: 在 gatsbyjs 中如何将静态资源上传对象存储（oss, s3...
author: zhenyounide
pubDatetime: 2021-06-12T11:25:23Z
slug: gatsby-s3-config-error
featured: false
draft: false
tags:
  - problems
  - gatsbyjs
description: ""
---

## Table of contents

用 gatsby 写完了一个官网，需要将静态资源上传对象存储，一开始尝试使用`webpack-alioss-plugin`，在项目中添加自定义 Webpack 配置，在`gatsby-node.js`中导出一个名为的函数`onCreateWebpackConfig`，去写`AliOSSPlugin`,但 AliOSSPlugin 与 gatsby 的配套不一定好，

最终，使用`gatsby-plugin-s3`这个插件，以将 gatsby 站点部署到 S3 存储桶

```js
{
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: `your-bucketName`,
        region:`your-region`,
        protocol: "https",
        hostname: "your-hostname",
        customAwsEndpointHostname: "your-Endpoint",
        // mergeCachingParams:true,
        parallelLimit:100,
        params:{
          'static/**': {
            CacheControl: 'public, max-age=2592000, immutable'
          },
          '*.{js,css}':{
            CacheControl: 'public, max-age=2592000, immutable'
          }
        }
      },
    },

```

_但是要注意，要将 assetPrefix 设置好，build 是时候相应的要加上`--prefix-paths`_

这样，build 完后执行`npx gatsby-plugin-s3 deploy --yes`或者进入`package.json `修改`script`

就完成了对象存储

遇到个坑

默认情况下 Gatsby-plugin-s3 的 removeNonexistentObjects 属性为 false，这就意味着每次上传之后，都会覆盖掉上一版本的静态资源，这显然是不合理的，当我开发完一个功能后，跑流水上传了对象存储，staging 环境下的跑完之后。prod 环境甚至是线上环境所需资源再 aws 上找不到了
