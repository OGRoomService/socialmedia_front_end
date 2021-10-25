import axios from "axios";
import React, { Component, useState } from "react";
import Footer from "./Footer";

function SignupFormFunction() {
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
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*'
        };

        console.log("Calling API to create user:::" + { body });

        axios.post("http://localhost:8080/api/users", body, { headers })
            .then(response => console.log(response));
    }

    return (
        <>
            <div /*style={{backgroundColor: "#ffcc00"}} */ className="container" id="container-t">
                <h1 style={{ color: "brown" }} >Rowanspace</h1>
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
                        /* required */ />
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
                        /* required */ />
                        </p>
                        <p>
                            <label htmlFor="pass">Password</label>
                            <input
                                id="pass"
                                name="pass"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                        /* required */ />
                        </p>
                        <p>
                            <label htmlFor="vpass">Confirm password</label>
                            <input
                                id="vpass"
                                name="vpass"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                        /* required */ />
                        </p>
                        {formErrors.pass && <span className="form-error">{formErrors.pass}</span>}
                        <br />
                        {formErrors.vpass && <span className="form-error">{formErrors.vpass}</span>}
                        <br />
                        <input type="submit" value="Sign Up" />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default class Registration extends Component {

    onSubmit(e) {
        e.preventDefault();
        console.log(e.currentTarget.querySelector('input[name="username"]'));
        /* const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        } */

        console.log("Calling API to create user:::");

        /* fetch("localhost:8080/api/users")
            .then((response) => response.json())
            .then((data) => console.log(data)); */
    }

    render() {

        return (
            <>
                <SignupFormFunction />
            </>
        );
    }
}

export { Registration }