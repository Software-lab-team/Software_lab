import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

//Have an array as input, and create the corresponding list iteratively with primary being the element in the array



const ProjectList = ({data}) => {
    const text = "Hello"
    return(
        <Paper elevation={3} sx={{margin : 5}}>
            <List>
                <ListItem>
                    <ListItemText primary={data.projectName}/>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={data.projectName}/>
                </ListItem>
            </List>
        </Paper>
    )
}

export default ProjectList