import React, { useState } from "react";

import { useForm } from "react-hook-form";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Leave(props) {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    props.performanceHandler()
  }
  ;


  return (
    <div>
  
    
   
      {/* <label className="label">Employee First Name</label>
      <input {...register("firstName")} placeholder="First name"  className="input" />
      <label className="label">Employee Lasst Name</label>
      <input {...register("lastName")} placeholder="Last name"  className="input" />
      <label className="label">Leave Date</label>
      <input {...register("leaveDate")} type="date"  className="input"/>
      <label className="label">Leave Time</label>
      <input {...register("leaveTime")} type="time"  className="input"/>
      <label className="label">Select Leave type</label>
      <select {...register("leaveType")} placeholder="Select Department"  className="input" > 222222
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
      </select>
      <label className="label">Select Your Department</label>
      <select {...register("Department")} placeholder="Select Department"  className="input"> 11111111
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
      </select>

      <p>{result}</p>
      <input type="submit" /> */}
   
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Request for a leave </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            To make it easier for you <Link color={'blue.400'}>JUST Fill the form</Link> ✌️
          </Text>
        </Stack>
       
          {/* <Stack spacing={6}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl margin={'7'}id="firstname">
              <FormLabel fontSize={'2xl' }>Employee First Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl margin={'7'}id="lastname">
              <FormLabel fontSize={'2xl' }>Employee Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl margin={'7'} id="leavedate">
              <FormLabel fontSize={'2xl' }>Leave Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl margin={'7'}id="leavetime">
              <FormLabel fontSize={'2xl' }>Leave Time</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl margin={'7'} id="leavetype">
              <FormLabel fontSize={'2xl' }>Leave Type</FormLabel>
            <select {...register("leaveType")} placeholder="Select Department"  className="input" > 222222
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
        </select>
        </FormControl>
        <FormControl margin={'7'} id="deprtment">
              <FormLabel fontSize={'2xl' }>Department</FormLabel>
        <select {...register("Department")} placeholder="Select Department"  className="input"> 11111111
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
      </select>
        </FormControl>
        
          
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type='submit'
               width={'full'}>
                Submit
              </Button>
       
              </form>
      </Stack>
    </Flex>
 
    {/* <Table result= {result} /> */}
    </div>

  );
}


