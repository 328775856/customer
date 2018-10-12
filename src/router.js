import React from 'react';
import {Router, Route} from 'dva/router';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import ResetPwd from './components/Login/resetPwd';
import Register from './components/Login/register';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div>
        <Route style={{height: '100%'}} path="/" exact component={LoginPage}/>
        <Route style={{height: '100%'}} path="/reset" component={ResetPwd}/>
        <Route style={{height: '100%'}} path="/register" component={Register}/>
        <Route style={{height: '100%'}} path="/home" component={HomePage}/>
      </div>
    </Router>
  );
}

export default RouterConfig;
