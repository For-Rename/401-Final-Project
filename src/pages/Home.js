import React,{useEffect, useState} from 'react';
import Statistics from "../components/Statistics";
import Blog  from "../components/Blog"
import axios from 'axios';
import BlogForm from '../components/BlogForm';
function Home(){
  const [performance,setPerformance] = useState({});
  const [perforPercentage,setPerformancePercentage] = useState(0);
  const [model,setModel] = useState(false);
  const [blog,setBlog] = useState([]);
  
  function showingModel(){

   setModel(true)
  }
  function hidingModel(){

    setModel(false)
   }
  function blogInfoHandler(info){
    // const response = await axios.post('backend_link', info);
    // setBlog(info => [...info, response.data])
    console.log(info);
   }
   function performanceHandler(info){
    // const response = await axios.get('backend_link');
    
    // setPerformance( response.data)
    const per = {evaluation:70,
    prev_evaluation:60}

    setPerformance(per)
   }
   function performance_percentage(){

    const total = (performance.evaluation - performance.prev_evaluation );
    console.log(performance);
    setPerformancePercentage(total)
   }
   useEffect(()=>{
    performance_percentage()
 
   },[performance])


    return (
      <>
      
        
         <Statistics performanceHandler={performanceHandler} perforPercentage={perforPercentage}performance={performance}></Statistics>
         <Blog blog = {blog}showingModel={showingModel}></Blog>
         <BlogForm  blogInfoHandler={blogInfoHandler} model={model} hidingModel={hidingModel}></BlogForm>
   
       </>
    );
}

export default Home;