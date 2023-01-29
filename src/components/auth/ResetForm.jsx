import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import { auth } from "@utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [btnLoading, setBtnLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(0);

    const onSubmit = async (e) => {
        setBtnLoading(true);
        try {
            await sendPasswordResetEmail(auth, e.email);
            setBtnLoading(false);
            setEmailSent(1);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setBtnLoading(false);
                setError("email", {
                    type: "manual",
                    message: "User not found",
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
                    Reset Password
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
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Link href="/auth/login">Go back to Login</Link>
                    <Button
                        colorScheme="twitter"
                        w="max"
                        type="submit"
                        isLoading={btnLoading}
                        alignSelf="end"
                    >
                        Reset Password
                    </Button>
                </Flex>

                <Text opacity={emailSent} bgColor="green.400" p="4" rounded="4">
                    An mail has been sent to your email address, follow the
                    instructions given in the email to reset your password.
                </Text>
            </Flex>
        </Grid>
    );
};

export default ForgotForm;
