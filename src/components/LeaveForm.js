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
  const id = localStorage.getItem('id')
  const onSubmit = (result) => {
    const obj = {

      num_hours: 0,
      num_days : 0,
      applied_date: result.applied_date, 
      start_date: result.start_date,
      end_date: result.end_date,
      start_time: result.start_time,
      end_time: result.end_time,
      description: result.description,
      status: false,
      vacation_type: result.leaveType,
      user_id: id,
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


    setShowup(true)
  }


  return (
    <div>
  
    
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* <label className="label">First Name</label>
    <input {...register("firstName")} type='text' defaultValue={users.first_name} className="label"/> */}
      <label className="label">applied_date</label>
      <input {...register("applied_date")} type="date" className="input"/>

      <label className="label">start_date</label>
      <input {...register("start_date")} type="date"  className="input"/>


      <label className="label">end_date</label>
      <input {...register("end_date")} type="date"  className="input"/>

      <label className="label">Number of Days</label>
      <input {...register("num_days")} type="number"  className="input"/>
      <label className="label">Number of Hours (in case of Hourly leave)</label>
      <input {...register("num_hours")} type="number"  className="input"/>


      <label className="label">start_time</label>
      <input {...register("start_time")} type="time"  className="input"/>

      <label className="label">end_time</label>
      <input {...register("end_time")} type="time"  className="input"/>

      <label className="label">Add Leave description</label>
    <input {...register("description")} type='txet' className="label"/>



      <label className="label">Select Leave type</label>
      <select {...register("leaveType")} placeholder="Select Department"  className="input" > 
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
      </select>

    
      <input type="submit" />
      </form>
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


