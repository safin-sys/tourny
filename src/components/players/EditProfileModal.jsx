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
import { useState } from "react";
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineDelete,
    AiOutlineInfoCircle,
} from "react-icons/ai";
// import useChampions from "../../utils/useChampions";
// import useChampionSkin from "../../utils/useChampionSkin";

const EditProfileModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <EditProfileModalBody />
                <ModalFooter
                    display="flex"
                    justifyContent="space-between"
                    gap="1rem"
                >
                    <Button colorScheme="red">
                        <Text display={["none", "block"]}>Delete Account</Text>
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
                        <Button colorScheme="twitter">Save</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;

const EditProfileModalBody = () => {
    return (
        <ModalBody>
            <form>
                {/* <ProfileHeader /> */}
                <ProfileInfo />
            </form>
        </ModalBody>
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

const ProfileHeader = () => {
    const { champions } = useChampions();
    const [selectedChampion, setSelectedChampion] = useState(null);
    const { skins, isLoading } = useChampionSkin(selectedChampion);
    const [selectedSkin, setSelectedSkin] = useState(0);
    const [offset, setOffset] = useState(50);
    const imgSrc = selectedChampion
        ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion}_${selectedSkin}.jpg`
        : "/images/404.webp";
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
                        onChange={(e) => {
                            setSelectedChampion(e.target.value);
                            setSelectedSkin(0);
                        }}
                        value={selectedChampion}
                    >
                        {champions?.map((champion, i) => (
                            <option value={champion} key={i}>
                                {champion}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder={
                            isLoading && selectedChampion
                                ? "Loading..."
                                : "Select a skin"
                        }
                        onChange={(e) => setSelectedSkin(e.target.value)}
                        value={selectedSkin}
                    >
                        {skins?.map((skin, i) => (
                            <option value={skin.num} key={i}>
                                {skin.name}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Image
                    src={imgSrc}
                    alt="champion"
                    my="1rem"
                    objectFit="cover"
                    objectPosition={`0 ${offset}%`}
                    w="full"
                    h="150px"
                    borderRadius="8px"
                />
                <Flex gap="1rem">
                    <IconButton
                        onClick={() =>
                            setOffset((prev) => (prev != 0 ? prev - 10 : prev))
                        }
                    >
                        <AiOutlineArrowUp />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            setOffset((prev) =>
                                prev != 100 ? prev + 10 : prev
                            )
                        }
                    >
                        <AiOutlineArrowDown />
                    </IconButton>
                </Flex>
            </FormControl>
        </>
    );
};
