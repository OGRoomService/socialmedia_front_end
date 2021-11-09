import { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';

import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import NotFound from './components/NotFound';
import { Registration } from './components/Registration/Registration';

import './App.css';

export default function App() {
  const [token, setToken] = useState();
  const history = useHistory();

  // If the token doesn't exist, only allow access to login and registration page
  if (!token) {
    return (
      <Switch>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/">
          <LoginPage />
        </Route>
        {/* <Route>
          {history.push('/')}
        </Route> */}
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/u/:id" component={UserPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  )
}