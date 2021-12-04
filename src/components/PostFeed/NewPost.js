import React, { Component, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react"
import { Flex, Box, Circle, Input, extendTheme } from "@chakra-ui/react"
import { GetAllPosts } from "../../api/api";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
})

export const NewPost = ({ postData }) => {
  return (
    <Box p="1" mt={2} w='100%' borderWidth="1px" borderRadius="lg">
      <Box p="2">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          alignItems
        >
          <Flex>
            PFP
            testName
          </Flex>
          <br />
          post text
          <br />
          <br />
        </Box>
      </Box>
    </Box>
  )
}