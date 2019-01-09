import req from '../utils/req';
import {stringify} from 'qs';

let prefix = '';
const header = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: getAuth()
  }
};
if (process.env.NODE_ENV === 'production') {
  prefix = '/api/gb_customer/GbCustomer';
}

function getAuth() {
  return sessionStorage.getItem('auth');
}

export async function post(url, params) {

  return req(prefix + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.getItem('auth')
    },
    body: JSON.stringify(params)
  });
}

export async function get(url, params) {
  return req(prefix + url + '?' + stringify(params), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.getItem('auth')
    }
  });
}

export async function put(url, params) {
  return req(prefix + url + stringify(params), {
    method: 'PUT',
    credentials: 'include',
    ...header
  });
}

export async function del(url, params) {
  //console.log(url, params) //  url /media/image/deleteImage   params  {mediaImageId: 304}
  return req(prefix + url, {
    method: 'DELETE',
    credentials: 'include',
    ...header,
    body: JSON.stringify(params)
  });
}

export async function upload(url, params) {
  //console.log(url, params) //  url /media/image/deleteImage   params  {mediaImageId: 304}
  return req('http://192.168.10.172:8769/api/gb_customer/GbCustomer', {
    method: 'POST',
    credentials: 'include',
    ...header,
    body: JSON.stringify(params)
  });
}
