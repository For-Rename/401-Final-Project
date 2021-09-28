import React,{useEffect, useState} from 'react';
import Statistics from "../components/Statistics";

import Blog  from "../components/Blog"
import axios from 'axios';
import BlogForm from '../components/BlogForm';
function Home(){
  const [performance,setPerformance] = useState([]);
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
   async function performanceHandler(info){
    const response = await axios.get('backend_link');
    setPerformance(info => [...info, response.data])
   }
    return (
      <>
      
        
         <Statistics performance={performance}></Statistics>
         <Blog blog = {blog}showingModel={showingModel}></Blog>
         <BlogForm  blogInfoHandler={blogInfoHandler} model={model} hidingModel={hidingModel}></BlogForm>
   
       </>
    );

}

export default Home;
