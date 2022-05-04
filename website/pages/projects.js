import Header from '../components/header'
import InputFieldsCreate from '../components/createProjectsFields'
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import InputFieldsJoin from '../components/joinProjectFields'
import InputFieldsDelete from '../components/deleteProjectsFields'
import ProjectList from '../components/listProjects'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { getSession } from 'next-auth/react'
import Box from "@mui/material/Box";


/*
Code for the projects page
*/

export default function Home({user, dataArray}){

  const [data, setData] = useState(dataArray)
  return(
    <div>
      <Header />
      <Grid container component="main">
        <Grid item xs={12}>
        <Typography component="h1" variant="h4" sx={{margin : 5}}>
                My Projects
        </Typography>
          <ProjectList dataArray={data} userName={user} setAllProjectsArray={setData}/>
        </Grid>
          <Grid item xs={4}>
          <InputFieldsCreate allProjectsArray={data} setAllProjectsArray={setData} userName={user}/>
          </Grid>
        <Grid item xs={4}>
          <InputFieldsJoin allProjectsArray={data} setAllProjectsArray={setData} userName={user}/>
        </Grid>
        <Grid item xs={4}>
        <InputFieldsDelete allProjectsArray={data} setAllProjectsArray={setData} userName={user}/>
        </Grid>
      </Grid>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
  const userName = session.userName

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};
//Only gets called when the page is loaded for the first time/page is refreshed
//data is an array of project ids
  let res = await fetch('http://127.0.0.1:5000/Users/get-projects?userName=' + userName, requestOptions) 
  let data = await res.json()

  return {
    props: { session, user : userName, dataArray : data}
  }
}


