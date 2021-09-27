import "./App.css";
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SidebarWithHeader from "./components/SideBar";
import Footer from "./components/Footer";


import { Box } from "@chakra-ui/layout";
import Profile from "./pages/Profile";
import LoginForm from './components/LoginForm'
import "./App.css";
import Home from "./pages/Home";
// import Log from "./components/LoginForm";
// import SignUp from './components/SignUp';
function App() {
  return (
    <Box>
      <Router>
        <SidebarWithHeader>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Box>
            <Footer></Footer>
          </Box>
        </SidebarWithHeader>
      </Router>
    </Box>
  );
}

export default App;
