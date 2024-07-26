---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-07-26T10:00:00.400Z
title: 大宝典-React
slug: collection-react
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 170. React 中为什么要设计 Hook，为了解决什么问题

总的来说是以下三大原因：

- Component 非 UI 逻辑复用困难
  - 在类组件中，复用状态逻辑通常需要使用高阶组件（HOC）和 render props，这些模式可能会导致组件树变得复杂，难以管理和调试。Hooks 允许在函数组件中直接复用状态逻辑，使代码更简洁，更易于理解和维护。
- 组件的生命周期函数不适合 side effect 逻辑的管理
  - 类组件的生命周期方法有时很难理解和使用，特别是当需要在不同的生命周期方法中拆分逻辑时。使用 Hooks，可以将相关的逻辑更自然地组织在一起，而不是分散在不同的生命周期方法中。例如，`useEffect` Hook 可以同时处理 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 逻辑。
- 不友好的 Class Component
  - 在 Hooks 引入之前，只有类组件可以拥有状态和生命周期方法，这限制了无状态组件（函数组件）的功能。通过 Hooks，可以在函数组件中使用状态和副作用，从而充分利用函数组件的简洁性和灵活性。
  - 引入了一些额外的复杂性，例如 this 绑定问题，必须使用构造函数和继承

## 171. 组件的生命周期方法

组件的生命周期方法是指在组件的不同阶段（如挂载、更新和卸载）时自动调用的特殊方法

### 类组件的生命周期方法

类组件的生命周期方法可以分为三个主要阶段：

1. 挂载（Mounting）

   这些方法在组件实例被创建并插入 DOM 中时调用：

   - `constructor()`: 初始化状态和绑定事件处理程序。
   - `static getDerivedStateFromProps()`: 根据 props 设置状态。这个方法在初始化和更新时都会调用。
   - `componentDidMount()`: 组件挂载后调用。通常用于数据获取或订阅。

   ```jsx
   class MyComponent extends React.Component {
     constructor(props) {
       super(props);
       this.state = { count: 0 };
     }

     static getDerivedStateFromProps(props, state) {
       // 返回一个对象来更新 state，或返回 null 来不更新任何内容
       return null;
     }

     componentDidMount() {
       // 组件挂载后
       console.log("Component did mount");
     }

     render() {
       return <div>{this.state.count}</div>;
     }
   }
   ```

2. 更新（Updating）

   这些方法在组件的 props 或 state 变化时调用：

   - `static getDerivedStateFromProps()`: 同上。
   - `shouldComponentUpdate()`: 根据新的 props 和 state，决定是否重新渲染组件。返回 `true` 或 `false`。
   - `render()`: 渲染组件。
   - `getSnapshotBeforeUpdate()`: 在最新的渲染输出提交给 DOM 之前调用。它使组件能捕获 DOM 的某些信息（例如，滚动位置）。
   - `componentDidUpdate()`: 组件更新后调用。可以在此方法中进行 DOM 操作或数据获取。

   ```jsx
   class MyComponent extends React.Component {
     componentDidUpdate(prevProps, prevState, snapshot) {
       // 组件更新后
       console.log("Component did update");
     }

     getSnapshotBeforeUpdate(prevProps, prevState) {
       // 捕获一些 DOM 信息
       return null;
     }

     shouldComponentUpdate(nextProps, nextState) {
       // 决定是否重新渲染组件
       return true;
     }
   }
   ```

3. 卸载（Unmounting）

   这些方法在组件从 DOM 中移除时调用：

   - `componentWillUnmount()`: 组件卸载前调用。用于清理订阅或取消网络请求等。

   ```jsx
   class MyComponent extends React.Component {
     componentWillUnmount() {
       // 组件卸载前
       console.log("Component will unmount");
     }
   }
   ```

### 函数组件中的 Hook

在函数组件中，使用 Hook 来处理生命周期相关的逻辑。主要使用 `useEffect` Hook。

