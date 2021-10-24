import React from "react";
import { useParams } from "react-router";

export default function UserPage() {
    var { id } = useParams();

    return (
        <>
            <h1>Hello there user {id}</h1>
            <p>This is your profile</p>
        </>
    )
}