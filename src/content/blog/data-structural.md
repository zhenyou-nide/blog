---
title: 数据结构回顾
author: zhenyounide
pubDatetime: 2023-01-02T04:06:31Z
slug: data-structural
featured: false
draft: false
tags:
  - summary
description: 通过自己实现算法来回顾数据结构主要知识点
---

```js
const BASE_STR = "0123456789ABCDEF";
const BASE_ARR = BASE_STR.split("");

// LIFO
class Stack {
  #item = [];
  push(i) {
    this.#item.push(i);
  }
  pop() {
    return this.#item.pop();
  }

  peek() {
    return this.#item.at(-1);
  }

  size() {
    return this.#item.length;
  }
}
// 十进制 to n 进制, 辗转相除
function convert(num, base = 2) {
  let res = "";
  let currentNum = num;
  const stack = new Stack();
  while (currentNum > 0) {
    stack.push(BASE_STR[currentNum % base]);
    currentNum = Math.floor(currentNum / base);
  }

  while (!!stack.size()) {
    res += stack.pop();
  }
  return res;
}

function deConvert(strNum, base) {
  let currentStr = strNum.split("");
  let res = 0;

  for (let i = 0; i < currentStr.length; i++) {
    console.log(BASE_ARR.indexOf(currentStr[i]));
    res +=
      Math.pow(base, currentStr.length - i - 1) *
      BASE_ARR.indexOf(currentStr[i]);
  }
  return res;
}

// arr.shift 效率低 待改良
// FIFO
class Queue {
  #obj = {};
  #count = 0;
  #lowCount = 0;
  enqueue(data) {
    this.#obj[this.#count] = data;
    this.#count++;
  }
  dequeue() {
    if (!this.#count) return;
    const first = this.#obj[this.#lowCount];
    delete this.#obj[this.#lowCount];
    this.#lowCount++;
    return first;
  }
  front() {
    return this.#obj[this.#lowCount];
  }
  size() {
    return this.#count - this.#lowCount;
  }
}

// 击鼓传花
function game(arr, num) {
  const queue = new Queue();
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    queue.enqueue(element);
  }

  while (queue.size() > 1) {
    // 展开 num 轮击鼓
    for (let index = 0; index < num; index++) {
      // 将队头 挪到队尾
      queue.enqueue(queue.dequeue());
    }
    // 每局结束 淘汰队头
    queue.dequeue();
  }
  return queue.dequeue();
}

// 双端队列
// double-enqueue queue
class DeQueue {
  #obj = {};
  #count = 0;
  #lowCount = 0;
  addBack(data) {
    this.#obj[this.#count] = data;
    this.#count++;
  }
  removeFront() {
    if (!this.#count) return;
    const first = this.#obj[this.#lowCount];
    delete this.#obj[this.#lowCount];
    this.#lowCount++;
    return first;
  }
  addFront(data) {
    if (this.size() === 0) {
      this.addBack(data);
    } else {
      if (this.#lowCount > 0) {
        this.#obj[this.#lowCount - 1] = data;
        this.#lowCount--;
      } else {
        for (let index = this.#count; index > this.#lowCount; index--) {
          this.#obj[index] = this.#obj[index - 1];
        }
        this.#obj[0] = data;
        this.#count++;
      }
    }
  }
  removeBack() {
    if (this.size() === 0) return;
    this.#count--;
    const res = this.#obj[this.#count];
    delete this.#obj[this.#count];
    return res;
  }
  peekFront() {
    return this.#obj[this.#lowCount];
  }
  peekBack() {
    return this.#obj[this.#count - 1];
  }
  size() {
    return this.#count - this.#lowCount;
  }
  toString() {
    let str = "";
    for (let index = this.#lowCount; index < this.#count; index++) {
      const element = this.#obj[index];
      str += `${element} `;
    }
    return str;
  }
}

// 回文
function palindromeTest(str) {
  const formattedStr = str.split(" ").join("");
  const dequeue = new DeQueue();
  for (let index = 0; index < formattedStr.length; index++) {
    const element = formattedStr[index];
    dequeue.addBack(element);
  }
  let res = true;
  while (dequeue.size() > 1) {
    if (dequeue.removeFront() !== dequeue.removeBack()) {
      res = false;
      break;
    }
  }
  return res;
}

//
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
  }

  push(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      // 找到最后一个元素
      while (current.next !== null) {
        current = current.next;
      }

      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.count) return;
    if (index === 0) {
      this.head = this.head.next;
      this.count--;
      return;
    }
    let previous;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    this.count--;
    return current.element;
  }
  getNodeAt(index) {
    if (index < 0 || index >= this.count) return;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }
}

const list = new LinkedList();
list.push(100);
list.push(200);
list.push(300);
console.log(list);
list.removeAt(0);
console.log(list);
```
