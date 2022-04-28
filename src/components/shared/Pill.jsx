import { Text } from "@chakra-ui/react";

const Pill = ({ children }) => {
    return (
        <Text
            bgColor="blue.400"
            color="white"
            p="2px 8px"
            borderRadius="8px"
            fontSize={["label.sm", "label.lg"]}
            fontWeight="bold"
            lineHeight="1"
            w="max"
        >
            {children}
        </Text>
    );
};

export default Pill;