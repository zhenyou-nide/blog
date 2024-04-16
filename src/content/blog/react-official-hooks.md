---
title: React 官方 hooks 使用总结
author: zhenyounide
pubDatetime: 2022-04-12T04:06:31Z
slug: react-official-hooks
featured: false
draft: false
tags:
  - summary
  - react
description: ""
---

## Table of contents

# 开篇

1. 什么是 Hook?
   Hook 是 React 16.8 的新增特性，它可以**让函数式组件拥有类组件特性**
2. 为什么需要 Hook?
   在 Hook 出现之前，如果我们想在组件中保存自己的状态，那么我们必须使用类组件。类组件的学习成本是比较高的，你必须懂得 ES6 的 class, 你必须懂得箭头函数，但是在类组件的同一个生命周期方法中，我们可能会编写很多不同的业务逻辑代码，这样就导致了大量不同的业务逻辑代码混杂到一个方法中，导致代码变得很难以维护（诸如：在组件被挂载的生命周期中，可能主要注册监听，可能需要发送网络请求等）。但是在类组件中共享数据是非常繁琐的，需要借助 Context 或者 Redux 等。
   所以当应用程序变得复杂时，类组件就会变得非常复杂，非常难以维护
   所以 Hook 就是为了解决以上问题而生的

3. 如何使用 Hook?
   Hook 的使用我们无需额外安装任何第三方库，因为它就是 React 的一部分。Hook 只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用；Hook 只能在函数最外层调用，不要在循环、条件判断或者子函数中调用
   [官方文档](https://react.docschina.org/docs/hooks-intro.html)

# useState

可以让函数式组件保存自己状态的函数

```js
function App() {
  /*
    useState:
    参数: 保证状态的初始值
    返回值: 是一个数组, 这个数组中有两个元素
           第一个元素: 保存的状态
           第二个元素: 修改保存状态的方法
    * */
  const arr = useState(666);
  const [state, setState] = arr;
  return (
    <div>
      <p>{state}</p>
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          setState(state - 1);
        }}
      >
        减少
      </button>
    </div>
  );
}
export default App;
```

# useEffect

可以把 `useEffect Hook` 看做`componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount`这三个生命周期函数的组合；可以设置依赖，只有依赖发生变化的时候才执行。
**对比类组件生命周期方法优势：易于拆分**

```js
import React, { useState, useEffect } from "react";

function Home() {
  const [nameState, setNameState] = useState("lnj");
  const [ageState, setAgeState] = useState(0);
  useEffect(() => {
    // componentDidMount
    // componentDidUpdate
    console.log("组件被挂载或者组件更新完成");
    return () => {
      // componentWillUnmount
      console.log("组件即将被卸载");
    };
  });
  return (
    <div>
      <p>{nameState}</p>
      <button
        onClick={() => {
          setNameState("it666");
        }}
      >
        修改
      </button>
      <p>{ageState}</p>
      <button
        onClick={() => {
          setAgeState(ageState + 1);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          setAgeState(ageState - 1);
        }}
      >
        减少
      </button>
      <hr />
    </div>
  );
}
function App() {
  const [isShowState, setIsShowState] = useState(true);
  return (
    <div>
      {isShowState && <Home />}
      <button
        onClick={() => {
          setIsShowState(!isShowState);
        }}
      >
        切换
      </button>
    </div>
  );
}
export default App;
```

# useContext

`useContext` 相当于 类组件中的
`static contextType = Context`

# useReducer

从名称来看，很多人会误以为 useReducer 是用来替代 Redux 的，但是其实不是
useReducer 是 useState 的一种替代方案，可以让我们很好的复用操作数据的逻辑代码

## 参数：

第一个参数：处理数据的函数
第二个参数：保存的默认值

## useReducer 返回值：

会返回一个数组，这个数组中有两个元素
第一个元素：保存的数据
第二个元素：dispatch 函数

# useCallback

`useCallback` 用于优化代码，可以让对应的函数只有在依赖发生变化时才重新定义

# useMemo

`useMemo` 用于优化代码，可以让对应的函数只有在依赖发生变化时才返回新的值

## 区别

- useCallback 返回的永远是一个函数
- useMemo 返回的是 return 返回的内容

# useRef

`useRef`就是`createRef`的 Hook 版本，只不过比`createRef`更强大一点

## 区别

- useRef 除了可以用来获取元素以外，还可以用来保存数据

```js
const homeRef = useRef();
function btnClick() {
  console.log(pRef); // {current: p}
  console.log(homeRef); // {current: Home}
}
```

- useRef 中保存的数据，除非手动修改，否则永远都不会发生变化

# useImperativeHandle

`useImperativeHandle`可以让你在使用 `ref `时自定义暴露给父组件的实例值

# useLayoutEffect

1. 什么是`useLayoutEffect Hook`?
   大部分情况下`useLayoutEffect`和`useEffect`没太大区别（用法格式都相同）
   但是如果需要修改 DOM 的布局样式，那么推荐使用`useLayoutEffect`

2. 为什么推荐在`useLayoutEffect`中修改 DOM 的布局样式？
   `useEffect `函数会在组件渲染到屏幕之后才执行，所以会可能会出现闪屏情况
   `useLayoutEffect `函数是在组件渲染到屏幕之前执行，所以不会出现闪屏情况

## 区别

- 执行时机不同
  如果是挂载或者更新组件，那么`useLayoutEffect`会比`useEffect`先执行
  如果是卸载组件，那么`useEffect`会比`useLayoutEffect`先执行
  useEffect: 同步
  useLayoutEffect: 异步

## 什么时候使用 useEffect?

在绝大多数的情况下能用`useEffect`, 就用`useEffect`

## 什么时候用 useLayoutEffect?

只有在需要组件挂载之后更新 DOM 的布局和样式的时候才使用`useLayoutEffect`

## 为什么要使用 useLayoutEffect 来更新 DOM 布局和样式？

1. `useEffect`是组件已经渲染到屏幕上了才执行
2. `useLayoutEffect`是组件还没有渲染到屏幕上就会执行
   所以如果在组件已经渲染到屏幕上了，才去更新 DOM 的布局和样式，那么用户体验不好，会看到闪屏的情况
   而如果是在组件还没有渲染到屏幕上，就去更新 DOM 的布局和样式，那么用户体验更好，看不到闪屏情况

# 自定义 hook

通过自定义 Hook，可以对其它 Hook 的代码进行复用

注意点：在 React 中只有两个地方可以使用 Hook - 函数式组件中 - 自定义 Hook 中
如何自定义一个 Hooks
只要在函数名称前面加上 use, 那么就表示这个函数是一个自定义 Hook, 就表示可以在这个函数中使用其它的 Hook
