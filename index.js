import CssLoader from './css';
import JsLoader from './js';

/**
 * @description: 动态加载css
 * @return {*}
 */
export function loadCss(url) {
  const css = new CssLoader();
  css.load(url);
  return css;
}

/**
 * @description: 动态插入css
 * @param {*} url
 * @return {*}
 */
export function insertCss(url) {
  const css = new CssLoader();
  css.insert(url);
  return css;
}

/**
 * @description: 动态加载js
 * @param {*} url
 * @return {*}
 */
export function loadScript(url) {
  const script = new JsLoader();
  script.load(url);
  return script;
}
