import {get, post} from '../../services/api';
import {routerRedux} from 'dva/router';
import {isEmptyObject} from "../../utils/utils";
import {message} from "antd";

export default {
  namespace: 'login',
  state: {
    status: '200',
    userInfo: {},
    captcha: ''
  },
  effects: {
    * login(action, {call, put}) {
      const res = yield call(post, '/user/login', {
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
        'loginType': '1',
        'loginSource': '4'
      });
      if (res.status == 200) {
        message.success(`登录成功！`);
      } else {
        message.warn(`${res.message}`);
      }
      if (res.data) {
        sessionStorage.setItem('auth', res.data.token);
        yield put(routerRedux.push({pathname: '/home'}));
      }
    },
    * wxLogin({payload}, {call, put}) {
      console.log('payload',payload);
      const {data} = yield call(get, '/thirdLogin/wxLogin', payload);
      if (data) {
        sessionStorage.setItem('auth', data.token);
        yield put(routerRedux.push({pathname: '/home'}));
      }
    },
    * getUserInfo(action, {call, put}) {
      const res = yield call(get, '/user/userInfo');
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * getCaptcha({payload}, {call, put}) {
      const res = yield call(post, '/user/getVerifyCode', {
        'appId': 1,
        'terminalType': 1,
        'terminalSn': '13333',
        'terminalName': '华为',
        'versionCode': '433',
        'versionName': '433',
        ...payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * register({payload}, {call, put}) {
      const res = yield call(post, '/user/register', {
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
      if (res.status === 200 && !isEmptyObject(res.data)) {
        sessionStorage.setItem('auth', res.data.token);
        yield put(routerRedux.push({pathname: '/home'}));
      }
    },
    * resetPassword({payload}, {call, put}) {
      const res = yield call(post, '/user/resetPassword', {...payload});
      if (res.status == 200) {
        yield put(routerRedux.push({pathname: '/'}));
      }
    },

    * modifyUser({payload, callback}, {call, put}) { //修改资料
      const res = yield call(post, '/user/modifyUser', {
        'photo': payload.photo
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      //callback(res);
    },
  },

  reducers: {
    'status'(state, {payload}) {
      state = payload;
      return {...state};
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
}
;
