import {post} from '../../services/api';

export default {
  namespace: 'mybookgroup',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup:[]
  },
  effects: {
    * getSelectBookDefGroupList({payload,callback}, {call, put}) { //获取图书的分组列表
      const res = yield call(post, '/cloud/book/getSelectBookDefGroupList', {

      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },
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
  // subscriptions: {
  //   setup({dispatch, history}){
  //     history.listen(location=>{
  //       console.log(location)
  //     })
  //   }
  // }
};
