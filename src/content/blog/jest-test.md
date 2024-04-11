---
title: jest
author: zhenyounide
pubDatetime: 2020-03-09T10:16:11Z
slug: jest
featured: false
draft: true
tags:
  - nodejs
description: ""
---

源自https://www.valentinog.com/blog/testing-react/

### Testing React Components with react-test-renderer, and the Act API

### 使用 react-test-renderer 和 Act API 测试 React 组件

如果您对 React 有一个基本的了解，并且想了解测试组件，那么本指南非常适合您。

本指南假定您对**testing theory**和**testing runners**（如 Jest）有基本的了解

### 你将学到

- 单元测试 react 组件
- react 应用的功能测试
- 测试 react 的可用工具

### 了解快照测试

快照是技术中的常见主题。 快照就像实体在给定时间点的图片。 这也是测试 React 组件的最简单方法之一。

通过快照测试，您可以为 React 组件拍照，然后将原始快照与另一个快照进行比较。

快照测试是 Jest 测试运行器中内置的一项功能，由于它是测试 React 的默认库，因此我们将使用它。

首先使用 create-react-app 创建一个新的 React 项目：

`npx create-react-app testing-react-tutorial`

进入项目并安装 react-test-renderer：

`cd testing-react-tutorial && npm i react-test-renderer --save-dev`

接下来，在项目的 src 文件夹中创建一个名为**tests**的新文件夹（Jest 将在此处寻找要运行的新测试）：

`mkdir -p src/__tests__`

在大多数情况下，创建新的 React 组件时，我会先为其创建一个测试。 对于那些尚未开始的人，这种做法称为测试驱动的开发，您不必从字面上遵循它。

无需任何测试就可以开始编码，这很好，特别是当您尚不知道要编写哪种实现的想法时。 无论如何，在本教程的范围内，我们将通过测试一个简单的按钮组件来实践一些 TDD。

_提示：您可以通过安装 Jest 的类型定义来为其获得方法自动完成功能：_

对于我们的第一个快照测试，我们需要导入 React，react-test-renderer 和要测试的组件。 使用以下测试在`src / __ tests __ / Button.spec.js`中创建一个新文件：

```js
import React from "react";
import { create } from "react-test-renderer";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
```

此时，您可以使用以下命令运行第一遍：

`npm test`

您会看到测试失败，因为没有按钮组件。 您可以在同一文件中创建组件的最小实现

```js
import React from "react";
import { create } from "react-test-renderer";

function Button(props) {
  return <button>Nothing to do for now</button>;
}

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
```

再次运行

`npm test`

### 揭开快照测试

这时候你可能会问，什么是`react-test-renderer`？`react-test-renderer`是一个用于将 React 组件呈现为纯 JavaScript 对象的库,`create`就是`react-test-renderer`的方法，用于 mount 一个组件

值得注意的是`react-test-renderer`没有使用真正的 DOM。 当您使用`react-test-renderer`挂载组件时，您正在与纯 JavaScript 对象进行交互，即 JavaScript 组件的表示形式。

```js
import React from "react";
import { create } from "react-test-renderer";

function Button(props) {
  return <button>Nothing to do for now</button>;
}

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
```

`toMatchSnapshot()`完成了很多繁重的工作:

- 如果没有组件，则创建该组件的快照
- 检查组件是否与保存的快照匹配

您还可以看到在组件实例上调用的`toJSON()`。

换句话说，Jest（测试运行程序）在第一次运行时为组件拍摄快照，然后检查保存的快照是否与实际组件匹配。 此时，您可能想知道如何在快照和其他类型的 React 测试之间进行选择？

我有一条经验法则：您的组件是否经常更改？ 如果是这样，请避免快照测试。 如果为组件拍摄快照，则测试将在第一次运行时通过，但是一旦发生更改，测试将失败，因为组件与其原始“图片”之间将不匹配。

您可能会猜到快照测试对于不经常更改的组件很有用。 换句话说，当组件稳定时编写快照测试。

现在让我们仔细看看 `react-test-renderer`

### 错误的测试方法

假设您的应用程序中有一个按钮组件，并且单击该按钮后，其文本应从“ SUBSCRIBE TO BASIC”更改为“ PROCEED TO CHECKOUT”。

该组件具有逻辑，也可能具有状态，这意味着快照测试不是我们的最佳选择。 react-test-renderer 是一个用于将 React 组件呈现为纯 JavaScript 对象的库，但是它比创建对象还有更多的功能。 实际上，我们甚至可以使用 react-test-renderer 来声明组件的行为。

