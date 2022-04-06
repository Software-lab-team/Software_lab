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




const InputFieldsCreate = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
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
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default InputFieldsCreate