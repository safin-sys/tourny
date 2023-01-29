import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@utils/firebase";

export const LoginForm = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const router = useRouter();
    const toast = useToast();

    const onSubmit = async (e) => {
        setBtnLoading(true);
        try {
            await signInWithEmailAndPassword(auth, e.email, e.password);
            toast({
                title: "Success",
                description: "You have successfully logged in",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setBtnLoading(false);
            router.push("/");
        } catch (error) {
            if (
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                setBtnLoading(false);
                setError("email", {
                    type: "manual",
                    message: "Email or password is incorrect",
                });
                setError("password", {
                    type: "manual",
                    message: "Email or password is incorrect",
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
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading
                    mb="2rem"
                    fontFamily="logo"
                    fontWeight="normal"
                    textAlign="center"
                >
                    Login
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
                <FormControl isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Flex flexDir="column">
                        <Link href="/auth/join">
                            Don&apos;t have an account?
                        </Link>
                        <Link href="/auth/reset">Forgot password?</Link>
                    </Flex>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                        isLoading={btnLoading}
                    >
                        Login
                        <AiOutlineArrowRight style={{ marginLeft: ".5em" }} />
                    </Button>
                </Flex>
            </Flex>
        </Grid>
    );
};
