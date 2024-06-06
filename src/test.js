function Animal(name) {
  this.name = name;
}

function Dog(name, breed) {
  Animal.call(this.name);
  this.breed = breed;
}

const myDog = new Dog("dahuang", "Golden");
console.log(myDog.nam);
