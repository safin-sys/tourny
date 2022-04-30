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

export const SignupForm = () => {
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
                        <ChakraLink>
                            Already have an account?
                        </ChakraLink>
                    </Link>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                    >
                        SignUp
                        <AiOutlineArrowRight style={{ marginLeft: ".5em" }} />
                    </Button>
                </Flex>
            </Flex>
        </Grid>
    );
};
