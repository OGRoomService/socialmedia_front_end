import React from "react"
import { Text, Input, Link, Heading, ThemeProvider, theme, CSSReset, Checkbox, Stack, Flex } from "@chakra-ui/react"

export const ResetPassword = ({match, location}) => {
    const params = new URLSearchParams(location.search);

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Flex h="100%" w="100%" flexDirection={"row"} alignItems="center">
                <Heading as="h2" size="4x5" mb="6"><Text fontSize="6xl" mt="20"> Rowanspace </Text></Heading>
                <Flex w="20em" h="100%" flexDirection={"column"} pos="fixed" alignItems="center" top="10%" left="38%" theme>
                    <Stack>
                        <label
                            className="form-header"
                            htmlFor="login-username">
                            Reset Your Password
                        </label>
                        <Text>Enter new password</Text>
                        <Text>{params.get('token')}</Text>
                        <Input
                            id="login-username"
                            name="username"
                            type="text"
                            placeholder="username"
                        /* onChange={} */ />

                        <Input
                            className='button'
                            /* onClick={submitForm} */
                            type='button'
                            value='Reset' />
                    </Stack>
                </Flex>
            </Flex>
        </ThemeProvider>
    )
}