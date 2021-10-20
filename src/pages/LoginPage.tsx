import React from "react";

export default function LoginPage() {
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