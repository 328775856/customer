import {post, del} from '../../services/api';

export default {
  namespace: 'myincome',
  state: {
    status: '200',
    userInfo: {},
    captcha: ''
  },
  effects: {
    * saleInfo({payload}, {call, put}) { //获取订单列表
      const response = yield call(post, '/income/info', payload);
      const data = response.data;
      const res = {
        ...data,
        pageNo: payload.page.pageNo,
        pageSize: payload.page.pageSize
      };
      if (res) {
        yield put({
          type: 'status',
          payload: res
        });
      }
    },
    * queryLastReadMonthByGroup({payload}, {call, put}) { //获取阅历列表
      const response = yield call(post, '/borrow/queryLastReadMonthByGroup', payload);
      const data = response.data;
      const res = {
        ...data,
        pageNo: payload.page.pageNo,
        pageSize: payload.page.pageSize
      };
      if (res) {
        yield put({
          type: 'status',
          payload: res
        });
      }
    },
    * queryProgressByMonth({payload}, {call, put}) { //获取阅历列表
      const response = yield call(post, '/borrow/queryProgressByMonth', payload);
      const data = response.data;
      const res = {
        ...data,
        pageNo: payload.page.pageNo,
        pageSize: payload.page.pageSize
      };
      if (res) {
        yield put({
          type: 'status',
          payload: res
        });
      }
    },
    * deleteBookProgress({payload,callback}, {call, put}) {
      const res = yield call(del, '/borrow/bookProgress', payload);
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    }
  },
  reducers: {
    'status'(state, {payload}) {
      return {...state, ...payload};
    },
    'changeAvatar'(state, {payload}) {
      state.photo = payload;
      return {...state};
    }
  }
};
