import { useState } from "react";
import Table from "./Table";
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
function CDate() {
  // const dt = null;
  // const [cdate,setDate] = useState(dt);
  // const handelDate = () =>{
  //   let dt = new Date().toLocaleString();
  //   setDate(dt);

  const [Attendance, setAttendance] = useState([]);

  function submitHandler(event) {
    event.preventDefault();
    let dt = new Date().toLocaleString();
    // console.log(dt);
    const value = {
      // id: event.target.id.value,
      name: "sara",
      checkin: dt,
      checkout: dt,
      id: Attendance.length + 1,
    };
    setAttendance([...Attendance, value]);
    console.log(Attendance);
  }
  return (
    <Box maxW="7xl" mx={"auto"} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <h3>{Attendance.map(Attendance => <div>{Attendance.name}</div>)}</h3> */}
      <button onClick={submitHandler}>Check-in/Check-out</button>
      <Table Attendance={Attendance} setAttendance={setAttendance} />
    </Box>
  );
}

export default CDate;
