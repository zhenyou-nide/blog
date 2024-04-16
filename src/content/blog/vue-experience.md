---
title: 专注于 使用 react 的我来浅浅尝试下 vue 开发
author: zhenyounide
pubDatetime: 2022-06-14T04:06:31Z
slug: vue-experience
featured: false
draft: true
tags:
  - vue
description: ""
---

## Table of contents

# 01-开篇

1. 什么是 Vue?

   Vue.js 是一套构建用户界面的`框架`，它不仅易于上手，还可以与其它第三方库整合 (Swiper、IScroll、...)。

2. 框架和库的区别？

   - 框架：是一套完整的解决方案；对项目的`侵入性`较大，项目如果需要更换框架，则需要重构整个项目。
   - 库（插件）：提供某一个小功能，对项目的`侵入性`较小，如果某个库无法完成某些需求，可以很容易切换到其它库实现需求。
     例如：从 jQuery 切换到 Zepto, 无缝切换
     从 IScroll 切换到 ScrollMagic, 只需要将用到 IScroll 的代码替换成 ScrollMagic 代码即可

3. 为什么要学习框架？
   提升开发效率：在企业中，时间就是效率，效率就是金钱；
   前端提高开发效率的发展历程：原生 JS -> jQuery 之类的类库 -> 前端模板引擎 -> Vue / React / Angular

4. 框架有很多，为什么要先学 Vue

   Vue、Angular、React 一起，被称之为前端三大主流框架！
   但是 Angular、React 是老外编写的，所以所有的资料都是英文的
   而 Vue 是国人编写的，所以所有的资料都是中文的，并且 Vue 中整合了 Angular、React 中的众多优点
   所以为了降低我们的学习难度，我们先学 Vue, 学完之后再学习 Angular 和 React

5. 使用 Vue 有哪些优势？

   - Vue 的核心概念之一：
     通过数据驱动界面更新，无需操作 DOM 来更新界面
     使用 Vue 我们只需要关心如何获取数据，如何处理数据，如何编写业务逻辑代码，
     我们只需要将处理好的数据交给 Vue, Vue 就会自动将数据渲染到模板中（界面上）

   - Vue 的核心概念之二：
     组件化开发，我们可以将网页拆分成一个个独立的组件来编写
     将来再通过封装好的组件拼接成一个完整的网页

# 02-基本模板

### Vue 框架使用方式

1. 传统下载导入使用

2. vue-cli 安装导入使用

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>02-Vue 基本模板</title>
    <!--1. 下载导入 Vue.js-->
    <script src="js/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <p>{{ name }}</p>
    </div>
    <script>
      // 2. 创建一个 Vue 的实例对象
      let vue = new Vue({
        // 3. 告诉 Vue 的实例对象，将来需要控制界面上的哪个区域
        el: "#app",
        // 4. 告诉 Vue 的实例对象，被控制区域的数据是什么
        data: {
          name: "xxn",
        },
      });
    </script>
  </body>
