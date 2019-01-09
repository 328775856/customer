import {post,del} from '../../services/api';

export default {
  namespace: 'myaudio',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup: []
  },
  effects: {
    * getAudioPage({payload}, {call, put}) { //获取所有用户音频
      const res = yield call(post, '/media/audio/page', {
        "page": payload.page
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
    * addAudio({payload, callback}, {call, put}) { //添加用户音频
      const res = yield call(post, '/media/audio/addAudio', {
        "audioName": payload.fileName,
        "audioFormat": payload.audioFormat,
        "audioPath":payload.audioPath,
        "minute": payload.minute,
        "second": payload.second,
      });
      yield put({
        type: 'status',
        payload: res
      });
      callback(res);
    },

    * delAudio({payload, callback}, {call, put}) { //删除用户音频
      const res = yield call(del, '/media/audio/delAudio', {
        "mediaAudioId": payload.mediaAudioId
      });
      yield put({
        type: 'status',
        payload: res
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
