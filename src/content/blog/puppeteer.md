---
title: Puppeteer - 通过 DevTools 协议控制 Chromium 或 Chrome 的自动化测试工具
author: zhenyounide
pubDatetime: 2021-06-16T05:06:31Z
slug: puppeteer-usage
featured: true
draft: false
tags:
  - summary
  - nodejs
description: Puppeteer 是一个 Node 库，它提供了高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome
---

## Table of contents

# 如何创建一个 Browser 实例

puppeteer 提供了两种方法用于创建一个 Browser 实例：

- puppeteer.connect: 连接一个已经存在的 Chrome 实例
- puppeteer.launch: 每次都启动一个 Chrome 实例

```js
//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    slowMo: 100, //放慢浏览器执行速度，方便测试观察
    args: [
      //启动 Chrome 的参数，详见上文中的介绍
      "–no-sandbox",
      "--window-size=1280,960",
    ],
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.close();
  await browser.close();
})();

//使用 puppeteer.connect 连接一个已经存在的 Chrome 实例
(async () => {
  //通过 9222 端口的 http 接口获取对应的 websocketUrl
  let version = await request({
    uri: "http://127.0.0.1:9222/json/version",
    json: true,
  });
  //直接连接已经存在的 Chrome
  let browser = await puppeteer.connect({
    browserWSEndpoint: version.webSocketDebuggerUrl,
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.close();
  await browser.disconnect();
})();
```

这两种方式的对比：

- puppeteer.launch 每次都要重新启动一个 Chrome 进程，启动平均耗时 100 到 150 ms，性能欠佳
- puppeteer.connect 可以实现对于同一个 Chrome 实例的共用，减少启动关闭浏览器的时间消耗
- puppeteer.launch 启动时参数可以动态修改
- 通过 puppeteer.connect 我们可以远程连接一个 Chrome 实例，部署在不同的机器上
- puppeteer.connect 多个页面共用一个 chrome 实例，偶尔会出现 Page Crash 现象，需要进行并发控制，并定时重启 Chrome 实例

# 加载导航页面

- page.goto：打开新页面
- page.goBack ：回退到上一个页面
- page.goForward ：前进到下一个页面
- page.reload ：重新加载页面
- page.waitForNavigation：等待页面跳转

Pupeeteer 中的基本上所有的操作都是异步的，以上几个 API 都涉及到关于打开一个页面，什么情况下才能判断这个函数执行完毕呢，这些函数都提供了两个参数 waitUtil 和 timeout，waitUtil 表示直到什么出现就算执行完毕，timeout 表示如果超过这个时间还没有结束就抛出异常。

```js
await page.goto("https://www.baidu.com", {
  timeout: 30 * 1000,
  waitUntil: [
    "load", //等待 “load” 事件触发
    "domcontentloaded", //等待 “domcontentloaded” 事件触发
    "networkidle0", //在 500ms 内没有任何网络连接
    "networkidle2", //在 500ms 内网络连接个数不超过 2 个
  ],
});
```

以上 waitUtil 有四个事件，业务可以根据需求来设置其中一个或者多个触发才以为结束，networkidle0 和 networkidle2 中的 500ms 对时间性能要求高的用户来说，还是有点长的

# 等待元素、请求、响应

- page.waitForXPath：等待 xPath 对应的元素出现，返回对应的 ElementHandle 实例
- page.waitForSelector ：等待选择器对应的元素出现，返回对应的 ElementHandle 实例
- page.waitForResponse ：等待某个响应结束，返回 Response 实例
- page.waitForRequest：等待某个请求出现，返回 Request 实例

```js
await page.waitForXPath("//img");
await page.waitForSelector("#uniqueId");
await page.waitForResponse("https://d.youdata.netease.com/api/dash/hello");
await page.waitForRequest("https://d.youdata.netease.com/api/dash/hello");
```

# case1：截图

我们使用 Puppeteer 既可以对某个页面进行截图，也可以对页面中的某个元素进行截图：

