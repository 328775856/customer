import {get, post} from '../../services/api';

export default {
  namespace: 'myRecord',
  state: {
    recordList: []
  },
  effects: {
    * userBookReadDocGroups({payload}, {call, put}) {
      const res = yield call(get, '/readDoc/userBookReadDocGroups', payload);
      if (res) {
        yield put({
          type: 'status',
          payload: res.data
        });
      }
    },
    * bookReaddocGroup({payload,callback}, {call, put}) {

      const res = yield call(get, '/readDoc/bookReaddocGroup', payload);
      if(callback)callback(res)
      // yield put({
      //   type: 'recordList',
      //   payload: res.data
      // });
    },
    * addUserBookReadDocGroup({payload,callback}, {call, put}) {
      const res = yield call(post, '/readDoc/addUserBookReadDocGroup', payload);
      if (res.status===200) {
        if(callback)callback(res);
      }
    },
    * updateUserBookReadDocGroup({payload,callback}, {call, put}) {
      const res = yield call(post, '/readDoc/updateUserBookReadDocGroup', payload);
      if (res) {
        yield put({
          type: 'status',
          payload: res.data
        });
      }
      if(callback)callback(res);
    },
    * deleteUserBookReadDocGroup({payload,callback}, {call, put}) {
      const res = yield call(post, '/readDoc/deleteUserBookReadDocGroup', payload);
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },
    * getBookReadNotes({payload}, {call, put}) {
      const res = yield call(get, '/readNote/bookReadNotes', payload);
      yield put({
        type: 'recordList',
        payload: res.result
      });
    },
    *deleteBookReaddoc({payload,callback}, {call, put}){
      const res = yield call(post, '/readDoc/deleteBookReaddoc', payload);
      yield put({
        type: 'status',
        payload: res.status
      });
      callback(res);
    }
  },
  reducers: {
    'status'(state, {payload}) {
      return {...payload};
    },
    'recordList'(state, {payload}) {
      state.recordList = payload.rows;
      return {...state};
    },
    'changeAvatar'(state, {payload}) {
      state.photo = payload;
      return {...state};
    }
  }
};
