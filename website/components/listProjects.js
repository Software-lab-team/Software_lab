import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

//Have an array as input, and create the corresponding list iteratively with primary being the element in the array
const ProjectList = () => {
    return(
        <Paper elevation={3} sx={{margin : 5}}>
            <List>
                <ListItem>
                    <ListItemText primary="Test"/>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Test"/>
                </ListItem>
            </List>
        </Paper>
    )
}

export default ProjectList