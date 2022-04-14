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

export default function Home({data_from_api, user}){

  const [data, setData] = useState(data_from_api)

  return(
    <div>
      <Header />
      <Grid container component="main">
        <Grid item xs={12}>
        <Typography component="h1" variant="h4" sx={{margin : 5}}>
                My Projects
        </Typography>
          <ProjectList dataArray={data} userName={user}/>
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
  const userName = session.userName

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  let res = await fetch('http://127.0.0.1:5000/Projects?projectID=1') 
  let data = await res.json()
  //Remove after the API starts working
  let newData = new Array()
  newData.push("1")
  newData.push("2")

  res = await fetch('http://127.0.0.1:5000/Datasets?dataset=circor')
  data = await res.json()
  console.log(data)

  return {
    props: { session, data_from_api : newData, user : userName}
  }
}


