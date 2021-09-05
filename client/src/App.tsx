import SWRDevtools from '@jjordy/swr-devtools';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SWRConfig, useSWRConfig } from 'swr';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header';
import Profile from './pages/Account/Profile';
import Setting from './pages/Account/Settings';
import Login from './pages/Login';
import Refresh from './pages/Refresh';
import WordbookDetail from './pages/WordbookDetail';
import WordbookSpace from './pages/WordbookSpace';
import WordbookSpaceDetail from './pages/WordbookSpaceDetail';

function App() {
  const { cache, mutate } = useSWRConfig();

  return (
    <>
      {/* <SWRDevtools cache={cache} mutate={mutate} /> */}
      <SWRConfig
        value={{
          errorRetryCount: 3,
          dedupingInterval: 5000,
          errorRetryInterval: 5000,
        }}
      >
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
              <Route exact path="/wordbookspaces">
                <WordbookSpace />
              </Route>
              <Route exact path="/wordbookspaces/:wordbookSpaceId">
                <WordbookSpaceDetail />
              </Route>
              <Route
                exact
                path="/wordbookspaces/:wordbookSpaceId/wordbooks/:wordbookId"
              >
                <WordbookDetail />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/refresh">
                <Refresh />
              </Route>
              <Route exact path="/account">
                <Redirect to="/account/settings" />
              </Route>
              <Route exact path="/account/settings">
                <Setting />
              </Route>
              <Route exact path="/account/profile">
                <Profile />
              </Route>
            </Switch>
          </AppLayout.Main>
        </AppLayout>
      </SWRConfig>
    </>
  );
}

export default App;
