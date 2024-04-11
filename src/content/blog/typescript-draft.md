---
title: typescript
author: zhenyounide
pubDatetime: 2022-06-13T04:06:31Z
slug: typescript
featured: false
draft: true
tags:
  - problems
description: ""
---

###### 枚举类型：表示固定的几个取值

```ts
// 定义了一个名称叫做Gender的枚举类型, 这个枚举类型的取值有两个, 分别是Male和Femal
enum Gender {
  Male,
  Femal,
}
// 定义了一个名称叫做val的变量, 这个变量中只能保存Male或者Femal
let val: Gender;
val = Gender.Male;
val = Gender.Femal;
val = "nini"; // 报错
val = false; // 报错
val = 666; // 不会报错
// TS中的枚举底层实现的本质其实就是数值类型, 所以赋值一个数值不会报错
console.log(Gender.Male); // 0
console.log(Gender.Femal); // 1
console.log(Gender[0]); // Male
console.log(Gender[1]); // Femal

// 探究底层实现原理
var Gender;
(function (Gender) {
  // Gender[key] = value;
  Gender[(Gender["Male"] = 0)] = "Male";
  Gender[(Gender["Femal"] = 1)] = "Femal";
})(Gender || (Gender = {}));
// Gender["Male"] = 0  返回 0
let Gender = {};
Gender["Male"] = 0;
Gender[0] = "Male";
Gender["Femal"] = 1;
Gender[1] = "Femal";
```

###### any 和 void

- any 表示任意类型，一般用于定义一些通用性比较强的变量, 或者用于保存从其它框架中获取的不确定类型的值
- void 与 any 正好相反, 表示没有任何类型, 一般用于函数返回值，在 TS 中只有 null 和 undefined 可以赋值给 void 类型

###### Never 和 Object 类型

- Never：表示的是那些永不存在的值的类型

  一般用于抛出异常或根本不可能有返回值的函数

```ts
function demo(): never {
  throw new Error("报错了");
}
demo();

function demo2(): never {
  while (true) {}
}
demo2();
```

- Object:对象

`let obj:object`

###### 类型断言

```ts
let str1: any = "nini";
// 方式一
let len = (<string>str1).length;
// 方式二
// 注意点: 在企业开发中推荐使用as来进行类型转换(类型断言)
//         因为第一种方式有兼容性问题, 在使用到了JSX的时候兼容性不是很好
let len = (str1 as string).length;
console.log(len);
```

##### 接口类型

- 基本使用

```ts
interface FullName {
  firstName: string;
  lastName: string;
}
let obj = {
  firstName: "Jonathan",
  lastName: "Lee",
  // lastName:18
};
// 需求: 要求定义一个函数输出一个人完整的姓名, 这个人的姓必须是字符串, 这个人的名也必须是一个字符
function say({ firstName, lastName }: FullName): void {
  console.log(`我的姓名是:${firstName}_${lastName}`);
}
say(obj);
```

- 可选属性和索引签名

  _如果使用接口来限定了变量或者形参, 那么在给变量或者形参赋值的时候,赋予的值就必须和接口限定的一模一样才可以, 多一个或者少一个都不行_

  - 少一个或少多个怎么做? -->可选属性

  ```ts
  interface FullName {
    firstName: string;
    lastName: string;
    middleName?: string;
  }
  ```

  - 多一个或者多多个怎么做? 如果绕开 TS 检查

    - 方式一: 使用类型断言(告诉 ts 憋管我)

      ```ts
      say({
        firstName: "Jonathan",
        lastName: "Lee",
        middleName: "666",
        abc: "abc",
      } as FullName);
      ```

    - 方式二: 使用变量（不推荐）

      ```ts
      （let obj = {firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'};
      say(obj);
      ```

    - 方式三: 使用索引签名

      ```typescript
      interface FullName {
        firstName: string;
        lastName: string;
        middleName?: string;
        [propName: string]: any;
      }
      say({
        firstName: "Jonathan",
        lastName: "Lee",
        middleName: "666",
        abc: "abc",
        123: 123,
        def: "def",
      });
      ```

      **索引签名**：索引签名用于描述那些“通过索引得到”的类型，比如 arr[10]或 obj["key"]

      ```typescript
      interface FullName {
        [propName: string]: string;
      }
      let obj: FullName = {
        // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
        firstName: "Jonathan",
        lastName: "Lee",
        // middleName:false // 报错
        // false: '666' // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
      };
      ```

