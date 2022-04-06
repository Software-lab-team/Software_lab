import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const SigninForm = (props) => {
  const { type, emptyFields } = props;

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div>
      <TextField
        error={emptyFields && !user}
        onChange={(event) => setUser(event.target.value)}
        value={user}
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
        error={emptyFields && !pass}
        onChange={(event) => setPass(event.target.value)}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {type}
      </Button>
    </div>
  );
};

export default SigninForm;
