import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header';
import Profile from './pages/Account/Profile';
import Setting from './pages/Account/Settings';
import Login from './pages/Login';
import Refresh from './pages/Refresh';

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
            <Route exact path="/account">
              <Redirect to="/account/settings" />
            </Route>
            <Route exact path="/account/settings" component={Setting} />
            <Route exact path="/account/profile" component={Profile} />
          </Switch>
        </AppLayout.Main>
      </AppLayout>
    </>
  );
}

export default App;
