import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/commons/loading';
// import Login from './components/views/login';
// import Register from './components/views/register';
// import PassReset from './components/views/passReset';
// import Home from './components/views/home';
// import Contact from './components/views/contact';

const myRouter = () => {
  const Login = Loadable({
    loader: () => import('./components/views/login'),
    loading: Loading,
  });
  const Register = Loadable({
    loader: () => import('./components/views/register'),
    loading: Loading,
  });
  const PassReset = Loadable({
    loader: () => import('./components/views/passReset'),
    loading: Loading,
  });
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/PassReset" component={PassReset} />
      </Switch>
    </Router>
  );
};

export default myRouter;