- 函数接口和混合类型接口

  - 函数接口

  ```typescript
  interface SumInterface {
    (a: number, b: number): number;
  }
  let sum: SumInterface = function (x: number, y: number): number {
    return x + y;
  };
  let res = sum(10, 20);
  console.log(res);
  ```

  - 混合类型接口：约定的内容中既有对象属性, 又有函数

  ```ts
  interface CountInterface {
    (): void;
    count: number;
  }
  let getCounter = (function (): CountInterface {
    /*
      CountInterface接口要求数据既要是一个没有参数没有返回值的函数
                                又要是一个拥有count属性的对象
      fn作为函数的时候符合接口中函数接口的限定 ():void
      fn作为对象的时候符合接口中对象属性的限定  count:number
      * */
    let fn = <CountInterface>function () {
      fn.count++;
      console.log(fn.count);
    };
    fn.count = 0;
    return fn;
  })();
  getCounter();
  getCounter();
  getCounter();
  ```

- 接口的继承

```ts
interface LengthInterface {
  length: number;
}
interface WidthInterface {
  width: number;
}
interface HeightInterface {
  height: number;
}
interface RectInterface
  extends LengthInterface,
    WidthInterface,
    HeightInterface {
  // length:number
  // width:number
  // height:number
  color: string;
}
let rect: RectInterface = {
  length: 10,
  width: 20,
  height: 30,
  color: "red",
};
```

##### 函数

###### 函数重载：同名的函数可以根据不同的参数实现不同的功能

```ts
function getArray(x: number): number[];
function getArray(str: string): string[];
// 实现函数的重载
function getArray(value: any): any[] {
  if (typeof value === "string") {
    return value.split("");
  } else {
    let arr = [];
    for (let i = 0; i <= value; i++) {
      arr.push(i);
    }
    return arr;
  }
}
```

##### 泛型

```ts
let getArray = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
};
// let arr = getArray<string>('abc');
// let arr = getArray<number>(6);
// 注意点: 泛型具体的类型可以不指定
//         如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
let arr = getArray("abc");
// let arr = getArray(6);
let res = arr.map(item => item.length);
console.log(res);
```

###### 泛型约束

默认情况下我们可以指定泛型为任意类型

但是有些情况下我们需要指定的类型满足某些条件后才能指定

那么这个时候我们就可以使用泛型约束

```ts
// 需求: 要求指定的泛型类型必须有Length属性才可以
interface LengthInterface {
  length: number;
}
let getArray = <T extends LengthInterface>(
  value: T,
  items: number = 5
): T[] => {
  return new Array(items).fill(value);
};
let arr = getArray<string>("abc");
// let arr = getArray<number>(6);
let res = arr.map(item => item.length);
```

###### 在泛型约束中使用类型参数

```ts
let getProps = (obj: object, key: string): any => {
  return obj[key];
};

let obj = {
  a: "a",
  b: "b",
};

console.log(getProps(obj, "c"));
// 代码不够健壮, 明明obj中没有c这个key但是却没有报错
// let res = getProps(obj, "c");

let getProps = <t, k extends keyof t>(obj: t, key: k): any => {
  return obj[key];
};

let obj = {
  a: "a",
  b: "b",
};

console.log(getProps(obj, "c")); // 报错
```

##### 类

###### 类属性修饰符

