import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";


export const FormControlComponent = ({ isInvalid, label, name, type, register }) => {
	return (
		<FormControl isInvalid={isInvalid}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input id={name} type={type} {...register(name)} />
			<FormErrorMessage>
				{isInvalid?.message}
			</FormErrorMessage>
		</FormControl>
	);
};
