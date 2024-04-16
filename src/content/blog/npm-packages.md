---
title: 一些优秀的 npm packages 汇总
author: zhenyounide
pubDatetime: 2020-07-25T02:16:31Z
slug: npm-packages
featured: false
draft: true
tags:
  - summary
description: ""
---

## Table of contents

## [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react)

用于 React 的 Monaco Editor · 在任何 React 应用程序中使用 monaco-editor 而无需使用 webpack（或 rollup/parcel/etc）配置文件/插件；

### 介绍

Monaco editor wrapper 可与任何 React 应用程序轻松/单行集成，无需使用 webpack（或任何其他模块捆绑器）配置文件/插件。 它可以与由 create-react-app、create-snowpack-app、vite、Next.js 或任何其他应用程序生成器生成的应用程序一起使用 - 您不需要弹出或重新连接它们；

monaco-editor 是一个著名的基于 Web 技术的代码编辑器，它为 VS Code 提供支持。 这个库处理 monaco-editor 的设置过程，并提供一个干净的 API 来与任何 React 环境中的 monaco 交互

### 用法

#### 安装

`npm install @monaco-editor/react ` or `yarn add @monaco-editor/react`

#### 基本使用

```js
import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

function App() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

#### Props

Editor

| Name             | Type                       | Default      | Description                                                                                                                                                                                                                                |
| :--------------- | :------------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue     | string                     |              | Default value of the current model                                                                                                                                                                                                         |
| defaultLanguage  | string                     |              | Default language of the current model                                                                                                                                                                                                      |
| defaultPath      | string                     |              | Default path of the current model. Will be passed as the third argument to `.createModel` method - `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))`                                                                    |
| value            | string                     |              | Value of the current model                                                                                                                                                                                                                 |
| language         | enum: ...                  |              | Language of the current model (all languages that are [supported](https://github.com/microsoft/monaco-languages) by monaco-editor)                                                                                                         |
| path             | string                     |              | Path of the current model. Will be passed as the third argument to `.createModel` method - `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))`                                                                            |
| theme            | enum: "light" \| "vs-dark" | "light"      | The theme for the monaco. Available options "vs-dark" \| "light". Define new themes by `monaco.editor.defineTheme`                                                                                                                         |
| line             | number                     |              | The line to jump on it                                                                                                                                                                                                                     |
| loading          | React Node                 | "Loading..." | The loading screen before the editor will be mounted                                                                                                                                                                                       |
| options          | object                     | {}           | [IStandaloneEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html)                                                                                   |
| overrideServices | object                     | {}           | [IEditorOverrideServices ](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroverrideservices.html)                                                                                                            |
| saveViewState    | boolean                    | true         | Indicator whether to save the models' view states between model changes or not                                                                                                                                                             |
| keepCurrentModel | boolean                    | false        | Indicator whether to dispose the current model when the Editor is unmounted or not                                                                                                                                                         |
| width            | union: number \| string    | "100%"       | Width of the editor wrapper                                                                                                                                                                                                                |
| height           | union: number \| string    | "100%"       | Height of the editor wrapper                                                                                                                                                                                                               |
| className        | string                     |              | Class name for the editor container                                                                                                                                                                                                        |
| wrapperClassName | string                     |              | Class name for the editor container wrapper                                                                                                                                                                                                |
| beforeMount      | func                       | noop         | **Signature: function(monaco: Monaco) => void** <br/> An event is emitted before the editor is mounted. It gets the `monaco` instance as a first argument                                                                                  |
| onMount          | func                       | noop         | **Signature: function(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void** <br/> An event is emitted when the editor is mounted. It gets the `editor` instance as a first argument and the `monaco` instance as a second |
| onChange         | func                       |              | **Signature: function(value: string \| undefined, ev: monaco.editor.IModelContentChangedEvent) => void** <br/> An event is emitted when the content of the current model is changed                                                        |
| onValidate       | func                       | noop         | **Signature: function(markers: monaco.editor.IMarker[]) => void** <br/> An event is emitted when the content of the current model is changed and the current model markers are ready                                                       |

## [react-multi-crops](https://www.npmjs.com/package/react-multi-crops)

### 介绍

React 的多重裁剪组件，支持自定义背景图，并在此背景图上选定热区，调整热区大小，拖拽改变热区位置

### 用法

#### 安装

`npm install react-multi-crops --save `

#### 基本使用

```js
import React from "react";
import ReactDOM from "react-dom";
import MultiCrops from "react-multi-crops";
import img from "./imgs/kumamon.jpg";

class App extends React.Component {
  state = {
    coordinates: [],
  };

  changeCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    });
  };
  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    });
  };
  render() {
    return;
    <div>
      <MultiCrops
        src={img}
        width={1000}
        coordinates={this.state.coordinates}
        onChange={this.changeCoordinate}
        onDelete={this.deleteCoordinate}
      />
    </div>;
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
```

#### Props

| Prop        | Description                                                                                        | Type                                     | Default |
| ----------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------- |
| src         | Src of background image.                                                                           | string                                   | -       |
| coordinates | An array of coordinate( see the table blew), {id, x, y, width, height}.                            | array                                    | []      |
| width       | Width of background image.                                                                         | number(in pixel)                         | -       |
| height      | Height of background image.                                                                        | number(in pixel)                         | -       |
| onDraw      | A callback which hanppends when a user starts drawing a new rectangle.                             | funtion(coordinate , index, coordinates) | -       |
| onDrag      | A callback which hanppends when a user stars draging a exited rectangle.                           | funtion(coordinate , index, coordinates) | -       |
| onResize    | A callback which hanppends when a user starts resizing a exited rectangle.                         | funtion(coordinate , index, coordinates) | -       |
| onChange    | A callback which hanppends when a user starts drawing, draging or resizing a new/exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onDelete    | A callback which hanppends when a user delete a exited rectangle.                                  | funtion(coordinate , index, coordinates) | -       |
| onLoad      | The callback is triggered when the background image is loaded.                                     | onLoad(e)                                | -       |

##### coordinate

| Prop   | Description                                                                                      | Type             | Default |
| ------ | ------------------------------------------------------------------------------------------------ | ---------------- | ------- |
| id     | Unique between in coordinates array                                                              | string           | -       |
| x      | X coordinate relative to left corner(0,0) of background image. From left to right, x will go up. | number(in pixel) | -       |
| y      | Y coordinate relative to left corner(0,0) of background image. From top to bottom, y will go up. | number(in pixel) | -       |
| width  | Width of coordinate                                                                              | number(in pixel) | -       |
| height | Height of coordinate                                                                             | number(in pixel) | -       |

## [p-limit](https://www.npmjs.com/package/p-limit)

### 需求

批量发送请求，自定义请求的并发度，当执行完全部请求后，给予提示。

### 解决方案

npm中有很多实现这个功能的第三方包，比如async-pool、es6-promise-pool、p-limit，这里我直接用 p-limit

### 使用

```js
const pLimit = require("p-limit");
// 或者 import pLimit from "p-limit";

const limit = pLimit(5); // 5 表示每次发送5个请求

const input = [
  limit(() => fetchSomething("foo")),
  limit(() => fetchSomething("bar")),
  limit(() => doSomething()),
];

(async () => {
  const result = await Promise.all(input);
  console.log(result);
})();
```
