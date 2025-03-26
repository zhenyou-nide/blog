---
author: zhenyounide
pubDatetime: 2020-09-10T15:22:00Z
modDatetime: 2024-08-04T11:13:47.400Z
title: 大宝典-设计模式
slug: collection-design-pattern
featured: false
draft: true
tags:
  - collections
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

---

接下来的内容略乏味噢

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

1. 单一职责原则（Single Responsibility Principle, SRP）

   每个类应该只有一个职责，即一个类只负责一件事情。这样可以减少类之间的耦合，增强代码的可维护性和可读性。

2. 开放封闭原则（Open/Closed Principle, OCP）

   软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。即在不修改现有代码的情况下，通过扩展来实现新功能。可以通过继承和多态等机制实现这一原则。

3. 里氏替换原则（Liskov Substitution Principle, LSP）

   子类必须能够替换其基类，且行为一致。即子类在任何基类可以出现的地方都可以替代基类，并且不会引起错误或不一致。遵循这一原则可以确保代码的正确性和灵活性。

4. 接口隔离原则（Interface Segregation Principle, ISP）

   客户端不应该被迫依赖于它不使用的方法。即应将庞大的接口拆分成多个更小、更具体的接口，客户端可以只依赖它需要的接口。这样可以减少类之间的耦合，提高系统的灵活性和可维护性。

5. 依赖倒置原则（Dependency Inversion Principle, DIP）

   高层模块不应该依赖于低层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。通过依赖倒置原则，可以减少模块之间的耦合，提高系统的稳定性和灵活性。

6. 合成复用原则（Composite Reuse Principle, CRP）

   优先使用对象组合（composition）而不是继承（inheritance）来达到代码复用的目的。组合可以在运行时动态改变对象的行为，而继承则是在编译时确定对象的行为。

7. 迪米特法则（Law of Demeter, LoD）

   一个对象应该对其他对象有最少的了解。即一个对象应该只与它直接关系的对象通信，而不应该与陌生对象通信。通过这一原则，可以减少对象之间的耦合，提高系统的模块化程度。

8. 单一抽象层次原则（Single Level of Abstraction Principle, SLAP）

   在一个函数或方法中，应该只做一个抽象层次的工作。即高层次的操作不应该与低层次的操作混在一起。通过这一原则，可以提高代码的可读性和可维护性。

## 237. 创建型模式（Creational Patterns）

**关注对象的创建过程**，旨在使对象的创建过程独立于其使用者。这类模式包括：

### 单例模式（Singleton）

单例模式确保**一个类只有一个实例**，并提供全局访问点。

```js
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = [];
    Singleton.instance = this;
  }

  getData() {
    return this.data;
  }

  addData(item) {
    this.data.push(item);
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

instance1.addData("item1");
console.log(instance2.getData()); // 输出：['item1']
```

### 工厂方法模式（Factory Method）

**创建对象的接口**，但由子类决定要实例化的类是哪一个，使得**实例化推迟到子类**

```js
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ProductFactory {
  createProduct(type) {
    switch (type) {
      case "productA":
        return new Product("Product A");
      case "productB":
        return new Product("Product B");
      default:
        throw new Error("Unknown product type");
    }
  }
}

const factory = new ProductFactory();
const productA = factory.createProduct("productA");
console.log(productA.getName()); // 输出：Product A
```

### 抽象工厂模式（Abstract Factory）

**创建一系列相关或互相依赖对象的接口**，而无需指定它们具体的类。

```js
class ProductA {
  constructor() {
    this.name = "Product A";
  }
}

class ProductB {
  constructor() {
    this.name = "Product B";
  }
}

class Factory1 {
  createProduct() {
    return new ProductA();
  }
}

class Factory2 {
  createProduct() {
    return new ProductB();
  }
}

class Client {
  constructor(factory) {
    this.product = factory.createProduct();
  }

  getProduct() {
    return this.product.name;
  }
}

const factory1 = new Factory1();
const client1 = new Client(factory1);
console.log(client1.getProduct()); // 输出：Product A

const factory2 = new Factory2();
const client2 = new Client(factory2);
console.log(client2.getProduct()); // 输出：Product B
```

