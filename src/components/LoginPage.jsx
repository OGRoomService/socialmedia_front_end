import React, { Component } from "react";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        fetch("http://localhost:8080/api/users", {mode: 'no-cors'})
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    /* onSubmit(e: Event) {
        e.preventDefault();

        fetch("localhost:8080/api/users")
        .then((response) => response.json())
        .then((data) => console.log(data));
    } */

    render() {
        return (
            <>
                <div>
                    <div>
                        <h1>Login/Signup</h1>
                        <form action="/" method="POST" />
                        <input type="text" placeholder="username" required />
                        <br />
                        <input type="text" placeholder="Password" required />
                        <br />
                        <input type="submit" />
                    </div>
                </div>
            </>
        );
    }

}

export {LoginPage}