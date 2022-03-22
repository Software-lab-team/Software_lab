import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectProject = (props) => {
	const {project, setProject} = props;

	const handleChange = (event) => {
		setProject({...project, value: event.target.value});
	};

	return (
		<div>
			<FormControl sx={{ margin: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-helper-label">Project</InputLabel>
				<Select
					error={project.error}
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={project.value}
					label="Project"
					onChange={handleChange}
				>
					<MenuItem value={"Project1"}>Project1</MenuItem>
					<MenuItem value={"Project2"}>Project2</MenuItem>
					<MenuItem value={"Project3"}>Project3</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

export default SelectProject;