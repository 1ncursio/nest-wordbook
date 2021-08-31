import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Nest Wordbook</title>
      </Helmet>
      <Router>
        <SWRConfig
          value={{
            errorRetryCount: 3,
            dedupingInterval: 5000,
            errorRetryInterval: 5000,
          }}
        >
          <App />
        </SWRConfig>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
