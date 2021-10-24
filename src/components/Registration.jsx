import React, { Component, useState } from "react";
import logo from '../Rowan.png';

function SignupFormFunction() {
    const [formData, setFormdata] = useState({
        uname: "",
        uemail: "",
        pass: "",
        vpass: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        setFormdata({
            ...formData,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const apiFormData = JSON.stringify({
            username: formData.uname,
            email: formData.uemail,
            password: formData.pass
        })
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            
            body: apiFormData
        }

        console.log("Calling API to create user:::" + apiFormData);

        fetch("localhost:8080/api/users", requestOptions)
            .catch(console.log("error"))
            .then(response => response.json())
            .catch(console.log("error"));
    }

    return (
        <div /*style={{backgroundColor: "#ffcc00"}} */ className="container" id="container-t">
            <h1 style={{ color: "brown" }} >Rowanspace</h1>
            <div style={{ backgroundColor: "#fff" }} className="container" id="container-reg">
                <h1>Signup</h1>
                <p>Please fill out information below</p>
                <form
                    onSubmit={onSubmit}
                >
                    <h3>Username</h3>
                    <input
                        name="uname"
                        type="text"
                        placeholder="username"
                        onChange={handleChange}
                        /* required */ />
                    <br />
                    <h3>Email</h3>
                    <input
                        name="uemail"
                        type="email"
                        placeholder="email"
                        onChange={handleChange}
                        /* required */ />
                    <br />
                    <h3>Password</h3>
                    <input
                        name="pass"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        /* required */ />
                    <br />
                    <h3>Confirm password</h3>
                    <input
                        name="vpass"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        /* required */ />
                    <br />
                    <input type="submit" />
                </form>
            </div>
            <div style={{ marginTop: "0em" }} className="foot">
                <a href="#foot">
                    <img alt="website logo" src={logo} />
                </a>
            </div>
        </div>
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