import {get, post} from '../../services/api';

export default {
  namespace: 'mynote',
  state: {
    noteList: []
  },
  effects: {
    * userBookReadNotes({payload}, {call, put}) {
      const data = yield call(get, '/readNote/userBookReadNotes', payload);
      if (data) {
        yield put({
          type: 'status',
          payload: data
        });
      }
    },
    * getBookReadNotes({payload}, {call, put}) {
      const res = yield call(get, '/readNote/bookReadNotes', payload);
      yield put({
        type: 'noteList',
        payload: res.result
      });
    },
    *deleteBookReadNotes({payload,callback}, {call, put}){
      const res = yield call(post, '/readNote/deleteBookReadNotes', payload);
      yield put({
        type: 'status',
        payload: res.status
      });
      callback(res);
    }
  },
  reducers: {
    'status'(state, {payload}) {
      return {...state, ...payload};
    },
    'noteList'(state, {payload}) {
      state.noteList = payload;
      return {...state};
    },
    'changeAvatar'(state, {payload}) {
      state.photo = payload;
      return {...state};
    }
  }
};
