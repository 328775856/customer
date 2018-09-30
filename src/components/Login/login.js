import React from 'react';
import PropTypes from 'prop-types';
// import {Table, Popconfirm, Button, Input} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './login.less';

const FormItem = Form.Item
const login = ({login}) => {
  return (
    <div className={styles.loginBox}>
      <div className={styles.logo}>
        <img src={require("../../assets/images/login_logo.png")} alt=""/>
      </div>
      <div className={styles.loginInput}>
        <Input addonBefore={<p>账&nbsp;&nbsp;&nbsp;&nbsp;户</p>} placeholder="请输入您的账号" />
        <Input addonBefore={<p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>} placeholder="请输入您的密码" />
        <p>忘记密码？<a href="">点这里</a></p>
      </div>
      <div className={styles.loginButton}>
        <Button block>登录</Button>
        <Button block>注册</Button>
      </div>
      <div className={styles.thirdLogin}>
        <a><img src={require("../../assets/images/login_ic_wechat.png")} alt=""/></a>
        <a><img src={require("../../assets/images/login_ic_qq.png")} alt=""/></a>
        <a><img src={require("../../assets/images/login_ic_blog.png")} alt=""/></a>
      </div>
      <div className={styles.text}>
        <span className={styles.dashed}></span>
        <span>第三方登录</span>
        <span className={styles.dashed}></span>
      </div>
    </div>
  );
};

login.propTypes = {
};

export default login;
