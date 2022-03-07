
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { makeServer } from "./mirage";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  makeServer({ environment });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);