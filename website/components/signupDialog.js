import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SigninForm from "./signinForm";

const Signup = (props) => {
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmptyFields(false);

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (!username || !password) {
      setEmptyFields(true);
      return;
    }

    await signIn("signup", {
      callbackUrl: `${window.location.origin}/resources`,
      username: username,
      password: password,
    });
  };

  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <DialogTitle component="h1" variant="h5">
        Sign up
      </DialogTitle>
      <DialogContent>
        <SigninForm type="Sign Up" emptyFields={emptyFields} />
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
