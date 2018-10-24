import React, {Component} from 'react';
import Login from '../routes/Login/login';
import {Route, Switch} from 'dva/router';

class LoginPage extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={Login}></Route>
      </Switch>
    );
  }
}

export default LoginPage;
