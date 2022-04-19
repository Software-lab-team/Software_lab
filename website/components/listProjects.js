
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
//Have an array as input, and create the corresponding list iteratively with primary being the element in the array

// New API will return a list of IDs related to the user
// e.g Data is an array, and will have to call an API for every element in the array


const ProjectList = ({userName, setAllProjectsArray, dataArray}) => {

    
    const [project_names, setProject_names] = useState([])
    const [project_ids, setProject_ids] = useState([])
    let project_names_temp = new Array()
    let project_ids_temp = new Array()

    const fetchData_IDs = async () =>{
        for(let i = 0; i < dataArray.length; i++){
            console.log(dataArray)
            let id = dataArray[i]
            const res = await fetch('http://127.0.0.1:5000/Projects?projectID='+id) 
            const data = await res.json()
            console.log(data)
            project_names_temp.push(data.projectName)
            project_ids_temp.push(data.projectID)
        }
        setProject_names(project_names_temp)
    }
    useEffect(()=>{fetchData_IDs()},[dataArray])

    return(
        <Paper elevation={3} sx={{margin : 5}}>
            <List>
                {project_names.map((project_name, i) => { 
                    return(
                        <div key={project_ids[i]}>
                            <ListItem key={project_ids[i]}>
                                <ListItemText primary={project_name} key={project_ids[i] + 1} />
                            </ListItem>
                            <Divider key={project_ids[i]}/>
                        </div>
                    )
                })}
            </List>
        </Paper>
    )
}



export default ProjectList