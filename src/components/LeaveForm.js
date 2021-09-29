import React, { useState, useEffect  } from "react";
import { useForm } from "react-hook-form";
import useUsers from './usersHook';
import axios from "axios";
import './leaveForm.css'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [showup, setShowup] = useState(false);
  const handleClose = () => setShowup(false);
  const [users] = useUsers();
  
  const id = localStorage.getItem('id');
  const onSubmit = (result) => {
    const obj = {

      num_hours: 0,
      num_days : 0,
      applied_date: result.applied_date, 
      start_date: result.start_date,
      end_date: result.end_date,
      start_time: result.start_time,
      end_time: result.end_time,
      num_hours: result.num_hours,
      num_days: result.num_days,
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
      res => {console.log('res',res)} 
      
    ).catch(error => console.log('error',error)) 


    setShowup(true)
  }


 
  



  return (
    <div>
  

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
            <FormControl margin={'7'}id="applied_date">
              <FormLabel fontSize={'2xl' }>Applied Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl margin={'7'}id="start_date">
              <FormLabel fontSize={'2xl' }>Start Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl margin={'7'}id="end_date">
              <FormLabel fontSize={'2xl' }>End Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl margin={'7'}id="num_days">
              <FormLabel fontSize={'2xl' }>Number of Days</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl margin={'7'} id="num_hours">
              <FormLabel fontSize={'2xl' }>Number of Hours (in case of Hourly leave)</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl margin={'7'}id="start_time">
              <FormLabel fontSize={'2xl' }>Leave Start Time</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl margin={'7'}id="end_time">
              <FormLabel fontSize={'2xl' }>Leave End Time</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl margin={'7'}id="description">
              <FormLabel fontSize={'2xl' }>Add Leave description</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl margin={'7'} id="leavetype">
              <FormLabel fontSize={'2xl' }>Leave Type</FormLabel>
            <select  placeholder="Select Department"  > 
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
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
 
    {showup && <Modal show={showup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request sent sucessfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Will reply to you shortly</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
    </div>

  );
}