1. 挂载和更新

   - `useEffect(() => { ... }, [])`: 模拟 `componentDidMount`。空数组作为第二个参数，表示只在组件挂载时运行一次。
   - `useEffect(() => { ... })`: 模拟 `componentDidMount` 和 `componentDidUpdate`。每次组件更新时都会运行。
   - `useEffect(() => { ... }, [deps])`: 模拟 `componentDidMount` 和 `componentDidUpdate`，但只在依赖项发生变化时运行。

   ```jsx
   import React, { useState, useEffect } from "react";

   function MyComponent() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       console.log("Component did mount");
       return () => {
         console.log("Component will unmount");
       };
     }, []);

     useEffect(() => {
       console.log("Component did update");
     }, [count]);

     return <div>{count}</div>;
   }
   ```

2. 卸载

   - `useEffect(() => { return () => { ... }; }, [])`: 模拟 `componentWillUnmount`。返回的函数将在组件卸载时调用。

   ```jsx
   useEffect(() => {
     return () => {
       console.log("Component will unmount");
     };
   }, []);
   ```

## 172. 状态（state）和属性（props）

### 属性（Props）

- **只读**：子组件不能修改 `props`。
- **从父组件传递到子组件**：父组件通过 JSX 语法传递属性。
- **用于数据传递和配置**：适用于传递数据和配置组件行为。

### 状态（State）

- **可变**：组件可以通过 `setState` 或 `useState` 更新状态。
- **组件私有**：状态是组件私有的，其他组件无法直接访问或修改。
- **驱动渲染**：状态变化会触发组件重新渲染。

**区别和用法**

- **数据来源**：`props` 是从父组件传递的数据，`state` 是组件自身管理的数据。
- **可变性**：`props` 是不可变的，只能由父组件传递和更新；`state` 是可变的，可以通过组件自身的方法更新。
- **用途**：`props` 用于传递数据和配置子组件的行为，`state` 用于管理组件内部的动态数据。

## 173. 高阶组件（Higher-Order Component）

接受一个组件作为参数并返回一个新组建。可用于封装通用的逻辑和行为。

- 定义

  高阶组件本质上是一个函数，接受一个组件作为参数并返回一个新的组件：

  ```jsx
  const withExtraProps = WrappedComponent => {
    return class extends React.Component {
      render() {
        return <WrappedComponent extraProp="extraValue" {...this.props} />;
      }
    };
  };
  ```

- 用途

  1. **代码复用和逻辑抽象**：HOC 可以将共享的逻辑抽象出来，应用到多个组件上，避免代码重复。
  2. **状态提升**：可以通过 HOC 提升状态到更高层次的组件，从而使状态和行为在不同组件之间共享。
  3. **条件渲染**：HOC 可以根据条件决定是否渲染某个组件。
  4. **操作 props**：可以在 HOC 中修改、过滤或添加新的 props。

- 注意事项

  1. **不要在 HOC 中修改原始组件**：HOC 应该通过组合来增强组件，而不是直接修改组件的实现。
  2. **静态方法不会被复制**：HOC 返回的新组件不会继承被包装组件的静态方法。可以使用 `hoist-non-react-statics` 库来复制静态方法。
  3. **Ref 转发**：HOC 中的 ref 不会自动传递到被包装组件。可以使用 `React.forwardRef` 来处理 ref 转发。
  4. **调试信息**：使用 `displayName` 为高阶组件设置调试信息，以便在 React 开发者工具中更容易识别。

在 React 引入 Hook 之前，HOC 和 Render Props 是复用逻辑的主要方式。Hook 现在提供了另一种方式来复用逻辑：

- **Hook 更加灵活**：Hook 可以在函数组件中使用，提供了更直接和细粒度的状态和副作用管理。
- **HOC 仍然有用**：对于某些情况下，特别是与类组件配合使用时，HOC 仍然是有效的模式。

