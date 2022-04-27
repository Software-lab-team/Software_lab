import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

/*
Code for selecting which project to check in/out resources in the resource stepper component.
setProject updates the project that is selected from the Select component
*/

const SelectProject = (props) => {
  const [projects, setProjects] = useState([]);
  const { project, setProject, error } = props;

  const handleChange = async (event) => {
    await fetch(
      "http://127.0.0.1:5000/Projects?projectID=" + event.target.value.projectID
    )
      .then((response) => response.json())
      .then((data) => setProject(data));
  };

  const getProjects = async () => {
    const session = await getSession();

    // Returns list of projectIDs
    const res = await fetch(
      "http://127.0.0.1:5000/Users/get-projects?userName=" + session.userName
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    // Returns list of projects
    let projects = await Promise.all(
      res.map(async (projectID) => {
        return await fetch(
          "http://127.0.0.1:5000/Projects?projectID=" + projectID
        )
          .then((response) => response.json())
          .then((data) => {
            return data;
          });
      })
    );

    setProjects(projects);
  };

  /*
  Get the list of projects on the first rendering of the page
  */
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <FormControl
        sx={{ margin: 1, minWidth: 120 }}
        error={error && !project.projectName}
      >
        <InputLabel id="demo-simple-select-helper-label">Project</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Project"
          onChange={handleChange}
          defaultValue=""
        >
          {
            // Display a list of all projects in the Select component
            projects.map((project) => {
              return (
                <MenuItem key={project.projectID} value={project}>
                  {project.projectName}
                </MenuItem>
              );
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectProject;
