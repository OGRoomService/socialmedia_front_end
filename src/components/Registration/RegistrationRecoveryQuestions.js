import { ChakraProvider } from "@chakra-ui/react"
import React, { Component }  from 'react';

export const RegistrationRecoveryQuestions = ({ nextStep, handleChange, formData }) => {
    // usestate of recovery questions so when someone picks one, disable it so it can't be picked twice
    // query list of questions from database


    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    return (
        <ChakraProvider>
            <form
                onSubmit={Continue}
            >
                <p><b>Security Questions</b></p>
                        
                        <p>
                            <label htmlFor="a1">Recovery Question 1</label>
                            <input
                                id="a1"
                                name="a1"
                                type="text"
                                placeholder="answer 1"
                        /* required */ />
                        </p>
                        <p>
                            <label htmlFor="a2">Recovery Question 2</label>
                            <input
                                id="a2"
                                name="a2"
                                type="text"
                                placeholder="answer 2"
                                
                        /* required */ />
                        </p>
                        <p>
                            <label htmlFor="a3">Recovery Question 3</label>
                            <input
                                id="a2"
                                name="a2"
                                type="text"
                                placeholder="answer 3"
                                
                        /* required */ />
                        </p>
                <input type="submit" value="Sign Up" />
            </form>
        </ChakraProvider>
    );
}