import React from 'react';
import {connect} from 'dva';
import ComLogin from '../../components/Login/login';

const Login = ({dispatch, login}) => {

  function loginclick(val) {
    dispatch({
      type: 'login/login',
      payload: {...val}
    });
  }

  function wxLogin(val) {
    dispatch({
      type:'login/wxLogin',
      payload:{
        code: val
      }
    });
  }

  return (
    <div className='login loginBg'>
      <ComLogin loginclick={loginclick} wxLogin={wxLogin} />
    </div>
  );
};

// export default Products;
export default connect(({login}) => ({
  login
}))(Login);
