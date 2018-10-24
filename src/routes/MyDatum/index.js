import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import Cropper from '../../components/common/cropper';
import 'cropperjs/dist/cropper.css';
import './index.less';

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const src = '/139.jpg';

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
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    console.log(this.cropper.getCroppedCanvas().toDataURL())
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL()
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
            <img src="http://pic36.photophoto.cn/20150728/0022005597823716_b.jpg" alt=""/>
            <div>
              <a onClick={this.isModalVisible}>更换头像</a>
            </div>
          </section>
          <section>
            <Form layout='horizontal' onSubmit={this.handleSubmt}>
              <FormItem label='昵称' {...formItemLayout}>
                {getFieldDecorator('nickName', {
                  rules: [{required: true, message: 'asd'}]
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
                  {rules: [{required: true}]})(
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
                aspectRatio={1}
                preview=".img-preview"
                guides={false}
                autoCropArea={0.5}
                // zoomOnWheel={true}
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
                <a href="" className="ui-upload">
                  <input type="file" onChange={this.onChange}  />upload
                </a>
                <Button>2</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
