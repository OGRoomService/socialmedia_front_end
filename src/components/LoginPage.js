import React, { useEffect, useState } from "react";
import { Text, Input, Link, Heading, ThemeProvider, theme, CSSReset, Checkbox, Stack, Flex, extendTheme } from "@chakra-ui/react"
import Footer from "./Footer";
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
        let formErrors = {};
        let valid = true;

        if (!formData.username || formData.username.trim() === '') {
            formErrors.username = 'Username required!'
            valid = false;
        }
        if (!formData.password || formData.password.trim() === '') {
            formErrors.password = 'Password required!'
            valid = false;
        }
        setFormErrors(formErrors);
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


    const customTheme = extendTheme({


        breakpoints:
        {
            colors: {},
            fonts:{},
            fontSzes:{},
            sm: "360px", //Galaxy s5
            md: "376px", //I phone X
            lg: "960px",
            xl: "1200px",
        }

    }) 

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <LoginHeader />
             <Flex  h="100%" w="100%" flexDirection={"row"} alignItems="center" mb="0px">
                <Heading as="h2" size="4x5" mb="6"><Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg:"45px", xl:"80px" }} mt="32px"> Rowanspace </Text></Heading> 
    
                {/* <Flex w={{ base: "20em", sm: "7em", md: "7em" }} h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%" theme bgColor={["red", "blue", "yellow", "purple", "pink"]}>

                    <Stack>
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
                            type="password"
                            placeholder="Password"
                            onChange={handleUpdate} />

                        <Checkbox
                            name="remember"
                            onChange={(e) =>
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

                        <Link color="teal.500" href="/recover_password">Forgotten Password?</Link>

                        <p>Don't have an account? <Link color="teal.500" href="/register">Sign up here!</Link></p>
                    </Stack>
                        </Flex> */}
            
            <Flex  ml={{base: "100px", sm: "50px", lg: "300px"}} h="100px" w={{ base: "300px", sm: "100pxpx", md: "100px", lg:"450px" }} pos="fixed" flexDirection={"column"} h="100%" mt="4%" top="7%">
            <Stack>
                        <label fontSize="10px"
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
                            type="password"
                            placeholder="Password"
                            onChange={handleUpdate} />

                        <Checkbox
                            name="remember"
                            onChange={(e) =>
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

                        <Link color="teal.500" href="/recover_password">Forgotten Password?</Link>

                        <p>Don't have an account? <Link color="teal.500" href="/register">Sign up here!</Link></p>
                    </Stack>
            </Flex>
            </Flex>
            
            <Footer />
        </ThemeProvider>
    )
}