- public(公开的) :

  如果使用 public 来修饰属性, 那么表示这个属性是公开的

  可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

- protected(受保护的) :

  如果使用 protected 来修饰属性, 那么表示这个属性是受保护的

  可以在类的内部使用, 也可以在子类中使用

- private(私有的) :

  如果使用 private 来修饰属性, 那么表示这个属性是私有的

  可以在类的内部使用

- readonly(只读的) :

###### 类方法修饰符

- public :

  如果使用 public 来修饰方法, 那么表示这个方法是公开的

  可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

- protected :

  如果使用 protected 来修饰方法, 那么表示这个方法是受保护的

  可以在类的内部使用, 也可以在子类中使用

- private

  如果使用 private 来修饰方法, 那么表示这个方法是私有的

  可以在类的内部使用

###### 可选属性和参数属性

- 可选属性：和接口中的可选属性一样, 可传可不传的属性

  ```ts
  class Person {
    // 注意点: 在TS中如果定义了实例属性, 那么就必须在构造函数中使用, 否则就会报错
    name: string;
    age?: number; // 可选属性
    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
    // setNameAndAge(name:string, age:number){
    //   this.name = name;
    //   this.age = age;
    // }
  }
  let p = new Person("xxn");
  console.log(p);
  ```

- 参数属性: 一句话搞定实例属性的接收和定义

  ```ts
  class Person {
    name: string;
    age: number;
    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
  }
  class Person {
    constructor(
      public name: string,
      public age: number
    ) {}
  }
  let p = new Person("xxn", 18);
  console.log(p);
  ```

###### 存取器

通过 getters/setters 来截取对对象成员的访问

```ts
class Person {
  private _age: number = 0;
  set age(val: number) {
    console.log("进入了set age方法");
    if (val < 0) {
      throw new Error("人的年龄不能小于零");
    }
    this._age = val;
  }
  get age(): number {
    console.log("进入了get age方法");
    return this._age;
  }
}
let p = new Person();
p.age = 18;
// p.age = -6; // p.age(-6);
console.log(p.age);
```

###### 抽象类

```ts
// 定义基类  不被外界创建
class Person {
  name: string;
  age: number;
  protected constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Student extends Person {
  constructor(name: string, age: number) {
    super(name, age);
  }
}
// let p = new Person('xxn', 18); //报错
let stu = new Student("xxn", 18);
console.log(stu);
```

抽象类：专门用于定义哪些不希望被外界直接创建的类的

抽象类一般用于定义基类

抽象类和接口一样用于约束子类

```ts
abstract class Person {
  abstract name: string;
  abstract say(): void;
  // 子类必须有name 必须有say()
}
// let p = new Person(); // 报错
class Student extends Person {
  name: string = "xxn";
  say(): void {
    console.log(`我的名字是${this.name}`);
  }
}
let stu = new Student();
stu.say();
```

_抽象类和接口区别?_

- 接口中只能定义约束, 不能定义具体实现

- 而抽象类中既可以定义约束, 又可以定义具体实现

```ts
abstract class Person {
  abstract name: string;
  abstract say(): void;
  // 子类必须有name 必须有say()
  eat(): void {
    console.log(`${this.name}正在吃东西`);
  }
}
// let p = new Person();
class Student extends Person {
  name: string = "xxn";
  say(): void {
    console.log(`我的名字是${this.name}`);
  }
}
let stu = new Student();
stu.say();
stu.eat();
```

###### 类"实现"接口

```ts
interface PersonInterface {
  name: string;
  say(): void;
}
// 只要实现的某一个接口, 那么就必须实现接口中所有的属性和方法
class Person implements PersonInterface {
  name: string = "xxn";
  say(): void {
    console.log(`我的名字叫:${this.name}`);
  }
}
let p = new Person();
p.say();
```

###### 接口"继承"类