</html>
```

# 03-数据传递

## 03-1-数据单向传递

1. MVVM 设计模式

   在 MVVM 设计模式中由 3 个部分组成

   |     |
   | --: | :--------- | :---------------------------------------------------------- |
   |   M | Model      | 数据模型（保存数据，处理数据业务逻辑）                      |
   |   V | View       | 视图（展示数据，与用户交互）                                |
   |  VM | View Model | 数据模型和视图的桥梁 (M 是中国人，V 是美国人，VM 就是翻译） |

   MVVM 设计模式最大的特点就是 **支持数据的双向传递**

   - 数据可以从 M -> VM -> V
   - 也可以从 V -> VM -> M

2. Vue 中 MVVM 的划分

   Vue 其实是基于 MVVM 设计模式的

   - 被控制的区域：View
   - Vue 实例对象 : View Model
   - 实例对象中的 data: Model

3. Vue 中数据的单向传递

   我们把"数据（Model）"交给"Vue 实例对象（View Model ）", "Vue 实例对象（View Model ）"将数据交给"界面（View）"

## 03-2-数据单向传递

默认情况下 Vue 只支持数据单向传递 M -> VM -> V;
但是由于 Vue 是基于 MVVM 设计模式的，所以也提供了双向传递的能力；
在`<input>`、`<textarea> `及` <select>` 元素上可以用 v-model 指令创建双向数据绑定；
_注意点：v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值；
而总是将 Vue 实例的数据作为数据来源_

# 04-常用指令

指令就是 Vue 内部提供的一些自定义属性，这些属性中封装好了 Vue 内部实现的一些功能；只要使用这些指令就可以使用 Vue 中实现的这些功能

## v-once

Vue 数据绑定的特点是只要数据发生变化，界面就会跟着变化，`v-once` 指令就是让界面不要跟着数据变化，只渲染一次，即永远是初始化数据

## v-cloak

1. Vue 数据绑定过程

   1. 会先将未绑定数据的界面展示给用户
   2. 然后再根据模型中的数据和控制的区域生成绑定数据之后的 HTML 代码
   3. 最后再将绑定数据之后的 HTML 渲染到界面上

   正是在最终的 HTML 被生成渲染之前会先显示模板内容
   所以如果用户网络比较慢或者网页性能比较差，那么用户会看到模板内容

2. 如何解决这个问题

   利用 `v-cloak` 配合 `[v-cloak]:{display: none}`

   默认先隐藏未渲染的界面，等到生成 HTML 渲染之后再重新显示

3. `v-cloak` 指令作用：数据渲染之后自动显示元素

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>v-cloak</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <!--这里就是 MVVM 中的 View-->
    <div id="app">
      <p v-cloak>{{ name }}</p>
    </div>
    <script src="js/vue.js"></script>
    <script>
      // 这里就是 MVVM 中的 View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是 MVVM 中的 Model
        data: {
          name: "xxn",
        },
      });
    </script>
  </body>
</html>
```

## v-text 和 v-html

### v-text

相当于过去学习的 `innerText`

### v-html

相当于过去学习的 `innerHtml`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>v-text 和 v-html</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是 MVVM 中的 View-->
    <div id="app">
      <!--插值的方式：可以将指定的数据插入到指定的位置-->
      <p>----{{ name }}----</p>
      <!-- ----xxn---- -->
      <!--插值的方式：不会解析 HTML-->
      <p>----{{ msg }}----</p>
      <!-- ----<span>我是 span</span>---- -->

      <!--v-text 的方式：会覆盖原有的内容-->
      <p v-text="name">++++++++</p>
      <!-- xxn -->
      <!--v-text 的方式：也不会解析 HTML-->
      <p v-text="msg">++++++++</p>
      <!-- <span>我是 span</span> -->

      <!--v-html 的方式：会覆盖原有的内容-->
      <p v-html="name">++++++++</p>
      <!-- xxn -->
      <!--v-html 的方式：会解析 HTML-->
      <p v-html="msg">++++++++</p>
      <!-- 我是 span -->
    </div>
    <script>
      // 这里就是 MVVM 中的 View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是 MVVM 中的 Model
        data: {
          name: "xxn",
          msg: "<span>我是 span</span>",
        },
      });
    </script>
  </body>
