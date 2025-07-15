class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 获取父节点索引
  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  // 获取左子节点索引
  leftChildIndex(i) {
    return 2 * i + 1;
  }

  // 获取右子节点索引
  rightChildIndex(i) {
    return 2 * i + 2;
  }

  // 插入新元素
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // 堆向上调整，保持最小堆性质
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = this.parentIndex(index);
      if (this.heap[parent] <= this.heap[index]) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  // 弹出堆顶元素（最小元素）
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  // 堆向下调整，保持最小堆性质
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = this.leftChildIndex(index);
      let right = this.rightChildIndex(index);
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  // 查看堆顶元素
  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  // 交换堆中两个元素
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

const minHeap = new MinHeap();

minHeap.push(5);
minHeap.push(3);
minHeap.push(8);
minHeap.push(1);

console.log(minHeap.peek()); // 1
console.log(minHeap.pop());  // 1
console.log(minHeap.pop());  // 3
console.log(minHeap.pop());  // 5
console.log(minHeap.pop());  // 8
console.log(minHeap.pop());  // null
