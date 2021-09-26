import {
    Box,
    chakra,

    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
 
    StatHelpText,
    StatArrow
} from '@chakra-ui/react';





export default function Statistics() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={10} px={{ base: 2, sm: 12, md: 17 }} >
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                Your Most Recent Updates !
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 1, lg: 8 }}>
                <Stat  borderRadius="md" bg={'#c9c1de'} textAlign={'center'} margin ={10} padding={1}>
                    <StatLabel>Performance</StatLabel>
                    <StatNumber>70%</StatNumber>
                    <StatHelpText >
                        <StatArrow type="increase" />
                        10.12%
                    </StatHelpText>
                </Stat>
                <Stat  borderRadius="md" bg={'#c9c1de'} textAlign={'center'} margin ={10} padding={1}>
                    <StatLabel>Vacations</StatLabel>
                    <StatNumber>10 Days</StatNumber>
                    <StatHelpText>
                        <StatArrow type="decrease" />
                        20%
                    </StatHelpText>
                </Stat>
                <Stat  borderRadius="md" bg={'#c9c1de'} textAlign={'center'} margin ={10} padding={1}>
                    <StatLabel>Leaves</StatLabel>
                    <StatNumber>3 Hours</StatNumber>
                    <StatHelpText>
                        <StatArrow type="decrease" />
                        30%
                    </StatHelpText>
                </Stat>
            </SimpleGrid>
        </Box>
    );
}