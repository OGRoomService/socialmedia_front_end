import React, { Component, useState } from "react";
import '../styles/post.css';

export default class Header extends Component {
    render() {
        return (
            <>
            <div>
                <div className="containerP">
                    
                        <div className="containerU">
                                <div className="containerPFP">
                                    <p>_PFP_</p>
                                </div>
                            </div> 
                            <div className="containerP" id="containerP-p">
                            <h4>Post Content</h4>
                            </div>
                            <div className="containerP" id="containerP-c">
                                <p>Like</p>
                            <input type="text" placeholder="comment"/>
                            </div>
                    
                </div>
            </div>
        </>
        )
    }
}