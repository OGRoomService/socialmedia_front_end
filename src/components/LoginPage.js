import React, { useState } from "react";
import { Text, Input, Link, Heading, ThemeProvider, theme, CSSReset, Checkbox } from "@chakra-ui/react"

import { PostUserLogin } from "../api/api";
import { LoginHeader } from "./LoginHeader";

import '../styles/login.css';

export const LoginPage = ({ setToken }) => {
    const [apiData, setApiData] = PostUserLogin();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: ''
    });
    let handlingResponse = false;

    const validate = () => {
        let valid = true;

        if (!formData.username || formData.username.trim() === '') {
            formErrors.username = 'Username required!'
            valid = false;
        }
        if (!formData.password || formData.password.trim() === '') {
            formErrors.password = 'Password required!'
            valid = false;
        }
        return valid;
    }

    const handleUpdate = (e) => {
        const { name, value } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleResponse = () => {
        if (handlingResponse) return;
        if (!apiData.data) return;

        handlingResponse = true;

        setToken({
            access_token: apiData.data.data.access_token,
            refresh_token: apiData.data.data.refresh_token,
            remember: formData.remember
        })
    }

    const submitForm = e => {
        e.preventDefault();

        if (apiData.pending) return;
        if (!validate()) {
            return;
        } else {
            setFormErrors({
                username: '',
                password: ''
            });
            handlingResponse = false;
        }
        setApiData({
            username: formData.username,
            password: formData.password
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <LoginHeader />
            <div>
                <h2>Rowanspace</h2>
                <div className="containerL">
                    <div className="containerL" id="containerL-m">
                        <form>
                            <label
                                className="form-header"
                                htmlFor="login-username">
                                Username</label>
                            <Input
                                id="login-username"
                                name="username"
                                type="text"
                                placeholder="username"
                                onChange={handleUpdate} />

                            {formErrors.username && <span className="error-message">{formErrors.username}</span>}

                            <label className="form-header"
                                htmlFor="login-password">
                                Password</label>

                            {formErrors.password && <span className="error-message">{formErrors.password}</span>}

                            <Input
                                id="login-password"
                                name="password"
                                type="text"
                                placeholder="Password"
                                onChange={handleUpdate} />

                            <Checkbox
                                name="remember"
                                onChange={ (e) =>
                                    setFormData({
                                        ...formData,
                                        [e.currentTarget.name]: e.currentTarget.checked
                                    })
                                }
                            >
                                Remember me
                            </Checkbox>

                            <Input
                                className='button'
                                onClick={submitForm}
                                type='button'
                                value='Login' />

                            {apiData.error && <span>Invalid Username or Password!</span>}
                            {apiData.complete && handleResponse()}

                            <p>Don't have an account? <Link color="teal.500" href="/register">Sign up here!</Link></p>
                        </form>
                    </div>
                </div>
                <Heading as="h2" size="4x5" mb="6"><Text fontSize="6xl" mt="20"> Rowanspace </Text></Heading>
            </div>
           {/* <Footer />  */}
            {/* <Footer /> 
           <Footer />  */}
        </ThemeProvider>
    )
}