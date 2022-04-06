import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { signIn } from "next-auth/react";
import SigninForm from "./signinForm";

const Signup = (props) => {
  const handleSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    const response = await signIn("signup", {
      callbackUrl: `${window.location.origin}/resources`,
      redirect: false,
      username: username,
      password: password,
    });
  };

  const { open, onClose, csrfToken } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      method="post"
      action="/api/auth/callback/signup"
      noValidate
      sx={{ mt: 1 }}
    >
      <DialogTitle component="h1" variant="h5">
        Sign up
      </DialogTitle>
      <DialogContent>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <SigninForm type="Sign Up" />
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
