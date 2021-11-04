import { Route, Switch } from 'react-router';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFound from './components/NotFound';
import Registration from './components/Registration/Registration';
import './App.css';

export default function App() {
  return (
    /*
     * Do check to see if user logged in
     * if they are show home page, if not show login page
    */
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/home" component={MainPage} />
      <Route exact path="/register" component={Registration} />
      <Route path="/u/:id" component={UserPage} />
      <Route component={NotFound} />
    </Switch>
  )
}