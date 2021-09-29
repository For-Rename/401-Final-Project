
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
    const [data ,setData] = useState({})


    useEffect(() => {
        const id = localStorage.getItem('id')
        console.log('resources1',resources);
        axios.get(`http://localhost:8000/api/hrboost/users/${id}/`, config()).then(res=>{
            setData(res.data)
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
        <p>{data.birth_date}</p>
        <p>{data.image}</p>
        <p>{data.address}</p>
        <p>{data.phone_num}</p>
        <p>{data.gender}</p>
        <p>{data.social_status}</p>
        <p>{data.job_title}</p>
        <p>{data.available_leave_days}</p>
        <p>{data.evaluation}</p>
        <p>{data.pre_evaluation}</p>

 
         <button onClick={Update} > Update</button>
         {check &&  
             <UpdateProfile check = {setCheck} />
         }
        </>
    )
}







