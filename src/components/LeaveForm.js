import React, { useState, useEffect  } from "react";
import { useForm } from "react-hook-form";
import useUsers from './usersHook';
import axios from "axios";
import './leaveForm.css'

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
  const [users] = useUsers();
  const onSubmit = (result) => {
    const id = localStorage.getItem('rememberMe')

  
    const obj = {
      applied_date: result.start_date,
      start_date: "2021-09-26",
      end_date: "2021-09-27",
      start_time:'12:00:00',
      end_time: "12:00:00",
      description: result.description,
      status: false,
      vacation_type: result.leaveType,
      user_id: id
  }

  function config() {
    const tokensAccess = localStorage.getItem('tokens')
    console.log('tokensAccess',tokensAccess);

    return {
        headers: {
            'Authorization': 'Bearer ' + tokensAccess
        }
    }
}
    axios.post(`http://127.0.0.1:8000/api/hrboost/vacations/`,obj,config()).then(
      res => {console.log(res)} 
      
    ).catch(error => console.log(error)) 
  }


  return (
    <div>
  
    
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* <label className="label">First Name</label>
    <input {...register("firstName")} type='text' defaultValue={users.first_name} className="label"/> */}
      <label className="label">Add Leave description</label>
    <input {...register("description")} type='txet' className="label"/>
      <label className="label">start_date</label>
      <input {...register("start_date")} type="date" className="input"/>
      <label className="label">end_date</label>
      <input {...register("end_date")} type="date"  className="input"/>
      <label className="label">Select Leave type</label>
      <select {...register("leaveType")} placeholder="Select Department"  className="input" > 
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
      </select>
   
{/* 
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul> */}
      <p>{result}</p>
      <input type="submit" /> 
      </form>
   
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


