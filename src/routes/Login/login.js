import React from 'react';
import { connect } from 'dva';
import ComLogin from '../../components/Login/login';

const  Login= ({ dispatch, login }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  function click(){
    dispatch({
      type: 'product/fetch',
    })
  }
  return (
    <div style={{height:'100%',overflow:'hidden'}}>
      <ComLogin login={login} />
    </div>
  );
};

// export default Products;
export default connect(({ login }) => ({
  login,
}))(Login);
