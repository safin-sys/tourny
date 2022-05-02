import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
    Link as ChakraLink,
    Tooltip,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signupVal } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormControlComponent } from "../shared/FormControlComponent";
import { AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { signup } from "../../libs/firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        resolver: yupResolver(signupVal),
    });

    const [btnLoading, setBtnLoading] = useState(false);
    
    const router = useRouter()
    const onSubmit = async (e) => {
        setBtnLoading(true);
        const { name, email, password } = e;
        const promise = await signup(name, email, password);
        const user = await promise;
        if (user.email) {
            setBtnLoading(false);
            router.push("/");
        }
        if(user === "auth/email-already-in-use"){
            setBtnLoading(false);
            setError("email", {
                type: "manual",
                message: "Email already in use"
            });
        }
        console.log(user);
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
                    SignUp
                </Heading>
                <FormControl isInvalid={errors.name}>
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
                            <AiOutlineInfoCircle
                                style={{ marginLeft: ".25rem" }}
                            />
                        </FormLabel>
                    </Tooltip>
                    <Input id="name" type="text" {...register("name")} />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControlComponent
                    isInvalid={errors.email}
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                />
                <Grid templateColumns={["1fr", "1fr 1fr"]} gap="1rem">
                    <FormControlComponent
                        isInvalid={errors.password}
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                    />
                    <FormControlComponent
                        isInvalid={errors.confirmPassword}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        register={register}
                    />
                </Grid>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Link href="/login" passHref>
                        <ChakraLink>Already have an account?</ChakraLink>
                    </Link>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                        isLoading={btnLoading}
                    >
                        SignUp
                        <AiOutlineArrowRight style={{ marginLeft: ".5em" }} />
                    </Button>
                </Flex>
            </Flex>
        </Grid>
    );
};
