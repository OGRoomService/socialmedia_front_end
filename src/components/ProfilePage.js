import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { Header } from "./Header/Header";
import {
    Box,
    Flex,
    Avatar,
    Spacer,
    Stack,
    Text,
    Button,
    Center,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Image
} from "@chakra-ui/react"
import { PostFeed } from "./PostFeed/PostFeed";
import { currentUser } from "../api/user";
import { useAsyncAPI } from "../api/api";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";


export default function ProfilePage() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileData, setProfileData] = useState({});
    const [postFeed, setPostFeed] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const { fetchUserProfile, fetchProfilePictureFromId, updateProfilePicture } = useAsyncAPI();
    const { userData } = currentUser();
    const { username } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const maxFileSizeinMB = 1;
    const acceptedFileTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]

    useEffect(() => {
        fetchUserProfile(username, setProfileData);
    }, []);

    useEffect(() => {
        if (!profileData) {
            history.push('/notfound');
            return;
        }
        if (JSON.stringify(profileData) === '{}') return;
        fetchProfilePictureFromId(profileData['id'], setProfilePicture);
        setPostFeed(
            <PostFeed profileData={profileData} />
        );
    }, [profileData]);

    const showButton = () => {
        if (profileData.id != userData.id) return null;
        return (
            <Button
                position={'absolute'}
                w={32}
                h={32}
                borderRadius={'full'}
                variant={'ghost'}
                onClick={onOpen}
                _focus={{}}
            />
        );
    }

    const getImageSrc = () => {
        if (!uploadedImage) return '';
        URL.revokeObjectURL(uploadedImage);
        return URL.createObjectURL(uploadedImage);
    }

    const closeModal = () => {
        URL.revokeObjectURL(uploadedImage);
        setUploadedImage(null);
        onClose();
    }

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        const fileType = file.type;
        const fileSizeinMB = ((file.size / 1024) / 1024).toFixed(4);

        if (!acceptedFileTypes.includes(fileType)) {
            setUploadError(`File is not an accepted image type!`);
            return;
        }
        if (fileSizeinMB > maxFileSizeinMB) {
            setUploadError(`File is too large! Max ${maxFileSizeinMB}MB`);
            return;
        }
        setUploadError('');
        setUploadedImage(e.target.files[0]);
    }

    const uploadImage = () => {
        updateProfilePicture(uploadedImage, handleResponse);
        onClose();
    }

    const handleResponse = (response) => {
        if (response) {
            setProfilePicture(uploadedImage);
        }
        URL.revokeObjectURL(uploadedImage);
        setUploadedImage(null);
    }

    const profilePictureModal = () => {
        return (
            <Modal
                onClose={closeModal}
                isOpen={isOpen}
                trapFocus={false}
                isCentered
                size={'lg'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Update Profile Picture
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            width={'full'}
                            height={80}
                            border={2}
                            borderRadius={'lg'}
                            borderStyle={'solid'}
                            src={getImageSrc()}
                        />
                        <Stack
                            direction={'row'}
                            mt={3}
                        >
                            <Button
                                as={'label'}
                                cursor={'pointer'}
                            >
                                <Input
                                    type={'file'}
                                    accept={'image/*'}
                                    display={'none'}
                                    filter={(e) => { }}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                />
                                Select an Image
                            </Button>
                            {uploadError &&
                                <Text
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    {uploadError}
                                </Text>
                            }
                            {uploadedImage &&
                                <Button
                                    colorScheme={'green'}
                                    onClick={uploadImage}
                                >
                                    Upload
                                </Button>
                            }
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <Box>
                <Header />
                <Flex
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    p={4}
                    boxShadow={'base'}
                    justifyContent={'center'}
                >
                    <Center
                        w={{
                            base: '97%',
                            lg: '45%'
                        }}>
                        <Stack
                            direction={'row'}
                            align={'center'}
                            w={'100%'}
                        >
                            <Avatar
                                w={32}
                                h={32}
                                src={profilePicture}
                            >
                                {showButton()}
                            </Avatar>
                            <Text
                                p={3}
                                fontSize='3xl'
                            >
                                {profileData ? profileData['username'] : '...'}
                            </Text>
                        </Stack>
                    </Center>
                </Flex>
                <Flex w='100%'>
                    <Center w={'100%'}>
                        <Center w={{
                            base: '97%',
                            lg: '45%'
                        }}>
                            <Stack w={'100%'}>
                                <Spacer pt={2} />
                                {postFeed}
                            </Stack>
                        </Center>
                    </Center>
                </Flex>
            </Box>
            <Footer />
            {profilePictureModal()}
        </Flex>
    )
}