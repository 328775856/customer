import moment from 'moment';
export function defaultPage() {
  return { pageNo: 1, pageSize: 10};
}

export function isEmptyObject(obj) {
  const arr = Object.keys(obj);
  if (arr.length > 0) {
    return false;
  } else {
    return true;
  }
}

export function isEmpty(str) {
  if (typeof str === 'undefined' || str === null || str === '') {
    return true;
  } else {
    return false;
  }
}

export function isNotEmpty(str) {
  if (typeof str === 'undefined' || str === null || str === '') {
    return false;
  } else {
    return true;
  }
}

export function formatTime(text) {
  if (text == null || text === 0) {
    return '';
  }
  const str = new String(text);
  const time = {
    year: str.substr(0, 4),
    month: str.substr(4, 2) - 1,
    date: str.substr(6, 2),
    hour: str.substr(8, 2),
    minute: str.substr(10, 2),
    second: str.substr(12, 2)
  };
  return moment()
    .set(time)
    .format('YYYY/MM/DD HH:mm:ss');
}

export function formatDate(text) {
  if (text == null || text === 0) {
    return '';
  }
  const str = new String(text);
  const date = {
    year: str.substr(0, 4),
    month: str.substr(4, 2) - 1,
    date: str.substr(6, 2)
  };
  return moment()
    .set(date)
    .format('YYYY-MM-DD');
}

export function getPreMonth(amount){
  if(amount == null || amount ===0){
    return '';
  }
  let date = new Date();
  date.setMonth(date.getMonth()-amount);
  return moment().set({'year':date.getFullYear(),'month':date.getMonth()}).format('YYYYMM');
}
