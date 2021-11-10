import React, { Component, useState } from "react";
import { RegistrationUserDetails } from "./RegistrationUserDetails";
import { RegistrationRecoveryQuestions } from "./RegistrationRecoveryQuestions";
import { useHistory } from 'react-router-dom';
import { PostNewUserEndpoint } from "../../api/api";
import Footer from "../Footer";
import RegHeader from "../RegHeader";
import '../../styles/register.css'
import { ChakraProvider } from "@chakra-ui/react"


export const Registration = () => {
    const [formData, setFormData] = useState({
        step: 1,
        username: '',
        email: '',
        password: '',
        vpassword: ''
    });
    const [apiData, setApiData] = PostNewUserEndpoint();
    const history = useHistory();

    const prevStep = () => {
        setFormData({
            ...formData,
            ['step']: formData.step - 1
        });
    }

    const nextStep = () => {
        setFormData({
            ...formData,
            ['step']: formData.step + 1
        });
        submitForm();
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

        switch (apiData.data.status) {
            case 201:
                history.push("/");
        }
    }

    const submitForm = () => {
        console.log("testing form submission");

        setApiData({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });
    }
    
    const display = () => {
        switch (formData.step) {
            case 1:
                return (
                    <RegistrationUserDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        formData={formData}
                    />);
            case 2:
                return (
                    <RegistrationRecoveryQuestions
                        nextStep={nextStep}
                        handleChange={handleChange}
                        formData={formData}
                    />);
            default:
        }
    }

    return (
        <ChakraProvider>
        <RegHeader/>
            <h2>Rowanspace</h2>
            <div className="container" id="container-t">
                <div style={{ backgroundColor: "#fff" }} className="container" id="container-reg">
                    { display() }
                    { apiData.complete && handleResponse() }
                </div>
            </div>
            <Footer />
        </ChakraProvider>
    );
}