---
title: 实现一个 basic Promise
author: zhenyounide
pubDatetime: 2023-01-20T05:06:31Z
slug: promise-basic
featured: false
draft: false
tags:
  - summary
  - nodejs
description: ""
---

实现 Promise 的核心功能:

- 实例方法：then/catch/finally;
- 静态方法 resolve/reject/race/all/allSettled/any;
- 跑通 PromiseA+ 单元测试

## Table of contents

## constrauctor

- 定义类 MyPromise, 内部添加构造函数 constructor, 构造函数需要接收回调函数 func
- 在构造函数中定义 resolve 和 reject
- 构造函数内部调用 func 并将 resolve 和 reject 传入：func(resolve,reject)

```js
// 1. 定义类
class MyPromise {
  // 2. 添加构造函数
  constructor(func) {
    // 3. 定义 resolve/reject
    const resolve = value => {
      console.log("resolve", value);
    };

    const reject = reason => {
      console.log("reject", reason);
    };

    // 4. 指定回调函数
    func(resolve, reject);
  }
}
```

## state

- 定义 3 个常量用来保存状态，pending,fulfilled,rejected
- MyPromise 内部定义属性 state 和 result 分别用来保存状态和原因
- 调用 resolve 时传入具体原因，如果状态为 pending 则更改状态并记录兑现原因
- 调用 reject 时传入具体原因，如果状态为 pending 则更改状态并记录拒绝原因

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  // 1. 添加状态
  state = PENDING;
  // 2. 添加原因
  result = undefined;
  constructor(func) {
    // 3. 调整 resolve/reject
    // 4. 状态不可逆
    const resolve = value => {
      if (this.state !== PENDING) return;
      // 改状态
      this.state = FULFILLED;
      // 记录原因
      this.result = reason;
      console.log("resolve", value);
    };

    const reject = reason => {
      if (this.state !== PENDING) return;
      // 改状态
      this.state = REJECTED;
      // 记录原因
      this.result = reason;
    };

    func(resolve, reject);
  }
}
```

## 实例方法

### then

- 添加 then 方法，接收 2 个回调函数：
  - 成功回调 onFulfilled
  - 失败回调 onRejected
- 判断传入的 onFulfilled 和 onRejected 是否为函数，如果不是设置默认值
- 根据状态调用 onFulfilled 或 onRejected 并传入兑现或拒绝原因

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  state = PENDING;
  result = undefined;
  constructor(func) {
    const resolve = value => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.result = reason;
      console.log("resolve", value);
    };

    const reject = reason => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.result = reason;
    };

    func(resolve, reject);
  }

  // 1. 添加实例方法
  then(onfulfilled, onrejected) {
    // 2. 参数判断
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    // 2.1 执行成功/失败回调
    if (this.state === FULFILLED) {
      onfulfilled(this.result);
    } else if (this.state === REJECTED) {
      onrejected(this.result);
    }
  }
}
```

#### 异步和多次调用

- MyPromise 添加私有属性#handlers

  - 保存 then 方法调用时状态为 pending 的回调函数
  - 格式为对象数组：[{onFulfilled,onRejected}...]

