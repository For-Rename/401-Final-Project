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
import useSWR from "swr";

// import Log from "./components/LoginForm";
// import SignUp from './components/SignUp';

function App() {
  const { tokens, user, login, sum_days_vac } = useAuth();
  const [check, setCheck] = useState(false);
  const [performance, setPerformance] = useState({
    evaluation: 0,
    prev_evaluation: 0,
  });
  const [perforPercentage, setPerformancePercentage] = useState(0);
  const [model, setModel] = useState(false);
  const [blog, setBlog] = useState([]);

  const [leaves, setLeaves] = useState([]);
  const [remaining, setRemaining] = useState({ hours: 120, days: 21 });
  const { data, error, mutate } = useSWR(
    [
      "http://localhost:8000/api/hrboost/blogs/",
      localStorage.getItem("tokens"),
    ],
    blogShowing
  );
  const { data1, error1, mutate1 } = useSWR(
    [
      "http://localhost:8000/api/hrboost/blogs/",
      localStorage.getItem("tokens"),
    ],
    leavesHandler
  );

  useEffect(() => {
    console.log("hi");
    if (!data) return;
    setBlog(data);
  }, [data]);

  useEffect(() => {
    if (!data1) return;
    console.log("hi");
    setLeaves(data1);
    remaining_calc();
  }, [data1]);
  function config() {
    const token = localStorage.getItem("tokens");
    console.log(token);
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  }

  // function blogInfoHandler(inform) {
  //   // const response = await axios.post('backend_link', info,config());
  //   // setBlog(info => [...info, response.data])
  //   // console.log(inform);
  //   // console.log(blog);
  // }

  async function blogShowing() {
    // Get all the blogs created by all users, by making get request to the blogs endpoint
    // Arguments: None
    
    const response = await axios.get(
      "http://localhost:8000/api/hrboost/blogs/",
      config()
    );
    const data2 = await leavesHandler();
    setLeaves(data2);
    return response.data;
  }
  async function leavesHandler() {
    // Get all the leaves requested by a specific user
    // Arguments: None
    const user_id = localStorage.getItem("user_id");
    const response = await axios.get(
      "http://localhost:8000/api/hrboost/vacationsuser/" + user_id + "/",
      config()
    );

    return response.data;
  }

  function showingModel() {
    setModel(true);
  }
  function hidingModel() {
    setModel(false);
  }

  async function blogInfoHandler(inform) {
    // Create a blog by specific user 
    // Argument: Information needed for the blog 
    const token = localStorage.getItem("tokens");
    console.log("token ", token);
    console.log("from blog handler", inform);

    const response = await axios.post(
      "http://localhost:8000/api/hrboost/blogs/",
      inform,
      config()
    );
    // setBlog(info => [...info, response.data])
    // console.log(inform);

    // setBlog((info) => [...info, inform]);
    // if (!tokens) {
    //   return;
    // }
    // const response = await axios.get(
    //   "http://localhost:8000/api/hrboost/blogs/",
    //   config()
    // );
    console.log(response.data);
    setBlog((info) => [...info, response.data]);
    // console.log(blog);
  }
  async function performanceHandler() {
    // Getting the current and previous evaluation for a specific user
    // Arguments ; None
    if (!tokens) {
      return;
    }
    const response = await axios.get(
      "http://localhost:8000/api/hrboost/userinfo/" + user.id + "/",
      config()
    );
    console.log(response.data);
    const per = {
      evaluation: response.data.evaluation,
      prev_evaluation: response.data.pre_evaluation,
    };
    setPerformance(per);
  }

  function performance_percentage() {
    // Calculating the performance percentage for the user
    // Argument : None
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    const total =
      Number(userinfo?.evaluation) - Number(userinfo?.pre_evaluation);

    console.log(total);
    setPerformancePercentage(total);
  }
  useEffect(() => {
    performance_percentage();

    performanceHandler();
  }, [performance]);

  // useEffect(() => {
  //   performanceHandler();
  // }, []);

  function remaining_calc() {
    // Calculating the remaining leaving hours and days that user can request
    // Argument : None
    console.log("in");
    let sum_hours = 0;
    let sum_days = 0;
    console.log("leaves", leaves);
    for (let y = 0; y < leaves.length; y++) {
      sum_hours = sum_hours + leaves[y].num_hours;
      sum_days = sum_days + leaves[y].num_days;
    }
    console.log("sum_hours", sum_hours);
    console.log("sum_days", sum_days);
    const total = { hours: 20 - sum_hours, days: 21 - sum_days };
    console.log("total", total);

    setRemaining(total);
  }
  useEffect(() => {
    // leavesHandler();
    remaining_calc();
  }, [leaves, data1]);

  const submitEvent = (event) => {
    // Logging the user to the application using user credentials 
    // Argument: The user credentials
    event.preventDefault();
    let userName = event.target.user.value;
    let password = event.target.password.value;
    login(userName, password);

    setCheck(true);
    localStorage.setItem("rememberMe", userName);

    performanceHandler();
    blogInfoHandler();
    leavesHandler();
  };
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      setCheck(true);
    }
  }, [data1]);

  return (
    <>
      {data1 && console.log("got it")}
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
                    leavesHandler={leavesHandler}
                    // blogShowing={blogShowing}
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
