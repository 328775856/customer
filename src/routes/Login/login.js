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
  return (
    <div style={{height: '100%'}}>
      <ComLogin loginclick={loginclick}/>
    </div>
  );
};

// export default Products;
export default connect(({login}) => ({
  login
}))(Login);
