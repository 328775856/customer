import req from '../utils/req';
import {stringify} from 'qs';

const header = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
};

function getAuth() {
  return sessionStorage.getItem('auth');
}

export async function post(url, params) {
  return req(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(params),
    ...header
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

export async function put(url, params) {
  return req(url + stringify(params), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: getAuth(),
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
