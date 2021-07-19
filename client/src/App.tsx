import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header';
import Login from './pages/Login';
import Refresh from './pages/Refresh';
import Setting from './pages/Setting/Setting';

function App() {
  return (
    <>
      <AppLayout>
        <AppLayout.Head>
          <Header />
        </AppLayout.Head>
        <AppLayout.Main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/refresh" component={Refresh} />
            <Route exact path="/setting" component={Setting} />
          </Switch>
        </AppLayout.Main>
      </AppLayout>
    </>
  );
}

export default App;