</html>
```

## v-if

1. 什么是 `v-if` 指令

   条件渲染：如果 `v-if` 取值是 true 就渲染元素，如果不是就不渲染元素

2. `v-if` 特点：
   如果条件不满足根本就不会创建这个元素（重点）

3. `v-if` 注意点

   - `v-if` 可以从模型中获取数据
   - `v-if` 也可以直接赋值一个表达式

4. `v-else` 指令

   `v-else` 指令可以和 `v-if` 指令配合使用，当 `v-if` 不满足条件时就执行 `v-else` 就显示 `v-else` 中的内容

5. `v-else` 注意点

   - `v-else` 不能单独出现
   - `v-if` 和 `v-else` 中间不能出现其它内容

6. `v-else-if` 指令

   `v-else-if` 可以和 `v-if` 指令配合使用，当 `v-if` 不满足条件时就依次执行后续 `v-else-if`, 哪个满足就显示哪个

7. `v-else-if` 注意点：和 `v-else` 一样

## v-show

1. 什么是 `v-show` 指令

   `v-show` 和`v-if` 的能够一样都是条件渲染，取值为 true 就显示，取值为 false 就不显示

2. `v-if` 和 `v-show` 区别

   - `v-if`: 只要取值为 false 就不会创建元素
   - `v-show`: 哪怕取值为 false 也会创建元素，只是如果取值是 false 会设置元素的 display 为 none

3. `v-if` 和 `v-show` 应用场景

   - 由于取值为 false 时 `v-if` 不会创建元素，所以如果需要切换元素的显示和隐藏，每次 `v-if` 都会创建和删除元素
   - 由于取值为 false 时 `v-show` 会创建元素并设置 display 为 none, 不会反复创建和删除，只是修改 display 的值

   所以：如果企业开发中需要频繁切换元素显示隐藏，那么推荐使用 `v-show`, 否则使用 `v-if`

## v-for

1. 什么是`v-for`指令

   相当于 JS 中的 for in 循环，可以根据数据多次渲染元素

2. `v-for`特点

   可以遍历 数组，字符，数字，对象

## v-bind

1. 什么是`v-bind`指令

   在企业开发中想要给"元素"绑定数据，我们可以使用`{{}}`, `v-text`, `v-html`

   但是如果想给"元素的属性"绑定数据，就必须使用`v-bind`

   所以`v-bind`的作用是专门用于给"元素的属性"绑定数据的

2. v-bind 格式

   `v-bind: 属性名称="绑定的数据"`

   `: 属性名称="绑定的数据"`

3. v-bind 特点

   赋值的数据可以是任意一个合法的 JS 表达式；例如：`: 属性名称="age + 1"`

### v-bind 绑定类名

1.  `v-bind`指令的作用

    `v-bind`指令给"任意标签"的"任意属性"绑定数据

    对于大部分的属性而言我们只需要直接赋值即可，例如：value="name"

    但是对于 class 和 style 属性而言，它的格式比较特殊

2.  通过 v-bind 绑定类名格式

    `:class="['需要绑定类名', ...]"`

3.  注意点：
    `<p class="size color active">我是段落</p>`

    1.  直接赋值一个类名（没有放到数组中）默认去 Model 中查找

            `:class="需要绑定类名"`

            `<p :class="size">我是段落</p>`

            如果需要通过`v-bind`给 class 绑定类名，那么不能直接赋值；

        默认情况下`v-bind`会去 Model 中查找数据，但是 Model 中没有对应的类名，所以无效，所以不能直接赋值

    2.  数组中的类名没有用引号括起来也会去 Model 中查找

            `:class="[需要绑定类名]"`

            `<p :class="[size]">我是段落</p>`

            如果想让 v-bind 去 style 中查找类名，那么就必须把类名放到数组中

        但是放到数组中之后默认还是回去 Model 中查找

    3.  数组的每一个元素都可以是一个三目运算符按需导入

        `:class="[flag?'active':'']"`

        `<p :class="['size', 'color', 'active']">我是段落</p>`

        将类名放到数组中之后，还需要利用引号将类名括起来才会去 style 中查找

    4.  可以使用对象来替代数组中的三目运算符按需导入

            `:class="[{'active': true}]"`

            `<p :class="['size', 'color', flag ? 'active' : '']">我是段落</p>`

            如果是通过 v-bind 类绑定类名，那么在绑定的时候可以编写一个三目运算符来实现按需绑定

        格式：条件表达式 ? '需要绑定的类名' : ''

    5.  绑定的类名太多可以将类名封装到 Model 中

            ```
            obj: {
                'color': true,
                'size': true,
                'active': false,
            }
            ```

            `<p :class="['size', 'color',{'active' : false}]">我是段落</p>`

            如果是通过 v-bind 类绑定类名，那么在绑定的时候可以通过对象来决定是否需要绑定

        格式：{'需要绑定的类名' : 是否绑定}

    6.  绑定类名企业应用场景

        从服务器动态获取样式后通过 v-bind 动态绑定类名

        这样就可以让服务端来控制前端样式

        常见场景：618 双 11 等

### v-bind 绑定样式

1. 如何通过 v-bind 给 style 属性绑定数据

   1. 将数据放到对象中

      `:style="{color:'red','font-size':'50px'}"`

   2. 将数据放到 Model 对象中
      ```
      obj: {
          color: 'red',
          'font-size': '80px',
      }
      ```

2. 注意点

   1. 如果属性名称包含-, 那么必须用引号括起来
   2. 如果需要绑定 Model 中的多个对象，可以放到一个数组中赋值

## v-on

### 概念

1. 什么是`v-on`指令？
   `v-on`指令专门用于给元素绑定监听事件

2. `v-on`指令格式

   `v-on: 事件名称="回调函数名称"`

   `@事件名称="回调函数名称"`

3. `v-on`注意点：
   `v-on`绑定的事件被触发之后，会去 Vue 实例对象的 methods 中查找对应的回调函数

_注意点：_

1. 如果是通过 v-on 来绑定监听事件，那么在指定事件名称的时候不需要写 on
2. 如果是通过 v-on 来绑定监听事件，那么在赋值的时候必须赋值一个回调函数的名称

### 修饰符

| 修饰符   | 作用                                               |
| -------- | -------------------------------------------------- |
| .once    | 只触发一次回调。                                   |
| .prevent | 调用 event.preventDefault()。                      |
| .stop    | 调用 event.stopPropagation()。                     |
| .self    | 只当事件是从侦听器绑定的元素本身触发时才触发回调。 |
| .capture | 添加事件侦听器时使用 capture 模式。                |

### 注意点

1. 绑定回调函数名称的时候，后面可以写 () 也可以不写

   ```
   v-on:click="myFn"
   v-on:click="myFn()"
   ```

2. 可以给绑定的回调函数传递参数
   ` v-on:click="myFn('xxn', 18)"`

3. 如果在绑定的函数中需要用到 data 中的数据必须加上 this

## 按键修饰符

1. 什么是按键修饰符

   我们可以通过按键修饰符监听特定按键触发的事件

   例如：可以监听当前事件是否是回车触发的，可以监听当前事件是否是 ESC 触发的等

2. 按键修饰符分类
   - 系统预定义修饰符
   - 自定义修饰符

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>v-on 按键修饰符</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是 MVVM 中的 View-->
    <div id="app">
      <!--    <input type="text" @keyup.enter="myFn">-->
      <input type="text" @keyup.f2="myFn" />
    </div>
    <script>
      Vue.config.keyCodes.f2 = 113;
      // 这里就是 MVVM 中的 View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是 MVVM 中的 Model
        data: {},
        // 专门用于存储监听事件回调函数
        methods: {
          myFn() {
            alert("xxn");
          },
        },
      });
    </script>
  </body>
</html>
```

