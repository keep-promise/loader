import EventEmitter3 from 'eventemitter3';

export default class CssLoader extends EventEmitter3 {

  head = null;
  link = null;

  constructor() {
    super();
    const heads = document.getElementsByTagName('head') || [];
    this.head = heads[0];
  }

  /**
   * @description: 异步加载css
   * @param {*} url 样式链接
   * @return {*}
   */  
  loadCss = (url) => {
    // 过滤已加载的css
    const links = [ ...document.querySelectorAll('link') ];
    const isLoaded = links.some(link => link.href === url);
    if (isLoaded) {
      console.log('已经加载过');
      return true;
    }

    this.link = document.createElement('link');
    this.link.rel = 'stylesheet';
    this.link.onerror = err => {
      console.error('load css error', err);
      this.emit('error', err);
    };
    this.link.onload = () => {
      this.emit('onload', this);
    };
    this.link.href = url;
    this.head.appendChild(this.link);
  }

  /**
   * @description: 插入style标签样式
   * @param {*} css
   * @return {*}
   */  
  insert = (css) => {
    const styleNode = document.createElement('style');
    styleNode.textContent = css;
    this.head.appendChild(styleNode);
  }

  /**
   * @description: 移除样式
   * @return {*}
   */  
  removeCssLink = () => {
    this.head && this.head.removeChild(this.link);
  }
}

