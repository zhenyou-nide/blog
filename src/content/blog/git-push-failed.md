---
title: "fix: ssh: connect to host github.com port 22: Connection refused"
author: zhenyounide
pubDatetime: 2022-05-30T04:06:31Z
slug: git-push-failed
featured: false
draft: false
tags:
  - git
  - problems
description: "connect to host github.com port 22: Connection refused"
---

#### 背景

代理网络下，使用 git pull/push 至远程失败

```powershell
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
and the repository exists.
```

#### 定位问题

使用 `ssh -vT git@github.com` 命令排查故障，日志如下

```powershell
OpenSSH_9.0p1, OpenSSL 1.1.1o  3 May 2022
debug1: Reading configuration data /etc/ssh/ssh_config
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts' -> '/c/Users/xxn/.ssh/known_hosts'
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts2' -> '/c/Users/xxn/.ssh/known_hosts2'
debug2: resolving "github.com" port 22
debug3: resolve_host: lookup github.com:22
debug3: ssh_connect_direct: entering
debug1: Connecting to github.com [::1] port 22.
debug3: set_sock_tos: set socket 4 IPV6_TCLASS 0x48
debug1: connect to address ::1 port 22: Connection refused
debug1: Connecting to github.com [127.0.0.1] port 22.
debug3: set_sock_tos: set socket 4 IP_TOS 0x48
debug1: connect to address 127.0.0.1 port 22: Connection refused
ssh: connect to host github.com port 22: Connection refused
```

发现未连接到正确的域（依旧指向 127.0.0.1

#### 解决

打开网络设置，修改 DNS 服务器分配为手动，Ipv4 DNS 服务器改为 223.5.5.5（阿里的公共 DNS
