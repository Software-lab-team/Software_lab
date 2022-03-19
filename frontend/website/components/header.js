import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
    return(
        <AppBar
        position="relative"
        elevation={3}
        color = "primary"
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="white" noWrap sx={{ flexGrow: 1 }}>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="#FFFFFF"
              href="/resources"
              //my is margin top & bottom, mx is margin left & right
              sx={{ my: 1, mx: 1.5}}
              style = {{textDecoration:'none'}}
            >
              resources
            </Link>
            <Link
              variant="button"
              color="#ffffff"
              href="/projects"
              sx={{ my: 1, mx: 1.5 }}
              style = {{textDecoration:'none'}}
            >
              projects
            </Link>
            <Link
              variant="button"
              color="#ffffff"
              href="/datasets"
              sx={{ my: 1, mx: 1.5 }}
              style = {{textDecoration:'none'}}
            >
              Datasets
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
}

export default Header