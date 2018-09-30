import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import Login from './routes/Login/login';
import Home from './layout/Home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/*<Route path="/" exact component={Login} />*/}
        <Route style={{height:'100%'}} path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
