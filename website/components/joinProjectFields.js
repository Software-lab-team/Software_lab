import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Alert from "@mui/material/Alert";
import { useState } from "react";

//waiting on backend to implement the user stuff

const InputFieldsJoin = () => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [other_error, set_other_error] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const url = "http://127.0.0.1:5000/Projects?userName=" + "Bryan" + "&projectID=" + data.get('id') 
        joinProject(url)
      };
      const theme = createTheme()
    
      const joinProject = async(url) => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
      const req = await fetch(url, requestOptions)
      if(req.status === 200){
        setError(false)
        setSuccess(true)
        set_other_error(false)
      }else if(req.status === 400){
        setError(true)
        setSuccess(false)
        set_other_error(false)
      }else if(req.status === 404){
        setError(false)
        setSuccess(false)
        set_other_error(true)
      }
      const new_data = await req.json()
      }



      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
              <Typography component="h1" variant="h5">
                Join Project
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="Project ID"
                  name="id"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Join
                </Button>
                {error && <Alert severity="error">User already joined this project</Alert>}
                {success && <Alert severity="success">Succesfully joined the project</Alert>}
                {other_error && <Alert severity="error">Project does not exist</Alert>}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default InputFieldsJoin