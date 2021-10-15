import React from 'react';
import logo from './Rowan.png';
import './App.css';
import Button from "./CustomButtonComponent";
import { Script } from 'vm';
import LikeButtton from "./like_button";
import header_ from "./Header";
import { ClientRequest } from 'http';
//import LikeButton from './like_button';


function App() {
  
    return (

    <div className="container" id="container-t">
      
      
        

      <div className="container">


      <div className="container" id="container-l">


      <ul>
          <li><a href="#">Post Feed</a></li>
        </ul>

       
       <h1>Spacing</h1>
          <div
           //className="grid-item" id="box-one"
           >
           </div>
      </div>

      <div className="container" id="container-m">

        <div className="head"></div>
        <input type="text" placeholder="Search.."/>
        <div className="head"></div>
    
      
      
      <h1>Post Feed</h1>
      
      <div className="LikeButton"></div>


      <div id="like_button_container"></div>
      
      <Button 
        border="black solid 2px"
        color="white"
        height = "50px"
        onClick={() => alert("liked")}
        radius = "10px"
        width = "50px"
        children = "like"
        />


    <script src="like_button.tsx"></script>
      


          <div /*className="grid-item" id="box-two"*/>
          </div>


      </div>

      <div className="container" id="container-r">

      <ul>
          <li><a href="#">Username</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
        
        
        <h1>Friends List</h1>
      </div>
  </div>
        
        <div className="foot">
        <a href="#">
          <img src={logo}/>
          </a>
        </div>
  </div>



      )
  
  
}

export default App;
