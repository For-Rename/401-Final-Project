import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUsers from "./usersHook";
import axios from "axios";
import "./leaveForm.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
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
} from "@chakra-ui/react";

export default function Leave(props) {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [showup, setShowup] = useState(false);
  const handleClose = () => setShowup(false);
  const [users] = useUsers();

  const id = localStorage.getItem("user_id");
  console.log(id);
  const onSubmit = (result) => {
    console.log(result);
    const obj = {
      num_hours: 0,
      num_days: 0,
      applied_date: result.applied_date,
      start_date: result.start_date,
      end_date: result.end_date,
      start_time: result.start_time,
      end_time: result.end_time,
      num_hours: result.num_hours,
      num_days: result.num_days,
      description: result.description,
      status: false,
      vacation_type: result.leavetype,
      user_id: id,
    };
    console.log(obj);
    function config() {
      const tokensAccess = localStorage.getItem("tokens");
      console.log("tokensAccess", tokensAccess);

      return {
        headers: {
          Authorization: "Bearer " + tokensAccess,
        },
      };
    }
    axios
      .post(
        `https://hrboost-back.herokuapp.com/api/hrboost/vacations/`,
        obj,
        config()
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));

    setShowup(true);
  };

  {
    /* <label className="label">First Name</label>
    <input {...register("firstName")} type='text' defaultValue={users.first_name} className="label"/> */
  }
  {
    /* <label className="label">applied_date</label>
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
     
    </div>

  );
}


export default function Leave(props) {
  */
  }

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
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Request for a leave </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              To make it easier for you{" "}
              <Link color={"blue.400"}>JUST Fill the form</Link> ✌️
            </Text>
          </Stack>

          {/* <Stack spacing={6}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl margin={"7"} id="applied_date">
              <FormLabel fontSize={"2xl"}>Applied Date</FormLabel>
              <Input {...register("applied_date")} type="date" />
            </FormControl>
            <FormControl margin={"7"} id="start_date">
              <FormLabel fontSize={"2xl"}>Start Date</FormLabel>
              <Input {...register("start_date")} type="date" />
            </FormControl>
            <FormControl margin={"7"} id="end_date">
              <FormLabel fontSize={"2xl"}>End Date</FormLabel>
              <Input {...register("end_date")} type="date" />
            </FormControl>
            <FormControl margin={"7"} id="num_days">
              <FormLabel fontSize={"2xl"}>Number of Days</FormLabel>
              <Input {...register("num_days")} type="number" />
            </FormControl>
            <FormControl margin={"7"} id="num_hours">
              <FormLabel fontSize={"2xl"}>
                Number of Hours (in case of Hourly leave)
              </FormLabel>
              <Input {...register("num_hours")} type="number" />
            </FormControl>
            <FormControl margin={"7"} id="start_time">
              <FormLabel fontSize={"2xl"}>Leave Start Time</FormLabel>
              <Input {...register("start_time")} type="time" />
            </FormControl>
            <FormControl margin={"7"} id="end_time">
              <FormLabel fontSize={"2xl"}>Leave End Time</FormLabel>
              <Input {...register("end_time")} type="time" />
            </FormControl>
            <FormControl margin={"7"} id="description">
              <FormLabel fontSize={"2xl"}>Add Leave description</FormLabel>
              <Input {...register("description")} type="text" />
            </FormControl>
            <FormControl margin={"7"} id="leavetype">
              <FormLabel fontSize={"2xl"}>Leave Type</FormLabel>
              <select
                {...register("leavetype")}
                placeholder="Select Department"
              >
                <option value="">Select Leave Type</option>
                <option value="Annual">Annual</option>
                <option value="Hourly">Hourly</option>
                <option value="Sick">Sick Leave</option>
              </select>
            </FormControl>
            {/* <FormControl margin={'7'} id="deprtment">
              <FormLabel fontSize={'2xl' }>Department</FormLabel>
        <select {...register("Department")} placeholder="Select Department"  className="input"> 11111111
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
      </select>
        </FormControl> */}

            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              width={"full"}
            >
              Submit
            </Button>
          </form>
        </Stack>
      </Flex>

      {showup && (
        <Modal show={showup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request sent sucessfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>Will reply to you shortly</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
