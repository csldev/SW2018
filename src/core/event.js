/**
 * 小程序页面之间通信的 event
 * 目前只实现一个事件对应一个方法
 */
export default class Event {
  events = {};

  on(event, fn) {
    if (typeof fn !== 'function' || !event) {
      return;
    }
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(fn);
  }

  emit(event, data) {
    if (typeof this.events[event] !== 'object') {
      return;
    }
    console.log(`emit ${event}`);
    this.events[event].forEach((element) => {
      if (typeof element === 'function') {
        element(data);
      }
    });
  }

  off(event, fn) {
    if (typeof this.events[event] !== 'object' || typeof fn !== 'function') {
      return;
    }
    this.events[event].delete(fn);
  }
}
