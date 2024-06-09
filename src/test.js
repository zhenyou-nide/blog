function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + "makes a sound");
};

function Dog(name, breed) {
  // 使用构造函数继承，继承属性
  Animal.call(this, name);
  this.breed = breed;
}

// 使用 Object.create 继承原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // 修复 constructor 引用

Dog.prototype.speak = function () {
  console.log(this.name + "barks");
};