## 自定义全局指令

### 使用

1. 自定义全局指令
   在 Vue 中除了可以使用 Vue 内置的一些指令以外，我们还可以自定义指令

2. 自定义全局指令语法

   ```
   Vue.directive('自定义指令名称', {
       生命周期名称：function (el) {
           指令业务逻辑代码
       }
   });
   ```

3. 指令生命周期方法

   自定义指令时一定要明确指令的业务逻辑代码更适合在哪个阶段执行

   例如：指令业务逻辑代码中没有用到元素事件，那么可以在 bind 阶段执行

   例如：指令业务逻辑代码中用到了元素事件，那么就需要在 inserted 阶段执行

4. 自定义指令注意点

   使用时需要加上 v-, 而在自定义时不需要加上 v-

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>自定义指令</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是 MVVM 中的 View-->
    <div id="app">
      <!--    <p v-color>我是段落</p>-->
      <input type="text" v-focus />
    </div>
    <script>
      /*
    directive 方法接收两个参数
    第一个参数：指令的名称
    第二个参数：对象
    注意点：在自定义指令的时候，在指定指令名称的时候，不需要写 v-
    注意点：指令可以在不同的生命周期阶段执行
    bind: 指令被绑定到元素上的时候执行
    inserted: 绑定指令的元素被添加到父元素上的时候执行
    * */
      Vue.directive("color", {
        // 这里的 el 就是被绑定指令的那个元素
        bind: function (el) {
          el.style.color = "red";
        },
      });
      Vue.directive("focus", {
        // 这里的 el 就是被绑定指令的那个元素
        inserted: function (el) {
          el.focus();
        },
      });
      // 这里就是 MVVM 中的 View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是 MVVM 中的 Model
        data: {},
        // 专门用于存储监听事件回调函数
        methods: {},
      });
    </script>
  </body>
