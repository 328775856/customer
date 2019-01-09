import {post} from '../../services/api';

export default {
  namespace: 'mygrouping',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup:[]
  },
  effects: {
    * getBookDefGroupList({payload}, {call, put}) { //获取分组列表
      const res = yield call(post, '/cloud/book/getBookDefGroupList', {
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo
      });
      const data = res.data;
      const re = {
        ...data,
        pageSize: payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },
    * createBookDefGroup({payload, callback}, {call, put}) { //创建分组
      const res = yield call(post, '/cloud/book/createBookDefGroup', {
        'defGroupName': payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },
    * editBookDefGroup({payload, callback}, {call, put}) { //编辑分组
      const res = yield call(post, '/cloud/book/editBookDefGroup', {
        'bookDefGroupId': payload.bookDefGroupId,
        'defGroupName': payload.defGroupName
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },
    * removerBookDefGroup({payload, callback}, {call, put}) { //删除分组
      const res = yield call(post, '/cloud/book/removerBookDefGroup', {
        'bookDefGroupId': payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },

    * getBookDefGroupBookList({payload}, {call, put}) { //获取分组下的图书
      const res = yield call(post, '/cloud/book/getBookDefGroupBookList', {
        'bookDefGroupId': payload.data,
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo,
        'bookName':payload.bookName
      });
      const data = res.data;
      const re = {
        ...data,
        pageSize: payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },

    * batchDeleteBookDefGroupBook({payload, callback}, {call, put}) { //删除分组下的书
      const res = yield call(post, '/cloud/book/batchDeleteBookDefGroupBook', {
        'bookDefGroupId': payload.bookDefGroupId,
        'bookUserIds':payload.bookUserIds
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