```js
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //设置可视区域大小
  await page.setViewport({ width: 1920, height: 800 });
  await page.goto("https://youdata.163.com");
  //对整个页面截图
  await page.screenshot({
    path: "./files/capture.png", //图片保存路径
    type: "png",
    fullPage: true, //边滚动边截图
    // clip: {x: 0, y: 0, width: 1920, height: 800}
  });
  //对页面某个元素截图
  let [element] = await page.$x("/html/body/section[4]/div/div[2]");
  await element.screenshot({
    path: "./files/element.png",
  });
  await page.close();
  await browser.close();
})();
```

我们怎么去获取页面中的某个元素呢？

- page.$('#uniqueId')：获取某个选择器对应的第一个元素
- page.$$('div')：获取某个选择器对应的所有元素
- page.$x('//img')：获取某个 xPath 对应的所有元素
- page.waitForXPath('//img')：等待某个 xPath 对应的元素出现
- page.waitForSelector('#uniqueId')：等待某个选择器对应的元素出现

# case2: 模拟用户登录

```js
(async () => {
  const browser = await puppeteer.launch({
    slowMo: 100, //放慢速度
    headless: false,
    defaultViewport: { width: 1440, height: 780 },
    ignoreHTTPSErrors: false, //忽略 https 报错
    args: ["--start-fullscreen"], //全屏打开页面
  });
  const page = await browser.newPage();
  await page.goto("https://demo.youdata.com");
  //输入账号密码
  const uniqueIdElement = await page.$("#uniqueId");
  await uniqueIdElement.type("admin@admin.com", { delay: 20 });
  const passwordElement = await page.$("#password", { delay: 20 });
  await passwordElement.type("123456");
  //点击确定按钮进行登录
  let okButtonElement = await page.$("#btn-ok");
  //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
  await Promise.all([okButtonElement.click(), page.waitForNavigation()]);
  console.log("admin 登录成功");
  await page.close();
  await browser.close();
})();
```

那么 ElementHandle 都提供了哪些操作元素的函数呢？

- elementHandle.click()：点击某个元素
- elementHandle.tap()：模拟手指触摸点击
- elementHandle.focus()：聚焦到某个元素
- elementHandle.hover()：鼠标 hover 到某个元素上
- elementHandle.type('hello')：在输入框输入文本

# case3：请求拦截

请求在有些场景下很有必要，拦截一下没必要的请求提高性能，我们可以在监听 Page 的 request 事件，并进行请求拦截，前提是要开启请求拦截 page.setRequestInterception(true)。

```js
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const blockTypes = new Set(["image", "media", "font"]);
  await page.setRequestInterception(true); //开启请求拦截
  page.on("request", request => {
    const type = request.resourceType();
    const shouldBlock = blockTypes.has(type);
    if (shouldBlock) {
      //直接阻止请求
      return request.abort();
    } else {
      //对请求重写
      return request.continue({
        //可以对 url，method，postData，headers 进行覆盖
        headers: Object.assign({}, request.headers(), {
          "puppeteer-test": "true",
        }),
      });
    }
  });
  await page.goto("https://demo.youdata.com");
  await page.close();
  await browser.close();
})();
```

那 page 页面上都提供了哪些事件呢？

- page.on('close') 页面关闭
- page.on('console') console API 被调用
- page.on('error') 页面出错
- page.on('load') 页面加载完
- page.on('request') 收到请求
- page.on('requestfailed') 请求失败
- page.on('requestfinished') 请求成功
- page.on('response') 收到响应
- page.on('workercreated') 创建 webWorker
- page.on('workerdestroyed') 销毁 webWorker

# case4：植入 javascript 代码

Puppeteer 最强大的功能是，你可以在浏览器里执行任何你想要运行的 javascript 代码，下面是我在爬 188 邮箱的收件箱用户列表时，发现每次打开收件箱再关掉都会多处一个 iframe 来，随着打开收件箱的增多，iframe 增多到浏览器卡到无法运行，所以我在爬虫代码里加了删除无用 iframe 的脚本：

