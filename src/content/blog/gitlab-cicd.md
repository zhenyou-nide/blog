---
title: 一次 gitlab CICD config 的实践记录
author: zhenyounide
pubDatetime: 2020-12-15T04:06:31Z
slug: gitlab-cicd
featured: true
draft: false
tags:
  - summary
description: ""
---

小菜鸡来写 gitlab-ci 了

历劫前补补课

## CI / CD 方法论简介

软件开发的连续方法基于自动执行脚本，以最大程度地减少在开发应用程序时引入错误的机会。从开发新代码到部署新代码，他们几乎不需要人工干预，甚至根本不需要干预。

GitLab CI / CD 是 GitLab 内置的功能强大的工具，它使您可以将所有连续方法（连续集成，交付和部署）应用于软件，而无需第三方应用程序或集成。

##### 一些常用的关键字

| 关键词                                                                                           | 描述                                                                                                                                                                                                               |
| :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`script`](https://docs.gitlab.com/ee/ci/yaml/README.html#script)                                | 运行程序执行的 Shell 脚本。                                                                                                                                                                                        |
| [`after_script`](https://docs.gitlab.com/ee/ci/yaml/README.html#before_script-and-after_script)  | 覆盖作业后执行的一组命令。                                                                                                                                                                                         |
| [`allow_failure`](https://docs.gitlab.com/ee/ci/yaml/README.html#allow_failure)                  | 允许作业失败。失败的作业不会影响提交状态。                                                                                                                                                                         |
| [`artifacts`](https://docs.gitlab.com/ee/ci/yaml/README.html#artifacts)                          | 成功时附加到作业的文件和目录列表。也可用：`artifacts:paths`，`artifacts:exclude`，`artifacts:expose_as`，`artifacts:name`，`artifacts:untracked`，`artifacts:when`，`artifacts:expire_in`，和`artifacts:reports`。 |
| [`before_script`](https://docs.gitlab.com/ee/ci/yaml/README.html#before_script-and-after_script) | 覆盖作业之前执行的一组命令。                                                                                                                                                                                       |
| [`cache`](https://docs.gitlab.com/ee/ci/yaml/README.html#cache)                                  | 在后续运行之间应缓存的文件列表。也可用：`cache:paths`，`cache:key`，`cache:untracked`，`cache:when`，和`cache:policy`。                                                                                            |
| [`coverage`](https://docs.gitlab.com/ee/ci/yaml/README.html#coverage)                            | 给定作业的代码覆盖率设置。                                                                                                                                                                                         |
| [`dependencies`](https://docs.gitlab.com/ee/ci/yaml/README.html#dependencies)                    | 通过提供要从中获取工件的作业列表，限制将哪些工件传递给特定作业。                                                                                                                                                   |
| [`environment`](https://docs.gitlab.com/ee/ci/yaml/README.html#environment)                      | 作业部署到的环境的名称。也可用：`environment:name`，`environment:url`，`environment:on_stop`，`environment:auto_stop_in`，和`environment:action`。                                                                 |
| [`except`](https://docs.gitlab.com/ee/ci/yaml/README.html#onlyexcept-basic)                      | 限制不创建作业的时间。也可用：[`except:refs`，`except:kubernetes`，`except:variables`，和`except:changes`](https://docs.gitlab.com/ee/ci/yaml/README.html#onlyexcept-advanced)。                                   |
| [`extends`](https://docs.gitlab.com/ee/ci/yaml/README.html#extends)                              | 该作业继承的配置条目。                                                                                                                                                                                             |
| [`image`](https://docs.gitlab.com/ee/ci/yaml/README.html#image)                                  | 使用 Docker 映像 也可用：`image:name`和`image:entrypoint`。                                                                                                                                                        |
| [`include`](https://docs.gitlab.com/ee/ci/yaml/README.html#include)                              | 允许此作业包括外部 YAML 文件。也可用：`include:local`，`include:file`，`include:template`，和`include:remote`。                                                                                                    |
| [`only`](https://docs.gitlab.com/ee/ci/yaml/README.html#onlyexcept-basic)                        | 限制创建作业的时间。也可用：[`only:refs`，`only:kubernetes`，`only:variables`，和`only:changes`](https://docs.gitlab.com/ee/ci/yaml/README.html#onlyexcept-advanced)。                                             |
| [`parallel`](https://docs.gitlab.com/ee/ci/yaml/README.html#parallel)                            | 多少个作业实例应并行运行。                                                                                                                                                                                         |
| [`release`](https://docs.gitlab.com/ee/ci/yaml/README.html#release)                              | 指示运行程序生成[Release](https://docs.gitlab.com/ee/user/project/releases/index.html)对象。                                                                                                                       |
| [`retry`](https://docs.gitlab.com/ee/ci/yaml/README.html#retry)                                  | 发生故障时可以自动重试作业的时间和次数。                                                                                                                                                                           |
| [`rules`](https://docs.gitlab.com/ee/ci/yaml/README.html#rules)                                  | 评估和确定作业的所选属性以及是否创建作业的条件列表。不能与`only`/一起使用`except`。                                                                                                                                |
| [`stage`](https://docs.gitlab.com/ee/ci/yaml/README.html#stage)                                  | 定义一个作业阶段（默认值：）`test`。                                                                                                                                                                               |
| [`tags`](https://docs.gitlab.com/ee/ci/yaml/README.html#tags)                                    | 用于选择 runner 的标签列表。                                                                                                                                                                                       |
| [`trigger`](https://docs.gitlab.com/ee/ci/yaml/README.html#trigger)                              | 定义下游管道触发器。                                                                                                                                                                                               |
| [`variables`](https://docs.gitlab.com/ee/ci/yaml/README.html#variables)                          | 在作业级别上定义作业变量。                                                                                                                                                                                         |
| [`when`](https://docs.gitlab.com/ee/ci/yaml/README.html#when)                                    | 什么时候开始工作。也可用：`when:manual`和`when:delayed`。                                                                                                                                                          |

首先，从基本元素 job 开始

- 首先写个默认 image

这个 image 在我的理解下是 之后的每个作业运行的环境,后续作业中没有定义 image 的，以此 image 为准

- 编写 before_script

定义项目推送的镜像

```js
before_script:
  - IMAGE_TAG=${IMAGE}:${CI_COMMIT_SHORT_SHA}
```

- 其次可以写一写 stages

例如：

```js
stages: -build - test - dockerize - deploy;
```

- 接下来开始编写 job

  - 首先写一个阶段为 build 的作业

  ```js
  app:
    stage: build
    cache:
      key:
        files:
          - package.json
          - yarn.lock
      paths:
        - public
        - node_modules
    script:
        - export $REGISTRY_PASSWORD
        - yarn config set registry "https://registry.npm.taobao.org"
        - if [ ! -x "node_modules" ];then
          echo "node_modules not exist";
          yarn install --frozen-lockfile;
          else
          echo "node_modules exist";
          fi
        - npm run build
    artifacts:
      expire_in: 1 day
      paths:
        - public
        - node_modules

  ```

  以上作业的的解释如下

  阶段：build

  应缓存的文件列表：取到 package.json 和 yarn.lock

  运行程序执行的 Shell 脚本：

  - yarn 配置国内镜像，

  - 执行 yarn install
  - npm run build

  成功时附加到作业的文件和目录列表：

  - expire_in
  - paths

至此 build 作业编写完毕，不指定特定分支，因此任何分支有提交代码都会执行这个作业

- 继续编写其他作业

  - 阶段为 dockerize

  ```js
  build-app-image:
    stage: dockerize
    cache:
      key:
        files:
          - package.json
          - yarn.lock
      paths:
        - public
      policy: pull
    script:
      - chmod +x scripts/build.sh
      - scripts/build.sh $CI_COMMIT_SHORT_SHA
      - chmod +x scripts/push.sh
      - scripts/push.sh $CI_COMMIT_SHORT_SHA

      - export AWS_ACCESS_KEY_ID=$ALIYUN_ACCESS_ID
      - export AWS_SECRET_ACCESS_KEY=$ALIYUN_ACCESS_SECRET
      - npm run deploy
    only:
      - master
      - develop
      - tags

  ```

  以上作业的的解释如下

  阶段：dockerize

  运行程序执行的 Shell 脚本：

  - 进行镜像的 build 和 push（其中 scripts 下的 build.sh 和 push.sh 均为写好的镜像打包、上传）

  - export oss 的 id 和 secret，执行 deploy，上传对象存储

  仅在以下分支执行此作业：

  - master
  - develop
  - tags

至此 dockerize 作业编写完毕

以上就是 gitlab-ci.yml 的学习以及实践，部署预发布版本和生产版本进 k8s 的，等我看懂了**deployment.yaml**再来更新
