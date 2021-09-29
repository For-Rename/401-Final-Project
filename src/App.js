import "./App.css";
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SidebarWithHeader from "./components/SideBar";
import Footer from "./components/Footer";

import { Box } from "@chakra-ui/layout";
import Profile from "./components/Profile";

import LoginForm from "./components/LoginForm";
import axios from "axios";
import Attendance from "./components/Attendance/Attendance";
import SignUp from "./components/SignUp";
import LeaveForm from "./components/LeaveForm";
import { useAuth } from "./contexts/auth";
import { useState } from "react";
import { useEffect } from "react";

import Home from "./pages/Home";
// import Log from "./components/LoginForm";
// import SignUp from './components/SignUp';

function App() {

  


  


  const { tokens, user, login, sum_days_vac } = useAuth();
  const [check, setCheck] = useState(false);
  const [performance, setPerformance] = useState({ evaluation: 0,
    prev_evaluation: 0});
  const [perforPercentage, setPerformancePercentage] = useState(0);
  const [model, setModel] = useState(false);
  const [blog, setBlog] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [remaining, setRemaining] = useState({ hours: 120 , days: 21 });
  


  function config() {
    return {
      headers: {
        Authorization: "Bearer " + tokens.access,
      },
    };
  }


  
  // function blogInfoHandler(inform){
  //   // const response = await axios.post('backend_link', info,config());
  //   // setBlog(info => [...info, response.data])
  //   // console.log(inform);
 
    
  //   // console.log(blog);
  //  }

   async function blogShowing(){
    if (!tokens) {
      return;
  }
    const response = await axios.get('http://localhost:8000/api/hrboost/blogs/‏', config());
    console.log(response.data);
    setBlog(info => [...info, response.data[0]])
   }
   async function leavesHandler(){
      if (!tokens) {
        return;
    }
      const response = await axios.get('http://127.0.0.1:8000/api/hrboost/vacations/ '+ user.id + "/",config());
      console.log(response.data[0]);
      if (!tokens) {
        return;
    }
  
    const obj = {
      leaving_hours:response.data[0].num_hours,
      leaving_days: response.data[0].num_days,
    }
      setLeaves( info => [...info, obj])
     }

  function showingModel() {
    setModel(true);
    //  leavesHandler()
  }
  function hidingModel() {
    setModel(false);
  }
  async function blogInfoHandler(inform) {
    if (!tokens) {
      return;
    }
     await axios.post('http://localhost:8000/api/hrboost/blogs/‏', inform, config());
    // setBlog(info => [...info, response.data])
    // console.log(inform);

    // setBlog((info) => [...info, inform]);
    blogShowing()
    // console.log(blog);
  }
  async function performanceHandler() {
    if (!tokens) {
      return;
    }
    const response = await axios.get(
      "http://localhost:8000/api/hrboost/userinfo/" + user.id + "/",
      config()
    );
    console.log(response.data);
    const per = {
      evaluation: response.data[0].evaluation,
      prev_evaluation: response.data[0].pre_evaluation,
    };
    setPerformance(per);
  }
   
  function performance_percentage() {
    const total = performance.evaluation - performance.prev_evaluation;

    console.log(performance);
    setPerformancePercentage(total);
  }
  useEffect(() => {
    performance_percentage();

   
    performanceHandler()
    
   },[performance])

   useEffect(()=>{
   
   
    performanceHandler()
    
   },[])
   
  


  

  function remaining_calc() {
    let sum_hours = 0;
    let sum_days = 0;
    for (let y = 0; y < leaves.length; y++) {
      sum_hours = sum_hours + leaves[y].leaving_hours;
      sum_days = sum_days + leaves[y].leaving_days;
    }
    const total = { hours: 20 - sum_hours, days: 21 - sum_days };
    console.log(performance);
    setRemaining(total);
  }
  useEffect(() => {
    // leavesHandler();
    remaining_calc();
  }, [leaves]);

  const submitEvent = (event) => {
    event.preventDefault();
    let userName = event.target.user.value;
    let password = event.target.password.value;
    console.log(userName);
    login(userName, password);
    

      setCheck(true)
      localStorage.setItem('rememberMe', userName);
  
  
    performanceHandler();
    blogShowing();
    leavesHandler()
}
useEffect(() => {
  const rememberMe = localStorage.getItem('rememberMe')
  if (rememberMe){
      setCheck(true)
  }

}, []);




  return (
    <>
      {check ? (
        <Box>
          <Router>
            <SidebarWithHeader>
              <Switch>
                <Route exact path="/">
                  <Home
                    remaining={remaining}
                    performanceHandler={performanceHandler}
                    perforPercentage={perforPercentage}
                    performance={performance}
                    blog={blog}
                    showingModel={showingModel}
                    blogInfoHandler={blogInfoHandler}
                    model={model}
                    hidingModel={hidingModel}
                    leavesHandler={ leavesHandler}
                    blogShowing={blogShowing}
                  />
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
                  <LeaveForm
                    // leavesHandler={leavesHandler}
                    performanceHandler={performanceHandler}
                  />
                </Route>
              </Switch>
              <Box>
                <Footer></Footer>
              </Box>
            </SidebarWithHeader>
          </Router>
        </Box>
      ) : (
        <LoginForm submitEvent={submitEvent} />
      )}
    </>

  );
}

export default App;