```js
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://webmail.vip.188.com");
  //注册一个 Node.js 函数，在浏览器里运行
  await page.exposeFunction("md5", text =>
    crypto.createHash("md5").update(text).digest("hex")
  );
  //通过 page.evaluate 在浏览器里执行删除无用的 iframe 代码
  await page.evaluate(async () => {
    let iframes = document.getElementsByTagName("iframe");
    for (let i = 3; i < iframes.length - 1; i++) {
      let iframe = iframes[i];
      if (iframe.name.includes("frameBody")) {
        iframe.src = "about:blank";
        try {
          iframe.contentWindow.document.write("");
          iframe.contentWindow.document.clear();
        } catch (e) {}
        //把iframe从页面移除
        iframe.parentNode.removeChild(iframe);
      }
    }
    //在页面中调用 Node.js 环境中的函数
    const myHash = await window.md5("PUPPETEER");
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await page.close();
  await browser.close();
})();
```

基于 antd 的鼠标拖拽失效问题

```js
const dragAndDrop = async (
  page,
  sourceX,
  sourceY,
  destinationX,
  destinationY,
  waitTime
) => {
  await page.evaluate(`(async (sourceX, sourceY, destinationX, destinationY, waitTime) => {
  
        // 每步间隔
        const sleep = (waitTime) => {
            waitTime = waitTime === null ? 10 : waitTime;
            return new Promise(resolve => setTimeout(resolve, waitTime));
        }
  
        // 获取起始位置的元素、定义被拖拽元素当前所在元素、定义被拖拽元素前一个所在元素
        const elementDragged = document.elementFromPoint(sourceX, sourceY);
        var elementDraggedOverNow = elementDragged;
        var elementDraggedOverPrior = elementDraggedOverNow;
  
        // 创建 DataTransfer 对象
        const dataTransfer = new DataTransfer();
        dataTransfer.effectAllowed = 'all';
        dataTransfer.dropEffect = 'move';
  
        // 开始拖拽被拖拽元素触发 dragstart
        elementDragged.dispatchEvent(
            new DragEvent('dragstart', {
                dataTransfer,
                bubbles: true
            })
        );
  
        // 被拖拽元素进入可放置元素触发 dragenter
        elementDragged.dispatchEvent(
            new DragEvent('dragenter', {
                dataTransfer,
                bubbles: true
            })
        );
        await sleep(waitTime);
  
        // 拖拽被拖拽元素
        const dragMove = async (x, y) => {
            
            elementDragged.dispatchEvent(
                new DragEvent('drag', {
                    dataTransfer,
                    bubbles: true,
                    clientX: x,
                    clientY: y,
                })
            );
            elementDraggedOverNow = document.elementFromPoint(x, y);
            // 是否进入新元素，如果是，应触发前一个元素的 dragleave 和新元素的 dragenter
            if (!elementDraggedOverNow.isSameNode(elementDraggedOverPrior)) {
                elementDraggedOverPrior.dispatchEvent(
                    new DragEvent('dragleave', {
                        dataTransfer,
                        bubbles: true,
                        clientX: x,
                        clientY: y,
                    })
                );
                elementDraggedOverNow.dispatchEvent(
                    new DragEvent('dragenter', {
                        dataTransfer,
                        bubbles: true,
                        clientX: x,
                        clientY: y,
                    })
                );
                elementDraggedOverPrior = elementDraggedOverNow;
            }
            // 被拖拽元素在可放置元素上时触发 dragover
            elementDraggedOverNow.dispatchEvent(
                new DragEvent('dragover', {
                    dataTransfer,
                    bubbles: true,
                    clientX: x,
                    clientY: y,
                })
            );
            await sleep(waitTime);
        }
        // 先水平拖拽
        if (sourceX <= destinationX) {
            for (let x = sourceX; x <= destinationX; x++) {
                await dragMove(x, sourceY);
            }
        } else {
            for (let x = sourceX; x >= destinationX; x--) {
                await dragMove(x, sourceY);
            }
        }
  
        // 再垂直拖拽
        if (sourceY <= destinationY) {
            for (let y = sourceY; y <= destinationY; y++) {
                await dragMove(destinationX, y);
            }
        } else {
            for (let y = sourceY; y >= destinationY; y--) {
                await dragMove(destinationX, y);
            }
        }
  
        // 在被拖拽元素当前所在的元素上放置被拖拽元素时触发 drop
        elementDraggedOverNow.dispatchEvent(
            new DragEvent('drop', {
                bubbles: true,
                dataTransfer
            })
        );
        await sleep(waitTime);
  
        // 结束拖拽被拖拽元素触发 dragend
        elementDragged.dispatchEvent(
            new DragEvent('dragend', {
                dataTransfer,
                bubbles: true
            })
        );
  
        // 当元素变得不再是拖动操作的选中目标时触发 dragexit
        elementDragged.dispatchEvent(
            new DragEvent('dragexit', {
                dataTransfer,
                bubbles: true
            })
        );
        await sleep(waitTime);
  
    })(${sourceX}, ${sourceY}, ${destinationX}, ${destinationY}, ${waitTime})`);
};
```