```ts
class Person {
  // protected name:string = 'xxn';
  name: string = "xxn";
  age: number = 18;
  protected say(): void {
    console.log(`name = ${this.name}, age = ${this.age}`);
  }
}
// let p = new Person();
// p.say();
// 注意点: 只要一个接口继承了某个类, 那么就会继承这个类中所有的属性和方法
//         但是只会继承属性和方法的声明, 不会继承属性和方法实现
// 注意点: 如果接口继承的类中包含了protected的属性和方法, 那么就只有这个类的子类才能实现这个接口
interface PersonInterface extends Person {
  gender: string;
}
class Student extends Person implements PersonInterface {
  gender: string = "male";
  name: string = "xxn";
  age: number = 18;
  say(): void {
    console.log(
      `name = ${this.name}, age = ${this.age}, gender = ${this.gender}`
    );
  }
}
let stu = new Student();
stu.say();
```

###### 类和泛型

```ts
class Chache<T> {
  arr: T[] = [];
  add(value: T): T {
    this.arr.push(value);
    return value;
  }
  all(): T[] {
    return this.arr;
  }
}
let chache = new Chache<number>();
chache.add(1);
chache.add(3);
chache.add(5);
console.log(chache.all());
```

###### 接口合并现象:

当我们定义了多个同名的接口时, 多个接口的内容会自动合并

```ts
interface TestInterface {
  name: string;
}
interface TestInterface {
  age: number;
}
/*
interface TestInterface {
    name:string;
    age:number;
}
* */

class Person implements TestInterface {
  age: number = 19;
  name: string = "nini";
}
```

##### 枚举

```ts
// 默认情况下就是数字枚举
enum Gender {
  Male,
  Female,
}
```

**枚举反向映射:**

- 可以根据枚举值获取到原始值

- 也可以根据原始值获取到枚举值

1. 数字枚举

   - 数字枚举的取值默认从 0 开始递增
   - 数字枚举的取值可以是字面量, 也可以是常量, 也可以是计算的结果

2. 字符串枚举

```ts
enum Gender {
  Male = "www.baidu.com",
  Female = "www.sina.com", // 注意点: 如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值
}
console.log(Gender.Male);
console.log(Gender.Female);
```

注意点:

- 如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值

- 和数字枚举不一样, 字符串枚举不能使用常量或者计算结果给枚举值赋值

- 虽然字符串枚举不能够使用常量或者计算结果给枚举值赋值, 但是它可以使用内部的其它枚举值来赋值

```ts
const str = "nini";
function getStr() {
  return "abc";
}
enum Gender {
  Male = "www.baidu.com",
  // Male = str, 报错
  // Male = getStr(),  报错
  Female = "www.sina.com",
  Yao = Female,
}
console.log(Gender.Female);
console.log(Gender.Yao);
```

3. 异构枚举

枚举中既包含数字又包含字符串, 我们就称之为异构枚举

```ts
enum Gender {
  Male = 6,
  Female = "nv",
}

console.log(Gender.Male);
console.log(Gender.Female);
console.log(Gender[6]);
// 注意点: 如果是字符串枚举, 那么无法通过原始值获取到枚举值
// console.log(Gender['nv']);
console.log(Gender);
```

###### 枚举成员类型

```ts
enum Gender {
  Male,
  Female,
}
interface TestInterface {
  age: Gender.Male;
}
class Person implements TestInterface {
  age: Gender.Male;
  // age: Gender.Female // 由于类型不匹配, 所以会报错
  // age: 0 // 注意点: 由于数字枚举的本质就是数值, 所以这里写一个数值也不会报错
}
```

```ts
enum Gender {
  Male = "www.baidu.com",
  Female = "www.sina.com",
}
interface TestInterface {
  age: Gender.Male;
}
class Person implements TestInterface {
  age: Gender.Male;
  // age: Gender.Female 报错
  // age: 'www.baidu.com' // 注意点: 如果是字符串枚举, 那么只能是枚举成员的值, 不能是其它的值 报错
  // age: string 报错
}
```

