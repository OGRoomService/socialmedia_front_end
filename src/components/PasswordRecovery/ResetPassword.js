import React, { useState } from "react"
import { Text, Input, Link, Heading, Box, Checkbox, Stack, Flex } from "@chakra-ui/react"

import { PostForgotPasswordEndpoint, PostResetPasswordEndpoint } from "../../api/api";
import { Header } from "../Header";
import Footer from "../Footer";


export const ResetPassword = ({ match, location }) => {
    const [formData, setFormData] = useState({
        password: '',
        vpassword: ''
    });
    const [formErrors, setFormErrors] = useState({
        password: '',
        vpassword: ''
    });
    const [apiData, setApiData] = PostResetPasswordEndpoint();
    const [submitted, setSubmitted] = useState(false);
    const token = (new URLSearchParams(location.search)).get('token');

    const validate = () => {
        const passwordRegex = new RegExp('(?=.*[!@#$%&*()_+=|<>?{}\\[\\]~-])+(?=.*[0-9])+(?=.{8,})');
        let passes = true;

        if (formData.password !== formData.vpassword) {
            setFormErrors({
                ...formErrors,
                vpassword: 'Passwords do not match!'
            });
            passes = false;
        }

        if (!formData.password || !passwordRegex.test(formData.password)) {
            setFormErrors({
                ...formErrors,
                password: 'Minimum password length is 8 characters and must contain at least 1 number and 1 symbol'
            });
            passes = false;
        }
        return passes;
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        setApiData({
            "password_reset_token": token,
            "new_password": formData.password
        });
        setSubmitted(true);
    }

    const preSubmitForm = () => {
        return (
            <Flex w="20em" h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%">
                <Stack>
                    <Heading size="lg">Reset Your Password</Heading>
                    <Text fontWeight='bold'>Enter new password</Text>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange} />

                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}

                    <Text fontWeight='bold'>Confirm password</Text>
                    <Input
                        id="vpassword"
                        name="vpassword"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange} />

                    {formErrors.vpassword && <span className="error-message">{formErrors.vpassword}</span>}

                    <Input
                        className='button'
                        onClick={submitForm}
                        type='button'
                        value='Reset' />
                </Stack>
            </Flex>
        );
    }

    const submittedForm = () => {
        return (
            <Flex w="20em" h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%">
                <Heading>Password Reset!</Heading>
                <Text>You can now login with your new password!</Text>
                <Link color="teal.500" href="/">Back to Login</Link>
            </Flex>
        );
    }

    return (
        <Box>
            <Header />
            <Flex h="100%" w="100%" flexDirection={"row"} alignItems="center">
                <Heading as="h2" size="4x5" mb="6"><Text fontSize="6xl" mt="20"> Rowanspace </Text></Heading>
                {submitted ?
                    submittedForm() :
                    preSubmitForm()
                }
            </Flex>
            <Footer />
        </Box>
    )
}