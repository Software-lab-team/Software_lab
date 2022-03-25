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
import { signIn } from "next-auth/react";

const Signup = (props) => {
	const [showPass, setShowPass] = useState(false);
  
	const handleSubmit = async (event) => {
		const data = new FormData(event.currentTarget);
		const username = data.get('username');
		const password = data.get('password');

		const response = await signIn("signup", { callbackUrl: `${window.location.origin}/resources`, redirect: false, username: username, password: password });
	};

	const handleShowPass = () => {
		setShowPass(!showPass);
	};
  
	const {open, onClose, csrfToken} = props;
	
	return (
		<Dialog open={open} onClose={onClose} component="form" onSubmit={handleSubmit} method="post" action="/api/auth/callback/signup" noValidate sx={{ mt: 1 }}>
			<DialogTitle component="h1" variant="h5">
				Sign up
			</DialogTitle>
			<DialogContent>
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoComplete="username"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					id="password"
					autoComplete="current-password"
					type={showPass ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleShowPass}
									edge="end"
								>
									{showPass ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
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