让我们在`src / __ tests __ / Button.spec.js`中创建一个全新的测试：

```js
import React from "react";
import { create } from "react-test-renderer";

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    //
  });
});
```

如您所见，我称此测试为“测试错误的方式”。 为什么这样？ 由于我们要测试有状态组件（具有自己状态的 React 组件），因此我们自然很想测试它的内部实现。 让我们来看看。 我们将在组件的内部状态上创建并声明。

_注意：使用 React 钩子，不需要使用类来保存组件的状态。_

我期望状态文本属性现在为空：

```js
import React from "react";
import { create } from "react-test-renderer";

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.text).toBe("");
  });
});
```

现在测试将失败，因为我尚未创建组件。 让我们为按钮组件做一个最小的实现（为方便起见，在同一测试文件中）

```js
import React from "react";
import { create } from "react-test-renderer";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { text: "PROCEED TO CHECKOUT" };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.text || this.props.text}
      </button>
    );
  }
}

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.text).toBe("");
  });
});
```

再运行一次，到目前为止，我们还没测试任何东西。那么 handleClick 呢

如何在 React 组件上测试内部方法？ 事实证明，我们可以在实例上调用方法。 让我们更新测试：

```js
import React from "react";
import { create } from "react-test-renderer";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { text: "PROCEED TO CHECKOUT" };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.text || this.props.text}
      </button>
    );
  }
}

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.text).toBe("");
    instance.handleClick();
    expect(instance.state.text).toBe("PROCEED TO CHECKOUT");
  });
});
```

请注意，我是如何调用`instance.handleClick()`的，因此认为该组件的状态按预期发生了变化：

`expect(instance.state.text).toBe("PROCEED TO CHECKOUT");`

如果我再次运行测试，它仍然会通过。 但是您可以在此测试中看到陷阱吗？

我们是否从用户的角度测试组件？ 我不知道我的按钮是否会向用户显示正确的文本。 我只是断言其内部状态。 让我们修复它。

### 正确的测试方法

测试对象的内部实现总是一个坏主意。 这对于 React，JavaScript 和那里的任何编程语言都适用。 相反，我们可以做的就是牢记用户应该看到的内容来测试组件。 构建用户界面时，功能测试会驱动开发过程。

功能测试或 e2e 测试是从用户角度测试 Web 应用程序的一种方法。

（测试术语之间存在很多混乱和重叠。我建议您自己进行一些研究以了解有关各种类型的测试的更多信息。对于本指南的范围，功能测试===端到端测试）

对于功能测试，我喜欢 Cypress。 现在，我们可以使用 react-test-renderer 在单元级别获得相同的结果。 让我们看看如何重构我们的测试。 我们测试了该组件的内部实现，直接调用 handleClick。

```html
<button onClick="{this.handleClick}">
  {this.state.text || this.props.text}
</button>
```

我们没有测试用户应该看到的内容。 我们可以做得更好吗？ 事实证明，我们可以在测试中使用 root 而不是`getInstance()`。 根据文档，`testRenderer.root`返回根测试实例对象，该对象对于对树中的特定节点进行断言很有用”。

找到按钮

`const button = instance.findByType("button");`

那么我们可以访问 button 的属性

```js
button.props.onClick();
button.props.children;
```

这是新的测试

```js
import React from "react";
import { create } from "react-test-renderer";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { text: "PROCEED TO CHECKOUT" };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.text || this.props.text}
      </button>
    );
  }
}

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.root;
    const button = instance.findByType("button");
    button.props.onClick();
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});
```

那么她为什么比之前的测试优秀呢，当然，我们也可以手动模拟 click 事件（我们将在以后看到）。 现在，我们已经完善的是：我们测试了用户应该看到的内容，而不是像以前一样测试了内部组件的状态。

永远要记得，不要测试**implementation**，从用户的视角测试组件

接下来的部分，我们将介绍：使用 react hook 时 测试意味着什么

## React hooks interlude: the Act API

在 react hools 之前 在一个 react 组件中只有一种方式来保存 state:ES2015 class

JavaScript 的类非常适合来自 Java 和 C＃等语言的程序员，但是它们比 JavaScript 函数冗长且不直观，特别是对于初学者而言。

它们不会很快消失（想象一下用类编写了多少 React 组件），但是有了钩子，我们就可以大大减少组件的数量。

例如，我们之前创建的 Button 组件通过钩子变得越来越小：

```javascript
import React, { useState } from "react";

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}
```

现在如何基于钩子测试 React 组件呢？ 我们可以重用之前的测试吗？

