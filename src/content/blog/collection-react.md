---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-07-29T10:00:00.400Z
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

在 React 中，你可以使用以下方法来实现类似 MVVM 的架构：

- 使用状态管理库：React 可以与状态管理库（如 Redux、MobX、React Context 等）结合使用，以实现集中化的状态管理。这些库可以帮助你在模型层和视图层之间进行数据传递和状态管理，从而实现 MVVM 的一部分。
- 使用双向数据绑定库：有一些第三方库（如 mobx-react-lite、reactive-react 等）提供了双向数据绑定的能力它们可以使 React 组件中的数据与视图保持同步。通过使用这些库，你可以更接近 MWM 模式中的双向数据绑定概念。
- 自定义视图模型：你可以在 React 中定义自己的视图模型类或对象，将数据逻辑和转换逻辑封装到这些视图模型中。通过将视图模型与 React 组件结合使用，你可以实现数据的射和处理逻辑。

需要注意的是，React 本 身是一个非常灵活的库，你可以选择与其他库或模式结合使用，以满足你的应用程序需求。MVVM 只是一种软件架构模式，具体的实现方式可以根据项目的特定要求和团队的偏好进行调整。

## 181. Redux 主要解决什么问题，及其优缺点

Redux 是一个 JavaScript 状态管理库，主要用于管理应用程序的全局状态。它常用于大型应用程序，以确保状态在整个应用中保持一致

1. **状态管理**：在大型应用中，管理和维护组件之间共享的状态可能会变得复杂。Redux 提供了一个中心化的存储，使得状态管理更加清晰和可预测。
2. **状态一致性**：通过使用单一的状态树，Redux 确保了状态的一致性，避免了因状态不同步导致的 bug。
3. **跨组件通信**：通过使用 Redux，不需要在组件层次结构中传递回调函数和状态，简化了跨组件的通信。

**缺点**

1. **样板代码多**：Redux 的设置和使用通常需要编写大量的样板代码（boilerplate code）。
2. **复杂性**：对于小型项目，Redux 可能显得过于复杂，并不总是必要的。在这种情况下，使用 React 的内置状态管理（如 `useState` 和 `useReducer`）可能更为简便。
3. **学习曲线**：对于初学者来说，理解 Redux 的理念（如 actions、reducers 和 store）可能需要一定的学习时间和经验积累。
4. **性能问题**：在处理大量状态更新时，如果没有正确优化，Redux 可能会带来性能上的开销。

总的来说，Redux 是一个功能强大的状态管理库，适用于大型应用和复杂状态管理需求，但在选择是否使用 Redux 时，需要权衡其复杂性和项目的实际需求。

## 182. React 性能优化方案，所关联周期函数

在 React 中进行性能优化，确保应用程序运行顺畅并避免不必要的渲染是很重要的

1. **使用 React.memo 和 PureComponent**

   - **React.memo**: 用于函数组件，防止组件在不必要的情况下重新渲染。如果组件的 props 没有变化，`React.memo` 会缓存组件的上一次渲染结果并返回，从而避免重新渲染。

     ```javascript
     const MyComponent = React.memo(function MyComponent(props) {
       // 渲染逻辑
     });
     ```

   - **PureComponent**: 用于类组件，类似于 `React.memo`。`PureComponent` 会自动执行浅比较来决定是否需要重新渲染组件。

     ```javascript
     class MyComponent extends React.PureComponent {
       render() {
         // 渲染逻辑
       }
     }
     ```

2. **避免匿名函数和对象字面量**

   在 render 方法中避免使用匿名函数和对象字面量，因为它们会在每次渲染时创建新的引用，导致不必要的重新渲染。

   ```javascript
   // 不推荐
   <button onClick={() => doSomething()}></button>;

   // 推荐
   const handleClick = () => doSomething();
   <button onClick={handleClick}></button>;
   ```

3. **使用 useCallback 和 useMemo**

   - **useCallback**: 返回一个 memoized 回调函数，避免在每次渲染时创建新的函数实例。

     ```javascript
     const handleClick = useCallback(() => {
       // 点击逻辑
     }, [dependencies]);
     ```

   - **useMemo**: 返回一个 memoized 值，避免在每次渲染时执行昂贵的计算。

     ```javascript
     const computedValue = useMemo(() => {
       return expensiveComputation(dependencies);
     }, [dependencies]);
     ```

