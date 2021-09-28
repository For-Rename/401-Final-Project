import React, { useState, useEffect  } from "react";
import { useForm } from "react-hook-form";
import useUsers from './usersHook';
import './leaveForm.css'

export default function Leave() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [users] = useUsers();
  const onSubmit = (data) =>{
    fetch('http://127.0.0.1:8000/api/hrboost/vacations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data, // Use your own property name / key
      }),
    })
      .then((res) => setResult.json())
      .catch((err) => console.log('error'))
  }

  return (
    <div>
    <h2>
      Leave Form
    </h2>
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <label className="label">First Name</label>
    <input {...register("firstName")} type='text' defaultValue={users.first_name} className="label"/>
      <label className="label">Last Name</label>
    <input {...register("lastName")} type='label' defaultValue={users.last_name} className="label"/>
      <p>{users.email}</p>
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
