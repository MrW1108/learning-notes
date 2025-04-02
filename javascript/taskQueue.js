class TaskQueue {
  constructor(maxConcurrent = 1) {
    this.queue = [];
    this.runningTasksCount = 0;
    this.maxConcurrent = maxConcurrent;
    this.isRunning = false;
  }

  // 添加任务到队列
  addTask(task) {
    this.queue.push(task);
    if (this.isRunning) {
      this.runNext();
    }
  }

  clearTask() {
    this.queue = []
  }

  // 开始运行任务队列
  run() {
    this.isRunning = true;
    for(let i = this.runningTasksCount; i < this.maxConcurrent; i++) {
      this.runNext();
    }
  }

  // 停止执行任务队列
  stop() {
   this.isRunning = false;
  }

  // 运行下一个任务
  runNext() {
    if (!this.isRunning || this.queue.length === 0 || this.runningTasksCount >= this.maxConcurrent) {
      return;
    }

    const task = this.queue.shift();
    if (task) {
      this.runningTasksCount++;
      Promise.resolve(task()).catch((error) => {
        console.error('Task failed with error:', error);
      }).finally(() => {
        this.runningTasksCount--;
        this.runNext(); // 执行下一个任务
      });
    }
  }
}

// 示例任务
const exampleTask = (id) => () =>
  new Promise((resolve, reject) => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      id  < 5  ? resolve(id) : reject(id);
    }, id  < 2 ? 2000 : 500);
  });

// 使用
const taskQueue = new TaskQueue(1); // 最多并发1个任务

taskQueue.addTask(exampleTask(1));
taskQueue.addTask(exampleTask(2));
taskQueue.addTask(exampleTask(3));
taskQueue.addTask(exampleTask(4));

taskQueue.run(); // 开始任务

// 可以随时调用 stop 来暂停任务队列的执行
// taskQueue.stop();
