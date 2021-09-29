import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(userinfo["id"]);
  const { resources, createResource, updateResource, fetchResource } =
    useResource();
  const { user, login, tokens } = useAuth();

  const [check, setCheck] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log("resources1", resources);
    axios
      .get(`http://localhost:8000/api/hrboost/userinfo/${id}/`, config())
      .then((res) => {
        setData(res.data);
      });

    function config() {
      const tokensAccess = localStorage.getItem("tokensAccess");
      console.log("tokensAccess", tokensAccess);

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
      {console.log(data)}
      <p>{userinfo["birth_date"]}</p>
      <p>{userinfo["image"]}</p>
      <p>{userinfo["address"]}</p>
      <p>{userinfo["phone_num"]}</p>
      <p>{userinfo["gender"]}</p>
      <p>{userinfo["social_status"]}</p>
      <p>{userinfo["job_title"]}</p>
      <p>{userinfo["available_leave_days"]}</p>
      <p>{userinfo["evaluation"]}</p>
      <p>{userinfo["pre_evaluation"]}</p>

      <button onClick={Update}> Update</button>
      {check && <UpdateProfile />}
    </>
  );
}
