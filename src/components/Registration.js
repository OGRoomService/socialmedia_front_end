import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { PostNewUserEndpoint } from "../api/api";
import Footer from "./Footer";
import RegHeader from "./RegHeader";
import '../styles/register.css'
import { ChakraProvider } from "@chakra-ui/react";

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
        email: ''
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

        switch (apiData.data.status) {
            case 201:
                history.push("/");
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

    return (
        <ChakraProvider>
            <RegHeader />
            <h2>Rowanspace</h2>
            <div className="container" id="container-t">
                <div style={{ backgroundColor: "#fff" }} className="container" id="container-reg">
                    <form>
                        <p><b>Please fill out information below</b></p>
                        <p>
                            <label htmlFor="uname">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                                defaultValue={formData.username}
                                onChange={handleChange} />
                        </p>

                        {formErrors.username && <span className="error-message">{formErrors.username}</span>}

                        <p>
                            <label htmlFor="uemail">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email"
                                defaultValue={formData.email}
                                onChange={handleChange} />
                        </p>

                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}

                        <p>
                            <label htmlFor="pass">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                defaultValue={formData.password}
                                onChange={handleChange} />
                        </p>

                        {formErrors.password && <span className="error-message">{formErrors.password}</span>}

                        <p>
                            <label htmlFor="vpass">Confirm password</label>
                            <input
                                id="vpassword"
                                name="vpassword"
                                type="password"
                                placeholder="Confirm Password"
                                defaultValue={formData.vpassword}
                                onChange={handleChange} />
                        </p>

                        {formErrors.vpassword && <span className="error-message">{formErrors.vpassword}</span>}

                        <input
                            className='button'
                            onClick={submitForm}
                            type='button'
                            value="Register" />
                        <p>Already have an account? <a href="/">Login here!</a></p>
                    </form>
                    {apiData.complete && handleResponse()}
                </div>
            </div>
            <Footer />
        </ChakraProvider>
    );
}