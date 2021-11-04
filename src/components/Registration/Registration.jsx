import React, { Component, useState } from "react";
import RegistrationUserDetails from "./RegistrationUserDetails";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Footer from "../Footer";
import '../../styles/register.css'

/* function SignupFormFunction() {
    const [formData, setFormdata] = useState({
        uname: "",
        uemail: "",
        pass: "",
        vpass: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const validate = (formData) => {
        const passwordRegex = new RegExp('(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.{10,})');
        let formErrors = {};
        let passes = true;

        if (!formData.uname) {
            formErrors.name = 'Name Required';
            passes = false;
        }
        if (formData.pass !== formData.vpass) {
            formErrors.vpass = 'Passwords do not match!';
            passes = false;
        }
        if (!formData.pass || !passwordRegex.test(formData.pass)) {
            formErrors.pass = 'Minimum password length is 10 characters and must contain at least 1 lowercase, 1 uppercase, and 1 number';
            passes = false;
        }
        setFormErrors(formErrors);
        return passes;
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        setFormdata({
            ...formData,
            [name]: value
        })
    }

    const handleResponse = (response) => {
        let status = response.status;
        
        console.log("Response Status: " + status);
        
        switch(status) {
            case 500:
            case 200:
            case 201:
                //history.push('/');
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate(formData)) {
            console.log("Form validation failed!");
            return;
        }

        const body = {
            username: formData.uname,
            email: formData.uemail,
            password: formData.pass
        };
        useApi(postNewUser, body, handleResponse);
    }

    return (
        <>
        <h2 >Rowanspace</h2>
            <div  className="container" id="container-t">
                <div style={{ backgroundColor: "#fff" }} className="container" id="container-reg">
                    <h1>Signup</h1>
                    <p>Please fill out information below</p>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <p>
                            <label htmlFor="uname">Username</label>
                            <input
                                id="uname"
                                name="uname"
                                type="text"
                                placeholder="username"
                                onChange={handleChange}
                        />
                        </p>
                        {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                        <p>
                            <label htmlFor="uemail">Email</label>
                            <input
                                id="uemail"
                                name="uemail"
                                type="email"
                                placeholder="email"
                                onChange={handleChange}
                         />
                        </p>
                        <p>
                            <label htmlFor="pass">Password</label>
                            <input
                                id="pass"
                                name="pass"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                         />
                        </p>
                        <p>
                            <label htmlFor="vpass">Confirm password</label>
                            <input
                                id="vpass"
                                name="vpass"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                         />
                        </p>
                        {formErrors.pass && <span className="form-error">{formErrors.pass}</span>}
                        {formErrors.vpass && <span className="form-error">{formErrors.vpass}</span>}
                        <input type="submit" value="Sign Up" />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
} */

function UseApi() {
    const [data, setData] = useState(null);
}

const CallApi = () => {
    /* const [newUser, createNewUser] = PostNewUserEndpoint(); */
    UseApi();

    const handleResponse = (response) => {
        let status = response.status;
        
        console.log("Response Status: " + status);
        
        switch(status) {
            case 500:
            case 200:
            case 201:
                //useHistory.push('/');
            default:
                break;
        }
    }

    const body = {
        username: "test123",
        email: "email@email.com",
        password: "supersecurEp@ss123!"
    };
    /* const body = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
    }; */
    /* UseApi(searchRepos, { query: "react" }, handleResponse); */
    /* createNewUser({
        body
    });
    console.log(newUser); */
}

export default class Registration extends Component {
    state = {
        step: 1,
        username: '',
        email: '',
        password: '',
        vpassword: ''
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
        console.log("Next step:::");
        CallApi();
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render() {
        const { step } = this.state;
        const { username, email, password } = this.state;
        const values = { username, email, password };
        return (
            <>
                <h2>Rowanspace</h2>
                <div className="container" id="container-t">
                    <div style={{ backgroundColor: "#fff" }} className="container" id="container-reg">
                        <h1>Signup</h1>
                        <p>Please fill out information below</p>
                        <RegistrationUserDetails
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export { Registration }