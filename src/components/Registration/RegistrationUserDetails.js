import React from "react";
import { useState } from "react";

export const RegistrationUserDetails = ({ nextStep, handleChange, formData }) => {
    const [formErrors, setFormErrors] = useState({
        username: '',
        vpassword: '',
        password: '',
        email: ''
    });

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

    const Continue = e => {
        e.preventDefault();
        
        if (!validate(formData)) {
            console.log("Form validation failed!");
            return;
        }
        nextStep();
    }

    return (
        <>
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
                    onClick={Continue}
                    type='button'
                    value="Next >" />
                <p>Already have an account? <a href="/">Login here!</a></p>
            </form>
        </>
    );
}