import './SignUp.scss'
import useResource from '../hooks/useResource'

import React from 'react'

export default function SignUp() {

    const { createResource } = useResource();



    function onAdd(event) {
        event.preventDefault();

        const obj = {

            'birth_date' : event.target.birthday.value,
            'image' : event.target.i.value,
            'address' : event.target.address.value,
            'phone_num' : event.target.phone.value,
            'gender' : event.target.radiogroup1.value,
            'social_status' : event.target.social_status.value,
            'job_title' : event.target.dep.value,
            'available_leave_days' : 14,
            'evaluation' : null ,


        }
        createResource(obj)
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
                            <form >
                                <div class="input_field">
                                    <input type="dep" autocomplete="false" name="dep" placeholder="Department" required />
                                </div>
                                <div class="input_field">
                                    <input type="i" autocomplete="false" name="i" placeholder="image" required /></div>
                                <div class="input_field">
                                    <label for="birthday">Birthday:</label>
                                    <input type="date" autocomplete="false" name="birthday" />
                                </div>
                                <div class="input_field">
                                    <label for="address">address:</label>
                                    <input type="text" name="address" />
                                </div>
                                <div class="input_field">
                                    <input type="tel" placeholder="phone number" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"></input>
                                </div>
                                
                                <div class="input_field radio_option">
                                     <p>social status</p>
                                    <input type="radio" name="social_status" id="rd1" />
                                    <label for="rd1">single
                                    </label>
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
    )
}
