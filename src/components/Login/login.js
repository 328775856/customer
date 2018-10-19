import React from 'react';
import {Form, Input, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './login.less';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const {loginclick} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginclick(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={require('../../assets/images/login_logo.png')} alt=""/>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <div className={styles.loginInput}>
            <FormItem>
              {getFieldDecorator('userCode', {
                rules: [{required: true, message: '请输入您的账号'}]
              })(<Input addonBefore={<p>账&nbsp;&nbsp;&nbsp;&nbsp;户</p>} placeholder="请输入您的账号"/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('passwd', {
                rules: [{required: true, message: '请输入您的密码'}]
              })(<Input type='password' addonBefore={<p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>} placeholder="请输入您的密码"/>)}
            </FormItem>
            <p>忘记密码？<Link to="/reset">点这里</Link></p>
          </div>
          <div className={styles.loginButton}>
            <Button htmlType='submit' block>登录</Button>
            <Button block><Link to='/register'>注册</Link></Button>
          </div>
        </Form>
        <div className={styles.thirdLogin}>
          <a><img src={require('../../assets/images/login_ic_wechat.png')} alt=""/></a>
          <a><img src={require('../../assets/images/login_ic_qq.png')} alt=""/></a>
          <a><img src={require('../../assets/images/login_ic_blog.png')} alt=""/></a>
        </div>
        <div className={styles.text}>
          <span className={styles.dashed}></span>
          <span>第三方登录</span>
          <span className={styles.dashed}></span>
        </div>
      </div>
    );
  }
};
const login = Form.create()(NormalLoginForm);
login.propTypes = {};

export default login;
