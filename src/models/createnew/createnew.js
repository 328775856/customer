import {get, post} from '../../services/api';

export default {
  namespace: 'createnew',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup:[]
  },
  effects: {
    * getUserImage({payload,callback}, {call, put}) {
      const res = yield call(post, '/media/image/getUserImage', {
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },

    * getUserAudio({payload,callback}, {call, put}) {
      const res = yield call(post, '/media/audio/query', {
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },
    * getUserBookReadNotes({payload,callback}, {call, put}) {
      const res = yield call(get, '/readNote/userBookReadNotes', {
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },

    * getUserMediaArticle({payload,callback}, {call, put}) {
      debugger
      const res = yield call(get, '/media/article/add', {
        payload:{

        }
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
