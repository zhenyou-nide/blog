---
title: 一些草稿记录
author: zhenyounide
pubDatetime: 2024-04-09T10:16:11Z
slug: draft-blogs
featured: false
draft: true
tags:
  - draft
description: 暂不公开
---

### 15. vscode 配置

#### 自动保存 自动 prettier

1. 安装 Prettier - Code formatter

2. setting.json

   ```json
    "editor.tabSize": 2,
   	"[javascript]": {
         "editor.defaultFormatter": "esbenp.prettier-vscode"
       },
           "[typescript]": {
               "editor.defaultFormatter": "esbenp.prettier-vscode"
           },
           "[typescriptreact]": {
           "editor.defaultFormatter": "esbenp.prettier-vscode"
       },
           "files.autoSave": "afterDelay",
       "editor.formatOnPaste": true,
           "editor.formatOnSave": true,
       "prettier.jsxSingleQuote": true,
       "prettier.singleQuote": true,
   ```

#### 自定义终端

1. setting.json

   ```json

       "terminal.integrated.shell.windows":"D:\\xxn\\Git\\bin\\bash.exe",
       "terminal.integrated.profiles.windows": {
           "PowerShell": {
               "source": "PowerShell",
               "icon": "terminal-powershell"
           },
           "Command Prompt": {
               "path": [
                   "${env:windir}\\Sysnative\\cmd.exe",
                   "${env:windir}\\System32\\cmd.exe"
               ],
               "args": [],
               "icon": "terminal-cmd"
           },
           "gitBash": {
               "path": "D:\\xxn\\Git\\bin\\bash.exe",
               "source": "gitBash"
           },
           "terminal.integrated.defaultProfile.windows": "gitBash"
       }
   ```

### 常用命令集合

#### Linux

1. 新建文件并编辑
   1. `vi xxx.xxx`；
   2. 编辑完成后按 Esc 退出编辑
   3. `:wq` 保存

#### git

1. rebase 合并多个提交

   1. `git rebase -i 36224db` 或者 `git rebase -i HEAD~3`
   2. 键 inset 修改每一个 commit id 前的指令类型
   3. Esc 退出编辑，`:wq` 保存

   `git rebase --abort` 强制退出

2. 删除远程分支

   `git push origin --delete fix-delete`

3. 修改 msg
   ` git commit --amend --only -m 'new message'`

#### lerna

1. 软链本地的包：lerna link
2. 安装所有依赖项并链接交叉依赖: lerna bootstrap
3. 在指定项目下安装指定包：lerna add 安装包 --scope 项目名（注意不是文件夹名称，是 package.json 中配置的项目名）

### typora 过期

_The beta version of typora is expired, please download and install a newer version_

按`Windows+R`打开运行窗口，输入`regedit`，点确定，打开注册表，依次展开`计算机\HKEY_CURRENT_USER\Software\Typora`，然后在`Typora`上右键，点`权限`，选中`Administrtors`，把权限全部设置为`拒绝`

### 生成日志模板

```js
const fs = require("fs");

let current = 1;
const max = Number(process.argv.slice(2));

while (current < max) {
  const next = new Date(
    new Date().setMonth(new Date().getMonth() + current - 1)
  );

  const month =
    next.getMonth() + 1 >= 10 ? next.getMonth() + 1 : `0${next.getMonth() + 1}`;
  const content = `## ${month} 记录\n### 测试标题\n测试描述`;
  const title = `${next.getFullYear()}${month}`;
  fs.writeFile(`${__dirname}/${title}.md`, content, err => {
    if (err) {
      console.error(err);
      return;
    }
    //文件写入成功。
  });
  current++;
}
```

### 2. html2canvas 使用总结

```js
const options = {
  // 画布配置项
  scale: window.devicePixelRatio || 4,
  width: 375,
  height: 667,
  dpi: 300,
  backgroudColor: null,
};

 const generatePoster = useCallback(() => {
    setOpenLoading(true);
    html2canvas(
      document.getElementById("invitation-poster-id") as HTMLElement,
      options
    ).then((canvas) => {
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      // context.mozImageSmoothingEnabled = false;
      // context.webkitImageSmoothingEnabled = false;
      // context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      setPosterCanvas(() => {
        setVisible(true);
        setOpenLoading(false);
        return canvas;
      });
    });
  }, []);
