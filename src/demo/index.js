// function debounce(fn, delay) {
//   let timer = null;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn(...args);
//       clearTimeout(timer);
//     }, delay);
//   };
// }

// function throttle(fn, delay) {
//   let timer = null;
//   return function (...args) {
//     if (timer) return;
//     timer = setTimeout(function () {
//       fn(...args);
//       clearTimeout(timer);
//       timer = null;
//     }, delay);
//   };
// }

// (function main() {})();

const person = {
  name: "xxn",
};
Function.prototype.myBind = function (thisArg, ...args) {
  return (...reArgs) =>
    // this: 未来调用 myBind 的函数
    this.call(thisArg, ...args, ...reArgs);
};

function fun(numA, numB, numC, numD) {
  console.log(this);
  console.log(numA, numB, numC, numD);
  return numA + numB + numC + numD;
}

const bindFunc = fun.myBind(person, 1, 2);
const res = bindFunc(3, 4);
console.log("🚀 ~ res:", res);
