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

export default function Home({users}){

  const [data, setData] = useState(users)

  return(
    <div>
      <Header />
      <Grid container component="main">
        <Grid item xs={12}>
        <Typography component="h1" variant="h4" sx={{margin : 5}}>
                My Projects
        </Typography>
          <ProjectList data={data}/>
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

  const res = await fetch('http://127.0.0.1:5000/Projects?projectID=1') 
  const data = await res.json()
  

  return {
    props: { session, users : data }
  }
}


