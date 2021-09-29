import "./App.css";
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SidebarWithHeader from "./components/SideBar";
import Footer from "./components/Footer";


import { Box } from "@chakra-ui/layout";
import Profile from "./pages/Profile";

import LoginForm from './components/LoginForm'
import axios from 'axios';
import Attendance from "./components/Attendance/Attendance";
import SignUp from "./components/SignUp";
import LeaveForm from './components/LeaveForm';
import { useAuth } from './contexts/auth';
import { useState } from 'react';
import { useEffect } from 'react';

import Home from "./pages/Home";
// import Log from "./components/LoginForm";
// import SignUp from './components/SignUp';
function App() {
  
  const { user, login } = useAuth();
  const [check ,setCheck] = useState(false)
  const [performance,setPerformance] = useState({});
  const [perforPercentage,setPerformancePercentage] = useState(0);
  const [model,setModel] = useState(false);
  const [blog,setBlog] = useState([]);
  const [leaves,setLeaves] = useState([]);
  const [remaining,setRemaining] = useState({});
  const { tokens } = useAuth();
  
  function config() {

    return {
        headers: {
            'Authorization': 'Bearer ' + tokens.access
        }
    }
}
  function showingModel(){

   setModel(true);
  //  leavesHandler()
  }
  function hidingModel(){

    setModel(false);
    
   }
  function blogInfoHandler(inform){
    // const response = await axios.post('backend_link', info);
    // setBlog(info => [...info, response.data])
    // console.log(inform);
   
    setBlog(info => [...info, inform])
    // console.log(blog);
   }
   async function performanceHandler(){
    if (!tokens) {
      return ;
  }
    const response = await axios.get('http://localhost:8000/api/hrboost/users/3/',config());
    console.log(response.data);
    setPerformance( response.data)
    console.log(performance);
    // const per = {evaluation:90,
    // prev_evaluation:80}

    // setPerformance(response.data)
   }
   function performance_percentage(){

    const total = (performance.evaluation - performance.pre_evaluation );
    console.log(performance);
    setPerformancePercentage(total)
   }
   useEffect(()=>{
    performance_percentage();
   
    performanceHandler()
    
   },[performance])

   useEffect(()=>{
   
   
    performanceHandler()
    
   },[])
   
   async function leavesHandler(){
  //   if (!tokens) {
  //     return;
  // }
  //   const response = await axios.get('http://127.0.0.1:8000/api/hrboost/vacations/',config());
  //   console.log(response.data);
  // setLeaves( info => [...info, response.data])
  const obj = {
    leaving_hours:5,
    leaving_days: 1
  }
    setLeaves( info => [...info, obj])
   }
   function remaining_calc(){
     let sum_hours = 0
     let sum_days = 0
    for (let y=0;y<leaves.length;y++){
     sum_hours = sum_hours + leaves[y].leaving_hours;
     sum_days = sum_days + leaves[y].leaving_days
    }
    const total = {hours:20 - sum_hours ,days:21-sum_days};
    console.log(performance);
    setRemaining(total)
   }
   useEffect(()=>{
    remaining_calc();

    // leavesHandler()
   },[leaves])

   useEffect(()=>{
   

    leavesHandler()
   },[])



const submitEvent = (event) => {
    event.preventDefault();
    let userName = event.target.user.value;
    let password = event.target.password.value;
    console.log(userName);
    login(userName, password);
    if (user) {
      setCheck(true)
      localStorage.setItem('rememberMe', userName);
  }
  
  performanceHandler()
}
useEffect(() => {
  const rememberMe = localStorage.getItem('rememberMe')
  if (rememberMe){
      setCheck(true)
  }

}, []);

  return ( <>
  {check ? 
    <Box>
      <Router>
        <SidebarWithHeader>
          <Switch>
            <Route exact path="/">
              <Home remaining={remaining} performanceHandler={performanceHandler} perforPercentage={perforPercentage}performance={performance}blog = {blog}showingModel={showingModel} blogInfoHandler={blogInfoHandler} model={model} hidingModel={hidingModel}/>
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/Attendance">
              <Attendance />
            </Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/LeaveForm">
              <LeaveForm leavesHandler={leavesHandler} performanceHandler={performanceHandler}/>
            </Route>
          </Switch>
          <Box>
            <Footer></Footer>
          </Box>
        </SidebarWithHeader>
      </Router>
    </Box>:
    <LoginForm submitEvent={submitEvent}/>
  } 
  </>
  );
}

export default App;
