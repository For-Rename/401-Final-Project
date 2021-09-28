
import { useAuth } from '../contexts/auth'
// import './loginForm.css'
import App from '../App'
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from 'react';
import { useEffect } from 'react';
export default function Login() {



    const [check ,setCheck] = useState(false)
    const { user, login } = useAuth();
    
    const submitEvent = (event)=>{
        event.preventDefault();
        let userName = event.target.Name.value
        let password = event.target.password.value
        login(userName,password)
        if (user){
            setCheck(true)
            localStorage.setItem('rememberMe', userName);
        }
    }

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe')
        if (rememberMe){
            setCheck(true)
        }

    }, []);


    return (
        <>{ check ?
            <ChakraProvider><App/></ChakraProvider>
             :
            <form onSubmit={submitEvent} >
                <h1>Login</h1>
                <div class="inset">
                    <p>
                        <label for="User">User Name</label>
                        <input type="text" name="Name" id="User" placeholder="User Name"/>
                    </p>
                    <p>
                        <label for="password">PASSWORD</label>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </p>
                </div>
                <p class="p-container">
                    <input type="submit" name="go" id="go" value="Log in"/>
                </p>
            </form>
                  }
        </>
    )
}
