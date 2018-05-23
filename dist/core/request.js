/**
 * 网络请求类
 */
import Promise from './plugins/es6-promise';

export default class Request {
  // 微信请求的默认超时时间
  TIMEOUT = 60000;

  // 取出 Cookie 中 kSeesionId 并保存
  _fetchCookie(response) {
    let cookie = '';
    if ('Set-Cookie' in response.header) {
      cookie = response.header['Set-Cookie'];
    } else if ('set-cookie' in response.header) {
      cookie = response.header['set-cookie'];
    }
    return cookie;
  }

  _sliceHeader(cookie, key) {
    const regex = new RegExp(`${key}=((\\w)+);`);
    const results = regex.exec(cookie);
    if (results && results[1]) {
      return results[1];
    }
    return null;
  }

  // 取出 Cookie 中 kSeesionId 并保存
  _saveKSessionId(response) {
    const cookie = this._fetchCookie(response);
    const tmpKSessionId = this._sliceHeader(cookie, 'KSESSIONID');
    if (tmpKSessionId) {
      getApp().sessionData.minaCookie.kSessionId = tmpKSessionId;
    }
    const qhdi = this._sliceHeader(cookie, 'qhdi');
    if (qhdi) {
      getApp().sessionData.minaCookie.qhdi = qhdi;
    }
    const qhssokey = this._sliceHeader(cookie, 'qhssokey');
    if (qhssokey) {
      getApp().sessionData.minaCookie.qhssokey = qhssokey;
    }
    const qhssokeyid = this._sliceHeader(cookie, 'qhssokeyid');
    if (qhssokeyid) {
      getApp().sessionData.minaCookie.qhssokeyid = qhssokeyid;
    }
    const qhssokeycheck = this._sliceHeader(cookie, 'qhssokeycheck');
    if (qhssokeycheck) {
      getApp().sessionData.minaCookie.qhssokeycheck = qhssokeycheck;
    }
    wx.setStorage({
      key: 'minaCookie',
      data: getApp().sessionData.minaCookie,
    });
  }

  _request(method, path, data, header) {
    const server = getApp().settings.SERVER_ADDRESS;
    const userAgent = getApp().settings.MP_USER_AGENT;
    let minaCookieString = '';
    if (getApp().sessionData.minaCookie) {
      if (getApp().sessionData.minaCookie.kSessionId) {
        minaCookieString += `KSESSIONID=${getApp().sessionData.minaCookie.kSessionId};`;
      }
      if (getApp().sessionData.minaCookie.qhdi) {
        minaCookieString += `qhdi=${getApp().sessionData.minaCookie.qhdi};`;
      }
      if (getApp().sessionData.minaCookie.qhssokey) {
        minaCookieString += `qhssokey=${getApp().sessionData.minaCookie.qhssokey};`;
      }
      if (getApp().sessionData.minaCookie.qhssokeyid) {
        minaCookieString += `qhssokeyid=${getApp().sessionData.minaCookie.qhssokeyid};`;
      }
      if (getApp().sessionData.minaCookie.qhssokeycheck) {
        minaCookieString += `qhssokeycheck=${getApp().sessionData.minaCookie.qhssokeycheck};`;
      }
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: server + path,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          APIVERS: 'com.qunhe.instdeco.service.tob-xiaoyi',
          Cookie: minaCookieString,
          'MP-User-Agent': userAgent,
          ...header,
        },
        success: (response) => {
          console.log(`${path} >> `);
          console.log(response);
          if (response.statusCode === 200) {
            this._saveKSessionId(response);
            const {
              data: result,
            } = response;
            if (result.hasOwnProperty('c')) {
              if (result.c === '0') {
                if ('d' in result) {
                  resolve(result.d);
                } else {
                  resolve({});
                }
              } else {
                reject(result.c, result.m);
              }
            } else {
              resolve(result);
            }
          } else if (response.statusCode === 401) {
            // 登录过期，清除本地登录信息
            console.log('401 logout');
            getApp().showToast('登录过期，请重新登录');
            getApp().logout();
            reject(response.statusCode);
          } else {
            reject(response.statusCode);
          }
        },
        fail: () => {
          reject(new Error('请求失败'));
        },
      });
    });
  }

  get(path, data = {}, header = {}) {
    return this._request('GET', path, data, header);
  }

  post(path, data = {}, header = {}) {
    return this._request('POST', path, data, header);
  }

  delete(path, data = {}, header = {}) {
    return this._request('DELETE', path, data, header);
  }

  put(path, data = {}, header = {}) {
    return this._request('PUT', path, data, header);
  }
}
