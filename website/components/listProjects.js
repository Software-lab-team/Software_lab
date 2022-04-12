
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
//Have an array as input, and create the corresponding list iteratively with primary being the element in the array

// New API will return a list of IDs related to the user
// e.g Data is an array, and will have to call an API for every element in the array


const ProjectList = ({dataArray, userName}) => {
    const text = "Hello"
    
    return(
        <Paper elevation={3} sx={{margin : 5}}>
            <List>
                {dataArray.map((id) => {
                    const [data, setData] = useState("")

                    const fetchData = async () =>{
                        const res = await fetch('http://127.0.0.1:5000/Projects?projectID='+id) 
                        const data = await res.json()
                        setData(data.projectName)
                    }
                    console.log(1)
                    fetchData()
                    return(
                        <div>
                            <ListItem>
                                <ListItemText primary={data}/>
                            </ListItem>
                            <Divider />
                        </div>
                    )
                })}
            </List>
        </Paper>
    )
}

export default ProjectList