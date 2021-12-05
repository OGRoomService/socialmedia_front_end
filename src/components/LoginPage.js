import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { PostUserLogin } from "../api/api";
import { Header } from "./Header";
import { Text,
    Input,
    Link,
    Heading,
    ThemeProvider,
    theme,
    CSSReset,
    Checkbox,
    Stack,
    Flex,
    extendTheme,
    Center
} from "@chakra-ui/react"


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
            fonts: {},
            fontSzes: {},
            sm: "360px", //Galaxy s5
            md: "376px", //I phone X
            lg: "960px",
            xl: "1200px",
        }

    })

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <ThemeProvider theme={customTheme}>
                <CSSReset />
                <Header />
                <Heading as="h2" size="4x5" mb="6">
                    <Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg: "45px", xl: "80px" }} mt="32px"> Rowanspace </Text>
                </Heading>
                <Center
                    w={'100%'}
                >
                    <Stack
                        maxW={'600px'}
                        w={'45%'}
                    >
                        <Text>
                            Username
                        </Text>
                        <Input
                            name="username"
                            type="text"
                            placeholder="username"
                            onChange={handleUpdate} />

                        {formErrors.username && <Text>{formErrors.username}</Text>}

                        <Text>
                            Password
                        </Text>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleUpdate} />
                        {formErrors.password && <Text>{formErrors.password}</Text>}

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

                        {apiData.error && <Text>Invalid Username or Password!</Text>}
                        {apiData.complete && handleResponse()}

                        <Link color="teal.500" href="/recover_password">Forgotten Password?</Link>

                        <Text>
                            Don't have an account? <Link color="teal.500" href="/register">Sign up here!</Link>
                        </Text>
                    </Stack>
                </Center>
                <Footer />
            </ThemeProvider>
        </Flex>
    )
}