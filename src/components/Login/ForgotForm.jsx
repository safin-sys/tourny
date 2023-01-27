import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";
import { resetPassword } from "../../utils/firebase/auth";
import { emailVal } from "../../utils/validation";
import { FormControlComponent } from "../shared/FormControlComponent";

const ForgotForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(emailVal),
    });
    const [btnLoading, setBtnLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(0);

    const onSubmit = async (e) => {
        setBtnLoading(true);
        const promise = await resetPassword(e.email);
        const res = await promise;
        if (res === "auth/user-not-found") {
            setBtnLoading(false);
            setError("email", {
                type: "manual",
                message: "User not found",
            });
        }
        if (res === "success") {
            setBtnLoading(false);
            setEmailSent(1);
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
                <FormControlComponent
                    isInvalid={errors.email}
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                />
                <Button
                    colorScheme="twitter"
                    w="max"
                    type="submit"
                    isLoading={btnLoading}
                    alignSelf="end"
                >
                    Reset Password
                </Button>
                <Text opacity={emailSent}>
                    An mail was sent to your email address, follow the instructions
                    given in the email to reset your password.
                </Text>
            </Flex>
        </Grid>
    );
};

export default ForgotForm;
