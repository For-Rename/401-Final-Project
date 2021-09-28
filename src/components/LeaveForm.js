import React, { useState, useEffect  } from "react";
import { useForm } from "react-hook-form";
import useUsers from './usersHook';
import axios from "axios";
import './leaveForm.css'

export default function Leave() {
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
    <h2>
      Leave Form
    </h2>
    
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

    {/* <Table result= {result} /> */}
    </div>
  );
}
