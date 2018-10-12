import {get, post} from '../../services/api';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'login',
  state: {
    status: '',
    userInfo: {}
  },
  effects: {
    * login(action, {call, put}) {
      const {data} = yield call(post, '/user/login', action.payload);
      if (data) {
        sessionStorage.setItem('auth', data);
        yield put(routerRedux.push({pathname: '/home'}));
      }
    },
    * getUserInfo(action, {call, put}) {
      const res = yield call(get, '/user/getCurrentUser');
      yield put({
        type: 'status',
        payload: res.data
      });
    }
  },
  reducers: {
    'status'(state, {payload}) {
      state.userInfo = payload;
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
}
;