```javascript
import React, { useState } from "react";
import { create } from "react-test-renderer";

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.root;
    const button = instance.findByType("button");
    button.props.onClick();
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});
```

运行：

```bash
npm test
```

看看输出：

```text
    Warning: An update to Button inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */
```

有趣。 我们的测试不适用于 React 钩子。 事实证明，我们需要为 React 使用一个新的测试 API，称为 Act。 幸运的是，有两种方法可以使用 Act API 编写测试。

### React hooks interlude: Act API with react-test-renderer

If you can live with the fact that react-test-renderer does not use a DOM you'll need just to tweak the test a bit for Act. That means **importing act alongside with create**:

```javascript
import React, { useState } from "react";
import { create, act } from "react-test-renderer";
```

Your Button component will stay the same:

```javascript
import React, { useState } from "react";
import { create, act } from "react-test-renderer";

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}
```

The test must use `act()` for any action that changes the component's state, like "mounting" it or clicking on a function passed as a prop. Here's the complete test with Act:

```javascript
import React, { useState } from "react";
import { create, act } from "react-test-renderer";

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    let component;
    act(() => {
      component = create(<Button text="SUBSCRIBE TO BASIC" />);
    });
    const instance = component.root;
    const button = instance.findByType("button");
    act(() => button.props.onClick());
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});
```

Notice that both the call to create and to `button.props.onClick()` are wrapped in a callback passed to `act()`. **That's it if you don't need the DOM**.

If instead you want to mount React components into the Document Object Model then another version of the Act API will suite you best.

Head over the next section!

### React hooks interlude: Act API with the real DOM

Since **Act came out I'm using it almost exclusively. I pick react-test-renderer only for writing snapshot tests**. **The approach we're going to see is my favourite** because **tests for me feel more real if I can interact with the DOM**.

The Act API is available both on react-test-renderer and on **react-dom/test-utils** and when imported from the latter it's possible to use `ReactDOM.render`, thus mounting the React component into the Document Object Model.

Still in `src/__tests__/Button.spec.js` wipe everything out and start with a new test:

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// test here
```

We import act from react-dom/test-utils, ReactDOM, and more important we initialize a minimal DOM structure for our component. Next up we can create the actual test. **Step 1, mount the component with Act**:

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    act(() => {
      ReactDOM.render(<Button text="SUBSCRIBE TO BASIC" />, container);
    });
    // more soon
  });
});
```

**Step 2, once mounted you can make assertions on the DOM which now contains your component**:

```javascript
const button = container.getElementsByTagName("button")[0];
expect(button.textContent).toBe("SUBSCRIBE TO BASIC");
```

You can also **fire DOM events** on the button. Here’s the complete test (it will pass without any problem):

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    act(() => {
      ReactDOM.render(<Button text="SUBSCRIBE TO BASIC" />, container);
    });
    const button = container.getElementsByTagName("button")[0];
    expect(button.textContent).toBe("SUBSCRIBE TO BASIC");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button.textContent).toBe("PROCEED TO CHECKOUT");
  });
});
```

**NOTE**: `button.dispatchEvent` seems to have effect even if the call is not wrapped inside act.

Seems a bit of boilerplate, especially all these **DOM methods**. It's not a big deal for me but libraries like [react-testing-library](https://github.com/testing-library/react-testing-library) can help on this.

Now hands on **mocking**!

## Testing React Components: mocking interlude

**Fetching and displaying data is one of the most common use cases** for a front-end library. This is usually done by contacting an external API which holds some JSON for us.

In React you can use `componentDidMount` for making AJAX calls as soon as the component mounts. (And with hooks there is `useEffect`).

Now, the thing is: **how do you test an AJAX call within React**? Should you make a call to the actual API? Maybe! But some questions arise. Consider this: your team runs automated testing in CI/CD, developers commit to the main branch 3/4 times a day.

**What happens if the API goes down**? The **tests will fail** with no reasons. Clearly, contacting the real endpoint in testing is far from optimal. So? **What's the solution? We can use fakes and mocks**.

Faking external requirements is a common pattern in testing. For example, we can replace an external system with a fake in testing.

## Mocking Fetch API calls with Jest

**Mocking is the act of replacing a function with a fake copy**. In this section we'll **mock an API call in Jest**.

Again, let's start with a test (act API on ReactDOM). Suppose we want a Users component for fetching and displaying a list of users. In our test **we can mount the component and then assert on the output**.

Let's give it a shot by preparing a test with the Act API, this time we'll use `unmountComponentAtNode` from [ReactDOM for cleaning up the test properly](https://reactjs.org/docs/testing-recipes.html#setup--teardown):

```javascript
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("User component", () => {
  test("it shows a list of users", () => {
    act(() => {
      render(<Users />, container);
    });
  });
});
```

Run the test with `npm test` and see it fail.

Now let's make a minimal implementation of the React component. Here's the class component (you can easily refactor the component to hooks):

```javascript
import React, { Component } from "react";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // make sure to check for errors
        return response.json();
      })
      .then(json => {
        this.setState(() => {
          return { data: json };
        });
      });
  }
  render() {
    return (
      <ul>
        {this.state.data.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    );
  }
}
```

Import the component in your test file (I called mine `Users.spec.js`) and let's start by making a simple assertion on the container's text content:

```javascript
// rest omitted for brevity

