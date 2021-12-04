import React, { useState } from "react"
import { Text, Input, Heading, Box, Stack, Flex } from "@chakra-ui/react"

import { PostForgotPasswordEndpoint } from "../../api/api";
import { LoginHeader } from "../LoginHeader";
import Footer from "../Footer";

export const RecoverPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: ''
    });
    const [apiData, setApiData] = PostForgotPasswordEndpoint();
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$');

        if (!formData.email) {
            setFormErrors({
                email: 'Email is Required!'
            })
            return false;
        } else if (!emailRegex.test(formData.email)) {
            setFormErrors({
                email: 'Email is Invalid!'
            })
            return false;
        }
        return true;
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (!validate()) {
            console.log("Form validation failed!");
            return;
        }
        setApiData({
            email: formData.email
        });
        console.log("setting submit to true!!!");
        setSubmitted(true);
    }

    const preSubmitForm = () => {
        return (
            <Flex w="20em" h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%" theme>
                <Stack>
                    <label
                        className="form-header"
                        htmlFor="login-username">
                        Reset Your Password
                    </label>
                    <Text>Enter your email</Text>
                    <Input
                        id="login-username"
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={(e) =>
                            setFormData({
                                email: e.currentTarget.value
                            })
                        } />

                    {formErrors.email &&
                        <Text className="error-message">{formErrors.email}</Text>
                    }

                    <Input
                        className='button'
                        onClick={submitForm}
                        type='button'
                        value='Request' />
                </Stack>
            </Flex>
        );
    }

    const submittedForm = () => {
        return (
            <Flex w="20em" h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%" theme>
                <Heading>Request Sent!</Heading>
                <Text>If an account with that email exists, you will receive an email shortly!</Text>
            </Flex>
        );
    }

    return (
        <Box>
            <LoginHeader />
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