---
title: 一台电脑如何配置多个 github 账号
author: zhenyounide
pubDatetime: 2024-04-09T10:16:11Z
slug: multi-github-account
featured: false
draft: false
tags:
  - problems
  - git
description: 如何实现在一台电脑上同时使用多个 github 账号
---

大家工作时轻车熟路通过工作邮箱注册 github，生成 ssh key 链接到 github，绑定唯一的公钥，结束

这个公钥是工作 git 账号 work@mail.com 的公钥，而维护一些自己的项目时又需要使用到自己的 git 账号，恰巧它们还都发生在了同一台电脑上，怎么办呢

## generate ssh key

1. `ssh-keygen -t ed25519 -C "your_email@work.com"` 一路回车（如需要自定义请自行自定义, 不是废话..
2. confirm：`ls  ~/.ssh`, 存在 id_ed25519 id_ed25519.pub id_rsa id_rsa.pub...
3. copy: `clip < ~/.ssh/id_ed25519.pub`

## add ssh key to your github SSH setting

[setting 指路](https://github.com/settings/keys) => new SSH Key => paste

## edit ~/.ssh/config file

```
Host github.com
  User workUsername
  AddKeysToAgent yes
  IgnoreUnknown UseKeychain
  IdentityFile ~/.ssh/id_rsa

Host my.com
  HostName github.com
  User myUsername
  AddKeysToAgent yes
  IgnoreUnknown UseKeychain
  IdentityFile ~/.ssh/id_ed25519

```

## how to use

- work: `git clone git@github.com:workUsername/project.git`
- my: `git clone git@my.com:myUsername/project.git`

ending...