运行时枚举

- 枚举在编译之后是一个真实存储的对象, 所以可以在运行时使用

- 而像接口这种只是用来做约束做静态检查的代码, 编译之后是不存在的

常量枚举

- 普通枚举会生成真实存在的对象

- 常量枚举不会生成真实存在的对象, 而是利用枚举成员的值直接替换使用到的地方

```ts
enum Gender1 {
  Male,
  Female,
}
console.log(Gender1.Male === 0);

const enum Gender2 {
  Male,
  Female,
}
console.log(Gender2.Male === 0);
```

**类型兼容性，函数兼容性，枚举兼容性，类兼容性，泛型兼容性：不想做笔记**

##### 交叉和联合类型

1. 交叉类型

   格式: type1 & type2 & ...

   交叉类型是将多个类型合并为一个类型

   ```ts
   let mergeFn = <T, U>(arg1: T, arg2: U): T & U => {
     let res = {} as T & U;
     res = Object.assign(arg1, arg2);
     return res;
   };
   let res = mergeFn({ name: "nini" }, { age: 18 });
   console.log(res);
   ```

2. 联合类型

   格式: type1 | type2 | ...

   联合类型是多个类型中的任意一个类型

   ```ts
   let value: string | number;
   value = "abc";
   value = 123;
   ```

对于联合类型的变量，在使用时如何确切告诉编译器它是哪一种类型：**通过类型断言或者类型保护**

```ts
let getRandomValue = (): string | number => {
  let num = Math.random();
  return num >= 0.5 ? "abc" : 123.123;
};
```

- 虽然通过类型断言可以确切的告诉编译器当前的变量是什么类型,

  但是每一次使用的时候都需要手动的告诉编译器, 这样比较麻烦, 冗余代码也比较多

  ```ts
  if ((value as string).length) {
    console.log((value as string).length);
  } else {
    console.log((value as number).toFixed());
  }
  ```

- 定义了一个类型保护函数, 这个函数的'返回类型'是一个布尔类型,这个函数的返回值类型是, 传入的参数 + is 具体类型

  ```ts
  function isString(value: string | number): value is string {
    return typeof value === "string";
  }
  if (isString(value)) {
    console.log(value.length);
  } else {
    console.log(value.toFixed());
  }
  ```

- 除了可以通过 typeof 类实现类型保护以外, 我们还可以通过 instanceof 来实现类型保护

  ```ts
  class Person {
    name: string = "nini";
  }
  class Animal {
    age: number = 18;
  }
  let getRandomObject = (): Person | Animal => {
    let num = Math.random();
    return num >= 0.5 ? new Person() : new Animal();
  };
  let obj = getRandomObject();
  console.log(obj);
  if (obj instanceof Person) {
    console.log(obj.name);
  } else {
    console.log(obj.age);
  }
  ```

  ###### null 和 undefined

  - 默认情况下我们可以将 null 和 undefined 赋值给任意类型

  - 默认情况下 null 和 undefined 也可以相互赋值

  _注意点: 在企业开发中, 如果不想把 null 和 undefined 赋值给其它的类型或者不想让 null 和 undefined 相互赋值, 那么我们就可以开 strictNullChecks_

  - 如果我们开启了 strictNullChecks, 还想把 null 和 undefined 赋值给其它的类型， 那么我们就必须在声明的时候使用联合类型

    ```ts
    let value: number | null | undefined;
    value = null;
    value = undefined;
    ```

  - 对于可选属性和可选参数而言, 如果开启了 strictNullChecks, 那么默认情况下数据类型就是联合类型

    就是当前的类型 + undefined 类型

  - 去除 null 或 undefined 检测

    ```ts
    function getLength(value: string | null | undefined) {
      value = "abc";
      return () => {
        // return value.length; // 报错
        // return (value || '').length;
        // return (value as string).length;
        // 我们可以使用!来去除null和undefined
        // !的含义就是这个变量一定不是null和undefined
        return value!.length;
      };
    }
    let fn = getLength("www.it66.com");
    let res = fn();
    console.log(res);
    ```

