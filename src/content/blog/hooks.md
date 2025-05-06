---
title: 一些自己封装的常用 hooks(持续更新中...)
author: zhenyounide
pubDatetime: 2022-11-16T05:06:31Z
slug: common-hooks
featured: false
draft: true
tags:
  - summary
  - react
description: 日常会用到的一些 hook
---

## Table of contents

# useInViewport

Observe whether the element is in the visible area, and the visible area ratio of the element

依赖于 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

```js
let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);
```

```js
import { useState, useEffect } from 'react';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type TargetType = HTMLElement | Element | Window | Document;

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: TargetType;
}

function useInViewport(target: TargetType, options?: Options) {
  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffect(
    () => {
      const el = target
      if (!el) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
          }
        },
        {
          ...options,
          root: options?.root,
        },
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    },
    [options?.rootMargin, options?.threshold],
  );

  return [state, ratio] as const;
}

export default useInViewport;

```

# n 秒倒计时 - 持久化版

简单实现一个持久化的倒计时

```js
const useCountdownPersistence = ({seconds = 60}) => {
  // 定时器 ref
  const intervalRef = useRef(null);
  // 倒计时
  const [count, changeCount] = useState(seconds);

  useEffect(() => {
    const endTime = sessionStorage.getItem('endTime')
      ? JSON.parse(sessionStorage.getItem('endTime') || '{}')
      : null;

    const current = new Date().getTime();
    if (!!endTime) {
      if (current < endTime) {
        const diff = parseInt(((endTime - current) / 1000).toString());
        changeCount(diff);
      } else {
        // 如果已经超过了 60s
        sessionStorage.removeItem('endTime');
        changeCount(0);
        clearInterval(intervalRef.current);
      }
    } else {
      changeCount(60);
      const _endTime = new Date().getTime() + 60 * 1000;
      sessionStorage.setItem('endTime', _endTime.toString());
    }
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // 定时器，60s后重新发
  useEffect(() => {
    if (count <= 60 && count > 0) {
      intervalRef.current = setInterval(() => {
        changeCount((pre) => pre - 1);
      }, 1000);
    } else if (count <= 0) {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count]);

  const handleChallenge = async (param: any) => {
    sessionStorage.removeItem('endTime');
    // do something
  };

  return {
    count,
    handleChallenge
  }

}

```

持续更新中