### 建造者模式（Builder）

将一个复杂**对象的构建与它的表示分离**，使得同样的构建过程可以创建不同的表示。

```js
class Product {
  constructor() {
    this.parts = [];
  }

  addPart(part) {
    this.parts.push(part);
  }

  showParts() {
    console.log(this.parts.join(", "));
  }
}

class Builder {
  constructor() {
    this.product = new Product();
  }

  buildPartA() {
    this.product.addPart("Part A");
    return this;
  }

  buildPartB() {
    this.product.addPart("Part B");
    return this;
  }

  getResult() {
    return this.product;
  }
}

const builder = new Builder();
const product = builder.buildPartA().buildPartB().getResult();
product.showParts(); // 输出：Part A, Part B
```

### 原型模式（Prototype）

**复制现有对象来创建新的对象**，而不是通过实例化类。

```js
class Prototype {
  constructor(name) {
    this.name = name;
  }

  clone() {
    return new Prototype(this.name);
  }
}

const original = new Prototype("Original");
const copy = original.clone();
console.log(copy.name); // 输出：Original
```

## 238. 结构型模式（Structural Patterns）

主要关注如何将类或对象组合在一起形成更大的结构。它们通过类的继承和对象的组合来实现新的功能。这类模式包括：

### 适配器模式（Adapter）

将一个类的接口转换成客户端期望的另一个接口，使原本接口不兼容的类可以一起工作。

```js
class OldSystem {
  oldMethod() {
    return "Old System";
  }
}

class NewSystem {
  newMethod() {
    return "New System";
  }
}

class Adapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }

  newMethod() {
    return this.oldSystem.oldMethod();
  }
}

const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);
console.log(adapter.newMethod()); // 输出：Old System
```

### 装饰者模式（Decorator）

动态地给对象添加职责。与生成子类相比，装饰模式更加灵活。

```js
class Component {
  operation() {
    return "Component";
  }
}

class Decorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }

  operation() {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

const component = new Component();
const decoratorA = new ConcreteDecoratorA(component);
const decoratorB = new ConcreteDecoratorB(decoratorA);
console.log(decoratorB.operation()); // 输出：ConcreteDecoratorB(ConcreteDecoratorA(Component))
```

### 享元模式（Flyweight）

通过共享技术来有效地支持大量细粒度对象的复用。

```js
class Flyweight {
  constructor(sharedState) {
    this.sharedState = sharedState;
  }

  operation(uniqueState) {
    console.log(
      `Flyweight: Displaying shared (${this.sharedState}) and unique (${uniqueState}) state.`
    );
  }
}

class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }

  getFlyweight(key) {
    if (!(key in this.flyweights)) {
      this.flyweights[key] = new Flyweight(key);
    }
    return this.flyweights[key];
  }

  listFlyweights() {
    return Object.keys(this.flyweights);
  }
}

const factory = new FlyweightFactory();
const flyweight1 = factory.getFlyweight("shared1");
flyweight1.operation("unique1");

const flyweight2 = factory.getFlyweight("shared1");
flyweight2.operation("unique2");

console.log(factory.listFlyweights()); // 输出：[ 'shared1' ]
```

### 桥接模式（Bridge）

将抽象部分与它的具体实现部分分离，使它们可以独立变化。

```js
class Abstraction {
  constructor(implementation) {
    this.implementation = implementation;
  }

  operation() {
    return this.implementation.operation();
  }
}

class ImplementationA {
  operation() {
    return "Implementation A";
  }
}

class ImplementationB {
  operation() {
    return "Implementation B";
  }
}

const implementationA = new ImplementationA();
const abstractionA = new Abstraction(implementationA);
console.log(abstractionA.operation()); // 输出：Implementation A

const implementationB = new ImplementationB();
const abstractionB = new Abstraction(implementationB);
console.log(abstractionB.operation()); // 输出：Implementation B
```

### 组合模式（Composite）

