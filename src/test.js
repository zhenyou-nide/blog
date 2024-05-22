let a;
let b = new Promise(resolve => {
  console.log(1);
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => {
  console.log(2);
});

a = new Promise(resolve => {
  console.log(a);
  b.then(() => {
    console.log(a);
    console.log(3);
    a.then(() => {
      resolve(true);
      console.log(4);
    });
  });
});

console.log(5);