4. **shouldComponentUpdate 和 getDerivedStateFromProps**

   - **shouldComponentUpdate**: 类组件中用于控制组件是否需要重新渲染。返回 `false` 可以阻止不必要的渲染。

     ```javascript
     shouldComponentUpdate(nextProps, nextState) {
       // 自定义逻辑，返回 true 或 false
     }
     ```

   - **getDerivedStateFromProps**: 类组件中用于在每次渲染之前更新组件的 state。

     ```javascript
     static getDerivedStateFromProps(nextProps, prevState) {
       // 返回新的 state 或 null
     }
     ```

5. **React.lazy 和 Suspense**

   通过 `React.lazy` 实现组件的代码分割，仅在需要时才加载组件，从而减少初始加载时间。

   ```javascript
   const LazyComponent = React.lazy(() => import("./LazyComponent"));

   function MyComponent() {
     return (
       <React.Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </React.Suspense>
     );
   }
   ```

6. **虚拟化长列表**

   使用库如 `react-window` 或 `react-virtualized` 来只渲染视口中的列表项，而不是一次性渲染所有项。

   ```javascript
   import { FixedSizeList as List } from "react-window";

   function MyComponent() {
     return (
       <List height={500} itemCount={1000} itemSize={35} width={300}>
         {({ index, style }) => <div style={style}>Row {index}</div>}
       </List>
     );
   }
   ```

7. **适当使用 useEffect 和 useLayoutEffect**

   避免不必要的副作用，确保在依赖项变化时才执行副作用。同时，`useLayoutEffect` 可以在 DOM 变更后同步执行副作用，避免视觉不一致。

   ```javascript
   useEffect(() => {
     // 副作用逻辑
     return () => {
       // 清理逻辑
     };
   }, [dependencies]);
   ```

8. **减少 Re-render**

   尽量减少父组件的重新渲染，因为每次父组件渲染时，所有子组件也会重新渲染。可以通过将状态提升到更高层次或使用 `React.memo` 和 `useCallback` 等方法来优化。

9. **使用 Key 正确标记列表项**

   在渲染列表时，为每个列表项提供唯一的 `key` 属性，以确保 React 能够高效地更新和重新排列列表项。

   ```javascript
   {
     items.map(item => <ItemComponent key={item.id} item={item} />);
   }
   ```

10. 使用 `React-Fragment` 来避免不必要的 DOM 节点，可减少 DOM 节点数量

## 183. 虚拟 DOM 的意义

1. **减少实际的 DOM 操作**: 通过比较新旧虚拟 DOM 树的差异，React 可以确定需要更新的部分，并生成最
   小化的 DOM 操作序列。这样可以减少实际的 DOM 操作次数，提高性能。
2. **批量更新**:React 会将所有需要更新的 DOM 操作批量执行，从而避免了频繁的 DOM 操作，提高了性能。
3. **跨平台兼容性**: 虚拟 DOM 是一个轻量级的 JavaScript 对象，可以在不同的平台上运行，例如浏览器、移动设备和服务器。这使得 React 可以在多个环境中使用相同的代码和逻辑。
4. **更好的开发体验**: 虚拟 DOM 使得开发者可以使用类似于 HTML 的标记语言来描述 UI，而不需要直接操作 DOM。这简化了开发过程，并提供了更好的开发体验。

## 184. React DOM Diff 算法

React 的 DOM Diff 算法，也被称为协调（reconciliation）算法，是 React 用来高效更新 DOM 的核心机制。这个算法通过比较当前树和更新后的树来确定最小的变更集，并应用这些变更以更新实际的 DOM。

以下是 React DOM Diff 算法的主要步骤和关键点：

1. 基于同级节点的比较

   React 通过同级比较来减少复杂度，而不是进行深度比较。只有在同一级别的节点之间进行比较，避免了跨层级比较带来的复杂度。

