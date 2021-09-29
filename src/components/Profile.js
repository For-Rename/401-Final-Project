import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(userinfo[0]["id"]);
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
      const tokensAccess = localStorage.getItem("tokens");
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
      <p>{userinfo[0]["birth_date"]}</p>
      <p>{userinfo[0]["image"]}</p>
      <p>{userinfo[0]["address"]}</p>
      <p>{userinfo[0]["phone_num"]}</p>
      <p>{userinfo[0]["gender"]}</p>
      <p>{userinfo[0]["social_status"]}</p>
      <p>{userinfo[0]["job_title"]}</p>
      <p>{userinfo[0]["available_leave_days"]}</p>
      <p>{userinfo[0]["evaluation"]}</p>
      <p>{userinfo[0]["pre_evaluation"]}</p>

      <button onClick={Update}> Update</button>
      {check && <UpdateProfile />}
    </>
  );
}
