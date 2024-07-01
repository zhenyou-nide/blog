const curry = func => {
  return (...args) => {
    if (args.length >= func.length) {
      console.log("a", args, func, args.length, func.length);
      return func(...args);
    } else {
      console.log("b", args, func, args.length, func.length);
      return (...nextArgs) => {
        console.log("c", args, func, args.length, func.length);
        return curry(func)(...args, ...nextArgs);
      };
    }
  };
};

// 示例函数
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
