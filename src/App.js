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
function App() {

 
  const { tokens, user, login, sum_days_vac } = useAuth();
  const [check, setCheck] = useState(false);
  const [performance, setPerformance] = useState({});
  const [perforPercentage, setPerformancePercentage] = useState(0);
  const [model, setModel] = useState(false);
  const [blog, setBlog] = useState([]);

  // const [leaves, setLeaves] = useState([]);
  // const [remaining, setRemaining] = useState({});


  function config() {
    return {
      headers: {
        Authorization: "Bearer " + tokens.access,
      },
    };
  }



  function showingModel() {
    setModel(true);
  }
  function hidingModel() {
    setModel(false);
  }
  function blogInfoHandler(inform) {

    setBlog((info) => [...info, inform]);
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

    performanceHandler();
  }, [performance]);

 

  const submitEvent = (event) => {
    event.preventDefault();
    let userName = event.target.user.value;
    let password = event.target.password.value;
    login(userName, password);
   
if (user) {
      setCheck(true);
      localStorage.setItem("rememberMe", userName);
      localStorage.setItem('tokens', tokens.access);
      localStorage.setItem('id', user.id);
    }
  };
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      setCheck(true);
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
                    // remaining={remainingdays}
                    performanceHandler={performanceHandler}
                    perforPercentage={perforPercentage}
                    performance={performance}
                    blog={blog}
                    showingModel={showingModel}
                    blogInfoHandler={blogInfoHandler}
                    model={model}
                    hidingModel={hidingModel}
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