- 构造函数内部调整 resolve 和 reject 的逻辑：
  - 调用 resolve 时取出数组#handlers 中的所有 onFulfilled 回调函数进行调用
  - 调用 reject 时取出数组#handlers 中的所有 onRejected 回调函数进行调用

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  state = PENDING;
  result = undefined;
  // 1. 定义实例属性
  #handlers = [];
  constructor(func) {
    const resolve = value => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.result = value;
      // 3. 调用成功回调
      this.#handlers.forEach(h => {
        h.onfulfilled(this.result);
      });
    };

    const reject = result => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.result = result;
      // 3. 调用失败回调
      this.#handlers.forEach(h => {
        h.onrejected(this.result);
      });
    };

    func(resolve, reject);
  }

  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    if (this.state === FULFILLED) {
      onfulfilled(this.result);
    } else if (this.state === REJECTED) {
      onrejected(this.result);
    } else if (this.state === PENDING) {
      // 2. 保存回调函数
      this.#handlers.push({
        onfulfilled: () => {
          onfulfilled(this.result);
        },
        onrejected: () => {
          onrejected(this.result);
        },
      });
    }
  }
}
```

#### 异步任务 - 函数封装

- 封装执行异步任务的函数

  - 定义函数传入异步任务（回调函数）

  - 内部根据实际情况判断并使用开启异步任务的 api 即可，比如 queueMicrotask,MutationObserver

  - 调用的 api 可以根据实际情况进行调整

  - 如果都无法执行，使用 setTimeout 兜底

- 调整 then 中的逻辑，fulFilled,rejected,pending3 种状态时的回调函数，使用封装的函数包装一次

```js
// 1. 定义函数
function runAsyncTask(callback) {
  // 2. 调用核心 api 们
  if (typeof queueMicrotask === "function") {
    queueMicrotask(callback);
  } else if (typeof MutationObserver === "function") {
    const observer = new MutationObserver(callback);
    const textNode = document.createTextNode("");
    observer.observe(textNode, { characterData: true });
    textNode.data = "1";
  } else if (typeof setTimeout === "function") {
    setTimeout(callback, 0);
  } else {
    throw new Error("No async task available");
  }
}
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  state = PENDING;
  result = undefined;
  #handlers = [];
  constructor(func) {
    const resolve = value => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.result = value;
      this.#handlers.forEach(h => {
        h.onfulfilled(this.result);
      });
    };

    const reject = result => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.result = result;
      this.#handlers.forEach(h => {
        h.onrejected(this.result);
      });
    };

    func(resolve, reject);
  }

  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    // 3. 使用封装函数
    if (this.state === FULFILLED) {
      runAsyncTask(() => {
        onfulfilled(this.result);
      });
    } else if (this.state === REJECTED) {
      runAsyncTask(() => {
        onrejected(this.result);
      });
    } else if (this.state === PENDING) {
      this.#handlers.push({
        onfulfilled: () => {
          runAsyncTask(() => {
            onfulfilled(this.result);
          });
        },
        onrejected: () => {
          runAsyncTask(() => {
            onrejected(this.result);
          });
        },
      });
    }
  }
}
```

#### 链式编程

#### fulfilled

- 链式编程的本质 then 方法会返回一个新的 MyPromise 对象
- 将原本的代码迁移到返回的 MyPromise 对象的回调函数中
- 内部通过 try-catch 捕获异常，出现异常通过 reject 传递异常
- 获取 onFulfilled 的执行结果，并通过 resolve 传递

```js
/**
 * 链式编程-处理异常和普通内容
 */
class MyPromise {
  // ...

