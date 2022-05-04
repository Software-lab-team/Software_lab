
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';


/*
Code for the widget that displays the projects that the user is linked to
dataArray contains a list of the ids of the project associated with the user
*/


const ProjectList = ({userName, setAllProjectsArray, dataArray}) => {

    
    const [project_names, setProject_names] = useState([])
    const [project_ids, setProject_ids] = useState([])
    let project_names_temp = new Array()
    let project_ids_temp = new Array()

    const fetchData_IDs = async () =>{
        //Because backend returns a list of ids instead of the project data, have to make an API call for each project to get the data
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
    /*
      Makes it so that it fetchData_IDs only gets called when dataArray changes, otherwise it gets stuck in an infinite loop
      dataArray will be changed by joinProjectFields, deleteProjectFields, and createProjectFields
    */
    useEffect(()=>{fetchData_IDs()},[dataArray])

    return(
        <Paper elevation={3} sx={{margin : 5}}>
            <List>
                {//creates a new list item for every project that the user is linked to. Gets updated when project_names is updated, which happens when dataArray is updated
                project_names.map((project_name, i) => { 
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