function test(m) {
  m = { v: 50 };
  console.log(m, "inner");
}

var m = { v: 30 };
test(m);
console.log(m.v, "outer");