2. 节点类型的比较

   - **相同类型的元素**：如果两个节点类型相同（例如都是 `<div>`），React 会保留 DOM 节点，仅对属性进行更新。

     ```javascript
     // 示例
     <div className="old" />
     <div className="new" />
     ```

   - **不同类型的元素**：如果两个节点类型不同（例如 `<div>` 变成 `<span>`），React 会销毁旧的节点及其子节点，并创建新的节点。

     ```javascript
     // 示例
     <div />
     <span />
     ```

   - **组件类型相同**：如果是相同的 React 组件类型，React 会更新该组件实例，并更新子树。

     ```javascript
     // 示例
     <MyComponent key="1" />
     ```

   - **组件类型不同**：如果组件类型不同，React 会卸载旧组件并挂载新组件。

     ```javascript
     // 示例
     <MyComponent key="1" />
     <AnotherComponent key="1" />
     ```

3. Key 属性的使用

   在列表渲染中，React 使用 `key` 属性来识别每个元素的唯一性，从而高效地重新排列列表项并最小化重绘。

   - **Key 的匹配**：如果 `key` 属性匹配，React 会认为元素是相同的，并复用现有元素，仅更新其属性。

     ```javascript
     // 示例
     <ul>
       {items.map(item => (
         <li key={item.id}>{item.name}</li>
       ))}
     </ul>
     ```

   - **Key 的不匹配**：如果 `key` 属性不匹配，React 会销毁旧元素并创建新元素，尽管两者可能在结构上相似。

4. 子节点的比较

   React 会对每个父节点的子节点进行递归比较，通过 `key` 属性和类型来确定节点是否需要更新、添加或删除。

   - **删除多余节点**：如果新子节点少于旧子节点，React 会删除多余的节点。

   - **添加新节点**：如果新子节点多于旧子节点，React 会添加新的节点。

   - **重排序**：如果 `key` 属性变化，React 会重新排列子节点，以匹配新子节点的顺序。

5. 深度优先遍历

   React 采用深度优先遍历的方式进行节点比较，从树的根节点开始逐层向下比较，并根据需要进行更新。这种方式有助于及时处理嵌套子组件的更新，确保 UI 的一致性。

6. 并行化和批量更新

   React 通过批量更新和并行化处理来优化性能。在一次事件循环中收集多个状态变化，然后一次性进行 DOM 更新，减少重绘和回流。

## 185. 关于 Fiber 架构

- Fiber 是 React 中一种新的架构，它用于实现增量式的、可中断的虚拟 DOM diff 过程。Fiber 的目标是改进 React 的性能和用户体验，使得 React 应用程序更加流畅和响应。
- 在 React 的旧版本中，虚拟 DOM diff 过程是一个递归的过程，它会一直执行直到完成，期间无法中断这可能会导致长时间的 JavaScript 执行，从而阻塞主线程，造成页面的卡顿和不流畅的用户体验。
- 为了解决这个问题，React 引|入了 Fiber 架构。Fiber 将整个虚拟 DOM diff 过程分为多个小任务，每个任务称为一个 Fiber 节点。这些 Fiber 节点被组织成一个树状结构，称为 Fiber 树。
- Fiber 树可以被中断和恢复，这意味着在执行 Fiber 树的 diff 过程时，可以在任意时刻中断当前任务，并优先执行其他任务。这样可以使得应用程序更加灵活地响应用户的交互和其他优先级的任务，提高性能和响应性。
- 通过 Fiber 架构，React 可以根据任务的优先级动态地调整任务的执行顺序，从而更好地控制 JavaScript 的执行。这使得 React 应用程序可以在不阻塞主线程的情况下进行虚拟 DOM diff，减少页面的卡顿和提高用户体验。
- 总而言之，Fiber 是 React 中一种新的架构，用于实现增量式的、可中断的虚拟 DOM diff 过程。它通过将 diff 过程分为多个小任务，并根据优先级动态地调整任务的执行顺序，提高 React 应用程序的性能和响应性。

## 186. 关于 Flux

一种架构思想，用于构建前端应用程序的数据流管理，解决传统 MVC 架构在复杂应用中数据流管理变得困难的问题。
Flux 架构的核心思想是单向数据流，划分为四个主要部分：

