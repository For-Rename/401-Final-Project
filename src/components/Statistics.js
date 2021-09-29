import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/auth";
export default function Statistics(props) {

  const { sum_days_vac } = useAuth();
  console.log(sum_days_vac);
  return (
    <Box maxW="7xl" mx={"auto"} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
      <Button></Button>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Your Most Recent Updates !
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 1, lg: 8 }}>
        <Stat
          borderRadius="md"
          bg={"#c9c1de"}
          textAlign={"center"}
          margin={10}
          padding={1}
        >
          <StatLabel>Performance</StatLabel>
          <StatNumber>{props.performance.evaluation} %</StatNumber>
          {props.perforPercentage > 0 ? (
            <StatHelpText>
              <StatArrow type="increase" />
              {props.perforPercentage} %
            </StatHelpText>
          ) : (
            <StatHelpText>
              <StatArrow type="decrease" />
              {props.perforPercentage} %
            </StatHelpText>
          )}
        </Stat>
        <Stat
          borderRadius="md"
          bg={"#c9c1de"}
          textAlign={"center"}
          margin={10}
          padding={1}
        >
          <StatLabel>Vacations</StatLabel>
          <StatNumber>{sum_days_vac} Days</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            20%
          </StatHelpText>
        </Stat>
        <Stat
          borderRadius="md"
          bg={"#c9c1de"}
          textAlign={"center"}
          margin={10}
          padding={1}
        >
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

