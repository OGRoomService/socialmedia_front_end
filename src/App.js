import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { MainPage } from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { Registration } from './components/Registration';
import NotFound from './components/NotFound';

import { useToken } from './api/token';
import { currentUser } from './api/user';
import { RecoverPassword } from './components/PasswordRecovery/RecoverPassword';
import { ResetPassword } from './components/PasswordRecovery/ResetPassword';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
    const { token, setToken } = useToken();
    const { hasData, setUser } = currentUser();

    const loginUser = (data, remember) => {
        const tokenData = data.tokens;
        const userData = data.user;

        setToken({
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            remember: remember
        });
        setUser(userData);
    }

    const checkLogin = () => {
        // If there is a token but no user data, render the login page
        if (token &&
            token['access_token'] &&
            !hasData()) {
            return (<LoginPage loginUser={loginUser} />);
        }

        // If the token doesn't exist, only allow access to login and registration page
        if (!token || !hasData()) {
            return (
                <ChakraProvider>
                    <Switch>
    
                        <Route exact path="/register"
                            component={Registration} />
    
                        <Route exact path="/recover_password"
                            component={RecoverPassword} />
    
                        <Route exact path="/reset_password"
                            component={ResetPassword} />
    
                        <Route component={() => <LoginPage key={'loginpage'}  loginUser={loginUser} />} />
    
                    </Switch>
                </ChakraProvider>
            )
        }
        
        // Render the rest of the website
        return (
            <ChakraProvider>
                <Switch>
    
                    <Route exact path="/" component={() => <MainPage key={'mainpage'} />} />
    
                    <Route exact path="/register">
                        <Redirect to='/' />
                    </Route>
    
                    <Route path="/u/:username" component={() => <ProfilePage key={window.location.pathname} />} />
    
                    <Route>
                        <NotFound />
                    </Route>
    
                </Switch>
            </ChakraProvider>
        )
    }

    return (checkLogin())
}