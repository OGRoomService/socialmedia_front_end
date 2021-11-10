import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import UserPage from './components/UserPage';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { Registration } from './components/Registration';
import NotFound from './components/NotFound';

import './App.css';
import { useToken } from './api/token';

export default function App() {
  const { token, setToken } = useToken();

  // If the token doesn't exist, only allow access to login and registration page
  if (!token) {
    return (
      <Switch>

        <Route exact path="/">
          <LoginPage setToken={setToken} />
        </Route>

        <Route exact path="/register">
          <Registration />
        </Route>

        <Route>
          <Redirect to='/' />
        </Route>

      </Switch>
    )
  }
  return (
    <Switch>

      <Route exact path="/">
        <MainPage />
      </Route>

      <Route exact path="/register">
        <Redirect to='/' />
      </Route>

      <Route path="/u/:id">
        <UserPage />
      </Route>

      <Route exact path="/profile">
        <ProfilePage />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  )
}