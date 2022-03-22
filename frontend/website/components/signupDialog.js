import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const Signup = (props) => {
	const [user, setUser] = useState({
		value: '',
		error: false,
		alert: false,
	});
  
	const [pass, setPass] = useState({
		value: '',
		error: false,
		showPass: false,
	});
  
	const [signup, setSignup] = useState(false);
  
	const handleSubmit = (event) => {
		setUser({...user, error: false, alert: false});
		setPass({...pass, error: false});
	
		if(!user.value) {
			setUser({...user, error: true});
			event.preventDefault();
		} else if(user.value === "user" && pass.value) {
			setUser({...user, error: true, alert: true});
			event.preventDefault();
		}
	
		if(!pass.value) {
			setPass({...pass, error: true});
			event.preventDefault();
		}
	};

	const handleShowPass = () => {
		setPass({...pass, showPass: !pass.showPass});
	};
  
	const {open, onClose} = props;
  
	const close = () => {
		onClose();
		setUser({value: '', error: false, alert: false});
		setPass({...pass, value: '', error: false});
	}
	
	return (
		<Dialog open={open} onClose={close} component="form" validate sx={{ mt: 1 }}>
			<DialogTitle component="h1" variant="h5">
				Sign up
			</DialogTitle>
			<DialogContent>
				<TextField
					onChange={(event) => setUser({...user, value: event.target.value})}
					error={user.error}
					margin="normal"
					required
					fullWidth
					id="username"
					label={user.alert? "Username already exists" : "Username"}
					name="username"
					autoComplete="username"
					autoFocus
				/>
				<TextField
					onChange={(event) => setPass({...pass, value: event.target.value})}
					error={pass.error}
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					id="password"
					autoComplete="current-password"
					type={pass.showPass ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleShowPass}
									edge="end"
								>
									{pass.showPass ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					onClick={handleSubmit}
					href="/resources"
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default Signup;