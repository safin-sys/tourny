import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import {
    getChampions,
    getChampionSkins,
    getChampionSplash,
} from "@utils/champions";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineDelete,
    AiOutlineInfoCircle,
} from "react-icons/ai";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            offset: 50,
        },
    });

    const onSubmit = (e) => {
        console.log(e);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <EditProfileModalBody
                        register={register}
                        watch={watch}
                        setValue={setValue}
                    />
                    <ModalFooter
                        display="flex"
                        justifyContent="space-between"
                        gap="1rem"
                    >
                        <Button colorScheme="red">
                            <Text display={["none", "block"]}>
                                Delete Account
                            </Text>
                            <Box display={["block", "none"]}>
                                <AiOutlineDelete size="1.1rem" />
                            </Box>
                        </Button>
                        <Flex>
                            <Button
                                variant="outline"
                                colorScheme="twitter"
                                mr="1rem"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button colorScheme="twitter" type="submit">
                                Save
                            </Button>
                        </Flex>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;

const EditProfileModalBody = ({ register, watch, setValue }) => {
    return (
        <ModalBody>
            <ProfileHeader
                register={register}
                watch={watch}
                setValue={setValue}
            />
            <ProfileInfo />
        </ModalBody>
    );
};

const ProfileHeader = ({ register, watch, setValue }) => {
    const [champions, setChampions] = useState([]);
    const [skins, setSkins] = useState([]);

    const selectedChampion = watch("champion");
    const selectedSkin = watch("skin");

    useEffect(() => {
        const get = async () => {
            const data = await getChampions();
            setChampions(data);
        };

        if (champions.length === 0) {
            get();
        }
    }, [champions.length]);

    useEffect(() => {
        const get = async () => {
            const data = await getChampionSkins(selectedChampion);
            setSkins(data);
        };

        if (selectedChampion) {
            get();
        }
    }, [selectedChampion]);
    return (
        <>
            <Heading as="h3" fontSize="1rem" mb="1rem">
                Profile Header
            </Heading>
            <FormControl mt="1rem">
                <FormLabel htmlFor="profile" display="flex" alignItems="center">
                    Cover Photo
                </FormLabel>
                <Flex gap="1rem">
                    <Select
                        placeholder="Select a champion"
                        {...register("champion", {
                            onChange: () => setValue("skin", "0"),
                        })}
                    >
                        {champions?.map((champion, i) => (
                            <option value={champion} key={i}>
                                {champion}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder={!skins ? "Loading..." : "Select a skin"}
                        {...register("skin")}
                    >
                        {skins?.map((skin, i) => (
                            <option value={skin.num} key={i}>
                                {skin.name}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Image
                    src={getChampionSplash(selectedChampion, selectedSkin)}
                    alt="champion"
                    my="1rem"
                    objectFit="cover"
                    objectPosition={`0 ${watch("offset")}%`}
                    w="full"
                    h="150px"
                    borderRadius="8px"
                />
                <Flex justifyContent="space-between" alignItems="center">
                    <Text>Change Offset</Text>
                    <Flex gap="1rem">
                        <IconButton
                            onClick={() =>
                                setValue(
                                    "offset",
                                    watch("offset") != 0
                                        ? watch("offset") - 10
                                        : watch("offset")
                                )
                            }
                        >
                            <AiOutlineArrowUp />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                setValue(
                                    "offset",
                                    watch("offset") != 100
                                        ? watch("offset") + 10
                                        : watch("offset")
                                )
                            }
                        >
                            <AiOutlineArrowDown />
                        </IconButton>
                    </Flex>
                </Flex>
            </FormControl>
        </>
    );
};

const ProfileInfo = () => {
    return (
        <>
            <Heading as="h3" fontSize="1rem" m="2rem 0 1rem 0">
                Profile Information
            </Heading>
            <FormControl>
                <Tooltip
                    label="IGN is your In Game Name"
                    placement="bottom-start"
                >
                    <FormLabel
                        htmlFor="name"
                        display="flex"
                        alignItems="center"
                    >
                        IGN
                        <AiOutlineInfoCircle style={{ marginLeft: ".25rem" }} />
                    </FormLabel>
                </Tooltip>
                <Input id="name" type="text" />
                <FormErrorMessage>unhbrighbn</FormErrorMessage>
            </FormControl>
            <FormControl mt="1rem">
                <FormLabel htmlFor="phone" display="flex" alignItems="center">
                    Phone
                </FormLabel>
                <Input id="phone" type="tel" />
                <FormErrorMessage>unhbrighbn</FormErrorMessage>
            </FormControl>
            <FormControl mt="1rem">
                <FormLabel htmlFor="fb" display="flex" alignItems="center">
                    Facebook
                </FormLabel>
                <Input id="fb" type="url" />
                <FormErrorMessage>unhbrighbn</FormErrorMessage>
            </FormControl>
        </>
    );
};
