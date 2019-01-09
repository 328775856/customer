import React from 'react';
import {Form, Input, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './login.less';
import {connect} from 'dva';

const FormItem = Form.Item;

@connect(({login}) => ({login}))
class NormalLoginForm extends React.Component {
  state = {
    isGetCaptcha: false,
    num: 60
  };
  handleSubmit = e => {
    e.preventDefault();
    // const {loginclick} = this.props;
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     loginclick(values);
    //   }
    // });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.resetPassword(values);
      }
    });
  };

  getCaptcha = () => {
    this.props.form.validateFields(['mobile'], (err, values) => {
      const param = {
        type: 2,
        ...values
      };
      if (!err) {
        this.setState({isGetCaptcha: true});
        let t = setInterval(() => {
          if (this.state.num === 0) {
            this.setState({isGetCaptcha: false, num: 60});
            clearInterval(t);
          } else {
            this.setState({num: this.state.num - 1});
          }
        }, 1000);
        this.props.dispatch({
          type: 'login/getCaptcha',
          payload: param
        });
      }
    });
  };

  resetPassword = (val) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'login/resetPassword',
      payload: val
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='loginBg'>
        <div className={styles.loginBox}>
          <div className={styles.logo}>
            <img src={require('../../assets/images/login_logo.png')} alt="" />
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.loginInput}>
              <p style={{textAlign: 'center'}}>忘记密码</p>
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{required: true, message: '请输入您的账号'}]
                })(<Input addonBefore={<p>手机号</p>} placeholder="请输入您的账号" />)}
              </FormItem>
              <FormItem style={{float: 'left'}}>
                {getFieldDecorator('verifyCode', {
                  rules: [{required: true, message: '请输入验证码'}]
                })(<Input addonBefore={<p>验证码</p>} placeholder="请输入验证码" />)}
              </FormItem>
              {
                !this.state.isGetCaptcha ?
                  <Button id='btn' style={styles.btn} onClick={this.getCaptcha}>获取验证码</Button> :
                  <Button id='btn' style={styles.btn}>{this.state.num}s</Button>
              }
              <FormItem>
                {getFieldDecorator(
                  'newPwd', {
                    rules: [{
                      required: true,
                      message: '请输入新密码'
                    }]
                  }
                )(<Input addonBefore={<p>新密码</p>} placeholder='请输入您的新密码' />)}
              </FormItem>
            </div>
            <div className={styles.loginButton}>
              <Button htmlType='submit' className={styles.resetBtn} block>修改密码</Button>
              <Link
                className={styles.backToLogin}
                to='/'
              >返回登录</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const login = Form.create()(NormalLoginForm);
login.propTypes = {};

export default login;