  //* 1. 返回新的 promise 实例
  //* 2. 获取返回值
  //*    2.1 处理返回值
  //*    2.2 处理异常
  //*
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    // 1. 返回新的 promise 实例
    const p2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        runAsyncTask(() => {
          // 2. 获取返回值
          try {
            const x = onfulfilled(this.result);
            if (x === p2) {
              throw new TypeError("Chaining cycle detected for promise");
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === REJECTED) {
        runAsyncTask(() => {
          onrejected(this.result);
        });
      } else if (this.state === PENDING) {
        this.#handlers.push({
          onfulfilled: () => {
            runAsyncTask(() => {
              onfulfilled(this.result);
            });
          },
          onrejected: () => {
            runAsyncTask(() => {
              onrejected(this.result);
            });
          },
        });
      }
    });
    return p2;
  }
}
```

#### reject

- 判断 onRejected 可能出现的异常，如果出现通过 reject 传递
- 获取 onRejected 函数的执行结果
- 将 fulfilled 状态时的处理逻辑抽取为函数，rejected 状态时调用函数复用逻辑

```js
// 3. 抽取函数
function resolvePromise(p2, x, resolve, reject) {
  if (x === p2) {
    throw new TypeError("Chaining cycle detected for promise #&lt;Promise&gt;");
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
class MyPromise {
  // ...
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    const p2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        runAsyncTask(() => {
          try {
            const x = onfulfilled(this.result);
            resolvePromise(p2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === REJECTED) {
        runAsyncTask(() => {
          // 1. 处理异常
          try {
            // 2. 获取返回值
            const x = onrejected(this.result);
            // 4. 调用函数
            resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === PENDING) {
        this.#handlers.push({
          onfulfilled: () => {
            runAsyncTask(() => {
              onfulfilled(this.result);
            });
          },
          onrejected: () => {
            runAsyncTask(() => {
              onrejected(this.result);
            });
          },
        });
      }
    });
    return p2;
  }
}
```

#### pending

- then 方法中 pending 状态时推入数组的函数增加 try-catch 捕获异常
- 获取推入数组的回调函数的返回值
- 调用上一节封装的函数并传入获取的值

```js
function resolvePromise(p2, x, resolve, reject) {
  if (x === p2) {
    throw new TypeError("Chaining cycle detected for promise #&lt;Promise&gt;");
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
class MyPromise {
  // ...
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : v => v;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : e => {
            throw e;
          };
    const p2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        if (this.state === FULFILLED) {
          runAsyncTask(() => {
            try {
              const x = onfulfilled(this.result);
              resolvePromise(p2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        } else if (this.state === REJECTED) {
          runAsyncTask(() => {
            try {
              const x = onrejected(this.result);
              resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        } else if (this.state === PENDING) {
          this.#handlers.push({
            onfulfilled: () => {
              runAsyncTask(() => {
                // 1. 处理异常
                try {
                  // 2. 获取返回值
                  const x = onfulfilled(this.result);
                  // 调用函数
                  resolvePromise(p2, x, resolve, reject);
                } catch (error) {
                  reject(error);
                }
              });
            },
            onrejected: () => {
              runAsyncTask(() => {
                try {
                  const x = onrejected(this.result);
                  resolvePromise(p2, x, resolve, reject);
                } catch (error) {
                  reject(error);
                }
              });
            },
          });
        }
      }
    });
    return p2;
  }
}
```

### catch

- 定义 catch 方法，接收拒绝的回调函数 onRejected

- catch 方法的本质是内部调用 then 方法

- 调用形式为第一个回调函数传入 undefined, 第二个回调函数传入 onRejected 即可

```js
class MyPromise {
  // ...
  constructor(func) {
    // ...
    // 2. 处理异常
    try {
      func(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  catch(onrejected) {
    // 1. 内部调用 then
    return this.then(null, onrejected);
  }
}
```

### finally

- 添加 finally 方法，接收最终执行的回调函数 onFinally
- finally 方法的本质为内部调用 then 方法
- 调用形式为第一个和第二个回调函数均传入 onFinally 即可

```js
class MyPromise {
  // ...
  finally(onfinally) {
    return this.then(onfinally, onfinally);
  }
}
```

## 静态方法

### resolve

- 通过 static 关键字添加静态方法 resolve, 接收参数 value

- 内部判断传入的值

  - 如果是 Promise 实例，直接返回
  - 其他的值，创建 Promise 实例并返回，内部通过 resolve(value) 传递 value

```js
class MyPromise {
  // ...
  static resolve(value) {
    // 1. 判断传入值 Promise 直接返回
    if (value instanceof MyPromise) return value;
    // 2. 转为 Promise 并返回
    return new MyPromise(resolve => {
      resolve(value);
    });
  }
}
```

### reject

- 添加静态方法 reject 并接收参数 value
- 内部返回一个拒绝状态的 Promise 实例即可

```js
class MyPromise {
  // ...

  // 1. 返回 rejected 状态的 Promise
  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }
}
```

### race

- 添加静态方法 race 接收参数 promises
- 内部返回一个新的 Promise 实例，在返回的 Promise 实例中：
  - 判断参数是否为数组，不是通过 reject 传递错误
  - 遍历 Promise 数组，通过 resolve 静态方法等待每一个兑现
  - 任何一个兑现，调用 resolve 传递兑现结果
  - 任何一个拒绝，调用 reject 传递拒绝原因

```js
class MyPromise {
  // ...
  static race(promises) {
    // 1. 返回 Promise
    return new MyPromise((resolve, reject) => {
      // 2. 判断是否为数组
      if (!Array.isArray(promises))
        return reject(new TypeError("promises must be an array"));
      // 等待第一个敲定
      promises.forEach(p => {
        MyPromise.resolve(p).then(resolve, reject);
      });
    });
  }
}
```

### all

- 添加静态方法 all
- 内部返回 Promise 实例，在返回的 Promise 实例中：
  - 判断参数是否为数组，不是通过 reject 传递错误
  - 空数组直接以空数组为结果进行兑现
  - 遍历 Promise 数组，通过 resolve 静态方法等待结果
    - 处理全部兑现：
      - 通过数组记录结果，用索引的方式来添加，目的是保证结果的顺序和 Promise-数组的顺序一致
      - 通过兑现次数进行判断，因为是通过索引的方式记录结果，如果第一次兑现的是最后一个，那么数组的长度就已经和 Promise 数组的长度一致了，所以需要通过兑现次数来进行判断
      - 任意一个拒绝，调用 reject 传递拒绝原因

```js
class MyPromise {
  // ...
  static all(promises) {
    // 1. 返回 Promise
    return new MyPromise((resolve, reject) => {
      // 2. 判断是否为数组
      if (!Array.isArray(promises))
        return reject(new TypeError("promises must be an array"));
      // 3. 空数组直接兑现
      promises.length === 0 && resolve([]);
      // 4.1 记录结果
      const result = [];
      let count = 0;
      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(
          res => {
            // result.push 无法保证结果的顺序和 promises 数组的顺序一致
            // index 和 promises 的索引一致，保证顺序
            result[index] = res;
            // 4.2 判断全部兑现
            count++;
            if (count === promises.length) resolve(result);
          },
          // 5. 处理第一个拒绝
          reject
        );
      });
    });
  }
}
```

### allSettled

- 添加静态方法 allSettled

- 内部返回 Promise 实例，在返回的 Promise 实例中：

  - 判断参数是否为数组，不是通过 reject 传递错误
  - 空数组直接以空数组为结果进行兑现

- 遍历 Promise 数组，通过 resolve 静态方法等待敲定结果

- 等待全部敲定：并记录结果，根据兑现和拒绝将如下格式的内容通过索引的方式的记录到数组中

  - 处理兑现：{state:FULFILLED,value:'xxx'}

  - 处理拒绝：{state:REJECTED,reason:'xxx'}

- 根据敲定的次数判断是否全部敲定，全部敲定之后，通过 resolve 传递结果数组

```js
class MyPromise {
  // ...
  static allsettled(promises) {
    // 1. 返回 promise
    return new MyPromise(resolve => {
      // 2. 数组判断
      if (!Array.isArray(promises))
        return resolve(new TypeError("promises must be an array"));
      // 3. 为空直接敲定
      promises.length === 0 && resolve([]);

      // 4. 等待全部敲定
      // 4.1 记录结果
      const result = [];
      let count = 0;
      promises.forEach((p, index) => {
        MyPromise.resolve(p)
          .then(
            res => {
              // 4.2 处理兑现
              result[index] = { status: "fulfilled", value: res };
            },
            err => {
              // 处理拒绝
              result[index] = { status: "rejected", reason: err };
            }
          )
          .finally(() => {
            count++;
            if (count === promises.length) resolve(result);
          });
      });
    });
  }
}
```

### any

- 添加静态方法 any
- 内部返回 Promise 实例，在返回的 Promise 实例中：
  - 判断参数是否为数组，不是通过 reject 传递错误
  - 空数组直接以空数组为结果进行兑现
- 遍历 Promise 数组，通过 resolve 静态方法等待结果
  - 第一个兑现，通过 resolve 传递兑现结果
  - 全部拒绝：
    - 定义数组，保存拒绝原因，通过索引记录，目的是保证顺序和 Promise 数组一致
    - 通过次数判断是否全部拒绝，当全部拒绝时，通过 reject 传递 AggregateError 类型的错误，并将拒绝原因数组传递进去即可

```js
class MyPromise {
  // ...
  static any(promises) {
    // 1. 返回 promise， 数组判断
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises))
        return reject(new TypeError("promises must be an array"));
      // 2. 为空直接拒绝
      promises.length === 0 &&
        reject(new AggregateError(promises, "All promises were rejected"));
      // 3. 等待结果
      const errors = [];
      let count = 0;
      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(
          // 3.1 第一个兑现
          resolve,
          err => {
            // 3.2 全部拒绝
            errors[index] = err;
            count++;
            if (count === promises.length)
              reject(new AggregateError(errors, "All promises were rejected"));
          }
        );
      });
    });
  }
}
```

## Promise A+ 标准单元测试

**promises-aplus-tests**

- 提供 deferred 方法，返回对象{promise,resolve,reject}
  - 1.1 promise: pending 状态的 promise 实例（自己手写的 Promise)
  - 1.2 resolve: 以传入的原因兑现 promise
  - 1.3 reject: 以传入的原因拒绝 promise

```js
module.exports = {
  deferred() {
    const res = {};
    res.promise = new MyPromise((resolve, reject) => {
      res.resolve = resolve;
      res.reject = reject;
    });
    return res;
  },
};
```
