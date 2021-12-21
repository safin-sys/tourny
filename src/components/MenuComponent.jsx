import { Avatar, FormControl, FormLabel, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Switch } from "@chakra-ui/react";

export const MenuComponent = ({ colorMode, toggleColorMode }) => {
    return <Menu closeOnSelect={false}>
        <MenuButton>
            <Avatar
                name="SafinTheShip" />
        </MenuButton>
        <MenuList w="14.5rem">
            <MenuItem fontWeight="bold">SafinTheShip</MenuItem>
            <MenuItem fontWeight="bold">Your Matches</MenuItem>
            <MenuDivider />
            <MenuItem>
                <FormControl display="flex" alignItems="center">
                    <FormLabel>
                        Toggle {colorMode === "dark" ? "Light" : "Dark"}
                    </FormLabel>
                    <Switch onChange={toggleColorMode} />
                </FormControl>
            </MenuItem>
            <MenuDivider />
            <MenuItem fontWeight="bold" color="red.400">Logout</MenuItem>
        </MenuList>
    </Menu>;
};