## 174. 受控组件和非受控组件

主要区别在于状态的管理方式。

### 受控组件

受控组件是指表单输入的值由 React 组件的状态管理。每当表单元素的值发生变化时，都会触发一个事件处理函数，该函数会更新 React 组件的状态，从而重新渲染组件。

**特点：**

1. 表单元素的值被存储在组件的状态中。
2. 组件的状态被视为表单元素的唯一数据源。
3. 表单元素的值随组件状态的改变而改变。

### 非受控组件

非受控组件是指表单输入的值由 DOM 自身管理，而不是由 React 组件的状态管理。可以通过 `ref` 获取表单元素的值。

**特点：**

1. 表单元素的值存储在 DOM 中。
2. 不需要每次输入变化时都更新组件的状态。
3. 通过 `ref` 来访问表单元素的值。

**总结**

- 如果需要对用户输入进行实时验证、格式化或其他处理，使用受控组件。
- 如果表单较为简单或性能要求较高，可以使用非受控组件。

## 175. 展示组件（Presentational Component）和容器组件（Container Component）

### 展示组件

- 主要关注 UI 的呈现和展示，负责渲染和显示数据
- 通常是无状态的（stateless），接受来自容器组件的 props，并根据 props 渲染 UI
- 不关系数据的来源和逻辑处理，只负责展示和交互
- 通常是可复用的

### 容器组件

- 主要关注数据的获取和逻辑处理，负责管理数据和状态
- 通常是有状态的（stateful），可以包含自己的 state，并通过 props 传递给展示组件
- redux 等状态管理方案
- 可包含多个展示组件，负责协调他们之间的交互和数据流动

## 176. 类组件（Class Component）和函数式组件（Functional Component）

在 React 中，类组件和函数式组件是构建用户界面的两种主要方式。随着 React Hook 的引入，函数式组件变得越来越流行。

### 类组件

使用 ES6 类语法定义的组件

