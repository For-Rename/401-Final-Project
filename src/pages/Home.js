import React,{useEffect, useState} from 'react';
import Statistics from "../components/Statistics";

import Blog  from "../components/Blog"
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import { useAuth } from '../contexts/auth'

function Home(props){
 

    return (
      <>
      
        
         <Statistics remaining={props.remaining} performanceHandler={props.performanceHandler} perforPercentage={props.perforPercentage}performance={performance}></Statistics>
         <Blog blog = {props.blog}showingModel={props.showingModel}></Blog>
         <BlogForm  blogInfoHandler={props.blogInfoHandler} model={props.model} hidingModel={props.hidingModel}></BlogForm>
   
       </>
    );

}

export default Home;
