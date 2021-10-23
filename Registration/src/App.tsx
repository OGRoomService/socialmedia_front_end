import React from 'react';
import logo from './Rowan.png';
import './App.css';

function App() {
  return (

    <div /*style={{backgroundColor: "#ffcc00"}} */ className="container" id="container-t">
      <br/>
      <br/>
      <br/>
    <h1 style={{color: "brown"}} >Rowanspace</h1>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <div style={{backgroundColor: "#fff"}} className="container" id="container-reg">
  <h1>Signup</h1>
  <p>Please fill out information below</p>
  <form action="#" method="POST"/>
            <h3>Username</h3>
            <input type="text" placeholder="username" required/>
            <br/>
            <h3>Email</h3>
            <input type="email" placeholder="email" required/>
            <br/>
            <h3>Password</h3>
            <input type="text" placeholder="Password" required/>
            <br/>
            <h3>Confirm password</h3>
            <input type="text" placeholder="Confirm Password" required/>
            <br/>
            <input type="submit"/>

            </div>

            <div style={{marginTop: "0em"}} className="foot">
            <a href="#">
            <img src={logo}/>
            </a>
            </div>
  </div>
  
  )
}

export default App;
