// import './SignUp.scss'
import useResource from '../hooks/useResource'
import React, { useState } from 'react'
import UserInfoForm from './UserInfoForm'
export default function SignUp() {

    const { createResource } = useResource();

    const [form, setForm] = useState(true);




    function onCreate(event) {
        event.preventDefault();

        const obj = {

            "Name": event.target.User.value,
            "password": event.target.password1.value,


        }
        createResource(obj)
        setForm(false)
    }

   

    return (
        <> {form ?
            <div class="form_wrapper" onSubmit={onCreate}>
                <div class="form_container">
                    <div class="title_container">
                        <h2>Add an employee</h2>
                    </div>
                    <div class="row clearfix">
                        <div class="">
                            <form >
                                <div class="input_field">
                                    <input type="User Name" name="User" autocomplete="false" placeholder="User Name" required />
                                </div>
                                <div class="input_field">
                                    <input type="email" name="email" placeholder="Email" required />
                                </div>
                                <div class="row clearfix">
                                    <div class="col_half">
                                        <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                                            <input type="text" name="name" placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div class="col_half">
                                        <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                                            <input type="text" name="name" placeholder="Last Name" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="input_field">
                                    <input type="password" name="password1" autocomplete="false" placeholder="Confirm Password" required />
                                </div>
                                <div class="input_field">
                                    <input type="password" name="password2" autocomplete="false" placeholder="Confirm Password" required />
                                </div>
                                <input class="button" type="submit" value="Next" />
                            </form>
                        </div>
                    </div>
                </div>
            </div> : <UserInfoForm />

        }
        </>
    )
}