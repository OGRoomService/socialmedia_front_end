import React, { useRef, useState } from "react";
import { Search2Icon } from '@chakra-ui/icons';
import { HeaderSearchResult } from './HeaderSearchResult';
import {
    useColorModeValue,
    Stack,
    Center,
    Popover,
    PopoverContent,
    PopoverBody,
    PopoverAnchor,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    List
} from "@chakra-ui/react"
import { useAsyncAPI } from "../../api/api";

export const HeaderInputPopover = () => {
    const [inputFocused, setInputFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [inputText, setInputText] = useState('');
    const [listResults, setListResults] = useState([]);
    const [typingTimer, setTypingTimer] = useState(null);
    const [closeTimer, setCloseTimer] = useState(null);
    const { pageUsers } = useAsyncAPI();
    const textRef = useRef();
    const typingTimeout = 700;
    const closeTimeout = 300;
    const pageSize = 7;

    textRef.current = inputText;

    const handleChange = (e) => {
        const text = e.value;

        if (text.length < 80) {
            clearTimeout(typingTimer);
            setTypingTimer(setTimeout(queryUsers, typingTimeout));
            setInputText(text);
            setNoResults(false);
        }
    }

    const queryUsers = () => {
        if (textRef.current !== '') {
            setIsSearching(true);
            pageUsers(textRef.current, 0, pageSize, handleResults);
        }
    }

    const handleResults = (results) => {
        if (results.totalElements === 0) {
            setNoResults(true);
            return;
        }
        const objResults = results.content.map((userData) => {
            return <HeaderSearchResult
                key={userData.id}
                userData={userData}
            />
        });
        setListResults(objResults);
        setIsSearching(false);
    }

    const popoverBody = () => {
        if (listResults.length <= 0) {
            if (noResults) {
                return (
                    <Center
                        w={'100%'}
                    >
                        <Text>
                            No results...
                        </Text>
                    </Center>
                )
            } else {
                return (
                    <Center
                        w={'100%'}
                    >
                        <Text>
                            {isSearching ?
                                'Searching...' :
                                'Type to begin searching...'
                            }
                        </Text>
                    </Center>
                )
            }
        } else {
            return (
                <List>
                    {listResults}
                </List>
            )
        }
    }

    const onPopoverClose = () => {
        clearTimeout(typingTimer);
        setIsSearching(false);
        setNoResults(false);
        setListResults([]);
    }

    const onPopoverOpen = () => {
        queryUsers();
    }

    return (
        <Popover
            closeOnBlur={true}
            isOpen={inputFocused}
            trigger={'manual'}
            matchWidth={true}
        >
            <PopoverAnchor>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents={'none'}
                        children={<Search2Icon color={useColorModeValue('gray.700', 'gray.100')} />}
                    />
                    <Input
                        placeholder={'Search users...'}
                        rounded={'full'}
                        value={inputText}
                        onFocus={() => {
                            clearTimeout(closeTimeout);
                            setInputFocused(true);
                            onPopoverOpen();
                        }}
                        onBlur={() => {
                            setInputFocused(false);
                            setCloseTimer(setTimeout(onPopoverClose, closeTimeout));
                        }}
                        onChange={(e) => {
                            handleChange(e.currentTarget);
                        }}
                    />
                </InputGroup>
            </PopoverAnchor>
            <PopoverContent
                right={'0.5rem'}
                bg={useColorModeValue('gray.100', 'gray.700')}
                color={useColorModeValue('gray.700', 'gray.100')}
                _focus={{}}
            >
                <PopoverBody>
                    {popoverBody()}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}