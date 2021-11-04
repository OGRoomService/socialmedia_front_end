import React from "react";

const RegistrationUserDetails = ({ nextStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
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
                        id="uname"
                        name="uname"
                        type="text"
                        placeholder="username"
                        defaultValue={values.username}
                        onChange={handleChange('username')} />
                </p>
                <p>
                    <label htmlFor="uemail">Email</label>
                    <input
                        id="uemail"
                        name="uemail"
                        type="email"
                        placeholder="email"
                        defaultValue={values.email}
                        onChange={handleChange('email')} />
                </p>
                <p>
                    <label htmlFor="pass">Password</label>
                    <input
                        id="pass"
                        name="pass"
                        type="password"
                        placeholder="Password"
                        defaultValue={values.password}
                        onChange={handleChange('password')} />
                </p>
                <p>
                    <label htmlFor="vpass">Confirm password</label>
                    <input
                        id="vpass"
                        name="vpass"
                        type="password"
                        placeholder="Confirm Password"
                        defaultValue={values.vpassword}
                        onChange={handleChange('vpassword')} />
                </p>
                <input type="submit" value="Sign Up" />
            </form>
        </>
    );
}

export default RegistrationUserDetails