将对象组合成树形结构以表示“部分-整体”的层次结构。使得客户端对单个对象和组合对象的使用具有一致性。

```js
class Component {
  operation() {
    throw new Error("This method must be overridden!");
  }
}

class Leaf extends Component {
  operation() {
    return "Leaf";
  }
}

class Composite extends Component {
  constructor() {
    super();
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  operation() {
    return this.children.map(child => child.operation()).join(" + ");
  }
}

const leaf1 = new Leaf();
const leaf2 = new Leaf();
const composite = new Composite();
composite.add(leaf1);
composite.add(leaf2);
console.log(composite.operation()); // 输出：Leaf + Leaf
```

### 代理模式（Proxy）

为其他对象提供一种代理以控制对这个对象的访问。

```js
class RealSubject {
  request() {
    return "RealSubject: Handling request.";
  }
}

class Proxy {
  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    if (this.checkAccess()) {
      return this.realSubject.request();
    } else {
      return "Proxy: Access denied.";
    }
  }

  checkAccess() {
    // 一些访问控制逻辑
    return true;
  }
}

const realSubject = new RealSubject();
const proxy = new Proxy(realSubject);
console.log(proxy.request()); // 输出：RealSubject: Handling request.
```

### 外观模式（Facade）

为子系统中的一组接口提供一个一致的接口，使得这些子系统更加容易使用。

```js
class SubsystemA {
  operationA() {
    return "Subsystem A";
  }
}

class SubsystemB {
  operationB() {
    return "Subsystem B";
  }
}

class Facade {
  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
  }

  operation() {
    return `${this.subsystemA.operationA()} + ${this.subsystemB.operationB()}`;
  }
}

const facade = new Facade();
console.log(facade.operation()); // 输出：Subsystem A + Subsystem B
```

## 239. 行为型模式（Behavioral Patterns）

关注对象之间的职责分配，旨在使对象之间的通信和职责划分更加灵活和松耦合。这类模式包括：

### 观察者模式（Observer）

定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(message) {
    this.observers.forEach(observer => observer.update(message));
  }
}

class Observer {
  update(message) {
    console.log(`Observer received message: ${message}`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers("Hello Observers!"); // 两个观察者都会收到消息
```

### 策略模式（Strategy）

定义了一系列算法，并将每个算法封装起来，使它们可以互换，客户端可以根据需要选择不同的算法。

```js
class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy(data) {
    return this.strategy.execute(data);
  }
}

class StrategyA {
  execute(data) {
    return `Strategy A: ${data}`;
  }
}

class StrategyB {
  execute(data) {
    return `Strategy B: ${data}`;
  }
}

const context = new Context(new StrategyA());
console.log(context.executeStrategy("test data")); // 输出：Strategy A: test data

context.setStrategy(new StrategyB());
console.log(context.executeStrategy("test data")); // 输出：Strategy B: test data
```

### 命令模式（Command）

将一个请求封装为一个对象，从而使你可以用不同的请求对客户端进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。

```js
class Command {
  execute() {
    throw new Error("This method should be overridden!");
  }
}

class Light {
  on() {
    console.log("Light is ON");
  }

  off() {
    console.log("Light is OFF");
  }
}

class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.on();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.off();
  }
}

class RemoteControl {
  setCommand(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}

const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const remoteControl = new RemoteControl();
remoteControl.setCommand(lightOnCommand);
remoteControl.pressButton(); // 输出：Light is ON

remoteControl.setCommand(lightOffCommand);
remoteControl.pressButton();
```

### 状态模式（State）

允许对象在内部状态改变时改变其行为，对象看起来好像修改了其类。

```js
class Context {
  constructor(state) {
    this.setState(state);
  }

  setState(state) {
    this.state = state;
    this.state.setContext(this);
  }

  request() {
    this.state.handle();
  }
}

class State {
  setContext(context) {
    this.context = context;
  }

