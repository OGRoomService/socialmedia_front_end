import React, { useState } from "react"
import { PostResetPasswordEndpoint } from "../../api/api";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import {
    Text,
    Input,
    Link,
    Heading,
    Box,
    Stack,
    Flex,
    Center
} from "@chakra-ui/react"


export const ResetPassword = ({ match, location }) => {
    const [formData, setFormData] = useState({
        password: '',
        vpassword: ''
    });
    const [formErrors, setFormErrors] = useState({
        password: '',
        vpassword: ''
    });
    const [, setApiData] = PostResetPasswordEndpoint();
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
            <Stack>
                <Heading size="lg">Reset Your Password</Heading>
                <Text fontWeight='bold'>Enter new password</Text>
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange} />

                {formErrors.password && <Text>{formErrors.password}</Text>}

                <Text fontWeight='bold'>Confirm password</Text>
                <Input
                    name="vpassword"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange} />

                {formErrors.vpassword && <Text>{formErrors.vpassword}</Text>}

                <Input
                    className='button'
                    onClick={submitForm}
                    type='button'
                    value='Reset' />
            </Stack>
        );
    }

    const submittedForm = () => {
        return (
            <Box>
                <Heading>Password Reset!</Heading>
                <Text>You can now login with your new password!</Text>
                <Link color="teal.500" href="/">Back to Login</Link>
            </Box>
        );
    }

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <Header />
            <Heading as="h2" size="4x5" mb="6"><Text fontSize="6xl" mt="20"> Rowanspace </Text></Heading>
            <Center w={'100%'}>
                {submitted ?
                    submittedForm() :
                    preSubmitForm()
                }
            </Center>
            <Footer />
        </Flex>
    )
}