import Header from "../components/header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import ResourceStepper from "../components/resourceStepper";

const CreateResource = (props) => {
  const { name, cap, updateName, updateCap, handleSubmit } = props;

  return (
    <TableRow>
      <TableCell>
        <TextField
          onChange={updateName}
          error={name.error}
          value={name.value}
          margin="normal"
          required
          fullWidth
          id="name"
          label={name.alert ? "Name already exists" : "Name"}
          name="name"
          autoComplete="off"
          autoFocus
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={updateCap}
          error={cap.error}
          value={cap.value}
          margin="normal"
          required
          fullWidth
          id="capacity"
          label={cap.alert ? "Capacity must be positive" : "Capacity"}
          name="capacity"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={updateCap}
          error={cap.error}
          value={cap.value}
          margin="normal"
          required
          fullWidth
          id="availability"
          label={cap.alert ? "Capacity must be positive" : "Availability"}
          name="availability"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
      </TableCell>
      <TableCell>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Resource
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CreateResource;
