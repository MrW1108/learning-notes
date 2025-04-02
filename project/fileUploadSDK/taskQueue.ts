import EventEmiter from "./eventEmitter";

type TaskFunction = (...args: any[]) => any

type TaskQueueEvent = {
  start: () => void,
  pause: () => void,
  drain: () => void,
}

enum TaskQueueStatus {
  paused = 'paused',
  running ='running'
}

class Task<T extends TaskFunction> {
  private fn: T; // 任务关联的执行函数
  private payload?: Parameters<T>; // 任务关联的其他信息

  constructor(func: T, ...args: Parameters<T>) {
    this.fn = func;
    this.payload = args;
  }

  // 执行任务
  run(): ReturnType<T> {
    return this.fn(this.payload);
  }
}

// 可并发执行的任务队列
class TaskQueue extends EventEmiter<TaskQueueEvent> {
  private tasks: Set<Task<TaskFunction>> = new Set();   // 待执行的任务
  private currentCount = 0;                             // 当前正在执行的任务数
  private status: TaskQueueStatus = TaskQueueStatus.paused;      // 任务状态
  private concurrency = 4;                              // 最大并发数

  constructor(concurrency = 4) {
    super()
    this.concurrency = concurrency
  }

  add(...tasks: Task<TaskFunction>[]) {
    for (const task of tasks) {
      this.tasks.add(task)
    }
  }

  start() {
    if(this.status === TaskQueueStatus.running) {
      return
    }
    if (this.tasks.size === 0) {
      // 当前已无任务，触发drain事件
      this.emit('drain');
    }
    // 设置任务状态为running
    this.status = TaskQueueStatus.running;
    this.emit('start'); // 触发start事件
    for (let i =0; i < this.concurrency; i++) {
      this.runNext(); // 开始执行下一个任务
    }
  }

  privateaddAndStart(...tasks: Task<TaskFunction>[]) {
    this.add(...tasks);
    this.start()
  }

  // 取出第一个任务
  private takeHeadTask() {
    const task = this.tasks.values().next().value;
    if (task) {
      this.tasks.delete(task);
    }
    return task;
  }

  // 执行下一个任务
  private runNext() {
    if (this.status !== TaskQueueStatus.running) {
      // 如果整体的任务状态不是running，结束
      return;
    }
    if (this.currentCount >= this.concurrency) {
      // 并发数已满，结束
      return;
    }
    // 取出第一个任务
    const task = this.takeHeadTask();
    if (!task) {
      // 没有任务了
      this.status = TaskQueueStatus.paused; // 暂停执行
      this.emit('drain'); // 触发drain事件
      return;
    }
    this.currentCount++; // 当前任务数+1
    // 执行任务
    Promise.resolve(task.run()).finally(() => {
      // 任务执行完成后，当前任务数-1，继续执行下一个任务
      this.currentCount--;
      this.runNext();
    });
  }

  // 暂停任务
  pause() {
    this.status = TaskQueueStatus.paused;
    this.emit('pause');
  }
}
