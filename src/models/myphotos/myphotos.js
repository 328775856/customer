import {post,del} from '../../services/api';

export default {
  namespace: 'myphotos',
  state: {
    status: '200',
    userInfo: {},
    captcha: '',
    defGroup:[]
  },
  effects: {
    * getImagePage({payload}, {call, put}) { //获取所有用户图片
      const res = yield call(post, '/media/image/getImagePage', {
        "page":payload.page
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
    * addImage({payload,callback}, {call, put}) { //添加用户图片
      console.log(payload.fileSize);
      const res = yield call(post, '/media/image/addImage', {
        "imagePath":payload.filePath,
        "imageName":payload.fileName,
        "imageSize":payload.fileSize
      });
      yield put({
        type: 'status',
        payload: res
      });
      callback(res);
    },

    * deleteImage({payload,callback}, {call, put}) { //删除用户图片
      const res = yield call(del, '/media/image/deleteImage', {
        "mediaImageId": payload.mediaImageId
      });
      yield put({
        type: 'status',
        payload: res
      });
      callback(res);
    },

    * getQiniuToken({payload,callback},{call, put}) { //添加用户图片
      const res = yield call(post, '/file/getQiniuToken');
      const data ={msg: res.message};
      yield put({
        type: 'status',
        payload: data
      });
      callback(data);
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
