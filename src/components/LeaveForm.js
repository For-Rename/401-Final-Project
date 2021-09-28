import React, { useState } from "react";
import { propTypes } from "react-flexy-table";
import { useForm } from "react-hook-form";
import './leaveForm.css'

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
    <h2>
      Leave Form
    </h2>
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label">Employee First Name</label>
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
      <input type="submit" />
    </form>

    {/* <Table result= {result} /> */}
    </div>
  );
}