1. View（视图）: 负责展示用户界面，并将用户的操作转发给 Action 进行处理。
2. Action（动作）: 定义应用程序中可能发生的各种操作，例如点击按钮、输入文本等。当用户在 View 上执行操作时，View 会触发相应的 Action。
3. Dispatcher（派发器）: 负责接收 Action 并将其分发给注册的 Store。
4. Store（数据仓库）: 存储应用程序的数据，并定义数据的更新逻辑。当 Dispatcher 将 Action 分发给 Store 时，Store 会根据 Action 的类型更新数据，并触发事件通知 View 进行更新。

Flux 架构的关键是单向数据流，当用户在 View 上执行操作时，View 会触发相应的 Action，Action 会通过 Dispatcher 被分发给 Store，Store 根据 Action 的类型更新数据，并触发事件通知 View 进行更新。这样，数据的流动是单向的，没有循环依赖和复杂的数据交互。通过这种单向数据流的方式，Flux 架构使得应用程序的数据流管理更加清晰和可预测。避免了数据的混乱和不一致，使得应用程序的开发和维护更加简单和可靠。

## 187. React 项目脚手架

1. **Create React App**:Create React App 是官方推荐的 React 项目脚手架，它基于 Webpack 和 Babel，可以快速创建 React 应用程序的基本结构和配置文件。Create React App 提供了一套简单易用的命令行工具，可以快速创建、运行和打包 React 应用程序。
2. **Next.js**:Next.js 是一个基于 React 的轻量级服务器端渲染框架，它提供了一套简单易用的 API 和命令行工具，可以快速创建具有服务器端渲染功能的 React 应用程序。Next.js 还提供了一些高级特性，例如自动代码分割、静态文件服务、CSS 模块化等。
3. **Gatsby**:Gatsby 是一个基于 React 的静态站点生成器，它可以快速创建高性能、可靠的静态网站。
   Gatsby 使用 React 和 GraphQL 构建静态网站，可以通过插件和主题扩展功能。
4. **React Boilerplate**:React Boilerplate 是一个 React 项目脚手架，它提供了一套完整的 React 应用程序开发框架，包括基本结构、配置文件、测试、代码分割、性能优化等功能。React Boilerplate 还提供了-些常用的 React 库和工具，例如 Redux、React Router、Webpack 等，

## 188. React 组件可请求数据生命周期钩子

- `componentDidMount`: 组件挂载后立即调用，在此方法中可以发起请求，并更新组件的状态或 props。
- `componentDidUpdate`: 组件更新后立即调用，在此方法中可以根据 props 或 state 的变化发起请求。

## 189. refs 的作用

在 React 中，refs（引用）是用于访问组件或 DOM 元素的方法。

1. **访问组件实例**: 通过 refs，可以获取到组件的实例，从而可以直接调用组件的方法或访问组件的属性这在某些情况下非常有用，例如需要手动触发组件的某个方法或获取组件的状态。
2. **访问 DOM 元素**: 通过 refs，可以获取到 React 组件中的 DOM 元素，从而可以直接操作 DOM，例如改变样式、获取输入框的值等。这在需要直接操作 DOM 的场景下非常有用，但在 React 中应该尽量避免直接操作 DOM，而是通过状态和属性来控制组件的渲染。

## 190. key 在渲染列表时的作用

- **识别每个列表项的唯一性**: key 属性用于帮助 React 区分列表中的每个元素。React 使用 key 属性来跟踪列表中的每个元素，以便在进行列表更新时能够准确地识别每个元素。如果没有指定 key 属性或 key 属性不唯一，React 可能会出现警告或产生不正确的渲染结果，
- **提高列表更新的性能**: key 属性可以帮助 React 在进行列表更新时，识别出哪些元素是新添加的、些元素是已存在的、哪些元素是已删除的。通过 key 属性，React 可以更加高效地进行 DOM 操作，减少不必要的重渲染。
- **保持元素的稳定性**:key 属性可以帮助 React 保持元素的稳定性。当列表中的元素顺序发生变化时，如果每个元素都有一个稳定的 key 属性，React 可以更准确地识别出哪些元素是移动的，哪些元素是新增的，哪些元素是删除的，从而只进行必要的 DOM 操作，提高性能。

## 191. 如何使用 useState Hook 来管理状态

## 192. 如何使用 useEffect Hook 来执行副作用操作

## 193. 如何使用自定义 Hook 来共享逻辑