</html>
```

### 参数

1. 自定义指令参数

   在使用官方指令的时候我们可以给指令传参

   例如: v-model="name"

   在我们自定义的指令中我们也可以传递传递

2. 获取自定义指令传递的参数

   在执行自定义指令对应的方法的时候, 除了会传递el给我们, 还会传递一个对象给我们；这个对象中就保存了指令传递过来的参数

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>19-常用指令-自定义指令参数</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是MVVM中的View-->
    <div id="app">
      <!--    <p v-color="'blue'">我是段落</p>-->
      <p v-color="curColor">我是段落</p>
    </div>
    <script>
      Vue.directive("color", {
        // 这里的el就是被绑定指令的那个元素
        bind: function (el, obj) {
          // el.style.color = "red";
          el.style.color = obj.value;
        },
      });
      // 这里就是MVVM中的View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是MVVM中的Model
        data: {
          curColor: "green",
        },
        // 专门用于存储监听事件回调函数
        methods: {},
      });
    </script>
  </body>
</html>
```

## 自定义局部指令

1. 自定义全局指令的特点

   在任何一个Vue实例控制的区域中都可以使用

2. 自定义局部指令的特点

   只能在自定义的那个Vue实例中使用

3. 如何自定义一个局部指令

   给创建Vue实例时传递的对象添加

   ```
   directives: {
       // key: 指令名称
       // value: 对象
       'color': {
           bind: function (el, obj) {
               el.style.color = obj.value;
           }
       }
   }
   ```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>21-常用指令-自定义局部指令</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是MVVM中的View-->
    <div id="app1">
      <p v-color="'blue'">我是段落</p>
    </div>
    <div id="app2">
      <p v-color="'red'">我是段落</p>
    </div>
    <script>
      /*
    Vue.directive("color", {
        // 这里的el就是被绑定指令的那个元素
        bind: function (el, obj) {
            el.style.color = obj.value;
        }
    });
     */
      // 这里就是MVVM中的View Model
      let vue1 = new Vue({
        el: "#app1",
        // 这里就是MVVM中的Model
        data: {},
        // 专门用于存储监听事件回调函数
        methods: {},
      });
      // 这里就是MVVM中的View Model
      let vue2 = new Vue({
        el: "#app2",
        // 这里就是MVVM中的Model
        data: {},
        // 专门用于存储监听事件回调函数
        methods: {},
        // 专门用于定义局部指令的
        directives: {
          color: {
            // 这里的el就是被绑定指令的那个元素
            bind: function (el, obj) {
              el.style.color = obj.value;
            },
          },
        },
      });
    </script>
  </body>
</html>
```

## 计算属性

1. 插值语法特点

   可以在{{}}中编写合法的JavaScript表达式

2. 在插值语法中编写JavaScript表达式缺点

   - 没有代码提示
   - 语句过于复杂不利于我们维护

3. 如何解决?

   对于任何复杂逻辑，你都应当使用计算属性

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>22-Vue-计算属性</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <!--这里就是MVVM中的View-->
    <div id="app">
      <p>{{name}}</p>
      <p>{{age + 1}}</p>
      <p>{{msg.split("").reverse().join("")}}</p>
      <!--
    注意点:
    虽然在定义计算属性的时候是通过一个函数返回的数据
    但是在使用计算属性的时候不能在计算属性名称后面加上()
    因为它是一个属性不是一个函数(方法)
    -->
      <p>{{msg2}}</p>
    </div>
    <script>
      // 这里就是MVVM中的View Model
      let vue = new Vue({
        el: "#app",
        // 这里就是MVVM中的Model
        data: {
          name: "xxn",
          age: 18,
          msg: "abcdef",
        },
        // 专门用于存储监听事件回调函数
        methods: {},
        // 专门用于定义计算属性的
        computed: {
          msg2: function () {
            let res = "abcdef".split("").reverse().join("");
            return res;
          },
        },
      });
    </script>
  </body>
</html>
```

### 计算属性与函数
