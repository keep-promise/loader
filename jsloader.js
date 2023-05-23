import EventEmitter3 from 'eventemitter3';

// js 加载器
class JsLoader extends EventEmitter3 {

  head = null;
  script = null;

  constructor() {
    super();
    const heads = document.getElementsByTagName('head') || [];
    this.head = heads[0];
  }

  /**
   * @description: 加载脚本
   * @param {*} url
   * @return {*}
   */  
  loadJs(url) {
    // 过滤已加载的js
    const scripts = [ ...document.querySelectorAll('script') ];
    const isLoaded = scripts.some(s => s.src == url);
    if (isLoaded) {
      console.log('已经加载过');
      return true;
    }
    // 异步加载
    this.script = document.createElement('script');
    this.script.async = true; // 异步加载完立即执行
    this.script.type = 'text/javascript';
    this.script.onerror = err => {
      console.error('load js error', err);
      this.emit('error', err);
    };
    this.script.onload = () => {
      this.emit('onload', this);
    };
    this.script.src = url;
    this.head.appendChild(this.script);
  }

  /**
   * @description: 移除当前js
   * @return {*}
   */  
  removeJS = () => {
    this.head && this.head.removeChild(this.script);
  }
}

export default JsLoader;
