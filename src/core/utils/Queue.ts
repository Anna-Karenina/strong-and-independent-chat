interface IQueueNode<T> {
  value: T,
  next: IQueueNode<T> | null,
  prev: IQueueNode<T> | null,
}

export default class Queue<T> {
  size: number;
  head: IQueueNode<T> | null;
  tail: IQueueNode<T> | null;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  get isEmpty() {
    return !this.size;
  }
  
  enqueue(value: T) {
    const node: IQueueNode<T> = {value, next: null, prev: null};
    this.size++;

    if (!this.head && !this.tail) {
      this.head = this.tail = node;
      return this.size;
    }

    (this.tail as IQueueNode<T>).next = node;
    node.prev = this.tail;
    this.tail = node;

    return this.size;
  }
  
  dequeue() {
    if (!this.size) {
      throw new Error('Queue is empty');
    }

    this.size--;

    const removedNode = this.head as IQueueNode<T>;
    this.head = removedNode.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    return removedNode;
  }
  
  peek() {
    return this.head;
  }
}