describe("User component", () => {
  test("it shows a list of users", () => {
    act(() => {
      render(<Users />, container);
    });
    expect(container.textContent).toBe("What to expect?");
  });
});
```

Run the test with `npm test` and that's what you get:

```text
 FAIL  src/__tests__/Users.spec.js
  User component
    ✕ it shows a list of users (30ms)

  ● User component › it shows a list of users

    expect(received).toBe(expected) // Object.is equality

    Expected: "What to expect?"
    Received: ""
```

A failing test! There is no text content in the container. That makes sense because `componentDidMount` is calling Fetch which is **asynchronous**.

With [React 16.9 the Act API gained the ability to deal with asynchronous functions](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing), and that means we can await on the component's rendering like so:

```javascript
describe("User component", () => {
  test("it shows a list of users", async () => {
    await act(async () => {
      render(<Users />, container);
    });
    expect(container.textContent).toBe("What to expect?");
  });
});
```

Be aware that **Act cannot wait** for `componentDidMount` and the real API endpoint is never hit. The test still fails with the same error, no text content inside the container.

That's by design according to Facebook developers. In the end I think it's a sane default because most of the times there is no reason to call external APIs during testing.

But it's not that bad because we're interested in **mocking the API with a fake JSON response**. First we can provide a fake response and while we're there let's adjust the assertion (what follows is just the relevant part of the test suite):

```javascript
describe("User component", () => {
  test("it shows a list of users", async () => {
    const fakeResponse = [{ name: "John Doe" }, { name: "Kevin Mitnick" }];

    await act(async () => {
      render(<Users />, container);
    });

    expect(container.textContent).toBe("John DoeKevin Mitnick");
  });
});
```

Next up we mock the actual Fetch API with `jest.spyOn`:

```javascript
describe("User component", () => {
  test("it shows a list of users", async () => {
    const fakeResponse = [{ name: "John Doe" }, { name: "Kevin Mitnick" }];

    jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse),
      };
      return Promise.resolve(fetchResponse);
    });

    await act(async () => {
      render(<Users />, container);
    });

    expect(container.textContent).toBe("John DoeKevin Mitnick");

    window.fetch.mockRestore();
  });
});
```

You may find this code extremely hard to reason about, especially if you're just starting out with testing.

Here's how it works: `jest.spyOn` "spies" on the Fetch method, available on the window object. When the method is called we mock, aka replace the real Fetch with a so called mock implementation. `mockImplementation` takes a function which is our fake Fetch.

Inside the **mock we create a new response object with a function called json. This function returns a resolved Promise with the fake JSON response**. Finally we return the entire response object inside another resolved Promise.

Now run the test again with `npm test` and see it passing! Fantastic.

Takeaways:

**Do not call a real API in your tests**. Tests should not depend on external systems. By mocking Fetch and providing a fake response we ensure test isolation.

**TIP**: doing async calls in `componentDidMount` is poor practice. Consider always moving async logic out of React components. A good place for async logic is a Redux middleware, or a custom Hook for data fetching.

## Conclusions

Some time ago I asked on Reddit: "What's the consensus among the React community for testing React components?" Shawn Wang replied: "testing is an enormously complicated and nuanced topic on which there isn't a consensus anywhere in JS, much less in React."

I was not trying to find the best library for testing React. Mainly because there isn't one.

But there's one truth, as we saw in the previous sections: **use a library that encourages best practices and do not test the internal implementation**, even if Enzyme or react-test-renderer make it easy.

Here are my tools of choice for testing React apps:

- react-test-renderer for snapshot unit testing
- Act API for unit testing React components
- Jest for unit and integration testing of JavaScript code
- Cypress for end to end / UI testing

I also suggest taking a look at **react-testing-library**, a nice wrapper around the Act API.

Thanks for reading and stay tuned!
