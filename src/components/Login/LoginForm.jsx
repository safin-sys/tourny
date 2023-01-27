import {
    Button,
    Flex,
    Grid,
    Heading,
    Link as ChakraLink,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { loginVal } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormControlComponent } from "../shared/FormControlComponent";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { login } from "../../utils/firebase/auth";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

export const LoginForm = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(loginVal),
    });

    const router = useRouter();
    const toast = useToast();

    const onSubmit = async (e) => {
        setBtnLoading(true);
        const { email, password } = e;
        const promise = await login(email, password);
        const user = await promise;
        if (user.user?.email) {
            setBtnLoading(false);
            router.push("/");
            toast({
                title: "Success",
                description: "You have successfully logged in",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
        if (user === "auth/user-not-found" || user === "auth/wrong-password") {
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
                <FormControlComponent
                    isInvalid={errors.email}
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                />
                <FormControlComponent
                    isInvalid={errors.password}
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                />

                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Flex flexDir="column">
                        <Link href="/signup" passHref>
                            <ChakraLink>Dont have an account?</ChakraLink>
                        </Link>
                        <Link href="/login/forgot" passHref>
                            <ChakraLink>Forgot password?</ChakraLink>
                        </Link>
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
