import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style_leave.css";

export default function Leave() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));


  return (
    <div>
    <h1>
      Leave Form
    </h1>
   
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Employee First Name</label>
      <input {...register("firstName")} placeholder="First name" />
      <label>Employee Lasst Name</label>
      <input {...register("lastName")} placeholder="Last name" />
      <label>Leave Date</label>
      <input {...register("leaveDate")} type="date"/>
      <label>Leave Time</label>
      <input {...register("leaveTime")} type="time"/>
      <label>Select Your Department</label>
      <select {...register("leaveType")} placeholder="Select Department" className="dropbtn"> 222222
        <option value="">Select Leave Type</option>
        <option value="Annual">Annual</option>
        <option value="Hourly">Hourly</option>
        <option value="Sick">Sick Leave</option>
      </select>
      <label></label>
      <select {...register("Department")} placeholder="Select Department" className="dropbtn"> 11111111
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
      </select>

      <p>{result}</p>
      <input type="submit" />
    </form>
    </div>
  );
}