  handle() {
    throw new Error("This method should be overridden!");
  }
}

class ConcreteStateA extends State {
  handle() {
    console.log("State A handling request.");
    this.context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB extends State {
  handle() {
    console.log("State B handling request.");
    this.context.setState(new ConcreteStateA());
  }
}

const context = new Context(new ConcreteStateA());
context.request(); // 输出：State A handling request.
context.request(); // 输出：State B handling request.
context.request(); // 输出：State A handling request.
```

### 访问者模式（Visitor）

让你能在不改变对象结构的情况下定义作用于这些对象的新操作。

```js
class Visitor {
  visit(element) {
    throw new Error("This method should be overridden!");
  }
}

class ConcreteVisitorA extends Visitor {
  visit(element) {
    console.log(`ConcreteVisitorA visiting ${element.constructor.name}`);
  }
}

class ConcreteVisitorB extends Visitor {
  visit(element) {
    console.log(`ConcreteVisitorB visiting ${element.constructor.name}`);
  }
}

class Element {
  accept(visitor) {
    throw new Error("This method should be overridden!");
  }
}

class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visit(this);
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    visitor.visit(this);
  }
}

const elements = [new ConcreteElementA(), new ConcreteElementB()];
const visitorA = new ConcreteVisitorA();
const visitorB = new ConcreteVisitorB();

elements.forEach(element => {
  element.accept(visitorA);
  element.accept(visitorB);
});
// 输出：
// ConcreteVisitorA visiting ConcreteElementA
// ConcreteVisitorB visiting ConcreteElementA
// ConcreteVisitorA visiting ConcreteElementB
// ConcreteVisitorB visiting ConcreteElementB
```

### 模板方法模式（Template Method）

定义了一个操作中的算法骨架，而将一些步骤的实现延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤。

```js
// 抽象类
class Beverage {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  boilWater() {
    console.log("Boiling water");
  }

  brew() {
    throw new Error("This method should be overridden!");
  }

  pourInCup() {
    console.log("Pouring into cup");
  }

  addCondiments() {
    throw new Error("This method should be overridden!");
  }
}

// 具体类：茶
class Tea extends Beverage {
  brew() {
    console.log("Steeping the tea");
  }

  addCondiments() {
    console.log("Adding lemon");
  }
}

// 具体类：咖啡
class Coffee extends Beverage {
  brew() {
    console.log("Dripping Coffee through filter");
  }

  addCondiments() {
    console.log("Adding sugar and milk");
  }
}

// 客户端代码
const tea = new Tea();
tea.prepareRecipe();
// 输出:
// Boiling water
// Steeping the tea
// Pouring into cup
// Adding lemon

const coffee = new Coffee();
coffee.prepareRecipe();
// 输出:
// Boiling water
// Dripping Coffee through filter
// Pouring into cup
// Adding sugar and milk
```

### 中介者模式（Mediator）

用于减少对象之间的直接依赖关系，促进松耦合。通过引入一个中介者对象，所有对象通过中介者来交互，而不是直接相互引用

```js
// 中介者接口
class Mediator {
  send(message, colleague) {
    throw new Error("This method should be overridden!");
  }
}

// 具体中介者
class ChatRoom extends Mediator {
  constructor() {
    super();
    this.participants = {};
  }

  register(participant) {
    this.participants[participant.name] = participant;
    participant.setMediator(this);
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      for (const key in this.participants) {
        if (this.participants[key] !== from) {
          this.participants[key].receive(message, from);
        }
      }
    }
  }
}

