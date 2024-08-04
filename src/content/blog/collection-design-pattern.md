---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-08-04T11:13:47.400Z
title: 大宝典-设计模式
slug: collection-design-pattern
featured: false
draft: false
tags:
  - docs
  - summary
description: 温故知新
---

## Table of contents

## 229. 设计模式是什么

设计模式（Design Patterns）是软件工程中的一个重要概念，指的是在软件开发过程中，为了应对特定问题而总结出来的一套可重复使用的解决方案，帮助开发者更高效地解决常见的软件设计问题，提升代码的可维护性和可扩展性。

## 230. 设计模式的意义

1. **代码复用**：设计模式提供了经过验证的解决方案，这些解决方案可以在不同的项目中重复使用。通过使用设计模式，开发人员可以避免重复发明轮子，提高开发效率。

2. **代码可读性和可维护性**：设计模式为常见问题提供了标准化的解决方案，这使得代码更易于理解和维护。

3. **提高开发效率**：设计模式为开发人员提供了一套可行的、经过验证的解决方案，减少了思考和设计的时间。开发人员可以专注于实现业务逻辑，而不是从零开始设计解决方案。

4. **提高系统的灵活性和可扩展性**：设计模式鼓励松耦合和高内聚，这使得系统更加灵活，能够更容易地进行扩展和修改。

5. **促进团队合作**：使用设计模式可以在团队中建立共同的语言和理解，促进团队成员之间的沟通和协作。

6. **解决复杂问题**：设计模式提供了应对复杂设计问题的解决方案，帮助开发人员在面对复杂的系统设计时，有一套现成的工具和方法，可以更加有条不紊地进行设计和实现。

7. **最佳实践**：设计模式是众多开发人员在长期实践中总结出来的最佳实践，代表了业界的成熟经验。

## 231. 什么是 MVC

MVC 模式将应用程序分为三个主要组件：Model、View 和 Controller。

1. **Model**：负责应用程序的数据和业务逻辑。它直接管理数据、逻辑和规则。
2. **View**：负责显示数据。它接收来自 Model 的数据，并将其呈现给用户。
3. **Controller**：充当 Model 和 View 之间的中介。它处理用户输入，从 View 获取输入并传递给 Model，然后从 Model 获取数据并更新 View。

**工作流程**：

- 用户通过 View 进行操作。
- Controller 捕捉用户的操作，并更新 Model。
- Model 发生变化后，通知 View 进行更新。

**优点**：

- 清晰的分离关注点，便于团队合作。
- 提高代码的可维护性和可测试性。

**缺点**：

- 对于复杂应用，Controller 可能变得过于庞大和复杂。

## 232. 什么是 MVVM

MVVM 模式扩展了 MVC 模式，特别是在支持数据绑定的前端框架中很流行。它将应用程序分为 Model、View 和 ViewModel。

1. **Model**：与 MVC 模式中的 Model 类似，负责数据和业务逻辑。
2. **View**：与 MVC 模式中的 View 类似，负责展示数据。
3. **ViewModel**：介于 Model 和 View 之间，处理界面的逻辑。ViewModel 通过数据绑定（通常是双向绑定）与 View 进行通信。

**工作流程**：

- 用户通过 View 进行操作。
- View 将操作通过数据绑定直接反映到 ViewModel。
- ViewModel 处理业务逻辑并更新 Model。
- Model 发生变化后，ViewModel 接收更新并通过数据绑定**自动更新** View。

**优点**：

- 数据绑定减少了**手动更新** UI 的需求，提高了开发效率。
- ViewModel 使得界面逻辑和业务逻辑更加清晰分离。
- 更适合于前端框架，如 Angular、React（结合 MobX 或 Redux）、Vue 等。

**缺点**：

- 学习曲线较陡峭，特别是对于数据绑定的理解和实现。
- 数据绑定可能引入性能问题，特别是在复杂应用中。

## 233. 有了 MVC 为什么要有 MVVM

**总结版：**
随着业务越来越复杂，数据解释这个环节会占比很高，而 v 和 m 一直都做不了这个事情自然就必须由 c 来完成，但是 c 的定位也不是做数据解释的，轻量还可以，重量就会显得非常臃肿。继而诞生了 MVVM ，把数据 m 和 v 数据对应关系指定起来。

**详细版：**

1. **数据绑定的需求**

   **MVC**：

   - 在 MVC 模式中，View 和 Model 之间没有直接的数据绑定。Controller 需要手动处理 View 和 Model 之间的数据同步。
   - 随着应用程序的复杂性增加，手动更新 View 变得繁琐且容易出错。

   **MVVM**：

   - MVVM 引入了数据绑定的概念，使得 View 和 ViewModel 之间可以自动同步数据。这减少了手动更新 View 的需求，提高了开发效率和代码的简洁性。
   - 数据绑定特别适合于现代前端框架，如 Angular、Vue 和 React（结合 MobX 或 Redux）。

2. **更清晰的关注点分离**

   **MVC**：

   - 在 MVC 模式中，Controller 中可能会积累大量的业务逻辑，导致代码难以维护。
   - Controller 的职责范围较广，既要处理用户输入，又要更新 Model 和 View。

   **MVVM**：

   - MVVM 将界面逻辑从业务逻辑中分离出来，放入 ViewModel 中。ViewModel 处理所有的界面逻辑，而不直接操作 View。
   - ViewModel 仅负责数据和状态的管理，View 则负责展示，进一步增强了关注点的分离。

