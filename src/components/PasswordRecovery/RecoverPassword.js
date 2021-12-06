import React, { useState } from "react"
import { PostForgotPasswordEndpoint } from "../../api/api";
import { Header } from "../Header";
import Footer from "../Footer";
import {
    Text,
    Input,
    Heading,
    Stack,
    Flex,
    Center
} from "@chakra-ui/react"

export const RecoverPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: ''
    });
    const [, setApiData] = PostForgotPasswordEndpoint();
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
                // <Heading as="h2" size="4x5" mb="6">
                //     <Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg: "35px", xl: "80px" }} mt={{base: "32px", sm: "75px", md: "550px", lg:"55px"}}> Rowanspace </Text>
                // </Heading>
                <Stack
                    w={{base:'350px', sm:'350px', md:'350px', lg:'45%'}}
                    maxW={'600px'}
                    mt={{base: "120px", sm: "120px", md: "120px", lg:"55px"}}
                >
                    <Text>
                        Reset Your Password
                    </Text>
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
        );
    }

    const submittedForm = () => {
        return (
            <Flex w="20em" h="100%" flexDirection={"column"} alignItems="center" top="10%" left="38%">
                <Center 
                    w={'100%'}
                >
                    <Stack mt={{base: "150px", sm:"150px"}}>
                        <Heading>Request Sent!</Heading>
                        <Text>If an account with that email exists, you will receive an email shortly!</Text>
                    </Stack>
                </Center>
            </Flex>
        );
    }

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
            // mt={{base: "32px", sm: "750px", md: "350px", lg:"55px"}}
        >
            <Header />
            <Heading as="h2" size="4x5" mb="6">
                <Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg: "35px", xl: "80px" }} mt={{base: "32px", sm: "75px", md: "550px", lg:"55px"}}> Rowanspace </Text>
            </Heading>
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