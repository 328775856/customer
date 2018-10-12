import req from '../utils/req';
import { stringify } from 'qs';
function getAuth() {
  return sessionStorage.getItem('auth');
}

export async function post(url, params) {
  return req(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(params)
  });
}

export async function get(url, params) {
  return req(url + stringify(params), {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: getAuth(),
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