##### 兼容性

###### 类型兼容性

```ts
interface TestInterface {
  name: string;
}

let p1 = { name: "nini" };
let p2 = { age: 18 };
let p3 = { name: "nini", age: 18 };

let t: TestInterface;
t = p1;
t = p2; // 报错
t = p3; // 可多不可少

interface TestInterface {
  name: string;
  children: {
    age: number;
  };
}

let p1 = { name: "nini", children: { age: 18 } };
let p2 = { name: "nini", children: { age: "abc" } };

let t: TestInterface;
t = p1;
t = p2; // 报错 会递归检查
```

###### 函数兼容性

1. 参数个数

   ```ts
   let fn1 = (x: number, y: number) => {};
   let fn2 = (x: number) => {};
   fn1 = fn2;
   fn2 = fn1; //报错 可少不可多
   ```

2. 参数类型

   ```ts
   let fn1 = (x: number) => {};
   let fn2 = (x: number) => {};
   let fn3 = (x: string) => {};
   fn1 = fn2;
   fn2 = fn1;
   fn1 = fn3; // 报错 必须一模一样
   fn3 = fn1; // 报错
   ```

3. 返回值类型

   ```ts
   let fn1 = (): number => 123;
   let fn2 = (): number => 456;
   let fn3 = (): string => "abc";
   fn1 = fn2;
   fn2 = fn1;
   fn1 = fn3; // 报错必须一模一样
   fn3 = fn1; // 报错必须一模一样
   ```

4. 函数双向协变

   - 参数的双向协变

     ```ts
     let fn1 = (x: number | string) => {};
     let fn2 = (x: number) => {};
     fn1 = fn2;
     fn2 = fn1;
     ```

   - 返回值的双向协变

     ```ts
     let fn1 = (x: boolean): number | string => (x ? 123 : "abc");
     let fn2 = (x: boolean): number => 456;
     fn1 = fn2; // 不报错 但是可以将返回值是具体类型的赋值给联合类型的
     fn2 = fn1; //报错  不能将返回值是联合类型的赋值给具体类型的
     ```

5. 函数重载

   ```ts
   function add(x: number, y: number): number;
   function add(x: string, y: string): string;
   function add(x, y) {
     return x + y;
   }

   function sub(x: number, y: number): number;
   function sub(x, y) {
     return x - y;
   }

   // let fn = add;
   // fn = sub; // 报错 不能将重载少的赋值给重载多的

   let fn = sub;
   fn = add; // 可以将重载多的赋值给重载少
   ```

###### 枚举兼容性

- 数字枚举与数值兼容

  ```ts
  enum Gender {
    Male,
    Female,
  }
  let value: Gender;
  value = Gender.Male;
  value = 1;
  ```

- 数字枚举与数字枚举不兼容

  ```ts
  enum Gender {
    Male, // 0
    Female, // 1
  }
  enum Animal {
    Dog, // 0
    Cat, // 1
  }
  let value: Gender;
  value = Gender.Male;
  value = Animal.Dog; // 报错
  ```

- 字符串枚举与字符串不兼容

  ```ts
  enum Gender {
    Male = "abc",
    Female = "def",
  }
  let value: Gender;
  value = Gender.Male;
  value = "abc";
  ```

###### 类兼容性

- 只比较实例成员, 不比较类的构造函数和静态成员
- 类的私有属性和受保护属性会影响兼容性

###### 泛型兼容性

泛型只影响使用的部分, 不会影响声明的部分

```ts
interface TestInterface<T> {
  // age:T;
}
let t1: TestInterface<number>; // age:number
let t2: TestInterface<string>; // age:string
t1 = t2;
t2 = t1;
```

