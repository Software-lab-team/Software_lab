import Header from '../components/header'
import Grid from '@mui/material/Grid';
import SimpleAccordion from '../components/datasetList'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
