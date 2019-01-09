import React, {Component} from 'react';
import {Form, Input} from 'antd';
import {connect} from 'dva';
import Cropper from '../../components/common/cropper';
import 'cropperjs/dist/cropper.css';
import './index.less';
import {defaultPage} from "../../utils/utils";

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const src = '/avatar.jpg';

@connect(({login, myphotos}) => ({login, myphotos}))

@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      src,
      token: null,
      cropResult: null,
      page: defaultPage(),
      value: {}
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    const {dispatch} = this.props;
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    const cb = this.callback;
    dispatch({
      type: 'myphotos/getQiniuToken',
      callback: cb
    });

    //let upImgageToken = "ibqy8TIx55ljP1pwxmyKefXSf0z1IM48CxgK7E4G:7cahDeTMBRZOkDaoTcH-hGumuj4=:eyJpbnNlcnRPbmx5IjoxLCJzY29wZSI6ImdlZWJvb2stZGVidWciLCJkZWFkbGluZSI6MTU0NjU3NDA4N30="


    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      isModalVisible: false,
    });
  }

  callback = (r) => {
    const {dispatch} = this.props;
    const {page, value} = this.state;
    let picUrl;
    let picBase = this.cropper.getCroppedCanvas().toDataURL().substring(22);
    function fileSize(picBase) {
      let fileSize;
      picBase = picBase.replace('=', '');
      fileSize = parseInt(picBase.length - picBase.length / 8 * 2);
      return fileSize;
    }

    let url = "http://upload.qiniup.com/putb64/" + fileSize(picBase);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let keyText = xhr.responseText;
        /!*返回的key是字符串，需要装换成json*!/;
        keyText = JSON.parse(keyText);
        /!*keyText.key 是返回的图片文件名*!/;
        picUrl = "http://debugimage.geeboo.com/" + keyText.key;
        dispatch({
          type: 'login/modifyUser',
          payload: {
            photo: keyText.key
          },
        });
        //console.log("上传图片地址"+picUrl);
        dispatch({
          type :'login/getUserInfo',
          payload: {
            data: value,
            page: page
          }
        });
      }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", String("UpToken " + r.msg));
    xhr.send(picBase);
  };

  useDefaultImage() {
    this.setState({src});
  }


  isModalVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  handleSubmt = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 5, offset: 1}
    };
    return (
      <div className='myDatum'>
        <div className='flex-r'>
          <section>
            <img
              src={this.props.login.photo ? this.props.login.photo : require('../../assets/avatar.jpg')}
              alt="avatar"
            />
            <div>
              <a onClick={this.isModalVisible}>更换头像</a>
            </div>
          </section>
          <section>
            <Form layout='horizontal' onSubmit={this.handleSubmt}>
              <FormItem label='昵称' {...formItemLayout}>
                {getFieldDecorator('nickName', {
                  // rules: [{required: true, message: 'asd'}],
                  initialValue: this.props.login.nickname
                })(<Input readOnly />)}
              </FormItem>

              <FormItem label='藏书馆号' {...formItemLayout}>
                {getFieldDecorator('geebooNo', {
                  initialValue: this.props.login.geebooNo
                })(<Input readOnly />)}
              </FormItem>

              <FormItem label='手机号' {...formItemLayout}>
                {getFieldDecorator('mobile', {
                  initialValue: this.props.login.mobile
                })(<Input readOnly />)}
              </FormItem>

              <FormItem label='性别' {...formItemLayout}>
                {getFieldDecorator('gender',
                  {
                    rules: [{required: true}], initialValue: this.props.login.gender === 1 ? '男' : '女'
                  })(
                  <Input readOnly />
                )}
              </FormItem>

              <FormItem label='个性签名'{...formItemLayout}>
                {getFieldDecorator('signature', {
                  rules: [{required: true}], initialValue: this.props.login.signature
                })(<TextArea readOnly />)}
              </FormItem>
            </Form>
          </section>
        </div>

        {/* 剪裁 */}
        <div
          style={{visibility: this.state.isModalVisible ? 'visible' : 'hidden'}}
          className='cropper-container flex-r ala'
        >
          <div className='mask' onClick={this.isModalVisible}></div>
          <div className='cropperWrapper'>
            <div className='cropperContent'>
              <Cropper
                className='cropper'
                // viewMode={2}
                aspectRatio={1}
                autoCropArea={0.4}
                minCropBoxWidth={200}
                minCropBoxHeight={200}
                preview=".img-preview"
                guides
                dragMode='move'
                zoomOnWheel
                cropBoxResizable={false}
                src={this.state.src}
                ref={cropper => {
                  this.cropper = cropper;
                }}
              />
            </div>
            <div className='previewer'>
              <p>头像预览</p>
              <div className="img-preview big" />
              <div className="img-preview small" />
              <div>
                <a className='confirm' onClick={this.cropImage}>确认</a>
                <a className="ui-upload">
                  <input type="file" onChange={this.onChange} />重新上传
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
