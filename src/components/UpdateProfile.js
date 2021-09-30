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
} from "@chakra-ui/react"


export default function UpdateProfile({ update, check, userinfo }) {
  const { updateResource } = useResource();
  const { user } = useAuth();

  console.log("user check", user);

  function onAdd(event) {
    event.preventDefault();
    const user_info_id = JSON.parse(localStorage.getItem("userinfo"));

    const id = localStorage.getItem("user_id");
    const obj = {
      birth_date: event.target.birthday.value,
      image: event.target.i.value,
      address: event.target.address.value,
      phone_num: event.target.phone.value,
      gender: event.target.radiogroup1.value,
      social_status: event.target.social_status.value,
      job_title: event.target.dep.value,
      available_leave_days: 14,
      evaluation: 29.0,
      pre_evaluation: 0.0,
      user_id: id,
      dep_id: 1,
      role_id: 2,
    };

    updateResource(
      `http://localhost:8000/api/hrboost/usersupdate/${user_info_id.id}/`,
      obj
    ).then((res) => {
      console.log(111111, user_info_id.id);
      update(res);
    });
    check(false);
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
          </Stack>
          <form onSubmit={onAdd}>
          <FormControl id="first-name" isRequired>
            <FormLabel>Employee image</FormLabel>
            <Input type="i"
              autocomplete="false"
              name="i"
              placeholder="image"
              defaultValue={userinfo.image}
              required />
            <FormLabel>Birthday</FormLabel>
            <Input type="i"
              type="date"
              defaultValue={userinfo.birth_date}
              autocomplete="false"
              name="birthday" />
            <FormLabel>Job Title</FormLabel>
            <Input type="text"
              defaultValue={userinfo.job_title}
              autocomplete="false"
              name="dep" />
            <FormLabel>Address</FormLabel>
            <Input type="text"
              defaultValue={userinfo.address}
              name="address" />
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel"
              placeholder="phone number"
              name="phone"
              defaultValue={userinfo.phone_num}
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" />

            <FormLabel as="legend">social Status</FormLabel>
            <RadioGroup defaultValue="Itachi">
              <HStack spacing="24px">
                <Radio value="Single">Single</Radio>
                <Radio value="Married">Married</Radio>
              </HStack>
            </RadioGroup>
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup defaultValue="Itachi">
              <HStack spacing="24px">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            // onSubmit={onAdd}
            type="submit"
          >
            Submit
          </Button>
          </form>
          </Stack>

        </Flex>

        {/* <div class="form_wrapper" onSubmit={onAdd}>
        <div class="form_container">
        <div class="row clearfix">
        <div class="">
        <form>
                <div class="input_field">
                  <p> employees</p>
                </div>
                <div class="input_field">
                  <input
                    type="i"
                    autocomplete="false"
                    name="i"
                    placeholder="image"
                    defaultValue={userinfo.image}
                    required
                  />
                </div>

                <div class="input_field">
                  <label for="birthday">Birthday:</label>
                  <input
                    type="date"
                    defaultValue={userinfo.birth_date}
                    autocomplete="false"
                    name="birthday"
                  />
                </div>

                <div class="input_field">
                  <label for="job_title">job itle:</label>
                  <input
                    type="text"
                    defaultValue={userinfo.job_title}
                    autocomplete="false"
                    name="dep"
                  />
                </div>
                <div class="input_field">
                  <label for="address">address:</label>
                  <input
                    type="text"
                    defaultValue={userinfo.address}
                    name="address"
                  />
                </div>
                <div class="input_field">
                  <input
                    type="tel"
                    placeholder="phone number"
                    name="phone"
                    defaultValue={userinfo.phone_num}
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  ></input>
                </div>

                <div class="input_field radio_option">
                  <p>social status</p>
                  <input
                    type="radio"
                    name="social_status"
                    id="rd1"
                    value="single"
                  />
                  <label for="rd1">single</label>
                  <input
                    type="radio"
                    name="social_status"
                    id="rd2"
                    value="Married"
                  />
                  <label for="rd2">Married</label>
                </div>
                <div class="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd3" />
                  <label for="rd3">Male</label>
                  <input type="radio" name="radiogroup1" id="rd4" />
                  <label for="rd4">Female</label>
                </div>
                <input class="button" type="submit" value="submit" />
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </dev>
      );
}
