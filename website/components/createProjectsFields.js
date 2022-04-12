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
import Alert from "@mui/material/Alert";
import { useState } from "react";

const InputFieldsCreate = ({allProjectsArray, setAllProjectsArray, userName}) => {
     
     const [error, setError] = useState(false)
     const [success, setSuccess] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const url = "http://127.0.0.1:5000/Projects?projectID=" + data.get('id') + "&projectName=" + data.get('name') + "&projectDescription=" + data.get('description')
        createProject(url)
        //updateAllProjects()
      };

      const updateAllProjects = async() => {
        const res = await fetch('http://127.0.0.1:5000/Projects?projectID=1') 
        const data = await res.json()
        setAllProjectsArray(data)
      }

      const createProject = async(url) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
        const req = await fetch(url, requestOptions)
        if(req.status === 200){
          setError(false)
          setSuccess(true)
        }else{
          setError(true)
          setSuccess(false)
        }
      }

      const theme = createTheme()
    
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
              <Typography component="h1" variant="h5">
                Create Project
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Project Name"
                  id="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Project Description"
                  id="description"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
                {error && <Alert severity="error">Project name already exists</Alert>}
                {success && <Alert severity="success">Succesfully created the project</Alert>}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default InputFieldsCreate