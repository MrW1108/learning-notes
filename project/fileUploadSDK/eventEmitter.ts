class EventEmiter<T extends Record<string, (...args) => void>> {
  protected events = {} as Record<keyof T, Set<T[keyof T]>> 

  on<P extends keyof T>(eventName: P, handler: T[P]) {
    if(!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(handler)
  }
  off<P extends keyof T>(eventName: P, handler: T[P]){
    if(!this.events[eventName]) {
      return 
    }
    this.events[eventName].delete(handler)
  }
  once<P extends keyof T>(eventName: P, handler: T[P]) {
    const onceHandler = ((...args) => {
      this.off(eventName, handler)
      handler(...args)
    }) 
    this.on(eventName, onceHandler as T[P])
  }
  emit<P extends keyof T>(eventName: P, ...args: Parameters<T[P]>){
    this.events[eventName]?.forEach(handler => handler(...args))
  }
  removeAllListeners(eventName?: keyof T){
    if(eventName) {
      delete this.events[eventName]
    }else {
      this.events = {} as Record<keyof T, Set<T[keyof T]>> 
    }
  }
}

export default EventEmiter