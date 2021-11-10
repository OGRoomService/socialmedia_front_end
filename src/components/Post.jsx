import React, { Component, useState } from "react";
import '../styles/post.css';
import { ChakraProvider } from "@chakra-ui/react"


export default class Header extends Component {
    render() {
        return (
            <ChakraProvider>
            <div>
                <div class="containerP">
                    
                        <div class="containerU">
                                <div class="containerPFP">
                                    <p>_PFP_</p>
                                </div>
                            </div> 
                            <div class="containerP" id="containerP-p">
                            <h4>Post Content</h4>
                            </div>
                            <div class="containerP" id="containerP-c">
                                <p>Like</p>
                            <input type="text" placeholder="comment"/>
                            </div>
                    
                </div>
            </div>
        </ChakraProvider>
        )
    }
}