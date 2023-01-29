import Link from "next/link";
import { useState } from "react";
import { auth, db } from "@utils/firebase";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
    Select,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";

const JoinForm = ({ teams }) => {
    const {
        watch,
        register,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [btnLoading, setBtnLoading] = useState(false);

    const router = useRouter();
    const toast = useToast();

    const onSubmit = async (e) => {
        setBtnLoading(true);
        try {
            const userAuth = await createUserWithEmailAndPassword(
                auth,
                e.email,
                e.password
            );
            // handle captain
            if (e.role === "captain") {
                await setDoc(doc(db, "teams", e.team), {
                    name: e.team,
                    logo: "",
                    members: [
                        {
                            captain: true,
                            uid: userAuth.user.uid,
                        },
                    ],
                    match_history: [],
                    approved: false,
                });
            }
            await setDoc(doc(db, "users", userAuth.user.uid), {
                email: e.email,
                ign: e.ign,
                role: e.role,
                team: e.team,
                photo: null,
                cover: null,
                phone: null,
            });
            toast({
                title: "Success",
                description: "You have successfully joined",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.push("/");
            setBtnLoading(false);
        } catch (error) {
            console.error(error);
            setBtnLoading(false);
            if (error.code === "auth/email-already-in-use") {
                setBtnLoading(false);
                setError("email", {
                    type: "manual",
                    message: "Email already in use",
                });
            }
        }
    };
    return (
        <Grid alignItems="center" minH="calc(100vh - 192px)">
            <Flex
                as="form"
                gap="1rem"
                flexDir="column"
                mb="4rem"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading
                    mb="2rem"
                    fontFamily="logo"
                    fontWeight="normal"
                    textAlign="center"
                    mt="4rem"
                >
                    Join
                </Heading>
                <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <Flex gap="4" mt="2" flexWrap={["wrap", "initial"]}>
                    <FormControl isInvalid={errors.ign}>
                        <Tooltip
                            label="IGN is your In Game Name"
                            placement="bottom-start"
                        >
                            <FormLabel display="flex" alignItems="center">
                                IGN
                                <AiOutlineInfoCircle
                                    style={{ marginLeft: ".25rem" }}
                                />
                            </FormLabel>
                        </Tooltip>
                        <Input
                            type="text"
                            {...register("ign", {
                                required: "IGN is required",
                                validate: async (value) => {
                                    const { data } = await axios(
                                        `/api/ign_validity?ign=${value}`
                                    );
                                    if (data.available) {
                                        return true;
                                    } else {
                                        return "IGN already exists";
                                    }
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.ign?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.role}>
                        <FormLabel>Role</FormLabel>
                        <Select
                            placeholder="Select your role"
                            {...register("role", {
                                required: "Role is required",
                            })}
                        >
                            <option value="player">Player</option>
                            <option value="captain">Captain</option>
                        </Select>
                        <FormErrorMessage>
                            {errors.role?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Flex>
                <TeamInput {...{ errors, register, watch, teams }} />
                <Flex gap="4" mt="2" flexWrap={["wrap", "initial"]}>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password should be at least 6 characters",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Password should be less than 32 characters",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.confirm_password}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            {...register("confirm_password", {
                                required: "Confirm password is required",
                                validate: (value) => {
                                    return watch("password") === value
                                        ? true
                                        : "Passwords should match";
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.confirm_password?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Flex>
                <Grid templateColumns={["1fr", "1fr 1fr"]} gap="1rem"></Grid>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Link href="/auth/login">Already have an account?</Link>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                        isLoading={btnLoading}
                    >
                        Join
                        <AiOutlineArrowRight style={{ marginLeft: ".5em" }} />
                    </Button>
                </Flex>
            </Flex>
        </Grid>
    );
};

export default JoinForm;

const TeamInput = ({ errors, register, watch, teams }) => {
    return (
        <>
            {watch("role") === "player" && (
                <Flex mt="2">
                    <FormControl isInvalid={errors.team}>
                        <FormLabel>Your Team</FormLabel>
                        <Select
                            placeholder="Select your team"
                            {...register("team")}
                        >
                            {teams.map((team, i) => (
                                <option key={i} value={team}>
                                    {team}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.team?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Flex>
            )}
            {watch("role") === "captain" && (
                <Flex mt="2">
                    <FormControl isInvalid={errors.team}>
                        <FormLabel>Team Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your team name"
                            {...register("team", {
                                required: "Team name is required",
                                validate: (value) => {
                                    if (teams.includes(value)) {
                                        return "Team name already exists";
                                    } else {
                                        return true;
                                    }
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.team?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Flex>
            )}
        </>
    );
};