1. **状态管理**：类组件使用 `this.state` 和 `this.setState` 来管理状态。
2. **生命周期方法**：类组件有多个生命周期方法，如 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`，用于在组件的不同阶段执行操作。
3. **`this` 绑定**：在事件处理器中，需要显式地绑定 `this`，或者使用箭头函数来避免手动绑定。

### 函数式组件

JavaScript 函数定义的组件，通常被称为无状态组件，但随着 Hook 的引入，它们也可以使用状态和其他 React 特性

1. **简洁**：函数式组件通常比类组件更简洁，不需要 `this` 关键字。
2. **Hooks**：通过使用 Hooks（如 `useState` 和 `useEffect`），函数式组件可以管理状态和副作用。
3. **无生命周期方法**：没有显式的生命周期方法，所有副作用逻辑都通过 `useEffect` 等 Hook 处理。

**对比**

1. **语法和简洁性**：

   - 类组件：需要使用 `class` 语法，`constructor` 和 `this` 绑定，代码相对冗长。
   - 函数式组件：更简洁，不需要 `this` 绑定，直接使用函数定义。

2. **状态管理**：

   - 类组件：使用 `this.state` 和 `this.setState` 来管理状态。
   - 函数式组件：使用 `useState` Hook 来管理状态。

3. **生命周期方法**：

   - 类组件：使用生命周期方法（如 `componentDidMount`、`componentDidUpdate`）来处理副作用。
   - 函数式组件：使用 `useEffect` Hook 来处理副作用。

4. **性能**：

   - 函数式组件：由于没有 `this` 绑定和生命周期方法的开销，函数式组件通常性能更好。
   - 类组件：相对性能稍差，尤其是在使用大量生命周期方法时。

5. **代码复用**：

   - 函数式组件：使用自定义 Hook 更容易复用逻辑。
   - 类组件：逻辑复用相对困难，需要使用高阶组件（HOC）或 Render Props。

## 177. 如何划分技术组件和业务组件

在 React 应用中，划分技术组件（也称为通用组件）和业务组件（也称为特定组件）是保持代码库整洁、模块化和可维护的关键步骤。以下是这两种组件的定义以及如何进行划分的指导原则。

### 技术组件（Technical Components）

技术组件是那些可以在多个项目或应用中重复使用的通用组件。它们通常是无状态的或仅包含最小状态，并且不依赖于具体的业务逻辑。

特点：

1. **通用性**：可以在不同项目中复用，不包含特定业务逻辑。
2. **独立性**：不依赖于具体应用的上下文，通常通过 `props` 接受数据和回调函数。
3. **简单性**：尽量保持简单，关注单一功能。

示例：

- 按钮组件（Button）
- 输入框组件（Input）
- 模态框组件（Modal）
- 表格组件（Table）

### 业务组件（Business Components）

业务组件是那些特定于应用程序业务逻辑的组件。它们通常包含状态和处理特定业务逻辑，依赖于应用的上下文。

特点：

1. **业务逻辑**：包含特定的业务逻辑，直接与应用的业务需求相关。
2. **状态管理**：通常包含状态和副作用，使用 Redux 或 Context API 等状态管理工具。
3. **依赖性**：依赖于具体应用的上下文和数据结构。

示例：

- 用户表单组件（UserForm）
- 订单列表组件（OrderList）
- 产品详情组件（ProductDetails）

**划分原则**

1. **职责单一原则（Single Responsibility Principle）**：每个组件只做一件事。如果组件变得复杂，考虑拆分成更小的技术组件和业务组件。
2. **通用与特定分离**：将通用的 UI 元素和功能抽象为技术组件，将具体业务逻辑和状态管理放在业务组件中。
3. **复用性**：技术组件应设计得尽可能复用，而业务组件则针对具体的业务需求进行优化。
4. **依赖管理**：技术组件应尽量减少对应用上下文的依赖，业务组件可以依赖应用的上下文和状态管理工具。
5. **自上而下设计**：从应用的高层次架构开始设计，将通用部分抽象出来作为技术组件，再逐步设计具体的业务组件。

## 178. 什么是 React 中的上下文（Context），有什么作用

React 的 Context API 是一个强大的工具，用于在组件树中共享数据，而不必通过 props 一层一层地传递。它非常适合用于共享全局数据，例如当前的用户身份、主题、语言设置等。

Context 包含三个主要部分：创建 Context、提供者（Provider）和消费者（Consumer）。

1. 创建 Context

   首先使用 `React.createContext` 创建一个 Context 对象。

   ```jsx
   import React from "react";

   const MyContext = React.createContext();
   ```

2. 提供者（Provider）

   ```jsx
   const MyProvider = ({ children }) => {
     const value = { name: "Alice", age: 25 };
     return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
   };
   ```

3. 消费者（Consumer）

   ```jsx
   import React, { useContext } from "react";

   const MyComponent = () => {
     const value = useContext(MyContext);
     return (
       <div>
         <p>Name: {value.name}</p>
         <p>Age: {value.age}</p>
       </div>
     );
   };
   ```

**注意事项**

1. **避免过度使用**：虽然 Context 很强大，但它不是状态管理的全能工具。对于局部状态，依然推荐使用组件自身的状态或通过 props 传递数据。
2. **性能优化**：每次 Provider 的 `value` 发生变化时，所有消费该 Context 的组件都会重新渲染。可以使用 `useMemo` 优化传递给 Provider 的 `value`，以避免不必要的重新渲染。
3. **嵌套使用**：当应用变得复杂时，可能需要多个 Context，可以将它们嵌套使用，但要注意避免过多嵌套导致的复杂性。

通过合理使用 React 的 Context API，可以使数据传递和状态管理变得更加简洁和高效，提高应用的可维护性。

**作用**

1. **避免 Props Drilling**：在组件树的多个层级之间传递数据时，通常需要通过每一层组件的 `props` 传递数据，这被称为 "props drilling"。Context 可以避免这种情况，简化组件间的通信
2. **全局状态管理**：适用于需要在应用中多个组件之间共享的全局数据。
3. **配置和设置**：可以用于提供一些全局的配置信息，比如主题（主题颜色、字体大小等）、认证状态等。

## 179. React 是 mvvm 框架吗

React 通常不被认为是一个严格的 MVVM（Model-View-ViewModel）框架。虽然它有些特性和 MVVM 模式相似，但 React 更准确地描述为一个用于构建用户界面的库，而不是一个完整的框架。

### MVVM

MVVM 是一种软件架构模式，包含以下三个主要部分：

1. **Model（模型）**：表示应用程序的数据和业务逻辑。
2. **View（视图）**：表示用户界面，负责显示数据。
3. **ViewModel（视图模型）**：充当 Model 和 View 之间的中介，处理 View 的交互逻辑，并更新 Model 和 View。

在 MVVM 模式中，ViewModel 包含数据绑定逻辑，使得 View 和 Model 之间的同步变得自动化和更简便。

### React 的特点

1. **组件化**：通过组件来构建用户界面，每个组件都是一个独立的单元，可以管理自己的状态和逻辑。
2. **声明式**：React 使用声明式语法来描述用户界面，开发者只需声明界面在不同状态下的样子，React 会负责将这些状态转换为实际的 DOM 操作。
3. **虚拟 DOM**：通过虚拟 DOM 提高性能，React 会在内存中创建一个虚拟 DOM 树，当状态发生变化时，计算最小的 DOM 操作，并应用到实际 DOM 上。

### React VS MVVM

虽然 React 的组件可以被看作是 View 和 ViewModel 的结合体，但它并不完全符合 MVVM 模式的定义：

1. **Model**：在 React 中，数据通常由组件的状态（state）或通过状态管理工具（如 Redux、MobX）来管理。这个部分可以视为 MVVM 中的 Model。

2. **View**：React 组件的 JSX 模板可以看作 MVVM 中的 View。React 组件描述了界面在不同状态下的样子。

3. **ViewModel**：在传统的 MVVM 中，ViewModel 负责处理用户输入并更新 Model 和 View。在 React 中，组件自身包含了这一部分的逻辑。组件既处理用户交互（事件处理函数），也更新状态，并根据状态变化重新渲染 UI。这种方式可以看作是将 ViewModel 的职责内聚到了组件内部。

在一个典型的 MVVM 框架中，如 Vue.js，可能会有这样的代码：

```html
<!-- View -->
<div id="app">
  <input v-model="message" />
  <p>{{ message }}</p>
</div>

<script>
  // ViewModel
  new Vue({
    el: "#app",
    data: {
      message: "Hello Vue!",
    },
  });
</script>
```

在 React 中，实现类似功能的代码如下：

```jsx
import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("Hello React!");

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <p>{message}</p>
    </div>
  );
}

export default App;
```

可以看出，虽然两者实现的功能相似，但 React 中的实现方式并不符合传统的 MVVM 模式。React 更加注重组件化、声明式编程和单向数据流，而不是严格的视图和视图模型的分离。

## 180. React 如何实现 mvvm

## 181. Redux 主要解决什么问题。及其优缺点

## 182. React 性能优化方案，所关联周期函数

## 183. 虚拟 DOM 的意义

## 184. React DOM Diff 算法

## 185. 关于 Fiber 架构

## 186. 关于 Flux

## 187. React 项目脚手架

## 188. React 组件可请求数据生命周期钩子

## 189. refs 的作用

## 190. key 在渲染列表时的作用

## 191. 如何使用 useState Hook 来管理状态

## 192. 如何使用 useEffect Hook 来执行副作用操作

## 193. 如何使用自定义 Hook 来共享逻辑
