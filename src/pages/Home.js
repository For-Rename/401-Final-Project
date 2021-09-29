import Statistics from "../components/Statistics";


// import Blog  from "../components/Blog"

// import BlogForm from '../components/BlogForm';


// function Home(props){
 

//     return (
//       <>
      
        
//          <Statistics remaining={props.remaining} performanceHandler={props.performanceHandler} perforPercentage={props.perforPercentage} performance={props.performance}></Statistics>
//          <Blog blog = {props.blog}showingModel={props.showingModel}></Blog>
//          <BlogForm  blogInfoHandler={props.blogInfoHandler} model={props.model} hidingModel={props.hidingModel}></BlogForm>
   
//        </>
//     );


import Blog from "../components/Blog";

import BlogForm from "../components/BlogForm";

function Home(props) {
  return (
    <>
      <Statistics
        // remainingdays={props.remainingdays}
        performanceHandler={props.performanceHandler}
        perforPercentage={props.perforPercentage}
        performance={props.performance}
      ></Statistics>
      <Blog blog={props.blog} showingModel={props.showingModel}></Blog>
      <BlogForm
        blogInfoHandler={props.blogInfoHandler}
        model={props.model}
        hidingModel={props.hidingModel}
      ></BlogForm>
    </>
  );

}

export default Home;