// 同事类
class Participant {
  constructor(name) {
    this.name = name;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  send(message, to) {
    this.mediator.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

// 客户端代码
const chatRoom = new ChatRoom();

const alice = new Participant("Alice");
const bob = new Participant("Bob");
const charlie = new Participant("Charlie");

chatRoom.register(alice);
chatRoom.register(bob);
chatRoom.register(charlie);

alice.send("Hello Bob!", bob); // 输出：Alice to Bob: Hello Bob!
bob.send("Hey Alice!", alice); // 输出：Bob to Alice: Hey Alice!
charlie.send("Hello everyone!"); // 输出：Charlie to Alice: Hello everyone!
// 输出：Charlie to Bob: Hello everyone!
```

### 备忘录模式（Memento）

在不破坏封装性的前提下，捕获并保存对象的内部状态，以便在以后恢复它。

```js
class Memento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

class Originator {
  setState(state) {
    this.state = state;
    console.log(`State set to ${this.state}`);
  }

  saveStateToMemento() {
    return new Memento(this.state);
  }

  getStateFromMemento(memento) {
    this.state = memento.getState();
    console.log(`State restored to ${this.state}`);
  }
}

class Caretaker {
  constructor() {
    this.mementoList = [];
  }

  add(memento) {
    this.mementoList.push(memento);
  }

  get(index) {
    return this.mementoList[index];
  }
}

const originator = new Originator();
const caretaker = new Caretaker();

originator.setState("State1");
originator.setState("State2");
caretaker.add(originator.saveStateToMemento());

originator.setState("State3");
caretaker.add(originator.saveStateToMemento());

originator.setState("State4");

originator.getStateFromMemento(caretaker.get(0)); // 输出：State restored to State2
originator.getStateFromMemento(caretaker.get(1)); // 输出：State restored to State3
```

### 解释器模式（Interpreter）

为某种语言定义一种文法表示，并提供一个解释器来解释该语言中的句子。这个模式用于解析、处理和执行特定语言的句子，通常应用于编译器、脚本语言解释器、规则引擎等领域

```js
// 抽象表达式
class Expression {
  interpret(context) {
    throw new Error("This method should be overridden!");
  }
}

// 数字表达式（终结符表达式）
class NumberExpression extends Expression {
  constructor(number) {
    super();
    this.number = number;
  }

  interpret(context) {
    return this.number;
  }
}

// 加法表达式（非终结符表达式）
class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// 减法表达式（非终结符表达式）
class SubtractExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

// 乘法表达式（非终结符表达式）
class MultiplyExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) * this.right.interpret(context);
  }
}

// 除法表达式（非终结符表达式）
class DivideExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) / this.right.interpret(context);
  }
}

// 上下文
class Context {
  constructor() {
    this.variables = {};
  }

  assign(variable, expression) {
    this.variables[variable] = expression;
  }

  lookup(variable) {
    return this.variables[variable].interpret(this);
  }
}

// 客户端代码
const context = new Context();
const expression = new AddExpression(
  new NumberExpression(5),
  new MultiplyExpression(
    new NumberExpression(10),
    new SubtractExpression(new NumberExpression(2), new NumberExpression(1))
  )
);

console.log(expression.interpret(context)); // 输出：5 + 10 * (2 - 1) = 15
```

### 责任链模式（Chain of Responsibility）

使多个对象都有机会处理请求，从而避免请求的发送者与接收者之间的耦合。这些对象连成一条链，并沿着这条链传递请求，直到有对象处理它为止。

```js
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class ConcreteHandlerA extends Handler {
  handle(request) {
    if (request === "A") {
      return `Handler A handled the request: ${request}`;
    }
    return super.handle(request);
  }
}

class ConcreteHandlerB extends Handler {
  handle(request) {
    if (request === "B") {
      return `Handler B handled the request: ${request}`;
    }
    return super.handle(request);
  }
}

const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();

handlerA.setNext(handlerB);

console.log(handlerA.handle("A")); // 输出：Handler A handled the request: A
console.log(handlerA.handle("B")); // 输出：Handler B handled the request: B
console.log(handlerA.handle("C")); // 输出：null
```

### 迭代器模式（Iterator）

提供一种方法顺序访问一个聚合对象中的各个元素，而不暴露其内部表示。

```js
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  next() {
    if (this.hasNext()) {
      return this.collection[this.index++];
    }
    return null;
  }

  hasNext() {
    return this.index < this.collection.length;
  }
}

const collection = ["item1", "item2", "item3"];
const iterator = new Iterator(collection);

while (iterator.hasNext()) {
  console.log(iterator.next());
}
// 输出：item1, item2, item3
```
