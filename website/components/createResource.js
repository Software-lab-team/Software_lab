import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

/*
Code for creating a new HWSet in the resources page.
Passes the error prop, which will highlight empty text boxes when the submit button is pressed
*/

const CreateResource = ({ error }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  return (
    <TableRow>
      <TableCell>
        <TextField
          error={error && !name}
          onChange={(event) => setName(event.target.value)}
          value={name}
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="off"
          autoFocus
        />
      </TableCell>
      <TableCell>
        <TextField
          error={error && !capacity}
          onChange={(event) => setCapacity(event.target.value)}
          value={capacity}
          margin="normal"
          fullWidth
          id="capacity"
          label="Capacity"
          name="capacity"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          error={error && !capacity}
          onChange={(event) => setCapacity(event.target.value)}
          value={capacity}
          margin="normal"
          fullWidth
          id="availability"
          label="Availability"
          name="availability"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
      </TableCell>
      <TableCell>
        <Button type="submit" variant="contained">
          Add HWSet
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CreateResource;
