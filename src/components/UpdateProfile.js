import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";

import React from "react";
import axios from "axios";
export default function UpdateProfile({ check }) {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const { resources, createResource, updateResource } = useResource();
  const { user, login, tokens } = useAuth();

  console.log("user check", user);

  function onAdd(event) {
    event.preventDefault();

    const id = localStorage.getItem("id");
    const obj = {
      birth_date: event.target.birthday.value,
      image: event.target.i.value,
      address: event.target.address.value,
      phone_num: event.target.phone.value,
      gender: event.target.radiogroup1.value,
      social_status: event.target.social_status.value,
      job_title: event.target.dep.value,
      available_leave_days: 14,
      evaluation: 29.0,
      pre_evaluation: 0.0,
      user_id: id,
      dep_id: 1,
      role_id: 2,
    };
    let x=   updateResource(`http://localhost:8000/api/hrboost/usersupdate/${id}/`, obj);
    console.log('resources1',x.data);
    check(false);
  }

  return (    

    <>
      <div class="form_wrapper" onSubmit={onAdd}>
        <div class="form_container">
          
          <div class="row clearfix">
            <div class="">
              <form>
                <div class="input_field">
                  <p> employees</p>
                </div>
                <div class="input_field">
                  <input
                    type="i"
                    autocomplete="false"
                    name="i"
                    placeholder="image"
                    defaultValue={userinfo.image}
                    required
                  />
                </div>
                
                <div class="input_field">
                  <label for="birthday">Birthday:</label>
                  <input
                    type="date"
                    defaultValue={userinfo.birth_date}
                    autocomplete="false"
                    name="birthday"
                  />
                </div>

                <div class="input_field">
                  <label for="job_title">job itle:</label>
                  <input
                    type="date"
                    defaultValue={userinfo.job_title}
                    autocomplete="false"
                    name="dep"
                  />
                </div>
                <div class="input_field">
                  <label for="address">address:</label>
                  <input
                    type="text"
                    defaultValue={userinfo.address}
                    name="address"
                  />
                </div>
                <div class="input_field">
                  <input
                    type="tel"
                    placeholder="phone number"
                    name="phone"
                    defaultValue={userinfo.phone_num}
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  ></input>
                </div>

                <div class="input_field radio_option">
                  <p>social status</p>
                  <input type="radio" name="social_status" id="rd1"   />
                  <label for="rd1">single</label>
                  <input type="radio" name="social_status" id="rd2" />
                  <label for="rd2">Married</label>
                </div>
                <div class="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd3" />
                  <label for="rd3">Male</label>
                  <input type="radio" name="radiogroup1" id="rd4" />
                  <label for="rd4">Female</label>
                </div>
                <input class="button" type="submit" value="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
