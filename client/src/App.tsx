import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header';
import Profile from './pages/Account/Profile';
import Setting from './pages/Account/Settings';
import Login from './pages/Login';
import Refresh from './pages/Refresh';
import WordbookSpace from './pages/WordbookSpace';
import WordbookSpaceDetail from './pages/WordbookSpaceDetail';

function App() {
  return (
    <SWRConfig value={{ errorRetryCount: 3 }}>
      <AppLayout>
        <AppLayout.Head>
          <Header />
        </AppLayout.Head>
        <AppLayout.Main>
          <Switch>
            <Route exact path="/">
              {/* <Redirect to="/login" /> */}
              <Redirect to="/wordbookspaces" />
            </Route>
            <Route exact path="/wordbookspaces" component={WordbookSpace} />
            <Route
              exact
              path="/wordbookspaces/:wordbookSpaceId"
              component={WordbookSpaceDetail}
            />
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
    </SWRConfig>
  );
}

export default App;
