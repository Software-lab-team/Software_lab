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

const InputFieldsJoin = ({allProjectsArray, setAllProjectsArray, userName}) => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const url = "http://127.0.0.1:5000/Users/update-user?userName=" + userName + "&projectID=" + data.get('id') 
        joinProject(url)
      };
      const theme = createTheme()
    
      const updateAllProjects = async() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
        const res = await fetch('http://127.0.0.1:5000/Users/get-projects?userName=' + userName, requestOptions) 
        const data = await res.json()
        setAllProjectsArray(data)
      }

      const joinProject = async(url) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
      const req = await fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text();
      });
      if(typeof req !== 'string'){
        setError(false)
        setSuccess(true)
        updateAllProjects()
      }else{
        console.log(req)
        setError(true)
        setSuccess(false)
        setErrorMessage(req)
       }
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
                {error && <Alert severity="error">{errorMessage}</Alert>}
                {success && <Alert severity="success">Succesfully joined the project</Alert>}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default InputFieldsJoin