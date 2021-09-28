import React,{useEffect, useState} from 'react';
import Statistics from "../components/Statistics";

import Blog  from "../components/Blog"
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import { useAuth } from '../contexts/auth'

function Home(){
  const [performance,setPerformance] = useState({});
  const [perforPercentage,setPerformancePercentage] = useState(0);
  const [model,setModel] = useState(false);
  const [blog,setBlog] = useState([]);
  const [leaves,setLeaves] = useState([]);
  const [remaining,setRemaining] = useState({});
  const { tokens, logout } = useAuth()
  
  function config() {

    return {
        headers: {
            'Authorization': 'Bearer ' + tokens.access
        }
    }
}
  function showingModel(){

   setModel(true);
   leavesHandler()
  }
  function hidingModel(){

    setModel(false)
   }
  function blogInfoHandler(inform){
    // const response = await axios.post('backend_link', info);
    // setBlog(info => [...info, response.data])
    console.log(inform);
   
    setBlog(info => [...info, inform])
    console.log(blog);
   }
   async function performanceHandler(){
    if (!tokens) {
      return;
  }
    // const response = await axios.get('http://127.0.0.1:8000/api/hrboost/users/',config());
    // console.log(response.data);
    // setPerformance( response.data)
    const per = {evaluation:70,
    prev_evaluation:80}

    setPerformance(per)
   }
   function performance_percentage(){

    const total = (performance.evaluation - performance.prev_evaluation );
    console.log(performance);
    setPerformancePercentage(total)
   }
   useEffect(()=>{
    performance_percentage();

    performanceHandler()
   },[performance])
   
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


    return (
      <>
      
        
         <Statistics remaining={remaining} performanceHandler={performanceHandler} perforPercentage={perforPercentage}performance={performance}></Statistics>
         <Blog blog = {blog}showingModel={showingModel}></Blog>
         <BlogForm  blogInfoHandler={blogInfoHandler} model={model} hidingModel={hidingModel}></BlogForm>
   
       </>
    );

}

export default Home;
