import { useState, useEffect } from "react";
import useSWR from "swr";
import Table from "./Table";
import { Box } from "@chakra-ui/react";
import {
  Attendances,
  postAttendance,
  fetchAttendance,
  apiUrl,
  setAttendance,
} from "../api";
import { useAuth } from "../../contexts/auth";

export default function CDate() {
  // const dt = null;
  const { user } = useAuth();

  const tokensAccess = localStorage.getItem("tokens");

  // const [cdate,setDate] = useState(dt);
  // const handelDate = () =>{
  //   let dt = new Date().toLocaleString();
  //   setDate(dt);
  const { data, error, mutate } = useSWR(
    [apiUrl, tokensAccess],
    fetchAttendance
  );
  console.log(data);
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    if (!data) return;
    setAttendance(data);
  }, [data]);
  if (error) return <h2>Error while fetching Attendances</h2>;
  if (!data) return <h2>Loading...</h2>;
  // const [Attendance, setAttendance] = useState([]);
  async function createHandler(event) {
    event.preventDefault();
    let dt = new Date().toISOString();
    // console.log(dt);
    const id = localStorage.getItem("id");
    const value = {
      // id: event.target.id.value,
      id: attendance.length + 1,
      user_id: id,
      check_in: dt,
      check_out: dt,

      // const newValue = Attendances.fromValues(values);

      // newValue.name += '...';

      // const updatevalue = [newValue, ...att]

      // mutate(updatevalue, false);

      // await postWithToken(token, values);

      // mutate();
    };
    setAttendance([...attendance, value]);
    console.log(attendance);
    const newrecord = Attendances.fromValues(value);
    newrecord.user_id += "..."; // Add the ... to show loading state
    const updatedAttendance = [newrecord, ...attendance];
    mutate(updatedAttendance, false);
    await postAttendance(value);
    mutate();
  }
  // function submitHandler(event) {
  //   event.preventDefault();
  //   let dt = new Date().toLocaleString();
  //   // console.log(dt);
  //   const value = {
  //     // id: event.target.id.value,
  //     id: Attendance.length + 1,
  //     name: "sara",
  //     checkin: dt,
  //     checkout: dt,
  //   };
  //   setAttendance([...Attendance, value]);
  //   console.log(Attendance);
  // }

  return (
    <Box maxW="7xl" mx={"auto"} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <h3>{Attendance.map(Attendance => <div>{Attendance.name}</div>)}</h3> */}
      <button onClick={createHandler}>Check-in/Check-out</button>
      <Table attendance={attendance} setAttendance={setAttendance} />
    </Box>
  );
}
