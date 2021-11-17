import React, { Component} from "react";
//import '../styles/post.css';
import { Button, ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, Heading, Circle, Input, extendTheme} from "@chakra-ui/react"


// const theme = extendTheme({
//     colors: {
//       brand: {
//         100: "#f7fafc",
//         // ...
//         900: "#1a202c",
//       },
//     },
//   })
const theme = extendTheme({
    colors: {
      brand: {
        100: "#f7fafc",
        // ...
        900: "#1a202c",
      },
    },
  })

export default class Header extends Component {

    render() {
        return (
            <ChakraProvider theme={theme}>
                
            {/* <div>
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
            </div> */}


            <Flex w="750px" h="300px" c-flex flexDirection={"column"} align="center" /*bgGradient="linear(to-t, green.200, pink.500)"*/ border="2px" borderColor="black" bg="brand.100">
                <Flex w="100%" h="65px" c-flex flexDirection={"row"} justifyContent={"Left"} borderColor="black">
                <Circle size="60px" bg="black" color="white">
                    PFP
                </Circle>
                </Flex>
                <Flex w="100%" h="50%" c-flexDirection={"column"} borderColor="black" border="2px" borderColor="black">
                    Post Content
                </Flex>

                <Flex w="65%" h="20%" c-flexDirection={"row"} borderColor="black">
                    <Button w="100px">
                        <Heading as="h6" size="2xl" isTruncated>
                            ♡
                        </Heading>
                    </Button>
                    <Input type="text" placeholder="comment"/>
                </Flex>

            {/* <Box w="50%" h="50%" c-flex bgGradient="linear(to-t, green.200, pink.500)">
            <Circle size="200px" bg="black" color="white">
                PFP
            </Circle>
               
            </Box> 
             <Box w="30%" h="200px" c-flex align="center" bgGradient="linear(to-t, red.200, blue.500)"> 
                Hello Good Morning
            </Box>  */}
            
            
        </Flex>
        </ChakraProvider>
        )
    }
}