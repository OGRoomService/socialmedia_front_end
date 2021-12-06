import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { PostNewUserEndpoint } from "../api/api";
import { Header } from "./Header";
import Footer from "./Footer";
import '../styles/register.css'
import {
    Heading,
    Text,
    Input,
    Link,
    Flex,
    Stack,
    Center,
    extendTheme,
    ThemeProvider
} from "@chakra-ui/react";

export const Registration = () => {
    const [formData, setFormData] = useState({
        step: 1,
        username: '',
        email: '',
        password: '',
        vpassword: ''
    });
    const [apiData, setApiData] = PostNewUserEndpoint();
    const [formErrors, setFormErrors] = useState({
        username: '',
        vpassword: '',
        password: '',
        email: '',
        api: ''
    });
    const history = useHistory();

    const validate = (formData) => {
        const passwordRegex = new RegExp('(?=.*[!@#$%&*()_+=|<>?{}\\[\\]~-])+(?=.*[0-9])+(?=.{8,})');
        const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$');
        const usernameRegex = new RegExp('[!@#$%&*()_+=|<>?{}\\[\\]~-]');
        let formErrors = {};
        let passes = true;

        if (!formData.username) {
            formErrors.username = 'Username is Required!';
            passes = false;
        } else if (formData.username < 6 || usernameRegex.test(formData.username)) {
            formErrors.username = 'Username is Invalid!';
            passes = false;
        }

        if (!formData.email) {
            formErrors.email = 'Email is Required!';
            passes = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = 'Email is Invalid!';
            passes = false;
        }

        if (formData.password !== formData.vpassword) {
            formErrors.vpassword = 'Passwords do not match!';
            passes = false;
        }

        if (!formData.password || !passwordRegex.test(formData.password)) {
            formErrors.password = 'Minimum password length is 8 characters and must contain at least 1 number and 1 symbol';
            passes = false;
        }
        setFormErrors(formErrors);
        return passes;
    }

    const handleChange = e => {
        const { name, value } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleResponse = () => {
        console.log(apiData.data);

        if (!apiData.data) {
            formErrors.api = 'Something went wrong, try again!';
            return;
        }
        switch (apiData.data.status) {
            case 201:
                history.push("/");
                break;
            default:
                break;
        }
    }

    const submitForm = e => {
        e.preventDefault();

        if (!validate(formData)) {
            console.log("Form validation failed!");
            return;
        }

        setApiData({
            username: formData.username,
            email: formData.email,
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
            md: "375px", //I phone X
            dt: "376px",
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
            <Header />
            <Heading as="h2" size="4x5">
                    <Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg: "35px", xl: "80px" }}> Rowanspace </Text>
            </Heading>
            <Center w={'100%'}>
                <Stack
                    w={{base:'350px', sm:'350px', md:'350px', lg:'45%'}}
                    maxW={'600px'}
                >
                    <Text fontWeight={'bold'}>Please fill out information below</Text>
                    <Text>
                        Username
                    </Text>
                    <Input
                        name="username"
                        type="text"
                        placeholder="username"
                        defaultValue={formData.username}
                        onChange={handleChange}
                        required />

                    {formErrors.username && <Text>{formErrors.username}</Text>}

                    <Text>
                        Email
                    </Text>
                    <Input
                        name="email"
                        type="email"
                        placeholder="email"
                        defaultValue={formData.email}
                        onChange={handleChange} />

                    {formErrors.email && <Text>{formErrors.email}</Text>}

                    <Text>
                        Password
                    </Text>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        defaultValue={formData.password}
                        onChange={handleChange} />

                    {formErrors.password && <Text>{formErrors.password}</Text>}

                    <Text>
                        Confirm Password
                    </Text>
                    <Input
                        id="vpassword"
                        name="vpassword"
                        type="password"
                        placeholder="Confirm Password"
                        defaultValue={formData.vpassword}
                        onChange={handleChange} />

                    {formErrors.vpassword && <Text>{formErrors.vpassword}</Text>}

                    <Input
                        className='button'
                        onClick={submitForm}
                        type='button'
                        value="Register" />

                    {formErrors.api && <Text>{formErrors.api}</Text>}
                    <Center w={'100%'}>
                        <Text>
                            Already have an account? <Link color="teal.500" href="/login">Login here!</Link>
                        </Text>
                    </Center>
                    {apiData.complete && handleResponse()}
                </Stack>
            </Center>
            <Footer />
        </ThemeProvider>
        </Flex>
    );
}