function MyPromise(executor) {
  // 初始化 Promise 的状态和结果
  this._state = "pending";
  this._value = undefined;

  // 回调函数数组，用于存储成功和失败的回调
  this._callback = [];

  // 定义 resolve
  const resolve = value => {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = value;
      this._callback.forEach(item => item.onFulfilled(value));
    }
  };

  // 定义 reject
  const reject = reason => {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = reason;
      this._callback.forEach(item => item.onRejected(reason));
    }
  };

  // 执行 executor, 传入 resolve 和 reject 作为参数
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if ((this._state = "fulfilled")) {
    onFulfilled(this._value);
  } else if (this._state === "rejected") {
    this.onRejected(this._value);
  } else if (this._state === "pending") {
    this._callback.push({
      onFulfilled,
      onRejected,
    });
  }
};

// 实例

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("成功"), 1000);
});

P.then(
  result => {
    console.log(result);
  },
  error => {
    console.log(error);
  }
);
