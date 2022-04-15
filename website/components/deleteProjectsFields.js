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


const InputFieldsDelete = ({allProjectsArray, setAllProjectsArray, userName}) => {

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const url = "http://127.0.0.1:5000/Projects?projectID=" + data.get("id")
        deleteProjects(url)
      };

      const updateAllProjects = async() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
        const res = await fetch('http://127.0.0.1:5000/Users/get-projects?userName=' + userName, requestOptions) 
        const data = await res.json()
        setAllProjectsArray(data)
      }
      
      const theme = createTheme()

      const deleteProjects = async(url) => {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
      const req = await fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          setError(false)
          setSuccess(true)
          updateAllProjects()
          return response.json();
        }
        return response.text();
      });

      if(typeof req === "string"){
          setError(true)
          setSuccess(false)
          setErrorMessage(req)
          return
      }
      }
    
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
              <Typography component="h1" variant="h5">
                Delete Project
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
                  Delete
                </Button>
                {error && <Alert severity="error">{errorMessage}</Alert>}
                {success && <Alert severity="success">Succesfully deleted the project</Alert>}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default InputFieldsDelete