import Link from "next/link";
import { MenuComponent } from "./MenuComponent";

export const LoggedInNavLinks = ({ colorMode, toggleColorMode }) => {
    return (
        <>
            <Link href="/">Home</Link>
            <Link href="/">Tournaments</Link>
            <Link href="/">Teams</Link>
            <Link href="/">Players</Link>
            <MenuComponent colorMode={colorMode} toggleColorMode={toggleColorMode} />
        </>
    );
};
