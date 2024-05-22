---
author: zhenyounide
pubDatetime: 2024-05-22T15:40:00Z
title: "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node"
slug: how-to-fix-removeChild-error
featured: true
draft: false
tags:
  - bug
  - problems
  - react
description: ""
---

## Table of contents

<!-- 隐藏的区域 -->

> [related issue on github](https://github.com/facebook/react/issues/11538)

## 问题

![image](/faile-to-remove-child.png)

一句话总结：react 中如果父节点下存在多个子节点且其中一个子节点是裸露的 text（没有使用 `<span>` 包裹），且这个文本的显隐由 state 控制，这种情况下如果用户开启了 Google Translate（或者其他翻译的插件），就会抛出如上图所示的异常。

本文将就 Google Translate 分析这一问题。

## 分析

### What Google Translate was doing under the hood?

```js
// Get the text node "checked"
const myEl = document.querySelector("div > div > div").childNodes[0];

// Create an arbitrary font element to replace it with
const fontEl = document.createElement("font");

myEl.parentElement.insertBefore(fontEl, myEl);
myEl.parentElement.removeChild(myEl);
```

简而言之，Google Translate 找到需要翻译的文本后，用 `insertBefore` 方法在其父节点下插入 `font`，再用 `removeChild` 移除该父节点下的原 text；

举个栗子：

```html
<!-- original -->
<div>no choice</div>

<!-- translated: -->
<div>
  <!-- add: -->
  <font style="vertical-align: inherit;">
    <font style="vertical-align: inherit;">没机会</font>
  </font>
  <!-- <div>no choice</div> is removed -->
</div>
```

**translate mock:**

```js
// Get text nodes in the div
const children = document.getElementById("parent").childNodes;
for (const myEl of children) {
  if (myEl.nodeType === Node.TEXT_NODE) {
    // Replace a text node with a font element with translated data
    const fontEl = document.createElement("font");
    fontEl.textContent = myEl.data; // translated text

    myEl.parentElement.insertBefore(fontEl, myEl);
    myEl.parentElement.removeChild(myEl);
  }
}
```

### When an exception is thrown?

如果 text 是有条件的显示（比如 state 控制），且 text 不是其父节点的唯一子节点（如果是唯一节点，则不会抛出异常）的时候，react 会 throw error.

```tsx
// Case 1
<div>
  {condition && 'Welcome'}
  <span>Something</span>
</div>

// Doesn't throw
<div>{condition && 'Welcome'}</div>

// Case 2
<div>{condition && <span>Something</span>} Welcome</div>
```

**结合 google translate**

```tsx
// original
<div id='test'>
  <div id='parent'>
    {condition && 'Welcome'}
    <span>Something</span>
  </div>
  <button>toggle</button>
</div>

// when condition true
<div id="test">
  <div id='parent'>
    Welcome
    <span>Something</span>
  </div>
  <button>toggle</button>
</div>

// when condition false
<div id="test">
  <div id='parent'>
    <span>Something</span>
  </div>
  <button>toggle</button>
</div>

// translated:
// when condition true
<div id="test">
  <div id='parent'>
    <font style="vertical-align: inherit;">
      <font style="vertical-align: inherit;">欢迎</font>
    </font>
    <span>
      <font style="vertical-align: inherit;">
        <font style="vertical-align: inherit;">一些东西</font>
      </font>
    </span>
  </div>
  <button>
    <font style="vertical-align: inherit;">
      <font style="vertical-align: inherit;">切换</font>
    </font>
  </button>
</div>
```

**toggle condition 将会触发以下的流程：**

```tsx
<div id="test">
  <div id="parent">
    {flag && "Welcome"}
    <span>Something</span>
  </div>
  <button
    onClick={() => {
      // remove "welcome"
      setCondition(false);
    }}
  >
    toggle
  </button>
</div>
```

- for react : elementWaitForRemove is 'welcome'
- but now, Google Translate replace 'welcome' with `<font><font>welcome</font></font>`
- 'welcome' is not the childNode of parent node, so react throw error;

---

- if elementWaitForRemove is `<span>welcome</span>`
- Google Translate replace `<span>welcome</span>` with `<span><font><font>welcome</font></font></span>`
- `<span>` is still a childNode of parent node, so react won't throw error

## 解决

1. skip content translation

   ```html
   <html translate="no">
     <!-- ... -->
   </html>
   ```

2. be careful to wrap all text interpolation expressions with a layer of `<span>`

   using `<></>` doesn't work.
   for example, wrap those text nodes with `<span>` so that nodes referenced by React will stay in the DOM tree even though their contents are replaced with `<font>` tags.

```tsx
// A workaround for case 1
<div>
  {condition && <span>Welcome</span>}
  <span>Something</span>
</div>

 // A workaround for case 2
 <div>
   {condition && <span>Something</span>}
   <span>Welcome</span>
 </div>
```

3. before rendering your application, run this code

   但这难免会让你的网站变慢，按需自取：

```js
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) {
        console.error(
          "Cannot remove a child from a different parent",
          child,
          this
        );
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.error(
          "Cannot insert before a reference node from a different parent",
          referenceNode,
          this
        );
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}
```
