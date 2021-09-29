
import useResource from '../hooks/useResource'
import { useAuth } from '../contexts/auth'
import { useState } from 'react';
import UpdateProfile from './UpdateProfile';
import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';

export default function Profile() {

    const { resources , createResource ,updateResource , fetchResource} = useResource();
    const { user , login ,tokens} = useAuth();
    
    const [check ,setCheck] = useState(false)

    useEffect(() => {
        const id = localStorage.getItem('id')
        console.log('resources1',resources);
        axios.get(`http://localhost:8000/api/hrboost/users/${id}/`, config()).then(res=>{
            console.log('resources2',res.data);
        })

        function config() {
            const tokensAccess = localStorage.getItem('tokens')
            console.log('tokensAccess',tokensAccess);
    
            return {
                headers: {
                    'Authorization': 'Bearer ' + tokensAccess
                }
            }
        }

    }, []);



    const Update = ()=>{

        setCheck(true)

    }


    return (
        <> 







 
         <button onClick={Update} > Update</button>
         {check &&  
             <UpdateProfile check = {setCheck} />
         }
        </>
    )
}




//"birth_date": event.target.birthday.value,
//"image": event.target.i.value,
//"address": event.target.address.value,
//"phone_num": event.target.phone.value,
//"gender":  event.target.radiogroup1.value,
//"social_status": event.target.social_status.value,
//"job_title":  event.target.dep.value,
//"available_leave_days": 14,
//"evaluation": 29.0,
//"pre_evaluation": 0.0,
//"user_id": id,
//"dep_id": 1,
//"role_id": 2


