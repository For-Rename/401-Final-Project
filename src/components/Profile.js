import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,

} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";


export default function Profile() {
  const userinfo = JSON.parse(localStorage.getItem("user_id"));

  console.log(userinfo);

  const { updateResource } = useResource();
  const { user, login, tokens } = useAuth();

  const [check, setCheck] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {


     console.log('----------------------------------------------')
    const id = localStorage.getItem("user_id");
    axios
    .get(`http://localhost:8000/api/hrboost/userinfo/${id}/`, config())
    .then((res) => {
      console.log('resres',res.data);
      setData(res.data[0]);
    }).catch(err=>console.log('err',err))


  function config() {
    const tokensAccess = localStorage.getItem("tokens");
    return {
      headers: {
        Authorization: "Bearer " + tokensAccess,
      },
    };
  }


      },[]);

  const Update = () => {
    setCheck(true);
  };

  return (
    <>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={"3xl"}>This is Your Informations</Heading>
        </Stack>

        <Container maxW={"6xl"} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}>Your address </Text>
                <Text color={"gray.600"}>{data.address}</Text>
              </VStack>
            </HStack>
            <HStack key={data.phone_num} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Your Phone Number </Text>

                <Text color={"gray.600"}>{data.phone_num}</Text>
              </VStack>
            </HStack>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}> Your Social Status :</Text>
                <Text color={"gray.600"}> {data.social_status} </Text>
              </VStack>
            </HStack>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}>Your Job Title : </Text>
                <Text color={"gray.600"}> {data.job_title} </Text>
              </VStack>
            </HStack>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}>Your available_leave_days : </Text>
                <Text color={"gray.600"}> {data.available_leave_days} </Text>
              </VStack>
            </HStack>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}>Your Current Evaluation : </Text>
                <Text color={"gray.600"}> {data.evaluation} </Text>
              </VStack>
            </HStack>
            <HStack key={data.birth_date} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack>
                <Text fontWeight={600}>Your Previous Evavluation </Text>
                <Text color={"gray.600"}> {data.pre_evaluation} </Text>
              </VStack>
            </HStack>
          </SimpleGrid>
        </Container>
      </Box>

      <Button
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={Update}
        
        // width={'full'}
        width={"auto"}

        margin ={'20'}
        >
        Update
      </Button>
          {check && <UpdateProfile update={setData} check={setCheck} userinfo={data} />}

  
    </>
  );
}

