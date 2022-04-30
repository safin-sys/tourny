import {
    Button,
    Flex,
    Grid,
    Heading,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signup } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormControlComponent } from "../shared/FormControlComponent";
import { AiOutlineArrowRight } from "react-icons/ai";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signup),
    });

    const onSubmit = (e) => {
        console.log(e);
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
                    <Flex
                        flexDir="column"
                    >
                        <Link href="/signup" passHref>
                            <ChakraLink>
                                Dont have an account?
                            </ChakraLink>
                        </Link>
                        <Link href="/signup" passHref>
                            <ChakraLink>Forgot password?</ChakraLink>
                        </Link>
                    </Flex>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                    >
                        Login
                        <AiOutlineArrowRight style={{ marginLeft: ".5em" }} />
                    </Button>
                </Flex>
            </Flex>
        </Grid>
    );
};