```

1. 清晰度问题

   - 设置 scale 为 `window.devicePixelRatio `

     scale 越高越清晰

   - 设置 `imageSmoothingEnabled`属性为 false

### 3. qrcode 使用总结

```jsx
const Index = () => {
    const [imgSrc, setImgSrc] = useState("");

    const shareUrl = useMemo(
        () =>
        `${window?.location?.origin}/invited?locale=${intl.locale}&invite-code=${code}`,
        [code, intl]
    );

      // 为解决安卓环境下二维码被遮盖问题
    useEffect(() => {
        const canvas = document.getElementById(
            "qrcode-canvas"
        ) as HTMLCanvasElement;
        if (canvas) {
            let data = canvas?.toDataURL("image/png");
            setImgSrc(data);
        }
    }, []);
    return (
    	<div className="invitation-poster__qrcode">
          <img src={imgSrc} alt="" width={76} />
          <QRCodeCanvas
            style={{ display: "none" }}
            id="qrcode-canvas"
            fgColor="#000000"
            level="H"
            size={76}
            value={shareUrl}
            includeMargin
          />
        </div>
    )
}
```

### 4. h5 下载图片

```js
const downloadPoster = useCallback(() => {
  // or posterCanvas.toDataUrl()
  posterCanvas?.toBlob((s: any) => {
    const link = document.createElement('a');
    link.download = `invite-${moment().format('YYYY-MM-DD HH:mm')}.png`;
    link.href = URL.createObjectURL(s);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(s);
    link.remove();
  });
}, [posterCanvas]);
```

### 6. 分享链接,文本至社媒

1. facebook

   `http://www.facebook.com/sharer.php?u=${enCodeUrl}&t=${text}`

2. telegram

   `https://t.me/share/url?url=${enCodeUrl}&text=${text}`

3. twitter

   `https://twitter.com/intent/tweet?text=${text}&url=${enCodeUrl}`

4. whatsapp

   `https://${isMobileOrTablet() ? "api" : "web"}.whatsapp.com/send?text=${text} ${enCodeUrl}`;

### 7.mixpanel 使用总结

[mixpanel](https://developer.mixpanel.com/docs/javascript-quickstart) 实现埋点

1. 获取 token，并初始化

   ```js
   mixpanel.init("YOUR TOKEN", {
     debug: process.env.NODE_ENV === "development",
     cross_subdomain_cookie: true,
     cross_site_cookie: true,
     ignore_dnt: false,
   });
   ```

2. track event

   ```jsx
   import mixpanel from "mixpanel-browser";

   const trackView = () => {
     mixpanel.track("View FreePrizeDraw", {
       // YOUR PARAMS,
     });
   };
   ```

### 8. resize orientationchange

```js
useEffect(() => {
  // resize orientationchange
  window.addEventListener("orientationchange", () => {
    resizeCanvas();
  });
  return window.removeEventListener("orientationchange", () => {
    console.log("移除监听");
  });
}, []);
```

### 9. 模拟 6 位验证码输入框

#### 思路

1. 手机端 6 位验证码输入框

2. 用 1 个输入框输入,输入框设置 opacity:0

3. 使用 6 个 li 标签显示验证码,点击 li 标签时,输入框获取焦点

#### 实现

```jsx
import { useState, useRef, useEffect } from "react";
import styles from "./index.less";
import { Input } from "antd-mobile";
import classnames from "classnames";

const VerificationInput = ({ onCallback }: any) => {
  const [verCodes, setVerCode] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(true);
  const curInputRef = useRef<any>();

  const codeChange = (value: string) => {
    let _code = value.replace(/[^\d]/g, "");

    const codeLength = _code.length;
    setVerCode(_code);
    if (codeLength === 6) {
      onCallback(_code);
      // do something
    }
  };

  const codeClick = () => {
    curInputRef?.current?.focus();
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //   倒计时
  useEffect(() => {
    curInputRef?.current?.focus();
  }, []);

  return (
    <div className={styles.codesWrap}>
      <div className={styles.codeInputWrap}>
        <ul className={styles.codeContainer} onClick={codeClick}>
          {Array(6)
            .fill("")
            .map((_, index) => {
              return (
                <li
                  className={classnames(
                    styles.fieldWrap,
                    verCodes?.[index] ? styles.highlight : "",
                    verCodes?.length === index && focus ? styles.focus : ""
                  )}
                  key={index}
                >
                  {verCodes?.[index]}
                </li>
              );
            })}
        </ul>
        <Input
          className={styles.codeInput}
          value={verCodes}
          ref={curInputRef}
          onChange={codeChange}
          onFocus={onFocus}
          onBlur={onBlur}
          // type={"number"}
          maxLength={6}
        />
      </div>
    </div>
  );
};
export default VerificationInput;

```

```less
.codesWrap {
  position: relative;
  :global {
    .adm-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: pink;
      opacity: 0;
    }
  }
  .codeContainer {
    display: flex;
    padding: 0;
    list-style: none;
    .fieldWrap:nth-child(6) {
      margin-right: 0;
    }
    .fieldWrap {
      position: relative;
      width: 67px;
      height: 60px;
      margin-right: 16px;
      color: #fff;
      font-size: 0.24rem;
      line-height: 60px;
      text-align: center;
      background-color: #20252c;
      border-radius: 6px;
      // &.highlight {
      //   // border-color: pink;
      //   // border: 1px solid #3A82FF;
      //   // box-shadow: 0px 2px 0px rgba(26, 30, 36, 0.06);
      // }
      &.focus::after {
        position: absolute;
        top: 20px;
        left: 50%;
        display: block;
        width: 2px;
        height: 24px;
        background: #ff006b;
        animation: blink 1s infinite steps(1, start);
        content: "";
      }
    }
  }
}
```
