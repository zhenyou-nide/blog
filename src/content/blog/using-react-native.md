---
title: react native 雷点集合
author: zhenyounide
pubDatetime: 2022-06-06T04:06:31Z
slug: react-native-bugs
featured: false
draft: false
tags:
  - react-native
  - problems
description: 使用 rn 过程中踩的血泪坑,
---

### react native

- 存疑：不能使用第三方终端工具（git bash

- adb: command not found

  解决办法
  1、 vim ~/.bash_profile ，如果 .bash_profile 不存在，先 touch ~/.bash_profile
  2、将如下内容添加到 .bash_profile 文件中

  ```
  ANDROID_HOME=/Users/xxn/Library/Android/sdk
  PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH:.
  export PATH
  ```

- app:installDebug FAILED

  go to Developer options, scroll down to find 'Turn on MIUI optimization' & disable it. Your Phone will be rebooted

- kotlin-compiler-embeddable 下载缓慢问题

  https://blog.csdn.net/qq_40067488/article/details/104896201

### rn 无法使用 Intl.NumberFormat --- 未解决

[javascript - How to use Intl.NumberFormat with react native? - Stack Overflow](https://stackoverflow.com/questions/52812751/how-to-use-intl-numberformat-with-react-native)

### rn android 不适配 safeAreaView 导底被遮挡

safeAreaView 仅支持 ios 端，android 环境下底部会被遮挡，主要就是在全面屏下高度不匹配

![rn-android-safearea-bug](../../assets/images/rn-android-safearea-bug.jpg)

#### 解决的路上

1. 尝试通过给 container 加上外边距 margin，将底部撑起

效果还不错，但随之而来又有新问题，当真机的系统导航模式改为全面屏手势的时候（移除底部导航栏)，就会变成这样
![rn](../../assets//images//rn-safearea-m1-bug.jpg)

2. 给 container 加上高度

   ```tsx
   import { Dimension, StyleSheet, View } from "react-native";
   const { width, height } = Dimensions.get("window");

   interface Props {}

   const IndexScreen: React.FunctionComponent<Props> = () => {
     return <View style={styles.container}>...</View>;
   };

   const styles = StyleSheet.create({
     container: {
       height,
     },
   });
   ```

   在一般情况下这是设置是没有问题的，整个 `视口高度` 会以 `设备高度` 为准撑满整个屏幕。但是在 **全面屏** 或者使用 **Navbar** 的时候就会出问题了，需要进行适配。

   原因如下：

   市场上大多数的全面屏安卓手机，一般都是以 _刘海屏_ 、 _水滴屏_ 、 _挖孔屏_ 等异形屏的形式存在。以 _小米10（挖孔屏）_ 为例，屏幕在显示 UI 界面的时候，顶上的挖孔部分一般都是作为 **状态栏** 的形式存在。

   `Dimensions.get('window').height` 在计算高度的时候不会将他计算进去。但是在实际渲染界面的时候，这部分又会被作为可视区域计算进去。这就造成了 `Dimensions.get('window').height` 获取的 **设备高度** 比 **设备实际高度** 少了一截（状态栏），就会在底部就会以白条的形式进行补全

   所以我们只要在 `Dimensions.get('window').height` 获取高度的时候，把状态栏的高度也给加上去，作为视口高度就可以了。获取状态栏高度的方法：`StatusBar.currentHeight`。

   ```tsx
   import { Dimension, StyleSheet, Statusbar, View } from "react-native";
   const { width, height } = Dimensions.get("window");

   interface Props {}

   const IndexScreen: React.FunctionComponent<Props> = () => {
     return <View style={styles.container}>...</View>;
   };

   const styles = StyleSheet.create({
     container: {
       height: height + Statusbar.currentHeight,
     },
   });
   ```

   那么如何保证不误伤 **正常屏** 呢？这里给出龙鸣方法：通过判断 **纵横比**。一般比值大于`1.8`的是全面屏，小于`1.8`的是正常屏：

   ```tsx
   import { Dimension, StyleSheet, Statusbar, View } from "react-native";
   const { width, height } = Dimensions.get("window");

   interface Props {}

   const IndexScreen: React.FunctionComponent<Props> = () => {
     return <View style={styles.container}>...</View>;
   };

   const styles = StyleSheet.create({
     container: {
       height:
         height / width > 1.8
           ? height + (StatusBar.currentHeight || 0)
           : height,
     },
   });
   ```

#### 效果

但但是,发现 1 + 手机，纵横比大概是 2.4 还是会显示不全，最终解决方案如下：

```jsx
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useSafeAreaContainerStyle() {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    safeAreaContainerStyle: {
      flex: 1,
      paddingBottom: Math.max(insets.bottom, 16),
    },
  });
  return styles.safeAreaContainerStyle;
}
```
