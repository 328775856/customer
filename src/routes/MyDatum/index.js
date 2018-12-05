import React, {Component} from 'react';
import {Form, Input} from 'antd';
import {connect} from 'dva';
import Cropper from '../../components/common/cropper';
import 'cropperjs/dist/cropper.css';
import './index.less';

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const src = '/avatar.jpg';

@connect(({login}) => ({login}))

@Form.create()
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      src,
      cropResult: null
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
    // console.log(this.cropper.getCroppedCanvas().toDataURL());
    dispatch({
      type: 'login/changeAvatar',
      payload: this.cropper.getCroppedCanvas().toDataURL()
    });
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      isModalVisible: false,
    });
  }

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
      labelCol: {span: 1},
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
                  rules: [{required: true, message: 'asd'}],
                  initialValue: this.props.login.nickname
                })(<Input/>)}
              </FormItem>

              <FormItem label='藏书馆号' {...formItemLayout}>
                <Input value='132654' readOnly/>
              </FormItem>

              <FormItem label='手机号' {...formItemLayout}>
                <Input value='13639308888' readOnly/>
              </FormItem>

              <FormItem label='性别' {...formItemLayout}>
                {getFieldDecorator('gender',
                  {rules: [{required: true}], initialValue: ['男','女'][this.props.login.gender]
                  })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label='个性签名'{...formItemLayout}>
                {getFieldDecorator('person')(
                  <TextArea/>
                )}
              </FormItem>
            </Form>
          </section>
        </div>
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
                dragMode='none'
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
              <div className="img-preview big"/>
              <div className="img-preview small"/>
              <div>
                <a className='confirm' onClick={this.cropImage}>确认</a>
                <a className="ui-upload">
                  <input type="file" onChange={this.onChange}/>重新上传
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