##### 类型别名和接口的异同点

1. 都可以描述属性或方法

   ```ts
   type MyType = {
     name: string;
     say(): void;
   };
   interface MyInterface {
     name: string;
     say(): void;
   }
   ```

2. 都允许拓展

   ```ts
   interface MyInterface {
     name: string;
     say(): void;
   }
   interface MyInterface2 extends MyInterface {
     age: number;
   }
   let value: MyInterface2 = {
     name: "nini",
     age: 18,
     say(): void {},
   };

   type MyType = {
     name: string;
     say(): void;
   };
   type MyType2 = MyType & {
     age: number;
   };
   let value: MyType2 = {
     name: "nini",
     age: 18,
     say(): void {},
   };
   ```

3. type 可以声明基本类型别名，联合类型，元组等类型, interface 不能

   ```ts
   type MyType1 = boolean;
   type MyType2 = string | number;
   type MyType3 = [string, boolean, number];
   ```

4. type 不会自动合并

   ```ts
   interface MyInterface {
     name: string;
   }
   interface MyInterface {
     age: number;
   }
   let value: MyInterface = {
     name: "nini",
     age: 18,
   };

   type MyType = {
     name: string;
   };
   type MyType = {
     age: number;
   };
   ```

   ##### 可辨识联合

   1. 什么是可辨识联合
      具有共同的可辨识特征。
      一个类型别名, 包含了具有共同的可辨识特征的类型的联合。

   ```ts
   interface Square {
     kind: "square"; // 共同的可辨识特征
     size: number;
   }
   interface Rectangle {
     kind: "rectangle"; // 共同的可辨识特征
     width: number;
     height: number;
   }
   interface Circle {
     kind: "circle"; // 共同的可辨识特征
     radius: number;
   }
   /*
   Shape就是一个可辨识联合
   因为: 它的取值是一个联合
   因为: 这个联合的每一个取值都有一个共同的可辨识特征
   * */
   type Shape = Square | Rectangle | Circle;

   function aera(s: Shape) {
     switch (s.kind) {
       case "square":
         return s.size * s.size;
       case "rectangle":
         return s.width * s.height;
       case "circle":
         return Math.PI * s.radius ** 2; // **是ES7中推出的幂运算符
     }
   }
   ```

   在企业开发中如果相对可辨识联合的完整性进行检查, 那么我们可以使用

   - 方式一: 给函数添加返回值 + 开启 strictNullChecks

     ```ts
     function aera(s: Shape): number {
       switch (s.kind) {
         case "square":
           return s.size * s.size;
         case "rectangle":
           return s.width * s.height;
         case "circle":
           return Math.PI * s.radius ** 2; // **是ES7中推出的幂运算符
       }
     }
     ```

   - 方式二: 添加 default + never(不常用)

     ```ts
     function MyNever(x: never): never {
       throw new Error("可辨识联合处理不完整" + x);
     }
     function aera(s: Shape): number {
       switch (s.kind) {
         case "square":
           return s.size * s.size;
         case "rectangle":
           return s.width * s.height;
         case "circle":
           return Math.PI * s.radius ** 2; // **是ES7中推出的幂运算符
         default:
           return MyNever(s);
       }
     }
     ```

##### 索引类型

通过[]索引类型访问操作符, 我们就能得到某个索引的类型

```ts
class Person {
  name: string;
  age: number;
}
type MyType = Person["name"];
```

- 应用场景

  需求: 获取指定对象, 部分属性的值, 放到数组中返回

  ```ts
  let obj = {
    name: "nini",
    age: 18,
    gender: true,
  };
  function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    let arr = [] as T[K][];
    keys.forEach(key => {
      arr.push(obj[key]);
    });
    return arr;
  }
  let res = getValues(obj, ["name", "age"]);
  console.log(res);
  ```

  _索引访问操作符注意点,不会返回 null/undefined/never 类型_

#### 组件性能优化

