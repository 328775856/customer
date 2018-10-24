import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import ResetPwd from './components/Login/resetPwd';
import Register from './components/Login/register';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/reset" component={ResetPwd}/>
        <Route path="/register" component={Register}/>
        <Route path="/home" component={HomePage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
