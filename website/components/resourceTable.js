import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import CreateResource from "../components/createResource";

/*
Code for the resource table in the resources page.
setHwsets updates the list of HWSets on the initial rendering of the page
*/

const ResourceTable = (props) => {
  const { hwsets, setHwsets } = props;
  const [error, setError] = useState(false);

  const initHWSets = async () => {
    await fetch("http://127.0.0.1:5000/HWSets")
      .then((response) => response.json())
      .then((data) => setHwsets(data.result));
  };

  /*
  Get the list of HWSets on the first rendering of the page
  */
  useEffect(() => {
    initHWSets();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const capacity = data.get("capacity");

    // If either field is empty, set error prop to true to highlight empty fields and do not call the API
    if (!name || !capacity) {
      setError(true);
      return;
    }

    await fetch(
      "http://127.0.0.1:5000/HWSets?name=" + name + "&capacity=" + capacity,
      { method: "POST" }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        //It will only return a string if there is an error with the API call, with the string having the error message sent by the backend
        if (typeof data === "string") {
          setError(data);
        } else {
          setHwsets([...hwsets, data.result]);
        }
      });
  };

  // Delete the HWSet from the database, and update the hwsets prop so the resource table is rerendered to show the deletion
  const deleteHwset = async (i, name) => {
    let newArr = [...hwsets];
    newArr.splice(i, 1);
    setHwsets(newArr);

    await fetch("http://127.0.0.1:5000/HWSets?name=" + name, {
      method: "DELETE",
    });
  };

  return (
    <Paper elevation={3} sx={{ margin: 5, padding: 5 }}>
      <TableContainer component="form" onSubmit={handleSubmit}>
        <Typography component="h1" variant="h4">
          HWSets
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hwsets.map((row, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.capacity}</TableCell>
                  <TableCell>{row.availability}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => deleteHwset(i, row.name)}
                    >
                      Delete {row.name}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <CreateResource error={error} />
          </TableBody>
        </Table>
      </TableContainer>
      {
        // Display an error message if the HWSet already exists
        typeof error === "string" && <Alert severity="error">{error}</Alert>
      }
    </Paper>
  );
};

export default ResourceTable;
