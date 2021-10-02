import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";

import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Input,
  HStack,
  Radio,
  Flex,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function UpdateProfile(props) {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  function onAdd(event) {

    // Updating the user information
    // Argument : The input from the user for the update form
    event.preventDefault();

    const id = localStorage.getItem("user_id");
    const obj = {
      birth_date: event.target.birthday.value,
      image: event.target.i.value,
      address: event.target.address.value,
      phone_num: event.target.phone.value,
      gender: event.target.gender.value,
      social_status: event.target.social_status.value,
      job_title: event.target.dep.value,
      available_leave_days: 14,
      evaluation: 29.0,
      pre_evaluation: 0.0,
      user_id: id,
      dep_id: 1,
      role_id: 2,
    };

    // updateResource(
    //   `http://localhost:8000/api/hrboost/usersupdate/${userinfo["id"]}/`,

    //   obj
    // ).then((res) => {
    //   console.log(111111, userinfo.id);
    // });
    props.check(false);
  }
  return (
    <dev>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>UPDATE YOUR PROFILE </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              To make it easier for you{" "}
              <Link color={"blue.400"}>JUST Fill the form</Link> ✌️
            </Text>
            <form onSubmit={onAdd}>
              <FormControl id="first-name">
                <FormLabel>Employee image</FormLabel>
                <Input
                  type="file"
                  autocomplete="false"
                  name="i"
                  placeholder="image"
                  defaultValue=""
                />
                <FormLabel>Birthday</FormLabel>
                <Input
                  type="date"
                  defaultValue={userinfo.birth_date}
                  autocomplete="false"
                  name="birthday"
                />
                <FormLabel>Job Title</FormLabel>
                <Input
                  type="text"
                  defaultValue={userinfo.job_title}
                  autocomplete="false"
                  name="dep"
                />
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  defaultValue={userinfo.address}
                  name="address"
                />
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  placeholder="phone number"
                  name="phone"
                  defaultValue={userinfo.phone_num}
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                />

                <FormLabel as="legend" isRequired>
                  social Status
                </FormLabel>
                <RadioGroup
                  name="social_status"
                  defaultValue={userinfo.social_status}
                  required
                >
                  <HStack required spacing="24px">
                    <Radio value="Single">Single</Radio>
                    <Radio value="Married">Married</Radio>
                  </HStack>
                </RadioGroup>
                <FormLabel as="legend" isRequired>
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  defaultValue={userinfo.gender}
                  isRequired
                >
                  <HStack required spacing="24px">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </HStack>
                </RadioGroup>
                <Button
                  mt={4}
                  colorScheme="teal"
                  // onSubmit={onAdd}
                  type="submit"
                >
                  Update
                </Button>
              </FormControl>
            </form>
          </Stack>
        </Stack>
      </Flex>
    </dev>
  );
}