- 类组件

  `extend PureComponent`

- 函数组件

  ```jsx
  const son = React.memo(function () {
    return <div>哈哈哈</div>;
  });
  ```

##### 映射类型?

根据旧的类型创建出新的类型, 我们称之为映射类型

- 只读/可选

  通过+/-来指定添加还是删除 只读和可选修饰符

  ```tsx
  interface TestInterface1 {
    name: string;
    age: number;
  }
  interface TestInterface2 {
    readonly name?: string;
    readonly age?: number;
  }
  type ReadonlyTestInterface<T> = {
    // [P in keyof T]作用: 遍历出指定类型所有的key, 添加到当前对象上
    // readonly [P in keyof T]: T[P]
    // readonly [P in keyof T]?: T[P]
    -readonly [P in keyof T]-?: T[P];
  };
  type MyType = ReadonlyTestInterface<TestInterface2>;
  ```

  **由于生成只读属性和可选属性比较常用**, 所以 TS 内部已经给我们提供了现成的实现:Readonly / Partial

  ```ts
  type MyType2 = Readonly<TestInterface1>;
  type MyType3 = Partial<TestInterface1>;
  type MyType4 = Partial<Readonly<TestInterface1>>;
  ```

- Pick 映射类型:将原有类型中的部分内容映射到新类型中

  ```ts
  interface TestInterface {
    name: string;
    age: number;
  }
  type MyType = Pick<TestInterface, "name">;
  ```

- Record 映射类型:他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

  ```ts
  type Animal = "person" | "dog" | "cat";
  interface TestInterface {
    name: string;
    age: number;
  }
  type MyType = Record<Animal, TestInterface>;

  let res: MyType = {
    person: {
      name: "zs",
      age: 18,
    },
    dog: {
      name: "wc",
      age: 3,
    },
    cat: {
      name: "mm",
      age: 2,
    },
  };
  ```

##### 分布式条件类型

1. 条件类型(三目运算)

   判断前面一个类型是否是后面一个类型或者继承于后面一个类型

   如果是就返回第一个结果, 如果不是就返回第二个结果

   语法: `T extends U ? X : Y;`

2. 分布式条件类型?

   被检测类型是一个联合类型的时候, 该条件类型就被称之为分布式条件类型

   - 从 T 中剔除可以赋值给 U 的类型。 Exclude

     ```ts
     type MyType<T, U> = T extends U ? never : T;
     type res = MyType<string | number | boolean, number>;
     type res = Exclude<string | number | boolean, number>;
     ```

   - 提取 T 中可以赋值给 U 的类型。 Extract

     ```ts
     type res = Extract<string | number | boolean, number | string>;
     ```

   - 从 T 中剔除 null 和 undefined。 NonNullable

     ```ts
     type res = NonNullable<string | null | boolean | undefined>;
     ```

   - 获取函数返回值类型。 ReturnType

     ```ts
     type res = ReturnType<() => number>;
     ```

   - 获取一个类的构造函数参数组成的元组类型 ConstructorParameters

     ```ts
     class Person {
       constructor(name: string, age: number) {}
     }
     type res = ConstructorParameters<typeof Person>;
     ```

   - 获得函数的参数类型组成的元组类型。 Parameters

     ```ts
     function say(name: string, age: number, gender: boolean) {}
     type res = Parameters<typeof say>;
     ```

   ##### infer 关键字

   条件类型提供了一个 infer 关键字, 可以让我们在条件类型中定义新的类型

   需求: 定义一个类型, 如果传入的是数组, 就返回数组的元素类型,

   ​ 如果传入的是普通类型, 则直接返回这个类型

   ```ts
   type MyType<T> = T extends any[] ? T[number] : T;
   type res = MyType<string[]>;
   type res = MyType<number>;

   type MyType<T> = T extends Array<infer U> ? U : T;
   type res = MyType<string[]>;
   type res = MyType<number>;
   ```
