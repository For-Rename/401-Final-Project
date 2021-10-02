// import './SignUp.scss'
import useResource from "../hooks/useResource";
import { useState } from "react";
import React from "react";
import { createNewUser } from "./api";
import { Redirect } from "react-router-dom";
export default function SignUp(props) {
  const { createResource } = useResource();
  const [redirect, setRedirect] = useState(false);
  console.log(props.userAccount);
  function onAdd(event) {
    event.preventDefault();

    const obj = {
      birth_date: event.target.birthday.value,
      image: event.target.image.value,
      address: event.target.address.value,
      phone_num: event.target.phone.value,
      gender: event.target.radiogroup1.value,
      social_status: event.target.social_status.value,
      dep_id: event.target.dep.value,
      available_leave_days: 15,
      evaluation: 100,
    };
    console.log(props.userAccount);
    const red = createNewUser(obj, props.userAccount);
    if (red) {
      <Redirect to="/SignUp" />;
    }
  }

  return (
    <>
      <div class="form_wrapper" onSubmit={onAdd}>
        <div class="form_container">
          <div class="title_container">
            <h2>information</h2>
          </div>
          <div class="row clearfix">
            <div class="">
              <form>
                <div class="input_field">
                  <select name="dep" placeholder="Select Department">
                    <option value="">Select Department</option>
                    <option value="1">HR</option>
                    <option value="2">IT</option>
                  </select>
                </div>
                <div class="input_field">
                  <label for="image">Employee photo:</label>
                  <input
                    type="file"
                    name="image"
                    placeholder="image"
                    required
                  />
                </div>
                <div class="input_field">
                  <label for="birthday">Birthday:</label>
                  <input type="date" autocomplete="false" name="birthday" />
                </div>
                <div class="input_field">
                  <label for="address">address:</label>
                  <input type="text" name="address" />
                </div>
                <div class="input_field">
                  <input
                    type="tel"
                    placeholder="phone number"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  ></input>
                </div>

                <div class="input_field radio_option">
                  <p>social status</p>
                  <input type="radio" name="social_status" id="rd1" />
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
