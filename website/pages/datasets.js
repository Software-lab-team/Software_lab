import Header from '../components/header'
import Grid from '@mui/material/Grid';
import SimpleAccordion from '../components/datasetList'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getSession } from 'next-auth/react';

export default function Home(){
  return(
      <div>
        <Header />
        <Box sx={{margin : 10}}>
        <Typography component="h1" variant="h4" sx={{marginBottom : 5}}>
          Datasets
        </Typography>
          <SimpleAccordion /> 
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

  return {
    props: { session }
  }
}
