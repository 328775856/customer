import {get, post} from '../../services/api';

export default {
  namespace: 'mybooks',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup:[]
  },
  effects: {
    * getUserCloudCoverBook({payload}, {call, put}) { //获取所有图书

      const res = yield call(post, '/cloud/book/getUserCloudCoverBook', {
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo
      });
      const data = res.data;
      const re ={
        ...data,
        pageSize:payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },
    * getSearcherUserCloudCoverBook({payload}, {call, put}) { //获取所有图书

      const res = yield call(post, '/cloud/book/getUserCloudCoverBook', {
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo,
        'keyword':payload.data
      });
      const data = res.data;
      const re ={
        ...data,
        pageSize:payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },

    * getUserInfo(action, {call, put}) {
      const res = yield call(get, '/user/userInfo');
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * getUserCloudBook({payload}, {call, put}) {
      //获取上传0，购买1，赠送2
      const res = yield call(post, '/cloud/book/getUserCloudBook', {
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo,
        'type': payload.typeBookValue
      });
      const data = res.data;
      const re ={
        ...data,
        pageSize:payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },

    * getSearcherUserCloudBook({payload}, {call, put}) {
      //获取上传0，购买1，赠送2
      const res = yield call(post, '/cloud/book/getUserCloudBook', {
        'pageSize': payload.page.pageSize,
        'pageNo': payload.page.pageNo,
        'type': payload.typeBookValue,
        'keyword':payload.data
      });
      const data = res.data;
      const re ={
        ...data,
        pageSize:payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'status',
        payload: re
      });
    },

    * getUserUploadBookByCloud({payload}, {call, put}) { //获取上传
      const res = yield call(post, '/cloud/book/getUserCloudBook', {
        'pageSize': 1,
        'pageNo': 10
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * getUserBuyBookByCloud({payload}, {call, put}) { //获取购买
      const res = yield call(post, '/cloud/book/getUserCloudBook', {
        'pageSize': 1,
        'pageNo': 10
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    },
    * getUserDonatedBookByCloud({payload}, {call, put}) { //获取赠送
      const res = yield call(post, '/cloud/book/getUserCloudBook', {
        'pageSize': 1,
        'pageNo': 10
      });
      yield put({
        type: 'status',
        payload: res.data
      });
    },

    * delBook({payload,callback}, {call, put}) { //删除图书
      const res = yield call(post, '/cloud/book/delBook', {
        'bookUserIds':payload
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },

    * setBookIsHiddenUserStatus({payload,callback}, {call, put}) { //设置状态
      const res = yield call(post, '/cloud/book/setBookIsHiddenUserStatus', {
        'bookUserIds': payload.bookUserIds,
        'isHiddenUser': payload.isHiddenUser
      });
      yield put({
        type: 'status',
        payload: res.data
      });
      callback(res);
    },

    * divideIntoGroups({payload,callback}, {call, put}) { //分组到
      const res = yield call(post, '/cloud/book/divideIntoGroups', {
        bookUserIds:payload.bookUserId,
        bookDefGroupId:payload.bookDefGroupId
      });
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
  // subscriptions: {
  //   setup({dispatch, history}){
  //     history.listen(location=>{
  //       console.log(location)
  //     })
  //   }
  // }
};
