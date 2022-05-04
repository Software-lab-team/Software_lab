import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SigninForm from "./signinForm";

/*
Code for the Dialog component that pops up for signing up.
open and onClose props are passed to display the Dialog when it is open and handle what happens when it is closed
*/

const Signup = (props) => {
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmptyFields(false);

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    // If either field is empty, set emptyFields to highlight empty text boxes
    if (!username || !password) {
      setEmptyFields(true);
      return;
    }

    // Call the signup API located in pages/api/auth/[...nextauth].js
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
