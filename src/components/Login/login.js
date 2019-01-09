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

  componentDidMount() {
    let codeStr = window.location.search;
    console.log('codeStr',codeStr);
    if (codeStr.indexOf('=') != -1 && codeStr.lastIndexOf('&') != -1) {
      let code = codeStr.substring(codeStr.indexOf('=') + 1, codeStr.lastIndexOf('&'));
      const {wxLogin} = this.props;
      wxLogin(code);
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const qqAppId = 101534515;
    const qqRedirectUri = encodeURIComponent('http://thrid.geeboo.com/thirdLogin/qqLogin');
    const qqScope = 'get_user_info';

    const wxAppId = 'wxeddb4fdbd4dd8d4d';
    const wxRedirectUri = encodeURIComponent('http://thrid.geeboo.com');

    const weiboClientId = 3402691650;
    const weiboRedirecUri = encodeURIComponent('http://192.168.10.212:8755/GbCustomer/thirdLogin/weiboLogin');

    return (
      <div>
        <div className={styles.loginBox}>
          <div className={styles.logo}>
            <img src={require('../../assets/images/login_logo.png')} alt="" />
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.loginInput}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: '请输入您的账号'}]
                })(<Input addonBefore={<p>账&nbsp;&nbsp;&nbsp;&nbsp;户</p>} placeholder="请输入您的账号" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '请输入您的密码'}]
                })(<Input type='password' addonBefore={<p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>} placeholder="请输入您的密码" />)}
              </FormItem>
              <p>忘记密码？<Link to="/reset">点这里</Link></p>
            </div>
            <div className={styles.loginButton}>
              <Button htmlType='submit' block>登录</Button>
              <Link to='/register'>注册</Link>
            </div>
          </Form>
          <div className={styles.thirdLogin}>
            <a
              href={`https://open.weixin.qq.com/connect/qrconnect?appid=${wxAppId}&redirect_uri=${wxRedirectUri}&response_type=code&scope=snsapi_login&state=123#wechat_redirect`}
              target='_self'
            >
              <img src={require('../../assets/images/login_ic_wechat.png')} alt="" />
            </a>
            <a
              href={`https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${qqAppId}&redirect_uri=${qqRedirectUri}&scope=${qqScope}`}
              target='_self'
            >
              <img src={require('../../assets/images/login_ic_qq.png')} alt="" />
            </a>
            <a
              href={`https://api.weibo.com/oauth2/authorize?client_id=${weiboClientId}&response_type=code&redirect_uri=${weiboRedirecUri}`}
              target='_self'
            >
              <img src={require('../../assets/images/login_ic_blog.png')} alt="" />
            </a>
          </div>
          <div className={styles.text}>
            <span className={styles.dashed}></span>
            <span>第三方登录</span>
            <span className={styles.dashed}></span>
          </div>
        </div>
      </div>
    );
  }
}

const login = Form.create()(NormalLoginForm);
login.propTypes = {};

export default login;
