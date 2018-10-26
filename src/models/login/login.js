import {get, post} from '../../services/api';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'login',
  state: {
    status: '200',
    userInfo: {},
    captcha: ''
  },
  effects: {
    * login(action, {call, put}) {
      const {data} = yield call(post, '/sso-microservice/SsoMicroservice/sso/user/login ', {
        'appId': '1',
        'platformType': '2',
        'terminalType': '1',
        'terminalModel': 'PRO 6 Plus',
        'terminalFactory': 'Meizu',
        'terminalSn': '862891033284802e0293b6b65e32904',
        'terminalName': 'PRO 6 Plus',
        'versionCode': '500',
        'versionName': '5.0.0',
        ...action.payload,
        'loginType': '1'
      });
      if (data) {
        sessionStorage.setItem('auth', data.token);
        yield put(routerRedux.push({pathname: '/home'}));
      }
    },
    * getUserInfo(action, {call, put}) {
      const res = yield call(get, '/user_microservice/UserMicroService/user/userInfo');
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * getCaptcha({payload}, {call, put}) {
      const res = yield call(post, '/sso-microservice/SsoMicroservice/sso/user/getVerifyCode', {
        'appId': 1,
        'terminalType': 1,
        'terminalSn': '13333',
        'terminalName': '华为',
        'versionCode': '433',
        'versionName': '433',
        'type': 1,
        ...payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * register({payload}, {call, put}) {
      const res = yield call(post, '/sso-microservice/SsoMicroservice/sso/user/register', {
        'appId': '1',
        'platformType': '2',
        'terminalType': '1',
        'terminalModel': 'PRO 6 Plus',
        'terminalFactory': 'Meizu',
        'terminalSn': '862891033284802e0293b6b65e32904',
        'terminalName': 'PRO 6 Plus',
        'versionCode': '500',
        'versionName': '5.0.0',
        'regType': '2',
        ...payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    }
  },
  reducers: {
    'status'(state, {payload}) {
      state = payload;
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
