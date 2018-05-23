/**
 * 路由类
 */
const ROUTER_PREFIX = 'https://www.kujiale.com';

export default class Router {
  /**
   * 初始化路由
   * @param {*} pagePaths 所有页面的路由表信息
   * @param {*} webViewPath webView页面的路由信息
   */
  constructor(pagePaths, webViewPath) {
    this.pagePaths = pagePaths;
    this.webViewPath = webViewPath;
  }

  /**
   * 组装本地页面的路由信息
   * @param {*} pageName 本地的页面名，注意默认在 /pages 目录下，并且页面目录和页面需要命名一致
   * @param {*} query query 值
   */
  nativePage(pageName, query) {
    let url = `${ROUTER_PREFIX}/pages/${pageName}/${pageName}`;
    if (query !== undefined && Object.keys(query).length > 0) {
      url += '?';
      for (const key in query) {
        url += `${key}=${query[key]}&`;
      }
    }
    return url;
  }

  navigateTo(routePath) {
    const url = routePath;
    if (!(typeof (url) === 'string')) {
      return;
    }

    // 如果在 pages 里面有定义这个 path, 直接跳转小程序页面
    if (url.startsWith(ROUTER_PREFIX)) {
      const path = url.slice(ROUTER_PREFIX.length + 1, url.indexOf('?') > 0 ? url.indexOf('?') : url.length);
      if (this.pagePaths.indexOf(path) > -1) {
        console.log(`navigate to local page ${url.slice(ROUTER_PREFIX.length)}`);
        wx.navigateTo({
          url: url.slice(ROUTER_PREFIX.length),
        });
      } else {
        this._jumpToWebView(url);
      }
    } else {
      this._jumpToWebView(url);
    }
  }

  _jumpToWebView(url) {
    console.log(`jump to web page ${url}`);
    const encodedUrl = JSON.stringify(encodeURIComponent(url));
    wx.navigateTo({
      url: `/pages/web-page/web-page?url=${encodedUrl}&from=mp`,
    });
  }
}

