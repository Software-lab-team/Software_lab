import Header from '../components/header'
import InputFieldsCreate from '../components/createProjectsFields'
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import InputFieldsJoin from '../components/joinProjectFields'
import InputFieldsDelete from '../components/deleteProjectsFields'
import ProjectList from '../components/listProjects'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

/*
//Function to do the API call
export const getStaticProps = async () =>{

  const res = await fetch('https://jsonplaceholder.typicode.com/users') 
  const data = await res.json()

  return {
    props: {users : data}
  }

}




//Receives the api information under props. In this case, I diconstructed the props thing so that I only have to recieve the data. 
//The map function gets called for every element in the array. So basically, it creates a div for every user on the list. Will need to do this
//Use state allows me to change the data when I fetch the API again


export default function Home({users}){

  const [data, setData] = useState(users)

  const fetchData = async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/comments') 
    const new_data = await req.json()
    return setData(new_data)
  }

  const handleClick = (event) =>{
    event.preventDefault()
    fetchData()
  }

  return(
    <div>
      <Header />
      <button onClick = {handleClick}> Test calling API</button>
      {data.map(user =>(
        <div key={user.id}>
          <a>
            <h3>
              {user.email}
            </h3>
          </a>
        </div>
      ))}
    </div>
  )  
}
*/


export default function Home(){
  return(
    <div>
      <Header />
      <Grid container component="main">
        <Grid item xs={12}>
        <Typography component="h1" variant="h4" sx={{margin : 5}}>
                My Projects
        </Typography>
          <ProjectList />
        </Grid>
          <Grid item xs={4}>
          <InputFieldsCreate />
          </Grid>
        <Grid item xs={4}>
          <InputFieldsJoin />
        </Grid>
        <Grid item xs={4}>
        <InputFieldsDelete />
        </Grid>
      </Grid>
    </div>
  )
}


