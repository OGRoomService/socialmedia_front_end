import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import UserPage from './components/UserPage';
import { MainPage } from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { Registration } from './components/Registration';
import { Settings } from './components/Settings';
import NotFound from './components/NotFound';

import './App.css';
import { useToken } from './api/token';
import { currentUser } from './api/user';
import { RecoverPassword } from './components/PasswordRecovery/RecoverPassword';
import { ResetPassword } from './components/PasswordRecovery/ResetPassword';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
    const { token } = useToken();
    const { hasData } = currentUser();

    // If the token doesn't exist, only allow access to login and registration page
    if (!token || !hasData()) {
        return (
            <ChakraProvider>
                <Switch>

                    <Route exact path="/">
                        <LoginPage />
                    </Route>

                    <Route exact path="/register"
                        component={Registration} />

                    <Route exact path="/recover_password"
                        component={RecoverPassword} />

                    <Route exact path="/reset_password"
                        component={ResetPassword} />

                    <Route>
                        <Redirect to='/' />
                    </Route>

                </Switch>
            </ChakraProvider>
        )
    }
    return (
        <ChakraProvider>
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

                <Route exact path="/settings">
                    <Settings />
                </Route>

                <Route>
                    <NotFound />
                </Route>

            </Switch>
        </ChakraProvider>
    )
}