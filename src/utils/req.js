import fetch from 'dva/fetch';
import {routerRedux} from 'dva/router';
import {message} from 'antd';
import store from '../index';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (data.status !== 200) {
        // message.warn(data.status + data.message);
        // throw Error(data.status);
      }
      return data;
    })
    .catch(err => {
      const {dispatch} = store;
      // if (err || err.response.status == 500) {
      //   dispatch(routerRedux.push('/'));
      //   return;
      // }
    });
}
