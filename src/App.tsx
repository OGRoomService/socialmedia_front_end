import { Route } from 'react-router';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';

export default function App() {
  return (
    <switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/main" component={MainPage}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route path="/user/:id" component={UserPage}/>
      <Route path="*">
        <h1>404 Not Found</h1>
      </Route>
    </switch>
  )
}