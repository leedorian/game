import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import Register from './components/views/register';
import './style/common.css';

ReactDOM.render(
  <Routes />,
  document.querySelector('#app'),
);
