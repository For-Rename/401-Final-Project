import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const userinfo = JSON.parse(localStorage.getItem("user_id"));

  console.log(userinfo);

  const { updateResource } = useResource();
  const { user, login, tokens } = useAuth();

  const [check, setCheck] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/hrboost/userinfo/${userinfo}/`, config())
      .then((res) => {
        setData(res.data[0]);
      });

    function config() {
      const tokensAccess = localStorage.getItem("tokens");
      return {
        headers: {
          Authorization: "Bearer " + tokensAccess,
        },
      };
    }
  }, []);

  const Update = () => {
    setCheck(true);
  };

  return (
    <>
      <p> birth date :{data.birth_date}</p>
      <p>image :{data.image}</p>
      <p>address:{data.address}</p>
      <p>phone_num:{data.phone_num}</p>
      <p>social_status:{data.social_status}</p>
      <p>job_title:{data.job_title}</p>
      <p>available_leave_days:{data.available_leave_days}</p>
      <p>evaluation:{data.evaluation}</p>
      <p>pre_evaluation:{data.pre_evaluation}</p>

      <button onClick={Update}> Update</button>
      {check && (
        <UpdateProfile update={setData} check={setCheck} userinfo={data} />
      )}
    </>
  );
}
