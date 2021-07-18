import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SWRDevtools } from '@jjordy/swr-devtools';
import { cache, mutate } from 'swr';

ReactDOM.render(
  <React.StrictMode>
    <SWRDevtools cache={cache} mutate={mutate} debug />
    <HelmetProvider>
      <Helmet>
        <title>Nest Wordbook</title>
      </Helmet>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
