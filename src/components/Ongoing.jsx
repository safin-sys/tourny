import { Banner } from './Banner'
import { Heading } from "@chakra-ui/layout";
import { Container } from '@chakra-ui/layout';

export const Ongoing = ({ OngoingInfo }) => {
    return (
        <Container maxW="75vw" marginY="4rem">
            <Heading fontSize="1.5rem" mb="1rem">Ongoing Tournament</Heading>
			<Banner champion={OngoingInfo.champion} tournamentName={OngoingInfo.tournamentName} date={OngoingInfo.date} />
        </Container>
    )
}
