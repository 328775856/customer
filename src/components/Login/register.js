import React from 'react';
import {Form, Input, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './login.less';
import {connect} from 'dva';

const FormItem = Form.Item;

@connect(({login}) => ({login}))
class NormalLoginForm extends React.Component {
  UNSAFE_componentWillReceiveProps(nextP, nextS) {
    console.log(nextP.login)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.register(values);
      }
    });
  };
  getCaptcha = () => {
    this.props.form.validateFields(['mobile'], (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/getCaptcha',
          payload: values
        });
      }
    });
  };
  register = (val) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'login/register',
      payload: {...val}
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='loginBg'>
        <div className={styles.loginBox}>
          <div className={styles.logo}>
            <img src={require('../../assets/images/login_logo.png')} alt=""/>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.loginInput}>
              <p style={{textAlign: 'center'}}>注册</p>
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{required: true, message: '请输入您的账号'}]
                })(<Input addonBefore={<p>手机号</p>} placeholder="请输入您的账号"/>)}
              </FormItem>
              <FormItem style={{float: 'left'}}>
                {getFieldDecorator('verifyCode', {
                  rules: [{required: true, message: '请输入验证码'}]
                })(<Input addonBefore={<p>验证码</p>} placeholder="请输入验证码"/>)}
              </FormItem>
              <Button id='btn' style={styles.btn} onClick={this.getCaptcha}>获取验证码</Button>
              <FormItem>
                {getFieldDecorator(
                  'password', {
                    rules: [{
                      required: true,
                      message: '请输入密码'
                    }]
                  }
                )(<Input addonBefore={<p>密&nbsp;&nbsp;&nbsp; 码</p>} placeholder='请输入您的密码'/>)}
              </FormItem>
            </div>
            <div className={styles.loginButton}>
              <Button htmlType='submit' className={styles.resetBtn} block>注册</Button>
              <div style={{marginTop: 24, textAlign: 'center'}}>
                <span>有藏书馆账号？</span>
                <Link className={styles.backToLogin} style={{display: 'inline'}} to='/'>返回登录</Link>
              </div>
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
