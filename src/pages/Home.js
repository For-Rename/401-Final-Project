import React,{useEffect, useState} from 'react';
import Statistics from "../components/Statistics";
import Blog  from "../components/Blog"
import axios from 'axios';
import BlogForm from '../components/BlogForm';
function Home(){
  const [performance,setPerformance] = useState([]);
  const [model,setModel] = useState(false);
  function showingModel(){

   setModel(true)
  }
  function hidingModel(){

    setModel(false)
   }
    return (
      <>
      
        
         <Statistics></Statistics>
         <Blog showingModel={showingModel}></Blog>
         <BlogForm model={model} hidingModel={hidingModel}></BlogForm>
   
       </>
    );
}

export default Home;