# case5: 如何抓取 iframe 中的元素

一个 Frame 包含了一个执行上下文（Execution Context），我们不能跨 Frame 执行函数，一个页面中可以有多个 Frame，主要是通过 iframe 标签嵌入的生成的。其中在页面上的大部分函数其实是 page.mainFrame().xx 的一个简写，Frame 是树状结构，我们可以通过 frame.childFrames() 遍历到所有的 Frame，如果想在其它 Frame 中执行函数必须获取到对应的 Frame 才能进行相应的处理

以下是在登录 188 邮箱时，其登录窗口其实是嵌入的一个 iframe，以下代码时我们在获取 iframe 并进行登录

```js
(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto("https://www.188.com");
  //点击使用密码登录
  let passwordLogin = await page.waitForXPath('//*[@id="qcode"]/div/div[2]/a');
  await passwordLogin.click();
  for (const frame of page.mainFrame().childFrames()) {
    //根据 url 找到登录页面对应的 iframe
    if (frame.url().includes("passport.188.com")) {
      await frame.type(".dlemail", "admin@admin.com");
      await frame.type(".dlpwd", "123456");
      await Promise.all([frame.click("#dologin"), page.waitForNavigation()]);
      break;
    }
  }
  await page.close();
  await browser.close();
})();
```

# case7: 文件的上传和下载

在自动化测试中，经常会遇到对于文件的上传和下载的需求，那么在 Puppeteer 中如何实现呢？

```js
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //通过 CDP 会话设置下载路径
  const cdp = await page.target().createCDPSession();
  await cdp.send("Page.setDownloadBehavior", {
    behavior: "allow", //允许所有下载请求
    downloadPath: "path/to/download", //设置下载路径
  });
  //点击按钮触发下载
  await (await page.waitForSelector("#someButton")).click();
  //等待文件出现，轮训判断文件是否出现
  await waitForFile("path/to/download/filename");

  //上传时对应的 inputElement 必须是<input>元素
  let inputElement = await page.waitForXPath('//input[@type="file"]');
  await inputElement.uploadFile("/path/to/file");
  browser.close();
  // 如果需要上传多个文件
  //  await inputElement.uploadFile('路径1','路径2' ...,'路径n');
})();
```

# case8：跳转新 tab 页处理

在点击一个按钮跳转到新的 Tab 页时会新开一个页面，这个时候我们如何获取改页面对应的 Page 实例呢？可以通过监听 Browser 上的 targetcreated 事件来实现，表示有新的页面创建：

```js
let page = await browser.newPage();
await page.goto(url);
let btn = await page.waitForSelector("#btn");
//在点击按钮之前，事先定义一个 Promise，用于返回新 tab 的 Page 对象
const newPagePromise = new Promise(res =>
  browser.once("targetcreated", target => res(target.page()))
);
await btn.click();
//点击按钮后，等待新tab对象
let newPage = await newPagePromise;
```

# case9: 模拟不同的设备

Puppeteer 提供了模拟不同设备的功能，其中 puppeteer.devices 对象上定义很多设备的配置信息，这些配置信息主要包含 viewport 和 userAgent，然后通过函数 page.emulate 实现不同设备的模拟

```js
const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto("https://www.google.com");
  await browser.close();
});
```

**注意** 旧方法 (Puppeteer versions <= v1.14.0) 中设备可以通过 `require('puppeteer/DeviceDescriptors')` 方法获得。
