import React from "react";
import { useState } from "react";

const RegistrationUserDetails = ({ nextStep, handleChange, values }) => {
    const [data, setData] = useState(null);

    const Continue = e => {
        e.preventDefault();
        /* setData({
            email:'test'
        }); */
        /* console.log(data); */
        nextStep();
    }

    return (
        <>
            <form
                onSubmit={Continue}
            >
                <p>
                    <label htmlFor="uname">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="username"
                        defaultValue={values.username}
                        onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="uemail">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        defaultValue={values.email}
                        onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="pass">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        defaultValue={values.password}
                        onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="vpass">Confirm password</label>
                    <input
                        id="vpassword"
                        name="vpassword"
                        type="password"
                        placeholder="Confirm Password"
                        defaultValue={values.vpassword}
                        onChange={handleChange} />
                </p>
                <input type="submit" value="Sign Up" />
            </form>
        </>
    );
}

export default RegistrationUserDetails