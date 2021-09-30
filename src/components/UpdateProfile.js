import useResource from "../hooks/useResource";
import { useAuth } from "../contexts/auth";

import React from "react";

export default function UpdateProfile({ update, check, userinfo }) {
  const { updateResource } = useResource();
  const { user } = useAuth();

  console.log("user check", user);

  function onAdd(event) {
    event.preventDefault();
    const user_info_id = JSON.parse(localStorage.getItem("userinfo"));
 
    const id = localStorage.getItem("user_id");
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

    updateResource(
      `https://hrboost-back.herokuapp.com/api/hrboost/usersupdate/${user_info_id["id"]}/`,

      obj
    ).then((res) => {
      console.log(111111,user_info_id.id);
      update(res);
    });
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
                    type="text"
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
                  <input
                    type="radio"
                    name="social_status"
                    id="rd1"
                    value="single"
                  />
                  <label for="rd1">single</label>
                  <input
                    type="radio"
                    name="social_status"
                    id="rd2"
                    value="Married"
                  />
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