3. **更高的可测试性**

   **MVC**：

   - 在 MVC 模式中，测试 Controller 的逻辑可能涉及到复杂的 View 和 Model 的交互。
   - 测试 UI 逻辑时，需要模拟用户输入和 View 的更新。

   **MVVM**：

   - ViewModel 不依赖于具体的 View 实现，因此可以独立于 UI 进行测试。
   - 测试 ViewModel 时，可以通过操作其属性和方法来验证逻辑，避免了 UI 相关的复杂性。

4. **更好的代码复用**

   **MVC**：

   - Controller 中的代码往往与特定的 View 紧密耦合，导致代码复用性较低。

   **MVVM**：

   - ViewModel 中的代码与具体的 UI 实现无关，更易于在不同的 View 中复用。
   - ViewModel 可以在多个 View 之间共享逻辑，减少重复代码。

5. **更适合现代前端开发**

   **MVC**：

   - MVC 模式适用于传统的服务端渲染和没有复杂数据绑定需求的应用。
   - 对于需要频繁更新和复杂交互的现代前端应用，MVC 的手动同步显得低效。

   **MVVM**：

   - MVVM 模式与现代前端框架的双向数据绑定机制完美契合，使得开发动态和交互丰富的应用更加便捷。
   - 现代前端开发工具和框架（如 Angular 的双向数据绑定，Vue 的响应式系统）都自然支持 MVVM 模式。

## 234. 实现一个 MVVM 实例

```html
<!-- 
M: model 数据层
V: view 视图层
VM: viewmodel 逻辑层 

-->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- view -->
    <input id="input" type="text" />
    <div id="content"></div>
  </body>
  <script type="text/javascript">
    window.onload = () => {
      // model 层
      const data = {
        inputVal: "",
      };

      // viewmodel 层
      // 视图 =》数据
      const input = document.getElementById("input");
      input.addEventListener("input", e => {
        proxy.inputVal = input.value;
      });

      // 数据 =》视图
      const proxy = new Proxy(data, {
        set: (target, key, value) => {
          if (key === "inputVal") {
            const content = document.getElementById("content");
            content.innerHTML = value;
          }
        },
      });

      // Object.defineProperty(data, 'inputVal', {
      //   set: (value) => {
      //     document.getElementById('content').innerHTML = value
      //   }
      // })
    };
  </script>
</html>
```

- 视图到数据的同步：
  当用户在输入框中输入文本，`v-model` 将监听到输入事件并捕获用户的数据。将值自动反映到绑定的数据属性中，确保视图与数据保持同步
- 数据到视图的同步：
  如果在到马中更新了与 `v-model` 绑定的数据属性，Vue 会自动将这个新的值反映到视图中。确保数据与视图间的双向同步。Vue2 用的 `Object.defineProperty`, Vue3 用的 `new Proxy()`

## 235. 面向对象基本特性

1. **封装（Encapsulation）**：

   - 封装是指将对象的状态（属性）和行为（方法）封装在一个单独的单元中，并提供访问控制机制以防止外部干扰和误用。
   - 通过封装，可以隐藏对象的内部实现细节，仅暴露必要的接口。

2. **继承（Inheritance）**：

   - 继承允许一个类（子类）从另一个类（父类）继承属性和方法，使得代码可以重用和扩展。
   - 通过继承，子类可以增加或修改父类的行为，而不需要从头开始编写代码。

3. **多态（Polymorphism）**：

   - 多态性使得同一个接口可以有不同的实现，从而不同的对象可以通过相同的接口调用它们各自的实现。
   - 多态主要通过**方法重载和方法重写**实现。

4. **抽象（Abstraction）**：
   - 抽象是指提取对象的共有特性，忽略具体的细节，以便更好地理解和处理问题。
   - 抽象通过类和接口来实现，类提供对象的具体实现，接口定义对象的行为规范。

## 236. 面向对象的设计原则

## 237. 创建型模式（Creational Patterns）

关注对象的创建过程，旨在使对象的创建过程独立于其使用者。这类模式包括：

### 单例模式（Singleton）

### 工厂方法模式（Factory Method）

### 抽奖工厂模式（Abstract Factory）

### 建造者模式（Builder）

### 原型模式（Prototype）

## 238. 结构型模式（Structural Patterns）

关注对象之间的组合，旨在通过组合对象来实现新的功能。这类模式包括：

### 适配器模式（Adapter）

### 装饰者模式（Decorator）

### 享元模式（Flyweight）

### 桥接模式（Bridge）

### 组合模式（Composite）

### 代理模式（Proxy）

### 外观模式（Facade）

## 239. 行为型模式（Behavioral Patterns）

关注对象之间的职责分配，旨在使对象之间的通信和职责划分更加灵活和松耦合。这类模式包括：

### 观察者模式（Observer）

### 策略模式（Strategy）

### 命令模式（Command）

### 状态模式（State）

### 访问者模式（Visitor）

### 模板方法模式（Template Method）

### 中介者模式（Mediator）

### 备忘录模式（Memento）

### 解释器模式（Interpreter）

### 责任链模式（Chain of Responsibility）

### 迭代器模式（Iterator）
