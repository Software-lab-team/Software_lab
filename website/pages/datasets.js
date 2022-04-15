import Header from '../components/header'
import Grid from '@mui/material/Grid';
import SimpleAccordion from '../components/datasetList'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getSession } from 'next-auth/react';

export default function Home({dataArray}){
  return(
      <div>
        <Header />
        <Box sx={{margin : 10}}>
        <Typography component="h1" variant="h4" sx={{marginBottom : 5}}>
          Datasets
        </Typography>
          <SimpleAccordion dataArray={dataArray} /> 
        </Box>
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

  let datasets = ["circor", "taichi", "staffiii", "aftdb", "ahadb"]
  let data = new Array()

  for(let i = 0; i < datasets.length; i++){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
    const res = await fetch('http://127.0.0.1:5000/Datasets?dataset='+datasets[i], requestOptions) 
    
    const data_api = await res.json()
    console.log(data_api)
    data.push(JSON.stringify(data_api))
  }

  console.log(data)

  return {
    props: { session, dataArray : data }
  }
}

