import Header from '../components/header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CreateResource from '../components/createResource';
import ResourceStepper from '../components/resourceStepper';
import { getSession } from 'next-auth/react';

export default function Home(){
	const [name, setName] = useState({
		value: '',
		error: false,
		alert: false,
	});
	
	const [cap, setCap] = useState({
		value: '',
		error: false,
		alert: false,
	});
	
	const [data, setData] = useState([
		{
			name: "HWSet1",
			capacity: 300,
			availability: 300,
		},
		{
			name: "HWSet2",
			capacity: 20,
			availability: 20,
		},
	]);
	
	const handleSubmit = (event) => {
		setName({...name, error: false, alert: false});
		setCap({...cap, error: false, alert: false});
		
		const error = false;
		if(!name.value) {
			setName({...name, error: true});
			error = true;
		} else {
			for(let i in data) {
				if(name.value === data[i].name) {
					setName({...name, error: true, alert: true});
					error = true;
				}
			}	
		}
		
		if(!cap.value) {
			setCap({...cap, error: true});
			error = true;
		} else if(cap.value < 1) {
			setCap({...cap, error: true, alert: true});
			error = true;
		}
		
		if(error) {
			return;
		}
		
		const newData = {
			name: name.value,
			capacity: cap.value,
			availability: cap.value,
		};
		
		setData([...data, newData]);
		
		setName({value: '', error: false, alert: false});
		setCap({value: '', error: false, alert: false});
	};
  
		const rows = data.map((row, i) => {
			return (
				<TableRow key={i}>
					<TableCell>{row.name}</TableCell>
					<TableCell>{row.capacity}</TableCell>
					<TableCell>{row.availability}</TableCell>
				</TableRow>
			);
		});
		
		const updateName = (event) => {
			setName({...name, value: event.target.value});
		};
		
		const updateCap = (event) => {
			setCap({...cap, value: event.target.value});
		};
  
	return(
		<div>
			<Header />
			<Paper elevation={3} sx={{ margin: 5, padding: 5 }}>
				<TableContainer component="main">
					<Typography component="h1" variant="h4">Resources</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Capacity</TableCell>
								<TableCell>Availability</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows}
							<CreateResource name={name} cap={cap} updateName={updateName} updateCap={updateCap} handleSubmit={handleSubmit} />
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<ResourceStepper />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
  
	if (!session) {
	  return {
		redirect: {
		  destination: '/auth/signin',
		  permanent: false,
		},
	  }
	}
  
	return {
	  props: { session }
	}
  }
